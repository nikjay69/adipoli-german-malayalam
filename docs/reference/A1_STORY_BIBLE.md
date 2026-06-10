# A1 Story Bible

Canonical source for the Adipoli German A1 course narrative. All lesson `storyScene`s, videos, and exercise framing should align with this document.

Date: 2026-04-14
Status: Draft — approved structure, settings TBD per lesson.

---

## One-line premise

**Kuttan, a young Malayali from Thrissur, dreams of moving to Germany. Over 90 lessons he learns the language, survives multiple milestones and struggles, clears his visa paperwork, passes Goethe A1, and boards a flight to Germany.**

A1 stays **entirely in Kerala.** A2 begins the "arrival" arc. B1 is the "thriving" arc.

---

## ⚠ The two-frame rule (important)

There are two different kinds of scenes in this course, and they have DIFFERENT setting rules:

### Frame A — Kuttan's story scenes
**Kuttan, the named character, is always physically in Kerala during A1.** Home in Thrissur, Goethe Kochi classroom, Fort Kochi, embassy in Chennai/Trivandrum, Kochi airport. Never Berlin, never Munich, never Frankfurt. Video calls and WhatsApp with the cousin are fine — Kuttan watches, reacts, learns, but he himself is in Kerala.

**Writing test:** if a sentence names "Kuttan" and places him somewhere, that location MUST be Kerala (or a video-call view of Germany).

### Frame B — Learner imagination scenes (second-person teaching)
**The learner — addressed as "you" — can be asked to imagine any scenario anywhere**, including real German settings. This is normal A1 teaching and expected.

Examples that are FINE:
- *"Imagine you're at a Bäckerei in Berlin. How would you order?"*
- *"You walk into a café in Munich at 9 AM. What do you say?"*
- *"Picture the Ausländerbehörde clerk asking for your name."*

**Why both work:** Kuttan's narrative integrity (his story is Kerala-only until M17) is preserved, AND the learner gets to rehearse real German scenarios imaginatively. No contradiction.

### When to use which

| Script / scene type | Use Frame A (Kuttan in Kerala) | Use Frame B ("you" imagining) |
|---|---|---|
| `storyScene` in a lesson (module-XX.ts) | ✅ required | — |
| `kuttanIntro` lines | ✅ required | — |
| `decisionPoints` where Kuttan is the actor | ✅ required | — |
| Exercise question stems | — | ✅ prefer |
| Video script teaching sections (direct to learner) | — | ✅ prefer |
| Video script where Kuttan is a named scene participant | ✅ required | — |
| Pimsleur audio narration ("imagine you're…") | — | ✅ prefer |
| Game round prompts | — | ✅ prefer |

### Why this matters

Scripts that rigidly use Frame A for everything ("at Goethe Kochi, Frau Weber runs a mock bakery…") become over-scaffolded and lose flow. Scripts that rigidly use Frame B for Kuttan's own scenes ("Kuttan arrives in Berlin Hauptbahnhof") break the story arc.

Mixing both cleanly = natural teaching + coherent story.

---

## The 8-beat arc (matches `src/lib/journey.ts`)

| # | Beat | Modules | Milestone | Struggle | Default Setting |
|---|---|---|---|---|---|
| 0 | **Dream** | pre-M1 | Cousin's WhatsApp arrives: "Free university, machane!" Kuttan decides to try. | Parents doubt. Ivide nalla job illayo? | Thrissur home |
| 1 | **Basics / First Words** | M1-2 | First German sentence (*"Ich lerne Deutsch."*). First umlaut said aloud. | Feels dumb in Goethe Kochi classroom. Umlauts sound alien. | Kuttan's home + Goethe-Institut Kochi |
| 2 | **Building Up** | M3-4 | Tells time, counts in German, describes his family. | Gender of nouns (der/die/das) is maddening. Parents still skeptical. | Home + Goethe Kochi library |
| 3 | **Daily Life** | M5-6 | Can order food / describe daily routine in German. | Native speech speed on cousin's video calls is terrifying. | Home + video calls from Munich cousin |
| 4 | **Getting Ready** | M7-8 | Negotiates in a shop (mock), handles money, describes a flat. | Big numbers slow, formality tiring. | Mock-shop scenarios + Goethe peer circles |
| 5 | **Speaking Well** | M9-12 | Holds full small-talk conversation. Explains his goals. | Mid-course burnout. Wants to quit. Malayali returnee gives tough-love pep talk. | Kochi café practice + parents' home |
| 6 | **Visa Ready** | M13-16 | Writes a formal email. Passes mock interview. Visa documents submitted. | Embassy paperwork in Chennai. A form gets rejected. Deadline panic. | Embassy (Chennai or Trivandrum) + home |
| 7 | **Gate** | M17-18 | Passes Goethe A1. Boards flight to Germany. | Exam-day nerves. Sprechen stage fright. Last goodbye to parents at Kochi airport. | Goethe Kochi exam hall + Kochi airport |

**Climax of A1:** boarding announcement to Frankfurt. Final scene: Kuttan at window seat watching Kerala recede below. Cue A2.

---

## Core characters

### Kuttan (protagonist / player surrogate)
- 20s, from Thrissur.
- Dreamer + doer. Second-year BTech or finished-degree, exact background flexible.
- Not a teacher. **A peer who's learning at the same time as you.** Speaks Manglish naturally.
- Carries the emotional arc: doubt → hope → grind → panic → triumph → departure.

### Amma + Achan (parents)
- Doubters in M1-M4 ("Ivide nalla job illayo?").
- Slowly come around through M5-M10 when they see progress and numbers.
- Fully supportive by M12.
- Tearful goodbye scene at Kochi airport in M18.

### The Cousin in Munich (unseen mentor)
- Kuttan's older cousin. Lives in Munich. Has been there 3 years.
- Appears only via WhatsApp voice notes, screenshots, video calls.
- Represents the goal. Shares tips, encouragement, reality checks.
- Does NOT appear in person in A1. (Reveal in A2.)

### Frau Weber (Goethe Kochi teacher)
- Strict but warm. Has taught hundreds of Malayalis.
- Introduced in M1-2. Recurring presence through M5 (classroom scenes).
- Fades to background as Kuttan gains independence in M6+.
- Cameos at the Goethe A1 exam in M17 as encouragement.

### The Malayali Returnee (mid-course character)
- Introduced M9 or M10.
- Returned from Germany after 2-3 years, now back in Kerala visiting.
- Gives tough-love pep talk when Kuttan wants to quit.
- Not a recurring cast member — one or two key scenes.

### Embassy Officer (M13-16)
- Strict Sie / formal German.
- Represents the paperwork beast.
- Neither friend nor enemy — gatekeeper.

### Appu (mascot, non-narrative)
- NOT a character in the story. UI mascot only.
- Appears in: empty states (sleeping), completion moments (silent cheer), achievement popups.
- Does **not** have dialogue, decisions, or story beats. Do not give him a voice.
- Think of him like Clippy in its quietest mode: visual only, never intrusive.

---

## Setting vocabulary (Kerala-only for A1)

All M1-M16 `storyScene.setting.name` values should be drawn from this Kerala-only list. No Berlin / Munich / Frankfurt scenes in A1 except video-call backdrops of the cousin.

**Home life:**
- Kuttan's home, Thrissur
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

Not a monotone rise — there's a **dip at Speaking (M9-12)** where Kuttan wants to quit. The Malayali Returnee pulls him back. This is what makes the climax feel earned.

---

## What goes in each lesson's `storyScene`

Every lesson's `storyScene` must:

1. **Setting from the Kerala vocabulary above** (A1 only). If a scene has a video call *backdrop* showing Germany, that's fine — but the learner + Kuttan are physically in Kerala.
2. **Reference the current beat's milestone + struggle.** Don't just set the scene — advance the story.
3. **Kuttan voice: peer, not teacher.** He's learning with the student, not above them.
4. **No Appu in decisionPoints, vocabEncounters, or kuttanIntro lines.** Appu is mascot-only.
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
| L1-4 Goodbyes | Berlin Hostel Lobby | Kuttan's cousin is visiting Kerala on Onam holiday and flies back to Munich tomorrow — Kuttan practices the goodbye |
| L1-5 First Conversation | Frankfurt Airport (mentioned) | A German tourist couple in Fort Kochi asks Kuttan for directions — he uses his first real German |
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
3. Write one sentence: *"In this lesson, Kuttan [milestone] — but [struggle]."*
4. Build a decisionPoint where the wrong choice amplifies the struggle and the right choice unlocks the milestone.
5. Every line in `kuttanIntro` should be from a peer, not a teacher. Manglish, casual.
6. Never use Appu. Never set outside Kerala.

---

## Out-of-scope (A2 + B1)

These are NOT A1 content. Do not introduce in A1:
- Life inside Germany (Berlin streets, WG hunting, U-Bahn, Hausarzt, Anmeldung).
- German coworkers, landlords, German friends met in person.
- Onam dinner hosted for Germans.
- Returning to Kerala on holiday.
- Job interviews in Germany.

Save these for A2 and B1 to keep the progression earned.
