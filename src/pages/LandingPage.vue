<script setup>
import { useTranslations } from "../composables/useLanguage";
const { tr } = useTranslations();
import {
  computed,
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

import { internalHref } from "../utils/links";

import { routes } from "../data/demoRoutes";
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
  demoCta: "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=interactive_demo",
  garminCta: "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=garmin_feature",
  footerLogo:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=footer_logo",
  footerLink:
    "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_landing&utm_content=footer_link",
};

const routeKey = ref("balanced");
const settingsOpen = ref(false);
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
  titleEn: "m_52d7e46ad8",
  descriptionRu:
    "Генерируйте gravel-маршруты в Routecycle и отправляйте треки в Garmin. Изучите демонстрацию покрытия, доступа и рисков.",
  descriptionEn: "m_6a1d70f78d",
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
    (tr('m_dc12bec5d7'));
  const subject =
    tr('m_894c23932c');
  const body =
    tr('m_fcdf5f7d7c', { p0: interestDraft.email, p1: interestDraft.city, p2: interestDraft.bike, p3: feedback });

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
  settingsOpen.value = window.matchMedia('(min-width: 821px)').matches;
  try {
    const saved = JSON.parse(
      window.sessionStorage.getItem("routecycle-interest-draft") || "null",
    );
    if (saved && typeof saved === "object") {
      interestDraft.email = typeof saved.email === "string" ? saved.email : "";
      interestDraft.city = typeof saved.city === "string" ? saved.city : "";
      interestDraft.bike = ["gravel", "touring", "road"].includes(
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


</script>

<template>
  <a class="skip-link" href="#main-content">{{ tr('m_ac576a66d4') }}</a>
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
        :aria-label="tr('m_5797008dd2')"
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <nav :aria-label="tr('m_eb355944b9')" data-vue-i18n>
        <a href="#demo">{{ tr('m_38581d183b') }}</a>
        <a href="#method">{{ tr('m_9c870aa6e5') }}</a>
        <a href="#data">{{ tr('m_cec3a9b89b') }}</a>
        <a :href="internalHref('routes/estonia/raanitsa-kambja/')">{{ tr('m_2c5b669bcd') }}</a>
        <a :href="internalHref('blog/')">{{ tr('m_8c6bc09953') }}</a>
        <a :href="internalHref('test-frontend/')">{{ tr('m_8a2cc0673b') }}</a>
      </nav>
      <div class="header-actions">
        <LanguageToggle :language="language" @toggle="toggleLanguage" />
        <a class="header-cta" href="#waitlist">
          <span class="header-cta-label">{{ tr('m_98dc3d03c7') }}</span>
          <span class="header-cta-short-label">{{ tr('m_aac77df347') }}</span>
          <ArrowIcon />
        </a>
      </div>
    </header>

    <section id="top" class="hero">
      <Reveal class="hero-copy">
        <p class="eyebrow">{{ tr('m_47c7fda7ee') }}</p>
        <h1>{{ tr('m_f1fbc25993') }}</h1>
        <p class="hero-lede"> {{ tr('m_696407b334') }} </p>
        <div class="hero-actions">
          <a class="button button--primary" :href="routecycleLinks.heroCta"> {{ tr('m_80462d7fbe') }} <ArrowIcon />
          </a>
          <a class="text-link" href="#demo"> {{ tr('m_0d7e243e7c') }} </a>
        </div>
        <p class="hero-product-note" data-vue-i18n>{{ tr('m_66f504f527') }}</p>
      </Reveal>

      <Reveal class="hero-visual" :delay="0.06">
        <div class="hero-visual-topline">
          <span>{{ tr('m_d526b134a4') }}</span>
          <span>{{ tr('m_659429c3de') }}</span>
        </div>
        <RouteMap :route="routes.balanced" :language="language" show-alternative />
        <div class="route-ticket">
          <div>
            <span>{{ tr('m_adc74704d6') }}</span>
            <strong>Tartu → Elva</strong>
          </div>
          <div class="ticket-score">
            <span>{{ tr('m_523487a5de') }}</span>
            <strong>92</strong><small>/100</small>
          </div>
        </div>
      </Reveal>
    </section>

    <aside class="source-proof" :aria-label="tr('m_09608309b6')">
      <strong>{{ tr('m_09608309b6') }}</strong>
      <span>{{ tr('m_5c6490d63f') }}</span>
    </aside>

    <section class="ticker" :aria-label="tr('m_d5b67bc930')">
      <div>
        <span>{{ tr('m_471b5ad358') }}</span>
        <span>{{ tr('m_e5f273ed49') }}</span>
        <span>{{ tr('m_cf77412aed') }}</span>
        <span>{{ tr('m_e7c63e0fba') }}</span>
      </div>
    </section>

    <section id="data" class="problem-section">
      <div class="problem-copy">
        <h2>{{ tr('m_b8ef9556c2') }}</h2>
        <p> {{ tr('m_e890c092ac') }} </p>
      </div>
      <div class="stats-strip">
        <article v-for="[number, label, note] in issueStats" :key="number">
          <strong>{{ number }}</strong>
          <h3>{{ tr(label) }}</h3>
          <p>{{ tr(note) }}</p>
        </article>
      </div>
    </section>

    <section id="demo" class="planner-section">
      <div class="planner-heading">
        <div>
          <p class="eyebrow eyebrow--light" data-vue-i18n>{{ tr('m_a785bd30cf') }}</p>
          <h2>{{ tr('m_7aa098a373') }}</h2>
        </div>
        <p> {{ tr('m_352f427c14') }} </p>
      </div>
      <p class="demo-disclaimer" data-vue-i18n>{{ tr('m_87b6767b7f') }}</p>

      <div class="planner-shell">
        <aside class="planner-controls">
          <div class="control-block">
            <span class="control-label">{{ tr('m_27776a20b8') }}</span>
            <div
              class="route-tabs"
              role="group"
              :aria-label="tr('m_00ec8d5994')"
            >
              <button
                v-for="(item, key) in routes"
                :key="key"
                type="button"
                :class="{ 'is-active': routeKey === key }"
                :aria-pressed="routeKey === key"
                @click="routeKey = key"
              >
                {{ tr(item.label) }}
              </button>
            </div>
          </div>

          <details class="demo-settings" :open="settingsOpen" @toggle="settingsOpen = $event.target.open">
          <summary data-vue-i18n>{{ tr('m_2f5feaf19e') }}</summary>
          <div class="control-block">
            <span class="control-label">{{ tr('m_de07d07209') }}</span>
            <label class="switch-row">
              <span> {{ tr('m_0905f7f590') }} <small>surface · smoothness · tracktype</small>
              </span>
              <input v-model="surfaceCheck" type="checkbox" />
              <i aria-hidden="true" />
            </label>
            <label class="switch-row">
              <span> {{ tr('m_ec5ba0abb7') }} <small>access · bicycle · vehicle</small>
              </span>
              <input v-model="accessCheck" type="checkbox" />
              <i aria-hidden="true" />
            </label>
            <label class="switch-row">
              <span> {{ tr('m_b59b72be37') }} <small>{{ tr('m_1b11fc2122') }}</small>
              </span>
              <input v-model="showAlternative" type="checkbox" />
              <i aria-hidden="true" />
            </label>
          </div>

          <div class="confidence-card">
            <span>{{ tr('m_5dc4abcd4b') }}</span>
            <div class="confidence-value">
              <strong>{{ confidence }}</strong><small>/100</small>
            </div>
            <div class="meter">
              <i :style="{ transform: `scaleX(${confidence / 100})` }" />
            </div>
            <p>{{ tr(confidenceMessage) }}</p>
            <p class="confidence-note"> {{ tr('m_2bbe7b6df5') }} </p>
          </div>
          </details>
        </aside>

        <div class="planner-map">
          <RouteMap :route="route" :language="language" :show-alternative="showAlternative" interactive />
          <div class="route-summary">
            <div><span>{{ tr('m_b7bdf7a2d6') }}</span><strong>{{ tr(route.distance) }}</strong></div>
            <div><span>{{ tr('m_1df7b3d338') }}</span><strong>{{ route.gravel }}</strong></div>
            <div><span>{{ tr('m_85f321c095') }}</span><strong>{{ route.time }}</strong></div>
            <a :href="routecycleLinks.demoCta" data-vue-i18n>{{ tr('m_5227a6dd21') }} <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>

    <section id="garmin" class="garmin-section" data-vue-i18n>
      <div class="garmin-copy">
        <p class="eyebrow">ROUTECYCLE → GARMIN</p>
        <h2>{{ tr('m_eec6fa9647') }}</h2>
        <p>{{ tr('m_06f16dd0ae') }}</p>
        <a class="button button--primary" :href="routecycleLinks.garminCta">{{ tr('m_836564ef04') }} <ArrowIcon /></a>
      </div>
      <ol class="garmin-steps">
        <li><span>01</span><div><h3>{{ tr('m_f750a22e9d') }}</h3><p>{{ tr('m_a69c9f02bb') }}</p></div></li>
        <li><span>02</span><div><h3>{{ tr('m_65d76e57e9') }}</h3><p>{{ tr('m_cfcfbb934c') }}</p></div></li>
        <li><span>03</span><div><h3>{{ tr('m_f925edfe3a') }}</h3><p>{{ tr('m_3d2f48de0b') }}</p></div></li>
      </ol>
    </section>

    <section id="method" class="method-section">
      <div class="method-title">
        <h2>{{ tr('m_49b8c6ec84') }}</h2>
      </div>
      <div class="method-steps">
        <article>
          <div class="step-visual step-visual--scan" aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <h3>{{ tr('m_609931fbdb') }}</h3>
          <p>{{ tr('m_424270e0e8') }}</p>
          <code>way → tags → geometry</code>
        </article>
        <article>
          <div class="step-visual step-visual--signals" aria-hidden="true">
            <b>surface</b><b>access</b><b>smoothness</b>
          </div>
          <h3>{{ tr('m_1c31ab3b5a') }}</h3>
          <p>{{ tr('m_0697afc24f') }}</p>
          <code>7 {{ tr('m_42e4c07ce9') }}</code>
        </article>
        <article>
          <div class="step-visual step-visual--route" aria-hidden="true">
            <svg viewBox="0 0 240 100">
              <path d="M9 79 C53 22 82 82 121 47 S186 24 229 11" />
            </svg>
          </div>
          <h3>{{ tr('m_7773fe5c65') }}</h3>
          <p>{{ tr('m_2d432380c9') }}</p>
          <code>route + confidence</code>
        </article>
      </div>
    </section>

    <section id="waitlist" class="waitlist-section">
      <div class="waitlist-copy">
        <h2>{{ tr('m_a21516e448') }}</h2>
        <p> {{ tr('m_f3c2966dc0') }} </p>
      </div>
      <form class="waitlist-form" @submit.prevent="submitInterest">
        <div v-if="submitted" class="form-success" role="status">
          <span>✓</span>
          <h3>{{ tr('m_2115265871') }}</h3>
          <p v-if="clipboardCopied"> {{ tr('m_9f7b6ed6b4') }} </p>
          <p v-else-if="clipboardError"> {{ tr('m_2a951099f2') }} </p>
          <p v-else> {{ tr('m_e8f5aa789c') }} </p>
          <textarea
            class="prepared-draft"
            :value="preparedDraft"
            readonly
            :aria-label="tr('m_5801a1b9e3')"
          />
          <div class="form-success-actions">
            <button type="button" @click="copyPreparedDraft"> {{ tr('m_b0ac9cea86') }} </button>
            <a :href="`mailto:${feedbackEmail}`">{{ tr('m_d765809eb3') }}</a>
            <button type="button" @click="submitted = false"> {{ tr('m_fd9c61ac50') }} </button>
          </div>
        </div>
        <template v-else>
          <label>
            <span>{{ tr('m_969ccbd3cf') }}</span>
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
            <span>{{ tr('m_90064d5a73') }}</span>
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
            <span>{{ tr('m_8086e323e1') }}</span>
            <select v-model="interestDraft.bike" name="bike">
              <option value="gravel">{{ tr('m_1df7b3d338') }}</option>
              <option value="touring">{{ tr('m_996d7306c1') }}</option>
              <option value="road">{{ tr('m_a22e0b1fc3') }}</option>
            </select>
          </label>
          <label>
            <span>{{ tr('m_900f35641c') }}</span>
            <textarea
              v-model.trim="interestDraft.feedback"
              name="feedback"
              :placeholder="tr('m_2272450232')"
              maxlength="600"
            />
          </label>
          <button class="button button--primary wide-field" type="submit"> {{ tr('m_a215d9611b') }} <ArrowIcon />
          </button>
          <small class="wide-field feedback-privacy"> {{ tr('m_2b61f91d95') }} </small>
        </template>
      </form>
    </section>

    <section class="manifesto">
      <p>{{ tr('m_13a1d26c3f') }}</p>
      <h2>{{ tr('m_6589744391') }}</h2>
      <div class="manifesto-badges">
        <span>{{ tr('m_867390a125') }}</span>
        <span>{{ tr('m_6f0074b66a') }}</span>
        <span>{{ tr('m_ef54d6f9f9') }}</span>
      </div>
    </section>

    <footer>
      <a
        class="brand brand--footer"
        :href="routecycleLinks.footerLogo"
        :aria-label="tr('m_5797008dd2')"
      >
        <BrandMark />
        ROUTECYCLE
      </a>
      <p>
        <a class="footer-site-link" :href="routecycleLinks.footerLink">
          routecycle.com ↗
        </a>
        <span>{{ tr('m_c34ff1d892') }}</span>
      </p>
      <div data-vue-i18n>
        <a class="footer-route-link" :href="internalHref('routes/estonia/raanitsa-kambja/')">{{ tr('m_2c5b669bcd') }} <span aria-hidden="true">→</span></a>
        <a class="footer-blog-link" :href="internalHref('blog/')">{{ tr('m_8c6bc09953') }} <span aria-hidden="true">→</span></a>
        <a
          class="footer-test-front-cta"
          :href="internalHref('test-frontend/')"
        >
          {{ tr('m_8a2cc0673b') }}
        </a>
        <a class="footer-admin-link" :href="internalHref('admin/')">{{ tr('m_c1c224b03c') }}</a>
        <span>{{ tr('m_d9e8995aae') }}</span>
        <span>{{ tr('m_0a5e7ff96c') }}</span>
        <span>2026</span>
      </div>
    </footer>
  </main>
</template>
