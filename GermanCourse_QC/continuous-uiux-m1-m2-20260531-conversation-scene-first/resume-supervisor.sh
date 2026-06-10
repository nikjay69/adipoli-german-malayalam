#!/usr/bin/env bash
set -uo pipefail

ROOT="/shared/german-course"
QC_DIR="$ROOT/GermanCourse_QC"
PROMPT_FILE="$QC_DIR/adipoli-6h-uiux-m1-m2-prompt.md"
CHECKPOINT="$QC_DIR/adipoli-6h-uiux-m1-m2-checkpoint.md"
OUT_DIR="$QC_DIR/continuous-uiux-m1-m2-20260531-conversation-scene-first"
LOG="$OUT_DIR/supervisor.log"
END_EPOCH="$(date -d '2026-05-31 06:42:14 CEST' +%s)"

mkdir -p "$OUT_DIR"
cd "$ROOT" || exit 1

echo "===== RESUME SUPERVISOR $(date -Is) hard-stop $(date -d @${END_EPOCH} -Is) =====" | tee -a "$LOG" >> "$CHECKPOINT"

if ! curl --noproxy '*' -fsS --max-time 4 http://127.0.0.1:3000/ >/dev/null 2>&1; then
  if ! tmux has-session -t adipoli-dev 2>/dev/null; then
    tmux new-session -d -s adipoli-dev -x 140 -y 40 "cd '$ROOT' && npm run dev -- --hostname 0.0.0.0 --port 3000"
    echo "$(date -Is) started adipoli-dev tmux server" >> "$LOG"
  fi
fi

while [ "$(date +%s)" -lt "$END_EPOCH" ]; do
  EXISTING=$(find "$OUT_DIR" -maxdepth 1 -name 'iteration-*-prompt.md' | wc -l)
  ITER=$((EXISTING + 1))
  NOW="$(date -Is)"
  ITER_OUT="$OUT_DIR/iteration-$(printf '%02d' "$ITER").log"
  ITER_PROMPT="$OUT_DIR/iteration-$(printf '%02d' "$ITER")-prompt.md"

  {
    cat "$PROMPT_FILE"
    echo
    echo "## Resume iteration context"
    echo "Iteration: $ITER"
    echo "Time: $NOW"
    echo "Original hard stop: $(date -d @${END_EPOCH} -Is)"
    echo
    echo "Recent checkpoint tail:"
    tail -160 "$CHECKPOINT" 2>/dev/null || true
    echo
    echo "Previous iteration tail:"
    LAST_LOG=$(find "$OUT_DIR" -maxdepth 1 -name 'iteration-*.log' | sort | tail -1)
    if [ -n "${LAST_LOG:-}" ]; then tail -120 "$LAST_LOG"; fi
    echo
    echo "Current git status snapshot:"
    git status --short | sed -n '1,180p'
    echo
    echo "Important: Continue from the current repo state. The previous supervisor died after iteration 5. Do not overwrite unrelated changes. Prefer scoped safe patches and verification. Next suggested lane: reduce please-thanks screen count, then browser/QA verify."
  } > "$ITER_PROMPT"

  {
    echo "===== ITERATION $ITER START $NOW ====="
    echo "Prompt: $ITER_PROMPT"
  } | tee -a "$LOG"

  timeout 75m hermes chat -Q --yolo --accept-hooks --max-turns 150 \
    -s boss-german-course \
    -s claude-code \
    -t terminal,file,browser,image_gen \
    -q "$(cat "$ITER_PROMPT")" \
    > "$ITER_OUT" 2>&1
  RC=$?

  {
    echo "===== ITERATION $ITER END $(date -Is) rc=$RC ====="
    echo "Output: $ITER_OUT"
    echo "Git status after iteration $ITER:"
    git status --short | sed -n '1,220p'
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
  echo "# Resume loop hard stop reached"
  echo "Finished: $(date -Is)"
  echo "Run dir: $OUT_DIR"
  echo "Latest git status:"
  git status --short | sed -n '1,260p'
} >> "$CHECKPOINT"

FINAL_PROMPT="$OUT_DIR/final-report-prompt-resume.md"
{
  echo "Prepare a concise final report for Boss after the Adipoli German conversation-scene-first resume loop."
  echo "Workdir: /shared/german-course."
  echo "Read GermanCourse_QC/adipoli-6h-uiux-m1-m2-checkpoint.md, this run dir logs, and current git status/diff summary."
  echo "Report evidence only: files changed, QA run, pass/weak/fail, review URL if reachable, known weaknesses, and next concrete action."
} > "$FINAL_PROMPT"

timeout 20m hermes chat -Q --yolo --accept-hooks --max-turns 80 \
  -s boss-german-course \
  -t terminal,file,browser \
  -q "$(cat "$FINAL_PROMPT")" \
  > "$OUT_DIR/final-report-resume.log" 2>&1 || true

cat "$OUT_DIR/final-report-resume.log" >> "$CHECKPOINT"
