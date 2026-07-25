<script setup>
import BrandMark from "./BrandMark.vue";
import LanguageToggle from "./LanguageToggle.vue";
import { useLanguage } from "../composables/useLanguage";
import { internalHref } from "../utils/links";

const props = defineProps({
  titleRu: { type: String, required: true },
  titleEn: { type: String, required: true },
  descriptionRu: { type: String, required: true },
  descriptionEn: { type: String, required: true },
});

const { language, toggleLanguage } = useLanguage(props);
</script>

<template>
  <div class="blog-page">
    <header class="blog-header">
      <a
        class="brand"
        :href="internalHref()"
        :aria-label="
          language === 'en'
            ? 'Routecycle — home'
            : 'Routecycle — на главную'
        "
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <div class="blog-header-actions">
        <a class="blog-product-link" :href="internalHref()">
          {{ language === "en" ? "Product" : "Продукт" }}
        </a>
        <LanguageToggle :language="language" @toggle="toggleLanguage" />
      </div>
    </header>
    <slot :name="language === 'en' ? 'english' : 'russian'" />
  </div>
</template>
