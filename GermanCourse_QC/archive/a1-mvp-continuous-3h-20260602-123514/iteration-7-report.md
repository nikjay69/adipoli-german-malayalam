# A1 MVP continuous 3h — iteration 7 report

## Work done

- Wired Lesson 5 politeness-survival practice into the existing Module 1 `please-thanks` route.
- Added `module1PolitenessPractice` in `src/lib/missions/module1Practice.ts`:
  - `Danke. Bitte. Entschuldigung.` output;
  - `Bitte`/`Danke`/rough `Was?` repair trap;
  - micro-check items for help received, repeat request, and polite interruption;
  - exact recovery cards for `vocab:bitte_danke_swap`, `sprechen:request_phrase`, and `vocab:entschuldigung`.
- Updated `/missions/module-1/please-thanks` to import shared Lesson 5 data and render `lesson-5-politeness-micro-check-card` after the correct `Danke` repair.
- Updated `scripts/qa_mission_pilot.py` to guard Lesson 5 route/data/source and keep the page under the visible-text budget.
- Updated `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md` and `GermanCourse_QC/a1-mvp-course-design-final-report.md`.

## Verification

Commands run from `/shared/german-course`:

```bash
npx tsc --noEmit --pretty false
npx eslint src/app/missions/module-1/please-thanks/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0
python3 -m py_compile scripts/qa_mission_pilot.py
python3 scripts/qa_mission_pilot.py
```

Result: all exited 0.

QA evidence:

- `opening_words[please-thanks]=34`, below the 42-word route budget.
- `routes_reachable=32`.
- Mission QA still passes the M1/M2 immersive mobile suite.

Browser check on `/missions/module-1/please-thanks?adipoliQa=1`:

- route loaded successfully;
- played real audio to `readyState=4`, duration/currentTime `2.856s`, no audio error;
- repair choices appeared only after audio ended;
- selected `Danke.` and saw `lesson-5-politeness-micro-check-card`;
- mission completion ribbon updated to `1/3 done` for the current mission;
- console after interaction: no JS errors;
- JS anchor click verified next route changed to `/missions/module-1/polite-exit?start=listen`.

## PASS / WEAK / FAIL

- Lesson 5 shared app-practice data: **PASS**.
- Lesson 5 route integration and micro-check/recovery rendering: **PASS**.
- TypeScript / targeted ESLint / Python compile / mission QA: **PASS**.
- Real audio technical playback: **PASS** for Lesson 5; accent/native quality still requires human review.
- Mobile/visible text budget: **PASS** by route QA (`opening_words[please-thanks]=34`).
- Scored mini-check engine: **WEAK** — self-check only.
- Lessons 6–7 dedicated app practice beats: **WEAK** — not wired yet.
- Rendered videos / recorded Boss narration / human audio-accent QA / public-resource links: **NOT CLAIMED**.

## Next unfinished item

Wire Lesson 6’s goodbye/repair-phrases practice beat: `Auf Wiedersehen`, `Tschüss`, `Noch einmal, bitte`, `Langsam, bitte` + micro-check + exact recovery. 60–90m.
