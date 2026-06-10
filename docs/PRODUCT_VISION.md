# PRODUCT_VISION.md — Adipoli German A1

Status: **Source of truth.** Established 2026-06-11 (documentation reset). Change only in Product Architect Mode with a DECISIONS.md entry.

## One sentence

> Adipoli German is a guided A1 exam-success course where a Malayali learner follows dense, never-boring video lessons + interactive missions, takes closed checkpoints that diagnose their Hören/Lesen/Schreiben/Sprechen weaknesses, receives exact recovery tasks, and walks into the Goethe A1 exam knowing they will pass.

## What this course is

- A **spoon-fed A1 course**: owner-recorded video spine (Manglish-taught) + app practice layer + mock exams + test-and-recovery system.
- **One path.** The learner never browses a library; the app always shows the next required block.
- **Spine + Library**: an 8-module guided spine is the product; the existing 18-module lessons, flagship games, and SRS are a hidden practice library reached through recovery prescriptions and an optional Practice hub.
- **Video-enhanced, not video-blocked**: every spine lesson is completable from the app alone (audio + interactive). Video deepens; its absence never blocks a module from shipping.

## What this course is NOT

- Not a content library or dashboard.
- Not a games arcade (games are remediation/retention only).
- Not a general "learn German" app — the promise is Goethe A1 readiness.
- Not an AI-tutor product (AI is optional support, never the foundation).
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
