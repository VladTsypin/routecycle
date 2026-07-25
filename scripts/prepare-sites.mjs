import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportRoot = path.join(projectRoot, "out");
const distRoot = path.join(projectRoot, "dist");

async function collectHtmlRoutes(directory, relativeDirectory = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = {};

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      Object.assign(routes, await collectHtmlRoutes(absolutePath, relativePath));
      continue;
    }

    if (!entry.isFile() || entry.name !== "index.html") continue;

    const routeDirectory = path
      .dirname(relativePath)
      .split(path.sep)
      .filter((segment) => segment !== ".")
      .join("/");
    const route = routeDirectory ? `/${routeDirectory}/` : "/";
    routes[route] = await readFile(absolutePath, "utf8");
  }

  return routes;
}

const staticPages = await collectHtmlRoutes(exportRoot);
const notFoundHtml = await readFile(path.join(exportRoot, "404.html"), "utf8");

const workerSource = `"use strict";

const STATIC_PAGE_HTML = ${JSON.stringify(staticPages)};
const NOT_FOUND_HTML = ${JSON.stringify(notFoundHtml)};

function htmlResponse(request, body, status = 200) {
  return new Response(request.method === "HEAD" ? null : body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-content-type-options": "nosniff",
      "cache-control": "no-cache",
    },
  });
}

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    const pagePath = url.pathname === "/"
      ? "/"
      : (url.pathname.endsWith("/") ? url.pathname : url.pathname + "/");
    const pageHtml = STATIC_PAGE_HTML[pagePath];

    if (pageHtml) return htmlResponse(request, pageHtml);

    if (typeof env.ASSETS?.fetch === "function") {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) return assetResponse;
    }

    return htmlResponse(request, NOT_FOUND_HTML, 404);
  },
};
`;

await rm(distRoot, { recursive: true, force: true });
await mkdir(path.join(distRoot, "server"), { recursive: true });
await mkdir(path.join(distRoot, ".openai"), { recursive: true });
await cp(exportRoot, path.join(distRoot, "client"), { recursive: true });
await cp(
  path.join(projectRoot, ".openai", "hosting.json"),
  path.join(distRoot, ".openai", "hosting.json"),
);
await writeFile(path.join(distRoot, "server", "index.js"), workerSource, "utf8");

console.log(
  `Prepared Vue/Vite Sites worker (${Buffer.byteLength(workerSource)} bytes).`,
);
