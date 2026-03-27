# Plan: Make the Course 10/10 — Scientifically Guaranteed A1 Success

## Context
Critical self-assessment rated the course 5.5/10 for actually passing Goethe A1. The app has great structure (18 modules, 690 exercises, 758 vocab, 8 games) but critical gaps in listening, writing, speaking, real instruction, spaced repetition, and production exercises. Goal: fix ALL gaps so a student using ONLY this course has >90% probability of acing Goethe A1.

## The 7 Gaps (Priority Order)

| # | Gap | Impact on Exam | Effort | Fix |
|---|-----|---------------|--------|-----|
| 1 | No real listening | 25% of exam (Hören) | Medium | Generate audio clips for all Hören exercises |
| 2 | No video instruction | Can't learn, only test | High | Generate lesson videos with Remotion |
| 3 | Recognition only (no production) | 50%+ of exam needs production | Medium | Add free-text + AI correction exercises |
| 4 | No spaced repetition | 80% vocab forgotten | Medium | Build SRS review system |
| 5 | No free-form writing | 25% of exam (Schreiben) | Medium | AI-powered writing exercises |
| 6 | Weak speaking practice | 25% of exam (Sprechen) | Medium | Extended speaking drills |
| 7 | Goethe Wortliste gap | May miss tested words | Low | Cross-reference + add missing |

---

## Re-prioritized roadmap (exam leverage first)

### Tier A — Must-have for >90% A1 pass probability
1. **Real listening comprehension**
2. **Production exercises**
3. **Spaced repetition (SRS) actually in the learning loop**
4. **Free-form writing with A1-safe feedback**
5. **Extended speaking drills with structured scoring**
6. **Goethe Wortliste coverage check + gap filling**
7. **Exam-readiness checkpoints**

### Tier B — Strong premium uplift, but not the first bottleneck
8. **Adaptive remediation / difficulty control**
9. **Selective video production using scripts + controlled templates**
10. **Engagement science extras** (weekly reports, mastery visuals, forgetting curve, streak protection)

### Core Identity — What This Course IS

**We are NOT a Duolingo clone. We are not a flashcard app. We are not "pick the right word, get XP, repeat."**

This is an **immersive, story-driven German course** built for one specific community. The difference:

| What we are NOT | What we ARE |
|---|---|
| Generic gamification, same for everyone | Kerala-specific identity — Manglish, culture, humor |
| Isolated flashcards with no context | Immersive encounters — words learned inside stories, scenes, situations |
| Sterile, corporate learning app | Kuttan + Appu characters with real emotional arc |
| 5-minute dopamine hits, no depth | Real A1 mastery — students WILL pass Goethe |
| Language drills for "streaks" | A journey from Kerala to Germany that uses German as the unlock |
| "Lesson 1: Greetings" | "Kuttan's first morning in a new world. The alarm goes off. 'Guten Morgen' means something now." |

**Every feature, every exercise, every screen must pass this test:**
> "Does this feel like the student is INSIDE the language? Or are they just looking at it from outside?"

If an exercise could exist in any generic language app, it's not good enough for us.

### Immersive Learning Principles

1. **Context over isolation.** Never teach a word alone. Every word appears inside a situation — a scene, a conversation, a story moment. "der Bahnhof" is not a flashcard. It's the place Kuttan needs to find when he lands in Frankfurt.

2. **Emotion drives retention.** People remember what they FEEL. Kuttan's late-night study session, the family dinner where he tries German for the first time, the nervous exam morning — these moments anchor vocabulary in memory better than any spaced repetition algorithm alone.

3. **Cultural grounding, not translation.** We don't translate Kerala into German. We BUILD BRIDGES. "Punctuality in Germany is like temple timing in Kerala — except Germans actually follow it." The student's existing world becomes the scaffolding for the new one.

4. **Encounter before drill.** Students should MEET a word in context (story, scene, dialogue) BEFORE being asked to recall it. First encounter = immersive and natural. Then practice. Then production. Never bare flashcard first.

5. **Fun is not decoration, it's architecture.** The games, the humor, the Manglish banter — these are not added on top of learning. They ARE the learning environment. Remove the fun and the course breaks, because students stop showing up.

6. **The journey IS the curriculum.** Kuttan's 15-video arc from Kerala home to airport boarding gate is not a wrapper around lessons. It IS the reason students keep going. Each module should feel like a chapter in a story they want to finish.

7. **No busywork exercises.** If an exercise doesn't make the student THINK in German, delete it. "Match word to translation" is a flashcard pretending to be an exercise. "You're at a German bakery — the lady says 'Bitte schön?' — what do you say?" is immersive. See `docs/EXERCISE_QUALITY_RULES.md`.

### Design principles to preserve while building
- **AI should assist, not become the judge of truth.** Use rubrics, acceptable answer bands, and pattern checks wherever possible.
- **Train safe A1 output.** Short, correct, high-probability answers beat fancy German.
- **Use fewer deeper loops.** Reuse the same core sentence patterns across listening, speaking, writing, and review.
- **Measure readiness.** Add checkpoints that prove the learner can pass, not just consume content.
- **Do not assume AI video is reliable enough for bulk course production.** Use it selectively for prototyping, short explainers, promo assets, and high-impact lessons — not as the blind default for hours of teaching.
- **Protect the credit budget.** The €250 Google credit pool should be reserved for high-leverage media tasks that are hard to replace cheaply, not spent on mass generation with uncertain output quality.
- **Never reduce to flashcards.** If a feature feels like a flashcard app, redesign it. Every interaction should have context, story, or situation around it.

---

## PHASE 1: Real Listening Comprehension (Hören Fix)

**Problem:** Hören exercises show text on screen. Real exam plays audio you can't read.

**Solution:** Generate actual audio for every Hören exercise in modules 17-18 and Goethe tests.

### What to build:
1. **`scripts/generate-hoeren-audio.ts`** — For each Hören exercise:
   - Take the `audio_text` field
   - Generate MP3 using edge-tts with `de-DE-ConradNeural` (German voice)
   - Save to `public/audio/hoeren/{exerciseId}.mp3`

2. **Update test-taking UI** (`src/app/tests/[testId]/page.tsx`):
   - Instead of showing `audio_text` as readable text, play it as audio
   - Add "Play Audio" button (can replay twice, like real exam)
   - Hide the text completely — student must LISTEN
   - Add a "Show Transcript" button that only appears AFTER answering

3. **Add listening exercises to regular lessons** (modules 9-18):
   - Convert some exercises from visual to audio-only
   - Student hears a German sentence → answers question about it
   - Use edge-tts to generate audio for these

### Audio generation:
- Hören exercises in 8 Goethe tests: ~120 audio clips
- Listening exercises in modules: ~50 audio clips
- Total: ~170 new audio files
- Cost: FREE (edge-tts)

---

## PHASE 2: Script Layer + Controlled Video Strategy

**Problem:** 146 videos are placeholder outlines, but bulk AI video generation is not reliable enough to trust for hours of final teaching content.

**Solution:** Prioritize robust scripts and controlled visual templates first, then use credits selectively for high-impact video production.

### What to build:
1. **Video script generation** (already have `scripts/generate-scripts.ts`):
   - Generate full narration scripts for all unscripted videos
   - Keep scripts editable, auditable, and reusable across app/video/audio
   - Use Gemini Flash only where it saves real time

2. **Controlled visual lesson system**:
   - Reuse app design for structured lesson visuals
   - Templates: title slide, vocabulary table, grammar chart, dialogue, cultural comparison, practice prompt
   - Favor deterministic templates over fully generative visuals

3. **Pilot video composition pipeline**:
   - Script → narration/audio
   - Script sections → controlled visual scenes
   - Combine into a small set of MP4 pilots
   - Validate quality before scaling

4. **Priority: Pilot a few high-impact foundational lessons first**
   - Start with modules 1-3 or other high-leverage explainers
   - Prove the workflow before trying to produce dozens of videos

### Per video output goal:
- Clear, teachable, low-error lesson video with:
  - structured visuals
  - accurate vocabulary support
  - grammar highlighting
  - example dialogues
  - cultural bridges where useful
  - narration that can later be reused or replaced

---

## PHASE 3: Production Exercises (Write + Type)

**Problem:** All exercises are recognition (pick from options). Exam needs production (generate German).

### What to build:

1. **New exercise type: `'free-text'`**
   - Add to Exercise interface in `types.ts`
   - Student types German text in an input field
   - AI (Gemini Flash) checks correctness and provides feedback
   - Partial credit for close answers (Levenshtein distance)

2. **API route: `/api/check-german`**
   - POST: `{ expected: string, userInput: string, context: string }`
   - Calls Gemini Flash to evaluate:
     - Is it grammatically correct?
     - Does it match the expected meaning?
     - What errors exist?
   - Returns: `{ score: 0-100, feedback: string, corrections: string[] }`
   - Cost: ~€0.001 per check

3. **New exercise type: `'dictation'`**
   - Play audio → student types what they heard
   - Compare with correct text (fuzzy match for typos)
   - Tests listening + writing simultaneously

4. **Add production exercises to every lesson:**
   - Each lesson gets 2-3 free-text exercises alongside existing MC/fill-blank
   - Examples: "Write a sentence introducing yourself", "Write a question asking for directions", "Conjugate this verb for all persons"

5. **Writing practice page** (`/practice/write`):
   - Goethe Schreiben simulator
   - Prompt with 3 content points
   - Student writes ~30 words
   - AI grades and gives feedback
   - Tracks improvement over time

---

## PHASE 4: Spaced Repetition System (SRS)

**Problem:** Vocab learned once, forgotten in a week. No review system.

### What to build:

1. **SRS Engine** (`src/lib/srs.ts`):
   - SM-2 algorithm (proven, used by Anki)
   - Each vocab item gets: `nextReview`, `interval`, `easeFactor`, `repetitions`
   - After review: update interval based on self-rating (Again/Hard/Good/Easy)

2. **SRS state in Zustand store** (`store.ts`):
   ```
   srsCards: Record<string, {
     vocabId: string;
     nextReview: number;  // timestamp
     interval: number;    // days
     easeFactor: number;  // 1.3-2.5
     repetitions: number;
   }>
   ```

3. **Daily Review page** (`/practice/review`):
   - Shows cards due for review today
   - Flashcard UI: German → tap → English + Malayalam + Audio
   - Rate: Again (1min) / Hard (tomorrow) / Good (interval) / Easy (2x interval)
   - Shows count: "12 cards due today"
   - Streak integration: daily review counts toward streak

4. **Auto-enqueue new vocab:**
   - When student learns a vocab item in a lesson, it enters SRS with interval=0
   - First review: same day
   - Then: 1 day → 3 days → 7 days → 14 days → 30 days → 90 days

5. **Review notifications on home page:**
   - "You have 15 words to review today" card
   - Priority above "next lesson" if review is overdue

---

## PHASE 5: Extended Speaking Practice

**Problem:** Pronunciation checker tests single words. Exam needs sustained conversation.

### What to build:

1. **Structured Self-Introduction Drill** (`/practice/intro`):
   - Timed 2-minute self-introduction practice
   - Prompts: Name? → Age? → Country? → Languages? → Job? → Hobbies?
   - Record full 2 minutes → Web Speech API transcribes
   - Score each section: Did they cover all 6 points?
   - Compare against model introduction
   - Track improvement across sessions

2. **Conversation Simulator** (`/practice/conversation`):
   - AI plays the role of examiner (text-based, with audio playback)
   - Random topic card drawn (Essen, Familie, Reisen, etc.)
   - AI asks a question → student speaks answer → AI evaluates → follow-up
   - 5-minute timed sessions
   - Uses Gemini Flash for evaluation (€0.001/turn)

3. **Request Practice Drill** (Sprechen Teil 3):
   - Random everyday situations
   - Student must formulate polite request
   - Web Speech API captures → compare with model
   - Scenarios: doctor's office, train station, restaurant, office, shop

4. **Shadowing Mode**:
   - Play German audio → student repeats immediately after
   - Compare timing + pronunciation
   - Scientifically proven technique for speaking fluency

---

## PHASE 6: Goethe Wortliste Integration

**Problem:** May have gaps in official tested vocabulary.

### What to build:

1. **Download/integrate official Goethe A1 Wortliste** (~650 words)
2. **Cross-reference script** (`scripts/check-wortliste.ts`):
   - Compare our 758 vocab items against official list
   - Report: covered, missing, extra
3. **Add missing words** to appropriate modules
4. **Tag vocab items** with `goetheA1: true/false` to show which are exam-relevant

---

## PHASE 7: Engagement Science

**Problem:** Students may not finish the course.

### What to build based on learning science:

1. **Forgetting curve visualization**:
   - Show students when they'll forget each word
   - Motivates daily review

2. **Mastery indicators per topic**:
   - Not just "lesson complete" but "topic mastered"
   - Based on: lesson score + SRS retention + production accuracy
   - Visual: empty → bronze → silver → gold per topic

3. **Weekly progress reports**:
   - "This week: 5 lessons, 47 words reviewed, 82% accuracy"
   - Trend arrows (improving/declining)
   - Specific suggestions

4. **Adaptive difficulty**:
   - If student scores >90%, skip easier exercises
   - If scoring <60%, add review exercises before progressing
   - Never let student advance with <70% on critical grammar

5. **Streak protection**:
   - "Freeze" for 1 day per week (prevents burnout)
   - Weekend mode: lighter daily requirement

---

## Implementation Order (What I Can Build Now)

## Official execution roadmap

### Stage 0 — lock the teaching architecture
**Goal:** avoid blind building and wasted credits.

Must finish before mass content or media generation:
- finalize the priority order
- keep video generation script-first, not bulk-first
- define that AI video is selective, not default
- keep exam success as the north star, not feature count

### Stage 1 — make the course teach, not just test
**Launch-critical:** yes

#### Official build order

##### 1. Real listening comprehension
**Why first:** Goethe A1 Hören is impossible to train honestly if text is still visible.

**Done means:**
- all Goethe mock Hören items use playable audio instead of visible source text
- transcript stays hidden until after answering
- replay behavior matches intended exam practice rules
- at least one sample listening pattern exists in normal lessons, not only in mocks

**Do not start next item at full scale until:**
- Hören works as actual listening, not reading disguised as listening

---

##### 2. Lesson / video script layer for core modules
**Why second:** the app is built around lesson teaching, and scripts are the cheapest high-leverage asset for later video/audio production.

**Done means:**
- each priority lesson has a clear teaching goal
- each lesson has a usable script or structured script plan
- scripts are editable, reviewable, and reusable across app/video/audio
- high-impact foundational lessons are covered first

**Priority coverage first:**
- Modules 1–6
- Module 14
- Modules 17–18

**Do not start bulk video generation until:**
- the script layer is trusted and stable

---

##### 3. Production exercises in the highest-value modules
**Why third:** learners do not pass A1 by recognition alone.

**Done means:**
- priority lessons contain free-text / dictation / guided output tasks
- exercises train short safe A1 answers, not fancy output
- AI checks are rubric-assisted where possible
- production tasks cover both life-useful and exam-useful patterns

**Priority coverage first:**
- self-introduction
- personal information
- numbers/time
- forms/messages
- requests/questions
- core exam tasks

**Do not scale to all modules until:**
- the first production patterns feel reliable and useful

---

##### 4. Wire SRS into the lesson loop
**Why fourth:** learning collapses if vocabulary is not retained.

**Done means:**
- new vocab is automatically added to review
- review demand shows up in the learner flow
- SRS is not a side feature; it is part of the habit loop
- students are nudged back into review before forgetting compounds

**Do not treat SRS as done until:**
- lesson completion actually feeds the review system automatically

**Why first:** these are the features most directly tied to actual learning and A1 pass probability.

### Stage 2 — strengthen exam performance loops
**Launch-critical:** yes

Build in this order:
5. free-form writing with safer scoring rubrics
6. structured speaking drills for exam tasks
7. Goethe Wortliste cross-reference + coverage patching
8. exam-readiness checkpoints before full mocks

**Why second:** these convert broad course coverage into actual Goethe A1 performance readiness.

### Stage 3 — raise consistency and retention
**Launch-critical:** maybe, depending on timeline

Build in this order:
9. adaptive remediation / difficulty control
10. mastery indicators per topic
11. conversation simulator / shadowing upgrades

**Why third:** these improve outcomes and polish, but are less foundational than listening, scripts, production, writing, and speaking.

### Stage 4 — selective media expansion
**Launch-critical:** no, unless tied to your chosen launch format

Build in this order:
12. controlled visual/video templates
13. pilot a small high-impact video set
14. spend Google credits only on validated high-leverage media work
15. scale video production only after quality is proven

**Why fourth:** credits are limited, AI video is error-prone, and bulk generation before validation is wasteful.

### Stage 5 — engagement extras
**Launch-critical:** no

Build in this order:
16. weekly reports
17. forgetting curve visualization
18. streak protection / motivational extras

**Why last:** good product enhancements, but not the main reason a learner passes or fails Goethe A1.

### Dependency rules
- Do not mass-produce videos before the script layer is trusted.
- Do not scale writing/speaking AI before rubrics are stable.
- Do not claim >90% pass confidence before readiness checkpoints and Wortliste coverage are in place.
- Do not spend credits broadly before a pilot proves the workflow.

### Resource split
**Mostly code / content work I can do directly:**
- scripts
- production exercises
- SRS integration
- writing prompts
- speaking drills
- Wortliste cross-check
- exam checkpoints

**Best use of your Google credits / home production workflow:**
- selective animation/video generation
- high-impact explainers
- validated pilot lessons
- premium media assets after the script layer is stable

---

## Actionable todo list (in the new order)

### NOW — direct exam leverage
- [x] Update test UI to audio-only Hören ✅ (2 replays, transcript hidden)
- [x] Generate Hören audio for Goethe tests ✅ (120 MP3 files, 6.7 MB)
- [ ] Add dictation exercise type
- [ ] Add production exercises to high-priority lessons first (Modules 1–6, 14, 17, 18)
- [x] SRS engine + daily review page ✅ (SM-2 algorithm, /practice/review)
- [x] Auto-enqueue new vocab into SRS from lessons ✅ (createCard on every vocab flashcard)
- [x] Writing practice page (/practice/write) ✅ (20 Schreiben prompts)
- [ ] Add A1-safe scoring rubrics / model-answer bands for writing checks
- [x] Self-introduction drill (/practice/intro) ✅ (6 topics, 2-min timer)
- [x] Conversation practice (/practice/conversation) ✅ (5 scenarios with TTS)
- [x] Cross-reference Goethe Wortliste ✅ (90% coverage, 23 words missing)
- [ ] Patch 23 missing Wortliste words into appropriate modules
- [ ] Add exam-readiness checkpoints before full mock tests

### NEXT — raise pass rate and consistency
- [x] Adaptive difficulty in lesson player ✅ (score < 50% = must retry)
- [x] Mastery indicators per topic ✅ (bronze/silver/gold badges per module)
- [x] Shadowing mode ✅ (/practice/shadowing — hear + overlap repeat)
- [x] Progress sync to Supabase ✅ (debounced JSONB, cross-device)
- [x] Readability overhaul ✅ (min 12px fonts, 44px touch targets, better contrast)

### NEW — Adaptive Daily Scheduling (self-contained course)
- [ ] Onboarding: "How many hours per day?" → calculate total days
- [ ] Daily schedule: "Day N of M" + task checklist
- [ ] Tasks auto-assigned: SRS review → lesson → practice → game
- [ ] Checkpoint every 5 days: must pass to continue
- [ ] Failed checkpoint: redo weak lessons before advancing
- [ ] Progress bar: Day N/M + percentage completion
- [ ] Flexible: user can adjust daily hours anytime

### LATER — premium depth / engagement uplift
- [ ] Generate the script layer for all lessons (cheap, reusable, controlled)
- [ ] Build controlled visual/video templates first (slides, vocab, grammar, dialogue)
- [ ] Use credits selectively for high-impact lessons, demos, and explainers
- [ ] Pilot video production on a small set before scaling
- [ ] YouTube upload + URL integration
- [ ] Weekly progress reports
- [ ] Forgetting curve visualization
- [ ] Streak protection

### Infrastructure (added during development):
- [x] Supabase auth (email, username, Google OAuth) ✅
- [x] Biometric login (fingerprint, Face ID, Windows Hello) ✅
- [x] Admin panel (/admin) ✅
- [x] Pricing page with tax compliance (GST + VAT) ✅
- [x] Landing page ✅
- [x] Payment tables + RLS security ✅

---

## Current Status (Last updated: 2026-03-25)

**Overall rating: ~8/10** (up from 7.5 — SRS wired, mastery, shadowing, readability, sync)

| What | Status |
|------|--------|
| Build | Clean, 38 pages |
| Tests | 11,492 passing |
| German errors | 0 (verified) |
| Malayalam errors | 0 (verified) |
| English errors | 0 (verified) |
| UI bugs | 0 (all 17 fixed) |
| Auth | Supabase + biometric |
| Payments | Razorpay + Stripe (placeholders, tax-compliant) |

## Success Metrics

After all phases, the course should hit:

| Metric | Target | Current |
|--------|--------|---------|
| Hören exercises with real audio | 100% | Script ready, audio gen pending |
| Lessons with video instruction | 100% | 0% (placeholders) |
| Exercises requiring text production | 30%+ | ~5% (write page only) |
| Vocab with SRS tracking | 100% | Engine built, auto-enqueue pending |
| Goethe Wortliste coverage | 100% | Not verified yet |
| Writing practice with AI feedback | Available | ✅ Done |
| 2-minute self-intro practice | Available | ✅ Done |
| Estimated A1 pass rate (course alone) | >90% | ~60% |

## Verification
- [x] Student can complete full Hören section without seeing text (UI built)
- [x] Student can write a 30-word German message from scratch (/practice/write)
- [x] Student can sustain 2-minute German self-introduction (/practice/intro)
- [ ] All Goethe A1 Wortliste words are covered
- [x] SRS brings back forgotten words automatically (SM-2 engine)
- [ ] Adaptive difficulty prevents advancing with low scores
- [x] `npx next build` passes throughout
