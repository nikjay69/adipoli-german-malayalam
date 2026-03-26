import type { Module } from '../types';

export const MODULE_13: Module = {
  id: 13,
  title: "Talking About the Past",
  titleGerman: "Was hast du gemacht?",
  description: "Learn the Perfekt tense — tell stories about what you did, where you went, and what happened!",
  icon: "\u{1F4C5}",
  color: "#7c3aed",
  totalHours: 14,
  unlockRequirement: "Complete Module 12",
  learningTips: [
    "Perfekt tense: 80% of verbs use 'haben'. Movement verbs (gehen, fahren, kommen) use 'sein'.",
    "The past participle goes to the END: 'Ich HABE gestern Pizza GEGESSEN.'",
    "Tell someone what you did yesterday — in German. Every day. This is how fluency happens.",
  ],
  lessons: [
    {
      id: "13-1",
      title: "Perfekt Tense with haben",
      titleGerman: "Perfekt mit haben",
      description: "Master the most common past tense in German \u2014 the Perfekt with haben. Like saying 'I have done' in English!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v13-1-1",
          title: "The Past Tense - Perfekt with haben",
          duration: "10:00",
          description: "Learn the Perfekt tense structure using haben \u2014 the most common way to talk about the past in everyday German",
          scriptOutline: [
            "Opening: 'Ivide nammude past tense adventure thudangunnu! In German, talking about the past is easier than you think!'",
            "Structure: Subject + haben (conjugated) + ... + past participle (at the END!)",
            "Conjugation review: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben",
            "Think of it like a sandwich \u2014 haben is the bread at the start, participle is the bread at the end",
            "Example breakdown: 'Ich habe Deutsch gelernt' \u2014 I have learned German",
            "More examples with daily activities: kochen, spielen, machen",
            "Common mistake: Forgetting to put the participle at the end of the sentence",
            "Kerala connection: Like how Malayalam puts the verb at the end \u2014 German Perfekt does this too!",
            "Practice: Describe what you did today using haben + past participle"
          ],
          keyVocabulary: ["haben", "gemacht", "gespielt", "gelernt", "gekauft", "gekocht"],
          learningObjectives: ["Understand the Perfekt tense structure with haben", "Conjugate haben correctly for all persons", "Form sentences about past activities using haben"],
          placeholderThumbnail: "/images/thumbnails/perfekt-haben.jpg"
        },
        {
          id: "v13-1-2",
          title: "Regular Past Participles",
          duration: "10:00",
          description: "Learn the simple ge-...-t pattern for regular German verbs in the past tense",
          scriptOutline: [
            "Opening: 'Regular past participles \u2014 the easy ones! Just add ge- at the start and -t at the end!'",
            "The formula: ge- + verb stem + -t",
            "machen \u2192 gemacht, spielen \u2192 gespielt, lernen \u2192 gelernt",
            "kaufen \u2192 gekauft, kochen \u2192 gekocht",
            "Practice sentences: 'Ich habe gestern gekocht'",
            "Tip: Most regular verbs follow this pattern \u2014 learn it once, use it everywhere!"
          ],
          keyVocabulary: ["gemacht", "gespielt", "gelernt", "gekauft", "gekocht"],
          learningObjectives: ["Form regular past participles using the ge-...-t pattern", "Recognize regular verb patterns", "Create past tense sentences with regular verbs"],
          placeholderThumbnail: "/images/thumbnails/regular-participles.jpg"
        }
      ],
      exercises: [
        { id: "ex13-1-1", type: "multiple-choice", question: "What is the correct Perfekt form? 'Ich _____ Fu\u00dfball _____.'", options: ["habe ... gespielt", "bin ... gespielt", "habe ... spielen", "hat ... gespielt"], correctAnswer: "habe ... gespielt", explanation: "spielen uses haben in the Perfekt. 'Ich habe' (first person) + gespielt (past participle of spielen).", xpReward: 10 },
        { id: "ex13-1-2", type: "fill-blank", question: "Complete: Er _____ das Essen gekocht. (He cooked the food.)", options: ["hat", "habe", "haben", "ist"], correctAnswer: "hat", explanation: "'Er' (he) takes 'hat' as the conjugated form of haben.", xpReward: 10 },
        { id: "ex13-1-3", type: "multiple-choice", question: "What is the past participle of 'machen'?", options: ["gemacht", "gemachen", "gemakt", "machte"], correctAnswer: "gemacht", explanation: "Regular verbs follow ge- + stem + -t: mach \u2192 gemacht.", xpReward: 10 },
        { id: "ex13-1-4", type: "matching", question: "Match the verb to its past participle:", options: ["spielen", "lernen", "kaufen", "kochen"], correctAnswer: ["gespielt", "gelernt", "gekauft", "gekocht"], xpReward: 15 },
        { id: "ex13-1-5", type: "fill-blank", question: "Complete: Wir _____ gestern Deutsch _____. (We learned German yesterday.)", options: ["haben ... gelernt", "sind ... gelernt", "habt ... gelernt", "haben ... lernen"], correctAnswer: "haben ... gelernt", explanation: "'Wir' uses 'haben' and lernen is a regular haben-verb: gelernt.", xpReward: 10 },
        { id: "ex13-1-6", type: "ordering", question: "Put the words in the correct order to form a Perfekt sentence:", options: ["habe", "Ich", "gekauft", "ein Buch"], correctAnswer: ["Ich", "habe", "ein Buch", "gekauft"], xpReward: 20 },
        { id: "ex13-1-7", type: "multiple-choice", question: "Which conjugation of 'haben' goes with 'ihr'?", options: ["habt", "haben", "hast", "hat"], correctAnswer: "habt", explanation: "'Ihr' (you all) takes 'habt': Ihr habt gut gemacht!", xpReward: 10 },
        { id: "ex13-1-8", type: "fill-blank", question: "Complete: Du _____ sehr gut _____. (You cooked very well.)", options: ["hast ... gekocht", "hat ... gekocht", "haben ... gekocht", "habe ... gekocht"], correctAnswer: "hast ... gekocht", explanation: "'Du' (you, informal) takes 'hast'. kochen \u2192 gekocht (regular ge-...-t pattern).", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab13-1-1", german: "haben", english: "to have", malayalam: "\u0D09\u0D23\u0D4D\u0D1F\u0D3E\u0D2F\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15", pronunciation: "hah-ben", example: "Ich habe einen Hund.", exampleTranslation: "I have a dog." },
        { id: "vocab13-1-2", german: "gemacht", english: "done / made (past participle)", malayalam: "\u0D1A\u0D46\u0D2F\u0D4D\u0D24\u0D41", pronunciation: "ge-makht", example: "Ich habe meine Hausaufgaben gemacht.", exampleTranslation: "I did my homework." },
        { id: "vocab13-1-3", german: "gespielt", english: "played (past participle)", malayalam: "\u0D15\u0D33\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-shpeelt", example: "Er hat Fu\u00dfball gespielt.", exampleTranslation: "He played football." },
        { id: "vocab13-1-4", german: "gelernt", english: "learned (past participle)", malayalam: "\u0D2A\u0D20\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-lairnt", example: "Ich habe Deutsch gelernt.", exampleTranslation: "I learned German." },
        { id: "vocab13-1-5", german: "gekauft", english: "bought (past participle)", malayalam: "\u0D35\u0D3E\u0D19\u0D4D\u0D19\u0D3F", pronunciation: "ge-kowft", example: "Sie hat ein Kleid gekauft.", exampleTranslation: "She bought a dress." },
        { id: "vocab13-1-6", german: "gekocht", english: "cooked (past participle)", malayalam: "\u0D2A\u0D3E\u0D1A\u0D15\u0D02 \u0D1A\u0D46\u0D2F\u0D4D\u0D24\u0D41", pronunciation: "ge-kokht", example: "Wir haben Curry gekocht.", exampleTranslation: "We cooked curry." },
        { id: "vocab13-1-7", german: "gestern", english: "yesterday", malayalam: "\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46", pronunciation: "gess-tern", example: "Ich habe gestern gelernt.", exampleTranslation: "I studied yesterday." },
        { id: "vocab13-1-8", german: "das Perfekt", english: "the perfect tense (past)", malayalam: "\u0D2D\u0D42\u0D24\u0D15\u0D3E\u0D32\u0D02 (\u0D2A\u0D46\u0D7C\u0D2B\u0D46\u0D15\u0D4D\u0D1F\u0D4D)", pronunciation: "pair-fekt", example: "Im Perfekt sagt man: Ich habe gemacht.", exampleTranslation: "In the Perfekt you say: I have done." },
        { id: "vocab13-1-9", german: "gearbeitet", english: "worked (past participle)", malayalam: "\u0D1C\u0D4B\u0D32\u0D3F \u0D1A\u0D46\u0D2F\u0D4D\u0D24\u0D41", pronunciation: "ge-ar-by-tet", example: "Er hat den ganzen Tag gearbeitet.", exampleTranslation: "He worked the whole day." },
        { id: "vocab13-1-10", german: "geh\u00f6rt", english: "heard / listened (past participle)", malayalam: "\u0D15\u0D47\u0D1F\u0D4D\u0D1F\u0D41", pronunciation: "ge-h\u00f6rt", example: "Ich habe Musik geh\u00f6rt.", exampleTranslation: "I listened to music." }
      ]
    },
    {
      id: "13-2",
      title: "Perfekt Tense with sein",
      titleGerman: "Perfekt mit sein",
      description: "Some verbs use 'sein' instead of 'haben' in the past tense \u2014 mostly verbs about moving or changing!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        { id: "v13-2-1", title: "Movement & Change = sein!", duration: "10:00", description: "Discover why certain German verbs use sein instead of haben in the Perfekt tense", scriptOutline: ["Opening: 'Not all verbs use haben \u2014 some need sein!'", "The rule: Movement from A to B or change of state = sein", "sein conjugation: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind", "Movement verbs: gehen, fahren, fliegen, kommen, laufen", "Change of state: werden, sterben, aufwachen", "Common mistake: 'Ich habe gegangen' is WRONG!"], keyVocabulary: ["sein", "gegangen", "gefahren", "geflogen", "gekommen"], learningObjectives: ["Understand why some verbs use sein", "Identify movement and change-of-state verbs", "Form correct Perfekt sentences with sein"], placeholderThumbnail: "/images/thumbnails/perfekt-sein.jpg" },
        { id: "v13-2-2", title: "Common sein-Verbs", duration: "10:00", description: "Master the most frequently used verbs that take sein in the Perfekt", scriptOutline: ["gehen \u2192 gegangen, fahren \u2192 gefahren, fliegen \u2192 geflogen", "kommen \u2192 gekommen, laufen \u2192 gelaufen", "Special: sein \u2192 gewesen, werden \u2192 geworden, bleiben \u2192 geblieben", "bleiben uses sein even without movement!"], keyVocabulary: ["gegangen", "gefahren", "geflogen", "gekommen", "gelaufen", "gewesen", "geworden", "geblieben"], learningObjectives: ["Know the most common sein-verbs", "Use sein-verbs correctly in sentences", "Remember special cases like bleiben"], placeholderThumbnail: "/images/thumbnails/sein-verbs.jpg" }
      ],
      exercises: [
        { id: "ex13-2-1", type: "multiple-choice", question: "Which is correct? 'Ich _____ nach Berlin _____.'", options: ["bin ... gefahren", "habe ... gefahren", "bin ... gefahrt", "habe ... gefahrt"], correctAnswer: "bin ... gefahren", explanation: "fahren is a movement verb \u2192 uses sein. Past participle: gefahren (irregular).", xpReward: 10 },
        { id: "ex13-2-2", type: "fill-blank", question: "Complete: Sie _____ nach Hause gegangen. (She went home.)", options: ["ist", "hat", "sind", "haben"], correctAnswer: "ist", explanation: "gehen is a movement verb and takes sein. 'Sie' (she) \u2192 'ist'.", xpReward: 10 },
        { id: "ex13-2-3", type: "matching", question: "Match the verb to its past participle:", options: ["gehen", "fliegen", "kommen", "bleiben"], correctAnswer: ["gegangen", "geflogen", "gekommen", "geblieben"], xpReward: 15 },
        { id: "ex13-2-4", type: "multiple-choice", question: "Why does 'bleiben' use sein even though there's no movement?", options: ["It indicates a state of being (like sein itself)", "It uses haben, not sein", "It's a reflexive verb", "It's a separable verb"], correctAnswer: "It indicates a state of being (like sein itself)", explanation: "bleiben (to stay/remain) uses sein because, like sein itself, it describes a state of being rather than an action. Verbs of movement AND state (sein, bleiben, werden) all take sein in the Perfekt.", xpReward: 10 },
        { id: "ex13-2-5", type: "ordering", question: "Put the words in the correct order:", options: ["geflogen", "Wir", "nach Indien", "sind"], correctAnswer: ["Wir", "sind", "nach Indien", "geflogen"], xpReward: 20 },
        { id: "ex13-2-6", type: "multiple-choice", question: "Which verb does NOT use sein in the Perfekt?", options: ["kochen", "gehen", "fahren", "fliegen"], correctAnswer: "kochen", explanation: "kochen (to cook) is not a movement/change verb, so it uses haben.", xpReward: 10 },
        { id: "ex13-2-7", type: "fill-blank", question: "Complete: Er _____ krank geworden. (He became sick.)", options: ["ist", "hat", "bin", "sind"], correctAnswer: "ist", explanation: "werden (to become) is a change-of-state verb \u2192 uses sein. 'Er' \u2192 'ist'.", xpReward: 10 },
        { id: "ex13-2-8", type: "fill-blank", question: "Complete: Wir _____ letztes Jahr in Kerala _____. (We were in Kerala last year.)", options: ["sind ... gewesen", "haben ... gewesen", "sind ... gesein", "haben ... gesein"], correctAnswer: "sind ... gewesen", explanation: "sein \u2192 gewesen (been). The verb sein itself uses sein in the Perfekt.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab13-2-1", german: "gegangen", english: "gone / walked (past participle)", malayalam: "\u0D2A\u0D4B\u0D2F\u0D3F", pronunciation: "ge-gang-en", example: "Ich bin ins Kino gegangen.", exampleTranslation: "I went to the cinema." },
        { id: "vocab13-2-2", german: "gefahren", english: "driven / traveled (past participle)", malayalam: "\u0D2F\u0D3E\u0D24\u0D4D\u0D30 \u0D1A\u0D46\u0D2F\u0D4D\u0D24\u0D41", pronunciation: "ge-fah-ren", example: "Sie ist nach Hamburg gefahren.", exampleTranslation: "She drove to Hamburg." },
        { id: "vocab13-2-3", german: "geflogen", english: "flown (past participle)", malayalam: "\u0D2A\u0D31\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ge-flo-gen", example: "Wir sind nach Kerala geflogen.", exampleTranslation: "We flew to Kerala." },
        { id: "vocab13-2-4", german: "gekommen", english: "come (past participle)", malayalam: "\u0D35\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ge-ko-men", example: "Er ist gestern gekommen.", exampleTranslation: "He came yesterday." },
        { id: "vocab13-2-5", german: "gelaufen", english: "run / walked (past participle)", malayalam: "\u0D13\u0D1F\u0D3F / \u0D28\u0D1F\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ge-low-fen", example: "Ich bin zum Supermarkt gelaufen.", exampleTranslation: "I walked to the supermarket." },
        { id: "vocab13-2-6", german: "gewesen", english: "been (past participle of sein)", malayalam: "\u0D06\u0D2F\u0D3F\u0D30\u0D41\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ge-vay-zen", example: "Ich bin in Deutschland gewesen.", exampleTranslation: "I have been in Germany." },
        { id: "vocab13-2-7", german: "geworden", english: "become (past participle)", malayalam: "\u0D06\u0D2F\u0D3F\u0D24\u0D4D\u0D24\u0D40\u0D7C\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ge-vor-den", example: "Es ist kalt geworden.", exampleTranslation: "It has become cold." },
        { id: "vocab13-2-8", german: "geblieben", english: "stayed (past participle)", malayalam: "\u0D24\u0D19\u0D4D\u0D19\u0D3F", pronunciation: "ge-blee-ben", example: "Ich bin zu Hause geblieben.", exampleTranslation: "I stayed at home." },
        { id: "vocab13-2-9", german: "aufgestanden", english: "got up (past participle)", malayalam: "\u0D0E\u0D34\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D31\u0D4D\u0D31\u0D41", pronunciation: "owf-ge-shtan-den", example: "Ich bin um 7 Uhr aufgestanden.", exampleTranslation: "I got up at 7 o'clock." },
        { id: "vocab13-2-10", german: "angekommen", english: "arrived (past participle)", malayalam: "\u0D0E\u0D24\u0D4D\u0D24\u0D3F\u0D1A\u0D4D\u0D1A\u0D47\u0D7C\u0D28\u0D4D\u0D28\u0D41", pronunciation: "ahn-ge-ko-men", example: "Der Zug ist p\u00fcnktlich angekommen.", exampleTranslation: "The train arrived on time." }
      ]
    },
    {
      id: "13-3",
      title: "Irregular Past Participles",
      titleGerman: "Unregelm\u00e4\u00dfige Partizipien",
      description: "Tackle the tricky irregular verbs \u2014 they change their stem, but once you learn the patterns, they're not so scary!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        { id: "v13-3-1", title: "The Irregular Ones - ge-...-en", duration: "10:00", description: "Learn the ge-...-en pattern for irregular past participles", scriptOutline: ["Irregular pattern: ge- + CHANGED STEM + -en", "essen \u2192 gegessen, trinken \u2192 getrunken", "schreiben \u2192 geschrieben, lesen \u2192 gelesen", "sehen \u2192 gesehen, nehmen \u2192 genommen, sprechen \u2192 gesprochen"], keyVocabulary: ["gegessen", "getrunken", "geschrieben", "gelesen", "gesehen", "genommen", "gesprochen"], learningObjectives: ["Recognize the ge-...-en pattern", "Know common irregular past participles", "Use them in sentences"], placeholderThumbnail: "/images/thumbnails/irregular-participles.jpg" },
        { id: "v13-3-2", title: "Most Common Irregular Verbs", duration: "10:00", description: "Special rules \u2014 verbs with no ge- prefix and -ieren verbs", scriptOutline: ["Inseparable prefixes: be-, er-, ver-, ent- \u2192 NO ge-!", "besuchen \u2192 besucht, verstehen \u2192 verstanden", "-ieren verbs: telefonieren \u2192 telefoniert, studieren \u2192 studiert"], keyVocabulary: ["besucht", "verstanden", "erz\u00e4hlt", "telefoniert", "studiert"], learningObjectives: ["Know which verbs don't take ge-", "Form past participles for inseparable prefix verbs", "Handle -ieren verbs"], placeholderThumbnail: "/images/thumbnails/no-ge-verbs.jpg" }
      ],
      exercises: [
        { id: "ex13-3-1", type: "multiple-choice", question: "What is the past participle of 'essen'?", options: ["gegessen", "geesst", "geessen", "esst"], correctAnswer: "gegessen", explanation: "essen is irregular: ge- + gess + -en \u2192 gegessen.", xpReward: 10 },
        { id: "ex13-3-2", type: "matching", question: "Match the verb to its past participle:", options: ["trinken", "schreiben", "lesen", "sehen", "sprechen"], correctAnswer: ["getrunken", "geschrieben", "gelesen", "gesehen", "gesprochen"], xpReward: 15 },
        { id: "ex13-3-3", type: "fill-blank", question: "Complete: Hast du das Buch _____? (Have you read the book?)", options: ["gelesen", "gelest", "gelesent", "lesen"], correctAnswer: "gelesen", explanation: "lesen \u2192 gelesen (irregular past participle).", xpReward: 10 },
        { id: "ex13-3-4", type: "multiple-choice", question: "Why does 'besuchen' become 'besucht' and NOT 'gebesucht'?", options: ["Verbs with be- prefix don't take ge-", "It's a regular verb", "besuchen uses sein", "It's a separable verb"], correctAnswer: "Verbs with be- prefix don't take ge-", explanation: "Inseparable prefixes (be-, er-, ver-, ent-) replace the ge- prefix.", xpReward: 10 },
        { id: "ex13-3-5", type: "fill-blank", question: "Complete: Sie hat gestern _____. (She called yesterday.) [telefonieren]", options: ["telefoniert", "getelefoniert", "telefonieren", "telefonierte"], correctAnswer: "telefoniert", explanation: "-ieren verbs don't take ge-: telefonieren \u2192 telefoniert.", xpReward: 10 },
        { id: "ex13-3-6", type: "multiple-choice", question: "What is the past participle of 'verstehen'?", options: ["verstanden", "geverstanden", "versteht", "gevestanden"], correctAnswer: "verstanden", explanation: "verstehen has inseparable prefix ver-, so no ge-. Also irregular: verstanden.", xpReward: 10 },
        { id: "ex13-3-7", type: "ordering", question: "Put the words in the correct order:", options: ["genommen", "Er", "den Bus", "hat"], correctAnswer: ["Er", "hat", "den Bus", "genommen"], xpReward: 20 },
        { id: "ex13-3-8", type: "multiple-choice", question: "Which verb does NOT take ge- in the past participle?", options: ["studieren", "spielen", "kochen", "machen"], correctAnswer: "studieren", explanation: "studieren ends in -ieren, so it becomes studiert (no ge-).", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab13-3-1", german: "gegessen", english: "eaten (past participle)", malayalam: "\u0D15\u0D34\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-gess-en", example: "Ich habe Biryani gegessen.", exampleTranslation: "I ate Biryani." },
        { id: "vocab13-3-2", german: "getrunken", english: "drunk (past participle)", malayalam: "\u0D15\u0D41\u0D1F\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-trunk-en", example: "Er hat Kaffee getrunken.", exampleTranslation: "He drank coffee." },
        { id: "vocab13-3-3", german: "geschrieben", english: "written (past participle)", malayalam: "\u0D0E\u0D34\u0D41\u0D24\u0D3F", pronunciation: "ge-shree-ben", example: "Sie hat einen Brief geschrieben.", exampleTranslation: "She wrote a letter." },
        { id: "vocab13-3-4", german: "gelesen", english: "read (past participle)", malayalam: "\u0D35\u0D3E\u0D2F\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-lay-zen", example: "Hast du das Buch gelesen?", exampleTranslation: "Have you read the book?" },
        { id: "vocab13-3-5", german: "gesehen", english: "seen (past participle)", malayalam: "\u0D15\u0D23\u0D4D\u0D1F\u0D41", pronunciation: "ge-zay-en", example: "Wir haben einen Film gesehen.", exampleTranslation: "We watched a film." },
        { id: "vocab13-3-6", german: "genommen", english: "taken (past participle)", malayalam: "\u0D0E\u0D1F\u0D41\u0D24\u0D4D\u0D24\u0D41", pronunciation: "ge-no-men", example: "Ich habe den Bus genommen.", exampleTranslation: "I took the bus." },
        { id: "vocab13-3-7", german: "gesprochen", english: "spoken (past participle)", malayalam: "\u0D38\u0D02\u0D38\u0D3E\u0D30\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-shpro-khen", example: "Wir haben Deutsch gesprochen.", exampleTranslation: "We spoke German." },
        { id: "vocab13-3-8", german: "besucht", english: "visited (past participle)", malayalam: "\u0D38\u0D28\u0D4D\u0D26\u0D7C\u0D36\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "be-zookht", example: "Ich habe meine Oma besucht.", exampleTranslation: "I visited my grandma." },
        { id: "vocab13-3-9", german: "verstanden", english: "understood (past participle)", malayalam: "\u0D2E\u0D28\u0D38\u0D4D\u0D38\u0D3F\u0D32\u0D3E\u0D2F\u0D3F", pronunciation: "fer-shtan-den", example: "Hast du alles verstanden?", exampleTranslation: "Did you understand everything?" },
        { id: "vocab13-3-10", german: "telefoniert", english: "called / phoned (past participle)", malayalam: "\u0D2B\u0D4B\u0D7A \u0D1A\u0D46\u0D2F\u0D4D\u0D24\u0D41", pronunciation: "te-le-fo-neert", example: "Sie hat mit ihrer Mutter telefoniert.", exampleTranslation: "She called her mother." }
      ]
    },
    {
      id: "13-4",
      title: "Telling Stories \u2014 My Weekend",
      titleGerman: "Mein Wochenende",
      description: "Put it all together! Tell a full story about your weekend using Perfekt, connectors, and time expressions.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        { id: "v13-4-1", title: "Mein Wochenende - Telling Stories in German", duration: "10:00", description: "Learn to narrate a full weekend story using the Perfekt tense and connecting words", scriptOutline: ["Connectors: zuerst (first), dann (then), danach (after that), sp\u00e4ter (later), zum Schluss (finally)", "Full story example using connectors", "Tips for flowing stories: Mix up word order!"], keyVocabulary: ["zuerst", "dann", "danach", "sp\u00e4ter", "zum Schluss", "am Ende", "aufgestanden", "gefr\u00fchst\u00fcckt", "eingekauft"], learningObjectives: ["Narrate a complete story in the Perfekt tense", "Use connecting words to create flowing narratives", "Combine haben and sein verbs naturally"], placeholderThumbnail: "/images/thumbnails/mein-wochenende.jpg" }
      ],
      exercises: [
        { id: "ex13-4-1", type: "ordering", question: "Put these weekend activities in a logical order:", options: ["Ich habe zu Abend gegessen.", "Ich bin aufgestanden.", "Ich habe gefr\u00fchst\u00fcckt.", "Ich bin ins Bett gegangen."], correctAnswer: ["Ich bin aufgestanden.", "Ich habe gefr\u00fchst\u00fcckt.", "Ich habe zu Abend gegessen.", "Ich bin ins Bett gegangen."], xpReward: 20 },
        { id: "ex13-4-2", type: "fill-blank", question: "Complete: _____ habe ich gefr\u00fchst\u00fcckt. _____ bin ich in die Stadt gefahren. (First... Then...)", options: ["Zuerst ... Dann", "Dann ... Zuerst", "Sp\u00e4ter ... Danach", "Am Ende ... Zuerst"], correctAnswer: "Zuerst ... Dann", explanation: "zuerst = first, dann = then. The most basic story connectors.", xpReward: 10 },
        { id: "ex13-4-3", type: "multiple-choice", question: "Which sentence uses the Perfekt correctly?", options: ["Am Samstag bin ich aufgestanden.", "Am Samstag habe ich aufgestanden.", "Am Samstag bin ich aufstehen.", "Am Samstag ich aufgestanden bin."], correctAnswer: "Am Samstag bin ich aufgestanden.", explanation: "aufstehen (to get up) indicates a change of state/position \u2192 uses sein. With a time expression first, the conjugated verb stays in second position.", xpReward: 10 },
        { id: "ex13-4-4", type: "matching", question: "Match the German connector to its English meaning:", options: ["zuerst", "dann", "danach", "zum Schluss"], correctAnswer: ["first", "then", "after that", "finally"], xpReward: 15 },
        { id: "ex13-4-5", type: "multiple-choice", question: "What does 'Ich habe eingekauft' mean?", options: ["I went shopping", "I cooked", "I went out", "I cleaned up"], correctAnswer: "I went shopping", explanation: "einkaufen = to shop. Ich habe eingekauft = I went shopping.", xpReward: 10 },
        { id: "ex13-4-6", type: "ordering", question: "Arrange the connectors from first to last:", options: ["zum Schluss", "danach", "zuerst", "dann"], correctAnswer: ["zuerst", "dann", "danach", "zum Schluss"], xpReward: 15 },
        { id: "ex13-4-7", type: "fill-blank", question: "Complete: Am Sonntag _____ ich lange _____. (On Sunday I slept in.)", options: ["habe ... geschlafen", "bin ... geschlafen", "habe ... schlafen", "bin ... geschlaft"], correctAnswer: "habe ... geschlafen", explanation: "schlafen uses haben (no movement). schlafen \u2192 geschlafen (irregular).", xpReward: 10 },
        { id: "ex13-4-8", type: "ordering", question: "Build a weekend story \u2014 put in logical order:", options: ["Danach habe ich einen Film gesehen.", "Zuerst bin ich joggen gegangen.", "Sp\u00e4ter habe ich zu Abend gegessen.", "Dann habe ich geduscht und gefr\u00fchst\u00fcckt."], correctAnswer: ["Zuerst bin ich joggen gegangen.", "Dann habe ich geduscht und gefr\u00fchst\u00fcckt.", "Danach habe ich einen Film gesehen.", "Sp\u00e4ter habe ich zu Abend gegessen."], xpReward: 20 }
      ],
      vocabulary: [
        { id: "vocab13-4-1", german: "zuerst", english: "first / at first", malayalam: "\u0D06\u0D26\u0D4D\u0D2F\u0D02", pronunciation: "tsoo-airst", example: "Zuerst habe ich gefr\u00fchst\u00fcckt.", exampleTranslation: "First I had breakfast." },
        { id: "vocab13-4-2", german: "dann", english: "then", malayalam: "\u0D2A\u0D3F\u0D28\u0D4D\u0D28\u0D46", pronunciation: "dahn", example: "Dann bin ich in die Stadt gefahren.", exampleTranslation: "Then I went to the city." },
        { id: "vocab13-4-3", german: "danach", english: "after that", malayalam: "\u0D05\u0D24\u0D3F\u0D28\u0D41 \u0D36\u0D47\u0D37\u0D02", pronunciation: "dah-nahkh", example: "Danach habe ich eingekauft.", exampleTranslation: "After that I went shopping." },
        { id: "vocab13-4-4", german: "sp\u00e4ter", english: "later", malayalam: "\u0D2A\u0D3F\u0D28\u0D4D\u0D28\u0D40\u0D1F\u0D4D", pronunciation: "shpay-ter", example: "Sp\u00e4ter habe ich einen Film gesehen.", exampleTranslation: "Later I watched a film." },
        { id: "vocab13-4-5", german: "zum Schluss", english: "finally / in the end", malayalam: "\u0D12\u0D1F\u0D41\u0D35\u0D3F\u0D7D", pronunciation: "tsum shluss", example: "Zum Schluss bin ich ins Bett gegangen.", exampleTranslation: "Finally I went to bed." },
        { id: "vocab13-4-6", german: "am Ende", english: "at the end", malayalam: "\u0D05\u0D35\u0D38\u0D3E\u0D28\u0D02", pronunciation: "am en-de", example: "Am Ende war ich sehr m\u00fcde.", exampleTranslation: "At the end I was very tired." },
        { id: "vocab13-4-7", german: "gefr\u00fchst\u00fcckt", english: "had breakfast (past participle)", malayalam: "\u0D2A\u0D4D\u0D30\u0D3E\u0D24\u0D7D \u0D15\u0D34\u0D3F\u0D1A\u0D4D\u0D1A\u0D41", pronunciation: "ge-fr\u00fc-sht\u00fckt", example: "Ich habe um 8 Uhr gefr\u00fchst\u00fcckt.", exampleTranslation: "I had breakfast at 8 o'clock." },
        { id: "vocab13-4-8", german: "eingekauft", english: "shopped (past participle)", malayalam: "\u0D38\u0D3E\u0D27\u0D28\u0D19\u0D4D\u0D19\u0D7E \u0D35\u0D3E\u0D19\u0D4D\u0D19\u0D3F", pronunciation: "ayn-ge-kowft", example: "Wir haben im Supermarkt eingekauft.", exampleTranslation: "We shopped at the supermarket." },
        { id: "vocab13-4-9", german: "aufgestanden", english: "got up (past participle)", malayalam: "\u0D0E\u0D34\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D31\u0D4D\u0D31\u0D41", pronunciation: "owf-ge-shtan-den", example: "Ich bin fr\u00fch aufgestanden.", exampleTranslation: "I got up early." },
        { id: "vocab13-4-10", german: "geschlafen", english: "slept (past participle)", malayalam: "\u0D09\u0D31\u0D19\u0D4D\u0D19\u0D3F", pronunciation: "ge-shlah-fen", example: "Ich habe gut geschlafen.", exampleTranslation: "I slept well." }
      ]
    },
    {
      id: "13-5",
      title: "Time Expressions for the Past",
      titleGerman: "Zeitausdr\u00fccke f\u00fcr die Vergangenheit",
      description: "Learn to say when things happened \u2014 yesterday, last week, two days ago, and more!",
      duration: "45 min",
      xpReward: 150,
      videos: [
        { id: "v13-5-1", title: "Gestern, letzte Woche, vor 2 Tagen...", duration: "10:00", description: "Master the time expressions that tell people WHEN something happened", scriptOutline: ["Introduction: Time words are your storytelling tools — without them, everything is just 'sometime'!", "gestern (yesterday) and vorgestern (day before yesterday)", "letzte Woche, letztes Jahr, letzten Monat — gender matters! die Woche = letzte, das Jahr = letztes, der Monat = letzten", "vor + Dativ: vor zwei Tagen, vor einer Woche, vor drei Monaten — the 'ago' structure", "seit vs vor: seit = since/for (still ongoing), vor = ago (completed)", "Time expressions go at the start OR after the verb: 'Gestern habe ich gekocht' or 'Ich habe gestern gekocht'", "Practice: Narrate your last weekend using time expressions", "Common mistake: Don't say 'letzte Jahr' — it's 'letztes Jahr' (das Jahr = neuter!)"], keyVocabulary: ["gestern", "vorgestern", "letzte Woche", "letztes Jahr", "letzten Monat", "vor"], learningObjectives: ["Use gestern, vorgestern, and letzte/letztes/letzten correctly", "Form 'ago' expressions using vor + Dativ", "Place time expressions correctly in German sentences"], placeholderThumbnail: "/images/thumbnails/time-past.jpg" }
      ],
      exercises: [
        { id: "ex13-5-1", type: "multiple-choice", question: "How do you say 'two days ago' in German?", options: ["vor zwei Tagen", "zwei Tage vor", "seit zwei Tagen", "in zwei Tagen"], correctAnswer: "vor zwei Tagen", explanation: "'ago' = vor + Dativ. Tage \u2192 Tagen (Dativ plural).", xpReward: 10 },
        { id: "ex13-5-2", type: "fill-blank", question: "Complete: _____ Woche habe ich eine Pr\u00fcfung gemacht. (Last week...)", options: ["Letzte", "Letztes", "Letzten", "Letzer"], correctAnswer: "Letzte", explanation: "die Woche (feminine) \u2192 letzte Woche.", xpReward: 10 },
        { id: "ex13-5-3", type: "matching", question: "Match the German time expression to its English meaning:", options: ["gestern", "vorgestern", "letztes Jahr", "vor einer Woche"], correctAnswer: ["yesterday", "day before yesterday", "last year", "a week ago"], xpReward: 15 },
        { id: "ex13-5-4", type: "multiple-choice", question: "Which is correct for 'last month'?", options: ["letzten Monat", "letzte Monat", "letztes Monat", "letzter Monat"], correctAnswer: "letzten Monat", explanation: "der Monat (masculine) in accusative of time \u2192 letzten Monat.", xpReward: 10 },
        { id: "ex13-5-5", type: "ordering", question: "Order from most recent to longest ago:", options: ["vor einem Jahr", "vorgestern", "gestern", "letzte Woche"], correctAnswer: ["gestern", "vorgestern", "letzte Woche", "vor einem Jahr"], xpReward: 20 },
        { id: "ex13-5-6", type: "fill-blank", question: "Complete: Ich bin _____ drei Monaten nach Deutschland gekommen. (3 months ago)", options: ["vor", "seit", "in", "nach"], correctAnswer: "vor", explanation: "vor + Dativ = 'ago'. vor drei Monaten = three months ago.", xpReward: 10 },
        { id: "ex13-5-7", type: "fill-blank", question: "Complete: _____ Jahr bin ich nach Deutschland geflogen. (Last year...)", options: ["Letztes", "Letzte", "Letzten", "Letzter"], correctAnswer: "Letztes", explanation: "das Jahr (neuter) \u2192 letztes Jahr.", xpReward: 10 },
        { id: "ex13-5-8", type: "multiple-choice", question: "Translate: 'Vor einer Stunde habe ich gegessen.'", options: ["I ate an hour ago.", "I ate for one hour.", "I will eat in an hour.", "I have been eating since one hour."], correctAnswer: "I ate an hour ago.", explanation: "'Vor einer Stunde' = an hour ago. vor + Dativ = ago.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab13-5-1", german: "gestern", english: "yesterday", malayalam: "\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46", pronunciation: "gess-tern", example: "Gestern bin ich sp\u00e4t aufgestanden.", exampleTranslation: "Yesterday I woke up late." },
        { id: "vocab13-5-2", german: "vorgestern", english: "day before yesterday", malayalam: "\u0D2E\u0D3F\u0D28\u0D3F\u0D1E\u0D4D\u0D1E\u0D3E\u0D28\u0D4D\u0D28\u0D4D", pronunciation: "for-gess-tern", example: "Vorgestern hat es geregnet.", exampleTranslation: "It rained the day before yesterday." },
        { id: "vocab13-5-3", german: "letzte Woche", english: "last week", malayalam: "\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E \u0D06\u0D34\u0D4D\u0D1A", pronunciation: "lets-te vo-khe", example: "Letzte Woche habe ich viel gelernt.", exampleTranslation: "Last week I learned a lot." },
        { id: "vocab13-5-4", german: "letztes Jahr", english: "last year", malayalam: "\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E \u0D35\u0D7C\u0D37\u0D02", pronunciation: "lets-tes yahr", example: "Letztes Jahr war ich in Kerala.", exampleTranslation: "Last year I was in Kerala." },
        { id: "vocab13-5-5", german: "letzten Monat", english: "last month", malayalam: "\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E \u0D2E\u0D3E\u0D38\u0D02", pronunciation: "lets-ten mo-naht", example: "Letzten Monat habe ich einen Kurs besucht.", exampleTranslation: "Last month I attended a course." },
        { id: "vocab13-5-6", german: "vor zwei Tagen", english: "two days ago", malayalam: "\u0D30\u0D23\u0D4D\u0D1F\u0D41 \u0D26\u0D3F\u0D35\u0D38\u0D02 \u0D2E\u0D41\u0D2E\u0D4D\u0D2A\u0D4D", pronunciation: "for tsvy tah-gen", example: "Vor zwei Tagen habe ich sie gesehen.", exampleTranslation: "I saw her two days ago." },
        { id: "vocab13-5-7", german: "vor einer Woche", english: "a week ago", malayalam: "\u0D12\u0D30\u0D3E\u0D34\u0D4D\u0D1A \u0D2E\u0D41\u0D2E\u0D4D\u0D2A\u0D4D", pronunciation: "for eye-ner vo-khe", example: "Vor einer Woche bin ich angekommen.", exampleTranslation: "I arrived a week ago." },
        { id: "vocab13-5-8", german: "vor drei Monaten", english: "three months ago", malayalam: "\u0D2E\u0D42\u0D28\u0D4D\u0D28\u0D4D \u0D2E\u0D3E\u0D38\u0D02 \u0D2E\u0D41\u0D2E\u0D4D\u0D2A\u0D4D", pronunciation: "for dry mo-nah-ten", example: "Ich bin vor drei Monaten nach Deutschland gekommen.", exampleTranslation: "I came to Germany three months ago." },
        { id: "vocab13-5-9", german: "heute Morgen", english: "this morning", malayalam: "\u0D07\u0D28\u0D4D\u0D28\u0D4D \u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46", pronunciation: "hoy-te mor-gen", example: "Heute Morgen habe ich Kaffee getrunken.", exampleTranslation: "This morning I drank coffee." },
        { id: "vocab13-5-10", german: "gestern Abend", english: "yesterday evening", malayalam: "\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46 \u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02", pronunciation: "gess-tern ah-bent", example: "Gestern Abend habe ich einen Film gesehen.", exampleTranslation: "Yesterday evening I watched a film." }
      ]
    }
  ]
};
