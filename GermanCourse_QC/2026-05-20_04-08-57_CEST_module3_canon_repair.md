# German Course QC — Module 3 Canon Repair

Timestamp: 2026-05-20 04:08:57 CEST
Lane: B) Canon repair batch + adult-fit story coherence

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `src/lib/content/modules/module-03.ts`
- `package.json`

## Files changed

- `src/lib/content/modules/module-03.ts`

## What I found

Module 3 story scenes were still written as if the learner/Kuttan were already physically in Germany:

- Lesson 3-1 used a Lidl supermarket checkout and an airport recap.
- Lesson 3-2 was set in a Berlin Bäckerei and mentioned a WG friend.
- Lesson 3-3 was set at Alexanderplatz U-Bahn Station, Berlin.
- Lesson 3-4 was set in a WG Müllraum with Stefan.
- Lesson 3-5 was set in a WG birthday scene with Lara/Stefan.
- Lesson 3-6 was set in a Berlin-Mitte Arztpraxis.

This violated the A1 Story Bible rule: Kuttan remains physically in Kerala until final airport departure. The learning goals themselves were good: prices, two-digit numbers, time, calendar words, dates, appointments. The issue was location/story frame, not pedagogy.

## What I safely fixed

Reframed the Module 3 story scenes so they stay in Kerala while preserving the same A1 German skill practice:

- 3-1: Goethe Kochi classroom mock supermarket checkout.
- 3-2: Goethe Kochi bakery counter role-play.
- 3-3: Goethe Kochi library train-schedule practice.
- 3-4: Thrissur home desk + cousin video call showing a Müllkalender.
- 3-5: Thrissur family birthday calendar + cousin voice note / Goethe mock form.
- 3-6: Goethe Kochi appointment desk role-play.

Also cleaned the most obvious leaked Germany-cast references in Module 3 storyScene internals:

- Replaced Stefan/Lara physical-scene references in 3-4/3-5 with cousin video/voice note, Frau Weber, Amma, or Kuttan notebook framing.
- Kept German example sentences intact where answer correctness or vocabulary mapping mattered.
- Preserved adult usefulness: prices, punctuality, Müllkalender, date formats, and Termin practice are still present, but now framed as exam/life rehearsal instead of premature A2 Germany life.

## Verification

- Re-read changed sections in `src/lib/content/modules/module-03.ts` after patching.
- Searched Module 3 story setting names for clear Germany-location drift: `Berlin`, `WG`, `U-Bahn`, `Frankfurt`, `Munich`, `Germany`, `Arztpraxis`, `Lidl` in `name:` fields — no remaining matches.
- Ran targeted lint:
  - `npx eslint src/lib/content/modules/module-03.ts` → passed with exit code 0.
- Ran broader `npm run lint -- src/lib/content/modules/module-03.ts`; the project-level script still lints all `src/` and fails on existing unrelated React/Next errors. No Module 3-specific error appeared.

## Risks / notes

- Some video outlines and exercise explanations still mention Germany as future-life context. That is acceptable under the two-frame rule when it is direct teaching/learner imagination, not Kuttan physically living there.
- Lesson 3-3 still uses `sceneType: "shopping"` for a library train-schedule practice scene. I left it unchanged because the type vocabulary may be constrained elsewhere; this is cosmetic and not worth risking a type/UI mismatch overnight.
- Module 3 still has a few high-energy Kuttan reactions with emojis. I did not edit tone broadly because this tick was canon repair, not full adult-tone rewrite.

## Next recommended lane

Continue Lane B on `src/lib/content/modules/module-04.ts` or `module-10.ts`, because search results show similar A1 canon drift patterns (`WG`, Germany physical-life scenes) in later modules. Prioritize storyScene settings and named Kuttan/cast physical locations before touching exercises.
