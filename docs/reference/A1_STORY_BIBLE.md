# A1 Story Bible

Canonical source for the Adipoli German A1 course narrative. All lesson `storyScene`s, videos, and exercise framing should align with this document.

Date: 2026-04-14
Status: Draft — approved structure, settings TBD per lesson.

---

## One-line premise

**Nivin and Meera, two adult Malayali classmates with independent Germany goals, learn side by side in Kerala. Across the course they alternate the lived scene, survive different struggles, pass Goethe A1, and take their next steps toward Germany.**

A1 stays **entirely in Kerala.** A2 begins the "arrival" arc. B1 is the "thriving" arc.

---

## ⚠ The two-frame rule (important)

There are two different kinds of scenes in this course, and they have DIFFERENT setting rules:

### Frame A — Nivin and Meera's story scenes
**Nivin and Meera, the two named learner characters, are always physically in Kerala during A1.** Home, Goethe Kochi classroom, Fort Kochi, embassy in Chennai/Trivandrum, Kochi airport. Never Berlin, never Munich, never Frankfurt. Video calls and WhatsApp with Germany are fine — they watch, react, and learn, but remain in Kerala.

**Writing test:** if a sentence names Nivin or Meera and places that learner somewhere, the physical location MUST be Kerala (or a video-call view of Germany).

### Frame B — Learner imagination scenes (second-person teaching)
**The learner — addressed as "you" — can be asked to imagine any scenario anywhere**, including real German settings. This is normal A1 teaching and expected.

Examples that are FINE:
- *"Imagine you're at a Bäckerei in Berlin. How would you order?"*
- *"You walk into a café in Munich at 9 AM. What do you say?"*
- *"Picture the Ausländerbehörde clerk asking for your name."*

**Why both work:** Nivin and Meera's narrative integrity (their A1 story is Kerala-based) is preserved, AND the real learner gets to rehearse German scenarios imaginatively. No contradiction.

### When to use which

| Script / scene type | Use Frame A (Nivin/Meera in Kerala) | Use Frame B ("you" imagining) |
|---|---|---|
| `storyScene` in a lesson (module-XX.ts) | ✅ required | — |
| named-peer intro lines (legacy field: `kuttanIntro`) | ✅ required | — |
| `decisionPoints` where Nivin or Meera is the actor | ✅ required | — |
| Exercise question stems | — | ✅ prefer |
| Video script teaching sections (direct to learner) | — | ✅ prefer |
| Video script where Nivin or Meera is a named scene participant | ✅ required | — |
| Pimsleur audio narration ("imagine you're…") | — | ✅ prefer |
| Game round prompts | — | ✅ prefer |

### Why this matters

Scripts that rigidly use Frame A for everything ("at Goethe Kochi, Frau Fischer runs a mock bakery…") become over-scaffolded and lose flow. Scripts that rigidly use Frame B for the named peers' own scenes ("Nivin arrives in Berlin Hauptbahnhof") break the story arc.

Mixing both cleanly = natural teaching + coherent story.

---

## The 8-beat arc (matches `src/lib/journey.ts`)

| # | Beat | Modules | Milestone | Struggle | Default Setting |
|---|---|---|---|---|---|
| 0 | **Dream** | pre-M1 | Nivin and Meera each decide that German is the next real step toward a different Germany goal. | Family doubts; the path feels too large. | Their Kerala homes |
| 1 | **Basics / First Words** | M1-2 | First German sentence (*"Ich lerne Deutsch."*). First umlaut said aloud. | One freezes in the Goethe Kochi classroom; the other helps restart the attempt. | Home + Goethe-Institut Kochi |
| 2 | **Building Up** | M3-4 | Tell time, count in German, describe their families. | Gender of nouns (der/die/das) is maddening; family doubt continues. | Homes + Goethe Kochi library |
| 3 | **Daily Life** | M5-6 | Order food and describe real daily routines in German. | Native speech speed on Germany video calls is terrifying in different ways. | Homes + video calls |
| 4 | **Getting Ready** | M7-8 | Negotiate in a mock shop, handle money, describe a flat. | Big numbers are slow; formality is tiring. | Mock-shop scenarios + Goethe peer circles |
| 5 | **Speaking Well** | M9-12 | Hold small talk and explain distinct personal goals. | Mid-course burnout lands differently for each peer; the Malayali returnee challenges both. | Kochi café practice + homes |
| 6 | **Visa Ready** | M13-16 | Write formal messages, complete forms, and pass mock interviews. | A form is rejected; deadline pressure exposes different weak skills. | Embassy rehearsal (Chennai/Trivandrum context) + homes |
| 7 | **Gate** | M17-18 | Both pass Goethe A1 and commit to their next individual steps. | Exam-day nerves and different Sprechen fears. | Goethe Kochi exam hall + Kerala next-step scenes |

**Climax of A1:** Nivin and Meera pass Goethe A1 and each takes the next concrete step toward a distinct Germany plan. Their outcomes have equal weight; neither exists to complete the other's story. Cue A2.

---

## Core characters

### Nivin (learner co-lead)
- **24, from Thrissur.** A BTech electrical graduate in his first job with a small solar-installation firm.
- His Germany goal is an applied energy-systems study/work path. His older cousin in Munich makes the possibility tangible, but never makes decisions or solves German for him.
- Fast, social, improvisational, and willing to speak before a sentence is perfect. His recurring slips are guessed articles/endings, switching `du`/`Sie` too quickly, and bluffing through speech he did not fully hear.
- His repair habit is to slow down, repeat the usable chunk, and ask one clear follow-up. His wins come from recovering aloud and keeping the interaction moving—not from becoming the teacher.
- Speaks short, energetic Manglish with self-aware humour. Avoid generic hype, constant `macha`, or turning his confidence into competence he has not earned.
- His independent A1 arc is family doubt → energetic start → messy overconfidence → disciplined practice → exam-day control → A1 pass and the next concrete application step.
- The existing adult `kuttan-*.png` appearance/pose set is accepted as the **Nivin compatibility visual** for the `3p-06` migration. Legacy filenames/component IDs may remain temporarily behind the documented mapping, but learner-facing labels, alt text, and new prose become Nivin. The archived child Kuttan and any mascot/child interpretation are rejected.
- Not a teacher. **A peer who's learning at the same time as you.**

### Meera (learner co-lead)
- **27, from Kozhikode.** A registered nurse with several years of hospital experience.
- Her Germany goal is the nursing-recognition pathway and the professional independence it can unlock. A former colleague in Hamburg shares practical reality checks, but is not a cousin-copy, rescuer, or off-screen teacher.
- Observant, prepared, quietly funny, and initially reluctant to speak until the whole line feels correct. Her recurring slips are perfection freezes, overloaded word order, and losing the useful phrase while trying to decode every word of fast speech.
- Her repair habit is to identify the one communicative job, use the shortest correct chunk, and confirm what she heard. Her wins come from decisive speaking and accurate real-world forms—not from tidying Nivin's mistakes.
- Speaks measured, concrete Manglish with dry observations. Never write her as maternal, cautious-by-gender, a scold, or the permanently correct one.
- Her independent A1 arc is secure-job/family concern → deliberate start → perfection pressure → first unscripted recovery → deadline strain → A1 pass and submission of her next recognition document.
- Equal narrative weight to Nivin: she owns lessons, makes mistakes, repairs them, and wins; she is not a romance device, assistant, token inclusion, or gender-swapped duplicate.
- Her goal and arc must remain independently understandable when Nivin is absent.
- **Owner-approved visual identity seed (2026-07-18):** [`meera-canonical-base-v1.png`](assets/meera/meera-canonical-base-v1.png) is the canonical image reference for Meera v1 (SHA-256 `FBBC2E2F9EB3397BCA9F027516F863B50B2C682353D6E1DBD2009012D5D9E576`). [`meera-consistency-pose-v1.png`](assets/meera/meera-consistency-pose-v1.png) is the approved same-character consistency proof (SHA-256 `C52932E7B78710681E39295D14017907E6C59A1FDE9D87D329647D5C64143A76`), not a second identity.
- Future generation or editing must condition on the canonical base image rather than recreate Meera from text alone. Preserve her recognisable face, hair, apparent age, skin tone, body proportions, wardrobe language, and painterly illustration finish; vary only the expression, gesture, pose, crop, and scene required by the teaching moment.
- **Production seed (2026-07-22):** [`meera-production-cutout-v1.png`](assets/meera/meera-production-cutout-v1.png) is the minimal transparent presenting pose, derived only from the approved consistency pose with a local matte/defringe pass. [`meera-model-sheet-v1.png`](assets/meera/meera-model-sheet-v1.png) and [`meera-edge-review-v1.png`](assets/meera/meera-edge-review-v1.png) are the focused identity and cream/forest review boards. Checksums, dimensions, lineage, and alpha metrics live in [`manifest.json`](assets/meera/manifest.json).

### Equal-peer scene law
- Every lesson has one named learner scene owner: Nivin or Meera. Default to strict alternation; where the teaching outcome requires an exception, never give one peer more than two consecutive owned lessons and restore balance inside the module.
- A two-person dialogue may include both peers, but ownership still belongs to the learner whose motivation, mistake, repair, or win changes in the scene.
- Across each module, both peers must make a meaningful mistake, perform their own repair, and receive an independently legible win. Neither exists mainly to prompt, praise, translate for, or emotionally complete the other.
- Peer speech may use natural Manglish. German model answers remain pure, exact German. Frau Fischer owns teacher explanation/correction; Nivin and Meera may share what worked for them but never become substitute instructors.
- Romantic framing, flirtation as motivation, gendered competence, caretaker dynamics, and “boys versus girls” contrast are out of canon.

### Their families
- Nivin's Amma + Achan begin as doubters ("Ivide nalla job illayo?") and gradually respond to his progress.
- Meera's family values her secure nursing job and worries about the financial/professional risk of restarting abroad. The tension is practical and affectionate, not permission-seeking or romance-led.
- Both family arcs recognise earned progress by the exam phase without collapsing into one shared household story.

### The Cousin in Munich (unseen mentor)
- Nivin's older cousin. Lives in Munich. Has been there 3 years.
- Appears only via WhatsApp voice notes, screenshots, video calls.
- Represents the goal. Shares tips, encouragement, reality checks.
- Does NOT appear in person in A1. (Reveal in A2.)
- Meera's former nursing colleague in Hamburg is a separate, occasional reality-check contact. She provides process facts and honest voice notes, never answers exercises or replaces Meera's agency.

### Frau Fischer (Goethe Kochi teacher)
- Strict but warm. Has taught hundreds of Malayalis.
- Introduced in M1-2. Recurring presence through M5 (classroom scenes).
- Fades to background as Nivin and Meera gain independence in M6+.
- Cameos at the Goethe A1 exam in M17 as encouragement.
- Uses concise, exact German and bounded correction: identify the communicative miss, model the repair, then return the attempt to the learner. She is neither a comic stereotype nor an all-knowing narrator.
- The existing adult `frau-weber-*.png` appearance/pose set is accepted as the **Frau Fischer compatibility visual** for `3p-06`. Legacy filenames/component IDs may remain temporarily; learner-facing names, alt text, scripts, captions, and audio become Frau Fischer. The old surname is not a second teacher.

### The Malayali Returnee (mid-course character)
- Introduced M9 or M10.
- Returned from Germany after 2-3 years, now back in Kerala visiting.
- Gives tough-love perspective during the mid-course confidence dip.
- Not a recurring cast member — one or two key scenes.

### Embassy Officer (M13-16)
- Strict Sie / formal German.
- Represents the paperwork beast.
- Neither friend nor enemy — gatekeeper.

### Appu (mascot, non-narrative)
- NOT a character in the story. UI mascot only.
- May appear only as an optional ambient illustration in a rare empty state (sleeping), completion moment (silent cheer), or achievement popup. The actual meaning must still be carried by normal text/icon semantics; Appu is never the status messenger.
- Does **not** have dialogue, speech bubbles, decisions, story beats, lesson/exam prompts, teaching, error/recovery delivery, loading duty, or CTA decoration. Do not give him a voice or attach generated audio.
- Never place Appu in an active dialogue or beside the fixed cast as a third narrative participant. Do not repeat him across a flow; omission is the default.
- Existing `Appu.tsx` is the accepted v1 visual implementation. Its mood names are rendering options, not permission to expand his product role.

### Legacy cast disposition for `3p-06`

| Existing appearance/reference | Disposition | Migration rule |
|---|---|---|
| Adult `kuttan-*.png` pose set | **Relabel as Nivin compatibility visual** | New display copy/alt text says Nivin; compatibility filenames/IDs may remain temporarily. Old Kuttan biography/voice is not automatically canon. |
| `_child-backup/` and any child Kuttan render | **Rejected** | Historical evidence only; never ship or regenerate as Nivin. |
| Adult `frau-weber-*.png` pose set | **Relabel as Frau Fischer compatibility visual** | One teacher only; new copy/audio/captions say Frau Fischer. Compatibility filenames/IDs may remain temporarily. |
| Meera images outside `assets/meera/` | **Rejected as identity authority** | Historical text may be audited, but only the canonical base may condition new visual work. |
| `Appu.tsx` | **Keep, role frozen** | No narrative or instructional promotion during migration. |

The real learner's optional preferred name remains separate from this cast. Ask only after the First German Moment; skipping is allowed. It may personalise live UI copy but never renames Nivin/Meera/Frau Fischer/Appu and is never baked into pre-rendered audio or video.

---

## Setting vocabulary (Kerala-only for A1)

All M1-M16 `storyScene.setting.name` values should be drawn from this Kerala-only list. No Berlin / Munich / Frankfurt scenes in A1 except video-call backdrops of the cousin.

**Home life:**
- Nivin's home, Thrissur
- Meera's Kerala home (district fixed before final scripts)
- The family WhatsApp group
- Home study desk (with laptop + Goethe book)

**Learning:**
- Goethe-Institut, Kochi (classroom, library, courtyard)
- Kochi café (Indian Coffee House, or a modern café)
- Backwaters study spot (quiet)
- Language-exchange meetup in Ernakulam

**Practical:**
- Kerala post office (metaphor for Amt practice)
- Mock shop setup
- Travel agent office
- German consulate / visa center (Chennai or Trivandrum)

**Climax:**
- Goethe A1 exam hall (Kochi)
- Kochi International Airport — departures, security, boarding gate

---

## Emotional curve (8 beats)

```
  Dream   →   Basics   →   Building   →   Daily   →   Ready   →   Speaking   →   Visa   →   Gate
  Hope        Doubt       Grind         Progress    Confidence    Burnout      Panic      Triumph
```

Not a monotone rise — there's a **dip at Speaking (M9-12)** where the two peers struggle differently and the Malayali Returnee gives them perspective. This is what makes the climax feel earned.

---

## What goes in each lesson's `storyScene`

Every lesson's `storyScene` must:

1. **Setting from the Kerala vocabulary above** (A1 only). If a scene has a video call *backdrop* showing Germany, that's fine — but the real learner plus Nivin/Meera remain physically in Kerala.
2. **Reference the current beat's milestone + struggle.** Don't just set the scene — advance the story.
3. **Nivin/Meera voice: peer, not teacher.** They learn with the student, not above them. The legacy data field `kuttanIntro` is renamed in the cast-migration chunk; until then it is a schema label, not a character ruling.
4. **No Appu in decisionPoints, vocabEncounters, or learner dialogue.** Appu is mascot-only.
5. **At least one `vocabEncounter` tied to that lesson's target vocabulary.** Good practice already.
6. **At least one `decisionPoint` with a meaningful choice.** Good practice already.
7. **`narrative.previousRecap` reflects the previous lesson's actual story beat.** Currently most recaps are generic — should be specific.
8. **`narrative.nextTeaser` hooks forward.** Currently OK.

---

## What to fix in existing code

The following existing lessons' `storyScene.setting.name` violate A1-Kerala rule and must be re-set:

| Lesson | Current setting | Proposed setting |
|---|---|---|
| L1-3 Basic Greetings | Berlin Hauptbahnhof | Goethe-Institut Kochi — first morning class, students greeting each other |
| L1-4 Goodbyes | Berlin Hostel Lobby | Nivin's cousin is visiting Kerala on Onam holiday and flies back to Munich tomorrow — Nivin practises the goodbye |
| L1-5 First Conversation | Frankfurt Airport (mentioned) | A German tourist couple in Fort Kochi asks Meera for directions — she uses her first real German |
| L1-6 Formal vs Informal | Ausländerbehörde, Berlin | Goethe Kochi — mock visa interview with a strict examiner. Training for what's coming later. |

Modules 2-18 need the same audit (not yet performed — follow-up session).

---

## How this connects to UI

Several UI surfaces depend on the arc and should be verified:
- `src/lib/journey.ts` — already matches this bible. ✅
- `src/lib/content/narrative-arcs.ts` — currently contradicts (jumps to Berlin at M3). Must be rewritten to match this bible.
- Journey map component — verify it reflects Kerala settings only for A1.
- Lesson player headers — if they use arc titles, should pull from the updated narrative-arcs.

---

## Drafting guidance for future lesson authors

When writing a new lesson's storyScene:

1. Pick the arc beat from the 8-beat table above.
2. Pick a setting from the Kerala vocabulary.
3. Choose one scene owner and write: *"In this lesson, Nivin/Meera [milestone] — but [struggle]."* Alternate ownership across the sequence; do not default every emotional beat to Nivin.
4. Build a decisionPoint where the wrong choice amplifies the struggle and the right choice unlocks the milestone.
5. Every named-peer intro line (legacy field: `kuttanIntro`) should be from Nivin or Meera, not a teacher. Manglish, casual.
6. Never use Appu in narrative content. Never set a named A1 peer physically outside Kerala.

---

## Out-of-scope (A2 + B1)

These are NOT A1 content. Do not introduce in A1:
- Life inside Germany (Berlin streets, WG hunting, U-Bahn, Hausarzt, Anmeldung).
- German coworkers, landlords, German friends met in person.
- Onam dinner hosted for Germans.
- Returning to Kerala on holiday.
- Job interviews in Germany.

Save these for A2 and B1 to keep the progression earned.
