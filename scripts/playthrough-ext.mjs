import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'https://adipoli-german.vercel.app';
const OUT = 'scripts/output/playthrough';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const capture = async (path, name) => {
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: `${OUT}/ctx-${name}.png` });
  console.log(`captured ${name}`);
};

await capture('/', 'home');
await capture('/learn', 'learn-index');
await capture('/learn/1', 'learn-m1-detail');
await capture('/games', 'games-page');

// Inside a lesson later in the flow — L1-3 (we haven't seen this)
await capture('/play/1/1-3', 'lesson-1-3-entry');

// Then advance past the TAP TO START
await new Promise(r => setTimeout(r, 500));
await page.evaluate(() => {
  const tap = Array.from(document.querySelectorAll('*')).find(el =>
    el.textContent?.trim() === 'TAP TO START' && el.offsetParent !== null);
  if (tap) tap.click();
});
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: `${OUT}/ctx-lesson-1-3-post-start.png` });

await browser.close();
