import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import cfg from "./cfg.json" assert { type: "json" };

const 
    app = new Application(),
    router = new Router(),
    cacheAnswerFiles = {},
    db = new Map(),
    CreateShortUrl = x => {

    },
    GetShortUrl = x => {

    };

try {
    cacheAnswerFiles.default =  await Deno.readTextFile(`./${cfg.home}/${cfg.default}`);
    cacheAnswerFiles.script =  await Deno.readTextFile(`./${cfg.home}/${cfg.script}`);
    cacheAnswerFiles.style =  await Deno.readTextFile(`./${cfg.home}/${cfg.style}`);
    cacheAnswerFiles.favicon =  await Deno.readTextFile(`./${cfg.home}/${cfg.favicon}`);
    cacheAnswerFiles.license =  await Deno.readTextFile(`./${cfg.license}`);
} catch (error) {
    console.log(error);
}

router
    .get('/', ({response}) => {
        response.headers.set("Content-type", `text/html`);
        response.body = cacheAnswerFiles.default;
    })

    .get('/script', ({response}) => {
        response.headers.set("Content-type", `text/javascript`);
        response.body = cacheAnswerFiles.script;
    })

    .get('/style', ({response}) => {
        response.headers.set("Content-type", `text/css`);
        response.body = cacheAnswerFiles.style;
    })

    .get('/license', ({response}) => {
        response.headers.set("Content-type", `text/plain`);
        response.body = cacheAnswerFiles.license;
    })
    
    .post('/reg', async ({response, request}) => {
        const res = await request.body({ type: 'json' }).value
        if (!db.has(res.code)) {
            db.set(res.code,{
                url:res.url,
                date: new Date().getTime
            })
            response.headers.set("Content-type", `application/json`);
            response.body = "{msg:true}";
        } else {
            response.headers.set("Content-type", `application/json`);
            response.body = "{msg:false}";
        }
    })

    .post('/has', async ({response, request}) => {
        const body = await request.body({ type: 'json' }).value
        response.headers.set("Content-type", `application/json`);
        response.body = `{msg:${
            db.has(
                body.code
            )
        }}`;
    })
    
    .get('/:code', ({response, request, params}) => {
        if (params.code === "favicon.ico") {
            response.headers.set("Content-type", `text/png`);
            response.body = cacheAnswerFiles.favicon;
        } else {
            let url;
            try {
                url = db.get(params.code).url
            } catch (error) {
                url = "/"
            }
            response.body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta http-equiv="refresh" content="0; url=${url}">
                <title>Redirect...</title>
            </head>
            <body>
                Redirect..
            </body>
            </html>
            `;
        }
    }) 

app.use(router.routes())

console.log(`Startet on port ${cfg.port}`);
await app.listen({port: cfg.port || 80})