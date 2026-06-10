# QC — Module 05 Canon + Adult-Fit Repair

Timestamp: 2026-05-20 05:11 CEST  
Lane: B/C — canon repair + generated-artifact cleanup  
Scope: `scripts/output/module-05.script.md`

## Files read

- `docs/COURSE_OPERATING_BRIEF_2026-05-19.md`
- `docs/A1_STORY_BIBLE.md`
- `scripts/output/module-05.script.md`

## What I found

Module 05 had a repeated canon/adult-fit problem: Kuttan was staged as already living in a Berlin/WG/German-supermarket routine during A1. That weakens the Kerala-to-Goethe-A1 journey and makes the lesson feel like a transported mascot scene instead of an adult Malayali learner preparing seriously.

I also found three production-quality issues:

- A malformed Manglish/generated artifact in the intro line: `parayikan躟 學er`.
- A `DE:` line containing English: `Let's go — los geht's!`.
- The final weekly-routine answer was cut off mid-sentence.

## Files changed

### `scripts/output/module-05.script.md`

High-confidence fixes made:

1. Reframed the opening visual from `Berlin WG` to Kuttan's home study desk in Thrissur.
2. Removed the malformed generated-artifact text in Kuttan's Manglish intro.
3. Fixed the mixed-language `DE:` line to `Los geht's!`.
4. Changed the `wohnen` vocab example from `Ich wohne in Berlin` to `Ich wohne in Thrissur`.
5. Reframed the WG regular-verb dialogue as Goethe Kochi/video-call practice with Stefan.
6. Reframed the morning-routine block from `Mein Morgen in Deutschland` to `Mein Morgen in Kerala — und später in Deutschland`.
7. Reframed the German supermarket/Edeka scene into a Goethe Kochi mock-shop role-play.
8. Reframed the WG morning routine dialogue into classroom/video-call rehearsal.
9. Reframed the sofa/WG-style evening recap into a home voice-note practice scene.
10. Reframed the week planner / WG kitchen visuals into Goethe Kochi classroom speaking practice.
11. Completed the truncated final answer for the Monday-Friday weekly routine prompt.

## Verification

- Re-read changed opening and ending sections.
- Searched `module-05.script.md` for high-risk removed patterns:
  - `Berlin WG`
  - `in a Berlin`
  - `Morning in the WG`
  - `German supermarket`
  - `Edeka`
  - `Morgens in der WG`
  - `WG kitchen`
  - stray `WG `
- Search returned zero matches for those specific patterns.
- Searched for the generated-artifact tokens `躟`, `學`, the mixed-language `**DE:** Let's`, and `Ich wohne in Berlin`; all returned zero matches.

Remaining `Germany`/`Deutschland` mentions are future-safe or video-call-safe, not Kuttan physically living in Germany during A1.

## Risk / caveat

The dialogue still uses Stefan/Lara as German contacts. That is acceptable under the canon if they are clearly video-call / cousin-contact practice partners. I fixed the scene framing but did not rewrite every dialogue line, to avoid broad rewriting.

## Next lane

Continue canon/adult-fit repair in `scripts/output/module-06.script.md`, which prior QC flagged for WG/Germany scenes. Use the same safe pattern: Kerala prep, Goethe Kochi mock, cousin video call, or learner imagination — preserve useful A1 output.
