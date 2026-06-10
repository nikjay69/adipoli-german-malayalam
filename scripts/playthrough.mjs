import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'https://adipoli-german.vercel.app';
const LESSON = '/play/1/1-1';
const OUT = 'scripts/output/playthrough';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

const log = [];
page.on('console', (m) => { if (m.type() === 'error') log.push({ t: 'console-error', msg: m.text().slice(0, 200) }); });

let step = 0;
const shot = async (label) => {
  step++;
  const file = `${OUT}/${String(step).padStart(2, '0')}-${label}.png`;
  await page.screenshot({ path: file });
  const text = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ').slice(0, 300);
  log.push({ step, label, file, text, t: Date.now() });
  console.log(`[${step}] ${label}: ${text.slice(0, 120)}`);
};

const start = Date.now();
await page.goto(BASE + LESSON, { waitUntil: 'networkidle2', timeout: 45000 });
await new Promise(r => setTimeout(r, 2000));
await shot('01-entry');

// Try to advance by clicking common interaction targets; keep clicking until nothing changes
let lastText = '';
let stuck = 0;
let clicks = 0;
const MAX_STEPS = 40;

for (let i = 0; i < MAX_STEPS && stuck < 3; i++) {
  // Prefer: "TAP TO START", buttons with text, first option card, skip as last resort
  const nextAction = await page.evaluate(() => {
    // scene intros
    const tapStart = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent?.trim() === 'TAP TO START' && el.offsetParent !== null);
    if (tapStart) {
      const clickable = tapStart.closest('[onclick],button,a,[class*="cursor"]') || tapStart;
      const r = clickable.getBoundingClientRect();
      return { kind: 'tap-start', x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }

    // primary action buttons
    const buttonText = ['Continue', 'Next', 'Submit', 'Weiter', 'Check', 'Listen', 'Play', 'Start'];
    for (const t of buttonText) {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => b.offsetParent !== null && b.textContent?.trim().includes(t) && !b.disabled);
      if (btn) {
        const r = btn.getBoundingClientRect();
        return { kind: `btn-${t}`, x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }
    }

    // option cards (first visible one with text longer than 2 chars inside a button-like container)
    const options = Array.from(document.querySelectorAll('button, [role="button"], [class*="card"], [class*="option"]'))
      .filter(el => {
        if (el.offsetParent === null) return false;
        const txt = el.textContent?.trim() || '';
        if (txt.length < 2 || txt.length > 100) return false;
        // skip nav items
        if (/home|games|audio|practice|tests|me/i.test(txt) && txt.length < 8) return false;
        if (/skip/i.test(txt)) return false;
        return true;
      });
    if (options[0]) {
      const r = options[0].getBoundingClientRect();
      return { kind: 'option', x: r.x + r.width / 2, y: r.y + r.height / 2, text: options[0].textContent?.trim().slice(0, 40) };
    }

    // dragging input? letter tiles (try clicking any tile)
    const tiles = Array.from(document.querySelectorAll('[class*="letter"],[class*="tile"]'))
      .filter(el => el.offsetParent !== null);
    if (tiles[0]) {
      const r = tiles[0].getBoundingClientRect();
      return { kind: 'tile', x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }

    // text input? type a plausible answer
    const input = document.querySelector('input[type="text"]');
    if (input && input.offsetParent !== null) {
      const r = input.getBoundingClientRect();
      return { kind: 'input', x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }

    // last resort: skip
    const skip = Array.from(document.querySelectorAll('button,a'))
      .find(el => el.offsetParent !== null && /skip/i.test(el.textContent || ''));
    if (skip) {
      const r = skip.getBoundingClientRect();
      return { kind: 'skip', x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }

    return null;
  });

  if (!nextAction) {
    console.log('[stuck] no action found');
    break;
  }

  try {
    if (nextAction.kind === 'input') {
      await page.mouse.click(nextAction.x, nextAction.y);
      await page.keyboard.type('Ich lerne Deutsch', { delay: 20 });
      await page.keyboard.press('Enter');
    } else {
      await page.mouse.click(nextAction.x, nextAction.y);
    }
    clicks++;
    await new Promise(r => setTimeout(r, 1500));
  } catch (e) {
    console.log('click failed:', e.message);
    stuck++;
    continue;
  }

  const currentText = (await page.evaluate(() => document.body.innerText)).slice(0, 300);
  if (currentText === lastText) stuck++;
  else { stuck = 0; lastText = currentText; }

  await shot(`${String(i).padStart(2, '0')}-${nextAction.kind}${nextAction.text ? '-' + nextAction.text.slice(0, 20).replace(/[^a-z0-9]/gi, '_') : ''}`);
}

const elapsed = Math.round((Date.now() - start) / 1000);
console.log(`\n=== DONE ===`);
console.log(`Clicks: ${clicks}, Steps captured: ${step}, Time: ${elapsed}s`);

fs.writeFileSync(`${OUT}/log.json`, JSON.stringify({ elapsed, clicks, log }, null, 2));

await browser.close();
