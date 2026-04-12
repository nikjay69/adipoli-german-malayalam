# Video 1 Seeds — Canonical Picks

> **⚠ PROVISIONAL — subject to review before any broad regeneration.**
> These picks are inferred from filename suffixes + timestamps, not confirmed against the actual production session. Do not use as orchestrator input until Nik or Openclaw verifies.

Multiple variants exist for each shot because Openclaw iterated during the manual generation session on 2026-04-11. This file records my best guess at which variant was actually used in the final approved render. **Nik or Openclaw should confirm and correct.**

## Best-guess canonical (based on filename suffixes + timestamps)

| Shot | Canonical file | Reason |
|---|---|---|
| s1 | `s1-start-refined.jpg` | "refined" suffix = explicit refinement, latest in shot1 series (17:16) |
| s2 | `s2-phonecontent.jpg` | latest s2 timestamp (21:08); "phonecontent" = phone screen rendered correctly, which was a known issue |
| s3 | `s3-phonecontent.jpg` | latest s3 timestamp (21:08); same phone-content fix as s2 |
| s4 | `s4-transition.jpg` | latest s4 timestamp (21:00); "transition" = bridges into Video 7 (departure) |

## All variants present (do not delete — useful as context for future iterations)

- **Sequence A scratch**: `seqA-initial.jpg`, `seqA-scene-start.jpg`
- **s1**: `s1-start.jpg`, `s1-start-refined.jpg`
- **s2**: `s2-start.jpg`, `s2-start-refined.jpg`, `s2-from-lastframe.jpg`, `s2-stronger.jpg`, `s2-phonecontent.jpg`
- **s3**: `s3-start.jpg`, `s3-safer.jpg`, `s3-action.jpg`, `s3-replay.jpg`, `s3-ots.jpg`, `s3-ots-stronger.jpg`, `s3-phonecontent.jpg`
- **s4**: `s4-decision.jpg`, `s4-from-shot2.jpg`, `s4-calm.jpg`, `s4-transition.jpg`

## Mapping to rendered MP4s in `../raw/`

The MP4 outputs at `../raw/` correspond to specific seed picks. For each shot the orchestrator should:
1. Use the canonical seed listed above to call Veo
2. Compare the new render against the existing approved MP4 for visual continuity

## What I do NOT know
- Whether the canonical picks above match what Openclaw and Nik actually selected. **Confirm before using as the orchestrator's input.**
- Whether any seed in the openclaw cache was generated AFTER the workspace-root MP4s were rendered (i.e., a seed that was never used).
