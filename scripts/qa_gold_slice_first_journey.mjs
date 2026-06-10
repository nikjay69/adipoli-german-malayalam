#!/usr/bin/env node
import puppeteer from 'puppeteer';

const BASE_URL = process.env.ADIPOLI_BASE_URL || process.env.ADIPOLI_QA_BASE_URL || 'http://127.0.0.1:3000';
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome';
const STORAGE_KEYS = [
  'german-malayali-progress',
  'german-course-storage',
  'adipoli:module1:completedMissions',
  'adipoli:module2:completedMissions',
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(message, details = {}) {
  console.error(`FAIL: ${message}`);
  if (Object.keys(details).length) console.error(JSON.stringify(details, null, 2));
  process.exit(1);
}

function assert(condition, message, details = {}) {
  if (!condition) fail(message, details);
}

async function state(page) {
  return page.evaluate(() => ({
    path: window.location.pathname,
    text: document.body.innerText,
    buttons: Array.from(document.querySelectorAll('button')).map((button) => ({ text: button.innerText.trim(), disabled: button.disabled })),
    links: Array.from(document.querySelectorAll('a[href]')).map((link) => ({ text: link.textContent?.trim() ?? '', href: link.getAttribute('href') })),
    nav: Boolean(document.querySelector('nav')),
    search: Boolean(document.querySelector('[role="search"], input[type="search"]')),
    audios: Array.from(document.querySelectorAll('audio')).map((audio) => ({
      src: audio.currentSrc || audio.src,
      readyState: audio.readyState,
      paused: audio.paused,
      duration: Number.isFinite(audio.duration) ? audio.duration : null,
      error: audio.error?.code ?? null,
      controls: audio.controls,
    })),
    module1Storage: window.localStorage.getItem('adipoli:module1:completedMissions'),
  }));
}

async function clickButtonContaining(page, text) {
  const ok = await page.evaluate((needle) => {
    const lowerNeedle = needle.toLowerCase();
    const button = Array.from(document.querySelectorAll('button')).find((candidate) => candidate.innerText.toLowerCase().includes(lowerNeedle) && !candidate.disabled);
    if (!button) return false;
    button.click();
    return true;
  }, text);
  assert(ok, `button not clickable: ${text}`, await state(page));
  await delay(250);
}

async function playAllVisibleAudio(page, expectedCount) {
  const result = await page.evaluate(async () => {
    const audios = Array.from(document.querySelectorAll('audio'));
    const results = [];
    for (const audio of audios) {
      await audio.play();
      await new Promise((resolve) => setTimeout(resolve, 120));
      const playbackReadyState = audio.readyState;
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = audio.duration;
        audio.dispatchEvent(new Event('timeupdate', { bubbles: true }));
      }
      audio.dispatchEvent(new Event('ended', { bubbles: true }));
      results.push({
        src: audio.currentSrc || audio.src,
        readyState: playbackReadyState,
        paused: audio.paused,
        currentTime: audio.currentTime,
        duration: Number.isFinite(audio.duration) ? audio.duration : null,
        error: audio.error?.code ?? null,
        controls: audio.controls,
      });
      audio.pause();
    }
    return results;
  });
  assert(result.length >= expectedCount, `expected at least ${expectedCount} audio elements`, { result });
  const bad = result.filter((audio) => audio.readyState < 2 || audio.error !== null || audio.controls || !audio.duration);
  assert(bad.length === 0, 'audio playback/readiness failed or native controls leaked', { result, bad });
  await delay(250);
  return result;
}

async function chooseOption(page, text) {
  await clickButtonContaining(page, text);
}

async function buildSentence(page, words) {
  for (const word of words) {
    const clickResult = await page.evaluate((chipWord) => {
      const buttons = Array.from(document.querySelectorAll('[data-testid="builder-chip"]'));
      const button = buttons.find((candidate) => candidate.dataset.builderChip === chipWord && !candidate.disabled);
      if (!button) return { ok: false, available: buttons.map((candidate) => ({ chip: candidate.dataset.builderChip, disabled: candidate.disabled })) };
      button.click();
      return { ok: true };
    }, word);
    assert(clickResult.ok, `builder chip not clickable: ${word}`, clickResult);
    await delay(120);
  }
  const built = await page.evaluate(() => ({
    text: document.querySelector('[data-testid="builder-built-sentence"]')?.innerText,
    correct: document.querySelector('[data-testid="builder-built-sentence"]')?.getAttribute('data-builder-correct'),
  }));
  assert(built.correct === 'true', 'builder did not reach correct state', built);
}

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 390, height: 844, isMobile: true },
});

try {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.evaluateOnNewDocument((keys) => {
    for (const key of keys) window.localStorage.removeItem(key);
  }, STORAGE_KEYS);

  await page.goto(`${BASE_URL}/intro`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(700);
  let current = await state(page);
  assert(current.path === '/intro', 'intro route failed', current);
  assert(current.text.includes('Your first German moment.') && current.text.includes('Meet Frau Weber, hear a real classroom greeting') && current.text.toLowerCase().includes('begin lesson 1'), 'intro copy/CTA not gold-slice aligned', { text: current.text.slice(0, 800) });
  assert(current.buttons.filter((button) => button.text).length === 1, 'intro must keep one obvious primary action', current.buttons);

  await clickButtonContaining(page, 'Begin lesson 1');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-1/greet-frau-weber' && document.body.innerText.includes('Morning class.'), { timeout: 10000 });
  await delay(500);
  current = await state(page);
  const listeningText = current.text.toLowerCase();
  assert(listeningText.includes('morning class.') && !listeningText.includes('begin greeting practice'), 'intro CTA should bypass preamble and open conversation scene', { text: current.text.slice(0, 1100) });
  assert(!current.nav && !current.search, 'focused mission path leaked global nav/search', { nav: current.nav, search: current.search });
  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 10000 });
  current = await state(page);
  assert(!current.text.includes('Pick the morning opener.') && !current.text.includes('Answer, then fix.'), 'first mission should not insert separate scene/speaking pages before repair', { text: current.text.slice(0, 1100) });
  let immersive = await page.evaluate(() => ({
    repairOnly: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-step-kind') === 'conversation-repair',
    finished: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-model-audio-finished'),
    modelLineHidden: document.querySelector('[data-testid="immersive-model-line"]')?.getAttribute('data-model-line-hidden'),
    hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
    repairHidden: document.querySelector('[data-testid="inline-repair-choice"]')?.classList.contains('sr-only') ?? null,
  }));
  assert(immersive.repairOnly && immersive.finished === 'false' && immersive.modelLineHidden === 'true' && immersive.hasTinyInput === false && immersive.repairHidden === true, 'first mission should be one-screen voice-first and hide repair choices until model audio finishes', immersive);
  const replyAudio = await playAllVisibleAudio(page, 1);
  await page.waitForFunction(() => {
    const step = document.querySelector('[data-testid="immersive-reply-step"]');
    const inlineRepair = document.querySelector('[data-testid="inline-repair-choice"]');
    return step?.getAttribute('data-model-audio-finished') === 'true' && inlineRepair && !inlineRepair.classList.contains('sr-only');
  }, { timeout: 10000 });

  immersive = await page.evaluate(() => ({
    repairOnly: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-step-kind') === 'conversation-repair',
    hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
  }));
  assert(immersive.repairOnly && !immersive.hasTinyInput, 'first mission repair must stay no-typing after audio', immersive);
  await chooseOption(page, 'Guten Morgen, Frau Weber.');

  await page.waitForFunction(() => document.body.innerText.includes('First class win.') && document.body.innerText.includes('Handle thank-you politely.'), { timeout: 10000 });
  current = await state(page);
  const winText = current.text.toLowerCase();
  assert(winText.includes('you can now') && current.text.includes('Guten Morgen, Frau Weber. Ich lerne Deutsch.'), 'win screen missing explicit ability win', { text: current.text.slice(0, 1500) });
  assert(current.links.some((link) => link.href === '/missions/module-1/please-thanks?start=listen'), 'win screen missing direct-listen next-mission pull', { text: current.text.slice(0, 1800), links: current.links });
  assert(current.module1Storage?.includes('greetFrauWeber'), 'mission completion was not stored', { storage: current.module1Storage });

  const relevantErrors = consoleErrors.filter((line) => !line.includes('favicon') && !line.includes('404'));
  assert(relevantErrors.length === 0, 'browser console/page errors during gold-slice first journey QA', { consoleErrors: relevantErrors });

  console.log(`PASS: gold-slice first journey base=${BASE_URL} replyAudio=${replyAudio.length}`);
} finally {
  await browser.close();
}
