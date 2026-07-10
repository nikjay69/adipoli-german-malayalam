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

## How to review a lesson (use in QA Mode)

1. Run automated checks (`QA_AND_EVALUATION_HARNESS.md`): schema, answers, audio links, production floor, empty explanations.
2. **Boredom scan**: scrub the lesson/video at 1.5×; any stretch you would skip = FAIL, cut or enrich it.
3. German correctness spot-check (the M1 gate caught a real error — Tschüss taught with the wrong ch-sound — so this matters).
4. Manglish naturalness read-aloud test: does it sound like an older cousin or a machine?
5. Template completeness: all 13 elements above present.
6. Verdict per lesson: PASS / WEAK (named fixes) / FAIL — with evidence, never vibes.
