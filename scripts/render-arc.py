#!/usr/bin/env python3
"""
scripts/render-arc.py — Cinematic arc orchestrator

Reads scripts/cinematic-arc.json and produces the new Kerala-learning arc
videos (Videos 2-6) using Imagen 3 (Vertex AI) for stills and Veo 3.1 (Vertex AI)
for animated clips. Chains scenes via ffmpeg-extracted last frames where the
manifest specifies seed_strategy=chain_from_previous. Composes per-video MP4s
via ffmpeg concat. Uploads results to GCS for phone review.

Single source of truth: scripts/cinematic-arc.json
Single auth: .google-veo-service-account.json (Vertex AI service account)

Usage:
    python3 scripts/render-arc.py preflight
    python3 scripts/render-arc.py render --video 2 --dry-run
    python3 scripts/render-arc.py render --video 2 --phase stills
    python3 scripts/render-arc.py render --video 2 --phase clips
    python3 scripts/render-arc.py render --video 2 --phase all
    python3 scripts/render-arc.py render --video 2 --scene v2-s1
    python3 scripts/render-arc.py compose --video 2
    python3 scripts/render-arc.py publish --video 2
    python3 scripts/render-arc.py pipeline --video 2     # render + compose + publish

Idempotent: existing outputs are skipped unless --force is passed.

Requires:
    pip install google-auth requests
    ffmpeg in PATH
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import quote

try:
    import requests
    from google.oauth2 import service_account
    from google.auth.transport.requests import Request
except ImportError as e:
    print(f"FATAL: missing Python dependency — {e}")
    print("Install with: pip install google-auth requests")
    sys.exit(2)

# ── Constants ─────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent.resolve()
MANIFEST_PATH = REPO_ROOT / "scripts" / "cinematic-arc.json"
SERVICE_ACCOUNT_PATH = REPO_ROOT / ".google-veo-service-account.json"
LOG_PATH = REPO_ROOT / "docs" / "AI_GENERATION_LOG.md"
COSTS_PATH = REPO_ROOT / "docs" / "AI_GENERATION_COSTS.md"
PILOT_DIR = REPO_ROOT / "pilot"

# Cost estimates (rough — actual billing is what counts; ledger tracks both)
IMAGEN_USD_PER_IMAGE = 0.04
VEO_USD_PER_SECOND = 0.035  # ≈ ₹3/sec at current rate, matches observed ~₹12/4s clip

# ── Helpers ───────────────────────────────────────────────────────────────────

_creds = None  # cached credentials


def get_credentials():
    """Cached service account credentials with on-demand token refresh."""
    global _creds
    if _creds is None:
        if not SERVICE_ACCOUNT_PATH.exists():
            raise FileNotFoundError(
                f"Service account file not found: {SERVICE_ACCOUNT_PATH}\n"
                f"This file should contain the Vertex AI service account JSON. "
                f"Do NOT commit it to git."
            )
        _creds = service_account.Credentials.from_service_account_file(
            str(SERVICE_ACCOUNT_PATH),
            scopes=["https://www.googleapis.com/auth/cloud-platform"],
        )
    if not _creds.valid:
        _creds.refresh(Request())
    return _creds


def load_manifest():
    if not MANIFEST_PATH.exists():
        raise FileNotFoundError(f"Manifest not found: {MANIFEST_PATH}")
    with open(MANIFEST_PATH) as f:
        return json.load(f)


def video_paths(video_id):
    """Return the standard pilot paths for a video."""
    base = PILOT_DIR / f"video-{video_id}"
    return {
        "base": base,
        "seeds": base / "seeds",
        "raw": base / "raw",
        "lastframes": base / "lastframes",
        "output": base / "output",
        "review": base / "review",
    }


def ensure_video_dirs(video_id):
    for d in video_paths(video_id).values():
        d.mkdir(parents=True, exist_ok=True)


def now_iso():
    return datetime.utcnow().isoformat(timespec="seconds") + "Z"


def find_video(manifest, video_id):
    for v in manifest["videos"]:
        if v["id"] == video_id:
            return v
    raise ValueError(f"Video {video_id} not found in manifest")


def find_scene(video, scene_id):
    for s in video["scenes"]:
        if s["id"] == scene_id:
            return s
    raise ValueError(f"Scene {scene_id} not found in video {video['id']}")


# ── Logging ───────────────────────────────────────────────────────────────────


def init_log_files():
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not LOG_PATH.exists():
        LOG_PATH.write_text(
            "# AI Generation Session Log\n\n"
            "Append-only log of every Imagen + Veo + ffmpeg call from "
            "`scripts/render-arc.py`. Each entry is one Markdown section.\n\n"
            "Use this to audit drift, debug failures, and reconstruct the prompt "
            "actually sent for any given output.\n\n---\n\n"
        )
    if not COSTS_PATH.exists():
        COSTS_PATH.write_text(
            "# AI Generation Cost Ledger\n\n"
            "Live append-only ledger of API spend from `scripts/render-arc.py`. "
            "Estimates are based on the orchestrator's per-call cost model "
            "(Imagen: ~$0.04/image, Veo: ~$0.035/sec). Actual Vertex AI billing "
            "is authoritative — verify periodically against the GCP billing "
            "console.\n\n"
            "| Timestamp (UTC) | Type | Scene | Units | Est. USD | Status | Output |\n"
            "|---|---|---|---|---|---|---|\n"
        )


def log_action(
    action_type,
    scene_id,
    prompt,
    output_path,
    status,
    duration_seconds=None,
    latency_ms=None,
    cost_estimate=None,
    error=None,
):
    init_log_files()
    with open(LOG_PATH, "a") as f:
        f.write(f"## {now_iso()} — {action_type} — {scene_id}\n\n")
        f.write(f"- **status**: {status}\n")
        f.write(f"- **output**: `{output_path}`\n")
        if latency_ms is not None:
            f.write(f"- **latency_ms**: {latency_ms}\n")
        if cost_estimate is not None:
            f.write(f"- **cost_estimate_usd**: {cost_estimate:.4f}\n")
        if duration_seconds is not None:
            f.write(f"- **duration_seconds**: {duration_seconds}\n")
        if error:
            f.write(f"- **error**: `{str(error)[:300]}`\n")
        if prompt:
            f.write(f"\n```\n{prompt[:600]}\n```\n")
        f.write("\n---\n\n")


def log_cost(action_type, scene_id, units, cost_estimate_usd, output_path, status):
    init_log_files()
    with open(COSTS_PATH, "a") as f:
        f.write(
            f"| {now_iso()} | {action_type} | {scene_id} | {units} | "
            f"{cost_estimate_usd:.4f} | {status} | `{output_path}` |\n"
        )


# ── Still generation (Gemini Flash image gen, Vertex AI) ─────────────────────


GEMINI_USD_PER_IMAGE = 0.04  # approximate; actual billing may differ


def call_imagen(scene, output_path, globals_, dry_run=False):
    """Generate a still image via Gemini Flash image generation (Vertex AI).

    Uses the same model Openclaw used for Videos 1 & 7:
    google/gemini-3.1-flash-image-preview via :generateContent endpoint.
    Negative prompt is inlined into the text prompt (Gemini has no negativePrompt param).
    """
    project_id = globals_["project_id"]
    region = globals_["region"]
    model = globals_.get("still_model", "gemini-2.5-flash-image")
    aspect = globals_.get("_video_aspect") or globals_["aspect_ratio"]

    # Build prompt: style + character + scene + negative instructions inline
    negative = globals_.get("negative_prompt", "")
    orientation = "Vertical portrait composition, tall and narrow framing. " if aspect == "9:16" else ""
    full_prompt = (
        f"{orientation}{globals_['style_block']} {globals_['character_block']} "
        f"{scene['still_prompt']} {negative}"
    )

    if dry_run:
        print(f"  [DRY RUN] Gemini ({model}) → {output_path}")
        print(f"    Prompt ({len(full_prompt)} chars): {full_prompt[:140]}…")
        return

    if output_path.exists():
        print(f"  [SKIP] still exists → {output_path.name}")
        return

    creds = get_credentials()
    # Use v1beta1 for image generation config (aspect ratio support)
    endpoint = (
        f"https://{region}-aiplatform.googleapis.com/v1beta1/projects/{project_id}/"
        f"locations/{region}/publishers/google/models/{model}:generateContent"
    )

    # Build content parts: optional reference image + text prompt
    parts = []
    ref_path = REPO_ROOT / globals_.get(
        "kuttan_reference", "pilot/video-1/seeds/s1-start.jpg"
    )
    if ref_path.exists():
        ref_b64 = base64.b64encode(ref_path.read_bytes()).decode("utf-8")
        parts.append({
            "inlineData": {
                "mimeType": "image/jpeg",
                "data": ref_b64,
            }
        })
        # Prepend instruction to match only the character identity, not the scene
        full_prompt = (
            "Use the character from this reference image — match their exact "
            "face, hair, and build. Do NOT copy the scene, pose, or props "
            "from the reference. Instead, place this character in the "
            "following new scene: " + full_prompt
        )
        print(f"  [REF] Kuttan reference image included as input")

    parts.append({"text": full_prompt})

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": parts,
            }
        ],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"],
            "imageConfig": {
                "aspectRatio": aspect,
            },
        },
    }

    t0 = time.time()
    try:
        r = requests.post(
            endpoint,
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": "application/json; charset=utf-8",
            },
            data=json.dumps(payload),
            timeout=180,
        )
        latency_ms = int((time.time() - t0) * 1000)

        if r.status_code != 200:
            err = f"HTTP {r.status_code}: {r.text[:300]}"
            log_action(
                "gemini-img", scene["id"], full_prompt, output_path,
                "failed", latency_ms=latency_ms, error=err,
            )
            log_cost("gemini-img", scene["id"], 0, 0.0, output_path, "failed")
            raise RuntimeError(f"Gemini image API error — {err}")

        data = r.json()
        # Extract image from candidates[].content.parts[].inlineData
        candidates = data.get("candidates", [])
        if not candidates:
            raise RuntimeError(f"Gemini returned no candidates: {data}")

        b64 = None
        for part in candidates[0].get("content", {}).get("parts", []):
            if "inlineData" in part:
                b64 = part["inlineData"]["data"]
                break

        if not b64:
            raise RuntimeError(
                f"Gemini response has no image data: "
                f"{json.dumps(data)[:400]}"
            )

        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(base64.b64decode(b64))

        log_action(
            "gemini-img", scene["id"], full_prompt, output_path,
            "ok", latency_ms=latency_ms, cost_estimate=GEMINI_USD_PER_IMAGE,
        )
        log_cost("gemini-img", scene["id"], 1, GEMINI_USD_PER_IMAGE, output_path, "ok")
        print(f"  ✓ Gemini → {output_path.name} ({latency_ms}ms, ~${GEMINI_USD_PER_IMAGE:.3f})")
        # Rate limit cooldown — Gemini Flash has tight RPM with reference images
        time.sleep(35)

    except Exception as e:
        latency_ms = int((time.time() - t0) * 1000)
        log_action(
            "gemini-img", scene["id"], full_prompt, output_path,
            "failed", latency_ms=latency_ms, error=str(e),
        )
        log_cost("gemini-img", scene["id"], 0, 0.0, output_path, "failed")
        raise


# ── Veo 3.1 (Vertex AI) ───────────────────────────────────────────────────────


def call_veo(scene, seed_image_path, output_path, globals_, dry_run=False):
    """Generate a video clip via Vertex AI Veo 3.1, image-to-video."""
    project_id = globals_["project_id"]
    region = globals_["region"]
    model = globals_["veo_model"]
    aspect = globals_.get("_video_aspect") or globals_["aspect_ratio"]
    storage_uri = globals_["gcs_output_bucket"]
    duration = scene.get("duration", globals_["default_duration_seconds"])

    full_prompt = (
        f"{globals_['style_block']} {globals_['character_block']} {scene['animation_prompt']}"
    )

    if dry_run:
        print(f"  [DRY RUN] Veo → {output_path} ({duration}s)")
        print(f"    Seed: {seed_image_path}")
        print(f"    Prompt ({len(full_prompt)} chars): {full_prompt[:140]}…")
        return

    if output_path.exists():
        print(f"  [SKIP] clip exists → {output_path.name}")
        return

    seed_path = Path(seed_image_path)
    if not seed_path.exists():
        raise FileNotFoundError(f"Seed image not found: {seed_path}")

    creds = get_credentials()
    endpoint = (
        f"https://{region}-aiplatform.googleapis.com/v1/projects/{project_id}/"
        f"locations/{region}/publishers/google/models/{model}:predictLongRunning"
    )
    fetch_url = (
        f"https://{region}-aiplatform.googleapis.com/v1/projects/{project_id}/"
        f"locations/{region}/publishers/google/models/{model}:fetchPredictOperation"
    )

    img_bytes = seed_path.read_bytes()
    img_b64 = base64.b64encode(img_bytes).decode("utf-8")
    suffix = seed_path.suffix.lower()
    mime = "image/png" if suffix == ".png" else "image/jpeg"

    payload = {
        "instances": [
            {
                "prompt": full_prompt,
                "image": {"bytesBase64Encoded": img_b64, "mimeType": mime},
            }
        ],
        "parameters": {
            "aspectRatio": aspect,
            "sampleCount": 1,
            "durationSeconds": duration,
            "personGeneration": "allow_adult",
            "negativePrompt": globals_["negative_prompt"],
            "storageUri": storage_uri,
        },
    }

    cost_est = duration * VEO_USD_PER_SECOND
    t0 = time.time()
    try:
        r = requests.post(
            endpoint,
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": "application/json; charset=utf-8",
            },
            data=json.dumps(payload),
            timeout=120,
        )
        if r.status_code != 200:
            raise RuntimeError(f"Veo submit error HTTP {r.status_code}: {r.text[:300]}")

        op_name = r.json().get("name")
        if not op_name:
            raise RuntimeError(f"Veo submit response missing operation name: {r.json()}")
        print(f"  · Veo op started …{op_name[-32:]}")

        # Poll for completion (up to 10 min)
        data = None
        for i in range(60):
            time.sleep(10)
            creds = get_credentials()  # refresh token if needed
            r = requests.post(
                fetch_url,
                headers={
                    "Authorization": f"Bearer {creds.token}",
                    "Content-Type": "application/json; charset=utf-8",
                },
                data=json.dumps({"operationName": op_name}),
                timeout=120,
            )
            data = r.json()
            if data.get("done") or data.get("response") or data.get("error"):
                break
            if (i + 1) % 3 == 0:
                print(f"  · Veo polling… {(i + 1) * 10}s elapsed")
        else:
            raise TimeoutError(f"Veo operation did not complete within 600s: {op_name}")

        if "error" in data:
            raise RuntimeError(f"Veo operation failed: {data['error']}")

        videos = data.get("response", {}).get("videos", [])
        if not videos:
            raise RuntimeError(f"Veo returned no videos: {data}")

        gcs_uri = videos[0].get("gcsUri")
        if not gcs_uri:
            raise RuntimeError(f"Veo response missing gcsUri: {videos[0]}")

        # Download from GCS to local raw/
        download_from_gcs(gcs_uri, output_path)

        latency_ms = int((time.time() - t0) * 1000)
        log_action(
            "veo", scene["id"], full_prompt, output_path,
            "ok", duration_seconds=duration, latency_ms=latency_ms, cost_estimate=cost_est,
        )
        log_cost("veo", scene["id"], duration, cost_est, output_path, "ok")
        print(f"  ✓ Veo → {output_path.name} ({latency_ms}ms, {duration}s, ~${cost_est:.3f})")

    except Exception as e:
        latency_ms = int((time.time() - t0) * 1000)
        log_action(
            "veo", scene["id"], full_prompt, output_path,
            "failed", duration_seconds=duration, latency_ms=latency_ms, error=str(e),
        )
        log_cost("veo", scene["id"], 0, 0.0, output_path, "failed")
        raise


def download_from_gcs(gcs_uri, output_path):
    """Download a GCS object using the JSON API + bearer token."""
    creds = get_credentials()
    bucket, obj = gcs_uri[5:].split("/", 1)
    url = (
        f"https://storage.googleapis.com/storage/v1/b/{bucket}/o/"
        f"{quote(obj, safe='')}?alt=media"
    )
    r = requests.get(
        url, headers={"Authorization": f"Bearer {creds.token}"}, timeout=300
    )
    r.raise_for_status()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(r.content)
    print(f"  · downloaded {len(r.content):,} bytes from GCS")


# ── ffmpeg helpers ────────────────────────────────────────────────────────────


def extract_lastframe(clip_path, output_path):
    """Extract the last frame of a video as JPG using ffmpeg."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_path.exists():
        return
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-sseof", "-0.1",
        "-i", str(clip_path),
        "-update", "1",
        "-q:v", "2",
        str(output_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg lastframe failed: {result.stderr[:300]}")
    print(f"  ✓ lastframe → {output_path.name}")


def compose_video(clip_paths, output_path):
    """Concat multiple MP4 clips into one MP4 via ffmpeg concat demuxer."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    list_file = output_path.parent / f".concat-{output_path.stem}-{int(time.time())}.txt"
    with open(list_file, "w") as f:
        for clip in clip_paths:
            # ffmpeg concat demuxer expects POSIX-style absolute paths quoted with single quotes
            f.write(f"file '{clip.absolute()}'\n")

    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "concat", "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(output_path),
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            # Fallback to filter_complex concat (re-encode) if stream copy fails
            print(f"  ! concat demuxer failed, retrying with re-encode…")
            return compose_video_reencode(clip_paths, output_path)
    finally:
        list_file.unlink(missing_ok=True)

    size = output_path.stat().st_size
    print(f"  ✓ composed → {output_path} ({size:,} bytes)")
    return output_path


def compose_video_reencode(clip_paths, output_path):
    """Fallback compose using filter_complex (re-encodes; slower but tolerant of mismatches)."""
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    for c in clip_paths:
        cmd += ["-i", str(c)]
    n = len(clip_paths)
    concat_filter = "".join(f"[{i}:v:0]" for i in range(n)) + f"concat=n={n}:v=1:a=0[v]"
    cmd += ["-filter_complex", concat_filter, "-map", "[v]", str(output_path)]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg compose (re-encode) failed: {result.stderr[:500]}")
    size = output_path.stat().st_size
    print(f"  ✓ composed (re-encoded) → {output_path} ({size:,} bytes)")
    return output_path


# ── GCS publish-review ────────────────────────────────────────────────────────


def upload_to_gcs(local_path, bucket_name, object_name, content_type, make_public=True):
    """Upload a local file to GCS via the JSON API. Optionally set object ACL public-read."""
    creds = get_credentials()
    upload_url = (
        f"https://storage.googleapis.com/upload/storage/v1/b/{bucket_name}/o"
        f"?uploadType=media&name={quote(object_name, safe='')}"
    )
    with open(local_path, "rb") as f:
        r = requests.post(
            upload_url,
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": content_type,
            },
            data=f.read(),
            timeout=600,
        )
    if r.status_code not in (200, 201):
        raise RuntimeError(f"GCS upload failed for {object_name}: HTTP {r.status_code}: {r.text[:300]}")

    if make_public:
        acl_url = (
            f"https://storage.googleapis.com/storage/v1/b/{bucket_name}/o/"
            f"{quote(object_name, safe='')}/acl"
        )
        acl_r = requests.post(
            acl_url,
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": "application/json",
            },
            data=json.dumps({"entity": "allUsers", "role": "READER"}),
            timeout=60,
        )
        if acl_r.status_code not in (200, 201):
            print(f"  ! ACL public-read failed for {object_name}: HTTP {acl_r.status_code}")
            print(f"    URL will require auth: {acl_r.text[:200]}")

    return f"https://storage.googleapis.com/{bucket_name}/{object_name}"


def publish_video_for_review(video_id, manifest):
    """Upload the composed MP4 + individual clips + stills to GCS review bucket. Print URLs."""
    paths = video_paths(video_id)
    review_uri = manifest["globals"]["gcs_review_bucket"].rstrip("/")
    # gs://adipoli-veo/review → bucket=adipoli-veo, prefix=review
    parts = review_uri.replace("gs://", "").split("/", 1)
    bucket_name = parts[0]
    prefix = parts[1] if len(parts) > 1 else ""

    review_dir = f"{prefix}/v{video_id}-{int(time.time())}" if prefix else f"v{video_id}-{int(time.time())}"

    print(f"\n=== Publishing review for Video {video_id} ===")
    print(f"GCS path: gs://{bucket_name}/{review_dir}/")

    composed = paths["output"] / f"v{video_id}-composed.mp4"
    if not composed.exists():
        # Try alternate naming
        candidates = list(paths["output"].glob("*composed*.mp4"))
        if candidates:
            composed = candidates[0]

    urls = []

    # 1) Composed video (the headline file)
    if composed.exists():
        try:
            url = upload_to_gcs(
                composed,
                bucket_name,
                f"{review_dir}/{video_id}-composed.mp4",
                "video/mp4",
            )
            urls.append(("COMPOSED", composed.name, url))
            print(f"  ✓ COMPOSED  {composed.name}")
        except Exception as e:
            print(f"  ! upload failed for {composed.name}: {e}")
    else:
        print(f"  ! No composed video found for v{video_id} — run `compose` first")

    # 2) Individual clips
    clip_files = sorted(paths["raw"].glob("*.mp4"))
    for clip in clip_files:
        try:
            url = upload_to_gcs(
                clip,
                bucket_name,
                f"{review_dir}/clips/{clip.name}",
                "video/mp4",
            )
            urls.append(("CLIP", clip.name, url))
        except Exception as e:
            print(f"  ! upload failed for {clip.name}: {e}")

    # 3) Stills
    still_files = sorted(paths["seeds"].glob("*.jpg")) + sorted(paths["seeds"].glob("*.png"))
    still_files = [s for s in still_files if not s.name.startswith("CANONICAL")]
    for still in still_files:
        try:
            content_type = "image/jpeg" if still.suffix.lower() == ".jpg" else "image/png"
            url = upload_to_gcs(
                still,
                bucket_name,
                f"{review_dir}/stills/{still.name}",
                content_type,
            )
            urls.append(("STILL", still.name, url))
        except Exception as e:
            print(f"  ! upload failed for {still.name}: {e}")

    # Print review summary
    print(f"\n=== Review URLs ({len(urls)} files) ===")
    for kind, name, url in urls:
        marker = "🎬" if kind == "COMPOSED" else ("📹" if kind == "CLIP" else "🖼️")
        print(f"  {marker} {kind:9} {name:30} {url}")

    # Write a review-summary file locally too
    summary_path = paths["review"] / f"v{video_id}-review-{int(time.time())}.md"
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    with open(summary_path, "w") as f:
        f.write(f"# Video {video_id} Review URLs — {now_iso()}\n\n")
        f.write(f"GCS path: `gs://{bucket_name}/{review_dir}/`\n\n")
        for kind, name, url in urls:
            f.write(f"- **{kind}** `{name}` — {url}\n")
    print(f"\n  Summary saved: {summary_path}")
    return urls


# ── Render orchestration ──────────────────────────────────────────────────────


def resolve_seed_path(scene, video_id, all_scenes_in_video, paths):
    """Resolve the seed image path for a Veo call based on the scene's seed_strategy."""
    strategy = scene.get("seed_strategy", "imagen")

    if strategy == "imagen":
        return paths["seeds"] / f"{scene['id']}.jpg"

    if strategy == "chain_from_previous":
        chain_from = scene.get("chain_from")
        if not chain_from:
            # default to immediately previous scene
            idx = next(i for i, s in enumerate(all_scenes_in_video) if s["id"] == scene["id"])
            if idx == 0:
                raise ValueError(f"Scene {scene['id']} chain_from_previous but no previous scene")
            chain_from = all_scenes_in_video[idx - 1]["id"]
        # The seed is the last frame of the chained-from scene's clip
        return paths["lastframes"] / f"{chain_from}-last.jpg"

    raise ValueError(f"Unknown seed_strategy '{strategy}' on scene {scene['id']}")


def render_scene(scene, video, manifest, phase, dry_run, force):
    """Run stills + clip + lastframe for a single scene, gated by phase."""
    video_id = video["id"]
    paths = video_paths(video_id)
    ensure_video_dirs(video_id)
    globals_ = dict(manifest["globals"])
    # Per-video aspect ratio override
    if "aspect_ratio" in video:
        globals_["_video_aspect"] = video["aspect_ratio"]
    all_scenes = video["scenes"]

    print(f"\n--- Scene {scene['id']}: {scene['title']} (seed={scene.get('seed_strategy', 'imagen')}) ---")

    # PHASE: stills
    if phase in ("stills", "all"):
        if scene.get("seed_strategy", "imagen") == "imagen":
            still_path = paths["seeds"] / f"{scene['id']}.jpg"
            if force and still_path.exists():
                still_path.unlink()
            call_imagen(scene, still_path, globals_, dry_run=dry_run)
        else:
            print(f"  [SKIP imagen] scene uses chain_from_previous")

    # PHASE: clips
    if phase in ("clips", "all"):
        seed_path = resolve_seed_path(scene, video_id, all_scenes, paths)
        clip_path = paths["raw"] / f"{scene['id']}.mp4"
        if force and clip_path.exists():
            clip_path.unlink()

        # If clip's seed is a chained lastframe and that lastframe doesn't exist yet,
        # we need to extract it from the previous clip. This handles the case where
        # the previous scene's clip was just generated in this same run.
        if not seed_path.exists() and not dry_run:
            chain_from = scene.get("chain_from")
            if chain_from:
                prev_clip = paths["raw"] / f"{chain_from}.mp4"
                if prev_clip.exists():
                    extract_lastframe(prev_clip, seed_path)

        call_veo(scene, seed_path, clip_path, globals_, dry_run=dry_run)

        # Extract lastframe for any subsequent scene that might chain from this one
        if not dry_run and clip_path.exists():
            lastframe_path = paths["lastframes"] / f"{scene['id']}-last.jpg"
            if force and lastframe_path.exists():
                lastframe_path.unlink()
            try:
                extract_lastframe(clip_path, lastframe_path)
            except Exception as e:
                print(f"  ! lastframe extraction failed (non-fatal): {e}")


def render_video(video_id, scene_filter, phase, dry_run, force):
    manifest = load_manifest()
    video = find_video(manifest, video_id)
    print(f"\n=== Video {video_id}: {video['title']} ===")
    print(f"Phase: {phase} | Dry-run: {dry_run} | Force: {force}")
    print(f"Status: {video.get('status', 'unknown')}")

    if video.get("status") == "locked":
        print("⚠ This video is marked LOCKED in the manifest. Refusing to render.")
        print("  Edit cinematic-arc.json to change status if you really want to regenerate.")
        return

    scenes = video["scenes"]
    if scene_filter:
        scenes = [s for s in scenes if s["id"] == scene_filter]
        if not scenes:
            print(f"⚠ No scene matching {scene_filter} in video {video_id}")
            return

    for scene in scenes:
        try:
            render_scene(scene, video, manifest, phase, dry_run, force)
        except Exception as e:
            print(f"\n✗ FAILED scene {scene['id']}: {e}")
            print("Stopping the run. Fix the issue, then re-run — completed scenes will be skipped.")
            sys.exit(1)


def compose_video_command(video_id, force):
    manifest = load_manifest()
    video = find_video(manifest, video_id)
    paths = video_paths(video_id)

    print(f"\n=== Composing Video {video_id}: {video['title']} ===")

    # Collect clips in scene order from the manifest
    clip_paths = []
    for scene in video["scenes"]:
        clip = paths["raw"] / f"{scene['id']}.mp4"
        if not clip.exists():
            print(f"⚠ Missing clip: {clip}")
            print(f"  Run: python3 scripts/render-arc.py render --video {video_id} --phase clips")
            return
        clip_paths.append(clip)

    output = paths["output"] / f"v{video_id}-composed.mp4"
    if output.exists() and not force:
        print(f"  [SKIP] composed video exists → {output}")
        print(f"  Use --force to recompose")
        return output

    if force and output.exists():
        output.unlink()

    return compose_video(clip_paths, output)


# ── Pre-flight ────────────────────────────────────────────────────────────────


def preflight():
    """Verify the setup before any real API calls."""
    print("=== Pre-flight check ===\n")

    ok = True

    # 1. Manifest
    print("1. Manifest...")
    try:
        manifest = load_manifest()
        n_videos = len(manifest["videos"])
        n_scenes = sum(len(v["scenes"]) for v in manifest["videos"])
        print(f"   ✓ loaded {MANIFEST_PATH.name} ({n_videos} videos, {n_scenes} scenes)")
        for v in manifest["videos"]:
            n = len(v["scenes"])
            n_imagen = sum(1 for s in v["scenes"] if s.get("seed_strategy", "imagen") == "imagen")
            n_chain = n - n_imagen
            print(f"   · video {v['id']}: {v['title']} ({n} scenes, {n_imagen} imagen + {n_chain} chained)")
    except Exception as e:
        print(f"   ✗ {e}")
        ok = False
        return

    # 2. Service account
    print("\n2. Service account...")
    try:
        sa = json.loads(SERVICE_ACCOUNT_PATH.read_text())
        print(f"   ✓ loaded {SERVICE_ACCOUNT_PATH.name}")
        print(f"   · project_id: {sa.get('project_id')}")
        print(f"   · client_email: {sa.get('client_email')}")
        if sa.get("project_id") != manifest["globals"]["project_id"]:
            print(f"   ⚠ project_id MISMATCH with manifest globals.project_id={manifest['globals']['project_id']}")
            ok = False
    except Exception as e:
        print(f"   ✗ {e}")
        ok = False

    # 3. Bearer token
    print("\n3. Vertex AI auth (token refresh)...")
    try:
        creds = get_credentials()
        token_preview = (creds.token or "")[:20]
        print(f"   ✓ refreshed token (preview: {token_preview}...)")
    except Exception as e:
        print(f"   ✗ {e}")
        ok = False

    # 4. ffmpeg
    print("\n4. ffmpeg...")
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"], capture_output=True, text=True, timeout=10
        )
        first_line = result.stdout.splitlines()[0] if result.stdout else "(unknown)"
        print(f"   ✓ {first_line[:80]}")
    except Exception as e:
        print(f"   ✗ {e}")
        ok = False

    # 5. Reference image
    print("\n5. Kuttan reference image...")
    ref_path = REPO_ROOT / manifest["globals"]["kuttan_reference"]
    if ref_path.exists():
        size = ref_path.stat().st_size
        print(f"   ✓ {ref_path.relative_to(REPO_ROOT)} ({size:,} bytes)")
    else:
        print(f"   ✗ missing: {ref_path}")
        ok = False

    # 6. Pilot folder structure
    print("\n6. Pilot folders...")
    for v in manifest["videos"]:
        ensure_video_dirs(v["id"])
        print(f"   ✓ pilot/video-{v['id']}/{{seeds,raw,lastframes,output,review}}")

    # 7. Vertex AI ping (no spend) — just verify the endpoint is reachable
    print("\n7. Vertex AI endpoint reachability...")
    try:
        creds = get_credentials()
        # Hit a low-cost endpoint: list models (free)
        url = (
            f"https://us-central1-aiplatform.googleapis.com/v1/projects/"
            f"{manifest['globals']['project_id']}/locations/us-central1/publishers/google/models"
        )
        r = requests.get(
            url,
            headers={"Authorization": f"Bearer {creds.token}"},
            timeout=30,
        )
        if r.status_code == 200:
            print(f"   ✓ Vertex AI reachable, project authorized")
        else:
            print(f"   ⚠ HTTP {r.status_code}: {r.text[:200]}")
            print(f"   (may still work — some list endpoints require extra perms)")
    except Exception as e:
        print(f"   ⚠ {e} (non-fatal)")

    print()
    if ok:
        print("✓ PRE-FLIGHT PASSED — safe to proceed with --dry-run, then a single scene")
    else:
        print("✗ PRE-FLIGHT FAILED — fix the issues above before generating anything")
        sys.exit(1)


# ── CLI ───────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="Cinematic arc orchestrator — Imagen + Veo + ffmpeg + GCS",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("Usage:", 1)[1] if "Usage:" in __doc__ else "",
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("preflight", help="Verify auth, manifest, ffmpeg, paths")

    p_render = sub.add_parser("render", help="Generate stills and/or clips")
    p_render.add_argument("--video", type=int, required=True, help="Video ID (2..6)")
    p_render.add_argument("--scene", help="Single scene id (e.g. v2-s1)")
    p_render.add_argument(
        "--phase",
        choices=["stills", "clips", "all"],
        default="all",
        help="Which phase to run",
    )
    p_render.add_argument("--dry-run", action="store_true")
    p_render.add_argument("--force", action="store_true", help="Overwrite existing outputs")

    p_compose = sub.add_parser("compose", help="Concat clips into one MP4")
    p_compose.add_argument("--video", type=int, required=True)
    p_compose.add_argument("--force", action="store_true")

    p_publish = sub.add_parser("publish", help="Upload to GCS review bucket and print URLs")
    p_publish.add_argument("--video", type=int, required=True)

    p_pipeline = sub.add_parser(
        "pipeline", help="render --phase all + compose + publish (one command)"
    )
    p_pipeline.add_argument("--video", type=int, required=True)
    p_pipeline.add_argument("--dry-run", action="store_true")
    p_pipeline.add_argument("--force", action="store_true")

    args = parser.parse_args()

    if args.cmd == "preflight":
        preflight()
    elif args.cmd == "render":
        render_video(args.video, args.scene, args.phase, args.dry_run, args.force)
    elif args.cmd == "compose":
        compose_video_command(args.video, args.force)
    elif args.cmd == "publish":
        publish_video_for_review(args.video, load_manifest())
    elif args.cmd == "pipeline":
        render_video(args.video, None, "all", args.dry_run, args.force)
        if not args.dry_run:
            compose_video_command(args.video, args.force)
            publish_video_for_review(args.video, load_manifest())


if __name__ == "__main__":
    main()
