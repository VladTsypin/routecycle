import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { languages } from '../src/locales/languages.js';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4178/routecycle/';
const requested=process.argv.slice(2);
const selected=languages.filter(l=>!requested.length||requested.includes(l.code));
const en=JSON.parse(fs.readFileSync('src/locales/en.json','utf8'));
const sourceKeys=Object.keys(en);
const aliases=JSON.parse(fs.readFileSync('src/locales/source-aliases.json','utf8'));
const report=[];const failures=[];
fs.mkdirSync('output/playwright/locales',{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try {
  for(const {code}of selected) {
    const messages=JSON.parse(fs.readFileSync(`src/locales/${code}.json`,'utf8'));
    const missing=sourceKeys.filter(k=>!messages[k]);
    if(missing.length)failures.push({code,missing});
    for(const k of sourceKeys) {
      if(!messages[k])continue;
      const tokens=s=>(s.match(/\{\w+\}/g)||[]).sort();
      if(JSON.stringify(tokens(en[k]))!==JSON.stringify(tokens(messages[k])))failures.push({code,key:k,placeholderMismatch:true});
      for(const brand of ['Routecycle','OpenStreetMap','Garmin','Strava','GitHub']) {
        if(en[k].includes(brand)&&!messages[k].includes(brand))failures.push({code,key:k,missingBrand:brand});
      }
    }
    for(const width of [390,1440]) {
      const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
      const page=await context.newPage();const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      for(const path of process.env.LOCALES_HOME_ONLY ? [''] : ['', 'blog/', 'admin/', 'test-frontend/','blog/why-a-line-is-not-a-route/']) {
        await page.goto(`${base}${path}?lang=${code}`,{waitUntil:'networkidle'});
        await page.locator('.language-picker select').waitFor();
        const lang=await page.locator('html').getAttribute('lang');
        const text=await page.locator('body').innerText();
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
        const leakedKeys=/m_[0-9a-f]{10}|RCBRAND\d|\[\d{3}\]|\{(?:p\d|number|title)\}/.test(text);
        const title=await page.title();
        let articleNotice=true;
        if(path.startsWith('blog/why-')&&!['en','ru'].includes(code))articleNotice=await page.locator('.article-language-note').isVisible();
        report.push({code,width,path,lang,overflow,leakedKeys,title,articleNotice,errors:[...errors]});
        if(lang!==code||overflow||leakedKeys||!articleNotice||errors.length)failures.push(report.at(-1));
        if(path==='') {
          const label=await page.locator('.footer-blog-link').innerText();
          const expected=messages[aliases.Blog]||en[aliases.Blog];
          assert.equal(label.replace(/\s*→\s*/,'').trim(),expected);
          await page.locator('.map-risk-button').first().click();
          assert.ok((await page.locator('.map-detail h3').innerText()).trim());
          await page.locator('.route-tabs button').nth(1).click();
          assert.equal(await page.locator('.map-risk-button[aria-expanded="true"]').count(),0);
          // Switch away and back: selected section must survive translation.
          await page.locator('.map-risk-button').first().click();
          await page.locator('.language-picker select').selectOption(code==='en'?'ru':'en');
          await page.waitForFunction(c=>document.documentElement.lang===c,code==='en'?'ru':'en');
          await page.locator('.language-picker select').selectOption(code);
          await page.waitForFunction(c=>document.documentElement.lang===c,code);
          assert.equal(await page.locator('.map-risk-button[aria-expanded="true"]').count(),1);
          assert.equal(new URL(page.url()).searchParams.get('lang'),code);
          const footerHref=await page.locator('.footer-blog-link').getAttribute('href');
          assert.ok(footerHref.includes(`lang=${code}`));
          if(['ru','en','et','de','el','uk','fi'].includes(code))await page.screenshot({path:`output/playwright/locales/${code}-${width}.png`,fullPage:true});
        }
      }
      await context.close();
    }
    console.log(`${code}: checked`);
  }
}finally{await browser.close();fs.writeFileSync(`output/playwright/locales/${process.env.LOCALES_HOME_ONLY?'home-report':'report'}.json`,JSON.stringify({report,failures},null,2));}
console.log(JSON.stringify({pages:report.length,failures},null,2));
if(failures.length)process.exitCode=1;
