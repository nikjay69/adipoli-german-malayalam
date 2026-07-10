# DECISIONS.md — Append-Only Decision Log

Rule: **append, never rewrite.** Every direction change gets an entry: date · decision · why · what it supersedes. Read the last 5 entries at the start of every session. A direction change without an entry here did not happen.

---

## 0 · 2026-03 → 2026-06 · Historical record: the five eras (context for everything below)

1. **Cinematic video era** (Mar): Pixar-style Kuttan films via Veo/Imagen/Remotion → archived (cost/quality).
2. **Script waves + automation** (Mar–Apr): 18 modules, 146 video scripts, mass automation → superseded; scripts archived.
3. **Games-first** (Apr): 21 games as engagement spine → demoted to remediation.
4. **Dashboard coexistence** (early May): lessons+games+tests+vocab library → rejected ("feels like a library").
5. **Mission-guided video MVP** (May 20–Jun 10): 8-module guided video course + checkpoints + recovery → validated as direction, but unexecuted (0h video) and buried in doc sprawl.

**Root causes of drift:** autonomous loops generated strategy instead of executing it; no stable source of truth; vision repeatedly outran production capacity; no quality harness. **Countermeasures:** this doc system + the anti-drift laws in `CLAUDE.md`.

## 1 · 2026-06-11 · Product model: Hybrid A1 Exam-Success System

Guided video+mission spine + interactive diagnosis/recovery layer + mock exam engine. Chosen over: simple course (too thin), pure bootcamp (wrong entry point), Malayalam-first foundation (postpones the exam promise), AI-tutor (cost + drift risk). **Why:** reuses ~85% of built assets, matches the validated June direction, fits the owner's two-track time budget. **Supersedes:** all era 1–4 product framings.

## 2 · 2026-06-11 · Structure: Spine + Library (keep + bridge, not rebuild)

The 8-module MVP spine is the only learner-visible path. The existing 18-module content, flagship games, SRS, and practice routes become a hidden Library reached via recovery prescriptions and an optional Practice hub. Nothing valuable is deleted; old content becomes remediation fuel. **Supersedes:** the 18-module learner path as a primary navigation.

## 3 · 2026-06-11 · Video is in — with the video-enhanced-not-video-blocked rule

Owner commits ~60h (up to ~150h) personal video production, separate from ~100–150h core work, with maximal pipeline automation (TTS model audio, Remotion templates, ffmpeg batch). **Hard rule:** every spine lesson must be completable from the app alone; video deepens but never blocks a module or the launch. Launch gates on M1–M2 video only. **Supersedes:** "35h video before launch" as an implicit launch blocker.

## 4 · 2026-06-11 · Honest video promise: ~20–25h dense, zero filler

Resolves the open decision in `GermanCourse_QC/2026-06-10_module1-script-quality-gate.md` (M1 was −35% vs claimed length). We re-promise density over duration (option 1 of the gate). Never pad runtime to hit a number. **Supersedes:** the "~35h owned video" figure in the archived syllabus.

## 5 · 2026-06-11 · Launch model: free pilot first

Free launch to 10–25 real learners; payments later (infra untested and out of MVP scope). Working product before monetization. **Supersedes:** pricing-page-led launch assumptions.

## 6 · 2026-06-11 · The Reel Rule (owner-decreed hard law)

Zero boring/non-engaging/monotonous content anywhere. Boredom scan is a mandatory ship gate; boring = sev-1. The Reel Rule outranks deadlines and duration promises.

## 7 · 2026-06-11 · Documentation reset

11 source-of-truth docs + README + CLAUDE.md replace ~40 strategy docs and ~700 process logs (archived, not deleted — see `DEPRECATED_DOCS.md`). No new strategy/planning files may be created; patch the 11. Autonomous loops may only run Implementation/QA against an approved ROADMAP phase — never strategy.

---

<!-- Append new decisions below. Format:
## N · YYYY-MM-DD · Title
Decision. Why. Supersedes.
-->

## 8 · 2026-06-11 · Mock cadence mapping + Sprechen scoring + spine-aware lesson unlock (Phase 2)

The A1_COURSE_ARCHITECTURE module table and its gates table disagreed on mock placement (module table: half-mock at M4, full at M6; gates table: mini at M4, half at M6, full at M7). **Decision: the gates table is canonical** — mini-mock (Hören+Lesen, Üb.4) at M4, half-mock (Lesen+Schreiben+Sprechen, Üb.7) at M6, full mock (Üb.5) at M7, two timed finals (Üb.6, Üb.8) at M8; module-table milestone cells patched to match. Two implementation corrections logged: (1) the test player advertised 60 points but Sprechen could only score 10 — Sprechen now scores /15 like the other sections (matches the real exam weighting); (2) the lesson player's unlock rule still enforced the old 18-module linear order, which bounced spine learners off module-03 lessons and would have permanently locked modules 14/17 — unlock is now spine-aware, and non-spine modules (2, 13, 15, 16) are open practice library. **Supersedes:** the module-table mock milestones and 18-module lesson sequencing as learner-facing behavior. Evidence: `GermanCourse_QC/2026-06-11_phase2-content-bridge-gate.md`.

## 9 · 2026-06-12 · AdventurePlayer becomes the lesson player + one-time Gemini credit batch

Two owner decisions. (1) **The immersive AdventurePlayer (`/play`) is the spine's lesson player**; the `/learn/[m]/[l]` textbook player is retired to a redirect (its code parked, not deleted). Unlocking is spine-aware via `src/lib/curriculum.ts`; non-spine modules (2, 13, 15, 16) are open practice library. Supersedes roadmap fix #15's framing ("retire /play") — the textbook player was the duplicate. (2) **One-time credit burn**: owner has ~€254 of expiring Google Cloud credits on project `adipoli-german` and directed €150–200 be converted to pre-baked static assets (native German audio for every dictation/speaking model/simulator answer/checkpoint, painterly scene backdrops for all lessons, vocab illustrations, adult-Kuttan pose pack replacing the off-canon child renders, 10 ambient Veo loops ≤1.5 MB). Tracked call-by-call in `scripts/output/gemini-spend-ledger.json` with per-batch caps and a €198 hard stop. **This amends, for this batch only, the €100 AI cap and the "no image/video generation spend" rule** (those credits expire otherwise); the runtime app still works at €0 AI budget — all assets are static files. No AI-written lesson text; no generated teaching video; Kuttan/Veo outputs ship only with owner approval. Evidence: ledger + `GermanCourse_QC/` gate report (pending).

## 10 · 2026-06-13 · Canonical adult Kuttan unified across the whole app

The app had two Kuttan representations: `KuttanImage` (photo set) used in lessons, and a separate hand-drawn SVG `Kuttan` (an off-canon **child**) used in the app chrome (tests, today, course, checkpoints). Both now render the single canonical adult-Kuttan photo set (story bible: Kuttan is an early-20s Malayali). The 11 mood photos were generated from `pilot/references/kuttan-canonical.jpg`, background-removed to transparent PNGs (flood-fill, preserving the white shirt), and the child SVG component was rewired to use them. Old child renders preserved in `public/images/characters/_child-backup/` (revertible). **Why:** character consistency was the most visible uniformity gap; a child mascot contradicted the exam-success positioning. **Supersedes:** the SVG-child `Kuttan` component and the off-canon child PNGs as the in-app character. Part of the DECISIONS #9 credit batch; evidence in `GermanCourse_QC/2026-06-13_gemini-credit-batch-and-adventureplayer.md`.

## 11 · 2026-06-14 · Frau Weber gets a real character; mission dialogue UI made scene-first

The Module 1-2 missions (the learner's actual first experience) rendered dialogue as colored-dot avatars on a tiny SVG panel — bland, a Reel-Rule failure. Frau Weber (canon: the Goethe-Kochi teacher, strict but warm, M1-M5) now has a real character: 4 expressions generated to match Kuttan's art style, background-removed to transparent (`src/components/character/FrauWeber.tsx`). A shared `MissionDialogueScene` in `MissionUI.tsx` replaces the dots + SVG with the painterly Goethe-Kochi backdrop and the real Frau Weber + Kuttan figures facing each other; it covers both `ConversationSceneStep` and `ConversationRepairStep`, so all M1-M2 missions upgrade at once. Preserved the `immersive-model-line` QA test contract. **Why:** the first impression was bland; this is the dialogue-scene-first vision. Part of the DECISIONS #9 credit batch (~€0.30).

## 12 · 2026-06-14 · /preview review tool + owner-directed marketing asset batch

(a) Added `/preview` (not in nav) — an owner/QA page with "Unlock everything" (seeds all lessons complete, all checkpoints/mocks passed, M1-M2 missions done) and a clickable index of all 158 pages, so the whole app can be navigated freely for review. (b) Owner directed ~€45 more of the expiring credits toward marketing: a `marketing` batch (`scripts/gen-marketing.mts`) generates ~12 premium 9:16 Veo promo clips (Kerala→Germany brand narrative: study, exam, journey, arrival) + 6 Imagen social graphics, all text-free for caption overlay, in `scripts/output/marketing/`. Global cap raised to €250 ledger (= €250 actual worst-case, still under the €254 credits → no real-money charge). Part of DECISIONS #9.

## 13 · 2026-07-10 · Quality Rescue re-sequencing: interleaved experience+content sprints; video deferred

Owner reviewed the course and judged it far below the envisioned quality; a three-part audit confirmed it. (1) **Content:** M4–M8 fail the premium bar — with `audit-spine-premium` tightened to the written floor (speaking <2 = FAIL), baseline is **1 PASS / 20 WEAK / 45 FAIL** across 66 spine lessons, 102 generic stems, ~30 lessons without Malayali mistake-repair, MC chains up to 15/lesson in M17/M18, 86 canned praise-opener explanations. (2) **Experience:** checkpoints are self-graded checklists with a "Mark all passed" button (not closed diagnostics); two competing homes (`/` legacy dashboard vs `/learn` Today — onboarding routes to the legacy one); mock Sprechen scored by recording count and Schreiben Teil 1 scored 5/5 for any field content; M1/M2 `videoUrl` paths 404; no speaking simulator. (3) **Status:** all work after 2026-06-11 sat uncommitted for 3.5 weeks — now committed and pushed (raw generation candidates gitignored; back up externally, Gemini creds are deleted). **Decision:** re-sequence Version A into six interleaved sprints (one experience fix + one module content pass each — ROADMAP "Phase 3R"), pulling Version B's "M4–M8 to premium" forward; **video M1–M2 deferred** until the owner records (scripts stay record-ready; video-enhanced-not-video-blocked holds); one end-of-run Cloud TTS batch (~€10–20, owner go-ahead at point of spend) covers new exercise audio. Also recorded for the log: the 2026-06-15/16 work (first-run polish, production-build Suspense fix, brand-color sweep) shipped without a DECISIONS entry. **Supersedes:** "Phase 3 — Video M1–M2" as current phase; the Phase 2 gate's "M4–M8 stay acceptable until Version B" scoping.

## 14 · 2026-07-10 · Exam-drill distribution profile for modules 17/18

The premium distribution caps (MC ≤2 etc.) were written for teaching lessons. Modules 17/18 exist to simulate Goethe Hören/Lesen sections, which ARE multiple-choice/matching — enforcing the caps there would gut the drills and make them less exam-like, violating the exam-success promise. **Decision:** lessons in library modules 17/18 are exempt from the MC/fill-blank/matching caps; every other premium requirement (speaking ≥2 with Malayali mistake-repair, dictation, free-text, scene-grounded stems, no bare matching, no empty explanations) applies in full. Codified in `LESSON_QUALITY_STANDARD.md` (exam-drill profile) and `audit-spine-premium.ts`. **Supersedes:** the blanket per-lesson caps as applied to modules 17/18.
