# Remotion comparison — Module 1, Lesson 1

An isolated Remotion treatment of the same `Guten Morgen` lesson source used by the HyperFrames work. It does not import or modify any HyperFrames composition.

## Scope

- 81 seconds, 1920×1080, 30 fps — exactly matching the HyperFrames approval reel timing
- The same nine beats as `videos/module-01-lesson-01/STORYBOARD.md`: first sound, meaning, learning loop, greeting timeline, wrong/better, first sentence, pronunciation, dialogue, check/CTA
- Reuses only canonical native German MP3s from `../../public`; the fair-match reel stays graphics-only
- Motion is deterministic and frame-driven with Remotion `Sequence`, `spring`, and `interpolate`
- Palette, typography roles, safe area, and semantic colors mirror `videos/module-01-lesson-01/frame.md`

## Commands

Run from this directory (the repository root supplies the installed Remotion dependencies):

```powershell
npm run compositions
npm run still
npm run render
```

Equivalent render command from the repository root:

```powershell
npx remotion render experiments/remotion-module-01-lesson-01/src/index.ts Module01Lesson01 experiments/remotion-module-01-lesson-01/output/module-01-lesson-01-remotion.mp4 --public-dir=public --codec=h264 --crf=18 --concurrency=2
```

## Comparison notes

- Remotion is strongest here at explicit React component composition, typed data, and exact frame-level choreography.
- Shared lesson JSON/media can feed both Remotion and HyperFrames; each renderer should own its own timing layer.
- A useful hybrid is to author reusable scene/data primitives once, render complex React/data scenes in Remotion when appropriate, and use those renders as frozen media inside a wider HyperFrames timeline. The inverse also works for HTML-first blocks captured as media, but avoid coupling either renderer to the other's runtime.

## Verified render

- Output: `output/module-01-lesson-01-remotion.mp4`
- H.264, 1920×1080, 30 fps, 81.00 seconds, with AAC audio
- Rendered locally on 2026-07-12 in about 92 seconds at concurrency 4; output size about 8.2 MB
- Representative source stills and an MP4-derived contact sheet are kept in `output/` for visual QA

## Issues observed

- The first Remotion invocation downloaded the framework's Chrome Headless Shell (~108 MB); subsequent invocations reuse it.
- Pointing `--public-dir` at the full app `public/` copies roughly 193 MB into the temporary bundle, even though this reel needs only three MP3s. Productionizing this should add a tiny staging step that freezes only declared assets into this project's own `public/` directory.
- A deliberately short shell timeout kills Remotion's progress stream with `EPIPE`; the successful render used a normal long-running command timeout.
