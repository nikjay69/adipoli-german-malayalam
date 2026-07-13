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

# Teal makes leftover white background pixels obvious.
REVEAL_BG = (14, 116, 144, 255)
PAD = 8


def matte(session, src: Path) -> Image.Image:
    """AI-matte one source render and crop to the alpha bounding box."""
    out = remove(
        Image.open(src).convert("RGB"),
        session=session,
        post_process_mask=True,
    )
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
        for staged in sorted(STAGING.glob("*.png")):
            if staged.name.startswith("contact-sheet"):
                continue
            dest = PUBLIC / staged.name
            if not dest.exists():
                raise FileNotFoundError(f"unexpected target {dest}")
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
            for img in (zoom_edge(old, REVEAL_BG), zoom_edge(new, REVEAL_BG)):
                sheet.alpha_composite(img, (x, y))
                x += zoom_w + 4
            y += tile[1]
        out = STAGING / f"contact-sheet-{family}.png"
        sheet.convert("RGB").save(out)
        print(f"wrote {out}")


if __name__ == "__main__":
    main()
