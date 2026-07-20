export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/routecycle/admin/",
    },
    sitemap: "https://vladtsypin.github.io/routecycle/sitemap.xml",
    host: "https://vladtsypin.github.io/routecycle/",
  };
}
