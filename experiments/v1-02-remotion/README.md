# V1-02 Remotion master — M1L1 trial

This isolated Remotion 4.0.448 project is the long-form assembler for the 81-second Module 1, Lesson 1 proof. The engine-neutral [`lesson-01.scene.json`](../module-01-video-hybrid/lesson-01.scene.json) owns all timing, exact captions, semantic cast roles, German-audio placement, resolution, and the two HyperFrames handoffs.

## Visual contract

The master uses the fixed **2A · Scenes & Daylight** language:

- daylight rooms: `#F5F0E8`, warm layered paper, angled sunlight;
- forest rooms: `#0C1811` through `#16281C`;
- answer sheets: `#F7EAD0`, physical page edge, restrained shadow;
- one dominant gold action: `#D4A520` / `#F1D27A`;
- Source Serif 4 for display and German, Geist for UI, Geist Mono for scene flags;
- success and repair use the approved green and terracotta roles;
- no tech grid, glass dashboard, generic card wall, or UI-chrome treatment.

`rendererTheme` is read from the scene contract. Runtime validation requires the `2a-scenes-daylight` family; the retired neutral proof string is not embedded in this project.

## Ownership boundary

Remotion owns the 2,430-frame master timeline, deliberate owner/teacher/learner apertures, lower thirds, quiet integrated subtitles, timed production pause, native German audio, and final assembly. HyperFrames owns exactly two silent, opaque, pre-rendered teaching inserts:

1. `phrase-build` at frames 540–869;
2. `mistake-repair` at frames 1,140–1,499.

Both are consumed edge-to-edge through `OffthreadVideo` without Remotion captions or HUD overlays. The insert audio is muted by contract; Remotion is the only audio clock.

## Deterministic asset staging

The renderer never points at the app's large public directory. Run:

```powershell
npm run stage
```

`scripts/stage-assets.mjs` performs a fail-closed handoff:

- reads only assets declared by the shared scene contract;
- rejects any source path that escapes its expected root;
- verifies and stages the exact Source Serif 4, Geist, and Geist Mono files shared with the approved HyperFrames inserts;
- verifies every native-audio SHA-256 against the shared contract;
- requires each frozen insert SHA-256 from either its manifest entry or `../module-01-video-hybrid/v1-02.insert-handoff.json`;
- copies assets into this project's ignored `public/audio/` and `public/inserts/` folders;
- hashes every copied file again and writes ignored `public/staged-assets.json` as the render receipt;
- rejects any insert count other than two or any non-silent/non-HyperFrames insert.

The preferred handoff shape is:

```json
{
  "inserts": [
    {"id": "phrase-build", "sha256": "<64 lowercase hex characters>"},
    {"id": "mistake-repair", "sha256": "<64 lowercase hex characters>"}
  ]
}
```

## Commands

From this directory:

```powershell
npm run preflight
npm run preflight:full
npm run typecheck
npm run compositions
npm run still
npm run render
```

`npm run render` is the low-level Remotion command and will fail until both approved HyperFrames inserts have a checksum handoff. The complete owner-gated pipeline is `npm run finalize:approved -- --approval-reference="<chat or review reference>"`; run it only after explicit preview approval. It checks and renders both HyperFrames projects, freezes their hashes, stages them, renders the Remotion master, performs FFmpeg/ffprobe QC, and creates the tracked review proxy/contact sheet/report.

- composition: `V1M1L1Proof`
- output: `output/v1-m1-l1-proof.mp4`
- canvas: 1920×1080 at 30 fps
- duration: derived from the shared contract (currently 2,430 frames / 81 seconds)

`compositions`, `still`, and `render` always stage and verify the frozen media first. `typecheck` is source-only and does not require rendered insert files.
