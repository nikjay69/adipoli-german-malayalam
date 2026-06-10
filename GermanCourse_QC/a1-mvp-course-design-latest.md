# A1 MVP course design — latest status

Updated: 2026-06-02 10:43 CEST

## Scope completed

Continued the 3h A1 MVP course-design run by locking the course syllabus and the spoon-fed test/recovery system.

This pass created the active production artifact for:

- ~35h owned-video A1 course target;
- 8-module MVP structure covering Goethe A1;
- lesson counts, video minutes, practice minutes, homework/review minutes;
- exact must-do sequence per module;
- exact score-booster resource type per module, without resource dumping;
- lesson checks, module diagnostics, Goethe-style gates, and final mock;
- weakness tags for Hören, Lesen, Schreiben, Sprechen, grammar, and vocab;
- manual scoring rubrics for writing/speaking and objective scoring rules;
- recovery prescriptions for each weak skill;
- public-resource curation rules.

## Files changed

- `docs/A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md`
  - Created as the active syllabus/test/recovery artifact.
  - Locks the owned video target at 56 lessons / 2,105 minutes / 35h 05m.
  - Explains why not to bloat to 40h unless checkpoint data proves a real gap.
  - Compresses the existing 18-module source course into 8 MVP modules while preserving Goethe A1 coverage.
  - Defines must-do and score-booster tracks module by module.
  - Adds checkpoint schedule, weakness tags, manual scoring, and recovery prescriptions.

- `docs/README.md`
  - Patched the Active build stack to include `A1_MVP_SYLLABUS_TEST_AND_RECOVERY.md` as the current syllabus/test/recovery source.

- `GermanCourse_QC/a1-mvp-course-design-latest.md`
  - Updated this status note with concrete decisions and next phase.

## Concrete decisions locked

1. The MVP target is ~35h owned video, not 40h.
2. The concrete allocation is 56 video lessons / 2,105 minutes.
3. The course is organized as 8 MVP modules:
   - First German moment;
   - Identity, numbers, time;
   - People, home, daily life;
   - Food, shopping, money;
   - Travel, services, health;
   - Work, study, free time, messages;
   - Official life and exam skills;
   - Goethe A1 bootcamp.
4. Current Module 13 past tense becomes only A1-safe support/booster, not a heavy must-do block.
5. Current Module 15 culture becomes embedded context, not a standalone must-do MVP module.
6. Current Module 16 A1+ grammar becomes score-booster only.
7. Recovery is tag-based and short: 1–3 tasks plus a retest, not generic revision.
8. Public resources are allowed only as one assigned task at a time, with target tag, output, and time box.
9. Manual scoring is acceptable for MVP writing/speaking; AI is optional support later.
10. Games remain later unless directly tied to a recovery tag.

## Next phase

Build one Module 1 vertical course slice against the new artifact:

1. Presenter-ready video outline/script for first greeting + first response.
2. Listening/speaking practice set.
3. Closed mini-check with weakness tags.
4. Recovery card for `hoeren:greetings` or `sprechen:formality`.
5. Score-booster card with exactly one pronunciation/audio resource type.
6. Phone QA: learner hears/says German within one minute and sees one next action.

## Current quality call

PASS as a production design artifact: it is concrete enough to drive content creation and app implementation.

Not yet PASS as product implementation: the next phase must prove the syllabus in an actual Module 1 video → practice → checkpoint → recovery slice.
