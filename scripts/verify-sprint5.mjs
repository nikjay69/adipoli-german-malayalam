// Sprint 5 (Phase 3R) runtime verification — 390px DOM assertions via puppeteer.
// Framer-motion screens don't raster in headless screenshots here, so we assert DOM
// (see MEMORY: reference_screenshot_harness). Requires `npm run dev` on :3000.
//
// Covers:
//  A. /practice        — Speaking Simulator card is present and links to /practice/simulator
//  B. /practice/simulator — intro → full clean run → result + localStorage run persisted;
//                           second run with one "missed" verdict → passed:false persisted
//  C. /play/4/4-3      — canon-framed storyScene renders ("Imagined:" speaker in game mode)

import puppeteer from 'puppeteer';

const BASE = process.env.BASE || 'http://localhost:3000';
const results = [];
let failures = 0;

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });

const pageErrors = [];
const badResponses = [];
page.on('pageerror', (e) => pageErrors.push(String(e)));
page.on('response', (r) => {
  if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`);
});

// ── A. Practice hub shows the simulator card ─────────────────────────────
await page.goto(`${BASE}/practice`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForFunction(
  () => document.body.innerText.includes('Speaking Simulator'),
  { timeout: 15000 },
).catch(() => {});
const hubHasCard = await page.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a')).find((a) =>
    a.getAttribute('href') === '/practice/simulator');
  return !!link && link.innerText.includes('Speaking Simulator') && link.innerText.includes('EXAM');
});
check('A1 practice hub: Speaking Simulator card links to /practice/simulator (EXAM badge)', hubHasCard);

// ── B. Simulator: intro → clean run → result + persisted run ────────────
await page.goto(`${BASE}/practice/simulator`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForSelector('[data-testid="simulator-intro"]', { timeout: 15000 });
const intro = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="simulator-intro"]');
  const sets = Array.from(el.querySelectorAll('button')).filter((b) => /^Set \d+$/.test(b.innerText.trim()));
  return {
    text: el.innerText,
    setCount: sets.length,
    hasStart: !!document.querySelector('[data-testid="simulator-start"]'),
  };
});
check('B1 intro renders with start CTA', intro.hasStart && intro.text.includes('Start the simulation'));
check('B2 intro offers a test-set selector', intro.setCount >= 2, `${intro.setCount} sets`);

await page.click('[data-testid="simulator-start"]');
await page.waitForSelector('[data-testid="simulator-card"]', { timeout: 15000 });
const firstCard = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="simulator-card"]');
  const m = el.innerText.match(/1 \/ (\d+)/);
  return { text: el.innerText, total: m ? Number(m[1]) : 0 };
});
check('B3 runner starts on Teil 1, card 1/N', firstCard.text.includes('Teil 1') && firstCard.total > 0,
  `${firstCard.total} cards`);

async function playCard(verdict) {
  await page.waitForSelector('[data-testid="simulator-reveal"]', { timeout: 15000 });
  await page.click('[data-testid="simulator-reveal"]');
  await page.waitForSelector('[data-testid="simulator-verdict-clean"]', { timeout: 15000 });
  const modelVisible = await page.evaluate(() => document.body.innerText.includes('Model'));
  if (!modelVisible) throw new Error('model answer not revealed');
  await page.click(`[data-testid="simulator-verdict-${verdict}"]`);
}

for (let i = 0; i < firstCard.total; i++) await playCard('clean');
await page.waitForSelector('[data-testid="simulator-result"]', { timeout: 15000 });
const cleanResult = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="simulator-result"]');
  return {
    text: el.innerText,
    runs: JSON.parse(localStorage.getItem('adipoli-simulator-runs') || '[]'),
  };
});
check('B4 clean run reaches result with all-three-Teile headline',
  cleanResult.text.includes('You spoke through all three Teile'));
check('B5 result shows per-Teil stats',
  cleanResult.text.includes('Teil 1') && cleanResult.text.includes('Teil 2') && cleanResult.text.includes('Teil 3'));
check('B6 run persisted to adipoli-simulator-runs (passed:true, full verdicts)',
  cleanResult.runs.length === 1 && cleanResult.runs[0].passed === true
  && cleanResult.runs[0].verdicts.length === firstCard.total,
  JSON.stringify(cleanResult.runs[0] && { passed: cleanResult.runs[0].passed, n: cleanResult.runs[0].verdicts.length }));

// Second run: one "missed" verdict must produce passed:false
const anotherBtn = await page.evaluateHandle(() =>
  Array.from(document.querySelectorAll('button')).find((b) => b.innerText.includes('Another set')));
await anotherBtn.asElement().click();
await page.waitForSelector('[data-testid="simulator-start"]', { timeout: 15000 });
await page.click('[data-testid="simulator-start"]');
await page.waitForSelector('[data-testid="simulator-card"]', { timeout: 15000 });
await playCard('missed');
for (let i = 1; i < firstCard.total; i++) await playCard('clean');
await page.waitForSelector('[data-testid="simulator-result"]', { timeout: 15000 });
const missedResult = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="simulator-result"]');
  return {
    text: el.innerText,
    runs: JSON.parse(localStorage.getItem('adipoli-simulator-runs') || '[]'),
  };
});
check('B7 missed verdict → honest fail headline',
  missedResult.text.includes('You found your weak Teil'));
check('B8 second run persisted with passed:false',
  missedResult.runs.length === 2 && missedResult.runs[1].passed === false,
  JSON.stringify(missedResult.runs[1] && { passed: missedResult.runs[1].passed }));

// ── C. Canon-framed storyScene renders in game mode ──────────────────────
// A cold visitor gets redirected (lesson locked); completed lessons stay
// replayable, so seed 4-3 as done — same origin, so localStorage carries over.
await page.evaluate(() => {
  localStorage.setItem('german-malayali-progress', JSON.stringify({
    state: { userProgress: { completedLessons: [
      { lessonId: '4-3', completed: true, score: 100, completedAt: Date.now() },
    ] } },
    version: 0,
  }));
});
await page.goto(`${BASE}/play/4/4-3`, { waitUntil: 'networkidle2', timeout: 60000 });
// innerText reflects CSS text-transform (scene name renders uppercased)
const canonOk = await page.waitForFunction(
  () => document.body.innerText.toUpperCase().includes('IMAGINED:'),
  { timeout: 20000 },
).then(() => true).catch(() => false);
const canonSnippet = await page.evaluate(() => document.body.innerText.slice(0, 200).replace(/\n/g, ' | '));
check('C1 /play/4/4-3 renders canon-framed scene ("Imagined:" speaker)', canonOk, canonSnippet);

// ── E. cp8 readiness checkpoint derives the simulator item from real runs ─
// Seed two runs on two different days → cp8-s-mock2 (auto, simulator-2-days)
// must show "On record."; the four mock-derived autos must still fail honestly
// (no mocks seeded), so the result is a FAIL gate with recovery cards.
await page.evaluate(() => {
  const day = 86400000;
  localStorage.setItem('adipoli-simulator-runs', JSON.stringify([
    { testId: 'goethe-a1-test-1', date: Date.now() - day, verdicts: ['clean'], passed: true },
    { testId: 'goethe-a1-test-2', date: Date.now(), verdicts: ['clean'], passed: true },
  ]));
});
await page.goto(`${BASE}/course/8/checkpoint`, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForSelector('[data-testid="spine-checkpoint-start"]', { timeout: 15000 });
await page.click('[data-testid="spine-checkpoint-start"] button');
await page.waitForSelector('[data-testid="spine-checkpoint-runner"]', { timeout: 15000 });

async function clickByText(text) {
  const handle = await page.evaluateHandle((t) =>
    Array.from(document.querySelectorAll('button')).find((b) => b.innerText.includes(t)), text);
  const el = handle.asElement();
  if (!el) throw new Error(`button "${text}" not found`);
  await el.click();
}

// item 1+2: mock autos (hoeren, lesen) — expected "Not on record yet."
for (let i = 0; i < 2; i++) {
  await page.waitForFunction(() => document.body.innerText.includes('Not on record yet.'), { timeout: 15000 });
  await clickByText('Next');
}
// item 3: production write
await page.waitForSelector('[data-testid="spine-checkpoint-textarea"]', { timeout: 15000 });
await page.type('[data-testid="spine-checkpoint-textarea"]',
  'Liebe Frau Weber, ich bin krank und kann heute nicht kommen. Können Sie mir die Hausaufgaben schicken?');
await page.click('[data-testid="spine-checkpoint-reveal"] button');
await page.waitForSelector('[data-testid="spine-checkpoint-rubric-clean"]', { timeout: 15000 });
await page.click('[data-testid="spine-checkpoint-rubric-clean"]');
// item 4: production say
await page.waitForSelector('[data-testid="spine-checkpoint-reveal"]', { timeout: 15000 });
await page.click('[data-testid="spine-checkpoint-reveal"] button');
await page.waitForSelector('[data-testid="spine-checkpoint-rubric-clean"]', { timeout: 15000 });
await page.click('[data-testid="spine-checkpoint-rubric-clean"]');
// item 5: the simulator auto — seeded runs must prove it
await page.waitForFunction(
  () => document.body.innerText.includes('Two Speaking Simulator runs on record'),
  { timeout: 15000 },
);
const simItem = await page.evaluate(() => document.body.innerText);
check('E1 cp8 simulator item derived from saved runs ("On record.")',
  simItem.includes('On record.') && simItem.includes('Your saved results already prove this one.'));
await clickByText('Next');
// items 6+7: mock autos (grammarVocab)
for (let i = 0; i < 2; i++) {
  await page.waitForFunction(() => document.body.innerText.includes('Not on record yet.'), { timeout: 15000 });
  await clickByText('Next');
}
await page.waitForSelector('[data-testid="spine-checkpoint-result"]', { timeout: 15000 });
const cp8Result = await page.evaluate(() => ({
  state: document.querySelector('[data-testid="spine-checkpoint-result"]').innerText.trim(),
  score: document.querySelector('[data-testid="spine-checkpoint-score"]').innerText,
  recovery: !!document.querySelector('[data-testid="spine-checkpoint-recovery-cards"]'),
}));
check('E2 cp8 stays an honest FAIL gate without real mocks (45%, recovery cards)',
  cp8Result.state === 'FAIL' && cp8Result.score.includes('45%') && cp8Result.recovery,
  `${cp8Result.state} / ${cp8Result.score.match(/\d+%/)?.[0]}`);

// ── Console / network health ─────────────────────────────────────────────
const nonAudio404s = badResponses.filter((r) => !r.includes('/audio/'));
check('D1 no page errors across all three pages', pageErrors.length === 0, pageErrors.join(' ; ').slice(0, 300));
check('D2 no non-audio 4xx/5xx responses', nonAudio404s.length === 0, nonAudio404s.join(' ; ').slice(0, 300));
if (badResponses.length > nonAudio404s.length) {
  console.log(`NOTE: ${badResponses.length - nonAudio404s.length} audio 404(s) — expected while the Sprint 6 TTS batch is pending`);
}

await browser.close();
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`} (${results.length} total)`);
process.exit(failures === 0 ? 0 : 1);
