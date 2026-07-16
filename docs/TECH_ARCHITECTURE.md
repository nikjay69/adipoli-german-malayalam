# TECH_ARCHITECTURE.md — Platform Direction

Status: **Source of truth.** Established 2026-06-11. Change only in Technical Architect Mode with a DECISIONS.md entry.

## Current state (audited 2026-06-11)

Next.js (App Router) · React 19 · TypeScript strict · Tailwind 4 · Zustand 5 (persisted to localStorage `german-malayali-progress`, debounced Supabase sync) · static TS content (`src/lib/content/`) · ~67 routes, ~88k lines · 21 games · 8 mock tests (`goethe-tests.ts`) · SM-2 SRS (`src/lib/srs.ts`) · Web Speech + Gemini eval (`/api/check-speech`) · ~2,000 mp3 in `public/audio/` · Remotion + TTS pipeline · Supabase auth + untested payment webhooks · **no automated tests** (one validation script in `tests/`).

## Keep (frozen — do not re-architect)

- Next.js App Router, TypeScript strict, Tailwind, Zustand+localStorage with Supabase sync as backup.
- **Static TS content files.** Right call at this scale; no CMS, no content database, no migration.
- SM-2 SRS, study-plan logic, goethe-tests engine and data.
- Remotion + TTS + ffmpeg pipeline (now load-bearing: it serves owner video production).
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
7. **AI eval wiring** (DECISIONS #15 — was "keep frozen", now active): `/api/check-speech` into the speaking simulator + mission speaking steps; `/api/check-german` into Schreiben Teil 2 (mock player + M6 email lessons). Sparkle badge on all AI feedback · per-session client cap · spend inside the ~€30 pilot allocation · no key/503 → the existing heuristic and self-verdict fallbacks (€0 mode must stay fully functional). Consider bumping `gemini-2.0-flash` to the current flash tier at wiring time.
8. **Practice-attempt record** (learner-intent flows): redos/retakes write to a practice-attempt record in the Zustand store, separate from gating state — a redo can never reset or downgrade progress. No Supabase schema change.

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

~€60 TTS for missing native German audio (video model lines + app gaps) · ~€30 Gemini speech-eval during pilot · ~€10 reserve. **No routine image/video generation spend.** Gemini is used sparingly and only with the sparkle badge on AI-derived content (existing policy).

**Exception (DECISIONS #9, 2026-06-12):** a one-time batch converted the owner's expiring Google Cloud credits (€150–200 target, €198 hard cap) into pre-baked static assets — native German audio (Cloud TTS Chirp3-HD), painterly scene backdrops + vocab illustrations (Imagen 4), adult-Kuttan poses, and ambient Veo loops. Ledger: `scripts/output/gemini-spend-ledger.json`. This batch does not change the runtime rule: the app runs at €0 AI budget; all generated assets are static files in `public/`.

**Bounded presenter exception (DECISIONS #18, 2026-07-17):** the reserve may fund at most **€10** of HeyGen API usage for chunk v1-03, only after owner approval at the point of spend. It is one 30–60 second owner-consented comparison artifact, never a batch or runtime dependency. Actual spend is logged. If the comparison is not clearly authentic and useful, the artifact is discarded and the owner-recorded path continues unchanged.

## Testing & CI

- Vitest, seeded from `tests/content-validation.test.ts`: content schema · quiz answers valid & present in options · audio URLs resolve to real files · production-floor check (≥3 production exercises per spine lesson) · duplicate-exercise detection · empty-explanation scan.
- `npm run qa` = lint + typecheck + Vitest content suite. Required before any commit that claims a task done.
- Build verification (`next build`) before any deploy.

## Environment contract (DECISIONS #17)

- **Versions:** Node ≥ 22.12 LTS, npm ≥ 10; `package-lock.json` is the lockfile (no yarn/pnpm). Bootstrap on any machine: `git clone` → `npm ci`.
- **Video chunks additionally:** FFmpeg on PATH · first Remotion render downloads Chrome Headless Shell (~108 MB, once per machine) · Playwright playthroughs need installed Chrome (`channel: 'chrome'`) · HyperFrames runs via pinned `npx --yes hyperframes@0.7.54` (network on first use per machine).
- **Secrets:** `.env.local` (gitignored). Key names: `GEMINI_API_KEY` · `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` · `STRIPE_PUBLISHABLE_KEY`/`STRIPE_SECRET_KEY` · `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY`; add `HEYGEN_API_KEY` only if v1-03 is approved. Values move owner→machine manually; never committed, logged, or pasted into PRs/handoffs.
- **Paid gates:** any spend needs owner go-ahead at the point of spend (€100 cap; the app works at €0).
- **Relative paths only** in scripts/configs/manifests; a machine-absolute path is a review-blocking defect.
- **Platform/harness:** Windows 11 is the owner's primary; everything runs from repo root via `npm run …`/`node …` under PowerShell, cmd, or bash. Plain git + npm + CLI only — no dependence on Claude Code, Codex, Gemini CLI, or any MCP server (`AGENTS.md` is the shared entrypoint; the workspace Playwright MCP is a convenience with direct Playwright as the fallback).
- **Deterministic validation:** `npm run qa` · `node experiments/module-01-video-hybrid/validate.mjs` · per-video-project `npm run check`/`npm run validate` · `ffprobe` on rendered files. Compositions stay deterministic — no `Date.now()`, no `Math.random()`, no network fetches.

## Video production pipeline (DECISIONS #17)

One master assembler, two bounded specialists — never three parallel lesson pipelines:

| Responsibility | Owner |
|---|---|
| Scene timing, cuts, asset ledger (engine-neutral) | `lesson.scene.json` contract + validator (`experiments/module-01-video-hybrid/`) |
| Exact German text + transcripts (canon) | `course-production/` scripts + scene-JSON `transcript` fields |
| Teaching graphics | HyperFrames sub-compositions; each **approved** insert rendered once and frozen as checksummed media |
| Long-form master assembly: owner footage, PIP, captions, audio placement, batch variants | Remotion, in its own project dir (frozen `src/remotion/` app internals stay untouched; stage a per-lesson `public/` dir — never bundle the app's 193 MB `public/`) |
| Optional synthetic presenter supplier | HeyGen v1-03 only: one owner-consented, owner-likeness render using approved owner audio; download immediately, checksum, and consume as frozen media in Remotion. No timeline ownership, runtime API call, or batch role |
| Algorithmic diagrams, clocks, waveforms | Canvas insert factory → MP4/WebM consumed by Remotion |
| Final encode + technical QC | FFmpeg/ffprobe → `render-report.json` (full decode check, duration/size vs contract) |
| Learner-facing German audio | pre-rendered native audio ONLY (`public/audio/` Chirp3-HD batch); never msedge-tts/SpeechSynthesis (`scripts/gen-tts.ts` is non-learner scratch only) |
| Lesson video length | **15–18 min dense per video** (owner ruling, DECISIONS #17.4) |

**Design/content separation (DECISIONS #18):** `lesson.scene.json` owns semantic scene type, timing, exact text/transcript, audio, and asset checksums — never literal hex values, font files, or page-specific layout. Renderer-level versioned tokens own colour, type, spacing, radius, and motion. v1-02 proves the semantic element system with neutral tokens while 3p-03 audits Direction 2A; design v0.1 is applied only after owner approval. Later token-level refinement can re-render inserts without rewriting scripts, timing, or owner footage.

**HeyGen v1-03 guardrails:**

- Owner likeness only, with the platform-required consent supplied by that same owner. Never synthesize Frau Weber, Kuttan, learners, or a third party.
- Feed the same approved owner-recorded Manglish audio to both A/B candidates wherever supported; HeyGen does not write teaching copy or choose pronunciation. Learner-facing German remains the pre-rendered native audio named above, never a synthetic avatar voice.
- Generate exactly one 30–60 second candidate after v1-02. Request transparent WebM only if the approved avatar supports matting; otherwise use a clean background that Remotion can frame. The generated file is immediately downloaded, checksummed, registered, and treated as disposable supplier media because hosted result URLs are not durable storage.
- Owner review gate: authenticity, lip-sync, calmness, visual fit, and minutes saved must all be acceptable. A failed test is discarded; no second batch and no effect on the owner-recorded schedule unless a later decision explicitly changes that.

Pipeline stages stay distinct: design-neutral element proof → optional presenter A/B → design v0.1 skin + approval reel → recording kit → owner recording → vertical slice → finished lesson master → app integration.

## Media & artifact storage (DECISIONS #17)

| Artifact | Home |
|---|---|
| Composition/scene sources, storyboards, validators, manifests + SHA-256, contact sheets, render reports | Git — always |
| Owner-review proxies (≤ ~10 MB, approval milestones only) | Git |
| Full-res masters + raw owner footage | Google Drive `AdipoliGerman-Media/`, registered in a committed per-lesson `MEDIA_MANIFEST.json` (name, version, sha256, size, link, recovery steps) before "delivered" |
| App-delivery videos (`videoUrl`) | Supabase Storage (stable CDN URL) |
| Render work-caches, captured frames, per-project `node_modules`, temp outputs | Neither — gitignored, regenerable, freely deletable |

Naming: `m<module>l<lesson>-<stage>-v<N>` (stages: reel/kit/slice/master/app). New version = new manifest entry; previous master kept until the owner deletes; raw footage kept permanently. Retrieval on another machine: manifest → download → verify sha256; missing or mismatching artifact = reported blocker. Git LFS rejected (free tier ≪ 20–25 h video).
