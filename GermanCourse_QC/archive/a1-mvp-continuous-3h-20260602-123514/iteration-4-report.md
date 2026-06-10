# A1 MVP continuous 3h — Iteration 4 report

Timestamp: 2026-06-02T13:10+02:00

## Files changed

- `src/app/missions/module-1/greet-frau-weber/page.tsx`
- `scripts/qa_mission_pilot.py`
- `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md`
- `GermanCourse_QC/a1-mvp-course-design-final-report.md`

## Work done

- Rendered the Lesson 1 closed mini-check/recovery card from `module1Practice.ts` after the learner completes the first `answer Frau Weber` repair.
- Kept the first practice beat voice-first: no typing gate was added before the win.
- Added QA source guard so the route must keep using `practice.miniCheck.items.map` and `practice.recoveryCards.map`.
- Updated the Module 1 app-practice wiring spec to reflect the rendered self-check/recovery bridge.
- Collapsed recovery task details behind `<details>` so the post-win card is less overwhelming on mobile.

## Verification

Commands/results:

```bash
npx tsc --noEmit --pretty false
# PASS, exit code 0

npx eslint src/app/missions/module-1/greet-frau-weber/page.tsx --max-warnings=0
# PASS, exit code 0

python3 scripts/qa_mission_pilot.py
# PASS, exit code 0; includes localhost + Tailscale route/audio/mobile guards
```

Browser/manual evidence:

- Opened `http://127.0.0.1:3000/missions/module-1/greet-frau-weber?adipoliQa=1`.
- Played the real audio, waited for the repair choices, selected `Guten Morgen, Frau Weber.`.
- Confirmed the route marks Module 1 mission 1 complete, shows the next `Danke. Bitte.` card, and renders `lesson-1-mini-check-recovery-card` below the first-win card.
- Browser console after the interaction: no JS errors.

Mobile Puppeteer evidence:

```json
{
  "cardVisible": true,
  "miniCheckItems": 3,
  "collapsedRecoveries": 3,
  "openRecoveries": 0,
  "width": 390,
  "viewport": 390,
  "horizontalOverflow": false,
  "cardHeight": 1100,
  "consoleErrors": []
}
```

## PASS / WEAK / FAIL

- Lesson 1 mini-check/recovery rendering: **PASS** — data-defined check and recovery cards are visible after the win.
- Voice-first first beat: **PASS** — no typing gate was added before completion.
- TypeScript: **PASS**.
- Targeted ESLint: **PASS** for the changed route file.
- Mission QA: **PASS**.
- Mobile compactness: **PASS/WEAK** — no horizontal overflow and recovery details are collapsed, but the post-win card is still long on a phone because it carries three mini-check tasks and three recovery summaries.
- Scored lesson-check engine: **WEAK** — this is a rendered self-check bridge, not automatic scoring/submission yet.
- Lessons 2–7 app practice: **WEAK** — scripts exist, but their app-practice beats are not wired.
- Rendered videos / recorded Boss narration / human audio-accent QA: **NOT CLAIMED**.

## Next unfinished item

Wire Lesson 2’s first app-practice beat: `why I am learning German` one-sentence output + closed micro-check + exact recovery/next task. 60–90m.
