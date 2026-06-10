# LEARNER_JOURNEY.md — First Visit to Exam Day

Status: **Source of truth.** Established 2026-06-11. Supersedes `A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` (archived).

The learner must always be able to answer: **what do I do today · why it matters · what should I revise · am I improving · am I ready for A1.**

## The journey

```
First visit  → `/` promise screen (5s): "Adipoli German · A1 — German for
               Malayalis. Goethe A1 with Kerala context." + tiny scene preview
               (Frau Weber: "Guten Morgen." / You: ___) + ONE CTA: Start listening
  → First win BEFORE setup: first mission (hear → say reply aloud → one repair
    → win: "You can greet a German teacher.") — inside 90 seconds
  → Light onboarding (only what changes the path):
      daily pace (5/15/30 min) · goal (Pass A1 / Prepare for Germany / family)
      · exam date (none / <3 months / <6 months)
  → 2-min self-check: "new to German" vs "know some" → start M1 or placement M2/M3

Daily loop — the "Today" screen is the only home:
  1. Next required block (video lesson or mission, 10–25 min)
  2. 5-min SRS review (due cards)
  3. Optional: one prescribed recovery/booster task
  Always visible: module progress + 4 skill-readiness bars (Hören/Lesen/Schreiben/Sprechen)

Module end → closed diagnostic (20–35 min)
  → pass: celebration + pull to next module
  → weak: recovery card → 1–3 exact tasks → retest weak tag only → unlock

Milestones: mini-mock after M2 · half-mock after M4 · full mock after M6
Final phase (M8): 2–3 timed full mocks + speaking simulator + final 7-day plan
  (day 7→1: one skill per day, weakest first, 20-min sessions)
Readiness checklist green → "Book your exam" screen
  (Goethe-Institut / Max Mueller Bhavan info for Kerala + Germany centres)
```

## MVP pages

| Page | Job | Success condition |
|---|---|---|
| `/` | Promise + first German action | Cold user understands the offer and taps Start listening |
| First mission | Immediate hear/speak/repair win | User says one correct A1 line aloud |
| Post-win onboarding | Pace/goal/exam-date, minimal friction | User gets a prescribed next block |
| Today (`/learn`) | Command center | ONE active card, one CTA; old maps hidden behind disclosure |
| Module page | Current module path | Current lesson + checkpoint visible; future locked/collapsed |
| Video lesson page | Teach one outcome | User watches and knows the next practice |
| Practice steps | Input → output | User speaks/writes/repairs, not just clicks |
| Mini-check | Confirm recall | Pass/weak feedback + tags |
| Module checkpoint | Diagnose readiness | Skill-tagged result |
| Recovery card | Exact remediation | Weakness in plain words · why it matters · 1–3 tasks with time estimates · retest CTA |
| Score-booster card | Optional stronger marks | ONE curated resource/task with expected output |
| Mock exam / final mock | Goethe proof | Per-section readiness shown |
| Readiness dashboard | Am I ready? | 4 skill bars + checkpoint history + checklist |

**Later pages** (hidden from the first path): games hub (recovery-scoped only) · vocabulary library · global search · profile/streaks · pricing (free pilot) · AI chat · admin.

## Low-text UX doctrine (maximums, cut harder when possible)

- **One screen, one job, one primary action** — visible without scrolling, thumb-zone friendly, works at 390px width.
- `/`: headline ≤5 words · promise ≤12 words · scene preview ≤2 dialogue lines · ≤45 words above the fold · one CTA.
- Mission: one situation line ≤12 words · one German line at a time · subtitles allowed, paragraph explanations banned · human labels only (`Frau Weber`, `You`, `Examiner`) — never internal labels (`GREETING SET`, `0 of N`, IDs).
- Video page: outcome-based title ≤9 words · pre-video context ≤20 words · one "after watching" task · transcript collapsed on phone.
- Practice: instruction ≤10 words · one prompt, one action · typing targets <80 chars unless exam-writing · feedback ≤2 lines · no celebration that delays the next action.
- Checkpoint: start instruction ≤35 words incl. closed-book rule (no Google/YouTube/ChatGPT/notes/dictionary) · never teach during the checkpoint · result page prescribes exact next work.
- Recovery: weakness ≤7 words · explanation ≤12 words · ≤3 tasks · each task has action + time estimate · one retest CTA. Banned copy: "Revise Module 3", "Practice more listening". Good copy: "Replay Numbers 0–100 video, 8m. Do 10 phone-number dictations. Retest: catch 5 appointment times."
- Audio: real pre-rendered German with visible duration/progress; next action unlocks after required audio ends; **never** browser SpeechSynthesis for reviewable German.
- Avoid mandatory long typing on mobile; prefer speak-aloud, shadowing, tap-to-repair; writing only when exam-relevant.

## Customer quality gate (apply before calling any flow ready)

**PASS** = a Malayali adult beginner can answer unaided: What is this promising me? What do I tap now? What German did I hear/say in the first minute? How does this move me toward A1? What happens if I'm weak? What's next today? — with evidence: phone-width screenshot, working CTA, no console errors, audio plays, text within budget.

**WEAK** = right CTA but reads like a dashboard · hears German but produces nothing · video detached from practice · score without exact recovery → cut text, hide secondary systems, reconnect video→practice→check→recovery.

**FAIL** = cold user can browse without hearing/saying German · Page 1 is a feature pitch · learner must choose among many resources · open-book or non-diagnostic checkpoints · recovery says "revise more" · SpeechSynthesis German · long typing before confidence · childish Kuttan → rebuild the page around one customer action.
