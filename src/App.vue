<script setup>
import { computed, defineAsyncComponent } from "vue";
import LandingPage from "./pages/LandingPage.vue";

const AdminPage = defineAsyncComponent(() => import("./pages/AdminPage.vue"));
const ArticlePage = defineAsyncComponent(
  () => import("./pages/ArticlePage.vue"),
);
const BlogPage = defineAsyncComponent(() => import("./pages/BlogPage.vue"));
const NotFoundPage = defineAsyncComponent(
  () => import("./pages/NotFoundPage.vue"),
);
const RaanitsaKambjaRoutePage = defineAsyncComponent(
  () => import("./pages/RaanitsaKambjaRoutePage.vue"),
);
const TestFrontendPage = defineAsyncComponent(
  () => import("./pages/TestFrontendPage.vue"),
);

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const pathname = window.location.pathname;
const routePath =
  base && pathname.startsWith(base)
    ? pathname.slice(base.length) || "/"
    : pathname;

const page = computed(() => {
  const normalized = `/${routePath.replace(/^\/+|\/+$/g, "")}/`;
  if (normalized === "//" || normalized === "/") return LandingPage;
  if (normalized === "/blog/") return BlogPage;
  if (normalized === "/blog/why-a-line-is-not-a-route/") return ArticlePage;
  if (normalized === "/routes/estonia/raanitsa-kambja/") {
    return RaanitsaKambjaRoutePage;
  }
  if (normalized === "/admin/") return AdminPage;
  if (normalized === "/test-frontend/") return TestFrontendPage;
  return NotFoundPage;
});
</script>

<template>
  <component :is="page" />
</template>
