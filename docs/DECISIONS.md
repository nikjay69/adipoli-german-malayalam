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
