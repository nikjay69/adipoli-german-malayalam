import puppeteer from 'puppeteer';

const BASE_URL = process.env.ADIPOLI_BASE_URL || 'http://127.0.0.1:3000';
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

async function pageState(page) {
  return page.evaluate(() => {
    const isVisible = (element) => {
      for (let node = element; node && node !== document.body; node = node.parentElement) {
        const style = window.getComputedStyle(node);
        if (node.classList?.contains('sr-only')) return false;
        if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity || '1') === 0) return false;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 2 && rect.height > 2;
    };

    const visibleText = (() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const chunks = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        const text = node.textContent?.replace(/\s+/g, ' ').trim();
        if (!parent || !text || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
        if (!isVisible(parent)) continue;
        chunks.push(text);
      }
      return chunks.join('\n');
    })();

    return {
      path: window.location.pathname,
      text: visibleText,
      classroomSceneVisible: Boolean(Array.from(document.querySelectorAll('[aria-label="Calm Kerala classroom visual for the first German mission"]')).some(isVisible)),
      buttons: Array.from(document.querySelectorAll('button')).map((button) => button.innerText.trim()).filter(Boolean),
      visibleButtons: Array.from(document.querySelectorAll('button')).filter(isVisible).map((button) => button.innerText.trim()).filter(Boolean),
      links: Array.from(document.querySelectorAll('a[href]')).map((link) => ({
        text: link.textContent?.trim() ?? '',
        href: link.getAttribute('href'),
      })),
      visibleLinks: Array.from(document.querySelectorAll('a[href]')).filter(isVisible).map((link) => ({
        text: link.textContent?.trim() ?? '',
        href: link.getAttribute('href'),
      })),
      sceneVariants: Array.from(document.querySelectorAll('[data-kerala-scene-variant]'))
        .filter(isVisible)
        .map((scene) => scene.getAttribute('data-kerala-scene-variant')),
      nav: Boolean(document.querySelector('nav')),
      search: Boolean(document.querySelector('[role="search"], input[type="search"]')),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };
  });
}

async function gotoPath(page, pathOrRoute) {
  const expectedPath = pathOrRoute.split('?')[0];
  const url = `${BASE_URL}${pathOrRoute}`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      (pathName) => window.location.pathname === pathName && document.body.innerText.trim().length > 20,
      { timeout: 15000 },
      expectedPath
    );
    return;
  } catch (firstError) {
    const current = await page.evaluate(() => ({ path: window.location.pathname, textLength: document.body.innerText.trim().length })).catch(() => null);
    if (current?.path === expectedPath && current.textLength > 20) return;
    await page.goto('about:blank', { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      (pathName) => window.location.pathname === pathName && document.body.innerText.trim().length > 20,
      { timeout: 15000 },
      expectedPath
    ).catch((secondError) => {
      throw secondError instanceof Error ? secondError : firstError;
    });
  }
}

async function completeModule1Mission(page, { route, missionId, winTestId, answerPattern, expectedAbility, nextHref, nextPath, nextSceneText, nextVisibleLine, hiddenNextTitle }) {
  const currentPath = await page.evaluate(() => window.location.pathname).catch(() => '');
  if (currentPath !== route) {
    await gotoPath(page, `${route}?start=listen`);
  }
  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 12000 });
  await delay(500);

  let state = await pageState(page);
  assert(state.path === route, `${missionId}: mission route did not load`, state);
  assert(!state.nav && !state.search, `${missionId}: focused mission route should hide nav/search`, state);
  assert(state.text.includes('Your line') && !state.text.includes('Your reply'), `${missionId}: Module 1 audio label should be action/role copy, not system-ish reply copy`, { text: state.text.slice(0, 900) });
  assert(state.sceneVariants.includes('ai-study'), `${missionId}: Module 1 mission should use the route-scoped AI classroom visual inside the scene`, state);
  assert(state.scrollWidth <= state.innerWidth + 1, `${missionId}: mobile horizontal overflow`, state);

  let completion = await page.evaluate((key, id, winId) => {
    const completed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return {
      completed,
      hasInlineWin: Boolean(document.querySelector(`[data-testid="${winId}"]`)),
      modelAudioFinished: document.querySelector('[data-testid="immersive-reply-step"]')?.getAttribute('data-model-audio-finished'),
      visibleRepairChoices: Array.from(document.querySelectorAll('[data-testid="inline-repair-choice"] button')).map((button) => button.textContent?.trim()),
    };
  }, 'adipoli:module1:completedMissions', missionId, winTestId);
  assert(!completion.completed.includes(missionId), `${missionId}: mission must not complete on page load`, completion);
  assert(!completion.hasInlineWin, `${missionId}: ability win must not show before repair`, completion);
  assert(completion.modelAudioFinished === 'false' && completion.visibleRepairChoices.length === 0, `${missionId}: repair choices must stay gated until audio ends`, completion);

  await page.evaluate(() => {
    const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
    audio?.dispatchEvent(new Event('ended', { bubbles: true }));
  });
  await page.waitForFunction(() => {
    const step = document.querySelector('[data-testid="immersive-reply-step"]');
    const choices = document.querySelectorAll('[data-testid="inline-repair-choice"] button');
    return step?.getAttribute('data-model-audio-finished') === 'true' && choices.length >= 2;
  }, { timeout: 5000 });

  completion = await page.evaluate((key, id, winId) => {
    const completed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return {
      completed,
      hasInlineWin: Boolean(document.querySelector(`[data-testid="${winId}"]`)),
      visibleRepairChoices: Array.from(document.querySelectorAll('[data-testid="inline-repair-choice"] button')).map((button) => button.textContent?.trim()),
    };
  }, 'adipoli:module1:completedMissions', missionId, winTestId);
  assert(!completion.completed.includes(missionId), `${missionId}: mission must not complete after passive listening only`, completion);
  assert(!completion.hasInlineWin, `${missionId}: ability win must wait for correct repair`, completion);
  state = await pageState(page);
  assert(state.text.includes('Say it aloud. Then tap it.'), `${missionId}: production cue should tell learner to speak before tapping`, { text: state.text.slice(0, 900) });

  const clicked = await page.evaluate((patternSource) => {
    const pattern = new RegExp(patternSource, 'i');
    const buttons = Array.from(document.querySelectorAll('[data-testid="inline-repair-choice"] button'));
    const answer = buttons.find((button) => pattern.test(button.textContent ?? ''));
    answer?.click();
    return Boolean(answer);
  }, answerPattern.source);
  assert(clicked, `${missionId}: could not find the correct repair choice`, completion);

  await page.waitForFunction((key, id, href) => {
    const completed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return completed.includes(id) && Boolean(document.querySelector(`a[href="${href}"]`));
  }, { timeout: 8000 }, 'adipoli:module1:completedMissions', missionId, nextHref);
  await delay(350);

  state = await pageState(page);
  assert(state.text.includes(expectedAbility), `${missionId}: ability win should appear only after repair`, { text: state.text.slice(0, 900) });
  assert(state.links.some((link) => link.href === nextHref), `${missionId}: next mission handoff link missing`, state);
  assert(state.text.includes(nextVisibleLine), `${missionId}: handoff card should preview the next spoken line, not a mission-title card`, { text: state.text.slice(0, 900) });
  assert(!state.text.includes(hiddenNextTitle), `${missionId}: handoff card should hide abstract next-mission title from the visible learner surface`, { text: state.text.slice(0, 900) });

  const clickedNext = await page.evaluate((href) => {
    const link = document.querySelector(`a[href="${href}"]`);
    link?.scrollIntoView({ block: 'center', inline: 'center' });
    link?.click();
    return Boolean(link);
  }, nextHref);
  assert(clickedNext, `${missionId}: next handoff link could not be clicked`, state);
  await page.waitForFunction((pathName) => window.location.pathname === pathName, { timeout: 15000 }, nextPath);
  await page.waitForFunction((text) => document.body.innerText.includes(text), { timeout: 15000 }, nextSceneText);
  await delay(700);
  state = await pageState(page);
  assert(state.path === nextPath, `${missionId}: next handoff did not reach expected route`, state);
  assert(state.text.includes(nextSceneText), `${missionId}: next handoff should open the spoken scene, not a preamble`, { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), `${missionId}: handoff path should not show a competing Back button`, state);
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

  await gotoPath(page, '/');
  await page.evaluate((keys) => {
    for (const key of keys) window.localStorage.removeItem(key);
  }, STORAGE_KEYS);
  await gotoPath(page, '/');
  await delay(1200);
  let state = await pageState(page);

  assert(state.path === '/', 'website first page should stay on /, not redirect to /intro', state);
  assert(state.text.includes('German for Malayalis.'), 'website first page headline missing', { text: state.text.slice(0, 700) });
  assert(state.text.includes('Goethe A1 with Kerala context and real German audio.'), 'website first page should frame the course promise without a text wall', { text: state.text.slice(0, 700) });
  assert(state.text.includes('Frau Weber') && state.text.includes('Guten Morgen, Frau Weber.'), 'website first page should open with a concrete German exchange, not a course explainer', { text: state.text.slice(0, 700) });
  assert(!state.text.includes('Meet the course and learning path'), 'website first page should not show numbered course-planning cards', { text: state.text.slice(0, 700) });
  assert(!state.text.includes('Guided A1 start'), 'website first page should not expose setup labels', { text: state.text.slice(0, 700) });
  assert(!state.text.includes('Hear model'), 'website first page should not show old promise chips', { text: state.text.slice(0, 700) });
  assert(state.classroomSceneVisible, 'website first page should show the route-scoped AI study visual', state);
  assert(state.sceneVariants.length === 1 && state.sceneVariants[0] === 'ai-study', 'website first page should use the AI study visual, not the abstract placeholder', state);
  assert(
    state.links.some((link) => link.href === '/missions/module-1/greet-frau-weber?start=listen' && link.text.toLowerCase().includes('start listening')),
    'website first page should route directly to the first listening mission, not the intro loop',
    state
  );

  await page.click('a[href="/missions/module-1/greet-frau-weber?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-1/greet-frau-weber', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.path === '/missions/module-1/greet-frau-weber', 'website first page CTA did not reach first M1 mission', state);
  assert(state.text.includes('Morning class.'), 'website first page CTA should bypass the old intro loop and start in the conversation scene', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'root-to-listening path should not show a competing Back button', state);

  await gotoPath(page, '/intro');
  await page.waitForFunction(() => document.body.innerText.includes('Your first German moment.'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);

  assert(state.path === '/intro', 'intro did not load on /intro', state);
  assert(state.sceneVariants.length === 1 && state.sceneVariants[0] === 'kochi-room', 'intro should use one route-scoped Kerala room support visual', state);
  assert(state.text.includes('Your first German moment.'), 'single-screen intro headline missing', { text: state.text.slice(0, 700) });
  assert(!state.text.includes('No dashboard wandering'), 'intro should not expose internal product-goal copy', { text: state.text.slice(0, 700) });
  assert(state.text.includes('Meet Frau Weber, hear a real classroom greeting'), 'intro scene promise missing', { text: state.text.slice(0, 700) });
  assert(
    state.buttons.length === 1 && state.buttons[0].toLowerCase().includes('begin lesson 1'),
    'intro should expose exactly one primary CTA',
    state
  );
  assert(!state.text.includes('What happens next'), 'old middle intro slide still visible', { text: state.text.slice(0, 700) });

  await Promise.allSettled([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
    page.evaluate(() => {
      const beginButton = Array.from(document.querySelectorAll('button')).find((button) =>
        button.textContent?.toLowerCase().includes('begin lesson 1')
      );
      if (!(beginButton instanceof HTMLButtonElement)) throw new Error('Begin lesson 1 button missing');
      beginButton.click();
    }),
  ]);
  await delay(2500);
  state = await pageState(page);
  assert(state.path === '/missions/module-1/greet-frau-weber', 'intro CTA did not route directly to first M1 mission', state);
  assert(state.text.includes('Morning class.'), 'intro CTA should bypass mission preamble and start in the conversation scene', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'intro-to-listening path should not show a competing Back button', state);

  await gotoPath(page, '/learn/1');
  await page.waitForFunction(() => document.body.innerText.includes('Guten Morgen.'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.path === '/learn/1', 'Module 1 landing did not load on /learn/1', state);
  assert(!state.sceneVariants.includes('kochi-room'), 'Kochi room visual experiment should stay scoped to /intro', state);
  assert(state.text.includes('Guten Morgen.'), 'Module 1 landing should lead with the spoken scene line, not a mission-title label', { text: state.text.slice(0, 900) });
  assert(state.text.includes('Frau Weber speaks. You answer.'), 'Module 1 landing should frame the scene as a two-person exchange', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Greet Frau Weber without freezing'), 'Module 1 landing should not lead with an abstract mission title', { text: state.text.slice(0, 900) });
  assert(state.text.includes('Guten Morgen, Frau Weber. Ich lerne Deutsch.'), 'Module 1 landing phrase preview missing', { text: state.text.slice(0, 900) });
  assert(state.classroomSceneVisible, 'Module 1 landing should show the two-person classroom scene on mobile', state);
  assert(state.sceneVariants.length === 1 && state.sceneVariants[0] === 'ai-study', 'Module 1 landing should use the adult-safe AI study visual as scene support, not the abstract placeholder', state);
  assert(!state.text.includes('Open a classroom moment.'), 'Module 1 landing should not use generic dashboard headline', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Next output'), 'Module 1 landing should not expose duplicated product labels', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Three short classroom wins'), 'Module 1 landing should keep progress copy compact', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 1 focused landing should not show a competing Back button', state);
  assert(
    state.visibleLinks.filter((link) => link.text.toLowerCase().includes('start listening')).length === 1,
    'Module 1 focused landing should expose one visible primary Start listening link',
    state
  );
  assert(
    state.links.some((link) => link.href === '/missions/module-1/greet-frau-weber?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 1 landing primary CTA should jump straight to listening',
    state
  );
  await page.click('a[href="/missions/module-1/greet-frau-weber?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-1/greet-frau-weber', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.path === '/missions/module-1/greet-frau-weber', 'Module 1 landing CTA did not reach first mission', state);
  assert(state.text.includes('Morning class.'), 'Module 1 landing CTA should bypass mission preamble and start in the conversation scene', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 1 landing-to-listening path should not show a competing Back button', state);

  await gotoPath(page, '/');
  await page.evaluate(() => {
    window.localStorage.setItem('adipoli:module1:completedMissions', JSON.stringify(['greetFrauWeber']));
  });
  await gotoPath(page, '/learn/1');
  await page.waitForFunction(() => document.body.innerText.includes('Bitte.'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Danke. Bitte.'), 'Module 1 partial-progress landing should surface please/thanks as the next spoken output', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Next classroom line'), 'Module 1 partial-progress landing should not expose progress/chore copy visibly', { text: state.text.slice(0, 900) });
  assert(
    state.links.some((link) => link.href === '/missions/module-1/please-thanks?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 1 partial-progress CTA should jump straight to please-thanks listening',
    state
  );
  await page.click('a[href="/missions/module-1/please-thanks?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-1/please-thanks', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Bitte.'), 'Module 1 please-thanks CTA should start in the two-person spoken scene', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Handle thank-you politely'), 'Module 1 please-thanks mission should not land on a preamble/title card first', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Danke. Bitte.'), 'Module 1 please-thanks scene should hide the learner reply until audio finishes', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 1 please-thanks listening path should not show a competing Back button', state);

  await gotoPath(page, '/');
  await page.evaluate(() => {
    window.localStorage.setItem('adipoli:module1:completedMissions', JSON.stringify(['greetFrauWeber', 'pleaseThanks']));
  });
  await gotoPath(page, '/learn/1');
  await page.waitForFunction(() => document.body.innerText.includes('Auf Wiedersehen.'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Vielen Dank. Auf Wiedersehen.'), 'Module 1 later-progress landing should surface polite-exit as the next spoken output', { text: state.text.slice(0, 900) });
  assert(
    state.links.some((link) => link.href === '/missions/module-1/polite-exit?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 1 later-progress CTA should jump straight to polite-exit listening',
    state
  );
  await page.click('a[href="/missions/module-1/polite-exit?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-1/polite-exit', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Auf Wiedersehen.'), 'Module 1 polite-exit CTA should start in the spoken goodbye scene', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Leave the room politely'), 'Module 1 polite-exit mission should not land on a preamble/title card first', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Vielen Dank. Auf Wiedersehen.'), 'Module 1 polite-exit scene should hide the learner reply until audio finishes', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 1 polite-exit listening path should not show a competing Back button', state);

  await gotoPath(page, '/');
  await page.evaluate((key) => window.localStorage.removeItem(key), 'adipoli:module1:completedMissions');
  await completeModule1Mission(page, {
    route: '/missions/module-1/greet-frau-weber',
    missionId: 'greetFrauWeber',
    winTestId: 'greet-frau-weber-inline-win',
    answerPattern: /Guten Morgen, Frau Weber\./,
    expectedAbility: 'Guten Morgen, Frau Weber. Ich lerne Deutsch.',
    nextHref: '/missions/module-1/please-thanks?start=listen',
    nextPath: '/missions/module-1/please-thanks',
    nextSceneText: 'Bitte.',
    nextVisibleLine: 'Danke. Bitte.',
    hiddenNextTitle: 'Handle thank-you politely',
  });
  await completeModule1Mission(page, {
    route: '/missions/module-1/please-thanks',
    missionId: 'pleaseThanks',
    winTestId: 'please-thanks-inline-win',
    answerPattern: /^Danke\.$/,
    expectedAbility: 'Danke. Bitte.',
    nextHref: '/missions/module-1/polite-exit?start=listen',
    nextPath: '/missions/module-1/polite-exit',
    nextSceneText: 'Auf Wiedersehen.',
    nextVisibleLine: 'Vielen Dank. Auf Wiedersehen.',
    hiddenNextTitle: 'Leave the room politely',
  });
  await completeModule1Mission(page, {
    route: '/missions/module-1/polite-exit',
    missionId: 'politeExit',
    winTestId: 'polite-exit-inline-win',
    answerPattern: /^Auf Wiedersehen\.$/,
    expectedAbility: 'Vielen Dank. Auf Wiedersehen.',
    nextHref: '/missions/module-1/first-mini-conversation?start=listen',
    nextPath: '/missions/module-1/first-mini-conversation',
    nextSceneText: 'Guten Tag.',
    nextVisibleLine: 'Guten Tag, Frau Weber. Gut, danke. Auf Wiedersehen.',
    hiddenNextTitle: 'Run the first mini-conversation',
  });
  await completeModule1Mission(page, {
    route: '/missions/module-1/first-mini-conversation',
    missionId: 'firstMiniConversation',
    winTestId: 'first-mini-conversation-inline-win',
    answerPattern: /^Guten Tag, Frau Weber\. Gut, danke\.$/,
    expectedAbility: 'Guten Tag. Noch einmal, bitte. Auf Wiedersehen.',
    nextHref: '/missions/module-1/checkpoint?start=listen',
    nextPath: '/missions/module-1/checkpoint',
    nextSceneText: 'First German moment.',
    nextVisibleLine: 'Module 1 checkpoint',
    hiddenNextTitle: 'Check the first German moment.',
  });
  const module1Closure = await page.evaluate(() => JSON.parse(window.localStorage.getItem('adipoli:module1:completedMissions') || '[]'));
  assert(
    ['greetFrauWeber', 'pleaseThanks', 'politeExit', 'firstMiniConversation'].every((id) => module1Closure.includes(id)),
    'Module 1 sequence should persist all four mission completions after output/repair gates',
    { module1Closure }
  );

  await gotoPath(page, '/learn/2');
  await page.waitForFunction(() => document.body.innerText.includes('Tell the examiner your name'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.path === '/learn/2', 'Module 2 landing did not load on /learn/2', state);
  assert(state.text.includes('Tell the examiner your name'), 'Module 2 landing should lead with the current mission, not generic module copy', { text: state.text.slice(0, 900) });
  assert(state.text.includes('Listen to the examiner first.'), 'Module 2 landing should keep the first action short', { text: state.text.slice(0, 900) });
  assert(state.text.includes('Ich heiße ...'), 'Module 2 landing phrase preview missing', { text: state.text.slice(0, 900) });
  assert(state.classroomSceneVisible, 'Module 2 landing should show the two-person Goethe-room scene on mobile', state);
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 2 focused landing should not show a competing Back button', state);
  assert(
    state.visibleLinks.filter((link) => link.text.toLowerCase().includes('start listening')).length === 1,
    'Module 2 focused landing should expose one visible primary Start listening link',
    state
  );
  assert(
    state.links.some((link) => link.href === '/missions/module-2/self-intro?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 2 landing primary CTA should jump straight to self-intro listening',
    state
  );
  await page.click('a[href="/missions/module-2/self-intro?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-2/self-intro', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.path === '/missions/module-2/self-intro', 'Module 2 landing CTA did not reach first mission', state);
  assert(state.text.includes('Goethe room.'), 'Module 2 landing CTA should bypass mission preamble and start in the conversation scene', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 2 landing-to-listening path should not show a competing Back button', state);

  await gotoPath(page, '/');
  await page.evaluate(() => {
    window.localStorage.setItem('adipoli:module2:completedMissions', JSON.stringify(['selfIntro']));
  });
  await gotoPath(page, '/learn/2');
  await page.waitForFunction(() => document.body.innerText.includes('Spell a Kerala name cleanly'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Spell a Kerala name cleanly'), 'Module 2 partial-progress landing should surface the next mission', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Continue 2'), 'Module 2 partial-progress CTA should not expose sequence-number chore copy', { text: state.text.slice(0, 900) });
  assert(
    state.links.some((link) => link.href === '/missions/module-2/spell-name?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 2 partial-progress CTA should jump straight to next mission listening',
    state
  );
  await page.click('a[href="/missions/module-2/spell-name?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-2/spell-name', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Buchstabieren Sie bitte.'), 'Module 2 next-mission CTA should bypass spelling preamble and start in the spoken scene', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Spell your Kerala name.'), 'Module 2 next-mission CTA should not land on the intro card first', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Spell your name.'), 'Module 2 next-mission scene should not use an extra explanatory title', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('K-U-T-T-A-N.'), 'Module 2 next-mission scene should hide the learner reply until audio finishes', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 2 next-mission listening path should not show a competing Back button', state);

  await gotoPath(page, '/');
  await page.evaluate(() => {
    window.localStorage.setItem('adipoli:module2:completedMissions', JSON.stringify(['selfIntro', 'spellName']));
  });
  await gotoPath(page, '/learn/2');
  await page.waitForFunction(() => document.body.innerText.includes('Say where you come from'), { timeout: 12000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Ich komme aus Kerala.'), 'Module 2 origin-progress landing should surface the next spoken output', { text: state.text.slice(0, 900) });
  assert(
    state.links.some((link) => link.href === '/missions/module-2/from-kerala?start=listen' && link.text.toLowerCase().includes('start listening')),
    'Module 2 origin-progress CTA should jump straight to origin listening',
    state
  );
  await page.click('a[href="/missions/module-2/from-kerala?start=listen"]');
  await page.waitForFunction(() => window.location.pathname === '/missions/module-2/from-kerala', { timeout: 10000 });
  await delay(1200);
  state = await pageState(page);
  assert(state.text.includes('Woher kommen Sie?'), 'Module 2 origin CTA should start in the spoken origin scene', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Say where you’re from.'), 'Module 2 origin mission should not land on a preamble/title card first', { text: state.text.slice(0, 900) });
  assert(!state.text.includes('Ich wohne in Kochi.'), 'Module 2 origin scene should hide the learner reply until audio finishes', { text: state.text.slice(0, 900) });
  assert(!state.visibleButtons.some((button) => button.toLowerCase().includes('back')), 'Module 2 origin listening path should not show a competing Back button', state);

  const relevantErrors = consoleErrors.filter((line) => !line.includes('favicon') && !line.includes('404'));
  assert(relevantErrors.length === 0, 'browser console/page errors during intro start-path QA', { consoleErrors: relevantErrors });
  console.log('PASS: intro start-path browser QA (/ → first mission, /intro → mission, /learn/1 → listening, /learn/2 fresh+partial+origin → listening)');
} finally {
  await browser.close();
}
