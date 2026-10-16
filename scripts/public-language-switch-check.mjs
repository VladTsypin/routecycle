import { chromium } from "playwright";
import { createReadStream, readFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { languages } from "../src/locales/languages.js";

const outputRoot = path.resolve("out");
const remoteBaseUrl = process.env.ROUTECYCLE_QA_BASE_URL?.trim();
const baseUrl = remoteBaseUrl
  ? `${remoteBaseUrl.replace(/\/+$/, "")}/`
  : "http://127.0.0.1:4179/routecycle/";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const catalogs = Object.fromEntries(
  languages.map(({ code }) => [
    code,
    JSON.parse(readFileSync(`src/locales/${code}.json`, "utf8")),
  ]),
);

const server = remoteBaseUrl ? null : createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const relative = decodeURIComponent(pathname)
    .replace(/^\/routecycle\/?/, "")
    .replace(/^\/+/, "");
  let filename = path.join(outputRoot, relative);
  try {
    const info = await stat(filename);
    if (info.isDirectory()) filename = path.join(filename, "index.html");
    await stat(filename);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filename)] ?? "application/octet-stream",
    });
    createReadStream(filename).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

if (server) await new Promise((resolve) => server.listen(4179, "127.0.0.1", resolve));

const pages = [
  { path: "", selector: ".hero h1", textKey: "m_f1fbc25993", titleKey: "m_52d7e46ad8" },
  { path: "blog/", selector: ".blog-index h1", textKey: "m_44d756ef60", titleKey: "m_73b2c44b48" },
  { path: "blog/why-a-line-is-not-a-route/", selector: ".blog-article h1", textKey: "article_title", titleKey: "article_meta_title" },
  { path: "admin/", selector: ".admin-shell h1", textKey: "m_24be9b64d3", titleKey: "m_c9806f92fb" },
  { path: "test-frontend/", selector: "h1", textKey: "m_fec6823a58", titleKey: "m_e30a2c7b9d" },
  { path: "routes/estonia/raanitsa-kambja/", selector: ".route-guide-overview h2", textKey: "route_overview_title", titleKey: "route_meta_title" },
  { path: "404.html", selector: "h1", textKey: "m_490f1a8578", titleKey: "not_found_meta_title" },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];

async function verify(page, pageConfig, code) {
  await page.locator(".language-picker select").selectOption(code);
  await page.waitForFunction(
    (expected) => document.documentElement.lang === expected,
    code,
  );
  const actualText = (await page.locator(pageConfig.selector).innerText()).trim();
  const expectedText = catalogs[code][pageConfig.textKey];
  const title = await page.title();
  const expectedTitle = catalogs[code][pageConfig.titleKey];
  const state = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    lang: document.documentElement.lang,
    leakedKey: /(?:article|route)_[a-z0-9_]+|m_[0-9a-f]{10}/.test(document.body.innerText),
  }));
  const urlLanguage = new URL(page.url()).searchParams.get("lang");
  const selected = await page.locator(".language-picker select").inputValue();
  const failures = [];
  if (actualText !== expectedText) failures.push("content-not-translated");
  if (title !== expectedTitle) failures.push("title-not-translated");
  if (urlLanguage !== code) failures.push("url-language-not-updated");
  if (selected !== code || state.lang !== code) failures.push("language-state-not-updated");
  if (state.overflow) failures.push("horizontal-overflow");
  if (state.leakedKey) failures.push("translation-key-visible");
  if (pageConfig.path === "") {
    const videoTitle = (await page.locator(".promo-video-heading h2").innerText()).trim();
    const videoState = await page.locator(".promo-video-frame video").evaluate((video) => ({
      autoplay: video.autoplay,
      controls: video.controls,
      currentTime: video.currentTime,
      paused: video.paused,
      poster: video.poster,
      preload: video.preload,
      source: video.querySelector("source")?.src ?? "",
    }));
    if (videoTitle !== catalogs[code].promo_video_title) failures.push("video-copy-not-translated");
    if (videoState.autoplay || !videoState.paused || videoState.currentTime > 0.01) {
      failures.push("video-autoplayed");
    }
    if (!videoState.controls || videoState.preload !== "metadata") failures.push("video-controls-misconfigured");
    if (!videoState.poster.endsWith("/routecycle/media/promo-roads-poster.webp")) failures.push("video-poster-missing");
    if (!videoState.source.endsWith("/routecycle/media/promo-roads.mp4")) failures.push("video-source-missing");
  }
  return { code, actualText, title, ...state, failures };
}

try {
  for (const width of [390, 1440]) {
    for (const pageConfig of pages) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`${baseUrl}${pageConfig.path}?lang=en`, {
        waitUntil: "networkidle",
      });
      const checks = [];
      for (const code of ["et", "de", "ru", "en"]) {
        checks.push(await verify(page, pageConfig, code));
      }
      results.push({ path: pageConfig.path, width, checks, errors });
      await context.close();
    }
  }

  for (const pageConfig of pages) {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${pageConfig.path}?lang=en`, {
      waitUntil: "networkidle",
    });
    const checks = [];
    for (const { code } of languages) checks.push(await verify(page, pageConfig, code));
    results.push({ path: pageConfig.path, width: 390, allLanguages: true, checks, errors: [] });
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}?lang=et`, { waitUntil: "networkidle" });
  await page.locator('.footer-route-link').click();
  await page.waitForURL(/routes\/estonia\/raanitsa-kambja/);
  const carriedLanguage = new URL(page.url()).searchParams.get("lang");
  const carriedText = (await page.locator(".route-guide-overview h2").innerText()).trim();
  results.push({
    flow: "landing-to-route",
    carriedLanguage,
    carriedText,
    failures:
      carriedLanguage === "et" && carriedText === catalogs.et.route_overview_title
        ? []
        : ["language-not-preserved-across-navigation"],
    errors: [],
  });
  await context.close();
} finally {
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}

const failures = results.flatMap((result) => [
  ...(result.failures ?? []),
  ...(result.errors ?? []),
  ...(result.checks ?? []).flatMap((check) => check.failures),
]);

console.log(JSON.stringify({ baseUrl, checked: results.length, failed: failures.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
