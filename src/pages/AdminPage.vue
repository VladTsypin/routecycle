<script setup>
import { useTranslations } from "../composables/useLanguage";
const { tr, formatDate } = useTranslations();
import BlogShell from "../components/BlogShell.vue";
import { internalHref } from "../utils/links";

const github = {
  landing:
    "https://github.com/VladTsypin/routecycle/edit/main/src/pages/LandingPage.vue",
  blogIndex:
    "https://github.com/VladTsypin/routecycle/edit/main/src/pages/BlogPage.vue",
  article:
    "https://github.com/VladTsypin/routecycle/edit/main/src/pages/ArticlePage.vue",
  deploy:
    "https://github.com/VladTsypin/routecycle/actions/workflows/deploy-pages.yml",
};
</script>

<template>
  <BlogShell
    title-ru="Админка Routecycle — управление контентом"
    title-en="Routecycle Admin — content management"
    description-ru="Управление контентом лендинга и блога Routecycle."
    description-en="Manage Routecycle landing page and blog content."
  >


    <template #default>
      <main class="admin-shell">
        <p class="blog-kicker">{{ tr('m_a388ec33f3') }}</p>
        <h1>{{ tr('m_24be9b64d3') }}</h1>
        <p class="admin-intro"> {{ tr('m_8ac85ffe6a') }} </p>

        <section class="admin-section" aria-labelledby="admin-blog-en">
          <header>
            <div><span>01</span><h2 id="admin-blog-en">{{ tr('m_8c6bc09953') }}</h2></div>
            <p>{{ tr('m_621b484a9f') }}</p>
          </header>
          <article class="admin-content-row">
            <div class="admin-content-meta">
              <span>{{ tr('m_2ef42ec21d') }}</span>
              <time datetime="2026-07-20">{{ formatDate('2026-07-20') }}</time>
            </div>
            <div>
              <p>{{ tr('m_cf4d46997a') }}</p>
              <h3>{{ tr('m_010a9ce321') }}</h3>
            </div>
            <div class="admin-row-actions">
              <a
                class="admin-action"
                :href="internalHref('blog/why-a-line-is-not-a-route/')"
              > {{ tr('m_ed077f3d81') }} </a>
              <a
                class="admin-action admin-action--primary"
                :href="github.article"
                target="_blank"
                rel="noreferrer"
              > {{ tr('m_4795ffcd9e') }} </a>
            </div>
          </article>
          <div class="admin-secondary-actions">
            <a
              class="admin-action"
              :href="github.blogIndex"
              target="_blank"
              rel="noreferrer"
            > {{ tr('m_482d8b6437') }} </a>
          </div>
        </section>

        <section class="admin-section" aria-labelledby="admin-landing-en">
          <header>
            <div><span>02</span><h2 id="admin-landing-en">{{ tr('m_615e54d4d3') }}</h2></div>
            <p>{{ tr('m_600ff412f5') }}</p>
          </header>
          <div class="admin-landing-row">
            <div>
              <p>{{ tr('m_11d58b08de') }}</p>
              <h3>{{ tr('m_478880590a') }}</h3>
            </div>
            <div class="admin-row-actions">
              <a class="admin-action" :href="internalHref()">{{ tr('m_ed077f3d81') }}</a>
              <a
                class="admin-action admin-action--primary"
                :href="github.landing"
                target="_blank"
                rel="noreferrer"
              > {{ tr('m_4795ffcd9e') }} </a>
            </div>
          </div>
        </section>

        <aside class="admin-publish-note">
          <div>
            <span>{{ tr('m_05363b151b') }}</span>
            <p> {{ tr('m_f3a8897c36') }} </p>
          </div>
          <a
            class="admin-action"
            :href="github.deploy"
            target="_blank"
            rel="noreferrer"
          > {{ tr('m_37c880dcfd') }} </a>
        </aside>
      </main>
    </template>
  </BlogShell>
</template>
