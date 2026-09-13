<script setup>
import { useTranslations } from "../composables/useLanguage";
const { tr, formatNumber } = useTranslations();
import { computed, onMounted, ref, watch } from "vue";
import LanguageToggle from "../components/LanguageToggle.vue";
import { useLanguage } from "../composables/useLanguage";
import TestIcon from "../components/TestIcon.vue";
import { internalHref } from "../utils/links";

const copy = {
  "back": "m_4e8dcbd4c4",
  "title": "m_23691de10b",
  "test": "m_070f80367c",
  "info": "m_e76e2c7f89",
  "language": "m_361335922f",
  "support": "m_d67c05cd35",
  "strava": "m_5797008dd2",
  "settings": "m_db1de510bc",
  "parameters": "m_fec6823a58",
  "road": "m_a22e0b1fc3",
  "gravel": "m_1df7b3d338",
  "circle": "m_b93d3bcecf",
  "oneWay": "m_b18567ea52",
  "start": "m_ee1dd1bf29",
  "stop": "m_293d404a50",
  "distance": "m_b7bdf7a2d6",
  "time": "m_33b93476cf",
  "distanceKm": "m_6cbbf203ca",
  "attractions": "m_acfc276b25",
  "getRoutes": "m_e2bfad4f15",
  "getMoreRoutes": "m_7231dc252e",
  "building": "m_32e34634b0",
  "routes": "m_2c5b669bcd",
  "current": "m_e0d1b68224",
  "favorites": "m_7a1f2a83ac",
  "history": "m_0e76960093",
  "emptyFavorites": "m_c171a54911",
  "emptyHistory": "m_880c37d63c",
  "map": "m_5845c1523a",
  "zoomIn": "m_1a22b70b8f",
  "zoomOut": "m_b036296b94",
  "mapLayers": "m_5af504643b",
  "save": "m_1509f561f2",
  "private": "m_c63eb6720c",
  "share": "m_29887a5ff9",
  "reverse": "m_fae1c6f105",
  "export": "m_3664895579",
  "elevation": "m_179bcabb88",
  "points": "m_c075daf67a",
  "photos": "m_8a8ce7ba13",
  "low": "m_7c37f6fe21",
  "high": "m_68ca5d4892",
  "maxGrade": "m_534bec512f",
  "prototypeNote": "m_7914eca062",
  "aboutTitle": "m_766fc6a20a",
  "aboutBody": "m_63b1293ea3",
  "close": "m_7d9eb7acb1",
  "gravelTitle": "m_66065e7cba",
  "gravelBody": "m_7eb0776f21",
  "gravelCta": "m_836564ef04",
  "statusBuilt": "m_1482eb8f9b",
  "statusAction": "m_0f2f520f92"
};

const routeOptions = [
  {
    distance: 58,
    ascent: 177,
    time: "2 ч 06 м",
    timeEn: "2 h 06 m",
    path: "M103 442 C190 304 311 351 389 244 C469 134 567 204 663 168 C771 126 858 177 983 96",
  },
  {
    distance: 47,
    ascent: 222,
    time: "1 ч 47 м",
    timeEn: "1 h 47 m",
    path: "M103 442 C227 438 257 294 368 306 C492 320 548 178 659 233 C756 281 832 184 983 96",
  },
  {
    distance: 59,
    ascent: 233,
    time: "2 ч 11 м",
    timeEn: "2 h 11 m",
    path: "M103 442 C168 370 235 449 326 364 C408 286 478 341 561 264 C648 183 720 278 808 207 C875 153 926 145 983 96",
  },
];

const { language, toggleLanguage } = useLanguage({ titleEn: "Routecycle — frontend prototype", titleRu: "Routecycle — тестовый интерфейс" });
const dark = ref(false);
const parametersOpen = ref(true);
const routesOpen = ref(true);
const shape = ref("circle");
const metric = ref("distance");
const distance = ref(58);
const attractions = ref(false);
const generated = ref(false);
const building = ref(false);
const selectedRoute = ref(0);
const routeTab = ref("current");
const detailTab = ref("elevation");
const modal = ref("");
const status = ref("");
const zoom = ref(1);
const layerAlt = ref(false);
const reversed = ref(false);
const t = computed(() => Object.fromEntries(Object.entries(copy).map(([k,v]) => [k, tr(v)])));
const activeRoute = computed(() => routeOptions[selectedRoute.value]);
const routePath = computed(() =>
  shape.value === "oneWay"
    ? "M103 442 C234 383 271 281 402 302 C539 324 610 181 748 203 C846 219 911 139 983 96"
    : activeRoute.value.path,
);



function buildRoutes() {
  building.value = true;
  status.value = "";
  window.setTimeout(() => {
    generated.value = true;
    building.value = false;
    routeTab.value = "current";
    selectedRoute.value = 0;
    status.value = t.value.statusBuilt;
  }, 480);
}

function action() {
  status.value = t.value.statusAction;
}

watch(language, () => { status.value = ""; });

onMounted(() => {
  document.documentElement.lang = language.value;
});
</script>

<template>
  <div :class="[$style.page, { [$style.dark]: dark }]">
    <a :class="$style.skipLink" href="#test-map">{{ t.map }}</a>

    <aside :class="$style.sidebar" :aria-label="t.parameters">
      <header :class="$style.header">
        <a :class="$style.brand" :href="internalHref()" :aria-label="t.back">
          <svg viewBox="0 0 54 42" aria-hidden="true">
            <path
              d="m3 10 14-7 19 6 15-6v29l-15 7-19-6-14 6V10Z"
              fill="#b9ef7f"
              stroke="#10253f"
              stroke-width="1.5"
            />
            <path d="M17 3v30M36 9v30" fill="none" stroke="#10253f" stroke-width="1.5" />
            <path
              d="M35 4c0-5 8-5 8 0 0 5-4 9-4 9s-4-4-4-9Z"
              fill="#ff6035"
              stroke="#10253f"
              stroke-width="1.5"
            />
          </svg>
          <span>{{ t.title }}</span>
        </a>
        <button
          :class="$style.iconButton"
          type="button"
          :aria-label="t.info"
          @click="modal = 'info'"
        >
          <TestIcon name="info" />
        </button>
        <LanguageToggle :language="language" @toggle="toggleLanguage" />
      </header>

      <div :class="$style.projectLinks">
        <span :class="$style.testBadge">{{ t.test }}</span>
        <a
          :class="$style.supportLink"
          href="https://www.buymeacoffee.com/routecycle"
          target="_blank"
          rel="noreferrer"
        >
          <TestIcon name="coffee" />{{ t.support }}
        </a>
        <a
          :class="$style.stravaLink"
          href="https://routecycle.com/"
          target="_blank"
          rel="noreferrer"
        >
          {{ t.strava }}
        </a>
        <button
          :class="$style.iconButton"
          type="button"
          :aria-label="t.settings"
          @click="dark = !dark"
        >
          <TestIcon name="settings" />
        </button>
      </div>

      <section :class="$style.card">
        <div :class="$style.cardHeader">
          <h1>{{ t.parameters }}</h1>
          <button
            :class="$style.iconButton"
            type="button"
            :aria-expanded="parametersOpen"
            @click="parametersOpen = !parametersOpen"
          >
            <span :class="{ [$style.chevronUp]: parametersOpen }">
              <TestIcon name="chevron" />
            </span>
          </button>
        </div>

        <div v-if="parametersOpen" :class="$style.cardBody">
          <div :class="$style.segmented">
            <button :class="$style.activeSegment" type="button">
              <TestIcon name="bike" />{{ t.road }}
            </button>
            <button type="button" @click="modal = 'gravel'">
              <TestIcon name="mountain" />{{ t.gravel }}
            </button>
          </div>
          <div :class="$style.segmented">
            <button
              :class="{ [$style.activeSegment]: shape === 'circle' }"
              type="button"
              @click="shape = 'circle'"
            >
              <TestIcon name="route" />{{ t.circle }}
            </button>
            <button
              :class="{ [$style.activeSegment]: shape === 'oneWay' }"
              type="button"
              @click="shape = 'oneWay'"
            >
              <TestIcon name="route" />{{ t.oneWay }}
            </button>
          </div>

          <label :class="$style.fieldLabel" for="test-start">
            <TestIcon name="pin" />{{ t.start }}
          </label>
          <div :class="$style.locationRow">
            <input id="test-start" value="Dorpat, Soola 6, Tartu, Estonia" />
            <button :class="$style.iconButton" type="button" :aria-label="tr('m_15b61974b2')">
              <TestIcon name="target" />
            </button>
          </div>
          <template v-if="shape === 'oneWay'">
            <label :class="$style.fieldLabel" for="test-stop">
              <TestIcon name="pin" />{{ t.stop }}
            </label>
            <input
              id="test-stop"
              :class="$style.fullInput"
              value="Elva, Tartu County, Estonia"
            />
          </template>

          <div :class="$style.segmented">
            <button
              :class="{ [$style.activeSegment]: metric === 'distance' }"
              type="button"
              @click="metric = 'distance'"
            >
              <TestIcon name="route" />{{ t.distance }}
            </button>
            <button
              :class="{ [$style.activeSegment]: metric === 'time' }"
              type="button"
              @click="metric = 'time'"
            >
              <TestIcon name="clock" />{{ t.time }}
            </button>
          </div>
          <label v-if="metric === 'distance'" :class="$style.rangeField">
            <span>{{ t.distanceKm }}</span><strong>{{ distance }} {{ tr('m_1f34503f65') }}</strong>
            <input v-model.number="distance" type="range" min="20" max="100" />
          </label>
          <label :class="$style.switchRow">
            <span><TestIcon name="camera" />{{ t.attractions }}</span>
            <input v-model="attractions" type="checkbox" />
            <i aria-hidden="true" />
          </label>
          <button
            :class="$style.primaryButton"
            type="button"
            :disabled="building"
            @click="buildRoutes"
          >
            <TestIcon name="search" />
            {{ building ? t.building : generated ? t.getMoreRoutes : t.getRoutes }}
          </button>
        </div>
      </section>

      <section :class="$style.card">
        <div :class="$style.cardHeader">
          <h2>{{ t.routes }}</h2>
          <button
            :class="$style.iconButton"
            type="button"
            :aria-expanded="routesOpen"
            @click="routesOpen = !routesOpen"
          >
            <span :class="{ [$style.chevronUp]: routesOpen }">
              <TestIcon name="chevron" />
            </span>
          </button>
        </div>
        <div v-if="routesOpen" :class="$style.cardBody">
          <div :class="$style.routeTabs" role="tablist">
            <button
              v-for="tab in ['current', 'favorites', 'history']"
              :key="tab"
              type="button"
              role="tab"
              :aria-selected="routeTab === tab"
              :class="{ [$style.activeRouteTab]: routeTab === tab }"
              @click="routeTab = tab"
            >
              {{ t[tab] }}
            </button>
          </div>
          <div
            v-if="routeTab === 'current' && generated"
            :class="$style.routeList"
          >
            <button
              v-for="(option, index) in routeOptions"
              :key="option.distance"
              type="button"
              :class="{ [$style.activeRoute]: selectedRoute === index }"
              @click="selectedRoute = index"
            >
              <span><TestIcon name="route" />{{ option.distance }} {{ tr('m_1f34503f65') }}</span>
              <span><TestIcon name="mountain" />{{ option.ascent }} {{ tr('m_62c66a7a5d') }}</span>
              <span>
                <TestIcon name="clock" />
                {{ tr(option.timeEn) }}
              </span>
            </button>
          </div>
          <p v-else-if="routeTab === 'current'" :class="$style.emptyState">
            {{ t.getRoutes }}
          </p>
          <p v-else :class="$style.emptyState">
            {{ routeTab === "favorites" ? t.emptyFavorites : t.emptyHistory }}
          </p>
        </div>
      </section>

      <p :class="$style.liveStatus" role="status" aria-live="polite">
        {{ status }}
      </p>
      <div :class="$style.sidebarFooter">
        <a :href="internalHref()">{{ t.back }}</a>
        <span>{{ tr('m_534f4a6d93') }}</span>
      </div>
    </aside>

    <main :class="$style.workspace">
      <section
        id="test-map"
        :class="[$style.map, { [$style.altMap]: layerAlt }]"
      >
        <div :class="$style.mapTopControls">
          <button type="button" :aria-label="t.zoomIn" @click="zoom = Math.min(1.25, zoom + 0.08)">+</button>
          <button type="button" :aria-label="t.zoomOut" @click="zoom = Math.max(0.85, zoom - 0.08)">−</button>
        </div>
        <svg
          viewBox="0 0 1100 700"
          role="img"
          :aria-label="t.map"
          :style="{ '--test-map-zoom': zoom }"
        >
          <defs>
            <pattern id="test-grid" width="55" height="55" patternUnits="userSpaceOnUse">
              <path d="M55 0H0V55" fill="none" stroke="currentColor" stroke-opacity=".08" />
            </pattern>
          </defs>
          <g :class="$style.mapZoom">
            <rect width="1100" height="700" :class="$style.mapBase" />
            <rect width="1100" height="700" fill="url(#test-grid)" />
            <path
              :class="$style.forest"
              d="M0 0h366l52 121-93 126-166-38L0 292V0Zm1100 0H713l-77 140 108 94 175-38 181 70V0ZM0 700V496l172-49 160 87 88 166H0Zm1100 0V472l-181-43-133 92-74 179h388Z"
            />
            <path
              :class="$style.water"
              d="M461-20c-32 124 20 191-12 286-31 91-5 158 61 226 50 51 43 137 2 228h113c36-95 31-183-19-251-61-83-83-139-39-234 40-87 28-171 7-255H461Z"
            />
            <path
              :class="$style.primaryRoad"
              d="M-30 613C193 500 274 429 435 342S750 193 1135 40"
            />
            <path
              :class="$style.road"
              d="M64-20c130 137 154 291 119 475-12 64-2 153 35 265M1062-20C917 99 879 271 903 451c9 69-15 164-61 269M-30 199c205 58 365 30 541-36 181-68 362-35 624 59M-30 493c228-48 367-17 531 55 189 82 379 64 634-29"
            />
            <g :class="$style.placeLabels">
              <text x="555" y="310">TARTU</text><text x="92" y="517">ELVA</text>
              <text x="825" y="158">LUUNJA</text><text x="289" y="218">NÕO</text>
              <text x="734" y="547">PANGODI</text>
            </g>
            <template v-if="generated">
              <path
                :d="routePath"
                :class="$style.routeHalo"
                :style="{ transform: reversed ? 'scaleX(-1)' : undefined, transformOrigin: 'center' }"
              />
              <path
                :d="routePath"
                :class="$style.routeLine"
                :style="{ transform: reversed ? 'scaleX(-1)' : undefined, transformOrigin: 'center' }"
              />
            </template>
            <g transform="translate(103 442)" :class="$style.marker">
              <path d="M0 22S-18 5-18-8a18 18 0 1 1 36 0C18 5 0 22 0 22Z" />
              <circle cy="-8" r="6" />
            </g>
          </g>
        </svg>
        <div :class="$style.mapTools">
          <button type="button" :aria-label="t.mapLayers" @click="layerAlt = !layerAlt; action()">
            <TestIcon name="layers" />
          </button>
        </div>
        <span :class="$style.mapScale">{{ tr('m_1955c89cab') }}</span>
        <p :class="$style.mapCredit">{{ tr('m_c1c65eae91') }}</p>

        <nav v-if="generated" :class="$style.routeActions" :aria-label="t.routes">
          <button
            v-for="[icon, label] in [
              ['star', 'save'],
              ['lock', 'private'],
              ['share', 'share'],
              ['route', 'reverse'],
              ['download', 'export'],
            ]"
            :key="label"
            type="button"
            @click="label === 'reverse' ? (reversed = !reversed) : undefined; action()"
          >
            <TestIcon :name="icon" /><span>{{ t[label] }}</span>
          </button>
        </nav>
      </section>

      <section
        :class="[
          $style.detailPanel,
          { [$style.detailPanelVisible]: generated },
        ]"
      >
        <div :class="$style.detailTabs" role="tablist">
          <button
            v-for="tab in ['elevation', 'points', 'photos']"
            :key="tab"
            type="button"
            role="tab"
            :aria-selected="detailTab === tab"
            :class="{ [$style.activeDetailTab]: detailTab === tab }"
            @click="detailTab = tab"
          >
            {{ t[tab] }}
          </button>
        </div>
        <div v-if="detailTab === 'elevation'" :class="$style.elevationPanel">
          <svg viewBox="0 0 900 130" role="img" :aria-label="t.elevation">
            <path
              :class="$style.elevationFill"
              d="M0 121V84l31-22 34 15 41-39 39 45 48-8 44 18 39-31 49 34 42-17 45 21 47-42 43 33 43-20 48 25 42-36 41 31 52-24 42 22 51-29 38 34 55-19 47 26V121H0Z"
            />
            <path
              :class="$style.elevationLine"
              d="m0 84 31-22 34 15 41-39 39 45 48-8 44 18 39-31 49 34 42-17 45 21 47-42 43 33 43-20 48 25 42-36 41 31 52-24 42 22 51-29 38 34 55-19 47 26"
            />
          </svg>
          <dl :class="$style.metrics">
            <div><dt>{{ t.low }}</dt><dd>{{ tr('m_aacabcda50') }}</dd></div>
            <div><dt>{{ t.high }}</dt><dd>{{ tr('m_16fcd0f98e') }}</dd></div>
            <div><dt>{{ t.distance }}</dt><dd>{{ formatNumber(activeRoute.distance + 0.9) }} {{ tr('m_1f34503f65') }}</dd></div>
            <div><dt>{{ t.maxGrade }}</dt><dd>+12%</dd></div>
          </dl>
        </div>
        <p v-else :class="$style.detailEmpty">
          {{ detailTab === "points" ? t.attractions : `${t.photos} · 0` }}
        </p>
        <p :class="$style.prototypeNote">{{ t.prototypeNote }}</p>
      </section>
    </main>

    <div
      v-if="modal"
      :class="$style.modalBackdrop"
      role="presentation"
      @mousedown.self="modal = ''"
    >
      <section
        :class="$style.modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="test-modal-title"
      >
        <button
          :class="$style.modalClose"
          type="button"
          :aria-label="t.close"
          @click="modal = ''"
        >
          <TestIcon name="close" />
        </button>
        <p>{{ t.test }}</p>
        <h2 id="test-modal-title">
          {{ modal === "gravel" ? t.gravelTitle : t.aboutTitle }}
        </h2>
        <span>{{ modal === "gravel" ? t.gravelBody : t.aboutBody }}</span>
        <a v-if="modal === 'gravel'" href="https://routecycle.com/?utm_source=github_pages&amp;utm_medium=referral&amp;utm_campaign=routecycle_landing&amp;utm_content=test_gravel" style="display: inline-flex; align-items: center; min-height: 44px; margin-top: 16px; text-decoration: underline;">{{ t.gravelCta }}</a>
        <button :class="$style.primaryButton" type="button" @click="modal = ''">
          {{ t.close }}
        </button>
      </section>
    </div>
  </div>
</template>

<style module src="./test-frontend.css"></style>
