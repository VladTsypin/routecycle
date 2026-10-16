<script setup>
import { useTranslations } from "../composables/useLanguage";
import { computed } from 'vue';
const { tr, formatDate } = useTranslations();
import BlogShell from "../components/BlogShell.vue";
import { internalHref } from "../utils/links";

const articleHref = computed(() => internalHref("blog/why-a-line-is-not-a-route/"));
</script>

<template>
  <BlogShell
    title-ru="Блог Routecycle — маршруты и данные"
    title-en="m_73b2c44b48"
    description-ru="Практические материалы о качестве веломаршрутов, покрытии, доступе и данных OpenStreetMap."
    description-en="m_d08cc373ed"
  >


    <template #default>
      <main class="blog-index">
        <p class="blog-kicker">{{ tr('m_3ad36a2c05') }}</p>
        <h1>{{ tr('m_44d756ef60') }}</h1>
        <p class="blog-index-intro"> {{ tr('m_6ea2ebc161') }} </p>

        <section class="blog-list" :aria-label="tr('m_b14ac78a46')">
          <article class="blog-list-item">
            <div class="blog-list-meta">
              <time datetime="2026-07-20">{{ formatDate('2026-07-20') }}</time>
              <span>{{ tr('m_b8a5508af9') }}</span>
              <span>{{ tr('article_languages') }}</span>
            </div>
            <div>
              <p>{{ tr('m_35edc67a5d') }}</p>
              <h2>
                <a :href="articleHref"> {{ tr('m_010a9ce321') }} </a>
              </h2>
              <p class="blog-list-description"> {{ tr('m_4cf72d073f') }} </p>
            </div>
            <a
              class="blog-list-arrow"
              :href="articleHref"
              :aria-label="tr('m_d70e40a074')"
            >
              →
            </a>
          </article>
        </section>
      </main>
    </template>
  </BlogShell>
</template>
