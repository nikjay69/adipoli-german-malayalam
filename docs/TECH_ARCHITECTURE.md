# TECH_ARCHITECTURE.md — Platform Direction

Status: **Source of truth.** Established 2026-06-11. Change only in Technical Architect Mode with a DECISIONS.md entry.

## Current state (audited 2026-06-11)

Next.js (App Router) · React 19 · TypeScript strict · Tailwind 4 · Zustand 5 (persisted to localStorage `german-malayali-progress`, debounced Supabase sync) · static TS content (`src/lib/content/`) · ~67 routes, ~88k lines · 21 games · 8 mock tests (`goethe-tests.ts`) · SM-2 SRS (`src/lib/srs.ts`) · Web Speech + Gemini eval (`/api/check-speech`) · ~2,000 mp3 in `public/audio/` · Remotion + TTS pipeline · Supabase auth + untested payment webhooks · **no automated tests** (one validation script in `tests/`).

## Keep (stable foundations — re-architect only by decision)

- Next.js App Router, TypeScript strict, Tailwind, Zustand+localStorage with Supabase sync as backup.
- **Static TS content files.** Right call at this scale; no CMS, no content database, no migration.
- SM-2 SRS, study-plan logic, goethe-tests engine and data.
- Remotion + TTS + ffmpeg pipeline (now load-bearing: it serves owner video production).
- Supabase as the auth/database/storage foundation. Auth, passkeys, and schema may be extended or corrected through an owner-approved chunk with exact scope, migration + rollback, RLS/authorization-bypass tests, and account-recovery coverage; they are not globally frozen.

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

## Protected course access (DECISIONS #18)

### Security promise and cost ceiling

No browser system can guarantee that an authorized learner never extracts a stream or films the screen with another camera. The V1 promise is therefore precise: stop public/stable-link theft, make casual downloading and account sharing inconvenient, visibly deter and trace recordings, bound leaked-session lifetime, and give the owner a humane revocation path. Do not market V1 as DRM or “impossible to copy.”

The same honesty applies to account sharing: two installations plus one active protected activity blocks casual simultaneous use, but cannot reliably distinguish the named learner from a second person using an approved installation at a different time. Password/inbox/passkey sharing, remote control, and copied session cookies remain possible. Policy, step-up, concurrency evidence, and leak tracing reduce abuse; they do not prove who is physically present.

- Build with the existing Next.js + Supabase stack and local FFmpeg. Add **no recurring security-specific streaming, DRM, fingerprinting, fraud-scoring, SMS, or forensic-watermark vendor** in V1.
- Supabase Pro is the only pre-approved recurring platform upgrade, and only when measured storage/egress or a required production control makes it necessary. Keep its Spend Cap enabled. Any other recurring vendor, overage path, or disabling of the cap requires a new owner decision at the point of spend.
- Spend Cap is not the whole budget control: stay in one Supabase project on included/default compute with no paid branches, compute upgrades, PITR, dedicated IPv4, custom domain, phone MFA, or other opt-in add-on. During the pilot, review storage, egress, compute, and add-ons weekly and before each video batch. At 60% of any included allowance or a forecasted overage, pause new uploads/invites and show the owner the usage—never silently scale.
- If a quota, token, browser, or security check fails, the interactive app lesson remains available under the video-enhanced-not-video-blocked rule. Never fall back to a public MP4, unlisted link, or unprotected stream.

### Personal-seat policy

- One purchase/entitlement is for one named learner.
- Allow up to **two trusted browser/device installations** (normally phone + laptop), but only **one active protected video or timed mock** at a time. Do not block ordinary simultaneous browsing.
- A third installation must pass step-up verification and replace/revoke an existing installation. Provide self-service recovery for cleared cookies, a lost device, or a new phone.
- Step-up uses only an already-operational Supabase factor (fresh reauthentication, passkey/TOTP, or existing verified-email flow). Do not add SMS or a separate email-delivery subscription without a new owner decision.
- Same household/network, mobile-network changes, VPN use, and India↔Germany travel are valid. Never hard-block or terminate from IP, country, timezone, or device-family change alone.
- A second active player gets an explicit “Continue here?” takeover. The prior player pauses after its short lease expires; completed progress is never erased.

### Server authority and data model

Every protected manifest/key request, premium download, timed mock, and future certificate action must verify on the server: a real Supabase session, server-owned entitlement, a trusted non-revoked installation, and any required activity lease. Persisted Zustand state, client-reported plan/user ID, demo credentials, guest mode, or a client-only/manual WebAuthn success can never authorize protected content.

The implementation may introduce narrowly scoped migrations such as `account_devices`, `active_activity_leases`, `security_events`, and the minimum entitlement fields proven necessary by the deployment audit. Exact names/columns/RLS belong to their implementation contract. Migrations must be additive first, safe against partial rollout, reversible, and tested for cross-account reads/writes plus service-role isolation.

Issue a high-entropy opaque installation ID from the server in a first-party `Secure`, `HttpOnly`, `SameSite=Lax` cookie. Store only what the learner can understand and support needs: user, opaque ID/hash, broad device label, first/last seen, trusted/revoked timestamps, and coarse last country when justified. Do not use canvas/font/screen fingerprints, browser-side public-IP services, raw IP in the app event store, or a client-visible fixed hashing salt.

One account-wide activity lease row carries an `activity_type` (`video` or `timed_mock`) plus resource and installation identifiers, so a video and timed mock cannot run concurrently on different devices. Heartbeat only while the video/mock is actually active, expire after a short missed-heartbeat window, and support deliberate takeover. The server—not a background tab—decides the current holder. Already buffered media remains a documented residual-access window.

### Protected video delivery

1. Full masters and raw footage remain private in Drive under the media manifest. Local FFmpeg creates bandwidth-conscious HLS delivery derivatives plus a permanently baked Adipoli ownership mark.
2. Lesson data stores an opaque `videoAssetId`, never a playable URL. A server-only mapping resolves that ID to private Supabase Storage objects.
3. On Play, a no-store server endpoint verifies session, entitlement, trusted installation, and playback lease, then returns a session-scoped HLS manifest. Prefer private/authenticated segment fetching where the player/browser permits it. The fallback is a rewritten manifest containing very short signed segment URLs; those are bearer URLs and may fetch encrypted bytes until expiry even when copied. The vertical slice must measure that residual window and test native iOS Safari separately from hls.js, plus seek, CDN cache, Range requests, expiry, and revocation.
4. Encrypt HLS segments with a per-asset key whose key endpoint repeats the authorization/lease check. This raises the extraction effort but is explicitly **not DRM**: an authorized browser necessarily receives the key and can be instrumented by a determined learner.
5. Overlay a low-distraction, intermittently moving stable viewer code + rotating session code while playing, in addition to the baked brand mark. Never display a full email, phone number, raw IP, or other leak-prone personal detail. Keep the stable opaque viewer-code mapping with the entitlement for the account lifecycle plus a short deletion buffer; keep session-level mapping only with the 30–90-day security-event retention. Document both in the privacy notice and honor account deletion/legal-preservation rules.
6. API manifests, keys, and authorization responses use `Cache-Control: no-store`; secrets and service-role keys never enter browser bundles or logs. Do not proxy all video bytes through a Next.js/Vercel function unless a measured proof shows it is necessary and the owner approves its bandwidth cost.

The first protected-delivery slice must benchmark private authenticated object fetches against rewritten short-signed manifests. Prefer the simpler route that passes expiry/cache/browser tests. Signed segments cannot be session-bound after issuance; protection depends on short TTL + encryption + the separately gated key. If a learner already fetched both ciphertext and key, playback remains possible for that issued window. If neither route is reliable on the supported browser matrix, stop video integration and keep the app-only lesson—do not weaken the boundary.

The moving mark is a browser overlay and a skilled user can hide it; it is a deterrent and leak clue, not forensic proof. sec-04 must also define a no-subscription leak-response runbook: preserve evidence, map only a visible session code under restricted access, revoke affected sessions/devices, send a factual learner notice, and use the hosting/search platform's takedown process where appropriate.

### Signals, enforcement, privacy, and support

Start sharing rules in shadow mode. Use explainable server events—device added/revoked, verified step-up, lease acquired/denied/taken over, and repeated overlapping activity. Country/network data is secondary context only. Retain detailed security events for the shortest useful window (target 30–90 days), implement and test automatic purge, restrict staff access, and update learner-facing policy/privacy text before enforcement.

Enforcement escalates: observe → notify → step-up → revoke other sessions/devices → clear warning → temporary protected-content restriction with human review. Never permanently cancel paid access from an automated score. Messages state the event (“video is active on another device”), not an accusation. Provide a device reset, compromise recovery, support override, and appeal route before hard enforcement.

### Options and upgrade triggers

| Option | Decision | Trade-off |
|---|---|---|
| Public/direct MP4, `nodownload`, right-click blocking, unlisted YouTube/Vimeo | Reject for paid course media | Almost free, but the link/file is trivially copied; controls are cosmetic. |
| Private short-lived MP4 | Reject as the main course format | Stops permanent public links, but an authorized learner can save the complete file during validity. |
| Self-hosted protected HLS on Supabase + local FFmpeg + visible watermark | **V1 choice** | No new vendor subscription and full control; meaningful engineering/QA; deters rather than defeats a determined extractor. |
| Low-cost managed signed streaming without DRM | Deferred | Less engineering and better transcoding, but adds variable recurring spend/vendor lock-in and still does not stop capture. |
| Managed multi-DRM (Widevine/FairPlay/PlayReady) | Deferred until evidence warrants | Strongest practical download protection, but device/support complexity and recurring platform/license cost; desktop screen capture can remain possible. |
| Per-user burned copies / forensic A-B watermarking | Reject for V1 | Strong leak tracing, but storage/CDN explosion or enterprise vendor cost is disproportionate. |
| Native-app screenshot blocking / hardware attestation / ID-selfie checks | Reject for V1 | High exclusion, privacy, support, and build cost; still cannot stop an external camera. |

Reconsider managed DRM or forensic watermarking only after a confirmed leak pattern or material paid revenue demonstrates that the expected loss exceeds vendor + migration + support cost. That requires a new decision and owner-approved recurring budget.

### Required release evidence

- Unauthenticated, guest, wrong-account, unentitled, revoked-device, expired-session, and cross-account requests fail server-side.
- Copied manifest and key endpoints fail outside the authorized session; a copied signed segment may fetch only encrypted bytes until its short TTL. After TTL it fails. Tests measure cache behavior and the residual case where both ciphertext and key were already obtained rather than claiming immediate revocation.
- Two normal devices work; third-device replacement, playback takeover, password/account recovery, and sign-out-everywhere work without losing progress.
- Android Chrome, native iOS Safari, Windows Chrome/Edge, macOS Safari, hls.js where used, slow/intermittent mobile data, seek/refresh/long pause/full-screen/subtitles all pass or receive an honest app-only fallback.
- VPN, shared Wi-Fi, mobile carrier changes, India↔Germany travel, cookie clearing/private browsing, and accessibility authentication paths do not cause automatic punishment.
- Watermark remains visible but avoids captions/teaching targets; screen-recording behavior is documented per platform and never overclaimed.
- Spend Cap is visibly on, the usage dashboard and any available quota alerts are checked, and quota exhaustion never exposes an unprotected fallback.

## Avoid

New frameworks · content database/CMS · microservices · runtime AI dependence · payment testing pre-pilot · speculative abstractions · public/stable premium media URLs · client fingerprinting · hard geofencing · paid security/streaming/DRM vendors without a new owner decision.

## Principles

1. **Content is data, validated by schema.** Every content change goes through `npm run qa`.
2. **Every feature must serve "pass the exam."** No feature without a named Goethe skill or journey step.
3. **Works with zero AI budget.** AI (speech eval, writing feedback) is enhancement; the course functions without it.
4. **Boring = sev-1 bug** (Reel Rule).
5. **No "done" without a QA gate** (`QA_AND_EVALUATION_HARNESS.md`): qa green + phone-width playthrough evidence.
6. Refactor opportunistically, not speculatively: the 1,400–2,800-line files (lesson player, test player, `goethe-tests.ts`, biggest module files) get split only when touched for a feature.

## AI budget (€100 cap)

~€60 TTS for missing native German audio (video model lines + app gaps) · ~€30 Gemini speech-eval during pilot · ~€10 reserve. **No image/video generation spend.** Gemini is used sparingly and only with the sparkle badge on AI-derived content (existing policy).

**Exception (DECISIONS #9, 2026-06-12):** a one-time batch converted the owner's expiring Google Cloud credits (€150–200 target, €198 hard cap) into pre-baked static assets — native German audio (Cloud TTS Chirp3-HD), painterly scene backdrops + vocab illustrations (Imagen 4), adult-Kuttan poses, and ambient Veo loops. Ledger: `scripts/output/gemini-spend-ledger.json`. This batch does not change the runtime rule: the app runs at €0 AI budget; all generated assets are static files in `public/`.

## Testing & CI

- Vitest, seeded from `tests/content-validation.test.ts`: content schema · quiz answers valid & present in options · audio URLs resolve to real files · production-floor check (≥3 production exercises per spine lesson) · duplicate-exercise detection · empty-explanation scan.
- `npm run qa` = lint + typecheck + Vitest content suite. Required before any commit that claims a task done.
- Build verification (`next build`) before any deploy.

## Environment contract (DECISIONS #17)

- **Versions:** Node ≥ 22.12 LTS, npm ≥ 10; `package-lock.json` is the lockfile (no yarn/pnpm). Bootstrap on any machine: `git clone` → `npm ci`.
- **Video chunks additionally:** FFmpeg on PATH · first Remotion render downloads Chrome Headless Shell (~108 MB, once per machine) · Playwright playthroughs need installed Chrome (`channel: 'chrome'`) · HyperFrames runs via pinned `npx --yes hyperframes@0.7.54` (network on first use per machine).
- **Secrets:** `.env.local` (gitignored). Key names: `GEMINI_API_KEY` · `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` · `STRIPE_PUBLISHABLE_KEY`/`STRIPE_SECRET_KEY` · `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY`. Values move owner→machine manually; never committed, logged, or pasted into PRs/handoffs.
- **Paid gates:** the €100 cap applies to AI spend and the app still works at €0 AI. Supabase Pro is pre-approved only when required, with Spend Cap enabled. Every other new recurring platform/security vendor, overage path, or cap removal needs owner go-ahead at the point of spend (DECISIONS #18).
- **Relative paths only** in scripts/configs/manifests; a machine-absolute path is a review-blocking defect.
- **Platform/harness:** Windows 11 is the owner's primary; everything runs from repo root via `npm run …`/`node …` under PowerShell, cmd, or bash. Plain git + npm + CLI only — no dependence on Claude Code, Codex, Gemini CLI, or any MCP server (`AGENTS.md` is the shared entrypoint; the workspace Playwright MCP is a convenience with direct Playwright as the fallback).
- **Deterministic validation:** `npm run qa` · `node experiments/module-01-video-hybrid/validate.mjs` · per-video-project `npm run check`/`npm run validate` · `ffprobe` on rendered files. Compositions stay deterministic — no `Date.now()`, no `Math.random()`, no network fetches.

## Video production pipeline (DECISIONS #17)

One master assembler, two bounded specialists — never three parallel lesson pipelines:

| Responsibility | Owner |
|---|---|
| Scene timing, cuts, asset ledger (engine-neutral) | `lesson.scene.json` contract + validator (`experiments/module-01-video-hybrid/`) |
| Exact German text + transcripts (canon) | `course-production/` scripts + scene-JSON `transcript` fields |
| Teaching graphics | HyperFrames sub-compositions; one bounded teaching intent per insert; each **approved** insert rendered once and frozen as checksummed media |
| Long-form master assembly: owner footage, PIP, captions, audio placement, batch variants | Remotion, in its own project dir (frozen `src/remotion/` app internals stay untouched; stage a per-lesson `public/` dir — never bundle the app's 193 MB `public/`) |
| Algorithmic diagrams, clocks, waveforms | Canvas insert factory → MP4/WebM consumed by Remotion |
| Final encode + technical QC | FFmpeg/ffprobe → `render-report.json` (full decode check, duration/size vs contract) |
| Learner-facing German audio | pre-rendered native audio ONLY (`public/audio/` Chirp3-HD batch); never msedge-tts/SpeechSynthesis (`scripts/gen-tts.ts` is non-learner scratch only) |
| Lesson video length | **15–18 min dense per video** (owner ruling, DECISIONS #17.4) |

**Design/content separation (DECISIONS #18/#19/#21):** `lesson.scene.json` owns semantic scene type, timing, exact text/transcript, audio, cast role, and asset checksums — never literal hex values, font files, or page-specific layout. A central cast registry resolves the fixed display identities Nivin, Meera, Frau Fischer, and Appu; renderers do not scatter legacy names through templates. Renderer-level versioned tokens own colour, type, spacing, radius, and motion. v1-02 proves the semantic element system with neutral tokens/roles while 3p-03 audits Direction 2A; design v0.1 and the fixed cast are applied only after owner approval/migration. Later token-level refinement can re-render inserts without rewriting scripts, timing, or owner footage.

**Remotion ↔ HyperFrames handoff (DECISIONS #19):**

- Remotion owns the only full lesson timeline and final audio mix. HyperFrames must never become a second whole-lesson edit.
- One HyperFrames insert = one teaching intent (for example phrase-build, pronunciation contrast, mistake-repair, or exam-step reveal). It must be deterministic and seek-safe, with no render-time network dependency.
- Every insert handoff declares dimensions, frame rate, exact duration, background/alpha contract, safe area, audio contract (silent by default), source scene ID, version, and SHA-256. Remotion consumes only the rendered artifact, never a live HyperFrames runtime.
- v1-02 proves two neutral inserts—phrase-build and mistake-repair—inside a 60–90 second Remotion master. After 3p-03, v1-03 applies design v0.1 and freezes only the owner-approved versions.

Pipeline stages stay distinct: design-neutral Remotion/HyperFrames proof → design v0.1 element skin + approval reel → cast constitution/Meera asset approval → fixed-cast migration → recording kit → owner recording → vertical slice → finished lesson master → app integration. Repeat the reviewed lesson loop through all 56; a proof, kit, slice, or proxy never increments the launch-complete count.

**All-56 release contract (DECISIONS #22):** maintain one machine-readable inventory row per spine video. `launchComplete` is derived, never manually asserted: approved master + exact transcript/captions + native German model-audio references + passing render report/full decode + `MEDIA_MANIFEST.json` checksum record + protected delivery asset + successful app playback evidence. Pilot/release requires exactly `56/56`, zero duplicate lesson IDs, zero missing delivery assets, and zero placeholder video states. App-only lesson continuity remains the outage fallback after delivery, not a release waiver.

## Media & artifact storage (DECISIONS #17)

| Artifact | Home |
|---|---|
| Composition/scene sources, storyboards, validators, manifests + SHA-256, contact sheets, render reports | Git — always |
| Intentionally public promo/comparison reels (≤ ~10 MB, approval milestones only) | Git; public-repo-safe content only |
| Protected lesson footage and owner-review proxies | Restricted Drive storage + media manifest; never the public Git repo, PR attachment, release asset, or public link |
| Full-res masters + raw owner footage | Google Drive `AdipoliGerman-Media/`, registered in a committed per-lesson `MEDIA_MANIFEST.json` (lesson ID, cast roles, name, version, sha256, size, link, recovery steps) before "delivered" |
| App-delivery derivatives (`videoAssetId` → protected HLS) | Private Supabase Storage, mediated by the protected session/manifest/key design in DECISIONS #18; never a stable public video URL |
| Render work-caches, captured frames, per-project `node_modules`, temp outputs | Neither — gitignored, regenerable, freely deletable |

Naming: `m<module>l<lesson>-<stage>-v<N>` (stages: reel/kit/slice/master/app). New version = new manifest entry; previous master kept until the owner deletes; raw footage kept permanently. Retrieval on another machine: manifest → download → verify sha256; missing or mismatching artifact = reported blocker. Git LFS remains unsuitable for 56 full-res lesson masters.
