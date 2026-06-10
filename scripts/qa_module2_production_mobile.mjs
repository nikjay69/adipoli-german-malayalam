#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = process.cwd();
const BASE_URL = process.env.ADIPOLI_QA_BASE_URL || 'http://100.96.56.53:3000';

const immersiveMissions = [
  ['/missions/module-1/greet-frau-weber', 'm1-greet', 'Guten Morgen', /guten morgen/i],
  ['/missions/module-1/please-thanks', 'm1-please-thanks', 'Danke. Bitte.', /^Danke\./i],
  ['/missions/module-1/polite-exit', 'm1-polite-exit', 'Vielen Dank. Auf Wiedersehen.', /auf wiedersehen/i],
  ['/missions/module-2/self-intro', 'm2-self-intro', 'Ich heiße Kuttan', /Ich komme aus Kerala/i],
  ['/missions/module-2/spell-name', 'm2-spell-name', 'K U T T A N', /Kah - Ooh - Tay/i],
  ['/missions/module-2/from-kerala', 'm2-from-kerala', 'Ich komme aus Kerala und wohne in Kochi', /Ich komme aus Kerala/i],
  ['/missions/module-2/job-languages', 'm2-job-languages', 'Ich bin Student und spreche Malayalam und Englisch', /Ich bin Student/i],
  ['/missions/module-2/final-self-intro', 'm2-final-self-intro', 'Ich heiße Kuttan. Ich komme aus Kerala.', /Ich heiße Kuttan/i],
];

const module2SequenceMissions = [
  {
    route: '/missions/module-2/self-intro',
    name: 'm2-self-intro',
    completedId: 'selfIntro',
    correctAnswer: /Ich komme aus Kerala/i,
    expectedNextPath: '/missions/module-2/spell-name',
    expectedNextSearch: 'start=listen',
  },
  {
    route: '/missions/module-2/spell-name',
    name: 'm2-spell-name',
    completedId: 'spellName',
    correctAnswer: /Kah - Ooh - Tay/i,
    expectedNextPath: '/missions/module-2/from-kerala',
    expectedNextSearch: 'start=listen',
  },
  {
    route: '/missions/module-2/from-kerala',
    name: 'm2-from-kerala',
    completedId: 'fromKerala',
    correctAnswer: /Ich komme aus Kerala/i,
    expectedNextPath: '/missions/module-2/job-languages',
    expectedNextSearch: 'start=listen',
  },
  {
    route: '/missions/module-2/job-languages',
    name: 'm2-job-languages',
    completedId: 'jobLanguages',
    correctAnswer: /Ich bin Student und spreche Malayalam und Englisch/i,
    expectedNextPath: '/missions/module-2/final-self-intro',
    expectedNextSearch: 'start=listen',
  },
  {
    route: '/missions/module-2/final-self-intro',
    name: 'm2-final-self-intro',
    completedId: 'finalSelfIntro',
    correctAnswer: /Ich heiße Kuttan\. Ich komme aus Kerala/i,
    expectedNextPath: '/learn/3',
    expectedNextSearch: '',
  },
];

function getImmersiveStepForMission(name) {
  if (name === 'm1-greet' || name === 'm1-please-thanks' || name === 'm2-job-languages') return 0;
  if (name === 'm1-polite-exit' || name === 'm2-spell-name' || name === 'm2-from-kerala') return 1;
  return 3;
}

function assertSourceProductionGate() {
  const missionUi = fs.readFileSync(path.join(ROOT, 'src/app/missions/module-2/_components/MissionUI.tsx'), 'utf8');
  const required = [
    'data-testid="immersive-reply-step"',
    'data-testid="speak-write-step"',
    'data-testid="tiny-write-step"',
    'data-optional-anchor-hidden={!requireTyped && !modelAudioFinished ? \'true\' : \'false\'}',
    "className={clsx(!requireTyped && !modelAudioFinished && 'sr-only')}",
    'data-testid="tiny-write-input"',
    'data-testid="immersive-model-line"',
    'data-pre-audio-buttons={modelAudioFinished ? \'false\' : \'blocked\'}',
    'aria-hidden={!modelAudioFinished}',
    'data-testid="speak-write-prompt"',
    'data-testid="optional-anchor-note"',
    'data-testid="hear-step-instructions"',
    'data-testid="recognition-prompt"',
    'data-audio-surface={bare ? \'flat\' : \'card\'}',
    'bare?: boolean',
    '<p className="sr-only" data-testid="hear-step-instructions">{instructions}</p>',
    '<p className="sr-only" data-testid="recognition-prompt">{prompt}</p>',
    'data-model-line-hidden={modelAudioFinished ? \'false\' : \'true\'}',
    "modelAudioFinished ? 'opacity-100' : 'sr-only'",
    'data-model-audio-finished={modelAudioFinished ? \'true\' : \'false\'}',
    "data-typing-locked={modelAudioFinished ? 'false' : 'true'}",
    "placeholder={modelAudioFinished ? placeholder : 'Listen first…'}",
    'disabled={!modelAudioFinished}',
    'const primaryDisabled = !modelAudioFinished || (requireTyped && continueDisabled)',
    'onEnded={() => setModelAudioFinished(true)}',
    "sceneLabel = 'Goethe Kochi mock'",
    'sceneLabel?: string',
    'Optional. Speak first.',
    'Finish the scene audio to unlock the next action.',
    'Next action ready.',
    '<PrimaryButton onClick={onContinue}>{cta}</PrimaryButton>',
    'pointer-events-none fixed inset-0 overflow-hidden',
    'useMissionStepForQA',
    "params.get('adipoliQa') !== '1'",
    "window.location.hostname.startsWith('100.96.')",
  ];
  const missing = required.filter((snippet) => !missionUi.includes(snippet));
  if (missing.length) throw new Error(`Production/mobile source gate missing: ${missing.join(' | ')}`);

  const immersiveSources = [
    ['src/app/missions/module-1/greet-frau-weber/page.tsx', 'm1-greet'],
    ['src/app/missions/module-1/please-thanks/page.tsx', 'm1-please-thanks'],
    ['src/app/missions/module-1/polite-exit/page.tsx', 'm1-polite-exit'],
    ['src/app/missions/module-2/self-intro/page.tsx', 'm2-self-intro'],
    ['src/app/missions/module-2/spell-name/page.tsx', 'm2-spell-name'],
    ['src/app/missions/module-2/from-kerala/page.tsx', 'm2-from-kerala'],
    ['src/app/missions/module-2/job-languages/page.tsx', 'm2-job-languages'],
    ['src/app/missions/module-2/final-self-intro/page.tsx', 'm2-final-self-intro'],
  ];
  for (const [relativePath, name] of immersiveSources) {
    const source = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
    const hasSeparateSpeakWrite = source.includes('<ReplyAloudStep') && source.includes('<TinyWriteStep');
    const hasMergedSpeakWrite = source.includes('<SpeakWriteStep');
    const hasVoiceFirstRepair = source.includes('<SpeakRepairStep') || source.includes('<ConversationRepairStep');
    const hasVoiceOnlyReply = source.includes('<ReplyAloudStep') && source.includes('<RepairStep');
    if (!hasSeparateSpeakWrite && !hasMergedSpeakWrite && !hasVoiceFirstRepair && !hasVoiceOnlyReply) throw new Error(`${name}: missing immersive voice-first step`);
    if (!hasMergedSpeakWrite && !hasVoiceFirstRepair && !hasVoiceOnlyReply) throw new Error(`${name}: phone path must use merged SpeakWriteStep, SpeakRepairStep, or voice-only ReplyAloudStep + RepairStep`);
    if (hasSeparateSpeakWrite) throw new Error(`${name}: separate ReplyAloudStep + TinyWriteStep chore screens returned`);
    if (source.includes('<BuilderStep') || source.includes('<ProductionStep')) throw new Error(`${name}: converted immersive path must not use builder/production chore steps`);
    if (!hasVoiceFirstRepair && !hasVoiceOnlyReply && !source.includes('requireTyped={false}')) throw new Error(`${name}: phone-first path must make tiny writing optional after audio, not a gate`);
    if (source.includes('title="Say it, then type it."')) throw new Error(`${name}: chore copy returned on immersive step`);
    if (name.startsWith('m1-') && !source.includes('sceneLabel="Kerala classroom"')) throw new Error(`${name}: Module 1 must show the Kerala classroom scene label, not a generic Goethe mock label`);
  }
  const selfIntro = fs.readFileSync(path.join(ROOT, 'src/app/missions/module-2/self-intro/page.tsx'), 'utf8');
  if (!selfIntro.includes('data-testid="flat-question-card"') || !selfIntro.includes('<NativeAudio src={currentQuestionReference.audio} label="Question" compact bare />')) {
    throw new Error('m2-self-intro: recognition question card must stay flat and use flat audio surface');
  }
  if (!selfIntro.includes('<p className="sr-only">{currentQuestionReference.answer}</p>') || selfIntro.includes('text-[#f1d27a]">{currentQuestionReference.answer}</p>')) {
    throw new Error('m2-self-intro: recognition question card must not reveal the answer before the learner chooses');
  }
  if (selfIntro.includes('rounded-[1.8rem] border border-white/12 bg-white/[0.04] p-4') || selfIntro.includes('rounded-2xl border border-white/10 bg-[#0f1d14]/65 p-4')) {
    throw new Error('m2-self-intro: nested dashboard-like recognition question card returned');
  }

  const firstM1Win = fs.readFileSync(path.join(ROOT, 'src/app/missions/module-1/greet-frau-weber/page.tsx'), 'utf8');
  if (firstM1Win.includes('label="Review"') || firstM1Win.includes('audioSources.ichLerneDeutsch')) {
    throw new Error('m1-greet: first win screen reintroduced a review-audio chore instead of ending cleanly');
  }

  if (!missionUi.includes("const nextHref = nextMission ? `${nextMission.href}${nextMission.href.includes('?') ? '&' : '?'}start=listen` : '/learn/2';")) {
    throw new Error('m1 sequence: next mission card must bypass repeated intro screens and open the next audio scene directly');
  }
}


async function inspectRoute(page, route, name) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await new Promise((resolve) => setTimeout(resolve, 400));
  const state = await page.evaluate(() => {
    const body = document.body.innerText;
    const audios = Array.from(document.querySelectorAll('audio')).map((audio) => ({
      src: audio.currentSrc || audio.src,
      readyState: audio.readyState,
      error: audio.error ? audio.error.code : null,
      controls: audio.controls,
    }));
    return {
      nav: Boolean(document.querySelector('nav')),
      search: Boolean(document.querySelector('[role="search"], input[type="search"]')),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasFocusedProgress: Boolean(document.querySelector('[aria-hidden="true"]')),
      hasStartCta: /\b(Start|Begin|Listen)\b/i.test(body),
      audios,
      bodyStart: body.slice(0, 500),
    };
  });
  if (state.nav || state.search) throw new Error(`${name}: focused chrome regression nav=${state.nav} search=${state.search}`);
  if (state.scrollWidth > state.innerWidth + 1) throw new Error(`${name}: mobile horizontal overflow ${state.scrollWidth} > ${state.innerWidth}`);
  if (!state.hasFocusedProgress || !state.hasStartCta) throw new Error(`${name}: focused mission start not visible: ${state.bodyStart}`);
  console.log(`mobile_route[${name}]=PASS overflow=${state.scrollWidth}/${state.innerWidth} nav=${state.nav} search=${state.search}`);
  return state;
}


async function inspectImmersiveStep(page, route, name, typedValue, repairAnswerPattern) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  const immersiveStep = getImmersiveStepForMission(name);
  await page.goto(`${BASE_URL}${route}?adipoliQa=1&adipoliQaStep=${immersiveStep}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 15000 });
  await new Promise((resolve) => setTimeout(resolve, 300));

  const before = await page.evaluate(() => {
    const step = document.querySelector('[data-testid="immersive-reply-step"]');
    const merged = Boolean(document.querySelector('[data-testid="speak-write-step"]'));
    const stepKind = step?.getAttribute('data-step-kind');
    const repairOnly = stepKind === 'speak-repair' || stepKind === 'conversation-repair';
    const replyOnly = step?.getAttribute('data-step-kind') === 'reply-aloud';
    const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
    const cta = Array.from(document.querySelectorAll('button')).find((button) => /write|repair|trap|fix/i.test(button.textContent ?? ''));
    const input = document.querySelector('[data-testid="tiny-write-input"]');
    const inlineRepair = document.querySelector('[data-testid="inline-repair-choice"]');
    return {
      merged,
      repairOnly,
      replyOnly,
      stepFinished: step?.getAttribute('data-model-audio-finished'),
      modelLineHidden: document.querySelector('[data-testid="immersive-model-line"]')?.getAttribute('data-model-line-hidden'),
      ctaDisabled: repairOnly ? true : cta?.disabled ?? null,
      inputDisabled: input?.disabled ?? null,
      repairHidden: inlineRepair?.classList.contains('sr-only') ?? null,
      repairButtonsBeforeAudio: inlineRepair?.querySelectorAll('button').length ?? null,
      preAudioButtonGate: inlineRepair?.getAttribute('data-pre-audio-buttons') ?? null,
      audioReadyState: audio?.readyState ?? -1,
      audioError: audio?.error?.code ?? null,
      nav: Boolean(document.querySelector('nav')),
      search: Boolean(document.querySelector('[role="search"], input[type="search"]')),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      bodyStart: document.body.innerText.slice(0, 500),
    };
  });
  if (before.nav || before.search) throw new Error(`${name}: immersive QA chrome regression nav=${before.nav} search=${before.search}`);
  if (before.scrollWidth > before.innerWidth + 1) throw new Error(`${name}: immersive QA overflow ${before.scrollWidth} > ${before.innerWidth}`);
  if (before.stepFinished !== 'false' || before.modelLineHidden !== 'true' || before.ctaDisabled !== true || before.audioReadyState < 1 || before.audioError !== null) {
    throw new Error(`${name}: immersive reply not audio-first/text-hidden before audio finish: ${JSON.stringify(before)}`);
  }
  if (before.repairOnly && (before.repairHidden !== true || before.repairButtonsBeforeAudio !== 0 || before.preAudioButtonGate !== 'blocked')) {
    throw new Error(`${name}: repair choices must not be visible/clickable before audio finishes: ${JSON.stringify(before)}`);
  }

  await page.evaluate(() => {
    const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
    audio?.dispatchEvent(new Event('ended', { bubbles: true }));
  });
  await page.waitForFunction(() => {
    const step = document.querySelector('[data-testid="immersive-reply-step"]');
    const merged = Boolean(document.querySelector('[data-testid="speak-write-step"]'));
    const stepKind = step?.getAttribute('data-step-kind');
    const repairOnly = stepKind === 'speak-repair' || stepKind === 'conversation-repair';
    const replyOnly = step?.getAttribute('data-step-kind') === 'reply-aloud';
    const button = Array.from(document.querySelectorAll('button')).find((candidate) => /write|repair|trap|fix/i.test(candidate.textContent ?? ''));
    const input = document.querySelector('[data-testid="tiny-write-input"]');
    const inlineRepair = document.querySelector('[data-testid="inline-repair-choice"]');
    const hasRepairChoices = inlineRepair && !inlineRepair.classList.contains('sr-only') && inlineRepair.querySelectorAll('button').length >= 2;
    return step?.getAttribute('data-model-audio-finished') === 'true' && (repairOnly ? hasRepairChoices : replyOnly ? button && !button.disabled : button && (merged ? input && !input.disabled : !button.disabled));
  }, { timeout: 5000 });

  const afterAudioBeforeTyping = await page.evaluate(() => {
    const step = document.querySelector('[data-testid="speak-write-step"], [data-testid="immersive-reply-step"][data-step-kind="speak-repair"], [data-testid="immersive-reply-step"][data-step-kind="conversation-repair"], [data-testid="immersive-reply-step"][data-step-kind="reply-aloud"]');
    const stepKind = step?.getAttribute('data-step-kind');
    const repairOnly = stepKind === 'speak-repair' || stepKind === 'conversation-repair';
    const replyOnly = step?.getAttribute('data-step-kind') === 'reply-aloud';
    const cta = Array.from(document.querySelectorAll('button')).find((button) => /(repair|trap|fix)/i.test(button.textContent ?? ''));
    const inlineRepair = document.querySelector('[data-testid="inline-repair-choice"]');
    return {
      typingRequired: step?.getAttribute('data-typing-required') ?? null,
      ctaDisabled: repairOnly || replyOnly ? false : cta?.disabled ?? null,
      repairVisible: repairOnly ? !inlineRepair?.classList.contains('sr-only') : null,
    };
  });
  if (afterAudioBeforeTyping.typingRequired !== 'false' || afterAudioBeforeTyping.ctaDisabled !== false) {
    throw new Error(`${name}: phone path still gates progression on typing after audio: ${JSON.stringify(afterAudioBeforeTyping)}`);
  }

  if (before.repairOnly) {
    const repairState = await page.evaluate((answerPatternSource) => {
      const answerPattern = new RegExp(answerPatternSource, 'i');
      const buttons = Array.from(document.querySelectorAll('[data-testid="inline-repair-choice"] button'));
      const answer = buttons.find((button) => answerPattern.test(button.textContent ?? ''));
      answer?.click();
      return {
        choices: buttons.length,
        clicked: Boolean(answer),
        hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
      };
    }, repairAnswerPattern.source);
    if (!repairState.clicked || repairState.hasTinyInput) throw new Error(`${name}: speak-repair step did not expose a no-typing repair choice: ${JSON.stringify(repairState)}`);
    console.log(`immersive_reply_tiny_write[${name}]=PASS merged=speak-repair audioGated=true noTyping=true`);
    return;
  }

  if (before.merged) {
    await page.type('[data-testid="tiny-write-input"]', typedValue);
    await page.waitForFunction(() => {
      const cta = Array.from(document.querySelectorAll('button')).find((button) => /(repair|trap|fix)/i.test(button.textContent ?? ''));
      return cta && !cta.disabled;
    }, { timeout: 5000 });
    const after = await page.evaluate(() => ({
      inputValue: document.querySelector('[data-testid="tiny-write-input"]')?.value ?? '',
      feedback: document.body.innerText,
    }));
    if (!after.inputValue || !/good/i.test(after.feedback)) throw new Error(`${name}: merged speak/write did not accept short typed line: ${JSON.stringify(after)}`);
    console.log(`immersive_reply_tiny_write[${name}]=PASS merged=true audioGated=true typed="${after.inputValue}"`);
    return;
  }

  if (before.replyOnly) {
    const advanced = await page.evaluate(() => {
      const cta = Array.from(document.querySelectorAll('button')).find((button) => /(repair|trap|fix)/i.test(button.textContent ?? ''));
      cta?.click();
      return Boolean(cta) && !cta.disabled && !document.querySelector('[data-testid="tiny-write-input"]');
    });
    await page.waitForFunction(() => /Fix the time trap\./i.test(document.body.innerText), { timeout: 5000 });
    if (!advanced) throw new Error(`${name}: voice-only reply did not offer a no-typing repair transition`);
    console.log(`immersive_reply_tiny_write[${name}]=PASS merged=reply-aloud audioGated=true noTyping=true`);
    return;
  }

  await page.goto(`${BASE_URL}${route}?adipoliQa=1&adipoliQaStep=4`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('[data-testid="tiny-write-step"]', { timeout: 15000 });
  await page.type('[data-testid="tiny-write-input"]', typedValue);
  await page.waitForFunction(() => {
    const cta = Array.from(document.querySelectorAll('button')).find((button) => /(repair|trap|fix)/i.test(button.textContent ?? ''));
    return cta && !cta.disabled;
  }, { timeout: 5000 });
  const after = await page.evaluate(() => ({
    inputValue: document.querySelector('[data-testid="tiny-write-input"]')?.value ?? '',
    feedback: document.body.innerText,
  }));
  if (!after.inputValue || !/good/i.test(after.feedback)) throw new Error(`${name}: tiny write did not accept short typed line: ${JSON.stringify(after)}`);
  console.log(`immersive_reply_tiny_write[${name}]=PASS audioGated=true typed="${after.inputValue}"`);
}

async function proveBrowserAudioPlayback(page, name) {
  await page.waitForSelector('[data-testid="custom-mission-audio"] audio', { timeout: 15000 });
  const proof = await page.evaluate(async () => {
    const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
    if (!audio) return { found: false };
    audio.muted = true;
    audio.currentTime = 0;
    const startedAt = audio.currentTime;
    await audio.play();
    await new Promise((resolve, reject) => {
      const started = Date.now();
      const tick = () => {
        if (audio.currentTime > startedAt + 0.04) {
          resolve(undefined);
          return;
        }
        if (Date.now() - started > 3000) {
          reject(new Error('audio currentTime did not advance'));
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    });
    const result = {
      found: true,
      src: audio.currentSrc || audio.src,
      readyState: audio.readyState,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      currentTime: audio.currentTime,
      error: audio.error ? audio.error.code : null,
    };
    audio.pause();
    return result;
  });
  if (!proof.found || proof.readyState < 2 || !proof.duration || proof.currentTime <= 0.04 || proof.error !== null) {
    throw new Error(`${name}: browser audio playback proof failed: ${JSON.stringify(proof)}`);
  }
  console.log(`module2_sequence_audio[${name}]=PASS duration=${proof.duration.toFixed(3)} advanced=${proof.currentTime.toFixed(3)}`);
  return proof;
}

async function clickRepairAnswer(page, name, correctAnswer) {
  await page.waitForFunction(() => {
    const repair = document.querySelector('[data-testid="inline-repair-choice"]');
    return repair && !repair.classList.contains('sr-only') && repair.querySelectorAll('button').length >= 2;
  }, { timeout: 10000 });
  const clicked = await page.evaluate((answerSource) => {
    const answerPattern = new RegExp(answerSource, 'i');
    const buttons = Array.from(document.querySelectorAll('[data-testid="inline-repair-choice"] button'));
    const answer = buttons.find((button) => answerPattern.test(button.textContent ?? ''));
    answer?.click();
    return {
      clicked: Boolean(answer),
      options: buttons.map((button) => button.textContent?.replace(/\s+/g, ' ').trim()),
      hasTinyInput: Boolean(document.querySelector('[data-testid="tiny-write-input"]')),
    };
  }, correctAnswer.source);
  if (!clicked.clicked || clicked.hasTinyInput) {
    throw new Error(`${name}: sequence repair click failed or long typing returned: ${JSON.stringify(clicked)}`);
  }
}

async function clickNextMissionCard(page, mission) {
  await page.waitForFunction((expectedPath) => {
    return Array.from(document.querySelectorAll('a')).some((anchor) => {
      try {
        return new URL(anchor.href).pathname === expectedPath;
      } catch {
        return false;
      }
    });
  }, { timeout: 10000 }, mission.expectedNextPath);

  const clicked = await page.evaluate((expectedPath) => {
    const anchors = Array.from(document.querySelectorAll('a'));
    const anchor = anchors.find((candidate) => {
      try {
        return new URL(candidate.href).pathname === expectedPath;
      } catch {
        return false;
      }
    });
    anchor?.click();
    return anchor ? anchor.href : null;
  }, mission.expectedNextPath);
  if (!clicked) throw new Error(`${mission.name}: next mission card missing for ${mission.expectedNextPath}`);

  await page.waitForFunction((expectedPath, expectedSearch) => {
    const search = window.location.search.replace(/^\?/, '');
    return window.location.pathname === expectedPath && (!expectedSearch || search.includes(expectedSearch));
  }, { timeout: 10000 }, mission.expectedNextPath, mission.expectedNextSearch);

  const location = await page.evaluate(() => `${window.location.pathname}${window.location.search}`);
  console.log(`module2_sequence_next[${mission.name}]=PASS -> ${location}`);
}

async function inspectModule2Sequence(page) {
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await clearBrowserAppState(page);

  for (const mission of module2SequenceMissions) {
    const step = getImmersiveStepForMission(mission.name);
    await page.goto(`${BASE_URL}${mission.route}?adipoliQa=1&adipoliQaStep=${step}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('[data-testid="immersive-reply-step"]', { timeout: 15000 });
    await proveBrowserAudioPlayback(page, mission.name);
    await page.evaluate(() => {
      const audio = document.querySelector('[data-testid="custom-mission-audio"] audio');
      audio?.dispatchEvent(new Event('ended', { bubbles: true }));
    });
    await clickRepairAnswer(page, mission.name, mission.correctAnswer);
    await clickNextMissionCard(page, mission);

    const completedState = await page.evaluate(() => {
      const raw = window.localStorage.getItem('adipoli:module2:completedMissions');
      return raw ? JSON.parse(raw) : [];
    });
    if (!completedState.includes(mission.completedId)) {
      throw new Error(`${mission.name}: completion was not persisted before/after next click: ${JSON.stringify(completedState)}`);
    }
  }

  const finalCompletedState = await page.evaluate(() => {
    const raw = window.localStorage.getItem('adipoli:module2:completedMissions');
    return raw ? JSON.parse(raw) : [];
  });
  const missing = module2SequenceMissions.map((mission) => mission.completedId).filter((id) => !finalCompletedState.includes(id));
  if (missing.length) throw new Error(`Module 2 sequence completion missing: ${missing.join(', ')} from ${JSON.stringify(finalCompletedState)}`);

  const handoff = await page.evaluate(() => {
    const body = document.body.innerText;
    return {
      path: window.location.pathname,
      hasModule3Title: /Numbers & Time/i.test(body),
      hasStartModuleCta: /Start module|Continue learning/i.test(body),
      bodyStart: body.slice(0, 700),
    };
  });
  if (handoff.path !== '/learn/3' || !handoff.hasModule3Title || !handoff.hasStartModuleCta) {
    throw new Error(`Module 2 final handoff to Module 3 is unclear: ${JSON.stringify(handoff)}`);
  }
  console.log('module2_to_module3_handoff=PASS path=/learn/3');
  console.log(`module2_sequence_completion=PASS completed=${finalCompletedState.join(',')}`);
}

assertSourceProductionGate();

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});

async function clearBrowserAppState(page) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(async () => {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}

try {
  // Prevent stale PWA shells/service-worker caches from turning browser QA into a
  // false hydration failure after layout changes. The product SW is network-only
  // for pages, but QA must also survive older cached workers from previous runs.
  const cleanupPage = await browser.newPage();
  cleanupPage.setDefaultTimeout(15000);
  await clearBrowserAppState(cleanupPage);
  await cleanupPage.close();

  const browserIssues = [];
  async function withQaPage(label, callback) {
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    page.on('pageerror', (error) => browserIssues.push(`${label}: pageerror: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() === 'error') browserIssues.push(`${label}: console.error: ${message.text()}`);
    });
    try {
      await callback(page);
    } finally {
      await page.close();
    }
  }

  // Use a fresh page for each browser assertion. Fast chained reloads in Next dev
  // can report hydration races from a previous document after the next route has
  // already loaded; isolated pages keep this gate focused on real route errors.
  for (const [route, name, typedValue, repairAnswerPattern] of immersiveMissions) {
    await withQaPage(`route:${name}`, (page) => inspectRoute(page, route, name));
    await withQaPage(`immersive:${name}`, (page) => inspectImmersiveStep(page, route, name, typedValue, repairAnswerPattern));
  }
  await withQaPage('module2-sequence', inspectModule2Sequence);
  if (browserIssues.length) {
    throw new Error(`Browser console/page errors during M1/M2 mobile QA:\n${browserIssues.join('\n')}`);
  }
  console.log(`PASS: M1/M2 immersive mobile QA (${immersiveMissions.length} voice-first missions, 0 legacy builders on reviewed path) base=${BASE_URL}`);
} finally {
  await browser.close();
}
