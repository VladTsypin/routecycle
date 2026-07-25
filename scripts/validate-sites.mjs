const worker = await import("../dist/server/index.js");

if (typeof worker.default?.fetch !== "function") {
  throw new Error("Sites worker must export default.fetch().");
}

const response = await worker.default.fetch(
  new Request("https://routecycle.example/"),
);
const html = await response.text();

if (response.status !== 200) {
  throw new Error(`Expected HTTP 200, received ${response.status}.`);
}

if (!html.includes("Routecycle")) {
  throw new Error("Landing HTML is missing the Routecycle marker.");
}

if (!/<script\b[^>]+\bsrc="\/assets\/main-[^"]+\.js"/i.test(html)) {
  throw new Error("Landing is missing the compiled Vue/Vite module entry.");
}

if (!html.includes('<div id="app"></div>')) {
  throw new Error("Landing is missing the Vue application mount point.");
}

const testFrontend = await worker.default.fetch(
  new Request("https://routecycle.example/test-frontend/"),
);
const testFrontendHtml = await testFrontend.text();

if (testFrontend.status !== 200) {
  throw new Error(
    `Expected /test-frontend/ HTTP 200, received ${testFrontend.status}.`,
  );
}

if (
  !testFrontendHtml.includes('<div id="app"></div>') ||
  !/<script\b[^>]+\bsrc="\/assets\/main-[^"]+\.js"/i.test(
    testFrontendHtml,
  )
) {
  throw new Error(
    "Test frontend HTML is missing its Vue mount point or module entry.",
  );
}

const notFound = await worker.default.fetch(
  new Request("https://routecycle.example/missing"),
);

if (notFound.status !== 404) {
  throw new Error(`Expected HTTP 404, received ${notFound.status}.`);
}

console.log(
  JSON.stringify({
    ok: true,
    status: response.status,
    bytes: Buffer.byteLength(html),
    testFrontend: testFrontend.status,
    notFound: notFound.status,
  }),
);
