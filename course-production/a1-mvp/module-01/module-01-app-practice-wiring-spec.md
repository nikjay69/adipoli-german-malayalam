# Module 1 App Practice Wiring Spec — Practice Sets

Updated: 2026-06-02 15:35 CEST

## Scope

This spec covers the currently wired Module 1 app practice sets:

```text
Practice: answer Frau Weber
Route: /missions/module-1/greet-frau-weber
Source lesson: Lesson 1 — Start listening: Guten Morgen

Practice: why I am learning German
Route: /missions/module-1/why-a1
Source lesson: Lesson 2 — Why A1 matters for Malayalis

Practice: German sounds for Malayalis
Route: /missions/module-1/german-sounds
Source lesson: Lesson 3 — German sounds for Malayalam speakers

Practice: choose the formal greeting
Route: /missions/module-1/formal-greetings
Source lesson: Lesson 4 — Formal greetings by time/context

Practice: Danke, Bitte, Entschuldigung
Route: /missions/module-1/please-thanks
Source lesson: Lesson 5 — Politeness survival

Practice: goodbye + repair phrases
Route: /missions/module-1/polite-exit
Source lesson: Lesson 6 — Goodbye and repair phrases

Practice: first mini-conversation
Route: /missions/module-1/first-mini-conversation
Source lesson: Lesson 7 — First mini-conversation
```

Goal: convert Module 1 video scripts into spoon-fed phone practice beats: hear one useful line, answer aloud, repair one trap, then see the exact micro-check/recovery/next task.

No games. No dashboard. No typing gate on the first beat.

---

## Learner promise

By the end of this practice set, the learner can do this without freezing:

```text
Frau Weber: Guten Morgen.
You: Guten Morgen, Frau Weber.
You: Ich lerne Deutsch.
```

Secondary output after the same lesson pack:

```text
Auf Wiedersehen.
```

---

## App data now created

Shared data file:

```text
src/lib/missions/module1Practice.ts
```

Active exported set:

```ts
module1AnswerFrauWeberPractice
```

It contains:

- route: `/missions/module-1/greet-frau-weber`;
- scene speaker line: `Frau Weber: Guten Morgen.`;
- learner output lines: `Guten Morgen, Frau Weber.` and `Ich lerne Deutsch.`;
- voice-first practice tasks;
- repair choices;
- closed mini-check items;
- weakness tags;
- exact recovery cards;
- next task: `Practice: Danke + Bitte`.

The route now imports this data instead of hardcoding the first greeting repair options/feedback.

Second exported set:

```ts
module1WhyA1Practice
```

It contains:

- route: `/missions/module-1/why-a1`;
- source lesson: Lesson 2 path check;
- scene/model line: `Ich lerne Deutsch.`;
- learner output lines: `Ich lerne Deutsch.` and `I am learning German for _____.`;
- reason choices for A1 exam, family, Germany plan, work, or confidence;
- closed micro-check items for the German line, one reason, and the course path;
- exact recovery cards for first-line speaking, vague reason, and path confusion;
- next task: `Next: train German sounds`.

The Lesson 2 route imports this data and renders the reason/micro-check/recovery card after the line repair.

Third exported set:

```ts
module1GermanSoundsPractice
```

It contains:

- route: `/missions/module-1/german-sounds`;
- source lesson: Lesson 3 sound drill;
- real existing audio path: `/audio/tts/v1-2-1/v1-2-1-line-3.mp3`;
- sound contrast output: `ich — schön — Weber — Tschüss`;
- hardest-sound focus choices: `ch / sch`, `w / v`, `ä ö ü`;
- closed micro-check items for `ich` vs `isch`, German `w`, and umlaut shadowing;
- exact recovery cards for `pronunciation:ch_sch`, `pronunciation:w_v`, and `pronunciation:umlaut`;
- next task: `Next: formal greetings`.

The Lesson 3 route imports this data and renders the sound micro-check/recovery card after the contrast repair.

---

## Required learner flow

### Step 1 — Hear

- Show one two-person scene.
- Frau Weber says: `Guten Morgen.`
- Custom audio UI backed by real `<audio>`.
- Repair choices stay hidden until audio finishes.

### Step 2 — Say aloud

Learner says:

```text
Guten Morgen, Frau Weber.
```

This is self-marked in MVP. Do not require recording yet.

### Step 3 — Repair trap

Show three choices only after the audio beat:

```text
Gute Nacht, Frau Weber.
Guten Morgen, Frau Weber.
Tschüss, Frau Weber.
```

Correct:

```text
Guten Morgen, Frau Weber.
```

Wrong-feedback rule:

```text
Wrong moment. Replay once; morning class needs Guten Morgen.
```

### Step 4 — Win + next task

After the correct choice, show one compact win:

```text
You can now
“Guten Morgen, Frau Weber. Ich lerne Deutsch.”
```

Primary next card:

```text
Practice: Danke + Bitte
```

---

## Closed mini-check for this practice set

Instruction:

```text
Closed check: no Google, no notes. Find the weak spot, then fix it.
```

Items:

| Mode | Prompt | Expected | Tags |
|---|---|---|---|
| speak | Frau Weber says: `Guten Morgen.` Say a safe reply. | `Guten Morgen, Frau Weber.` | `sprechen:greeting_reply`, `sprechen:formality` |
| choose | 9 AM teacher greeting: `Guten Morgen` or `Gute Nacht`? | `Guten Morgen` | `hoeren:greetings`, `vocab:greeting_set` |
| write | Write: I am learning German. | `Ich lerne Deutsch.` | `schreiben:first_sentence` |

Pass rule:

```text
Pass when the learner answers aloud, chooses the morning greeting, and writes the first sentence cleanly.
```

Implementation note: the current route implements the hear/say/repair/win beat and renders a compact post-win mini-check/recovery card from `module1Practice.ts`. The card is a self-check/recovery bridge, not a typing gate.

---

## Recovery cards

### `hoeren:greetings`

- Do: replay 10 greeting lines without subtitles.
- Output: 8/10 correct.
- Time: 12m.
- Retest: hear 5 greetings; answer 4 correctly.

### `sprechen:greeting_reply`

- Do: repeat `Guten Morgen, Frau Weber.` and `Ja. Ich lerne Deutsch.` five times each.
- Output: one spoken greeting exchange.
- Time: 10m.
- Retest: Frau Weber greets once; learner replies aloud.

### `schreiben:first_sentence`

- Do: copy `Ich lerne Deutsch.` twice, hide it, type it from memory.
- Output: one clean written sentence.
- Time: 8m.
- Retest: write `Ich lerne Deutsch` from memory.

---

## Lesson 2 practice set — why I am learning German

### Required learner flow

1. Play the existing `Ich lerne Deutsch.` audio.
2. Learner says `Ich lerne Deutsch.` aloud.
3. Learner repairs one choice trap:
   - correct: `Ich lerne Deutsch.`
   - traps: `Ich lernt Deutsch.`, `Ich lerne Englisch.`
4. Learner chooses exactly one reason: A1 exam, family, Germany plan, work, or confidence.
5. Show the closed micro-check and recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Say the line, choose one reason, then say the path.
```

Pass rule:

```text
Pass when the learner says Ich lerne Deutsch, chooses one reason, and repeats Watch → Listen → Say → Check → Fix.
```

Recovery is exact and bounded:

- first German line weak → 8m replay/chain drill/retest;
- reason vague → 5m choose one reason/retest;
- path confusion → 4m hide-and-repeat the five-step path.

Current status: **PASS/WEAK** — data and standalone route exist, audio uses an existing real MP3, and the post-repair card renders reason + micro-check + recovery. Weak because it is not yet linked as the primary post-Lesson-2 CTA from the learner flow and not a scored/submitted check engine.

---

## Lesson 3 practice set — German sounds

### Required learner flow

1. Play an existing German audio line containing the sound focus.
2. Learner shadows `ich — schön — Weber — Tschüss` slowly.
3. Learner repairs one sound trap:
   - correct: `ich` for `Ich lerne Deutsch`;
   - traps: `isch` as overused `sch`, and `schön` as a different valid `sch` word.
4. Learner chooses one hardest sound only: `ch / sch`, `w / v`, or `ä ö ü`.
5. Show the closed sound micro-check and exact recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Choose the sound, shadow four words, name the weak spot.
```

Pass rule:

```text
Pass when the learner chooses ich, shadows the four-word set, and names one hardest sound.
```

Recovery is exact and bounded:

- `ch/sch` mixed → 10m slow contrast drill;
- German `w` still English → 8m `Weber/Wasser/Wiedersehen` drill;
- umlaut dots ignored → 8m `schön/Tschüss` drill.

Current status: **PASS/WEAK** — data and standalone route exist, audio uses an existing MP3, and the post-repair card renders focus choice + sound micro-check + recovery. Weak because the audio is a usable existing route asset, not a freshly produced Lesson 3 full sound-set recording, and the route is now linked from Lesson 2 but still not a scored/submitted check engine.

---

## Lesson 4 practice set — formal greetings

Fourth exported set:

```ts
module1FormalGreetingsPractice
```

It contains:

- route: `/missions/module-1/formal-greetings`;
- source lesson: Lesson 4 formal greetings;
- real existing audio path: `/audio/tts/v1-3-1/v1-3-1-line-1.mp3`;
- formal output set: `Guten Morgen · Guten Tag · Guten Abend`;
- safe formal default: `Guten Tag.`;
- closed micro-check items for teacher/office daytime, evening meeting, and the formal set;
- exact recovery cards for `hoeren:greetings`, `sprechen:formality`, and `vocab:gute_nacht_trap`;
- next task: `Next: Danke + Bitte`.

The Lesson 4 route imports this data and renders a context trap, micro-check, and recovery card after the formal-greeting repair.

### Required learner flow

1. Play the existing `Guten Tag.` audio.
2. Learner chooses the formal safe default for teacher/office/examiner context.
3. Learner rejects the `Gute Nacht` trap as bedtime-only, not a normal meeting greeting.
4. Learner practises one context at a time: teacher/office, evening meeting, or going to sleep.
5. Show the closed formal-greetings micro-check and exact recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Choose the greeting, say it, reject the bedtime trap.
```

Pass rule:

```text
Pass when the learner chooses Guten Tag for formal daytime context and explains Gute Nacht correctly.
```

Recovery is exact and bounded:

- `hoeren:greetings` weak → 10m replay/time-context sorting/retest;
- formal default not automatic → 8m `Guten Tag` teacher/office/examiner drill;
- `Gute Nacht` trap → 8m evening-meeting vs bedtime context sort.

Current status: **PASS/WEAK** — shared data and standalone route exist, the route uses real existing MP3 audio, post-repair card renders context choice + micro-check + recovery, and the next link points to `/missions/module-1/please-thanks?start=listen`. Weak because this is still a self-check bridge, not a scored/submitted check engine, and the audio is an existing route asset rather than a freshly produced Lesson 4 recording.

---

## Lesson 5 practice set — politeness survival

Fifth exported set:

```ts
module1PolitenessPractice
```

It contains:

- route: `/missions/module-1/please-thanks`;
- source lesson: Lesson 5 politeness repair;
- real existing audio path: `/audio/tts/v1-4-1/v1-4-1-line-1.mp3`;
- output set: `Danke. Bitte. Entschuldigung.`;
- repair trap for `Bitte`/`Danke`/rough `Was?` after help;
- closed micro-check items for help received, repeat request, and polite interruption;
- exact recovery cards for `vocab:bitte_danke_swap`, `sprechen:request_phrase`, and `vocab:entschuldigung`;
- next task: `Next: polite exit`.

The existing Module 1 `please-thanks` route now imports this shared data and renders a compact Lesson 5 micro-check/recovery card after the `Danke` repair.

### Required learner flow

1. Play the existing `Bitte.` audio.
2. Learner answers after help with `Danke.`.
3. Learner rejects rough `Was?` and the `Bitte`/`Danke` swap.
4. Learner practises one situation: help received, need repeat, or interrupt politely.
5. Show the closed politeness micro-check and exact recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Replace rough lines with polite German.
```

Pass rule:

```text
Pass when the learner repairs thanks, repeat, interrupt, formal leave, and reply-to-thanks situations.
```

Recovery is exact and bounded:

- `Danke`/`Bitte` swapped → 8m five help/thanks prompts;
- repeat request weak → 8m `Noch einmal, bitte` / `Langsam, bitte` drill;
- `Entschuldigung` too heavy → 8m chunking + one polite repair line.

Current status: **PASS/WEAK** — shared data and route integration exist, real existing audio plays technically, choices unlock after audio, `lesson-5-politeness-micro-check-card` renders, and the next card links to `/missions/module-1/polite-exit?start=listen`. Weak because this is still a self-check bridge, not a scored/submitted check engine, and human accent/audio-fit review is not done.

---

## Lesson 6 practice set — goodbye + repair phrases

Sixth exported set:

```ts
module1GoodbyeRepairPractice
```

It contains:

- route: `/missions/module-1/polite-exit`;
- source lesson: Lesson 6 goodbye and repair phrases;
- real existing audio path: `/audio/tts/v1-4-1/v1-4-1-line-0.mp3`;
- output set: `Auf Wiedersehen. Tschüss.` plus `Noch einmal, bitte. Langsam, bitte.`;
- face-to-face goodbye trap: `Auf Wiedersehen` vs `Tschüss` vs phone-only `Auf Wiederhören`;
- closed micro-check items for formal goodbye, repeat request, and slow-down request;
- exact recovery cards for `vocab:formal_casual`, `sprechen:request_phrase`, and `vocab:phone_goodbye`;
- next task: `Next: first mini-conversation`.

The existing Module 1 `polite-exit` route now imports this shared data and renders a Lesson 6 micro-check/recovery card after the correct formal-exit repair.

### Required learner flow

1. Play the existing `Auf Wiedersehen.` audio.
2. Learner answers aloud: `Vielen Dank. Auf Wiedersehen.`.
3. Learner chooses the safe face-to-face formal goodbye.
4. Learner practises one context: formal goodbye, casual goodbye, or too fast.
5. Show the closed goodbye/repair micro-check and exact recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Say the goodbye or repair phrase.
```

Pass rule:

```text
Pass when the learner chooses formal/casual goodbye and separates repeat from slow-down requests.
```

Recovery is exact and bounded:

- formal/casual mixed → 8m context sort;
- repair phrase not automatic → 8m `Noch einmal, bitte` / `Langsam, bitte` drill;
- phone goodbye trap → 6m face/phone context sort.

Current status: **PASS/WEAK** — shared data and route integration exist, real existing audio plays technically, choices unlock after audio, `lesson-6-goodbye-repair-micro-check-card` renders, and the next card links to `/missions/module-1/first-mini-conversation?start=listen`. Weak because this is still a self-check bridge, not a scored/submitted check engine, and human accent/audio-fit review is not done.

---

## Lesson 7 practice set — first mini-conversation

Seventh exported set:

```ts
module1FirstConversationPractice
```

It contains:

- route: `/missions/module-1/first-mini-conversation`;
- source lesson: Lesson 7 first mini-conversation;
- real existing audio path: `/audio/tts/v1-3-1/v1-3-1-line-3.mp3`;
- output set: `Guten Tag, Frau Weber. Gut, danke.` plus `Noch einmal, bitte. Auf Wiedersehen.`;
- mini-conversation trap: rough `Hey. Was?` vs formal answer vs bedtime wrong-context line;
- closed micro-check items for answering, repeat request, and thank+leave;
- exact recovery cards for `sprechen:question_answer`, `sprechen:request_phrase`, and `sprechen:formality`;
- next task: `Module 1 checkpoint`.

The new Module 1 `first-mini-conversation` route imports this shared data and renders a Lesson 7 micro-check/recovery card after the correct formal mini-conversation repair.

### Required learner flow

1. Play the existing `Guten Tag. Wie geht es Ihnen?` audio.
2. Learner answers aloud: `Guten Tag, Frau Weber. Gut, danke.`.
3. Learner avoids rough `Hey. Was?` and wrong-context `Gute Nacht`.
4. Learner practises one part: answer question, ask repeat, or thank + leave.
5. Show the closed first-conversation micro-check and exact recovery tasks.

### Closed micro-check

Instruction:

```text
Closed check: no notes. Run the tiny exchange from memory.
```

Pass rule:

```text
Pass when the learner greets, answers one question, asks repeat if needed, thanks, and leaves formally.
```

Recovery is exact and bounded:

- answer freezes → 10m replay/question-answer drill/retest;
- repeat request weak → 8m `Noch einmal, bitte` / `Langsam, bitte` drill;
- too casual → 8m formal-context greeting and goodbye drill.

Current status: **PASS** — shared data and route integration exist, real existing audio plays technically, choices unlock after audio, `lesson-7-first-conversation-micro-check-card` renders, and the next card links to the scored Module 1 checkpoint route before Module 2.

### Scored Module 1 checkpoint

Route:

```text
/missions/module-1/checkpoint
```

Data/engine:

```text
src/lib/missions/module1Checkpoint.ts
```

Checkpoint behavior:

- closed-book instruction: no notes, no dictionary, no YouTube, no ChatGPT;
- 45-point manual/self-coded rubric across Hören, Sprechen, Lesen, Schreiben, grammar/vocab;
- hard fail if Hören greeting recognition is weak, total score is below 60%, or the learner cannot produce the first spoken reply;
- WEAK if total score is 60–69% or writing/speaking has a local weakness;
- PASS at 70%+ with required spoken reply;
- failed weakness tags map to exact recovery cards with time-boxed tasks and retests;
- passing result stores `adipoli:module1:checkpointResult` and exposes the Module 2 direct-listen CTA.

---

## Acceptance gate

PASS only if:

- `/missions/module-1/greet-frau-weber` loads;
- learner hears real audio, not browser SpeechSynthesis;
- repair options are hidden until audio finishes;
- no typing is required to complete the first practice beat;
- the correct choice marks the mission complete in localStorage;
- next card opens `/missions/module-1/please-thanks?start=listen`;
- mini-check/recovery data exists in `src/lib/missions/module1Practice.ts`;
- `/missions/module-1/why-a1` loads;
- Lesson 2 uses real audio from `/audio/hoeren/module-01/ex1-1-prod-dictation.mp3`, not browser SpeechSynthesis;
- Lesson 2 renders `lesson-2-reason-micro-check-card` after the correct line repair;
- `/missions/module-1/german-sounds` loads;
- Lesson 3 uses real existing audio from `/audio/tts/v1-2-1/v1-2-1-line-3.mp3`, not browser SpeechSynthesis;
- Lesson 3 renders `lesson-3-sounds-micro-check-card` after the correct sound repair;
- `/missions/module-1/formal-greetings` loads;
- Lesson 4 uses real existing audio from `/audio/tts/v1-3-1/v1-3-1-line-1.mp3`, not browser SpeechSynthesis;
- Lesson 4 renders `lesson-4-formal-greetings-micro-check-card` after the correct formal-greeting repair;
- `/missions/module-1/please-thanks` loads;
- Lesson 5 uses real existing audio from `/audio/tts/v1-4-1/v1-4-1-line-1.mp3`, not browser SpeechSynthesis;
- Lesson 5 renders `lesson-5-politeness-micro-check-card` after the correct `Danke` repair;
- `/missions/module-1/polite-exit` loads;
- Lesson 6 uses real existing audio from `/audio/tts/v1-4-1/v1-4-1-line-0.mp3`, not browser SpeechSynthesis;
- Lesson 6 renders `lesson-6-goodbye-repair-micro-check-card` after the correct formal-exit repair;
- `/missions/module-1/first-mini-conversation` loads;
- Lesson 7 uses real existing audio from `/audio/tts/v1-3-1/v1-3-1-line-3.mp3`, not browser SpeechSynthesis;
- Lesson 7 renders `lesson-7-first-conversation-micro-check-card` after the correct mini-conversation repair;
- Lesson 7 next card opens `/missions/module-1/checkpoint?start=listen`;
- `/missions/module-1/checkpoint` loads;
- checkpoint scoring renders `module-1-checkpoint-score`, `module-1-checkpoint-result`, and `module-1-checkpoint-recovery-cards`;
- checkpoint PASS exposes `/missions/module-2/self-intro?start=listen`;
- public resources are not claimed here.

Current status: **PASS/WEAK** — first route uses shared practice data, voice-first repair, and a rendered post-win mini-check/recovery card. Lessons 2, 3, 4, 5, 6, and 7 now have shared practice data plus routes with micro-check/recovery bridges. Lesson 2 links to Lesson 3, Lesson 3 links to Lesson 4, Lesson 4 links to Lesson 5, Lesson 5 links to Lesson 6, Lesson 6 links to Lesson 7, and Lesson 7 links to the scored checkpoint before Module 2. Weakness: checkpoint is technically browser-verified and rubric-aligned, but speaking/pronunciation still needs human assessment in the MVP workflow.
