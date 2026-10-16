import { onMounted, ref, watch } from 'vue';
import en from '../locales/en.json';
import aliases from '../locales/source-aliases.json';
import { normalizeLanguage } from '../locales/languages';
const catalogFiles = import.meta.glob(['../locales/*.json', '!../locales/en.json', '!../locales/source-aliases.json'], { import: 'default' });
const catalogs = { en };
const localeLoading = ref(false);
const localeError = ref(false);
let selectionVersion = 0;
async function loadCatalog(code) {
  if (catalogs[code]) return;
  const loader = catalogFiles[`../locales/${code}.json`];
  if (!loader) throw new Error('Locale is unavailable');
  catalogs[code] = await loader();
}
function initialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const explicit = normalizeLanguage(new URL(window.location.href).searchParams.get('lang'));
  if (explicit) return explicit;
  try {
    const saved = normalizeLanguage(window.localStorage.getItem('routecycle-language'));
    if (saved) return saved;
  } catch { /* URL and in-memory choice still work without browser storage. */ }
  return window.navigator.languages?.map(normalizeLanguage).find(Boolean)
    || normalizeLanguage(window.navigator.language) || 'en';
}
const language = ref(initialLanguage());
function tr(key, params = {}) {
  const id = aliases[key] || key;
  const text = catalogs[language.value]?.[id] || en[id] || key;
  return String(text).replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match);
}
export async function initializeLanguage() {
  try { await loadCatalog(language.value); }
  catch { language.value = 'en'; localeError.value = true; }
}
function formatNumber(value) { return new Intl.NumberFormat(language.value).format(value); }
function formatDate(value) {
  return new Intl.DateTimeFormat(language.value, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}
export function useTranslations() { return { language, tr, localeLoading, localeError, formatNumber, formatDate }; }
export function useLanguage(metadata = {}) {
  function syncDocument() {
    document.documentElement.lang = language.value;
    const title = language.value === 'ru' && metadata.titleRu
      ? metadata.titleRu
      : metadata.titleEn ? tr(metadata.titleEn) : '';
    if (title) document.title = title;
    const description = language.value === 'ru' && metadata.descriptionRu
      ? metadata.descriptionRu
      : metadata.descriptionEn ? tr(metadata.descriptionEn) : '';
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      const element = document.querySelector(selector);
      if (element && description) element.content = description;
    }
    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle) socialTitle.content = document.title;
    const socialLocale = document.querySelector('meta[property="og:locale"]');
    if (socialLocale) socialLocale.content = language.value;
    try { window.localStorage.setItem('routecycle-language', language.value); } catch {}
  }
  async function toggleLanguage(code) {
    const next = normalizeLanguage(code);
    if (!next) return;
    const version = ++selectionVersion;
    localeLoading.value = true;
    localeError.value = false;
    try {
      await loadCatalog(next);
      if (version !== selectionVersion) return;
      language.value = next;
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(window.history.state, '', url);
    } catch { if (version === selectionVersion) localeError.value = true; }
    finally { if (version === selectionVersion) localeLoading.value = false; }
  }
  onMounted(syncDocument);
  watch(language, syncDocument, { flush: 'post' });
  return { language, toggleLanguage, syncDocument, tr };
}
