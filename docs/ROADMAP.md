# ROADMAP.md — Current Plan and Hour Ledger

Status: **Source of truth.** Established 2026-06-11. Update the ledger and phase status as work completes; changing scope requires a DECISIONS.md entry.

## Budget (owner-confirmed 2026-06-11)

- **Core track** (agent + owner oversight: app, content, docs, QA): ~100h baseline, up to ~150h.
- **Video track** (owner production time, agent-prepared): ~60h baseline, up to ~150h. Owner expects ~60h suffices if preparation/automation is right.
- AI budget: €100 cap (allocation in `TECH_ARCHITECTURE.md`).

## CURRENT PHASE: Version A · Phase 3P — Feel & Flows (quality pass before pilot)

Re-scoped 2026-07-12 (DECISIONS #15) after an owner vision review: lessons pass the structural audit (47 PASS / 19 WEAK / 0 FAIL) yet **feel flat when played** — the audit was the floor mistaken for the bar, and the never-run human boredom scan is why the gap stayed invisible. Second finding: the one-path doctrine hardened into a **single rail** that blocks real learner intents (redo a module, rewatch a video, review vocab, retake a checkpoint). Phase 3P replaces the old Sprint 6 solo slot; the pilot (Phase 5) follows immediately after. The 56-video plan is owner-reaffirmed with a concrete V1 recording track.

**Execution cadence (DECISIONS #16):** complete Phase 3P as small, independently reviewable chunks—not as one autonomous run. One chunk = one named learner outcome or defect, narrow scope, explicit done condition, and proportionate QA/playthrough evidence. Stop for owner review before starting the next chunk; do not silently chain sprint items.

**Chunk ledger (DECISIONS #17/#18/#19/#20 — the only chunk list; each contract lives in its PR body).** IDs: `pa-xx` = product-architecture decision, `v1-xx` = operating-system/video track, `3p-xx` = Phase 3P core track.

| Chunk | Outcome | Status |
|---|---|---|
| v1-00 · Durable baseline | repo = durable project memory; vision-fix docs + all video work committed; caches gitignored | **merged** (PR #2, 2026-07-13) |
| v1-01 · SOT doc patches | dev OS + 2026-07-13 owner rulings codified in these docs | **merged** (PR #3, 2026-07-13) |
| 3p-01 · Clean character cutouts | no white fringing behind Frau Weber/Kuttan anywhere in the app (rev2: defringe + 1px choke) | **merged** (PR #4, 2026-07-13) |
| 3p-02 · /intro orients a stranger | cold visitor understands what/for-whom/what-next in one glance, less text, chips removed | **merged** (PR #5, 2026-07-14); its copy-only screen is not the eventual public landing page and is superseded by the 2A system work below |
| pa-01 · Parallel design/video plan | 2A becomes an evolvable design base; safe parallel Remotion/HyperFrames work and dependency gates are durable | codified locally; absorbed into 3p-03 handoff |
| 3p-03 · Design-language v0.1 contract | completed 2A board audited; owner approves tokens, type, components, states, responsive behavior, asset usage, public entry, course shell, module identity, lessons, checkpoints, and recovery as one system | **audit complete on branch; owner approval pending** |
| 3p-04 · Shared visual foundation | app has one 2A token/type/icon/focus/motion foundation plus room/daylight/answer-sheet/scene-flag primitives; no learner page redesign yet | proposed; waits for 3p-03 owner approval |
| 3p-05 · Public boundary + First German Moment | genuine new visitor lands on `/`, understands the offer, completes a real hear→say→repair win, and reaches onboarding; returning learner has a quiet login path | proposed after 3p-04 |
| 3p-06 · Learner shell + Today states | returning learner always sees one calm next action; fresh, active, review-due, recovery, checkpoint, returning, and complete states are coherent | proposed after 3p-04; may follow 3p-05 review |
| 3p-07 · Course + module identity | all eight modules share one template while scene, number, accent, outcome, gate, read-ahead, checkpoint, and recovery states remain unmistakable | proposed after 3p-04; may follow 3p-06 review |
| v1-02 · Design-neutral Remotion + HyperFrames proof | isolated projects prove the shared semantic/timing contract: Remotion master with owner-video/PIP placeholder, captions, lower third, pause timer, and native German audio; two frozen HyperFrames teaching inserts; FFmpeg QC; no final visual skin | proposed; may run in parallel with 3p-03 |
| v1-03 · 2A video element system | apply approved design v0.1 to Remotion overlays and HyperFrames teaching inserts; owner signs off one calm approval reel; freeze the approved element versions | waits for 3p-03 + v1-02 |
| v1-04 · M1 recording kit | produce teleprompter files, shot checklist, pause map, asset manifest, and 15–18 minute budget for all seven M1 scripts using the approved element system | waits for v1-03 |

### Design-language gate and parallel work (DECISIONS #18/#19/#20)

**Selected direction, not permanent lock:** Direction 2A “Scenes & Daylight” is the working system. Chunk 3p-03 audited the completed C1–C9 board in `# 2A Product System Completion (2).zip` (SHA-256 `E6F4D912485B9438D49AA56CDBF842BAAE374B1049570DBD7E57CAEA68E0B3E2`) against the real app, routes, assets, content spine, accessibility law, and 1440px/390px behavior. The result is **PASS WITH CORRECTIONS**, recorded as the v0.1 candidate in `PRODUCT_VISION.md`, `A1_COURSE_ARCHITECTURE.md`, `LEARNER_JOURNEY.md`, and `LESSON_QUALITY_STANDARD.md`. Owner approval converts that candidate into the build-cycle contract. A change to the product metaphor or information hierarchy requires a new decision; ordinary centrally reviewed token tuning does not.

**Audit corrections and non-blockers (DECISIONS #20):** Appu already exists and remains a rare silent mascot, not an M6 peer; active dialogue may contain its two participants, while non-dialogue composition gets at most one relevant support character; `/` is the public boundary and `/#curriculum` is sufficient for v0.1; public proof/pricing/exam-centre claims stay hidden until verified; auth remains provider-agnostic; still images ship before optional ambient loops. The board’s 320/768/1024 rules are enough to approve the contract, but each implemented page must be tested at those widths, 390/1440, keyboard, reduced motion, and 200% zoom. Drawn small labels are illustrative—the production size floors govern.

**Owner decision now:** approve or revise the v0.1 candidate as one system. Pricing, testimonials/pass-rate claims, exam-centre facts, final wordmark artwork, auth provider, owner video, ambient loops, and extra breakpoint drawings are **not** design-approval blockers. For the free pilot, pricing and unverified proof stay absent; the board’s text wordmark is a centrally replaceable stand-in.

| Lane | Safe now | Wait for design v0.1 |
|---|---|---|
| Core product | board audit, route/intent inventory, data/state logic, content and accessibility review | public landing implementation, learner-shell restyle, module/lesson/checkpoint/recovery UI, final visual QA |
| Remotion master | scene/timing manifest, transcript/caption structure, owner-footage/PIP geometry, captions, lower thirds, pause timers, native German audio placement, render/QC automation | final colours/type/spacing, branded overlays, motion skin, recording-kit visuals, batch rendering |
| HyperFrames inserts | semantic teaching-insert prototypes such as phrase-build and mistake-repair; seek-safe deterministic motion; render/freeze/checksum handoff to Remotion | final 2A skin, approval-version renders, reusable branded insert kit |

**Sequencing rule:** after owner approval, build the shared foundation first, then fix the public boundary/First German Moment before redesigning the returning-learner dashboard. This puts the original cold-visitor defect ahead of lower-risk internal polish. Sprint 6a’s intent-flow UI is implemented through the same primitives rather than as a separate style pass. The V1 video lane is no longer an either/or choice against the core lane: v1-02 may proceed in isolated Remotion and HyperFrames projects while 3p-03 waits for owner approval.

| Sprint | Work | Done when | Status |
|---|---|---|---|
| 6a Flows for real use | Learner-intent flows 1–8 (`LEARNER_JOURNEY.md`): redo/rewatch/review/retake/self-serve practice/peek-ahead/re-entry; wire the orphaned `/onboarding` into first-visit; route disposition audit of all ~158 routes (ON-PATH/REVISIT/PRESCRIBED/HIDDEN) | 390px walkthrough of all 8 intents green; redo provably never resets progress; disposition table committed | route/state audit may proceed; visible implementation starts after 3p-04 and is sliced through 3p-05 onward |
| 6b Feel pass | Feel Rubric (`LESSON_QUALITY_STANDARD.md`) applied depth-first: M1–M2 spine lessons to ADIPOLI (convert table/note-heavy lessons to scene arcs on the first-mission model), then worst-graded M3–M8; clear the 19 WEAK | No FLAT lesson on the spine; M1–M2 ADIPOLI by playthrough evidence | — |
| 6c AI eval + plan | `/api/check-speech` into simulator + mission speaking steps; `/api/check-german` into Schreiben Teil 2 (sparkle badge, session cap, €0 fallbacks — TECH_ARCHITECTURE Build #7); 7-day plan generator (carried E5 item) | Human end-to-end mic+AI run recorded as QC evidence; €0-mode regression green | — |
| 6d Audio + full gate | Cloud TTS creds re-provisioned (owner); render the 59-file batch (~€10–20, owner go-ahead at point of spend); remove browser-TTS fallback from the graded path; full-course QA gate incl. the first human boredom scan | 0 pending audio in `audit:app-readiness`; no SpeechSynthesis reachable from the spine; full gate report in `GermanCourse_QC/` | — |
| V1 Video (parallel, owner track) | Staged track below (DECISIONS #17/#18/#19): pipeline decided → design-neutral Remotion/HyperFrames proof → 2A element-system sign-off → recording kit → owner records → vertical slice → finished L1 in app → scale L2–L7 | First finished M1 video in the app — or an explicit dated deferral logged in DECISIONS | A done; v1-02 proposed |

### V1 Video track stages (DECISIONS #17/#18/#19)

- **V1-A · Baseline & pipeline decision — done 2026-07-13:** repo baseline merged (PR #2); tool ownership decided (Remotion master assembler · HyperFrames frozen teaching inserts · Canvas algorithmic inserts · FFmpeg encode/QC; engine-neutral `lesson.scene.json`); storage policy set (`TECH_ARCHITECTURE.md`).
- **V1-B1 · Design-neutral Remotion + HyperFrames proof (`v1-02`):** prove 60–90 seconds of M1L1 from semantic scene JSON. Remotion owns the master timeline, owner-footage/PIP placeholder, captions, lower third, pause timer, and native German audio placement. HyperFrames renders two bounded teaching inserts—phrase-build and mistake-repair—once; Remotion consumes the checksummed outputs. Use neutral named tokens; do not guess the final 2A skin.
- **V1-B2 · 2A video element system (`v1-03`):** after 3p-03, apply design v0.1 to the Remotion overlays and HyperFrames inserts; render one calm approval reel; owner approves/revises; freeze each accepted element with version and checksum.
- **V1-B3 · M1 recording kit (`v1-04`):** prepare teleprompter, shot checklist, pause map, asset manifest, insert map, and 15–18 minute budget for all seven M1 scripts using the approved element system.
- **V1-C · Owner records L1 → vertical slice:** first ~3 min assembled through Remotion with real footage, native German audio, captions, PIP; owner reviews a short proxy.
- **V1-D · Finished L1 + app integration:** full 15–18 min master, FFmpeg technical QC, storage per policy, `videoUrl` wired, 390px playthrough with the video playing.
- **V1-E · Scale out L2–L7:** one lesson at a time, same review loop, reusing frozen inserts + per-lesson scene JSON.

Done when: design language v0.1 is owner-approved and implemented through shared primitives on the public entry + learner shell · all 8 intent flows green · zero FLAT spine lessons · AI eval live with €0 fallback · 0 pending audio and no browser TTS on the graded path · full-course QA gate report · V1 video outcome logged. Then Phase 5 (Pilot).

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

Payment webhooks · auth/passkeys · Supabase schema · the 18-module content files (map, don't rewrite) · games code (hide, don't delete) · Remotion internals · `pilot/` media assets (contains canonical Kuttan reference images).

## Next prompts (after the 3p-03 owner gate; core and video may run concurrently)

**Owner gate now:** review the 3p-03 handoff and say either **“Approve design language v0.1”** or list the exact contract changes. Do not resolve pricing, proof, final wordmark artwork, auth provider, exam-centre claims, ambient loops, or extra breakpoint drawings merely to unblock the design—they are explicitly deferred or centrally replaceable.

**Core/design — use only after v0.1 approval:**

> Enter Implementation Mode for chunk 3p-04 · Shared visual foundation. Follow AGENTS.md and approved design language v0.1 in PRODUCT_VISION.md, with DECISIONS #20 corrections taking precedence over the Claude board. Implement only the shared colour/type/spacing/radius tokens, bundled font roles, calm outline-icon rule, focus/reduced-motion foundation, and the room/daylight/answer-sheet/scene-flag primitives needed by later pages. Do not redesign `/`, Today, Course, modules, lessons, checkpoints, or recovery in this chunk; do not touch auth, pricing, course content, media generation, Remotion, or HyperFrames. Preserve existing behavior and make old screens continue to render. Done when token/primitives are documented in code, component/state examples are locally reviewable on cream and forest, 320/390/768/1024/1440 plus keyboard/200%-zoom checks pass, `npm run qa` is green, and the owner can approve the foundation before 3p-05.

**Video — safe to start immediately, without final design:**

> Enter Implementation Mode for chunk v1-02 · Design-neutral Remotion + HyperFrames proof. Follow AGENTS.md, DECISIONS #17/#18/#19, and the V1 pipeline in TECH_ARCHITECTURE.md. Use new isolated project directories; do not touch frozen app `src/remotion/`. Build a deterministic 60–90 s M1L1 proof driven by semantic `lesson.scene.json`. Remotion owns the master timeline, owner-footage/PIP placeholder, captions, lower third, pause timer, and native German audio placement. HyperFrames owns exactly two bounded teaching inserts—phrase-build and mistake-repair—which are rendered once, checksummed, and consumed by Remotion. Use named neutral tokens and placeholder surfaces, not final 2A colours/type/motion. No paid API, batch generation, app UI change, final lesson render, or duplicated whole-lesson pipeline. Done when both project checks pass, FFmpeg/ffprobe reports pass, the proxy/contact sheet are reviewable, and design v0.1 can replace renderer tokens without timing/content rewrites.

(Sprint 6a’s route/state audit may proceed design-neutrally. Its visible work is now delivered through the approved 2A foundation and small 3p-05+ surface/intent chunks, starting with the genuine-new-visitor boundary.)
