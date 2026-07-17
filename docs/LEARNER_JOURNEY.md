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

Milestones: mini-mock after M4 · half-mock after M6 · full mock after M7
Final phase (M8): 2–3 timed full mocks + speaking simulator + final 7-day plan
  (day 7→1: one skill per day, weakest first, 20-min sessions)
Readiness checklist green → "Book your exam" screen
  (Goethe-Institut / Max Mueller Bhavan info for Kerala + Germany centres)
```

## Learner intents — guided forward, open backward (DECISIONS #15)

The journey above is the default path, not a rail. Real learners go back and sideways; every realistic intent below gets a **designed flow** (entry point → screens → exit back to Today). A journey that is blocked is a bug; a journey reachable only by accident is also a bug.

| # | Intent | Designed flow |
|---|---|---|
| 1 | Continue today (default) | Today's active card → block → back to Today. Always the primary, most prominent action. |
| 2 | Redo a lesson/mission | Module page or lesson history → replay in practice mode. **Progress is never reset or downgraded by a redo.** |
| 3 | Rewatch a video | Module page lists completed videos → direct play → back. |
| 4 | Review a module's vocab/phrases | Module page → per-module review sheet + SRS deck filtered to that module. |
| 5 | Retake a checkpoint/mock | Result page → practice retake; stored as a practice attempt, separate from the gating attempt record. |
| 6 | Practice a weak skill on purpose | Readiness bars → tap a skill → its prescription tasks, self-serve — not only when prescribed. |
| 7 | Peek ahead | Course path shows locked modules read-only (outcome + lesson titles); gates still gate, curiosity isn't punished. |
| 8 | Return after days away | Welcome-back screen → 5-min refresher (due SRS + last lesson's chunks) → resume the path. |

Onboarding is part of the first-visit flow — intro → first mission → onboarding (pace/goal/exam date) → Today. The built `/onboarding` page is currently orphaned and gets wired in (Sprint 6a).

**Route disposition rule:** every route is classified `ON-PATH` (in the journey) · `REVISIT` (reachable from module pages/history per the intents) · `PRESCRIBED` (recovery/booster targets only) · `HIDDEN`. The full table is committed with Sprint 6a. Flexibility is by design, never by leftover routes.

## 2A route, mode, and responsive contract

### Public boundary

- `/` is the canonical public homepage for a genuine new visitor. It must render the promise, who the course is for, how it works, curriculum preview, honest proof if any exists, and one primary CTA. A cold visitor must not be redirected straight into Today or a course dashboard.
- The CTA opens the **First German Moment** in one action. `/intro` may remain its route-backed implementation so browser Back, focus return, deep-linking, and mobile full-screen behavior remain reliable; visually it is a dark room opened from the public page, not a second landing page.
- The First German Moment uses an existing native mission audio asset after its exact line/transcript is validated. It ends in a real hear → say → repair → win, then hands off to the minimal onboarding and Today. Missing owner video does not block this path.
- v0.1 uses the homepage anchor `/#curriculum`; a separate `/curriculum` route is deferred until the real content cannot remain clear on the homepage. The stale `/landing` page is hidden or redirected rather than maintained as a competing public entry.
- Returning learners get a quiet Log in entry. Authentication screens stay provider-agnostic; choosing or changing an auth provider is outside this design chunk.

### Surface map

| Surface | Default mode | Required transition |
|---|---|---|
| Public homepage | dark cinematic opening → daylight explanation | First Moment opens a room; closing/back returns to the triggering control |
| Today / Course / module planning | daylight | a dark threshold introduces the next lived scene without turning the whole dashboard dark |
| Video lesson | daylight frame with a dark media stage | practice handoff stays visible and deterministic |
| Mission / listening / checkpoint task | room + answer sheet where needed | completion/result returns to daylight |
| Results / recovery / readiness / Practice / Me | daylight | retest may re-enter the relevant room |

### Responsive and accessibility evidence

The board’s 1440px and 390px screens plus written 320/768/1024 rules are sufficient for **design-contract approval**; extra drawn frames do not block `3p-04`. They are not sufficient to claim an implemented page responsive. Every implementation chunk must test the real page at 320, 390, 768, 1024, and 1440px, keyboard-only navigation, visible focus, reduced motion, and 200% zoom before it is done. Text and target floors in `PRODUCT_VISION.md` override smaller illustrative labels on the board.

Mobile behavior is not desktop scaled down: public opening becomes full-height, rails become sheets/accordions, the bottom tab bar remains reachable, the active task stays ahead of secondary progress, and image focal position is set per breakpoint. No horizontal scroll is allowed at 320px.

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
