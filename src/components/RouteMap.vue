<script setup>
import { useTranslations } from "../composables/useLanguage";
const { tr } = useTranslations();
import { computed, nextTick, ref, useId, watch } from "vue";

const props = defineProps({
  interactive: { type: Boolean, default: false },
  language: { type: String, default: "ru" },
  route: {
    type: Object,
    required: true,
  },
  showAlternative: {
    type: Boolean,
    default: true,
  },
});
const gridId = `grid-${useId()}`;
const panelId = `detail-${useId()}`;
const selectedId = ref(null);
const selected = computed(() => props.route.risks.find(risk => risk.id === selectedId.value));
const detail = computed(() => selected.value ? Object.fromEntries(Object.entries(selected.value.details).map(([k,v]) => [k, tr(v)])) : null);
const markerButtons = ref([]);
watch(() => props.route, () => { selectedId.value = null; });
function selectRisk(id) { selectedId.value = id; }
async function closeDetail() {
  const id = selectedId.value;
  selectedId.value = null;
  await nextTick();
  markerButtons.value.find(button => button.dataset.riskId === id)?.focus();
}
</script>

<template>
  <div class="map-stage" :class="{ 'map-stage--interactive': interactive }" :style="{ '--route-accent': route.accent }" data-vue-i18n>
    <div class="map-meta">
      <span>58.3776° N</span>
      <span>TARTU / OTEPÄÄ</span>
      <span>26.7290° E</span>
    </div>
    <div class="map-canvas">
    <svg
      class="map-svg"
      viewBox="0 0 960 480"
      role="img"
      :aria-label="tr('m_ed6df46fea')"
    >
      <defs>
        <pattern :id="gridId" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="currentColor"
            stroke-width=".7"
          />
        </pattern>
      </defs>

      <rect width="960" height="480" class="map-grid" :fill="`url(#${gridId})`" />

      <g class="contours">
        <path d="M-15 62 C122 12 207 113 348 64 S622 9 762 71 S936 123 992 63" />
        <path d="M-34 112 C96 67 219 168 345 119 S584 57 717 117 S920 179 993 130" />
        <path d="M-22 198 C118 137 216 229 346 187 S570 111 725 186 S912 246 993 208" />
        <path d="M-14 272 C85 214 221 299 326 265 S552 185 702 252 S900 326 998 275" />
        <path d="M-11 355 C111 298 223 387 342 344 S579 275 724 335 S913 409 990 359" />
        <path d="M-17 427 C115 375 239 457 359 414 S587 346 731 408 S901 477 993 436" />
      </g>

      <g class="water">
        <path d="M702 -10 C680 78 716 126 684 186 C657 236 654 295 688 354 C708 388 697 435 670 492" />
        <path d="M0 436 C126 393 203 442 301 410 C397 378 452 403 527 454" />
      </g>

      <g class="roads">
        <path d="M-20 312 C137 257 236 291 338 243 S585 186 973 236" />
        <path d="M152 -10 C191 96 139 179 200 265 S285 386 312 491" />
        <path d="M806 -20 C759 92 811 170 767 281 S765 406 791 497" />
      </g>

      <path
        v-if="showAlternative"
        :d="route.altPath"
        class="route-alternative"
        pathLength="1"
      />
      <path :key="route.path" :d="route.path" class="route-line" pathLength="1" />

      <g class="route-points">
        <circle cx="54" cy="398" r="10" class="point-outer" />
        <circle cx="54" cy="398" r="4" class="point-inner" />
        <circle cx="898" cy="82" r="10" class="point-outer" />
        <circle cx="898" cy="82" r="4" class="point-inner" />
      </g>

      <g
        v-for="risk in route.risks"
        :key="`${risk.x}-${risk.y}`"
        :class="`risk-dot risk-dot--${risk.level}`"
        :transform="`translate(${risk.x} ${risk.y})`"
      >
        <template v-if="!interactive">
        <circle r="13" />
        <circle r="4" />
        </template>
      </g>

      <g class="map-labels">
        <text x="28" y="452">ELVA</text>
        <text x="820" y="62">TARTU</text>
        <text x="452" y="111">PANGODI</text>
        <text x="633" y="377">NÕO</text>
      </g>
    </svg>
    <template v-if="interactive">
      <button
        v-for="(risk, index) in route.risks"
        :key="risk.id"
        ref="markerButtons"
        type="button"
        class="map-risk-button"
        :class="[`risk-dot--${risk.level}`, { 'is-selected': selectedId === risk.id }]"
        :style="{ left: `${risk.x / 9.6}%`, top: `${risk.y / 4.8}%` }"
        :data-risk-id="risk.id"
        :aria-label="tr('Section {number}: {title}', { number: index + 1, title: tr(risk.details.title) })"
        :aria-expanded="selectedId === risk.id"
        :aria-controls="panelId"
        @click="selectRisk(risk.id)"
        @keydown.esc="closeDetail"
      ><span>{{ index + 1 }}</span></button>
    </template>
    </div>

    <div class="map-legend">
      <span><i class="legend-dot legend-dot--safe" />{{ tr('m_60d0189cfc') }}</span>
      <span><i class="legend-dot legend-dot--review" />{{ tr('m_07297fa94a') }}</span>
      <span><i class="legend-dot legend-dot--warn" />{{ tr('m_778bfcfbcf') }}</span>
    </div>
  </div>
  <div v-if="interactive" :id="panelId" class="map-detail" data-vue-i18n @keydown.esc="closeDetail">
    <div class="map-announcement" role="status" aria-atomic="true">{{ detail ? detail.title + '. ' + detail.explanation : '' }}</div>
    <template v-if="detail">
      <div class="map-detail-heading">
        <h3>{{ detail.title }}</h3>
        <button type="button" @click="closeDetail">{{ tr('m_7d9eb7acb1') }} <span aria-hidden="true">×</span></button>
      </div>
      <dl class="map-detail-facts">
        <div><dt>{{ tr('m_0905f7f590') }}</dt><dd>{{ detail.surface }}</dd></div>
        <div><dt>{{ tr('m_ec5ba0abb7') }}</dt><dd>{{ detail.access }}</dd></div>
      </dl>
      <p>{{ detail.explanation }}</p>
      <p class="map-detail-advice">{{ detail.recommendation }}</p>
    </template>
    <div v-else class="map-detail-empty">
      <span class="map-detail-index" aria-hidden="true">01 — 03</span>
      <h3>{{ tr('m_47d5ebe6b6') }}</h3>
      <p>{{ tr('m_87fcbdcead') }}</p>
    </div>
  </div>
</template>
