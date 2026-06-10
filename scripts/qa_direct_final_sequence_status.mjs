import puppeteer from 'puppeteer';

const BASE_URL = process.env.ADIPOLI_BASE_URL || 'http://127.0.0.1:3000';
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(message, details = {}) {
  console.error(`FAIL: ${message}`);
  if (Object.keys(details).length) {
    console.error(JSON.stringify(details, null, 2));
  }
  process.exit(1);
}

function assert(condition, message, details = {}) {
  if (!condition) fail(message, details);
}

async function clearMissionStorage(page) {
  await page.evaluateOnNewDocument((keys) => {
    for (const key of keys) window.localStorage.removeItem(key);
  }, ['adipoli:module1:completedMissions', 'adipoli:module1:checkpointResult', 'adipoli:module2:completedMissions']);
}

async function openFinalStep(page, route) {
  const url = `${BASE_URL}${route}?adipoliQa=1&adipoliQaStep=6`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(1100);
  return url;
}

async function inspectPage(page, storageKey) {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    let parsed = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = raw;
    }
    return {
      path: window.location.pathname,
      text: document.body.innerText,
      storage: parsed,
      links: Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href')),
    };
  }, storageKey);
}

async function runOneScreenFinalCase(page, testCase) {
  await clearMissionStorage(page);
  const url = `${BASE_URL}${testCase.route}?adipoliQa=1`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 25000 });

  await page.evaluate(() => {
    const listenButton = document.querySelector('button[aria-label^="Listen to"], button[aria-label^="Play"]');
    if (!(listenButton instanceof HTMLButtonElement)) throw new Error('Listen button missing');
    listenButton.click();
  });
  await page.evaluate(() => {
    const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
    audio?.dispatchEvent(new Event('ended', { bubbles: true }));
  });
  await page.waitForFunction(
    () => document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-model-audio-finished') === 'true',
    { timeout: 30000 }
  );

  await page.evaluate((correctText) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const button = buttons.find((candidate) => candidate.textContent?.includes(correctText));
    if (!button) throw new Error(`Could not find choice button: ${correctText}`);
    button.click();
  }, testCase.correctChoiceText);

  await page.waitForFunction(
    (key, expectedId) => {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
        return Array.isArray(parsed) && parsed.length === 1 && parsed[0] === expectedId;
      } catch {
        return false;
      }
    },
    { timeout: 10000 },
    testCase.storageKey,
    testCase.expectedId
  );
  await delay(300);

  const state = await inspectPage(page, testCase.storageKey);
  assert(state.path === testCase.route, `${testCase.name}: wrong route after one-screen completion`, { url, state });
  assert(Array.isArray(state.storage), `${testCase.name}: completion storage missing/invalid`, { storage: state.storage });
  assert(
    state.storage.length === 1 && state.storage[0] === testCase.expectedId,
    `${testCase.name}: direct completion must only credit the opened mission, not back-fill the sequence`,
    { storage: state.storage }
  );
  assert(state.text.includes(testCase.expectedWinText), `${testCase.name}: inline ability win not visible`, {
    expectedWinText: testCase.expectedWinText,
    textExcerpt: state.text.slice(0, 800),
  });
  assert(!state.text.includes(testCase.forbiddenCount), `${testCase.name}: direct completion falsely shows full sequence complete`, {
    forbiddenCount: testCase.forbiddenCount,
    textExcerpt: state.text.slice(0, 1200),
  });
  assert(
    state.links.some((href) => href === testCase.expectedNextHref || href?.endsWith(testCase.expectedNextHref)),
    `${testCase.name}: next learner path link missing`,
    { links: state.links, expectedNextHref: testCase.expectedNextHref }
  );
  console.log(`direct_one_screen_sequence_status[${testCase.name}]=ok storage=${JSON.stringify(state.storage)} fullCountNotShown=${testCase.forbiddenCount}`);
}

async function runDirectFinalCase(page, testCase) {
  await clearMissionStorage(page);
  const url = await openFinalStep(page, testCase.route);
  const state = await inspectPage(page, testCase.storageKey);

  assert(state.path === testCase.route, `${testCase.name}: wrong route after direct final open`, { url, state });
  assert(Array.isArray(state.storage), `${testCase.name}: completion storage missing/invalid`, { storage: state.storage });
  assert(
    state.storage.length === 1 && state.storage[0] === testCase.expectedId,
    `${testCase.name}: direct final must only credit the opened mission, not back-fill the sequence`,
    { storage: state.storage }
  );
  assert(state.text.includes(testCase.expectedWinText), `${testCase.name}: final win screen not visible`, {
    expectedWinText: testCase.expectedWinText,
    textExcerpt: state.text.slice(0, 800),
  });
  assert(!state.text.includes(testCase.forbiddenCount), `${testCase.name}: direct final falsely shows full sequence complete`, {
    forbiddenCount: testCase.forbiddenCount,
    textExcerpt: state.text.slice(0, 1200),
  });
  assert(
    state.links.some((href) => href === testCase.expectedNextHref || href?.endsWith(testCase.expectedNextHref)),
    `${testCase.name}: next learner path link missing`,
    { links: state.links, expectedNextHref: testCase.expectedNextHref }
  );
  console.log(`direct_final_sequence_status[${testCase.name}]=ok storage=${JSON.stringify(state.storage)} fullCountNotShown=${testCase.forbiddenCount}`);
}

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1366, height: 900 },
});

try {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await runOneScreenFinalCase(page, {
    name: 'module1-final-mission',
    route: '/missions/module-1/first-mini-conversation',
    storageKey: 'adipoli:module1:completedMissions',
    expectedId: 'firstMiniConversation',
    correctChoiceText: 'Guten Tag, Frau Weber. Gut, danke.',
    expectedWinText: 'Guten Tag. Noch einmal, bitte. Auf Wiedersehen.',
    expectedCount: '1/4 done',
    forbiddenCount: '4/4 done',
    expectedNextHref: '/missions/module-1/checkpoint?start=listen',
  });

  await runDirectFinalCase(page, {
    name: 'module2-final-mission',
    route: '/missions/module-2/final-self-intro',
    storageKey: 'adipoli:module2:completedMissions',
    expectedId: 'finalSelfIntro',
    expectedWinText: 'Module 2 win.',
    expectedCount: '1/5 done',
    forbiddenCount: '5/5 done',
    expectedNextHref: '/learn/3',
  });

  const relevantErrors = consoleErrors.filter((line) => !line.includes('favicon') && !line.includes('404'));
  assert(relevantErrors.length === 0, 'browser console/page errors during direct-final QA', { consoleErrors: relevantErrors });
  console.log('PASS: direct-final sequence status browser QA');
} finally {
  await browser.close();
}
