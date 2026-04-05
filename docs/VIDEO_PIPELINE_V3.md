# Video Pipeline — Technical Plan v3.0
> Adipoli German A1 | Updated: 2026-04-05
> Pixar 3D Style | Veo 3.1 + Remotion + Kokoro/Chirp 3 HD
> Budget: $300 GCP Trial Credits

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRE-PRODUCTION                        │
│  Imagen 4 → Kuttan reference images (3 poses)           │
│  Imagen 4 → 15 establishing shot backgrounds            │
│  MusicGen → Background music track (Kerala-German)      │
│  Character Bible + Scene Bible (verbatim text blocks)    │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│               PER CINEMATIC VIDEO                        │
│                                                          │
│  1. Veo 3.1 API                                         │
│     ├── Sequence A: initial (8s) + 2-4 extensions (7s)  │
│     ├── Sequence B: initial (8s) + 2-4 extensions (7s)  │
│     └── [Video 15] Sequence C                           │
│                                                          │
│  2. TTS Audio                                            │
│     ├── Malayalam narrator: Google Chirp 3 HD (ml-IN)    │
│     ├── German phrases: Google Chirp 3 HD (de-DE)       │
│     └── English (if needed): Kokoro TTS (local, free)   │
│                                                          │
│  3. Remotion Composition                                 │
│     ├── Import Veo clips via <OffthreadVideo muted>     │
│     ├── TransitionSeries: fade/wipe between sequences   │
│     ├── Text overlays: German + story text              │
│     ├── Audio layers: narration + music (ducking)       │
│     └── Title card + chapter transition bookends        │
│                                                          │
│  4. Render → MP4 (720p, 30fps)                          │
└─────────────────────────────────────────────────────────┘
```

---

## Veo 3.1 API Configuration

### Model & Endpoint

```
Model:     veo-3.1-generate-001 (GA)
           veo-3.1-fast-generate-001 (GA, cheaper)
Endpoint:  Vertex AI (us-central1)
           POST https://us-central1-aiplatform.googleapis.com/v1/
           projects/{PROJECT}/locations/us-central1/
           publishers/google/models/{MODEL}:predictLongRunning
```

### Critical API Parameters

```json
{
  "instances": [{
    "prompt": "STYLE + CHARACTER + SCENE + CAMERA + MOOD",
    "referenceImages": [
      { "image": { "bytesBase64Encoded": "..." }, "referenceType": "asset" },
      { "image": { "bytesBase64Encoded": "..." }, "referenceType": "asset" },
      { "image": { "bytesBase64Encoded": "..." }, "referenceType": "asset" }
    ]
  }],
  "parameters": {
    "aspectRatio": "16:9",
    "resolution": "720p",
    "durationSeconds": 8,
    "seed": 42,
    "sampleCount": 2,
    "personGeneration": "allow_adult",
    "enhancePrompt": false
  }
}
```

### Key Settings Explained

| Parameter | Value | Why |
|-----------|-------|-----|
| `resolution` | `720p` | Budget-friendly. Scene Extension most reliable at 720p. |
| `durationSeconds` | `8` | Required when using reference images. |
| `seed` | `42` (fixed) | Slight reproducibility improvement. Same seed across all videos. |
| `sampleCount` | `2` | Generate 2 variants per call, pick best. Doubles cost but halves retakes. |
| `enhancePrompt` | `false` | **CRITICAL.** Prevents Veo from auto-modifying your prompt, which introduces variation between shots. |
| `personGeneration` | `allow_adult` | Required for character generation. |
| `referenceType` | `asset` | Anchors character appearance from reference images. |

### Scene Extension API

For extending a sequence beyond 8 seconds:

```json
{
  "instances": [{
    "prompt": "CONTINUATION PROMPT — action that happens next",
    "video": {
      "gcsUri": "gs://bucket/previous-clip.mp4",
      "mimeType": "video/mp4"
    }
  }],
  "parameters": {
    "storageUri": "gs://bucket/output/",
    "sampleCount": 1
  }
}
```

Extension adds 7 seconds per call. The system uses the **last 24 frames (1 second)** of the source video as visual context.

---

## Character Consistency — 10-Point System

These techniques reduce character drift from ~5-6/10 to ~9/10 consistency.

### 1. Reference Images (Foundation)

Three poses of Kuttan, all in Pixar 3D style on clean white background:
- **Front-facing** — neutral expression, clean lighting
- **Three-quarter angle** — slight smile, walking pose
- **Profile** — sitting, looking at phone

Source: Generate from existing `kuttan-happy.png` using Imagen 4 with style-matching prompts. All three must look like the same character.

Format: PNG, sRGB color profile, ≤10MB each.

### 2. Disable enhance_prompt (Critical)

Set `enhancePrompt: false` in every API call. Default is true, which auto-adds cinematographic terms that vary between calls, breaking consistency.

### 3. Verbatim Character Block

The exact same text goes into every initial-clip prompt. No paraphrasing, no rewording, no shortening:

```
CHARACTER BLOCK (copy verbatim):
"The young Indian man from the reference images, Pixar 3D style,
[OUTFIT — varies by video tier only]"
```

Outfit tiers (the ONLY thing that changes):
- Videos 1–6: "wearing a casual white cotton shirt, jeans, rubber slippers"
- Videos 7–12: "wearing a neat green collared shirt, jeans, brown shoes"
- Videos 13–15: "wearing a clean formal blue shirt, dark trousers, polished shoes"

Always: "carrying a small black backpack"

### 4. Scene Bible (Verbatim Style Tokens)

Copy these tokens into every prompt:

```
STYLE BLOCK (copy verbatim):
"Pixar-style 3D animation. Warm cinematic lighting, soft ambient
occlusion, rich saturated colors. Clean render, expressive character
animation."
```

### 5. Front-Load Character in Prompt

Veo processes prompts sequentially and prioritises early tokens. Structure:

```
[STYLE BLOCK]. [CHARACTER BLOCK]. [SCENE]. [CAMERA]. [MOOD].
```

Never bury the character description after the scene description.

### 6. Extension Drift Reset (every 4-5 extensions)

Scene Extension drift is stepped:
- Extensions 1–3: Nearly identical to original
- Extensions 4–5: Subtle color shifts possible
- Extensions 6+: Noticeable character drift

**Rule: Maximum 4 extensions per sequence (36 seconds).** For longer sequences, reset:
1. Download the current extended video
2. Extract the last frame
3. Start a new initial clip using that frame as input (Frames-to-Video)
4. Continue extending from there

### 7. Split-Shot Multi-Character Scenes

Videos 2, 3, 6, 9, 10, 11, 13 include secondary characters. Rules:
- Use **shot-reverse-shot**: close-up on Kuttan, then separate shot of the other character
- When characters share a frame: give secondary characters **highly distinctive visual markers** (different color palette, body type)
- Never describe two characters with similar features in the same prompt

### 8. Negative Prompting

Use `negative_prompt` parameter to prevent recurring issues:

```
"No text overlays. No subtitles. No watermark. No hat. No glasses.
No beard. No realistic style. No live action."
```

### 9. Per-Shot Consistency Checklist

Before accepting any generated clip, verify:
- [ ] Hair: same color, length, curl pattern
- [ ] Skin tone: matches reference
- [ ] Outfit: correct tier, correct colors
- [ ] Backpack: visible and black
- [ ] Face shape: round, expressive, matches Pixar reference
- [ ] Art style: consistent 3D render, not drifting to 2D or realistic
- [ ] Lighting: warm, consistent with scene bible

### 10. Post-Processing Safety Net

If a clip has minor drift on 1-2 frames:
- **FaceFusion** (open-source): face-fix specific frames using Kuttan reference
- **RIFE** (frame interpolation): generate bridge frames between clips to smooth transitions
- **Color normalization**: ffmpeg `colorbalance` filter to match clips

---

## Shot Sequence Architecture

Each cinematic video follows this structure:

```
┌──────────────────────────────────────────────────────┐
│ REMOTION TITLE CARD (3-5s)                           │
│ Location text + fade in from black                   │
│ Background: Imagen-generated establishing shot       │
│ Audio: ambient sound begins, music fades in          │
├──────────────────────────────────────────────────────┤
│ VEO SEQUENCE A (22-36s)                              │
│ Initial clip (8s) with reference images              │
│ + 2-4 scene extensions (7s each)                     │
│ Content: establishing shot → primary action          │
├──────────────────────────────────────────────────────┤
│ TRANSITION (0.5-1s)                                  │
│ Fade, dip-to-black, or wipe (via Remotion)           │
├──────────────────────────────────────────────────────┤
│ VEO SEQUENCE B (22-36s)                              │
│ Initial clip (8s) with reference images              │
│ + 2-4 scene extensions (7s each)                     │
│ Content: emotional beat → resolution                 │
├──────────────────────────────────────────────────────┤
│ REMOTION CHAPTER CARD (3-5s)                         │
│ Chapter title + module number                        │
│ Transition to lesson                                 │
│ Audio: music resolves                                │
└──────────────────────────────────────────────────────┘
```

### Duration Targets

| Video Duration | Veo Sequences | Calls per Video |
|---------------|---------------|-----------------|
| 45 seconds | 2 × (8s + 2×7s) = 44s + bookends | 6 Veo calls |
| 60 seconds | 2 × (8s + 3×7s) = 58s + bookends | 8 Veo calls |
| 90 seconds | 3 × (8s + 3×7s) = 87s + bookends | 12 Veo calls |

---

## Audio Pipeline

### Three-Voice System

| Voice | Tool | Voice ID | Use Case |
|-------|------|----------|----------|
| Malayalam narrator | Google Cloud TTS Chirp 3 HD | `ml-IN-Chirp3-HD-Kore` | Story narration, emotional context |
| German phrases | Google Cloud TTS Chirp 3 HD | `de-DE-Chirp3-HD-Kore` | When Kuttan's German text is shown |
| English (fallback) | Kokoro TTS | `af_heart` | Only if needed for mixed segments |

### Malayalam Narrator Role

Third-person storyteller narrating Kuttan's journey. Warm, conversational tone.
Not a teacher voice — a story voice. Like a friend telling you about Kuttan.

The narrator speaks over the Veo video (which is muted). Text overlays appear
simultaneously for key German phrases and story beats.

### Audio Layers in Remotion

```tsx
<AbsoluteFill>
  {/* Layer 1: Background music — loops, ducked during narration */}
  <Audio src={staticFile('bgm-kerala-german.mp3')}
    volume={(f) => isNarrating(f) ? 0.08 : 0.25} loop />

  {/* Layer 2: Malayalam narration — per sequence */}
  <Sequence from={titleCardFrames} durationInFrames={seqAFrames}>
    <Audio src={staticFile('v1-narration-ml.mp3')} volume={0.85} />
  </Sequence>

  {/* Layer 3: Ambient (optional) — very low */}
  <Audio src={staticFile('ambient-kerala-evening.mp3')} volume={0.05} loop />
</AbsoluteFill>
```

### Background Music

Generated with MusicGen (Meta, Apache 2.0, free):

```python
from audiocraft.models import MusicGen
model = MusicGen.get_pretrained('facebook/musicgen-medium')
model.set_generation_params(duration=120)
wav = model.generate([
  "warm cinematic background music, soft piano and sitar fusion, "
  "Kerala meets European influences, gentle emotional, "
  "educational video background, ambient"
])
```

One track, reused across all 15 videos for sonic consistency.

### Audio Post-Processing

All audio normalized to -16 LUFS before Remotion composition:

```bash
ffmpeg-normalize narration.wav -o narration-norm.wav -t -16 --two-pass
```

---

## Remotion Composition

### Project Structure

```
video/
├── src/
│   ├── compositions/
│   │   ├── CinematicVideo.tsx      # Main composition for each cinematic
│   │   ├── LessonVideo.tsx         # Lesson video composition
│   │   └── index.ts
│   ├── components/
│   │   ├── TitleCard.tsx           # Location title + fade in
│   │   ├── ChapterCard.tsx        # Chapter transition card
│   │   ├── BilingualSubtitle.tsx   # German + Malayalam text overlay
│   │   ├── StoryOverlay.tsx       # English story text overlay
│   │   └── ProgressBar.tsx        # Optional learning progress
│   ├── data/
│   │   ├── scripts.ts             # Text overlay timing data per video
│   │   └── narration-timing.ts    # TTS segment durations
│   ├── Root.tsx
│   └── index.ts
├── public/
│   ├── veo-clips/                 # Downloaded Veo sequences
│   ├── narration/                 # TTS audio files
│   ├── music/                     # Background music
│   └── reference/                 # Kuttan reference images
├── remotion.config.ts
└── package.json
```

### Key Composition Pattern

```tsx
export const CinematicVideo: React.FC<{ videoId: number }> = ({ videoId }) => {
  const script = SCRIPTS[videoId];

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Background music with narration ducking */}
      <Audio src={staticFile('music/bgm.mp3')}
        volume={(f) => script.isNarrating(f) ? 0.08 : 0.25} loop />

      <TransitionSeries>
        {/* Title card */}
        <TransitionSeries.Sequence durationInFrames={script.titleFrames}>
          <TitleCard location={script.location} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />

        {/* Veo Sequence A */}
        <TransitionSeries.Sequence durationInFrames={script.seqAFrames}>
          <AbsoluteFill>
            <OffthreadVideo src={staticFile(`veo-clips/v${videoId}-a.mp4`)} muted />
            <Audio src={staticFile(`narration/v${videoId}-a-ml.mp3`)} volume={0.85} />
            <StoryOverlay captions={script.overlaysA} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()} timing={linearTiming({ durationInFrames: 20 })} />

        {/* Veo Sequence B */}
        <TransitionSeries.Sequence durationInFrames={script.seqBFrames}>
          <AbsoluteFill>
            <OffthreadVideo src={staticFile(`veo-clips/v${videoId}-b.mp4`)} muted />
            <Audio src={staticFile(`narration/v${videoId}-b-ml.mp3`)} volume={0.85} />
            <StoryOverlay captions={script.overlaysB} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />

        {/* Chapter card */}
        <TransitionSeries.Sequence durationInFrames={script.chapterFrames}>
          <ChapterCard chapter={script.chapter} title={script.chapterTitle} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

### Render Command

```bash
npx remotion render CinematicVideo --props='{"videoId":1}' \
  --codec=h264 --crf=18 --output=output/cinematic-01.mp4
```

---

## Budget Breakdown ($300 GCP Credits)

### Veo 3.1 Costs

| Category | Videos | Calls | Rate | Subtotal |
|----------|--------|-------|------|----------|
| Standard (key emotional) | 1, 4, 13, 14, 15 | 5×8×2 = 80 | ~$1.40/call | $112 |
| Fast (remaining) | 2,3,5,6,7,8,9,10,11,12 | 10×7×2 = 140 | ~$0.60/call | $84 |
| Retake buffer (~25%) | — | ~55 | ~$0.80/avg | $44 |
| **Veo subtotal** | | | | **$240** |

> `×2` in calls = `sampleCount: 2` (generate 2 variants, pick best)

### Other GCP Costs

| Item | Tool | Cost |
|------|------|------|
| Kuttan reference images (3 poses × 5 iterations) | Imagen 4 | $4 |
| 15 establishing shot backgrounds | Imagen 4 | $4 |
| Malayalam narration (~15 videos × ~500 chars) | Chirp 3 HD | $0.23 (free tier) |
| German phrases (~50 phrases × ~100 chars) | Chirp 3 HD | $0.15 (free tier) |
| Lesson video narration (146 scripts) | Chirp 3 HD | ~$12 |
| **Other subtotal** | | **$20** |

### Free Components

| Item | Tool |
|------|------|
| English narration | Kokoro TTS (local) |
| Background music | MusicGen (local) |
| Video composition | Remotion (open source) |
| Audio normalization | ffmpeg-normalize (local) |
| Frame interpolation | RIFE (local, if needed) |
| Face fixing | FaceFusion (local, if needed) |

### Total

| Category | Cost |
|----------|------|
| Veo 3.1 video generation | $240 |
| Images + TTS + other GCP | $20 |
| **Total** | **$260** |
| **Remaining buffer** | **$40** |

---

## Execution Phases

### Phase 0 — Setup (Day 1, $0)

```bash
# Remotion
npx create-video@latest adipoli-video --template=blank
cd adipoli-video && npm install @remotion/transitions

# Kokoro TTS
pip install kokoro soundfile

# MusicGen
pip install audiocraft

# Google Cloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
pip install google-cloud-texttospeech google-cloud-aiplatform

# ffmpeg tools
pip install ffmpeg-normalize
```

### Phase 1 — Reference Assets (Day 1-2, ~$8)

1. Generate 3 Kuttan Pixar poses from kuttan-happy.png via Imagen 4
2. Review: all 3 must look like the same character
3. Generate 15 establishing shot backgrounds
4. Generate background music with MusicGen (one track, ~2 min)
5. Test Malayalam TTS: generate sample with `ml-IN-Chirp3-HD-Kore`

### Phase 2 — Pilot: Video 1 (Day 2-3, ~$20)

Full pipeline validation on Video 1 only:
1. Generate Veo Sequence A (initial + 3 extensions)
2. Generate Veo Sequence B (initial + 3 extensions)
3. Generate Malayalam narration for Video 1
4. Compose in Remotion with overlays + music
5. Review: consistency, pacing, audio sync, text readability
6. Fix any issues before proceeding

**Gate: Do NOT proceed to Phase 3 until Video 1 pilot is approved.**

### Phase 3 — Batch Production (Day 3-8, ~$230)

Priority order:
1. **Tier 1** (emotional anchors): Videos 4, 13, 14, 15
2. **Tier 2** (key story beats): Videos 2, 5, 9, 11, 12
3. **Tier 3** (supporting): Videos 3, 6, 7, 8, 10

Per video:
- Generate Veo sequences (download within 48 hours!)
- Generate TTS narration
- Compose in Remotion
- Review against consistency checklist
- 2-3 videos per day

### Phase 4 — Lesson Video Audio (Parallel, ~$12)

Can run alongside Phase 3:
- Kokoro TTS for English narration (146 scripts)
- Google Chirp 3 HD for German phrases
- Google Chirp 3 HD for Malayalam bridges

### Phase 5 — Final Assembly (Day 9-10, $0)

1. QA all 15 cinematics: consistency, audio, text
2. Color normalization pass if needed (ffmpeg)
3. Wire into app: module openers
4. Upload to platform

---

## Risk Mitigation

| Risk | Impact | Mitigation | Fallback |
|------|--------|-----------|----------|
| Kuttan drifts between videos | Visual inconsistency | 10-point consistency system | FaceFusion post-fix |
| Veo rejects cartoon person | Blocks production | Pixar style likely bypasses realistic-person filter | Use "animated character" not "man" |
| Extension drift after 4+ | Quality degradation | Reset with Frames-to-Video every 4 extensions | Shorter sequences, more transitions |
| Budget overrun | Can't finish all 15 | Tier priority system | Imagen stills + Remotion animation for Tier 3 |
| 48-hour clip expiry | Lose generated video | Download immediately after each generation | Re-generate (costs extra) |
| Malayalam TTS sounds robotic | Poor viewer experience | Test multiple Chirp 3 HD voices (28 options) | Edge-tts ml-IN-SobhanaNeural (free) |
| MusicGen output mediocre | Bad audio | Generate 5+ variants, pick best | Use royalty-free library (Kevin MacLeod) |
| Remotion rendering slow | Delays | Render at 720p, use --concurrency flag | Pre-render overnight |

---

## File Naming Convention

```
# Veo clips
veo-clips/v{VIDEO_NUM}-{SEQUENCE}.mp4
  e.g., veo-clips/v1-a.mp4, veo-clips/v1-b.mp4, v15-c.mp4

# Narration
narration/v{VIDEO_NUM}-{SEQUENCE}-ml.mp3     # Malayalam
narration/v{VIDEO_NUM}-{SEQUENCE}-de.mp3     # German phrases
narration/v{VIDEO_NUM}-{SEQUENCE}-en.mp3     # English (if needed)

# Establishing shots
backgrounds/v{VIDEO_NUM}-bg.png

# Final output
output/cinematic-{VIDEO_NUM}.mp4
```

---

> v3.0 — Complete rewrite for Veo 3.1 + Pixar style + Remotion pipeline
> Previous: VIDEO_PRODUCTION_PLAN.md (v0.2), AI_GENERATION_PLAN.md (v1)
