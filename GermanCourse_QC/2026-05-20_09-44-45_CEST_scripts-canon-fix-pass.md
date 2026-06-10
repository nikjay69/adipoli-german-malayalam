# Scripts canon fix pass — 2026-05-20_09-44-45_CEST

## Scope
Active script outputs under `scripts/output/`, focused on remaining Kuttan-in-Germany canon drift.

## Files changed
- `scripts/output/module-06.script.md`
- `scripts/output/module-07.script.md`
- `scripts/output/module-09.script.md`
- `scripts/output/module-10.script.md`
- `scripts/output/module-11.script.md`
- `scripts/output/module-13.script.md`
- `scripts/output/module-14.script.md`
- `scripts/output/module-18.script.md`

## Fix pattern used
Converted obvious physical-Germany Kuttan staging into one of the approved A1-safe frames:

- Kuttan at home in Thrissur.
- Goethe Kochi classroom / role-play / case-study props.
- Cousin / Stefan / Lara video call from Munich or WG.
- Learner imagination or future-life rehearsal.

## Verification scan
After patching, active scripts still contain `39` Kuttan + Germany-location keyword hits. These are mostly expected because safe frames still mention Germany terms: projected photos, role-plays, cousin video calls, future rehearsal, and vocabulary explanations.

Likely unresolved obvious physical-location hits after heuristic filtering: `3`.

## Remaining items needing human/next-pass review
- `scripts/output/module-01.script.md:71` — **Cousin (DE):** Hallo Kuttan! Wie geht's? Ich bin in München. Hier ist alles super!
- `scripts/output/module-01.script.md:72` — **EN gloss:** Hello Kuttan! How are you? I'm in Munich. Everything here is super!
- `scripts/output/module-04.script.md:754` — **Kuttan (DE):** Meine Eltern wohnen in Kerala, in Indien. Später lebe ich vielleicht allein in Berlin. Aber meine Familie ist mir sehr wichtig!

## Notes
This pass deliberately did not edit snapshot folders or broad source-code modules. It touched only active script output markdown files.

## Follow-up source check
Also patched `src/lib/content/modules/module-18.ts` to move the A1 conclusion celebration from a Munich cafe to a Kerala post-Goethe-Kochi celebration with Munich only as a future photo/reference. TypeScript check still reports pre-existing `dom-webcodecs` duplicate type errors; no new content error was introduced by the patch.

Strict unresolved scan after this follow-up: `14` unsafe Kuttan + Germany-location lines requiring immediate patch. Remaining keyword hits are framed as role-play, video call, future rehearsal, photos/projections, or vocabulary explanations.
