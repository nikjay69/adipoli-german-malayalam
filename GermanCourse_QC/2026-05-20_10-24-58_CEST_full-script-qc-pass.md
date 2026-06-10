# Full script QC pass — grammar, canon, labels, truncation, production-readiness

## Scope
Active generated guide scripts in `scripts/output/module-01.script.md` through `module-18.script.md`, plus `src/lib/content/modules/module-18.ts` from the earlier canon fix.

## Safe fixes applied

### Canon / setting
- Reframed remaining Kuttan-physically-in-Germany visuals into Goethe Kochi role-play, Kerala home study, projected photos, video calls, or future rehearsal.
- Extra canon fixes applied in modules 06, 07, 09, 10, 11.

### Grammar / German correctness
- Fixed wrong dative explanation in Module 09: `die` becomes `der`, not `die`.
- Fixed `es gibt` accusative explanation in Module 08: neuter stays `ein`, not `einen`.
- Fixed `der Abschluss`; removed wrong `die Abschluss`.
- Fixed Module 12 pronoun: `der Sport` → `weil er sehr spannend ist`.
- Fixed Module 14: `Wir schicken sie Ihnen per Post` for `die Aufenthaltserlaubnis`.
- Fixed multiple awkward/incorrect German lines in Modules 01, 03, 04, 05, 15, 16.

### Label/artifact cleanup
- Removed Chinese/generation artifacts and corrupted mixed-language text.
- Fixed malformed prompt labels `[PROMPT:** ...]`.
- Relabeled English narration that was incorrectly marked as `DE:` in Modules 02, 06, 07, 15, 16.
- Fixed wrong next-module teasers.

### Truncation / broken endings
- Repaired broken tails in Modules 04, 06, 07, 08, 09, 11, 12, 16, 17, 18.
- Completed cut-off EN gloss in Module 14.
- Added minimal safe recaps where generated files ended abruptly.

## Verification performed
- `npx --yes tsx scripts/lib/module_loader.ts <1..18>` passes: **18/18 modules load**.
- Active scripts scan clean for:
  - Chinese artifacts / `、`
  - malformed `[PROMPT:**`
  - `Gemachte gut`, `veet动用`, `新时代`, `越长`, `മലയാള�`
  - known grammar traps: `die Abschluss`, `die bleibt die`, `Maskulin und Neutrum`, `Wir schicken Sie Ihnen`, `Essenreste`, `Sie werden dir nicht schreien`
  - Kuttan physically placed in German city/WG/supermarket/job-fair/office/street scenes
  - `Ich wohne in Berlin` / `ich lebe allein in Berlin`
- Tail scan: all 18 active scripts now end with complete-looking lines; no obvious hanging `**`, partial vocab card, or cut-off `arbeiten` tail remains.

## App exercise/product readiness audit
A separate source-module audit found the bigger product issue:

- 91 app lessons audited.
- 872 exercises audited.
- 62 / 91 lessons are below the production floor of ≥3 speaking/free-text/type-answer/dictation exercises.
- Speaking exercises are severely underrepresented: only 9 total.
- 316 generic stems can be story-tied safely later.
- Modules with the biggest exam-readiness gaps: 17 and 18, because final exam modules still have sections with 0 production exercises.

I did **not** mass-edit those 62 lessons in this pass because that is not a safe script-polish fix; it is a broad product/content rewrite requiring structured additions per lesson.

## Build/lint note
`npm run lint -- --max-warnings=0` still fails with pre-existing app lint errors unrelated to this pass (React setState-in-effect, impure render Math.random/Date.now, unused vars, `module` variable name). The content/module loader verification passes.

## Recommended next execution lane
Do a dedicated production-exercise upgrade pass, starting with:
1. `module-17` and `module-18` exam modules.
2. Lessons with 0 production exercises: `3-6`, `16-5`, `17-5`, `17-6`, `18-5`, `18-6`, `18-7`.
3. Add speaking/free-text/dictation exercises, not just rewrite stems.
