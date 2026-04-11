#!/usr/bin/env python3
"""
Adipoli German — Veo Video Generation Script
Generates videos from still images using Google Cloud Vertex AI Veo API.

Usage:
    python3 scripts/generate-veo.py <image_path> <output_path> [--prompt "animation prompt"] [--duration 4] [--aspect 16:9]

Requirements:
    pip install google-auth requests
    GCP service account with Vertex AI user role
    Credentials JSON at: .google-veo-service-account.json
"""

import argparse
import base64
import json
import os
import requests
import sys
import time
from pathlib import Path
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Config
SERVICE_ACCOUNT_FILE = ".google-veo-service-account.json"
PROJECT_ID = "gen-lang-client-0108425102"
MODEL = "veo-3.1-fast-generate-001"
REGION = "us-central1"
ENDPOINT = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{REGION}/publishers/google/models/{MODEL}:predictLongRunning"
STORAGE_URI = "gs://adipoli-veo/output/"

NEGATIVE_PROMPT = (
    "No text overlays. No subtitles. No watermark. "
    "No hat. No glasses. No beard. No realistic style. "
    "No live action. No anime. No scene redesign. "
    "No camera jump. No face morphing. No shirt color change."
)


def get_credentials():
    """Get GCP credentials from service account file."""
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE,
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    creds.refresh(Request())
    return creds


def generate_video(image_path: str, prompt: str, duration: int = 4,
                   aspect_ratio: str = "16:9", sample_count: int = 1) -> str:
    """
    Generate a video from an image using Veo.
    Returns the GCS URI of the generated video.
    """
    creds = get_credentials()

    with open(image_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode("utf-8")

    mime = "image/png" if image_path.lower().endswith(".png") else "image/jpeg"

    payload = {
        "instances": [{
            "prompt": prompt,
            "image": {
                "bytesBase64Encoded": img_b64,
                "mimeType": mime
            }
        }],
        "parameters": {
            "aspectRatio": aspect_ratio,
            "sampleCount": sample_count,
            "durationSeconds": duration,
            "personGeneration": "allow_adult",
            "negativePrompt": NEGATIVE_PROMPT,
            "storageUri": STORAGE_URI
        }
    }

    print(f"Generating video from: {image_path}")
    print(f"Prompt: {prompt[:100]}...")
    print(f"Duration: {duration}s, Aspect: {aspect_ratio}")

    r = requests.post(
        ENDPOINT,
        headers={
            "Authorization": f"Bearer {creds.token}",
            "Content-Type": "application/json; charset=utf-8"
        },
        data=json.dumps(payload),
        timeout=120
    )

    if r.status_code != 200:
        print(f"ERROR: {r.status_code}")
        print(r.text)
        r.raise_for_status()

    data = r.json()
    operation_name = data.get("name")
    print(f"Operation started: {operation_name}")

    # Poll until done
    fetch_url = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{REGION}/publishers/google/models/{MODEL}:fetchPredictOperation"

    for i in range(30):
        time.sleep(10)
        r = requests.post(
            fetch_url,
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": "application/json; charset=utf-8"
            },
            data=json.dumps({"operationName": operation_name}),
            timeout=120
        )
        data = r.json()
        if data.get("done") or data.get("response") or data.get("error"):
            break
        print(f"  Waiting... ({i+1})")

    if "error" in data:
        print(f"ERROR: {data['error']}")
        raise Exception(f"Operation failed: {data['error']}")

    videos = data.get("response", {}).get("videos", [])
    if not videos:
        raise Exception("No video in response")

    gcs_uri = videos[0].get("gcsUri")
    print(f"Done! Video at: {gcs_uri}")
    return gcs_uri


def download_video(gcs_uri: str, output_path: str):
    """Download a video from GCS to local path."""
    creds = get_credentials()
    creds.refresh(Request())

    bucket, obj = gcs_uri[5:].split("/", 1)
    url = f"https://storage.googleapis.com/storage/v1/b/{bucket}/o/{requests.utils.quote(obj, safe='')}?alt=media"

    r = requests.get(url, headers={"Authorization": f"Bearer {creds.token}"}, timeout=300)
    r.raise_for_status()

    Path(output_path).write_bytes(r.content)
    size = Path(output_path).stat().st_size
    print(f"Downloaded: {output_path} ({size:,} bytes)")


def main():
    parser = argparse.ArgumentParser(description="Generate video from image using Veo")
    parser.add_argument("image_path", help="Path to input image")
    parser.add_argument("output_path", help="Path for output video")
    parser.add_argument("--prompt", default="Animate this scene naturally. Keep it cinematic and grounded.", help="Animation prompt")
    parser.add_argument("--duration", type=int, default=4, help="Video duration in seconds")
    parser.add_argument("--aspect", default="16:9", help="Aspect ratio (16:9 or 9:16)")

    args = parser.parse_args()

    gcs_uri = generate_video(args.image_path, args.prompt, args.duration, args.aspect)
    download_video(gcs_uri, args.output_path)


if __name__ == "__main__":
    main()
