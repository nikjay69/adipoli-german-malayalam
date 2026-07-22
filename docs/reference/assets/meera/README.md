# Meera v1 asset package

Everything needed to review or reuse the approved Meera identity lives in this folder.

## Authority and outputs

| File | Role |
|---|---|
| `meera-canonical-base-v1.png` | Owner-approved identity authority. Every future generated/edited pose must use this image as a reference input. |
| `meera-consistency-pose-v1.png` | Owner-approved same-character proof and the sole pixel source for the production cutout. |
| `meera-production-cutout-v1.png` | Transparent presenting pose for later product/video composition. |
| `meera-model-sheet-v1.png` | Mobile-review identity/model sheet. |
| `meera-edge-review-v1.png` | Full figure and close edge checks on exact cream `#F5F0E8` and forest `#102018`. |
| `manifest.json` | Lineage, hashes, dimensions, image modes, alpha metrics, and reviewed surfaces. |

The transparent seed was made by removing the approved consistency pose's cream background with the local ISNet matte used for `3p-01`, followed by source-background decontamination, a one-pixel choke, 0.8 px feather, and a bounded outer-rim cleanup. The subject was not redrawn or restyled.

Rebuild in the repository's prepared local production environment:

```text
npm run build:meera-cast
npm run test:cast
```

## Generation/editing record

The built-in image generator was used once to test the required built-in-first isolation workflow. It received both approved images as references and this prompt:

> Edit the SECOND reference image only. The FIRST reference is the canonical identity authority for the same character, Meera. Preserve the exact approved adult woman without reinterpretation: identical recognizable face, facial proportions, warm medium-brown skin tone, large brown eyes, eyebrows, nose, smile, apparent age, side-parted shoulder-length wavy black hair with every outer silhouette detail, gold stud earrings, body proportions, coral three-quarter-sleeve kurta with pintuck placket and brass buttons, deep forest-green trousers, and tan flat sandals. Preserve the SECOND image's exact friendly presenting pose, gesture, crop, camera angle, painterly premium stylized-3D illustration finish, lighting on the character, and full-body visibility. Change ONLY the background: replace it with one perfectly uniform, flat, saturated chroma magenta #FF00FF from edge to edge. No gradient, texture, vignette, floor, horizon, contact shadow, cast shadow, glow, outline, halo, text, logo, props, or extra objects. Crisp complete figure, no clipped hair, fingers, feet, or sandals. This is a background-isolation source for a transparent production cutout; subject identity consistency is more important than novelty.

That built-in chroma result was rejected because a generic soft key altered skin/kurta colour and a hard key left a visible magenta hair rim. No pixels from that generated result are included in this package. No external image-generation CLI or paid API was used. The final asset is the local matte of the already approved pose described above.

## Non-negotiable continuity

- Preserve face, hair, apparent age, skin tone, body proportions, wardrobe language, and painterly 3D finish.
- Vary only expression, gesture, pose, crop, and the teaching scene required.
- Never recreate Meera from a text-only prompt.
- Every new pose requires a fresh visual and cream/forest edge review; this package is not blanket approval for future generations.
