"""
3p-01 - Re-matte the character cutouts (DECISIONS #17.5).

The shipped cutouts in public/images/characters/ were made with flood-fill
background removal (DECISIONS #10) and keep large parts of the original
studio background - visible as white/gray boxes behind Frau Weber and
Kuttan in the app. This script rebuilds every cutout from the original
1024x1024 RGB renders using a local AI matte (rembg / isnet-general-use;
free, offline after the one-time model download - no paid APIs).

Sources:
  scripts/output/frau-weber/{greeting,neutral,pleased,teaching}.png
  scripts/output/kuttan-pack/<mood>/cand-N.png   (all candidates matted;
      the one most similar to the currently shipped cutout wins, so the
      canonical pose per DECISIONS #10 is preserved)

Output:
  scripts/output/rematte/<name>.png              staged new cutouts
  scripts/output/rematte/contact-sheet-*.png     old vs new on teal + zooms
  scripts/output/rematte/choices.json            which source won per target

Apply (after visual review):
  python scripts/rematte-characters.py --apply   copies staged files over
                                                 public/images/characters/
"""

from __future__ import annotations

import io
import json
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images" / "characters"
KUTTAN_PACK = ROOT / "scripts" / "output" / "kuttan-pack"
FRAU_WEBER = ROOT / "scripts" / "output" / "frau-weber"
STAGING = ROOT / "scripts" / "output" / "rematte"

KUTTAN_MOODS = [
    "celebrating", "confused", "excited", "happy", "official", "pointing",
    "reading", "sad", "thinking", "thumbsup", "waving",
]
FRAU_WEBER_MOODS = ["greeting", "neutral", "pleased", "teaching"]

# Teal makes leftover white background pixels obvious; dark green matches
# the classroom scene the owner reviews against.
REVEAL_BG = (14, 116, 144, 255)
DARK_BG = (26, 58, 42, 255)
PAD = 8


def estimate_bg(src_img: Image.Image) -> np.ndarray:
    """Median color of the four 16px corner patches of the original render."""
    arr = np.asarray(src_img.convert("RGB"), dtype=np.float64)
    k = 16
    corners = np.concatenate([
        arr[:k, :k].reshape(-1, 3), arr[:k, -k:].reshape(-1, 3),
        arr[-k:, :k].reshape(-1, 3), arr[-k:, -k:].reshape(-1, 3),
    ])
    return np.median(corners, axis=0)


def _shift_apply(channel: np.ndarray, fn) -> np.ndarray:
    """Apply fn over each pixel's 3x3 neighborhood via padded shifts."""
    h, w = channel.shape
    pad = np.pad(channel, 1, mode="edge")
    stack = [pad[dy:dy + h, dx:dx + w] for dy in (0, 1, 2) for dx in (0, 1, 2)]
    return fn(np.stack(stack), axis=0)


def defringe(cutout: Image.Image, bg: np.ndarray) -> Image.Image:
    """Remove baked-in background color from the matte's edge.

    Two contamination kinds, two fixes — neither blurs the artwork:
    1. Semi-transparent pixels are C = a*F + (1-a)*B with B the known studio
       background; solving for F restores the true color exactly.
    2. The outermost *opaque* pixel ring keeps the source render's own white
       anti-aliasing, which no color math can undo — so the alpha is choked
       1px (dropping exactly that ring) and re-feathered softly. 1px on a
       ~930px-tall figure is invisible; the edge composites cleanly on any
       background.
    Finally, edge colors are bled outward into transparent pixels so image
    scaling never samples stale background color.
    """
    from PIL import ImageFilter

    arr = np.asarray(cutout.convert("RGBA"), dtype=np.float64)
    rgb, a8 = arr[..., :3], arr[..., 3]
    a = a8 / 255.0

    # 1. decontaminate genuinely semi-transparent pixels
    semi = (a > 0.0) & (a < 1.0)
    if semi.any():
        af = a[..., None]
        true_fg = (rgb - (1.0 - af) * bg) / np.maximum(af, 1e-6)
        rgb = np.where(semi[..., None], np.clip(true_fg, 0.0, 255.0), rgb)

    # 2. choke 1px, then feather: soft edge now sits on clean foreground color
    a = _shift_apply(a, np.min)
    a_img = Image.fromarray((a * 255.0).astype(np.uint8), "L")
    a = np.asarray(a_img.filter(ImageFilter.GaussianBlur(0.8)),
                   dtype=np.float64) / 255.0
    a = np.where(a < 0.03, 0.0, a)  # kill invisible haze ring

    # 3. color bleed: transparent pixels inherit mean neighbor color (2 rings)
    for _ in range(2):
        vis = (a > 0.0).astype(np.float64)
        sum_rgb = np.dstack([
            _shift_apply(rgb[..., c] * vis, np.sum) for c in range(3)
        ])
        sum_w = _shift_apply(vis, np.sum)
        fillable = (a == 0.0) & (sum_w > 0)
        mean_rgb = sum_rgb / np.maximum(sum_w, 1e-6)[..., None]
        rgb = np.where(fillable[..., None], mean_rgb, rgb)

    out = np.dstack([np.clip(rgb, 0, 255), a * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def matte(session, src: Path) -> Image.Image:
    """AI-matte one source render, defringe it, crop to the alpha bbox."""
    src_img = Image.open(src).convert("RGB")
    out = remove(src_img, session=session, post_process_mask=True)
    out = defringe(out, estimate_bg(src_img))
    bbox = out.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError(f"empty matte for {src}")
    left, top, right, bottom = bbox
    left, top = max(0, left - PAD), max(0, top - PAD)
    right, bottom = min(out.width, right + PAD), min(out.height, bottom + PAD)
    return out.crop((left, top, right, bottom))


def on_bg(img: Image.Image, size: tuple[int, int], bg) -> Image.Image:
    """Fit img into size over a solid background (for compare/sheets)."""
    canvas = Image.new("RGBA", size, bg)
    fitted = img.copy()
    fitted.thumbnail(size, Image.LANCZOS)
    canvas.alpha_composite(
        fitted, ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2)
    )
    return canvas


def similarity(a: Image.Image, b: Image.Image) -> float:
    """Mean absolute pixel difference on small white-flattened grayscale."""
    small = (96, 96)
    ga = on_bg(a, small, (255, 255, 255, 255)).convert("L")
    gb = on_bg(b, small, (255, 255, 255, 255)).convert("L")
    pa, pb = ga.tobytes(), gb.tobytes()
    return sum(abs(x - y) for x, y in zip(pa, pb)) / len(pa)


def zoom_edge(img: Image.Image, bg) -> Image.Image:
    """3x zoom of the top-right quarter (hair/shoulder edge region)."""
    region = img.crop((img.width // 2, 0, img.width, img.height // 2))
    tile = on_bg(region, (220, 220), bg)
    return tile.resize((tile.width, tile.height), Image.LANCZOS)


def build_targets() -> dict[str, list[Path]]:
    targets: dict[str, list[Path]] = {}
    for mood in FRAU_WEBER_MOODS:
        targets[f"frau-weber-{mood}.png"] = [FRAU_WEBER / f"{mood}.png"]
    for mood in KUTTAN_MOODS:
        cands = sorted((KUTTAN_PACK / mood).glob("cand-*.png"))
        if not cands:
            raise FileNotFoundError(f"no candidates for kuttan mood '{mood}'")
        targets[f"kuttan-{mood}.png"] = cands
    return targets


def main() -> None:
    apply = "--apply" in sys.argv
    STAGING.mkdir(parents=True, exist_ok=True)

    if apply:
        applied = 0
        for target in build_targets():  # only real cutout names, not evidence
            staged = STAGING / target
            dest = PUBLIC / target
            if not staged.exists() or not dest.exists():
                raise FileNotFoundError(f"missing staged or target file for {target}")
            shutil.copyfile(staged, dest)
            applied += 1
        print(f"applied {applied} cutouts to {PUBLIC}")
        return

    session = new_session("isnet-general-use")
    choices: dict[str, str] = {}
    rows: dict[str, tuple[Image.Image, Image.Image]] = {}

    for target, sources in build_targets().items():
        old = Image.open(PUBLIC / target).convert("RGBA")
        best, best_src, best_score = None, None, None
        for src in sources:
            candidate = matte(session, src)
            score = similarity(candidate, old)
            if best_score is None or score < best_score:
                best, best_src, best_score = candidate, src, score
        assert best is not None and best_src is not None
        best.save(STAGING / target)
        choices[target] = str(best_src.relative_to(ROOT)).replace("\\", "/")
        rows[target] = (old, best)
        print(f"{target}: {choices[target]} (score {best_score:.1f})")

    (STAGING / "choices.json").write_text(json.dumps(choices, indent=2))

    # Contact sheets: per character family, one row per mood:
    # [old on teal | new on teal | old edge zoom | new edge zoom]
    tile, zoom_w, label_h = (260, 340), 220, 26
    font = ImageFont.load_default()
    for family, names in (
        ("kuttan", [n for n in rows if n.startswith("kuttan")]),
        ("frau-weber", [n for n in rows if n.startswith("frau-weber")]),
    ):
        width = tile[0] * 2 + zoom_w * 2 + 40
        height = (tile[1] + label_h) * len(names) + 40
        sheet = Image.new("RGBA", (width, height), (24, 24, 27, 255))
        draw = ImageDraw.Draw(sheet)
        y = 20
        for name in names:
            old, new = rows[name]
            draw.text((20, y), f"{name}   OLD | NEW | old edge x3 | new edge x3",
                      fill=(250, 250, 249, 255), font=font)
            y += label_h
            x = 20
            for img in (on_bg(old, tile, REVEAL_BG), on_bg(new, tile, REVEAL_BG)):
                sheet.alpha_composite(img, (x, y))
                x += tile[0] + 4
            for img in (zoom_edge(old, DARK_BG), zoom_edge(new, DARK_BG)):
                sheet.alpha_composite(img, (x, y))
                x += zoom_w + 4
            y += tile[1]
        out = STAGING / f"contact-sheet-{family}.png"
        sheet.convert("RGB").save(out)
        print(f"wrote {out}")


if __name__ == "__main__":
    main()
