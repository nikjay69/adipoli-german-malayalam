# PRODUCT_VISION.md — Adipoli German A1

Status: **Source of truth.** Established 2026-06-11 (documentation reset). Change only in Product Architect Mode with a DECISIONS.md entry.

## One sentence

> Adipoli German is a guided A1 exam-success course where a Malayali learner follows dense, never-boring video lessons + interactive missions, takes closed checkpoints that diagnose their Hören/Lesen/Schreiben/Sprechen weaknesses, receives exact recovery tasks, and walks into the Goethe A1 exam knowing they will pass.

## What this course is

- A **spoon-fed A1 course**: owner-recorded video spine (Manglish-taught) + app practice layer + mock exams + test-and-recovery system.
- **Guided forward, open backward** (DECISIONS #15). The next required block is always the default, prominent action — but everything the learner has completed stays freely revisitable: rewatch a video, redo a lesson or whole module, replay audio, review vocab, retake a checkpoint or mock as practice. Forward is gated; backward and sideways are designed flows (`LEARNER_JOURNEY.md` learner intents), never blocked and never accidental. Redoing never destroys progress.
- **Spine + Library**: an 8-module guided spine is the product; the existing 18-module lessons, flagship games, and SRS are a hidden practice library reached through recovery prescriptions and an optional Practice hub.
- **Video-enhanced, not video-blocked**: every spine lesson is completable from the app alone (audio + interactive). Video deepens; its absence never blocks a module from shipping.
- **One coherent, evolvable product world** (DECISIONS #18): public entry, course shell, modules, lessons, checkpoints, recovery, and video graphics must feel like one system. The owner-selected **2A “Scenes & Daylight”** direction is the working base: calm cream/daylight surfaces for orientation, reading, and recovery; deep-green “rooms” for lived scenes, missions, and checkpoints; gold for decisive action; numbered scene/module flags for place and progress. It becomes implementation-ready only after the completion board is audited and the owner approves **design language v0.1**. The approval freezes reusable tokens and shared components for a build cycle, not the product forever; later refinements happen centrally rather than as page-by-page restyling.
- **Human-led video, composited teaching graphics** (DECISIONS #17/#19): the owner’s real Manglish teaching remains the canonical video spine. Remotion assembles the long-form lesson; HyperFrames creates bounded teaching inserts that are rendered once and frozen into that master. Automation supports the owner’s teaching rather than replacing it.

## What this course is NOT

- Not a content library or dashboard.
- Not a games arcade (games are remediation/retention only).
- Not a general "learn German" app — the promise is Goethe A1 readiness.
- Not an AI-tutor product (AI is optional support, never the foundation). Approved posture (DECISIONS #15): sparkle-badged Gemini speech/writing evaluation as enhancement only, with graceful €0 fallbacks always in place.
- Not A2/B1 — yet.

## Who it is for / not for

| For | Not for |
|---|---|
| Malayalam speakers (16–35) with basic English | Advanced learners |
| Need Goethe A1 for career/study/family reunification | Children |
| In Kerala or already in Germany | Non-Malayalam speakers |
| No live teacher; need structure, confidence, speaking practice | Casual hobbyists |

## Learner promise

> "Zero → Goethe A1-ready. You will always know what to do today, and you will know when you're ready to book the exam."

## Success definitions

- **A1 success**: learner scores ≥75/100 on two full timed in-app mock exams (real pass mark is 60) AND completes the speaking simulator for all 3 Sprechen Teile.
- **Exam-readiness**: all 8 module checkpoints passed + 2 timed full mocks ≥75 + readiness checklist green in all four skills.
- **Practical German at A1**: introduce self, spell, handle numbers/prices/dates/time, talk about family/work/food/home/routine/hobbies, make appointments, navigate transport/doctor/forms, write a 30-word email, ask and answer W-/Ja-Nein questions.

## Course soul (protect, but exam goal wins over any device)

- **Kerala-rooted**: A1 happens physically in Kerala. Germany appears as dream, cousin video call, exam rehearsal, or imagined scenario (canon: `reference/A1_STORY_BIBLE.md`).
- **Kuttan as stakes, not mascot spam**: peer/older-cousin energy, adult-safe, never childish. Appu is a silent UI mascot.
- **Manglish-friendly, exam-serious**: warm teaching voice, serious German outcomes (full rules: `LANGUAGE_STRATEGY.md`).
- **Production-first**: learners speak, write, listen, recall — not just click. No lesson is complete without a speaking or writing output.
- **Dialogue-scene-first, phone-first**: a lived German moment (hear → respond → repair → win), not pages of explanation. Text is captions for a moment, not paragraphs.
- **Self-sufficient**: onboarding, daily plan, checkpoints, and recovery replace the live teacher.
- **Feel is the bar, audit is the floor** (DECISIONS #15): a lesson is premium only when a human/agent playthrough feel-check passes (Feel Rubric in `LESSON_QUALITY_STANDARD.md`) — structural audit PASS alone never makes a lesson premium.
- **Calm contrast, not a full-dark wall** (DECISIONS #18): light space makes the product easier to enter and read; dark scene rooms create focus and emotional contrast. Neither treatment is decorative wallpaper — each communicates what kind of learning moment the learner is in.

## Design language v0.1 candidate — 2A “Scenes & Daylight”

Status: **audited 2026-07-17; owner approval required before learner-facing implementation.** Review source: `# 2A Product System Completion (2).zip`, SHA-256 `E6F4D912485B9438D49AA56CDBF842BAAE374B1049570DBD7E57CAEA68E0B3E2` (C1–C9 complete; 109/109 board images loaded; no browser warnings/errors). DECISIONS #21 records the audit corrections.

### Experience grammar

- **Daylight** — warm cream canvas for public explanation below the opening, navigation, Today, Course, module planning, reading, review, results, recovery, readiness, forms, and profile.
- **Rooms** — deep-forest, scene-led focus for the public cinematic opening, First German Moment, module thresholds, missions, listening, checkpoints, and earned celebrations. This is a purposeful state transition, not a theme toggle. Enter deliberately; return to daylight promptly.
- **Answer sheet** — warm paper bridges the two modes when a learner must read, choose, type, or inspect feedback inside a room.
- **Scene flags** — numbered flags carry place and progress through public entry, modules, lessons, missions, checkpoints, and recovery. They orient; they do not decorate empty space.
- **One dominant action** — gold is the decisive action/focus signal. Module accents express identity, never success, failure, or a second competing CTA.

### Foundation tokens

| Role | v0.1 token |
|---|---|
| Daylight canvas / layers | `#F5F0E8` / `#EFE9DC` / `#E9E4D8`; answer sheet `#F7EAD0`; white `#FFFFFF` restricted to content that genuinely needs it |
| Forest rooms | `#0C1811` / `#102018` / `#12241A` / `#16281C` |
| Action / focus | gold `#D4A520`; light gold `#F1D27A`; chai focus on light `#8A5A2A`; gold focus on dark |
| Text | light ink `#3F4D44`, muted `#66756A`; dark-room soft `#C8D0C9`, muted `#8FA093` |
| Semantic state | success `#1F7A44` (dark-room variant `#4FC07A`); recovery `#B95B33` (dark-room variant `#E08A5E`); always icon + label, never colour alone |
| Type | Source Serif 4 for display/German; Geist for UI; Geist Mono for compact labels; Archivo 800 stretched to 125% only for public-impact type; Noto Sans Malayalam fallback |
| Layout | public max 1160px; learner max 960px; lesson video + rail 1096px + 360px; gutters 20px mobile / 40px desktop |
| Spacing / radii | spacing `4/8/12/16/20/24/32/40/56`; radii chip 4, button 6, input 7, card 9, door 11, sheet 14px |

Production floors override the board’s illustrative small labels: ordinary body is 15–16px on mobile, meaning-bearing metadata is at least 12px, German is at least 16px, and targets are at least 44×44px. Focus rings are 2px with 2px offset. Room entry is calm and short (about 320ms); return is shorter; `prefers-reduced-motion` removes non-essential transitions. Production fonts are bundled by the app, never fetched from a third-party host at runtime.

### Shared product primitives

The v0.1 build reuses these families instead of styling pages independently: `SceneFlag`, `DarkDoor`, `AnswerSheet`, `TerritoryProgress`, `Threshold`, `Seal`/`StatusChip`, `SkillBars`, `TaskProgress`, `GermanLine`, `NavHeader`/`TabBar`/`RoomBar`, `AudioButton`, `RepairCard`, `PlanList`, and the K1–K16 interaction kit in `LESSON_QUALITY_STANDARD.md`. Icons are one calm outlined family; emoji do not substitute for interface icons.

### Character and scene law

- Frau Weber appears when the German teacher/classroom relationship is active. Adult Kuttan carries learner stakes and peer/older-cousin energy. Existing `Appu.tsx` is the Appu asset: he is a **rare, silent UI mascot**, never a speaking learner, M6 video-call peer, teacher, status icon, or CTA ornament.
- An active dialogue may show its two participants. Outside an actual dialogue, use at most one relevant support character; never add a decorative third character or mascot stack.
- Scene masters are portrait/vertical assets with explicit focal position by breakpoint. Do not stretch one large image across desktop. Approved stills ship first; ambient loops are optional garnish and never block a page.
- Character assets require clean alpha edges on both cream and forest surfaces. White flood-fill fringes fail the calm-design law.

## THE REEL RULE (hard law)

> **Zero boring content. Anywhere. Ever.**

Every lesson, video, mission, and screen must pass a boredom scan before shipping: no padding, no repeated meta-lecture, no dead screens, no filler drills, no "stretch" content to hit a duration target. In a world of Instagram reels, one boring minute loses the learner — and the word-of-mouth. Precedent: the 2026-06-10 Module 1 quality gate cut 35% padding and the lessons got *better*. The Reel Rule outranks deadlines and duration promises.

Corollary: the video promise is **"~20–25h of dense, zero-filler guided video"** — never inflate runtime to hit a number.

## Must NOT be built now

Payments flows · A2/B1 content · new games · AI tutor chat as core · cinematic AI video generation · marketing automation · admin tooling · any new strategy document (patch the existing 11 instead).

## Where everything else lives

| Question | Doc |
|---|---|
| Module/lesson/exam structure | `A1_COURSE_ARCHITECTURE.md` |
| Screens and flows | `LEARNER_JOURNEY.md` |
| What a good lesson is | `LESSON_QUALITY_STANDARD.md` |
| Malayalam/English/German mixing | `LANGUAGE_STRATEGY.md` |
| Hören/Lesen/Schreiben/Sprechen training | `EXAM_PREP_DESIGN.md` |
| Stack and code rules | `TECH_ARCHITECTURE.md` |
| Quality gates and checks | `QA_AND_EVALUATION_HARNESS.md` |
| What we're doing now | `ROADMAP.md` |
| Why we decided things | `DECISIONS.md` |
| Old docs | `DEPRECATED_DOCS.md` |
