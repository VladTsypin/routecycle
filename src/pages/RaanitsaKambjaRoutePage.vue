<script setup>
import { computed } from "vue";
import BlogShell from "../components/BlogShell.vue";
import { useTranslations } from "../composables/useLanguage";
import { internalHref } from "../utils/links";

const { tr } = useTranslations();
const landingHref = computed(() => internalHref());
const plannerUrl =
  "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=estonia_route_guides&utm_content=raanitsa_kambja";

const copy = computed(() => ({
  back: tr("route_back"),
  kicker: tr("route_kicker"),
  title: tr("route_title"),
  dek: tr("route_dek"),
  snapshot: tr("route_snapshot"),
  schematic: tr("route_schematic"),
  mapNote: tr("route_map_note"),
  start: "RAANITSA",
  connector: tr("route_connector_map"),
  finish: "KAMBJA",
  facts: [
    [tr("route_total_value"), tr("route_total_label")],
    [tr("route_sections_value"), tr("route_sections_label")],
    [tr("route_connector_value"), tr("route_connector_label")],
    [tr("route_format_value"), tr("route_format_label")],
  ],
  overviewLabel: tr("route_overview_label"),
  overviewTitle: tr("route_overview_title"),
  overviewText: tr("route_overview_text"),
  compositionTitle: tr("route_composition_title"),
  stageShare: tr("route_stage_share"),
  connectorShare: tr("route_connector_share"),
  stages: [
    { index: "01", title: "Raanitsa", distance: tr("route_stage_1_distance"), note: tr("route_stage_1_note") },
    { index: "02", title: tr("route_stage_2_title"), distance: tr("route_stage_2_distance"), note: tr("route_stage_2_note") },
    { index: "03", title: "Kambja", distance: tr("route_stage_3_distance"), note: tr("route_stage_3_note") },
  ],
  rideTitle: tr("route_ride_title"),
  rideItems: [
    [tr("route_ride_1_title"), tr("route_ride_1_text")],
    [tr("route_ride_2_title"), tr("route_ride_2_text")],
    [tr("route_ride_3_title"), tr("route_ride_3_text")],
    [tr("route_ride_4_title"), tr("route_ride_4_text")],
  ],
  checkTitle: tr("route_check_title"),
  checks: [
    tr("route_check_1"),
    tr("route_check_2"),
    tr("route_check_3"),
    tr("route_check_4"),
  ],
  limitsTitle: tr("route_limits_title"),
  limitsLead: tr("route_limits_lead"),
  limitsText: tr("route_limits_text"),
  sourceLinks: [
    ["Rally-Maps · Raanitsa ↗", "https://www.rally-maps.com/Rally-Estonia-2026/Raanitsa"],
    ["Rally-Maps · Kambja ↗", "https://www.rally-maps.com/Rally-Estonia-2026/Kambja"],
    ["OpenStreetMap ↗", "https://www.openstreetmap.org/"],
  ],
  ctaLabel: tr("route_cta_label"),
  ctaTitle: tr("route_cta_title"),
  ctaText: tr("route_cta_text"),
  ctaButton: tr("route_cta_button"),
}));
</script>

<template>
  <BlogShell
    title-ru="Raanitsa — Kambja: гравийный веломаршрут в Эстонии"
    title-en="route_meta_title"
    description-ru="Гравийный веломаршрут Raanitsa — Kambja в Южной Эстонии: 54,86 км, состав трека, логистика, источники данных и ограничения."
    description-en="route_meta_description"
  >
    <template #default>
      <main class="route-guide">
        <header class="route-guide-hero">
          <div class="route-guide-heading">
            <a class="blog-back" :href="landingHref">{{ copy.back }}</a>
            <p class="blog-kicker">{{ copy.kicker }}</p>
            <h1>{{ copy.title }}</h1>
            <p class="route-guide-dek">{{ copy.dek }}</p>
            <p class="route-guide-snapshot">{{ copy.snapshot }}</p>
          </div>

          <figure class="route-guide-map" :aria-label="copy.schematic">
            <svg viewBox="0 0 760 390" role="img" :aria-label="copy.schematic">
              <g class="route-guide-grid" aria-hidden="true">
                <path d="M0 78H760M0 156H760M0 234H760M0 312H760" />
                <path d="M152 0V390M304 0V390M456 0V390M608 0V390" />
              </g>
              <path class="route-guide-path route-guide-path--section" d="M78 300C130 287 140 205 207 216S271 294 333 246" />
              <path class="route-guide-path route-guide-path--connector" d="M333 246C379 211 396 162 455 168" />
              <path class="route-guide-path route-guide-path--section" d="M455 168C533 176 551 86 682 91" />
              <g class="route-guide-point">
                <circle cx="78" cy="300" r="10" /><circle cx="682" cy="91" r="10" />
              </g>
              <g class="route-guide-labels">
                <text x="78" y="337">{{ copy.start }}</text>
                <text x="337" y="287">{{ copy.connector }}</text>
                <text x="682" y="64" text-anchor="end">{{ copy.finish }}</text>
              </g>
            </svg>
            <figcaption>{{ copy.mapNote }}</figcaption>
          </figure>
        </header>

        <dl class="route-guide-facts">
          <div v-for="([value, label], index) in copy.facts" :key="label">
            <dt>{{ String(index + 1).padStart(2, '0') }}</dt>
            <dd><strong>{{ value }}</strong><span>{{ label }}</span></dd>
          </div>
        </dl>

        <section class="route-guide-overview" aria-labelledby="route-overview-title">
          <p>{{ copy.overviewLabel }}</p>
          <div>
            <h2 id="route-overview-title">{{ copy.overviewTitle }}</h2>
            <p>{{ copy.overviewText }}</p>
          </div>
        </section>

        <section class="route-guide-section" aria-labelledby="route-composition-title">
          <header><span>01</span><h2 id="route-composition-title">{{ copy.compositionTitle }}</h2></header>
          <div class="route-guide-composition">
            <div class="route-guide-share" aria-hidden="true"><i style="width: 82%" /><b style="width: 18%" /></div>
            <div class="route-guide-share-labels">
              <span><i />82% · {{ copy.stageShare }}</span>
              <span><i />18% · {{ copy.connectorShare }}</span>
            </div>
            <ol class="route-guide-stage-list">
              <li v-for="stage in copy.stages" :key="stage.index">
                <span>{{ stage.index }}</span>
                <div><h3>{{ stage.title }}</h3><p>{{ stage.note }}</p></div>
                <strong>{{ stage.distance }}</strong>
              </li>
            </ol>
          </div>
        </section>

        <section class="route-guide-section" aria-labelledby="route-ride-title">
          <header><span>02</span><h2 id="route-ride-title">{{ copy.rideTitle }}</h2></header>
          <div class="route-guide-notes">
            <article v-for="([title, text], index) in copy.rideItems" :key="title">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ title }}</h3><p>{{ text }}</p>
            </article>
          </div>
        </section>

        <section class="route-guide-check" aria-labelledby="route-check-title">
          <h2 id="route-check-title">{{ copy.checkTitle }}</h2>
          <ul><li v-for="item in copy.checks" :key="item">{{ item }}</li></ul>
        </section>

        <section class="route-guide-section route-guide-sources" aria-labelledby="route-sources-title">
          <header><span>03</span><h2 id="route-sources-title">{{ copy.limitsTitle }}</h2></header>
          <div>
            <strong>{{ copy.limitsLead }}</strong>
            <p>{{ copy.limitsText }}</p>
            <nav :aria-label="copy.limitsTitle">
              <a v-for="([label, href]) in copy.sourceLinks" :key="href" :href="href" target="_blank" rel="noreferrer">{{ label }}</a>
            </nav>
          </div>
        </section>

        <section class="route-guide-cta" aria-labelledby="route-cta-title">
          <p>{{ copy.ctaLabel }}</p>
          <h2 id="route-cta-title">{{ copy.ctaTitle }}</h2>
          <span>{{ copy.ctaText }}</span>
          <a :href="plannerUrl">{{ copy.ctaButton }}</a>
        </section>
      </main>
    </template>
  </BlogShell>
</template>
