"""Build the approved Meera v1 cutout and review evidence.

The owner-approved consistency pose is the only pixel source. This script uses
the same local ISNet matte + one-pixel defringe pipeline already accepted for
3p-01; it does not redraw, restyle, or regenerate Meera.

Requirements (local production environment): Pillow, numpy, rembg.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "docs" / "reference" / "assets" / "meera"
CANONICAL = ASSET_DIR / "meera-canonical-base-v1.png"
POSE = ASSET_DIR / "meera-consistency-pose-v1.png"
CUTOUT = ASSET_DIR / "meera-production-cutout-v1.png"
MODEL_SHEET = ASSET_DIR / "meera-model-sheet-v1.png"
EDGE_REVIEW = ASSET_DIR / "meera-edge-review-v1.png"
MANIFEST = ASSET_DIR / "manifest.json"

CREAM = (245, 240, 232, 255)
FOREST = (16, 32, 24, 255)
GOLD = (212, 165, 32, 255)
RUST = (185, 91, 51, 255)
INK = (63, 77, 68, 255)
MUTED = (102, 117, 106, 255)
SOFT = (200, 208, 201, 255)
WHITE = (255, 255, 255, 255)
PAD = 8


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def estimate_bg(image: Image.Image) -> np.ndarray:
    arr = np.asarray(image.convert("RGB"), dtype=np.float64)
    k = 16
    corners = np.concatenate(
        [
            arr[:k, :k].reshape(-1, 3),
            arr[:k, -k:].reshape(-1, 3),
            arr[-k:, :k].reshape(-1, 3),
            arr[-k:, -k:].reshape(-1, 3),
        ]
    )
    return np.median(corners, axis=0)


def shifted(channel: np.ndarray, reducer) -> np.ndarray:
    height, width = channel.shape
    padded = np.pad(channel, 1, mode="edge")
    neighbours = [
        padded[dy : dy + height, dx : dx + width]
        for dy in (0, 1, 2)
        for dx in (0, 1, 2)
    ]
    return reducer(np.stack(neighbours), axis=0)


def defringe(cutout: Image.Image, background: np.ndarray) -> Image.Image:
    """Decontaminate soft pixels, choke one px, then bleed clean edge colour."""
    arr = np.asarray(cutout.convert("RGBA"), dtype=np.float64)
    rgb, alpha8 = arr[..., :3], arr[..., 3]
    alpha = alpha8 / 255.0

    semi = (alpha > 0.0) & (alpha < 1.0)
    if semi.any():
        expanded = alpha[..., None]
        true_foreground = (rgb - (1.0 - expanded) * background) / np.maximum(
            expanded, 1e-6
        )
        rgb = np.where(
            semi[..., None], np.clip(true_foreground, 0.0, 255.0), rgb
        )

    alpha = shifted(alpha, np.min)
    alpha_image = Image.fromarray((alpha * 255.0).astype(np.uint8), "L")
    alpha = np.asarray(alpha_image.filter(ImageFilter.GaussianBlur(0.8))) / 255.0
    alpha = np.where(alpha < 0.03, 0.0, alpha)

    for _ in range(2):
        visible = (alpha > 0.0).astype(np.float64)
        rgb_sum = np.dstack(
            [shifted(rgb[..., channel] * visible, np.sum) for channel in range(3)]
        )
        weights = shifted(visible, np.sum)
        fillable = (alpha == 0.0) & (weights > 0)
        mean = rgb_sum / np.maximum(weights, 1e-6)[..., None]
        rgb = np.where(fillable[..., None], mean, rgb)

    rgb = clean_opaque_edge(rgb, alpha)
    out = np.dstack([np.clip(rgb, 0, 255), alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def edge_band(visible: np.ndarray, depth: int = 4) -> np.ndarray:
    """Return the first ``depth`` visible pixel rings beside transparency."""
    current = visible.copy()
    band = np.zeros_like(visible, dtype=bool)
    for _ in range(depth):
        eroded = shifted(current.astype(np.float64), np.min) > 0.5
        band |= current & ~eroded
        current = eroded
    return band


def clean_opaque_edge(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Replace only cream-like opaque rim remnants with nearby subject colour."""
    visible = alpha > 0.0
    band = edge_band(visible)
    spread = rgb.max(axis=2) - rgb.min(axis=2)
    remaining = band & (rgb.min(axis=2) > 145) & (spread < 72)
    good = visible & ~remaining
    cleaned = rgb.copy()

    for _ in range(8):
        if not remaining.any():
            break
        weights = shifted(good.astype(np.float64), np.sum)
        sums = np.dstack(
            [shifted(cleaned[..., channel] * good, np.sum) for channel in range(3)]
        )
        fill = remaining & (weights > 0)
        mean = sums / np.maximum(weights, 1e-6)[..., None]
        cleaned = np.where(fill[..., None], mean, cleaned)
        good |= fill
        remaining &= ~fill
    return cleaned


def build_cutout() -> Image.Image:
    source = Image.open(POSE).convert("RGB")
    raw = remove(
        source,
        session=new_session("isnet-general-use"),
        post_process_mask=True,
    )
    result = defringe(raw, estimate_bg(source))
    bbox = result.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Meera matte is empty")
    left, top, right, bottom = bbox
    result = result.crop(
        (
            max(0, left - PAD),
            max(0, top - PAD),
            min(result.width, right + PAD),
            min(result.height, bottom + PAD),
        )
    )
    result.save(CUTOUT, optimize=True)
    return result


def font(size: int, *, bold: bool = False, narrow: bool = False) -> ImageFont.FreeTypeFont:
    candidates = []
    if narrow:
        candidates.append(Path("C:/Windows/Fonts/ARIALNB.TTF" if bold else "C:/Windows/Fonts/ARIALN.TTF"))
    candidates.append(Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"))
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default(size=size)


def rounded(draw: ImageDraw.ImageDraw, box, *, fill, outline=None, width=1, radius=26):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit(image: Image.Image, box: tuple[int, int], *, inset: int = 0) -> Image.Image:
    target = (max(1, box[0] - inset * 2), max(1, box[1] - inset * 2))
    copy = image.copy()
    copy.thumbnail(target, Image.Resampling.LANCZOS)
    return copy


def paste_center(canvas: Image.Image, image: Image.Image, box, *, inset=0):
    left, top, right, bottom = box
    fitted = fit(image, (right - left, bottom - top), inset=inset)
    x = left + (right - left - fitted.width) // 2
    y = top + (bottom - top - fitted.height) // 2
    canvas.alpha_composite(fitted, (x, y))


def triangle_mark(canvas: Image.Image, x: int, y: int, scale: int = 58):
    draw = ImageDraw.Draw(canvas)
    draw.polygon(
        [(x + scale // 2, y), (x + scale, y + scale), (x + int(scale * 0.78), y + scale),
         (x + scale // 2, y + int(scale * 0.35)), (x + int(scale * 0.22), y + scale), (x, y + scale)],
        fill=FOREST,
    )
    draw.polygon(
        [(x + int(scale * 0.37), y + int(scale * 0.74)), (x + int(scale * 0.63), y + int(scale * 0.74)),
         (x + int(scale * 0.72), y + scale), (x + int(scale * 0.28), y + scale)],
        fill=GOLD,
    )


def labelled_card(canvas: Image.Image, box, title: str, subtitle: str, image: Image.Image, background):
    draw = ImageDraw.Draw(canvas)
    rounded(draw, box, fill=background, outline=(16, 32, 24, 32), width=2, radius=28)
    left, top, right, bottom = box
    draw.text((left + 28, top + 24), title, font=font(28, bold=True, narrow=True), fill=FOREST)
    draw.text((left + 28, top + 62), subtitle, font=font(17), fill=MUTED)
    paste_center(canvas, image, (left + 20, top + 100, right - 20, bottom - 22), inset=8)


def build_model_sheet(cutout: Image.Image):
    canvas = Image.new("RGBA", (1400, 1800), CREAM)
    draw = ImageDraw.Draw(canvas)
    triangle_mark(canvas, 64, 56)
    draw.text((148, 52), "MEERA · MODEL SHEET V1", font=font(50, bold=True, narrow=True), fill=FOREST)
    draw.text((148, 112), "Canonical identity + approved consistency + transparent production seed", font=font(22), fill=MUTED)

    canonical = Image.open(CANONICAL).convert("RGBA")
    pose = Image.open(POSE).convert("RGBA")
    labelled_card(canvas, (64, 190, 670, 1030), "01 · IDENTITY AUTHORITY", "Owner-approved canonical base", canonical, WHITE)
    labelled_card(canvas, (730, 190, 1336, 1030), "02 · CONSISTENCY POSE", "Approved same-character proof", pose, WHITE)

    rounded(draw, (64, 1080, 1336, 1718), fill=FOREST, radius=30)
    draw.text((100, 1118), "03 · PRODUCTION SEED", font=font(30, bold=True, narrow=True), fill=GOLD)
    draw.text((100, 1160), "Transparent presenting pose · derived from panel 02 only", font=font(20), fill=SOFT)
    paste_center(canvas, cutout, (90, 1210, 650, 1685), inset=8)

    notes_x = 710
    draw.text((notes_x, 1240), "IDENTITY LOCK", font=font(24, bold=True, narrow=True), fill=WHITE)
    lock_lines = [
        "Recognisable face and proportions",
        "Side-parted wavy black hair",
        "Warm medium-brown skin tone",
        "Coral kurta · forest trousers · tan sandals",
        "Adult peer · calm painterly 3D finish",
    ]
    y = 1290
    for line in lock_lines:
        draw.ellipse((notes_x, y + 7, notes_x + 10, y + 17), fill=GOLD)
        draw.text((notes_x + 26, y), line, font=font(19), fill=SOFT)
        y += 48
    draw.text((notes_x, y + 12), "ALLOWED VARIATION", font=font(23, bold=True, narrow=True), fill=WHITE)
    draw.text((notes_x, y + 54), "Expression · gesture · pose · crop · teaching scene", font=font(18), fill=SOFT)
    draw.text((notes_x, y + 105), "NO TEXT-ONLY RECREATION", font=font(20, bold=True, narrow=True), fill=RUST)

    draw.text((64, 1750), "ADIPOLI GERMAN · CAST CONSTITUTION 3P-05", font=font(18, bold=True, narrow=True), fill=MUTED)
    canvas.convert("RGB").save(MODEL_SHEET, quality=94, optimize=True)


def composite(cutout: Image.Image, size: tuple[int, int], background) -> Image.Image:
    canvas = Image.new("RGBA", size, background)
    paste_center(canvas, cutout, (0, 0, size[0], size[1]), inset=24)
    return canvas


def edge_crop(cutout: Image.Image, region: tuple[float, float, float, float], background, size=(520, 300)) -> Image.Image:
    left = int(cutout.width * region[0])
    top = int(cutout.height * region[1])
    right = int(cutout.width * region[2])
    bottom = int(cutout.height * region[3])
    crop = cutout.crop((left, top, right, bottom))
    fitted = fit(crop, size)
    canvas = Image.new("RGBA", size, background)
    canvas.alpha_composite(fitted, ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2))
    return canvas


def alpha_metrics(cutout: Image.Image) -> dict[str, object]:
    arr = np.asarray(cutout.convert("RGBA"))
    alpha = arr[..., 3]
    rgb = arr[..., :3]
    partial = (alpha > 0) & (alpha < 255)
    review_edge = edge_band(alpha > 0)
    light_neutral = review_edge & (rgb.min(axis=2) > 145) & ((rgb.max(axis=2) - rgb.min(axis=2)) < 72)
    corners = [
        int(alpha[0, 0]),
        int(alpha[0, -1]),
        int(alpha[-1, 0]),
        int(alpha[-1, -1]),
    ]
    return {
        "transparentPixels": int((alpha == 0).sum()),
        "opaquePixels": int((alpha == 255).sum()),
        "partialPixels": int(partial.sum()),
        "cornerAlpha": corners,
        "lightNeutralEdgeCandidates": int(light_neutral.sum()),
        "reviewEdgePixels": int(review_edge.sum()),
        "lightNeutralEdgeRatio": round(float(light_neutral.sum() / max(1, review_edge.sum())), 6),
    }


def build_edge_review(cutout: Image.Image, metrics: dict[str, object]):
    canvas = Image.new("RGBA", (1400, 1900), CREAM)
    draw = ImageDraw.Draw(canvas)
    triangle_mark(canvas, 64, 56)
    draw.text((148, 52), "MEERA · ALPHA EDGE REVIEW", font=font(50, bold=True, narrow=True), fill=FOREST)
    draw.text((148, 112), "Exact brand surfaces · full figure + close inspection", font=font(22), fill=MUTED)

    rounded(draw, (64, 190, 670, 1080), fill=CREAM, outline=(16, 32, 24, 45), width=2, radius=28)
    rounded(draw, (730, 190, 1336, 1080), fill=FOREST, radius=28)
    draw.text((92, 220), "DAYLIGHT · #F5F0E8", font=font(25, bold=True, narrow=True), fill=FOREST)
    draw.text((758, 220), "ROOM · #102018", font=font(25, bold=True, narrow=True), fill=GOLD)
    paste_center(canvas, cutout, (86, 270, 648, 1050), inset=16)
    paste_center(canvas, cutout, (752, 270, 1314, 1050), inset=16)

    draw.text((64, 1130), "3× EDGE INSPECTION · HAIR / HAND", font=font(27, bold=True, narrow=True), fill=FOREST)
    hair_cream = edge_crop(cutout, (0.20, 0.00, 0.88, 0.30), CREAM)
    hair_forest = edge_crop(cutout, (0.20, 0.00, 0.88, 0.30), FOREST)
    hand_cream = edge_crop(cutout, (0.00, 0.25, 0.50, 0.43), CREAM)
    hand_forest = edge_crop(cutout, (0.00, 0.25, 0.50, 0.43), FOREST)
    for tile, xy in zip(
        (hair_cream, hair_forest, hand_cream, hand_forest),
        ((64, 1190), (740, 1190), (64, 1500), (740, 1500)),
    ):
        canvas.alpha_composite(tile, xy)

    draw.text((600, 1210), "cream", font=font(17, bold=True, narrow=True), fill=MUTED)
    draw.text((1276, 1210), "forest", font=font(17, bold=True, narrow=True), fill=SOFT)
    draw.text((600, 1520), "cream", font=font(17, bold=True, narrow=True), fill=MUTED)
    draw.text((1276, 1520), "forest", font=font(17, bold=True, narrow=True), fill=SOFT)

    ratio = float(metrics["lightNeutralEdgeRatio"]) * 100
    draw.text((64, 1842), f"PASS · corner alpha 0/0/0/0 · cream-like outer-edge candidates {ratio:.2f}%", font=font(19, bold=True, narrow=True), fill=INK)
    canvas.convert("RGB").save(EDGE_REVIEW, quality=94, optimize=True)


def write_manifest(cutout: Image.Image, metrics: dict[str, object]):
    files = {}
    for path, role in (
        (CANONICAL, "owner-approved identity authority"),
        (POSE, "owner-approved consistency and production-pose source"),
        (CUTOUT, "transparent production seed"),
        (MODEL_SHEET, "mobile-review model sheet"),
        (EDGE_REVIEW, "cream/forest alpha-edge review"),
    ):
        image = Image.open(path)
        files[path.name] = {
            "role": role,
            "sha256": sha256(path),
            "width": image.width,
            "height": image.height,
            "mode": image.mode,
        }
    payload = {
        "version": "meera-v1",
        "chunk": "3p-05",
        "identityAuthority": CANONICAL.name,
        "productionPoseSource": POSE.name,
        "productionMethod": "local rembg ISNet matte; background decontamination; 1px choke; 0.8px feather; bounded outer-rim cleanup",
        "generationPolicy": "Future pose generation/editing must condition on the canonical identity image; never recreate Meera from text alone.",
        "surfacesReviewed": {"cream": "#F5F0E8", "forest": "#102018"},
        "alphaMetrics": metrics,
        "files": files,
    }
    MANIFEST.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main():
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    cutout = build_cutout()
    metrics = alpha_metrics(cutout)
    if metrics["cornerAlpha"] != [0, 0, 0, 0]:
        raise RuntimeError("Cutout corners are not fully transparent")
    if float(metrics["lightNeutralEdgeRatio"]) >= 0.01:
        raise RuntimeError("Light-neutral edge candidate ratio exceeds 1%")
    build_model_sheet(cutout)
    build_edge_review(cutout, metrics)
    write_manifest(cutout, metrics)
    print(f"Wrote {CUTOUT.relative_to(ROOT)}")
    print(f"Wrote {MODEL_SHEET.relative_to(ROOT)}")
    print(f"Wrote {EDGE_REVIEW.relative_to(ROOT)}")
    print(f"Wrote {MANIFEST.relative_to(ROOT)}")
    print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
    main()
