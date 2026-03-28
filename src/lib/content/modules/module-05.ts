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
  learningTips: [
    "Narrate your morning routine in German while doing it: 'Ich stehe auf, ich dusche...'",
    "Separable verbs split in sentences: 'Ich stehe um 7 auf' — the prefix goes to the END.",
    "Record yourself describing your day. Listen back tomorrow — you'll hear your progress!",
  ],
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
      storyScene: {
        setting: {
          name: "Kuttan's Desk (Home Office)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "You're at your desk in the WG, surrounded by books and your laptop. Stefan walks in and asks what you're up to. 'Ich lerne Deutsch!' you say proudly. This desk is your battleground for mastering the German present tense. Every verb has a pattern, and you're about to crack it, machane!",
        },
        narrative: {
          previousRecap: "You've successfully introduced your family. Now, let's learn how to describe everything you DO in Germany!",
          currentObjective: "Master the present tense conjugation of regular verbs and the 'ich/du/er' patterns",
          nextTeaser: "Next: rise and shine! Let's conquer the morning routine!",
        },
        kuttanIntro: [
          "Machane! German verbs are like building blocks. English-il 'I play, he plays' ennu mathram parayumbol, German-il ella pronoun-inum ending maarum.",
          "Formula simple aanu: Remove '-en' then add the code: ich -e, du -st, er -t. Logic catch cheythaal baaki ellam set aavum.",
          "Pinne 'arbeiten' pole stems '-t'/-d' ending kandaal additional '-e-' koodi care venam. Let's make our first German sentences!",
        ],
        vocabEncounters: [
          { vocabId: "vocab5-1-1", encounterMoment: "Stefan asks: 'Was machst du?' You answer: 'Ich mache meine Hausaufgaben.' Study mode on!", contextSentence: "Ich mache meine Hausaufgaben." },
          { vocabId: "vocab5-1-3", encounterMoment: "Lara walks by: 'Lernst du viel?' You nod: 'Ja, ich lerne viel Deutsch.'", contextSentence: "Du lernst Deutsch." },
          { vocabId: "vocab5-1-5", encounterMoment: "Stefan checks his email: 'Ich arbeite heute zu Hause.' Home-office vibe!", contextSentence: "Er arbeitet bei Bosch." },
          { vocabId: "vocab5-1-6", encounterMoment: "Smell from the kitchen? 'Lara kocht Curry,' you guess. (Lara is cooking curry).", contextSentence: "Sie kocht Curry." },
          { vocabId: "vocab5-1-8", encounterMoment: "You put on your headset: 'Ich höre Musik.' Lo-fi beats for studying!", contextSentence: "Ich höre Musik." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I play cricket' (spielen = to play). What is the correct form for 'ich'?",
            options: [
              { text: "Ich spiele Cricket.", isCorrect: true, response: "Exactly! For 'ich', always add '-e' to the stem 'spiel-'. Perfect!", kuttanReaction: "Adipoli! 'Ich' kandaal '-e' venam. Ithu basic rule aanu, machane! 🎯" },
              { text: "Ich spielt Cricket.", isCorrect: false, response: "Aiyyo! '-t' ending 'er/sie/es' (he/she/it) context-il mathram mathi. 'Ich' context-il '-e' venam!", kuttanReaction: "Vite machane! 'Ich' case-il ending '-e' aanu. Pattern correctly catch cheyyaam! 😬" },
            ],
          },
          {
            moment: "Stefan is working today. How do you correctly say 'He works' (arbeiten = to work)?",
            options: [
              { text: "Er arbeitet.", isCorrect: true, response: "Correct! The extra '-e-' is there because 'arbeit-' ends in 't'. Makes it readable!", kuttanReaction: "Superb! 'Arbeitt' ennu parayan preyanasam aanu, so 'arbeitet' ennu parayanam. Logical alle? ⭐" },
              { text: "Er arbeitt.", isCorrect: false, response: "No, that's impossible to pronounce! German adds an extra '-e-' for verbs ending in 't' or 'd'.", kuttanReaction: "Aiyyo! Stem 't'-il finish cheythal additional '-e-' plus '-t' venam. 'Er arbeitet' is the king of work verbs! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v5-1-1",
          title: "How German Verbs Work",
          duration: "10:00",
          description:
            "Understand the logic behind German verb conjugation and how it compares to Malayalam verb endings.",
          scriptOutline: [
            "Opening: 'Namaskaram machane! Verb conjugation names kandaal katti povum, but logic simple aanu!'",
            "Every German verb has an infinitive ending in -en (machen, lernen...)",
            "Conjugation rule: remove -en (stem) then add endings. Simple math!",
            "Endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en",
            "Kerala parallel: Nammal verbs endings maarunnathu pole (njan varunnu, nee varunnu...) German-ilum pattern und!",
            "Conjugation walk-through: 'machen' (ich mache, du machst...)",
            "Formal you (Sie) uses the same form as 'they' (sie). Ithu oru shortcut aanu!",
            "Practice: Let's conjugate 'spielen' — set aakkaam!"
          ],
          keyVocabulary: ["machen", "spielen", "lernen", "wohnen"],
          learningObjectives: [
            "Understand the infinitive form of German verbs",
            "Know all six present tense conjugation endings",
            "Conjugate regular verbs confidently"
          ],
          placeholderThumbnail: "/images/home_office.png"
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
          placeholderThumbnail: "/images/office_building.png"
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
            "Regular verb formula: remove -en, add the ending. ich = -e, du = -st, er = -t, wir = -en, ihr = -t, sie = -en. So spielen → ich spiele, du spielst, er spielt.",
          xpReward: 10
        },
        {
          id: "ex5-1-2",
          type: "fill-blank",
          question: "Du _____ in Berlin. (wohnen — to live)",
          options: ["wohnst", "wohne", "wohnen", "wohnt"],
          correctAnswer: "wohnst",
          explanation:
            "'Du' always gets -st: du wohnst, du spielst, du lernst. This is the most recognizable conjugation — if you see -st at the end, the subject is 'du'.",
          xpReward: 10
        },
        {
          id: "ex5-1-3",
          type: "multiple-choice",
          question: "Which conjugation of 'arbeiten' is correct for 'er' (he)?",
          options: ["er arbeitt", "er arbeitet", "er arbeit", "er arbeitest"],
          correctAnswer: "er arbeitet",
          explanation:
            "When a verb stem ends in -t or -d (like arbeit-), add an extra -e- for pronunciation: du arbeitest, er arbeitet. Without it, 'arbeitst' would be tongue-twisting!",
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
          type: "multiple-choice",
          question: "You are working from your WG apartment today. Which German verb describes your activity?",
          questionGerman: "Was machen Sie heute zu Hause?",
          options: ["Ich arbeite.", "Ich koche.", "Ich schlafe.", "Ich lerne."],
          correctAnswer: "Ich arbeite.",
          explanation: "In Germany, 'Home-Office' is very common. The verb 'arbeiten' always gets the 'ich -e' ending: 'Ich arbeite'. Use this when telling your friends why you can't go out for coffee!",
          xpReward: 15,
          imageUrl: "/images/home_office.png"
        },
        {
          id: "ex5-1-6",
          type: "multiple-choice",
          question: "What is the correct form: 'Ihr _____ Fußball.' (spielen)?",
          options: ["spielen", "spielt", "spielst", "spiele"],
          correctAnswer: "spielt",
          explanation:
            "'Ihr' (you all) gets -t, same as er/sie/es. 'Ihr spielt' = 'er spielt'. Context tells you who's doing the action. Two endings that match = less memorization!",
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
        },
        {
          id: "ex5-1-8",
          type: "dictation",
          question: "Listen and type: Ich lerne Deutsch.",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Wunderbar! You are doing exactly that right now. Remember to capitalize 'Deutsch' as it is a noun!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-learn-german.mp3"
        },
        {
          id: "ex5-1-9",
          type: "free-text",
          question: "Translate to German: 'He is cooking at home.'",
          correctAnswer: "Er kocht zu Hause",
          explanation: "Great! 'zu Hause' means 'at home'. Remember the verb position (2nd).",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "WG Kitchen & Hallway, 7:30 AM",
          sceneType: "home",
          timeOfDay: "morning",
          description: "The coffee machine is whirring, and the smell of toasted Brot is in the air. Stefan is already in the kitchen with a mug. Everyone is trying to use the bathroom and get breakfast at the same time. It's a typical German 'WG-Morgen' (apartment morning) rush. Time to narrate your moves, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the basic verb endings. Now, let's put them to work in your daily life!",
          currentObjective: "Sequence your morning actions using separable and reflexive verbs",
          nextTeaser: "Next: the boomerang verbs! Learn more about Trennbare Verben!",
        },
        kuttanIntro: [
          "Machane! Morning in Germany is all about timing. 'Ich stehe auf' (I get up) ennu parayumpo 'auf' end-il povan marakkaruthu.",
          "Nammal reflexive actions (duschen, Zähne putzen) and sequence words (zuerst, dann) use cheythu full routine parayaam.",
          "Separable verbs split aakumbol pre-fixed part boomerang pole land cheyyunnathu pichakamaayi orkkane! Let's start our day!",
        ],
        vocabEncounters: [
          { vocabId: "vocab5-2-1", encounterMoment: "Stefan asks: 'Wann stehst du auf?' You answer: 'Ich stehe um 7 Uhr auf.'", contextSentence: "Ich stehe um 7 Uhr auf." },
          { vocabId: "vocab5-2-2", encounterMoment: "The bathroom is free! 'Zuerst dusche ich,' you tell Stefan.", contextSentence: "Er duscht jeden Morgen." },
          { vocabId: "vocab5-2-3", encounterMoment: "Stefan offers some bread: 'Willst du frühstücken?' You nod: 'Ja, ich frühstücke jetzt.'", contextSentence: "Wir frühstücken um 8 Uhr." },
          { vocabId: "vocab5-2-5", encounterMoment: "You grab your toothbrush: 'Danach putze ich mir die Zähne.' Dental hygiene is key!", contextSentence: "Du putzt dir die Zähne." },
          { vocabId: "vocab5-2-6", encounterMoment: "You summarize: 'Zuerst dusche ich, dann frühstücke ich.' Perfect sequence!", contextSentence: "Zuerst dusche ich." },
        ],
        decisionPoints: [
          {
            moment: "Stefan asks: 'Was machst du zuerst?' You want to say 'First I get up'. What is the correct German sentence?",
            options: [
              { text: "Zuerst stehe ich auf.", isCorrect: true, response: "Exactly! In German, if 'Zuerst' is first, the verb 'stehe' comes second, and the prefix 'auf' goes to the end.", kuttanReaction: "Adipoli! Word order rules correctly catch cheythallo. 'auf' end-il poyathu makkalle point! 🔥" },
              { text: "Zuerst ich stehe auf.", isCorrect: false, response: "Aiyyo! Verb MUST be in position 2. After 'Zuerst', the verb 'stehe' should come immediately.", kuttanReaction: "Vite machane! German logic-il verb position 2 is sacred. 'Zuerst stehe ich...' aanu right form. Try again! 😬" },
            ],
          },
          {
            moment: "Which verb is reflexive (action you do to yourself) in the morning?",
            options: [
              { text: "sich anziehen", isCorrect: true, response: "Correct! You dress yourself (mich anziehen). It uses a reflexive pronoun.", kuttanReaction: "Superb! 'Ich ziehe mich an'. Pronoun 'mich' refers back to 'ich'. Real pro German vibe! ⭐" },
              { text: "frühstücken", isCorrect: false, response: "No, 'frühstücken' is a regular action. You don't 'breakfast yourself'!", kuttanReaction: "Aiyyo! Ithu normal regular verb aanu. Reflexive verbs-innu 'sich' (mich, dich) venam. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v5-2-1",
          title: "Guten Morgen! My Morning",
          duration: "10:00",
          description:
            "Walk through a typical morning routine using simple German sentences.",
          scriptOutline: [
            "Opening: 'Guten Morgen! Nammude normal day-il cheyyunna karyangall German-il parayaam!'",
            "7:00 AM: Ich stehe um 7 Uhr auf. (Prefix end-il povan marakkaruthu!)",
            "Action: Ich dusche. (Shower level set!)",
            "Action: Ich putze mir die Zähne. (Brush cheyyuka.)",
            "Breakfast: Ich frühstücke. — Puttu, Appam, or just bread! Adipoli!",
            "Sequence: zuerst (first), dann (then), danach (after that). Chain cheyyaam!",
            "Full Sentence: 'Zuerst stehe ich auf, dann frühstücke ich.'",
            "Challenge: Describe YOUR morning right now!"
          ],
          keyVocabulary: ["aufstehen", "duschen", "frühstücken", "Zähne putzen"],
          learningObjectives: [
            "Describe basic morning activities in German",
            "Use time-sequencing words (zuerst, dann, danach)",
            "Tell the time with 'um … Uhr'"
          ],
          placeholderThumbnail: "/images/home_office.png"
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
          placeholderThumbnail: "/images/home_office.png"
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
            "Separable verb rule: the prefix flies to the END. aufstehen → 'Ich stehe um 6 Uhr AUF.' Think of the prefix as a boomerang — it always comes back to the end!",
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
            "'Frühstücken' = to have breakfast (from Frühstück = breakfast). 'Um' + time = 'at'. Pattern for daily activities: Ich [verb] um [time] Uhr.",
          xpReward: 10
        },
        {
          id: "ex5-2-4",
          type: "multiple-choice",
          question: "Which word means 'then' or 'after that'?",
          options: ["zuerst", "dann", "um", "immer"],
          correctAnswer: "dann",
          explanation:
            "Time-sequencing trio: zuerst (first) → dann (then) → danach (after that). Use these to chain actions: 'Zuerst dusche ich, dann frühstücke ich, danach gehe ich.'",
          xpReward: 10
        },
        {
          id: "ex5-2-5",
          type: "fill-blank",
          question: "Ich ziehe _____ an. (reflexive pronoun for 'ich')",
          options: ["mich", "mir", "sich", "dich"],
          correctAnswer: "mich",
          explanation:
            "Reflexive pronouns: ich→mich, du→dich, er/sie/es→sich, wir→uns. 'Ich ziehe MICH an' = I dress MYSELF. The pronoun refers back to the subject.",
          xpReward: 10
        },
        {
          id: "ex5-2-6",
          type: "matching",
          question: "Match the German morning activity with its English meaning:",
          options: ["duschen", "Zähne putzen", "sich anziehen", "frühstücken"],
          correctAnswer: ["to shower", "to brush teeth", "to get dressed", "to have breakfast"],
          xpReward: 15
        },
        {
          id: "ex5-2-7",
          type: "dictation",
          question: "Listen and type: Ich stehe um 7 Uhr auf.",
          correctAnswer: "Ich stehe um 7 Uhr auf",
          explanation: "Perfect! Did you hear how the prefix 'auf' comes at the very end? That's the separable verb rule!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-wakeup-7.mp3"
        },
        {
          id: "ex5-2-8",
          type: "free-text",
          question: "Translate to German: 'I am brushing my teeth.'",
          correctAnswer: "Ich putze mir die Zähne",
          explanation: "Correct! Note the reflexive 'mir' and the capitalization of 'Zähne'.",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "Local Supermarket (Edeka/Rewe)",
          sceneType: "market",
          timeOfDay: "afternoon",
          description: "The aisles are filled with fresh produce, bread, and of course, a massive 'Pfand' machine for bottles. You're here to buy ingredients for a group dinner. To explain what you're doing, you need 'Trennbare Verben' — the verbs that split like a coconut, machane! One part stays with the subject, and the other flies to the end.",
        },
        narrative: {
          previousRecap: "You've survived the morning rush. now, let's head out and get some shopping done using the 'split' verbs!",
          currentObjective: "Correct placement of separable prefixes in statements and questions",
          nextTeaser: "Next: putting it all together! From dawn to dusk in German!",
        },
        kuttanIntro: [
          "Machane! German-il chila verbs undu, athu split cheyyaam. Same like how we split a coconut into two halves.",
          "Einkaufen (to shop) kandaal, 'Ich kaufe... ein' ennu parayanam. 'Ein' is the boomerang part. Athu sentence-inte extreme end-il poyale sense aavoo.",
          "Even questions-ilum ithu split aavum. Let's practice our shopping and splitting skills!",
        ],
        vocabEncounters: [
          { vocabId: "vocab5-3-2", encounterMoment: "You tell Stefan: 'Ich kaufe heute im Supermarkt ein.' You're the chef for tonight!", contextSentence: "Ich kaufe am Samstag ein." },
          { vocabId: "vocab5-3-4", encounterMoment: "You check the time: 'Der Film fängt um 8 Uhr an.' Have to finish shopping fast!", contextSentence: "Der Unterricht fängt um 9 Uhr an." },
          { vocabId: "vocab5-3-7", encounterMoment: "You plan your return: 'Ich komme um 5 Uhr zurück.' Timing is everything.", contextSentence: "Ich komme um 5 Uhr zurück." },
          { vocabId: "vocab5-3-8", encounterMoment: "You check your phone: 'Ich rufe meine Mutter an.' (I call my mother). Typical weekend move!", contextSentence: "Ich rufe meine Mutter an." },
          { vocabId: "vocab5-3-6", encounterMoment: "You ask your roommate: 'Kommst du mit?' (Are you coming along?).", contextSentence: "Kommst du mit?" },
        ],
        decisionPoints: [
          {
            moment: "How do you correctly say 'I am shopping now' in German?",
            options: [
              { text: "Ich kaufe jetzt ein.", isCorrect: true, response: "Correct! The prefix 'ein' is at the very end. Perfect boomerang effect!", kuttanReaction: "Adipoli! 'ein' correct position-il land cheythallo. You're a natural with separable verbs! 🔥" },
              { text: "Ich einkaufe jetzt.", isCorrect: false, response: "Aiyyo! In a main sentence, the prefix MUST split and go to the end. You can't keep it together!", kuttanReaction: "Vite machane! Split it up. 'Ich kaufe... ein' is the only way. Try again! 😬" },
            ],
          },
          {
            moment: "You want to ask Stefan: 'Are you calling Arjun?' (Arjun is your brother).",
            options: [
              { text: "Rufst du Arjun an?", isCorrect: true, response: "Exactly! Even in questions, the prefix 'an' stays at the end. The verb 'rufst' moves to the front.", kuttanReaction: "Super machane! Question context-ilum 'an' loyalty end-il thanneyaanu. Well handled! ⭐" },
              { text: "Anrufst du Arjun?", isCorrect: false, response: "No, 'an' doesn't stay with the verb in the front. It's a team player — it always moves to the back in main clauses.", kuttanReaction: "Aiyyo! 'An' split cheyyaan marakkaalle. 'Rufst du... an' is the correct form. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v5-3-1",
          title: "The Magic of Separable Verbs",
          duration: "10:00",
          description:
            "Understand why German verbs split apart and how to handle the prefix at the end.",
          scriptOutline: [
            "Opening: 'Verb logical split — Boomerang effect aanu machane!'",
            "Separable Verbs: Verbs with a detachable prefix (auf-, ein-, an-).",
            "The Rule: Prefix flies to the END of the sentence.",
            "aufstehen → Ich stehe um 7 Uhr AUF.",
            "Visual: Think of the prefix as a boomerang. It starts at the front, but lands at the end!",
            "Stress Rule: Separable verbs always have stress on the prefix (AUF-stehen).",
            "Practice verbs: aufstehen, einkaufen, anfangen. Team-work aanu!",
          ],
          keyVocabulary: ["aufstehen", "einkaufen", "anfangen"],
          learningObjectives: [
            "Understand what separable verbs are and how they work",
            "Identify separable prefixes",
            "Place the prefix correctly at the end of main clauses"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png"
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
          placeholderThumbnail: "/images/supermarket_checkout.png"
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
            "Separable verb structure: [Subject] + [conjugated verb in pos. 2] + [middle stuff] + [prefix at END]. Ich stehe um 7 Uhr auf. The verb and prefix are a team that splits apart!",
          xpReward: 15
        },
        {
          id: "ex5-3-2",
          type: "multiple-choice",
          question: "You are going to the supermarket to buy groceries and return your 'Pfand' bottles. Which verb covers this whole routine?",
          questionGerman: "Welches Verb beschreibt diesen Behördengang?",
          options: [
            "Ich kaufe ein.",
            "Ich kaufe.",
            "Ich einkaufe.",
            "Ich mache Einkaufen."
          ],
          correctAnswer: "Ich kaufe ein.",
          explanation: "In Germany, grocery shopping is 'einkaufen'. It's a separable verb! The prefix 'ein' MUST go to the end: 'Ich kaufe heute im Supermarkt EIN.'",
          xpReward: 20,
          imageUrl: "/images/leergut_machine.png"
        },
        {
          id: "ex5-3-3",
          type: "fill-blank",
          question: "Abends _____ ich _____. (fernsehen — to watch TV)",
          options: ["sehe ... fern", "fernsehe ...", "sehe ... an", "fern ... sehe"],
          correctAnswer: "sehe ... fern",
          explanation:
            "'Fernsehen' literally means 'far-seeing' (fern=far, sehen=to see). It splits: 'Ich sehe fern.' How to spot separable verbs? The stress is on the PREFIX: FERNsehen, AUFstehen.",
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
            "'Anfangen' = to start/begin. Note: 'fangen' is a stem-changer (a→ä): er fängt an, not 'fangt'. Some separable verbs ALSO have stem changes — double challenge!",
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
            "In yes/no questions, the conjugated verb goes FIRST, but the prefix still goes to the END: 'Kommst du morgen MIT?' The prefix is loyal to the end position!",
          xpReward: 15
        },
        {
          id: "ex5-3-8",
          type: "dictation",
          question: "Listen and type: Ich kaufe im Supermarkt ein.",
          correctAnswer: "Ich kaufe im Supermarkt ein",
          explanation: "Super! 'einkaufen' is a team. 'Ich kaufe... ein.' The prefix 'ein' marks the end of the action.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-shopping.mp3"
        },
        {
          id: "ex5-3-9",
          type: "free-text",
          question: "Write in German: 'The film starts at 8 o'clock.' (Start = anfangen)",
          correctAnswer: "Der Film fängt um 8 Uhr an",
          explanation: "Excellent! 'anfangen' splits → 'fängt... an'. And remember the umlaut in 'fängt'!",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "WG Living Room, 10:00 PM",
          sceneType: "home",
          timeOfDay: "evening",
          description: "The day is winding down. The TV is on low volume, and you're sitting on the sofa, reflecting on your first few weeks in Germany. Stefan asks: 'Wie war dein Tag?' (How was your day?). This is the final challenge of Module 5 — narrating your full routine from sunrise to bedtime. You've got this, machane!",
        },
        narrative: {
          previousRecap: "You've survived the supermarket split and the morning rush. Now, let's bring it all together!",
          currentObjective: "Narrate a full day's routine using regular, separable, and reflexive verbs",
          nextTeaser: "Module 5 complete! Next: I am hungry! Time to learn about food and shopping!",
        },
        kuttanIntro: [
          "Machane! Ithanu summery lesson. Morning muthal night vare ulla daily routine full German-il parayaam.",
          "Ivide nammal padicha ellam rules (verb endings, separable splits, reflexives) correctly handle cheyyaan makkalle!",
          "Stefan-odu nammude common day share cheyyaam. Ready alle? Let's finish Module 5 in style!",
        ],
        vocabEncounters: [
          { vocabId: "vocab5-2-1", encounterMoment: "You start with the morning: 'Ich stehe um 7 Uhr auf.' Consistent as always!", contextSentence: "Ich stehe um 7 Uhr auf." },
          { vocabId: "vocab5-3-2", encounterMoment: "You mention mid-day: 'Um 12 Uhr kaufe ich ein.' Shopping done!", contextSentence: "Ich kaufe am Samstag ein." },
          { vocabId: "vocab5-4-3", encounterMoment: "Lunch break: 'Dann esse ich zu Mittag.' (Then I eat lunch).", contextSentence: "Ich esse zu Mittag." },
          { vocabId: "vocab5-3-3", encounterMoment: "Evening relaxation: 'Abends sehe ich fern.' TV time!", contextSentence: "Abends sehe ich fern." },
          { vocabId: "vocab5-4-1", encounterMoment: "Finally, the end: 'Um 23 Uhr gehe ich ins Bett.' Time for some sleep!", contextSentence: "Ich gehe um 11 Uhr ins Bett." },
        ],
        decisionPoints: [
          {
            moment: "Which phrase correctly says 'I eat dinner' in German?",
            options: [
              { text: "Ich esse zu Abend.", isCorrect: true, response: "Exactly! 'zu Abend essen' is the standard way to say dinner.", kuttanReaction: "Adipoli! 'Abend' is evening, so 'zu Abend essen' fits perfectly. Gold star! ⭐" },
              { text: "Ich esse Abend.", isCorrect: false, response: "Aiyyo! You're missing the preposition 'zu'. It's always 'zu Mittag' or 'zu Abend' essen.", kuttanReaction: "Vite machane! Preposition venam ivide. 'Ich esse zu Abend' is the correct way. Try again! 😬" },
            ],
          },
          {
            moment: "How do you say 'I go to bed' using the correct German phrase?",
            options: [
              { text: "Ich gehe ins Bett.", isCorrect: true, response: "Correct! 'ins' is a contraction of 'in das'.", kuttanReaction: "Superb! Module 5 successfully completed. Now, go get some rest! 🔥" },
              { text: "Ich gehe zu Bett.", isCorrect: false, response: "Technically possible but 'ins Bett' is much more common in daily speech.", kuttanReaction: "Aiyyo! 'ins Bett' is the more natural way. Logic clear alle? Try it again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/berlin_people.png"
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
        },
        {
          id: "ex5-4-7",
          type: "dictation",
          question: "Listen and type: Um 12 Uhr esse ich zu Mittag.",
          correctAnswer: "Um 12 Uhr esse ich zu Mittag",
          explanation: "Great job! Note the inversion: when 'Um 12 Uhr' starts the sentence, the verb 'esse' comes second, then the subject 'ich'.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-lunch.mp3"
        },
        {
          id: "ex5-4-8",
          type: "free-text",
          question: "Translate to German: 'In the evening I watch TV.' (In the evening = Abends, watch TV = fernsehen)",
          correctAnswer: "Abends sehe ich fern",
          explanation: "Wunderbar! 'fernsehen' splits into 'sehe... fern'.",
          xpReward: 30
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
      storyScene: {
        setting: {
          name: "WG Kitchen, Berlin",
          sceneType: "kitchen",
          timeOfDay: "evening",
          description: "Sunday evening. Your flatmates are planning the week on the shared kitchen whiteboard. Everyone writes their schedule. Your turn.",
        },
        narrative: {
          previousRecap: "You can describe your full day in German. Now let's zoom out to the whole week.",
          currentObjective: "Plan and describe your weekly schedule in German",
          nextTeaser: "Next module: German food and restaurants — time to eat!",
        },
        kuttanIntro: [
          "Machane! WG kitchen-il weekly planning aanu! Whiteboard-il ninte schedule ezhuthuka — German-il!",
          "Sunday evening = planning time! Ninte roommates ellam avarude week plan cheythu. Ninte turn!",
          "Weekly schedule German-il parayaan padikkaam — Am Montag, Am Dienstag... Let's go!",
        ],
        vocabEncounters: [
          { vocabId: "vocab5-5-1", encounterMoment: "The whiteboard header reads 'Montag' — Monday, the start of the German work week.", contextSentence: "Am Montag arbeite ich." },
          { vocabId: "vocab5-5-2", encounterMoment: "Your flatmate writes 'Dienstag: Sprachkurs' — Tuesday is language class day.", contextSentence: "Am Dienstag lerne ich Deutsch." },
          { vocabId: "vocab5-5-3", encounterMoment: "Lisa writes 'Mittwoch: Sport' — Wednesday is gym day for her.", contextSentence: "Am Mittwoch gehe ich zum Sport." },
          { vocabId: "vocab5-5-4", encounterMoment: "Marco adds 'immer' next to cooking — he always cooks on Thursdays.", contextSentence: "Ich koche immer am Donnerstag." },
          { vocabId: "vocab5-5-5", encounterMoment: "'Manchmal' appears next to 'Kino' — sometimes they go to the movies.", contextSentence: "Manchmal gehen wir ins Kino." },
          { vocabId: "vocab5-5-6", encounterMoment: "The weekend section says 'Am Wochenende' in bold — sacred free time.", contextSentence: "Am Wochenende schlafe ich lange." },
        ],
        decisionPoints: [
          {
            moment: "Your flatmate asks: 'Was machst du am Freitag?' — What do you do on Friday?",
            options: [
              { text: "Am Freitag treffe ich Freunde!", isCorrect: true, response: "Everyone nods — Friday is friendship day. 'Wollen wir zusammen essen?' Lisa suggests.", kuttanReaction: "Perfect! Am + day + verb — nee structure manasilakki! 🎉" },
              { text: "Freitag ich mache Party.", isCorrect: false, response: "Close! But the word order needs fixing. Your flatmate gently corrects: 'Am Freitag mache ich Party.'", kuttanReaction: "Word order machane! German-il verb second position-il varanam. Am Freitag MACHE ICH..." },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/university_library.png"
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
        },
        {
          id: "ex5-5-7",
          type: "fill-blank",
          question: "Type in German: 'On Saturday I go shopping.' (Am Samstag...)",
          options: ["Am Samstag gehe ich einkaufen", "Am Samstag ich gehe einkaufen", "Samstag am gehe ich einkaufen", "Ich gehe am Samstag einkaufen"],
          correctAnswer: "Am Samstag gehe ich einkaufen",
          explanation: "When a sentence starts with a time expression like 'Am Samstag', the verb stays in position 2 and the subject comes after it (inversion).",
          xpReward: 15
        },
        {
          id: "ex5-5-8",
          type: "fill-blank",
          question: "Type in German: 'I always drink tea in the morning.' (Ich trinke...)",
          options: ["Ich trinke immer morgens Tee", "Ich immer trinke morgens Tee", "Ich trinke Tee morgens immer", "Immer ich trinke morgens Tee"],
          correctAnswer: "Ich trinke immer morgens Tee",
          explanation: "'Immer' (always) typically comes right after the conjugated verb. 'Ich trinke immer morgens Tee.' — a great daily routine sentence!",
          xpReward: 15
        },
        {
          id: "ex5-5-9",
          type: "dictation",
          question: "Listen and type: Am Montag arbeite ich.",
          correctAnswer: "Am Montag arbeite ich",
          explanation: "Perfect! On Monday = Am Montag. And don't forget the verb-second rule!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-monday-work.mp3"
        },
        {
          id: "ex5-5-10",
          type: "free-text",
          question: "Write in German: 'On the weekend I sleep long.' (On the weekend = Am Wochenende, sleep = schlafen)",
          correctAnswer: "Am Wochenende schlafe ich lange",
          explanation: "Super! 'Am Wochenende schlafe ich lange.' — A very useful sentence for your routine!",
          xpReward: 30
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
        },
        {
          id: "vocab5-5-9",
          german: "oder",
          english: "or",
          malayalam: "അല്ലെങ്കിൽ",
          pronunciation: "oh-der",
          example: "Tee oder Kaffee?",
          exampleTranslation: "Tea or coffee?"
        },
        {
          id: "vocab5-5-10",
          german: "aber",
          english: "but",
          malayalam: "പക്ഷേ",
          pronunciation: "ah-ber",
          example: "Ich bin müde, aber ich lerne weiter.",
          exampleTranslation: "I am tired, but I keep studying."
        },
        {
          id: "vocab5-5-11",
          german: "wenig",
          english: "few / little",
          malayalam: "കുറച്ച്",
          pronunciation: "vey-nig",
          example: "Ich habe wenig Zeit.",
          exampleTranslation: "I have little time."
        },
        {
          id: "vocab5-5-12",
          german: "noch",
          english: "still / yet",
          malayalam: "ഇപ്പോഴും / ഇനിയും",
          pronunciation: "nokh",
          example: "Ich lerne noch Deutsch.",
          exampleTranslation: "I am still learning German."
        },
        {
          id: "vocab5-5-13",
          german: "schon",
          english: "already",
          malayalam: "ഇതിനകം",
          pronunciation: "shohn",
          example: "Ich kann schon ein bisschen Deutsch.",
          exampleTranslation: "I can already speak a little German."
        }
      ]
    }
  ]
};
