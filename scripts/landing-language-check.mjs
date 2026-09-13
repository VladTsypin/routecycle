import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const url = process.argv[2] ?? 'http://127.0.0.1:4178/routecycle/';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ locale: 'ru-RU', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.addInitScript(() => {
    sessionStorage.setItem('routecycle-interest-draft', JSON.stringify({ bike: 'mtb' }));
  });
  await page.goto(url);
  for (const language of ['ru', 'en', 'ru']) {
    await page.locator('[data-language-toggle]').waitFor();
    if (await page.locator('html').getAttribute('lang') !== language) {
      await page.locator('[data-language-toggle] select').selectOption(language);
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
    }
    assert.equal(await page.locator('select[name="bike"]').inputValue(), 'gravel');
    assert.deepEqual(await page.locator('select[name="bike"] option').evaluateAll(options => options.map(option => option.value)), ['gravel', 'touring', 'road']);
    assert.equal(/mtb/i.test(await page.locator('main').innerText()), false);
    const expected = language === 'en' ? ['Blog →', 'Demo', 'Admin'] : ['Блог →', 'Демо', 'Админка'];
    const selectors = ['.footer-blog-link', '.footer-test-front-cta', '.footer-admin-link'];
    const titles = language === 'en'
      ? ['Routes, data and what hides between the points.', 'Route parameters', 'Content management.']
      : ['Маршруты, данные и то, что скрыто между точками.', 'Параметры маршрута', 'Управление контентом.'];
    for (let i = 0; i < selectors.length; i++) {
      assert.equal((await page.locator(selectors[i]).innerText()).replace(/\s+/g, ' ').trim(), expected[i]);
      await page.locator(selectors[i]).click();
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
      await page.locator('h1').waitFor();
      assert.equal((await page.locator('h1').innerText()).trim(), titles[i]);
      await page.goBack();
      await page.locator(selectors[i]).waitFor();
      assert.equal(await page.locator('html').getAttribute('lang'), language);
    }
  }
  console.log(JSON.stringify({ navigations: 9, languageRoundTrip: 'RU → EN → RU', passed: true }));
} finally { await browser.close(); }
