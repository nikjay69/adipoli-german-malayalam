# ROADMAP.md — Current Plan and Hour Ledger

Status: **Source of truth.** Established 2026-06-11. Update the ledger and phase status as work completes; changing scope requires a DECISIONS.md entry.

## Budget (owner-confirmed 2026-06-11)

- **Core track** (agent + owner oversight: app, content, docs, QA): ~100h baseline, up to ~150h.
- **Video track** (owner production time, agent-prepared): ~60h baseline, up to ~150h. Owner expects ~60h suffices if preparation/automation is right.
- AI budget: €100 cap (allocation in `TECH_ARCHITECTURE.md`).

## CURRENT PHASE: Version A · Phase 3R — Quality Rescue (interleaved sprints)

Re-sequenced 2026-07-10 (DECISIONS #13) after a three-part audit (content, learner experience, project status) found the course far below the envisioned bar: with the audit tightened to the written speaking≥2 floor, **45 of 66 spine lessons FAIL** (102 generic stems, ~30 lessons without mistake-repair, MC chains up to 15/lesson in M17/M18); checkpoints are self-graded ("Mark all passed"); two competing home screens; mock Sprechen scored by recording count; dead `videoUrl` refs. **Video M1–M2 is deferred** (owner decision; scripts stay record-ready; "video-enhanced, not video-blocked" holds).

Each sprint pairs one experience fix (E) with one module content pass (C) to premium:

| Sprint | Experience fix | Content pass | Status |
|---|---|---|---|
| 1 | E1 One home (root = spine Today, one readiness source) | C1 · S4 (module-06/07) | — |
| 2 | E2 Real checkpoints (scored tasks, tags from misses) | C2 · S5 (module-09/10) | — |
| 3 | E3 Honest exam scoring + dead-video fix | C3 · S6 (module-11/12) | — |
| 4 | E4 Mission depth + storyScene coverage | C4 · S7 (module-14/17 exam-format rework) | — |
| 5 | E5 Exam layer (simulator v1, readiness, 7-day plan) | C5 · S8 (module-18) + Kerala-canon storyScene fixes | — |
| 6 | Final TTS batch (owner go-ahead at point of spend) + full-course QA gate | — | — |

Done when: `audit:spine` 66/66 PASS · checkpoints administer scored tasks with tags from misses · one home, one readiness source · honest mock scoring · speaking simulator v1 live · cold-start 390px playthrough green.

### Completed phases

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

Version A plus: video through M6 (~12h finished) · M4–M8 content raised to premium · Gemini writing feedback (capped) · speaking simulator v2 (timed, full Teile) · second pilot wave (50+ learners) with exam-outcome tracking · flagship games wired into prescriptions.
**Done when:** ≥2 pilot learners report passing the real A1 exam.

## Version C — Polished (Core ~200h + Video ~150h)

Version B plus: full video M1–M8 (~20–25h dense) · A1+ bridge unit live · Razorpay tested + soft paid tier · intro/marketing video · regression test suite · content v2 pass from pilot analytics.
**Done when:** paid launch live with documented pass-rate evidence.

## Top 20 fixes by learning-impact ÷ effort

1. Today screen replacing dashboard home · 2. Hide non-MVP routes · 3. Checkpoint→prescription engine · 4. Mock cadence (mini/half/full) · 5. Speaking simulator v1 · 6. Map existing lessons under 8 modules · 7. Audio-link + answer validation in qa · 8. Boredom-scan pass M1–M3 · 9. Readiness dashboard · 10. M1–M2 video pipeline · 11. SRS surfacing on Today · 12. Recap missions per module · 13. Guided email builder (Schreiben Teil 2) · 14. Form-drill sequencing (Teil 1) · 15. Retire `/play` duplicate route · 16. Consolidate audit scripts into `npm run qa` · 17. Error boundaries on learner path · 18. 3-question onboarding · 19. Model-answer audio pre-render for simulator · 20. Pilot feedback widget.

## Do NOT touch yet

Payment webhooks · auth/passkeys · Supabase schema · the 18-module content files (map, don't rewrite) · games code (hide, don't delete) · Remotion internals · `pilot/` media assets (contains canonical Kuttan reference images).

## Next prompt (use to start Phase 1 after Phase 0 is committed)

> Enter Implementation Mode. Read docs/PRODUCT_VISION.md, docs/ROADMAP.md (Phase 1), docs/LEARNER_JOURNEY.md and docs/TECH_ARCHITECTURE.md. Build Phase 1 — the guided spine: Today screen, 8-module course path, checkpoint wiring, recovery prescriptions v1, and hide all non-MVP routes from navigation. Do not touch content files, payments, or games code. Finish with `npm run qa` green and a mobile (375px) playthrough of the M1 path with screenshots as evidence.
