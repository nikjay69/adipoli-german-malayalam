#!/usr/bin/env bash
set -u

ROOT="/shared/german-course"
RUN_DIR="$ROOT/GermanCourse_QC/a1-mvp-course-design-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$RUN_DIR"

STYLE_IMAGE="$ROOT/public/images/mvp-style-samples/a1-kerala-study-evening-20260602.png"

cat > "$RUN_DIR/run-context.md" <<'CTX'
# 3h A1 MVP course-design run — context

Boss request, 2026-06-02:
- Work for the next three hours on the German-course MVP.
- Design from the customer perspective: very first page, new-user path, rest of pages.
- Course-first MVP, games later.
- Phone + desktop must work.
- Design the full guided A1 course, then Module 1, then start video production materials.
- Boss will later record himself explaining in Malayalam/Manglish; generated scripts should be presenter-ready for him.
- It is fine for examples, tables, slides, and on-screen phrases to be in English/German; the spoken narration will later be adapted by Boss into Malayalam.
- Use AI-generated images/illustrations/tables where they reduce explanation, but do not reskin the UI or create childish mascot energy.

Existing direction already locked in docs:
- ~35h owned guided A1 video lessons.
- Must-do path for passing Goethe A1.
- Score-booster path for stronger marks.
- Closed tests diagnose weaknesses and prescribe exact recovery.
- Manual scoring/rubrics acceptable for MVP; AI optional.
- External public resources may be assigned as reinforcement, never dumped as a resource list.

Hard guardrails:
- Do not delete files.
- Do not commit, push, deploy, change payment/pricing/auth, or use paid APIs at scale.
- Avoid doc sprawl. Create concrete production artifacts only if they unblock implementation today, and update docs/README.md pointers if a new artifact becomes active.
- Keep games later.
- Preserve adult-safe Kerala-rooted Goethe A1 identity.
CTX

run_hermes() {
  local phase="$1"
  local prompt_file="$RUN_DIR/${phase}-prompt.md"
  local log_file="$RUN_DIR/${phase}.log"
  echo "===== $phase started $(date -Iseconds) =====" | tee -a "$RUN_DIR/supervisor.log"
  timeout 3900 hermes chat -Q --source tool --skills boss-german-course,writing-plans --toolsets file,terminal,web,browser --max-turns 90 --accept-hooks --yolo -q "$(cat "$prompt_file")" > "$log_file" 2>&1
  local code=$?
  echo "===== $phase exit $code $(date -Iseconds) =====" | tee -a "$RUN_DIR/supervisor.log"
  return 0
}

cat > "$RUN_DIR/phase-1-customer-journey-prompt.md" <<'PROMPT'
You are working inside `/shared/german-course` for Boss's Adipoli German A1 MVP.

Read first:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/PRODUCT_DIRECTION_RESET_2026-05-20.md`
- `docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md`
- `docs/VIDEO_SCRIPT_TEMPLATE.md` if it exists
- existing root/intro/learn page source only if needed for page-flow realism.

Task: design the product from the customer's perspective, from the very first page onward.

Create/update concrete artifacts, not vague strategy:
1. Create or update `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` with:
   - customer promise in plain words
   - first-page experience for a cold user
   - onboarding path
   - phone-first page flow
   - where video, practice, checkpoint, recovery, and score-booster resources appear
   - what pages are MVP vs later
   - exact low-text UX rules for each page type
   - PASS/WEAK/FAIL quality gate from customer perspective
2. Patch `docs/README.md` so this file is listed as an active concrete artifact, not another strategy doc.
3. Write a short status note to `GermanCourse_QC/a1-mvp-course-design-latest.md` with exact files changed and next phase.

Guardrails: do not delete files; do not commit/push/deploy; no paid API/media generation; games later; keep it adult-safe, Kerala-rooted, Goethe A1 serious.
PROMPT
run_hermes phase-1-customer-journey

cat > "$RUN_DIR/phase-2-syllabus-assessment-prompt.md" <<'PROMPT'
You are continuing the 3h A1 MVP course-design run inside `/shared/german-course`.

Read first:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` if it exists
- `docs/GOETHE_A1_EXAM_MAP.md` if it exists
- `src/lib/content/modules/module-01.ts` only for existing Module 1 context.

Task: design the full A1 syllabus and the spoon-fed test/recovery system.

Create/update concrete artifacts:
1. Create or update `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` with:
   - target: ~35h owned video lessons, with reason not to bloat to 40h unless needed
   - 8-module or equivalent structure covering A1 and Goethe A1
   - lesson count, estimated video minutes, practice minutes, homework/review for each module
   - Must-do track per module: exact sequence the learner follows
   - Score-booster track per module: exact extra resource types, no resource dumping
   - checkpoint schedule: lesson checks, module diagnostics, Goethe-style gates, final mock
   - weakness tags and manual scoring rubric
   - recovery prescriptions: what a learner does when weak in Hören/Lesen/Schreiben/Sprechen/grammar/vocab
   - public-resource curation rules: how to assign YouTube/audio/worksheets without dumping 20 sources
2. Patch `docs/README.md` to include this active artifact.
3. Update `GermanCourse_QC/a1-mvp-course-design-latest.md` with files changed, concrete decisions, and next phase.

Guardrails: do not delete files; do not commit/push/deploy; no paid API/media generation; games later; avoid new abstract docs beyond this one production artifact.
PROMPT
run_hermes phase-2-syllabus-assessment

cat > "$RUN_DIR/phase-3-module1-video-pack-prompt.md" <<'PROMPT'
You are continuing the 3h A1 MVP course-design run inside `/shared/german-course`.

Read first:
- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` if it exists
- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` if it exists
- `docs/VIDEO_SCRIPT_TEMPLATE.md` and `docs/SCRIPT_ARCHITECTURE.md` if they exist
- `src/lib/content/modules/module-01.ts`
- `src/lib/content/video-scripts.ts`

Use this generated style sample as a route-scoped visual reference, not a UI reskin:
`public/images/mvp-style-samples/a1-kerala-study-evening-20260602.png`
Self-assess it: adult-safe yes/no, Kerala specificity, Goethe seriousness, low visible text, weakness.

Task: turn Module 1 into a presenter-ready video-production pack.

Create/update concrete artifacts under `course-production/a1-mvp/module-01/`:
1. `MODULE_01_PRODUCTION_BRIEF.md`
   - module promise
   - customer outcome
   - lessons/videos in Module 1
   - must-do practice path
   - score-booster path
   - checkpoint/recovery
   - phone/desktop UX notes
2. `lesson-01-video-script.md`
   - presenter-ready script Boss can later speak in Malayalam/Manglish
   - use English stage directions and on-screen text
   - include German examples accurately
   - structure: hook, teaching point, examples, practice pause, tiny test, CTA
   - avoid requiring literal Malayalam script; mark `[Boss explains in Malayalam/Manglish]` where appropriate
3. `lesson-01-storyboard-and-slides.md`
   - scene visuals, slides/tables, AI-image prompts, where to show Boss talking head, where to show on-screen German
   - at least one table and one visual idea
   - keep low text and adult-safe
4. `module-01-checkpoint-rubric.md`
   - closed-book mini-test after Module 1
   - Hören/Lesen/Schreiben/Sprechen/grammar/vocab tags
   - manual scoring rubric
   - must-do recovery prescriptions and score-booster prescriptions.
5. Patch `docs/README.md` to point to this Module 1 production pack.
6. Update `GermanCourse_QC/a1-mvp-course-design-latest.md` with exact files changed and honest PASS/WEAK/FAIL.

Guardrails: do not delete files; do not commit/push/deploy; no paid API/media generation; do not mass-edit existing app code unless required; games later. Produce files Boss can review and eventually use for recording.
PROMPT
run_hermes phase-3-module1-video-pack

cat > "$RUN_DIR/final-report-prompt.md" <<'PROMPT'
You are finishing the 3h A1 MVP course-design run inside `/shared/german-course`.

Inspect:
- `docs/README.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md` if present
- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` if present
- `course-production/a1-mvp/module-01/` if present
- `GermanCourse_QC/a1-mvp-course-design-latest.md` if present
- git status, but do not commit.

Write `/shared/german-course/GermanCourse_QC/a1-mvp-course-design-final-report.md` with:
- exact files created/changed
- what the customer journey now is
- what the full A1 MVP structure now is
- what Module 1 production artifacts exist
- visual sample path and honest style assessment
- PASS/WEAK/FAIL against Boss's request
- top 3 next actions, but name exactly ONE recommended next action.

Keep it concise and blunt. Do not claim app/browser QA unless you actually ran it. Do not pretend video files were rendered unless they exist.
PROMPT
run_hermes final-report

printf '\nRUN_DIR=%s\nFINAL_REPORT=%s\n' "$RUN_DIR" "$ROOT/GermanCourse_QC/a1-mvp-course-design-final-report.md" | tee -a "$RUN_DIR/supervisor.log"
