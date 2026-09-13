// Same inventory as routecycle.com/settings; observed 2026-09-13.
export const languages = [
  ['en', 'English'], ['ca', 'Català'], ['cs', 'Čeština'], ['da', 'Dansk'],
  ['de', 'Deutsch'], ['et', 'Eesti'], ['es', 'Español'], ['fr', 'Français'],
  ['hr', 'Hrvatski'], ['it', 'Italiano'], ['lv', 'Latviešu'], ['lt', 'Lietuvių'],
  ['hu', 'Magyar'], ['nl', 'Nederlands'], ['nb', 'Norsk bokmål'], ['pl', 'Polski'],
  ['pt', 'Português'], ['ro', 'Română'], ['sk', 'Slovenčina'], ['sl', 'Slovenščina'],
  ['fi', 'Suomi'], ['sv', 'Svenska'], ['tr', 'Türkçe'], ['el', 'Ελληνικά'],
  ['bg', 'Български'], ['ru', 'Русский'], ['sr', 'Српски'], ['uk', 'Українська'],
].map(([code, name]) => ({ code, name }));
export function normalizeLanguage(value) {
  const code = String(value || '').toLowerCase().replace('_', '-').split('-')[0];
  const normalized = code === 'no' ? 'nb' : code;
  return languages.some(item => item.code === normalized) ? normalized : null;
}
