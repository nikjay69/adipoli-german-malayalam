# AI Cinematic Scripts — Adipoli German: A1 (v4.0)
> Kuttan's Journey: Kerala → Kochi Airport → Boarding the Plane
> Version: 4.0 | Updated: 2026-04-05
> Veo 3.1 + Pixar 3D Style + Streamlined Narration + Hard Duration Caps
>
> **Tier A**: 1, 4, 9, 12, 14, 15 (premium production)
> **Tier B**: 2, 3, 6, 7, 8, 10, 11, 13 (simplified sequences)

---

## Overlay Budget Rules (v4 Change)

| Tier | Max text overlay lines | Narration budget |
|---|---|---|
| Tier A | **8 lines** across all sequences | Max 5 narration bursts |
| Tier B | **5 lines** across all sequences | Max 3 narration bursts |

**Rule**: If an overlay line can be removed without losing story clarity, remove it.
Text overlays should punctuate, not narrate. Let the images and pacing carry emotional weight.

---

## Verbatim Blocks — Copy Into Every Prompt

### STYLE BLOCK

```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation.
```

### CHARACTER BLOCK

```
The young Indian man from the reference images,
[OUTFIT — see below], carrying a small black backpack.
```

**Outfit Tiers:**
- **Videos 1–6**: `wearing a casual white cotton shirt, jeans, rubber slippers`
- **Videos 7–12**: `wearing a neat green collared shirt, jeans, brown shoes`
- **Videos 13–15**: `wearing a clean formal blue shirt, dark trousers, polished shoes`

### NEGATIVE PROMPT

```
No text overlays. No subtitles. No watermark. No hat. No glasses.
No beard. No realistic style. No live action. No anime.
```

---

## API Settings — All Calls

```json
{
  "parameters": {
    "aspectRatio": "16:9",
    "resolution": "720p",
    "durationSeconds": 8,
    "sampleCount": 1,
    "personGeneration": "allow_adult",
    "negativePrompt": "No text overlays. No subtitles. No watermark. No hat. No glasses. No beard. No realistic style. No live action. No anime.",
    "storageUri": "gs://adipoli-veo/output/"
  }
}
```

**Model**: `veo-3.1-fast-generate-001` for all videos. Upgrade to Standard only for Video 15 if Fast quality is insufficient.

---

## German Progression (unchanged from v3)

| Video | Kuttan's German |
|---|---|
| 1 | Zero |
| 2 | First broken word: "Goo... Guten Morgen?" |
| 3 | Writes "Entschuldigung" — doesn't speak it yet |
| 4 | Broken sentence: "Mein Name ist Kuttan. Ich bin... aus Kerala." |
| 5 | Drilling: "ich arbeite, du arbeitest, er arbeitet" |
| 6 | First full correct sentence: "Ich möchte Kaffee, bitte." |
| 7 | Functional: "Wie viel kostet das?" |
| 8 | Descriptive: "Das ist mein Zimmer. Es gibt ein Bett..." |
| 9 | Two-way broken exchange: "Geradeaus... dann links?" |
| 10 | Teaching with self-correction: "Das Knie." |
| 11 | Natural: "Kann ich helfen? Was möchten Sie?" |
| 12 | Emotional: "Ich vermisse Kerala schon jetzt." |
| 13 | Formal: "Ich möchte die A1-Prüfung anmelden." |
| 14 | Silent — everything precedes this |
| 15 | Earned: "Amma... pass aayi." |

---

## Video 1 — Kerala Home: The Spark
**TIER: A | Duration: ≤65s | Veo calls: 6 (2 × 3)**

**Module trigger**: Course intro / Module 1 opener
**German level**: Zero
**Story**: Late evening. Kuttan watches a reel of a Malayali guy in Germany. Watches it three times. A decision forms.

### Sequence A — The Room (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. He sits cross-legged
on a Kerala home floor. Terracotta tiles, wooden furniture, brass
nilavilakku lamp glowing. Evening. Wide establishing shot.
Warm, intimate.
```

**Extension 1 (7s)**: `He picks up his phone. The screen lights up his face blue-white. He watches something intently, eyes widening slightly.`

**Extension 2 (7s)**: `He taps to replay. Watches again, leaning closer. His expression shifts — curiosity becoming something deeper.`

### Sequence B — The Shift (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up of his face in warm lamplight. Kerala
bedroom. Evening. Thoughtful expression. Soft focus background.
```

**Extension 1 (7s)**: `A slow smile spreads across his face. His gaze sharpens. Jaw sets slightly with quiet resolve.`

**Extension 2 (7s)**: `He sits up straighter. Looks around the room with fresh eyes. Camera slowly pulls back to show the full room in warm lamplight.`

### Text Overlays (7 lines — Tier A budget)
```
[0:00]  "Kerala. An ordinary evening."
[0:20]  (replays the reel)
[0:28]  "Something just changed."
[0:38]  "Zero German."
[0:44]  "Let's fix that."
[0:52]  Chapter 1: First Steps
```

### Malayalam Narration (4 bursts)
```
[0:03]  "ഒരു സാധാരണ വൈകുന്നേരം."
[0:12]  "ജർമ്മനിയിൽ ഒരു മലയാളി ചേട്ടൻ. Frankfurt-ൽ നടക്കുന്നു, German-ൽ സംസാരിക്കുന്നു."
[0:28]  "കുട്ടൻ മൂന്ന് തവണ replay ചെയ്തു. എന്തോ ഒന്ന് മാറി."
[0:38]  "ഇവിടെ നിന്നാണ് തുടങ്ങുന്നത്."
```

### Audio
- Ambient: ceiling fan hum, distant rain, crickets
- Music: single warm piano note at [0:38], swells gently
- No music until resolution beat

---

## Video 2 — Kerala Neighbourhood: First Attempt
**TIER: B | Duration: ≤40s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 2 opener
**German level**: Zero → first broken word
**Story**: Tea stall. Kuttan shows friend Aby his German. Tries "Guten Morgen" — mangles it. Tries again.

### Sequence A — The Attempt (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. He walks along a
narrow Kerala village road. Coconut trees, a small tea stall,
parked scooters. Warm afternoon. Wide shot, gentle tracking.
```

**Extension 1 (7s)**: `He arrives at the tea stall. A friend his age sits on a bench. Kuttan shows something on his phone excitedly. His friend leans in to see.`

**Extension 2 (7s)**: `Kuttan takes a breath and tries to say something unfamiliar. His mouth shapes a strange word. His friend bursts out laughing. Kuttan laughs too.`

**Extension 3 (7s)**: `He holds up a finger — wait — and tries again. His friend nods, still smiling. Kuttan grins. Small victory.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "Day 3."
[0:18]  "Goo... Guten Morgen?"
[0:24]  (friend laughs)
[0:30]  "Guten Morgen!"
[0:38]  Chapter 2: Introducing Yourself
```

### Malayalam Narration (3 bursts)
```
[0:03]  "മൂന്നാം ദിവസം. ചായക്കടയിൽ."
[0:14]  "ആദ്യത്തെ German word try ചെയ്യുന്നു. കുളമായി. വീണ്ടും try ചെയ്യുന്നു."
[0:28]  "ഇത്തവണ better ആയി!"
```

### Audio
- Ambient: tea stall sounds, autorickshaw, birdsong
- Music: light playful percussion from [0:08]

---

## Video 3 — Kochi City: The Poster
**TIER: B | Duration: ≤40s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 3 opener
**German level**: A few words
**Story**: Kochi. Goethe poster. German tourist asking for directions. Kuttan catches one word: "Entschuldigung." Writes it in his notebook.

### Sequence A — The Catch (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. Walking on a busy
Kochi street. Modern buildings, MG Road area. Golden hour light.
He stops suddenly, looking at a wall poster.
```

**Extension 1 (7s)**: `He reads the poster — Goethe Institut branding visible. He pulls out his phone and takes a photo. Studies it on screen.`

**Extension 2 (7s)**: `Nearby, a foreign tourist looks confused, talking to a local. Kuttan watches. His ears perk up — he caught one word.`

**Extension 3 (7s)**: `He opens a small notebook and writes something carefully. Closes it with quiet resolve. Walks forward with new purpose.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "Kochi. Three weeks in."
[0:18]  "Goethe Institut. A1 Prüfung."
[0:26]  (writes in notebook)
[0:32]  "Entschuldigung."
[0:38]  Chapter 3: Numbers, Time & Dates
```

### Malayalam Narration (3 bursts)
```
[0:03]  "Kochi. മൂന്ന് ആഴ്ച കഴിഞ്ഞു."
[0:12]  "Goethe poster. കുട്ടൻ ഒരു German tourist കണ്ടു — directions ചോദിക്കുന്നു."
[0:26]  "ഒരു വാക്ക് catch ചെയ്തു. Notebook-ൽ എഴുതി."
```

### Audio
- Ambient: city traffic, metro distant, crowd chatter
- Music: curious tone, builds slightly

---

## Video 4 — Kerala Home: The Family Question
**TIER: A | Duration: ≤55s | Veo calls: 6 (2 × 3)**

**Module trigger**: Module 4 opener
**German level**: First broken sentence
**Story**: Dinner table. Amma asks Kuttan to say something in German. He tries: "Mein Name ist Kuttan." Family reacts — impressed, amused, proud.

### Sequence A — The Ask (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting at a Kerala family dinner. Steel plates,
rice, curry. Parents and younger sister around. Warm tungsten
kitchen light. Cozy, intimate.
```

**Extension 1 (7s)**: `His mother gestures expectantly, smiling — clearly asking him to say something. His sister watches with curious anticipation.`

**Extension 2 (7s)**: `He clears his throat with mock seriousness. Takes a breath. Opens his mouth to speak. The family watches.`

### Sequence B — The Moment (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up at the dinner table. He speaks carefully,
mouth forming unfamiliar German words. Family watching.
```

**Extension 1 (7s)**: `His mother claps once, delighted. Father nods with a small proud smile. His sister laughs openly.`

**Extension 2 (7s)**: `He grins — relieved and pleased. Picks up his food again. A German notebook visible next to his plate. Peaceful, warm moment.`

### Text Overlays (7 lines — Tier A budget)
```
[0:00]  "Home."
[0:10]  "Amma wants to hear it."
[0:20]  "Mein Name ist Kuttan."
[0:26]  "Ich bin... aus Kerala."
[0:34]  (father looks up)
[0:40]  "Good enough for Amma."
[0:50]  Chapter 4: Family & People
```

### Malayalam Narration (4 bursts)
```
[0:03]  "അമ്മ German കേൾക്കണം."
[0:14]  "'Mein Name ist Kuttan. Ich bin aus Kerala.' — കുട്ടൻ try ചെയ്യുന്നു."
[0:34]  "അച്ഛൻ impressed ആയി. അനിയത്തി ചിരിക്കുന്നു. അമ്മ claps."
[0:44]  "ഇത് just the beginning."
```

### Audio
- Ambient: plates clinking, ceiling fan, kitchen warmth
- Music: warm background score, swells at mother's clap

---

## Video 5 — Late Night Study: The Grind
**TIER: A | Duration: ≤50s | Veo calls: 6 (2 × 3)**

**Module trigger**: Module 5 opener
**German level**: Drilling verbs
**Story**: 1 AM. Kuttan at his desk drilling verbs. Gets it wrong. Tries again. Gets it right. Pure determination. No narration needed — ambient carries this.

### Sequence A — The Struggle (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting at a small wooden desk at night. Single desk
lamp. Phone screen glowing. Notebook open. 1 AM atmosphere.
Intimate, quiet, determined.
```

**Extension 1 (7s)**: `He mouths words carefully, pointing at his notebook. His eyebrows furrow. He shakes his head — got something wrong. Erases and rewrites.`

**Extension 2 (7s)**: `Close-up on his face in lamplight. Tired but stubborn. He mouths the words slowly, counting on his fingers.`

### Sequence B — The Win (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up at the desk. Night. Notebook with
conjugation tables. His expression shifts — concentration to
realization.
```

**Extension 1 (7s)**: `His eyes light up. He nods firmly. Circles something in his notebook with his pen. Small satisfied smile.`

**Extension 2 (7s)**: `Wide shot of the room. Small desk lamp is the only light. The house is dark and sleeping. He closes the notebook and rests his hand on it. Quiet pride.`

### Text Overlays (5 lines — Tier A budget)
```
[0:00]  "1:07 AM."
[0:12]  "ich arbeite... du arbeitest..."
[0:24]  (shakes head)
[0:32]  "ich arbeite, du arbeitest, er arbeitet."
[0:44]  Chapter 5: Daily Routines & Verbs
```

### Malayalam Narration
**Minimal — only 2 short bursts. Let the silence work.**
```
[0:05]  "രാത്രി ഒരു മണി. ഓരോ വാക്കും."
[0:32]  "ഇത്തവണ ശരിയായി. എല്ലാവരും ഉറങ്ങിക്കഴിഞ്ഞപ്പോൾ."
```

### Audio
- **Ambient only** — fan hum, distant dog, night silence
- **No music** — this video earns its quiet
- The absence of score makes this one of the most powerful in the series

---

## Video 6 — Video Call: Someone Already There
**TIER: B | Duration: ≤40s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 6 opener
**German level**: Attempting real conversation
**Story**: Video call with cousin Raju in Germany. Raju tests him. Kuttan stumbles, checks notebook, gets it right.

### Sequence A — The Call (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting on his bed, laptop open. Face lit by laptop
screen. Night. He listens intently.
```

**Extension 1 (7s)**: `He speaks carefully, gesturing. His expression shifts from concentration to uncertainty. He pauses mid-sentence, searching for a word.`

**Extension 2 (7s)**: `He reaches for his notebook. Flips through pages quickly. Finds what he needs. Looks back at the screen with renewed confidence.`

**Extension 3 (7s)**: `A smile breaks across his face — someone on screen approved. He does a small celebratory gesture. Laughing with relief.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "Raju. Germany, 2 years."
[0:14]  "Ich... möchte... ein...?"
[0:22]  (checks notebook)
[0:28]  "Ich möchte Kaffee, bitte."
[0:36]  Chapter 6: Food & Ordering
```

### Malayalam Narration (3 bursts)
```
[0:03]  "Cousin Raju. Germany-യിൽ രണ്ട് വർഷമായി."
[0:14]  "Raju test ചെയ്യുന്നു. കുട്ടൻ stumble ചെയ്യുന്നു. Notebook check ചെയ്യുന്നു."
[0:28]  "ആദ്യത്തെ full sentence — ശരിയായി!"
```

### Audio
- Ambient: laptop fan, slight digital compression feel
- Music: warm, encouraging

---

## Video 7 — Kochi Mall: Practice in Public
**TIER: B | Duration: ≤35s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 7 opener
**German level**: Shopping phrases
**Story**: Mall. Kuttan whispers German to products. Shop assistant stares. He laughs it off. Keeps practicing.

### Sequence A — The Practice (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes,
carrying a small black backpack. Browsing a modern colorful
supermarket. Bright fluorescent lighting. He picks up a product
and mouths something quietly at it. Playful, self-aware.
```

**Extension 1 (7s)**: `He holds the product up and whispers German at it. His lips move forming unfamiliar words. Puts it back and picks up another.`

**Extension 2 (7s)**: `A shop assistant notices him talking to products. Tilts their head, confused. Kuttan sees them and freezes awkwardly. Laughing.`

**Extension 3 (7s)**: `He walks away from the confused assistant. Turns a corner. Immediately starts practicing again on a new product. Bounce in his step.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "The training ground."
[0:12]  "Wie viel kostet das?"
[0:18]  (shop assistant stares)
[0:24]  (keeps practicing)
[0:32]  Chapter 7: Shopping & Prices
```

### Malayalam Narration (2 bursts)
```
[0:05]  "Kochi mall — കുട്ടന്റെ practice ground."
[0:18]  "Assistant ശ്രദ്ധിച്ചു. വീണ്ടും practice. Man on a mission."
```

### Audio
- Ambient: mall music, AC hum, announcements
- Music: light, playful, comedic timing

---

## Video 8 — Kerala Home: Describing the Room
**TIER: B | Duration: ≤35s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 8 opener
**German level**: Descriptive sentences
**Story**: Kuttan narrates his room in German like a tour guide. Hits a wall on "ceiling fan." Looks it up. "Einen Ventilator!" Triumph.

### Sequence A — The Tour (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Standing in his Kerala bedroom. Basic furniture, study table,
calendar, ceiling fan. He gestures around like a tour guide,
mouth moving confidently. Warm afternoon light. Slightly
comedic.
```

**Extension 1 (7s)**: `He points at things one by one — bed, table, window — mouthing words confidently. Then he points at the ceiling fan. His confident expression falters. Goes blank.`

**Extension 2 (7s)**: `He checks his phone, searching. His face lights up — found it! Opens his notebook eagerly and writes. Closes it with satisfaction.`

**Extension 3 (7s)**: `He walks to the fan, looks up at it with new understanding. Taps his notebook. Self-aware grin.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "His room. His classroom."
[0:12]  "Das ist mein Zimmer."
[0:22]  (ceiling fan — blank look)
[0:28]  "Einen Ventilator!"
[0:32]  Chapter 8: Home & Living
```

### Malayalam Narration (2 bursts)
```
[0:05]  "German tour guide ആകുന്നു സ്വന്തം room-ൽ."
[0:22]  "Fan-ന്റെ വാക്ക് മറന്നു. Phone check. 'Ventilator!' Notebook-ൽ എഴുതി."
```

### Audio
- Ambient: afternoon fan, birds outside
- Music: light, warm, slightly comedic

---

## Video 9 — Kochi Bus Stand: Asking Directions
**TIER: A | Duration: ≤55s | Veo calls: 6 (2 × 3)**

**Module trigger**: Module 9 opener
**German level**: Two-way broken exchange
**Story**: Bus stand. German tourist lost. Kuttan walks up. Broken German + gestures. Works. Tourist says "Danke." Kuttan walks away buzzing.

### Sequence A — The Approach (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes,
carrying a small black backpack. Standing at a busy Kochi bus
stand. Crowds, buses, vibrant energy. He notices a foreign
tourist studying a map, looking confused. Wide shot.
```

**Extension 1 (7s)**: `He watches the tourist for a moment. Other people walk past ignoring them. Kuttan debates. Then squares his shoulders and walks toward the tourist.`

**Extension 2 (7s)**: `He reaches the tourist and speaks — gestures + broken German. The tourist looks uncertain at first, tilting their head.`

### Sequence B — The Win (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Medium shot at the bus stand. He gestures enthusiastically,
pointing directions. The tourist nods, smiling broadly.
```

**Extension 1 (7s)**: `The tourist waves gratefully and walks off in the direction Kuttan pointed. Kuttan watches them go. Stands still for a moment.`

**Extension 2 (7s)**: `He turns back. A huge grin spreads across his face. Walks away with a bounce in his step. Camera holds on his smiling face.`

### Text Overlays (7 lines — Tier A budget)
```
[0:00]  "A German tourist. Lost. In Kochi."
[0:12]  "Kuttan walks up."
[0:20]  "Geradeaus... dann links?"
[0:28]  (gestures + broken German)
[0:36]  "Danke!"
[0:42]  (huge grin)
[0:50]  Chapter 9: Transport & Directions
```

### Malayalam Narration (4 bursts)
```
[0:03]  "ഒരു German tourist. Kochi bus stand-ൽ lost."
[0:12]  "കുട്ടൻ ആലോചിക്കുന്നു... try ചെയ്യണോ? — അതെ."
[0:24]  "ആദ്യത്തെ real German conversation."
[0:36]  "Danke. It worked."
```

### Audio
- Ambient: bus horns, crowd noise, announcements
- Music: builds to triumphant moment at "Danke"

---

## Video 10 — Study Group: Teaching Others
**TIER: B | Duration: ≤40s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 10 opener
**German level**: Teaching with own gaps visible
**Story**: Kuttan teaches friends body parts in German. Gets corrected on "das Knie." Accepts gracefully. Teacher revealing his own gaps.

### Sequence A — The Teacher (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Standing in a Kerala living room. Three friends sit on the
floor, phones out. Evening light. He points to his head,
teaching confidently. Warm, playful group energy.
```

**Extension 1 (7s)**: `He points to body parts — head, hand, stomach — with confident teacher energy. His friends repeat after him, some laughing.`

**Extension 2 (7s)**: `One friend holds up their phone and says something. Kuttan pauses mid-gesture. His confident expression falters. He double-checks something.`

**Extension 3 (7s)**: `He laughs, admitting the mistake. Opens his notebook and writes the correction. Everyone laughs together. Learning moment for all.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "He teaches what he knows."
[0:14]  "Der Kopf. Die Hand. Der Bauch."
[0:24]  (friend corrects him)
[0:30]  "Das Knie. You're right."
[0:36]  Chapter 10: Health & Body
```

### Malayalam Narration (3 bursts)
```
[0:03]  "ഇന്ന് teacher ആണ്. Friends-നെ German പഠിപ്പിക്കുന്നു."
[0:18]  "ഒരു friend correct ചെയ്തു — 'das Knie'."
[0:30]  "Accept ചെയ്തു. Notebook-ൽ fix ചെയ്തു. Teacher-ഉം student-ഉം."
```

### Audio
- Ambient: living room sounds, laughter, casual chatter
- Music: light, warm group energy

---

## Video 11 — Kochi Café: A German Customer
**TIER: B | Duration: ≤45s | Veo calls: 4 (1 × 4)**

**Module trigger**: Module 11 opener
**German level**: Natural, unhesitating
**Story**: Café. German couple struggling to order. Kuttan leans over and translates — German to couple, Malayalam to waiter. The German man pats his shoulder.

### Sequence A — The Assist (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Sitting alone at a cozy Kochi café table. Notebook and coffee
in front of him. At the next table, a German couple looks
frustrated trying to order. The waiter looks confused. Warm
café lighting.
```

**Extension 1 (7s)**: `Kuttan glances over. Watches the struggle for a moment. Then leans toward the other table naturally and speaks. They look surprised, then relieved.`

**Extension 2 (7s)**: `He turns to the waiter and explains smoothly. Transaction completes. The German man reaches over and pats Kuttan's shoulder warmly.`

**Extension 3 (7s)**: `Kuttan smiles modestly and turns back to his own table. Picks up his coffee. Sits taller than before.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "He doesn't think twice anymore."
[0:16]  "Kann ich helfen?"
[0:24]  (translates to waiter)
[0:32]  "Danke sehr!"
[0:40]  Chapter 11: Work & Professional Life
```

### Malayalam Narration (3 bursts)
```
[0:03]  "ഇനി ആലോചിച്ച് നിൽക്കുന്നില്ല."
[0:16]  "German-ൽ couple-നോടും Malayalam-ൽ waiter-നോടും### Audio
- Ambient: espresso machine, soft café chatter
- Music: warm, confident, swells at shoulder pat

---

## Video 12 — Kerala Backwaters: The Phone Call
**TIER: A | Duration: ≤50s | Veo calls: 6 (2 × 3)**

**Module trigger**: Module 12 opener
**German level**: Emotional, complex German
**Story**: Golden hour. Kuttan by the backwaters, calling Raju. They joke in German. A quiet moment looking at the water. Kerala on one side, Germany on the other.

### Sequence A — The Conversation (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Sitting alone on the bank of Kerala backwaters. Still water,
coconut trees reflected. Golden hour light. Phone to his ear.
He smiles and laughs. Wide establishing shot. Deeply nostalgic,
warm.
```

**Extension 1 (7s)**: `He speaks easily into the phone, relaxed and animated. Gestures as he talks. Laughs at something the other person said. Natural, flowing.`

**Extension 2 (7s)**: `The laughter fades. A quieter moment. He looks out at the still water. Something bittersweet crosses his expression.`

### Sequence B — The Stillness (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Close-up by the Kerala backwaters. Golden hour. He lowers the
phone from his ear. Looks at the water. Soft smile. Bittersweet,
nostalgic.
```

**Extension 1 (7s)**: `He puts the phone in his pocket. Sits quietly. Watches a boat drift slowly across the backwater in the distance. Golden reflections on the water.`

**Extension 2 (7s)**: `Wide shot pulling back. Kuttan small against the vast backwater landscape. Coconut trees, golden sky. A figure between two worlds.`

### Text Overlays (7 lines — Tier A budget)
```
[0:00]  "The backwaters. His thinking spot."
[0:14]  (on phone, laughing)
[0:24]  "Ich vermisse Kerala schon jetzt."
[0:34]  (quiet beat)
[0:40]  "He's not even gone yet."
[0:46]  Chapter 12: Hobbies, Weather & Plans
```

### Malayalam Narration (2 bursts — let visuals carry)
```
[0:05]  "Raju-വിനെ call ചെയ്യുന്നു. German-ൽ joke ചെയ്യുന്നു."
[0:28]  "'Ich vermisse Kerala schon jetzt.' — പോയിട്ടില്ല, പക്ഷേ miss ചെയ്യുന്നു."
```

### Audio
- Ambient: water lapping, distant birds, boat motor
- Music: gentle Kerala-German fusion — sitar and soft piano
- **This is the emotional core of the series. Score should be understated and beautiful.**

---

## Video 13 — Kochi Exam Centre: Registration Day
**TIER: B | Duration: ≤40s | Veo calls: 4 (1 × 4)**

**Module trigger**: Modules 13–14 opener
**German level**: Near-perfect, formal
**Story**: Goethe Institut Kochi. Registration for A1. Fills form in German. Brief German exchange. Confident. Walks out into Kochi sun.

### Sequence A — The Registration (29s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Walking into
a clean, professional building interior. Glass doors, posters
on walls. Determined, composed.
```

**Extension 1 (7s)**: `He approaches the reception counter. Speaks with quiet confidence. The receptionist looks up. He fills out a form carefully, pen moving steadily.`

**Extension 2 (7s)**: `He slides the completed form across the counter. The receptionist smiles and hands him a printed confirmation. He reads it. Composed satisfaction.`

**Extension 3 (7s)**: `He walks through glass doors into warm Kochi sunlight. Takes a deep breath. Looks down at the confirmation in his hand. Small, private smile.`

### Text Overlays (5 lines — Tier B budget)
```
[0:00]  "Registration day."
[0:16]  "Ich möchte die A1-Prüfung anmelden."
[0:24]  "Sehr gut!"
[0:30]  (deep breath, walks out)
[0:36]  Chapter 13 & 14: Past Tense & Forms
```

### Malayalam Narration (2 bursts)
```
[0:05]  "Goethe Institut Kochi. Registration day."
[0:22]  "'Ich möchte die A1-Prüfung anmelden.' — Perfect. രണ്ട് ആഴ്ച."
```

### Audio
- Ambient: AC inside, traffic outside
- Music: confident, focused, resolves at the walk-out

---

## Video 14 — Goethe Exam Hall: The Final Boss
**TIER: A | Duration: ≤45s | Veo calls: 6 (2 × 3)**

**Module trigger**: Modules 15–18 opener
**German level**: Silent — everything has been building to this
**Story**: Exam day. Kuttan walks in. Sits. Paper face-down. Closes his eyes. One breath. Opens them. Ready.

### Sequence A — The Walk In (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Walking into
a bright, quiet exam hall. Rows of white desks, fluorescent
lighting. Other characters seated. Formal, tense. Cinematic
silence.
```

**Extension 1 (7s)**: `He finds his desk. Sits down carefully. Places his backpack beside the chair. A sealed exam booklet face-down on the desk in front of him. Pen placed parallel.`

**Extension 2 (7s)**: `He stares at the sealed booklet. Closes his eyes. One slow, deep breath. Shoulders drop. Inner calm washing over him.`

### Sequence B — The Moment (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes. Extreme close-up of his face. Eyes closed.
Exam hall. Fluorescent light. Perfect stillness. Calm,
determined.
```

**Extension 1 (7s)**: `His eyes open. Calm. Steady. Clear. He looks down at the exam booklet. No fear. Pure readiness. A hand from off-screen turns the booklet face-up.`

**Extension 2 (7s)**: `His eyes drop to the page. He picks up his pen. Close-up on his hand — steady, confident strokes. Camera slowly pulls back to show the full exam hall. Everyone writing. He's one of them now.`

### Text Overlays (7 lines — Tier A budget)
```
[0:00]  "The day."
[0:14]  "Every word he learned."
[0:20]  "Every late night."
[0:26]  "Every mistake he fixed."
[0:34]  (one breath)
[0:40]  "It's all in there."
[0:44]  Chapters 15–18: Review & Exam Prep
```

### Malayalam Narration
**None. Pure silence. This is the most powerful version of this video.**

### Audio
- **Complete silence** — clock ticking, subtle paper shuffle only
- **No music** — this is the one video that earns and demands complete silence
- The contrast with every other video makes this devastating

---

## Video 15 — Kochi Airport: Boarding the Plane
**TIER: A | Duration: ≤75s | Veo calls: 9 (3 × 3)**

**Module trigger**: A1 Course completion
**German level**: Earned, effortless, joyful
**Story**: BESTANDEN. Kuttan at Kochi airport. Boarding pass in hand. Calls Amma — she cries. One last look at Kerala sky. Walks through the gate. "A2 — Coming Soon."

### Sequence A — The Result (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Standing in
a bright airport terminal. Rolling suitcase beside him. He
looks at a paper in his hand. A smile breaks slowly across
his face. Warm, earned, emotional.
```

**Extension 1 (7s)**: `The smile grows wider. He reads the boarding pass again. Breathes in deep. His eyes glisten. This is real.`

**Extension 2 (7s)**: `He pulls out his phone and calls. Holds the phone to his ear. When they answer, his expression shifts — emotion rising. He speaks quietly, warmly. His eyes well up but he holds it together.`

### Sequence B — The Walk (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Airport
terminal. He puts his phone away. Picks up his rolling suitcase.
Begins walking forward. Determined, emotional.
```

**Extension 1 (7s)**: `He walks through the terminal. People around him, but camera follows only him. Each step purposeful. He stops. Turns. Looks back through the terminal window — golden Kerala sky, coconut trees in the distance. A long look.`

**Extension 2 (7s)**: `He turns forward again. The boarding gate ahead. He walks toward it. Steady, unhurried. Rolling suitcase wheels on the floor. Each step an arrival.`

### Sequence C — The Gate (22s Veo)

**Initial clip (8s)**:
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Standing at
the boarding gate. One more breath. Small, private smile.
Golden light from the terminal windows.
```

**Extension 1 (7s)**: `He steps through the boarding gate. His figure moves into the jet bridge corridor. The light shifts — warm Kerala gold to cooler artificial light.`

**Extension 2 (7s)**: `Camera stays on the empty spot where he stood. The terminal window shows Kerala sky. Golden light. Slow fade. The space where he was is quiet now. Everything else moves on.`

### Text Overlays (8 lines — Tier A budget)
```
[0:00]  (silence — just the terminal)
[0:06]  "BESTANDEN."
[0:14]  (looks at boarding pass)
[0:22]  (calls home)
[0:30]  "Amma... pass aayi."
[0:42]  (one last look at Kerala sky)
[0:55]  "Kerala → Frankfurt."
[1:00]  "Herzlichen Glückwunsch. A2 — Coming Soon."
```

### Malayalam Narration (3 bursts)
```
[0:06]  "BESTANDEN. Pass ആയി."
[0:22]  "അമ്മയെ call ചെയ്യുന്നു. 'Amma... pass aayi.'"
[0:42]  "ഒരു last look. Kerala sky. Coconut trees. നടന്നു. കടന്നു."
```

### Audio Direction
- [0:00–0:20]: Airport ambient — PA announcements, rolling suitcases. Near silence.
- [0:22–0:40]: **"Amma... pass aayi."** — ONE spoken line in all 15 videos. Use Google Cloud TTS `ml-IN-Chirp3-HD-Kore` or best-selected voice. Emotional, quiet, earned. Not performed — felt.
- [0:42–1:00]: Kerala-German fusion score begins — sitar and piano, building slowly
- [1:00–end]: Full emotional resolution. Score swells and fades as gate closes.
- **This is the audio climax of the entire course. Do not rush it.**

### Technical Notes
- Only video that earns ≥70s runtime
- Consider upgrading to Standard model if budget allows after pilot approval
- Generate "Amma... pass aayi" in 3 variants; pick the most emotionally restrained one
- Sequence C extension 2 (empty terminal + fade) can be done in Remotion if Veo struggles with "empty space" shots

---

## Production Summary

| Video | Tier | Duration Cap | Sequences | Veo Calls | Model |
|---|---|---|---|---|---|
| 1 | A | ≤65s | 2 | 6 | Fast |
| 2 | B | ≤40s | 1 | 4 | Fast |
| 3 | B | ≤40s | 1 | 4 | Fast |
| 4 | A | ≤55s | 2 | 6 | Fast |
| 5 | A | ≤50s | 2 | 6 | Fast |
| 6 | B | ≤40s | 1 | 4 | Fast |
| 7 | B | ≤35s | 1 | 4 | Fast |
| 8 | B | ≤35s | 1 | 4 | Fast |
| 9 | A | ≤55s | 2 | 6 | Fast |
| 10 | B | ≤40s | 1 | 4 | Fast |
| 11 | B | ≤45s | 1 | 4 | Fast |
| 12 | A | ≤50s | 2 | 6 | Fast |
| 13 | B | ≤40s | 1 | 4 | Fast |
| 14 | A | ≤45s | 2 | 6 | Fast |
| 15 | A | ≤75s | 3 | 9 | Fast/Standard |
| **Total** | | | | **~83 calls** | |

---

## German Progression Summary

| Video | Kuttan's German | Key Moment |
|---|---|---|
| 1 | None | The decision forms |
| 2 | First broken word | "Goo... Guten Morgen?" |
| 3 | Writes it | "Entschuldigung" — caught from a stranger |
| 4 | Broken sentence | "Mein Name ist Kuttan. Ich bin... aus Kerala." |
| 5 | Drilling | "ich arbeite, du arbeitest, er arbeitet" — 1 AM |
| 6 | First full sentence | "Ich möchte Kaffee, bitte." — Raju approves |
| 7 | Functional | "Wie viel kostet das?" — talking to products |
| 8 | Descriptive | "Das ist mein Zimmer. Es gibt ein Bett..." |
| 9 | Two-way | "Geradeaus... dann links?" — first real exchange |
| 10 | Teaching + correcting | "Das Knie. You're right." |
| 11 | Natural | "Kann ich helfen? Was möchten Sie?" — unhesitating |
| 12 | Emotional | "Ich vermisse Kerala schon jetzt." — bittersweet |
| 13 | Formal | "Ich möchte die A1-Prüfung anmelden." — composed |
| 14 | Silent | Everything preceded this moment |
| 15 | Earned | "Amma... pass aayi." |

---

> v4.0 — Pilot-gated production, streamlined overlays, Tier A/B separation, hardened emotional pacing, narration budget per tier
> Changes from v3: overlay budgets enforced, narration trimmed, Tier A/B production differentiation, duration caps, silence rules for Videos 5 and 14
