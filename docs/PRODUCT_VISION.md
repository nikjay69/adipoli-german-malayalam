# PRODUCT_VISION.md — Adipoli German A1

Status: **Source of truth.** Established 2026-06-11 (documentation reset). Change only in Product Architect Mode with a DECISIONS.md entry.

## One sentence

> Adipoli German is a guided A1 exam-success course where a Malayali learner follows dense, never-boring video lessons + interactive missions, takes closed checkpoints that diagnose their Hören/Lesen/Schreiben/Sprechen weaknesses, receives exact recovery tasks, and walks into the Goethe A1 exam with demonstrated evidence that they are ready to pass.

## What this course is

- A **spoon-fed A1 course**: owner-recorded video spine (Manglish-taught) + app practice layer + mock exams + test-and-recovery system.
- **Guided forward, open backward** (DECISIONS #15). The next required block is always the default, prominent action — but everything the learner has completed stays freely revisitable: rewatch a video, redo a lesson or whole module, replay audio, review vocab, retake a checkpoint or mock as practice. Forward is gated; backward and sideways are designed flows (`LEARNER_JOURNEY.md` learner intents), never blocked and never accidental. Redoing never destroys progress.
- **Spine + Library**: an 8-module guided spine is the product; the existing 18-module lessons, flagship games, and SRS are a hidden practice library reached through recovery prescriptions and an optional Practice hub.
- **Video-led and launch-gated** (DECISIONS #21): the owner-recorded Manglish videos are the teaching spine, not optional enhancement. All 56 finished lesson videos are required before the free pilot or public launch. App missions, diagnostics, recovery, native model audio, and readable lesson content support and reinforce the videos. They remain usable when playback fails, but that resilience is not permission to ship an incomplete video course.
- **One coherent, evolvable product world** (DECISIONS #18/#23): public entry, course shell, modules, lessons, checkpoints, recovery, and video graphics must feel like one system. The owner-selected **2A “Scenes & Daylight”** direction is the working base: calm cream/daylight surfaces for sustained learning, orientation, reading, practice, assessment, and recovery; deep-green framing only for public/landing and other high-level page heroes, module thresholds, media stages, and brief immersive scene context; light task surfaces inside any dark frame; gold for decisive action; numbered scene/module flags for place and progress. It becomes implementation-ready only after the completion board is audited and the owner approves **design language v0.1**. The approval freezes reusable tokens and shared components for a build cycle, not the product forever; later refinements happen centrally rather than as page-by-page restyling.
- **Human-led video, composited teaching graphics** (DECISIONS #17/#19/#23): the owner’s real Manglish explanation—on camera or continuing as voice-over—is the canonical video spine. Remotion assembles the long-form lesson; HyperFrames and Canvas create bounded teaching visualizations that are rendered once and frozen into that master. Scripts plan each presenter → visualization → presenter handoff. Automation supports the owner’s teaching rather than replacing it.

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

- **A1 success**: learner scores ≥75/100 on two distinct full timed in-app mock exams, no section below 60%, AND completes the speaking simulator for all 3 Sprechen Teile on two different days.
- **Exam-readiness**: all 8 module checkpoints passed · every core weakness tag secure · 2 timed full mocks ≥75 with no section below 60% · readiness checklist green in all four skills · required form/message and speaking evidence complete.
- **Practical German at A1**: introduce self, spell, handle numbers/prices/dates/time, talk about family/work/food/home/routine/hobbies, make appointments, navigate transport/doctor/forms, write a 30-word email, ask and answer W-/Ja-Nein questions.
- **Launch-readiness**: all 56 videos have an approved master, exact captions/transcript, native German model audio, technical QC, durable media manifest/checksum, app delivery URL, and verified mobile playback **and** all 56 mastery rows have teaching/practice/diagnosis/recovery/two-retest/spiral evidence, zero orphan tags, and official calibration recorded. No “video coming soon,” placeholder owner frame or adaptive dead end remains on the spine.

## Mastery doctrine — same destination, flexible support

**The essential A1 foundation is common to every learner. Personalisation changes support, repetition and timing; it never lowers or deletes the outcome.**

- The default zero-to-A1 path completes the full 56-lesson spine. A self-check may choose more scaffolding or a faster practice density; it does not let confidence alone skip a core production proof, spiral review, module gate or final readiness proof.
- A test is a routing instrument, not merely a score. Every miss must identify a stable weakness tag and lead to one exact next teaching action.
- Recovery means **re-explain → guided practice → useful learner output → fresh-item retest**. Repeating the same quiz or saying “revise more” is not recovery. A repeated miss changes the explanation or modality before another fresh retest.
- Core prerequisite tags block progression until secure. Supporting weaknesses may travel forward only with mandatory scheduled recovery, and every unresolved tag must be cleared before the learner can become **A1 Ready**.
- Video watching, streaks, clicks and recognition averages never substitute for speaking, writing, listening recall or closed-book evidence.
- Internal readiness is calibrated against current official Goethe adult A1 specifications, Wortliste and practice sets before pilot. The responsible promise is a complete route to demonstrated readiness for a committed learner, not an unconditional result regardless of participation or exam-day performance.

The row-level contract is `reference/GOETHE_A1_EXAM_MAP.md`; routing and retest rules are in `EXAM_PREP_DESIGN.md` (DECISIONS #22).

## Course soul (protect, but exam goal wins over any device)

- **Kerala-rooted**: A1 happens physically in Kerala. Germany appears as dream, cousin video call, exam rehearsal, or imagined scenario (canon: `reference/A1_STORY_BIBLE.md`).
- **Nivin and Meera as equal learner stakes** (DECISIONS #21): two adult Malayali peers, each with independent goals, mistakes, and wins; neither is the token sidekick or the teacher. Lessons alternate whose lived scene carries the moment. Appu is the silent elephant mascot, not a narrative participant.
- **Manglish-friendly, exam-serious**: warm teaching voice, serious German outcomes (full rules: `LANGUAGE_STRATEGY.md`).
- **Production-first**: learners speak, write, listen, recall — not just click. No lesson is complete without a speaking or writing output.
- **Dialogue-scene-first, phone-first**: a lived German moment (hear → respond → repair → win), not pages of explanation. Text is captions for a moment, not paragraphs.
- **Self-sufficient**: onboarding, daily plan, checkpoints, and recovery replace the live teacher.
- **Feel is the bar, audit is the floor** (DECISIONS #15): a lesson is premium only when a human/agent playthrough feel-check passes (Feel Rubric in `LESSON_QUALITY_STANDARD.md`) — structural audit PASS alone never makes a lesson premium.
- **Calm contrast, never a full-dark learning wall** (DECISIONS #18/#23): light is the default for sustained explanation and task legibility; dark framing creates focus and emotional contrast only for high-level heroes, module thresholds, media stages, and brief immersive moments. Any reading, choosing, typing, table, or feedback inside that framing remains on a light task surface.

## Design language v0.1 — 2A “Scenes & Daylight”

Status: **owner-approved for the v0.1 build cycle on 2026-07-21.** Final approval source: `# 2A Product System Completion (6).zip`, SHA-256 `AFEEEC516489C4EB595C6777946957691988FD0AE3B2396445CFB32C89F535A1`. It retains the audited C1–C9 product system from `# 2A Product System Completion (2).zip` and adds the approved Triangle-A brand and marketing board. DECISIONS #20 records the product-board audit; #21 records the video/cast corrections; #23 records the light-first/presenter-led refinement; #25 records final design, logo, and marketing approval plus the delivery-boundary correction.

### Experience grammar

- **Daylight** — warm cream canvas for sustained learning: public explanation below the opening, navigation, Today, Course, module planning, lesson explanation, practice, mission/listening/checkpoint task surfaces, reading, review, results, recovery, readiness, forms, and profile.
- **Rooms** — deep-forest framing only for the public cinematic opening, other high-level page heroes when purposeful, First German Moment, module thresholds, media stages, and brief immersive scene context. A room may establish place or attention, but never becomes the sustained canvas for explanation, practice, assessment, tables, or feedback. Enter deliberately; return to daylight promptly.
- **Answer sheet** — warm paper is required for task content inside dark framing: reading, tables, choices, typing, controls, and feedback stay light and legible.
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

### Brand identity — Triangle-A

- **Selected mark:** option 4a, “Triangle AG.” The open triangle-A plus its gold trapezoid is the mark of record. The trapezoid is never removed; the mark is never rotated, skewed, arbitrarily recoloured, or combined with `A1`, a character, a flag, or another symbol.
- **Default system:** flat forest `#102018`, cream `#F5F0E8`, and gold `#D4A520`. `mark-triangle.svg` is the everyday mark; `tile-a.svg` is the app/social icon; `logo-primary-horizontal.svg` is the default wordmark lockup; stacked, descriptor, reversed, and one-colour lockups serve their named constrained contexts.
- **Usage hierarchy:** flat artwork is required in product UI, favicons/PWA icons, documents, and ordinary print. Gradient artwork is marketing-only. The restrained 3D extrusion is limited to reel covers and YouTube thumbnails. German-tricolour editions are celebration accents for Germany-topic/exam/result content and never replace the default app, header, favicon, watermark, or print mark.
- **Safety:** use the documented clear space and minimum sizes (mark 12px tall, tile 24px, horizontal lockup 120px wide, descriptor 200px wide). On photography, use a forest scrim of at least 40%. Never imply Goethe-Institut or other institutional affiliation.
- **Production authority:** the Stage 2 brand board plus the delivered `package/logo/`, `package/icons/`, `package/watermarks/`, `package/fonts.md`, and `package/manifest.md` in the approved ZIP are authoritative. Root-level legacy uploads/assets are evidence and source material, not blanket-approved production assets.

### Marketing system and copy law

- Approved claims may be used verbatim: “The Goethe A1 course for Malayalis.”; “56 dense owner-led lessons.”; “Video-led. App-supported.”; “Hear it. Say it. Repair it. Prove it.”; and “Build evidence that you’re A1 ready.” “Free pilot” is allowed only in an undated editable template whose seat count and dates are supplied by the owner at publish time.
- Marketing may be faster and louder than the learning product, but keeps the same scene/type/colour/flag/cast/German-accuracy laws: one idea per slide, short verbs, Source Serif 4 for German, Malayalam glosses when useful, and one calm dominant action.
- Hard bans: guaranteed-pass language; invented pass rates, testimonials, learner counts, review scores, prices, discounts, urgency, or hour totals; A2/B1 positioning; institutional affiliation or Goethe-Institut branding; legacy Kuttan/Frau Weber characters; fabricated owner/teacher portraits; “Kerala Style” positioning; or German-flag imagery outside the approved tricolour mark treatment.
- Approved masters cover reel cover/end card, feed/announcement, YouTube, Open Graph/share, carousel, free-pilot, educational/cheatsheet, and promo-video graphic families. The final board contains their designs and copy, but the delivered ZIP does **not** contain the separately editable `templates/`, `educational/`, and `promo/` SVG directories promised by its board manifest. Chunk `3p-04b` must reconstruct and validate those masters from the approved board before they are called delivered production files.

### Shared product primitives

The v0.1 build reuses these families instead of styling pages independently: `SceneFlag`, `DarkDoor`, `AnswerSheet`, `TerritoryProgress`, `Threshold`, `Seal`/`StatusChip`, `SkillBars`, `TaskProgress`, `GermanLine`, `NavHeader`/`TabBar`/`RoomBar`, `AudioButton`, `RepairCard`, `PlanList`, and the K1–K16 interaction kit in `LESSON_QUALITY_STANDARD.md`. Icons are one calm outlined family; emoji do not substitute for interface icons.

### Character and scene law

- **Fixed cast:** Nivin and Meera are equal recurring adult Malayali learners; Frau Fischer is the German teacher; existing `Appu.tsx` is the restrained, silent elephant mascot. The real learner may set an optional preferred name after the First German Moment, but that never renames the fixed cast and is never synthesized into pre-rendered audio.
- Nivin and Meera alternate scene ownership and speaking examples. Give each a distinct motivation and full learner arc; do not make Meera a female duplicate, romance device, or background assistant. Frau Fischer appears when the German teacher/classroom relationship is active. Appu may mark rare empty/completion/achievement moments, but never speaks, teaches, acts as a learner, delivers status/errors, or ornaments every CTA.
- An active dialogue may show its two participants. Outside an actual dialogue, use at most one relevant support character; never add a decorative third character or mascot stack.
- Scene masters are portrait/vertical assets with explicit focal position by breakpoint. Do not stretch one large image across desktop. Approved stills ship first; ambient loops are optional garnish and never block a page.
- Character assets require clean alpha edges on both cream and forest surfaces. White flood-fill fringes fail the calm-design law.

## THE REEL RULE (hard law)

> **Zero boring content. Anywhere. Ever.**

Every lesson, video, mission, and screen must pass a boredom scan before shipping: no padding, no repeated meta-lecture, no dead screens, no filler drills, no "stretch" content to hit a duration target. In a world of Instagram reels, one boring minute loses the learner — and the word-of-mouth. Precedent: the 2026-06-10 Module 1 quality gate cut 35% padding and the lessons got *better*. The Reel Rule outranks deadlines and duration promises.

Corollary: the video promise is **56 dense, zero-filler owner-led lessons**. At the current 15–18 minute target, the planning range is roughly 14–17 finished hours; do not advertise an hour total until the masters exist, and never inflate a lesson to hit one.

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
