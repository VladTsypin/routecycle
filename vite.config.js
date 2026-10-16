import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGitHubPages ? "/routecycle/" : "/",
  plugins: [vue()],
  build: {
    outDir: "out",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        landing: resolve(import.meta.dirname, "index.html"),
        blog: resolve(import.meta.dirname, "blog/index.html"),
        article: resolve(
          import.meta.dirname,
          "blog/why-a-line-is-not-a-route/index.html",
        ),
        routeRaanitsaKambja: resolve(
          import.meta.dirname,
          "routes/estonia/raanitsa-kambja/index.html",
        ),
        admin: resolve(import.meta.dirname, "admin/index.html"),
        testFrontend: resolve(import.meta.dirname, "test-frontend/index.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
