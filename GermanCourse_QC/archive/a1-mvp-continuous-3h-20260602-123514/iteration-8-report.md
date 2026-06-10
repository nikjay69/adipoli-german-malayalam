# Iteration 8 report — Module 1 Lesson 6–7 practice wiring

## Files created/changed

- `src/lib/missions/module1Practice.ts`
- `src/lib/missions/module1.ts`
- `src/app/missions/module-1/polite-exit/page.tsx`
- `src/app/missions/module-1/first-mini-conversation/page.tsx`
- `scripts/qa_mission_pilot.py`
- `scripts/qa_intro_start_path.mjs`
- `scripts/qa_direct_final_sequence_status.mjs`
- `scripts/qa_completed_ability_landings.mjs`
- `course-production/a1-mvp/module-01/module-01-app-practice-wiring-spec.md`
- `docs/README.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md`
- `GermanCourse_QC/a1-mvp-course-design-final-report.md`

## Work done

- Wired Lesson 6 goodbye/repair practice into shared Module 1 practice data and `/missions/module-1/polite-exit`.
- Created the Lesson 7 first mini-conversation practice route at `/missions/module-1/first-mini-conversation`.
- Added Lesson 7 shared practice data: mini-conversation line, repair choices, mini-check items, weakness tags, and recovery cards.
- Updated Module 1 sequence so Lesson 6 hands off to Lesson 7, and Lesson 7 hands off to Module 2 listening.
- Updated QA guards so Module 1 is now a four-mission browser-verified sequence before Module 2.
- Updated the docs index, app-practice wiring spec, checkpoint, and final report.

## Verification run

Commands:

```bash
npx tsc --noEmit --pretty false
npx eslint src/app/missions/module-1/first-mini-conversation/page.tsx src/lib/missions/module1Practice.ts --max-warnings=0
python3 -m py_compile scripts/qa_mission_pilot.py
python3 scripts/qa_mission_pilot.py
```

Results:

- TypeScript: PASS, exit code 0.
- Targeted ESLint: PASS, exit code 0.
- Python compile: PASS, exit code 0.
- Mission QA: PASS, exit code 0.
- Route visible-text budgets include `opening_words[first-mini-conversation]=42`.
- Browser guards passed: intro/start path, direct-final sequence, completed-ability landings on localhost and Tailscale, M1/M2 mobile QA, and gold-slice first journey on localhost and Tailscale.
- QA reported `routes_reachable=34`.

## PASS / WEAK / FAIL

- Lesson 6 app-practice data + route: PASS.
- Lesson 7 app-practice data + route: PASS.
- Module 1 four-mission sequence into Module 2: PASS.
- TypeScript / targeted ESLint / Python compile / mission QA: PASS.
- Real audio technical playback: PASS for guarded routes; native accent/taste still requires human review.
- Scored mini-check engine: WEAK — still self-check bridges, not submitted/scored checks.
- Rendered videos / recorded Boss narration / human audio-accent QA / public-resource links: NOT CLAIMED.

## Next unfinished item

Build the scored Module 1 checkpoint/recovery engine from the existing rubric. 60–90m.
