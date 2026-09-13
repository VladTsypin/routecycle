# Routecycle localization

## Scope

The landing, demo, blog index, content-admin shell and 404 interface support the
28 languages listed in `src/locales/languages.js`. This inventory matches the
product settings inspected on 2026-09-13. The product itself is not modified.

Article bodies remain editorially maintained in Russian and English. Other
interface languages show an explicit translated notice and an English article
wrapper with `lang="en"`. Translating a listing title is not a claim that its
article body is available in that language.

## Runtime

- `src/composables/useLanguage.js` owns the shared reactive language and `tr`.
- Message IDs and values are in `src/locales/<code>.json`.
- The old rendered-DOM text replacement has been removed. Vue renders messages
  directly, including route points, form states and accessible names.
- The selected catalog is loaded as a local static chunk; English is the
  fallback. No translation provider or production API is called by visitors.
- Selection order: supported `?lang=` parameter, saved preference, browser
  language, English. Regional variants are normalized; `no` maps to `nb`.
- `?lang=` is carried through internal navigation and preserved with anchors.
  It enables sharing a chosen interface language and also works when browser
  storage is unavailable. It does not synchronize the routecycle.com account.
- A failed language-chunk download keeps the previous interface language and
  displays a recoverable error. The native selector preserves keyboard support.
- Dates and decimal numbers use Intl formatting where they are generated.

## Editorial status

RU/EN source copy was retained where appropriate. Additional catalogs are
preliminary machine/AI translations, with manual corrections for proper names,
placeholders, surface/access warnings and missing translations. They have not
been reviewed by native speakers. Get that review before treating them as
publication-ready editorial translations, especially the risk and access copy.

Source text sent to the author-time translation helper contained only interface
copy and interpolation placeholders, never visitor form values or credentials.
The helper is not part of the site or build. It respects provider rate limits;
failed requests do not silently populate a catalog with English.

## Maintenance and checks

Add complete messages, not sentence fragments. Use named placeholders and keep
them identical across catalogs. Vue escapes their values; never use `v-html`
for translations. Keep names such as Routecycle, Garmin and OpenStreetMap.
Update all supported catalogs when adding an ID. The fallback is for resilience,
not a substitute for translated content.

Build the GitHub Pages variant with `GITHUB_ACTIONS=true` and run
`node scripts/check-locales.mjs` against the preview. Pass language codes for a
targeted subset. `PREVIEW_URL` can override the default preview URL.

The locale QA covers catalog completeness, placeholders, brand names, page
language, leaked keys, mobile/desktop overflow, map interactions, language
round trips, internal links and article-language disclosure. Reports go to
`output/playwright/locales/`. It does not certify linguistic quality.

Titles, descriptions and document language are localized in the browser.
`?lang=` variants are not pre-rendered SEO pages: social crawlers that do not
execute JavaScript still see the original HTML metadata. Language-specific
static SEO routes and hreflang exports are a separate future enhancement;
do not advertise them as implemented.

No commit, public deployment, product API integration or new analytics vendor
was part of this preview change.
