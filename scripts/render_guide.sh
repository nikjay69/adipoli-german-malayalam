#!/usr/bin/env bash
# Render one module's guide video.
#
# Usage: scripts/render_guide.sh <module-id>
#   e.g. scripts/render_guide.sh 1
#
# Pre-requisite: scripts/output/module-XX.script.md exists (produced by the audit loop).
#
# Pipeline:
#   1. parse_script.py  → /tmp/module-XX.props.json (Remotion props)
#   2. (optional) audio  → public/audio/module-XX/*.mp3 via gen-tts.ts
#   3. remotion render LessonGuide --props=@props.json → public/preview/module-XX.mp4

set -euo pipefail

MODULE_ID="${1:-}"
if [[ -z "$MODULE_ID" ]]; then
  echo "Usage: $0 <module-id>" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PADDED=$(printf "%02d" "$MODULE_ID")
SCRIPT_MD="$REPO_ROOT/scripts/output/module-${PADDED}.script.md"
PROPS_JSON="/tmp/module-${PADDED}.props.json"
PREVIEW_DIR="$REPO_ROOT/public/preview"
OUT_MP4="$PREVIEW_DIR/module-${PADDED}.mp4"

if [[ ! -f "$SCRIPT_MD" ]]; then
  echo "FATAL: script not found at $SCRIPT_MD — run audit loop first" >&2
  exit 2
fi

mkdir -p "$PREVIEW_DIR"

echo "=> parsing $SCRIPT_MD"
python3 "$REPO_ROOT/scripts/parse_script.py" "$SCRIPT_MD" > "$PROPS_JSON"
echo "   wrote $PROPS_JSON ($(wc -c < "$PROPS_JSON") bytes)"

cd "$REPO_ROOT"

echo "=> rendering LessonGuide composition -> $OUT_MP4"
npx --yes remotion render LessonGuide "$OUT_MP4" \
  --props="$PROPS_JSON" \
  --concurrency=2 \
  --log=info

echo "OK: $OUT_MP4"
ls -la "$OUT_MP4"
