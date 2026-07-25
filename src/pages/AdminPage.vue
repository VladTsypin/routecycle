<script setup>
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
    <template #russian>
      <main class="admin-shell">
        <p class="blog-kicker">CONTENT ADMIN · ROUTECYCLE</p>
        <h1>Управление контентом.</h1>
        <p class="admin-intro">
          Редактируйте лендинг и материалы блога из одного места. Доступ к
          сохранению проверяет GitHub: изменения сможет публиковать только
          участник репозитория с правом записи.
        </p>

        <section class="admin-section" aria-labelledby="admin-blog-ru">
          <header>
            <div><span>01</span><h2 id="admin-blog-ru">Блог</h2></div>
            <p>1 опубликованный материал</p>
          </header>
          <article class="admin-content-row">
            <div class="admin-content-meta">
              <span>Опубликовано</span>
              <time datetime="2026-07-20">20.07.2026</time>
            </div>
            <div>
              <p>RU / EN · 6 минут</p>
              <h3>Почему линия на карте ещё не означает хороший веломаршрут</h3>
            </div>
            <div class="admin-row-actions">
              <a
                class="admin-action"
                :href="internalHref('blog/why-a-line-is-not-a-route/')"
              >
                Открыть
              </a>
              <a
                class="admin-action admin-action--primary"
                :href="github.article"
                target="_blank"
                rel="noreferrer"
              >
                Редактировать ↗
              </a>
            </div>
          </article>
          <div class="admin-secondary-actions">
            <a
              class="admin-action"
              :href="github.blogIndex"
              target="_blank"
              rel="noreferrer"
            >
              Редактировать список статей ↗
            </a>
          </div>
        </section>

        <section class="admin-section" aria-labelledby="admin-landing-ru">
          <header>
            <div><span>02</span><h2 id="admin-landing-ru">Лендинг</h2></div>
            <p>RU / EN · GitHub Pages</p>
          </header>
          <div class="admin-landing-row">
            <div>
              <p>Главная страница</p>
              <h3>Routecycle — маршруты без неприятных сюрпризов</h3>
            </div>
            <div class="admin-row-actions">
              <a class="admin-action" :href="internalHref()">Открыть</a>
              <a
                class="admin-action admin-action--primary"
                :href="github.landing"
                target="_blank"
                rel="noreferrer"
              >
                Редактировать ↗
              </a>
            </div>
          </div>
        </section>

        <aside class="admin-publish-note">
          <div>
            <span>Как публикуются изменения</span>
            <p>
              Нажмите «Редактировать», войдите в GitHub, внесите изменения и
              сохраните commit в ветку main. GitHub Pages автоматически
              пересоберёт сайт.
            </p>
          </div>
          <a
            class="admin-action"
            :href="github.deploy"
            target="_blank"
            rel="noreferrer"
          >
            Статус публикации ↗
          </a>
        </aside>
      </main>
    </template>

    <template #english>
      <main class="admin-shell">
        <p class="blog-kicker">CONTENT ADMIN · ROUTECYCLE</p>
        <h1>Content management.</h1>
        <p class="admin-intro">
          Edit the landing page and blog from one place. GitHub controls write
          access, so only repository collaborators with permission can publish
          changes.
        </p>

        <section class="admin-section" aria-labelledby="admin-blog-en">
          <header>
            <div><span>01</span><h2 id="admin-blog-en">Blog</h2></div>
            <p>1 published article</p>
          </header>
          <article class="admin-content-row">
            <div class="admin-content-meta">
              <span>Published</span>
              <time datetime="2026-07-20">20 JUL 2026</time>
            </div>
            <div>
              <p>RU / EN · 6 min read</p>
              <h3>Why a line on the map is not yet a good cycling route</h3>
            </div>
            <div class="admin-row-actions">
              <a
                class="admin-action"
                :href="internalHref('blog/why-a-line-is-not-a-route/')"
              >
                Open
              </a>
              <a
                class="admin-action admin-action--primary"
                :href="github.article"
                target="_blank"
                rel="noreferrer"
              >
                Edit ↗
              </a>
            </div>
          </article>
          <div class="admin-secondary-actions">
            <a
              class="admin-action"
              :href="github.blogIndex"
              target="_blank"
              rel="noreferrer"
            >
              Edit article list ↗
            </a>
          </div>
        </section>

        <section class="admin-section" aria-labelledby="admin-landing-en">
          <header>
            <div><span>02</span><h2 id="admin-landing-en">Landing page</h2></div>
            <p>RU / EN · GitHub Pages</p>
          </header>
          <div class="admin-landing-row">
            <div>
              <p>Home page</p>
              <h3>Routecycle — cycling routes without unpleasant surprises</h3>
            </div>
            <div class="admin-row-actions">
              <a class="admin-action" :href="internalHref()">Open</a>
              <a
                class="admin-action admin-action--primary"
                :href="github.landing"
                target="_blank"
                rel="noreferrer"
              >
                Edit ↗
              </a>
            </div>
          </div>
        </section>

        <aside class="admin-publish-note">
          <div>
            <span>How publishing works</span>
            <p>
              Select “Edit”, sign in to GitHub, make the change, and commit it to
              main. GitHub Pages will rebuild the site automatically.
            </p>
          </div>
          <a
            class="admin-action"
            :href="github.deploy"
            target="_blank"
            rel="noreferrer"
          >
            Deployment status ↗
          </a>
        </aside>
      </main>
    </template>
  </BlogShell>
</template>
