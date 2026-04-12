# Manual Production Workflow That Actually Produced Videos 1 & 2

> This is the real workflow used before the orchestrator existed.
> It is messy, manual, and operator-driven — but it is the workflow that produced the approved early clips.

---

## Truth First

There was **no single clean end-to-end orchestrator** for the earlier successful runs.

What worked was a **manual production loop**:
- generate still
- review it
- animate it with Veo
- extract last frame
- manually choose whether to chain from that frame
- repeat
- manually recombine clips

So the thing that worked was:
- **human-in-the-loop sequencing**
not
- a fully automated system

---

## Core Tools Actually Used

### 1. Still generation
Used primarily via OpenClaw `image_generate` with:
- `google/gemini-3.1-flash-image-preview`
- 16:9 aspect ratio
- prompt-by-prompt generation
- usually 1 image at a time, occasionally batch requests

### 2. Video generation
Used via:
- direct Veo API calls
- and/or `scripts/generate-veo.py`

Model used:
- `veo-3.1-fast-generate-001`

Typical params:
- duration: 4s
- aspect: 16:9
- sampleCount: 1
- personGeneration: `allow_adult`
- output to GCS bucket: `gs://adipoli-veo/output/`

### 3. Last-frame extraction
Used manually with `ffmpeg`:

```bash
ffmpeg -sseof -0.1 -i clip.mp4 -update 1 -q:v 1 last.jpg
```

This was the key chaining trick.

### 4. Combining clips
Used manual `ffmpeg concat` or `scripts/combine-clips.py`

---

## Actual Working Sequence

## Step 1 — Write shot prompt
For each scene:
- define the emotional beat
- define camera framing
- define continuity requirements
- define whether phone / notebook / airport / etc. is narratively important

The important part:
**prompts were heavily adjusted shot-by-shot during review**.

This was not “write manifest once and run.”
It was iterative.

---

## Step 2 — Generate still image first
Still generation was used as:
- concept lock
- continuity anchor
- Veo seed input

Why this mattered:
- if the still was bad, the video would also be bad
- so the still was the real approval gate

Typical OpenClaw call shape:

```json
{
  "model": "google/gemini-3.1-flash-image-preview",
  "aspectRatio": "16:9",
  "prompt": "<scene prompt>",
  "count": 1
}
```

If continuity was needed, the previous approved last frame or approved prior image was passed as the `image` anchor.

---

## Step 3 — Review still before animation
This part was crucial.

Operator checked for:
- Kuttan identity stability
- shirt continuity
- face drift
- whether phone screen or prop actually carried story
- whether the scene felt cinematic or too abrupt

If bad:
- prompt rewritten
- image regenerated
- no Veo call yet

This avoided wasting Veo credits on weak stills.

---

## Step 4 — Animate still with Veo
Only after the still looked good enough.

Typical Veo prompt structure:
- keep same identity
- keep same room / same lighting / same clothing
- add subtle natural motion only
- describe the emotional beat
- explicitly forbid scene redesign / face morphing / shirt color change

Typical Veo negative prompt:

```text
No text overlays. No subtitles. No watermark. No hat. No glasses. No beard. No realistic style. No live action. No anime. No scene redesign. No camera jump. No face morphing. No shirt color change.
```

Typical Veo request logic:
- 1 still image in
- 1 video out
- 4 seconds
- 16:9

---

## Step 5 — Poll operation manually
The Veo response returned a long-running operation.

Then:
- poll operation status manually
- fetch `gcsUri`
- download MP4 manually

This was not hidden behind one job runner.

---

## Step 6 — Extract last frame manually
After each usable Veo clip download:

```bash
ffmpeg -sseof -0.1 -i clip.mp4 -update 1 -q:v 1 last.jpg
```

This last frame became the continuity bridge for the next shot **when chaining made sense**.

This is the most important part of the earlier working method.

---

## Step 7 — Decide manually: chain or reseed
This decision was made manually each time.

### Chain from previous when:
- same room / same setup / same moment continuing
- emotional continuation of same beat
- want motion continuity

Examples:
- phone replay → reaction
- reaction → decision forming
- one airport corridor beat into next

### Fresh still seed when:
- new location
- new composition
- previous last frame too weak or too drifted
- prop / pose / face started getting unreliable

Examples:
- Kerala room → airport exterior
- airport hall → plane window
- when close-up detail shot needed a cleaner composition

---

## Step 8 — Drift management happened by instinct, not code
There was no coded drift counter.

But in practice the workflow already followed this rule:
- after ~2–3 chained hops, quality drift started showing
- then a fresh still seed was used

So the orchestrator rule Claude proposed is valid:
- after 3 chained extensions, force a fresh seed

That matches real observed behavior.

---

## Step 9 — Recombine manually and review emotionally
After enough clips existed:
- concat them with `ffmpeg`
- watch the rough cut
- identify abrupt transitions, dead shots, white-screen phone problems, weak ending beats
- regenerate only the broken scene(s)

This is exactly how Video 1 evolved:
- shot order changed
- shot 4 was extended
- shot 2/3 were rebuilt for better phone content

So the working system was:
- **replace weak shots surgically**
not
- rerender whole sequence every time

---

## What Preserved Consistency Best

### 1. Reusing approved frames
The biggest consistency win came from:
- using approved stills
- using extracted last frames from approved clips

### 2. Keeping prompts boring where needed
When prompts got too clever, consistency got worse.

The best prompts were usually:
- same room
- same white shirt
- same identity
- subtle motion only
- one emotional beat

### 3. Human review before every expensive step
This saved credits and improved quality.

### 4. Manual scene replacement
Weak scene? Regenerate just that one.

---

## What Failed / What Caused Problems

### 1. Phone shots
If prompt was vague, phone became:
- blank white screen
- meaningless glow
- non-narrative prop

Fix that worked better:
- explicitly tell the model what appears on the phone screen
- describe it as a vertical social reel
- ask for recognizable content, not tiny UI text

### 2. Over-chaining
Too many chained extensions caused drift:
- face drift
- pose drift
- scene simplification

### 3. Writing / fine motor close-ups
These often broke.
Best to avoid or simplify.

### 4. Abrupt emotional cuts
Some scenes were technically fine but structurally abrupt.
Fix was usually:
- rewrite the scene as a transition beat
not
- just extend duration blindly

---

## The Real Production Pattern

The actual successful pattern was:

### Pattern A — Scene-first
1. write scene beat
2. generate still
3. review still
4. animate
5. review clip
6. keep / replace

### Pattern B — Continuity chaining
1. download approved clip
2. extract last frame
3. use last frame as next scene anchor
4. generate next still or next Veo clip

### Pattern C — Surgical replacement
1. assemble rough cut
2. identify exactly which scene fails
3. rebuild only that scene
4. reassemble

---

## What This Means for the Orchestrator

If we want the orchestrator to preserve what actually worked, it should support:

### Required
- still-first workflow
- last-frame extraction after each approved clip
- chain or reseed decision per scene
- drift warning after 3 chained hops
- one-scene regeneration without touching the rest
- review checkpoints
- cost ledger
- log file

### Nice to have
- GCS signed URLs for review
- manifest-driven sequence definition
- canonical subject references
- output folder structure per video

### Dangerous if over-automated
- regenerating everything in one sweep without review
- forcing chain when the shot should reseed
- trying to solve weak prompts with automation alone

---

## Minimal “Earlier Workflow” Pseudocode

```text
for each scene:
  if scene.needs_fresh_seed:
    still = generate_image(prompt, maybe_reference)
  else:
    still = previous_lastframe

  review(still)
  if rejected:
    rewrite_and_retry()

  clip = generate_veo(still, motion_prompt)
  review(clip)
  if rejected:
    regenerate_scene_only()

  lastframe = ffmpeg_extract_lastframe(clip)
  save(lastframe)

assemble_cut(all_kept_clips)
review_cut()
replace_only_weak_scenes()
```

---

## Bottom Line

The earlier consistency did **not** come from a magical hidden script.
It came from:
- strong operator review
- still-first generation
- manual last-frame chaining
- selective reseeding
- surgical scene replacement

That is the real workflow to preserve.

If we automate, the orchestrator should reproduce **that behavior** — not invent a totally different pipeline.
