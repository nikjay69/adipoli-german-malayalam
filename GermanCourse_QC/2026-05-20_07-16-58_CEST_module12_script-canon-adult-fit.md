# German Course Overnight QC — Module 12 script canon/adult-fit cleanup

Timestamp: 2026-05-20 07:16 CEST
Lane: B/C) Canon repair batch + script quality cleanup

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `GermanCourse_QC/2026-05-20_06-14-27_CEST_canon-repair-module5-9.md`
- `scripts/output/module-12.script.md`

## Files changed

- `scripts/output/module-12.script.md`

## What I found

Module 12 had several high-confidence production problems:

1. The intro visual placed Kuttan physically on a Berlin park bench during A1.
2. A later weather dialogue visual placed Kuttan in a German WG kitchen.
3. The closing `Pläne machen` visual was a malformed/truncated WG kitchen line.
4. One Kuttan line contained a generated Chinese artifact: `做好准备`.
5. A `DE:` line contained English: `Also, let's begin!`.
6. Several German/A1 production lines had obvious correctness issues:
   - `Ich höre lieber gern Musik.`
   - `indisches Musik`
   - `Mein Lieblingsjahreszeit ist der Sommer.`
   - Weather prompt stem did not match the answer `Es schneit.`

## Safe fixes made

- Reframed Kuttan's Module 12 visuals back to Kerala-safe A1 settings:
  - Goethe Kochi courtyard / Kerala park after class
  - Thrissur study desk with cousin/Arjun video-call weather comparison
  - video-call role-play for weekend plans
- Preserved useful Germany exposure as video-call/imagination practice, not physical Kuttan-in-Germany scenes.
- Removed the generated Chinese artifact from the Manglish Kuttan line.
- Fixed the mixed-language `DE:` line to `Also, fangen wir an!`.
- Corrected the German production mistakes:
  - `Ich höre lieber Musik.`
  - `indische Musik`
  - `Meine Lieblingsjahreszeit ist der Sommer.`
  - `Es _____ .` → `Es schneit.`
- Updated the English gloss after changing `In Kerala schneit es nie.`

## Verification

- Re-read changed sections around intro, hobby dialogue, weather dialogue, practice prompt, and closing visual.
- Searched `scripts/output/module-12.script.md` for the patched-away suspect strings:
  - `Berlin`
  - `WG`
  - `indisches Musik`
  - `Mein Lieblingsjahreszeit`
  - `做好准备`
  - `lieber gern`
  - `In winter in Kerala`
  - `let's begin` in a `DE:` line
  - old weather blank pattern `_____ ist _____`
- Remaining search hits were acceptable:
  - `let's begin` exists only in the English translation line.
  - `Meine Lieblings_____ ist _____` is the intended feminine prompt stem.

## Risks / notes

- `scripts/output/module-12.script.md` appears to end at the start of the `Pläne machen` section. I fixed the malformed WG visual line, but did not invent the missing dialogue content overnight because that would be a larger generation/rewrite task.
- The script still contains Germany cultural references, but after this patch they function as video-call/imagination/exam-life preparation rather than Kuttan physically being in Germany.

## Next recommended lane

Continue Lane B/C on `scripts/output/module-10.script.md`, `module-11.script.md`, or `module-13.script.md` for the same pattern: Kuttan physically in Germany/WG + obvious DE/EN or generated-artifact cleanup. Patch only exact, read-confirmed violations.
