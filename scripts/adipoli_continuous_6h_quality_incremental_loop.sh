#!/usr/bin/env bash
set -uo pipefail

ROOT="/shared/german-course"
QC_DIR="$ROOT/GermanCourse_QC"
RUN_ID="${RUN_ID:-$(date +%Y%m%d-%H%M%S)}"
PROMPT_FILE="$QC_DIR/adipoli-6h-quality-incremental-prompt-20260601.md"
CHECKPOINT="$QC_DIR/adipoli-6h-quality-incremental-checkpoint.md"
OUT_DIR="$QC_DIR/continuous-6h-quality-incremental-$RUN_ID"
LOG="$OUT_DIR/supervisor.log"
END_EPOCH=$(( $(date +%s) + 6 * 60 * 60 ))
ITER=0

mkdir -p "$OUT_DIR"
cd "$ROOT" || exit 1

{
  echo "# Adipoli 6h quality + incremental improvement loop"
  echo
  echo "Started: $(date -Is)"
  echo "Hard stop target: $(date -d @${END_EPOCH} -Is)"
  echo "Run dir: $OUT_DIR"
  echo "Prompt: $PROMPT_FILE"
  echo "Boss request: quality-focused incremental work based on the vision plan; visuals as support only, no reskin."
  echo
  echo "Initial git status count: $(git status --short | wc -l)"
  echo
} >> "$CHECKPOINT"

# Keep the local review server alive in a separate tmux session if port 3000 is not up.
if ! curl --noproxy '*' -fsS --max-time 4 http://127.0.0.1:3000/ >/dev/null 2>&1; then
  if ! tmux has-session -t adipoli-dev 2>/dev/null; then
    tmux new-session -d -s adipoli-dev -x 140 -y 40 "cd '$ROOT' && npm run dev -- --hostname 0.0.0.0"
    echo "$(date -Is) started adipoli-dev tmux server" >> "$LOG"
  fi
fi

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
    tail -160 "$CHECKPOINT" 2>/dev/null || true
    echo
    echo "Current git status snapshot:"
    git status --short | sed -n '1,220p'
    echo
    echo "Continue from current repo state. Do not overwrite unrelated dirty work. Prefer one scoped improvement with real verification."
  } > "$ITER_PROMPT"

  {
    echo "===== ITERATION $ITER START $NOW ====="
    echo "Prompt: $ITER_PROMPT"
  } | tee -a "$LOG"

  timeout 70m hermes chat -Q --yolo --accept-hooks --max-turns 150 \
    -s boss-german-course \
    -s claude-code \
    -t terminal,file,browser \
    -q "$(cat "$ITER_PROMPT")" \
    > "$ITER_OUT" 2>&1
  RC=$?

  {
    echo "===== ITERATION $ITER END $(date -Is) rc=$RC ====="
    echo "Output: $ITER_OUT"
    echo "Git status after iteration $ITER:"
    git status --short | sed -n '1,260p'
    echo
  } | tee -a "$LOG" >> "$CHECKPOINT"

  if [ "$RC" -ne 0 ] && [ "$RC" -ne 124 ]; then
    sleep 45
  else
    sleep 5
  fi
done

{
  echo
  echo "# Loop hard stop reached"
  echo "Finished: $(date -Is)"
  echo "Run dir: $OUT_DIR"
  echo "Latest git status count: $(git status --short | wc -l)"
  echo "Latest git status:"
  git status --short | sed -n '1,300p'
  echo
} >> "$CHECKPOINT"

FINAL_PROMPT="$OUT_DIR/final-report-prompt.md"
cat > "$FINAL_PROMPT" <<'EOF'
Prepare a concise final local report for Boss after the Adipoli German 6h quality + incremental loop.
Workdir: /shared/german-course.
Read:
- GermanCourse_QC/adipoli-6h-quality-incremental-checkpoint.md
- latest logs under GermanCourse_QC/continuous-6h-quality-incremental-*/
- current git status/diff summary
- route/QA state as needed
Report evidence only: files changed, concrete improvements, visual insert status if any, QA run, PASS/WEAK/FAIL, known weaknesses, and review URL only if verified. Keep it blunt and practical.
EOF

timeout 20m hermes chat -Q --yolo --accept-hooks --max-turns 80 \
  -s boss-german-course \
  -t terminal,file,browser \
  -q "$(cat "$FINAL_PROMPT")" \
  > "$OUT_DIR/final-report.log" 2>&1 || true

cat "$OUT_DIR/final-report.log" >> "$CHECKPOINT"
