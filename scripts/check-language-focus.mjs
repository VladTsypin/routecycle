import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = process.argv[2] || 'http://127.0.0.1:4178/routecycle/';
const output = 'output/playwright/language-focus';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${url}?lang=et`);
    const select = page.locator('.language-picker select');
    await select.waitFor();
    // Enter with the keyboard so :focus-visible is exercised, not only focus().
    for (let count = 0; count < 30; count++) {
      await page.keyboard.press('Tab');
      if (await select.evaluate(el => el === document.activeElement)) break;
    }
    assert.ok(await select.evaluate(el => el.matches(':focus-visible')));
    const checkFocus = async () => {
      const state = await select.evaluate(el => {
        const s = getComputedStyle(el);
        const frame = getComputedStyle(el.parentElement, '::before');
        return { outline: s.outlineStyle, frameOutline: frame.outlineWidth,
          frameOffset: frame.outlineOffset, height: el.getBoundingClientRect().height };
      });
      assert.equal(state.outline, 'none');
      assert.equal(state.frameOutline, '2px');
      assert.equal(state.frameOffset, '-2px');
      assert.ok(state.height >= 44);
    };
    await checkFocus();
    await page.locator('.language-picker').screenshot({ path: `${output}/keyboard-${width}.png` });
    await select.click();
    await checkFocus();
    await page.screenshot({ path: `${output}/open-${width}.png` });
    await page.keyboard.press('Escape');
    for (const language of ['ru', 'en', 'et']) {
      await select.selectOption(language);
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
    }
    await page.emulateMedia({ forcedColors: 'active' });
    await select.focus();
    await checkFocus();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.close();
  }
  console.log(JSON.stringify({ passed: true, widths: [390, 1440], checks: ['keyboard', 'open', 'languages', 'forced-colors'] }));
} finally {
  await browser.close();
}
