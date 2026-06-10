# Adipoli German — Exercise ideas + app improvement backlog

Generated after the app-readiness production-floor fix on 2026-05-20.

## Exercise ideas to add next

### 1. Story-tied speaking cards
- Add one speaking card per lesson using the current `storyScene`.
- Format: Kuttan/Frau Weber prompt → learner says one complete A1 sentence → app shows model answer.
- Example: `Frau Weber asks for your appointment time. Say: Der Termin ist am Montag um zehn Uhr.`

### 2. Dictation mini-Hören
- Keep dictation short: 4–8 words for early modules, 8–12 words for exam modules.
- Use audioUrl-backed MP3s only; no fake “listen” prompt without audio.
- Best pattern: listen → type → show sentence chunks → replay.

### 3. Kerala-to-Goethe writing prompts
- Every lesson should end with one tiny free-text task.
- Prompts should be practical, not grammar trivia:
  - “Write your city.”
  - “Write one sentence about your family.”
  - “Write one polite request.”
  - “Write one exam-style message.”

### 4. Exam-mode transformations
- Convert recognition exercises into production variants:
  - MCQ: “Which sentence is correct?”
  - Follow-up: “Now type the full correct sentence.”
  - Speaking: “Now say it aloud.”

### 5. Role-play chains
- For Modules 14–18, build 3-turn oral role plays:
  - request → response → follow-up thanks/apology.
- Keep A1-safe. No long B1 dialogues.

### 6. Mistake-repair drills
- Show Kuttan’s broken sentence, learner repairs it.
- Example: `Ich gehen Bahnhof` → `Ich gehe zum Bahnhof.`
- Good for word order, verb position, articles, and politeness.

## App improvements

### Must-fix for learning quality
1. **Production practice UI**
   - Speaking exercises need record/replay or at least press-to-speak + self-check.
   - Free-text needs tolerant answer matching: punctuation/case/umlaut variants.
   - Dictation needs replay button and slow replay.

2. **Audio pipeline visibility**
   - App should warn if a dictation exercise has no `audioUrl`.
   - Add a dev-only `/content-health` page showing missing video/audio/richContent.

3. **Lesson completion model**
   - Completion should require at least one production task, not only MCQ completion.
   - Mark production tasks separately: speaking, writing, listening.

4. **Exam readiness dashboard**
   - Track Goethe skills separately:
     - Hören
     - Lesen
     - Schreiben
     - Sprechen
   - Show “A1 readiness” as skill coverage, not just XP.

5. **Story continuity checks**
   - Add automated canon scan in CI:
     - Kuttan not physically in Germany during A1 course.
     - Germany references must be future, mock, video call, imagination, or printed material.

### Nice-to-have
- Streaks based on production tasks, not passive taps.
- “Kuttan correction mode”: app explains why a learner answer is almost right.
- Shadowing mode for every speaking sentence.
- Module-end oral mock: 5 random speaking prompts from the module.
- Teacher/admin content dashboard: weak lessons, missing media, production coverage.

## Next safe fix lane

1. Improve weakest lesson `18-7`:
   - Add a short celebration recap video/richContent block.
   - Increase exercises to at least 6.
   - Add final oral A1 self-check.

2. Improve `17-6` and `18-6` mock tests:
   - Add vocabulary arrays or mark as exam-review lessons intentionally.
   - Add richer exam feedback sections.
   - Wire placeholder videoUrl or explicitly classify them as no-video exam simulations.

3. Reduce generic stems:
   - 360 generic stems remain.
   - Do this after production coverage because generic stems are lower risk than missing speaking/writing/listening.

## Current status after fix

- Production-floor gaps: fixed.
- Speaking coverage: fixed.
- Free-text coverage: fixed.
- Dictation coverage: fixed.
- Remaining quality gaps are now app/media/story-polish issues, not production-floor blockers.
