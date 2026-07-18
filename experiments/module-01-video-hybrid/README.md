# V1-02 Remotion + HyperFrames trial

This isolated 81-second M1L1 proof tests the production boundary selected for the course:

- one semantic [`lesson-01.scene.json`](./lesson-01.scene.json) owns teaching intent, exact timing, captions, semantic cast roles, audio placement, and artifact paths;
- HyperFrames code produces exactly two bounded, silent teaching videos: `phrase-build` (11 seconds) and `mistake-repair` (12 seconds);
- Remotion owns the 2,430-frame master timeline and consumes both reviewed HyperFrames renders as frozen, checksummed media;
- FFmpeg/ffprobe perform final decode, stream, duration, frame-count, and delivery checks.

The visuals use the fixed **2A · Scenes & Daylight** language requested for this trial: warm daylight paper for orientation, deep-forest rooms for lived scenes, answer-sheet cream for response moments, one restrained gold action, Source Serif 4 + Geist + Geist Mono, and semantic success/recovery colour roles. The source is code-authored HTML/CSS/GSAP and TSX; Studio is only the review surface.

## Owner production preference — 2026-07-18

Long-form lessons remain **owner-led, not animation-led**. In each 15–18 minute master, the owner's Manglish explanation is the narrative and teaching spine. Remotion assembles that lesson; HyperFrames and Remotion graphics appear as purposeful, bounded cutaways that make a spoken idea easier to see. Useful insert forms include grammar tables (for example, Dativ versus Akkusativ), sentence transformations, timelines, comparisons, pronunciation cues, and mistake repairs. Return to the presenter once the visual has completed its teaching job. Never use continuous motion graphics to fill runtime or merely restate the narration.

Every future script and recording kit should distinguish `[PRESENTER]` from `[VISUAL INSERT]`. Each insert cue must name the teaching question, the change or relationship the learner needs to see, the matching spoken-line window, and the return-to-presenter cue. Prefer the simplest visualization that reveals the idea; decoration alone is not a reason to cut away.

Prefer **daylight or answer-sheet surfaces** for explanatory, text-heavy, and tabular material because legibility and eye comfort come first. Use forest rooms selectively when a lived scene, threshold, or focused contrast gives darkness a teaching purpose; dark is an emphasis mode, not the default instructional canvas. Public/landing heroes, module thresholds, media stages, and brief immersive scene beats may be dark. Sustained learning work—explanations, grammar tables, choices, typing, checkpoint items, feedback, and recovery—defaults to warm daylight or a light answer sheet. A dark context may frame a light task, but a table, form, or more than one short line of reading belongs on light paper.

This is an owner revision to the app-wide 2A candidate, whose current source-of-truth wording still assigns whole missions, listening flows, and checkpoints to forest rooms. The owning `3p-03` design-language chunk must narrow that page-mode map and add a long-session eye-comfort review rule before learner-facing implementation; this experiment records the preference but does not silently edit another chunk's contract.

Of these two trials, the owner prefers `phrase-build`. Carry forward its light instructional surface, direct transformation, and clarity as directional evidence—not as a template every insert must copy. `mistake-repair` remains a useful secondary pattern for a lived scene and correction, but its dark staging should be used sparingly.

## Current gate

Source, browser checks, and still/contact-sheet review may be completed without rendering. HyperFrames delivery renders require explicit owner approval after the final Studio preview. The finalizer therefore has two deliberately separate modes:

```powershell
# Approval-safe: validates the shared contract, toolchain, and Remotion source.
node experiments/module-01-video-hybrid/finalize.mjs preflight

# Also reruns both full HyperFrames browser checks; still does not render.
node experiments/module-01-video-hybrid/finalize.mjs preflight --full

# Run only after the owner explicitly approves both final previews.
node experiments/module-01-video-hybrid/finalize.mjs render --approved --approval-reference="<chat or review reference>"
```

Calling `render` without both `--approved` and a durable `--approval-reference` fails before any media is created. The approved path may reuse only a complete insert pair already bound to the current source by the official handoff; unhanded, partial, stale, or unreceipted master/review output is rejected and never silently overwritten.

## Final preview

Run each server from its project directory and hand the Studio timeline URL to the reviewer:

```powershell
Push-Location experiments/v1-02-hyperframes/phrase-build
npx --yes hyperframes@0.7.63 preview --port 3017
Pop-Location

Push-Location experiments/v1-02-hyperframes/mistake-repair
npx --yes hyperframes@0.7.63 preview --port 3018
Pop-Location
```

- `http://localhost:3017/#project/phrase-build`
- `http://localhost:3018/#project/mistake-repair`

These are Studio previews of code-authored compositions, not UI-authored videos.

## Approved finalization contract

After approval, one command performs the following fail-closed sequence:

1. rerun the shared validator, Remotion typecheck, and both HyperFrames checks;
2. render both HyperFrames videos at high quality, 1,920×1,080, 30 fps, with capture-readiness and every lint warning fail-closed;
3. require H.264/yuv420p, exact decoded frame counts, expected duration, zero audio streams, and a clean full decode;
4. write `v1-02.insert-handoff.json` with source hashes and frozen artifact SHA-256 values;
5. stage and re-hash the frozen inserts, fonts, and native German audio in the Remotion project;
6. enumerate and render `V1M1L1Proof` through Remotion;
7. require the 81-second master to contain exactly 2,430 H.264/yuv420p frames at 1,920×1,080/30 fps, one AAC audio stream, and a clean full decode;
8. create a tracked ≤10 MB, 1,280×720 review proxy and an eight-scene midpoint contact sheet that includes the recap;
9. rerun root `npm run qa` and write `render-report.json` with approval, tool versions, executed gates, checksums, staged receipts, media facts, and known weaknesses;
10. stop at `technical-pass-visual-review-pending` until the MP4-derived contact sheet is inspected.

After inspecting the generated contact sheet (and proxy where needed), record the evidence-backed visual result without changing media:

```powershell
node experiments/module-01-video-hybrid/finalize.mjs review --result=PASS --review-reference="<review reference>" --notes="<specific visual finding>"
```

`WEAK` and `FAIL` are also valid results. Only `PASS` changes the committed report’s overall status to `pass`.

Generated MP4 files stay outside Git. The compact contact sheet and JSON receipts provide durable review evidence.

## Expected artifacts after approval

- `../v1-02-hyperframes/phrase-build/renders/phrase-build-v1.mp4`
- `../v1-02-hyperframes/mistake-repair/renders/mistake-repair-v1.mp4`
- `../v1-02-remotion/output/v1-m1-l1-proof.mp4`
- `evidence/v1-m1-l1-proof-review.mp4`
- `evidence/v1-m1-l1-proof-contact-sheet.jpg`
- `v1-02.insert-handoff.json`
- `render-report.json`
