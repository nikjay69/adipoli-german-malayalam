# Adipoli German — Vision-to-SMART Reset Plan

Generated: 2026-05-31T15:40:26+02:00
Workdir: `/shared/german-course`

Evidence used before writing this plan:
- Read/synthesized core docs: `docs/README.md`, `COURSE_OPERATING_BRIEF_2026-05-19.md`, `PRODUCT_DIRECTION_RESET_2026-05-20.md`, `WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`, `AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md`, `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md`, `COURSE_GOALS_ENGAGEMENT_RETENTION_2026-05-20.md`, `COURSE_AUTOMATION_MARKETING_STRATEGY_2026-05-19.md`, `A1_STORY_BIBLE.md`, `COURSE_PLAN_10_10.md`, `GOETHE_A1_EXAM_MAP.md`, `EXERCISE_QUALITY_RULES.md`, `MODULE_BLUEPRINTS.md`, `SCRIPT_ARCHITECTURE.md`, `SERIES_ARC_PLAN.md`, `SERIES_FULL_SCRIPT.md`, `M1_AUDIT_REPORT.md`, `M2_M3_SETTING_AUDIT.md`, `GAME_AUDIT.md`, `LAUNCH_CHECKLIST.md`.
- Inspected current source routes: `/`, `/intro`, `/learn`, `/learn/[moduleId]`, Module 1 mission routes, Module 2 mission routes, shared mission UI, mission data.
- Inspected current content/media structure: 18 module files, 9 mission route files, 2 mission data files, 23 mission audio files, 134 Hören audio files, 24 generated video files.
- Checked current git state: branch `adipoli-page-by-page-reset-20260523-1802`, commit `b201d05`, 262 dirty/untracked entries. This is not safe to commit/push as one blob.
- Ran checks:
  - PASS: `npx tsc --noEmit --pretty false --incremental false`
  - PASS: local curl returned HTTP 200 for `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, `/missions/module-1/greet-frau-weber`, `/missions/module-2/self-intro`.
  - FAIL: `python3 scripts/qa_mission_pilot.py` currently fails on intro start-path snippet expectations (`FIRST_MISSION_PATH` / `?start=listen`) that do not match the current `/intro` implementation. Treat the QA gate as stale until repaired, not as proof the route is broken.

## 1. Vision reconstruction

Boss is not trying to build a German content library.

Boss is trying to build a complete, paid, phone-first German A1 course for Malayali adults that feels culturally specific, emotionally alive, and serious enough to prepare a beginner for Goethe A1.

Plain language version:

Adipoli German should take a Malayali beginner from zero German to a confident A1 exam attempt by putting them inside a Kerala-rooted story course. The learner follows Kuttan’s journey from Kerala toward Germany, but the learner is not just watching him. Each lesson should make the learner hear German, answer aloud, repair a real mistake, write or type a tiny useful line, and leave with one visible ability win.

The product should feel like:
- Duolingo momentum, but not childish.
- Babbel adult usefulness, but not generic.
- Kerala/Manglish warmth, but not parody.
- Goethe A1 seriousness, but not textbook boredom.
- A guided mission course, not a dashboard, not a pile of games, not a set of scripts.

The core promise:

“Learn German from Kerala through short story missions that make you speak, listen, write, and pass Goethe A1 tasks with confidence.”

The course is useful only if a student can use it without Boss, without a teacher sitting next to them, and without guessing what to do next.

## 2. Non-negotiables

These must be preserved. If a feature conflicts with these, the feature loses.

1. Malayali/Kerala identity
- A1 physically happens in Kerala.
- Kuttan is in Kerala until the end of A1.
- Germany can appear as dream, future goal, video call, exam rehearsal, or learner imagination.
- Named Kuttan scenes must not casually place him in Berlin, Munich, Frankfurt, German WGs, German supermarkets, or German universities during A1.
- Manglish bridge is a feature, not decoration: it should help Malayalam/English-thinking learners avoid predictable German mistakes.

2. Goethe A1 seriousness
- Every module needs a concrete A1 ability win.
- The learner must practice Hören, Lesen, Schreiben, and Sprechen.
- The final course must map to Goethe A1 sections, not just teach random beginner German.
- Warmth is allowed; exam usefulness is mandatory.

3. Adult-safe tone
- Kuttan can be warm and funny, but not childish.
- Appu should not become a talking mascot or story driver.
- Public-facing naming remains a decision risk: “Kuttan” has warmth but may feel childish to some adult buyers. Do not mass-rename without Boss approval.

4. Real audio
- Reviewable German audio must be pre-rendered or real files, not browser SpeechSynthesis.
- Audio playback must be visible, controllable, and verifiable: play button, duration/progress, HTTP 200, clean browser state.
- Speaking missions must unlock the learner’s turn only after relevant audio actually ends, not after a fake click.

5. Production-first learning
- Recognition is not enough.
- Every mission must move toward output: say it aloud, write/type a small answer, fill a form, answer a question, repair a mistake, or complete a Goethe-style task.
- Sentence builders and chip games are support/remediation, not the premium first path.

6. Self-sufficient launch-ready course
- The app must guide what to do next.
- Onboarding, mission flow, review, checkpoints, remediation, and progress must be wired.
- No dead links, broken assets, missing audio, unexplained dashboards, or “agent-made product theatre.”
- If a learner cannot understand the next action within 5 seconds, the screen fails.

## 3. Current mismatch diagnosis

Blunt diagnosis: the docs know the vision; the product only partially obeys it.

What is currently aligned:
- There is now a real mission direction in source: Module 1 has 3 mission routes; Module 2 has 5 mission routes.
- `/`, `/intro`, `/learn`, `/learn/1`, `/learn/2`, and first mission routes return HTTP 200 locally.
- Module 1 and Module 2 mission data are wired through `src/lib/missions/module1.ts` and `src/lib/missions/module2.ts`.
- Shared mission UI has custom audio controls backed by real `<audio>` elements.
- Mission audio assets exist for Module 2; broader Hören assets exist under `public/audio/hoeren`.
- TypeScript currently passes.

What still violates Boss’s vision:

1. The product direction has been discovered by pain, not cleanly executed end-to-end.
There are many patched screens, many docs, many reports, and a huge dirty tree. The app now contains better mission pieces, but the implementation history is messy and not yet a controlled launch plan.

2. The first path is better, but still fragile.
The source shows `/` -> `/intro` -> Module 1 mission, then Module 2 mission sequence. That is the right direction. But the QA script fails on stale intro expectations, which means the verification layer is no longer trustworthy. Boss should not be asked to trust a route that the gate cannot cleanly certify.

3. Old dashboard/course-library shape still exists behind the mission path.
`/learn` has a focused mission hero, but also an old lesson queue hidden behind controls. `/play/[moduleId]/[lessonId]` still routes modules to classic lesson/game mechanics. This is acceptable as a transitional backend, not acceptable as the final learner mental model.

4. Click-heavy builder DNA still leaks into the app.
Boss explicitly rejected “Build the greeting,” counters, undo/clear, and mandatory typing as the main experience. Recent Module 1/2 work reduced this, but old lesson/game paths still contain builder/scramble patterns and “Build It” style labels. Builders can stay as remediation, not as hero learning.

5. Real audio is inconsistent across the whole product.
Module 2 mission audio is present. Hören audio inventory exists. But legacy practice pages still use browser speech synthesis (`practice/conversation`, `practice/speak`). That is a trust gap for any reviewable German audio experience.

6. Mission/product coherence is not yet whole-course.
Module 2 is the vertical slice. The whole-course spine exists in docs. But modules 3–18 are still mostly classic lesson content with story scenes and exercise arrays, not mission-first learner loops.

7. Content is broad, but launch readiness is uneven.
There are 18 module files with storyScene and production markers. Historical audits show production-floor improvements and average readiness, but the current launch-grade bar requires more than counts: audio, mobile UX, story tie-in, exam proof, and no broken assets.

8. Games are useful but poorly placed.
The game audit says there are strong games: Hör & Los, Was steht da, Sag es, Tipp es, Listen & Act, Time Attack, Number Blitz, Dialogue Dash, Eavesdrop, boss fights. But a 19-game catalog is a wall. Games should be inserted as skill practice after mission need, not thrown at learners as a library.

9. Review friction has damaged trust.
Tailscale/local preview friction, stale QA gates, too many claims of quality from file edits, and incremental UI polish have created exactly the trust problem Boss named. The reset must make proof cheaper and claims rarer.

## 4. Product model

The product unit is not a lesson page. It is a mission.

### Course unit: Mission

A mission is one short ability-building scene.

Required shape:
1. Hook: why this matters now.
2. Scene: two-person Kerala/Goethe/future-rehearsal situation.
3. Audio: learner hears one real German line.
4. Meaning check: learner catches what was said.
5. Production: learner answers aloud first.
6. Tiny writing: only if exam-relevant and short.
7. Mistake repair: one predictable Manglish/A1 trap.
8. Ability win: “You can now ___.”
9. Pull: next mission teaser.

Every mission must answer in 5 seconds:
- Who is speaking?
- What did they say?
- What should I do?
- What ability do I win?

### Learner loop

Hear -> understand -> answer aloud -> repair -> tiny write -> win -> next.

Rules:
- Audio before explanation.
- Speaking before long typing.
- Repair before grammar dump.
- One scene in place, not many pages.
- One useful action per screen.

### Module loop

Each module should become a sequence of 3–6 missions that build one Goethe-relevant ability.

Example:
- Module 1: greet, thank, exit politely.
- Module 2: name, spell name, origin, job/languages, full self-intro.
- Module 3: numbers, prices, phone numbers, time, appointment.
- Module 17: Hören/Lesen exam pressure.
- Module 18: Schreiben/Sprechen final proof.

Each module ends with:
- one integrated checkpoint,
- one visible ability statement,
- targeted remediation if weak,
- a pull into the next module.

### Review/checkpoint loop

Review is not “repeat flashcards.”

Review should be:
- SRS for vocabulary and phrase recall.
- Audio replay for Hören.
- Speaking replay for key output lines.
- Writing/form tasks for Goethe Schreibens.
- Mini mock checkpoints after module clusters.
- Final Goethe A1 mock with diagnosis and remediation.

Checkpoint design:
- PASS: unlock next path confidently.
- WEAK: continue, but route to one repair mission.
- FAIL: do not shame; give one focused retry mission.

## 5. Student-interest plan

Why a learner continues:

1. Immediate spoken wins
The learner should speak useful German in the first minute. Not “learn about German,” not “read the course promise.” Speak.

2. Story stakes
Kuttan is not a mascot. He is the emotional pressure: family doubts, Goethe Kochi, forms, exam fear, visa timeline, goodbye at Kochi airport. Every module should feel like one step toward Germany.

3. Cultural fit
Malayali learners should recognize the world: Kerala classroom, Amma/Achan pressure, Kochi Goethe prep, Malayalam/English transfer mistakes, Indian paperwork anxiety, cousin in Germany, real migration emotion.

4. Confidence through repair
The most interesting moment is not a correct tap. It is: “I almost said the Manglish wrong version, I fixed it, now I can say the German line.”

5. Exam proof
Adult learners continue when they see progress toward a real exam. Each module must show the exact Goethe skill it strengthens without making the app feel like a scary test center.

6. Low-friction phone UX
The learner continues when the next action is obvious and small: listen, say, tap meaning, fix one mistake, continue. Long mobile typing and fussy chip builders kill momentum.

7. Retention pull
End every mission with a concrete next pressure:
- “Now spell your name.”
- “Now catch the phone number.”
- “Now fill the form.”
- “Now answer Frau Weber without freezing.”

Not generic “continue learning.” A real next scene.

## 6. SMART roadmap

### Phase 1 — Stabilize trust and first path

Timebox: 2 days.

Outcome:
A clean, reviewable first learner path from `/` to end of Module 2.

Files/routes affected:
- `src/app/page.tsx`
- `src/app/intro/page.tsx`
- `src/app/learn/page.tsx`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/missions/module-1/*`
- `src/app/missions/module-2/*`
- `src/app/missions/module-2/_components/MissionUI.tsx`
- `src/lib/missions/module1.ts`
- `src/lib/missions/module2.ts`
- `scripts/qa_mission_pilot.py`
- `scripts/qa_gold_slice_first_journey.mjs`

Acceptance criteria:
- `/` -> `/intro` -> Module 1 mission -> Module 2 sequence works locally.
- Every first-path route returns 200.
- Mission audio files return 200 and play in-browser.
- No browser SpeechSynthesis on reviewed mission path.
- QA script matches current intended UX and passes.
- Browser playthrough verifies audio-ended gating and next-action unlock.
- Boss gets one Tailscale review URL only after proof passes.

What NOT to do:
- Do not redesign all routes.
- Do not add new docs.
- Do not add games, animations, or images unless a specific screen needs them to reduce explanation.

### Phase 2 — Convert Module 3 into the second proof module

Timebox: 3 days.

Outcome:
Module 3 becomes a complete mission sequence for numbers/time, proving the mission engine is reusable beyond self-introduction.

Files/routes affected:
- New or updated `src/lib/missions/module3.ts`
- New `src/app/missions/module-3/*`
- `src/app/learn/[moduleId]/page.tsx`
- `src/app/learn/page.tsx`
- relevant audio under `public/audio/missions/module-3/` or existing `public/audio/hoeren`
- QA script expanded to Module 3 first route.

Acceptance criteria:
- 4–5 Module 3 missions: numbers 0–20, price, phone number, time, appointment.
- Every mission has real audio, answer aloud, one repair, and tiny typed/written task where exam-relevant.
- One Module 3 checkpoint catches a phone number/time from audio.
- No long keyboard burden in first 2 missions.
- Mobile visual QA passes.

What NOT to do:
- Do not build another isolated “beautiful page.”
- Do not use Time Attack/Number Blitz as the module itself. Use them as post-mission practice.

### Phase 3 — Mission spine rollout for Modules 4–12

Timebox: 10 working days.

Outcome:
Core daily-life A1 modules become mission-led enough to feel like one course, not a patched lesson library.

Files/routes affected:
- `src/lib/missions/module4.ts` through `module12.ts` or a generic mission config format.
- `src/app/missions/module-[4-12]/*` if route-per-module continues.
- Existing `src/lib/content/modules/module-04.ts` to `module-12.ts` for story/exercise alignment.
- `/learn/[moduleId]` mission landing logic.

Acceptance criteria:
- Each module has 3–5 mission cards with one ability win.
- Existing lesson content is reused where possible; no mass rewrite.
- Games appear as practice after relevant missions, not as a wall.
- Each module includes at least one speaking output and one writing/free-text/form output.
- Kerala/Kuttan canon scan passes.

What NOT to do:
- Do not rewrite every lesson script line-by-line.
- Do not generate paid media.
- Do not move Kuttan to Germany before A1 climax.

### Phase 4 — Exam modules and checkpoints

Timebox: 5 working days.

Outcome:
Modules 17–18 become honest Goethe A1 proof, not just “final lessons.”

Files/routes affected:
- `src/lib/content/modules/module-17.ts`
- `src/lib/content/modules/module-18.ts`
- `src/app/tests/*`
- `src/app/practice/review/page.tsx`
- `src/app/practice/write/page.tsx`
- audio under `public/audio/hoeren/module-17`, `module-18`

Acceptance criteria:
- Hören Teil 1/2/3 practice uses real audio.
- Schreiben form-filling and short-message tasks are production exercises.
- Sprechen self-intro/questions/requests have mission-style practice.
- Mini mock produces PASS/WEAK/FAIL and one remediation route.
- Goethe map gaps are closed or explicitly marked WEAK.

What NOT to do:
- Do not claim exam readiness from content coverage alone.
- Do not bury failures behind a dashboard percentage.

### Phase 5 — Launch hardening

Timebox: 5 working days.

Outcome:
The course is safe for sister/friends to try without embarrassment.

Files/routes affected:
- Navigation/global search hiding logic.
- Auth/payment only if already configured; otherwise keep gated.
- Asset verification scripts.
- Mobile QA scripts.
- `docs/LAUNCH_CHECKLIST.md` only for business handoff, not product quality.

Acceptance criteria:
- No broken internal links on primary learner path.
- No missing audio/video/image assets on launch path.
- TypeScript passes.
- Mission QA passes.
- Mobile viewport QA passes.
- No console/hydration errors in primary flow.
- Dirty git state is separated into reviewable commits/branches.

What NOT to do:
- Do not push/deploy until Boss approves.
- Do not configure pricing/payments in this product reset.
- Do not ask Boss to review a link before local/browser evidence exists.

### Phase 6 — Marketing alignment after product proof

Timebox: after Phase 1–5 pass.

Outcome:
Marketing says what the product actually does.

Files/routes affected:
- `src/app/landing/page.tsx`
- pricing/marketing pages only after course proof.
- launch copy/campaign docs.

Acceptance criteria:
- Landing promise matches the playable first path.
- Demo video/screenshots show real mission interaction, not generic dashboard shots.
- Positioning: “German A1 for Malayalis, Kerala-rooted, Goethe-serious.”

What NOT to do:
- Do not market a product that still needs explanation from Boss.

## 7. First 7 days execution plan

Day 1 — Stabilize first path proof
Deliverables:
- Fix `scripts/qa_mission_pilot.py` so it matches the current intended `/intro` and mission start behavior.
- Add/repair a full first-path browser playthrough: `/` -> `/intro` -> M1 mission -> M2 self-intro.
- Verify audio-ended gating on at least one M1 and one M2 mission.
QA gates:
- `npx tsc --noEmit --pretty false --incremental false`
- `python3 scripts/qa_mission_pilot.py`
- browser playthrough on local URL.

Day 2 — Make Module 1 + Module 2 genuinely reviewable
Deliverables:
- Remove/route around any remaining first-path labels that feel like system text.
- Ensure Module 1 completion pulls cleanly into Module 2.
- Ensure Module 2 completion pulls cleanly into Module 3, even if Module 3 is still old-style.
- Produce one review URL only after browser proof.
QA gates:
- local route 200 checks for all M1/M2 mission routes.
- in-browser audio play and progress check.
- no console/hydration errors on review path.

Day 3 — Design Module 3 mission config only, then build first two missions
Deliverables:
- `src/lib/missions/module3.ts` with mission cards.
- Two playable Module 3 routes: catch a number, catch a time.
- Reuse existing Hören audio where possible.
QA gates:
- route 200.
- audio file exists and plays.
- mission QA expanded to include Module 3.

Day 4 — Finish Module 3 sequence
Deliverables:
- price mission.
- phone-number mission.
- appointment/time checkpoint.
QA gates:
- browser playthrough of full Module 3 sequence.
- mobile viewport check.
- no mandatory long typing before confidence is built.

Day 5 — Connect games as practice, not as catalog noise
Deliverables:
- After Module 3 number/time missions, route to Number Blitz / Time Attack as optional practice.
- `/games` catalog demoted from first path; skill-tagged practice survives.
QA gates:
- no first-session user lands in 19-game wall.
- game route links work.

Day 6 — Exam map checkpoint audit
Deliverables:
- Fresh audit mapping Modules 1–3 mission outputs to Goethe skills.
- List exact gaps for Modules 4–18 rollout.
- No broad doc sprawl: append to one QC report.
QA gates:
- audit has PASS/WEAK/FAIL per module.
- exact next module lane selected.

Day 7 — Boss review package
Deliverables:
- One Tailscale URL.
- One concise QC report with files changed, QA results, known weaknesses.
- Three screenshots max if needed.
- Ask Boss only the high-leverage decisions below.
QA gates:
- all first-week checks rerun.
- no “looks good” without browser evidence.

## 8. First 48 hours exact build lane

This is the immediate agent-executable lane. No Boss babysitting needed.

Task 1: Repair mission QA script
- Open `scripts/qa_mission_pilot.py`.
- Update intro start-path assertions to match the chosen behavior:
  - either `/intro` starts `/missions/module-1/greet-frau-weber`, or
  - standardize to `/missions/module-1/greet-frau-weber?start=listen`.
- Pick one behavior and enforce it in source and QA.
- Acceptance: QA no longer fails on stale snippet names.

Task 2: Add first-path browser playthrough gate
- Use existing `scripts/qa_gold_slice_first_journey.mjs` or add a small route-specific script.
- Must click actual CTAs, not inspect source only.
- Must verify final `location.pathname` after each step.
- Must verify at least one audio play event and audio ended event.
- Acceptance: script proves `/` -> `/intro` -> M1 mission interaction.

Task 3: Verify M1/M2 mission audio assets
- Inventory every audio path in `module1.ts` and `module2.ts`.
- Check file exists, size > 10 KB, HTTP 200 when server is running.
- Acceptance: report missing/suspicious files, zero silent failures.

Task 4: Clean first-path visible text only if QA/browser flags clutter
- Do not redesign containers.
- Remove only learner-facing system labels, counters, or stale “lesson queue” text on first path.
- Acceptance: first screen has one headline, one short context sentence, one CTA, and immediate German/audio action.

Task 5: Standardize Module 1 -> Module 2 transition
- Confirm completing `polite-exit` writes Module 1 completion and routes/pulls to Module 2 self-intro.
- If transition is only implied in card copy, make CTA deterministic.
- Acceptance: browser click reaches `/missions/module-2/self-intro`.

Task 6: Standardize Module 2 -> Module 3 transition
- Confirm final self-intro win pulls to `/learn/3` or first Module 3 mission placeholder.
- Do not build Module 3 yet unless first-path gates pass.
- Acceptance: no dead end after Module 2 completion.

Task 7: Produce a checkpoint report
- Append to `GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`.
- Include commands run, pass/fail, exact review blocker.
- Acceptance: no vague “improved UX”; only evidence.

Task 8: Only then start Module 3 pilot
- Create mission data first.
- Build first mission route second.
- Use real audio third.
- Acceptance: one playable number/time mission, not a broad Module 3 rewrite.

## 9. Definition of launch-ready

Use PASS/WEAK/FAIL. No “pretty good.”

### Content
PASS:
- All 18 modules have a clear ability win.
- Every lesson/mission is A1-safe and story-tied.
- No obvious grammar bugs or wrong-gender teaching.
- No Kuttan-in-Germany A1 canon breaks.

WEAK:
- Some old lesson content exists behind mission path but does not block primary flow.
- Some non-core examples are generic but correct.

FAIL:
- Wrong German.
- Kuttan physically in Germany during A1 named scenes.
- Learner reaches generic worksheet content with no story/action connection in first path.

### Audio
PASS:
- Reviewable mission audio uses real files.
- All primary audio files return HTTP 200 and play in browser.
- Audio UI shows duration/progress.
- Learner turn unlocks after audio completion where required.

WEAK:
- Legacy practice pages still have browser TTS but are not in primary path and are clearly marked for replacement.

FAIL:
- Browser SpeechSynthesis in review path.
- Missing MP3s.
- Audio button that clicks but does not prove playback.

### UX
PASS:
- First action within 5 seconds.
- One obvious CTA per screen.
- No dashboard clutter in first path.
- No hidden fixed-nav/search overlay interference.
- Mission advances in place unless a new scene requires a route.

WEAK:
- Old lesson map exists behind an optional disclosure.

FAIL:
- Learner must read paragraphs to know what is happening.
- 19-game catalog appears as primary learning path.
- Builder/chip/undo/clear flow is the hero interaction for beginners.

### Mobile
PASS:
- Primary path works on phone viewport.
- Tap targets are large.
- No mandatory long typing early.
- Audio controls visible and usable.

WEAK:
- Longer writing appears later and is exam-relevant.

FAIL:
- Keyboard burden blocks early confidence.
- Text-heavy screens require scrolling before first action.

### Pedagogy
PASS:
- Hear -> understand -> answer aloud -> repair -> tiny write -> win.
- Every interaction has a learning reason.
- Mistake repair targets real Malayalam/English transfer traps.

WEAK:
- Some legacy recognition exercises remain as support.

FAIL:
- Mostly MC/matching recognition.
- “Production” means only dragging chips.
- Grammar dump before communicative action.

### Exam readiness
PASS:
- Goethe A1 Hören/Lesen/Schreiben/Sprechen sections are mapped and practiced.
- Modules 17–18 provide mock-test proof and remediation.
- Form filling and short messages are practiced as production.

WEAK:
- Some Goethe coverage is present but lacks polished remediation.

FAIL:
- Course claims Goethe readiness without real Hören audio or speaking/writing production.

### Trust/reviewability
PASS:
- TypeScript passes.
- Mission QA passes.
- Browser route playthrough passes.
- Review URL is verified before Boss sees it.
- Dirty git work is isolated before commit/push.

WEAK:
- App-wide lint has inherited issues, but changed/review path files pass targeted checks.

FAIL:
- Agent says “good” from source edits alone.
- QA script is stale and ignored.
- Boss receives a link with broken audio, dead CTA, or hydration error.

## 10. Reusable vision-alignment scorecard

Agents must score every build output before calling it done. This is not optional.

Use this scorecard on every changed route, lesson, mission, game, or report.

### A. Vision fit
PASS:
- Clearly serves “German A1 for Malayali adults.”
- Preserves Kerala/Manglish identity.
- Connects to Kuttan/Goethe/Kerala/future Germany in a useful way.

WEAK:
- Correct German and useful, but feels generic.
- Cultural/story tie exists only in copy, not in the activity.

FAIL:
- Could be any German app.
- Childish mascot energy dominates.
- Kuttan is physically placed in Germany during A1 named scenes.

Required evidence:
- Quote/source reference from relevant vision doc: operating brief, product reset, story bible, mission spine, Goethe map, or exercise rules.
- One sentence explaining why the output serves the learner’s actual next ability.

### B. First-action clarity
PASS:
- Within 5 seconds the learner knows who is speaking, what was said, and what to do.
- One primary action is visible.

WEAK:
- Learner can proceed, but there is extra copy/status clutter.

FAIL:
- Text-heavy opening.
- Dashboard-like screen.
- Multiple competing CTAs.
- Learner must read a paragraph before hearing/doing German.

Required evidence:
- Browser screenshot or text extraction for visual routes.
- Visible word budget note for first screen.
- Browser click proof for primary CTA.

### C. Pedagogical loop
PASS:
- Hear -> understand -> answer aloud -> repair -> tiny write/proof -> win.
- Every tap maps to hearing, meaning, production, repair, or Goethe proof.

WEAK:
- Has production but too much recognition around it.

FAIL:
- Mostly MC/matching.
- Builder/chip/undo/clear is the hero experience.
- Long typing burden before confidence is built.

Required evidence:
- List each step and its learning purpose.
- Show the exact production action: spoken line, written answer, dictation, form, or Goethe response.

### D. Goethe A1 usefulness
PASS:
- Maps to one Goethe skill or common A1 survival task.
- Uses short, correct, high-probability German.

WEAK:
- Useful beginner German but not clearly exam-linked.

FAIL:
- Fancy/out-of-scope German.
- Exam claim without practice proof.

Required evidence:
- Reference `GOETHE_A1_EXAM_MAP.md` or module mission spine.
- State Hören/Lesen/Schreiben/Sprechen contribution.

### E. Audio/media trust
PASS:
- Real audio file exists, serves over HTTP, and plays in browser.
- UI shows duration/progress.
- Learner action unlocks after required audio ends.

WEAK:
- Audio technically works but accent/taste has not been human-reviewed.

FAIL:
- Browser SpeechSynthesis in reviewed path.
- Missing/silent audio.
- JS-only playback with no browser evidence.

Required evidence:
- File path.
- HTTP status/content type.
- Browser playback state: readyState/duration/currentTime or equivalent.

### F. Mobile/UX friction
PASS:
- Phone viewport is usable.
- Tap targets are clear.
- No fixed nav/search obstruction.
- No mandatory long typing early.

WEAK:
- Usable but cramped.

FAIL:
- CTA hidden/intercepted.
- Scroll required before first useful action.
- Keyboard-heavy first mission.

Required evidence:
- Mobile viewport browser check.
- CTA click result, not source-only claim.

### G. Launch trust
PASS:
- TypeScript/build route checks pass.
- Relevant QA passes.
- Console has no route-blocking errors.
- Dirty git scope is understood.

WEAK:
- Inherited lint/app issues exist outside the changed lane and are named.

FAIL:
- Agent says “done” from file edits alone.
- QA script stale but ignored.
- Broken route/audio/link is left for Boss to discover.

Required evidence:
- Commands run and exit codes.
- Files changed.
- Routes tested.
- Known weaknesses.

### Objective rejection rules

Reject the output as FAIL if any of these are true:
- First screen is text-heavy or dashboard-like.
- It feels like generic German content rather than Malayali/Kerala-rooted A1.
- It uses childish mascot energy for adult learners.
- It makes the learner click many chips/counters/undo/clear controls before speaking/listening.
- It lacks real production practice.
- It claims Goethe usefulness without mapping to a Goethe skill/task.
- It uses browser SpeechSynthesis on a reviewable German audio path.
- It has a dead link, non-playing audio, or unverified CTA.
- It puts Kuttan physically in Germany during A1.

### Agent self-judge protocol

Before any report says “done,” the agent must write this block:

- Output judged: route/file/lesson/mission name.
- Vision source checked: doc path(s).
- Files changed: exact list.
- User path tested: exact route/click path.
- Audio proof: exact file/status/browser proof, or `not applicable`.
- Production proof: exact learner output.
- Goethe proof: skill/task mapping.
- Mobile proof: viewport/CTA result, or `not applicable`.
- Result: PASS / WEAK / FAIL.
- If WEAK/FAIL: the next fix, not a vague suggestion.

If the block cannot be filled, the output is not done.

## 11. Boss decisions needed

Max 5. These are the only decisions worth asking now.

1. Public protagonist name
Keep “Kuttan” publicly, or use an adult-safe public name like Arun/Kiran while keeping Kuttan as a home nickname?

Recommendation: use Arun or Kiran publicly before launch; keep Kuttan internally/home-context if Boss wants warmth.

2. First-path strictness
Should first-time learners go directly into the first audio mission after a compact course intro, or should `/intro` remain a short framing screen first?

Recommendation: keep one compact framing screen, then immediate audio mission. Do not drop cold buyers into unexplained activity.

3. Launch scope
Launch only Modules 1–3 plus strong review/checkpoints as beta, or wait until all 18 modules are mission-first?

Recommendation: beta with M1–M3 only if clearly labeled as beta. Paid launch needs all 18 coherent enough to be self-sufficient.

4. Audio quality bar
Is current generated/prerendered audio acceptable for beta if technically clean, or does Boss require human/native review before any paid launch?

Recommendation: technical PASS is enough for internal/beta review; paid launch needs human accent/taste review on core mission audio.

5. Kuttan/Germany canon enforcement
Should agents patch all remaining Kuttan-in-Germany A1 violations aggressively, or only primary-path ones first?

Recommendation: primary path first, then systematic canon scan before public launch. Do not mass-edit during mission-engine work.

## Boss summary

Blunt read: the vision is clear in the docs, but the app has been drifting through incremental patches. The reset should not be “more UI polish.” It should be: stabilize the first mission path, repair the QA gate, prove M1/M2 in browser with real audio, then build Module 3 as the second reusable mission slice.

Current proof:
- TypeScript passes.
- Key local routes return 200.
- Mission/audio structure exists.
- QA script is stale and currently fails, so trust is not restored yet.

Best next move: fix the mission QA script and first-path browser playthrough before touching more UI.
