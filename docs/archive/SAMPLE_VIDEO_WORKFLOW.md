# Sample Video Workflow — Adipoli German
> Version: 0.1 | Created: 2026-03-24
> End-to-end production workflow for one AI cinematic video (Video 1)
> Use this as the template for all 15 AI cinematics

---

## What we're making: Video 1

**"Kerala Home: The Spark"**
- Duration: 60 seconds
- Module trigger: Course intro / Module 1 opener
- German level: Zero — Kuttan knows nothing yet
- Story: Late evening. Kuttan watches a reel about life in Germany. Something shifts. He decides to go.

---

## The Source: AI Cinematic Script

From `docs/AI_CINEMATIC_SCRIPTS.md` — Video 1:

```
## Video 1 — Kerala Home: The Spark

### Veo Prompt
Cinematic short film. A young Malayali man (24, warm brown skin, dark curly hair,
white cotton shirt, sitting cross-legged on a Kerala home floor — terracotta tiles,
wooden furniture, a brass nilavilakku lamp glowing in background). Evening.
He watches his phone screen, face lit blue-white. He replays something.
Then lowers the phone and stares at the ceiling fan slowly turning. A slow smile spreads.
Wide shot establishing the room — simple, warm, Kerala home. Slow push in on his face.
Intimate, cinematic. 4K. Hopeful mood.

### Text Overlays
[0:00] — (silence — just the room)
[0:10] — "Kerala. An ordinary evening."
[0:22] — (he lowers the phone)
[0:28] — "But something just changed."
[0:40] — "Kuttan's German journey starts now."
[0:50] — "He knows zero words."
[0:58] — "Let's fix that."

### Audio
Ceiling fan, distant rain, crickets outside. No music until the final card —
then a single warm note.
```

---

## Production Pipeline (7 Steps)

```
Step 1: Generate Kuttan Reference Image (one-time, for all videos)
        ↓
Step 2: Write Final Veo Prompt (with reference image context)
        ↓
Step 3: Generate Video with Veo 3 (video, muted)
        ↓
Step 4: Generate Music Bed (per video)
        ↓
Step 5: Add Text Overlays
        ↓
Step 6: Assemble in Video Editor
        ↓
Step 7: Export Final Cut
```

---

## Step 1 — Generate Kuttan Reference Image

**One-time task — done once, used across all 15 videos.**

### What
Generate a consistent reference image of Kuttan so Veo 3 can maintain visual consistency across all clips.

### Prompt to Imagen 3
```
Portrait photo of a young Malayali man, 24 years old, warm brown skin,
dark slightly curly hair, bright curious eyes, lean build, average height.
He is wearing a simple white cotton shirt, sitting cross-legged.
Background: warm, soft, Kerala home interior with a brass oil lamp.
Neutral expression — looking slightly upward with hope.
Style: photorealistic, cinematic, warm lighting.
```

### Tool
**Imagen 3** via Vertex AI

### Output
1 reference image — saved as `assets/kuttan-reference.png`

### Est. cost
~€0.50 (2–3 API calls)

### Time
~5 minutes

---

## Step 2 — Write Final Veo Prompt

**Per video — 10 minutes**

Take the base prompt from the AI Cinematic Scripts doc and add:
- Reference to Kuttan reference image
- Style consistency notes
- Camera movement details
- Time of day / lighting specifics

### Final Veo 3 prompt for Video 1
```
Use this character as reference: [kuttan-reference.png]

Cinematic short film. A young Malayali man (24, warm brown skin, dark curly hair,
white cotton shirt, sitting cross-legged on a Kerala home floor — terracotta tiles,
wooden furniture, a brass nilavilakku lamp glowing in background). Evening.
He watches his phone screen, face lit blue-white. He replays something on his phone.
Then lowers the phone and stares at the ceiling fan slowly turning.
A slow smile spreads across his face.
Start wide establishing the room, slowly push in on his face.
Intimate, cinematic, 4K, hopeful mood. Natural lighting from window + lamp.
No dialogue. No text. No subtitles in the video itself.
```

### Output
Final prompt text — paste into Vertex AI Veo 3 interface.

---

## Step 3 — Generate Video with Veo 3

**Per video — 10–20 minutes (generation + review)**

### How
1. Go to Vertex AI → Video Generation → Veo 3
2. Paste the final prompt
3. Add reference image (kuttan-reference.png)
4. Set duration: 60 seconds (if available — if max 20s, generate 3 clips)
5. Generate
6. Review — if not good, regenerate with prompt adjustments

### Output
Raw Veo 3 video file (MP4, muted)

### Est. cost
~€14 (60 seconds × ~€0.23/sec Veo 3 pricing)

### Time
~15–30 minutes including review and 1 regeneration if needed

### Note
If Veo 3 max clip length is 20 seconds, generate 3 × 20-second clips and splice in editor:
- Clip A: 0:00–0:20 (wide establishing shot)
- Clip B: 0:20–0:40 (medium push-in)
- Clip C: 0:40–0:60 (close-up face)

---

## Step 4 — Generate Music Bed

**Per video — 10 minutes**

### What
Create a short ambient music piece (30–90 seconds) that fits the mood of this specific video.

### For Video 1 (Kerala Home, hopeful, quiet evening):
- Mood: warm, hopeful, intimate, Kerala evening
- Instruments: soft piano, subtle strings, ambient Kerala sounds (optional)
- No lyrics

### Tools (choose one)

**Option A — AI music generation (fastest, cheapest)**
- **Udio** or **Suno** — generate a 60-second ambient piece
- Prompt: "warm ambient piano, hopeful Malayali evening mood, cinematic, no vocals, 60 seconds"
- Cost: ~€0.10–0.20

**Option B — AIVA (composer AI)**
- Monthly subscription (~€15/month) — unlimited generations
- Export the specific track you want
- Cost: ~€0.10–0.15 per track amortised

**Option C — Hire a composer (one-time)**
- Find a small Malayali-German fusion musician on Fiverr
- Commission a 2-minute track, chop it into 15 pieces
- Cost: ~€30–50 one-time for the full suite

### Recommendation
**Option C (Fiverr composer)** — one brief brief, full music suite, consistent identity across all 15 videos. Worth the small investment.

### Output
MP3 music file — `video-01-music.mp3`

### Time
~10 minutes (AI) to ~1 week (composer, if batched)

---

## Step 5 — Add Text Overlays

**Per video — 15–20 minutes**

### What
Burn the text overlays directly into the video using a video editor.

### Text overlays for Video 1:
```
[0:00] — (silence — just the room)
[0:10] — "Kerala. An ordinary evening."
[0:22] — (he lowers the phone)
[0:28] — "But something just changed."
[0:40] — "Kuttan's German journey starts now."
[0:50] — "He knows zero words."
[0:58] — "Let's fix that."
```

### How
In CapCut or DaVinci Resolve:
1. Import the Veo 3 video clip
2. Add text/title layer
3. Place each text overlay at the correct timestamp
4. Style: clean white text, semi-transparent dark background, readable font
5. Duration: each overlay stays for 3–5 seconds

### Style guidelines for all 15 videos:
- Font: clean sans-serif (Inter, Poppins, or similar)
- Text colour: white or warm gold
- Background: subtle dark overlay behind text (not always)
- Position: lower third or centre (based on scene composition)
- Animation: gentle fade-in/fade-out

### Output
Video with text overlays burned in (no audio yet)

### Time
~15–20 minutes per video

---

## Step 6 — Assemble in Video Editor

**Per video — 15–20 minutes**

### What
Combine all layers into the final cut:
1. Video (from Step 3)
2. Text overlays (from Step 5)
3. Music bed (from Step 4)

### In CapCut:
```
Track 1: Video clips (Veo 3)
Track 2: Text overlays (positioned on timeline)
Track 3: Music bed (volume at ~20–30% — subtle, not dominant)
↓
Fade out last 3 seconds
↓
Export as MP4
```

### Audio mixing notes:
- Music: 20–30% volume — background, not dominant
- If Veo 3 generated ambient sounds you want to keep: mix those at 10% under the music
- Final audio should feel like "quiet evening room with gentle music underneath"

### Output
Assembled MP4, no audio issues, text visible

### Time
~15–20 minutes

---

## Step 7 — Export Final Cut

**Per video — 5–10 minutes**

### Export settings:
- Format: MP4 (H.264)
- Resolution: 1080p minimum (4K if available)
- Frame rate: 30fps
- Quality: High
- File size target: < 100MB per 60-second clip

### Naming convention:
```
adipoli-german-a1-video-01-kerala-home-spark.mp4
```

### Upload to platform:
- Google Drive (organized by module)
- Or directly to your course platform's media library

### Output
Final deliverable — `video-01-final.mp4`

### Time
~5–10 minutes export + upload

---

## Video 1 — Full Cost & Time Summary

| Step | Tool | Cost | Time |
|------|------|------|------|
| 1. Kuttan reference | Imagen 3 | ~€0.50 | 5 min |
| 2. Write Veo prompt | (manual) | €0 | 10 min |
| 3. Generate video | Veo 3 (Vertex AI) | ~€14 | 20 min |
| 4. Music bed | AI music / composer | ~€3 | 10 min |
| 5. Text overlays | CapCut | €0 | 20 min |
| 6. Assembly | CapCut | €0 | 20 min |
| 7. Export + upload | — | €0 | 10 min |
| **Video 1 Total** | | **~€18** | **~95 min** |

> Note: Steps 1 (Kuttan reference) is a one-time cost shared across all 15 videos.
> After that, each video costs ~€17.50 and takes ~90 minutes.

---

## 15-Video Batch Estimate

| Item | Cost | Time |
|------|------|------|
| Kuttan reference (one-time) | ~€0.50 | 5 min |
| 15 × video generation (Veo 3) | ~€210 | ~5 hrs |
| 15 × music beds | ~€15 (AI) | ~2.5 hrs |
| 15 × text overlays | €0 (CapCut) | ~5 hrs |
| 15 × assembly | €0 (CapCut) | ~5 hrs |
| Export + upload | €0 | ~2.5 hrs |
| **A1 Cinematics Total** | **~€225** | **~20 hrs** |

---

## Per-Video Checklist

Before declaring a video DONE, verify:
- [ ] Veo 3 video generated and reviewed (no major artifacts)
- [ ] Music bed fits the mood and loops cleanly
- [ ] All text overlays appear at correct timestamps
- [ ] Text is readable (contrast, size, position)
- [ ] Music volume is at the right level (subtle, not dominant)
- [ ] No audio clipping or sync issues
- [ ] Exported at 1080p minimum
- [ ] Named correctly and uploaded to platform
- [ ] Added to module in the app's journey system

---

## Lesson Video Workflow (separate track)

For comparison — how Nikhil's lesson videos are made:

```
Step 1: Nikhil records on camera (phone/camera, following lesson script)
        ↓
Step 2: Transfer to laptop
        ↓
Step 3: Edit in CapCut — trim, add grammar slides, text overlays, pause markers
        ↓
Step 4: Add background music (optional — light, non-distracting)
        ↓
Step 5: Export + upload to platform
```

**Per lesson video:**
- Recording: ~20–30 min (8–15 min lesson)
- Editing: ~30–45 min
- Cost: €0 (no AI generation needed)
- Total: ~60–75 min per lesson video

**72 lesson videos × ~60 min = ~72 hours of work (Nikhil's time)**

---

## Pilot Before Batch

Before producing all 15 cinemamatics:
1. Complete Video 1 end-to-end as a full pilot
2. Watch the final cut — does it feel right?
3. Does the Veo output match your vision?
4. Is the music bed working?
5. Are the text overlays readable and well-timed?

Fix the pipeline on Video 1 before scaling to 15.

---
