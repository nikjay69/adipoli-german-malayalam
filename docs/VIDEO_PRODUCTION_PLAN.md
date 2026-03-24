# Video Production Plan — Adipoli German
> Version: 0.2 | Updated: 2026-03-24
> Tracks the full video production pipeline for Adipoli German A1

---

## The Big Picture

**Two types of video. Two very different production flows.**

| Type | Who creates it | What it is |
|------|---------------|------------|
| **Lesson Videos** | Nikhil on camera | Teaching, explaining, drilling — the core learning content |
| **AI Cinematic Videos** | AI-generated (Veo 3 + separate audio) | Journey cutscenes, transitions, module openers — the game narrative layer |

These two types work **together** in every module.
The AI video sets the scene. Nikhil teaches.

---

## Audio Decision — Separate Audio

**Veo 3 built-in audio will NOT be used for final output.**

Why:
- Each video needs a **consistent music identity** (Kerala-German fusion theme across all 15 clips)
- Learner experience requires **controlled, deliberate audio** — not AI-generated ambient sounds
- Layering Veo 3 audio + TTS narration = unnecessary production complexity
- Video 15 needs a specific emotional voice line ("Amma... pass ayi.") that Veo cannot generate reliably

**Production rule:** Veo 3 generates video only. All audio is added separately.

---

## Type 1 — Lesson Videos (Nikhil on camera)

### What these are
- Nikhil talking directly to camera
- Teaching the grammar, vocab, dialogues
- Following the 72 production scripts already written
- Teach → Drill → Apply structure
- Malayalam bridges delivered naturally

### Format
- Camera: phone or proper camera (your call)
- Background: clean, simple, branded
- Duration: 8–15 min per video
- Language: mix of Malayalam + German + English as per scripts
- Editing: add text overlays, grammar slides, pause prompts

### Total count
**72 lesson videos** across 18 modules

### Production note
The scripts are already done. Nikhil reads/follows the script. Simple.

---

## Type 2 — AI Cinematic Videos

### What these are
- Short AI-generated clips (30–90 seconds each)
- Tell the story of Kuttan's journey
- No teaching — pure narrative/emotion/game feel
- Used as:
  - **Module openers** — "where are we in the journey?"
  - **Level transitions** — arriving at a new location
  - **Emotional anchors** — the moments that make the story real

### These are NOT lesson videos
They are **cutscenes** — like in a video game.
They make the learner feel "I'm playing something, not just studying."

### Audio for AI Cinematics
- **Music:** Consistent Kerala-German fusion theme. One composer or AI music tool generates the full suite.
- **Text overlays:** burned in as subtitle-style text (no TTS needed for most videos)
- **Video 15 only:** Add a single voice line via ElevenLabs — "Amma... pass ayi."

---

## Kuttan's Journey Map — A1 AI Video Locations

**A1 Rule:** Kuttan stays in Kerala/Airport. Germany is A2.

| # | Location | Story Moment | Module Trigger | Duration |
|---|----------|-------------|----------------|----------|
| 1 | Kerala — Home | The decision to go | Module 1 opener | 60s |
| 2 | Kerala — Neighbourhood | First broken word attempt | Module 2 opener | 45s |
| 3 | Kochi — City | Goethe poster spotted | Module 3 opener | 45s |
| 4 | Kerala — Home | Family dinner, first full sentence | Module 4 opener | 60s |
| 5 | Study Spot | Late night verb drilling | Module 5 opener | 60s |
| 6 | Video Call | Cousin in Germany tests him | Module 6 opener | 45s |
| 7 | Kochi Mall | German in public | Module 7 opener | 45s |
| 8 | Kerala — Home | Describing his room | Module 8 opener | 45s |
| 9 | Kochi Bus Stand | Helps a German tourist | Module 9 opener | 60s |
| 10 | Study Group | Kuttan teaches friends | Module 10 opener | 45s |
| 11 | Kochi Café | Helps German couple | Module 11 opener | 60s |
| 12 | Backwaters | Phone call in German | Module 12 opener | 60s |
| 13 | Goethe Kochi | Exam registration | Modules 13/14 | 60s |
| 14 | Exam Hall | The final boss | Modules 17/18 | 60s |
| 15 | Airport | BESTANDEN. Boards the plane. | Completion | 90s |

**Total: 15 AI cinematic videos | ~755 seconds (~12.5 min)**

---

## AI Cinematic Video Structure

Each AI cinematic follows this template:

```
[0:00–0:05]  Location title card — "Kochi International Airport"
[0:05–0:40]  AI-generated scene (Veo 3 video, muted)
[0:40–0:50]  Brief text overlay — emotional hook / story context
[0:50–end]   Fade to lesson / module intro
```

### Tone
- Cinematic, warm, emotional
- Malayalam music undertones
- Text overlays carry the story
- Video 15: single voice line for the call

---

## Production Pipeline (per video)

See the full sample workflow in: `docs/SAMPLE_VIDEO_WORKFLOW.md`

---

## Budget Allocation (Google API €250)

| Item | Tool | Est. Cost |
|------|------|-----------|
| Veo 3 (video only, muted) | 15 clips (~755 sec) | ~€200 |
| Imagen 3 | Kuttan reference + scene stills | ~€15 |
| ElevenLabs | Video 15 voice line only | ~€5 |
| Music (full suite) | AI music tool or composer | ~€15–30 |
| Buffer | — | ~€5–20 |
| **Total** | | **~€250** |

> Lesson videos (Nikhil on camera) cost €0 for AI production.
> Editing tools: CapCut or DaVinci Resolve (free).

---

## Production Sequence

### Phase 1 — Pilot (one video first)
1. Generate Video 1 as a full pilot (Veo → audio → edit → final)
2. Validate the entire pipeline before batch-producing all 15
3. Fix any issues on one before scaling

### Phase 2 — AI Cinematics (batch)
1. Generate all 15 Veo clips
2. Add music bed to each
3. Add text overlays
4. Video 15: add ElevenLabs voice line
5. Export final cuts

### Phase 3 — Lesson Videos (main production)
1. Nikhil records on camera following lesson scripts
2. Edit: add grammar slides, text overlays, pause markers
3. 72 videos — batch by module

### Phase 4 — Assembly
1. Each module = AI cinematic opener + lesson videos
2. Upload to platform
3. Wire into existing app journey system

---

## Next Steps

- [x] Write all 15 AI cinematic scripts
- [ ] Finalise Kuttan's visual reference image
- [ ] Set up Google Vertex AI / Veo 3 access
- [ ] Test Video 1 full pilot pipeline (Veo → audio → edit → final)
- [ ] Generate remaining 14 AI cinemamatics
- [ ] Nikhil records Module 1 lesson videos (pilot batch)

---

> v0.2 — Audio decision updated, A1 journey map corrected (Kerala only), pipeline documented
