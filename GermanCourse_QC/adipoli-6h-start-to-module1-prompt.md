# Adipoli German — 6h continuous start → Module 1 soul rebuild loop

You are running one bounded iteration inside a true continuous 6-hour autonomous loop for Boss.

Workdir: `/shared/german-course`.

## Boss request

Boss said: “Go ahead and work for 6 hours and work on very start page to module 1 fully based on soul and goals of the course.”

Current critique to fix:
- The course still feels like too much text.
- It is not intuitive enough.
- It is not interactive/immersive enough.
- It feels boring when the first journey explains the course instead of making the learner do German.
- AI/illustrative images should help the learner understand the scene, not reskin the UI or add clutter.

## Hard scope for this 6h loop

Focus only the first learner journey through Module 1:

`/` → first CTA → Module 1 entry/landing if used → Module 1 mission routes → Module 1 completion / handoff.

Module 2 may be touched only if a shared component or QA gate requires it. Do not drift into broad Module 2 polish during this run.

## Read course soul first every iteration

Before changing code/content, inspect the relevant brief/source, especially:
1. `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
2. `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
3. `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
4. `docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md` if present
5. `src/lib/missions/module1.ts`
6. `src/app/page.tsx`
7. `src/app/learn/[moduleId]/page.tsx`
8. `src/app/missions/module-1/**`
9. `src/app/missions/module-2/_components/MissionUI.tsx` only for shared primitives
10. Existing relevant QA scripts: `scripts/qa_intro_start_path.mjs`, `scripts/qa_mission_pilot.py`

## Course soul to enforce

Adipoli German is:
- German A1 for Malayalis, not a generic German app.
- Kerala-rooted and adult-safe.
- Warm, practical, not childish mascot energy.
- Goethe A1 serious: Hören, Sprechen, Schreiben/typing only when useful, repair, recall.
- Production-first: the learner hears, says, fixes, and proves an ability.

Execution target:

`story encounter → hear → produce → correct → review/checkpoint`

Never drift back to:

`explain → numbered plan → dashboard cards → maybe click`

## Product bar / vision-alignment gates

Judge every output with PASS/WEAK/FAIL:

- **Immediate learner action:** within 5 seconds the learner sees/hears German and has one obvious action.
- **Low text:** no dashboard/preamble/product-theatre copy on the first journey.
- **Conversation-scene UX:** visible roles/people, one German line, learner reply, feedback/repair, advance in place.
- **Audio evidence:** real audio assets serve/play; no browser SpeechSynthesis; no hidden JS-only audio as the only review path.
- **Click economy:** every tap must map to input, response, noticing, repair, or ability proof.
- **Kerala/Malayali identity:** present where it clarifies the learner situation, not as decorative paragraph text.
- **Adult-safe visual direction:** images/illustrations support scenes; no childish mascot feel, no generic stock-German imagery, no global UI reskin.

Do not call anything good/reviewable unless the route is browser-tested and the QA evidence exists.

## What to improve in priority order

1. **Root page `/`:** keep compact professional framing, but make the first visible experience feel like a German scene, not a course brochure. One headline, one short promise, tiny dialogue/scene preview, one CTA.
2. **First CTA:** must be visible, clickable, not intercepted by nav/search, and must start the first Module 1 listening/conversation path.
3. **Module 1 landing `/learn/1` if present:** remove duplicated route/preamble/dashboard language. It should feel like a scene launcher, not a lesson list.
4. **Module 1 mission routes:** make all three Module 1 missions feel like immersive two-person scenes:
   - Frau Weber / learner roles visible;
   - German audio turn;
   - learner answers aloud/shadows;
   - one tiny recognition/repair action;
   - optional tiny typing only when it proves A1 ability;
   - ability win and next scene handoff.
5. **Images:** use at most 1–2 route-scoped visual improvements if they reduce explanation or make the scene intuitive. Prefer supporting scene cards, not full-page poster UI. Browser-check mobile/desktop after adding.
6. **QA gates:** extend source/browser QA so future agents cannot reintroduce text-heavy cards, dashboard labels, old intro loops, fixed nav/search clutter, or non-interactive fake progress.
7. **Verification:** run targeted lint/checks and full route QA. Browser-click root → Module 1 mission and Module 1 mission sequence. Verify Tailscale if reachable.

## Allowed

- Scoped source edits.
- Small reusable component extraction if it reduces repetition across Module 1.
- Local assets or already-generated AI images if verified and useful.
- QA script edits/additions.
- Local/browser/Tailscale testing.
- Checkpoint/report files under `GermanCourse_QC/`.

## Not allowed without Boss approval

- Deployment, push, merge, or commit.
- Pricing/payment/auth changes.
- Broad destructive deletes.
- Mass renaming Kuttan/the protagonist.
- Paid HeyGen/API/video generation.
- Global UI reskin.
- Random Module 2 polish unrelated to shared first-journey primitives.

## Dirty tree warning

This repo already has a large dirty tree from previous work. Do not reset, stash, commit, or overwrite unrelated changes. Inspect before editing. Keep patches scoped to the start → Module 1 journey and QA.

## Required iteration output

Each iteration must append to:
`GermanCourse_QC/adipoli-6h-start-to-module1-checkpoint.md`

Use this concise shape:

- Time/iteration.
- Course-soul docs/source inspected.
- Files changed.
- Visible text/UX cuts made.
- Module 1 journey status.
- Images/audio/animation work done or intentionally skipped.
- QA/browser evidence.
- PASS/WEAK/FAIL against the product bar.
- Next best lane.

Do not stop at a plan. Make one safe high-leverage fix, verify it, checkpoint it, then continue.
