# A1 MVP continuous 3h — Iteration 2 report

Timestamp: 2026-06-02 12:50 CEST

## What I inspected

- `docs/README.md`
- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_MVP_CUSTOMER_JOURNEY_AND_PAGE_FLOW.md`
- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md`
- `course-production/a1-mvp/module-01/MODULE_01_PRODUCTION_BRIEF.md`
- `course-production/a1-mvp/module-01/lesson-01-video-script.md`
- `course-production/a1-mvp/module-01/lesson-01-storyboard-and-slides.md`
- `course-production/a1-mvp/module-01/module-01-checkpoint-rubric.md`
- Existing Module 1 scripts 2–7, storyboards, and practice pack.

## Files changed

- `course-production/a1-mvp/module-01/lesson-03-video-script.md`
- `course-production/a1-mvp/module-01/lesson-01-storyboard-and-slides.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-checkpoint.md`
- `GermanCourse_QC/a1-mvp-course-design-final-report.md`
- `GermanCourse_QC/a1-mvp-continuous-3h-20260602-123514/iteration-2-report.md`

## Fixes made

1. Added an explicit Goethe A1 speaking relevance note to Lesson 03 pronunciation shadowing.
2. Renamed Lesson 01 storyboard slide rules into explicit phone-friendly editing notes and added mobile-specific constraints.

## Verification

Command run:

```bash
python3 - <<'PY'
from pathlib import Path
base = Path('/shared/german-course/course-production/a1-mvp/module-01')
script_files = [base / f'lesson-{i:02d}-video-script.md' for i in range(1,8)]
storyboard_files = [base/'lesson-01-storyboard-and-slides.md', base/'lessons-02-07-storyboards-and-slides.md']
pack = base/'module-01-must-do-and-score-booster-pack.md'
checks = {
    'hook': ['Hook', 'Cold open'],
    'learner_outcome': ['Learner output by end'],
    'teaching_point': ['Teaching point'],
    'boss_placeholder': ['[Boss explains in Malayalam/Manglish'],
    'onscreen': ['On-screen'],
    'practice': ['Practice pause', 'Practice:', 'Practice prompts', 'Say-aloud drill', 'Drill:'],
    'closed_check': ['closed check', 'Closed mini-test'],
    'cta': ['CTA', 'Button / next app action'],
    'exam_relevance': ['Exam relevance', 'A1 note', 'Goethe', 'A1 speaking'],
}
failed = False
for p in script_files:
    txt = p.read_text()
    missing = [name for name, needles in checks.items() if not any(n.lower() in txt.lower() for n in needles)]
    print(f'{p.name}: missing={missing or "NONE"} lines={txt.count(chr(10))+1}')
    if missing:
        failed = True
for p in storyboard_files:
    txt = p.read_text()
    required = ['AI image prompt', 'Phone-friendly editing notes']
    missing = [r for r in required if r.lower() not in txt.lower()]
    print(f'{p.name}: missing={missing or "NONE"} lesson_refs={sum(txt.count(f"Lesson {i:02d}") for i in range(1,8))}')
    if missing:
        failed = True
txt = pack.read_text()
for needle in ['Must-do path, exact order', 'Score-booster tasks', 'LINK NEEDED', 'Time box', 'Output']:
    print(f'pack_has[{needle}]={needle in txt}')
    if needle not in txt:
        failed=True
if failed:
    raise SystemExit(1)
PY
```

Result: exit code 0.

Output summary:

```text
lesson-01-video-script.md: missing=NONE
lesson-02-video-script.md: missing=NONE
lesson-03-video-script.md: missing=NONE
lesson-04-video-script.md: missing=NONE
lesson-05-video-script.md: missing=NONE
lesson-06-video-script.md: missing=NONE
lesson-07-video-script.md: missing=NONE
lesson-01-storyboard-and-slides.md: missing=NONE
lessons-02-07-storyboards-and-slides.md: missing=NONE
pack_has[Must-do path, exact order]=True
pack_has[Score-booster tasks]=True
pack_has[LINK NEEDED]=True
pack_has[Time box]=True
pack_has[Output]=True
```

## PASS / WEAK / FAIL

- Module 1 scripts 1–7: PASS for structural completeness and presenter-readiness draft.
- Storyboards/slides lessons 1–7: PASS for production-draft coverage, AI prompt slots, and phone-friendly notes.
- Must-do/score-booster pack: PASS/WEAK — exact order/output/time boxes exist; public links still intentionally unverified.
- German/audio quality: WEAK until human/prerendered audio and accent review happen.
- Rendered videos: NOT CLAIMED.
- Browser/app QA for new Module 1 pack: NOT CLAIMED.

## Next unfinished item

Implement or spec the first Module 1 app practice set: `answer Frau Weber` + mini-check + recovery card. 60–90m.
