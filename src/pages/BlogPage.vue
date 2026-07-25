<script setup>
import BlogShell from "../components/BlogShell.vue";
import { internalHref } from "../utils/links";

const articleHref = internalHref("blog/why-a-line-is-not-a-route/");
</script>

<template>
  <BlogShell
    title-ru="Блог Routecycle — маршруты и данные"
    title-en="Routecycle Blog — routes and data"
    description-ru="Практические материалы о качестве веломаршрутов, покрытии, доступе и данных OpenStreetMap."
    description-en="Practical notes on cycling route quality, surfaces, access and OpenStreetMap data."
  >
    <template #russian>
      <main class="blog-index">
        <p class="blog-kicker">ROUTECYCLE JOURNAL · 01</p>
        <h1>Маршруты, данные и то, что скрыто между точками.</h1>
        <p class="blog-index-intro">
          Практические разборы о том, как заранее замечать плохое покрытие,
          закрытые проезды и участки, где уверенность данных ниже обычной.
        </p>

        <section class="blog-list" aria-label="Статьи">
          <article class="blog-list-item">
            <div class="blog-list-meta">
              <time datetime="2026-07-20">20.07.2026</time>
              <span>6 минут</span>
            </div>
            <div>
              <p>МЕТОД · ДАННЫЕ</p>
              <h2>
                <a :href="articleHref">
                  Почему линия на карте ещё не означает хороший веломаршрут
                </a>
              </h2>
              <p class="blog-list-description">
                Какие сигналы покрытия, доступа и проезжаемости стоит проверить,
                прежде чем доверять красивой линии на экране.
              </p>
            </div>
            <a
              class="blog-list-arrow"
              :href="articleHref"
              aria-label="Читать статью"
            >
              →
            </a>
          </article>
        </section>
      </main>
    </template>

    <template #english>
      <main class="blog-index">
        <p class="blog-kicker">ROUTECYCLE JOURNAL · 01</p>
        <h1>Routes, data and what hides between the points.</h1>
        <p class="blog-index-intro">
          Practical notes on spotting poor surfaces, restricted access and
          low-confidence data before a ride begins.
        </p>

        <section class="blog-list" aria-label="Articles">
          <article class="blog-list-item">
            <div class="blog-list-meta">
              <time datetime="2026-07-20">20 JUL 2026</time>
              <span>6 min read</span>
            </div>
            <div>
              <p>METHOD · DATA</p>
              <h2>
                <a :href="articleHref">
                  Why a line on the map is not yet a good cycling route
                </a>
              </h2>
              <p class="blog-list-description">
                The surface, access and rideability signals worth checking
                before trusting a clean-looking line on a screen.
              </p>
            </div>
            <a
              class="blog-list-arrow"
              :href="articleHref"
              aria-label="Read the article"
            >
              →
            </a>
          </article>
        </section>
      </main>
    </template>
  </BlogShell>
</template>
