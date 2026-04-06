# Video Pipeline — Technical Plan v4.0
> Adipoli German A1 | Updated: 2026-04-06
> Pixar 3D Style | Imagen + Veo 3.1 + ElevenLabs/Real Voice + Remotion
> Budget: $300 GCP Trial Credits

---

## What Changed from v3

| Issue in v3 | v4 Fix |
|---|---|
| Planning entire system before proving it works | **Pilot-gate everything**: must pass Video 1 and Video 5 before committing to full batch |
| Character consistency "9/10 confidence" too optimistic | **Prove consistency on video 1, not in theory** |
| Narration risk underplayed | **Narration is a Tier 1 risk, not Tier 3** |
| All 15 videos treated as equal production burden | **Aggressive tiering: Tier A (6 videos) vs Tier B (9)** |
| ~65s targets may feel overlong | **Harder duration caps**: Tier A ≤55s, Tier B ≤45s |
| No explicit kill criteria | **Every gate has hard pass/fail criteria** |
| Overly dense text overlays in scripts | **Overlay budget per video: max 8 lines** |
| Malayalam TTS voice untested | **Voice selection before any batch work** |
| Audio strategy assumed TTS-first narration | **Voice becomes an art-directed layer: ElevenLabs or real voice are first-class options** |
| Clip expiry risk (48h) mentioned but not actioned | **Immediate download + local backup as step 1 of every generation** |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRE-PRODUCTION                        │
│  Imagen 4 → Kuttan reference images (3 poses)           │
│  Imagen 4 → 15 establishing shot backgrounds            │
│  MusicGen / curated score → Background music palette    │
│  Voice test → ElevenLabs or real voice selection        │
│  PILOT GATE 0 → All above must pass before Phase 2      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              PILOT PHASE (Videos 1 + 5 only)             │
│  Generate + download + assemble                           │
│  Full QA against checklist                               │
│  KILL GATE A → Pass to continue. Fail = pivot.          │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              TIER A PRODUCTION (Videos 4, 9, 12, 14, 15) │
│  Priority order: 9 → 4 → 12 → 14 → 15                 │
│  KILL GATE B → Each video reviewed before next starts   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              TIER B PRODUCTION (Videos 2,3,6,7,8,10,11,13│
│  Simpler sequences, faster cadence                       │
│  Batch review after every 3 videos                      │
└─────────────────────────────────────────────────────────┘
```

---

## Pilot Gate 0 — Pre-Production Readiness Checklist

Before any video generation begins, ALL of the following must be confirmed:

- [ ] Gemini API key active and responding
- [ ] Vertex AI endpoint verified (`us-central1`)
- [ ] GCS bucket `gs://adipoli-veo/output/` created and writable
- [ ] Kuttan reference images generated (3 poses, Pixar style, consistent character)
- [ ] All 3 reference images reviewed: same person, correct style, no drift
- [ ] Establishing shot backgrounds generated (at least 3 test shots)
- [ ] MusicGen tested: generates 30s clip, quality acceptable
- [ ] Kuttan voice path selected before production:
      choose one of:
      - ElevenLabs Kuttan voice
      - real recorded Kuttan voice
- [ ] If using ElevenLabs: generate 3 short Kuttan test lines and lock one voice
- [ ] If using real voice: record 3 short Kuttan test lines and approve delivery style
- [ ] Supporting voice policy decided:
      - Amma: real voice preferred for emotional scenes
      - narrator: optional, not required everywhere
      - side characters: only when story needs them
- [ ] ffmpeg installed and verified
- [ ] Remotion project bootstrapped (`npx create-video --blank adipoli-video`)
- [ ] Download script tested: can pull from GCS to local `veo-clips/` within 10 minutes
- [ ] Download script is automated inside the generation pipeline with retry logic (at least 5 retries) and hard failure alerts
- [ ] "Amma... pass aayi" tested across at least 3 Malayalam voices before any pilot generation
- [ ] Fine-motor action test completed: character writing in notebook and handling a phone both look acceptable in Veo Fast

**Gate 0 owner**: automated pre-flight script. Run before Phase 1.

---

## Pilot Phase — Videos 1 and 5 Only

### Why These Two

| Video | Why | What It Proves |
|---|---|---|
| **Video 1** | Pipeline end-to-end | Veo → download → Remotion → audio sync → overlay readability |
| **Video 5** | Quiet / dialogue-free / emotional | Character consistency in low-dialogue cinematic; ambient-only audio |

### Video 1 — Full Production Test

**Goal**: Complete pipeline proof. Everything must work.

Steps:
1. Generate Sequence A (initial + 2 extensions = 22s Veo)
2. Generate Sequence B (initial + 2 extensions = 22s Veo)
3. **Download immediately** to `veo-clips/v1-a.mp4`, `v1-b.mp4`
4. Generate Kuttan voice line(s) using ElevenLabs or real voice recording
5. Generate any required supporting audio (German phrase / ambient / score)
6. Compose in Remotion: title card → A → transition → B → chapter card
7. Render → MP4
8. Full QA (see checklist below)

### Video 5 — Quiet Emotional Test

**Goal**: Prove Kuttan consistency holds without dialogue, under ambient-only audio.

Steps:
1. Generate Sequence A (initial + 2 extensions)
2. Generate Sequence B (initial + 2 extensions)
3. **Download immediately**
4. No narration — ambient audio only
5. Compose in Remotion
6. Render → MP4
7. QA: character consistency, emotional beat, pacing

### Kill Gate A — Pilot Review Criteria

After Videos 1 and 5 are rendered, evaluate ALL of the following:

#### Character Consistency (hard fail if any are wrong)
- [ ] Kuttan identifiable as same character across both sequences in Video 1
- [ ] No hat/glasses/ beard/realistic style artifacts
- [ ] Outfit tier correct (casual: videos 1-6)
- [ ] Backpack visible and correct
- [ ] Face shape, skin tone, hair consistent between initial clip and extensions

#### Video 1 QA
- [ ] Title card readable at 720p
- [ ] Text overlays readable, not overlapping key action
- [ ] Narration audio sync with action feels natural
- [ ] Music level correct (present at resolution beat, not overwhelming)
- [ ] Duration ≤65s
- [ ] Transition is smooth (no jump cut)
- [ ] Chapter card clean and branded

#### Video 5 QA
- [ ] Emotional beat lands without dialogue
- [ ] Ambient audio creates mood (not empty feeling)
- [ ] Pacing feels tight, not overlong
- [ ] No music needed — silence correct choice confirmed
- [ ] Character consistency across all 4 clips

#### Voice QA (Video 1 only)
- [ ] Kuttan voice sounds human and emotionally believable
- [ ] Voice delivery matches character age and tone
- [ ] German phrase audio correct accent
- [ ] Audio levels balanced (voice > music when needed)
- [ ] Scene still works if narration is reduced or removed

**Pass criteria**: ≥80% of checklist items pass.
**Fail = pivot, not retry**: If consistency fails, adjust reference images or style prompts. If narration fails, select different voice. If pacing fails, cut duration targets.

**Do NOT proceed to Tier A until Kill Gate A passes.**

---

## Tier A Videos — Priority Order

After pilot approval, produce in this order:

| Priority | Video | Why Tier A | Reason for Order |
|---|---|---|---|
| 1 | **4** | Family dinner / Amma moment | Emotional anchor; intimate indoor scene, lower technical risk |
| 2 | **12** | Backwaters / phone call | Quiet emotional; strong visual payoff with lower crowd complexity |
| 3 | **14** | Exam hall / silence | Tests pure cinematic tension; no music risk |
| 4 | **9** | First real German conversation | Important story beat, but technically harder due to multi-character interaction |
| 5 | **15** | Airport / ending | Highest risk; do last so all learnings apply |
| 2 | **4** | Family dinner / Amma moment | Emotional anchor; tests intimate indoor family scene |
| 3 | **12** | Backwaters / phone call | Quiet emotional; tests natural outdoor + phone audio |
| 4 | **14** | Exam hall / silence | Tests pure cinematic tension; no music risk |
| 5 | **15** | Airport / ending | Highest risk; do last so all learnings apply |

### Tier A Kill Gate B

After each Tier A video:
- Review immediately
- Note failures
- Fix before next video
- If same failure appears twice → stop and revisit system-level fix

### Tier A Duration Caps

| Video | Hard Cap | Rationale |
|---|---|---|
| 9 | ≤45s | Must stay simpler than v3/v4 draft; multi-character complexity needs tighter runtime |
| 4 | ≤55s | Family dinner has natural warmth |
| 12 | ≤50s | Quiet beats; overlong = boring |
| 14 | ≤45s | Tension works in less time |
| 15 | ≤75s | Only video that earns longer runtime |

---

## Tier B Videos — Simplified Production

Tier B videos use:
- **1 sequence only** (no multi-sequence architecture)
- **3 extensions max** = 29s Veo + 6s bookends = **≤35s total**
- Simpler overlay structure: **max 5 text lines**
- Music optional (narrator voice carries tone if present)

### Tier B Duration Caps

| Video | Hard Cap |
|---|---|
| 2 | ≤40s |
| 3 | ≤40s |
| 6 | ≤40s |
| 7 | ≤35s |
| 8 | ≤35s |
| 10 | ≤40s |
| 11 | ≤45s (strong emotional content) |
| 13 | ≤40s |

---

## Audio System — Character-First, Not TTS-First

### Core Principle

Automation can handle a lot of the pipeline:
- reference images
- Veo shot generation
- download / asset handling
- assembly in Remotion
- timing and export

But **voice is the art-directed layer**.
The system should assume:
- Kuttan speaks in every video
- one consistent Kuttan voice must carry the full series
- real voice is a first-class option, not a fallback embarrassment

### Voice Selection is Phase 0, Not Phase 3

**Step 0 (before any video generation)**: test and lock the Kuttan voice path.

Preferred order:
1. **ElevenLabs Kuttan voice** — if it sounds natural and emotionally flexible
2. **Real recorded Kuttan voice** — if ElevenLabs does not feel premium enough
3. **Synthetic Google TTS** — prototype only, not final emotional delivery

### Audio Principles

1. **Kuttan is the primary voice across the series**
2. **Narrator is optional, not mandatory**
3. **Use dialogue/monologue as the default cartoon mode**
4. **Keep spoken lines short and purposeful**
5. **Use silence, ambient, and score to prevent audio fatigue**
6. **German phrases always remain correct and controlled**

### Recommended Voice Roles

- **Kuttan**: same voice in all 15 videos
- **Amma**: real voice preferred for emotional scenes
- **Narrator**: optional; use only where structure benefits
- **Supporting characters**: minimal, only where story requires them

### Audio Layers (in Remotion)

```
Layer 1: Background music / score palette
Layer 2: Character voice (Kuttan first)
Layer 3: Ambient world sound
Layer 4: Optional narrator or supporting voice
Music ducks under dialogue/monologue when needed
```

---

## Character Consistency — Hardened System

### The 10-Point System (Same as v3, with Kill Gates Added)

1. Reference images: 3 poses, PNG, ≤10MB, sRGB
2. Prompts ≥40 words (minimize prompt rewriter impact)
3. Verbatim character block in every prompt
4. Verbatim style block in every prompt
5. Front-load character before scene in prompt
6. Extension drift reset: **every 3 extensions max** → start new initial clip from last frame
7. Split-shot for multi-character scenes (no two similar characters in same frame)
8. Negative prompt on every call
9. Per-shot consistency checklist (same as v3)
10. Post-processing: FaceFusion available as safety net

### Extension Drift Kill Criteria

After any sequence extension:
- Review last 3 seconds of extended clip
- If character drifted beyond recovery → **stop extending that sequence**
- Start new initial clip from last frame using image-to-video mode
- Log: "Sequence X reset at extension Y due to drift"

### Outfit Tiers (unchanged from v3)

- **Videos 1–6**: casual white cotton shirt, jeans, rubber slippers
- **Videos 7–12**: neat green collared shirt, jeans, brown shoes
- **Videos 13–15**: clean formal blue shirt, dark trousers, polished shoes

---

## Duration Budget

| Tier | Videos | Target Range | Hard Cap | Veo Calls Est. |
|---|---|---|---|---|
| Pilot | 1, 5 | 50–65s | 65s | 8 per video |
| Tier A | 4, 9, 12, 14, 15 | 45–75s | 75s | 6–10 per video |
| Tier B | 2,3,6,7,8,10,11,13 | 35–45s | 45s | 4 per video |

**Total Veo call budget**: ~140 calls
**Estimated Veo cost at $0.15/s**: ~$150–165
**Remaining buffer**: ~$135 (covers retakes + Tier A upgrades to Standard model)

---

## Explicit Kill Criteria — Decision Table

| Scenario | Action | Threshold |
|---|---|---|
| Kuttan drift after 2 extensions | Reset sequence from last frame | Drift visible in last 3s |
| Kuttan drift after reset | Abandon that sequence, simplify to still-image + Ken Burns | Reset clip still shows drift |
| ElevenLabs Kuttan voice feels fake or emotionally weak | Switch to real recorded Kuttan voice | Voice test fails premium/character test |
| Malayalam TTS fails emotional test on the Amma line | Switch to human voice for all key Malayalam anchor lines | 3 tested voices all sound robotic / IVR-like |
| Fine-motor writing action looks broken | Rewrite scene beats to avoid writing close-ups | Hand or pen action looks warped in pilot motion test |
| Narration voice sounds robotic | Switch voice, re-record all Tier A narrations | Any 2 reviewers flag same voice |
| Tier A video fails emotional test | Move to Tier B duration/approach | <60% emotional rating from test audience |
| Budget exceeds $200 before Video 12 | Switch Tier B to Standard model for Tier A only | Budget tracker shows >$200 at Video 9 |
| Clip expires from GCS | Regenerate immediately (costs retake budget) | Any clip missing at review |
| Veo rejects prompt 3x same video | Simplify prompt, remove reference images, use image-to-video fallback | 3 consecutive 400 errors |

---

## Veo 3.1 API Configuration

```json
{
  "instances": [{
    "prompt": "STYLE + CHARACTER + SCENE + CAMERA + MOOD (≥40 words)",
    "referenceImages": [
      { "image": { "bytesBase64Encoded": "..." }, "referenceType": "asset", "mimeType": "image/png" }
    ]
  }],
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

**Model**: `veo-3.1-fast-generate-001` (GA)
**Upgrade to Standard** (`veo-3.1-generate-preview`): Only for Videos 14 and 15 if Fast pilot quality is insufficient.

---

## File Naming Convention

```
veo-clips/v{VideoNum}-{sequenceLetter}.mp4    # e.g. v1-a.mp4, v9-b.mp4
veo-clips/v{VideoNum}-{seqLetter}-ext{N}.mp4  # extension clips
narration/v{VideoNum}-{sequence}-ml.mp3
narration/v{VideoNum}-{sequence}-de.mp3
backgrounds/v{VideoNum}-bg.png
output/cinematic-{VideoNum}.mp4
```

---

## Execution Phases

### Phase 0 — Pre-Flight (Day 1, $0)
```bash
# 1. Run pre-flight script
npx tsx scripts/pre-flight-check.ts

# 2. Generate and review Kuttan reference images
npx tsx scripts/generate-images.ts --type reference

# 3. Select and lock Kuttan voice path
python scripts/test-kuttan-voice.py

# 4. Bootstrap Remotion project
npx create-video --blank adipoli-video
cd adipoli-video && npm install @remotion/transitions

# 5. Test full download pipeline
python scripts/test-gcs-download.py

# 6. Test the key emotional line before any pilot render
python scripts/test-amma-line.py

# 7. Test fine-motor actions in Veo Fast
npx tsx scripts/test-motion-risk.ts --action writing --action phone
```

### Phase 1 — Pilot (Day 2–3, ~$20)
- Video 1: full pipeline end-to-end
- Video 5: quiet emotional test
- Full QA against Kill Gate A checklist
- **Kill Gate A**: must pass before Tier A

### Phase 2 — Tier A (Day 4–7, ~$80)
- Video 4 → QA → Video 12 → QA → Video 14 → QA → Video 9 → QA → Video 15 → QA
- Download immediately after each generation
- Budget check after Video 9: if >$100 used, evaluate upgrade strategy

### Phase 3 — Tier B (Day 8–10, ~$50)
- Batch produce remaining 8 videos
- Review every 3 videos
- Simplified sequences, faster cadence

### Phase 4 — Final Assembly (Day 11–12, $0)
- Color normalization pass if needed
- QA all 15 together for style consistency
- Wire into app
- Upload

---

## Budget Summary

| Phase | Cost Estimate |
|---|---|
| Phase 0 (setup) | $0 |
| Phase 1 (pilot × 2) | ~$20 |
| Phase 2 (Tier A × 5) | ~$80 |
| Phase 3 (Tier B × 8) | ~$50 |
| Retake buffer | ~$50 |
| Phase 4 (assembly) | $0 |
| **Total** | **~$200** |
| **Remaining** | **~$100 buffer** |

---

## Quick Start

```bash
# Day 1: Pre-flight
npx tsx scripts/pre-flight-check.ts
python scripts/test-tts-voices.py        # select voice, lock it
npx tsx scripts/generate-images.ts --type reference   # Kuttan references

# Day 2: Pilot
npx tsx scripts/generate-veo.ts --video 1  # then download immediately
python scripts/generate-kuttan-voice.py --video 1
npx remotion render CinematicVideo --props='{"videoId":1}'
# QA → Kill Gate A

# Day 3: Video 5 pilot
npx tsx scripts/generate-veo.ts --video 5  # no narration
npx remotion render CinematicVideo --props='{"videoId":5}'
# QA Kill Gate A

# Day 4+: Tier A — in priority order (9, 4, 12, 14, 15)
# Day 8+: Tier B — batch 3 at a time
```

---

> v4.0 — Pilot-gate pipeline, hardened kill criteria, aggressive tiering, narration prioritized, duration caps
> Key changes: Gate 0 (pre-flight), Gate A (pilot review), Gate B (per-Tier-A review), Tier B simplified sequences
