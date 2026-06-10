# LANGUAGE_STRATEGY.md — Malayalam / English / German Balance

Status: **Source of truth.** Established 2026-06-11.

## The layers

| Layer | Language | Rule |
|---|---|---|
| UI chrome, labels, buttons, stats | **Plain English** | "Lessons completed", "Continue", "Words". Forced Malayalam in UI chrome was explicitly rejected by the owner — it feels awkward. |
| Teaching voice (video narration, Kuttan speech) | **Natural Manglish** | Like an older cousin teaching: "Machane! Time-depending choice, Sie vs du — polayaanu, but try cheyyaam!" Warm, never forced, never machine-written. |
| Grammar explanations | **Manglish + Malayalam parallels** | Use Malayalam when German differs from English but matches Malayalam — that's the unfair advantage. |
| Target content (what the learner hears/says/reads/writes) | **German, ramping up** | Real pre-rendered native audio. Never SpeechSynthesis. |

## The Malayalam bridge (use deliberately, here)

- **Word order**: "Njan food kazhichu" (I food ate) = exactly `Ich habe gegessen` structure — Perfekt verb-final feels native to Malayalam speakers.
- **Formality registers**: Malayalam's built-in respect levels map to du/Sie far better than English does.
- **Sounds**: map German sounds to Malayalam phonemes where true (tsch = ച്ച as in the corrected Tschüss cue); teach mouth mechanics where Malayalam has no equivalent (ö, ü) — never English approximations.
- **Politeness culture**: bitte/danke/Entschuldigung framing via Kerala courtesy norms.

## German exposure ramp

| Stage | German share of audio/content | Instructions |
|---|---|---|
| M1 | ~30% — every lesson opens with heard German | English/Manglish |
| M2–M4 | 40–60% — dialogues, numbers, prices | Manglish, German task words introduced ("Hör zu", "Sprich nach") |
| M5–M7 | 60–80% — announcements, forms, notices | Simple German instructions with icon support, Manglish fallback |
| M8 | 80%+ — exam conditions | German (exam-realistic) |

## Anti-dependence rules (no translation crutch)

1. **Hear before read; attempt before translate.** Translation appears after the learner's attempt, not before.
2. **Crutch removal**: a chunk introduced with Malayalam support in module N must appear without it by module N+1 recall.
3. **Production-first**: recall and production (say/write) are what complete a lesson — recognition never suffices.
4. Kuttan may react in Manglish, but **model answers are always pure German**.
5. Mock exams and checkpoints are German-only environments (instructions mirror the real Goethe paper).

## Teaching without a live teacher

- **Model → pause → attempt → model again**: every speaking drill uses the `[PAUSE 3s]` pattern with pre-rendered native audio.
- **Self-comparison**: learner hears the model right after their own attempt.
- **Speech evaluation**: Web Speech transcript + Gemini scoring (capped, sparingly — see `TECH_ARCHITECTURE.md` AI budget) as enhancement, never gatekeeper.
- **Mistake repair as the teacher's red pen**: every lesson teaches through at least one likely Malayali mistake.
- **Checkpoints replace teacher judgment**: closed-book diagnostics + rubrics + exact recovery (see `EXAM_PREP_DESIGN.md`).
