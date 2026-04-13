# Marketing Video Mass Production Plan

> **Goal**: Mass-produce engaging, educational Instagram reels with native German audio
> **Format**: 9:16 portrait (Instagram reels/stories), 6-10 seconds each
> **Audio**: Veo 3.1 native speech — German pronunciation, ambient sounds
> **Volume**: 100+ videos in batches
> **Quality bar**: Some errors fine — manual review later, viral feel mandatory

---

## Why Veo Native Audio Matters

Veo 3.1 generates video WITH audio — native German pronunciation, ambient sounds, background music. This means:
- No separate voiceover recording needed
- Native-quality German pronunciation (better than TTS)
- Ambient sounds (café noise, street sounds, classroom) add immersion
- Each reel is a self-contained unit — generate and post

---

## Content Categories

### Category 1: Pronunciation Drills (30% of output)
**Format**: 6s reel. Visual of the word/scene + Veo speaks the word clearly.
**Hook**: "Can you say this?" / "Repeat after me"

Examples:
- "Brötchen" — bakery scene, someone ordering
- "Entschuldigung" — street scene, someone excusing themselves
- "Guten Morgen" — morning scene, someone greeting
- "Ich hätte gerne..." — café scene, ordering coffee

**Template prompt pattern**:
```
A person in a German [SETTING] saying "[GERMAN_WORD]" clearly and naturally. 
The word is spoken slowly and clearly. Pixar-style 3D animation. 
9:16 vertical format. 6 seconds.
```

**Whitelist** (safe words Veo pronounces well):
Hallo, Danke, Bitte, Tschüss, Guten Morgen, Guten Tag, Guten Abend, 
Brötchen, Kaffee, Wasser, Bier, Entschuldigung, Ich hätte gerne,
Wie geht's, Ja, Nein, Eins Zwei Drei, Prost, Gesundheit,
Der Die Das, Auf Wiedersehen, Sprechen Sie Englisch

### Category 2: POV Scenes (20% of output)
**Format**: 8s reel. Immersive first-person-ish scene in Germany with ambient audio.
**Hook**: "POV: You just..." / "Imagine this..."

Examples:
- "POV: Your first morning in Germany" — waking up, opening curtain, German city view
- "POV: Ordering at a German bakery" — Bäckerei counter, "Ich hätte gerne ein Brötchen"
- "POV: Walking through a Christmas market" — Glühwein, lights, German chatter
- "POV: Your first German lecture" — lecture hall, professor speaking German
- "POV: First snow ever" — snow falling, wonder

**Template prompt pattern**:
```
POV first-person perspective in [GERMAN_SETTING]. 
[SPECIFIC_ACTION_AND_GERMAN_SPEECH]. 
Ambient German sounds. Immersive. Pixar-style 3D animation.
9:16 vertical. 8 seconds.
```

### Category 3: Mini Lessons (20% of output)
**Format**: 8-10s reel. Visual scenario + German phrase spoken + context shown.
**Hook**: "How to say X in German" / "German hack:"

Examples:
- "At the supermarket: Haben Sie...?" — supermarket scene, asking for something
- "At the train station: Wann fährt der Zug?" — station scene, asking about train
- "Meeting someone: Freut mich!" — handshake scene
- "At the restaurant: Die Rechnung, bitte" — restaurant, asking for bill
- "Getting directions: Wo ist der Bahnhof?" — street scene

**Template prompt pattern**:
```
A scene in a German [SETTING]. A person says "[GERMAN_PHRASE]" clearly.
The scene shows the context where this phrase is used naturally.
Pixar-style 3D animation. 9:16 vertical. 8 seconds.
```

### Category 4: German Culture Facts (15% of output)
**Format**: 6s reel. Visual + narrated fact (English or Manglish voiceover with German words).
**Hook**: "Did you know?" / "Germany is crazy:"

Examples:
- "Germany has 3000+ types of bread" — bakery montage
- "Germans are NEVER late" — clock + punctual scenes
- "Sunday = everything closed" — empty streets
- "Pfand: you get money back for bottles" — returning bottles
- "No speed limit on Autobahn" — highway scene
- "Germans love sparkling water" — Sprudel reaction

### Category 5: Motivation / Journey (15% of output)  
**Format**: 8s reel. Emotional, aspirational. Kerala-to-Germany journey feel.
**Hook**: Emotional music + powerful visual

Examples:
- "6 months ago: couldn't say Hallo. Today: living in Germany."
- "The struggle is temporary. Germany is waiting."
- "Every German word you learn = one step closer"
- "From Malayalam to Deutsch. The journey of a lifetime."
- Kerala sunset → German sunrise transition

---

## Technical Pipeline

### Step 1: Generate prompt batch
```python
# For each template × each variation = one prompt
prompts = []
for template in templates:
    for variation in template.variations:
        prompts.append({
            "prompt": template.format(variation),
            "aspect_ratio": "9:16",
            "duration": template.duration,
            "audio": "native",  # Veo generates audio
            "category": template.category,
            "output_name": f"{template.category}-{variation.id}",
        })
```

### Step 2: Generate with Veo (text-to-video, no seed image needed)
- Veo 3.1 Fast: `veo-3.1-fast-generate-001`
- Text-to-video (no image seed needed for marketing content)
- Native audio enabled (Veo generates speech + ambient)
- 9:16 aspect ratio
- 6-10 seconds per clip
- `personGeneration: allow_adult`

**Key difference from Kuttan pipeline**: No Imagen/Gemini seed step needed. Veo generates directly from text prompt. Faster, cheaper, scalable.

### Step 3: Batch download + organize
```
output/
  instagram/
    pronunciation/
      pron-hallo.mp4
      pron-danke.mp4
      ...
    pov/
      pov-bakery.mp4
      pov-christmas-market.mp4
      ...
    lessons/
      lesson-supermarket.mp4
      ...
    facts/
      fact-bread.mp4
      ...
    motivation/
      moti-journey.mp4
      ...
```

### Step 4: Generate captions with Gemini
- One caption per video
- Manglish voice ("Machane, try this!")
- Hashtags: #LearnGerman #GermanForBeginners #AdipoliGerman #Kerala #Germany
- CTA: "Save this for later 🔖" or "Follow for daily German"

### Step 5: Manual review
- Quick scan of each video (5-10s per video)
- Kill: wrong pronunciation, weird visuals, offensive content
- Keep: everything else, imperfect is fine
- Upload to Instagram scheduling tool

---

## Cost Estimate

| Category | Count | Duration | Veo cost/clip | Total |
|----------|-------|----------|---------------|-------|
| Pronunciation | 30 | 6s | $0.21 | $6.30 |
| POV | 20 | 8s | $0.28 | $5.60 |
| Mini Lessons | 20 | 8s | $0.28 | $5.60 |
| Culture Facts | 15 | 6s | $0.21 | $3.15 |
| Motivation | 15 | 8s | $0.28 | $4.20 |
| **Total** | **100** | | | **~$25** |

Caption generation (Gemini): ~$0.50 total. Negligible.

**Total for 100 reels: ~$25**

---

## Rate Limit Strategy

- Veo: ~2-5 RPM → batch 2 per minute → 100 clips = ~50 minutes
- Run in background, overnight if needed
- No Gemini image gen needed (text-to-video) → avoids the bottleneck we hit with Kuttan
- Separate quota pool from Gemini stills

---

## Batch 1 Priority (first 20 videos)

Generate these first as a test batch:

| # | Category | Prompt hook | German word/phrase |
|---|----------|------------|-------------------|
| 1 | Pron | "Can you say this?" | Brötchen |
| 2 | Pron | "Repeat after me" | Entschuldigung |
| 3 | Pron | "Try this German word" | Schmetterling (butterfly) |
| 4 | Pron | "Most Germans can't believe foreigners say this" | Eichhörnchen (squirrel) |
| 5 | Pron | "Your first German word" | Hallo |
| 6 | POV | "POV: First morning in Germany" | Guten Morgen |
| 7 | POV | "POV: German bakery" | Ich hätte gerne ein Brötchen |
| 8 | POV | "POV: Christmas market" | Einen Glühwein bitte |
| 9 | POV | "POV: German train" | Entschuldigung, ist hier frei? |
| 10 | POV | "POV: First snow" | (ambient only) |
| 11 | Lesson | "At the café" | Einen Kaffee bitte |
| 12 | Lesson | "Meeting someone" | Freut mich, ich bin... |
| 13 | Lesson | "Saying thank you" | Danke schön / Vielen Dank |
| 14 | Lesson | "Asking for help" | Können Sie mir helfen? |
| 15 | Lesson | "At the restaurant" | Die Rechnung bitte |
| 16 | Fact | "3000 types of bread" | (ambient bakery) |
| 17 | Fact | "Sunday = closed" | (empty street ambient) |
| 18 | Fact | "Pfand system" | (bottle return machine) |
| 19 | Moti | "6 months ago → today" | (music, no speech) |
| 20 | Moti | "The journey starts with one word" | Hallo → full sentence |

---

## Script to Execute

A new script `scripts/generate-marketing.py` that:
1. Takes a CSV/JSON of prompts
2. Calls Veo text-to-video (no image seed)
3. Polls for completion
4. Downloads to organized folders
5. Generates captions with Gemini
6. Logs costs

This is SEPARATE from render-arc.py (Kuttan cinematic pipeline).

---

## Key Differences from Kuttan Pipeline

| | Kuttan Series | Marketing Reels |
|---|---|---|
| Seed | Gemini still → Veo animate | Veo text-to-video directly |
| Character | Must be consistent Kuttan | Any character, variety is good |
| Audio | Silent (add VO later) | Native Veo audio (German speech) |
| Format | 16:9 landscape | 9:16 portrait |
| Quality bar | High — manual review each scene | Medium — batch generate, quick review |
| Duration | 4s clips, composed to 48s | 6-10s standalone reels |
| Volume | ~12 per video, ~200 total | 100+ per batch, ongoing |
| Cost per unit | ~$0.18 (still+clip) | ~$0.25 (clip only, longer) |
