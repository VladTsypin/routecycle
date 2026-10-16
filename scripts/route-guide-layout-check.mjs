import { chromium } from "playwright";
import { createReadStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const outputRoot = path.resolve("out");
const screenshotRoot = path.resolve("output/playwright/route-guide");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const relative = decodeURIComponent(pathname)
    .replace(/^\/routecycle\/?/, "")
    .replace(/^\/+/, "");
  let filename = path.join(outputRoot, relative);

  if (!filename.startsWith(outputRoot)) {
    response.writeHead(403).end();
    return;
  }

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

await new Promise((resolve) => server.listen(4176, "127.0.0.1", resolve));
await mkdir(screenshotRoot, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const cases = [
  { language: "ru", locale: "ru-RU", viewport: { width: 1440, height: 900 } },
  { language: "en", locale: "en-GB", viewport: { width: 1440, height: 900 } },
  { language: "ru", locale: "ru-RU", viewport: { width: 390, height: 844 } },
  { language: "en", locale: "en-GB", viewport: { width: 390, height: 844 } },
];

for (const testCase of cases) {
  const context = await browser.newContext({
    locale: testCase.locale,
    viewport: testCase.viewport,
  });
  await context.addInitScript((code) => {
    localStorage.setItem("routecycle-language", code);
  }, testCase.language);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().includes("fonts.")) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto(
    "http://127.0.0.1:4176/routecycle/routes/estonia/raanitsa-kambja/",
    { waitUntil: "networkidle", timeout: 60_000 },
  );
  await page.waitForFunction(
    (expected) => document.documentElement.lang === expected,
    testCase.language,
  );

  const layout = await page.evaluate(() => {
    const failures = [];
    const root = document.documentElement;
    if (root.scrollWidth > root.clientWidth + 1) {
      failures.push("page-horizontal-overflow");
    }
    if (!document.querySelector(".route-guide")) failures.push("route-guide-missing");
    if (!document.querySelector('.route-guide-map [role="img"]')) {
      failures.push("route-diagram-accessible-name-missing");
    }
    if (!document.querySelector('link[rel="canonical"]')?.href.endsWith(
      "/routecycle/routes/estonia/raanitsa-kambja/",
    )) {
      failures.push("canonical-missing");
    }

    const smallControls = [...document.querySelectorAll("a, button, select")]
      .filter((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && box.width > 0;
      })
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          label: element.getAttribute("aria-label") || element.textContent.trim().slice(0, 36),
          width: Math.round(box.width),
          height: Math.round(box.height),
        };
      })
      .filter(({ width, height }) => width < 44 || height < 44);
    if (smallControls.length) failures.push("touch-target-below-44px");

    const internalLinks = [...document.querySelectorAll('a[href^="/"]')].map(
      (element) => element.getAttribute("href"),
    );
    if (internalLinks.some((href) => !href.startsWith("/routecycle/"))) {
      failures.push("internal-link-missing-base-path");
    }

    return {
      title: document.title,
      heading: document.querySelector("h1")?.textContent.trim(),
      pageWidth: root.scrollWidth,
      viewportWidth: root.clientWidth,
      smallControls,
      internalLinks,
      failures,
    };
  });

  if (testCase.language === "ru") {
    await page.screenshot({
      path: path.join(
        screenshotRoot,
        `raanitsa-kambja-${testCase.viewport.width}.png`,
      ),
      fullPage: true,
    });
  }

  results.push({
    language: testCase.language,
    width: testCase.viewport.width,
    ...layout,
    errors,
  });
  await context.close();
}

const landingContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const landingPage = await landingContext.newPage();
await landingPage.goto("http://127.0.0.1:4176/routecycle/?lang=ru", {
  waitUntil: "networkidle",
});
const landingLinks = await landingPage
  .locator('a[href*="routes/estonia/raanitsa-kambja/"]')
  .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
if (landingLinks.length < 2) {
  results.push({
    language: "ru",
    width: 1440,
    failures: ["landing-route-links-missing"],
    errors: [],
    landingLinks,
  });
}
await landingContext.close();

await browser.close();
await new Promise((resolve) => server.close(resolve));

const failed = results.filter(
  (result) => result.failures.length || result.errors.length,
);
console.log(JSON.stringify({ checked: results.length, failed: failed.length, results }, null, 2));
if (failed.length) process.exitCode = 1;
