#!/usr/bin/env python3
"""
Mass-produce Instagram marketing reels using Veo text-to-video.

Usage:
    # Generate from prompts JSON file
    python3 scripts/generate-marketing.py generate --prompts scripts/marketing-prompts.json

    # Generate a single reel by index
    python3 scripts/generate-marketing.py generate --prompts scripts/marketing-prompts.json --index 5

    # Apply overlays to all raw videos
    python3 scripts/generate-marketing.py overlay --prompts scripts/marketing-prompts.json

    # Full pipeline: generate + overlay
    python3 scripts/generate-marketing.py pipeline --prompts scripts/marketing-prompts.json

    # Generate review manifest
    python3 scripts/generate-marketing.py review --prompts scripts/marketing-prompts.json

Prompts JSON format:
    [
        {
            "number": 1,
            "category": "pronunciation",
            "hook": "Can you say this?",
            "german": "Brötchen",
            "english": "bread roll",
            "description": "Learn to pronounce Brötchen",
            "veo_prompt": "Inside a warm German bakery...",
            "duration": 6
        },
        ...
    ]
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import time
import requests
from pathlib import Path

# ── Config ───────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent.resolve()
SERVICE_ACCOUNT = REPO_ROOT / ".google-veo-service-account.json"

PROJECT_ID = "gen-lang-client-0108425102"
REGION = "us-central1"
VEO_MODEL = "veo-3.1-fast-generate-001"
GCS_BUCKET = "gs://adipoli-veo/output/"

RAW_DIR = REPO_ROOT / "scripts" / "output" / "marketing"
FINAL_DIR = RAW_DIR / "final"

VEO_USD_PER_SECOND = 0.035

# ── Auth ─────────────────────────────────────────────────────────────────────

_creds = None

def get_credentials():
    global _creds
    from google.oauth2 import service_account as sa
    from google.auth.transport.requests import Request
    if _creds is None:
        _creds = sa.Credentials.from_service_account_file(
            str(SERVICE_ACCOUNT),
            scopes=["https://www.googleapis.com/auth/cloud-platform"],
        )
    if not _creds.valid:
        _creds.refresh(Request())
    return _creds


# ── Veo text-to-video ────────────────────────────────────────────────────────

def generate_veo(prompt, duration, output_path, aspect="9:16"):
    """Generate a video from text prompt using Veo (no image seed)."""
    if output_path.exists():
        print(f"  [SKIP] exists → {output_path.name}")
        return True

    creds = get_credentials()
    endpoint = (
        f"https://{REGION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/"
        f"locations/{REGION}/publishers/google/models/{VEO_MODEL}:predictLongRunning"
    )
    fetch_url = (
        f"https://{REGION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/"
        f"locations/{REGION}/publishers/google/models/{VEO_MODEL}:fetchPredictOperation"
    )

    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "aspectRatio": aspect,
            "sampleCount": 1,
            "durationSeconds": duration,
            "personGeneration": "allow_adult",
            "storageUri": GCS_BUCKET,
        },
    }

    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json",
    }

    t0 = time.time()
    r = requests.post(endpoint, headers=headers, json=payload, timeout=180)
    if r.status_code != 200:
        print(f"  FAILED start: {r.status_code} {r.text[:200]}")
        return False

    op_name = r.json().get("name", "")
    print(f"  · Veo op started ...{op_name[-36:]}")

    # Poll for completion
    while True:
        time.sleep(15)
        elapsed = int(time.time() - t0)

        creds = get_credentials()
        headers["Authorization"] = f"Bearer {creds.token}"

        poll = requests.post(
            fetch_url, headers=headers,
            json={"operationName": op_name}, timeout=60
        )
        pdata = poll.json()

        if pdata.get("done"):
            break
        print(f"  · polling... {elapsed}s")

    # Extract result
    resp = pdata.get("response", {})
    videos = resp.get("videos", [])
    if not videos:
        filtered = resp.get("raiMediaFilteredCount", 0)
        reasons = resp.get("raiMediaFilteredReasons", [])
        print(f"  FAILED: no videos. Filtered: {filtered} {reasons}")
        return False

    gcs_uri = videos[0].get("gcsUri", "")
    if not gcs_uri:
        print(f"  FAILED: no GCS URI")
        return False

    # Download
    bucket_name = gcs_uri.split("/")[2]
    obj_path = "/".join(gcs_uri.split("/")[3:])
    dl_url = (
        f"https://storage.googleapis.com/storage/v1/b/{bucket_name}/"
        f"o/{requests.utils.quote(obj_path, safe='')}?alt=media"
    )

    dl = requests.get(
        dl_url, headers={"Authorization": f"Bearer {creds.token}"}, timeout=300
    )
    if dl.status_code == 200:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(dl.content)
        elapsed = int(time.time() - t0)
        cost = duration * VEO_USD_PER_SECOND
        print(f"  ✓ {output_path.name} ({len(dl.content)} bytes, {elapsed}s, ~${cost:.2f})")
        return True
    else:
        print(f"  FAILED download: {dl.status_code}")
        return False


# ── Overlay (calls reel-overlay.py) ──────────────────────────────────────────

def apply_overlay(item):
    """Apply text overlay to a raw video using reel-overlay.py."""
    raw_path = RAW_DIR / f"{item['number']:03d}-{item['category']}.mp4"
    final_path = FINAL_DIR / f"{item['number']:03d}-{item['category']}.mp4"

    if not raw_path.exists():
        print(f"  [SKIP overlay] raw not found: {raw_path.name}")
        return False

    cmd = [
        sys.executable, str(REPO_ROOT / "scripts" / "reel-overlay.py"),
        "--input", str(raw_path),
        "--output", str(final_path),
        "--hook", item.get("hook", ""),
        "--german", item.get("german", ""),
        "--english", item.get("english", ""),
        "--category", item.get("category", "general"),
        "--number", str(item.get("number", 0)),
        "--description", item.get("description", ""),
    ]

    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if r.returncode == 0:
        return True
    else:
        print(f"  overlay error: {r.stderr[-200:]}")
        return False


# ── Review manifest ──────────────────────────────────────────────────────────

def generate_review(prompts):
    """Generate a Markdown review file listing all reels."""
    review_path = FINAL_DIR / "REVIEW.md"
    lines = ["# Marketing Reels — Review\n\n"]
    lines.append("| # | Category | Hook | German | English | Raw | Final | Caption |\n")
    lines.append("|---|----------|------|--------|---------|-----|-------|---------|\n")

    for item in prompts:
        num = item["number"]
        cat = item["category"]
        raw = RAW_DIR / f"{num:03d}-{cat}.mp4"
        final = FINAL_DIR / f"{num:03d}-{cat}.mp4"
        caption = FINAL_DIR / f"{num:03d}-{cat}.caption.txt"

        raw_status = "✓" if raw.exists() else "✗"
        final_status = "✓" if final.exists() else "✗"
        caption_status = "✓" if caption.exists() else "✗"

        lines.append(
            f"| {num} | {cat} | {item.get('hook','')} | "
            f"{item.get('german','')} | {item.get('english','')} | "
            f"{raw_status} | {final_status} | {caption_status} |\n"
        )

    lines.append(f"\nTotal: {len(prompts)} reels\n")
    review_path.write_text("".join(lines))
    print(f"Review manifest: {review_path}")


# ── Commands ─────────────────────────────────────────────────────────────────

def cmd_generate(args):
    prompts = json.loads(Path(args.prompts).read_text())

    if args.index is not None:
        prompts = [p for p in prompts if p["number"] == args.index]

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    for item in prompts:
        num = item["number"]
        cat = item["category"]
        output = RAW_DIR / f"{num:03d}-{cat}.mp4"

        print(f"\n--- #{num} {cat}: {item.get('hook','')} ---")
        ok = generate_veo(item["veo_prompt"], item["duration"], output)
        if not ok and not args.skip_failures:
            print("Stopping. Use --skip-failures to continue past errors.")
            break


def cmd_overlay(args):
    prompts = json.loads(Path(args.prompts).read_text())
    FINAL_DIR.mkdir(parents=True, exist_ok=True)

    for item in prompts:
        print(f"\n--- #{item['number']} {item['category']} ---")
        apply_overlay(item)


def cmd_pipeline(args):
    """Full pipeline: generate all → overlay all → review."""
    prompts = json.loads(Path(args.prompts).read_text())
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    FINAL_DIR.mkdir(parents=True, exist_ok=True)

    for item in prompts:
        num = item["number"]
        cat = item["category"]
        raw = RAW_DIR / f"{num:03d}-{cat}.mp4"

        print(f"\n--- #{num} {cat}: {item.get('hook','')} ---")

        # Generate
        if not raw.exists():
            ok = generate_veo(item["veo_prompt"], item["duration"], raw)
            if not ok:
                print("  [WARN] generation failed, skipping overlay")
                continue

        # Overlay
        apply_overlay(item)

    # Review
    generate_review(prompts)
    print("\n=== PIPELINE COMPLETE ===")


def cmd_review(args):
    prompts = json.loads(Path(args.prompts).read_text())
    generate_review(prompts)


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    p = argparse.ArgumentParser(description="Mass-produce Instagram marketing reels")
    sub = p.add_subparsers(dest="cmd")

    gen = sub.add_parser("generate", help="Generate raw videos with Veo")
    gen.add_argument("--prompts", required=True, help="Path to prompts JSON")
    gen.add_argument("--index", type=int, help="Generate only this number")
    gen.add_argument("--skip-failures", action="store_true")

    ovl = sub.add_parser("overlay", help="Apply text overlays to raw videos")
    ovl.add_argument("--prompts", required=True)

    pip = sub.add_parser("pipeline", help="Full pipeline: generate + overlay + review")
    pip.add_argument("--prompts", required=True)

    rev = sub.add_parser("review", help="Generate review manifest")
    rev.add_argument("--prompts", required=True)

    args = p.parse_args()

    if args.cmd == "generate":
        cmd_generate(args)
    elif args.cmd == "overlay":
        cmd_overlay(args)
    elif args.cmd == "pipeline":
        cmd_pipeline(args)
    elif args.cmd == "review":
        cmd_review(args)
    else:
        p.print_help()


if __name__ == "__main__":
    main()
