# German Course Overnight QC — Canon repair batch (Module 5 + 9)

Timestamp: 2026-05-20 06:14 CEST
Lane: B) Canon repair batch, with adult-fit check

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `src/lib/content/modules/module-05.ts` sections around lessons 5-2, 5-4, 5-5
- `src/lib/content/modules/module-09.ts` section around lesson 9-4
- `package.json`

## Files changed

- `src/lib/content/modules/module-05.ts`
- `src/lib/content/modules/module-09.ts`

## What I found

Clear A1 canon drift in app `storyScene` content:

1. Module 5 lesson 5-2 placed the learner/Kuttan frame inside a German WG morning with Stefan.
2. Module 5 lesson 5-4 framed the review as sitting in a WG living room after weeks in Germany.
3. Module 5 lesson 5-5 explicitly used `WG Kitchen, Berlin` and flatmates/roommates.
4. Module 9 lesson 9-4 used `Frankfurt Airport (Arrivals)` and described physically stepping off the Kochi flight.

These are high-confidence violations of the A1 Story Bible rule: Kuttan stays physically in Kerala during A1; Germany can appear through video call, mock/rehearsal, or learner imagination.

## Safe fixes made

Converted the above scenes to Kerala-safe, adult-useful frames while preserving the teaching goals and A1 German targets:

- Lesson 5-2: German WG morning → `Kuttan's Home, Thrissur — Morning Routine Practice`
  - Kept routine/separable/reflexive verb goal.
  - Reframed examples around Amma, bathroom queue, breakfast, and Goethe Kochi prep.

- Lesson 5-4: WG living room after weeks in Germany → `Kuttan's Home, Thrissur — Night Review`
  - Kept full-day narration objective.
  - Reframed as Goethe notebook/night review in Thrissur.
  - Also fixed `summery lesson` → `summary lesson` while already editing that line.

- Lesson 5-5: `WG Kitchen, Berlin` → `Goethe-Institut Kochi — Weekly Planner Practice`
  - Changed `sceneType` from `kitchen` to `classroom`.
  - Replaced flatmate/roommate/Lisa/Marco framing with classmates/Frau Weber/Kuttan.
  - Kept weekly schedule, days, frequency adverbs, and word-order practice intact.

- Lesson 9-4: `Frankfurt Airport (Arrivals)` → `Kuttan's Home, Thrissur — Frankfurt Arrival Rehearsal`
  - Changed `sceneType` from `station` to `home`.
  - Converted physical arrival to cousin video call + rehearsal/mock signs.
  - Kept passport, Gepäck, Verspätung, Gleis, and travel-survival objective.

## Verification

- Re-read changed sections after patching.
- Searched for the patched-away suspect strings:
  - `WG Kitchen & Hallway`
  - `WG Living Room, 10:00 PM`
  - `WG Kitchen, Berlin`
  - `Frankfurt Airport (Arrivals)`
  - `stepped off`
  - `Welcome to Germany`
  - `summery`
- Ran targeted ESLint:

```bash
npx eslint src/lib/content/modules/module-05.ts src/lib/content/modules/module-09.ts
```

Result: passed with exit code 0.

Patch tool's automatic TypeScript check still reports pre-existing dependency/type conflicts involving `@types/dom-webcodecs` vs `typescript/lib/lib.dom.d.ts`; these are not introduced by this edit.

## Risks / notes

- I did not mass-rewrite all remaining WG/Germany settings. Search results show more likely canon-drift candidates across modules 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, and 16.
- Some German-setting references are acceptable as learner imagination or travel-rehearsal. Each candidate should be read before patching.
- Module 9 still has earlier station/city scenes that need separate review; I only changed the physical Frankfurt arrival scene in this tick.

## Next recommended lane

Continue Lane B on a tight cluster: `src/lib/content/modules/module-04.ts` and remaining `module-05.ts` WG settings. Patch only cases where the story scene places Kuttan physically in a German WG/city during A1; convert to Goethe Kochi mock, Thrissur home practice, cousin video call, or learner imagination.
