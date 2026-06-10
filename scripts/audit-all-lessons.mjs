import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'https://adipoli-german.vercel.app';
const OUT = 'scripts/output/all-lesson-audit';
fs.mkdirSync(OUT, { recursive: true });

const lessons = [
  ...['1-1','1-2','1-3','1-4','1-5','1-6'].map(id => ({ id, path: `/play/1/${id}` })),
  ...['2-1','2-2','2-3','2-4','2-5'].map(id => ({ id, path: `/play/2/${id}` })),
];

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

for (const l of lessons) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 200)));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 200)); });
  let status = 'unk';
  try {
    const resp = await page.goto(BASE + l.path, { waitUntil: 'networkidle2', timeout: 45000 });
    status = String(resp?.status() ?? 'no-resp');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${OUT}/${l.id}.png`, fullPage: false });
  } catch (e) { errors.push(`NAV: ${String(e.message).slice(0, 200)}`); }
  const bad = errors.length > 0 || status !== '200';
  console.log(`${bad ? '❌' : '✓'} ${l.id} [${status}]${errors.length ? ' ' + errors.join(' | ') : ''}`);
  await page.close();
}

await browser.close();
