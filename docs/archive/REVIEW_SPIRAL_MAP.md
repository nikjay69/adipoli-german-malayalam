# Review Spiral Map — Cross-Module Skill Recycling

> Maps how each module should recycle vocabulary and skills from earlier modules.
> Purpose: ensure cumulative learning, not isolated topic silos.
>
> **Created:** 2026-03-23 11:03 UTC

---

## Why This Matters

A1 exam tests integrated skills. A student who learned numbers in Module 3 but never uses them again until the mock exam in Module 17 will fail. Every module from 4 onward should recycle at least 2 earlier skill areas.

---

## Spiral Dependencies

```
Module 1 (Greetings, Sounds)
  └─→ Every module uses greetings in dialogues
  └─→ Pronunciation feeds all speaking and listening tasks

Module 2 (Personal Info)
  └─→ M4 (family = extended personal info)
  └─→ M5 (daily routine = personal narrative)
  └─→ M11 (profession = self-intro extension)
  └─→ M14 (forms = structured personal info output)
  └─→ M18 (Sprechen Teil 1 = full self-intro)

Module 3 (Numbers, Time)
  └─→ M5 (daily routine uses clock times)
  └─→ M6 (restaurant prices)
  └─→ M7 (shopping prices, sizes)
  └─→ M9 (train times, platforms)
  └─→ M10 (pharmacy: "seit 3 Tagen")
  └─→ M12 (plan-making: day + time)
  └─→ M14 (forms: dates, phone numbers)
  └─→ M17 (Hören: time/number listening)

Module 4 (Family, Articles, Possessives)
  └─→ M5 (verb subjects from family: er/sie/wir)
  └─→ M8 (home = family context)
  └─→ M10 (health: talking about family member's symptoms)
  └─→ M13 (past tense stories often about family)

Module 5 (Present Tense, Daily Routine)
  └─→ M6-M12 (all modules use present tense verbs)
  └─→ M13 (Perfekt = present tense → past tense contrast)
  └─→ M18 (Sprechen: routine description)

Module 6 (Food, Accusative)
  └─→ M7 (shopping = buying things, accusative)
  └─→ M9 (travel: ordering food at station)
  └─→ M12 (invitations: "bring etwas zu trinken mit")

Module 7 (Shopping, Prices, Comparisons)
  └─→ M8 (furniture/apartment: prices, descriptions)
  └─→ M14 (bank: money, transactions)

Module 8 (Home, Prepositions)
  └─→ M9 (directions: prepositions of place/movement)
  └─→ M14 (Anmeldung: address, residence)

Module 9 (Travel, Modal Verbs)
  └─→ M10 (health: "Ich muss zum Arzt")
  └─→ M11 (work: "Ich kann...", "Ich muss...")
  └─→ M14 (office: "Ich möchte einen Termin")

Module 13 (Perfekt)
  └─→ M17/18 (exam tasks often include past tense)
```

---

## Per-Module Recycling Requirements

| Module | Must Recycle From | How |
|--------|-------------------|-----|
| 4 | M1 (greetings), M2 (personal info) | Family intro uses same patterns as self-intro |
| 5 | M3 (times), M2 (personal verbs) | "Ich stehe um 7 Uhr auf" = time + verb |
| 6 | M1 (polite phrases), M3 (prices) | Restaurant dialogue = greetings + numbers + politeness |
| 7 | M3 (numbers/prices), M6 (accusative) | "Ich nehme das T-Shirt" = accusative + price |
| 8 | M4 (possessives), M7 (prices) | "Mein Zimmer", apartment ad prices |
| 9 | M1 (polite phrases), M3 (times), M8 (prepositions) | Travel uses all: greetings, schedules, directions |
| 10 | M2 (personal info), M3 (duration), M5 (routine disruption) | "Seit Montag", "Ich kann nicht arbeiten" |
| 11 | M2 (profession), M5 (routine at work), M9 (modal verbs) | "Ich arbeite als...", "Ich muss/kann..." |
| 12 | M3 (day/time), M5 (routine activities), M6 (preferences) | Plans use time + activities + likes |
| 13 | M5 (present → past contrast), M12 (weekend activities) | Same activities, different tense |
| 14 | M2 (all personal info), M3 (dates/numbers), M11 (formal writing) | Forms + emails = cumulative output |
| 17 | M3, M6, M7, M9 (listening scenarios) | Hören tests recycle real-life vocabulary |
| 18 | M2, M5, M12, M14 (production scenarios) | Schreiben/Sprechen recycle all self-expression |

---

## Exercise Design Implication

When creating exercises for Module N, include at least 2 items that explicitly test vocabulary or structures from Module N-1 or N-2. This forces spiral review without requiring a separate SRS for exercise content.

**Example for Module 7 (Shopping):**
- Exercise uses prices (M3 recycling): "Was kostet die Hose? — Neununddreißig Euro neunundneunzig."
- Exercise uses accusative (M6 recycling): "Ich nehme einen Pullover und eine Jacke."
- Exercise uses polite phrases (M1 recycling): "Entschuldigung, haben Sie das in Größe M?"

---

## SRS Integration Points

Each module should auto-enqueue its vocabulary into SRS at lesson completion. The spiral map shows which earlier vocab will naturally reappear. SRS handles isolated word recall; the spiral map ensures **contextual reuse** in new situations.

| SRS handles | Spiral handles |
|-------------|----------------|
| "Do you remember Milch?" | "Order Milch at a restaurant" (M6 recycles M7 vocab) |
| "Translate: der Termin" | "Make a Termin at the Ausländerbehörde" (M14 recycles M3 + M9) |
| Isolated recall | Contextual production |

Both are needed. Neither alone is sufficient.
