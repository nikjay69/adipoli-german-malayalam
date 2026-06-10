# Adipoli script audit log

Prompt version: 2026-04-25.v1
Pass threshold: 7/10 across 6 axes.
Word target: 3500-4500.

| run_started | module | title | iters | passed | avg | word_count | weakest |
|---|---|---|---|---|---|---|---|
| 2026-04-26T13:04:31 | M1 | First Steps - Namaskaram Germany! | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:14:20 | M2 | (load-failed) | 0 | NO | 0 | 0 | error: TimeoutError: The read operation timed out |
| 2026-04-26T13:28:19 | M2 | Who Are You? | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M3 | Numbers & Time | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M4 | My Family & People | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M5 | Daily Routine | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M6 | Food & Drink | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M7 | Shopping & Money | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M8 | My Home | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T13:28:19 | M9 | (load-failed) | 0 | NO | 0 | 0 | error: Command '['npx', '--yes', 'tsx', '/shared/german-course/scripts/lib/module_loade |
| 2026-04-26T13:28:19 | M10 | (load-failed) | 0 | NO | 0 | 0 | error: Command '['npx', '--yes', 'tsx', '/shared/german-course/scripts/lib/module_loade |
| 2026-04-26T14:27:31 | M9 | Travel & Directions | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T14:27:31 | M10 | Health & Body | 1 | YES | 8.7 | 3842 | pedagogy |
| 2026-04-26T14:27:31 | M11 | Work & Study | 3 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T14:27:31 | M12 | Hobbies & Free Time | 2 | YES | 8.7 | 3650 | remotion_ready |
| 2026-04-26T14:27:31 | M13 | Talking About the Past | 2 | YES | 9.3 | 4380 | length_fit |
| 2026-04-26T14:27:31 | M14 | Formal Life in Germany | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T14:27:31 | M15 | German Culture & Integration | 1 | YES | 7.7 | 4080 | kuttan_voice |
| 2026-04-26T14:27:31 | M16 | A1+ Bonus Bridge (Optional) | 4 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T14:27:31 | M17 | Goethe A1 Exam — Hören & Lesen | 1 | YES | 8.0 | 3550 | length_fit |
| 2026-04-26T14:27:31 | M18 | Goethe A1 Exam — Schreiben & Sprechen | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T16:49:35 | M1 | First Steps - Namaskaram Germany! | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T16:54:03 | M1 | First Steps - Namaskaram Germany! | 1 | YES | 7.7 | 3614 | remotion_ready |
| 2026-04-26T16:54:03 | M2 | Who Are You? | 4 | no | 7.5 | 2742 | length_fit |
| 2026-04-26T16:54:03 | M3 | Numbers & Time | 4 | no | 0.0 | 0 | remotion_ready |
| 2026-04-26T16:54:03 | M4 | My Family & People | 1 | YES | 8.3 | 3680 | cefr_alignment |
| 2026-04-26T16:54:03 | M5 | Daily Routine | 2 | YES | 9.3 | 3987 | remotion_ready |
| 2026-04-26T16:54:03 | M6 | Food & Drink | 2 | YES | 8.3 | 3756 | remotion_ready |
| 2026-04-26T16:54:03 | M7 | Shopping & Money | 4 | no | 7.2 | 1420 | length_fit |
| 2026-04-26T16:54:03 | M8 | My Home | 1 | YES | 8.3 | 3920 | cefr_alignment |
| 2026-04-26T16:54:03 | M9 | Travel & Directions | 1 | YES | 7.8 | 3520 | length_fit |
| 2026-04-26T16:54:03 | M10 | Health & Body | 1 | YES | 8.0 | 4030 | length_fit |
| 2026-04-26T16:54:03 | M11 | Work & Study | 3 | YES | 8.5 | 3842 | pedagogy |
| 2026-04-26T16:54:03 | M12 | Hobbies & Free Time | 2 | YES | 8.3 | 4400 | remotion_ready |
| 2026-04-26T16:54:03 | M13 | Talking About the Past | 1 | YES | 7.8 | 3820 | cefr_alignment |
| 2026-04-26T16:54:03 | M14 | Formal Life in Germany | 3 | YES | 8.0 | 3670 | cefr_alignment |
| 2026-04-26T16:54:03 | M15 | German Culture & Integration | 2 | YES | 8.8 | 3870 | bilingual_balance |
| 2026-04-26T16:54:03 | M16 | A1+ Bonus Bridge (Optional) | 4 | YES | 7.5 | 3850 | remotion_ready |
| 2026-04-26T16:54:03 | M17 | Goethe A1 Exam — Hören & Lesen | 2 | YES | 7.5 | 3450 | remotion_ready |
| 2026-04-26T16:54:03 | M18 | Goethe A1 Exam — Schreiben & Sprechen | 2 | YES | 9.0 | 3000 | length_fit |
| 2026-04-26T19:29:56 | M1 | First Steps - Namaskaram Germany! | 4 | no | 7.2 | 3850 | remotion_ready |
| 2026-04-26T19:29:56 | M2 | Who Are You? | 2 | no | 6.8 | 1820 | length_fit |
| 2026-04-26T19:29:56 | M3 | Numbers & Time | 1 | YES | 9.3 | 3807 | remotion_ready |
| 2026-04-26T19:29:56 | M4 | My Family & People | 4 | YES | 8.2 | 3440 | length_fit |
| 2026-04-26T19:29:56 | M6 | Food & Drink | 1 | YES | 8.5 | 4012 | bilingual_balance |
| 2026-04-26T19:29:56 | M7 | Shopping & Money | 4 | no | 5.7 | 2650 | length_fit |
| 2026-04-26T19:29:56 | M8 | My Home | 4 | no | 6.2 | 1950 | length_fit |
| 2026-04-26T19:29:56 | M9 | Travel & Directions | 1 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T19:29:56 | M10 | Health & Body | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T19:29:56 | M12 | Hobbies & Free Time | 1 | YES | 8.8 | 4187 | remotion_ready |
| 2026-04-26T19:29:56 | M13 | Talking About the Past | 1 | YES | 9.2 | 4102 | length_fit |
| 2026-04-26T19:29:56 | M14 | Formal Life in Germany | 1 | YES | 9.8 | 4213 | cefr_alignment |
| 2026-04-26T19:29:56 | M16 | A1+ Bonus Bridge (Optional) | 4 | no | 7.0 | 2650 | length_fit |
| 2026-04-26T19:29:56 | M17 | Goethe A1 Exam — Hören & Lesen | 4 | no | 7.5 | 3730 | remotion_ready |
| 2026-04-26T20:50:37 | M1 | First Steps - Namaskaram Germany! | 4 | YES | 7.7 | 3850 | pedagogy |
| 2026-04-26T20:50:37 | M2 | Who Are You? | 1 | no | 7.8 | 4182 | remotion_ready |
| 2026-04-26T20:50:37 | M4 | My Family & People | 2 | YES | 8.8 | 4080 | length_fit |
| 2026-04-26T20:50:37 | M7 | Shopping & Money | 4 | YES | 8.7 | 3850 | length_fit |
| 2026-04-26T20:50:37 | M8 | My Home | 1 | YES | 8.5 | 3325 | length_fit |
| 2026-04-26T20:50:37 | M9 | Travel & Directions | 4 | no | 6.5 | 1980 | length_fit |
| 2026-04-26T20:50:37 | M10 | Health & Body | 2 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T20:50:37 | M16 | A1+ Bonus Bridge (Optional) | 4 | no | 7.5 | 2860 | length_fit |
| 2026-04-26T20:50:37 | M17 | Goethe A1 Exam — Hören & Lesen | 2 | YES | 8.8 | 4410 | length_fit |
| 2026-04-26T22:17:05 | M1 | First Steps - Namaskaram Germany! | 4 | no | 7.8 | 2650 | length_fit |
| 2026-04-26T22:17:05 | M2 | Who Are You? | 4 | no | 0.0 | 0 | scorer_error |
| 2026-04-26T22:17:05 | M9 | Travel & Directions | 3 | YES | 8.8 | 3985 | cefr_alignment |
| 2026-04-26T22:17:05 | M16 | A1+ Bonus Bridge (Optional) | 2 | YES | 9.2 | 4096 | pedagogy |
