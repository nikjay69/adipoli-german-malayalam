# A1 MVP continuous 3h — iteration 6 report

## Work done

- Wired Lesson 3 German-sounds practice into the Module 1 sequence:
  - shared data: `module1GermanSoundsPractice` in `src/lib/missions/module1Practice.ts`;
  - route: `/missions/module-1/german-sounds`;
  - post-repair card: `lesson-3-sounds-micro-check-card`;
  - next link: `/missions/module-1/formal-greetings?start=listen`.
- Wired Lesson 4 formal-greetings practice:
  - shared data: `module1FormalGreetingsPractice` in `src/lib/missions/module1Practice.ts`;
  - route: `/missions/module-1/formal-greetings`;
  - post-repair card: `lesson-4-formal-greetings-micro-check-card`;
  - next link: `/missions/module-1/please-thanks?start=listen`.
- Updated `scripts/qa_mission_pilot.py` so Lesson 4 is route-reachable, no-browser-TTS checked, and source/data guarded.
- Updated `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md` with Lesson 4 flow, micro-check, recovery, and acceptance gates.
- Updated `GermanCourse_QC/a1-mvp-course-design-final-report.md` with current Module 1 production/app-practice status.

## Verification

Commands run from `/shared/german-course`:

```bash
npx tsc --noEmit --pretty false
npx eslint src/app/missions/module-1/german-sounds/page.tsx src/app/missions/module-1/formal-greetings/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0
python3 -m py_compile scripts/qa_mission_pilot.py
python3 scripts/qa_mission_pilot.py
```

Result: all exited 0.

Browser check on `/missions/module-1/formal-greetings?adipoliQa=1`:

- loaded route successfully;
- played real audio to `readyState=4`, duration/currentTime `5.064s`, no audio error;
- repair choices appeared only after audio ended;
- selected `Guten Tag.` and saw `lesson-4-formal-greetings-micro-check-card`;
- console after interaction: no JS errors;
- JS anchor click verified next route changed to `/missions/module-1/please-thanks?start=listen`.

## PASS / WEAK / FAIL

- Lesson 3 app-practice data + standalone route: **PASS**.
- Lesson 4 app-practice data + standalone route: **PASS**.
- Lesson 2 → 3 → 4 → existing Danke/Bitte route chain: **PASS/WEAK** — source links and JS navigation verified; route-specific human click on the final link was flaky in the harness, so kept the claim narrow.
- TypeScript / targeted ESLint / Python compile / mission QA: **PASS**.
- Real audio technical playback: **PASS** for Lesson 4 route; accent/native quality still needs human review.
- Mini-check engine: **WEAK** — self-check/recovery bridge only, no scored submission.
- Full Module 1 app-practice coverage: **WEAK** — Lessons 5–7 still need dedicated practice beats.
- Rendered videos / Boss narration / public-resource links: **NOT CLAIMED**.

## Next unfinished item

Wire Lesson 5’s politeness-survival practice beat: `bitte`, `danke`, `Entschuldigung`, safer formal defaults + micro-check + exact recovery. 60–90m.
