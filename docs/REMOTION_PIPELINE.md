# Remotion Pipeline — How Lesson Videos Are Generated

This is the placeholder video system. Real user-recorded videos will eventually replace these, but until then, every lesson gets a Kuttan-hosted motion graphic video with TTS narration.

## Stack

- **Remotion** (`remotion`, `@remotion/cli`, `@remotion/bundler`, `@remotion/renderer`, `@remotion/player`) — React-based programmatic video generation. Renders MP4 via headless Chromium.
- **msedge-tts** — free Microsoft Edge voices for TTS (Malayalam, Indian English, German). No API key.
- **tsx** — runs our TS render scripts directly.

## File layout

```
remotion.config.ts                     # codec, entry point
src/remotion/
├── index.ts                           # registerRoot(Root)
├── Root.tsx                           # registers compositions
├── LessonIntroVideo.tsx               # main composition (title → Kuttan beats → vocab → outro)
└── KuttanFrame.tsx                    # SVG Kuttan for Remotion (frame-based, not framer-motion)

scripts/
├── render-video.ts                    # render one composition to MP4
├── gen-tts.ts                         # generate MP3s per narration line using msedge-tts
└── props/
    ├── v1-1-1-tts-input.json          # input lines for gen-tts.ts
    └── v1-1-1.json                    # full props passed to the composition

public/
├── audio/tts/<videoId>/*.mp3          # generated TTS audio
└── videos/generated/*.mp4             # final rendered videos
```

## Voices used

| Scenario | Voice |
|---|---|
| Manglish / Malayali narration | `en-IN-NeerjaNeural` (female) or `en-IN-PrabhatNeural` (male) |
| Pure Malayalam | `ml-IN-SobhanaNeural` (female) / `ml-IN-MidhunNeural` (male) |
| German words / sentences | `de-DE-KatjaNeural` (female) / `de-DE-ConradNeural` (male) |
| American English | `en-US-AriaNeural` (female) / `en-US-GuyNeural` (male) |

## End-to-end pipeline for one video

Example: generating `v1-1-1.mp4` (Lesson 1-1 intro).

```bash
# 1. Write the narration lines (manglish, English, or German)
# scripts/props/v1-1-1-tts-input.json

# 2. Generate TTS audio per line
npm run remotion:tts -- scripts/props/v1-1-1-tts-input.json public/audio/tts/v1-1-1

# 3. Write the video props (same line text + audioSrc pointing to the mp3s + vocab cards + moods)
# scripts/props/v1-1-1.json

# 4. Render the MP4
npm run remotion:render -- LessonIntro public/videos/generated/v1-1-1.mp4 scripts/props/v1-1-1.json

# 5. Wire the videoUrl into the lesson data
# In src/lib/content/modules/module-01.ts:
#   videoUrl: "/videos/generated/v1-1-1.mp4",
```

## Composition shape

`LessonIntroVideo` takes these props:

```ts
type LessonIntroProps = {
  lessonId: string;
  title: string;
  subtitle?: string;
  accentColor?: string;        // defaults to module color
  scriptLines: ScriptBeat[];
  vocabCards?: VocabCard[];
  outroText?: string;
}

type ScriptBeat = {
  text: string;                // narration text on screen
  german?: string;             // optional highlighted German phrase
  malayalam?: string;          // optional Malayalam gloss
  mood?: KuttanMoodFrame;      // Kuttan expression
  audioSrc?: string;           // relative to /public, e.g. audio/tts/v1-1-1/line-0.mp3
}
```

Duration is auto-computed from `scriptLines.length`: `3s intro + 5s per line + 3s outro`, at 30fps.

## Why this setup

1. **Free.** msedge-tts + Remotion are both no-cost. Gemini API key is preserved for the Live voice feature.
2. **Reproducible.** All video assets (text, audio, final MP4) are deterministic from the props JSON. A reviewer or future Claude can regenerate any video from the JSON alone.
3. **Incremental.** Add a new lesson video = write a new props JSON + run `npm run remotion:tts` + `npm run remotion:render`.
4. **Swappable.** When you (the user) record real videos, just swap the `videoUrl` field in the module file. Nothing else changes.

## Known limitations

- **No lip-sync.** Kuttan's mouth doesn't sync to TTS audio — it reflects `mood` (happy, waving, etc.) only. Acceptable for A1 placeholder; your real videos will have your own face.
- **Render time.** ~30s video takes ~2 min to render on a modern CPU. Running `npx remotion:render` inside CI would be too slow — we pre-render locally and commit the MP4.
- **Repo size.** 90 lessons × 2 videos × ~3 MB = ~500 MB. Already pushing it. Plan for CDN (Vercel Blob, Cloudflare R2, or S3) once we hit 20+ videos.
- **Vercel 100MB per-file limit.** Each MP4 is well under, no issue.

## Adding a new video

**Template checklist:**

1. ☐ Write 3–6 narration lines — keep each line <180 chars for a clean 5-second beat.
2. ☐ Decide the mood per line (waving/happy/pointing/celebrating/thinking/idle).
3. ☐ Save `scripts/props/<videoId>-tts-input.json` (for TTS) and `scripts/props/<videoId>.json` (for render).
4. ☐ Generate audio: `npm run remotion:tts -- scripts/props/<videoId>-tts-input.json public/audio/tts/<videoId>`.
5. ☐ Render: `npm run remotion:render -- LessonIntro public/videos/generated/<videoId>.mp4 scripts/props/<videoId>.json`.
6. ☐ Set `videoUrl` in the relevant `module-XX.ts`.
7. ☐ Commit the `.mp4` + `.mp3`s + props JSONs.
8. ☐ Deploy.

## Preview workflow

For iterating on the composition itself (not one video), run:

```bash
npm run remotion:studio
```

Opens a browser studio where you can scrub through the composition with any props. Changes to the composition code hot-reload.
