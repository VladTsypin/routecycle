<script setup>
import { useTranslations } from "../composables/useLanguage";
const { tr } = useTranslations();
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
          tr('m_0ec2acb529')
        "
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <div class="blog-header-actions">
        <a class="blog-product-link" :href="internalHref()">
          {{ tr('m_fb9ef89417') }}
        </a>
        <LanguageToggle :language="language" @toggle="toggleLanguage" />
      </div>
    </header>
    <slot v-if="$slots.default" />
    <template v-else>
      <p v-if="!['ru', 'en'].includes(language)" class="article-language-note">
        {{ tr('Article available in English and Russian. Showing the English version.') }}
      </p>
      <div :lang="language === 'ru' ? 'ru' : 'en'">
        <slot :name="language === 'ru' ? 'russian' : 'english'" />
      </div>
    </template>
  </div>
</template>
