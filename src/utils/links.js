import { useTranslations } from '../composables/useLanguage';

export function internalHref(path = "") {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, "");
  const { language } = useTranslations();
  const [pathname, hash] = cleanPath.split('#');
  return `${base}${pathname}${pathname.includes('?') ? '&' : '?'}lang=${language.value}${hash ? `#${hash}` : ''}`;
}
