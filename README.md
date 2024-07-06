The purpose of the project was to create a URL shortener using Deno.js to gain programming skills in Deno.

The project is useful as it provides a practical application for learning and using Deno.js, a modern runtime for JavaScript and TypeScript.

## How the project works

The URL shortener takes a long URL and generates a shortened version. When a user accesses the shortened URL, they are redirected to the original long URL. The project involves creating and managing these shortened URLs in a Deno environment.

### Repository Link and Installation

You can find the repository and installation instructions at the following link:
[URL Shortener Deno](https://github.com/Fulldroper/url_shorter_deno)

### Algorithm and Code Examples

1. **Setting Up Deno Server**
```typescript
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (context) => {
  context.response.body = "URL Shortener";
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
console.log("Server is running on http://localhost:8000");
```

2. **Creating Shortened URL**
```typescript
router.post("/shorten", async (context) => {
  const body = await context.request.body().value;
  const originalUrl = body.url;
  const shortUrl = generateShortUrl();
  // Store in database (omitted for brevity)
  context.response.body = { shortUrl };
});

function generateShortUrl(): string {
  return Math.random().toString(36).substring(2, 8);
}
```

3. **Redirecting to Original URL**
```typescript
router.get("/:shortUrl", (context) => {
  const shortUrl = context.params.shortUrl;
  const originalUrl = findOriginalUrl(shortUrl);
  if (originalUrl) {
    context.response.redirect(originalUrl);
  } else {
    context.response.status = 404;
    context.response.body = "URL not found";
  }
});

function findOriginalUrl(shortUrl: string): string | null {
  // Retrieve from database (omitted for brevity)
  return "http://example.com"; // Placeholder
}
```

## Skills Acquired

- Programming with Deno.js
- Building web applications with Deno and Oak framework
- Creating and managing URL shorteners
- Working with HTTP requests and routing

