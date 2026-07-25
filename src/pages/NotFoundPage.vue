<script setup>
import { internalHref } from "../utils/links";

document.title = "404 — Routecycle";
</script>

<template>
  <main class="not-found">
    <p>404 · ROUTE NOT FOUND</p>
    <h1>
      Маршрут не найден.
      <br />
      <em>Route not found.</em>
    </h1>
    <a class="button button--primary" :href="internalHref()">
      Вернуться к Routecycle
    </a>
  </main>
</template>
