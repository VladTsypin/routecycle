<script setup>
import { internalHref } from "../utils/links";
import { useLanguage } from '../composables/useLanguage';
import LanguageToggle from '../components/LanguageToggle.vue';
const { language, toggleLanguage, tr } = useLanguage({
  titleRu: "Страница не найдена — Routecycle",
  titleEn: "not_found_meta_title",
});
</script>

<template>
  <main class="not-found">
    <LanguageToggle :language="language" @toggle="toggleLanguage" />
    <p>404</p>
    <h1>{{ tr('m_490f1a8578') }}</h1>
    <a class="button button--primary" :href="internalHref()">
      {{ tr('m_950cb11cbb') }}
    </a>
  </main>
</template>
