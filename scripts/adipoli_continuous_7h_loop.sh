#!/usr/bin/env bash
set -uo pipefail

WORKDIR=/shared/german-course
PROMPT_FILE="$WORKDIR/GermanCourse_QC/adipoli-continuous-7h-prompt.md"
OUTDIR="$WORKDIR/GermanCourse_QC/continuous-loop-output"
CHECKPOINT="$WORKDIR/GermanCourse_QC/continuous-7h-loop-checkpoint.md"
mkdir -p "$OUTDIR"
cd "$WORKDIR" || exit 1

START_TS=$(date -Is)
END_EPOCH=$(( $(date +%s) + 7*60*60 ))
ITER=1

if [ ! -s "$CHECKPOINT" ]; then
  echo "# Continuous 7h Adipoli loop" > "$CHECKPOINT"
  echo "" >> "$CHECKPOINT"
else
  echo "" >> "$CHECKPOINT"
  echo "---" >> "$CHECKPOINT"
  echo "" >> "$CHECKPOINT"
fi
echo "Started/resumed: $START_TS" >> "$CHECKPOINT"
echo "Hard stop epoch: $END_EPOCH" >> "$CHECKPOINT"
echo "Review: http://claude-desktop:3000/" >> "$CHECKPOINT"
echo "Fallback: http://100.96.56.53:3000/" >> "$CHECKPOINT"
echo "" >> "$CHECKPOINT"

while [ "$(date +%s)" -lt "$END_EPOCH" ]; do
  NOW=$(date -Is)
  OUT="$OUTDIR/iter-$(printf '%02d' "$ITER")-$(date +%Y%m%d-%H%M%S).md"
  REMAIN=$(( END_EPOCH - $(date +%s) ))
  echo "## Supervisor iteration $ITER — $NOW — ${REMAIN}s remaining" | tee -a "$CHECKPOINT"
  echo "Output: $OUT" | tee -a "$CHECKPOINT"
  echo "" | tee -a "$CHECKPOINT"

  ITER_PROMPT=$(printf '%s\n\nSupervisor metadata: iteration=%s, started=%s, seconds_remaining=%s. Do one useful verified improvement batch, checkpoint it, then end this iteration so the supervisor can immediately continue.' "$(cat "$PROMPT_FILE")" "$ITER" "$NOW" "$REMAIN")

  timeout 55m hermes chat -Q --yolo -t terminal,file,browser,skills,delegation --source adipoli-continuous-7h-loop -q "$ITER_PROMPT" > "$OUT" 2>&1
  STATUS=$?
  echo "Iteration $ITER exit_status=$STATUS finished=$(date -Is)" | tee -a "$CHECKPOINT"
  echo "" | tee -a "$CHECKPOINT"

  if [ "$STATUS" -eq 124 ]; then
    echo "Iteration $ITER timed out after 55m; continuing with next iteration." | tee -a "$CHECKPOINT"
  elif [ "$STATUS" -ne 0 ]; then
    echo "Iteration $ITER failed with status $STATUS; continuing after short cooldown." | tee -a "$CHECKPOINT"
    sleep 30
  fi
  ITER=$((ITER+1))
done

echo "# Loop finished" | tee -a "$CHECKPOINT"
echo "Finished: $(date -Is)" | tee -a "$CHECKPOINT"
echo "Iterations attempted: $((ITER-1))" | tee -a "$CHECKPOINT"
echo "Outputs: $OUTDIR" | tee -a "$CHECKPOINT"

# Final lightweight verification snapshot, non-fatal.
{
  echo "\n# Final supervisor verification"
  date -Is
  git status --short | head -80
  python3 scripts/qa_mission_pilot.py || true
} >> "$CHECKPOINT" 2>&1
