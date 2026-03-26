# AI Generation Plan — Adipoli German
> Using Gemini API Credits | Updated: 2026-03-26
> Covers: script generation, images, video, narration, composition

---

## Budget Overview (Gemini API Credits)

| Resource | Tool | Est. Cost | Priority |
|----------|------|-----------|----------|
| **Script generation** (146 videos) | Gemini 2.5 Flash | ~$2-3 | P0 — do first |
| **Kuttan reference images** (5 poses) | Imagen 3 | ~$0.20 | P0 — need before video |
| **Scene stills** (15 cinematics) | Imagen 3 | ~$0.60 | P1 — for thumbnails & Veo prompts |
| **AI cinematic videos** (15 clips) | Veo 2 | ~$200-240 | P2 — bulk of budget |
| **Narration audio** (all scripts) | edge-tts (free) | $0 | P0 — free, do anytime |
| **Video composition** | ffmpeg (local) | $0 | P3 — after all assets ready |
| **Printable cheatsheets** (20 sheets) | Puppeteer/React-PDF (local) | $0 | P1 — marketing + learning aid |
| **Buffer** | — | ~$10-50 | — retakes, experiments |
| **Total** | | **~$250** | |

> 90%+ of the budget goes to Veo 2 video generation. Everything else is cheap or free.

---

## Available Scripts

| Script | What it does | Status | Run command |
|--------|-------------|--------|-------------|
| `generate-scripts.ts` | Gemini 2.5 Flash → lesson narration scripts | **Ready** | `npx tsx scripts/generate-scripts.ts` |
| `generate-images.ts` | Imagen 3 → Kuttan references + scene stills | **Ready** | `npx tsx scripts/generate-images.ts` |
| `generate-narration.ts` | edge-tts → MP3 narration (EN + DE voices) | **Ready** | `npx tsx scripts/generate-narration.ts` |
| `generate-thumbnails.ts` | Puppeteer → JPEG thumbnails | **Ready** | `npx tsx scripts/generate-thumbnails.ts` |
| `compose-videos.ts` | ffmpeg → final MP4 (slides + audio + Ken Burns) | **Ready** | `npx tsx scripts/compose-videos.ts` |

All scripts require `GEMINI_API_KEY` in `.env.local` (for Gemini/Imagen).
All scripts skip existing outputs — safe to re-run.

---

## Execution Phases

### Phase 0 — Setup (~5 min, $0)

```bash
# 1. Set your Gemini API key
echo "GEMINI_API_KEY=your-actual-key" >> .env.local

# 2. Install dependencies (if not already)
npm install puppeteer   # for thumbnails + slide generation

# 3. Verify ffmpeg is installed
ffmpeg -version         # needed for video composition
```

> If you don't have ffmpeg: download from https://ffmpeg.org/download.html or `winget install ffmpeg`

---

### Phase 1 — Script Generation (~15 min, ~$2-3)

**What:** Generate full narration scripts for all 146 unscripted lesson videos.

**Why first:** Scripts are the foundation. Every other asset (audio, slides, video) derives from scripts. Cheapest phase — high ROI.

```bash
npx tsx scripts/generate-scripts.ts
```

**What happens:**
1. Loads all 18 module files, finds videos without scripts
2. Uses 2 existing hand-written scripts as few-shot examples
3. Calls Gemini 2.5 Flash for each missing script
4. Outputs to `src/lib/content/video-scripts/module-XX-scripts.ts`
5. Auto-generates barrel export (`video-scripts/index.ts`)

**Quality checks after:**
- [ ] Spot-check 5-10 scripts for tone (natural Manglish, not forced)
- [ ] Verify all keyVocabulary words appear in each script
- [ ] Check word count range (350-500 per script)
- [ ] Edit any scripts that feel off — they're just TS files

**Cost:** ~$0.015 per script × 146 = ~$2.20

---

### Phase 2 — Kuttan Reference Images (~10 min, ~$0.80)

**What:** Generate 5 reference images of Kuttan (casual, smart, formal, airport, study) + 15 scene stills for the cinematic videos.

**Why second:** Kuttan's visual consistency is critical for the AI cinematics. These reference images guide the Veo prompts and serve as thumbnails/stills.

```bash
# Generate all images
npx tsx scripts/generate-images.ts

# Or step by step:
npx tsx scripts/generate-images.ts --type reference    # Kuttan only ($0.20)
npx tsx scripts/generate-images.ts --type scenes       # 15 scenes ($0.60)
npx tsx scripts/generate-images.ts --scene 1           # Test one scene first
npx tsx scripts/generate-images.ts --dry-run           # Preview prompts
```

**Output:**
- `scripts/output/images/reference/kuttan-casual.png` (etc.)
- `scripts/output/images/scenes/scene-01-kerala-home.png` (etc.)

**Quality checks after:**
- [ ] Kuttan looks consistent across 5 poses (same person, aging outfits)
- [ ] Scene stills match the cinematic script descriptions
- [ ] Re-generate any that don't look right (they're ~$0.04 each)
- [ ] Pick the best Kuttan reference for Veo prompt anchoring

**Cost:** ~$0.80

---

### Phase 3 — Narration Audio (~30 min, FREE)

**What:** Generate MP3 narration for every script using edge-tts. Dual-voice: Indian English for Manglish narration, German voice for German phrases.

**Why now:** Free, fast, and needed for video composition. Can run in parallel with image review.

```bash
# Install edge-tts if not already
pip install edge-tts

# Generate all narration
npx tsx scripts/generate-narration.ts
```

**Output:** `scripts/output/narration/{videoId}.mp3`

**Voice setup:**
- `en-IN-PrabhatNeural` — Indian English (warm, natural for Manglish)
- `de-DE-ConradNeural` — German (native pronunciation for German phrases)
- Script auto-detects German phrases and switches voice

**Quality checks after:**
- [ ] Listen to 3-4 narrations end to end
- [ ] Check German phrase pronunciation sounds native
- [ ] Verify voice switching isn't jarring (smooth transitions)
- [ ] Confirm audio duration matches expected video length

**Cost:** $0 (edge-tts is free and runs locally)

---

### Phase 4 — Thumbnails (~10 min, FREE)

**What:** Generate 1280×720 branded JPEG thumbnails for all videos using Puppeteer.

```bash
npx tsx scripts/generate-thumbnails.ts
```

**Output:** `public/images/thumbnails/{filename}.jpg`

**Cost:** $0 (local Puppeteer rendering)

---

### Phase 5 — AI Cinematic Videos (~2-4 hours, ~$200-240)

**What:** Generate 15 cinematic video clips using Veo 2 via Gemini API.

**This is the expensive phase.** Do NOT start until Phases 1-4 are validated.

#### Pre-flight checklist:
- [ ] Kuttan reference images reviewed and approved
- [ ] All 15 cinematic scripts reviewed (in `docs/AI_CINEMATIC_SCRIPTS.md`)
- [ ] Budget confirmed: ~$200-240 for 15 clips (~755 seconds total)
- [ ] Pilot Video 1 generated first before batch

#### Pilot approach (CRITICAL):

**Step 1: Generate Video 1 alone**
```
Use the Veo prompt from AI_CINEMATIC_SCRIPTS.md → Video 1
Attach Kuttan reference image for character consistency
Generate 60-second clip, muted (video only)
```

**Step 2: Review the pilot**
- Does Kuttan look consistent with reference?
- Is the Kerala setting authentic?
- Does the camera work feel cinematic?
- Any artifacts or weird generations?

**Step 3: If pilot passes → batch the rest**
- Generate Videos 2-15 using prompts from `AI_CINEMATIC_SCRIPTS.md`
- Each generation: attach Kuttan reference + scene-specific prompt
- 1-2 second delay between API calls
- Save all clips to `scripts/output/cinematics/`

**Step 4: If pilot fails → iterate**
- Adjust prompt specificity
- Try different Kuttan reference
- Reduce clip duration
- Consider splitting into shorter segments

#### Veo 2 API usage:

> Note: Veo 2 via Gemini API may require Vertex AI or specific API access.
> Check: https://ai.google.dev/gemini-api/docs/video
> If Veo is not available via the standard Gemini API key, you'll need to:
> 1. Enable Vertex AI in Google Cloud Console
> 2. Use the Vertex AI endpoint instead
> 3. Budget allocation stays the same

#### Per-video cost:
- ~$0.35/sec for Veo 2
- Average 50 seconds = ~$17.50 per video
- 15 videos × $17.50 = ~$262 (may need to trim 1-2 videos if over budget)

#### Priority order (if budget is tight):
| Tier | Videos | Why |
|------|--------|-----|
| Must | 1, 4, 13, 14, 15 | Emotional anchors: start, family, exam, airport |
| Should | 2, 5, 9, 11, 12 | Key story beats: first word, late night, tourist, café, backwaters |
| Nice | 3, 6, 7, 8, 10 | Supporting scenes: poster, video call, mall, bedroom, study group |

> If tight on budget, generate Tier 1 (5 videos, ~$87) first. Scene stills from Phase 2 can substitute for the rest.

---

### Phase 6 — Video Composition (~2-3 hours, FREE)

**What:** Combine slides + narration audio into final lesson MP4s using ffmpeg.

```bash
# Compose all videos that have audio
npx tsx scripts/compose-videos.ts

# Or target specific content:
npx tsx scripts/compose-videos.ts --video v1-1-1     # One video
npx tsx scripts/compose-videos.ts --module 3          # All module 3 videos
npx tsx scripts/compose-videos.ts --dry-run           # Preview only
```

**What it does:**
1. Parses each script into `[SECTION]` blocks
2. Generates a branded slide image per section (Puppeteer)
3. Calculates timing from narration audio duration
4. Combines slides + audio with Ken Burns zoom effect (ffmpeg)
5. Outputs MP4 to `scripts/output/videos/`

**Output:** `scripts/output/videos/{videoId}.mp4`

**Quality checks:**
- [ ] Audio and slides are in sync
- [ ] Ken Burns effect is smooth (not too fast/slow)
- [ ] Text is readable on all slides
- [ ] Transitions between sections aren't jarring

---

### Phase 7 — Final Assembly & Upload

**What:** Combine AI cinematics + lesson videos into the course structure.

1. **AI cinematics:** Add as module openers in the app
2. **Lesson videos:** Upload to YouTube or platform
3. **Wire URLs:** Update `videoUrl` field in module data files
4. **Test:** Full playthrough of Module 1 (cinematic → lessons → exercises)

---

## Timeline (estimated)

| Phase | Time | Cost | Dependencies |
|-------|------|------|-------------|
| 0. Setup | 5 min | $0 | — |
| 1. Scripts | 15 min | ~$2 | API key |
| 2. Images | 10 min | ~$1 | API key |
| 3. Narration | 30 min | $0 | Scripts done |
| 4. Thumbnails | 10 min | $0 | — |
| 5. Cinematics | 2-4 hrs | ~$200-240 | Images reviewed, pilot approved |
| 6. Composition | 2-3 hrs | $0 | Narration + thumbnails done |
| 7. Assembly | 1-2 hrs | $0 | Everything done |
| 8. Cheatsheets | 1-2 hrs | $0 | Content exists, no dependencies |
| **Total** | **~10 hours** | **~$250** | |

> Script generation, images, and narration can all run in Phase 1-3 on the same day.
> Cinematics (Phase 5) is the gating factor — budget and quality review needed.
> Composition can happen any time after narration is ready.

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Veo 2 not available via standard Gemini API | Blocks Phase 5 | Use Vertex AI endpoint; scene stills as fallback |
| Kuttan looks inconsistent across videos | Quality issue | Generate multiple references, pick best; use image-to-video anchoring |
| Budget overrun on video generation | Can't finish all 15 | Priority tier system; scene stills for lower-tier videos |
| Script quality varies | Bad narration | Spot-check and manually edit scripts before narration |
| German pronunciation off in narration | Learning quality | edge-tts de-DE voice is good; can switch to ElevenLabs for key phrases |

---

## Fallback: Budget-Minimal Plan (~$5)

If Veo 2 access is limited or budget is tight:

1. **Scripts:** Gemini 2.5 Flash (~$2) ✅
2. **Images:** Imagen 3 for scene stills (~$1) ✅
3. **Narration:** edge-tts (free) ✅
4. **Video:** Use `compose-videos.ts` to create slide-based videos (free) ✅
5. **Cinematics:** Use scene stills as static images with text overlays instead of AI video

This gives you a complete course with lesson videos (slides + narration) for under $5.
AI cinematics can be added later when Veo budget is confirmed.

---

## Phase 8 — Printable Cheatsheet Pack (20 sheets, ~$0)

**What:** Generate 20 branded, printable A4/A3 cheatsheets covering the entire A1 curriculum. Students print them and stick them on their walls for daily reference.

**Full spec:** See `docs/CHEATSHEET_LIST.md`

**Categories:**
| # | Category | Sheets | Size |
|---|----------|--------|------|
| 1-4 | Daily Essentials (articles, verbs, cases, numbers) | 4 | A3 landscape |
| 5-7 | Survival Phrases (top 50 sentences, self-intro, requests) | 3 | A4 portrait |
| 8-13 | Vocabulary Walls (food, home, health, transport, family, work) | 6 | A3 landscape |
| 14-16 | Grammar Reference (Perfekt, W-Fragen, word order) | 3 | A4 portrait |
| 17-19 | Exam Day (format overview, email templates, form-filling) | 3 | A4 portrait |
| 20 | Culture Guide (German dos & don'ts + Kerala parallels) | 1 | A4 portrait |

**Generation approach:**
- Build a Puppeteer/React-PDF script (`scripts/generate-cheatsheets.ts`)
- Render branded HTML templates → high-res PDF (300 DPI) + PNG
- Use Adipoli German design system: dark glassmorphism, #ff6b9d / #00d9a5 / #ffd93d
- Kuttan + Appu mascot illustrations in corners
- QR codes linking to the relevant app lesson
- Bundle as downloadable "Adipoli German A1 Cheatsheet Pack" ZIP

**Content source:** All data pulled from existing module files (`src/lib/content/modules/`)

**Distribution:**
- Free download on the app (lead magnet / marketing asset)
- Shared on social media as individual PNGs
- Printed copies for offline students

**Cost:** $0 (all local rendering, content already exists)

**Dependencies:** None — can run any time. Content is already in the codebase.

---

## Quick Start (copy-paste)

```bash
# Day 1: Generate all cheap assets
npx tsx scripts/generate-scripts.ts          # $2 — scripts
npx tsx scripts/generate-images.ts --dry-run # Preview image prompts
npx tsx scripts/generate-images.ts           # $1 — images
npx tsx scripts/generate-narration.ts        # FREE — audio
npx tsx scripts/generate-thumbnails.ts       # FREE — thumbnails

# Day 1-2: Review outputs
# - Read 5-10 scripts, edit if needed
# - Check Kuttan reference images
# - Listen to narration samples

# Day 2: Compose lesson videos
npx tsx scripts/compose-videos.ts --dry-run  # Preview
npx tsx scripts/compose-videos.ts            # FREE — compose all

# Day 3+: AI cinematics (when ready)
# Use Veo 2 for the 15 cinematic clips
# Start with Video 1 pilot
# Batch remaining after pilot approval
```

---

> This plan was generated on 2026-03-26.
> All scripts are in `german-malayali/scripts/`.
> Cinematic prompts are in `docs/AI_CINEMATIC_SCRIPTS.md`.
> Production workflow details in `docs/VIDEO_PRODUCTION_PLAN.md`.
