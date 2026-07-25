<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import ArrowIcon from "../components/ArrowIcon.vue";
import BrandMark from "../components/BrandMark.vue";
import LanguageToggle from "../components/LanguageToggle.vue";
import Reveal from "../components/Reveal.vue";
import RouteMap from "../components/RouteMap.vue";
import { useLanguage } from "../composables/useLanguage";
import { applyInterfaceLanguage } from "../i18n";
import { internalHref } from "../utils/links";

const routes = {
  balanced: {
    label: "Сбалансированный",
    distance: "42,8 км",
    gravel: "68%",
    confidence: 92,
    time: "2:24",
    accent: "#f0542d",
    path: "M54 398 C116 352 123 285 206 279 C291 273 318 351 392 320 C458 292 448 199 528 180 C614 158 661 238 738 193 C796 160 815 99 898 82",
    altPath: "M54 398 C126 370 157 319 226 320 C309 322 338 388 412 352 C477 320 483 239 551 215 C630 187 688 249 756 214 C819 181 833 111 898 82",
    risks: [
      { x: 204, y: 280, level: "review", label: "Покрытие не указано" },
      { x: 529, y: 180, level: "warn", label: "ground · проверить" },
      { x: 738, y: 194, level: "safe", label: "gravel · подтверждено" },
    ],
  },
  scenic: {
    label: "Красивый",
    distance: "48,1 км",
    gravel: "81%",
    confidence: 84,
    time: "2:46",
    accent: "#3c6df0",
    path: "M54 398 C102 329 167 370 208 300 C251 227 312 245 350 188 C394 120 460 145 508 220 C550 287 626 290 659 211 C686 145 751 130 783 181 C817 235 851 141 898 82",
    altPath: "M54 398 C121 372 145 326 211 313 C290 297 321 352 388 323 C449 296 466 223 530 204 C612 179 664 248 741 213 C810 181 833 112 898 82",
    risks: [
      { x: 208, y: 300, level: "safe", label: "forest track" },
      { x: 350, y: 188, level: "warn", label: "grade4 · медленно" },
      { x: 659, y: 211, level: "review", label: "surface=missing" },
    ],
  },
  safe: {
    label: "Надёжный",
    distance: "45,3 км",
    gravel: "54%",
    confidence: 98,
    time: "2:18",
    accent: "#158367",
    path: "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    altPath: "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    risks: [
      { x: 221, y: 344, level: "safe", label: "gravel · подтверждено" },
      { x: 567, y: 221, level: "safe", label: "доступ разрешён" },
      { x: 766, y: 196, level: "safe", label: "smoothness=good" },
    ],
  },
};

const issueStats = [
  ["13 578", "подозрительных участков", "в исследовательском наборе по Эстонии"],
  ["1 016", "неопределённых отрезков", "в тестовой зоне Тарту"],
  ["7", "групп сигналов", "от доступа до видимости тропы"],
];

const feedbackEmail = ["gotlib58", "gmail.com"].join("@");
const routecycleLinks = {
  headerLogo:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=header_logo",
  heroCta:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=hero_cta",
  footerLogo:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=footer_logo",
  footerLink:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=footer_link",
};

const routeKey = ref("balanced");
const showAlternative = ref(true);
const surfaceCheck = ref(true);
const accessCheck = ref(true);
const submitted = ref(false);
const preparedDraft = ref("");
const clipboardCopied = ref(false);
const clipboardError = ref(false);
const scrollProgress = ref(0);
const interestDraft = reactive({
  email: "",
  city: "",
  bike: "gravel",
  feedback: "",
});

const { language, toggleLanguage } = useLanguage({
  titleRu: "Routecycle: маршруты без неприятных сюрпризов",
  titleEn: "Routecycle: cycling routes without unpleasant surprises",
  descriptionRu:
    "Routecycle проверяет данные OpenStreetMap и помогает строить веломаршруты с понятным покрытием, доступом и уровнем риска.",
  descriptionEn:
    "Routecycle checks OpenStreetMap data and helps plan cycling routes with clear surface, access and risk information.",
});

const route = computed(() => routes[routeKey.value]);
const confidence = computed(() => {
  const adjustment =
    (surfaceCheck.value ? 0 : -11) + (accessCheck.value ? 0 : -7);
  return Math.max(60, route.value.confidence + adjustment);
});
const confidenceMessage = computed(() => {
  if (confidence.value >= 95) {
    return "Учтено большинство доступных сигналов.";
  }
  if (confidence.value >= 85) {
    return "Часть участков требует проверки на месте.";
  }
  return "Данных недостаточно: проверьте маршрут вручную.";
});

function updateScrollProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = height > 0 ? window.scrollY / height : 0;
}

function syncLanguage() {
  nextTick(() => applyInterfaceLanguage(language.value));
}

function scrollToFeedback() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.querySelector("#waitlist")?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
  });
}

async function copyPreparedDraft() {
  if (!navigator.clipboard || !preparedDraft.value) {
    clipboardCopied.value = false;
    clipboardError.value = true;
    return;
  }
  try {
    await navigator.clipboard.writeText(preparedDraft.value);
    clipboardCopied.value = true;
    clipboardError.value = false;
  } catch {
    clipboardCopied.value = false;
    clipboardError.value = true;
  }
}

async function submitInterest() {
  const feedback =
    interestDraft.feedback ||
    (language.value === "en" ? "Not specified" : "Не указано");
  const subject =
    language.value === "en"
      ? "Routecycle: rider interest"
      : "Routecycle: интерес велосипедиста";
  const body =
    language.value === "en"
      ? `I'm interested in testing Routecycle.\n\nEmail: ${interestDraft.email}\nCity: ${interestDraft.city}\nBike: ${interestDraft.bike}\nWhat I want Routecycle to check: ${feedback}`
      : `Мне интересно протестировать Routecycle.\n\nПочта: ${interestDraft.email}\nГород: ${interestDraft.city}\nВелосипед: ${interestDraft.bike}\nЧто должен проверять Routecycle: ${feedback}`;

  preparedDraft.value = `${subject}\n\n${body}`;
  clipboardCopied.value = false;
  clipboardError.value = false;
  submitted.value = true;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(preparedDraft.value);
      clipboardCopied.value = true;
    } catch {
      clipboardError.value = true;
    }
  } else {
    clipboardError.value = true;
  }

  window.location.href = `mailto:${feedbackEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

onMounted(() => {
  try {
    const saved = JSON.parse(
      window.sessionStorage.getItem("routecycle-interest-draft") || "null",
    );
    if (saved && typeof saved === "object") {
      interestDraft.email = typeof saved.email === "string" ? saved.email : "";
      interestDraft.city = typeof saved.city === "string" ? saved.city : "";
      interestDraft.bike = ["gravel", "touring", "mtb", "road"].includes(
        saved.bike,
      )
        ? saved.bike
        : "gravel";
      interestDraft.feedback =
        typeof saved.feedback === "string" ? saved.feedback : "";
    }
  } catch {
    window.sessionStorage.removeItem("routecycle-interest-draft");
  }
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  syncLanguage();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});

watch(
  interestDraft,
  (value) => {
    window.sessionStorage.setItem(
      "routecycle-interest-draft",
      JSON.stringify(value),
    );
  },
  { deep: true },
);

watch(
  [
    language,
    routeKey,
    showAlternative,
    surfaceCheck,
    accessCheck,
    submitted,
    clipboardCopied,
    clipboardError,
  ],
  syncLanguage,
  { flush: "post" },
);
</script>

<template>
  <a class="skip-link" href="#main-content">Перейти к содержимому</a>
  <main id="main-content">
    <div
      class="scroll-progress"
      :style="{ transform: `scaleX(${scrollProgress})` }"
      aria-hidden="true"
    />

    <header class="site-header">
      <a
        class="brand"
        :href="routecycleLinks.headerLogo"
        aria-label="Открыть Routecycle"
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <nav aria-label="Основная навигация">
        <a href="#demo">Планировщик</a>
        <a href="#method">Как работает</a>
        <a href="#data">Данные</a>
        <a :href="internalHref('blog/')">Блог</a>
        <a :href="internalHref('test-frontend/')">Демо</a>
      </nav>
      <div class="header-actions">
        <LanguageToggle :language="language" @toggle="toggleLanguage" />
        <a class="header-cta" href="#waitlist">
          <span class="header-cta-label">Оставить отклик</span>
          <span class="header-cta-short-label">Отклик</span>
          <ArrowIcon />
        </a>
      </div>
    </header>

    <section id="top" class="hero">
      <Reveal class="hero-copy">
        <p class="eyebrow">Маршрут с объяснением рисков</p>
        <h1>
          Приключение
          <br />
          без <em>сюрпризов.</em>
        </h1>
        <p class="hero-lede">
          Routecycle замечает то, что пропускают обычные планировщики: закрытые
          проезды, непроезжаемые тропы и неизвестное покрытие.
        </p>
        <div class="hero-actions">
          <a class="button button--primary" :href="routecycleLinks.heroCta">
            Протестировать маршрут <ArrowIcon />
          </a>
          <a class="text-link" :href="internalHref('test-frontend/')">
            Открыть демо
          </a>
        </div>
      </Reveal>

      <Reveal class="hero-visual" :delay="0.06">
        <div class="hero-visual-topline">
          <span>ROUTE PREVIEW</span>
          <span>LIVE / 58.37N</span>
        </div>
        <RouteMap :route="routes.balanced" show-alternative />
        <div class="route-ticket">
          <div>
            <span>Маршрут</span>
            <strong>Tartu → Elva</strong>
          </div>
          <div class="ticket-score">
            <span>Полнота</span>
            <strong>92</strong><small>/100</small>
          </div>
        </div>
      </Reveal>
    </section>

    <aside class="source-proof" aria-label="Основа оценки">
      <strong>Основа оценки</strong>
      <span>OpenStreetMap · Estonia · данные могут быть неполными</span>
    </aside>

    <section class="ticker" aria-label="Преимущества">
      <div>
        <span>проверка покрытия</span>
        <span>контроль доступа</span>
        <span>оценка проезжаемости</span>
        <span>данные openstreetmap</span>
      </div>
    </section>

    <section id="data" class="problem-section">
      <div class="problem-copy">
        <h2>
          Карта показывает линию.
          <br />
          Мы показываем, <em>что вас ждёт.</em>
        </h2>
        <p>
          Участок может выглядеть идеально на экране, но закончиться песком,
          закрытым шлагбаумом или тропой, по которой велосипед придётся нести.
          Routecycle собирает сигналы качества в одну понятную оценку.
        </p>
      </div>
      <div class="stats-strip">
        <article v-for="[number, label, note] in issueStats" :key="number">
          <strong>{{ number }}</strong>
          <h3>{{ label }}</h3>
          <p>{{ note }}</p>
        </article>
      </div>
    </section>

    <section id="demo" class="planner-section">
      <div class="planner-heading">
        <div>
          <p class="eyebrow eyebrow--light">Живой прототип</p>
          <h2>Выберите, как хотите ехать.</h2>
        </div>
        <p>
          Переключайте характер поездки и правила проверки. Маршрут,
          предупреждения и уровень уверенности меняются вместе с выбором.
        </p>
      </div>

      <div class="planner-shell">
        <aside class="planner-controls">
          <div class="control-block">
            <span class="control-label">Характер маршрута</span>
            <div
              class="route-tabs"
              role="tablist"
              aria-label="Вариант маршрута"
            >
              <button
                v-for="(item, key) in routes"
                :key="key"
                type="button"
                :class="{ 'is-active': routeKey === key }"
                role="tab"
                :aria-selected="routeKey === key"
                @click="routeKey = key"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div class="control-block">
            <span class="control-label">Проверки</span>
            <label class="switch-row">
              <span>
                Покрытие
                <small>surface · smoothness · tracktype</small>
              </span>
              <input v-model="surfaceCheck" type="checkbox" />
              <i aria-hidden="true" />
            </label>
            <label class="switch-row">
              <span>
                Доступ
                <small>access · bicycle · vehicle</small>
              </span>
              <input v-model="accessCheck" type="checkbox" />
              <i aria-hidden="true" />
            </label>
            <label class="switch-row">
              <span>
                Альтернатива
                <small>показать запасной путь</small>
              </span>
              <input v-model="showAlternative" type="checkbox" />
              <i aria-hidden="true" />
            </label>
          </div>

          <div class="confidence-card">
            <span>Полнота проверки</span>
            <div class="confidence-value">
              <strong>{{ confidence }}</strong><small>/100</small>
            </div>
            <div class="meter">
              <i :style="{ transform: `scaleX(${confidence / 100})` }" />
            </div>
            <p>{{ confidenceMessage }}</p>
            <p class="confidence-note">
              Не гарантия безопасности, законности или текущего состояния.
            </p>
          </div>
        </aside>

        <div class="planner-map">
          <RouteMap :route="route" :show-alternative="showAlternative" />
          <div class="route-summary">
            <div><span>Дистанция</span><strong>{{ route.distance }}</strong></div>
            <div><span>Гравий</span><strong>{{ route.gravel }}</strong></div>
            <div><span>В пути</span><strong>{{ route.time }}</strong></div>
            <button type="button" @click="scrollToFeedback">
              Оставить отклик <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="method" class="method-section">
      <div class="method-title">
        <h2>От линии на карте<br />до уверенного старта.</h2>
      </div>
      <div class="method-steps">
        <article>
          <div class="step-visual step-visual--scan" aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <h3>Сканируем маршрут</h3>
          <p>Берём геометрию и теги каждого участка из OpenStreetMap.</p>
          <code>way → tags → geometry</code>
        </article>
        <article>
          <div class="step-visual step-visual--signals" aria-hidden="true">
            <b>surface</b><b>access</b><b>mtb:scale</b><b>smoothness</b>
          </div>
          <h3>Читаем сигналы</h3>
          <p>Сопоставляем доступ, покрытие, сложность и видимость тропы.</p>
          <code>7 signal families</code>
        </article>
        <article>
          <div class="step-visual step-visual--route" aria-hidden="true">
            <svg viewBox="0 0 240 100">
              <path d="M9 79 C53 22 82 82 121 47 S186 24 229 11" />
            </svg>
          </div>
          <h3>Предлагаем путь</h3>
          <p>Показываем риск и альтернативу, не скрывая причину решения.</p>
          <code>route + confidence</code>
        </article>
      </div>
    </section>

    <section id="waitlist" class="waitlist-section">
      <div class="waitlist-copy">
        <h2>Хотите проверить<br />свой маршрут?</h2>
        <p>
          Оставьте короткий отклик. Мы подготовим письмо с вашим городом, типом
          велосипеда и пожеланием к проверке маршрута.
        </p>
      </div>
      <form class="waitlist-form" @submit.prevent="submitInterest">
        <div v-if="submitted" class="form-success" role="status">
          <span>✓</span>
          <h3>Черновик подготовлен.</h3>
          <p v-if="clipboardCopied">
            Текст письма скопирован. Если почтовое приложение не открылось,
            вставьте его вручную.
          </p>
          <p v-else-if="clipboardError">
            Автокопирование недоступно. Выделите текст в поле ниже и скопируйте
            его вручную.
          </p>
          <p v-else>
            Если почтовое приложение не открылось, скопируйте текст письма и
            отправьте его вручную.
          </p>
          <textarea
            class="prepared-draft"
            :value="preparedDraft"
            readonly
            aria-label="Текст письма"
          />
          <div class="form-success-actions">
            <button type="button" @click="copyPreparedDraft">
              Скопировать текст
            </button>
            <a :href="`mailto:${feedbackEmail}`">Написать вручную</a>
            <button type="button" @click="submitted = false">
              Изменить данные
            </button>
          </div>
        </div>
        <template v-else>
          <label>
            <span>Почта</span>
            <input
              v-model.trim="interestDraft.email"
              name="email"
              type="email"
              placeholder="rider@example.com"
              autocomplete="email"
              maxlength="254"
              required
            />
          </label>
          <label>
            <span>Ваш город</span>
            <input
              v-model.trim="interestDraft.city"
              name="city"
              type="text"
              placeholder="Tartu, Tallinn, Riga…"
              autocomplete="address-level2"
              maxlength="80"
              required
            />
          </label>
          <label>
            <span>На чём вы ездите?</span>
            <select v-model="interestDraft.bike" name="bike">
              <option value="gravel">Gravel</option>
              <option value="touring">Touring</option>
              <option value="mtb">MTB</option>
              <option value="road">Road</option>
            </select>
          </label>
          <label>
            <span>Что важно проверить? (необязательно)</span>
            <textarea
              v-model.trim="interestDraft.feedback"
              name="feedback"
              placeholder="Покрытие, закрытые проезды, сложность тропы…"
              maxlength="600"
            />
          </label>
          <button class="button button--primary wide-field" type="submit">
            Подготовить письмо <ArrowIcon />
          </button>
          <small class="wide-field feedback-privacy">
            Откроется ваше почтовое приложение. Сообщение не отправляется
            автоматически.
          </small>
        </template>
      </form>
    </section>

    <section class="manifesto">
      <p>Не делаем маршрут короче любой ценой.</p>
      <h2>
        Делаем так, чтобы вы знали,
        <br />
        <em>куда сворачиваете.</em>
      </h2>
      <div class="manifesto-badges">
        <span>NO BLACK BOX</span>
        <span>OSM NATIVE</span>
        <span>RIDER FIRST</span>
      </div>
    </section>

    <footer>
      <a
        class="brand brand--footer"
        :href="routecycleLinks.footerLogo"
        aria-label="Открыть Routecycle"
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <p>
        <a class="footer-site-link" :href="routecycleLinks.footerLink">
          routecycle.com ↗
        </a>
        <span>Маршруты без неприятных сюрпризов.</span>
      </p>
      <div>
        <a class="footer-blog-link" :href="internalHref('blog/')">Блог →</a>
        <a
          class="footer-test-front-cta"
          :href="internalHref('test-frontend/')"
        >
          Демо
        </a>
        <a class="footer-admin-link" :href="internalHref('admin/')">Админка</a>
        <span>PROTOTYPE 01</span>
        <span>DATA: OPENSTREETMAP</span>
        <span>2026</span>
      </div>
    </footer>
  </main>
</template>
