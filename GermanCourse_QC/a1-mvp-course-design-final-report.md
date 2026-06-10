# A1 MVP course-design final report

Updated: 2026-06-02 14:25 CEST

## Files created/changed

Created/updated across the A1 MVP course-design pass:

- `docs/README.md` — active docs index now points to the customer journey, syllabus/test/recovery doc, and complete Module 1 production pack.
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` — customer journey, page flow, low-text UX rules, MVP/later page split, customer PASS/WEAK/FAIL gate.
- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` — 56-lesson / 35h05m A1 syllabus, must-do path, score-booster path, diagnostics, weakness tags, recovery prescriptions.
- `course-production/a1-mvp/module-01/MODULE_01_PRODUCTION_BRIEF.md` — Module 1 promise, lesson map, must-do path, score-booster path, checkpoint/recovery, UX notes.
- `course-production/a1-mvp/module-01/lesson-01-video-script.md` — first presenter-ready video script.
- `course-production/a1-mvp/module-01/lesson-02-video-script.md` — why A1 matters for Malayalis / prescribed exam-course path / learner reason output.
- `course-production/a1-mvp/module-01/lesson-03-video-script.md` — German sounds for Malayalam speakers: `ch/sch/w/v/ä/ö/ü`.
- `course-production/a1-mvp/module-01/lesson-04-video-script.md` — formal greetings by time/context.
- `course-production/a1-mvp/module-01/lesson-05-video-script.md` — politeness survival: `bitte`, `danke`, `Entschuldigung`, safer defaults.
- `course-production/a1-mvp/module-01/lesson-06-video-script.md` — goodbye and repair phrases: `Auf Wiedersehen`, `Tschüss`, `Noch einmal, bitte`, `Langsam, bitte`.
- `course-production/a1-mvp/module-01/lesson-07-video-script.md` — first mini-conversation: greet, answer, repair, thank, leave.
- `course-production/a1-mvp/module-01/lesson-01-storyboard-and-slides.md` — first storyboard/slides.
- `course-production/a1-mvp/module-01/lessons-02-07-storyboards-and-slides.md` — compact storyboards/slides, visual prompts, talking-head notes, phone-friendly editing notes for lessons 2–7.
- `course-production/a1-mvp/module-01/module-01-checkpoint-rubric.md` — closed-book Module 1 diagnostic with scoring, weakness tags, recovery cards.
- `course-production/a1-mvp/module-01/module-01-must-do-and-score-booster-pack.md` — exact must-do practice path, recovery cards, and score-booster curation slots.
- `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md` — app-practice wiring spec for Lessons 1–7, mini-checks, recovery cards, and acceptance gates.
- `src/lib/missions/module1Practice.ts` — shared Module 1 practice data for Lesson 1, Lesson 2, Lesson 3, Lesson 4, Lesson 5, Lesson 6, and Lesson 7 app practice sets.
- `src/lib/missions/module1.ts` — Module 1 mission sequence now includes the Lesson 7 first mini-conversation before Module 2.
- `src/app/missions/module-1/greet-frau-weber/page.tsx` — first Module 1 mission now reads Lesson 1 practice data instead of hardcoded repair content.
- `src/app/missions/module-1/why-a1/page.tsx` — standalone Lesson 2 reason/path practice route.
- `src/app/missions/module-1/german-sounds/page.tsx` — standalone Lesson 3 German-sounds practice route.
- `src/app/missions/module-1/formal-greetings/page.tsx` — standalone Lesson 4 formal-greetings practice route.
- `src/app/missions/module-1/please-thanks/page.tsx` — Lesson 5 politeness-survival practice now reads shared data and renders a micro-check/recovery bridge.
- `src/app/missions/module-1/polite-exit/page.tsx` — Lesson 6 goodbye/repair practice now reads shared data and renders a micro-check/recovery bridge.
- `src/app/missions/module-1/first-mini-conversation/page.tsx` — Lesson 7 first mini-conversation practice now reads shared data, uses real audio, renders a micro-check/recovery bridge, and hands off to Module 2.
- `scripts/qa_mission_pilot.py` — QA guard now checks the new Module 1 practice data/spec and first-mission no-typing wiring.
- `scripts/qa_intro_start_path.mjs` — browser guard now checks the four-mission Module 1 sequence into Module 2.
- `scripts/qa_direct_final_sequence_status.mjs` — direct-final browser guard now treats Lesson 7 as the Module 1 final mission.
- `scripts/qa_completed_ability_landings.mjs` — completed-ability browser guard now marks all four Module 1 missions before the Module 2 bridge.
- `public/images/mvp-style-samples/a1-kerala-study-evening-20260602.png` — MVP visual style sample, 1536x1024 PNG.
- `GermanCourse_QC/a1-mvp-course-design-latest.md` — status note from the syllabus pass.
- `GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md` — current continuous-run checkpoint.
- `GermanCourse_QC/a1-mvp-course-design-final-report.md` — this report.

No commit, push, deploy, pricing/auth/payment, or paid media/API generation was done in this pass.

## Customer journey now

Default cold-user flow:

1. `/` — concise promise: Malayali-focused Goethe A1 course.
2. First mission — hear one German line and answer aloud.
3. Post-win onboarding — choose pace/goal only after first learning win.
4. `/learn` — one prescribed next block, not a dashboard.
5. Video lesson — one outcome.
6. Practice — listen/speak/write tied to the video.
7. Mini-check — closed quick check.
8. Recovery if weak — exact tasks, not generic “revise more”.
9. Module diagnostic and final Goethe mock later.

Bluntly: the product direction is now a spoon-fed guided course path, not a games app or resource library.

## Full A1 MVP structure now

Locked structure:

- Target: 56 owned video lessons.
- Total video: 2,105 minutes = 35h 05m.
- MVP modules: 8.
- Required practice: 2,820 minutes.
- Homework/review: 1,310 minutes.
- Diagnostics: module gates plus final mock.

8-module spine:

1. First German moment.
2. Identity, numbers, time.
3. People, home, daily life.
4. Food, shopping, money.
5. Travel, services, health.
6. Work, study, free time, messages.
7. Official life and exam skills.
8. Goethe A1 bootcamp.

System rules now defined:

- Must-do path per module.
- Score-booster path per module.
- Lesson mini-checks.
- Module diagnostics.
- Goethe-style gates.
- Final full mock.
- Weakness tags for Hören, Lesen, Schreiben, Sprechen, grammar, vocab.
- Manual scoring rubric for writing/speaking.
- Exact recovery prescriptions.
- Public resources allowed only as one assigned task with output and time box.

## Module 1 production status

Now exists:

- Production brief.
- All 7 presenter-ready owned video scripts.
- Storyboards/slides for Lesson 1 and compact storyboards/slides for Lessons 2–7.
- Closed-book Module 1 checkpoint rubric.
- Must-do and score-booster practice pack.
- App-practice wiring spec for Lesson 1, Lesson 2, Lesson 3, Lesson 4, Lesson 5, Lesson 6, and Lesson 7 practice beats.
- Shared app-practice data for the Lesson 1 mission, Lesson 2 reason practice, Lesson 3 sounds practice, Lesson 4 formal-greetings practice, Lesson 5 politeness practice, Lesson 6 goodbye/repair practice, and Lesson 7 first mini-conversation practice, including repair choices, mini-check items, weakness tags, and recovery cards.
- Browser-verified first Module 1 mission path using shared practice data.
- Browser-verified standalone Lesson 2 reason practice route at `/missions/module-1/why-a1`.
- Browser-verified standalone Lesson 3 sounds practice route at `/missions/module-1/german-sounds`.
- Browser-verified standalone Lesson 4 formal-greetings practice route at `/missions/module-1/formal-greetings`.
- Browser-verified Lesson 5 politeness practice route at `/missions/module-1/please-thanks`.
- Browser-verified Lesson 6 goodbye/repair practice route at `/missions/module-1/polite-exit`.
- Browser-verified Lesson 7 first mini-conversation practice route at `/missions/module-1/first-mini-conversation`.

Module 1 lesson map is now production-draft complete:

1. `lesson-01-video-script.md` — `Guten Morgen`, first reply, `Ich lerne Deutsch`.
2. `lesson-02-video-script.md` — why A1 matters and the prescribed course path.
3. `lesson-03-video-script.md` — pronunciation for Malayalam speakers.
4. `lesson-04-video-script.md` — formal greetings by time/context.
5. `lesson-05-video-script.md` — politeness survival.
6. `lesson-06-video-script.md` — goodbye and repair phrases.
7. `lesson-07-video-script.md` — first mini-conversation and checkpoint bridge.

What still does not exist:

- No rendered video files.
- No recorded Boss Malayalam/Manglish narration.
- No final human audio/accent QA.
- No scored post-lesson mini-check engine yet; Lessons 1–7 now render compact self-check/recovery bridges from shared data, but they do not automatically score or submit results.
- Public-resource links are not verified; score-booster slots are marked `LINK NEEDED — verify before publishing`.

## Verification evidence

Ran a structural check over Module 1 scripts:

- all seven `lesson-XX-video-script.md` files exist;
- all seven include required structural signals: hook/cold-open, learner outcome, teaching point, Boss Malayalam/Manglish explanation placeholder, on-screen text, practice, closed check, CTA, and Goethe/A1 relevance;
- all seven contain A1 German examples;
- both storyboard artifacts include AI image prompt coverage and phone-friendly editing notes;
- the Module 1 pack includes exact must-do path, score-booster tasks, `LINK NEEDED` markers, time boxes, and outputs.

Iteration 2 found and fixed two production-draft gaps:

- Lesson 03 had pronunciation practice but needed a clearer Goethe A1 speaking relevance note.
- Lesson 01 storyboard had useful slide rules but needed explicit phone-friendly editing notes.

Iteration 3 added app-practice evidence:

- `npx tsc --noEmit --pretty false` exited 0.
- `python3 scripts/qa_mission_pilot.py` exited 0.
- QA confirmed `/missions/module-1/greet-frau-weber` loads, stays voice-first/no-typing, audio-gates the interaction, hides nav/search on the mobile mission route, and keeps M1/M2 immersive route coverage passing on localhost and Tailscale raw-IP paths.
- `npm run lint -- --max-warnings=0` still fails on inherited lint issues outside the touched Module 1 practice files; top blockers include auth/game React compiler rules, old game pages, `module` variable naming in existing libs, and Remotion cursor mutation.

Iteration 4 added Lesson 1 mini-check/recovery rendering:

- `npx tsc --noEmit --pretty false` exited 0.
- `npx eslint src/app/missions/module-1/greet-frau-weber/page.tsx --max-warnings=0` exited 0.
- `python3 scripts/qa_mission_pilot.py` exited 0.
- Browser interaction on `/missions/module-1/greet-frau-weber?adipoliQa=1` played audio, selected `Guten Morgen, Frau Weber.`, marked the mission complete, showed the next `Danke. Bitte.` card, and rendered `lesson-1-mini-check-recovery-card` with no console errors.
- Mobile Puppeteer at 390px confirmed `cardVisible=true`, `miniCheckItems=3`, `collapsedRecoveries=3`, `openRecoveries=0`, and no horizontal overflow. The card is still long after the win, so compactness is **PASS/WEAK**.

Iteration 5 added Lesson 2 reason practice:

- `src/lib/missions/module1Practice.ts` now exports `module1WhyA1Practice` with the `Ich lerne Deutsch.` line, one-reason output, closed micro-check, weakness tags, and exact recovery cards.
- New route `/missions/module-1/why-a1` uses real existing MP3 audio and renders `lesson-2-reason-micro-check-card` after the correct repair.
- `npx tsc --noEmit --pretty false` exited 0.
- `npx eslint src/app/missions/module-1/why-a1/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0` exited 0.
- `python3 -m py_compile scripts/qa_mission_pilot.py` exited 0.
- `python3 scripts/qa_mission_pilot.py` exited 0 and now checks `/missions/module-1/why-a1` route reachability plus Lesson 2 practice-data/source snippets.
- Browser interaction on `/missions/module-1/why-a1?adipoliQa=1` played audio, selected `Ich lerne Deutsch.`, chose `Germany plan`, rendered the micro-check/recovery card, and showed no JS errors.
- Mobile Puppeteer at 390px confirmed no horizontal overflow, `miniCheckItems=3`, `collapsedRecoveries=3`, and reason-selection text updated. Card height is about 1460px, so mobile compactness is **PASS/WEAK**.

Observed caveat: the script placeholders are written as `[Boss explains in Malayalam/Manglish: ...]`, not the exact bare string `[Boss explains in Malayalam/Manglish]`. That is acceptable and more useful for recording.

Iteration 6 added Lesson 3 and Lesson 4 practice wiring:

- `src/lib/missions/module1Practice.ts` now exports `module1GermanSoundsPractice` and `module1FormalGreetingsPractice` with real existing MP3 paths, repair choices, micro-check items, weakness tags, and exact recovery cards.
- `/missions/module-1/german-sounds` renders the `ich / schön / Weber / Tschüss` sound focus, hardest-sound choice, and `lesson-3-sounds-micro-check-card` after the correct repair.
- `/missions/module-1/formal-greetings` renders the `Guten Tag` formal-default repair, context trap, and `lesson-4-formal-greetings-micro-check-card` after the correct repair.
- Lesson 2 now links to Lesson 3; Lesson 3 links to Lesson 4; Lesson 4 links to `/missions/module-1/please-thanks?start=listen`.
- `npx tsc --noEmit --pretty false`, targeted ESLint for Lesson 3/4/data, `python3 -m py_compile scripts/qa_mission_pilot.py`, and `python3 scripts/qa_mission_pilot.py` exited 0.
- Browser interaction on `/missions/module-1/formal-greetings?adipoliQa=1` played real audio to `readyState=4`, showed repair choices after audio ended, selected `Guten Tag.`, rendered the Lesson 4 micro-check/recovery card, and console showed no JS errors. JS anchor click verified the next route became `/missions/module-1/please-thanks?start=listen`.

Iteration 7 added Lesson 5 politeness-survival practice:

- `src/lib/missions/module1Practice.ts` now exports `module1PolitenessPractice` with `Danke`, `Bitte`, `Entschuldigung`, repeat-request recovery, weakness tags, and exact recovery cards.
- `/missions/module-1/please-thanks` now imports shared Lesson 5 data, keeps the voice-first `Danke` repair, and renders `lesson-5-politeness-micro-check-card` after the correct choice.
- `scripts/qa_mission_pilot.py` now guards Lesson 5 shared data, route source, no browser TTS, and compact opening text (`opening_words[please-thanks]=34`).
- `npx tsc --noEmit --pretty false`, targeted ESLint for Lesson 5/data, `python3 -m py_compile scripts/qa_mission_pilot.py`, and `python3 scripts/qa_mission_pilot.py` exited 0.
- Browser interaction on `/missions/module-1/please-thanks?adipoliQa=1` played real audio to `readyState=4`, showed choices after audio ended, selected `Danke.`, rendered the Lesson 5 micro-check/recovery card, and console showed no JS errors. JS anchor click verified the next route became `/missions/module-1/polite-exit?start=listen`.

Iteration 8 added Lesson 6 goodbye/repair practice:

- `src/lib/missions/module1Practice.ts` now exports `module1GoodbyeRepairPractice` with `Auf Wiedersehen`, `Tschüss`, `Noch einmal, bitte`, `Langsam, bitte`, weakness tags, and exact recovery cards.
- `/missions/module-1/polite-exit` now imports shared Lesson 6 data, keeps the voice-first formal-exit repair, and renders `lesson-6-goodbye-repair-micro-check-card` after the correct choice.
- `scripts/qa_mission_pilot.py` now guards Lesson 6 shared data, route source, no browser TTS, and compact opening text (`opening_words[polite-exit]=37`).
- `npx tsc --noEmit --pretty false`, targeted ESLint for Lesson 6/data, `python3 -m py_compile scripts/qa_mission_pilot.py`, and `python3 scripts/qa_mission_pilot.py` exited 0.
- Browser interaction on `/missions/module-1/polite-exit?adipoliQa=1` played real audio to `readyState=4`, showed choices after audio ended, selected `Auf Wiedersehen.`, rendered the Lesson 6 micro-check/recovery card, and console showed no JS errors.

Iteration 9 added Lesson 7 first mini-conversation practice and tightened the sequence QA:

- `src/lib/missions/module1Practice.ts` now exports `module1FirstConversationPractice` with `Guten Tag, Frau Weber. Gut, danke.`, `Noch einmal, bitte`, `Auf Wiedersehen`, weakness tags, and exact recovery cards.
- `/missions/module-1/first-mini-conversation` now renders the Lesson 7 voice-first mini-conversation repair and `lesson-7-first-conversation-micro-check-card` after the correct choice.
- Lesson 6 now hands off to Lesson 7, and Lesson 7 hands off to Module 2 listening.
- `docs/README.md` and the Module 1 app-practice wiring spec now list standalone Lesson 2–7 practice routes.
- `scripts/qa_intro_start_path.mjs`, `scripts/qa_direct_final_sequence_status.mjs`, and `scripts/qa_completed_ability_landings.mjs` were updated so the browser guards understand Module 1 as a four-mission sequence before Module 2.
- `npx tsc --noEmit --pretty false` exited 0.
- `npx eslint src/app/missions/module-1/first-mini-conversation/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0` exited 0.
- `python3 -m py_compile scripts/qa_mission_pilot.py` exited 0.
- `python3 scripts/qa_mission_pilot.py` exited 0: `opening_words[first-mini-conversation]=42`, source guards passed, intro/start-path browser QA passed, direct-final browser QA passed, completed-ability browser QA passed on localhost and Tailscale, M1/M2 mobile QA passed, and gold-slice first-journey QA passed on localhost and Tailscale.

## PASS / WEAK / FAIL against Boss's request

- Customer journey/page flow: **PASS**.
- A1 syllabus/test/recovery structure: **PASS**.
- Docs index consolidation: **PASS**.
- Module 1 scripts 1–7: **PASS** for production-draft completeness.
- Module 1 storyboards/slides: **PASS** for lessons 1–7 coverage.
- Module 1 must-do/score-booster path: **PASS/WEAK** — tasks are exact; external links still need verification.
- Module 1 app-practice wiring: **PASS/WEAK** — Lessons 1–7 are wired with shared data, real existing audio, micro-check/recovery cards, source QA guards, and browser/route evidence. Still weak because checks are self-check bridges, not scored submissions.
- Visual sample: **WEAK/PASS** — useful direction, not app-verified.
- App/browser QA: **PASS** for reviewed Module 1 Lesson 1–7 practice routes plus the existing M1/M2 mission path.
- Rendered videos: **NOT CLAIMED**.

Overall: **PASS for Module 1 production draft completeness; PASS/WEAK for early app-practice wiring; WEAK for publish readiness** because recording, human audio/accent QA, scored checks, and public-link verification remain.

## Recommended next action

Build the scored Module 1 checkpoint/recovery engine from the existing rubric. 60–90m.
