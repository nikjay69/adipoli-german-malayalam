# QC — Module 04 canon pass

Timestamp: 2026-05-19 23:55:33 CEST
Lane: C — Obvious canon fixes

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `docs/EXERCISE_QUALITY_RULES.md`
- `src/lib/content/modules/module-04.ts`
- targeted snippets from `src/lib/content/modules/module-03.ts` and `src/lib/content/modules/module-18.ts`
- `package.json`

## Patch made

Changed `src/lib/content/modules/module-04.ts`, Lesson 4-1 (`Family Members`):

- Replaced the A1-breaking setting `Kuttan's WG Bedroom, Desk` with `Kuttan's Home Study Desk, Thrissur`.
- Reframed the scene as Kuttan at home after Goethe Kochi class, with cousin joining from Munich by WhatsApp video.
- Replaced leftover physical-Germany/roommate framing (`Stefan`, shared apartment, “new German family”) in the lesson's vocab encounters and decision points.
- Preserved the teaching goal: family vocabulary, articles, and simple A1 family introductions.

## Verification

- Re-read the changed Lesson 4-1 block and confirmed Kuttan is now physically in Kerala.
- Ran `npm run lint -- --quiet`; it still fails on existing project-wide lint issues, but no reported error points to `src/lib/content/modules/module-04.ts` after the patch.
- Patch tool TypeScript check also cleared the temporary syntax issue after correction; remaining automatic type-check noise points to pre-existing `@types/dom-webcodecs` / DOM duplicate declarations, not this content edit.

## Additional findings for later

Module 4 still has larger canon drift beyond Lesson 4-1. I did not patch these tonight because that would become a broader rewrite:

- `src/lib/content/modules/module-04.ts:397` — Tempelhof/park scene with Stefan; Kuttan appears physically in Germany.
- `src/lib/content/modules/module-04.ts:734-740` — `WG Hallway & Storage Area`; Kuttan appears to be in a German WG.
- More `Stefan` references later in Module 4 likely belong to the same Germany/WG drift cluster.

Other high-priority drift spotted during scan:

- `src/lib/content/modules/module-03.ts:1239-1242` — `WG Living Room, Birthday Planning`; Lara/Stefan birthday scene places Kuttan in a German WG before A1 departure.
- `src/lib/content/modules/module-18.ts:1755-1758` — final A1 conclusion is in a Munich café. Canon says A1 climax should be Goethe Kochi exam hall + Kochi airport departure, with Germany/A2 after the flight.

## Needs Boss input later

- Whether late Module 18 should end strictly at Kochi airport boarding/window-seat departure, or whether a tiny A2 teaser may show Munich only after the A1 course completion boundary.
- Whether recurring German-side names like Stefan/Lara should be fully replaced by cousin/video-call roles in A1, or preserved only as imaginary role-play characters.

## Recommended next overnight lane

Continue Lane C for `src/lib/content/modules/module-04.ts`: fix the remaining Module 4 physical-Germany scenes into Goethe Kochi / Thrissur / cousin-video-call practice while preserving lesson objectives.