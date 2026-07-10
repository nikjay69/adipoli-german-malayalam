// Sprint 2 (Phase 3R) verification: administered checkpoint runner (E2).
// Drives /course/4/checkpoint end-to-end at 390px: intro → tasks → scored result,
// deliberately failing the required speaking item to prove weakness tags + recovery.
import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/output/sprint2-verify';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e).slice(0, 200)));

const results = [];
function assert(name, cond, detail = '') {
  results.push({ name, pass: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function clickByText(re) {
  return page.evaluate((reSrc) => {
    const re2 = new RegExp(reSrc, 'i');
    const els = Array.from(document.querySelectorAll('button'));
    const b = els.find((x) => re2.test(x.textContent || ''));
    if (b && !b.disabled) { b.click(); return true; }
    return false;
  }, re.source);
}

await page.goto(BASE + '/course/4/checkpoint', { waitUntil: 'networkidle2', timeout: 90000 });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle2' });
await sleep(2200);

// ── Intro: no self-marking, has Start ──
const intro = await page.evaluate(() => document.body.innerText || '');
assert('intro shows Start button', /Start the checkpoint/i.test(intro));
assert('no "Mark all passed" anywhere', !/Mark all passed/i.test(intro));
assert('closed-book rule stated', /closed book|no Google/i.test(intro));
await page.screenshot({ path: `${OUT}/01-intro.png` });

await clickByText(/Start the checkpoint/);
await sleep(1200);

// ── Runner: administer all 8 cp4 tasks ──
// Plan (cp4 order): hoeren type (3,50) → hoeren choice (8,45 €) → sprechen production ×2
// (fail the required one!) → lesen choice → lesen type (tomato soup) → grammar type (ein) → grammar choice.
let screenshotTaken = false;
for (let step = 0; step < 12; step++) {
  await sleep(400);
  const state = await page.evaluate(() => {
    const runner = document.querySelector('[data-testid="spine-checkpoint-runner"]');
    if (!runner) return { done: true };
    const q = (runner.querySelector('h2')?.textContent || '');
    const hasInput = !!runner.querySelector('[data-testid="spine-checkpoint-input"]');
    const hasReveal = !!document.querySelector('[data-testid="spine-checkpoint-reveal"] button');
    const options = Array.from(runner.querySelectorAll('[data-testid="spine-checkpoint-option"]')).map((o) => o.textContent || '');
    const hasRubric = !!runner.querySelector('[data-testid="spine-checkpoint-rubric-clean"]');
    return { done: false, q, hasInput, hasReveal, options, hasRubric };
  });
  if (state.done) break;

  if (!screenshotTaken) { await page.screenshot({ path: `${OUT}/02-first-task.png` }); screenshotTaken = true; }

  if (state.hasRubric) {
    // Rubric verdict: fail the required order item, pass the price question
    const isOrder = /order a coffee|Ich hätte gern/i.test(state.q);
    await page.click(isOrder ? '[data-testid="spine-checkpoint-rubric-missed"]' : '[data-testid="spine-checkpoint-rubric-clean"]');
    await sleep(2000);
    continue;
  }
  if (state.hasReveal) {
    await page.click('[data-testid="spine-checkpoint-reveal"] button');
    await sleep(600);
    continue;
  }
  if (state.hasInput) {
    let answer = '';
    if (/price you hear/i.test(state.q)) answer = '3,50';
    else if (/dish/i.test(state.q)) answer = 'tomato soup';
    else if (/Ich nehme/i.test(state.q)) answer = 'ein';
    else answer = 'x';
    await page.type('[data-testid="spine-checkpoint-input"]', answer);
    await clickByText(/^Check$/);
    await sleep(2200);
    continue;
  }
  if (state.options.length) {
    let target = state.options[0];
    if (state.options.some((o) => /8,45/.test(o))) target = state.options.find((o) => /8,45/.test(o));
    else if (state.options.some((o) => /blue T-shirt in size M costs €15/.test(o))) target = state.options.find((o) => /blue T-shirt in size M costs €15/.test(o));
    else if (state.options.some((o) => /kein negates nouns/.test(o))) target = state.options.find((o) => /kein negates nouns/.test(o));
    await page.evaluate((text) => {
      const b = Array.from(document.querySelectorAll('[data-testid="spine-checkpoint-option"]')).find((x) => (x.textContent || '') === text);
      if (b) b.click();
    }, target);
    await sleep(2200);
    continue;
  }
  await sleep(800);
}

// ── Result: scored, saved, FAIL (required speak item missed), recovery shown ──
await sleep(1500);
const result = await page.evaluate(() => {
  const badge = document.querySelector('[data-testid="spine-checkpoint-result"]');
  const recovery = document.querySelector('[data-testid="spine-checkpoint-recovery-cards"]');
  let stored = null;
  try {
    const raw = JSON.parse(localStorage.getItem('german-malayali-progress') || '{}');
    stored = raw?.state?.userProgress?.spineCheckpoints?.['4'] ?? null;
  } catch { /* noop */ }
  return {
    verdict: badge?.textContent || '',
    recoveryText: recovery?.textContent || '',
    stored,
    body: (document.body.innerText || '').slice(0, 300),
  };
});
assert('runner reached scored result', !!result.verdict, result.verdict || result.body.replace(/\n/g, ' ').slice(0, 100));
assert('required speak item missed → FAIL', result.verdict.trim() === 'FAIL', result.verdict);
assert('recovery card prescribed (Polite requests)', /Polite requests|Sag es/i.test(result.recoveryText));
assert('result auto-saved to store with failed tags', !!result.stored && Array.isArray(result.stored.failedTags) && result.stored.failedTags.includes('sprechen:request_phrase'), JSON.stringify(result.stored?.failedTags ?? null));
await page.screenshot({ path: `${OUT}/03-result-fail-recovery.png` });

// ── cp2 intro sanity (audio-based checkpoint loads) ──
await page.goto(BASE + '/course/2/checkpoint', { waitUntil: 'networkidle2', timeout: 60000 });
await sleep(1500);
const cp2 = await page.evaluate(() => document.body.innerText || '');
assert('cp2 loads with start', /Start the checkpoint/i.test(cp2));

const realErrors = errors.filter((e) => !/favicon|manifest|Failed to load resource.*40[34]/.test(e));
assert('no console/page errors', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

const failCount = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failCount}/${results.length} assertions passed; screenshots in ${OUT}`);
await browser.close();
process.exit(failCount ? 1 : 0);
