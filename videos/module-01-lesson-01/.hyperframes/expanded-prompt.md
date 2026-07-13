# Module 01 · Lesson 01 — HyperFrames graphics package

## Deliverable

Build a modular HyperFrames graphics package for the 15-minute lesson `Start Listening: Guten Morgen`. The first composition is an approximately 81-second approval reel that demonstrates every reusable teaching insert. It is not the final lesson edit. Each scene must remain a standalone sub-composition that can later be timed under the user's Malayalam/Manglish presenter footage and the pre-rendered Frau Weber German model audio.

The graphics package must communicate one promise: an adult Malayali beginner can hear a simple German greeting, reply aloud, and leave Lesson 1 already able to say `Guten Morgen, Frau Weber.` and `Ich lerne Deutsch.`

## Style block

- Canvas: `#0d1a0d`, deepened with `#081108` at the edges.
- Surfaces: `#162416` and `#203520`.
- Primary ink: `#f7f0dd`; muted ink: `#c8c2b1`.
- Structural accent: `#f1d27a`; deep accent: `#b8891a`.
- Correct/better: `#3fbf75`; risky/wrong: `#c0392b`; listening/model voice: `#9dc4ff`.
- Display: Oswald 700. Teaching phrases: EB Garamond 700. Production chrome: IBM Plex Mono 700.
- Mood: warm evening study room meets serious language-school blackboard. Adult, calm, exact, encouraging.
- Corners: 28 px on teaching surfaces; pills only for compact status/cue labels.
- Motion: precise editorial movement, `power3.out` entrances, `power2.out` secondary reveals, restrained `sine.inOut` atmosphere. No bounce.

## Rhythm declaration

`LISTEN — answer — orient — BUILD — compare — own-the-sentence — refine — perform — hold/CTA`

The reel starts with a quiet German sound cue, builds teaching structure through the middle, peaks at the learner's first dialogue, and lands in a calm closed check plus next action. Related scenes use a 0.35-second editorial horizontal push. Section changes use a 0.45-second blur crossfade. The last scene holds cleanly for editing.

## Global production rules

- Canvas is 1920 × 1080 for the course player.
- Each scene is a modular sub-composition under `compositions/` and can be previewed or rendered independently later.
- The approval reel contains graphics only. Do not synthesize the user's voice, generate an avatar, or spend HeyGen credits.
- Leave explicit presenter-safe zones where noted. Those zones become camera picture-in-picture or full-frame footage after upload.
- Every scene has 8–10 purposeful elements across background, midground, and foreground.
- Atmosphere uses warm radial light, faint paper grain, oversized ghost German fragments, fine rules, and small mono metadata. No full-screen linear gradient.
- All timed entrances use explicit `gsap.fromTo()` states. No `Math.random`, runtime clocks, layout-property tweens, or infinite loops.
- German spelling and punctuation must match the Lesson 1 script exactly.
- Visible copy stays sparse. Malayalam/Manglish explanation remains voice-led.

## Scene 01 — First sound, not first lecture · 7s

### Concept

The learner enters German through sound before explanation. A dark, warm frame behaves like a listening room: a thin audio line wakes up, the teacher cue locks in, and `Guten Morgen.` becomes the first large thing the learner sees.

### Mood direction

Cinematic language-course cold open; quiet confidence; the first page of a premium workbook coming alive.

### Depth layers

- BG: deep forest field; warm lamp-like radial bloom at upper right; oversized ghost `MORGEN` drifting at low opacity; fine horizontal listening rule.
- MG: large EB Garamond phrase `Guten Morgen.`; compact blue `FRAU WEBER · MODEL AUDIO` cue; simple deterministic waveform made from authored bars.
- FG: `MODULE 01 · LESSON 01` mono label; `LISTEN → COPY` instruction; small registration ticks near the safe-frame corners.

### Animation choreography

- Listening rule DRAWS left to right.
- Waveform bars GROW from their baseline in a short authored sequence.
- Model-audio cue LOCKS IN from the left.
- `Guten Morgen.` SETTLES upward with `power3.out`, then holds.
- `LISTEN → COPY` TYPES ON late enough to guide the learner's action.

### Presenter integration

Keep the lower-left 520 × 360 zone free enough for a future small presenter reaction or Frau Weber call frame. The hook itself must remain graphics-first.

### Transition out

Editorial horizontal push, 0.35s, outgoing phrase moves left while the answer card arrives from the right.

## Scene 02 — Meaning micro-table · 8s

### Concept

The table should feel like three index cards placed on a serious study desk, not a spreadsheet. Each row arrives in the learner's thinking order: German, meaning, use.

### Mood direction

Editorial study notes; tactile paper surfaces on a dark board; clean exam-prep clarity.

### Depth layers

- BG: muted paper grain; ghost `GUTEN` at the left edge; gold vertical rule; one warm radial glow behind the active row.
- MG: three rows — `Guten Morgen / Good morning / morning`, `Frau Weber / Ms/Mrs Weber / polite address`, `Hallo / Hello / casual/neutral`.
- FG: column labels in IBM Plex Mono; active-row gold underline; `SAFE FIRST REPLY` micro-note pointing to the polite address row.

### Animation choreography

- Column labels SNAP into place.
- Rows SLIDE upward one at a time with a 0.08s stagger.
- The active row gains a gold border FILLED with `scaleX`, then the other rows soften.
- The safe-reply note DRAWS from the row toward the margin.

### Transition out

Blur crossfade, 0.45s, table softens into the five-step learning path.

## Scene 03 — The Adipoli learning loop · 8s

### Concept

Show the course promise as a path the learner can follow, not a feature list. Five large verbs become stepping stones; the gold progress line advances only after each verb has landed.

### Mood direction

Wayfinding system inside a language school; confident, procedural, never gamified.

### Depth layers

- BG: faint route-grid; oversized ghost arrow; two slow light pools at opposite corners.
- MG: five stations — `WATCH`, `LISTEN`, `SAY`, `CHECK`, `FIX`; a final smaller destination chip `CONTINUE`.
- FG: gold route line; numbered mono markers `01–05`; `NO RESOURCE DUMPING` note; small `EXACT NEXT ACTION` label.

### Animation choreography

- Route line DRAWS in five segments.
- Each station LOCKS IN as the line reaches it.
- Current station receives a brief gold pulse; completed stations settle to cream.
- `CONTINUE` appears only after `FIX`, visually proving recovery is part of progress.

### Transition out

Directional push upward, 0.35s, as the route becomes the horizontal time-of-day line.

## Scene 04 — Greeting by time · 10s

### Concept

A single day arc teaches when each greeting belongs. The learner should understand the shape instantly: morning, day/formal, evening, leaving.

### Mood direction

Elegant timetable meets Kerala sky progression; structured, readable, adult.

### Depth layers

- BG: deep forest with four authored light zones from cool morning blue to warm evening gold; faint clock numerals as ghost type.
- MG: a clean horizontal time line with four large stops: `Guten Morgen`, `Guten Tag`, `Guten Abend`, `Auf Wiedersehen`.
- FG: time labels `09:00`, `14:00`, `18:00`, `LEAVING`; thin vertical indicators; a small note `Gute Nacht = going to sleep` held below the evening stop.

### Animation choreography

- Time line FILLS left to right.
- Each stop GROWS from the line and reveals its phrase.
- Active stop expands to full cream/gold while previous stops recede.
- The `Gute Nacht` note arrives last with a restrained red strike and green correction arrow toward `Guten Abend`.

### Transition out

Blur crossfade, 0.45s, isolating the wrong/better pair.

## Scene 05 — Wrong vs better · 8s

### Concept

Two physical cards meet like an open book: risky greeting on the left, safer greeting on the right. The comparison must feel corrective without shaming the learner.

### Mood direction

Premium editorial comparison; calm teacher feedback; firm but kind.

### Depth layers

- BG: warm radial light centered between the cards; giant ghost `6 PM`; faint doorway line drawing.
- MG: left card `Gute Nacht` with `MEETING SOMEONE · 18:00`; right card `Guten Abend` with `SAFE EVENING HELLO`.
- FG: small red `NOT HERE` tag; green `BETTER` tag; center arrow; mono note `NACHT = GOING TO SLEEP`.

### Animation choreography

- Opposing cards SLIDE from their sides and settle with restrained 3D tilt.
- Red tag STAMPS softly, without bounce.
- Green card becomes the focal point through a gold border fill and small scale settle.
- Center arrow DRAWS from the risky card to the safer phrase.

### Transition out

Editorial horizontal push, 0.35s, right card expands into the first-sentence teaching frame.

## Scene 06 — First sentence: `Ich lerne Deutsch.` · 10s

### Concept

The learner owns one complete identity sentence. The line appears whole first, then separates into three large meaning blocks without turning into a dense grammar lecture.

### Mood direction

Notebook confidence; a sentence underlined once in gold; precise language breakdown.

### Depth layers

- BG: subtle ruled-paper lines; ghost `DEUTSCH`; warm light at the sentence baseline.
- MG: hero sentence `Ich lerne Deutsch.`; three chunks `Ich`, `lerne`, `Deutsch`; translations `I`, `learn/am learning`, `German language`.
- FG: `YOUR FIRST SENTENCE` mono label; distinction chip `Deutsch ≠ Deutschland`; a thin progress rail showing `1 SENTENCE OWNED`.

### Animation choreography

- Full sentence SETTLES in as one thought.
- Gold underline DRAWS beneath it.
- Sentence ASSEMBLES into three aligned chunks using transform-only spacing.
- Meaning labels reveal below each chunk in sequence.
- `Deutsch ≠ Deutschland` LOCKS IN last as the repair note.

### Presenter integration

Reserve the rightmost 420 px as an optional presenter-safe zone during the chunk explanation. The graphic still works full-width when no footage is mounted.

### Transition out

Focus-pull blur crossfade, 0.45s, zooming attention from the sentence to the two pronunciation targets.

## Scene 07 — Pronunciation close-up · 8s

### Concept

Pronunciation is shown as a sound target, not a medical mouth diagram. `Ich` and `Deutsch` each get a clear visual cue and one corrective contrast.

### Mood direction

Audio-lab precision softened by warm paper and gold; encouraging, not forensic.

### Depth layers

- BG: two faint circular sound fields; authored waveform strokes; ghost phonetic fragments.
- MG: left target `Ich` with `soft ch`; right target `Deutsch` with `≈ doych`; clear wrong form `Ish` held smaller and red.
- FG: `REPEAT × 3` instruction; three progress pips; blue model-audio label; `UNDERSTANDABLE > PERFECT` note.

### Animation choreography

- Sound fields EXPAND once and settle.
- `Ich` and `Deutsch` arrive from opposite directions.
- Wrong `Ish` appears briefly, receives a red strike, then focus returns to `Ich`.
- Three repeat pips FILL one at a time, leaving a clean hold for real practice timing later.

### Transition out

Editorial push, 0.35s, pronunciation cards move aside to reveal the video-call dialogue stage.

## Scene 08 — First tiny dialogue · 12s

### Concept

The learner performs Kuttan's lines inside a calm first video call. One current line owns the frame; previous turns remain as small history, and the active speaker is unmistakable.

### Mood direction

Friendly language-school call interface without generic app chrome; warm, serious, achievable.

### Depth layers

- BG: abstract call-frame outline; Kerala-evening light on the learner side, neutral blue light on the teacher side; faint connection line.
- MG: two speaker panels labeled `FRAU WEBER` and `KUTTAN / YOU`; current dialogue line at 96–120 px; four-turn transcript history receding above.
- FG: active-speaker gold marker; blue `LISTEN` cue on teacher turns; gold `YOUR TURN` cue on learner turns; small `Lernen Sie Deutsch? = Are you learning German?` note only when needed.

### Animation choreography

- Speaker panels DRAW on.
- Turns STEP in one at a time: `Guten Morgen.` → `Guten Morgen, Frau Weber.` → `Lernen Sie Deutsch?` → `Ja. Ich lerne Deutsch.`
- Active line brightens and expands slightly; prior line moves upward and mutes.
- `YOUR TURN` leaves a deliberate stable pause after each teacher cue.
- Final learner sentence receives a gold underline and a quiet success glow.

### Presenter integration

This scene later accepts Frau Weber model audio and the learner/presenter performance. Do not bake generated speech into the approval reel.

### Transition out

Gentle blur crossfade, 0.55s, dialogue history dissolves into the closed check card.

## Scene 09 — Closed check, recap, next action · 10s

### Concept

End with calm competence, not exam anxiety. A closed-check instruction appears first, then folds into a recap of the three phrases and one clear next action.

### Mood direction

Exam-prep calm; premium end card; weakness treated as useful data.

### Depth layers

- BG: stable forest field; low warm bloom; ghost check marks; quiet ruled-paper texture.
- MG phase A: `CLOSED CHECK`, `No notes. No Google.`, `Find the weak spot, then fix it.`
- MG phase B: `YOU CAN SAY`, followed by `Guten Morgen, Frau Weber.`, `Ich lerne Deutsch.`, `Auf Wiedersehen.`
- FG: `WEAKNESS = DATA, NOT SHAME`; completion rail; final gold action button `PRACTICE: ANSWER FRAU WEBER`.

### Animation choreography

- Closed-check title LOCKS IN; two restraint lines DRAW around it.
- Instruction holds briefly, then SCALE-SWAPS into the recap phrase stack.
- Phrases reveal one at a time with readable holds.
- Action button settles in with `power3.out`, no bounce, and receives one restrained light sweep.
- Final frame holds stable for at least 2 seconds and may fade gently to the canvas at the reel end.

### Transition out

Final-only gentle fade to the deep forest canvas, 0.8s.

## Recurring motifs

- Gold progress rule that changes role across scenes: listening line, table underline, route, day timeline, correction arrow, sentence underline, repetition rail, dialogue marker, completion rail.
- Mono metadata in the upper-left and lower-right corners, always inside title safe.
- Warm lamp bloom migrates gradually from upper-right to center, then settles low in the final frame.
- Oversized ghost German words act as atmosphere but never compete with the teaching phrase.

## Negative prompt

- No avatar presenter, AI clone, mascot, cartoon reaction, or fake lip-sync.
- No childish game UI, XP, badges, confetti, streaks, feature grids, or dashboard density.
- No full-screen blue/purple gradient, neon cyan, gradient text, glassmorphism, or glowing SaaS cards.
- No tiny text, dense grammar paragraphs, spreadsheet tables, chart-library output, or six-panel layouts.
- No random decorative German, fake Goethe logo, or text embedded into AI-generated images.
- No bouncy `back.out`, elastic entrances, infinite idle loops, or motion on every element at once.
- No final render until the user reviews the HyperFrames Studio preview and approves the composition.

