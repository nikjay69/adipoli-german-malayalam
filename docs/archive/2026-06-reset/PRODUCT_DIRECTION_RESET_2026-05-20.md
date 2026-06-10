# Adipoli German — Product Direction Reset

Generated: 2026-05-20 23:53 CEST

## Blunt decision

Stop treating Adipoli German as a set of screens to polish or games to perfect.

The June 2026 MVP direction is clearer: **course/video first, intelligent checkpoints second, games later**. The learner journey must feel like a guided A1 exam-prep course, not a dashboard with mini-games attached.

The direction:

> Adipoli German is a spoon-fed A1 course where a Malayali beginner follows ~35h of guided video lessons, practises inside short missions, takes closed checkpoints, gets weaknesses diagnosed, and receives exact recovery tasks to become Goethe A1-ready.

This means the core product unit is not a lesson page, not a game, not a script, and not a module.

The core product unit is a **mission**.

## What is wrong with the old direction

### 1. Dashboard-first thinking

The app currently exposes too many systems:

- lessons
- games
- practice
- tests
- vocabulary
- search
- tips
- streaks
- readiness
- onboarding
- scripts

That makes it feel like a content library. Premium learning apps feel guided. The learner should almost never wonder what to do next.

### 2. Game-first without learning arc

Some interactions feel like random mini-games. A game is only useful if it sits inside a learning arc:

1. encounter meaning,
2. understand it,
3. recognize it,
4. produce it,
5. repair mistake,
6. use it in a meaningful scenario.

If a game is just tapping, flying words, or selecting cards, it becomes noise.

### 3. Too much recognition, not enough performance

The course has many exercises, but the emotional payoff comes when the learner can say/write something. A1 confidence is performance, not clicking.

### 4. Story exists, but it is not yet the operating system

Kuttan should not be decoration. He should create stakes:

- today Kuttan needs to introduce himself,
- today he has to spell his name at Goethe Kochi,
- today he has to understand a form,
- today he has to answer a speaking examiner.

The learner is not reading about Kuttan. The learner is helping Kuttan and rehearsing their own future.

### 5. Premium is not more animation

Premium means:

- less clutter,
- clearer hierarchy,
- fewer decisions,
- stronger feedback,
- beautiful restraint,
- no broken game behavior,
- purposeful motion,
- one main action per screen,
- visible progress toward a real goal.

## New product shape

### Product frame

Adipoli German should feel like:

> Duolingo-style momentum + Babbel-style adult usefulness + Kerala/Manglish warmth + Goethe A1 exam seriousness.

Not a clone. The distinctiveness is Kerala-rooted mission learning.

### Primary loop

Every learner session should follow this loop:

1. **Mission hook** — why this matters today.
2. **Scene** — Kuttan / learner situation in Kerala or Goethe prep.
3. **Input** — hear/read 3–7 useful German chunks.
4. **Guided recognition** — choose/match with context.
5. **Production** — answer aloud first; type/write only when it is short, exam-relevant, or optional.
6. **Repair** — correct one common mistake.
7. **Win** — “you can now do X.”
8. **Pull** — teaser for next mission.

### Interaction doctrine — less clicking, more immersion

Boss rejected the current “build the greeting” / sentence-builder feel: too many chips, counters, undo/clear controls, and taps. That is not immersive and it is painful on phone.

Default first-path interaction should be:

1. Hear a real line in a scene.
2. Say the reply aloud.
3. Do one light comprehension/repair action if needed.
4. See a tiny model answer.
5. Continue into the next scene beat.

Use sentence builders, card sorting, and chip placement only as optional scaffolding or remedial repair — never as the hero interaction for a premium beginner mission. Avoid mandatory long typing on mobile; if writing is needed, make it short, guided, and clearly tied to Goethe A1 output.

### Conversation-scene doctrine — fewer pages, less reading

Boss’s stronger correction: the UI may look good, but the UX still feels confusing because the learner is reading too much and moving through too many pages. The desired product is closer to a tiny staged conversation: two people visible, one says `Guten Morgen`, the other answers, and the learner is pulled into the exchange.

Default beginner scene should be:

1. Show the situation visually: e.g. Frau Weber facing the learner / Kuttan in a Goethe Kochi practice room.
2. Play one spoken line.
3. Show the line as a subtitle, not as a paragraph.
4. Prompt the learner’s reply with one obvious action.
5. Give immediate feedback/repair.
6. Advance in-place; avoid page hops unless the mission beat truly changes.

The pedagogical unit is not a page, builder, or explanation card. It is an intentional conversational beat: input → response → feedback. If a screen has text that does not directly help that beat, cut it.

### Screen rule

Every screen must answer:

- What am I doing?
- Why does it matter?
- What do I tap/say/type now?
- How close am I to the win?

If a screen cannot answer those in 3 seconds, it fails.

## New content unit: Mission

A mission has:

- title: learner-facing emotional promise,
- situation: Kuttan/Goethe/Kerala context,
- target output: what learner can say/write by the end,
- chunks: 3–7 German chunks,
- input step,
- recognition step,
- production step,
- mistake repair,
- celebration,
- next pull.

Example Module 2 mission:

### Mission: “Tell the examiner who you are”

Situation:

Kuttan is at a Goethe Kochi speaking mock. The examiner asks: `Wie heißen Sie? Woher kommen Sie?`

Target output:

Learner can say:

- `Ich heiße Nikhil.`
- `Ich komme aus Kerala.`
- `Ich wohne in ...`
- `Ich spreche Malayalam und Englisch.`

Flow:

1. Hear the examiner question.
2. Tap meaning.
3. Build Kuttan’s answer.
4. Say your own answer aloud.
5. Type one answer.
6. Fix common mistake: `Ich bin komme` → `Ich komme`.
7. Celebrate: “You can now introduce yourself in a Goethe A1 speaking room.”

## What to stop doing

Stop:

- polishing random components before defining the mission flow,
- adding more games as if quantity means engagement,
- writing more strategy docs without implementing a pilot,
- putting all app features in front of new learners,
- treating Kuttan as mascot chatter,
- showing timers/scores/XP before the learner understands the task,
- using fast games for first exposure,
- allowing click-only lessons to count as complete,
- making chip builders, 0-of-N counters, undo/clear controls, or typing walls the main learner experience,
- treating mobile keyboard labor as “production” when speaking/shadowing or short guided repair would teach better.

## What to build first

Build the **A1 MVP course spine** before more games or random UI polish.

### Immediate build scope

1. **A1 syllabus map:** learner-facing modules, lesson count, video minutes, Goethe skill coverage.
2. **Test-and-recovery rubric:** closed tests, weakness tags, manual scoring, recovery prescriptions, score boosters.
3. **One full module in final format:** video outline/script → practice → diagnostic → recovery tasks → phone/desktop QA.

Module 2 self-introduction is still a strong first candidate because it is immediately useful and Goethe A1 speaking aligned, but the next artifact should prove the new course/checkpoint model, not only a nice mission route.

### First-module deliverables

1. Lesson/video outline and script skeleton.
2. Must-do checklist.
3. Score-booster checklist.
4. Closed diagnostic.
5. Manual scoring tags/rubric.
6. Recovery prescriptions.
7. One speaking production moment.
8. One writing production moment.
9. One Hören/Lesen check.
10. Phone + desktop QA.

## Architecture direction

The app should move toward a mission engine:

```ts
interface Mission {
  id: string;
  moduleId: number;
  lessonId: string;
  title: string;
  situation: string;
  targetOutput: string[];
  chunks: GermanChunk[];
  steps: MissionStep[];
  commonMistake?: MistakeRepair;
  celebration: string;
  nextPull: string;
}
```

This can be introduced gradually. Do not rewrite the whole app now.

First implementation can be a Module 2-specific pilot component. If it works, generalize.

## Product principles from here

1. Mission before module.
2. Production before completion.
3. Story as stakes, not decoration.
4. Recognition before recall, but recall must arrive.
5. One screen, one job.
6. Fewer stronger interactions beat many weak games.
7. No route is premium until visually tested.
8. No lesson is complete without a speaking or writing output.
9. Kuttan must feel adult-safe: warm, funny, useful, not childish.
10. Goethe A1 confidence is the north star.

## Immediate next step

Do not continue random UI patching.

Next task:

> Design the A1 MVP syllabus and test-and-recovery system.

Acceptance criteria:

- ~35h video-course map exists.
- Each module has must-do and score-booster paths.
- Closed tests map to Goethe A1 skills.
- Manual scoring tags/rubrics exist for writing and speaking.
- Recovery prescriptions are exact, not “study more”.
- Module 2 self-introduction can become the first full module template.

## Existing small patches status

The earlier small fixes should be kept as hygiene, not treated as the strategy:

- first-user home decluttered,
- vocab auto-advance removed,
- WordNinja removed from early vocab cycle,
- global search hidden during focused routes.

They are useful, but they are not the transformation. The transformation is the guided course/checkpoint system above.
