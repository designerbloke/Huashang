/* Wraps the prototype into a standalone static site for ordinary web hosting.
   The Artifact platform supplies its own document skeleton, so prototype/index.html
   deliberately contains only page content. Everywhere else needs a real document. */

import { mkdir, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "prototype");
const out = join(root, "public");

const TITLE = "Campus Ops Console";
const DESC = "A prototype of a single operational view across WeChat, email, spreadsheets and forms for a multi-campus education group.";
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8F%AB%3C/text%3E%3C/svg%3E";

const body = await readFile(join(src, "index.html"), "utf8");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${DESC}">
<meta name="robots" content="noindex">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:type" content="website">
<link rel="icon" href="${FAVICON}">
<style>
  :root { color-scheme: light dark; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
</head>
<body>
${body}
</body>
</html>
`;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await writeFile(join(out, "index.html"), page);
for (const f of ["styles.css", "data.js", "app.js"]) await copyFile(join(src, f), join(out, f));
console.log("Built public/ - index.html, styles.css, data.js, app.js");
