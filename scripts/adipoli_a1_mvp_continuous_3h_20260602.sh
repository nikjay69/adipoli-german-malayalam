#!/usr/bin/env bash
set -u

ROOT="/shared/german-course"
PROMPT="$ROOT/GermanCourse_QC/adipoli-a1-mvp-continuous-3h-prompt-20260602.md"
STAMP="$(date +%Y%m%d-%H%M%S)"
RUN_DIR="$ROOT/GermanCourse_QC/a1-mvp-continuous-3h-$STAMP"
CHECKPOINT="$ROOT/GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md"
OUT_DIR="$RUN_DIR/iteration-output"
mkdir -p "$OUT_DIR"

START_EPOCH=$(date +%s)
END_EPOCH=$((START_EPOCH + 10800))
RESERVE_FINAL=900
ITER=0

{
  echo "# A1 MVP continuous 3h checkpoint"
  echo
  echo "Started: $(date -Iseconds)"
  echo "Ends: $(date -d "@$END_EPOCH" -Iseconds 2>/dev/null || date -r "$END_EPOCH" -Iseconds)"
  echo "Run dir: $RUN_DIR"
  echo
  echo "Focus: finish Module 1 scripts 2–7, then storyboards/resource pack, then final report."
  echo
} > "$CHECKPOINT"

run_iter() {
  ITER=$((ITER + 1))
  local remaining=$((END_EPOCH - $(date +%s)))
  local timeout_s=$((remaining - RESERVE_FINAL))
  if [ "$timeout_s" -gt 3300 ]; then timeout_s=3300; fi
  if [ "$timeout_s" -lt 600 ]; then return 1; fi

  local iter_prompt="$RUN_DIR/iteration-${ITER}-prompt.md"
  local iter_log="$OUT_DIR/iteration-${ITER}.log"

  cat > "$iter_prompt" <<EOF
$(cat "$PROMPT")

## Iteration context

This is continuous 3h run iteration $ITER.
Hard stop: $(date -d "@$END_EPOCH" -Iseconds 2>/dev/null || date -r "$END_EPOCH" -Iseconds).
Run dir: $RUN_DIR
Checkpoint: $CHECKPOINT

Before editing, inspect which Module 1 lesson scripts/storyboards already exist and continue from the first unfinished item. Do not redo completed work unless it is clearly broken.

At the end of this iteration, update $CHECKPOINT with:
- iteration number
- exact files created/changed
- honest PASS/WEAK/FAIL
- next unfinished item.
EOF

  echo "===== iteration $ITER started $(date -Iseconds), timeout ${timeout_s}s =====" | tee -a "$RUN_DIR/supervisor.log"
  timeout "$timeout_s" hermes chat -Q --source tool --skills boss-german-course,writing-plans --toolsets file,terminal,web,browser --max-turns 120 --accept-hooks --yolo -q "$(cat "$iter_prompt")" > "$iter_log" 2>&1
  local code=$?
  echo "===== iteration $ITER exit $code $(date -Iseconds) =====" | tee -a "$RUN_DIR/supervisor.log"
  echo "- Iteration $ITER exit code: $code; log: $iter_log" >> "$CHECKPOINT"
  return 0
}

while [ "$(date +%s)" -lt $((END_EPOCH - RESERVE_FINAL)) ]; do
  run_iter || break
  sleep 5
done

FINAL_PROMPT="$RUN_DIR/final-report-prompt.md"
cat > "$FINAL_PROMPT" <<EOF
You are finishing Boss's continuous 3h Adipoli A1 MVP run inside /shared/german-course.

Inspect:
- docs/README.md
- docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md
- docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md
- course-production/a1-mvp/module-01/
- GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md
- GermanCourse_QC/a1-mvp-course-design-final-report.md
- git status, but do not commit.

Write/update:
1. /shared/german-course/GermanCourse_QC/a1-mvp-course-design-final-report.md
2. /shared/german-course/GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md

Report:
- exact files created/changed in this 3h run
- Module 1 script coverage: lessons 1–7 complete/incomplete
- storyboards/resource-pack status
- PASS/WEAK/FAIL against Boss's request
- top remaining blocker
- exactly ONE recommended next action.

Do not claim rendered videos, browser QA, public URL verification, or app implementation unless actually performed.
EOF

echo "===== final report started $(date -Iseconds) =====" | tee -a "$RUN_DIR/supervisor.log"
remaining=$((END_EPOCH - $(date +%s)))
if [ "$remaining" -lt 300 ]; then remaining=300; fi
if [ "$remaining" -gt 1200 ]; then remaining=1200; fi
timeout "$remaining" hermes chat -Q --source tool --skills boss-german-course,writing-plans --toolsets file,terminal,web,browser --max-turns 80 --accept-hooks --yolo -q "$(cat "$FINAL_PROMPT")" > "$OUT_DIR/final-report.log" 2>&1
FINAL_CODE=$?
echo "===== final report exit $FINAL_CODE $(date -Iseconds) =====" | tee -a "$RUN_DIR/supervisor.log"

{
  echo
  echo "Finished: $(date -Iseconds)"
  echo "Final report exit code: $FINAL_CODE"
  echo "Run dir: $RUN_DIR"
  echo "Final report: $ROOT/GermanCourse_QC/a1-mvp-course-design-final-report.md"
  echo
  echo "## Supervisor log"
  sed -n '1,200p' "$RUN_DIR/supervisor.log"
  echo
  echo "## Latest checkpoint tail"
  tail -80 "$CHECKPOINT" 2>/dev/null || true
} | tee -a "$RUN_DIR/supervisor-summary.txt"

printf '\nFINAL_REPORT=%s\nCHECKPOINT=%s\nRUN_DIR=%s\n' "$ROOT/GermanCourse_QC/a1-mvp-course-design-final-report.md" "$CHECKPOINT" "$RUN_DIR"
