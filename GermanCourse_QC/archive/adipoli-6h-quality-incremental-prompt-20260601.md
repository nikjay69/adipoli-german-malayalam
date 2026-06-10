# Adipoli German — 6h quality + incremental improvement loop

You are one iteration inside a true continuous 6-hour autonomous loop for Boss.

Workdir: `/shared/german-course`.

## Boss request

Work for the next 6 hours based on the plan. Focus on quality and incremental improvements.

Latest Boss feedback to preserve:
- The generated Kerala-rooted visual direction is fine and more relatable than random abstract/ball people.
- But visuals must not destroy the course UI.
- Treat visuals as supporting scene assets, not a reskin.

## Required context to read first

1. `/shared/german-course/GermanCourse_QC/adipoli-vision-smart-plan-20260531-1912.md`
2. `/shared/german-course/GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md`
3. `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
4. `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
5. `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
6. Relevant current source/QA files before changing them.

Do not trust old reports without re-checking current files and running verification.

## Current state assumptions to verify

- The repo already has a large inherited dirty tree. Do not commit, push, deploy, or broad-reformat.
- A dev server may already be running on `0.0.0.0:3000`; verify before starting another.
- Recent QA harness fixes may already make these pass: `qa_intro_start_path.mjs`, `qa_gold_slice_first_journey.mjs`, `qa_mission_pilot.py`, `tsc`.

## Product bar

Adipoli German = Kerala-rooted, adult-safe, Goethe A1 mission coach for Malayali beginners.

Every useful improvement should move the product toward:
- scene → real German audio → learner output → repair → ability win → next pull;
- less text, fewer choices, fewer dashboard surfaces;
- more real learner action within 45–90 seconds;
- real browser/mobile/audio evidence before quality claims.

## Priorities for this 6h run

Work in small verified slices. Pick exactly one lane per iteration, finish it, verify it, checkpoint it, then continue.

### Lane A — First-mission visual relatability experiment

Scope:
- One route/surface only, preferably the first Module 1 mission or its immediate intro/start path.
- Replace generic/random abstract placeholder feel with one Kerala-rooted adult-safe scene support asset.
- Use existing generated image sample as direction if useful, or create a lightweight local SVG/CSS scene. Do not generate a new image unless truly necessary.

Hard rules:
- No global reskin.
- No UI architecture replacement.
- No extra learner text.
- No mascot/childish energy.
- Must include before/after screenshots or visual notes.
- If it makes the screen heavier, revert/skip and record WEAK/FAIL.

### Lane B — Module 1 sequence closure

Verify/fix:
- `/` → `/intro` → Module 1 mission 1 works by actual browser click.
- Mission 1 → Mission 2 → Mission 3 → Module 2 handoff is clear.
- Completion requires output/repair, not passive click-through.
- No visible system/meta labels or product-process copy.
- Focused routes hide nav/search and work at 390px mobile.

### Lane C — Module 2 gold path quality

Verify/fix:
- All 5 Module 2 mission routes load and form a coherent name/spelling/origin/job/final-self-intro arc.
- Real audio files return 200 and play in browser where used.
- Each mission has situation, hear, output, repair, ability win, next pull.
- The final self-intro checkpoint proves useful A1 output without long mobile typing burden.

### Lane D — Production/audio/canon inventory only if build lanes are blocked

Read-only or tiny safe fixes:
- Production floor inventory: speaking, free-text/type-answer, dictation/listening per lesson.
- Missing audio manifest.
- Canon drift hits: Kuttan physically in Germany during A1 is wrong unless future/dream/video-call/mock.

## Verification required per iteration

Run targeted checks relevant to the changed area. Prefer real evidence over vibes.

Minimum after code/content changes:
- `npx tsc --noEmit --pretty false --incremental false` when practical.
- Relevant QA script(s):
  - `node scripts/qa_intro_start_path.mjs`
  - `node scripts/qa_gold_slice_first_journey.mjs`
  - `python3 scripts/qa_mission_pilot.py`
  - `ADIPOLI_QA_BASE_URL=http://127.0.0.1:3000 node scripts/qa_module2_production_mobile.mjs`
- Browser/Puppeteer click path for any changed route.
- Console/errors check.
- Audio HTTP/browser playback proof for any audio path touched.
- Screenshot path or visual notes for visual work.

If app-wide checks fail due inherited dirty tree, separate inherited failures from your change and still run targeted checks.

## Guardrails

Allowed:
- Scoped source edits.
- Small reusable component fixes.
- Local SVG/CSS/image asset usage.
- QA script updates that encode behavior, not stale copy.
- QC reports/checkpoints.

Forbidden without Boss approval:
- Deploy/push/merge/commit.
- Pricing/payment/auth changes.
- Mass doc deletion/archive.
- Mass Kuttan rename.
- Paid media/API generation at scale.
- Broad redesign or reskin.
- Large unverified rewrites.

## Checkpoint requirement

Append after every iteration to:
`/shared/german-course/GermanCourse_QC/adipoli-6h-quality-incremental-checkpoint.md`

Use this shape:

```
## Iteration N — <timestamp>
- Lane:
- Source/docs inspected:
- Files changed:
- Improvement made:
- Verification run:
- PASS/WEAK/FAIL:
- Weaknesses / next fix:
```

Do not stop at planning. Make one safe high-leverage improvement, verify it, checkpoint it, and continue until the hard stop.
