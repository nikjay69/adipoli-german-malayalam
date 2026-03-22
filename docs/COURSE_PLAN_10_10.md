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

## PHASE 2: Actual Video Lessons (Remotion)

**Problem:** 146 videos are placeholder outlines. No actual teaching.

**Solution:** Generate animated lesson videos using Remotion (React-based video renderer).

### What to build:
1. **Remotion video project** (`video/` directory):
   - Install Remotion
   - Create video templates that reuse the app's design system
   - Templates: Title slide, Vocabulary table, Grammar chart, Dialogue, Cultural comparison, Practice prompt

2. **Video script generation** (already have `scripts/generate-scripts.ts`):
   - Generate full narration scripts for all 140 unscripted videos
   - Use Gemini Flash (costs ~€1)

3. **Video composition pipeline**:
   - Script → edge-tts audio (Manglish narration + German pronunciation)
   - Script sections → Remotion slides (animated React components)
   - Combine into MP4
   - Upload to YouTube as unlisted

4. **Priority: Generate videos for modules 1-6 first** (foundations):
   - ~50 videos covering basics
   - Students need these before exercises make sense

### Per video output:
- 8-12 minute MP4 with:
  - Animated title/section slides
  - Vocabulary tables with pronunciation
  - Grammar charts with highlighting
  - Example dialogues
  - Cultural parallels
  - Narrated in Manglish with German audio segments

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

### Batch 1 (Buildable immediately — code changes):
- [ ] SRS engine + daily review page
- [ ] Free-text exercise type + AI correction API
- [ ] Dictation exercise type
- [ ] Writing practice page (/practice/write)
- [ ] Self-introduction drill (/practice/intro)
- [ ] Goethe Wortliste cross-reference
- [ ] Mastery indicators
- [ ] Adaptive difficulty in lesson player

### Batch 2 (Needs script generation — uses Gemini):
- [ ] Generate Hören audio clips (edge-tts, free)
- [ ] Update test UI to audio-only Hören
- [ ] Generate 140 video scripts (Gemini Flash, ~€1)
- [ ] Add production exercises to all 18 modules

### Batch 3 (Needs Remotion setup):
- [ ] Remotion video project setup
- [ ] Video templates (title, vocab, grammar, dialogue)
- [ ] Generate module 1-6 videos first
- [ ] YouTube upload + URL integration

### Batch 4 (Polish):
- [ ] Conversation simulator with AI
- [ ] Shadowing mode
- [ ] Weekly progress reports
- [ ] Forgetting curve visualization
- [ ] Streak protection

---

## Success Metrics

After all phases, the course should hit:

| Metric | Target |
|--------|--------|
| Hören exercises with real audio | 100% |
| Lessons with video instruction | 100% (at minimum AI-generated) |
| Exercises requiring text production | 30%+ of total |
| Vocab with SRS tracking | 100% |
| Goethe Wortliste coverage | 100% |
| Writing practice with AI feedback | Available |
| 2-minute self-intro practice | Available |
| Estimated A1 pass rate (course alone) | >90% |

## Verification
- Student can complete full Hören section without seeing text
- Student can write a 30-word German message from scratch
- Student can sustain 2-minute German self-introduction
- All Goethe A1 Wortliste words are covered
- SRS brings back forgotten words automatically
- Adaptive difficulty prevents advancing with low scores
- `npx next build` passes throughout
