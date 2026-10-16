<script setup>
import { computed } from "vue";
import BlogShell from "../components/BlogShell.vue";
import { useTranslations } from "../composables/useLanguage";
import { internalHref } from "../utils/links";

const { tr, formatDate } = useTranslations();
const productUrl =
  "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_blog&utm_content=article_cta";
const blogHref = computed(() => internalHref("blog/"));
</script>

<template>
  <BlogShell
    title-ru="Почему линия на карте ещё не означает хороший веломаршрут — Routecycle"
    title-en="article_meta_title"
    description-ru="Какие данные помогают отличить красивую линию от маршрута, которому велосипедист может доверять."
    description-en="article_meta_description"
  >
    <template #default>
      <article class="blog-article">
        <header class="blog-article-header">
          <a class="blog-back" :href="blogHref">{{ tr('article_back') }}</a>
          <p class="blog-kicker">{{ tr('article_kicker') }}</p>
          <h1>{{ tr('article_title') }}</h1>
          <p class="blog-article-dek">{{ tr('article_dek') }}</p>
          <div class="blog-article-meta">
            <time datetime="2026-07-20">{{ formatDate('2026-07-20') }}</time>
            <span>{{ tr('m_b8a5508af9') }}</span>
            <span>Routecycle</span>
          </div>
        </header>

        <div class="blog-article-layout">
          <aside class="blog-article-rail" :aria-label="tr('article_contents_label')">
            <span>{{ tr('article_contents') }}</span>
            <a href="#geometry">{{ tr('article_toc_geometry') }}</a>
            <a href="#signals">{{ tr('article_toc_signals') }}</a>
            <a href="#unknown">{{ tr('article_toc_unknown') }}</a>
            <a href="#rider">{{ tr('article_toc_rider') }}</a>
            <a href="#check">{{ tr('article_toc_check') }}</a>
          </aside>

          <div class="article-body">
            <p class="article-lead">{{ tr('article_lead') }}</p>

            <h2 id="geometry">{{ tr('article_geometry_title') }}</h2>
            <p>{{ tr('article_geometry_p1') }}</p>
            <p>{{ tr('article_geometry_p2') }}</p>

            <h2 id="signals">{{ tr('article_signals_title') }}</h2>
            <p>
              {{ tr('article_signals_p1_before') }}
              <strong>{{ tr('article_surface') }}</strong>{{ tr('article_signals_p1_after') }}
              <code>surface</code>, <code>tracktype</code>, {{ tr('article_and') }}
              <code>smoothness</code>. {{ tr('article_signals_p1_end') }}
            </p>
            <p>
              {{ tr('article_signals_p2_before') }}
              <strong>{{ tr('article_access') }}</strong>. {{ tr('article_signals_p2_after') }}
              <code>access</code>, <code>bicycle</code>, {{ tr('article_and') }}
              <code>vehicle</code> {{ tr('article_signals_p2_end') }}
            </p>
            <p>
              {{ tr('article_signals_p3_before') }}
              <strong>{{ tr('article_rideability') }}</strong>: {{ tr('article_signals_p3_after') }}
              <code>mtb:scale</code>{{ tr('article_signals_p3_end') }}
            </p>

            <div class="article-signal-strip" :aria-label="tr('article_signal_strip_label')">
              <div>
                <span>{{ tr('article_signal_1_label') }}</span>
                <strong>{{ tr('article_signal_1_title') }}</strong>
                <p>{{ tr('article_signal_1_text') }}</p>
              </div>
              <div>
                <span>{{ tr('article_signal_2_label') }}</span>
                <strong>{{ tr('article_signal_2_title') }}</strong>
                <p>{{ tr('article_signal_2_text') }}</p>
              </div>
              <div>
                <span>{{ tr('article_signal_3_label') }}</span>
                <strong>{{ tr('article_signal_3_title') }}</strong>
                <p>{{ tr('article_signal_3_text') }}</p>
              </div>
            </div>

            <h2 id="unknown">{{ tr('article_unknown_title') }}</h2>
            <p>{{ tr('article_unknown_p1') }}</p>
            <p>{{ tr('article_unknown_p2') }}</p>
            <blockquote>{{ tr('article_quote') }}</blockquote>

            <h2 id="rider">{{ tr('article_rider_title') }}</h2>
            <p>{{ tr('article_rider_intro') }}</p>
            <ul>
              <li><strong>{{ tr('article_risk_label') }}</strong> {{ tr('article_risk_text') }}</li>
              <li><strong>{{ tr('article_reason_label') }}</strong> {{ tr('article_reason_text') }}</li>
              <li><strong>{{ tr('article_choice_label') }}</strong> {{ tr('article_choice_text') }}</li>
              <li><strong>{{ tr('article_confidence_label') }}</strong> {{ tr('article_confidence_text') }}</li>
            </ul>
            <p>{{ tr('article_rider_end') }}</p>

            <h2 id="check">{{ tr('article_check_title') }}</h2>
            <p>{{ tr('article_check_p1') }}</p>
            <p>{{ tr('article_check_p2') }}</p>

            <section class="article-cta" aria-labelledby="article-cta-title">
              <p>{{ tr('article_cta_label') }}</p>
              <h2 id="article-cta-title">{{ tr('article_cta_title') }}</h2>
              <span>{{ tr('article_cta_text') }}</span>
              <a :href="productUrl">{{ tr('article_cta_button') }}</a>
            </section>
          </div>
        </div>
      </article>
    </template>
  </BlogShell>
</template>
