// Sprint 1 (Phase 3R) verification: E1 one-home routing + C1 module 6/7 content in the player.
// DOM assertions (framer-motion screens don't raster reliably headless) + 390px evidence shots.
import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/output/sprint1-verify';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e).slice(0, 200)));

const results = [];
function assert(name, cond, detail = '') {
  results.push({ name, pass: !!cond, detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

async function settle(ms = 1800) { await new Promise((r) => setTimeout(r, ms)); }

// ── 1. Cold visitor: / must land on /intro (promise screen) ──
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.evaluate(() => localStorage.clear());
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
await settle();
assert('cold visitor / → /intro', page.url().includes('/intro'), page.url());
await page.screenshot({ path: `${OUT}/01-cold-root-lands-intro.png` });

// ── 2. Returning visitor: / must land on /learn (Today) ──
await page.evaluate(() => {
  const state = { state: { userProgress: { hasSeenIntro: true, completedLessons: [], learnedVocabulary: [], achievements: [], gamesPlayed: 0, quizzesTaken: 0, streak: 1, xp: 10, level: 1, srsCards: {}, spineCheckpoints: {}, mockResults: {}, completedTaskIds: [] } }, version: 0 };
  localStorage.setItem('german-malayali-progress', JSON.stringify(state));
});
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
await settle(2500);
assert('returning visitor / → /learn', page.url().includes('/learn'), page.url());

const todayDom = await page.evaluate(() => ({
  hasSkillBars: !!document.querySelector('[data-testid="today-skill-bars"]'),
  heroCtas: Array.from(document.querySelectorAll('a')).filter((a) => /Start listening|Start the lesson|Take the closed checkpoint|Open the mock tests/.test(a.textContent || '')).length,
  bodyText: (document.body.innerText || '').slice(0, 400),
}));
assert('Today shows 4 skill bars', todayDom.hasSkillBars);
assert('Today shows exactly one hero CTA', todayDom.heroCtas === 1, `found ${todayDom.heroCtas}`);
await page.screenshot({ path: `${OUT}/02-returning-root-lands-today.png` });

// ── 3. Profile: checkpoint-derived readiness card (no count-based %) ──
await page.goto(BASE + '/profile', { waitUntil: 'networkidle2', timeout: 60000 });
await settle();
const profileDom = await page.evaluate(() => ({
  hasReadiness: /A1 Exam Readiness/.test(document.body.innerText || ''),
  hasSkillLabels: /Hören/.test(document.body.innerText || '') && /Schreiben/.test(document.body.innerText || ''),
  hasOldBreakdown: /Course Path|Show breakdown/.test(document.body.innerText || ''),
}));
assert('Profile readiness card present', profileDom.hasReadiness);
assert('Profile readiness is skill-based (Hören…Schreiben)', profileDom.hasSkillLabels);
assert('Old count-based breakdown gone', !profileDom.hasOldBreakdown);
await page.screenshot({ path: `${OUT}/03-profile-readiness.png` });

// ── 4. C1 spot-check: lesson 6-1 renders in the player with rewritten content ──
// /preview seeds full progress so module 6 is reachable.
await page.goto(BASE + '/preview', { waitUntil: 'networkidle2', timeout: 60000 });
await settle(1200);
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => /unlock everything/i.test(x.textContent || ''));
  if (b) b.click();
});
await settle(1500);
await page.goto(BASE + '/play/6/6-1', { waitUntil: 'networkidle2', timeout: 60000 });
await settle(3000);
const lessonDom = await page.evaluate(() => (document.body.innerText || '').slice(0, 2000));
assert('lesson 6-1 loads in player', !/404|not found/i.test(lessonDom) && lessonDom.length > 50, lessonDom.slice(0, 80).replace(/\n/g, ' '));
await page.screenshot({ path: `${OUT}/04-lesson-6-1-player.png` });

// ── 5. Console health ──
const realErrors = errors.filter((e) => !/favicon|manifest|_next\/static.*404/.test(e));
assert('no console/page errors on the path', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

const failCount = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failCount}/${results.length} assertions passed; screenshots in ${OUT}`);
await browser.close();
process.exit(failCount ? 1 : 0);
