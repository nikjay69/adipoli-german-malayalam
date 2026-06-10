# A1 MVP continuous 3h — Iteration 5 report

Timestamp: 2026-06-02T13:22+02:00

## Files changed / created

- `src/lib/missions/module1Practice.ts`
- `src/app/missions/module-1/why-a1/page.tsx`
- `scripts/qa_mission_pilot.py`
- `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md`
- `docs/README.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md`
- `GermanCourse_QC/a1-mvp-course-design-final-report.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-20260602-123514/iteration-5-report.md`

## Work done

- Added `module1WhyA1Practice` as the Lesson 2 app-practice data set.
- Created standalone route `/missions/module-1/why-a1` for the Lesson 2 practice beat.
- Kept it voice-first: learner hears the real `Ich lerne Deutsch.` MP3, says the line, repairs one trap, then chooses one reason.
- Rendered `lesson-2-reason-micro-check-card` with:
  - one chosen reason;
  - three closed micro-check items;
  - three collapsed recovery cards;
  - exact next task: `Next: train German sounds`.
- Extended `scripts/qa_mission_pilot.py` so the Lesson 2 route is reachable and guarded against missing practice data/source snippets.
- Updated the app-practice wiring spec and final report to stop saying only Lesson 1 is wired.

## Verification

Commands/results:

```bash
npx tsc --noEmit --pretty false
# PASS, exit code 0

npx eslint src/app/missions/module-1/why-a1/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0
# PASS, exit code 0

python3 -m py_compile scripts/qa_mission_pilot.py
# PASS, exit code 0

python3 scripts/qa_mission_pilot.py
# PASS, exit code 0; routes_reachable=28, includes /missions/module-1/why-a1
```

Browser/manual evidence:

- Opened `http://127.0.0.1:3000/missions/module-1/why-a1?adipoliQa=1`.
- Played the real audio.
- Selected `Ich lerne Deutsch.`.
- Chose `Germany plan`.
- Confirmed `lesson-2-reason-micro-check-card` rendered and body text updated to `I am learning German for Germany plan.`.
- Browser console showed no JS errors; only normal React DevTools/HMR info.

Mobile Puppeteer evidence:

```json
{
  "cardVisible": true,
  "miniCheckItems": 3,
  "collapsedRecoveries": 3,
  "reasonSelectedText": true,
  "width": 390,
  "viewport": 390,
  "horizontalOverflow": false,
  "cardHeight": 1460,
  "consoleErrors": []
}
```

## PASS / WEAK / FAIL

- Lesson 2 practice data: **PASS** — shared typed data includes route, source lesson, output lines, repair options, micro-check, weakness tags, recovery, and next task.
- Lesson 2 route: **PASS** — browser-verified and uses real existing audio, not browser SpeechSynthesis or JS-only `new Audio()`.
- Spoon-fed path: **PASS** — learner sees one line, one reason choice, one micro-check, one recovery set, one next task.
- TypeScript / targeted ESLint / mission QA: **PASS**.
- Mobile layout: **PASS/WEAK** — no horizontal overflow and recoveries are collapsed; card is still long after the win at ~1460px.
- Product integration: **WEAK** — route is standalone and QA-reachable, but not yet wired as the primary post-Lesson-2 CTA in the learner flow.
- Scored lesson-check engine: **WEAK** — self-check bridge only.
- Lessons 3–7 app practice: **WEAK** — not wired yet.
- Rendered videos / recorded Boss narration / human audio-accent QA / public-resource verification: **NOT CLAIMED**.

## Next unfinished item

Wire Lesson 3’s German-sounds practice beat: real audio/sound drill route + `ch/sch/w/v/ä/ö/ü` micro-check + exact pronunciation recovery. 60–90m.
