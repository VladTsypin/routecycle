import { onMounted, ref, watch } from "vue";

function initialLanguage() {
  if (typeof window === "undefined") return "ru";
  const saved = window.localStorage.getItem("routecycle-language");
  if (saved === "ru" || saved === "en") return saved;
  return window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function useLanguage(metadata = {}) {
  const language = ref(initialLanguage());

  const syncDocument = () => {
    const isEnglish = language.value === "en";
    document.documentElement.lang = language.value;
    if (metadata.titleRu || metadata.titleEn) {
      document.title = isEnglish ? metadata.titleEn : metadata.titleRu;
    }
    const description = document.querySelector('meta[name="description"]');
    const nextDescription = isEnglish
      ? metadata.descriptionEn
      : metadata.descriptionRu;
    if (description && nextDescription) description.content = nextDescription;
    window.localStorage.setItem("routecycle-language", language.value);
  };

  const toggleLanguage = () => {
    language.value = language.value === "ru" ? "en" : "ru";
  };

  onMounted(syncDocument);
  watch(language, syncDocument);

  return { language, toggleLanguage, syncDocument };
}
