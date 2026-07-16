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

## 15 · 2026-07-12 · Vision fix: guided-forward-open-backward · Feel Rubric · AI eval wiring · Phase 3P before pilot

Owner vision-realism review. The course passes its structural audits (47 PASS / 19 WEAK / 0 FAIL) yet still feels flat, and the one-path doctrine had hardened into a single rail that blocks real learner behavior. Four decisions:

1. **"One path" softened to "guided forward, open backward."** The next required block stays the default prominent action, but everything completed is freely revisitable — redo a lesson/module, rewatch a video, review vocab, practice-retake checkpoints/mocks — via eight designed learner-intent flows (`LEARNER_JOURNEY.md`); redo never resets progress (practice-attempt record, `TECH_ARCHITECTURE.md` Build #8). **Supersedes** the absolute "the learner never browses" reading of DECISIONS #1/#2.
2. **Feel Rubric** (momentum · scene continuity · voice · production rhythm; graded FLAT/OK/ADIPOLI by 390px playthrough only) added to `LESSON_QUALITY_STANDARD.md`. The automated audit is the floor; the feel grade is the bar; FLAT = sev-1. **Why:** the never-run human boredom scan is exactly why "audit PASS" and "feels flat" coexisted.
3. **AI speech/writing eval wiring approved** within the existing €100 cap (~€30 pilot allocation): the already-built `/api/check-speech` and `/api/check-german` get wired into the simulator, mission speaking steps, and Schreiben Teil 2 — sparkle-badged, session-capped, with the existing heuristic/self-verdict €0 fallbacks intact. **Supersedes** the "keep frozen" status of the speech-eval integration in `TECH_ARCHITECTURE.md`.
4. **56-video plan reaffirmed by the owner** (offered shrink/cut alternatives; declined) with a concrete V1 recording track: agent prepares a recording kit for M1's 7 record-ready scripts, owner sets dates; video-enhanced-not-video-blocked unchanged.

**Sequencing:** one more quality pass — ROADMAP **Phase 3P "Feel & Flows"** (intent flows · feel pass · AI wiring + 7-day plan generator · TTS batch with browser-TTS fallback removal + first human boredom scan · V1 video track) — precedes the pilot. **Supersedes** Sprint 6 as the sole remaining Version A work. Tooling: Playwright MCP added at the workspace level for real-browser playthroughs (headless puppeteer can't raster framer-motion — the standing reason no human-equivalent feel check ever ran).

## 16 · 2026-07-12 · Small-chunk development with human checkpoints

Development proceeds in small, independently reviewable chunks instead of long autonomous batches. Each chunk has one named learner outcome or defect, a narrow file/flow scope, an explicit done condition, and proportionate evidence (`npm run qa` plus a 390px playthrough when learner-facing). After completing a chunk, stop and show the owner what changed, what remains weak, and the evidence before expanding into the next chunk. Agents may implement and QA the agreed chunk autonomously, but may not silently chain several roadmap items or reinterpret product direction between checkpoints. **Why:** the course has accumulated substantial development without enough human intervention; smaller review loops make feel, direction, and quality visible before drift compounds. **Supersedes:** the working practice of large autonomous multi-sprint implementation runs; it does not change Phase 3P scope or its completion gates.

## 17 · 2026-07-13 · Multi-session dev OS · video pipeline ownership · storage policy · calm-design law

Owner approved the full remote-friendly, harness-agnostic operating system that operationalizes #16 (context: owner ~40% satisfied — too much autonomous development without review; important progress must never exist only in a chat or on one machine). Five decisions:

1. **Repo is the only project memory.** One approved chunk = one `chunk/<id>-<slug>` branch = one PR; the chunk contract is the PR body; evidence and an end-of-session handoff are PR comments; agents never commit/push/merge `master` — owner merge = approval, PR comments = revision list. `ROADMAP.md` carries the chunk ledger and the next kickoff prompt; `AGENTS.md` carries the session/chunk/git protocol; interrupted sessions recover from branch + PR alone; stray uncommitted work is quarantined on `rescue/<date>` branches, never deleted. **Supersedes** ad-hoc session practice and any reliance on chat history as project context.
2. **Video pipeline ownership** (evidence: the three M1L1 comparison builds committed in PR #2; owner watched the HyperFrames and Remotion reels 2026-07-13 and preferred Remotion): **Remotion = long-form master assembler** (owner footage, PIP, captions, audio placement, batch variants; lives in its own project dir — frozen `src/remotion/` app internals stay untouched) · **HyperFrames = teaching-graphics insert factory** — each approved insert rendered once and frozen as checksummed media · **Canvas = algorithmic inserts only** (diagrams/clocks/waveforms as MP4/WebM consumed by Remotion) · **FFmpeg/ffprobe = final encode + technical QC** · the engine-neutral `lesson.scene.json` contract owns timing, exact German, and asset SHA-256s. Adopts `experiments/module-01-video-hybrid/README.md` as modified here. Never three parallel lesson pipelines. Learner-facing German audio remains pre-rendered native only.
3. **Media storage policy:** Git = sources, manifests + checksums, contact sheets, review proxies ≤ ~10 MB at approval milestones · Google Drive `AdipoliGerman-Media/` = full-res masters + raw owner footage, registered in a committed per-lesson `MEDIA_MANIFEST.json` (name, version, sha256, size, link, recovery steps) before anything counts as delivered · Supabase Storage = app-delivery files (`videoUrl`) · render caches/captured frames/per-project node_modules = gitignored, regenerable. Git LFS rejected (free tier ≪ 20–25 h of video; repo already ~438 MB).
4. **Owner rulings 2026-07-13:** every lesson video targets **15–18 minutes, dense** — **supersedes** the M1 production brief's 25–45 min lesson table (the 45-min sounds lesson likely splits); the three comparison-proxy mp4s stay in Git; the empty workspace-root `.git` was deleted (verified 0 files first); Vercel↔GitHub PR preview deploys confirmed active (the remote review channel).
5. **Calm-design law:** "**less distracting, more clean**" across the app AND the videos — codified as the Feel Rubric's fifth dimension (`LESSON_QUALITY_STANDARD.md`). First named defects from owner screenshots (each to be fixed as its own chunk, not silently): white flood-fill fringing behind the Frau Weber/Kuttan character cutouts (the #10 flood-fill approach is below the bar — re-matte from canonical sources with a proper local alpha-matting tool, no paid APIs); `/intro` (the cold-visitor first page per the #13 one-home rule) does not orient a stranger — it must say what this is, who it's for, and what happens next in one glance; overall text density too high.

## 18 · 2026-07-17 · 2A evolvable design base · parallel design/video lanes · bounded HeyGen test

Owner selected Claude Design direction **2A “Scenes & Daylight”** as the course’s working design ideology and asked to progress video-element production in parallel without pretending the design can never change. Five decisions:

1. **One coherent product system, with 2A as the working base.** Public entry, course shell, module identity, lessons, checkpoints, recovery, and video graphics must feel related. The intended grammar is calm cream/daylight for orientation, reading, and recovery; deep-green scene rooms for missions and focused assessment; gold for decisive action; numbered scene/module flags for place and progress. This **supersedes a full-dark canvas as the target** and rejects ad-hoc page-by-page styling. The unfinished Claude completion board is not implementation truth: chunk 3p-03 must audit it against the real product, assets, accessibility, and 1440px/390px behavior before owner approval creates **design language v0.1**.
2. **v0.1 is a build-cycle contract, not a permanent aesthetic freeze.** Colour, type, spacing, radius, motion, and component behavior are implemented through versioned shared tokens/primitives so later refinements propagate centrally. Ordinary token-level tuning needs review evidence, not a new product strategy. A change to the core metaphor, information hierarchy, or light-room/dark-scene grammar requires a new decision. **Why:** the course needs coherence now without creating another brittle redesign later.
3. **Core and video become parallel lanes with explicit dependency gates.** Design-neutral route/state audits, scene timing, captions, PIP geometry, phrase-card semantics, pause timers, native German audio placement, Remotion rendering, and FFmpeg QC may proceed while the board is completed. Public/learner UI implementation, final video colours/type/motion, recording-kit visuals, and batch output wait for design v0.1. **Supersedes** ROADMAP’s stale “Sprint 6a or V1-B” either/or choice. Sprint 6a visible UI waits for 3p-03 to avoid building the flows twice.
4. **Remotion remains the sole long-form master assembler.** Chunk v1-02 first proves a 60–90 second M1L1 element system in an isolated Remotion project, driven by semantic `lesson.scene.json` and neutral renderer tokens. HeyGen is never a second pipeline or runtime dependency; if used, it supplies one frozen input clip to Remotion. This preserves DECISIONS #17 tool ownership.
5. **HeyGen is an optional, owner-consented feasibility test—not the product identity.** After v1-02, chunk v1-03 may compare 30–60 seconds of real owner footage with one synthetic owner-presenter render using the same approved owner audio. Only the owner’s likeness is allowed, with the platform-required consent; never Frau Weber, Kuttan, learners, or third parties. German teaching audio stays pre-rendered native. The test proceeds only with owner assets and point-of-spend approval, may use at most the existing **€10 reserve**, is logged, immediately downloaded/checksummed, and is discarded if authenticity, lip-sync, calmness, or production-time value is not clearly acceptable. No batch generation follows without a new decision. This narrowly amends the “no image/video generation spend” rule for one comparison artifact; the owner-recorded spine and video-enhanced-not-video-blocked rule remain unchanged.

**Sequence:** complete 2A board → 3p-03 audit/owner approval → design v0.1, in parallel with v1-02 design-neutral proof → optional v1-03 keep/discard decision → v1-04 calm skin + seven M1 recording kits → owner records L1 → vertical slice. **Why:** it advances real production now, protects the human course identity, and postpones only the choices that genuinely depend on the final visual system.

## 19 · 2026-07-17 · Clarification: HyperFrames, not HeyGen

The owner immediately clarified that “HeyGen” in the parallel-video request was a typo for **HyperFrames**. This decision corrects DECISIONS #18 without rewriting the append-only record:

1. **No synthetic-presenter experiment is planned.** The HeyGen feasibility slice, consent workflow, API key, and €10 spending exception described in #18 are void. The existing **€10 reserve remains unallocated**, and the “no image/video generation spend” rule is restored. This supersedes items 4–5 of #18 wherever they mention HeyGen; #18’s 2A design-system and parallel-lane decisions remain in force.
2. **v1-02 is a joint design-neutral Remotion + HyperFrames proof.** Remotion remains the sole long-form master assembler under #17: owner footage/PIP, captions, lower thirds, pause timing, native German audio, and final timeline. HyperFrames supplies exactly two bounded teaching inserts for the proof—phrase-build and mistake-repair—rendered once, checksummed, and consumed as frozen media by Remotion. HyperFrames does not own a competing whole-lesson timeline.
3. **The engine-neutral contract protects the future design.** `lesson.scene.json` owns teaching intent, timing, exact text/transcript, and asset references. Each renderer owns versioned visual tokens. The proof uses neutral tokens while 3p-03 completes design v0.1; no content/timing rewrite should be needed when the approved 2A skin arrives.
4. **The video sequence is now:** v1-02 design-neutral Remotion/HyperFrames proof in parallel with the 2A board → 3p-03 design v0.1 → v1-03 apply the 2A skin and owner-approve/freeze the element system → v1-04 prepare all seven M1 recording kits → owner records L1 → vertical slice. Canvas remains algorithmic-inserts-only and FFmpeg/ffprobe remain final QC, exactly as #17 established.

**Why:** this is the parallel work the owner intended: build reusable lesson-video mechanics now without guessing the unfinished design language, while retaining one master pipeline and one human teaching spine.
