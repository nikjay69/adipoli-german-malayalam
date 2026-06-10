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
    "Perfekt tense: 80% of verbs use 'haben'. Movement verbs (gehen, fahren, kommen) use 'sein'. Think of it as 'I have cooked' vs 'I am gone'.",
    "The 'Sandwich' Rule: The conjugated verb (haben/sein) is the first bread, and the past participle is the end bread. Everything else is the filling!",
    "Malayalam Parallel: In German Perfekt, the verb goes to the end — just like in Malayalam! 'Njan food kazhichu' (I food ate) is exactly the structure of 'Ich habe gegessen'.",
  ],
  lessons: [
    {
      id: "13-1",
      title: "Perfekt Tense with haben",
      titleGerman: "Perfekt mit haben",
      description: "Master the most common past tense in German \u2014 the Perfekt with haben. Like saying 'I have done' in English!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "WG Kitchen (In der Küche)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "A Tuesday morning. The kettle is whistling, and Arjun is scrolling through his phone. He asks: 'Was hast du gestern gemacht?' (What did you do yesterday?). In Kerala, we might just say 'Njan padichu' (I studied), but in German, you need a helper verb (haben) and a past participle (gelernt). It's like a 'Sandwich' where the action word sits at the very end. Let's build your first past tense sentence, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the present. Now, let's learn how to tell stories from the past!",
          currentObjective: "Form 'haben' + past participle sentences and understand the 'ge-...-t' pattern",
          nextTeaser: "Next: Movement verbs! Let's see how 'sein' joins the past tense party!",
        },
        kuttanIntro: [
          "Machane! Past tense German-il 'Perfekt' ennu parayum. Ithu nammude 'Kazhichu', 'Vannu' logic pole thanne aanu. Verb eppozhum sentence-inde end-il aayirikkum.",
          "Main tool 'haben' helper verb aanu. 'Ich habe...' + your activity. Most regular verbs stay simple: 'ge-' + stem + '-t'. 'gekocht' (cooked), 'gelernt' (learned).",
          "Remember the 'Sandwich Rule': Bread 1 (haben) is at Position 2. Bread 2 (Participle) is at the VERY END. Let's make a sandwich!",
        ],
        vocabEncounters: [
          { vocabId: "vocab13-1-7", encounterMoment: "Arjun asks about the day: 'Was hast du gestern gemacht?'", contextSentence: "Gestern habe ich viel geschlafen." },
          { vocabId: "vocab13-1-6", encounterMoment: "You point to the stove: 'Ich habe Meen Curry gekocht.'", contextSentence: "Wir haben Meen Curry gekocht." },
          { vocabId: "vocab13-1-4", encounterMoment: "You check your notes: 'Ich habe Deutsch gelernt.'", contextSentence: "Ich habe Deutsch gelernt." },
          { vocabId: "vocab13-1-2", encounterMoment: "Arjun nods: 'Gut gemacht!' (Well done!).", contextSentence: "Ich habe meine Hausaufgaben gemacht." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I learned football'. Where do you place the word 'gespielt'?",
            options: [
              { text: "At the very end of the sentence.", isCorrect: true, response: "Exactly! Bread 2 always stays at the end of the sandwich.", kuttanReaction: "Adipoli! Sandwich logic perfectly capture cheythallo! 🔥" },
              { text: "Right after 'haben'.", isCorrect: false, response: "Aiyyo! In German Perfekt, the participle MUST sit at the end. Don't crowd the helper!", kuttanReaction: "Vite machane! Bread logic marakkallae. Try again! 😬" },
            ],
          },
          {
            moment: "How do you conjugate 'haben' for the subject 'Er' (He)?",
            options: [
              { text: "hat.", isCorrect: true, response: "Correct! Er hat, sie hat, es hat.", kuttanReaction: "Superb! Conjugation logic correctly picked! ⭐" },
              { text: "hast.", isCorrect: false, response: "No! 'hast' is for 'Du'. For 'Er', we use 'hat'.", kuttanReaction: "Aiyyo! 'Du' logic and 'Er' logic separate aanu machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v13-1-1",
          title: "The Past Tense - Perfekt with haben",
          duration: "10:00",
          description: "Learn the Perfekt tense structure using haben \u2014 the most common way to talk about the past in everyday German",
          scriptOutline: [
            "Opening: 'Past tense-ine patti orthu pedikkanda. In everyday German, we use the Perfekt tense for 95% of things! Easy aanu machane!'",
            "THE SANDWICH RULE: Subject + haben (bread 1) + ... + past participle (bread 2 at the VERY END!).",
            "Why it's easy for us: 'Njan biryani kazhichu' (I biryani ate) ennu parayunnathu pole, German-ilum main action word end-il aanu varunnathu!",
            "Conjugation recap: ich habe, du hast, er hat, wir haben, ihr habt, sie/Sie haben. Ithu maatram mind-il fix cheyuka!",
            "Rule of the End: Participle sentence-inte avasanam aanu varuka. Bakki fillings ellam center-il!",
            "Example: 'Ich habe gestern Deutsch gelernt' — I have yesterday German learned. Logic clear aanu!",
            "Visual check: Haben (Pos 2), Participle (Last Pos). Nothing can come after the participle!",
            "Parallel: Think of 'kazhichu', 'padichu', 'kandu' — all these end-of-sentence words are our participles.",
            "Practice: Tell me 3 things you did today in this sandwich style. Set aakkaam!"
          ],
          keyVocabulary: ["haben", "gemacht", "gespielt", "gelernt", "gekauft", "gekocht"],
          learningObjectives: ["Understand the Perfekt tense structure with haben", "Conjugate haben correctly for all persons", "Form sentences about past activities using haben"],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "haben Conjugation in Perfekt",
              headers: ["Person", "haben", "Example"],
              rows: [
                ["ich", "habe", "Ich habe gelernt."],
                ["du", "hast", "Du hast gespielt."],
                ["er/sie/es", "hat", "Er hat gekocht."],
                ["wir", "haben", "Wir haben gekauft."],
                ["ihr", "habt", "Ihr habt gemacht."],
                ["sie/Sie", "haben", "Sie haben getanzt."]
              ]
            },
            {
              type: "note",
              title: "The Sandwich Rule",
              variant: "tip",
              content: "Subject + haben (bread 1) + ... + past participle (bread 2 at the END!). Nothing can come after the participle. Malayalam-il 'kazhichu', 'padichu' end-il varunnathu pole thanne!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "haben", english: "to have", malayalam: "ഉണ്ടായിരിക്കുക", pronunciation: "hah-ben" },
                { german: "gemacht", english: "done/made", malayalam: "ചെയ്തു", pronunciation: "ge-makht" },
                { german: "gelernt", english: "learned", malayalam: "പഠിച്ചു", pronunciation: "ge-lernt" },
                { german: "gekocht", english: "cooked", malayalam: "പാചകം ചെയ്തു", pronunciation: "ge-kokht" }
              ]
            }
          ]
        },
        {
          id: "v13-1-2",
          title: "Regular Past Participles",
          duration: "10:00",
          description: "Learn the simple ge-...-t pattern for regular German verbs in the past tense",
          scriptOutline: [
            "Opening: 'Regular past participles — the easy ones! Nammude regular verbs-ine (machen, lernen, spielen) participle aakkaan oru simple formula und!'",
            "The Formula: ge- + verb stem + -t. It's like a 'ge-t' wrapper around the verb stem.",
            "Examples: machen → ge-mach-t, spielen → ge-spiel-t, lernen → ge-lern-t",
            "Pronunciation check: Make sure the 'ge' is short (not 'gay'). 'ge-makt', 'ge-shpeelt'.",
            "Practice: 'Njan ninnale cook cheythu' — 'Ich habe gestern gekocht.'",
            "Tip: 90% of regular 'en' verbs follow this ge-...-t pattern. Learn the pattern once, and you're set for thousands of verbs!"
          ],
          keyVocabulary: ["gemacht", "gespielt", "gelernt", "gekauft", "gekocht"],
          learningObjectives: ["Form regular past participles using the ge-...-t pattern", "Recognize regular verb patterns", "Create past tense sentences with regular verbs"],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Regular Past Participle: ge- + stem + -t",
              headers: ["Verb", "Stem", "Participle"],
              rows: [
                ["machen", "mach", "gemacht"],
                ["spielen", "spiel", "gespielt"],
                ["lernen", "lern", "gelernt"],
                ["kaufen", "kauf", "gekauft"],
                ["kochen", "koch", "gekocht"]
              ]
            },
            {
              type: "note",
              title: "90% Rule",
              variant: "info",
              content: "90% of regular German verbs follow the ge-...-t pattern. Learn this one formula and you can form the past tense of thousands of verbs!"
            },
            {
              type: "note",
              title: "Pronunciation Tip",
              variant: "tip",
              content: "The 'ge-' prefix is always short — say 'guh', not 'gay'. Practice: ge-makht, ge-shpeelt, ge-lernt."
            }
          ]
        }
      ],
      exercises: [
        { id: "ex13-1-1", type: "multiple-choice", question: "What is the correct Perfekt form? 'Ich _____ Fußball _____.'", options: ["habe ... gespielt", "bin ... gespielt", "habe ... spielen", "hat ... gespielt"], correctAnswer: "habe ... gespielt", explanation: "spielen (to play) uses 'haben' as the helper verb. 'Ich' takes 'habe'. The past participle 'gespielt' must go to the very end of the sentence. bin + gespielt is wrong because we don't travel while playing soccer usually!", xpReward: 10 },
        { id: "ex13-1-2", type: "fill-blank", question: "Complete: Er _____ das Essen gekocht. (He cooked the food.)", options: ["hat", "habe", "haben", "ist"], correctAnswer: "hat", explanation: "'Er' (he) is 3rd person singular, which always takes 'hat'. kochen (to cook) is an action that uses 'haben'.", xpReward: 10 },
        { id: "ex13-1-3", type: "multiple-choice", question: "What is the past participle of 'machen'?", options: ["gemacht", "gemachen", "gemakt", "machte"], correctAnswer: "gemacht", explanation: "Regular verbs follow the ge- + stem + -t rule. Stem of machen is 'mach', so it becomes ge-mach-t.", xpReward: 10 },
        { id: "ex13-1-4", type: "matching", question: "Match the verb to its past participle:", options: ["spielen", "lernen", "kaufen", "kochen"], correctAnswer: ["gespielt", "gelernt", "gekauft", "gekocht"], explanation: "All these verbs are regular (Schwache Verben) and follow the ge-...-t pattern.", xpReward: 15 },
        { id: "ex13-1-5", type: "fill-blank", question: "Complete: Wir _____ gestern Deutsch _____. (We learned German yesterday.)", options: ["haben ... gelernt", "sind ... gelernt", "habt ... gelernt", "haben ... lernen"], correctAnswer: "haben ... gelernt", explanation: "'Wir' uses 'haben'. Lernen is an activity (not travel/change of state), so it uses haben. gelernt is the correct participle form.", xpReward: 10 },
        { id: "ex13-1-6", type: "ordering", question: "Put the words in the correct order to form a Perfekt sentence:", options: ["habe", "Ich", "gekauft", "ein Buch"], correctAnswer: ["Ich", "habe", "ein Buch", "gekauft"], explanation: "Remember the Sandwich! Haben (habe) at Position 2, and the participle (gekauft) at the very end. The object (ein Buch) goes in the middle.", xpReward: 20 },
        { id: "ex13-1-7", type: "multiple-choice", question: "Which conjugation of 'haben' goes with 'ihr'?", options: ["habt", "haben", "hast", "hat"], correctAnswer: "habt", explanation: "'Ihr' (you all) always takes 'habt'. Example: 'Ihr habt gut gelernt.' (You all learned well.)", xpReward: 10 },
        { id: "ex13-1-8", type: "fill-blank", question: "Complete: Du _____ sehr gut _____. (You cooked very well.)", options: ["hast ... gekocht", "hat ... gekocht", "haben ... gekocht", "habe ... gekocht"], correctAnswer: "hast ... gekocht", explanation: "'Du' takes 'hast'. kochen is a regular verb: ge- + koch + -t = gekocht.", xpReward: 10 },
        {
          id: "ex13-1-9",
          type: "dictation",
          question: "Listen and type: Ich habe Deutsch gelernt.",
          correctAnswer: "Ich habe Deutsch gelernt",
          explanation: "Perfect! 'Haben' in position 2, 'gelernt' at the very end. The classic Perfekt sandwich!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-learned-german.mp3"
        },
        {
          id: "ex13-1-10",
          type: "free-text",
          question: "Write in German: 'I cooked' (use gekocht)",
          correctAnswer: "Ich habe gekocht",
          explanation: "Wunderbar! 'Ich habe gekocht' is the correct past tense for 'I cooked'.",
          xpReward: 30
        }
      ,
        {
          id: "ex13-1-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Perfekt Tense with haben): 'Gestern habe ich Deutsch gelernt.'",
          questionGerman: "Sprechen Sie laut: 'Gestern habe ich Deutsch gelernt.'",
          correctAnswer: "Gestern habe ich Deutsch gelernt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab13-1-1", german: "haben", english: "to have", malayalam: "\u0D09\u0D23\u0D4D\u0D1F\u0D3E\u0D2F\u0D3F\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D41\u0D15", pronunciation: "hah-ben", example: "Ich habe einen Hund.", exampleTranslation: "I have a dog." },
        { id: "vocab13-1-2", german: "gemacht", english: "done / made", malayalam: "ചെയ്തു", pronunciation: "ge-makt", example: "Ich habe meine Hausaufgaben gemacht.", exampleTranslation: "I did my homework." },
        { id: "vocab13-1-3", german: "gespielt", english: "played", malayalam: "കളിച്ചു", pronunciation: "ge-shpeelt", example: "Er hat Fußball gespielt.", exampleTranslation: "He played football." },
        { id: "vocab13-1-4", german: "gelernt", english: "learned", malayalam: "പഠിച്ചു", pronunciation: "ge-lairnt", example: "Ich habe Deutsch gelernt.", exampleTranslation: "I learned German." },
        { id: "vocab13-1-5", german: "gekauft", english: "bought", malayalam: "വാങ്ങി", pronunciation: "ge-kowft", example: "Sie hat ein neues Kleid gekauft.", exampleTranslation: "She bought a new dress." },
        { id: "vocab13-1-6", german: "gekocht", english: "cooked", malayalam: "പാചകം ചെയ്തു", pronunciation: "ge-kokht", example: "Wir haben Meen Curry gekocht.", exampleTranslation: "We cooked fish curry." },
        { id: "vocab13-1-7", german: "gestern", english: "yesterday", malayalam: "ഇന്നലെ", pronunciation: "gess-tern", example: "Gestern habe ich viel geschlafen.", exampleTranslation: "Yesterday I slept a lot." },
        { id: "vocab13-1-8", german: "das Perfekt", english: "the perfect tense (past)", malayalam: "പെർഫെക്ട് ടെൻസ് (ഭൂതകാലം)", pronunciation: "pair-fekt", example: "Das Perfekt ist wichtig.", exampleTranslation: "The Perfekt is important." },
        { id: "vocab13-1-9", german: "gearbeitet", english: "worked", malayalam: "ജോലി ചെയ്തു", pronunciation: "ge-ar-by-tet", example: "Er hat den ganzen Tag hart gearbeitet.", exampleTranslation: "He worked hard the whole day." },
        { id: "vocab13-1-10", german: "gehört", english: "heard / listened", malayalam: "കേട്ടു", pronunciation: "ge-hurt", example: "Hast du das gehört?", exampleTranslation: "Did you hear that?" }
      ]
    },
    {
      id: "13-2",
      title: "Perfekt Tense with sein",
      titleGerman: "Perfekt mit sein",
      description: "Some verbs use 'sein' instead of 'haben' in the past tense — mostly verbs about moving or changing!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Main Station (Am Bahnhof)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "You're at the station, looking at the departure board. You just got back from a weekend trip. In German, if you travel from Point A to Point B, the 'haben' sandwich doesn't work. You need 'sein'. You tell Arjun: 'Ich bin nach Hamburg gefahren'. It feels strange at first—like saying 'I am driven' instead of 'I have driven'—but it's the only way to talk about your adventures! Ready to move, machane?",
        },
        narrative: {
          previousRecap: "You've mastered the daily activities with 'haben'. Now, let's look at your travels!",
          currentObjective: "Identify movement and change-of-state verbs that use 'sein' and form correct sentences",
          nextTeaser: "Next: Irregular verbs! Let's see what happens to 'essen' and 'trinken'!",
        },
        kuttanIntro: [
          "Machane! Every past tense verb 'haben' use cheyyilla. If there is movement (Point A to Point B), you MUST use 'sein'. 'Ich bin gegangen', 'Ich bin gefahren'. Travel logic!",
          "Pinne oru special exception undu: 'bleiben' (to stay). Ivide movement illa, but still 'sein' thanne use cheyyanam. 'Ich bin zu Hause geblieben'. Don't ask why, just fix it in your mind!",
          "Sentence structure same aanu — helper verb in Pos 2, participle at the VERY END. Let's go!",
        ],
        vocabEncounters: [
          { vocabId: "vocab13-2-2", encounterMoment: "You show a photo: 'Ich bin nach Hamburg gefahren.'", contextSentence: "Sie ist nach Hamburg gefahren." },
          { vocabId: "vocab13-2-1", encounterMoment: "You point to the map: 'Ich bin ins Kino gegangen.'", contextSentence: "Ich bin ins Kino gegangen." },
          { vocabId: "vocab13-2-8", encounterMoment: "You note: 'Gestern bin ich zu Hause geblieben.'", contextSentence: "Ich bin zu Hause geblieben." },
          { vocabId: "vocab13-2-4", encounterMoment: "Arjun says: 'Er ist gestern gekommen.' (He came yesterday).", contextSentence: "Er ist gestern gekommen." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I went to Berlin'. Which helper verb do you use?",
            options: [
              { text: "bin.", isCorrect: true, response: "Exactly! 'gehen' is movement, so use 'sein' (bin).", kuttanReaction: "Adipoli! Movement logic perfectly capture cheythallo! 🔥" },
              { text: "habe.", isCorrect: false, response: "Aiyyo! 'haben' is for static activities. Movement verbs need 'sein'.", kuttanReaction: "Vite machane! Travel equals 'sein'. Try again! 😬" },
            ],
          },
          {
            moment: "You stayed at home all day. How do you say it correctly?",
            options: [
              { text: "Ich bin zu Hause geblieben.", isCorrect: true, response: "Correct! 'bleiben' is the famous exception that uses 'sein'.", kuttanReaction: "Superb! Exception logic correctly picked! ⭐" },
              { text: "Ich habe zu Hause geblieben.", isCorrect: false, response: "No! Even though you didn't move, 'bleiben' always takes 'sein'.", kuttanReaction: "Aiyyo! 'bleiben' exception marakkallae machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v13-2-1",
          title: "Movement & Change = sein!",
          duration: "10:00",
          description: "Discover why certain German verbs use sein instead of haben in the Perfekt tense",
          scriptOutline: [
            "Opening: 'Eppozhum \"Haben\" maatram pora machane! Some verbs are special — they prefer \"Sein\".'",
            "Point A to Point B: If you are moving (gehen, fahren, kommen), you use SEIN. Travel logic aanu!",
            "State Change: State change (waking up, dying) or location movement verbs 'Sein' helper verb use cheyyum.",
            "Sein Recap: ich bin, du bist, er ist, wir sind, ihr seid, sie/Sie sind. Correct aayi fix cheyyanam!",
            "Sandwich Logic: Sein (Pos 2) ... Participle (End). Bread pattern same aanu.",
            "Example: 'Ich bin nach Kochi gefahren' (I have traveled to Kochi).",
            "Malayalam: 'Njan Kochi-yil poyi' — the 'poyi' logic matches the end participle.",
            "List: gehen (gegangen), fahren (gefahren), kommen (gekommen), bleiben (geblieben).",
            "TWIST: 'bleiben' (stay) is the exception. No movement, but still 'Sein' verb aanu. Mind it!",
            "Practice: Choose Haben or Sein for 3 daily activities!"
          ],
          keyVocabulary: ["sein", "gegangen", "gefahren", "geflogen", "gekommen"],
          learningObjectives: ["Understand why some verbs use sein", "Identify movement and change-of-state verbs", "Form correct Perfekt sentences with sein"],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "sein Conjugation in Perfekt",
              headers: ["Person", "sein", "Example"],
              rows: [
                ["ich", "bin", "Ich bin gegangen."],
                ["du", "bist", "Du bist gefahren."],
                ["er/sie/es", "ist", "Er ist gekommen."],
                ["wir", "sind", "Wir sind geflogen."],
                ["ihr", "seid", "Ihr seid gelaufen."],
                ["sie/Sie", "sind", "Sie sind geblieben."]
              ]
            },
            {
              type: "note",
              title: "When to Use sein?",
              variant: "tip",
              content: "Movement from A to B (gehen, fahren, fliegen) or change of state (aufwachen, sterben) = sein. Exception: 'bleiben' (stay) also uses sein even without movement!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "gegangen", english: "gone/walked", malayalam: "പോയി", pronunciation: "ge-gang-en" },
                { german: "gefahren", english: "driven/traveled", malayalam: "യാത്ര ചെയ്തു", pronunciation: "ge-fah-ren" },
                { german: "gekommen", english: "come", malayalam: "വന്നു", pronunciation: "ge-ko-men" },
                { german: "geblieben", english: "stayed", malayalam: "താമസിച്ചു", pronunciation: "ge-blee-ben" }
              ]
            }
          ]
        },
        {
          id: "v13-2-2",
          title: "Common sein-Verbs",
          duration: "10:00",
          description: "Master the most frequently used verbs that take sein in the Perfekt",
          scriptOutline: ["gehen \u2192 gegangen, fahren \u2192 gefahren, fliegen \u2192 geflogen", "kommen \u2192 gekommen, laufen \u2192 gelaufen", "Special: sein \u2192 gewesen, werden \u2192 geworden, bleiben \u2192 geblieben", "bleiben uses sein even without movement!"],
          keyVocabulary: ["gegangen", "gefahren", "geflogen", "gekommen", "gelaufen", "gewesen", "geworden", "geblieben"],
          learningObjectives: ["Know the most common sein-verbs", "Use sein-verbs correctly in sentences", "Remember special cases like bleiben"],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "Common sein-Verbs & Their Participles",
              headers: ["Verb", "Participle", "Meaning"],
              rows: [
                ["gehen", "gegangen", "went/walked"],
                ["fahren", "gefahren", "drove/traveled"],
                ["fliegen", "geflogen", "flew"],
                ["kommen", "gekommen", "came"],
                ["laufen", "gelaufen", "ran"],
                ["bleiben", "geblieben", "stayed"],
                ["sein", "gewesen", "was/been"],
                ["werden", "geworden", "became"]
              ]
            },
            {
              type: "note",
              title: "bleiben = Exception!",
              variant: "warning",
              content: "bleiben (to stay) uses 'sein' even though there's NO movement. It's the famous exception — memorize it! 'Ich bin zu Hause geblieben.'"
            },
            {
              type: "vocabulary",
              items: [
                { german: "gewesen", english: "been", malayalam: "ആയിരുന്നു", pronunciation: "ge-vay-zen" },
                { german: "geworden", english: "became", malayalam: "ആയിത്തീർന്നു", pronunciation: "ge-vor-den" },
                { german: "gelaufen", english: "ran", malayalam: "ഓടി", pronunciation: "ge-low-fen" }
              ]
            }
          ]
        }
      ],
      exercises: [
        { id: "ex13-2-1", type: "multiple-choice", question: "Which helper verb is used for 'gehen' (to go)?", options: ["sein", "haben", "werden", "machen"], correctAnswer: "sein", explanation: "'Gehen' involves movement from one place to another (Point A to Point B), so it requires 'sein' as the helper verb in Perfekt.", xpReward: 10 },
        { id: "ex13-2-2", type: "fill-blank", question: "Complete: Ich _____ nach Hause gegangen.", options: ["bin", "habe", "bist", "ist"], correctAnswer: "bin", explanation: "'Ich' goes with 'bin'. Since 'gegangen' is a movement verb, we use 'bin' instead of 'habe'.", xpReward: 10 },
        { id: "ex13-2-3", type: "multiple-choice", question: "Which of these verbs uses 'sein'?", options: ["kommen (to come)", "kochen (to cook)", "lernen (to learn)", "lesen (to read)"], correctAnswer: "kommen (to come)", explanation: "'Kommen' is a movement from one place to another. Kochen, lernen, and lesen are activities that don't involve a change of location, so they use 'haben'.", xpReward: 10 },
        { id: "ex13-2-4", type: "multiple-choice", question: "What is the helper verb for 'bleiben' (to stay)?", options: ["sein", "haben", "ist", "war"], correctAnswer: "sein", explanation: "'Bleiben' is a famous exception! Even though there's no movement, it always takes 'sein' in the past tense.", xpReward: 10 },
        { id: "ex13-2-5", type: "fill-blank", question: "Complete: Wir _____ nach Berlin geflogen.", options: ["sind", "haben", "seid", "ist"], correctAnswer: "sind", explanation: "'Wir' takes 'sind'. Flying (fliegen) is movement, so we use the helper verb 'sein'.", xpReward: 10 },
        { id: "ex13-2-6", type: "ordering", question: "Put the words in order: ist / Er / gekommen / gestern", options: ["Er", "ist", "gestern", "gekommen."], correctAnswer: ["Er", "ist", "gestern", "gekommen."], explanation: "The 'Sein' sandwich! Helper verb 'ist' at position 2, and the participle 'gekommen' at the very end.", xpReward: 20 },
        { id: "ex13-2-7", type: "multiple-choice", question: "Is the sentence 'Ich habe nach Hause gegangen' correct?", options: ["No, it should be 'Ich bin nach Hause gegangen'", "Yes, it is correct", "Only in formal German", "No, it should be 'Ich bin nach Hause gegangen'"], correctAnswer: "No, it should be 'Ich bin nach Hause gegangen'", explanation: "'Gehen' is a verb of movement. In German, movement verbs MUST use 'sein' (bin, bist, ist...). English uses 'have gone', but German says 'am gone'.", xpReward: 10 },
        {
          id: "ex13-2-8",
          type: "dictation",
          question: "Listen and type: Ich bin nach Hause gegangen.",
          correctAnswer: "Ich bin nach Hause gegangen",
          explanation: "Perfect! 'Gehen' is a movement verb, so it takes 'sein' (bin).",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-went-home.mp3"
        },
        {
          id: "ex13-2-9",
          type: "free-text",
          question: "Translate to German: 'We flew to Kerala.' (flew = geflogen)",
          correctAnswer: "Wir sind nach Kerala geflogen",
          explanation: "Excellent! 'Fliegen' is movement, so we use 'sind'.",
          xpReward: 30
        }
      ,
        {
          id: "ex13-2-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Perfekt Tense with sein): 'Gestern habe ich Deutsch gelernt.'",
          questionGerman: "Sprechen Sie laut: 'Gestern habe ich Deutsch gelernt.'",
          correctAnswer: "Gestern habe ich Deutsch gelernt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      description: "Tackle the tricky irregular verbs — they change their stem, but once you learn the patterns, they're not so scary!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Local Restaurant (Im Restaurant)",
          sceneType: "restaurant",
          timeOfDay: "evening",
          description: "A cozy dinner setting with warm lights. You're sharing a meal with Arjun. In Kerala, we say 'Kazhichu' (ate) for everything, but in German, 'essen' becomes 'gegessen' and 'trinken' becomes 'getrunken'. These are the 'Irregular' ones. They don't like the '-t' ending; they prefer '-en'. It's like learning the irregular plurals in English. But don't worry, the patterns are musical, machane!",
        },
        narrative: {
          previousRecap: "You've moved across the city. Now, let's look at the verbs that change their shape!",
          currentObjective: "Recognize irregular past participle patterns (ge-...-en) and use them correctly",
          nextTeaser: "Next: Telling your full weekend story! Let's put everything together!",
        },
        kuttanIntro: [
          "Machane! Some verbs in German are a bit rebellious. They don't end in '-t' for the past tense. Instead, they end in '-en'.",
          "Main ones are eating and drinking — 'gegessen' and 'getrunken'. Vowel change sradhikkanne: 'trinken' becomes 'getrunken'. Musical vibe aanu!",
          "Pinne 'sehen' (see) stays simple: 'gesehen'. If you see a movie, 'Ich habe einen Film gesehen'. Let's master these rebels!",
        ],
        vocabEncounters: [
          { vocabId: "vocab13-3-1", encounterMoment: "You look at your plate: 'Ich habe Biryani gegessen.'", contextSentence: "Ich habe Biryani gegessen." },
          { vocabId: "vocab13-3-2", encounterMoment: "Arjun drinks water: 'Ich habe Wasser getrunken.'", contextSentence: "Er hat Kaffee getrunken." },
          { vocabId: "vocab13-3-5", encounterMoment: "You mention: 'Ich habe einen Film gesehen.'", contextSentence: "Wir haben einen Film gesehen." },
          { vocabId: "vocab13-3-7", encounterMoment: "Stefan adds: 'Wir haben Deutsch gesprochen.' (We spoke German).", contextSentence: "Wir haben Deutsch gesprochen." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I ate'. Which past participle is correct?",
            options: [
              { text: "gegessen.", isCorrect: true, response: "Exactly! 'essen' becomes 'gegessen'.", kuttanReaction: "Adipoli! Irregular logic perfectly capture cheythallo! 🔥" },
              { text: "geesst.", isCorrect: false, response: "Aiyyo! 'geesst' exists only in dreams. Use 'gegessen'.", kuttanReaction: "Vite machane! Rebels don't take '-t'. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'I drank a coffee'. Where does 'getrunken' go?",
            options: [
              { text: "At the very end of the clause.", isCorrect: true, response: "Correct! Even for irregulars, the sandwich rule applies.", kuttanReaction: "Superb! Sentence structure remains the same. ⭐" },
              { text: "Right after 'hat'.", isCorrect: false, response: "No! Participle stays at the end, regular or irregular.", kuttanReaction: "Aiyyo! Position 2 is for the helper verb only. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v13-3-1",
          title: "The Irregular Ones - ge-...-en",
          duration: "10:00",
          description: "Learn the ge-...-en pattern for irregular past participles",
          scriptOutline: [
            "Opening: 'Ini kure irregular verbs-ine patti parayaam. They don't follow the ge-...-t rule. They are a bit rebellious!'",
            "The Ending Trap: Irregular verbs (Strong Verbs) usually end in -en, not -t. (e.g., essen → gegessen).",
            "The Vowel Shift: Sometimes the middle vowel changes. (e.g., trinken → getrunken, singen → gesungen).",
            "Common 'Must-Know' list: essen (gegessen), trinken (getrunken), sehen (gesehen), lesen (gelesen), schlafen (geschlafen).",
            "Mnemonics: 'Singen, sang, gesungen' — practice the rhythm! It's like a song.",
            "Visual Patterns: Group verbs by their sound shift. (e.g., i-a-u group: trinken/singen/springen).",
            "Kerala connection: Think of Malayalam irregulars like 'kaanka' (see) → 'kandu'. Every language has them, don't worry!",
            "Practice: Test your memory on these 5 daily life verbs."
          ],
          keyVocabulary: ["gegessen", "getrunken", "geschrieben", "gelesen", "gesehen", "genommen", "gesprochen"],
          learningObjectives: ["Recognize the ge-...-en pattern", "Know common irregular past participles", "Use them in sentences"],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Common Irregular Past Participles (ge-...-en)",
              headers: ["Verb", "Participle", "Vowel Change?"],
              rows: [
                ["essen", "gegessen", "No"],
                ["trinken", "getrunken", "i → u"],
                ["schreiben", "geschrieben", "ei → ie"],
                ["sehen", "gesehen", "No"],
                ["lesen", "gelesen", "No"],
                ["schlafen", "geschlafen", "No"],
                ["sprechen", "gesprochen", "e → o"]
              ]
            },
            {
              type: "note",
              title: "i-a-u Sound Group",
              variant: "tip",
              content: "Some verbs follow the i-a-u pattern: trinken (drank/getrunken), singen (sang/gesungen), springen (sprang/gesprungen). Practice the rhythm like a song!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "gegessen", english: "eaten", malayalam: "കഴിച്ചു", pronunciation: "ge-gess-en" },
                { german: "getrunken", english: "drunk", malayalam: "കുടിച്ചു", pronunciation: "ge-trunk-en" },
                { german: "geschrieben", english: "written", malayalam: "എഴുതി", pronunciation: "ge-shree-ben" },
                { german: "gesprochen", english: "spoken", malayalam: "സംസാരിച്ചു", pronunciation: "ge-shpro-khen" }
              ]
            }
          ]
        },
        {
          id: "v13-3-2",
          title: "Most Common Irregular Verbs",
          duration: "10:00",
          description: "Special rules \u2014 verbs with no ge- prefix and -ieren verbs",
          scriptOutline: ["Inseparable prefixes: be-, er-, ver-, ent- \u2192 NO ge-!", "besuchen \u2192 besucht, verstehen \u2192 verstanden", "-ieren verbs: telefonieren \u2192 telefoniert, studieren \u2192 studiert"],
          keyVocabulary: ["besucht", "verstanden", "erz\u00e4hlt", "telefoniert", "studiert"],
          learningObjectives: ["Know which verbs don't take ge-", "Form past participles for inseparable prefix verbs", "Handle -ieren verbs"],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "No ge- Prefix Rules",
              headers: ["Rule", "Verb", "Participle"],
              rows: [
                ["be-", "besuchen", "besucht"],
                ["ver-", "verstehen", "verstanden"],
                ["er-", "erzählen", "erzählt"],
                ["ent-", "entschuldigen", "entschuldigt"],
                ["-ieren", "telefonieren", "telefoniert"],
                ["-ieren", "studieren", "studiert"]
              ]
            },
            {
              type: "note",
              title: "No ge- for Inseparable Prefixes!",
              variant: "warning",
              content: "Verbs starting with be-, er-, ver-, ent-, emp-, zer- NEVER get 'ge-'. Also -ieren verbs skip 'ge-'. So it's 'besucht' NOT 'gebesucht'!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex13-3-1", type: "multiple-choice", question: "What is the past participle of 'essen' (to eat)?", options: ["geessen", "gegessen", "geesst", "gegessent"], correctAnswer: "gegessen", explanation: "'Essen' is irregular. It follows the ge-...-en pattern, and adds an extra 'g' for pronunciation: ge-g-essen.", xpReward: 10 },
        { id: "ex13-3-2", type: "fill-blank", question: "Complete: Ich habe viel Wasser _____. (I drank lot of water.)", options: ["getrunken", "getrinkt", "getranken", "getrunkt"], correctAnswer: "getrunken", explanation: "Trinken is part of the i-a-u group. The participle becomes 'getrunken'.", xpReward: 10 },
        { id: "ex13-3-3", type: "multiple-choice", question: "Which past participle is correct for 'sehen' (to see)?", options: ["gesehen", "geseht", "gesohn", "gesiehen"], correctAnswer: "gesehen", explanation: "'Sehen' stays very similar but ends in -en: ge-seh-en. No vowel change here!", xpReward: 10 },
        { id: "ex13-3-4", type: "multiple-choice", question: "What is the past participle of 'schreiben' (to write)?", options: ["geschrieben", "geschreibt", "geschreiben", "geschrobben"], correctAnswer: "geschrieben", explanation: "In 'schreiben', the 'ei' flips to 'ie' in the past participle: ge-schr-ie-ben.", xpReward: 10 },
        { id: "ex13-3-5", type: "fill-blank", question: "Complete: Hast du das Buch _____? (Have you read the book?)", options: ["gelesen", "gelest", "gelest", "gelesen"], correctAnswer: "gelesen", explanation: "'Lesen' (to read) is irregular and ends in -en: ge-les-en.", xpReward: 10 },
        { id: "ex13-3-6", type: "multiple-choice", question: "How do you say 'I have seen you'?", options: ["Ich habe dich gesehen.", "Ich habe dich geseht.", "Ich bin dich gesehen.", "Ich habe du gesehen."], correctAnswer: "Ich habe dich gesehen.", explanation: "Structure: Subject (Ich) + Helper (habe) + Object (dich) + Participle (gesehen). 'Sehen' is not movement, so we use 'haben'.", xpReward: 10 },
        {
          id: "ex13-3-7",
          type: "dictation",
          question: "Listen and type: Ich habe Biryani gegessen.",
          correctAnswer: "Ich habe Biryani gegessen",
          explanation: "Great! 'Essen' becomes 'gegessen' in the past. Adipoli!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-ate-biryani.mp3"
        },
        {
          id: "ex13-3-8",
          type: "free-text",
          question: "Write in German: 'He drank a coffee.' (drank = getrunken, coffee = einen Kaffee)",
          correctAnswer: "Er hat einen Kaffee getrunken",
          explanation: "Wunderbar! 'Er hat einen Kaffee getrunken.' — 'getrunken' goes to the very end.",
          xpReward: 30
        }
      ,
        {
          id: "ex13-3-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Irregular Past Participles): 'Gestern habe ich Deutsch gelernt.'",
          questionGerman: "Sprechen Sie laut: 'Gestern habe ich Deutsch gelernt.'",
          correctAnswer: "Gestern habe ich Deutsch gelernt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "Main Street (In der Stadt)",
          sceneType: "station",
          timeOfDay: "afternoon",
          description: "A bright Monday. You're walking with Arjun near the city center. He wants to know everything about your weekend. In Kerala, we tell stories with 'ennitu' (and then) and 'pinne' (after that), and German has equivalent tools: 'zuerst', 'dann', and 'danach'. You're stitching your thoughts together into a real narrative. From the moment you 'aufgestanden' (woke up) to when you 'eingekauft' (shopped). This is your first long speech in German! You got this, machane!",
        },
        narrative: {
          previousRecap: "You've learned the verbs. Now, let's learn how to connect them into a story!",
          currentObjective: "Narrate a full weekend story using sequential connectors and correct past tense forms",
          nextTeaser: "Final Lesson: Time expressions! Let's see how to say 'two days ago'!",
        },
        kuttanIntro: [
          "Machane! Narrative parayumpol order is important. 'Zuerst' (first) ennu vechu start cheyyuka. 'Zuerst habe ich gefrühstückt'.",
          "Pinne 'dann' (then) or 'danach' (after that) use cheythu flow maintain cheyyaam. Verb is always in Pos 2 if you start with these words!",
          "Story end cheyyan 'zum Schluss' (finally) use cheyyuka. Full flow set aakaam. Let's practice your weekend report!",
        ],
        vocabEncounters: [
          { vocabId: "vocab13-4-1", encounterMoment: "You start your story: 'Zuerst bin ich joggen gegangen.'", contextSentence: "Zuerst habe ich gefrühstückt." },
          { vocabId: "vocab13-4-2", encounterMoment: "You continue: 'Dann habe ich gefrühstückt.'", contextSentence: "Dann bin ich in die Stadt gefahren." },
          { vocabId: "vocab13-4-5", encounterMoment: "You finish: 'Zum Schluss bin ich schlafen gegangen.'", contextSentence: "Zum Schluss bin ich ins Bett gegangen." },
          { vocabId: "vocab13-4-8", encounterMoment: "You mention: 'Ich habe im Supermarkt eingekauft.'", contextSentence: "Wir haben im Supermarkt eingekauft." },
        ],
        decisionPoints: [
          {
            moment: "You want to start your story with 'At first'. Which word do you choose?",
            options: [
              { text: "zuerst.", isCorrect: true, response: "Exactly! 'zuerst' is the standard way to begin a sequence.", kuttanReaction: "Adipoli! Connector logic perfectly capture cheythallo! 🔥" },
              { text: "dann.", isCorrect: false, response: "Aiyyo! 'dann' usually follows 'zuerst'. Start with the first one!", kuttanReaction: "Vite machane! Sequence marakkallae. Try again! 😬" },
            ],
          },
          {
            moment: "If you start a sentence with 'Dann', where does the verb 'habe' go?",
            options: [
              { text: "At position 2.", isCorrect: true, response: "Correct! The verb-second rule is non-negotiable.", kuttanReaction: "Superb! Sentence structure logic correctly noted! ⭐" },
              { text: "At the end.", isCorrect: false, response: "No! Only the participle goes to the end. The helper verb stays in the second position.", kuttanReaction: "Aiyyo! Pos 2 is for the verb, Pos 1 can be 'Dann'. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v13-4-1",
          title: "Mein Wochenende - Telling Stories in German",
          duration: "10:00",
          description: "Learn to narrate a full weekend story using the Perfekt tense and connecting words",
          scriptOutline: ["Connectors: zuerst (first), dann (then), danach (after that), sp\u00e4ter (later), zum Schluss (finally)", "Full story example using connectors", "Tips for flowing stories: Mix up word order!"],
          keyVocabulary: ["zuerst", "dann", "danach", "sp\u00e4ter", "zum Schluss", "am Ende", "aufgestanden", "gefr\u00fchst\u00fcckt", "eingekauft"],
          learningObjectives: ["Narrate a complete story in the Perfekt tense", "Use connecting words to create flowing narratives", "Combine haben and sein verbs naturally"],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Story Connectors (Time Order)",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["zuerst", "first", "ആദ്യം"],
                ["dann", "then", "പിന്നെ"],
                ["danach", "after that", "അതിനു ശേഷം"],
                ["später", "later", "പിന്നീട്"],
                ["zum Schluss", "finally", "ഒടുവിൽ"]
              ]
            },
            {
              type: "note",
              title: "Word Order with Connectors",
              variant: "tip",
              content: "When you start a sentence with a connector (Zuerst, Dann...), the verb comes right after it in position 2: 'Zuerst HABE ich gefrühstückt. Dann BIN ich in die Stadt gefahren.'"
            },
            {
              type: "note",
              title: "Mix haben & sein!",
              variant: "info",
              content: "A good weekend story uses BOTH helper verbs: 'Ich habe gefrühstückt' (haben) + 'Ich bin in die Stadt gefahren' (sein). Mixing them makes your German sound natural!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex13-4-1", type: "ordering", question: "Put these weekend activities in a logical order:", options: ["Ich habe zu Abend gegessen.", "Ich bin aufgestanden.", "Ich habe gefr\u00fchst\u00fcckt.", "Ich bin ins Bett gegangen."], correctAnswer: ["Ich bin aufgestanden.", "Ich habe gefr\u00fchst\u00fcckt.", "Ich habe zu Abend gegessen.", "Ich bin ins Bett gegangen."], xpReward: 20 },
        { id: "ex13-4-2", type: "fill-blank", question: "Complete: _____ habe ich gefr\u00fchst\u00fcckt. _____ bin ich in die Stadt gefahren. (First... Then...)", options: ["Zuerst ... Dann", "Dann ... Zuerst", "Sp\u00e4ter ... Danach", "Am Ende ... Zuerst"], correctAnswer: "Zuerst ... Dann", explanation: "zuerst = first, dann = then. The most basic story connectors.", xpReward: 10 },
        { id: "ex13-4-3", type: "multiple-choice", question: "Which sentence uses the Perfekt correctly?", options: ["Am Samstag bin ich aufgestanden.", "Am Samstag habe ich aufgestanden.", "Am Samstag bin ich aufstehen.", "Am Samstag ich aufgestanden bin."], correctAnswer: "Am Samstag bin ich aufgestanden.", explanation: "aufstehen (to get up) indicates a change of state/position \u2192 uses sein. With a time expression first, the conjugated verb stays in second position.", xpReward: 10 },
        { id: "ex13-4-4", type: "matching", question: "Match the German connector to its English meaning:", options: ["zuerst", "dann", "danach", "zum Schluss"], correctAnswer: ["first", "then", "after that", "finally"], xpReward: 15 },
        { id: "ex13-4-5", type: "multiple-choice", question: "What does 'Ich habe eingekauft' mean?", options: ["I went shopping", "I cooked", "I went out", "I cleaned up"], correctAnswer: "I went shopping", explanation: "einkaufen = to shop. Ich habe eingekauft = I went shopping.", xpReward: 10 },
        { id: "ex13-4-6", type: "ordering", question: "Arrange the connectors from first to last:", options: ["zum Schluss", "danach", "zuerst", "dann"], correctAnswer: ["zuerst", "dann", "danach", "zum Schluss"], xpReward: 15 },
        { id: "ex13-4-7", type: "fill-blank", question: "Complete: Am Sonntag _____ ich lange _____. (On Sunday I slept in.)", options: ["habe ... geschlafen", "bin ... geschlafen", "habe ... schlafen", "bin ... geschlaft"], correctAnswer: "habe ... geschlafen", explanation: "schlafen uses haben (no movement). schlafen \u2192 geschlafen (irregular).", xpReward: 10 },
        { id: "ex13-4-8", type: "ordering", question: "Build a weekend story \u2014 put in logical order:", options: ["Danach habe ich einen Film gesehen.", "Zuerst bin ich joggen gegangen.", "Sp\u00e4ter habe ich zu Abend gegessen.", "Dann habe ich geduscht und gefr\u00fchst\u00fcckt."], correctAnswer: ["Zuerst bin ich joggen gegangen.", "Dann habe ich geduscht und gefr\u00fchst\u00fcckt.", "Danach habe ich einen Film gesehen.", "Sp\u00e4ter habe ich zu Abend gegessen."], xpReward: 20 },
        {
          id: "ex13-4-9",
          type: "dictation",
          question: "Listen and type: Zuerst habe ich gefrühstückt.",
          correctAnswer: "Zuerst habe ich gefrühstückt",
          explanation: "Great job! Using connectors makes your German sound more natural.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-first-breakfast.mp3"
        },
        {
          id: "ex13-4-10",
          type: "free-text",
          question: "Translate to German: 'Then I went shopping.' (Then = Dann, shopping = eingekauft)",
          correctAnswer: "Dann habe ich eingekauft",
          explanation: "Excellent! 'Dann' occupies position 1, 'habe' stays at position 2.",
          xpReward: 30
        }
      ,
        {
          id: "ex13-4-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Telling Stories — My Weekend): 'Gestern habe ich Deutsch gelernt.'",
          questionGerman: "Sprechen Sie laut: 'Gestern habe ich Deutsch gelernt.'",
          correctAnswer: "Gestern habe ich Deutsch gelernt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
      description: "Learn to say when things happened — yesterday, last week, two days ago, and more!",
      duration: "45 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Academic Office (Im Büro)",
          sceneType: "office",
          timeOfDay: "morning",
          description: "You're sitting with an advisor, discussing your progress. She asks: 'Wann sind Sie nach Deutschland gekommen?' (When did you come to Germany?). You want to say 'Three months ago'. In Malayalam, we say 'moonnu maasam mumbu', and in German, the logic is similar: 'vor drei Monaten'. You're pinpointing moments in time—yesterday, last month, last year. Time flies, machane, especially when you're busy learning! Let's master the clock of the past!",
        },
        narrative: {
          previousRecap: "You've told your weekend story. Now, let's learn how to specify exactly WHEN things happened!",
          currentObjective: "Use time expressions like gestern, letzte Woche, and 'vor + Dativ' correctly",
          nextTeaser: "Module 13 complete! You're now a past tense storyteller! Next: Module 14 - Health and Body!",
        },
        kuttanIntro: [
          "Machane! Time words are the salt of a story. Without them, it's just 'Ich habe gegessen'. Specifying 'Gestern' (yesterday) makes it real.",
          "Main tool 'vor' (ago). It takes the Dativ case. 'vor zwei Tagen' (two days ago). Notice the extra '-n' in 'Tagen'! Case logic alert!",
          "Pinne 'letzte Woche' (last week) vs 'letzten Monat' (last month) gender change sradhikkanne. Month is masculine, Week is feminine. Let's pin these dates!",
        ],
        vocabEncounters: [
          { vocabId: "vocab13-5-1", encounterMoment: "The advisor looks at your file: 'Gestern habe ich das gesehen.'", contextSentence: "Gestern bin ich spät aufgestanden." },
          { vocabId: "vocab13-5-8", encounterMoment: "You reply: 'Ich bin vor drei Monaten gekommen.'", contextSentence: "Ich bin vor drei Monaten nach Deutschland gekommen." },
          { vocabId: "vocab13-5-4", encounterMoment: "You mention: 'Letztes Jahr war ich in Kerala.'", contextSentence: "Letztes Jahr war ich in Kerala." },
          { vocabId: "vocab13-5-3", encounterMoment: "She asks: 'Haben Sie letzte Woche gelernt?'", contextSentence: "Letzte Woche habe ich viel gelernt." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'Three days ago'. Which structure is correct?",
            options: [
              { text: "vor drei Tagen.", isCorrect: true, response: "Exactly! 'vor' + Number + Noun(+n for Dativ plural).", kuttanReaction: "Adipoli! Time-ago logic perfectly capture cheythallo! 🔥" },
              { text: "drei Tage vor.", isCorrect: false, response: "Aiyyo! In German, the preposition 'vor' must come BEFORE the time unit.", kuttanReaction: "Vite machane! Word order marakkallae. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'Last month'. Which form of 'letzte' do you use for 'der Monat'?",
            options: [
              { text: "letzten.", isCorrect: true, response: "Correct! Masculine time expressions take '-en' (letzten Monat).", kuttanReaction: "Superb! Gender logic correctly noted! ⭐" },
              { text: "letzte.", isCorrect: false, response: "No! 'letzte' is for feminine (letzte Woche). Month is masculine.", kuttanReaction: "Aiyyo! Month logic sradhikkanne machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v13-5-1",
          title: "Gestern, letzte Woche, vor 2 Tagen...",
          duration: "10:00",
          description: "Master the time expressions that tell people WHEN something happened",
          scriptOutline: ["Introduction: Time words are your storytelling tools — without them, everything is just 'sometime'!", "gestern (yesterday) and vorgestern (day before yesterday)", "letzte Woche, letztes Jahr, letzten Monat — gender matters! die Woche = letzte, das Jahr = letztes, der Monat = letzten", "vor + Dativ: vor zwei Tagen, vor einer Woche, vor drei Monaten — the 'ago' structure", "seit vs vor: seit = since/for (still ongoing), vor = ago (completed)", "Time expressions go at the start OR after the verb: 'Gestern habe ich gekocht' or 'Ich habe gestern gekocht'", "Practice: Narrate your last weekend using time expressions", "Common mistake: Don't say 'letzte Jahr' — it's 'letztes Jahr' (das Jahr = neuter!)"],
          keyVocabulary: ["gestern", "vorgestern", "letzte Woche", "letztes Jahr", "letzten Monat", "vor"],
          learningObjectives: ["Use gestern, vorgestern, and letzte/letztes/letzten correctly", "Form 'ago' expressions using vor + Dativ", "Place time expressions correctly in German sentences"],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "'letzte' Changes by Gender",
              headers: ["Noun", "Gender", "Correct Form"],
              rows: [
                ["die Woche", "feminine", "letzte Woche"],
                ["der Monat", "masculine", "letzten Monat"],
                ["das Jahr", "neuter", "letztes Jahr"]
              ]
            },
            {
              type: "table",
              title: "vor + Dativ = 'ago'",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["vor zwei Tagen", "two days ago", "രണ്ടു ദിവസം മുമ്പ്"],
                ["vor einer Woche", "a week ago", "ഒരാഴ്ച മുമ്പ്"],
                ["vor drei Monaten", "three months ago", "മൂന്ന് മാസം മുമ്പ്"]
              ]
            },
            {
              type: "note",
              title: "seit vs vor",
              variant: "warning",
              content: "'vor' = ago (completed action). 'seit' = since/for (still ongoing). 'Vor 3 Monaten bin ich gekommen' (I came 3 months ago) vs 'Seit 3 Monaten lerne ich Deutsch' (I've been learning German for 3 months)."
            }
          ]
        }
      ],
      exercises: [
        { id: "ex13-5-1", type: "multiple-choice", question: "How do you say 'two days ago' in German?", options: ["vor zwei Tagen", "zwei Tage vor", "seit zwei Tagen", "in zwei Tagen"], correctAnswer: "vor zwei Tagen", explanation: "'ago' = vor + Dativ. Tage \u2192 Tagen (Dativ plural).", xpReward: 10 },
        { id: "ex13-5-2", type: "fill-blank", question: "Complete: _____ Woche habe ich eine Pr\u00fcfung gemacht. (Last week...)", options: ["Letzte", "Letztes", "Letzten", "Letzer"], correctAnswer: "Letzte", explanation: "die Woche (feminine) \u2192 letzte Woche.", xpReward: 10 },
        { id: "ex13-5-3", type: "matching", question: "Match the German time expression to its English meaning:", options: ["gestern", "vorgestern", "letztes Jahr", "vor einer Woche"], correctAnswer: ["yesterday", "day before yesterday", "last year", "a week ago"], xpReward: 15 },
        { id: "ex13-5-4", type: "multiple-choice", question: "Which is correct for 'last month'?", options: ["letzten Monat", "letzte Monat", "letztes Monat", "letzter Monat"], correctAnswer: "letzten Monat", explanation: "der Monat (masculine) in accusative of time \u2192 letzten Monat.", xpReward: 10 },
        { id: "ex13-5-5", type: "ordering", question: "Order from most recent to longest ago:", options: ["vor einem Jahr", "vorgestern", "gestern", "letzte Woche"], correctAnswer: ["gestern", "vorgestern", "letzte Woche", "vor einem Jahr"], xpReward: 20 },
        { id: "ex13-5-6", type: "fill-blank", question: "Complete: Ich bin _____ drei Monaten nach Deutschland gekommen. (3 months ago)", options: ["vor", "seit", "in", "nach"], correctAnswer: "vor", explanation: "vor + Dativ = 'ago'. vor drei Monaten = three months ago.", xpReward: 10 },
        { id: "ex13-5-7", type: "fill-blank", question: "Complete: _____ Jahr bin ich nach Deutschland geflogen. (Last year...)", options: ["Letztes", "Letzte", "Letzten", "Letzter"], correctAnswer: "Letztes", explanation: "das Jahr (neuter) \u2192 letztes Jahr.", xpReward: 10 },
        { id: "ex13-5-8", type: "multiple-choice", question: "Translate: 'Vor einer Stunde habe ich gegessen.'", options: ["I ate an hour ago.", "I ate for one hour.", "I will eat in an hour.", "I have been eating since one hour."], correctAnswer: "I ate an hour ago.", explanation: "'Vor einer Stunde' = an hour ago. vor + Dativ = ago.", xpReward: 10 },
        {
          id: "ex13-5-9",
          type: "dictation",
          question: "Listen and type: Gestern habe ich viel gelernt.",
          correctAnswer: "Gestern habe ich viel gelernt",
          explanation: "Perfect! Time expression first, followed by the auxiliary verb.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-learned-much-yesterday.mp3"
        },
        {
          id: "ex13-5-10",
          type: "free-text",
          question: "Write in German: 'I came to Germany three months ago.' (three months ago = vor drei Monaten, came = gekommen)",
          correctAnswer: "Ich bin vor drei Monaten nach Deutschland gekommen",
          explanation: "Wunderbar! 'Ich bin vor drei Monaten nach Deutschland gekommen.' — perfect use of 'vor' and 'sein'.",
          xpReward: 30
        }
      ,
        {
          id: "ex13-5-prod-speaking",
          type: "speaking",
          question: "Kuttan practice: Say aloud for this lesson (Time Expressions for the Past): 'Gestern habe ich Deutsch gelernt.'",
          questionGerman: "Sprechen Sie laut: 'Gestern habe ich Deutsch gelernt.'",
          correctAnswer: "Gestern habe ich Deutsch gelernt",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          xpReward: 25
        }],
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
