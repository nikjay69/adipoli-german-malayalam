# QC — Module 03 canon/adult-fit repair

Timestamp: 2026-05-20 02:02 CEST
Lane: B + C — canon repair batch with production-artifact cleanup

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `scripts/output/module-03.script.md`
- `package.json` for available validation commands

## What I checked

Module 03 (`Zahlen und Zeit`) had several high-risk visual/script frames where Kuttan was physically placed in Germany during A1:

- Berlin supermarket aisle
- Berlin bakery counter
- German bakery beside Lara
- Berlin U-Bahn station clock / Alexanderplatz
- WG Müllraum with Stefan

These violate the A1 Story Bible if Kuttan is physically present. The teaching goals are still useful — numbers, prices, time, days, and calendar routines — so I reframed the scenes instead of deleting them.

## Files changed

### `scripts/output/module-03.script.md`

Changed 8 related items:

1. Intro visual: Berlin supermarket → Goethe Kochi mock-supermarket rehearsal.
2. Number-twist visual: Berlin bakery counter → Goethe Kochi mock-bakery.
3. Bakery dialogue visual: Kuttan physically in German bakery → learner imagination scene; Kuttan watches from Goethe Kochi practice room.
4. Time visual: Berlin U-Bahn clock → printed U-Bahn timetable in Goethe Kochi practice room.
5. U-Bahn dialogue visual: Kuttan at Alexanderplatz → learner imagination scene, explicitly not physically there.
6. Trash-calendar visual: WG Müllraum with Stefan → cousin video-call rehearsal from Munich while Kuttan is at his Kerala desk.
7. Trash-calendar dialogue labels: `Stefan` → `Cousin` to match the video-call frame.
8. Removed dangling generated-artifact line at the file end: incomplete `*Kuttan (മലയാളം):*`.

## Why this improves the course

- Preserves the useful German survival scenarios without breaking the Kerala-to-Goethe-A1 arc.
- Keeps Kuttan as an adult learner preparing seriously, not a magical mascot already living in Germany.
- Improves production coherence: visuals, dialogue speakers, and prompts now tell the same story.
- Keeps the module exam/practical value intact: prices, time, schedules, and calendar vocabulary remain unchanged.

## Verification

- Re-read the changed Module 03 sections after patching.
- Searched `module-03.script.md` for the repaired bad patterns:
  - `Kuttan standing in a Berlin`
  - `Kuttan at a Berlin`
  - `Kuttan stands near`
  - `Kuttan stands next to a Berlin`
  - `Inside a WG apartment Müllraum`
  - `Stefan asks you`
  - `according to Stefan`
  - dangling `*Kuttan (മലയാളം):*`
- Search returned 0 matches.

No code build was run because this pass only changed an untyped Markdown production script.

## Risks / notes

- The module still uses Germany settings as learner imagination and cousin/video-call rehearsal. This is allowed by the Story Bible and preferable to over-scaffolding everything as classroom role-play.
- Some Kuttan/Manglish lines are casual (`machane`, `Aiyyo`, `trap`). They felt adult-safe in this module, not childish enough to patch in this pass.

## Recommended next lane

Continue the same high-value canon repair on `scripts/output/module-04.script.md`, which prior QC flagged for Berlin WG / Tempelhofer Feld / Berlin self-introduction drift. That cluster likely has bigger adult-fit and story-coherence impact than more polishing inside Module 03.
