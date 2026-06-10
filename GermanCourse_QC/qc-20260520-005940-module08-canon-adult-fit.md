# QC — Module 08 Canon + Adult-Fit Repair

Timestamp: 2026-05-20 00:59 CEST
Lane: B/C — canon repair batch + generated-artifact cleanup

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `scripts/output/module-08.script.md`
- Search scans across `scripts/output/`, `src/lib/content/modules/`, and `docs/scripts/` for Kuttan-in-Germany suspects

## File changed

- `scripts/output/module-08.script.md`

## What I changed

Small, high-confidence Module 08 batch:

1. Reframed the intro visual from Kuttan sitting in a Germany-looking room to Kuttan at his Thrissur study desk watching a Munich apartment video call.
2. Corrected `In diesem Module` → `In diesem Modul`.
3. Rewrote the opening Germany-culture line from physically-present “Hier...” framing to future/third-place “Dort...” framing.
4. Reframed the WG tour as a Goethe Kochi / video-call rehearsal instead of Kuttan physically entering a German WG.
5. Reframed the bedroom-arranging dialogue as a Thrissur floor-plan exercise with Stefan on video call.
6. Reframed later housing-ad visuals from Kuttan sitting in the WG kitchen to Kuttan in Thrissur with Stefan/Lara on Munich video call.
7. Rewrote “Willkommen in Deutschland!” to “Willkommen im deutschen Wohnungsmarkt!” so the line teaches the housing challenge without pretending Kuttan has arrived.
8. Removed two generated-artifact problems:
   - Chinese character artifact in the EBK Manglish line.
   - Chinese character spam in the prepositions Manglish line.
9. Fixed obvious German label issues in the housing-ad explanation: `probably` inside a `DE:` line, `heisst`, `weiss`, and `Das ist ein Gold`.

## Why this improves the course

- Keeps A1 physically in Kerala while preserving useful Germany-prep content.
- Makes Kuttan feel like an adult learner rehearsing seriously, not a magically transported mascot.
- Keeps the lesson production-ready: no visible generated-artifact characters, cleaner German, and clearer visual direction for video/script use.

## Verification

- Re-read the changed sections in `scripts/output/module-08.script.md`.
- Searched Module 08 for CJK artifact characters: none found.
- Searched Module 08 for the patched high-risk Kuttan-in-Germany phrasing. Remaining hit is a false positive: the line explicitly says Kuttan is in Thrissur while Stefan/Lara are in their WG kitchen on video call.
- `git status` shows `scripts/output/module-08.script.md` and `GermanCourse_QC/` as untracked in this workspace, so git diff is not useful for these files.

## Risks / not touched

- Module 08 still has broader style issues: some DE/EN lines are too English-teacher-like, and a few housing examples may be above strict A1 if used without scaffolding.
- I did not rewrite the whole module.
- I did not touch app module TS content in this tick.

## Recommended next lane

Continue Lane B/C on `scripts/output/module-07.script.md`, which has a clear visual canon violation at the German supermarket checkout and likely more “Kuttan physically in Germany” framing.