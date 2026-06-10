import puppeteer from 'puppeteer';

const BASE_URL = process.env.ADIPOLI_BASE_URL || 'http://127.0.0.1:3000';
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome';
const STORAGE = {
  m1: 'adipoli:module1:completedMissions',
  m2: 'adipoli:module2:completedMissions',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(message, details = {}) {
  console.error(`FAIL: ${message}`);
  if (Object.keys(details).length) console.error(JSON.stringify(details, null, 2));
  process.exit(1);
}

function assert(condition, message, details = {}) {
  if (!condition) fail(message, details);
}

async function pageState(page) {
  return page.evaluate(() => ({
    path: window.location.pathname,
    text: document.body.innerText,
    navVisible: Boolean(document.querySelector('nav')),
    searchVisible: Boolean(document.querySelector('[data-testid="global-search"], [aria-label="Search"]')),
    links: Array.from(document.querySelectorAll('a[href]')).map((link) => ({
      text: link.textContent?.trim().replace(/\s+/g, ' ') ?? '',
      href: link.getAttribute('href'),
    })),
    certificates: Array.from(document.querySelectorAll('[aria-label$="ability certificate"]')).map((node) => node.getAttribute('aria-label')),
  }));
}

async function setCompletedState(page) {
  await page.evaluateOnNewDocument((storage) => {
    window.localStorage.setItem(storage.m1, JSON.stringify(['greetFrauWeber', 'pleaseThanks', 'politeExit', 'firstMiniConversation']));
    window.localStorage.setItem(storage.m2, JSON.stringify(['selfIntro', 'spellName', 'fromKerala', 'jobLanguages', 'finalSelfIntro']));
  }, STORAGE);
}

async function setPartialModule1State(page) {
  await page.evaluateOnNewDocument((storage) => {
    window.localStorage.setItem(storage.m1, JSON.stringify(['greetFrauWeber']));
    window.localStorage.setItem(storage.m2, JSON.stringify([]));
  }, STORAGE);
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

  await setCompletedState(page);

  await page.goto(`${BASE_URL}/learn/1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(800);
  let state = await pageState(page);
  assert(state.path === '/learn/1', 'Module 1 completed landing did not load', state);
  assert(state.text.includes('Wie heißen Sie?'), 'Module 1 completed bridge should lead with the next spoken exam prompt', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('Examiner speaks. You answer.'), 'Module 1 completed bridge should keep one short two-person context line', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('Ich heiße ...'), 'Module 1 completed bridge should preview the next Module 2 output', { text: state.text.slice(0, 1000) });
  assert(!state.certificates.includes('Module 1 ability certificate'), 'Module 1 completed bridge should not show a lower certificate card', state);
  assert(!state.text.includes('Classroom survival'), 'Module 1 completed bridge should not repeat prior ability card', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Guten Morgen. Danke. Auf Wiedersehen.'), 'Module 1 completed bridge should not repeat old classroom proof', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('YOUR PATH'), 'Module 1 completed state should not show path dashboard label', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('See your path'), 'Module 1 completed state should not show expandable path map', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('3 steps'), 'Module 1 completed state should not repeat procedural step-count copy', { text: state.text.slice(0, 1000) });
  assert(!state.links.some((link) => link.text === 'Replay goodbye'), 'Module 1 completed bridge should not show a replay distraction', state);
  assert(
    state.links.some((link) => link.href === '/missions/module-2/self-intro?start=listen' && link.text === 'Start Module 2 speaking'),
    'Module 1 completed hero CTA should start Module 2 directly at listening',
    state
  );

  await page.goto(`${BASE_URL}/learn/2`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(800);
  state = await pageState(page);
  assert(state.path === '/learn/2', 'Module 2 completed landing did not load', state);
  assert(state.text.includes('Now handle numbers.'), 'Module 2 completed bridge should point to Module 3, not linger on a certificate', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('Price or phone number. Listen first.'), 'Module 2 completed bridge should keep one short Module 3 context line', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('0–20, prices, phone numbers'), 'Module 2 completed bridge should preview the next Module 3 output', { text: state.text.slice(0, 1000) });
  assert(!state.certificates.includes('Module 2 ability certificate'), 'Module 2 completed bridge should not show a lower certificate card', state);
  assert(!state.text.includes('Goethe self-intro'), 'Module 2 completed bridge should not repeat the prior ability card', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Ich heiße ... Ich komme aus Kerala.'), 'Module 2 completed bridge should not repeat old self-intro proof', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Exam answers'), 'Module 2 completed state should not show progress-map dashboard label', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('See your path'), 'Module 2 completed state should not show expandable path map', { text: state.text.slice(0, 1200) });
  assert(
    state.links.some((link) => link.href === '/learn/3' && link.text === 'Start Module 3 numbers'),
    'Module 2 completed hero CTA should start Module 3 directly',
    state
  );
  assert(!state.links.some((link) => link.text === 'Replay answer'), 'Module 2 completed bridge should not show a replay distraction', state);
  await page.click('a[href="/learn/3"]');
  await delay(500);
  state = await pageState(page);
  assert(state.path === '/learn/3', 'Module 2 completed hero CTA should navigate to Module 3', state);

  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(800);
  state = await pageState(page);
  assert(state.path === '/', 'Homepage completed compass did not load', state);
  assert(state.text.includes('You can introduce yourself.'), 'Homepage should surface completed Module 2 ability, not a generic resume line', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('Ich heiße ... Ich komme aus Kerala.'), 'Homepage should show the compact self-intro proof', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('ACHIEVEMENT UNLOCKED'), 'Homepage focused bridge should not show achievement popup clutter', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('Night Owl'), 'Homepage focused bridge should not show time-based achievement popup clutter', { text: state.text.slice(0, 1200) });
  assert(
    state.links.some((link) => link.href === '/learn/3' && link.text.includes('Start Module 3')),
    'Homepage completed compass should point to Module 3',
    state
  );
  assert(!state.text.includes('Continue your speaking path.'), 'Homepage completed compass should not use unfinished-path copy', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Next output:'), 'Homepage completed compass should not expose procedural Next output label', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Old lesson queue'), 'Homepage completed compass should not expose legacy lesson queue', { text: state.text.slice(0, 1200) });
  await page.click('a[href="/learn/3"]');
  await delay(500);
  state = await pageState(page);
  assert(state.path === '/learn/3', 'Homepage Start Module 3 CTA should navigate to Module 3', state);

  const partialHomePage = await browser.newPage();
  partialHomePage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  partialHomePage.on('pageerror', (err) => consoleErrors.push(err.message));
  await setPartialModule1State(partialHomePage);
  await partialHomePage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await delay(800);
  state = await pageState(partialHomePage);
  assert(state.path === '/', 'Homepage partial Module 1 compass did not load', state);
  assert(state.text.includes('Handle thank-you politely'), 'Homepage partial compass should surface the next Module 1 ability', { text: state.text.slice(0, 1000) });
  assert(state.text.includes('Danke. Bitte.'), 'Homepage partial compass should show only the next German output as proof', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Next output:'), 'Homepage partial compass should not show procedural Next output label', { text: state.text.slice(0, 1000) });
  assert(!state.text.includes('Continue Module 1 classroom path'), 'Homepage partial compass should not use long system-path copy', { text: state.text.slice(0, 1000) });
  assert(
    state.links.some((link) => link.href === '/missions/module-1/please-thanks?start=listen' && link.text.includes('Start listening')),
    'Homepage partial compass should start the next Module 1 mission at listening',
    state
  );

  const partialPage = await browser.newPage();
  partialPage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  partialPage.on('pageerror', (err) => consoleErrors.push(err.message));
  await setPartialModule1State(partialPage);
  await partialPage.goto(`${BASE_URL}/learn/1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await partialPage.waitForFunction(
    () => document.body.innerText.includes('Danke. Bitte.') && document.body.innerText.includes('Start listening'),
    { timeout: 10000 }
  );
  state = await pageState(partialPage);
  assert(state.path === '/learn/1', 'Module 1 partial landing did not load', state);
  assert(state.text.includes('Bitte.'), 'Module 1 partial state should spotlight the next spoken scene line', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('Handle thank-you politely'), 'Module 1 partial state should not lead with an abstract mission title', { text: state.text.slice(0, 1200) });
  assert(state.text.includes('Danke. Bitte.'), 'Module 1 partial state should show the next German output', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('NEXT WIN'), 'Module 1 partial state should not expose old next-win label', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('Your path'), 'Module 1 partial state should not show path-dashboard label', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('See your path'), 'Module 1 partial state should not show expandable path map', { text: state.text.slice(0, 1200) });
  assert(!state.text.includes('3 steps'), 'Module 1 partial state should not show procedural step-count copy', { text: state.text.slice(0, 1200) });
  assert(
    state.links.some((link) => link.href === '/missions/module-1/please-thanks?start=listen' && link.text === 'Start listening'),
    'Module 1 partial hero CTA should start the next mission listening step',
    state
  );
  await partialPage.click('a[href="/missions/module-1/please-thanks?start=listen"]');
  await partialPage.waitForFunction(() => window.location.pathname === '/missions/module-1/please-thanks', { timeout: 10000 });
  state = await pageState(partialPage);
  assert(state.path === '/missions/module-1/please-thanks', 'Module 1 partial CTA should navigate to the next mission', state);

  const relevantErrors = consoleErrors.filter((line) => !line.includes('favicon') && !line.includes('404'));
  assert(relevantErrors.length === 0, 'browser console/page errors during completed ability landing QA', { consoleErrors: relevantErrors });
  console.log(`PASS: completed ability landing QA (${BASE_URL})`);
} finally {
  await browser.close();
}
