#!/usr/bin/env bash
# Batch-render M2..M18 guide videos (Phase B of the Remotion plan).
# M1 is rendered first as the prototype via render_guide.sh; this script picks
# up after M1 is approved.
#
# Usage: scripts/batch_render.sh [start_id] [end_id]
#   defaults: start=2, end=18

set -euo pipefail

START="${1:-2}"
END="${2:-18}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RENDER="$REPO_ROOT/scripts/render_guide.sh"
LOG="$REPO_ROOT/scripts/output/batch-render.log"

mkdir -p "$(dirname "$LOG")"
echo "=== batch render $(date -Is) modules $START..$END ===" | tee -a "$LOG"

for ID in $(seq "$START" "$END"); do
  PADDED=$(printf "%02d" "$ID")
  if [[ -f "$REPO_ROOT/public/preview/module-${PADDED}.mp4" ]]; then
    echo "[skip] M$ID already rendered" | tee -a "$LOG"
    continue
  fi
  if [[ ! -f "$REPO_ROOT/scripts/output/module-${PADDED}.script.md" ]]; then
    echo "[miss] M$ID has no script — run audit loop first" | tee -a "$LOG"
    continue
  fi
  echo "[$(date -Is)] rendering M$ID" | tee -a "$LOG"
  if "$RENDER" "$ID" 2>&1 | tee -a "$LOG"; then
    echo "[ok] M$ID" | tee -a "$LOG"
  else
    echo "[FAIL] M$ID — continuing" | tee -a "$LOG"
  fi
done

echo "=== batch render complete $(date -Is) ===" | tee -a "$LOG"
