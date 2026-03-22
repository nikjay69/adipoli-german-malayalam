import type { Module } from '../types';

export const MODULE_5: Module = {
  id: 5,
  title: "Daily Routine",
  titleGerman: "Mein Tag",
  description:
    "Learn to describe your daily routine in German — from waking up to going to bed!",
  icon: "☀️",
  color: "#f59e0b",
  totalHours: 12,
  unlockRequirement: "Complete Module 4",
  lessons: [
    // ──────────────────────────────────────────────
    // Lesson 5-1: Regular Verbs Present Tense
    // ──────────────────────────────────────────────
    {
      id: "5-1",
      title: "Regular Verbs Present Tense",
      titleGerman: "Regelmäßige Verben im Präsens",
      description:
        "Master the present tense conjugation pattern for regular German verbs — the foundation of every sentence you'll ever build!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v5-1-1",
          title: "How German Verbs Work",
          duration: "10:00",
          description:
            "Understand the logic behind German verb conjugation and how it compares to Malayalam verb endings.",
          scriptOutline: [
            "Opening: 'Hallo! Today we crack the German verb code.'",
            "Every German verb has an infinitive form ending in -en (machen, spielen, lernen)",
            "To conjugate: remove -en to get the stem, then add endings",
            "Present tense endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en",
            "Kerala parallel: Malayalam-ilum verb endings marunnu — German-ilum athupole!",
            "Walk through 'machen': ich mache, du machst, er macht, wir machen, ihr macht, sie machen",
            "Formal vs informal: 'Sie machen' (formal you) = 'sie machen' (they) — same form!",
            "Quick practice: conjugate 'spielen' together"
          ],
          keyVocabulary: ["machen", "spielen", "lernen", "wohnen"],
          learningObjectives: [
            "Understand the infinitive form of German verbs",
            "Know all six present tense conjugation endings",
            "Conjugate regular verbs confidently"
          ],
          placeholderThumbnail: "/images/thumbnails/verbs-intro.jpg"
        },
        {
          id: "v5-1-2",
          title: "Practice with Common Verbs",
          duration: "10:00",
          description:
            "Apply conjugation patterns to everyday verbs like arbeiten, kochen, and wohnen.",
          scriptOutline: [
            "Recap the conjugation pattern quickly",
            "arbeiten (to work) — special! du arbeitest, er arbeitet (extra -e- for pronunciation)",
            "kochen (to cook) — ich koche, du kochst, er kocht",
            "wohnen (to live) — Ich wohne in Kerala. Wo wohnst du?",
            "lernen (to learn) — Ich lerne Deutsch! Du lernst schnell!",
            "Mini dialogues: 'Was machst du?' — 'Ich spiele Fußball.'",
            "Common mistake: forgetting the -st for 'du' — 'du mach' ❌ vs 'du machst' ✅",
            "Practice exercise: fill in the correct verb forms"
          ],
          keyVocabulary: ["arbeiten", "kochen", "wohnen", "lernen"],
          learningObjectives: [
            "Conjugate six common regular verbs",
            "Handle the special -eten/-aten pattern (arbeiten)",
            "Use verbs in simple questions and answers"
          ],
          placeholderThumbnail: "/images/thumbnails/verbs-practice.jpg"
        }
      ],
      exercises: [
        {
          id: "ex5-1-1",
          type: "multiple-choice",
          question: "How do you say 'I play' in German?",
          options: ["Ich spiele", "Ich spielst", "Ich spielen", "Ich spielt"],
          correctAnswer: "Ich spiele",
          explanation:
            "For 'ich' (I), remove -en from 'spielen' to get 'spiel-', then add -e → 'ich spiele'.",
          xpReward: 10
        },
        {
          id: "ex5-1-2",
          type: "fill-blank",
          question: "Du _____ in Berlin. (wohnen — to live)",
          options: ["wohnst", "wohne", "wohnen", "wohnt"],
          correctAnswer: "wohnst",
          explanation:
            "For 'du' (you), the ending is -st. Stem 'wohn-' + '-st' = 'wohnst'.",
          xpReward: 10
        },
        {
          id: "ex5-1-3",
          type: "multiple-choice",
          question: "Which conjugation of 'arbeiten' is correct for 'er' (he)?",
          options: ["er arbeitt", "er arbeitet", "er arbeit", "er arbeitest"],
          correctAnswer: "er arbeitet",
          explanation:
            "Verbs with stems ending in -t or -d add an extra -e- before the ending: er arbeit-e-t.",
          xpReward: 15
        },
        {
          id: "ex5-1-4",
          type: "matching",
          question: "Match each pronoun with the correct form of 'machen' (to do/make):",
          options: ["ich", "du", "wir"],
          correctAnswer: ["mache", "machst", "machen"],
          xpReward: 15
        },
        {
          id: "ex5-1-5",
          type: "fill-blank",
          question: "Wir _____ Deutsch. (lernen — to learn)",
          options: ["lernen", "lerne", "lernst", "lernt"],
          correctAnswer: "lernen",
          explanation:
            "For 'wir' (we), the verb keeps the infinitive form: wir lernen.",
          xpReward: 10
        },
        {
          id: "ex5-1-6",
          type: "multiple-choice",
          question: "What is the correct form: 'Ihr _____ Fußball.' (spielen)?",
          options: ["spielen", "spielt", "spielst", "spiele"],
          correctAnswer: "spielt",
          explanation:
            "For 'ihr' (you all), the ending is -t. Stem 'spiel-' + '-t' = 'spielt'.",
          xpReward: 10
        },
        {
          id: "ex5-1-7",
          type: "ordering",
          question: "Arrange to form a correct sentence: 'er / gut / kocht'",
          options: ["Er", "kocht", "gut"],
          correctAnswer: ["Er", "kocht", "gut"],
          explanation: "In German: Subject + Verb + Rest → Er kocht gut. (He cooks well.)",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab5-1-1",
          german: "machen",
          english: "to do / to make",
          malayalam: "ചെയ്യുക",
          pronunciation: "mah-khen",
          example: "Ich mache meine Hausaufgaben.",
          exampleTranslation: "I do my homework."
        },
        {
          id: "vocab5-1-2",
          german: "spielen",
          english: "to play",
          malayalam: "കളിക്കുക",
          pronunciation: "shpee-len",
          example: "Wir spielen Cricket.",
          exampleTranslation: "We play cricket."
        },
        {
          id: "vocab5-1-3",
          german: "lernen",
          english: "to learn",
          malayalam: "പഠിക്കുക",
          pronunciation: "lair-nen",
          example: "Du lernst Deutsch.",
          exampleTranslation: "You are learning German."
        },
        {
          id: "vocab5-1-4",
          german: "wohnen",
          english: "to live (reside)",
          malayalam: "താമസിക്കുക",
          pronunciation: "voh-nen",
          example: "Ich wohne in Kochi.",
          exampleTranslation: "I live in Kochi."
        },
        {
          id: "vocab5-1-5",
          german: "arbeiten",
          english: "to work",
          malayalam: "ജോലി ചെയ്യുക",
          pronunciation: "ar-bye-ten",
          example: "Er arbeitet bei Bosch.",
          exampleTranslation: "He works at Bosch."
        },
        {
          id: "vocab5-1-6",
          german: "kochen",
          english: "to cook",
          malayalam: "പാചകം ചെയ്യുക",
          pronunciation: "ko-khen",
          example: "Sie kocht Curry.",
          exampleTranslation: "She cooks curry."
        },
        {
          id: "vocab5-1-7",
          german: "trinken",
          english: "to drink",
          malayalam: "കുടിക്കുക",
          pronunciation: "trin-ken",
          example: "Wir trinken Chai.",
          exampleTranslation: "We drink chai."
        },
        {
          id: "vocab5-1-8",
          german: "hören",
          english: "to hear / to listen",
          malayalam: "കേൾക്കുക",
          pronunciation: "hö-ren",
          example: "Ich höre Musik.",
          exampleTranslation: "I listen to music."
        },
        {
          id: "vocab5-1-9",
          german: "fragen",
          english: "to ask",
          malayalam: "ചോദിക്കുക",
          pronunciation: "frah-gen",
          example: "Du fragst den Lehrer.",
          exampleTranslation: "You ask the teacher."
        },
        {
          id: "vocab5-1-10",
          german: "kaufen",
          english: "to buy",
          malayalam: "വാങ്ങുക",
          pronunciation: "kow-fen",
          example: "Sie kaufen Reis.",
          exampleTranslation: "They buy rice."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 5-2: Morning Routine
    // ──────────────────────────────────────────────
    {
      id: "5-2",
      title: "Morning Routine",
      titleGerman: "Meine Morgenroutine",
      description:
        "Describe your morning in German — from the alarm going off to heading out the door!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v5-2-1",
          title: "Guten Morgen! My Morning",
          duration: "10:00",
          description:
            "Walk through a typical morning routine using simple German sentences.",
          scriptOutline: [
            "Opening: 'Guten Morgen! Let me tell you about my morning.'",
            "Ich stehe um 7 Uhr auf. (I get up at 7 o'clock.)",
            "Ich dusche. / Ich nehme eine Dusche. (I shower.)",
            "Ich putze mir die Zähne. (I brush my teeth.)",
            "Ich frühstücke. (I have breakfast.) — Kerala style: Puttu und Kadala!",
            "Time expressions: zuerst (first), dann (then), danach (after that)",
            "Putting it all together into a short paragraph",
            "Practice: describe YOUR morning"
          ],
          keyVocabulary: ["aufstehen", "duschen", "frühstücken", "Zähne putzen"],
          learningObjectives: [
            "Describe basic morning activities in German",
            "Use time-sequencing words (zuerst, dann, danach)",
            "Tell the time with 'um … Uhr'"
          ],
          placeholderThumbnail: "/images/thumbnails/morning-routine.jpg"
        },
        {
          id: "v5-2-2",
          title: "Reflexive Morning Actions",
          duration: "10:00",
          description:
            "Learn reflexive verbs you need for daily routine: sich anziehen, sich waschen, and more.",
          scriptOutline: [
            "What are reflexive verbs? Actions you do to yourself.",
            "sich anziehen (to get dressed): Ich ziehe mich an.",
            "sich waschen (to wash oneself): Ich wasche mich.",
            "sich kämmen (to comb one's hair): Ich kämme mich.",
            "The reflexive pronoun changes: mich, dich, sich, uns, euch, sich",
            "Notice: sich anziehen is ALSO separable! Double fun!",
            "Mini dialogue: 'Was machst du morgens?' — 'Ich wasche mich und ziehe mich an.'",
            "Kerala connection: Nammude morning routine — Ella avide-um same alle? 😄"
          ],
          keyVocabulary: ["sich anziehen", "sich waschen", "sich kämmen"],
          learningObjectives: [
            "Understand reflexive verbs for personal care",
            "Use reflexive pronouns correctly (mich, dich, sich)",
            "Combine reflexive and separable verb patterns"
          ],
          placeholderThumbnail: "/images/thumbnails/reflexive-morning.jpg"
        }
      ],
      exercises: [
        {
          id: "ex5-2-1",
          type: "ordering",
          question:
            "Put these morning activities in a logical order:",
          options: ["frühstücken", "aufstehen", "duschen", "Zähne putzen"],
          correctAnswer: ["aufstehen", "duschen", "Zähne putzen", "frühstücken"],
          explanation:
            "A typical order: aufstehen (get up) → duschen (shower) → Zähne putzen (brush teeth) → frühstücken (eat breakfast).",
          xpReward: 15
        },
        {
          id: "ex5-2-2",
          type: "fill-blank",
          question: "Ich _____ um 6 Uhr _____. (aufstehen — to get up)",
          options: ["stehe ... auf", "aufstehe ...", "stehe ... an", "auf ... stehe"],
          correctAnswer: "stehe ... auf",
          explanation:
            "'Aufstehen' is a separable verb. The prefix 'auf' goes to the end: Ich stehe um 6 Uhr auf.",
          xpReward: 15
        },
        {
          id: "ex5-2-3",
          type: "multiple-choice",
          question: "What does 'Ich frühstücke um 8 Uhr' mean?",
          options: [
            "I have breakfast at 8 o'clock",
            "I go to school at 8 o'clock",
            "I wake up at 8 o'clock",
            "I leave at 8 o'clock"
          ],
          correctAnswer: "I have breakfast at 8 o'clock",
          explanation:
            "'Frühstücken' means 'to have breakfast'. 'Um 8 Uhr' means 'at 8 o'clock'.",
          xpReward: 10
        },
        {
          id: "ex5-2-4",
          type: "multiple-choice",
          question: "Which word means 'then' or 'after that'?",
          options: ["zuerst", "dann", "um", "immer"],
          correctAnswer: "dann",
          explanation:
            "'Dann' means 'then'. 'Zuerst' means 'first', 'um' means 'at' (time), 'immer' means 'always'.",
          xpReward: 10
        },
        {
          id: "ex5-2-5",
          type: "fill-blank",
          question: "Ich ziehe _____ an. (reflexive pronoun for 'ich')",
          options: ["mich", "mir", "sich", "dich"],
          correctAnswer: "mich",
          explanation:
            "The reflexive pronoun for 'ich' is 'mich': Ich ziehe mich an. (I get dressed.)",
          xpReward: 10
        },
        {
          id: "ex5-2-6",
          type: "matching",
          question: "Match the German morning activity with its English meaning:",
          options: ["duschen", "Zähne putzen", "sich anziehen", "frühstücken"],
          correctAnswer: ["to shower", "to brush teeth", "to get dressed", "to have breakfast"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab5-2-1",
          german: "aufstehen",
          english: "to get up",
          malayalam: "എഴുന്നേൽക്കുക",
          pronunciation: "owf-shtay-en",
          example: "Ich stehe um 7 Uhr auf.",
          exampleTranslation: "I get up at 7 o'clock."
        },
        {
          id: "vocab5-2-2",
          german: "duschen",
          english: "to shower",
          malayalam: "കുളിക്കുക",
          pronunciation: "doo-shen",
          example: "Er duscht jeden Morgen.",
          exampleTranslation: "He showers every morning."
        },
        {
          id: "vocab5-2-3",
          german: "frühstücken",
          english: "to have breakfast",
          malayalam: "പ്രഭാത ഭക്ഷണം കഴിക്കുക",
          pronunciation: "frü-shtü-ken",
          example: "Wir frühstücken um 8 Uhr.",
          exampleTranslation: "We have breakfast at 8 o'clock."
        },
        {
          id: "vocab5-2-4",
          german: "sich anziehen",
          english: "to get dressed",
          malayalam: "വസ്ത്രം ധരിക്കുക",
          pronunciation: "zikh an-tsee-en",
          example: "Ich ziehe mich schnell an.",
          exampleTranslation: "I get dressed quickly."
        },
        {
          id: "vocab5-2-5",
          german: "Zähne putzen",
          english: "to brush teeth",
          malayalam: "പല്ല് തേക്കുക",
          pronunciation: "tsay-ne poo-tsen",
          example: "Du putzt dir die Zähne.",
          exampleTranslation: "You brush your teeth."
        },
        {
          id: "vocab5-2-6",
          german: "zuerst",
          english: "first / at first",
          malayalam: "ആദ്യം",
          pronunciation: "tsoo-airst",
          example: "Zuerst dusche ich.",
          exampleTranslation: "First I shower."
        },
        {
          id: "vocab5-2-7",
          german: "dann",
          english: "then",
          malayalam: "പിന്നെ",
          pronunciation: "dan",
          example: "Dann frühstücke ich.",
          exampleTranslation: "Then I have breakfast."
        },
        {
          id: "vocab5-2-8",
          german: "danach",
          english: "after that",
          malayalam: "അതിനുശേഷം",
          pronunciation: "da-nahkh",
          example: "Danach gehe ich zur Arbeit.",
          exampleTranslation: "After that I go to work."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 5-3: Separable Verbs
    // ──────────────────────────────────────────────
    {
      id: "5-3",
      title: "Separable Verbs",
      titleGerman: "Trennbare Verben",
      description:
        "Discover the magic of separable verbs — where the prefix jumps to the end of the sentence!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v5-3-1",
          title: "The Magic of Separable Verbs",
          duration: "10:00",
          description:
            "Understand why German verbs split apart and how to handle the prefix at the end.",
          scriptOutline: [
            "Opening: 'German verbs do something crazy — they SPLIT!'",
            "What is a separable verb? A verb with a detachable prefix.",
            "Common prefixes: auf-, ein-, an-, ab-, mit-, fern-, zu-",
            "The rule: in a main clause the prefix goes to the END",
            "aufstehen → Ich stehe um 7 Uhr auf.",
            "Think of it like a boomerang — the prefix flies to the end!",
            "How to spot separable verbs: stress on the PREFIX (AUFstehen, not aufSTEHen)",
            "Practice: 'Ich stehe auf. Ich kaufe ein. Ich fange an.'"
          ],
          keyVocabulary: ["aufstehen", "einkaufen", "anfangen"],
          learningObjectives: [
            "Understand what separable verbs are and how they work",
            "Identify separable prefixes",
            "Place the prefix correctly at the end of main clauses"
          ],
          placeholderThumbnail: "/images/thumbnails/separable-verbs.jpg"
        },
        {
          id: "v5-3-2",
          title: "Separable Verbs in Action",
          duration: "10:00",
          description:
            "Practice five essential separable verbs in real daily-routine sentences.",
          scriptOutline: [
            "einkaufen (to shop): Ich kaufe im Supermarkt ein.",
            "fernsehen (to watch TV): Abends sehe ich fern.",
            "anfangen (to start/begin): Der Film fängt um 8 Uhr an.",
            "aufräumen (to tidy up): Ich räume mein Zimmer auf.",
            "mitkommen (to come along): Kommst du mit?",
            "Building a mini story using all five verbs",
            "Negative sentences: Ich kaufe heute nicht ein.",
            "Question form: Stehst du früh auf? — Ja, ich stehe um 6 Uhr auf."
          ],
          keyVocabulary: ["fernsehen", "anfangen", "aufräumen", "mitkommen"],
          learningObjectives: [
            "Use five common separable verbs in sentences",
            "Form questions with separable verbs",
            "Build negative sentences with separable verbs"
          ],
          placeholderThumbnail: "/images/thumbnails/separable-action.jpg"
        }
      ],
      exercises: [
        {
          id: "ex5-3-1",
          type: "fill-blank",
          question: "Ich _____ jeden Tag um 7 Uhr _____. (aufstehen)",
          options: ["stehe ... auf", "aufstehe ...", "stehe ... an", "auf ... stehe"],
          correctAnswer: "stehe ... auf",
          explanation:
            "Separable verb: the conjugated part 'stehe' stays in position 2, the prefix 'auf' goes to the end.",
          xpReward: 15
        },
        {
          id: "ex5-3-2",
          type: "multiple-choice",
          question: "Which sentence correctly uses 'einkaufen'?",
          options: [
            "Ich kaufe im Supermarkt ein.",
            "Ich einkaufe im Supermarkt.",
            "Ich kaufe ein im Supermarkt.",
            "Ich ein kaufe im Supermarkt."
          ],
          correctAnswer: "Ich kaufe im Supermarkt ein.",
          explanation:
            "The prefix 'ein' goes to the very end of the sentence: Ich kaufe im Supermarkt ein.",
          xpReward: 10
        },
        {
          id: "ex5-3-3",
          type: "fill-blank",
          question: "Abends _____ ich _____. (fernsehen — to watch TV)",
          options: ["sehe ... fern", "fernsehe ...", "sehe ... an", "fern ... sehe"],
          correctAnswer: "sehe ... fern",
          explanation:
            "'Fernsehen' splits into 'sehe' (conjugated) and 'fern' (prefix at the end).",
          xpReward: 15
        },
        {
          id: "ex5-3-4",
          type: "multiple-choice",
          question: "What does 'Der Film fängt um 8 Uhr an' mean?",
          options: [
            "The film starts at 8 o'clock",
            "The film ends at 8 o'clock",
            "The film is 8 hours long",
            "The film is at the cinema"
          ],
          correctAnswer: "The film starts at 8 o'clock",
          explanation:
            "'Anfangen' means 'to start/begin'. 'Fängt … an' is the separated form.",
          xpReward: 10
        },
        {
          id: "ex5-3-5",
          type: "matching",
          question: "Match the separable verb to its meaning:",
          options: ["aufräumen", "einkaufen", "fernsehen", "mitkommen"],
          correctAnswer: ["to tidy up", "to shop", "to watch TV", "to come along"],
          xpReward: 15
        },
        {
          id: "ex5-3-6",
          type: "ordering",
          question: "Arrange to form a correct sentence: 'räume / mein Zimmer / Ich / auf'",
          options: ["Ich", "räume", "mein Zimmer", "auf"],
          correctAnswer: ["Ich", "räume", "mein Zimmer", "auf"],
          explanation:
            "Ich räume mein Zimmer auf. (I tidy up my room.) — prefix 'auf' at the end.",
          xpReward: 15
        },
        {
          id: "ex5-3-7",
          type: "fill-blank",
          question: "_____ du morgen _____? (mitkommen — to come along)",
          options: ["Kommst ... mit", "Mitkommst ...", "Kommt ... mit", "Mit ... kommst"],
          correctAnswer: "Kommst ... mit",
          explanation:
            "In a yes/no question, the verb comes first: Kommst du morgen mit?",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab5-3-1",
          german: "aufstehen",
          english: "to get up",
          malayalam: "എഴുന്നേൽക്കുക",
          pronunciation: "owf-shtay-en",
          example: "Ich stehe früh auf.",
          exampleTranslation: "I get up early."
        },
        {
          id: "vocab5-3-2",
          german: "einkaufen",
          english: "to shop / to buy groceries",
          malayalam: "സാധനങ്ങൾ വാങ്ങുക",
          pronunciation: "ayn-kow-fen",
          example: "Ich kaufe am Samstag ein.",
          exampleTranslation: "I go shopping on Saturday."
        },
        {
          id: "vocab5-3-3",
          german: "fernsehen",
          english: "to watch TV",
          malayalam: "ടിവി കാണുക",
          pronunciation: "fairn-zay-en",
          example: "Abends sehe ich fern.",
          exampleTranslation: "In the evening I watch TV."
        },
        {
          id: "vocab5-3-4",
          german: "anfangen",
          english: "to start / to begin",
          malayalam: "തുടങ്ങുക",
          pronunciation: "an-fang-en",
          example: "Der Unterricht fängt um 9 Uhr an.",
          exampleTranslation: "The class starts at 9 o'clock."
        },
        {
          id: "vocab5-3-5",
          german: "aufräumen",
          english: "to tidy up / to clean up",
          malayalam: "വൃത്തിയാക്കുക",
          pronunciation: "owf-roy-men",
          example: "Ich räume mein Zimmer auf.",
          exampleTranslation: "I tidy up my room."
        },
        {
          id: "vocab5-3-6",
          german: "mitkommen",
          english: "to come along",
          malayalam: "കൂടെ വരുക",
          pronunciation: "mit-ko-men",
          example: "Kommst du mit?",
          exampleTranslation: "Are you coming along?"
        },
        {
          id: "vocab5-3-7",
          german: "zurückkommen",
          english: "to come back",
          malayalam: "തിരിച്ചു വരുക",
          pronunciation: "tsoo-rük-ko-men",
          example: "Ich komme um 5 Uhr zurück.",
          exampleTranslation: "I come back at 5 o'clock."
        },
        {
          id: "vocab5-3-8",
          german: "anrufen",
          english: "to call (phone)",
          malayalam: "ഫോൺ വിളിക്കുക",
          pronunciation: "an-roo-fen",
          example: "Ich rufe meine Mutter an.",
          exampleTranslation: "I call my mother."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 5-4: My Day — From Morning to Night
    // ──────────────────────────────────────────────
    {
      id: "5-4",
      title: "My Day - From Morning to Night",
      titleGerman: "Mein Tag - Von morgens bis abends",
      description:
        "Put it all together! Describe a complete day in German using everything you've learned so far.",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v5-4-1",
          title: "Ein Tag in meinem Leben",
          duration: "12:00",
          description:
            "Follow a full-day narrative in German — morning, afternoon, and evening routines.",
          scriptOutline: [
            "Opening: 'Let's spend a whole day in German!'",
            "Morning: Ich stehe um 7 Uhr auf. Dann dusche ich. Um 8 Uhr frühstücke ich.",
            "Mid-morning: Um 9 Uhr fange ich mit der Arbeit an. / Ich gehe zur Uni.",
            "Lunch: Um 12 Uhr esse ich zu Mittag. (I eat lunch.)",
            "Afternoon: Nachmittags lerne ich Deutsch. Danach kaufe ich ein.",
            "Evening: Abends koche ich. Ich esse zu Abend. (I eat dinner.)",
            "Night: Ich sehe fern. Um 10 Uhr gehe ich ins Bett. (I go to bed.)",
            "Kerala touch: 'Nammude day — same alle? Morning chai, work, evening TV, sleep!'",
            "Your turn: write about YOUR day using these patterns"
          ],
          keyVocabulary: [
            "zu Mittag essen",
            "zu Abend essen",
            "ins Bett gehen",
            "nachmittags"
          ],
          learningObjectives: [
            "Narrate a complete day from morning to night",
            "Use time expressions for different parts of the day",
            "Combine regular, separable, and reflexive verbs in a coherent text"
          ],
          placeholderThumbnail: "/images/thumbnails/my-full-day.jpg"
        }
      ],
      exercises: [
        {
          id: "ex5-4-1",
          type: "ordering",
          question: "Put these daily activities in chronological order:",
          options: [
            "zu Abend essen",
            "frühstücken",
            "aufstehen",
            "zu Mittag essen",
            "ins Bett gehen"
          ],
          correctAnswer: [
            "aufstehen",
            "frühstücken",
            "zu Mittag essen",
            "zu Abend essen",
            "ins Bett gehen"
          ],
          explanation:
            "Get up → breakfast → lunch → dinner → go to bed. A full day!",
          xpReward: 15
        },
        {
          id: "ex5-4-2",
          type: "fill-blank",
          question: "Um 10 Uhr gehe ich ins _____. (bed)",
          options: ["Bett", "Haus", "Zimmer", "Bad"],
          correctAnswer: "Bett",
          explanation:
            "'Ins Bett gehen' means 'to go to bed'. 'Ins' = in + das (contraction).",
          xpReward: 10
        },
        {
          id: "ex5-4-3",
          type: "multiple-choice",
          question: "What does 'Ich esse zu Mittag' mean?",
          options: [
            "I eat lunch",
            "I eat breakfast",
            "I eat dinner",
            "I eat at midnight"
          ],
          correctAnswer: "I eat lunch",
          explanation:
            "'Zu Mittag essen' = to eat lunch. 'Mittag' = midday/noon.",
          xpReward: 10
        },
        {
          id: "ex5-4-4",
          type: "multiple-choice",
          question:
            "Choose the correct sentence: 'In the evening I watch TV.'",
          options: [
            "Abends sehe ich fern.",
            "Abends ich fernsehe.",
            "Abends ich sehe fern.",
            "Abends fernsehe ich."
          ],
          correctAnswer: "Abends sehe ich fern.",
          explanation:
            "When a time expression starts the sentence, the verb must still be in position 2: Abends sehe ich fern.",
          xpReward: 15
        },
        {
          id: "ex5-4-5",
          type: "fill-blank",
          question: "_____ koche ich Abendessen. (after that)",
          options: ["Danach", "Zuerst", "Dann", "Morgens"],
          correctAnswer: "Danach",
          explanation:
            "'Danach' means 'after that' — perfect for sequencing daily activities.",
          xpReward: 10
        },
        {
          id: "ex5-4-6",
          type: "matching",
          question: "Match the time of day to its German word:",
          options: ["morgens", "mittags", "nachmittags", "abends"],
          correctAnswer: ["in the morning", "at noon", "in the afternoon", "in the evening"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab5-4-1",
          german: "zu Mittag essen",
          english: "to eat lunch",
          malayalam: "ഉച്ചഭക്ഷണം കഴിക്കുക",
          pronunciation: "tsoo mi-tahg es-en",
          example: "Ich esse um 12 Uhr zu Mittag.",
          exampleTranslation: "I eat lunch at 12 o'clock."
        },
        {
          id: "vocab5-4-2",
          german: "zu Abend essen",
          english: "to eat dinner",
          malayalam: "അത്താഴം കഴിക്കുക",
          pronunciation: "tsoo ah-bent es-en",
          example: "Wir essen um 7 Uhr zu Abend.",
          exampleTranslation: "We eat dinner at 7 o'clock."
        },
        {
          id: "vocab5-4-3",
          german: "ins Bett gehen",
          english: "to go to bed",
          malayalam: "ഉറങ്ങാൻ പോകുക",
          pronunciation: "ins bet gay-en",
          example: "Ich gehe um 10 Uhr ins Bett.",
          exampleTranslation: "I go to bed at 10 o'clock."
        },
        {
          id: "vocab5-4-4",
          german: "morgens",
          english: "in the morning",
          malayalam: "രാവിലെ",
          pronunciation: "mor-gens",
          example: "Morgens trinke ich Kaffee.",
          exampleTranslation: "In the morning I drink coffee."
        },
        {
          id: "vocab5-4-5",
          german: "mittags",
          english: "at noon / at lunchtime",
          malayalam: "ഉച്ചയ്ക്ക്",
          pronunciation: "mi-tahgs",
          example: "Mittags esse ich in der Kantine.",
          exampleTranslation: "At noon I eat in the canteen."
        },
        {
          id: "vocab5-4-6",
          german: "nachmittags",
          english: "in the afternoon",
          malayalam: "ഉച്ചകഴിഞ്ഞ്",
          pronunciation: "nahkh-mi-tahgs",
          example: "Nachmittags lerne ich Deutsch.",
          exampleTranslation: "In the afternoon I learn German."
        },
        {
          id: "vocab5-4-7",
          german: "abends",
          english: "in the evening",
          malayalam: "വൈകുന്നേരം",
          pronunciation: "ah-bents",
          example: "Abends sehe ich fern.",
          exampleTranslation: "In the evening I watch TV."
        },
        {
          id: "vocab5-4-8",
          german: "nachts",
          english: "at night",
          malayalam: "രാത്രി",
          pronunciation: "nakhts",
          example: "Nachts schlafe ich.",
          exampleTranslation: "At night I sleep."
        }
      ]
    },

    // ──────────────────────────────────────────────
    // Lesson 5-5: Telling About Your Week
    // ──────────────────────────────────────────────
    {
      id: "5-5",
      title: "Telling About Your Week",
      titleGerman: "Meine Woche",
      description:
        "Talk about your weekly schedule, hobbies, and how often you do things — using days of the week and frequency adverbs!",
      duration: "45 min",
      xpReward: 200,
      videos: [
        {
          id: "v5-5-1",
          title: "Meine Woche - Weekly Schedule",
          duration: "12:00",
          description:
            "Learn to talk about weekly plans using days of the week and frequency words.",
          scriptOutline: [
            "Opening: 'Was machst du am Montag? Let's plan our week in German!'",
            "Days of the week: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag",
            "Pattern: Am Montag + verb. Am Dienstag lerne ich Deutsch.",
            "Am Wochenende (on the weekend) — 'Am Wochenende schlafe ich lange!'",
            "Frequency adverbs: immer (always), oft (often), manchmal (sometimes), selten (rarely), nie (never)",
            "Word order: Ich spiele oft Cricket. / Oft spiele ich Cricket. — both correct!",
            "Building a weekly schedule: 'Am Montag arbeite ich. Am Mittwoch koche ich.'",
            "Kerala connection: 'Sunday = family day — Am Sonntag esse ich mit meiner Familie!'",
            "Practice: Tell your partner about YOUR typical week"
          ],
          keyVocabulary: [
            "Montag",
            "Dienstag",
            "Mittwoch",
            "am Wochenende",
            "immer",
            "oft",
            "manchmal",
            "nie"
          ],
          learningObjectives: [
            "Name all seven days of the week in German",
            "Use 'am + day' to say when you do something",
            "Express how often you do activities with frequency adverbs"
          ],
          placeholderThumbnail: "/images/thumbnails/my-week.jpg"
        }
      ],
      exercises: [
        {
          id: "ex5-5-1",
          type: "ordering",
          question: "Put the days of the week in order, starting with Monday:",
          options: [
            "Freitag",
            "Mittwoch",
            "Montag",
            "Sonntag",
            "Donnerstag",
            "Samstag",
            "Dienstag"
          ],
          correctAnswer: [
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag",
            "Sonntag"
          ],
          xpReward: 15
        },
        {
          id: "ex5-5-2",
          type: "fill-blank",
          question: "_____ Montag arbeite ich. (on)",
          options: ["Am", "Im", "Um", "An"],
          correctAnswer: "Am",
          explanation:
            "Use 'am' (an + dem) before days of the week: Am Montag, Am Dienstag, etc.",
          xpReward: 10
        },
        {
          id: "ex5-5-3",
          type: "multiple-choice",
          question: "Which word means 'sometimes'?",
          options: ["immer", "oft", "manchmal", "nie"],
          correctAnswer: "manchmal",
          explanation:
            "immer = always, oft = often, manchmal = sometimes, nie = never.",
          xpReward: 10
        },
        {
          id: "ex5-5-4",
          type: "ordering",
          question:
            "Order these frequency adverbs from most frequent to least frequent:",
          options: ["manchmal", "immer", "nie", "selten", "oft"],
          correctAnswer: ["immer", "oft", "manchmal", "selten", "nie"],
          explanation:
            "immer (always) → oft (often) → manchmal (sometimes) → selten (rarely) → nie (never).",
          xpReward: 15
        },
        {
          id: "ex5-5-5",
          type: "fill-blank",
          question:
            "Am Wochenende _____ ich lange. (schlafen — to sleep, ich form)",
          options: ["schlafe", "schläfst", "schlafen", "schläft"],
          correctAnswer: "schlafe",
          explanation:
            "'Schlafen' conjugated for 'ich': ich schlafe. Am Wochenende schlafe ich lange. (On the weekend I sleep long.)",
          xpReward: 10
        },
        {
          id: "ex5-5-6",
          type: "multiple-choice",
          question: "How do you say 'I never cook' in German?",
          options: [
            "Ich koche nie.",
            "Ich nie koche.",
            "Ich koche immer.",
            "Nie ich koche."
          ],
          correctAnswer: "Ich koche nie.",
          explanation:
            "'Nie' (never) typically comes after the verb: Ich koche nie.",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab5-5-1",
          german: "Montag",
          english: "Monday",
          malayalam: "തിങ്കളാഴ്ച",
          pronunciation: "mohn-tahg",
          example: "Am Montag arbeite ich.",
          exampleTranslation: "On Monday I work."
        },
        {
          id: "vocab5-5-2",
          german: "Dienstag",
          english: "Tuesday",
          malayalam: "ചൊവ്വാഴ്ച",
          pronunciation: "deens-tahg",
          example: "Am Dienstag lerne ich Deutsch.",
          exampleTranslation: "On Tuesday I learn German."
        },
        {
          id: "vocab5-5-3",
          german: "Mittwoch",
          english: "Wednesday",
          malayalam: "ബുധനാഴ്ച",
          pronunciation: "mit-vokh",
          example: "Am Mittwoch koche ich.",
          exampleTranslation: "On Wednesday I cook."
        },
        {
          id: "vocab5-5-4",
          german: "das Wochenende",
          english: "the weekend",
          malayalam: "വാരാന്ത്യം",
          pronunciation: "vo-khen-en-de",
          example: "Am Wochenende schlafe ich lange.",
          exampleTranslation: "On the weekend I sleep in."
        },
        {
          id: "vocab5-5-5",
          german: "immer",
          english: "always",
          malayalam: "എപ്പോഴും",
          pronunciation: "im-er",
          example: "Ich trinke immer Chai morgens.",
          exampleTranslation: "I always drink chai in the morning."
        },
        {
          id: "vocab5-5-6",
          german: "oft",
          english: "often",
          malayalam: "പലപ്പോഴും",
          pronunciation: "oft",
          example: "Ich spiele oft Cricket.",
          exampleTranslation: "I often play cricket."
        },
        {
          id: "vocab5-5-7",
          german: "manchmal",
          english: "sometimes",
          malayalam: "ചിലപ്പോൾ",
          pronunciation: "manch-mahl",
          example: "Manchmal esse ich Dosa.",
          exampleTranslation: "Sometimes I eat dosa."
        },
        {
          id: "vocab5-5-8",
          german: "nie",
          english: "never",
          malayalam: "ഒരിക്കലും ഇല്ല",
          pronunciation: "nee",
          example: "Ich koche nie.",
          exampleTranslation: "I never cook."
        }
      ]
    }
  ]
};
