<script setup>
import { internalHref } from "../utils/links";
import { useLanguage } from '../composables/useLanguage';
import LanguageToggle from '../components/LanguageToggle.vue';
const { language, toggleLanguage, tr } = useLanguage();

document.title = "404 — Routecycle";
</script>

<template>
  <main class="not-found">
    <LanguageToggle :language="language" @toggle="toggleLanguage" />
    <p>404</p>
    <h1>{{ tr('Route not found.') }}</h1>
    <a class="button button--primary" :href="internalHref()">
      {{ tr('Back to Routecycle') }}
    </a>
  </main>
</template>
