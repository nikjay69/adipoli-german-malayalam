#!/usr/bin/env bash
set -uo pipefail

ROOT="/shared/german-course"
QC_DIR="$ROOT/GermanCourse_QC"
RUN_ID="${RUN_ID:-$(date +%Y%m%d-%H%M%S)-vision-smart-plan}"
PROMPT_FILE="$QC_DIR/adipoli-4h-vision-plan-prompt.md"
CHECKPOINT="$QC_DIR/adipoli-4h-vision-plan-checkpoint.md"
OUT_DIR="$QC_DIR/continuous-4h-vision-plan-$RUN_ID"
LOG="$OUT_DIR/supervisor.log"
# Leave the last ~25 minutes for final synthesis so Boss gets the plan around the 4h mark.
END_EPOCH=$(( $(date +%s) + 215 * 60 ))
ITER=0

mkdir -p "$OUT_DIR"
cd "$ROOT" || exit 1

{
  echo "# Adipoli 4h continuous vision-to-SMART-plan loop"
  echo
  echo "Started: $(date -Is)"
  echo "Hard stop target: $(date -d @${END_EPOCH} -Is)"
  echo "Run dir: $OUT_DIR"
  echo "Prompt: $PROMPT_FILE"
  echo
} >> "$CHECKPOINT"

while [ "$(date +%s)" -lt "$END_EPOCH" ]; do
  ITER=$((ITER + 1))
  NOW="$(date -Is)"
  ITER_OUT="$OUT_DIR/iteration-$(printf '%02d' "$ITER").log"
  ITER_PROMPT="$OUT_DIR/iteration-$(printf '%02d' "$ITER")-prompt.md"

  {
    cat "$PROMPT_FILE"
    echo
    echo "## Iteration context"
    echo "Iteration: $ITER"
    echo "Time: $NOW"
    echo "Hard stop: $(date -d @${END_EPOCH} -Is)"
    echo
    echo "Recent checkpoint tail:"
    tail -140 "$CHECKPOINT" 2>/dev/null || true
    echo
    echo "Current git status snapshot:"
    git status --short | sed -n '1,220p'
    echo
    echo "Current planning docs inventory:"
    python3 - <<'PY'
from pathlib import Path
for p in sorted(Path('docs').glob('*.md')):
    print(f'- {p}')
PY
    echo
    echo "Important: This run is for synthesis and planning. Do not create broad code churn. Produce/refine the final SMART plan under GermanCourse_QC."
  } > "$ITER_PROMPT"

  {
    echo "===== ITERATION $ITER START $NOW ====="
    echo "Prompt: $ITER_PROMPT"
  } | tee -a "$LOG"

  timeout 65m hermes chat -Q --yolo --accept-hooks --max-turns 140 \
    -s boss-german-course \
    -t terminal,file,browser \
    -q "$(cat "$ITER_PROMPT")" \
    > "$ITER_OUT" 2>&1
  RC=$?

  {
    echo "===== ITERATION $ITER END $(date -Is) rc=$RC ====="
    echo "Output: $ITER_OUT"
    echo "Git status after iteration $ITER:"
    git status --short | sed -n '1,240p'
    echo
  } | tee -a "$LOG" >> "$CHECKPOINT"

  if [ "$RC" -ne 0 ] && [ "$RC" -ne 124 ]; then
    sleep 45
  else
    sleep 5
  fi
done

FINAL_PROMPT="$OUT_DIR/final-report-prompt.md"
cat > "$FINAL_PROMPT" <<'EOF'
You are producing the final report after Boss requested a 4h continuous vision-to-plan reset for Adipoli German.

Workdir: /shared/german-course.

Read:
- GermanCourse_QC/adipoli-4h-vision-plan-checkpoint.md
- latest logs under GermanCourse_QC/continuous-4h-vision-plan-*/
- the final plan file matching GermanCourse_QC/adipoli-vision-smart-plan-*.md, if present
- current git status

If the final plan file is missing or weak, write it now under GermanCourse_QC/adipoli-vision-smart-plan-YYYYMMDD-HHMM.md. It must be feasible, SMART, actionable, well-defined, explicitly match Boss's vision, and include a verifiable self-judge harness: reusable vision-alignment scorecard, PASS/WEAK/FAIL gates, required evidence per output, and rejection rules for generic/text-heavy/click-heavy/non-Goethe/non-Malayali work. Include `## Boss summary` at the bottom.

Then output only a Telegram-ready message:
- final plan path
- top 5 plan bullets
- first 48h build lane
- evidence read/checked
- max 3 Boss decisions needed
- one concrete next step
EOF

timeout 45m hermes chat -Q --yolo --accept-hooks --max-turns 120 \
  -s boss-german-course \
  -t terminal,file,browser \
  -q "$(cat "$FINAL_PROMPT")" \
  > "$OUT_DIR/final-report.log" 2>&1 || true

{
  echo
  echo "# Loop hard stop reached"
  echo "Finished: $(date -Is)"
  echo "Run dir: $OUT_DIR"
  echo "Final report log: $OUT_DIR/final-report.log"
  echo "Latest git status:"
  git status --short | sed -n '1,260p'
} >> "$CHECKPOINT"

cat "$OUT_DIR/final-report.log" >> "$CHECKPOINT"
