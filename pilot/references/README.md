# Pilot References

Single source of truth for character anchors used to seed Imagen and Veo across the cinematic series. Don't edit files here in place — replace whole files only, and update this README when you do.

## Files

### `kuttan-canonical.jpg`
- **Use**: the canonical Kuttan character anchor for the entire 7-video series
- **Source**: copied 2026-04-12 from `~/.openclaw/media/tool-image-generation/kuttan-veo-safe-reference---8077cf64-8294-42d5-b844-33c96d637d74.jpg`
- **Generated**: 2026-04-11 13:08 (Openclaw image-generation tool)
- **Why canonical**: this was the locked Kuttan reference used to seed the production renders of Video 1 (The Spark) and Video 7 (The Decision / Departure), both of which Nik has approved
- **Pixar 3D style**: yes
- **Outfit**: white cotton shirt, jeans, no beard, no glasses, early 20s
- **How to use**: pass this image to Imagen as a few-shot reference when generating fresh scene seeds, OR feed directly to Veo's `image` parameter when no scene-specific seed is needed

### `kuttan-early-attempt.jpg`
- **Use**: archive only — early experiment, not the locked reference
- **Source**: `~/.openclaw/media/tool-image-generation/german-guy-in-india---929ba356-d3a0-41a7-80ba-748e650b4f3b.jpg`
- **Generated**: 2026-04-04 23:38
- **Status**: superseded by `kuttan-canonical.jpg`. Kept for context, do not use for production.

## Adding a new reference

1. Generate the image (Imagen or other tool)
2. Copy to this folder with a descriptive name (no UUIDs)
3. Add an entry to this README with: use, source, generation date, why canonical
4. Reference it from `scripts/cinematic-arc.json` if it should be the seed for a specific video
