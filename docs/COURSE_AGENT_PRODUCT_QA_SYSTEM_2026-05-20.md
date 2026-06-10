# Adipoli German — Course Agent Product QA System

Generated: 2026-05-20

This document defines how a German-course-making agent should improve Adipoli German without Boss babysitting every file. The agent is not only a script fixer. The job is to make the full web app/course come alive: lessons, recorded videos, exercises, games, review, checkpoints, UX, visual polish, and learner retention.

## 1. Correct mandate

The agent's mandate is:

> Build and continuously improve a low-cost, high-scale, self-sufficient, emotionally engaging, Goethe A1-ready online German course for Malayalis.

That means every iteration must consider the whole product, not only markdown lessons.

The course is made of:

- web app routes: landing, onboarding, plan, learn, lesson player, play mode, practice, tests, games, scripts, pricing, profile, admin,
- recorded/self-recorded teaching videos and generated/placeholder videos,
- lesson content and story scenes,
- exercises: recognition, speaking, free-text, dictation, form fill, listening,
- games and practice modes,
- audio assets,
- SRS/review loop,
- Goethe checkpoints,
- payment/value perception,
- mobile friendliness and visual trust.

A lesson being textually correct is not enough. The user experience must feel smooth, alive, useful, and worth paying for even if the price is intentionally cheap.

## 2. Non-negotiable product principles

1. **Course comes alive**
   - The learner should feel they are joining Kuttan's Kerala-to-Germany journey, not reading a static curriculum.
   - Every major screen should answer: what can I do now, what did I unlock, why should I continue?

2. **Self-sufficient course**
   - A learner should not need Boss manually explaining what to do next.
   - The app should guide: onboarding → daily plan → lesson → practice → review → checkpoint → remediation → next module.

3. **Low-attention friendly**
   - No long passive stretches.
   - Action should appear within 45–90 seconds.
   - Every screen should have one clear primary action.

4. **Engagement is architecture**
   - Fun is not decoration. Kuttan, Manglish, games, tiny wins, and story pressure are part of how learners retain.

5. **Exam-serious**
   - Goethe A1 readiness remains the hard outcome.
   - Entertainment that does not improve Hören, Lesen, Schreiben, or Sprechen is secondary.

6. **Cheap but premium-feeling**
   - The app can be affordable, but it must not feel cheap.
   - Visual polish, clear feedback, reliable media, and progress clarity create trust at scale.

## 3. Full-product QA gates

Before any release/beta claim, the agent must validate these gates.

### Gate A — Content/canon gate

Checks:

- A1 Kuttan scenes stay in Kerala.
- Germany appears only as dream, goal, video call, exam rehearsal, or second-person learner imagination.
- Manglish bridge is present but not cringe.
- Every lesson has a story hook and a next-lesson pull.
- No generic textbook stems dominate.

Evidence:

- canon scan report,
- generic-stem count,
- story hook / next teaser coverage,
- sample fixes with paths.

### Gate B — Learning-performance gate

Checks:

- Every lesson has speaking, free-text/writing, and dictation/listening production.
- Hören exercises are actual audio-first tasks, not reading disguised as listening.
- Goethe A1 skills are mapped by module.
- Checkpoints exist before major exam moments.
- Remediation exists when a learner fails.

Evidence:

- app-readiness audit,
- Goethe skill map,
- missing audio report,
- production exercise coverage,
- checkpoint/remediation inventory.

### Gate C — App UX gate

Checks:

- Onboarding creates a plan based on goal, exam date, and available daily time.
- Home/plan page tells the learner exactly what to do today.
- Lesson player has clear flow: hook → teach → act → feedback → win → next.
- Practice and games are discoverable by skill, not a clutter wall.
- Mobile tap targets and text density are acceptable.
- User never feels lost after finishing a lesson.

Evidence:

- route inventory,
- screenshots of key flows,
- visual QA notes,
- mobile viewport pass/fail,
- dead-end screen list.

### Gate D — Media/video gate

Checks:

- Recorded/self-recorded videos have a role in the app flow.
- Placeholder/generated videos do not conflict with canon.
- Videos are not long passive dumps; they contain pauses/prompts/actions.
- Video scripts align with app exercises and lesson objectives.
- Missing video/audio states are handled gracefully.

Evidence:

- video coverage matrix,
- script/app alignment report,
- pilot video QA,
- missing media manifest.

### Gate E — Visual trust gate

Checks:

- App looks polished on mobile and desktop.
- Pricing/landing pages make value clear.
- No broken layouts, unreadable contrast, tiny buttons, loading dead zones.
- Completion/progress states feel satisfying without childish spam.
- Screenshots prove the product feels worth paying for.

Evidence:

- Puppeteer/browser screenshots,
- visual bug list,
- before/after screenshots for fixes,
- landing/pricing trust checklist.

### Gate F — Release gate

Checks:

- `npm run build` passes.
- app/content audits pass or produce known accepted exceptions.
- critical routes smoke-tested in browser.
- auth/payment env readiness checked without exposing secrets.
- learner beta script is prepared: what module to test, what feedback to collect.

Evidence:

- build result,
- audit result,
- smoke-test report,
- beta test checklist.

## 4. Module-wise improvement loop

Because A1 is huge, work module-wise. Do not try to perfect the whole course blindly.

For each module, run this loop:

### Step 1 — Read the module as a learner journey

Inspect:

- module content in `src/lib/content/modules/module-XX.ts`,
- module guide script in `scripts/output/module-XX.script.md`,
- lesson video scripts in `docs/scripts/`,
- relevant routes in the app,
- audio/video assets for the module.

Answer:

- What is Kuttan's emotional beat here?
- What Goethe skill should this module strengthen?
- What should the learner be able to do by the end?

### Step 2 — Score module using the product rubric

Score 1–5:

- Hook and emotional pull,
- first-action speed,
- story usefulness,
- speaking output,
- writing output,
- listening output,
- video usefulness,
- game/practice connection,
- UX clarity,
- retention/next-step pull,
- Goethe readiness,
- mobile friendliness,
- value perception.

Any score below 3 becomes a fix candidate.

### Step 3 — Pick one safe lane

Pick one of:

- content/canon fix,
- exercise improvement,
- media/audio gap,
- UX/dead-end fix,
- visual polish,
- game/practice discovery,
- checkpoint/remediation,
- retention hook.

Do not rewrite everything at once. Make one confident improvement, verify it, then continue.

### Step 4 — Test textually and visually

Required checks after a module fix:

- content loader works,
- app-readiness audit still passes,
- route renders in browser,
- mobile screenshot inspected,
- no obvious visual regression,
- learner path still has a next step.

### Step 5 — Ask Boss only for meaningful feedback

Ask Boss to check the module only after producing a concrete review package:

- module scorecard,
- screenshots or short screen recording,
- exactly what changed,
- what learner should feel,
- 2–3 pointed questions, not vague “what do you think?”

Example feedback request:

> I upgraded Module 2 as the onboarding/self-intro gold standard. Check the first lesson and the module completion screen. Tell me only: does it feel warm, clear, and worth continuing?

## 5. Agent autonomy rules

The agent should act without babysitting inside these boundaries.

### Allowed autonomously

- read docs and source before deciding,
- run audits,
- create reports,
- make small safe fixes,
- improve generic exercise stems,
- add missing quality docs/checklists,
- visually inspect app pages,
- create module scorecards,
- improve non-destructive content and UX copy,
- add deterministic QA scripts when clearly useful,
- propose app improvements with implementation order.

### Ask first

- large module rewrites,
- deleting/archiving docs or features,
- changing pricing/payment strategy,
- spending paid media/API credits at scale,
- launching marketing,
- changing story canon,
- replacing the app flow wholesale.

## 6. Visual/browser QA method

Use actual browser inspection for app quality. Text audits are not enough.

Minimum route set per module/product pass:

- `/`
- `/landing`
- `/onboarding`
- `/plan`
- `/learn`
- `/learn/{moduleId}`
- `/learn/{moduleId}/{lessonId}`
- `/play/{moduleId}/{lessonId}`
- `/practice`
- `/practice/review`
- `/practice/write`
- `/practice/intro`
- `/practice/conversation`
- `/tests`
- `/games`
- 2–3 flagship games
- `/pricing`

Viewport checks:

- mobile narrow,
- desktop,
- long-text lesson screen,
- exercise screen,
- completion screen.

Visual QA flags:

- unclear primary action,
- too much text on one screen,
- weak contrast,
- tiny tap targets,
- dead empty states,
- confusing progress,
- broken media display,
- lesson ends without next action,
- game catalog clutter,
- anything that makes the app feel cheap.

## 7. Metrics to track before release

Current/course-level metrics should be recomputed, not guessed:

- modules,
- lessons,
- exercises,
- production exercises,
- audio files,
- video/script coverage,
- app routes,
- lessons below production floor,
- lessons without story hook,
- lessons without next teaser,
- generic-stem count,
- missing media count,
- Goethe skill coverage,
- route smoke-test pass rate,
- visual QA bug count.

Future live metrics:

- first-session completion,
- Lesson 1 completion,
- Module 1 completion,
- next-lesson continuation,
- day-2/day-7 retention,
- speaking attempt rate,
- dictation replay rate,
- checkpoint pass/fail,
- drop-off screen,
- upgrade conversion moments.

## 8. The gold-standard pilot

Before applying this to all A1, create one gold-standard module.

Recommended: **Module 2 — self-introduction**.

Why:

- it is immediately useful,
- it proves speaking/writing/listening loops,
- it drives early confidence,
- it connects to Goethe Sprechen Teil 1,
- it is ideal for showing value before payment/upgrade.

Gold-standard Module 2 should include:

- strong Kuttan hook,
- short recorded/self-recorded teaching video or polished placeholder,
- immediate spoken sentence,
- form-fill practice,
- audio spelling/name task,
- free-text self-intro,
- 1 flagship game/practice connection,
- module checkpoint,
- satisfying completion moment,
- clear “tomorrow/next module” pull.

Once Module 2 works, use it as the pattern for the rest of A1.

## 9. What “worth the money” means

Because the app is meant to be affordable and scale-driven, the learner must feel value quickly.

Within the first session, learner should get:

- a warm Kerala/Manglish welcome,
- one real German sentence they can say,
- one satisfying exercise/game win,
- a visible daily plan,
- proof that the course knows the Goethe path,
- confidence that they can continue without confusion.

If the first session feels like a generic lesson list, the product fails.

## 10. Immediate execution order

1. Turn this QA system into the active operating standard.
2. Build/extend scripts for product-level audit and visual smoke testing.
3. Run module-wise scorecard for Module 2.
4. Upgrade Module 2 into the gold-standard pilot.
5. Ask Boss to test only that module flow.
6. Apply the pattern across A1 module by module.

This is how the agent stops being a babysat content editor and becomes a course/product improvement loop.
