# LESSON_QUALITY_STANDARD.md — What a Premium Lesson Is

Status: **Source of truth.** Established 2026-06-11. Merges `EXERCISE_QUALITY_RULES.md` and the lesson-level parts of `PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md` (both archived; route/product gates live in `QA_AND_EVALUATION_HARNESS.md`).

## The premium lesson template

Every spine lesson (video + practice block) must contain:

1. **Learner outcome** — one named ability: "You can now order a coffee and ask the price."
2. **Why this matters** — one line tying it to Goethe A1 and/or life in Germany.
3. **Scene hook** — a real situation (Kerala/Goethe Kochi canon), entered in ≤12 words.
4. **Input** — 3–7 useful German chunks, heard before read.
5. **Manglish explanation** — short, natural; Malayalam parallel where it genuinely helps (see `LANGUAGE_STRATEGY.md`).
6. **Pronunciation help** — audio model + mouth mechanics for Malayali-specific sounds (ch/sch/w/v/ö/ü); never English phonetic spellings ("Shurn" teaches nothing).
7. **Common Malayali mistake + repair** — at least one likely error taught through fixing it (`Ich bin komme` → `Ich komme`; English letter names while spelling; du/Sie confusion; verb position).
8. **Controlled practice** — guided recognition with instructive distractors.
9. **Production drills** — speaking aloud always; dictation/listening always; short writing when exam-relevant.
10. **Exam connection** — which Goethe task this feeds, stated plainly.
11. **Revision card** — the chunks + rule, exported to SRS.
12. **Self-check (mini-check)** — closed-book, 5–8 tasks, ≥1 production, emits weakness tags.
13. **Next step** — explicit pull to the next block.

## Exercise rules

**Never create:** match-word-to-phonetic-text · bare German↔English matching lists (flashcards in disguise) · any exercise that would work identically in a Spanish course.

**Every exercise must:** force a decision that requires understanding · be grounded in a real situation · teach a rule or pattern · have plausible, instructive distractors · build toward production.

**Story tie-in:** question stems reference the lesson's scene or a canon character. Bad: "How do you say 'beautiful'?" Good: "At Goethe Kochi, Frau Weber points at a poster: 'schön!' What does she mean?" (Retrofit = rewrite the stem only; never change verified answers.)

**Per-lesson distribution (for ~8 exercises):** multiple-choice ≤2 · fill-blank ≤1 · matching/ordering ≤1 · **speaking ≥2** · **free-text/type-answer ≥1** · **dictation/listening ≥1**. **Hard floor: ≥3 production exercises per lesson.** Below the floor = below launch grade.

**Exam-drill profile (modules 17/18 only, DECISIONS #14):** lessons that simulate Goethe Hören/Lesen sections are exempt from the MC/fill-blank/matching caps — the real exam IS multiple-choice, and gutting the drills would make them less exam-like. Everything else still applies in full: speaking ≥2, mistake-repair, dictation, free-text, scene-grounded stems, no bare matching.

**The groan test:** "Would a student groan and skip this, or actually think?" If they'd groan, delete it.

## 2A interaction-surface contract

The completion board’s K1–K16 kit is the shared visual/behavioral vocabulary for learner work. It is not permission to turn every lesson into the same generic card stack.

| Family | Required task patterns |
|---|---|
| Listen / notice | play and identify, replay a meaningful chunk, hear a contrast, audio-to-detail or audio-to-form |
| Speak / respond | model → learner turn, reply aloud, phrase build, pronunciation contrast, request/question production |
| Read / decide | notice/sign/ad/menu comprehension, order or sort when the order carries meaning, choose with evidence |
| Write / transfer | fill a real field, type a phrase or message, repair a weak answer, check required content points |
| Diagnose / recover | closed checkpoint item, tagged result, exact repair card, weak-tag retest |

Every task component specifies the states that apply: ready, focused, playing/paused/ended, attempted, correct, needs-repair, retry, disabled-with-reason, loading, unavailable-with-alternative, offline, and saved. Do not encode a state through colour alone. A disabled primary action explains what is missing; an unavailable recording/evaluation path exposes the approved €0 fallback.

Interaction hierarchy is consistent across lesson, mission, checkpoint, and recovery: scene/context first, exact learner action second, feedback third, next action last. Correct feedback confirms without delaying the learner; wrong feedback stays to at most two short lines, names the exact issue, and provides one useful repair before retry. A checkpoint never reveals teaching content before submission.

Use a dark room for hearing, responding, and closed focus; use an answer sheet for reading, typing, choices, and inspectable feedback. German lines are typographically primary. Manglish/Malayalam supports the action but does not become a paragraph wall. The mobile floors, focus law, and reduced-motion behavior in `PRODUCT_VISION.md` are part of lesson quality, not optional polish.

## Video lesson standard

- Honest length: the runtime the material needs after a boredom scan — never stretched to a target (Reel Rule).
- Structure: hook → chunks with practice pauses → mistake repair → win → next app task.
- Recording spec per script: `[PAUSE 3s]` model→silence→model pattern; owner speaks Manglish, **all reviewable German is pre-rendered native audio**; staging notes (Frau Weber via video-call frame / Goethe Kochi desk).
- Reference pack: `course-production/a1-mvp/module-01/` (all 7 scripts passed the gate on 2026-06-10).

## Bad / acceptable / premium

| Grade | Looks like |
|---|---|
| **Bad (AI-slop)** | Generic explanations that fit any language app · padding and meta-lecture · no production · no Malayali-specific mistakes · exam-irrelevant · empty `explanation` fields · English phonetics for German sounds |
| **Acceptable** | Correct German · A1-fit · ≥3 production exercises · clear next step · scene tie-in present |
| **Premium** | Acceptable + emotionally engaging scene · Malayalam bridge where it helps memory · repair step for a real Malayali mistake · explicit exam connection · zero boring moments · learner would show it to a cousin |

## The Feel Rubric (anti-flatness bar — DECISIONS #15)

The automated audit (`audit:spine`) is the **floor**; this rubric is the **bar**. A lesson can pass every structural check and still fail here — that gap is exactly what the 2026-07-12 owner review found. Grade every spine lesson **FLAT / OK / ADIPOLI** by actually playing it (390px, audio on), never by inspecting the data:

- **Momentum** — something changes every ~45 seconds: a scene turn, new stakes, a reveal, a register shift. Exercise → exercise → exercise with no arc = FLAT.
- **Scene continuity** — one continuous situation with a payoff, not disconnected items sharing a backdrop. `table`/`note` blocks are furniture, not scenes; the M1 first-mission hear→say→repair arc is the model to converge on.
- **Voice** — Kuttan/teaching lines a 22-year-old would screenshot and send to a cousin. Canned praise ("Great job! Keep going! 🎉") = FLAT.
- **Production rhythm** — the learner speaks or writes before minute 2, and at least every ~3 exercises after.
- **Calm** (owner law 2026-07-13, DECISIONS #17) — less distracting, more clean: one focal point per screen/scene, few simultaneous moving elements, motion only when the motion *is* the teaching, generous whitespace, restrained color count, less text. Applies equally to app screens and video graphics. Busy ≠ engaging; a cluttered screen is a Calm FAIL even if every element is individually good.

FLAT = sev-1 (Reel Rule). Grades are recorded per lesson in `scripts/output/spine-premium-audit.json` (`feel` field) and are assigned only by playthrough — a feel grade without playthrough evidence is hallucinated.

## How to review a lesson (use in QA Mode)

1. Run automated checks (`QA_AND_EVALUATION_HARNESS.md`): schema, answers, audio links, production floor, empty explanations.
2. **Boredom scan + feel grade**: scrub the lesson/video at 1.5×; any stretch you would skip = FAIL, cut or enrich it. Then play it properly and assign FLAT/OK/ADIPOLI per the Feel Rubric above.
3. German correctness spot-check (the M1 gate caught a real error — Tschüss taught with the wrong ch-sound — so this matters).
4. Manglish naturalness read-aloud test: does it sound like an older cousin or a machine?
5. Template completeness: all 13 elements above present.
6. Verdict per lesson: PASS / WEAK (named fixes) / FAIL — with evidence, never vibes.
