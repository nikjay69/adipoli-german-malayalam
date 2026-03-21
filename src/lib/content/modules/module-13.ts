import type { Module } from '../types';

export const MODULE_13: Module = {
  id: 13,
  title: "Talking About the Past",
  titleGerman: "Was hast du gemacht?",
  description: "Learn the Perfekt tense — tell stories about what you did, where you went, and what happened! Past tense master aakaam!",
  icon: "📅",
  color: "#7c3aed",
  totalHours: 14,
  unlockRequirement: "Complete Module 12",
  lessons: [
    // ─── Lesson 13-1: Perfekt Tense with haben ────────────────────────
    {
      id: "13-1",
      title: "Perfekt Tense with haben",
      titleGerman: "Perfekt mit haben",
      description: "Master the most common past tense in German — the Perfekt with haben. Like saying 'I have done' in English! Most verbs use haben, so ithu nannaayi padikkaam!",
      duration: "60 min",
      xpReward: 160,
      videos: [
        {
          id: "v13-1-1",
          title: "The Past Tense - Perfekt with haben",
          duration: "14:00",
          description: "Learn the Perfekt tense structure using haben — the most common way to talk about the past in everyday German",
          scriptOutline: [
            "Opening: 'Ivide nammude past tense adventure thudangunnu! In German, talking about the past is easier than you think!'",
            "Why Perfekt? In spoken German, people use Perfekt 90% of the time — not Präteritum!",
            "Structure: Subject + haben (conjugated) + ... + past participle (at the END!)",
            "Conjugation review: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben",
            "Think of it like a sandwich — haben is the bread at the start, participle is the bread at the end!",
            "Kerala parallel: Malayalam-il verb sentence-nte avasaanam varum — German Perfekt-ilum participle at the end!",
            "Example breakdown: 'Ich habe Deutsch gelernt' — I have learned German",
            "More examples: 'Ich habe gekocht' (cooked), 'Ich habe gespielt' (played), 'Ich habe gemacht' (done/made)",
            "With objects: 'Ich habe ein Buch gekauft' — the object goes BETWEEN haben and the participle",
            "Negative: 'Ich habe nicht gespielt' — nicht also goes before the participle",
            "Question form: 'Hast du Deutsch gelernt?' — Have you learned German? (haben moves to position 1)",
            "Common mistake: Forgetting to put the participle at the END — 'Ich habe gemacht meine Hausaufgaben' is WRONG!",
            "Practice: Describe what you did today using haben + past participle"
          ],
          keyVocabulary: ["haben", "gemacht", "gespielt", "gelernt", "gekauft", "gekocht"],
          learningObjectives: [
            "Understand the Perfekt tense structure with haben",
            "Conjugate haben correctly for all persons",
            "Form statements, negations, and questions in the Perfekt"
          ],
          placeholderThumbnail: "/images/thumbnails/perfekt-haben.jpg"
        },
        {
          id: "v13-1-2",
          title: "Regular Past Participles - The ge-...-t Pattern",
          duration: "12:00",
          description: "Learn the simple ge-...-t pattern for regular German verbs — once you know this, you can form hundreds of past participles!",
          scriptOutline: [
            "Opening: 'Regular past participles — the easy ones! Oru simple formula und, athu padichaal done!'",
            "The formula: ge- + verb stem + -t → gemacht, gespielt, gelernt",
            "machen → gemacht (to make/do → made/done) — the most useful verb!",
            "spielen → gespielt (to play → played)",
            "lernen → gelernt (to learn → learned)",
            "kaufen → gekauft (to buy → bought)",
            "kochen → gekocht (to cook → cooked) — nammude Kerala curry German-il!",
            "arbeiten → gearbeitet (to work → worked) — note the extra -e- because stem ends in -t!",
            "warten → gewartet (to wait → waited) — same rule, extra -e-",
            "hören → gehört (to hear → heard), sagen → gesagt (to say → said)",
            "Practice sentences: 'Ich habe gestern Biryani gekocht' — I cooked Biryani yesterday",
            "'Sie hat den ganzen Tag gearbeitet' — She worked the whole day",
            "Tip: Most regular verbs follow this pattern — learn it once, use it everywhere!"
          ],
          keyVocabulary: ["gemacht", "gespielt", "gelernt", "gekauft", "gekocht", "gearbeitet"],
          learningObjectives: [
            "Form regular past participles using the ge-...-t pattern",
            "Handle verbs whose stem ends in -t or -d (adding extra -e-)",
            "Create past tense sentences with regular verbs confidently"
          ],
          placeholderThumbnail: "/images/thumbnails/regular-participles.jpg"
        }
      ],
      exercises: [
        {
          id: "ex13-1-1",
          type: "multiple-choice",
          question: "What is the correct Perfekt form? 'Ich _____ Fußball _____.'",
          options: ["habe ... gespielt", "bin ... gespielt", "habe ... spielen", "hat ... gespielt"],
          correctAnswer: "habe ... gespielt",
          explanation: "spielen uses haben in the Perfekt. 'Ich habe' (first person) + gespielt (past participle of spielen).",
          xpReward: 10
        },
        {
          id: "ex13-1-2",
          type: "fill-blank",
          question: "Complete: Er _____ das Essen gekocht. (He cooked the food.)",
          options: ["hat", "habe", "haben", "ist"],
          correctAnswer: "hat",
          explanation: "'Er' (he) takes 'hat' as the conjugated form of haben.",
          xpReward: 10
        },
        {
          id: "ex13-1-3",
          type: "multiple-choice",
          question: "What is the past participle of 'machen'?",
          options: ["gemacht", "gemachen", "gemakt", "machte"],
          correctAnswer: "gemacht",
          explanation: "Regular verbs follow ge- + stem + -t: mach → gemacht.",
          xpReward: 10
        },
        {
          id: "ex13-1-4",
          type: "matching",
          question: "Match the verb to its past participle:",
          options: ["spielen", "lernen", "kaufen", "kochen", "arbeiten"],
          correctAnswer: ["gespielt", "gelernt", "gekauft", "gekocht", "gearbeitet"],
          xpReward: 15
        },
        {
          id: "ex13-1-5",
          type: "fill-blank",
          question: "Complete: Wir _____ gestern Deutsch _____. (We learned German yesterday.)",
          options: ["haben ... gelernt", "sind ... gelernt", "habt ... gelernt", "haben ... lernen"],
          correctAnswer: "haben ... gelernt",
          explanation: "'Wir' uses 'haben' and lernen is a regular haben-verb: gelernt.",
          xpReward: 10
        },
        {
          id: "ex13-1-6",
          type: "ordering",
          question: "Put the words in the correct order to form a Perfekt sentence: 'I bought a book.'",
          options: ["habe", "Ich", "gekauft", "ein Buch"],
          correctAnswer: ["Ich", "habe", "ein Buch", "gekauft"],
          xpReward: 20
        },
        {
          id: "ex13-1-7",
          type: "multiple-choice",
          question: "Which conjugation of 'haben' goes with 'ihr'?",
          options: ["habt", "haben", "hast", "hat"],
          correctAnswer: "habt",
          explanation: "'Ihr' (you all) takes 'habt': Ihr habt gut gemacht!",
          xpReward: 10
        },
        {
          id: "ex13-1-8",
          type: "fill-blank",
          question: "Complete: _____ du gestern Kerala-Curry _____? (Did you cook Kerala curry yesterday?)",
          options: ["Hast ... gekocht", "Haben ... gekocht", "Bist ... gekocht", "Hat ... gekocht"],
          correctAnswer: "Hast ... gekocht",
          explanation: "In questions, haben moves to position 1. 'Du' takes 'hast'. kochen → gekocht (regular).",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab13-1-1", german: "haben", english: "to have (auxiliary)", malayalam: "ഉണ്ടായിരിക്കുക", pronunciation: "hah-ben", example: "Ich habe einen Hund.", exampleTranslation: "I have a dog." },
        { id: "vocab13-1-2", german: "gemacht", english: "done / made (past participle)", malayalam: "ചെയ്തു", pronunciation: "ge-makht", example: "Ich habe meine Hausaufgaben gemacht.", exampleTranslation: "I did my homework." },
        { id: "vocab13-1-3", german: "gespielt", english: "played (past participle)", malayalam: "കളിച്ചു", pronunciation: "ge-shpeelt", example: "Er hat Cricket gespielt.", exampleTranslation: "He played cricket." },
        { id: "vocab13-1-4", german: "gelernt", english: "learned (past participle)", malayalam: "പഠിച്ചു", pronunciation: "ge-lairnt", example: "Ich habe Deutsch gelernt.", exampleTranslation: "I learned German." },
        { id: "vocab13-1-5", german: "gekauft", english: "bought (past participle)", malayalam: "വാങ്ങി", pronunciation: "ge-kowft", example: "Sie hat ein Kleid gekauft.", exampleTranslation: "She bought a dress." },
        { id: "vocab13-1-6", german: "gekocht", english: "cooked (past participle)", malayalam: "പാചകം ചെയ്തു", pronunciation: "ge-kokht", example: "Wir haben Curry gekocht.", exampleTranslation: "We cooked curry." },
        { id: "vocab13-1-7", german: "gearbeitet", english: "worked (past participle)", malayalam: "ജോലി ചെയ്തു", pronunciation: "ge-ar-by-tet", example: "Er hat im Krankenhaus gearbeitet.", exampleTranslation: "He worked in the hospital." },
        { id: "vocab13-1-8", german: "gehört", english: "heard (past participle)", malayalam: "കേട്ടു", pronunciation: "ge-hurt", example: "Hast du die Nachricht gehört?", exampleTranslation: "Did you hear the news?" },
        { id: "vocab13-1-9", german: "gesagt", english: "said (past participle)", malayalam: "പറഞ്ഞു", pronunciation: "ge-zahkt", example: "Was hat er gesagt?", exampleTranslation: "What did he say?" },
        { id: "vocab13-1-10", german: "das Perfekt", english: "the perfect tense (past)", malayalam: "ഭൂതകാലം (പെർഫെക്ട്)", pronunciation: "pair-fekt", example: "Im Perfekt sagt man: Ich habe gemacht.", exampleTranslation: "In the Perfekt you say: I have done." }
      ]
    },

    // ─── Lesson 13-2: Perfekt Tense with sein ────────────────────────
    {
      id: "13-2",
      title: "Perfekt Tense with sein",
      titleGerman: "Perfekt mit sein",
      description: "Some verbs use 'sein' instead of 'haben' in the past tense — mostly verbs about moving or changing! Movement aanel sein, action aanel haben!",
      duration: "60 min",
      xpReward: 160,
      videos: [
        {
          id: "v13-2-1",
          title: "Movement & Change = sein!",
          duration: "14:00",
          description: "Discover why certain German verbs use sein instead of haben in the Perfekt tense — the movement/change rule",
          scriptOutline: [
            "Opening: 'Not all verbs use haben — some need sein! Ithu important aanu, machaa! Confuse aakaathe padikkaam!'",
            "The rule: Verbs showing MOVEMENT from A to B or a CHANGE OF STATE use sein",
            "Think of it like this: If you physically move somewhere OR something fundamentally changes → sein!",
            "sein conjugation: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind",
            "Movement verbs: gehen (go), fahren (drive), fliegen (fly), kommen (come), laufen (run), reisen (travel)",
            "Example: 'Ich bin nach Berlin gefahren' — I drove/went to Berlin",
            "Example: 'Sie ist nach Hause gegangen' — She went home",
            "Example: 'Wir sind nach Kerala geflogen' — We flew to Kerala!",
            "Change of state: werden (become), sterben (die), aufwachen (wake up), einschlafen (fall asleep)",
            "Example: 'Er ist Arzt geworden' — He became a doctor",
            "Special exceptions: bleiben (stay) and sein (be) ALSO use sein — just memorize these!",
            "Kerala analogy: 'Naadakam pole aanu — if the ACTOR moves across the stage, use sein!'",
            "Common mistake: Using haben with movement verbs — 'Ich habe gegangen' is WRONG! Always 'Ich bin gegangen'."
          ],
          keyVocabulary: ["sein", "gegangen", "gefahren", "geflogen", "gekommen", "geworden"],
          learningObjectives: [
            "Understand why some verbs use sein in the Perfekt",
            "Identify movement and change-of-state verbs",
            "Conjugate sein correctly and form Perfekt sentences"
          ],
          placeholderThumbnail: "/images/thumbnails/perfekt-sein.jpg"
        },
        {
          id: "v13-2-2",
          title: "Common sein-Verbs You'll Use Every Day",
          duration: "12:00",
          description: "Master the most frequently used verbs that take sein in the Perfekt — from going places to life changes",
          scriptOutline: [
            "Opening: 'Let's learn the most common sein-verbs — you'll use these every single day in Germany!'",
            "gehen → gegangen: 'Ich bin ins Kino gegangen' (I went to the cinema)",
            "fahren → gefahren: 'Er ist nach München gefahren' (He drove to Munich)",
            "fliegen → geflogen: 'Wir sind nach Indien geflogen' (We flew to India — Malayali trip home!)",
            "kommen → gekommen: 'Sie ist spät gekommen' (She came late)",
            "laufen → gelaufen: 'Ich bin 5 Kilometer gelaufen' (I ran 5 kilometers)",
            "reisen → gereist: 'Er ist durch Europa gereist' (He traveled through Europe)",
            "Special ones: sein → gewesen: 'Ich bin in Deutschland gewesen' (I have been in Germany)",
            "werden → geworden: 'Es ist kalt geworden' (It has become cold)",
            "bleiben → geblieben: 'Ich bin zu Hause geblieben' (I stayed at home)",
            "aufstehen → aufgestanden: 'Ich bin um 7 Uhr aufgestanden' (I got up at 7 — separable verb!)",
            "Tip: sein-verbs are a closed list — about 20-30 common ones. The rest all use haben!",
            "Practice: Tell your friend about your last trip using sein-verbs — Germany-yil aarude koode yathra cheythu?"
          ],
          keyVocabulary: ["gegangen", "gefahren", "geflogen", "gekommen", "gelaufen", "gewesen", "geblieben", "aufgestanden"],
          learningObjectives: [
            "Know the most common sein-verbs and their past participles",
            "Handle separable verbs (aufstehen → aufgestanden) in the Perfekt",
            "Remember the special cases like bleiben and sein itself"
          ],
          placeholderThumbnail: "/images/thumbnails/sein-verbs.jpg"
        }
      ],
      exercises: [
        {
          id: "ex13-2-1",
          type: "multiple-choice",
          question: "Which is correct? 'Ich _____ nach Berlin _____.'",
          options: ["bin ... gefahren", "habe ... gefahren", "bin ... gefahrt", "habe ... gefahrt"],
          correctAnswer: "bin ... gefahren",
          explanation: "fahren is a movement verb → uses sein. The past participle is gefahren (irregular).",
          xpReward: 10
        },
        {
          id: "ex13-2-2",
          type: "fill-blank",
          question: "Complete: Sie _____ nach Hause gegangen. (She went home.)",
          options: ["ist", "hat", "sind", "haben"],
          correctAnswer: "ist",
          explanation: "gehen is a movement verb and takes sein. 'Sie' (she) → 'ist'.",
          xpReward: 10
        },
        {
          id: "ex13-2-3",
          type: "matching",
          question: "Match the verb to its past participle:",
          options: ["gehen", "fliegen", "kommen", "bleiben", "reisen"],
          correctAnswer: ["gegangen", "geflogen", "gekommen", "geblieben", "gereist"],
          xpReward: 15
        },
        {
          id: "ex13-2-4",
          type: "multiple-choice",
          question: "Why does 'bleiben' use sein even though there's no movement?",
          options: ["It's an exception you must memorize", "It indicates a change of state (deciding to stay)", "It actually uses haben", "It's a reflexive verb"],
          correctAnswer: "It's an exception you must memorize",
          explanation: "bleiben (to stay) is one of the exceptions — no movement, but it still uses sein. Just memorize it!",
          xpReward: 10
        },
        {
          id: "ex13-2-5",
          type: "ordering",
          question: "Put the words in the correct order: 'We flew to India.'",
          options: ["geflogen", "Wir", "nach Indien", "sind"],
          correctAnswer: ["Wir", "sind", "nach Indien", "geflogen"],
          xpReward: 20
        },
        {
          id: "ex13-2-6",
          type: "multiple-choice",
          question: "Which verb does NOT use sein in the Perfekt?",
          options: ["kochen", "gehen", "fahren", "fliegen"],
          correctAnswer: "kochen",
          explanation: "kochen (to cook) is not a movement or change-of-state verb, so it uses haben: Ich habe gekocht.",
          xpReward: 10
        },
        {
          id: "ex13-2-7",
          type: "fill-blank",
          question: "Complete: Er _____ krank geworden. (He became sick.)",
          options: ["ist", "hat", "bin", "sind"],
          correctAnswer: "ist",
          explanation: "werden (to become) is a change-of-state verb → uses sein. 'Er' → 'ist'.",
          xpReward: 10
        },
        {
          id: "ex13-2-8",
          type: "multiple-choice",
          question: "What is the Perfekt of 'aufstehen' (to get up)?",
          options: ["Ich bin aufgestanden.", "Ich habe aufgestanden.", "Ich bin aufgesteht.", "Ich habe aufgesteht."],
          correctAnswer: "Ich bin aufgestanden.",
          explanation: "aufstehen is a movement verb (you go from lying to standing) → uses sein. It's also separable: auf-ge-standen.",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab13-2-1", german: "gegangen", english: "gone / walked (past participle)", malayalam: "പോയി", pronunciation: "ge-gang-en", example: "Ich bin ins Kino gegangen.", exampleTranslation: "I went to the cinema." },
        { id: "vocab13-2-2", german: "gefahren", english: "driven / traveled (past participle)", malayalam: "യാത്ര ചെയ്തു", pronunciation: "ge-fah-ren", example: "Sie ist nach Hamburg gefahren.", exampleTranslation: "She drove to Hamburg." },
        { id: "vocab13-2-3", german: "geflogen", english: "flown (past participle)", malayalam: "പറന്നു", pronunciation: "ge-flo-gen", example: "Wir sind nach Kerala geflogen.", exampleTranslation: "We flew to Kerala." },
        { id: "vocab13-2-4", german: "gekommen", english: "come (past participle)", malayalam: "വന്നു", pronunciation: "ge-ko-men", example: "Er ist gestern aus Indien gekommen.", exampleTranslation: "He came from India yesterday." },
        { id: "vocab13-2-5", german: "gelaufen", english: "run / walked (past participle)", malayalam: "ഓടി / നടന്നു", pronunciation: "ge-low-fen", example: "Ich bin zum Supermarkt gelaufen.", exampleTranslation: "I walked to the supermarket." },
        { id: "vocab13-2-6", german: "gewesen", english: "been (past participle of sein)", malayalam: "ആയിരുന്നു", pronunciation: "ge-vay-zen", example: "Ich bin in Deutschland gewesen.", exampleTranslation: "I have been in Germany." },
        { id: "vocab13-2-7", german: "geworden", english: "become (past participle)", malayalam: "ആയിത്തീർന്നു", pronunciation: "ge-vor-den", example: "Es ist kalt geworden.", exampleTranslation: "It has become cold." },
        { id: "vocab13-2-8", german: "geblieben", english: "stayed (past participle)", malayalam: "തങ്ങി", pronunciation: "ge-blee-ben", example: "Ich bin zu Hause geblieben.", exampleTranslation: "I stayed at home." },
        { id: "vocab13-2-9", german: "gereist", english: "traveled (past participle)", malayalam: "സഞ്ചരിച്ചു", pronunciation: "ge-ryst", example: "Er ist durch ganz Europa gereist.", exampleTranslation: "He traveled through all of Europe." },
        { id: "vocab13-2-10", german: "aufgestanden", english: "got up (past participle)", malayalam: "എഴുന്നേറ്റു", pronunciation: "owf-ge-shtan-den", example: "Ich bin um 6 Uhr aufgestanden.", exampleTranslation: "I got up at 6 o'clock." }
      ]
    },

    // ─── Lesson 13-3: Irregular Past Participles ─────────────────────
    {
      id: "13-3",
      title: "Irregular Past Participles",
      titleGerman: "Unregelmäßige Partizipien",
      description: "Tackle the tricky irregular verbs — they change their stem, but there are patterns! Plus learn verbs that skip the ge- prefix entirely.",
      duration: "60 min",
      xpReward: 160,
      videos: [
        {
          id: "v13-3-1",
          title: "The Irregular Ones - ge-...-en Pattern",
          duration: "14:00",
          description: "Learn the ge-...-en pattern for irregular past participles — the stem changes but there's a method to the madness!",
          scriptOutline: [
            "Opening: 'Irregular verbs — sounds scary, right? But pattern und aanu, don't worry machaa!'",
            "Regular pattern reminder: ge- + stem + -t (gemacht, gespielt) — nice and predictable",
            "Irregular pattern: ge- + CHANGED STEM + -en — the stem transforms!",
            "essen → gegessen (to eat → eaten): 'Ich habe Dosa gegessen!' — nammude favorite!",
            "trinken → getrunken (to drink → drunk): 'Er hat Chai getrunken' — mandatory Malayali chai!",
            "schreiben → geschrieben (to write → written): 'Sie hat eine E-Mail geschrieben.'",
            "lesen → gelesen (to read → read): 'Hast du das Buch gelesen?'",
            "sehen → gesehen (to see → seen): 'Wir haben einen Malayalam-Film gesehen!'",
            "nehmen → genommen (to take → taken): 'Ich habe den Bus genommen.'",
            "sprechen → gesprochen (to speak → spoken): 'Wir haben Deutsch gesprochen.'",
            "geben → gegeben (to give → given): 'Er hat mir ein Geschenk gegeben.'",
            "finden → gefunden (to find → found): 'Ich habe einen Job gefunden!' — the dream!",
            "Tip: Many follow similar vowel-shift patterns — compare with English: drink→drunk, write→written!",
            "Memory hack: Group them by vowel change — e→o (sprechen→gesprochen, nehmen→genommen)"
          ],
          keyVocabulary: ["gegessen", "getrunken", "geschrieben", "gelesen", "gesehen", "genommen", "gesprochen"],
          learningObjectives: [
            "Recognize the ge-...-en pattern for irregular verbs",
            "Know the past participles of the 10 most common irregular verbs",
            "Identify vowel-shift patterns to memorize more easily"
          ],
          placeholderThumbnail: "/images/thumbnails/irregular-participles.jpg"
        },
        {
          id: "v13-3-2",
          title: "No ge-? Special Prefix & -ieren Verbs",
          duration: "12:00",
          description: "Special rules — verbs with inseparable prefixes and -ieren verbs skip the ge- entirely! Ivide ge- venda!",
          scriptOutline: [
            "Opening: 'Some verbs break the rules even more — no ge- prefix at all! Pakshe simple aanu!'",
            "Verbs with inseparable prefixes: be-, er-, ver-, ent-, zer-, emp-, miss-",
            "besuchen → besucht (to visit → visited) — NO ge-!: 'Ich habe meine Oma besucht.'",
            "verstehen → verstanden (to understand → understood) — NO ge-!: 'Hast du alles verstanden?'",
            "erzählen → erzählt (to tell → told) — NO ge-!: 'Er hat eine Geschichte erzählt.'",
            "entscheiden → entschieden (to decide → decided) — NO ge-!",
            "bekommen → bekommen (to receive → received) — NO ge-, and participle = infinitive!",
            "Why no ge-? The prefix already occupies ge-'s spot — think of it as a parking space taken!",
            "-ieren verbs: also NO ge-! They're often borrowed from French/Latin/English",
            "telefonieren → telefoniert (to phone → phoned): 'Sie hat mit ihrer Mutter telefoniert.'",
            "studieren → studiert (to study → studied): 'Ich habe in Kochi studiert.'",
            "fotografieren → fotografiert (to photograph → photographed)",
            "Summary rule: If a verb starts with be-/er-/ver-/ent-/zer-/emp-/miss- OR ends in -ieren → NO ge-!"
          ],
          keyVocabulary: ["besucht", "verstanden", "erzählt", "entschieden", "telefoniert", "studiert"],
          learningObjectives: [
            "Know which verbs don't take the ge- prefix",
            "Form past participles for inseparable prefix verbs",
            "Handle -ieren verbs correctly in the Perfekt"
          ],
          placeholderThumbnail: "/images/thumbnails/no-ge-verbs.jpg"
        }
      ],
      exercises: [
        {
          id: "ex13-3-1",
          type: "multiple-choice",
          question: "What is the past participle of 'essen'?",
          options: ["gegessen", "geesst", "geessen", "esst"],
          correctAnswer: "gegessen",
          explanation: "essen is irregular: ge- + gess + -en → gegessen.",
          xpReward: 10
        },
        {
          id: "ex13-3-2",
          type: "matching",
          question: "Match the verb to its past participle:",
          options: ["trinken", "schreiben", "lesen", "sehen", "sprechen"],
          correctAnswer: ["getrunken", "geschrieben", "gelesen", "gesehen", "gesprochen"],
          xpReward: 15
        },
        {
          id: "ex13-3-3",
          type: "fill-blank",
          question: "Complete: Hast du das Buch _____? (Have you read the book?)",
          options: ["gelesen", "gelest", "gelesent", "lesen"],
          correctAnswer: "gelesen",
          explanation: "lesen → gelesen (irregular past participle, vowel stays 'e' but ending is -en).",
          xpReward: 10
        },
        {
          id: "ex13-3-4",
          type: "multiple-choice",
          question: "Why does 'besuchen' become 'besucht' and NOT 'gebesucht'?",
          options: ["Verbs with be- prefix don't take ge-", "It's a regular verb", "besuchen uses sein", "It's a separable verb"],
          correctAnswer: "Verbs with be- prefix don't take ge-",
          explanation: "Inseparable prefixes (be-, er-, ver-, ent-) replace the ge- prefix in past participles.",
          xpReward: 10
        },
        {
          id: "ex13-3-5",
          type: "fill-blank",
          question: "Complete: Sie hat gestern _____. (She phoned yesterday.) [telefonieren]",
          options: ["telefoniert", "getelefoniert", "telefonieren", "telefonierte"],
          correctAnswer: "telefoniert",
          explanation: "-ieren verbs don't take ge-: telefonieren → telefoniert.",
          xpReward: 10
        },
        {
          id: "ex13-3-6",
          type: "multiple-choice",
          question: "What is the past participle of 'verstehen'?",
          options: ["verstanden", "geverstanden", "versteht", "gevestanden"],
          correctAnswer: "verstanden",
          explanation: "verstehen has the inseparable prefix ver-, so no ge-. It's also irregular: verstanden.",
          xpReward: 10
        },
        {
          id: "ex13-3-7",
          type: "ordering",
          question: "Put the words in the correct order: 'He took the bus.'",
          options: ["genommen", "Er", "den Bus", "hat"],
          correctAnswer: ["Er", "hat", "den Bus", "genommen"],
          xpReward: 20
        },
        {
          id: "ex13-3-8",
          type: "matching",
          question: "Match: which verbs DON'T take ge- in the past participle?",
          options: ["studieren", "besuchen", "erzählen", "spielen"],
          correctAnswer: ["studiert (no ge-)", "besucht (no ge-)", "erzählt (no ge-)", "gespielt (has ge-)"],
          xpReward: 15
        }
      ],
      vocabulary: [
        { id: "vocab13-3-1", german: "gegessen", english: "eaten (past participle)", malayalam: "കഴിച്ചു", pronunciation: "ge-gess-en", example: "Ich habe Biryani gegessen.", exampleTranslation: "I ate Biryani." },
        { id: "vocab13-3-2", german: "getrunken", english: "drunk (past participle)", malayalam: "കുടിച്ചു", pronunciation: "ge-trunk-en", example: "Er hat Kaffee getrunken.", exampleTranslation: "He drank coffee." },
        { id: "vocab13-3-3", german: "geschrieben", english: "written (past participle)", malayalam: "എഴുതി", pronunciation: "ge-shree-ben", example: "Sie hat einen Brief geschrieben.", exampleTranslation: "She wrote a letter." },
        { id: "vocab13-3-4", german: "gelesen", english: "read (past participle)", malayalam: "വായിച്ചു", pronunciation: "ge-lay-zen", example: "Hast du das Buch gelesen?", exampleTranslation: "Have you read the book?" },
        { id: "vocab13-3-5", german: "gesehen", english: "seen (past participle)", malayalam: "കണ്ടു", pronunciation: "ge-zay-en", example: "Wir haben einen Film gesehen.", exampleTranslation: "We watched a film." },
        { id: "vocab13-3-6", german: "genommen", english: "taken (past participle)", malayalam: "എടുത്തു", pronunciation: "ge-no-men", example: "Ich habe den Bus genommen.", exampleTranslation: "I took the bus." },
        { id: "vocab13-3-7", german: "gesprochen", english: "spoken (past participle)", malayalam: "സംസാരിച്ചു", pronunciation: "ge-shpro-khen", example: "Wir haben Deutsch gesprochen.", exampleTranslation: "We spoke German." },
        { id: "vocab13-3-8", german: "besucht", english: "visited (past participle)", malayalam: "സന്ദർശിച്ചു", pronunciation: "be-zookht", example: "Ich habe meine Oma besucht.", exampleTranslation: "I visited my grandma." },
        { id: "vocab13-3-9", german: "verstanden", english: "understood (past participle)", malayalam: "മനസ്സിലായി", pronunciation: "fer-shtan-den", example: "Hast du alles verstanden?", exampleTranslation: "Did you understand everything?" },
        { id: "vocab13-3-10", german: "gefunden", english: "found (past participle)", malayalam: "കണ്ടെത്തി", pronunciation: "ge-fun-den", example: "Ich habe einen Job in Deutschland gefunden.", exampleTranslation: "I found a job in Germany." }
      ]
    },

    // ─── Lesson 13-4: Telling Stories — My Weekend ───────────────────
    {
      id: "13-4",
      title: "Telling Stories — My Weekend",
      titleGerman: "Mein Wochenende erzählen",
      description: "Put it all together! Tell a full story about your weekend using Perfekt, connectors, and time expressions. Oru full weekend story German-il parayaam!",
      duration: "60 min",
      xpReward: 160,
      videos: [
        {
          id: "v13-4-1",
          title: "Mein Wochenende - Weekend Stories in German",
          duration: "14:00",
          description: "Learn to narrate a full weekend story using the Perfekt tense, connecting words, and natural flow",
          scriptOutline: [
            "Opening: 'Now let's put everything together! Oru full weekend story parayaam — in German! Adipoli aakaam!'",
            "Setting the scene: Am Samstag... (On Saturday), Am Sonntag... (On Sunday)",
            "Full story example — a typical Malayali weekend in Germany:",
            "'Am Samstagmorgen bin ich um 9 Uhr aufgestanden.'",
            "'Zuerst habe ich gefrühstückt — Puttu und Kadala Curry natürlich!'",
            "'Dann bin ich in die Stadt gefahren und habe eingekauft.'",
            "'Am Nachmittag habe ich mit meiner Familie in Kerala telefoniert.'",
            "'Am Abend habe ich Biryani gekocht und einen Film gesehen.'",
            "'Am Sonntag bin ich zu Hause geblieben und habe Deutsch gelernt.'",
            "Connectors: zuerst (first), dann (then), danach (after that), später (later), am Ende (at the end), zum Schluss (finally)",
            "Vary your sentence structure! Don't start every sentence with 'Ich habe...'",
            "Time-first structure: 'Am Abend habe ich gekocht.' (verb in second position!)",
            "Connector-first: 'Danach bin ich spazieren gegangen.'",
            "Practice: Now YOU narrate YOUR weekend — use at least 6 sentences with mixed haben and sein verbs!"
          ],
          keyVocabulary: ["zuerst", "dann", "danach", "später", "zum Schluss", "am Ende", "aufgestanden", "gefrühstückt"],
          learningObjectives: [
            "Narrate a complete story in the Perfekt tense",
            "Use connecting words to create flowing narratives",
            "Combine haben and sein verbs naturally in stories"
          ],
          placeholderThumbnail: "/images/thumbnails/mein-wochenende.jpg"
        },
        {
          id: "v13-4-2",
          title: "Travel Stories & Life Events",
          duration: "12:00",
          description: "Tell stories about trips, life events, and experiences — from your journey to Germany to your Onam celebration!",
          scriptOutline: [
            "Opening: 'Beyond weekends — let's tell bigger stories! Nammude Germany journey, festivals, life events!'",
            "Travel story: 'Letztes Jahr bin ich nach Deutschland geflogen.'",
            "'Ich habe ein Visum bekommen und meinen Koffer gepackt.'",
            "'Am Flughafen habe ich mich von meiner Familie verabschiedet.'",
            "'In Deutschland habe ich meine Ausbildung begonnen.'",
            "Festival story: 'Wir haben Onam in Deutschland gefeiert!'",
            "'Ich habe Sadhya gekocht und meine Freunde eingeladen.'",
            "'Wir haben zusammen gegessen und getanzt.'",
            "Using 'und' and 'aber' to connect ideas: 'Ich habe gekocht und mein Freund hat aufgeräumt.'",
            "'Ich wollte ausgehen, aber es hat geregnet.' (wanted to go out, but it rained)",
            "weil + Perfekt: 'Ich bin zu Hause geblieben, weil es geregnet hat.' (verb goes to end!)",
            "Practice: Tell the story of your journey to Germany (or dream about it!)",
            "Tip: Don't be afraid to make mistakes — the more you tell stories, the more natural it becomes!"
          ],
          keyVocabulary: ["das Visum", "der Koffer", "sich verabschieden", "feiern", "einladen", "zusammen"],
          learningObjectives: [
            "Tell longer stories about trips and life events",
            "Connect sentences with und, aber, and weil",
            "Use Perfekt naturally in extended narratives"
          ],
          placeholderThumbnail: "/images/thumbnails/travel-stories.jpg"
        }
      ],
      exercises: [
        {
          id: "ex13-4-1",
          type: "ordering",
          question: "Put these weekend activities in a logical order:",
          options: ["Ich habe zu Abend gegessen.", "Ich bin aufgestanden.", "Ich habe gefrühstückt.", "Ich bin ins Bett gegangen."],
          correctAnswer: ["Ich bin aufgestanden.", "Ich habe gefrühstückt.", "Ich habe zu Abend gegessen.", "Ich bin ins Bett gegangen."],
          xpReward: 20
        },
        {
          id: "ex13-4-2",
          type: "fill-blank",
          question: "Complete: _____ habe ich gefrühstückt. _____ bin ich in die Stadt gefahren. (First... Then...)",
          options: ["Zuerst ... Dann", "Dann ... Zuerst", "Später ... Danach", "Am Ende ... Zuerst"],
          correctAnswer: "Zuerst ... Dann",
          explanation: "zuerst = first, dann = then. These are the most basic story connectors in German.",
          xpReward: 10
        },
        {
          id: "ex13-4-3",
          type: "multiple-choice",
          question: "Which sentence uses the Perfekt correctly?",
          options: ["Am Samstag bin ich aufgestanden.", "Am Samstag habe ich aufgestanden.", "Am Samstag bin ich aufstehen.", "Am Samstag ich aufgestanden bin."],
          correctAnswer: "Am Samstag bin ich aufgestanden.",
          explanation: "aufstehen is a movement verb → uses sein. With time expression first, verb comes second: 'bin ich aufgestanden'.",
          xpReward: 10
        },
        {
          id: "ex13-4-4",
          type: "matching",
          question: "Match the German connector to its English meaning:",
          options: ["zuerst", "dann", "danach", "zum Schluss", "später"],
          correctAnswer: ["first", "then", "after that", "finally", "later"],
          xpReward: 15
        },
        {
          id: "ex13-4-5",
          type: "multiple-choice",
          question: "What does 'Ich habe eingekauft' mean?",
          options: ["I went shopping", "I cooked", "I went out", "I cleaned up"],
          correctAnswer: "I went shopping",
          explanation: "einkaufen = to shop/go shopping. Ich habe eingekauft = I went shopping. (Note: einkaufen uses haben!)",
          xpReward: 10
        },
        {
          id: "ex13-4-6",
          type: "ordering",
          question: "Arrange the connectors from first to last in a story:",
          options: ["zum Schluss", "danach", "zuerst", "dann", "später"],
          correctAnswer: ["zuerst", "dann", "danach", "später", "zum Schluss"],
          xpReward: 15
        },
        {
          id: "ex13-4-7",
          type: "fill-blank",
          question: "Complete: Ich bin zu Hause geblieben, _____ es geregnet hat. (I stayed home because it rained.)",
          options: ["weil", "und", "aber", "dann"],
          correctAnswer: "weil",
          explanation: "'Weil' means 'because'. After weil, the conjugated verb goes to the END: '...weil es geregnet hat.'",
          xpReward: 10
        },
        {
          id: "ex13-4-8",
          type: "multiple-choice",
          question: "Which sentence has correct word order? 'On Sunday I stayed at home.'",
          options: ["Am Sonntag bin ich zu Hause geblieben.", "Am Sonntag ich bin zu Hause geblieben.", "Ich am Sonntag bin zu Hause geblieben.", "Am Sonntag zu Hause geblieben ich bin."],
          correctAnswer: "Am Sonntag bin ich zu Hause geblieben.",
          explanation: "When a time expression starts the sentence, the verb (bin) must come second, then the subject (ich).",
          xpReward: 10
        }
      ],
      vocabulary: [
        { id: "vocab13-4-1", german: "zuerst", english: "first / at first", malayalam: "ആദ്യം", pronunciation: "tsoo-airst", example: "Zuerst habe ich gefrühstückt.", exampleTranslation: "First I had breakfast." },
        { id: "vocab13-4-2", german: "dann", english: "then", malayalam: "പിന്നെ", pronunciation: "dahn", example: "Dann bin ich in die Stadt gefahren.", exampleTranslation: "Then I went to the city." },
        { id: "vocab13-4-3", german: "danach", english: "after that", malayalam: "അതിനു ശേഷം", pronunciation: "dah-nahkh", example: "Danach habe ich eingekauft.", exampleTranslation: "After that I went shopping." },
        { id: "vocab13-4-4", german: "später", english: "later", malayalam: "പിന്നീട്", pronunciation: "shpay-ter", example: "Später habe ich einen Film gesehen.", exampleTranslation: "Later I watched a film." },
        { id: "vocab13-4-5", german: "zum Schluss", english: "finally / in the end", malayalam: "ഒടുവിൽ", pronunciation: "tsum shluss", example: "Zum Schluss bin ich ins Bett gegangen.", exampleTranslation: "Finally I went to bed." },
        { id: "vocab13-4-6", german: "am Ende", english: "at the end", malayalam: "അവസാനം", pronunciation: "am en-de", example: "Am Ende war ich sehr müde.", exampleTranslation: "At the end I was very tired." },
        { id: "vocab13-4-7", german: "gefrühstückt", english: "had breakfast (past participle)", malayalam: "പ്രഭാതഭക്ഷണം കഴിച്ചു", pronunciation: "ge-fryh-shtyukt", example: "Ich habe um 8 Uhr gefrühstückt.", exampleTranslation: "I had breakfast at 8 o'clock." },
        { id: "vocab13-4-8", german: "eingekauft", english: "shopped (past participle)", malayalam: "സാധനങ്ങൾ വാങ്ങി", pronunciation: "ayn-ge-kowft", example: "Ich habe im Supermarkt eingekauft.", exampleTranslation: "I shopped at the supermarket." },
        { id: "vocab13-4-9", german: "weil", english: "because", malayalam: "കാരണം", pronunciation: "vyl", example: "Ich bin zu Hause geblieben, weil es geregnet hat.", exampleTranslation: "I stayed home because it rained." },
        { id: "vocab13-4-10", german: "zusammen", english: "together", malayalam: "ഒരുമിച്ച്", pronunciation: "tsoo-za-men", example: "Wir haben zusammen gekocht.", exampleTranslation: "We cooked together." }
      ]
    },

    // ─── Lesson 13-5: Time Expressions for the Past ──────────────────
    {
      id: "13-5",
      title: "Time Expressions for the Past",
      titleGerman: "Zeitausdrücke für die Vergangenheit",
      description: "Learn to say WHEN things happened — yesterday, last week, two days ago, and more! Past tense engane full power-il use cheyyaam ennariyo!",
      duration: "50 min",
      xpReward: 160,
      videos: [
        {
          id: "v13-5-1",
          title: "Gestern, letzte Woche, vor 2 Tagen...",
          duration: "14:00",
          description: "Master the time expressions that tell people WHEN something happened in the past — from yesterday to years ago",
          scriptOutline: [
            "Opening: 'You can say WHAT happened — now let's learn WHEN it happened! Timeline master aakaam!'",
            "gestern — yesterday: 'Gestern habe ich Deutsch gelernt.'",
            "vorgestern — day before yesterday: 'Vorgestern bin ich angekommen.' (Malayalis love this word — minnanjanna!)",
            "heute Morgen — this morning: 'Heute Morgen habe ich gefrühstückt.'",
            "letzte Woche — last week: 'Letzte Woche habe ich einen Test gemacht.'",
            "letztes Jahr — last year: 'Letztes Jahr bin ich nach Deutschland geflogen.'",
            "letzten Monat — last month: 'Letzten Monat habe ich einen Job gefunden.'",
            "Grammar note: letzte/letztes/letzten — the ending depends on gender! Woche (f) → letzte, Jahr (n) → letztes, Monat (m) → letzten",
            "The 'vor' + Dativ construction: vor zwei Tagen (2 days ago), vor einer Woche (a week ago)",
            "vor drei Monaten — three months ago: 'Ich bin vor drei Monaten nach Deutschland gekommen.'",
            "vor einem Jahr — a year ago: 'Vor einem Jahr habe ich angefangen, Deutsch zu lernen.'",
            "Word order: Time expression can go at the start OR in the middle",
            "'Ich habe gestern Deutsch gelernt.' = 'Gestern habe ich Deutsch gelernt.' (both correct!)",
            "Practice: Tell your partner 5 things using different time expressions — make a personal timeline!"
          ],
          keyVocabulary: ["gestern", "vorgestern", "letzte Woche", "letztes Jahr", "letzten Monat", "vor"],
          learningObjectives: [
            "Use gestern, vorgestern, and heute Morgen correctly",
            "Apply letzte/letztes/letzten with correct gender agreement",
            "Form 'ago' expressions using vor + Dativ"
          ],
          placeholderThumbnail: "/images/thumbnails/time-past.jpg"
        },
        {
          id: "v13-5-2",
          title: "Building a Personal Timeline",
          duration: "10:00",
          description: "Combine time expressions with Perfekt to tell your life story — from Kerala to Germany!",
          scriptOutline: [
            "Opening: 'Let's build YOUR personal timeline in German — nammude story parayaam!'",
            "Example Malayali timeline:",
            "'Vor 25 Jahren bin ich in Kerala geboren.' — I was born in Kerala 25 years ago.",
            "'Vor 5 Jahren habe ich mein Studium abgeschlossen.' — I finished my studies 5 years ago.",
            "'Vor 2 Jahren habe ich angefangen, Deutsch zu lernen.' — I started learning German 2 years ago.",
            "'Vor 6 Monaten habe ich mein B1-Zertifikat bekommen.' — I got my B1 certificate 6 months ago.",
            "'Letzten Monat bin ich nach Deutschland gekommen.' — I came to Germany last month.",
            "'Letzte Woche habe ich meine Ausbildung begonnen.' — I started my training last week.",
            "'Gestern habe ich meine ersten deutschen Freunde getroffen.' — Yesterday I met my first German friends.",
            "Mixing time expressions: Use different ones to create a natural flow",
            "seit + Dativ (since/for): 'Ich lerne seit zwei Jahren Deutsch.' — NOT Perfekt! seit uses present tense!",
            "Common mistake: 'Ich habe seit 2 Jahren Deutsch gelernt' — WRONG! Use: 'Ich lerne seit 2 Jahren Deutsch.'",
            "Practice: Write your own German timeline with at least 6 entries!"
          ],
          keyVocabulary: ["vor ... Jahren", "seit", "geboren", "abgeschlossen", "angefangen", "begonnen"],
          learningObjectives: [
            "Create a personal timeline using time expressions and Perfekt",
            "Distinguish between 'vor' (ago) and 'seit' (since/for)",
            "Combine multiple time expressions in a flowing narrative"
          ],
          placeholderThumbnail: "/images/thumbnails/personal-timeline.jpg"
        }
      ],
      exercises: [
        {
          id: "ex13-5-1",
          type: "multiple-choice",
          question: "How do you say 'two days ago' in German?",
          options: ["vor zwei Tagen", "zwei Tage vor", "seit zwei Tagen", "in zwei Tagen"],
          correctAnswer: "vor zwei Tagen",
          explanation: "'ago' = vor + time expression in Dativ. Tage → Tagen (Dativ plural).",
          xpReward: 10
        },
        {
          id: "ex13-5-2",
          type: "fill-blank",
          question: "Complete: _____ Woche habe ich eine Prüfung gemacht. (Last week...)",
          options: ["Letzte", "Letztes", "Letzten", "Letzter"],
          correctAnswer: "Letzte",
          explanation: "die Woche (feminine) → letzte Woche. The ending matches the gender of the noun.",
          xpReward: 10
        },
        {
          id: "ex13-5-3",
          type: "matching",
          question: "Match the German time expression to its English meaning:",
          options: ["gestern", "vorgestern", "letztes Jahr", "vor einer Woche", "heute Morgen"],
          correctAnswer: ["yesterday", "day before yesterday", "last year", "a week ago", "this morning"],
          xpReward: 15
        },
        {
          id: "ex13-5-4",
          type: "multiple-choice",
          question: "Which is correct for 'last month'?",
          options: ["letzten Monat", "letzte Monat", "letztes Monat", "letzter Monat"],
          correctAnswer: "letzten Monat",
          explanation: "der Monat (masculine) in a time expression (accusative) → letzten Monat.",
          xpReward: 10
        },
        {
          id: "ex13-5-5",
          type: "ordering",
          question: "Order from most recent to longest ago:",
          options: ["vor einem Jahr", "vorgestern", "gestern", "letzte Woche"],
          correctAnswer: ["gestern", "vorgestern", "letzte Woche", "vor einem Jahr"],
          xpReward: 20
        },
        {
          id: "ex13-5-6",
          type: "fill-blank",
          question: "Complete: Ich bin _____ drei Monaten nach Deutschland gekommen. (I came to Germany 3 months ago.)",
          options: ["vor", "seit", "in", "nach"],
          correctAnswer: "vor",
          explanation: "vor + Dativ = 'ago'. vor drei Monaten = three months ago.",
          xpReward: 10
        },
        {
          id: "ex13-5-7",
          type: "multiple-choice",
          question: "'Ich lerne seit zwei Jahren Deutsch.' — Why is this NOT in Perfekt?",
          options: ["'seit' (since/for) uses PRESENT tense because the action is still ongoing", "'seit' is always in past tense", "This sentence is wrong", "'lernen' can't be in Perfekt"],
          correctAnswer: "'seit' (since/for) uses PRESENT tense because the action is still ongoing",
          explanation: "seit + present tense = I have been doing something (and still am). 'Ich lerne seit 2 Jahren' = I've been learning for 2 years (and still am).",
          xpReward: 10
        },
        {
          id: "ex13-5-8",
          type: "ordering",
          question: "Put this Malayali timeline in chronological order:",
          options: ["Gestern habe ich meine Ausbildung begonnen.", "Vor einem Jahr habe ich Deutsch gelernt.", "Vor 5 Jahren habe ich mein Studium abgeschlossen.", "Letzte Woche bin ich nach Deutschland geflogen."],
          correctAnswer: ["Vor 5 Jahren habe ich mein Studium abgeschlossen.", "Vor einem Jahr habe ich Deutsch gelernt.", "Letzte Woche bin ich nach Deutschland geflogen.", "Gestern habe ich meine Ausbildung begonnen."],
          xpReward: 20
        }
      ],
      vocabulary: [
        { id: "vocab13-5-1", german: "gestern", english: "yesterday", malayalam: "ഇന്നലെ", pronunciation: "gess-tern", example: "Gestern bin ich spät aufgestanden.", exampleTranslation: "Yesterday I woke up late." },
        { id: "vocab13-5-2", german: "vorgestern", english: "day before yesterday", malayalam: "മിനിഞ്ഞാന്ന്", pronunciation: "for-gess-tern", example: "Vorgestern hat es geregnet.", exampleTranslation: "It rained the day before yesterday." },
        { id: "vocab13-5-3", german: "heute Morgen", english: "this morning", malayalam: "ഇന്ന് രാവിലെ", pronunciation: "hoy-te mor-gen", example: "Heute Morgen habe ich Chai getrunken.", exampleTranslation: "This morning I drank chai." },
        { id: "vocab13-5-4", german: "letzte Woche", english: "last week", malayalam: "കഴിഞ്ഞ ആഴ്ച", pronunciation: "lets-te vo-khe", example: "Letzte Woche habe ich viel gelernt.", exampleTranslation: "Last week I learned a lot." },
        { id: "vocab13-5-5", german: "letztes Jahr", english: "last year", malayalam: "കഴിഞ്ഞ വർഷം", pronunciation: "lets-tes yahr", example: "Letztes Jahr war ich in Kerala.", exampleTranslation: "Last year I was in Kerala." },
        { id: "vocab13-5-6", german: "letzten Monat", english: "last month", malayalam: "കഴിഞ്ഞ മാസം", pronunciation: "lets-ten mo-naht", example: "Letzten Monat habe ich einen Kurs besucht.", exampleTranslation: "Last month I attended a course." },
        { id: "vocab13-5-7", german: "vor zwei Tagen", english: "two days ago", malayalam: "രണ്ടു ദിവസം മുമ്പ്", pronunciation: "for tsvy tah-gen", example: "Vor zwei Tagen habe ich sie getroffen.", exampleTranslation: "I met her two days ago." },
        { id: "vocab13-5-8", german: "vor einer Woche", english: "a week ago", malayalam: "ഒരാഴ്ച മുമ്പ്", pronunciation: "for eye-ner vo-khe", example: "Vor einer Woche bin ich angekommen.", exampleTranslation: "I arrived a week ago." },
        { id: "vocab13-5-9", german: "vor drei Monaten", english: "three months ago", malayalam: "മൂന്ന് മാസം മുമ്പ്", pronunciation: "for dry mo-nah-ten", example: "Ich bin vor drei Monaten nach Deutschland gekommen.", exampleTranslation: "I came to Germany three months ago." },
        { id: "vocab13-5-10", german: "seit", english: "since / for (ongoing)", malayalam: "മുതൽ / ആയിട്ട്", pronunciation: "zyte", example: "Ich lerne seit einem Jahr Deutsch.", exampleTranslation: "I have been learning German for a year." }
      ]
    }
  ]
};
