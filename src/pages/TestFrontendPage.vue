<script setup>
import { computed, onMounted, ref, watch } from "vue";
import TestIcon from "../components/TestIcon.vue";
import { internalHref } from "../utils/links";

const copy = {
  ru: {
    back: "Вернуться на лендинг",
    title: "Спланируйте следующую поездку",
    test: "ТЕСТОВЫЙ ФРОНТ",
    info: "Информация о прототипе",
    language: "Переключить язык",
    support: "Поддержать проект",
    strava: "Открыть Routecycle",
    settings: "Сменить тему",
    parameters: "Параметры маршрута",
    road: "Шоссе",
    gravel: "Гравий",
    circle: "Круговой",
    oneWay: "В одну сторону",
    start: "Стартовая точка",
    stop: "Конечная точка",
    distance: "Дистанция",
    time: "Время",
    distanceKm: "Дистанция, км",
    attractions: "Искать достопримечательности",
    getRoutes: "Построить маршруты",
    getMoreRoutes: "Показать ещё маршруты",
    building: "Строим варианты…",
    routes: "Маршруты",
    current: "Текущие",
    favorites: "Избранное",
    history: "История",
    emptyFavorites: "Избранных маршрутов пока нет.",
    emptyHistory: "История появится после сохранения маршрута.",
    map: "Схематическая карта тестового маршрута",
    zoomIn: "Увеличить карту",
    zoomOut: "Уменьшить карту",
    mapLayers: "Слои карты",
    save: "Сохранить",
    private: "Приватность",
    share: "Поделиться",
    reverse: "Развернуть",
    export: "Экспорт",
    elevation: "Профиль высоты",
    points: "Точки интереса",
    photos: "Фото маршрута",
    low: "Низшая точка",
    high: "Высшая точка",
    maxGrade: "Макс. уклон",
    prototypeNote:
      "Фронтенд-прототип: маршрут и показатели демонстрационные. Проверяйте ограничения, доступ и состояние дороги перед поездкой.",
    aboutTitle: "О тестовом фронте",
    aboutBody:
      "Это адаптивная Vue-версия интерфейса Routecycle. Она не обращается к боевому маршрутизатору и ничего не сохраняет.",
    close: "Закрыть",
    gravelTitle: "Гравийный режим скоро появится",
    gravelBody:
      "Тестовая версия сохраняет сценарий предварительного уведомления без сбора email.",
    statusBuilt: "Показаны три демонстрационных маршрута.",
    statusAction: "Действие выполнено только в этой сессии прототипа.",
  },
  en: {
    back: "Back to the landing page",
    title: "Plan your next ride",
    test: "TEST FRONT",
    info: "About this prototype",
    language: "Switch language",
    support: "Support the project",
    strava: "Open Routecycle",
    settings: "Change theme",
    parameters: "Route parameters",
    road: "Road",
    gravel: "Gravel",
    circle: "Circle",
    oneWay: "One way",
    start: "Start point",
    stop: "Destination",
    distance: "Distance",
    time: "Time",
    distanceKm: "Distance in km",
    attractions: "Find attractions",
    getRoutes: "Get routes",
    getMoreRoutes: "Get More Routes",
    building: "Building options…",
    routes: "Routes",
    current: "Current",
    favorites: "Favorites",
    history: "History",
    emptyFavorites: "No favorite routes yet.",
    emptyHistory: "History appears after you save a route.",
    map: "Schematic map of the test route",
    zoomIn: "Zoom map in",
    zoomOut: "Zoom map out",
    mapLayers: "Map layers",
    save: "Save",
    private: "Private",
    share: "Share",
    reverse: "Reverse",
    export: "Export",
    elevation: "Elevation profile",
    points: "Points of interest",
    photos: "Route photos",
    low: "Lowest point",
    high: "Highest point",
    maxGrade: "Max grade",
    prototypeNote:
      "Frontend prototype: route and metrics are illustrative. Check restrictions, access and road conditions before riding.",
    aboutTitle: "About the test frontend",
    aboutBody:
      "This is a responsive Vue version of the Routecycle interface. It does not call the production router or persist data.",
    close: "Close",
    gravelTitle: "Gravel mode is coming soon",
    gravelBody:
      "The test version preserves the early-access notice without collecting an email address.",
    statusBuilt: "Three demonstration routes are shown.",
    statusAction: "The action was applied in this prototype session only.",
  },
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

const savedLanguage = window.localStorage.getItem("routecycle-language");
const language = ref(
  savedLanguage === "ru" || savedLanguage === "en" ? savedLanguage : "ru",
);
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
const t = computed(() => copy[language.value]);
const activeRoute = computed(() => routeOptions[selectedRoute.value]);
const routePath = computed(() =>
  shape.value === "oneWay"
    ? "M103 442 C234 383 271 281 402 302 C539 324 610 181 748 203 C846 219 911 139 983 96"
    : activeRoute.value.path,
);

function toggleLanguage() {
  language.value = language.value === "ru" ? "en" : "ru";
  status.value = "";
}

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

watch(language, (value) => {
  window.localStorage.setItem("routecycle-language", value);
  document.documentElement.lang = value;
  document.title =
    value === "en"
      ? "Routecycle — frontend prototype"
      : "Routecycle — тестовый интерфейс";
});

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
        <button
          :class="$style.languageButton"
          type="button"
          :aria-label="t.language"
          @click="toggleLanguage"
        >
          {{ language.toUpperCase() }}
        </button>
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
            <button :class="$style.iconButton" type="button" aria-label="Location">
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
            <span>{{ t.distanceKm }}</span><strong>{{ distance }} km</strong>
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
              <span><TestIcon name="route" />{{ option.distance }} km</span>
              <span><TestIcon name="mountain" />{{ option.ascent }} m</span>
              <span>
                <TestIcon name="clock" />
                {{ language === "ru" ? option.time : option.timeEn }}
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
        <span>ROUTECYCLE · 2026</span>
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
        <span :class="$style.mapScale">2 km</span>
        <p :class="$style.mapCredit">SCHEMATIC MAP · TEST DATA</p>

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
            <div><dt>{{ t.low }}</dt><dd>29 m</dd></div>
            <div><dt>{{ t.high }}</dt><dd>90 m</dd></div>
            <div><dt>{{ t.distance }}</dt><dd>{{ activeRoute.distance }}.9 km</dd></div>
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
        <button :class="$style.primaryButton" type="button" @click="modal = ''">
          {{ t.close }}
        </button>
      </section>
    </div>
  </div>
</template>

<style module src="./test-frontend.css"></style>
