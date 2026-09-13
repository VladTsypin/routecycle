import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://127.0.0.1:4178/routecycle/';
const output = 'output/playwright/landing-interactive';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const reports = [];
try {
  for (const width of [390, 768, 1024, 1440]) {
    for (const language of ['ru', 'en']) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, locale: language === 'ru' ? 'ru-RU' : 'en-GB', reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const apiCalls = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', request => {
        if (['xhr', 'fetch'].includes(request.resourceType()) && !request.url().startsWith(new URL(url).origin)) apiCalls.push(request.url());
      });
      await page.goto(url);
      await page.locator('.map-risk-button').first().waitFor();
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
      for (let route = 0; route < 3; route++) {
        await page.locator('.route-tabs button').nth(route).click();
        assert.equal(await page.locator('.route-tabs button').nth(route).getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.map-risk-button').count(), 3);
        for (let marker = 0; marker < 3; marker++) {
          const button = page.locator('.map-risk-button').nth(marker);
          await button.focus();
          await page.keyboard.press(marker % 2 ? 'Space' : 'Enter');
          assert.equal(await button.getAttribute('aria-expanded'), 'true');
          assert.ok((await page.locator('.map-detail-facts dd').first().innerText()).length);
          const box = await button.boundingBox();
          assert.ok(box.width >= 44 && box.height >= 44);
          const panel = await page.locator('.map-detail').boundingBox();
          const map = await page.locator('.map-stage--interactive').boundingBox();
          assert.ok(panel.y >= map.y + map.height - 1);
        }
      }
      const id = await page.locator('.map-risk-button[aria-expanded="true"]').getAttribute('data-risk-id');
      await page.locator('[data-language-toggle] select').selectOption(language === 'ru' ? 'en' : 'ru');
      await page.waitForFunction(lang => document.documentElement.lang !== lang, language);
      assert.equal(await page.locator('.map-risk-button[aria-expanded="true"]').getAttribute('data-risk-id'), id);
      const translatedTitle = await page.locator('.map-detail h3').innerText();
      assert.equal(translatedTitle, language === 'ru' ? 'Information available' : 'Данные указаны');
      await page.locator('[data-language-toggle] select').selectOption(language);
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
      await page.locator('.map-detail-heading button').click();
      assert.equal(await page.locator('.map-risk-button[aria-expanded="true"]').count(), 0);
      assert.equal(await page.locator('.map-risk-button:focus').count(), 1);
      const checks = page.locator('.planner-controls input[type="checkbox"]');
      if (!(await page.locator('.demo-settings').evaluate(el => el.open))) await page.locator('.demo-settings summary').click();
      const before = await page.locator('.confidence-value strong').innerText();
      await page.locator('.switch-row').nth(0).click();
      assert.equal(await checks.nth(0).isChecked(), false);
      assert.notEqual(await page.locator('.confidence-value strong').innerText(), before);
      await checks.nth(0).focus();
      await page.keyboard.press('Space');
      assert.equal(await checks.nth(0).isChecked(), true);
      await page.locator('.switch-row').nth(2).click();
      assert.equal(await page.locator('.map-stage--interactive .route-alternative').count(), 0);
      await page.locator('.switch-row').nth(2).click();
      const href = await page.locator('#garmin a').getAttribute('href');
      assert.equal(new URL(href).searchParams.get('utm_content'), 'garmin_feature');
      assert.equal(new URL(href).hostname, 'routecycle.com');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(apiCalls, []);
      assert.deepEqual(errors, []);
      await page.locator('.route-tabs button').first().click();
      await page.locator('.map-risk-button').nth(1).click();
      if (width <= 820) await page.locator('.demo-settings summary').click();
      if ([390, 1440].includes(width)) {
        await page.locator('#demo').screenshot({ path: `${output}/demo-${language}-${width}.png` });
        await page.locator('#garmin').screenshot({ path: `${output}/garmin-${language}-${width}.png` });
        await page.screenshot({ path: `${output}/page-${language}-${width}.png`, fullPage: true });
      }
      reports.push({ width, language, passed: true, errors, apiCalls });
      await context.close();
    }
  }
} finally { await browser.close(); }
await writeFile(`${output}/report.json`, JSON.stringify(reports, null, 2));
console.log(JSON.stringify({ checked: reports.length, passed: reports.every(r => r.passed) }, null, 2));
