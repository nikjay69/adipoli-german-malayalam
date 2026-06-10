# Scripts canon fix final pass

## What I changed
Patched active generated script outputs:

- `scripts/output/module-06.script.md`
- `scripts/output/module-07.script.md`
- `scripts/output/module-09.script.md`
- `scripts/output/module-10.script.md`
- `scripts/output/module-11.script.md`
- `scripts/output/module-13.script.md`
- `scripts/output/module-14.script.md`
- `scripts/output/module-18.script.md`

Also patched app source where it still contradicted the A1 canon:

- `src/lib/content/modules/module-18.ts`

## Fix pattern
Obvious Kuttan-physically-in-Germany scenes were converted to approved A1-safe frames:

- Kuttan at home in Thrissur.
- Goethe Kochi classroom / mock / role-play.
- Cousin, Stefan, or Lara on video call from Munich/Germany.
- Projected photos, printed props, or learner imagination.
- Future-life rehearsal, not current physical location.

## Specific high-risk fixes

- Module 09: Berlin Hauptbahnhof and WG kitchen visuals became Goethe Kochi projection / Thrissur video-call rehearsal.
- Module 10: German WG health scenes became Thrissur home + video-call practice.
- Module 11: WG email scene became Thrissur study desk with future-scenario photo only.
- Module 13: Berlin café/apartment scenes became Thrissur/Goethe Kochi imagination practice.
- Module 14: Berlin apartment and Ausländerbehörde visuals became Goethe Kochi case-study / role-play.
- Module 18 script: Kuttan self-intro now says `Ich wohne in Thrissur`, not Berlin.
- Module 18 source: final celebration moved from Munich café to Kerala post-Goethe-Kochi celebration; Munich is only a future photo/reference.

## Verification
Search checks after patching:

- Active script outputs: no hits for high-risk patterns like `Kuttan standing/sitting/walking in Berlin/Munich/Frankfurt`, `cozy German WG`, `cozy Berlin`, `Ich wohne in Berlin`, `ich lebe allein in Berlin`, or `cozy cafe in Munich`.
- Module source: the only remaining `Ich wohne in Berlin` hits are in `module-02.ts` as generic grammar examples, not Kuttan story placement. Module 18’s Kuttan/example self-intro was moved to Thrissur.

## Build/lint note
The TypeScript check still reports pre-existing `dom-webcodecs` duplicate type errors from `node_modules`; the content edits did not introduce a new TypeScript issue.
