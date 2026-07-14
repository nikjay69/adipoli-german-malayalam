# ROADMAP.md — Current Plan and Hour Ledger

Status: **Source of truth.** Established 2026-06-11. Update the ledger and phase status as work completes; changing scope requires a DECISIONS.md entry.

## Budget (owner-confirmed 2026-06-11)

- **Core track** (agent + owner oversight: app, content, docs, QA): ~100h baseline, up to ~150h.
- **Video track** (owner production time, agent-prepared): ~60h baseline, up to ~150h. Owner expects ~60h suffices if preparation/automation is right.
- AI budget: €100 cap (allocation in `TECH_ARCHITECTURE.md`).

## CURRENT PHASE: Version A · Phase 3P — Feel & Flows (quality pass before pilot)

Re-scoped 2026-07-12 (DECISIONS #15) after an owner vision review: lessons pass the structural audit (47 PASS / 19 WEAK / 0 FAIL) yet **feel flat when played** — the audit was the floor mistaken for the bar, and the never-run human boredom scan is why the gap stayed invisible. Second finding: the one-path doctrine hardened into a **single rail** that blocks real learner intents (redo a module, rewatch a video, review vocab, retake a checkpoint). Phase 3P replaces the old Sprint 6 solo slot; the pilot (Phase 5) follows immediately after. The 56-video plan is owner-reaffirmed with a concrete V1 recording track.

**Execution cadence (DECISIONS #16):** complete Phase 3P as small, independently reviewable chunks—not as one autonomous run. One chunk = one named learner outcome or defect, narrow scope, explicit done condition, and proportionate QA/playthrough evidence. Stop for owner review before starting the next chunk; do not silently chain sprint items.

**Chunk ledger (DECISIONS #17/#18 — the only chunk list; each contract lives in its PR body).** IDs: `v1-xx` = operating-system/video track, `3p-xx` = Phase 3P core track, `sec-xx` = protected-access track.

| Chunk | Outcome | Status |
|---|---|---|
| v1-00 · Durable baseline | repo = durable project memory; vision-fix docs + all video work committed; caches gitignored | **merged** (PR #2, 2026-07-13) |
| v1-01 · SOT doc patches | dev OS + 2026-07-13 owner rulings codified in these docs | **merged** (PR #3, 2026-07-13) |
| 3p-01 · Clean character cutouts | no white fringing behind Frau Weber/Kuttan anywhere in the app | **merged** (PR #4, 2026-07-13) |
| 3p-02 · /intro orients a stranger | cold visitor understands what/for-whom/what-next in one glance, less text | in review (PR #5) |
| sec-00 · Protected-access architecture | cost-capped video protection + two-device/one-activity policy + auth/schema boundary correction + staged QA plan | in review (draft PR #6) |
| sec-01 · Real premium authorization (proposed) | only a server-verified Supabase session + server-owned entitlement can reach protected resources | blocked on sec-00 owner review |
| sec-02 · Protected M1L1 delivery slice (proposed) | one lesson plays from private HLS via opaque asset ID with bounded access + baked/dynamic watermark | blocked on sec-01 |
| sec-03 · Trusted devices + activity leases (proposed) | two installations work; a second active video/mock gets a clear takeover flow | blocked on sec-02 |
| sec-04 · Sharing signals + recovery/privacy (proposed) | intrusive prototype fingerprinting is retired; minimal server events run in shadow mode with purge/support paths | blocked on sec-03 |
| sec-05 · Adversarial protected-pilot gate (proposed) | theft/replay/revocation/travel/accessibility/cost tests prove the boundary before enforcement | blocked on sec-04 |

| Sprint | Work | Done when | Status |
|---|---|---|---|
| 6a Flows for real use | Learner-intent flows 1–8 (`LEARNER_JOURNEY.md`): redo/rewatch/review/retake/self-serve practice/peek-ahead/re-entry; wire the orphaned `/onboarding` into first-visit; route disposition audit of all ~158 routes (ON-PATH/REVISIT/PRESCRIBED/HIDDEN) | 390px walkthrough of all 8 intents green; redo provably never resets progress; disposition table committed | — |
| 6b Feel pass | Feel Rubric (`LESSON_QUALITY_STANDARD.md`) applied depth-first: M1–M2 spine lessons to ADIPOLI (convert table/note-heavy lessons to scene arcs on the first-mission model), then worst-graded M3–M8; clear the 19 WEAK | No FLAT lesson on the spine; M1–M2 ADIPOLI by playthrough evidence | — |
| 6c AI eval + plan | `/api/check-speech` into simulator + mission speaking steps; `/api/check-german` into Schreiben Teil 2 (sparkle badge, session cap, €0 fallbacks — TECH_ARCHITECTURE Build #7); 7-day plan generator (carried E5 item) | Human end-to-end mic+AI run recorded as QC evidence; €0-mode regression green | — |
| 6d Audio + full gate | Cloud TTS creds re-provisioned (owner); render the 59-file batch (~€10–20, owner go-ahead at point of spend); remove browser-TTS fallback from the graded path; full-course QA gate incl. the first human boredom scan | 0 pending audio in `audit:app-readiness`; no SpeechSynthesis reachable from the spine; full gate report in `GermanCourse_QC/` | — |
| V1 Video (parallel, owner track) | Staged track below (DECISIONS #17): pipeline decided → calm reel sign-off + recording kit → owner records → vertical slice → finished L1 in app → scale L2–L7 | First finished M1 video in the app — or an explicit dated deferral logged in DECISIONS | A done |

### V1 Video track stages (DECISIONS #17)

- **V1-A · Baseline & pipeline decision — done 2026-07-13:** repo baseline merged (PR #2); tool ownership decided (Remotion master assembler · HyperFrames frozen teaching inserts · Canvas algorithmic inserts · FFmpeg encode/QC; engine-neutral `lesson.scene.json`); storage policy set (`TECH_ARCHITECTURE.md`).
- **V1-B · Calm reel sign-off + recording kit:** redesign the L1 approval reel to the calm-design law (LESSON_QUALITY_STANDARD Feel Rubric "Calm"), owner signs off the look; recording kit for all 7 M1 scripts (teleprompter files, shot checklist, pause map, 15–18 min budgets — DECISIONS #17 duration ruling).
- **V1-C · Owner records L1 → vertical slice:** first ~3 min assembled through Remotion with real footage, native German audio, captions, PIP; owner reviews a short proxy.
- **V1-D · Finished L1 + app integration:** full 15–18 min master, FFmpeg technical QC, storage per policy, opaque `videoAssetId` wired through protected playback (DECISIONS #18), 390px playthrough with the video playing; no stable/public media URL.
- **V1-E · Scale out L2–L7:** one lesson at a time, same review loop, reusing frozen inserts + per-lesson scene JSON.

### Protected access track (DECISIONS #18)

This track runs as separate small chunks because it crosses auth, schema, storage, privacy, and learner-support boundaries. The owner explicitly authorized auth/passkey/Supabase schema changes on 2026-07-14; they are no longer frozen. Each code chunk must still name exact paths and migrations in its PR contract and stop for owner review before the next chunk.

1. **sec-00 · Architecture and cost guardrail:** record the honest threat boundary, no-new-vendor rule, Supabase Pro/Spend Cap exception, two-device/one-protected-activity policy, delivery design, privacy rules, adversarial QA, and change the obsolete auth/schema boundary. Docs only.
2. **sec-01 · Real premium authorization:** audit the deployed Supabase configuration against committed SQL; establish a server-verifiable session + server-owned pilot/paid entitlement seam; ensure guest/demo/Zustand/manual-client auth cannot authorize it; add migration/RLS/bypass/recovery tests. No media work yet.
3. **sec-02 · One protected delivery vertical:** first audit the public Git history/releases/PR artifacts and Drive sharing for course footage; locally encode M1L1 to private HLS; store only `videoAssetId`; compare private authenticated fetch vs rewritten short-signed manifests; gate the encryption key; add baked + pseudonymous moving marks; prove expiry/cache/replay/seek/native-Safari behavior. No protected footage/proxy in public Git and no public playback fallback.
4. **sec-03 · Trusted installations and activity lease:** additive schema, device management/replacement, revoke-all, two-installation allowance, atomic one-video/one-timed-mock lease with heartbeat and deliberate takeover. No global single-session or IP lock.
5. **sec-04 · Sharing signals, policy, and recovery:** remove/disable the current client fingerprint + public-IP prototype; add minimal server events, 30–90-day purge, shadow-mode rules, understandable notices, support override, compromise recovery, privacy/seat-policy text, and a human-review ladder.
6. **sec-05 · Adversarial protected-pilot gate:** test copied URLs/keys, expiry/cache, revoked devices with existing JWT/buffer, two devices/third replacement, VPN/mobile/shared Wi-Fi, India↔Germany travel, accessibility, slow data, quota exhaustion, and watermark placement. Hard enforcement remains off until false-positive review passes.

V1-B/C production may continue in parallel because masters remain private. The code repository is public: future protected lesson footage/proxies stay in restricted Drive storage, while only intentionally public promo/comparison media may enter Git. V1-D cannot expose the current stable `videoUrl`; sec-01 and sec-02 must land first. If protected playback is unavailable, the app-native lesson remains usable and the video waits—there is never an unprotected fallback. Supabase Pro is activated only if measured need requires it, with Spend Cap on and no paid add-ons/default-compute changes; every other recurring security/video vendor remains unapproved.

Done when: all 8 intent flows green · zero FLAT spine lessons · AI eval live with €0 fallback · 0 pending audio and no browser TTS on the graded path · full-course QA gate report · V1 video outcome logged · any pilot video is behind the sec-05 protected-access gate with no public fallback. Then Phase 5 (Pilot).

### Completed phases

- Phase 3R (Quality Rescue, Sprints 1–5): **done 2026-07-11** — five interleaved experience+content sprints (DECISIONS #13) took the spine from 1 PASS / 45 FAIL to **47 PASS / 19 WEAK / 0 FAIL**: one home (root = Today), administered scored checkpoints with tags from misses, honest Sprechen/Schreiben scoring + 24 dead videoUrls neutralized, first-mission hear→say→repair arc + 0 generic stems, exam layer (Speaking Simulator v1 at `/practice/simulator`, cp8 auto task, Kerala-canon scene fixes). The old Sprint 6 (TTS batch + full gate) is superseded by Phase 3P above. Evidence: `GermanCourse_QC/2026-07-10_sprint1…` through `2026-07-11_sprint5-exam-layer-and-s8-premium-gate.md`.
- Phase 0 (Reset): **done 2026-06-11** — 11 SOT docs, archives, CLAUDE.md, `npm run qa` v0 (lint:mvp + typecheck + 12,902 content checks, green).
- Phase 1 (Spine): **done 2026-06-11** — Today screen (`/learn`), course path (`/course`), generic closed checkpoints for modules 2–8 (`/course/[id]/checkpoint`) with weakness tags + recovery prescriptions, skill-readiness bars, nav reduced to Today/Course/Practice/Me. Evidence: `scripts/output/phase1-playthrough/` (375px, zero console errors). Note: qa lint is scoped to the MVP surface (`lint:mvp`) because frozen legacy pages (games/auth) have pre-existing lint errors; widen the scope as files get touched.
- Phase 2 (Content bridge): **done 2026-06-11** — spine M1–M3 lessons (modules 03/04/05/08) raised to premium (scene-grounded stems, speaking ≥2 + mistake-repair per lesson, banned matching/mechanical stems gone, 6 padding cuts); boredom scan + acceptable-grade pass across all 66 spine lessons (0 FAIL on `scripts/audit-spine-premium.ts`, was 30); mock cadence wired (mini@M4 / half@M6 / full@M7 / 2 finals@M8 via `?gate=` on the test player, banded results in the store, spine blocks + `/tests` unlock spine-based); spine-aware lesson unlock fix (old 18-module sequencing dead-ended spine learners). Evidence: `GermanCourse_QC/2026-06-11_phase2-content-bridge-gate.md` + `scripts/output/phase2-playthrough/` (390px, zero console errors). Known debt: M4–M8 at acceptable grade (102 generic stems, speaking 1/2 in ~30 lessons — Version B), distribution-cap deviations documented per lesson, legacy `any` lint debt in the test player.

## Version A — Rescue launch (Core ~100h + Video ~60h)

| Phase | Hours | Output | Done when |
|---|---|---|---|
| **0. Reset** | 8 core | 11 SOT docs · old docs archived · CLAUDE.md · `npm run qa` v0 | Docs exist; archive done; qa runs |
| **1. Spine** | 25 core | Today screen · 8-module path · checkpoints wired · recovery prescriptions v1 · non-MVP routes hidden | Playthrough M1→M8 path, no dead ends, qa green |
| **2. Content bridge** | 30 core | Existing lessons mapped into spine · M1–M3 raised to premium standard · boredom scan all spine lessons · mock cadence wired (mini/half/full) | qa green; human gates PASS for M1–M3 |
| **3. Video M1–M2** | 10 core + ~25 video | Production pipeline automation (TTS model-audio pre-render, Remotion templates, batch assembly) · ~4–5h finished video | M1–M2 videos in app, mobile-playable |
| **4. Exam layer** | 15 core | Speaking simulator v1 · readiness dashboard (4 bars) · final 7-day plan | Full mock + simulator completable end-to-end |
| **5. Pilot** | 10 core + buffer | 10–25 free pilot learners · feedback loop · fix pass | ≥5 learners complete M1; feedback collected |

**Cut in A:** video M3–M8 (app carries those modules — video-enhanced, not video-blocked) · AI writing feedback · games polish · payments.
**Risks:** video pipeline slower than hoped (mitigation: the video-enhanced rule means launch never blocks on video) · content bridge reveals more rework than mapped (mitigation: M1–M3 depth-first, later modules at "acceptable" grade).

## Version B — Strong (Core ~150h + Video ~100h)

Version A plus: video through M6 (~12h finished) · speaking simulator v2 (timed, full Teile) · second pilot wave (50+ learners) with exam-outcome tracking · flagship games wired into prescriptions. (M4–M8 premium and Gemini writing feedback were pulled forward into Version A by DECISIONS #13/#15.)
**Done when:** ≥2 pilot learners report passing the real A1 exam.

## Version C — Polished (Core ~200h + Video ~150h)

Version B plus: full video M1–M8 (~20–25h dense) · A1+ bridge unit live · Razorpay tested + soft paid tier · intro/marketing video · regression test suite · content v2 pass from pilot analytics.
**Done when:** paid launch live with documented pass-rate evidence.

## Top 20 fixes by learning-impact ÷ effort

1. Today screen replacing dashboard home · 2. Hide non-MVP routes · 3. Checkpoint→prescription engine · 4. Mock cadence (mini/half/full) · 5. Speaking simulator v1 · 6. Map existing lessons under 8 modules · 7. Audio-link + answer validation in qa · 8. Boredom-scan pass M1–M3 · 9. Readiness dashboard · 10. M1–M2 video pipeline · 11. SRS surfacing on Today · 12. Recap missions per module · 13. Guided email builder (Schreiben Teil 2) · 14. Form-drill sequencing (Teil 1) · 15. Retire `/play` duplicate route · 16. Consolidate audit scripts into `npm run qa` · 17. Error boundaries on learner path · 18. 3-question onboarding · 19. Model-answer audio pre-render for simulator · 20. Pilot feedback widget.

## Do NOT touch yet

Payment webhooks · the 18-module content files (map, don't rewrite) · games code (hide, don't delete) · Remotion internals · `pilot/` media assets (contains canonical Kuttan reference images).

Auth, passkeys, and the Supabase schema **may be changed** under the approved-chunk rule in AGENTS.md: exact files/tables/routes, a prior architecture decision, additive migration + rollback, RLS/authorization-bypass and recovery QA, and owner review. They are not a standing “do not touch” area.

## Next protected-access prompt (proposed chunk sec-01 — use only after sec-00 owner approval/merge)

> Enter Implementation Mode for chunk sec-01 · Real premium authorization. Follow AGENTS.md and DECISIONS #18. Start with a read-only comparison of deployed Supabase configuration/schema and committed SQL; report any unknown deployment state before migration. Outcome: one server-side authorization seam proves that a real Supabase session plus server-owned pilot/paid entitlement is required, while guest/demo/Zustand/manual-client auth cannot authorize protected resources. Contract must name exact auth/API/Supabase/test paths before edits. Include additive migration + rollback, RLS cross-account/service-role tests, expired/revoked-session behavior, recovery, no-store caching, and `npm run qa`. Exclude HLS/media delivery, device limits, sharing heuristics, payment webhooks, and unrelated auth UX. Branch `chunk/sec-01-real-premium-authorization`; draft PR + handoff; stop for owner review.

(Sprint 6a — the 8 learner-intent flows, /onboarding wiring, route disposition table — remains next on the core track after 3p-02; slice it into ledger chunks when the owner calls it.)
