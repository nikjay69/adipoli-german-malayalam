# Pilot Foundation — Video 1: The Spark

> Goal: build the minimum reliable foundation for the first cinematic pilot before any final Veo generation.
> This file is not the full production doc. It is the practical starting kit.

---

## Pilot Objective

Video 1 must prove five things:

1. **Kuttan looks consistent enough to become a recurring character**
2. **The visual style feels premium, not cheap AI mush**
3. **Kuttan's voice feels believable enough for the cartoon/story format**
4. **The pacing works at short runtime**
5. **The full assembly flow works**
   - references
   - video generation
   - audio
   - overlays
   - Remotion render

If Video 1 fails, fix the system before touching later videos.

---

## Pilot Scope

### This pilot includes
- Kuttan reference images
- 2-sequence visual structure
- Kuttan voice lines
- minimal overlays
- ambient + score bed
- final assembled pilot render

### This pilot does NOT try to prove
- crowd scenes
- multi-character speaking scenes
- emotional crying realism
- airport climax quality
- exam-hall tension

That comes later.

---

## Kuttan Character Lock

### Non-negotiable traits
- young Malayali man
- early 20s
- warm, expressive face
- slightly soft, approachable features
- medium-brown skin tone
- black hair, clean and simple
- no beard
- no glasses
- not hyper-stylized goofy
- not realistic live-action
- Pixar-style 3D, clean and emotionally readable

### Outfit lock for Video 1
- casual white cotton shirt
- jeans
- rubber slippers
- small black backpack when visible

### Emotional state for Video 1
- curious
- restless
- quietly pulled toward something bigger
- not dramatic from frame one
- resolution grows gradually

---

## Reference Image Pack

Generate these first.

### Ref 1 — Front
**Use:** face identity anchor

Prompt:

```text
Pixar-style 3D character turnaround portrait of a young Malayali man in his early 20s. Warm expressive face, medium-brown skin, black hair, no beard, no glasses. Wearing a casual white cotton shirt. Clean stylized 3D animation look, soft cinematic lighting, high facial readability, emotionally grounded, not exaggerated, not realistic. Front-facing neutral pose, simple background.
```

### Ref 2 — Three-quarter
**Use:** main cinematic identity anchor

Prompt:

```text
Pixar-style 3D character portrait of a young Malayali man in his early 20s. Warm expressive face, medium-brown skin, black hair, no beard, no glasses. Wearing a casual white cotton shirt. Three-quarter angle, slightly thoughtful expression, cinematic warm lighting, clean 3D animation render, emotionally grounded, not exaggerated, not realistic. Simple neutral background.
```

### Ref 3 — Profile
**Use:** side-angle consistency check

Prompt:

```text
Pixar-style 3D character side profile of a young Malayali man in his early 20s. Warm expressive face, medium-brown skin, black hair, no beard, no glasses. Wearing a casual white cotton shirt. Profile pose, calm expression, cinematic warm lighting, clean 3D animation render, emotionally grounded, not exaggerated, not realistic. Simple neutral background.
```

---

## Lighting Stress Test

Before locking Kuttan, verify him in 4 lighting conditions:

1. warm Kerala evening lamp light
2. phone-screen night blue light
3. golden hour outdoor light
4. cool neutral interior light

Pass rule:
- still clearly same person in all 4

Fail rule:
- hair / face / age / skin / vibe noticeably drift

---

## Video 1 Shot Structure

### Sequence A — The Room
**Purpose:** establish place and pull

#### Shot A1 — Establishing
- Kuttan sitting on Kerala home floor
- evening
- lamp glow
- intimate and grounded

#### Shot A2 — Phone light
- Kuttan picks up phone
- face lit blue-white
- watches intently

#### Shot A3 — Replay
- leans closer
- replay beat
- curiosity shifts into something deeper

### Sequence B — The Shift
**Purpose:** internal change

#### Shot B1 — Face close-up
- warm lamplight
- thoughtful stillness

#### Shot B2 — Quiet smile / resolve
- small smile
- sharper gaze
- not theatrical

#### Shot B3 — Pullback
- room seen again
- now it feels different because he feels different

---

## Veo Prompt Principles for Pilot 1

### Keep constant in every prompt
- Pixar-style 3D animation
- same Kuttan reference identity
- warm cinematic lighting unless phone-light beat specifically changes it
- expressive but grounded animation
- no text overlays, no subtitles, no watermark
- no beard, no glasses, no realistic style, no anime

### Do not overstuff prompts
For pilot 1, optimize for:
- identity
- mood
- readability
not cleverness

### Keep movement simple
Avoid over-ambitious motion in the pilot:
- no complex hand choreography
- no crowd interactions
- no wild camera moves

---

## Kuttan Voice Test Lines for Video 1

These are the first three lines to test in ElevenLabs or real voice.

### Line 1
```text
ഇവൻ ജർമ്മനിയിൽ ജീവിക്കുകയാണ്... Frankfurt-ൽ നടക്കുന്നു... German സംസാരിക്കുന്നു.
```

### Line 2
```text
മൂന്നാം തവണയും replay ചെയ്തു. എന്തോ ഒന്ന് ഉള്ളിൽ മാറി.
```

### Line 3
```text
Zero German. പക്ഷേ ഞാൻ തുടങ്ങും.
```

### Voice direction
- young Malayali male
- reflective, not announcer-like
- grounded, not theatre acting
- slightly intimate, like thinking out loud
- no excessive hype energy

---

## Overlay Set for Pilot 1

Keep these minimal.

```text
[0:00] Kerala. An ordinary evening.
[0:20] (replays the reel)
[0:28] Something just changed.
[0:38] Zero German.
[0:44] Let's fix that.
[0:52] Chapter 1: First Steps
```

Rule:
If the visuals are strong, reduce overlays even further.

---

## Audio Bed for Pilot 1

### Ambient
- ceiling fan hum
- distant rain or night ambience
- soft Kerala room texture

### Music
- very light at first
- one warm swell around the internal shift
- never wallpaper the whole pilot with music

### Voice
- Kuttan voice should sit above music cleanly
- music must duck under speech

---

## Folder Structure for Pilot 1

```text
pilot/video-1/
  references/
    kuttan-front.png
    kuttan-3q.png
    kuttan-profile.png
  prompts/
    video-1-shot-prompts.md
    video-1-voice-lines.md
  audio/
    kuttan-line-1.wav|mp3
    kuttan-line-2.wav|mp3
    kuttan-line-3.wav|mp3
    ambient/
    music/
  raw/
    sequence-a/
    sequence-b/
  edit/
    overlays.md
    timing-notes.md
  output/
    pilot-video-1.mp4
  review/
    pass-fail-checklist.md
    notes.md
```

---

## Pass / Fail Checklist

### Visual
- [ ] Kuttan looks like one stable character
- [ ] style feels premium enough
- [ ] no obvious grotesque motion artifact
- [ ] indoor lighting looks good
- [ ] expressions are readable

### Audio
- [ ] Kuttan voice feels believable
- [ ] no obvious fake-TTS stiffness if using AI voice
- [ ] music does not overpower voice
- [ ] ambient supports the scene

### Story
- [ ] pacing feels tight
- [ ] internal shift lands emotionally
- [ ] overlays are not doing all the work
- [ ] viewer wants to continue to Video 2

### Production
- [ ] asset generation pipeline worked
- [ ] Veo outputs downloaded safely
- [ ] Remotion assembly was manageable
- [ ] pilot can be iterated without chaos

---

## Pilot Decision Rule

### If Video 1 passes
Proceed to:
- Video 5
- then Video 12

### If Video 1 partially passes
Fix one of these systems before continuing:
- Kuttan visual identity
- Kuttan voice
- pacing / overlays
- audio balance

### If Video 1 fails badly
Do not proceed.
Rebuild the foundation first.

---

## What I should build next after this file

1. `pilot/video-1/prompts/video-1-shot-prompts.md`
2. `pilot/video-1/prompts/video-1-voice-lines.md`
3. `pilot/video-1/review/pass-fail-checklist.md`
4. optional: `pilot/video-1/README.md` style operator notes (if you want a runnable pilot packet)
