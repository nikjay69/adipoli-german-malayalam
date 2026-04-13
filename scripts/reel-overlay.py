#!/usr/bin/env python3
"""
Add Instagram reel text overlays to marketing videos.
Generates final reel + review metadata.

Usage:
    python3 scripts/reel-overlay.py --input raw.mp4 --output final.mp4 \
        --hook "Can you say this?" \
        --german "Brötchen" \
        --english "bread roll" \
        --category pronunciation \
        --number 1
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BRAND = "@adipoligerman"


def build_filter(hook, german, english, category):
    """Build ffmpeg drawtext filter chain for Instagram reel style."""

    filters = []

    # ── Instagram safe zones (9:16 portrait) ──
    # Top 15% = username/follow → AVOID
    # Bottom 20% = caption/buttons → AVOID
    # Safe content zone: 15%–80% of height
    # Subtle gradient behind bottom text — not a hard box, just a soft fade
    if german or english:
        filters.append(
            "drawbox=x=0:y=ih*0.68:w=iw:h=ih*0.15:color=black@0.35:t=fill"
        )

    # Hook text — in safe zone, below IG username area
    if hook:
        filters.append(
            f"drawtext=text='{_esc(hook)}':"
            f"fontfile={FONT_BOLD}:fontsize=26:"
            f"fontcolor=white:borderw=2:bordercolor=black@0.7:"
            f"x=(w-text_w)/2:y=h*0.18"
        )

    # German word — big, bold, lower safe zone
    if german:
        filters.append(
            f"drawtext=text='{_esc(german)}':"
            f"fontfile={FONT_BOLD}:fontsize=54:"
            f"fontcolor=white:borderw=3:bordercolor=black@0.8:"
            f"x=(w-text_w)/2:y=h*0.72"
        )

    # English translation — below German
    if english:
        filters.append(
            f"drawtext=text='{_esc(english)}':"
            f"fontfile={FONT_REG}:fontsize=28:"
            f"fontcolor=white@0.9:borderw=2:bordercolor=black@0.7:"
            f"x=(w-text_w)/2:y=h*0.79"
        )

    return ",".join(filters)


def _esc(text):
    """Escape special chars for ffmpeg drawtext."""
    return text.replace("'", "'\\''").replace(":", "\\:").replace("%", "%%")


def overlay(input_path, output_path, hook, german, english, category):
    """Apply text overlay to video."""
    vf = build_filter(hook, german, english, category)

    cmd = [
        "ffmpeg", "-y",
        "-i", str(input_path),
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "copy",
        str(output_path),
    ]

    r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        print(f"  ffmpeg error: {r.stderr[-300:]}")
        return False
    return True


def generate_caption(number, category, hook, german, english, description):
    """Generate Instagram caption."""

    hashtags = "#LearnGerman #GermanForBeginners #AdipoliGerman #DeutschLernen #GermanLanguage #StudyInGermany #Kerala #Germany"

    if category == "pronunciation":
        caption = (
            f"🇩🇪 {hook}\n\n"
            f"📖 {german} = {english}\n\n"
            f"Save this and practice! 🔖\n\n"
            f"Follow @adipoligerman for daily German 🇩🇪🇮🇳\n\n"
            f"{hashtags}"
        )
    elif category == "pov":
        caption = (
            f"🇩🇪 {hook}\n\n"
            f"{description}\n\n"
            f"Tag someone who dreams of Germany 🏷️\n\n"
            f"Follow @adipoligerman for your German journey 🇩🇪🇮🇳\n\n"
            f"{hashtags}"
        )
    elif category == "fact":
        caption = (
            f"🤯 {hook}\n\n"
            f"{description}\n\n"
            f"Share this with someone who needs to know! 📤\n\n"
            f"Follow @adipoligerman 🇩🇪🇮🇳\n\n"
            f"{hashtags}"
        )
    else:
        caption = (
            f"🇩🇪 {description}\n\n"
            f"Follow @adipoligerman 🇩🇪🇮🇳\n\n"
            f"{hashtags}"
        )

    return caption


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True)
    p.add_argument("--output", required=True)
    p.add_argument("--hook", default="")
    p.add_argument("--german", default="")
    p.add_argument("--english", default="")
    p.add_argument("--category", default="general")
    p.add_argument("--number", type=int, default=0)
    p.add_argument("--description", default="")
    args = p.parse_args()

    inp = Path(args.input)
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)

    print(f"  Overlaying #{args.number}: {args.hook} | {args.german}")
    ok = overlay(inp, out, args.hook, args.german, args.english, args.category)

    if ok:
        # Generate caption
        caption = generate_caption(
            args.number, args.category, args.hook,
            args.german, args.english, args.description
        )

        # Save caption
        caption_path = out.with_suffix(".caption.txt")
        caption_path.write_text(caption)

        # Save metadata
        meta = {
            "number": args.number,
            "category": args.category,
            "hook": args.hook,
            "german": args.german,
            "english": args.english,
            "description": args.description,
            "raw_video": str(inp),
            "final_video": str(out),
            "caption_file": str(caption_path),
        }
        meta_path = out.with_suffix(".meta.json")
        meta_path.write_text(json.dumps(meta, indent=2))

        print(f"  ✓ {out.name} + caption + metadata")
    else:
        print(f"  ✗ Failed")


if __name__ == "__main__":
    main()
