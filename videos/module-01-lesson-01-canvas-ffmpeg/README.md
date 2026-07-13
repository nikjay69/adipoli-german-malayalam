# Module 01 Lesson 01 · Canvas/Puppeteer/FFmpeg comparison

This is an independent code-based comparison reel. It does not use HyperFrames or Remotion. It intentionally shares the approved Lesson 1 content and visual system so the engine comparison is fair:

- deep forest canvas, cream teaching text, exam-gold structure, blue listening and semantic green/red;
- exact Lesson 1 German from `course-production/a1-mvp/module-01/lesson-01-video-script.md`;
- representative arc from `videos/module-01-lesson-01/STORYBOARD.md`: first sound → learner reply → greeting-by-time → first sentence → tiny dialogue → recap/CTA;
- canonical Frau Weber/Kuttan assets and two source/transcript-verified pre-rendered native German clips (never browser speech synthesis). Other dialogue beats are silent rather than inferred from filenames.

## Commands

Run from this directory:

```powershell
npm run validate
npm run render
ffprobe -v error -show_entries format=duration,size,bit_rate -show_streams -of json output/module-01-lesson-01-canvas-ffmpeg.mp4
```

The renderer reuses the repository's installed Puppeteer package, captures 1,152 deterministic Canvas frames at 1920×1080/24 fps, encodes H.264 with FFmpeg, mixes the two verified native German MP3s with a very quiet generated tone bed, and writes exact wall-clock and ffprobe data to `output/render-report.json`.

## Measured result

Rendered and verified on 2026-07-12:

| Metric | Result |
|---|---:|
| Total render wall clock | 98.433 s |
| Output duration | 48.000 s |
| Resolution / frame rate | 1920×1080 / 24 fps |
| Video | H.264, yuv420p |
| Audio | AAC, mono, 24 kHz |
| File size | 4,311,481 bytes |
| Average bitrate | 718,580 bit/s |
| Full decode check | PASS |
| Visual contact-sheet QA | PASS · all six scene families readable and on-brand |

## Files

- `index.html` — browser entry point.
- `composition.js` — all scene drawing, timing, easing, and content.
- `render.js` — local server, deterministic frame capture, H.264/AAC encode, metadata report.
- `validate.js` — required-asset and exact-German checks.
- `audio-sources.json` — canonical source path, declared transcript, timeline cue, and SHA-256 for every spoken clip.
- `output/module-01-lesson-01-canvas-ffmpeg.mp4` — rendered comparison reel.
- `output/contact-sheet.jpg` — visual QA sheet sampled every eight seconds.

## Tradeoffs and hybrid use

Canvas + Puppeteer + FFmpeg is small, dependency-light, deterministic, and excellent for algorithmic diagrams, clocks, waveforms, progress rails, and bulk template generation. Every frame is ordinary JavaScript, so bespoke data visualisation is direct and the MP4 pipeline is easy to inspect.

Its weaknesses are equally clear: no built-in composition model, timeline inspector, media orchestration, layout linting, or React component ecosystem. Complex editorial iteration becomes manual, accessibility is weaker because text is rasterised into Canvas, and frame-by-frame screenshots are slower than a purpose-built renderer.

The strongest hybrid is not to maintain three full lesson engines. Keep one primary assembler, then use this Canvas renderer as a deterministic insert factory for the things it does unusually well:

1. Generate reusable diagram/clock/waveform/data-viz inserts as MP4 or transparent WebM.
2. Use Remotion where React/stateful UI composition and programmatic variants are valuable.
3. Use HyperFrames for the final HTML-native lesson assembly, presenter footage, timing contract, checks, and editorial review—or reverse steps 2 and 3 after measured quality/render-time comparison.
4. Freeze shared content/timing/design tokens in engine-neutral JSON so all systems consume the same words, beats, palette, and asset ledger.

The first practical interoperability step would be extracting this file's palette, scene ranges, exact text, and audio cues into `lesson.json`, then making each engine a renderer of that same contract.
