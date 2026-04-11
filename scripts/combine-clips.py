#!/usr/bin/env python3
"""
Adipoli German — Combine Video Clips
Combines multiple MP4 clips into a single video using ffmpeg.

Usage:
    python3 scripts/combine-clips.py -i clip1.mp4 clip2.mp4 clip3.mp4 -o output.mp4
"""

import subprocess
import argparse
import sys
from pathlib import Path


def combine_videos(input_files: list, output_file: str, video_filter: str = None):
    """Combine multiple MP4 files into one using ffmpeg concat."""
    # Verify all input files exist
    for f in input_files:
        if not Path(f).exists():
            print(f"ERROR: File not found: {f}")
            sys.exit(1)

    # Build ffmpeg command
    cmd = ["ffmpeg", "-y"]
    for f in input_files:
        cmd += ["-i", f]

    if video_filter:
        cmd += ["-filter_complex", f"{video_filter}[v][a]"]
        cmd += ["-map", "[v]", "-map", "[a]"]
    else:
        # Default: concatenate all video and audio streams
        concat = "".join(f"[{i}:v:0][{i}:a:0]" for i in range(len(input_files)))
        cmd += ["-filter_complex", f"{concat}concat=n={len(input_files)}:v=1:a=1[v][a]"]
        cmd += ["-map", "[v]", "-map", "[a]"]

    cmd.append(output_file)

    print(f"Running: {' '.join(cmd[:6])}...")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print("STDERR:", result.stderr[-2000:])
        print("ERROR: ffmpeg failed")
        sys.exit(1)

    size = Path(output_file).stat().st_size
    print(f"Done! Output: {output_file} ({size:,} bytes)")


def main():
    parser = argparse.ArgumentParser(description="Combine video clips into one")
    parser.add_argument("-i", "--inputs", nargs="+", required=True, help="Input MP4 files")
    parser.add_argument("-o", "--output", required=True, help="Output MP4 file")
    parser.add_argument("-vf", "--video-filter", help="Custom video filtercomplex")

    args = parser.parse_args()
    combine_videos(args.inputs, args.output, args.video_filter)


if __name__ == "__main__":
    main()
