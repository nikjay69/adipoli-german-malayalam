import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/output/local-shots';
fs.mkdirSync(OUT, { recursive: true });

// Pages to verify: intro hero + onboarding three steps. We seed localStorage so
// the intro/onboarding don't auto-redirect away (they bail to '/' once seen).
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('requestfailed', (r) => { const u = r.url(); if (/\.(png|jpg|jpeg|webp)$/i.test(u)) errors.push('IMG FAIL ' + u.replace(BASE, '')); });

async function fresh() {
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => localStorage.removeItem('german-malayali-progress'));
}

async function shot(path, label, waitMs = 2200) {
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, waitMs));
  const file = `${OUT}/${label}.png`;
  await page.screenshot({ path: file });
  console.log('shot', label, '->', file);
}

await fresh();
await shot('/intro', '01-intro');

// Onboarding: step through welcome -> hours -> ready
await fresh();
await page.goto(BASE + '/onboarding', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: `${OUT}/02-onboarding-welcome.png` });
console.log('shot 02-onboarding-welcome');

// click "Let's Go"
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => /Let.s Go/i.test(x.textContent || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: `${OUT}/03-onboarding-hours.png` });
console.log('shot 03-onboarding-hours');

// select an hour option then confirm
await page.evaluate(() => {
  const opt = Array.from(document.querySelectorAll('button')).find((x) => /\/day/i.test(x.textContent || ''));
  if (opt) opt.click();
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${OUT}/04-onboarding-hours-selected.png` });
console.log('shot 04-onboarding-hours-selected');

await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => /Confirm Plan/i.test(x.textContent || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 1600));
await page.screenshot({ path: `${OUT}/05-onboarding-ready.png` });
console.log('shot 05-onboarding-ready');

console.log('\nconsole/image errors:', errors.length);
errors.forEach((e) => console.log('  -', e));

await browser.close();
