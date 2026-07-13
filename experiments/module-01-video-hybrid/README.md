# Module 01 video hybrid contract

This isolated experiment gives HyperFrames, Remotion, and a lightweight Canvas/FFmpeg renderer one neutral, frame-based lesson contract. It does not import, copy, rename, or modify either renderer or any media. `lesson-01.scene.json` points only at canonical files under the repository's `public/` directory.

## Validate

Run from the repository root:

```powershell
node experiments/module-01-video-hybrid/validate.mjs
```

The command fails on any change to the 81-second/2,430-frame contract, duplicate or non-contiguous scene, missing public asset, SHA-256 mismatch, unknown asset reference, or audio without a declared transcript.

## Renderer roles and exact commands

- **Shared JSON:** owns scene IDs/cuts, canonical media URLs, integrity hashes, and spoken text. A renderer converts `startFrame` and `durationFrames` into its own timing primitives; it does not rewrite the contract.
- **HyperFrames:** owns the hand-authored teaching inserts and their HTML/GSAP motion system. Its existing nine sub-compositions remain the visual source of truth. Check and render them with:

  ```powershell
  Push-Location videos/module-01-lesson-01
  npm run check
  npm run render
  Pop-Location
  ```

- **Remotion:** owns the long-form master assembly: typed scene scheduling, presenter footage/PIP, native model audio, captions, and batch variants. It may either recreate a data-heavy insert in React or consume reviewed HyperFrames insert renders as ordinary media. Render the existing fair comparison with:

  ```powershell
  npx remotion render experiments/remotion-module-01-lesson-01/src/index.ts Module01Lesson01 experiments/remotion-module-01-lesson-01/output/module-01-lesson-01-remotion.mp4 --public-dir=public --codec=h264 --crf=18 --concurrency=2
  ```

- **Canvas/FFmpeg:** remains the dependency-light deterministic fallback for simple cards and batch rendering. It should consume the same frames/assets when wired, but keep drawing/easing renderer-local.

For a mixed final, render each reviewed HyperFrames teaching insert to a frozen media file and place it on the Remotion master timeline with owner footage and audio. Use Canvas only for algorithmic diagrams, clocks, waveforms, and other inserts where direct drawing is materially simpler. FFmpeg performs the final delivery encode and technical QC. This keeps one editorial owner, preserves HyperFrames' strongest visual work, and avoids runtime coupling between systems.

The nine shared cuts are: `m1l1-first-sound` 0–7s, `m1l1-meaning-table` 7–15s, `m1l1-learning-loop` 15–23s, `m1l1-greeting-timeline` 23–33s, `m1l1-wrong-better` 33–41s, `m1l1-first-sentence` 41–51s, `m1l1-pronunciation` 51–59s, `m1l1-dialogue` 59–71s, and `m1l1-check-recap` 71–81s.
