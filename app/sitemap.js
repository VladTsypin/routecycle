export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://vladtsypin.github.io/routecycle/",
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://vladtsypin.github.io/routecycle/blog/",
      lastModified: new Date("2026-07-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://vladtsypin.github.io/routecycle/blog/why-a-line-is-not-a-route/",
      lastModified: new Date("2026-07-20"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
