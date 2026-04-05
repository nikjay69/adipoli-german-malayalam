# AI Cinematic Scripts — Adipoli German: A1 (v3.0)
> Kuttan's Journey: Kerala → Kochi Airport → Boarding the Plane
> Version: 3.0 | Updated: 2026-04-05
> **Veo 3.1** + Pixar 3D Style + Multi-Sequence Architecture + Malayalam Narration
>
> **A1 Rule:** Kuttan does NOT reach Germany in A1.
> A1 ends with him boarding the plane. Germany is A2.
> **Arc Rule:** Kuttan's German visibly improves from Video 1 to Video 15.

---

## Verbatim Blocks — Copy Into Every Prompt

### STYLE BLOCK (identical in every prompt)

```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation.
```

### CHARACTER BLOCK (identical except outfit tier)

```
The young Indian man from the reference images,
[OUTFIT — see tier below], carrying a small black backpack.
```

**Outfit Tiers:**
- **Videos 1–6:** `wearing a casual white cotton shirt, jeans, rubber slippers`
- **Videos 7–12:** `wearing a neat green collared shirt, jeans, brown shoes`
- **Videos 13–15:** `wearing a clean formal blue shirt, dark trousers, polished shoes`

> **Backpack rule:** Include "carrying a small black backpack" in wide/medium shots where the backpack would be visible. Omit for close-ups and indoor seated shots where it wouldn't be seen.

### NEGATIVE PROMPT (same for all calls)

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
    "seed": 42,
    "sampleCount": 1,
    "personGeneration": "allow_adult",
    "negativePrompt": "No text overlays. No subtitles. No watermark. No hat. No glasses. No beard. No realistic style. No live action. No anime.",
    "storageUri": "gs://adipoli-veo/output/"
  }
}
```

> **Model:** `veo-3.1-fast-generate-001` for all 15 videos. Budget allows upgrading emotional anchors (1, 4, 14, 15) to Standard if pilot quality is acceptable with Fast.

> **Prompt rewriter:** Cannot be disabled on Veo 3.1. All initial prompts are 40-60+ words, which minimizes rewriter interference. Rely on reference images + verbatim blocks + negativePrompt for consistency.

> **negativePrompt:** Included in `parameters` block (camelCase). Do NOT append negative instructions to the positive prompt.

Reference images: 3 Kuttan Pixar poses (front, three-quarter, profile) attached as `referenceType: "asset"` with `"mimeType": "image/png"` on every **initial** clip. Reference images require exactly 16:9 aspect ratio and 8s duration. Extensions use the previous clip as input (no reference images needed).

> **Extension prompt tip:** Prefix each extension with a brief style anchor (e.g., "Continuing Pixar-style 3D animation:") to reduce style drift across consecutive extensions. Veo's extension API inherits visual context from the source clip but a text reminder helps maintain consistency.

---

## Narrator Voice

**Malayalam third-person storyteller.** Warm, conversational, like a friend telling you about Kuttan. Not a teacher voice. Not formal. Thinks Kuttan is endearing and brave.

**TTS:** Google Cloud TTS Chirp 3 HD — `ml-IN-Chirp3-HD-Kore` (or test alternatives: Aoede, Puck, Fenrir)

Malayalam narration text below is provided in Malayalam script with English translations in parentheses for review.

---

## German Progression Key

| Videos | Kuttan's German | What it sounds like |
|--------|----------------|---------------------|
| 1 | Zero German | Doesn't attempt it |
| 2 | First broken word | "Goo... Guten Morgen?" — mangles it |
| 3–4 | First written/spoken attempts | "Entschuldigung" (written) / "Mein Name ist Kuttan" (broken) |
| 5–6 | Short phrases, wrong stress | "Ich bin... Kuttan. Ja?" |
| 7–8 | Simple sentences, grammar errors | "Ich möchte ein... the ticket?" |
| 9–10 | More confident, self-correcting | Starts a sentence, fixes it mid-way |
| 11–12 | Mostly correct, occasional slip | Natural rhythm emerging |
| 13–14 | Exam-ready, composed | Answers clearly, small smile after |
| 15 | Clean, confident, earned | No hesitation |

---

## Video 1 — Kerala Home: The Spark

**Module trigger:** Course intro / Module 1 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 sequences × 4) | **Model:** Fast
**German level:** Zero — Kuttan knows nothing yet

**Story:** Late evening. Kuttan watches a reel of a Malayali guy in Germany. He watches it three times. Something shifts. A decision forms.

---

### Sequence A — The Room, The Phone (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. He sits cross-legged
on a Kerala home floor. Terracotta tiles, wooden furniture, brass
nilavilakku lamp glowing. Evening. Wide establishing shot. Warm,
intimate.
```

**Extension 1 (7s):** `He picks up his phone. The screen lights up his face blue-white. He watches something intently, eyes widening slightly.`

**Extension 2 (7s):** `He taps the screen to replay. Watches again, leaning closer. His expression shifts from curiosity to something deeper.`

**Extension 3 (7s):** `He lowers the phone slowly to his lap. Stares ahead at the ceiling fan turning lazily above. Processing.`

### Sequence B — The Shift (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up of his face in warm lamplight. Kerala bedroom.
Evening. Thoughtful, still expression. Soft focus background.
```

**Extension 1 (7s):** `A slow smile spreads across his face. Not a grin — quieter. His gaze sharpens, jaw sets slightly with resolve.`

**Extension 2 (7s):** `He sits up straighter. Looks around the room — at the lamp, the walls, the window. His eyes scan each object with fresh curiosity.`

**Extension 3 (7s):** `He picks up his phone again with new purpose. Opens it. The light on his face is warmer now. Camera slowly pulls back to show the full room.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Kerala. An ordinary evening."
[0:15]       (he watches the reel)
[0:25]       (replays it)
[0:32]       (lowers phone, stares at ceiling fan)
[0:40]       "But something just changed."
[0:50]       "Kuttan's German journey starts now."
[0:54]       "He knows zero words."
[0:56]       "Let's fix that."
[0:61–0:65]  CHAPTER CARD: "Chapter 1: First Steps" (Remotion bookend)
```

### Malayalam Narration (translate to Malayalam)
```
[0:03] "ഒരു സാധാരണ വൈകുന്നേരം. കുട്ടൻ ഫോണിൽ ഒരു reel കാണുകയാണ്."
       (An ordinary evening. Kuttan is watching a reel on his phone.)
[0:15] "ജർമ്മനിയിൽ ഒരു മലയാളി ചേട്ടൻ. Frankfurt-ൽ നടക്കുന്നു, ചിരിക്കുന്നു, German-ൽ സംസാരിക്കുന്നു."
       (A Malayali guy in Germany. Walking in Frankfurt, laughing, speaking German.)
[0:30] "കുട്ടൻ മൂന്ന് തവണ replay ചെയ്തു."
       (Kuttan replayed it three times.)
[0:40] "എന്തോ ഒന്ന് മാറി."
       (Something changed.)
[0:50] "ഇവിടെ നിന്നാണ് തുടങ്ങുന്നത്. Zero German."
       (This is where it starts. Zero German.)
```

### Audio Direction
- Ambient: ceiling fan hum, distant rain, crickets
- Music: none until [0:50], then a single warm piano note swells
- No Veo audio (muted)

### Technical Notes
- This is the **pilot video** — validate full pipeline here before batch
- Start with Veo 3.1 Fast. Upgrade to Standard if quality insufficient (budget allows it)
- Both sequences need warm Kerala evening lighting — include in every extension prompt

---

## Video 2 — Kerala Neighbourhood: First Attempt

**Module trigger:** Module 2 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** Zero → first broken word

**Story:** Kuttan walks to the tea stall. Shows his friend Aby what he's been practicing. Tries "Guten Morgen" — mangles it completely. Tries again.

---

### Sequence A — The Walk to Tea Stall (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. He walks along a
narrow Kerala village road. Coconut trees, a small tea stall,
parked scooters. Warm afternoon. Wide shot, gentle tracking.
Playful, warm mood.
```

**Extension 1 (7s):** `He arrives at a small colorful tea stall. A friend his age sits on a bench with tea. The friend waves. Kuttan sits down next to him, excited about something.`

**Extension 2 (7s):** `He pulls out his phone and shows something to his friend. Points at the screen enthusiastically. His friend looks curious, leans in to see.`

### Sequence B — The Attempt (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Medium shot at a Kerala tea stall. He takes a breath,
tries to say something unfamiliar. His mouth shapes a strange
word. Playful, warm.
```

**Extension 1 (7s):** `His friend bursts out laughing. Kuttan laughs too, embarrassed but determined. He holds up a finger — "wait, wait" — and tries again.`

**Extension 2 (7s):** `He says it more carefully this time. His friend nods, still smiling. Kuttan pumps his fist slightly. Close-up on his grinning face. Small victory.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Day 3."
[0:08]       "He tells his friend about the plan."
[0:22]       "Goo... Guten Morgen?"
[0:26]       (friend laughs)
[0:30]       "Again."
[0:34]       "Guten Morgen!"
[0:38]       "Better."
[0:42–0:45]  CHAPTER CARD: "Chapter 2: Introducing Yourself"
```

### Malayalam Narration
```
[0:03] "മൂന്നാം ദിവസം. കുട്ടൻ ചായക്കടയിലേക്ക് പോകുന്നു."
       (Day three. Kuttan heads to the tea stall.)
[0:10] "സുഹൃത്ത് Aby-യോട് plan പറയുന്നു."
       (Tells his friend Aby about the plan.)
[0:22] "ആദ്യത്തെ German word try ചെയ്യുന്നു... Guten Morgen."
       (Tries his first German word... Guten Morgen.)
[0:28] "ശരിക്കും കുളമായി. പക്ഷേ വീണ്ടും try ചെയ്യുന്നു."
       (Completely messed it up. But tries again.)
[0:36] "ഇത്തവണ better ആയി!"
       (This time, better!)
```

### Audio Direction
- Ambient: autorickshaw, birdsong, tea stall clinking
- Music: light playful percussion from [0:08], builds warmly

---

## Video 3 — Kochi City: The Poster

**Module trigger:** Module 3 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** A few words — trying phrases

**Story:** Kuttan in Kochi, spots a Goethe Institut poster. Takes a photo. Notices a foreign tourist asking for directions. Catches one word: "Entschuldigung." Writes it in his notebook.

---

### Sequence A — The Poster (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers, carrying a small black backpack. Walking on a busy
Kochi city street. Modern buildings, colorful signs. Golden hour
light. He stops suddenly, looking at something on a wall. Urban,
aspirational mood.
```

**Extension 1 (7s):** `He reads a poster on the wall — something official-looking with text. He pulls out his phone and takes a photo of it. Studies the photo on his screen.`

**Extension 2 (7s):** `Nearby, a tall foreign-looking animated character talks to a local, looking confused and gesturing. Kuttan turns and watches them, ears perked up. Listening intently.`

### Sequence B — The Notebook (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up, standing on a Kochi street. He opens a small
notebook, thinking. Pen in hand. Golden hour light on his face.
Curious, determined expression.
```

**Extension 1 (7s):** `He writes something carefully in his notebook. Close-up on the pen moving across the page. He looks at what he wrote, nodding slowly.`

**Extension 2 (7s):** `He closes the notebook and puts it in his backpack. Looks in the direction the tourist went. A quiet resolve on his face. Walks forward with new purpose.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Kochi. Three weeks in."
[0:12]       (stops at poster)
[0:16]       "Goethe Institut. A1 Prüfung."
[0:22]       (tourist nearby asking for directions)
[0:28]       "He can't speak yet. But he listens."
[0:34]       (opens notebook, writes: "Entschuldigung")
[0:38]       "Next time, I'll speak."
[0:42–0:45]  CHAPTER CARD: "Chapter 3: Numbers, Time & Dates"
```

### Malayalam Narration
```
[0:03] "Kochi. മൂന്ന് ആഴ്ച കഴിഞ്ഞു."
       (Kochi. Three weeks in.)
[0:12] "Goethe Institut poster. A1 exam."
       (Goethe Institut poster. A1 exam.)
[0:22] "ഒരു German tourist-നെ കണ്ടു. Directions ചോദിക്കുന്നു."
       (He sees a German tourist asking for directions.)
[0:28] "കുട്ടന് answer അറിയാം. പക്ഷേ വാക്കുകൾ ഇല്ല."
       (Kuttan knows the answer. But doesn't have the words.)
[0:34] "ഒരു വാക്ക് catch ചെയ്തു — Entschuldigung. Notebook-ൽ എഴുതി."
       (Caught one word — Entschuldigung. Wrote it in his notebook.)
```

### Audio Direction
- Ambient: city traffic, metro distant, Malayalam crowd chatter
- Music: curious, building slightly, ends on a determined note

---

## Video 4 — Kerala Home: The Family Question

**Module trigger:** Module 4 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** First full (broken) sentence attempt

**Story:** Dinner table. Amma asks Kuttan to say something in German. He tries: "Mein Name ist Kuttan. Ich bin... aus Kerala." Family reacts — impressed, amused, proud.

---

### Sequence A — The Family Dinner (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting at a Kerala family dinner — steel plates, rice,
curry. Parents and younger sister around him. Warm tungsten
kitchen light. Cozy, intimate family scene.
```

**Extension 1 (7s):** `His mother gestures at him expectantly, smiling — clearly asking him to do something. His sister watches with curious anticipation.`

**Extension 2 (7s):** `He puts down his food, clears his throat with mock seriousness. The family watches. He takes a breath and opens his mouth to speak.`

**Extension 3 (7s):** `He speaks carefully, mouth forming unfamiliar shapes. His father slowly looks up from his plate. His sister covers her mouth, suppressing a laugh.`

### Sequence B — The Reaction (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up at a dinner table. He finishes speaking
something difficult. Slight nervousness, waiting for a reaction.
Warm tungsten kitchen light.
```

**Extension 1 (7s):** `His mother claps once, delighted. His father nods slowly with a small proud smile. His sister laughs openly now.`

**Extension 2 (7s):** `He grins wide — relieved and pleased with himself. Picks up his food again. The family continues eating, the mood warmer than before.`

**Extension 3 (7s):** `Wide shot of the family at the table. Warm light. Everyone eating together. A small German notebook visible next to his plate. Peaceful, happy moment.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Home."
[0:08]       "Amma wants to hear it."
[0:18]       (family looking at him)
[0:24]       "Mein Name ist Kuttan."
[0:30]       "Ich bin... aus Kerala."
[0:36]       (father looks up)
[0:40]       (sister laughs)
[0:48]       "Good enough for Amma."
[0:61–0:65]  CHAPTER CARD: "Chapter 4: Family & People" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "അമ്മ German കേൾക്കണം."
       (Amma wants to hear German.)
[0:18] "കുട്ടൻ try ചെയ്യുന്നു..."
       (Kuttan tries...)
[0:24] "'Mein Name ist Kuttan. Ich bin aus Kerala.'"
       (Direct quote — German TTS here)
[0:36] "അച്ഛൻ impressed ആയി. അനിയത്തി ചിരിക്കുന്നു."
       (Father is impressed. Younger sister is laughing.)
[0:48] "അമ്മയ്ക്ക് ഇത് enough ആയിരുന്നു. പക്ഷേ കുട്ടന് ഇത് just the beginning."
       (For Amma, this was enough. But for Kuttan, this is just the beginning.)
```

### Audio Direction
- Ambient: plates clinking, ceiling fan, kitchen warmth
- Music: warm background score, swells at mother's clap

---

## Video 5 — Late Night Study: The Grind

**Module trigger:** Module 5 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Drilling verbs — mechanical but building

**Story:** 1 AM. Kuttan at his desk drilling verbs. Gets it wrong. Tries again. Gets it right. Circles it in his notebook. Pure determination.

---

### Sequence A — The Struggle (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting at a small wooden desk at night. Single desk
lamp. Phone screen glowing. Notebook open. 1 AM atmosphere.
Intimate, quiet, determined.
```

**Extension 1 (7s):** `He mouths words carefully, pointing at his notebook with a pen. His eyebrows furrow in concentration. He traces words on the page.`

**Extension 2 (7s):** `He shakes his head — got something wrong. Erases and rewrites in his notebook. Rubs his tired eyes. Tries again from the beginning.`

**Extension 3 (7s):** `Close-up on his face in lamplight. Tired but stubborn. He mouths the words one more time, slowly and carefully. Counting on his fingers.`

### Sequence B — The Victory (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up at a desk. Night. Notebook with handwritten
conjugation tables visible. Single lamp light. His expression
shifts from concentration to realization.
```

**Extension 1 (7s):** `His eyes light up. He nods — got it right. He circles something in his notebook with his pen, firmly and triumphantly.`

**Extension 2 (7s):** `He leans back in his chair, stretching. A small satisfied smile. Looks at the notebook page filled with his handwriting. Progress.`

**Extension 3 (7s):** `Wide shot of the room. His small desk lamp is the only light. The rest of the house is dark and sleeping. He closes the notebook and rests his hand on it. Quiet pride.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "1:07 AM."
[0:08]       "The family is asleep."
[0:20]       (mouthing verbs)
[0:26]       "ich arbeite... du arbeitest..."
[0:34]       (shakes head, tries again)
[0:42]       "Again."
[0:48]       "ich arbeite, du arbeitest, er arbeitet."
[0:52]       (circles it — got it)
[0:61–0:65]  CHAPTER CARD: "Chapter 5: Daily Routines & Verbs" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "രാത്രി ഒരു മണി. എല്ലാവരും ഉറങ്ങി."
       (One AM. Everyone's asleep.)
[0:20] "Verbs drill ചെയ്യുകയാണ്. ich arbeite, du arbeitest..."
       (Drilling verbs. ich arbeite, du arbeitest...)
[0:34] "തെറ്റി. വീണ്ടും. വീണ്ടും."
       (Wrong. Again. Again.)
[0:48] "ഇത്തവണ ശരിയായി. Notebook-ൽ circle ചെയ്തു."
       (This time, correct. Circled it in the notebook.)
[0:52] "ഇങ്ങനെയാണ് German പഠിക്കുന്നത്. ഓരോ രാത്രിയും."
       (This is how you learn German. One night at a time.)
```

### Audio Direction
- Ambient: deep night silence, distant dog, fan hum
- Music: **none** — raw silence throughout, only ambient
- The absence of music makes this video hit differently

---

## Video 6 — Video Call: Someone Already There

**Module trigger:** Module 6 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** Attempting real conversation for the first time

**Story:** Video call with cousin Raju in Germany. Raju tests him. Kuttan stumbles, checks notebook, gets a sentence right. First glimpse of what's coming.

---

### Sequence A — The Call (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Sitting on his bed in a Kerala room, laptop open on
his lap. His face lit by the laptop screen. Night. He listens
intently to something from the screen. Intimate, warm.
```

**Extension 1 (7s):** `He speaks carefully, gesturing with his hands. His expression shifts from concentration to uncertainty. He pauses mid-sentence, searching for a word.`

**Extension 2 (7s):** `He reaches for his notebook beside him, flips through pages quickly. Finds what he needs. Looks back at the laptop screen with renewed confidence.`

### Sequence B — The Landing (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a casual white cotton shirt, jeans, rubber
slippers. Close-up, face lit by laptop screen. Night. He speaks
a complete sentence with careful precision. Slight nervousness
turning to hope.
```

**Extension 1 (7s):** `A smile breaks across his face — someone on the screen must have approved. He does a small celebratory gesture. Laughing with relief.`

**Extension 2 (7s):** `He leans back, still grinning. Looks at his notebook, then back at the screen. The laptop light feels warmer now. Forward-looking, hopeful energy.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "His cousin Raju. Germany, 2 years."
[0:12]       (Raju speaks German at him)
[0:18]       "Ich... möchte... ein...?"
[0:24]       (checks notebook)
[0:30]       "Ich möchte Kaffee, bitte."
[0:36]       (Raju claps)
[0:40]       "Closer."
[0:42–0:45]  CHAPTER CARD: "Chapter 6: Food & Ordering"
```

### Malayalam Narration
```
[0:03] "Cousin Raju. Germany-യിൽ രണ്ട് വർഷമായി."
       (Cousin Raju. Two years in Germany.)
[0:12] "Raju German-ൽ test ചെയ്യുന്നു."
       (Raju tests him in German.)
[0:18] "കുട്ടൻ try ചെയ്യുന്നു... stumble ചെയ്യുന്നു... notebook check ചെയ്യുന്നു."
       (Kuttan tries... stumbles... checks his notebook.)
[0:30] "'Ich möchte Kaffee, bitte.' — ആദ്യത്തെ full sentence land ചെയ്തു!"
       ('Ich möchte Kaffee, bitte.' — His first full sentence lands!)
```

### Audio Direction
- Ambient: laptop fan, slight digital compression feel
- Music: warm, encouraging, builds at the successful sentence

---

## Video 7 — Kochi Mall: Practice in Public

**Module trigger:** Module 7 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** Shopping phrases — errors but functional

**Story:** Kuttan in a Kochi mall, practicing German on products. Whispers "Wie viel kostet das?" to a product. Shop assistant stares. Kuttan laughs it off. Keeps practicing.

---

### Sequence A — The Practice (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes,
carrying a small black backpack. Browsing shelves in a modern
colorful supermarket. Bright fluorescent lighting. He picks up
a product and examines it. Playful, self-aware mood.
```

**Extension 1 (7s):** `He holds the product up and mouths something at it quietly. His lips move forming unfamiliar words. He puts it back and picks up another one.`

**Extension 2 (7s):** `A shop assistant nearby notices him talking to products. Tilts their head, confused. Kuttan sees them watching and freezes awkwardly.`

### Sequence B — The Laugh (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Medium shot in a supermarket. He laughs awkwardly, waving his
hand in a "never mind" gesture. Playful, self-conscious moment.
```

**Extension 1 (7s):** `He walks away from the confused shop assistant, suppressing laughter. Turns a corner into another aisle. Immediately starts practicing again on a new product.`

**Extension 2 (7s):** `He holds up the product and whispers to it confidently this time. Nods to himself — better. Puts it back and walks on with a spring in his step. Self-aware grin.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Kochi. The training ground."
[0:10]       (holds up product)
[0:16]       "Wie viel kostet das?"
[0:22]       (shop assistant stares)
[0:28]       (laughs, waves it off)
[0:34]       (keeps practicing in the next aisle)
[0:38]       "Germany won't know what hit it."
[0:42–0:45]  CHAPTER CARD: "Chapter 7: Shopping & Prices"
```

### Malayalam Narration
```
[0:03] "Kochi mall — Kuttan-ന്റെ practice ground."
       (Kochi mall — Kuttan's practice ground.)
[0:16] "Product-നോട് German-ൽ: 'Wie viel kostet das?'"
       (Speaking German to a product: 'Wie viel kostet das?')
[0:22] "Shop assistant ശ്രദ്ധിച്ചു. Awkward!"
       (Shop assistant noticed. Awkward!)
[0:34] "Next aisle-ൽ വീണ്ടും practice. Man on a mission."
       (Back to practicing in the next aisle. Man on a mission.)
```

### Audio Direction
- Ambient: mall background music, AC hum, announcements
- Music: light, playful, comedic timing

---

## Video 8 — Kerala Home: Describing the Room

**Module trigger:** Module 8 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** Full descriptive sentences — still some errors

**Story:** Kuttan narrates his room in German like a tour guide. Hits a wall on "ceiling fan." Looks it up. "Einen Ventilator!" Writes it triumphantly.

---

### Sequence A — The Tour (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Standing in his Kerala bedroom. Basic furniture, study table,
calendar on wall, ceiling fan. He gestures around like a tour
guide. Warm afternoon light. Slightly comedic mood.
```

**Extension 1 (7s):** `He points at things one by one — the bed, the table, the window. Each time he mouths a word, confident. He moves through the room with exaggerated presenter energy.`

**Extension 2 (7s):** `He points up at the ceiling fan. His confident expression falters. Goes blank. He stares at the fan, clearly stuck on the word. Comedic beat.`

### Sequence B — The Lookup (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Close-up in his bedroom. He checks his phone, searching for
something. Afternoon light. Determined expression.
```

**Extension 1 (7s):** `His face lights up — found it! He looks up from his phone at the ceiling fan with a triumphant expression. Opens his notebook eagerly.`

**Extension 2 (7s):** `He writes in his notebook with satisfaction. Closes it with a pat. Looks around the room one more time with fresh eyes. Self-aware smile.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "His room. His classroom."
[0:10]       "Das ist mein Zimmer."
[0:16]       "Es gibt ein Bett, einen Tisch..."
[0:24]       (points at ceiling fan — blank look)
[0:30]       (checks phone)
[0:34]       "Einen Ventilator!"
[0:38]       (writes it down, triumphant)
[0:42–0:45]  CHAPTER CARD: "Chapter 8: Home & Living"
```

### Malayalam Narration
```
[0:03] "സ്വന്തം room-ൽ German tour guide ആകുന്നു."
       (Becoming a German tour guide in his own room.)
[0:10] "'Das ist mein Zimmer. Es gibt ein Bett, einen Tisch...'"
       (German TTS)
[0:24] "Ceiling fan... word മറന്നു!"
       (Ceiling fan... forgot the word!)
[0:34] "Phone-ൽ check ചെയ്തു. 'Ventilator!' Notebook-ൽ എഴുതി."
       (Checked on phone. 'Ventilator!' Wrote it in the notebook.)
```

### Audio Direction
- Ambient: afternoon fan, birds outside
- Music: light, warm, slightly comedic

---

## Video 9 — Kochi Bus Stand: Asking Directions

**Module trigger:** Module 9 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Full exchange attempt — broken but two-way

**Story:** Kuttan at Kochi bus stand. Spots a lost German tourist. Hesitates, then walks up. Gives broken directions in German. Tourist says "Danke." Kuttan walks away buzzing.

---

### Sequence A — The Approach (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes,
carrying a small black backpack. Standing at a busy, colorful
Kochi bus stand. Crowds, buses, vibrant energy. He notices
someone in the distance. Wide shot.
```

**Extension 1 (7s):** `He sees a tall foreign-looking animated character studying a map, clearly confused. Other people walk past ignoring them. Kuttan watches, debating.`

**Extension 2 (7s):** `He takes a breath. His expression shifts from hesitation to resolve. He squares his shoulders and walks toward the confused tourist.`

**Extension 3 (7s):** `He reaches the tourist and speaks. His hands gesture — pointing directions. The tourist looks uncertain at first, tilting their head.`

### Sequence B — The Connection (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Medium shot at a bus stand. He gestures enthusiastically,
explaining something with hand movements. A taller character
listens, nodding slowly. Warm, hopeful energy.
```

**Extension 1 (7s):** `The tourist's face brightens with understanding. They nod more firmly. Kuttan points confidently in a direction. The tourist smiles broadly.`

**Extension 2 (7s):** `The tourist waves gratefully and walks in the direction Kuttan pointed. Kuttan watches them go. Stands still for a moment.`

**Extension 3 (7s):** `He turns back around. A huge grin spreads across his face. He walks away with a bounce in his step, clearly thrilled. Camera holds on his smiling face.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "A German tourist. Lost. In Kochi."
[0:12]       "Kuttan walks up."
[0:22]       "Geradeaus... dann links?"
[0:30]       (tourist looks uncertain)
[0:36]       (gestures + broken German together)
[0:44]       "Danke!"
[0:48]       (Kuttan turns back, huge grin)
[0:52]       "It worked."
[0:61–0:65]  CHAPTER CARD: "Chapter 9: Transport & Directions" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "ഒരു German tourist. Kochi bus stand-ൽ lost."
       (A German tourist. Lost at Kochi bus stand.)
[0:12] "കുട്ടൻ ആലോചിക്കുന്നു... try ചെയ്യണോ?"
       (Kuttan thinks... should he try?)
[0:22] "'Geradeaus... dann links?' — ആദ്യത്തെ real German conversation!"
       ('Geradeaus... dann links?' — His first real German conversation!)
[0:44] "Tourist 'Danke' പറഞ്ഞു. It worked!"
       (The tourist said 'Danke'. It worked!)
[0:48] "ആ smile... ആ confidence... ഇത് earned ആണ്."
       (That smile... that confidence... this is earned.)
```

### Audio Direction
- Ambient: bus horns, crowd noise, announcements
- Music: builds to a small triumphant moment at "Danke"

---

## Video 10 — Study Group: Teaching Others

**Module trigger:** Module 10 opener
**Duration:** ~50s (44s Veo + bookends) | **Veo calls:** 6 (2 × 3) | **Model:** Fast
**German level:** Teaching — with own gaps becoming visible

**Story:** Kuttan teaches friends German body parts. Gets corrected on "das Knie." Accepts the correction gracefully. Teaching reveals his own gaps.

---

### Sequence A — The Teacher (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Standing confidently in a Kerala living room. Three friends sit
on the floor facing him, phones in hand. Evening light. He
points to his own head, teaching. Warm, playful group energy.
```

**Extension 1 (7s):** `He points to different body parts — head, hand, stomach — with confident teacher energy. His friends repeat after him, some laughing.`

**Extension 2 (7s):** `One friend holds up their phone and says something. Kuttan pauses mid-gesture. His confident expression falters. He double-checks something in his mind.`

### Sequence B — The Correction (22s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Close-up in a living room. He laughs, accepting something. A
good-natured "you got me" expression. Evening light. Warm mood.
```

**Extension 1 (7s):** `He nods, admitting the mistake. Opens his notebook and writes the correction down. His friends watch, appreciating his honesty.`

**Extension 2 (7s):** `He holds up the notebook showing the correction, then points at his knee with the right word this time. Everyone laughs together. Learning moment for all.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "He teaches what he knows."
[0:10]       "Der Kopf. Die Hand. Der Bauch."
[0:20]       (friend checks phone)
[0:26]       "'Das Knie' — not 'der Knie' (singular)"
[0:32]       (Kuttan laughs — "you're right")
[0:38]       (writes correction in notebook)
[0:42–0:45]  CHAPTER CARD: "Chapter 10: Health & Body"
```

### Malayalam Narration
```
[0:03] "ഇന്ന് teacher ആണ്. Friends-നെ German പഠിപ്പിക്കുന്നു."
       (Today he's the teacher. Teaching friends German.)
[0:10] "'Der Kopf. Die Hand. Der Bauch.' — confident ആയി."
       ('Der Kopf. Die Hand. Der Bauch.' — Confident.)
[0:26] "ഒരു friend correct ചെയ്തു — 'das Knie', 'der' അല്ല."
       (A friend corrected him — 'das Knie', not 'der'.)
[0:32] "Accept ചെയ്തു. Notebook-ൽ fix ചെയ്തു. Teacher-ഉം student-ഉം."
       (Accepted it. Fixed it in the notebook. Teacher and student.)
```

### Audio Direction
- Ambient: living room sounds, laughter, casual chatter
- Music: light, warm group energy

---

## Video 11 — Kochi Café: A German Customer

**Module trigger:** Module 11 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Sustained, natural — not performing anymore

**Story:** Kuttan at a café. German couple struggling to order. Kuttan leans over and translates — German to English for the couple, Malayalam for the waiter. Natural and unhesitating. The German man claps his shoulder.

---

### Sequence A — The Situation (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Sitting alone at a cozy Kochi café table. Notebook and coffee
in front of him. He studies quietly. Warm café lighting.
Peaceful, focused.
```

**Extension 1 (7s):** `At the next table, two older animated characters look frustrated, trying to communicate with a waiter. The waiter looks confused. Hand gestures back and forth.`

**Extension 2 (7s):** `Kuttan glances over. Watches the struggle for a moment. Then, without overthinking, he leans toward the other table naturally.`

**Extension 3 (7s):** `He speaks to the older characters. They look surprised, then relieved. He turns to the waiter and explains. Smooth translation. Natural confidence.`

### Sequence B — The Shoulder Pat (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Medium shot at a café. An older animated character reaches over
and pats his shoulder warmly. He smiles humbly. Warm, proud
moment.
```

**Extension 1 (7s):** `He smiles modestly and nods. Turns back to his own table. Picks up his coffee cup. Takes a sip.`

**Extension 2 (7s):** `He looks down at his notebook with a quiet smile. Warm golden light fills the café. He goes back to studying, sitting taller than before. More confident posture.`

**Extension 3 (7s):** `Wide shot of the café. Kuttan at his table, the couple at theirs. Normal café life. But we know what just happened. Warm, golden light.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "He doesn't think twice anymore."
[0:14]       (German couple struggling to order)
[0:24]       "Kann ich helfen? Was möchten Sie?"
[0:34]       (translates smoothly to waiter)
[0:42]       (German man pats his shoulder)
[0:48]       "Danke sehr!"
[0:52]       (turns back to his coffee — quiet smile)
[0:61–0:65]  CHAPTER CARD: "Chapter 11: Work & Professional Life" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "ഇനി ആലോചിച്ച് നിൽക്കുന്നില്ല."
       (He doesn't stop to think anymore.)
[0:14] "ഒരു German couple — order ചെയ്യാൻ struggle ചെയ്യുന്നു."
       (A German couple — struggling to order.)
[0:24] "കുട്ടൻ lean ചെയ്തു. 'Kann ich helfen?'"
       (Kuttan leaned over. 'Kann ich helfen?')
[0:34] "German-ൽ couple-നോടും Malayalam-ൽ waiter-നോടും. Smooth."
       (German to the couple, Malayalam to the waiter. Smooth.)
[0:48] "ഇത് performing അല്ല. ഇത് just speaking."
       (This isn't performing. This is just speaking.)
```

### Audio Direction
- Ambient: espresso machine, soft café chatter
- Music: warm, confident score, swells at shoulder pat

---

## Video 12 — Kerala Backwaters: The Phone Call

**Module trigger:** Module 12 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Emotional, complex German — full sentences, natural

**Story:** Golden hour. Kuttan by the backwaters, calling Raju. They joke in German. A quiet moment where he looks at the water. Kerala on one side of the phone, Germany on the other.

---

### Sequence A — The Backwaters (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Sitting alone on the bank of Kerala backwaters. Still water
reflecting coconut trees. Golden hour light. Phone to his ear.
He smiles and laughs. Wide establishing shot. Deeply nostalgic,
warm.
```

**Extension 1 (7s):** `He speaks easily into the phone, relaxed and animated. Gestures as he talks. Laughs at something the other person said. Natural, flowing conversation.`

**Extension 2 (7s):** `The laughter fades. A quieter moment. He looks out at the still water. The golden light catches his face. Something bittersweet crosses his expression.`

**Extension 3 (7s):** `He speaks softly into the phone. The words are gentle. He looks at the water's reflection. A beat of stillness. Beautiful, melancholic.`

### Sequence B — The Stillness (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a neat green collared shirt, jeans, brown shoes.
Close-up by the Kerala backwaters. Golden hour. He lowers the
phone from his ear. Looks at the water. Soft smile. Bittersweet,
nostalgic.
```

**Extension 1 (7s):** `He puts the phone in his pocket. Sits quietly. Watches a boat drift slowly across the backwater in the distance. Golden reflections on the water.`

**Extension 2 (7s):** `He picks up a small stone and tosses it gently into the water. Watches the ripples spread. Lost in thought. Kerala beauty all around him.`

**Extension 3 (7s):** `Wide shot pulling back. Kuttan small against the vast backwater landscape. Coconut trees, golden sky. A figure between two worlds. Camera drifts up slowly.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "The backwaters. His thinking spot."
[0:14]       (on phone, laughing)
[0:24]       "Raju, das ist wirklich lustig!"
[0:34]       (quiet beat, looks at water)
[0:42]       "Ich vermisse Kerala schon jetzt."
[0:50]       (soft smile)
[0:54]       "He's not even gone yet."
[0:61–0:65]  CHAPTER CARD: "Chapter 12: Hobbies, Weather & Plans" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "Backwaters. കുട്ടന്റെ thinking spot."
       (Backwaters. Kuttan's thinking spot.)
[0:14] "Raju-വിനെ call ചെയ്യുന്നു. German-ൽ joke ചെയ്യുന്നു."
       (Calling Raju. Joking in German.)
[0:34] "ഒരു moment of silence."
       (A moment of silence.)
[0:42] "'Ich vermisse Kerala schon jetzt.' — പോയിട്ടില്ല, പക്ഷേ miss ചെയ്യുന്നു."
       ('Ich vermisse Kerala schon jetzt.' — Hasn't left yet, but already missing it.)
```

### Audio Direction
- Ambient: water lapping, distant birds, boat motor
- Music: gentle Kerala-German fusion — sitar and soft piano. The emotional core of the whole series.

---

## Video 13 — Kochi Exam Centre: Registration Day

**Module trigger:** Modules 13–14 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Near-perfect — formal, composed

**Story:** Goethe Institut Kochi. Registration for A1 exam. Fills form in German. Brief German exchange with receptionist. Clean, confident. Walks out into Kochi sun.

---

### Sequence A — The Registration (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Walking into
a clean, professional building interior. Glass doors, posters
on walls. Determined, composed. Formal setting.
```

**Extension 1 (7s):** `He approaches a reception counter. Stands straight. An animated receptionist behind the desk looks up. He speaks with quiet confidence.`

**Extension 2 (7s):** `He fills out a form on the counter carefully. Pen moving steadily. The receptionist watches. He slides the completed form across the counter.`

**Extension 3 (7s):** `The receptionist smiles and hands him a printed confirmation. He takes it, reads it, and a composed satisfaction crosses his face. Nods politely.`

### Sequence B — Walking Out (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Walking through
glass doors from a professional building interior into bright
daylight. Shoulders slightly back. Quiet confidence.
```

**Extension 1 (7s):** `He steps outside into warm Kochi sunlight. Squints slightly at the brightness. Takes a deep breath — an exhale of accomplishment.`

**Extension 2 (7s):** `He looks down at the confirmation paper in his hand. Then looks up at the sky. A small, private smile. Not a grin — earned calm.`

**Extension 3 (7s):** `He walks forward along a Kochi street. Slightly taller posture than before. The camera follows him from behind. The city buzzes around him. One step closer.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "Goethe Institut Kochi. Registration day."
[0:12]       (approaches counter)
[0:22]       "Ich möchte mich für die A1-Prüfung anmelden."
[0:34]       (receptionist: "Sehr gut!")
[0:42]       (walks out into sunlight)
[0:48]       (looks at confirmation)
[0:52]       "Two weeks to go."
[0:61–0:65]  CHAPTER CARD: "Chapters 13 & 14: Past Tense & Official Forms" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "Goethe Institut Kochi. Registration day."
       (Goethe Institut Kochi. Registration day.)
[0:22] "'Ich möchte mich für die A1-Prüfung anmelden.' — Perfect."
       (German TTS for the quote)
[0:34] "Receptionist smiled. 'Sehr gut.'"
       (German TTS for 'Sehr gut')
[0:42] "പുറത്ത് Kochi sun. Deep breath."
       (Outside. Kochi sun. Deep breath.)
[0:52] "രണ്ട് ആഴ്ച. Ready ആണ്."
       (Two weeks. He's ready.)
```

### Audio Direction
- Ambient: AC hum inside, traffic outside
- Music: confident, focused, resolves when he walks out

---

## Video 14 — Goethe Exam Hall: The Final Boss

**Module trigger:** Modules 15–18 opener
**Duration:** ~65s (58s Veo + bookends) | **Veo calls:** 8 (2 × 4) | **Model:** Fast
**German level:** Silent — everything has been building to this

**Story:** Exam day. Kuttan walks in. Sits. Exam paper face-down. He closes his eyes. One breath. Opens them. Proctor turns the paper. He's ready. No German spoken — the silence says everything.

---

### Sequence A — The Walk In (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Walking into
a bright, quiet exam hall. Rows of white desks, fluorescent
lighting. Other animated characters seated. Formal, tense.
Cinematic silence.
```

**Extension 1 (7s):** `He finds his desk. Sits down carefully. Places his backpack beside the chair. A sealed exam booklet sits face-down on the desk in front of him.`

**Extension 2 (7s):** `He places his pen down parallel to the paper. Looks at the sealed booklet. His hands are still. The room is hushed — only subtle sounds of other candidates.`

**Extension 3 (7s):** `He stares at the booklet. Then closes his eyes. One slow, deep breath. His shoulders drop slightly. Inner calm washing over him.`

### Sequence B — The Moment (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes. Extreme close-up of his face. Eyes closed.
Exam hall. Fluorescent light. Perfect stillness. Calm,
determined expression.
```

**Extension 1 (7s):** `His eyes open. Calm. Steady. Clear. He looks down at the exam booklet. No fear. Pure readiness.`

**Extension 2 (7s):** `A hand from off-screen reaches in and turns the exam booklet face-up. His eyes drop to the page. He picks up his pen.`

**Extension 3 (7s):** `Close-up on his hand as he begins to write. Steady, confident strokes. The pen moves without hesitation. Camera slowly pulls back to show the full exam hall. Everyone writing. He's one of them now.`

### Text Overlays
```
[0:00–0:03]  TITLE CARD: "The day."
[0:14]       (walks in, finds seat)
[0:22]       "Every word he learned."
[0:28]       "Every late night."
[0:34]       "Every mistake he fixed."
[0:42]       (closes eyes, one breath)
[0:48]       "It's all in there."
[0:54]       (paper turns over — he begins)
[0:61–0:65]  CHAPTER CARD: "Chapters 15–18: Review & Exam Prep" (Remotion bookend)
```

### Malayalam Narration
```
[0:03] "ഇന്നാണ് ആ ദിവസം."
       (Today is the day.)
[0:22] "ഓരോ word-ഉം. ഓരോ late night-ഉം. ഓരോ mistake-ഉം."
       (Every word. Every late night. Every mistake.)
[0:42] "കണ്ണുകൾ അടച്ചു. ഒരു ശ്വാസം."
       (Eyes closed. One breath.)
[0:48] "എല്ലാം ഉള്ളിലുണ്ട്."
       (It's all in there.)
[0:54] "Paper turn ചെയ്തു. Pen എടുത്തു. Ready."
       (Paper turned. Pen picked up. Ready.)
```

### Audio Direction
- Ambient: **complete silence** — clock ticking, occasional paper shuffle
- Music: **none** — pure tension. This video is powerful BECAUSE there's no music.
- The silence contrasts with every other video and makes it unforgettable.

---

## Video 15 — Kochi Airport: Boarding the Plane

**Module trigger:** A1 Course completion
**Duration:** ~95s (87s Veo + bookends) | **Veo calls:** 12 (3 × 4) | **Model:** Fast
**German level:** Earned, effortless, joyful

**Story:** BESTANDEN. Kuttan at Kochi airport with boarding pass. Calls Amma — she cries. He holds it together, barely. Walks toward gate. One last look at Kerala through the terminal window. Walks through. "A2 — Coming Soon."

---

### Sequence A — The Result (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Standing in
a bright, modern airport terminal. Rolling suitcase beside him.
He looks at a paper in his hand. A smile breaks slowly across
his face. Warm, earned, emotional.
```

**Extension 1 (7s):** `The smile grows wider. He reads the paper again — a boarding pass. He breathes in deep, processing. This is real. His eyes glisten.`

**Extension 2 (7s):** `He pulls out his phone and calls someone. Holds the phone to his ear. Waiting. When they answer, his expression shifts — emotion rising.`

**Extension 3 (7s):** `He speaks quietly, warmly into the phone. His voice would be gentle. His eyes well up but he holds it together. A son calling his mother.`

### Sequence B — The Walk (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Airport
terminal. He puts his phone away. Takes a breath. Picks up
his rolling suitcase. Begins walking forward. Determined,
emotional.
```

**Extension 1 (7s):** `He walks through the airport terminal. People around him, but the camera follows only him. Each step is purposeful. The terminal stretches ahead.`

**Extension 2 (7s):** `He stops. Turns and looks back. Through the terminal window, golden light — the Kerala sky outside. Coconut trees visible in the distance. A long look.`

**Extension 3 (7s):** `He turns forward again. The boarding gate is ahead. He walks toward it. Steady, unhurried. The rolling suitcase wheels on the floor. Each step an arrival.`

### Sequence C — The Gate (29s)

**Initial clip (8s):**
```
Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive
character animation. The young Indian man from the reference
images, wearing a clean formal blue shirt, dark trousers,
polished shoes, carrying a small black backpack. Standing at
an airport boarding gate. He takes one more breath. A small,
private smile. Golden light from the terminal windows.
```

**Extension 1 (7s):** `He steps forward through the boarding gate. His figure moves into the jet bridge corridor. The light changes — from warm Kerala gold to cooler artificial light.`

**Extension 2 (7s):** `Camera stays on the empty spot where he stood. The terminal window still showing Kerala sky. Golden light. The space where he was is quiet now.`

**Extension 3 (7s):** `Slow fade. The empty terminal dissolves into warm golden light. Camera slowly drifts toward the window. The Kerala sky fills the frame — coconut trees silhouetted against sunset.`

### Text Overlays
```
[0:00–0:03]  (silence — just the terminal)
[0:06]       "BESTANDEN."
[0:14]       (looks at boarding pass, smile breaks)
[0:22]       (calls home)
[0:30]       "Amma... pass aayi."
[0:42]       (one last look at Kerala sky)
[0:55]       (walks toward the gate)
[1:08]       (walks through)
[1:15]       (empty terminal)
[1:20]       "Kerala → Frankfurt."
[1:25]       "You did it."
[1:30]       "Herzlichen Glückwunsch."
[1:35]       "A2 — Coming Soon."
```

### Malayalam Narration
```
[0:06] "BESTANDEN. Pass ആയി."
       (BESTANDEN. He passed.)
[0:14] "Boarding pass. Kochi → Frankfurt."
       (Boarding pass. Kochi to Frankfurt.)
[0:22] "അമ്മയെ call ചെയ്യുന്നു."
       (Calling Amma.)
[0:30] "'Amma... pass aayi.'"
       (Use actual Malayalam voice here — emotional, quiet)
[0:42] "ഒരു last look. Kerala sky. Coconut trees."
       (One last look. Kerala sky. Coconut trees.)
[0:55] "Gate-ലേക്ക് നടക്കുന്നു."
       (Walking toward the gate.)
[1:08] "നടന്നു. കടന്നു."
       (He walked. He crossed.)
[1:20] "Kerala → Frankfurt. Zero German-ൽ നിന്ന് ഇവിടെ വരെ."
       (Kerala to Frankfurt. From zero German to here.)
[1:30] "Herzlichen Glückwunsch, Kuttan. A2 — Coming Soon."
       (German TTS for Herzlichen Glückwunsch. Then Malayalam for the rest.)
```

### Audio Direction
- [0:00–0:22] Airport ambience — PA announcements, rolling suitcases. Quiet.
- [0:22–0:40] Phone call — warm near-silence. The most emotional audio moment.
- [0:30] **"Amma... pass aayi."** — This line should be Kuttan's voice (Google TTS ml-IN male voice, or recorded). The ONE spoken line in all 15 videos.
- [0:42–1:10] Kerala-German fusion score begins — sitar and piano, building slowly
- [1:10–1:35] Full emotional resolution. The score swells and fades as the gate closes.
- This is the audio climax of the entire course.

### Technical Notes
- This video uses 3 sequences (longest video)
- Uses Fast model by default. Upgrade to Standard if budget allows after pilot — this is the emotional payoff
- Sequence C extension 2-3 (empty terminal + fade) can be done in Remotion if Veo struggles with "empty space" shots
- The "Amma... pass aayi" line needs separate TTS generation — Google Cloud TTS `ml-IN-Chirp3-HD-[male voice]`
- Consider generating the Kerala-German fusion music specifically for this video (separate MusicGen prompt)

---

## Production Summary

| Video | Duration | Sequences | Veo Calls | Model | Est. Cost |
|-------|----------|-----------|-----------|-------|-----------|
| 1 | ~65s | 2 | 8 | Fast | ~$9 |
| 2 | ~50s | 2 | 6 | Fast | ~$7 |
| 3 | ~50s | 2 | 6 | Fast | ~$7 |
| 4 | ~65s | 2 | 8 | Fast | ~$9 |
| 5 | ~65s | 2 | 8 | Fast | ~$9 |
| 6 | ~50s | 2 | 6 | Fast | ~$7 |
| 7 | ~50s | 2 | 6 | Fast | ~$7 |
| 8 | ~50s | 2 | 6 | Fast | ~$7 |
| 9 | ~65s | 2 | 8 | Fast | ~$9 |
| 10 | ~50s | 2 | 6 | Fast | ~$7 |
| 11 | ~65s | 2 | 8 | Fast | ~$9 |
| 12 | ~65s | 2 | 8 | Fast | ~$9 |
| 13 | ~65s | 2 | 8 | Fast | ~$9 |
| 14 | ~65s | 2 | 8 | Fast | ~$9 |
| 15 | ~95s | 3 | 12 | Fast | ~$13 |
| **Total** | **~14 min** | **31** | **112** | | **~$127** |

> Pricing: Veo 3.1 Fast = $0.15/sec. Initial 8s clip = $1.20, extension 7s = $1.05. sampleCount: 1.
> With ~25% retakes (~28 calls): **~$156 estimated Veo cost**. $124 buffer remaining from $300 budget.
> Buffer allows upgrading emotional anchors (V1, V4, V14, V15) to Standard ($0.40/s) if Fast quality is insufficient.

---

## German Progression Summary

| Video | Kuttan's German | Key Line |
|-------|----------------|----------|
| 1 | None | — |
| 2 | First broken word | "Goo... Guten Morgen?" |
| 3 | First written word | Writes "Entschuldigung" |
| 4 | Broken sentence | "Mein Name ist Kuttan. Ich bin... aus Kerala." |
| 5 | Drilling verbs | "ich arbeite, du arbeitest, er arbeitet" |
| 6 | First successful exchange | "Ich möchte Kaffee, bitte." |
| 7 | Shopping phrase | "Wie viel kostet das?" |
| 8 | Descriptive sentences | "Das ist mein Zimmer. Es gibt ein Bett..." |
| 9 | Two-way conversation | "Geradeaus... dann links?" |
| 10 | Teaching — with own gap | "Das Knie. You're right." |
| 11 | Natural, sustained | "Kann ich helfen? Was möchten Sie?" |
| 12 | Emotional, complex | "Ich vermisse Kerala schon jetzt." |
| 13 | Formal, exam-ready | "Ich möchte mich für die A1-Prüfung anmelden." |
| 14 | Silent — beyond words | — |
| 15 | Earned, effortless | "Amma... pass aayi." |

---

> v3.0 — Complete rewrite for Veo 3.1 Pixar style
> Changes from v0.2:
> - All prompts rewritten for Pixar 3D animation style
> - Multi-sequence architecture (2-3 sequences per video)
> - Malayalam narration added for all videos
> - Reference image + verbatim block consistency system
> - Technical metadata per video (calls, model, cost)
> - Extension prompts broken out per sequence
> - Scene bible and negative prompts standardised
> Previous version: AI_CINEMATIC_SCRIPTS.md (v0.2)
