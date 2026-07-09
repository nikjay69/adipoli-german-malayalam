# TECH_ARCHITECTURE.md — Platform Direction

Status: **Source of truth.** Established 2026-06-11. Change only in Technical Architect Mode with a DECISIONS.md entry.

## Current state (audited 2026-06-11)

Next.js (App Router) · React 19 · TypeScript strict · Tailwind 4 · Zustand 5 (persisted to localStorage `german-malayali-progress`, debounced Supabase sync) · static TS content (`src/lib/content/`) · ~67 routes, ~88k lines · 21 games · 8 mock tests (`goethe-tests.ts`) · SM-2 SRS (`src/lib/srs.ts`) · Web Speech + Gemini eval (`/api/check-speech`) · ~2,000 mp3 in `public/audio/` · Remotion + TTS pipeline · Supabase auth + untested payment webhooks · **no automated tests** (one validation script in `tests/`).

## Keep (frozen — do not re-architect)

- Next.js App Router, TypeScript strict, Tailwind, Zustand+localStorage with Supabase sync as backup.
- **Static TS content files.** Right call at this scale; no CMS, no content database, no migration.
- SM-2 SRS, study-plan logic, goethe-tests engine and data.
- Remotion + TTS + ffmpeg pipeline (now load-bearing: it serves owner video production).
- Web Speech recognition + `/api/check-speech` Gemini evaluation.
- Supabase schema and auth code (don't extend, don't break).

## Simplify

- **One lesson player**: `/learn/[moduleId]/[lessonId]` is canonical; retire the `/play/...` duplicate (redirect, then delete post-pilot).
- **One home**: Today screen. Primary nav = Today · Course · Practice · Profile.
- **Games**: 4 flagship (Hör & Los, Sag es, Was steht da, Tipp es) + boss checkpoints reachable via prescriptions/Practice hub; the other ~15 hidden from nav (delete post-pilot if unused).
- Consolidate the ~10 ad-hoc `scripts/audit-*.{js,ts,mjs}` into one `npm run qa`.

## Remove from learner path now (hide, don't delete yet)

Pricing/payments UI · admin · AI chat tutor · on-the-go · scripts viewer · roleplay routes · secondary games. Deletion only after the pilot proves they're unneeded.

## Build (small, in ROADMAP order)

1. **Today screen** (replaces dashboard home).
2. **Spine wiring**: 8-module path, gate/checkpoint state in the Zustand store, locked-module logic.
3. **Checkpoint → prescription engine**: pure data — `tag → prescription[] → retest` lookup (tags and prescriptions defined in `EXAM_PREP_DESIGN.md`); no AI.
4. **Speaking simulator** page (examiner audio → record → model answer → optional eval).
5. **Readiness dashboard** (4 skill bars from checkpoint/mock history).
6. Mission/lesson schema unification (the `Mission` interface direction from the May reset: id, situation, targetOutput, chunks, steps, mistakeRepair, celebration, nextPull) — introduce gradually, never a big-bang rewrite.

## Avoid

New frameworks · content database/CMS · microservices · runtime AI dependence · payment testing pre-pilot · speculative abstractions.

## Principles

1. **Content is data, validated by schema.** Every content change goes through `npm run qa`.
2. **Every feature must serve "pass the exam."** No feature without a named Goethe skill or journey step.
3. **Works with zero AI budget.** AI (speech eval, writing feedback) is enhancement; the course functions without it.
4. **Boring = sev-1 bug** (Reel Rule).
5. **No "done" without a QA gate** (`QA_AND_EVALUATION_HARNESS.md`): qa green + phone-width playthrough evidence.
6. Refactor opportunistically, not speculatively: the 1,400–2,800-line files (lesson player, test player, `goethe-tests.ts`, biggest module files) get split only when touched for a feature.

## AI budget (€100 cap)

~€60 TTS for missing native German audio (video model lines + app gaps) · ~€30 Gemini speech-eval during pilot · ~€10 reserve. **No image/video generation spend.** Gemini used sparingly and only with the sparkle badge on AI-derived content (existing policy).

**Exception (DECISIONS #9, 2026-06-12):** a one-time batch converted the owner's expiring Google Cloud credits (€150–200 target, €198 hard cap) into pre-baked static assets — native German audio (Cloud TTS Chirp3-HD), painterly scene backdrops + vocab illustrations (Imagen 4), adult-Kuttan poses, and ambient Veo loops. Ledger: `scripts/output/gemini-spend-ledger.json`. This batch does not change the runtime rule: the app runs at €0 AI budget; all generated assets are static files in `public/`.

## Testing & CI

- Vitest, seeded from `tests/content-validation.test.ts`: content schema · quiz answers valid & present in options · audio URLs resolve to real files · production-floor check (≥3 production exercises per spine lesson) · duplicate-exercise detection · empty-explanation scan.
- `npm run qa` = lint + typecheck + Vitest content suite. Required before any commit that claims a task done.
- Build verification (`next build`) before any deploy.
