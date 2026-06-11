// Phase 1 evidence run: 375px playthrough of the M1 path.
// Usage: node scripts/phase1-playthrough.mjs [baseUrl]
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = path.join('scripts', 'output', 'phase1-playthrough');
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: '01-home', url: '/' },
  { name: '02-today', url: '/learn' },
  { name: '03-course-path', url: '/course' },
  { name: '04-first-mission', url: '/missions/module-1/greet-frau-weber?start=listen' },
  { name: '05-m1-checkpoint', url: '/missions/module-1/checkpoint' },
  { name: '06-m2-checkpoint-generic', url: '/course/2/checkpoint' },
];

const errors = [];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console:${page.url()}] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror:${page.url()}] ${err.message}`));

for (const shot of shots) {
  const url = `${BASE}${shot.url}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT, `${shot.name}.png`), fullPage: false });
    console.log(`OK  ${shot.name}  ${shot.url}`);
  } catch (err) {
    errors.push(`[goto:${url}] ${err.message}`);
    console.log(`ERR ${shot.name}  ${err.message}`);
  }
}

// Interaction test: mark two items on the generic module-2 checkpoint and save
try {
  await page.goto(`${BASE}/course/2/checkpoint`, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  const items = await page.$$('[data-testid="spine-checkpoint-item"]');
  console.log(`checkpoint items found: ${items.length}`);
  for (const item of items.slice(0, 4)) await item.click();
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '07-m2-checkpoint-marked.png') });
  const resultText = await page.$eval('[data-testid="spine-checkpoint-result"]', (el) => el.textContent);
  console.log(`checkpoint state after partial marking: ${resultText}`);
} catch (err) {
  errors.push(`[interaction] ${err.message}`);
}

await browser.close();

const filtered = errors.filter((e) => !e.includes('favicon') && !e.includes('404'));
fs.writeFileSync(path.join(OUT, 'errors.log'), errors.join('\n') || 'none');
console.log(`\nConsole/page errors (excluding 404s): ${filtered.length}`);
for (const e of filtered.slice(0, 20)) console.log('  ' + e);
