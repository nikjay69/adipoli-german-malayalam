import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'https://adipoli-german.vercel.app';
const OUT = 'scripts/output/m1-lesson-audit';
fs.mkdirSync(OUT, { recursive: true });

const lessons = [
  { id: '1-1', path: '/play/1/1-1' },
  { id: '1-2', path: '/play/1/1-2' },
  { id: '1-3', path: '/play/1/1-3' },
  { id: '1-4', path: '/play/1/1-4' },
  { id: '1-5', path: '/play/1/1-5' },
  { id: '1-6', path: '/play/1/1-6' },
];

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

const report = [];
for (const l of lessons) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errors = [];
  const failed = [];
  page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 250)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text().slice(0, 250));
  });
  page.on('requestfailed', (req) => {
    const url = req.url();
    // ignore external/analytics noise
    if (url.includes(BASE)) {
      failed.push(`${url} (${req.failure()?.errorText})`.slice(0, 200));
    }
  });

  let status = 'unknown';
  let visibleText = '';
  try {
    const resp = await page.goto(BASE + l.path, { waitUntil: 'networkidle2', timeout: 45000 });
    status = String(resp?.status() ?? 'no-resp');
    await new Promise((r) => setTimeout(r, 2500));
    visibleText = (await page.evaluate(() => document.body.innerText)).slice(0, 400);
    await page.screenshot({ path: `${OUT}/${l.id}.png`, fullPage: false });
  } catch (e) {
    errors.push(`NAV: ${String(e.message).slice(0, 250)}`);
  }

  report.push({
    id: l.id,
    path: l.path,
    status,
    errors: errors.slice(0, 5),
    failed: failed.slice(0, 3),
    text: visibleText.replace(/\s+/g, ' ').slice(0, 250),
  });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(report, null, 2));

// concise text report
for (const r of report) {
  const bad = r.errors.length > 0 || r.failed.length > 0 || r.status !== '200';
  console.log(`${bad ? '❌' : '✓'} ${r.id} [${r.status}]`);
  if (r.errors.length) console.log(`   errors: ${r.errors.join(' | ').slice(0, 400)}`);
  if (r.failed.length) console.log(`   netfail: ${r.failed.join(' | ').slice(0, 400)}`);
  if (r.text) console.log(`   text: ${r.text}`);
}
