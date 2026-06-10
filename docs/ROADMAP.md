# ROADMAP.md — Current Plan and Hour Ledger

Status: **Source of truth.** Established 2026-06-11. Update the ledger and phase status as work completes; changing scope requires a DECISIONS.md entry.

## Budget (owner-confirmed 2026-06-11)

- **Core track** (agent + owner oversight: app, content, docs, QA): ~100h baseline, up to ~150h.
- **Video track** (owner production time, agent-prepared): ~60h baseline, up to ~150h. Owner expects ~60h suffices if preparation/automation is right.
- AI budget: €100 cap (allocation in `TECH_ARCHITECTURE.md`).

## CURRENT PHASE: Version A · Phase 0 — Reset (in progress 2026-06-11)

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
