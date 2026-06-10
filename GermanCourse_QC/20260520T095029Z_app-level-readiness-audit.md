# Adipoli German — App-level readiness audit

Generated: 2026-05-20T09:50:29.666Z

## What this audits
This is not just an exercise-count audit. It checks the online lesson unit as the learner experiences it: story scene → video/script → vocabulary → exercises → production → review/exam readiness signals.

## Totals
- Modules: 18
- App lessons: 91
- Videos in lessons: 146
- Videos with videoUrl: 22
- Exercises: 994
- Production exercises: 311
- Vocab items: 784
- docs/scripts lesson scripts: 146
- scripts/output module guide scripts: 18
- Average app-readiness score: 86.2 / 100

## Module summary
- M01 First Steps - Namaskaram Germany!: 6 lessons, 12 videos, 63 exercises, 23 production, avg readiness 89.7
- M02 Who Are You?: 5 lessons, 10 videos, 56 exercises, 16 production, avg readiness 90.4
- M03 Numbers & Time: 6 lessons, 8 videos, 53 exercises, 22 production, avg readiness 87.7
- M04 My Family & People: 5 lessons, 8 videos, 55 exercises, 20 production, avg readiness 87.0
- M05 Daily Routine: 5 lessons, 8 videos, 49 exercises, 15 production, avg readiness 85.0
- M06 Food & Drink: 5 lessons, 8 videos, 49 exercises, 15 production, avg readiness 85.8
- M07 Shopping & Money: 5 lessons, 6 videos, 45 exercises, 15 production, avg readiness 85.0
- M08 My Home: 4 lessons, 7 videos, 36 exercises, 12 production, avg readiness 86.0
- M09 Travel & Directions: 5 lessons, 10 videos, 56 exercises, 16 production, avg readiness 86.6
- M10 Health & Body: 5 lessons, 9 videos, 53 exercises, 15 production, avg readiness 86.6
- M11 Work & Study: 5 lessons, 10 videos, 55 exercises, 15 production, avg readiness 83.4
- M12 Hobbies & Free Time: 4 lessons, 8 videos, 46 exercises, 14 production, avg readiness 83.0
- M13 Talking About the Past: 5 lessons, 8 videos, 52 exercises, 15 production, avg readiness 84.2
- M14 Formal Life in Germany: 4 lessons, 8 videos, 46 exercises, 14 production, avg readiness 83.0
- M15 German Culture & Integration: 4 lessons, 6 videos, 35 exercises, 14 production, avg readiness 85.5
- M16 A1+ Bonus Bridge (Optional): 5 lessons, 8 videos, 58 exercises, 19 production, avg readiness 83.8
- M17 Goethe A1 Exam — Hören & Lesen: 6 lessons, 6 videos, 89 exercises, 24 production, avg readiness 89.0
- M18 Goethe A1 Exam — Schreiben & Sprechen: 7 lessons, 6 videos, 98 exercises, 27 production, avg readiness 86.6

## Key gaps
- Lessons below production floor (<3 production exercises): 0
- Lessons with no speaking exercise: 0
- Lessons with no dictation/listening-production exercise: 0
- Generic exercise stems needing story tie-in: 373

## Weakest online lesson units
- 18-7 Adipoli A1 Conclusion — Celebration! — score 66; issues: no videos; thin exercise set (<6)
- 17-6 Übungstest — Hören & Lesen — score 81; issues: videos not wired to videoUrl; no lesson vocabulary array
- 18-6 Kompletter Übungstest — Alle 4 Teile — score 81; issues: videos not wired to videoUrl; no lesson vocabulary array
- 1-6 Formal vs Informal — score 83; issues: no richContent on videos; generic exercise stems (5)
- 3-5 Dates & Birthdays — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 4-2 Describing People — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 5-2 Morning Routine — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 5-4 My Day - From Morning to Night — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 6-1 Common Foods — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 6-3 At the Restaurant — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 7-2 Prices & Currency — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 8-2 Where Is It? — score 83; issues: videos not wired to videoUrl; generic exercise stems (7)
- 8-4 Writing a Simple Message — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 11-1 Professions in Detail — score 83; issues: videos not wired to videoUrl; generic exercise stems (5)
- 11-2 At the Office / University — score 83; issues: videos not wired to videoUrl; generic exercise stems (7)
- 11-4 Talking About Skills — score 83; issues: videos not wired to videoUrl; generic exercise stems (8)
- 11-5 Job Interview Basics — score 83; issues: videos not wired to videoUrl; generic exercise stems (7)
- 12-1 Hobbies — score 83; issues: videos not wired to videoUrl; generic exercise stems (8)
- 12-2 Weather & Seasons — score 83; issues: videos not wired to videoUrl; generic exercise stems (8)
- 12-3 Making Plans with Friends — score 83; issues: videos not wired to videoUrl; generic exercise stems (6)

## Correct interpretation
- A lesson is not the same as an exercise set. The exercise layer can be weak while the lesson still has story/video/vocab value.
- Launch quality requires the whole chain: story encounter → teaching video/rich content → vocab encounter → active production → correction/review → exam checkpoint.
- The safest next content work is not random rewriting; it is upgrading weak lessons by adding targeted speaking/free-text/dictation tasks tied to the existing storyScene.

## Recommended next implementation lane
1. Start with Modules 17–18 because they directly control Goethe exam confidence.
2. Add production tasks to the weakest lessons without deleting existing recognition exercises.
3. Add audioUrl-backed dictation/Hören tasks where the course already has audio infrastructure.
4. Story-tie generic stems only after the production holes are filled.
