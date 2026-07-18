export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://vladtsypin.github.io/routecycle/sitemap.xml",
    host: "https://vladtsypin.github.io/routecycle/",
  };
}
