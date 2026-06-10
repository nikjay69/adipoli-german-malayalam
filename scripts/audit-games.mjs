import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';

const routes = [
  { id: 'hor-und-los', path: '/games/hor-und-los' },
  { id: 'was-steht-da', path: '/games/was-steht-da' },
  { id: 'sag-es', path: '/games/sag-es' },
  { id: 'tipp-es', path: '/games/tipp-es' },
  { id: 'listen-act', path: '/games/listen-act' },
  { id: 'memory', path: '/games/memory' },
  { id: 'greeting-time', path: '/games/greeting-time' },
  { id: 'scene-sort', path: '/games/scene-sort' },
  { id: 'speed-quiz', path: '/games/speed-quiz' },
  { id: 'fill-the-gap', path: '/games/fill-the-gap' },
  { id: 'boss-1', path: '/games/boss/1' },
  { id: 'boss-2', path: '/games/boss/2' },
  { id: 'word-match', path: '/games/word-match' },
];

const OUT = 'scripts/output/game-audit';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const results = [];

for (const r of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errors = [];
  const warnings = [];
  const failed = [];
  page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 200)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text().slice(0, 200));
    if (msg.type() === 'warning') warnings.push(msg.text().slice(0, 200));
  });
  page.on('requestfailed', (req) => failed.push(`${req.url()} (${req.failure()?.errorText})`.slice(0, 200)));

  let status = 'unknown';
  let visibleText = '';
  try {
    const resp = await page.goto(BASE + r.path, { waitUntil: 'networkidle2', timeout: 30000 });
    status = String(resp?.status() ?? 'no-response');
    await new Promise((r) => setTimeout(r, 1500));
    visibleText = (await page.evaluate(() => document.body.innerText)).slice(0, 600);
    await page.screenshot({ path: `${OUT}/${r.id}.png`, fullPage: false });
  } catch (e) {
    errors.push(`NAV: ${String(e.message).slice(0, 200)}`);
  }

  results.push({
    id: r.id,
    path: r.path,
    status,
    errors: errors.slice(0, 5),
    warnings: warnings.slice(0, 2),
    failed: failed.slice(0, 3),
    textSnippet: visibleText.replace(/\s+/g, ' ').slice(0, 200),
  });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(results, null, 2));

// concise text report
const lines = [];
for (const r of results) {
  const bad = r.errors.length > 0 || r.failed.length > 0 || r.status !== '200';
  lines.push(`${bad ? '❌' : '✓'} ${r.id} [${r.status}]`);
  if (r.errors.length) lines.push(`   errors: ${r.errors.join(' | ')}`);
  if (r.failed.length) lines.push(`   netfail: ${r.failed.join(' | ')}`);
  if (r.textSnippet) lines.push(`   text: ${r.textSnippet}`);
}
console.log(lines.join('\n'));
