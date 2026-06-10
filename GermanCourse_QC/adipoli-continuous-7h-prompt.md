You are running one continuous supervised iteration in Boss's 7-hour Adipoli German UX improvement loop.

WORKDIR: /shared/german-course
REVIEW BASE: http://100.96.56.53:3000
PRIMARY REVIEW PATHS:
- http://100.96.56.53:3000/
- http://100.96.56.53:3000/intro
- http://100.96.56.53:3000/learn
- http://100.96.56.53:3000/learn/2
- http://100.96.56.53:3000/missions/module-2/self-intro

Boss's correction:
- Do not just polish one page.
- Improve the whole starting path into Module 2.
- UX/UI bar must be much higher.
- Users should not find it boring.
- Boss should not catch basic audio/text/QA failures.

This is NOT a strategy-doc task. Each iteration must make a concrete improvement or a concrete verified finding that unblocks the next improvement.

MANDATORY READ FIRST EACH ITERATION:
- docs/COURSE_OPERATING_BRIEF_2026-05-19.md
- docs/README.md
- docs/PRODUCT_DIRECTION_RESET_2026-05-20.md
- docs/WHOLE_COURSE_MISSION_SPINE_2026-05-20.md
- docs/AUTONOMOUS_EXECUTION_PLAN_2026-05-21.md
- docs/PREMIUM_QUALITY_BAR_AND_ANTI_HALLUCINATION_PROTOCOL_2026-05-21.md
- GermanCourse_QC/7h-loop-checkpoint.md if present
- GermanCourse_QC/continuous-7h-loop-checkpoint.md if present

SCOPE:
1. homepage / first starting page at /
2. /intro first-run path
3. /learn entry path
4. /learn/2 Module 2 landing/selection
5. mission launch
6. /missions/module-2/self-intro

OPERATING RULES:
- Preserve course soul: Kerala-rooted, Manglish bridge, Kuttan companion, Goethe A1 readiness, online app. Kuttan is not physically in Germany during A1.
- Premium adult-friendly, not childish game spam.
- Reduce text and click fatigue.
- Make meaningful action happen quickly.
- Audio must be real pre-rendered/native/verified, never browser SpeechSynthesis.
- Avoid broad risky rewrites; make visible targeted improvements.
- Do not deploy, push GitHub, use paid APIs, change auth/payment, or schedule more cron jobs.
- Prefer building real product over container polish now. If Module 2 still has fake/locked promises, either build the next real mission route or extract reusable mission components.

ITERATION METHOD:
1. Inspect current checkpoint + git diff enough to avoid fighting earlier changes.
2. Browser-inspect the live Tailscale path from / toward Module 2.
3. Pick the weakest high-impact UX/product point.
4. Make one coherent improvement batch.
5. Verify with targeted lint, QA script, git diff --check, and browser checks where relevant.
6. Update GermanCourse_QC/continuous-7h-loop-checkpoint.md with:
   - timestamp
   - iteration goal
   - what changed
   - files changed
   - verification evidence
   - remaining weaknesses
   - next target

VERIFY EACH ITERATION:
- Run targeted lint for changed TS/TSX files.
- Run or update scripts/qa_mission_pilot.py so it covers homepage/start + Module 2 path + mission where possible.
- Browser check at least one live Tailscale route.
- If touching audio, verify browser audio or URL state.

FINAL OUTPUT OF THIS ITERATION:
Write a compact report. Be honest. Include PASS/WEAK/FAIL gates and weaknesses. Do not ask Boss questions. The supervisor will immediately start another iteration until the 7-hour cap.