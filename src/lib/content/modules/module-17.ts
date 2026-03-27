import type { Module } from '../types';

export const MODULE_17: Module = {
  id: 17,
  title: "Goethe A1 Exam — Hören & Lesen",
  titleGerman: "Goethe A1 Prüfung — Hören & Lesen",
  description: "Core Goethe A1 exam prep for Hören and Lesen. This should come right after the A1 foundations, even if learners skip the optional A1+ bridge.",
  icon: "🎧",
  color: "#b91c1c",
  totalHours: 12,
  unlockRequirement: "Complete Module 15 (Module 16 is optional)",
  learningTips: [
    "In Hören: read the question BEFORE the audio plays. You'll know what to listen for.",
    "In Lesen: you don't need to understand every word. Find the KEY information.",
    "In Schreiben: address ALL 3 points. Missing one = losing marks even if your German is perfect.",
    "In Sprechen: speak in SENTENCES, not single words. 'Ich heiße...' not just 'Maria'.",
  ],
  lessons: [

    // ==================== LESSON 17-1: Exam Format Overview & Tips ====================
    {
      id: "17-1",
      title: "Exam Format Overview & Tips",
      titleGerman: "Prüfungsformat — Überblick & Tipps",
      description: "Everything you need to know about the Start Deutsch 1 (Goethe A1) exam — format, scoring, time management, and smart strategies to pass.",
      duration: "45 min",
      xpReward: 100,
      videos: [
        {
          id: "v17-1-1",
          title: "Start Deutsch 1 — Everything You Need to Know",
          duration: "12:00",
          description: "A complete walkthrough of the Goethe A1 exam format, scoring, and practical tips for exam day.",
          scriptOutline: [
            "Opening: 'Machane, exam time vannirikkuva! No tension — let's break it down!'",
            "What is the Goethe A1 (Start Deutsch 1) certificate?",
            "4 Parts overview: Hören (20 min), Lesen (25 min), Schreiben (20 min), Sprechen (15 min)",
            "Scoring breakdown: 100 points total, 25 per section, need 60% overall to pass",
            "Hören Teil 1: Short everyday messages — true/false (6 items, hear TWICE)",
            "Hören Teil 2: Short dialogues — multiple choice a/b/c (4 items, hear TWICE)",
            "Hören Teil 3: Public announcements — match to situations (5 items, hear TWICE)",
            "Lesen Teil 1: Short notices, signs, instructions — match to situations (5 items)",
            "Lesen Teil 2: Newspaper ads/classifieds — true/false (5 items)",
            "Lesen Teil 3: Short emails/letters — multiple choice (5 items)",
            "Time management tips: Don't spend too long on one question",
            "Key tip: Read ALL questions FIRST before the audio plays",
            "Elimination strategy: Cross out obviously wrong answers first",
            "What to bring: Valid ID, confirmation letter, black or blue pen",
            "Exam day routine: Arrive 30 min early, stay calm, read instructions carefully",
            "Closing: 'Ithokke nadakkum machane! Let's start with Hören!'"
          ],
          keyVocabulary: ["die Prüfung", "bestehen", "Hören", "Lesen", "Schreiben", "Sprechen"],
          learningObjectives: [
            "Understand the complete Goethe A1 exam format and all 3 parts of Hören and Lesen",
            "Know the scoring system (60% to pass) and time limits",
            "Learn time management and elimination strategies",
            "Know what to bring and expect on exam day"
          ],
          placeholderThumbnail: "/images/thumbnails/exam-overview.jpg"
        },
      ],
      exercises: [
        {
          id: "ex17-1-1",
          type: "multiple-choice",
          question: "How many parts does the Goethe A1 exam have in total?",
          options: ["3 parts: Hören, Lesen, Schreiben", "4 parts: Hören, Lesen, Schreiben, Sprechen", "5 parts: Hören, Lesen, Schreiben, Sprechen, Grammatik", "2 parts: Written and Oral"],
          correctAnswer: "4 parts: Hören, Lesen, Schreiben, Sprechen",
          explanation: "The 'Big Four': Hören (Listen), Lesen (Read), Schreiben (Write), and Sprechen (Speak). There is NO separate grammar section—your grammar is tested through how you use it in these four parts!",
          xpReward: 10
        },
        {
          id: "ex17-1-2",
          type: "multiple-choice",
          question: "How many parts does the Hören (Listening) section have?",
          options: ["2 parts", "3 parts", "4 parts", "1 part"],
          correctAnswer: "3 parts",
          explanation: "Three distinct challenges: 1. Phone messages (Short), 2. Dialogues (Medium), 3. Public announcements (Crowded places). Each tests a different 'ear'!",
          xpReward: 10
        },
        {
          id: "ex17-1-3",
          type: "multiple-choice",
          question: "In Hören Teil 1, what do you need to decide for each statement?",
          options: ["Choose from a/b/c options", "Richtig (True) or Falsch (False)", "Match to a picture", "Write the answer in your own words"],
          correctAnswer: "Richtig (True) or Falsch (False)",
          explanation: "Richtig/Falsch (True/False). It sounds easy, but watch out for 'NICHT' (Not)—it can flip the whole meaning in a split second!",
          xpReward: 10
        },
        {
          id: "ex17-1-4",
          type: "multiple-choice",
          question: "How many parts does the Lesen (Reading) section have?",
          options: ["2 parts", "3 parts", "4 parts", "5 parts"],
          correctAnswer: "3 parts",
          explanation: "Lesen is a 3-act play: 1. Signs/Ads (Short), 2. Classifieds (Detailed), 3. Short letters/emails (Social). 25 minutes for the whole thing!",
          xpReward: 10
        },
        {
          id: "ex17-1-5",
          type: "multiple-choice",
          question: "In Lesen Teil 2, you read advertisements and classifieds. What format are the questions?",
          options: ["Multiple choice a/b/c", "Richtig (True) or Falsch (False)", "Match to pictures", "Fill in the blanks"],
          correctAnswer: "Richtig (True) or Falsch (False)",
          explanation: "You get a situation (e.g., 'You want a cheap car') and an ad. Is the ad a match? Richtig or Falsch. Match the details, not just the keywords!",
          xpReward: 10
        },
        {
          id: "ex17-1-6",
          type: "multiple-choice",
          question: "What is the best exam strategy for the Hören section?",
          options: [
            "Try to translate every single word you hear",
            "Read the questions and answer options BEFORE the audio plays",
            "Only listen to the audio once and guess quickly",
            "Focus only on the first sentence of each audio"
          ],
          correctAnswer: "Read the questions and answer options BEFORE the audio plays",
          explanation: "The 'Golden Strategy': The 15 seconds of silence before the audio starts is your most important time. Read the question so your brain is ready to 'catch' the answer!",
          xpReward: 10
        },
        {
          id: "ex17-1-7",
          type: "multiple-choice",
          question: "How many times do you hear each audio in the Hören section?",
          options: ["Once only", "Twice", "Three times", "It depends on the Teil"],
          correctAnswer: "Twice",
          explanation: "You get a second chance! Use the first time to get the 'feel' and your initial guess. Use the second time to TRIPLE check and catch any 'nicht' or 'aber' traps.",
          xpReward: 10
        },
        {
          id: "ex17-1-8",
          type: "multiple-choice",
          question: "What percentage do you need to pass the Goethe A1 exam?",
          options: ["50%", "60%", "70%", "80%"],
          correctAnswer: "60%",
          explanation: "60 out of 100. Even if you mess up one section (like Sprechen), you can pass if you're strong in others. But aim for 100, machane!",
          xpReward: 10
        },
        {
          id: "ex17-1-9",
          type: "matching",
          question: "Match each exam section to its duration:",
          options: ["Hören", "Lesen", "Schreiben", "Sprechen"],
          correctAnswer: ["20 Minuten", "25 Minuten", "20 Minuten", "15 Minuten"],
          explanation: "Total time: about 80 minutes. It's a sprint, not a marathon. Stay focused for that one hour and you're golden!",
          xpReward: 15
        },
        {
          id: "ex17-1-10",
          type: "multiple-choice",
          question: "If you don't know an answer on the exam, what should you do?",
          options: ["Leave it blank", "Make your best guess and move on", "Spend 10 minutes thinking about it", "Ask the examiner for help"],
          correctAnswer: "Make your best guess and move on",
          explanation: "NEVER leave a blank! There's no negative marking in A1. If you leave it blank, you get 0. If you guess, you have a 33% or 50% chance of a free point!",
          xpReward: 10
        },
        {
          id: "ex17-1-11",
          type: "dictation",
          question: "Listen and type the exam name: Start Deutsch eins.",
          correctAnswer: "Start Deutsch eins",
          explanation: "Perfect! 'Start Deutsch 1' is the official name of the Goethe A1 exam.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-exam-name.mp3"
        },
        {
          id: "ex17-1-12",
          type: "free-text",
          question: "Translate to German: 'Good luck!' (use 'Viel Glück')",
          correctAnswer: "Viel Glück",
          explanation: "Wunderbar! A must-know phrase for exam day.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab17-1-1",
          german: "die Prüfung",
          english: "the exam",
          malayalam: "പരീക്ഷ",
          pronunciation: "dee prü-fung",
          example: "Die Prüfung ist am Montag.",
          exampleTranslation: "The exam is on Monday."
        },
        {
          id: "vocab17-1-2",
          german: "bestehen",
          english: "to pass (an exam)",
          malayalam: "ജയിക്കുക",
          pronunciation: "be-shtey-en",
          example: "Ich möchte die Prüfung bestehen.",
          exampleTranslation: "I want to pass the exam."
        },
        {
          id: "vocab17-1-3",
          german: "durchfallen",
          english: "to fail (an exam)",
          malayalam: "തോൽക്കുക",
          pronunciation: "doorkh-fah-len",
          example: "Keine Angst, du wirst nicht durchfallen!",
          exampleTranslation: "Don't worry, you won't fail!"
        },
        {
          id: "vocab17-1-4",
          german: "die Aufgabe",
          english: "the task / question",
          malayalam: "ചോദ്യം / ടാസ്ക്",
          pronunciation: "dee owf-gah-be",
          example: "Lesen Sie die Aufgabe genau.",
          exampleTranslation: "Read the task carefully."
        },
        {
          id: "vocab17-1-5",
          german: "die Lösung",
          english: "the solution / answer",
          malayalam: "ഉത്തരം",
          pronunciation: "dee lur-zoong",
          example: "Welche Lösung ist richtig?",
          exampleTranslation: "Which answer is correct?"
        },
        {
          id: "vocab17-1-6",
          german: "die Punktzahl",
          english: "the score",
          malayalam: "സ്കോർ / മാർക്ക്",
          pronunciation: "dee poonkt-tsahl",
          example: "Sie brauchen mindestens 60 Punkte.",
          exampleTranslation: "You need at least 60 points."
        }
      ]
    },

    // ==================== LESSON 17-2: Hören Teil 1 — Kurze Nachrichten ====================
    {
      id: "17-2",
      title: "Hören Teil 1 — Kurze Nachrichten",
      titleGerman: "Hören Teil 1 — Kurze Nachrichten",
      description: "Practice the Hören Teil 1 exam format: listen to short everyday messages and decide Richtig or Falsch. Simulated as text passages since we can't play audio — read the 'heard' message, then judge the statement.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v17-2-1",
          title: "Hören Teil 1 — How It Works",
          duration: "12:00",
          description: "Understand the exact format of Hören Teil 1: short phone messages, voicemails, and announcements with Richtig/Falsch questions.",
          scriptOutline: [
            "Opening: 'Hören Teil 1 — ithinte format exact-aayi padikkam! This is where your 'listening for details' skill gets tested.'",
            "Format: You hear 6 short messages (voicemails, announcements, phone messages). Think of it like listening to a quick announcement at a bus stand in Kerala.",
            "Each message: ~30 seconds, you hear it TWICE. Use the first listen for the general idea, the second for specific details.",
            "For each message: one statement is given — decide Richtig (True) or Falsch (False).",
            "Example walkthrough: 'Hallo Maria, hier ist Peter. Ich komme heute nicht zum Unterricht. Ich bin krank.'",
            "Statement: 'Peter kommt heute zum Unterricht.' → FALSCH (he said 'nicht'!)",
            "Trap #1: Negation words — nicht, kein, nie, niemand. These are the tricksters! Always listen carefully for them. 'Nicht' is like a 'no' that can change everything.",
            "Trap #2: Numbers that sound similar — 13/30, 14/40, 15/50. Practice these number pairs. 'Dreizehn' vs 'Dreißig' – a small difference, big mistake!",
            "Trap #3: Time confusion — 'am Dienstag' vs. 'am Donnerstag'. Days of the week and times can be tricky. Double-check!",
            "Tip: The statement often PARAPHRASES the message — same meaning, different words. Don't expect exact word-for-word matches.",
            "Tip: If the message says the opposite of the statement, it's FALSCH. Simple logic, machane!",
            "Practice: We'll simulate this as reading exercises — read the 'heard' message, then judge the statement. Imagine the audio playing in your head.",
            "Closing: 'Negation is the #1 trap — always listen for nicht and kein! Your 'keyword spotting' skill is crucial here. Adipoli!'"
          ],
          keyVocabulary: ["die Nachricht", "der Anrufbeantworter", "richtig", "falsch", "nicht"],
          learningObjectives: [
            "Understand the exact format of Hören Teil 1",
            "Identify negation traps in listening statements",
            "Practice Richtig/Falsch decision-making with short messages",
            "Recognize paraphrased statements"
          ],
          placeholderThumbnail: "/images/thumbnails/hoeren-teil1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex17-2-1",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Achtung! Der Zug nach München fährt heute von Gleis 5, nicht von Gleis 3. Ich wiederhole: Gleis 5.\'\n\n📝 Statement: Der Zug nach München fährt von Gleis 3.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "The Classic Trap: They say 'Gleis 3' first, then 'NICHT', then the real answer 'Gleis 5'. If you hear '3' and stop listening, you'll get it wrong. The 'nicht' flips the statement to Falsch!",
          xpReward: 15
        },
        {
          id: "ex17-2-2",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Hallo Frau Schmidt, hier ist die Arztpraxis Dr. Meier. Ihr Termin am Mittwoch um 10 Uhr muss leider verschoben werden. Können Sie stattdessen am Donnerstag um 14 Uhr kommen? Bitte rufen Sie uns zurück.\'\n\n📝 Statement: Der Termin am Mittwoch findet wie geplant statt.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Verschoben werden' = to be postponed. In Malayalam: 'Maatti vechu'. Since it's postponed, it is NOT happening as planned (Falsch).",
          xpReward: 15
        },
        {
          id: "ex17-2-3",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Hallo Thomas, hier ist Petra. Ich möchte dich zu meiner Geburtstagsfeier am Samstag einladen. Die Party beginnt um 19 Uhr bei mir zu Hause. Bring bitte etwas zu trinken mit!\'\n\n📝 Statement: Die Party beginnt um 19 Uhr.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Richtig",
          explanation: "Clear match. She says 19:00, the statement says 19:00. This is an 'easy point' question—grab it and move on!",
          xpReward: 15
        },
        {
          id: "ex17-2-4",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Liebe Kunden, unser Geschäft ist heute wegen Inventur geschlossen. Ab morgen sind wir wieder zu den normalen Öffnungszeiten für Sie da. Vielen Dank für Ihr Verständnis.\'\n\n📝 Statement: Das Geschäft hat heute normal geöffnet.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Geschlossen' = Closed. If it's closed for 'Inventur' (stock checking), it can't be 'geöffnet' (Open). Falsch!",
          xpReward: 15
        },
        {
          id: "ex17-2-5",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Guten Tag, hier ist Ihre Hausverwaltung. Am Montag, den 15. März, wird zwischen 9 und 14 Uhr das Wasser abgestellt. Bitte füllen Sie vorher genug Wasser ab.\'\n\n📝 Statement: Das Wasser wird am Montag für einige Stunden abgestellt.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Richtig",
          explanation: "Paraphrasing Trap: The audio gives exact times (9 to 14), but the statement says 'for some hours'. 5 hours counts as 'some hours'! Richtig.",
          xpReward: 15
        },
        {
          id: "ex17-2-6",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Hallo Markus, hier ist Julia. Ich habe zwei Karten für das Konzert am Freitag. Hast du Lust mitzukommen? Es fängt um 20 Uhr an. Ruf mich bitte heute noch an!\'\n\n📝 Statement: Julia hat keine Karten für das Konzert.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "Keyword: 'Keine' (None/No). Julia says 'Ich habe zwei Karten'. 'Zwei' (two) vs 'Keine' (none) = total contradiction. Falsch!",
          xpReward: 15
        },
        {
          id: "ex17-2-7",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Sehr geehrte Fluggäste, der Flug LH 417 nach Istanbul hat eine Verspätung von 45 Minuten. Neuer Abflug: 16:15 Uhr. Wir bitten um Entschuldigung.\'\n\n📝 Statement: Der Flug nach Istanbul ist pünktlich.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "Verspätung (Delay) is the enemy of Pünktlich (Punctual). If there is a delay, it's not punctual. Period. Falsch!",
          xpReward: 15
        },
        {
          id: "ex17-2-8",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Hallo Herr Weber, hier ist das Reisebüro SunTravel. Ihre Reise nach Spanien ist gebucht. Abflug ist am 15. Juni um 8:30 Uhr ab Frankfurt. Bitte seien Sie zwei Stunden vorher am Flughafen.\'\n\n📝 Statement: Herr Weber soll um 6:30 Uhr am Flughafen sein.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Richtig",
          explanation: "Math Trap: 8:30 - 2 hours = 6:30. A1 examiners love small math puzzles to see if you really understood the numbers. Richtig!",
          xpReward: 15
        },
        {
          id: "ex17-2-9",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Hallo Sabine, hier ist deine Mutter. Ich komme morgen nicht zu Besuch, weil ich erkältet bin. Ich komme nächste Woche, wenn es mir besser geht. Bis dann!\'\n\n📝 Statement: Sabines Mutter kommt morgen zu Besuch.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "Listen for the 'Nicht'! 'Ich komme morgen NICHT' — she is NOT coming tomorrow because she has a cold. She'll come next week. One tiny word changes the whole story. Falsch!",
          xpReward: 15
        },
        {
          id: "ex17-2-10",
          type: "multiple-choice",
          question: "📢 You hear:\n\'Liebe Schüler, der Mathematik-Unterricht fällt morgen aus. Stattdessen haben wir zwei Stunden Deutsch. Bitte bringt eure Deutschbücher mit.\'\n\n📝 Statement: Morgen haben die Schüler Mathematik-Unterricht.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Fällt aus' = Cancelled. If math is cancelled and replaced by German, they don't have math! Falsch.",
          xpReward: 15
        },
        {
          id: "ex17-2-11",
          type: "dictation",
          question: "Listen and type: Der Zug fährt von Gleis 5.",
          correctAnswer: "Der Zug fährt von Gleis 5",
          explanation: "Great! 'Gleis' is a key word for train announcements.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-train-platform.mp3"
        },
        {
          id: "ex17-2-12",
          type: "free-text",
          question: "Translate to German: 'The train is late.' (late/delay = Verspätung)",
          correctAnswer: "Der Zug hat Verspätung",
          explanation: "Wunderbar! This is a very common phrase in German train stations.",
          xpReward: 30
        },
        {
          id: "ex17-2-13",
          type: "free-text",
          question: "Translate to German: 'Where is the train?' (Zug = train)",
          correctAnswer: "Wo ist der Zug",
          explanation: "Excellent! A simple but vital question in everyday travel.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab17-2-1",
          german: "die Durchsage",
          english: "the announcement",
          malayalam: "അറിയിപ്പ്",
          pronunciation: "dee doorkh-zah-ge",
          example: "Bitte hören Sie die Durchsage.",
          exampleTranslation: "Please listen to the announcement."
        },
        {
          id: "vocab17-2-2",
          german: "das Gleis",
          english: "the platform (train)",
          malayalam: "പ്ലാറ്റ്ഫോം",
          pronunciation: "dahs glice",
          example: "Der Zug fährt auf Gleis 5 ab.",
          exampleTranslation: "The train departs from platform 5."
        },
        {
          id: "vocab17-2-3",
          german: "die Verspätung",
          english: "the delay",
          malayalam: "കാലതാമസം",
          pronunciation: "dee fer-shpay-toong",
          example: "Der Zug hat 20 Minuten Verspätung.",
          exampleTranslation: "The train has a 20-minute delay."
        },
        {
          id: "vocab17-2-4",
          german: "verschieben",
          english: "to postpone / reschedule",
          malayalam: "മാറ്റിവെക്കുക",
          pronunciation: "fer-shee-ben",
          example: "Wir müssen den Termin verschieben.",
          exampleTranslation: "We have to reschedule the appointment."
        }
      ]
    },

    // ==================== LESSON 17-3: Hören Teil 2 & 3 — Gespräche ====================
    {
      id: "17-3",
      title: "Hören Teil 2 & 3 — Gespräche",
      titleGerman: "Hören Teil 2 & 3 — Gespräche und Durchsagen",
      description: "Practice Hören Teil 2 (short dialogues with multiple choice) and Teil 3 (announcements matched to situations). Read the dialogues, then answer like the real exam.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v17-3-1",
          title: "Hören Teil 2 & 3 — How They Work",
          duration: "12:00",
          description: "Master the dialogue and announcement sections of the Hören exam with strategies and practice walkthroughs.",
          scriptOutline: [
            "Opening: 'Teil 2 and Teil 3 — conversations and announcements!'",
            "Teil 2 format: 4 short dialogues, each with 3 answer options (a/b/c)",
            "Dialogues are everyday situations: shopping, asking for directions, making plans",
            "You hear each dialogue TWICE — first for context, second for details",
            "Example: Two friends discuss what to eat — question: Where do they want to go?",
            "Strategy: Read options BEFORE you listen — know what you're listening for",
            "Teil 3 format: 5 short announcements — match each to one of 8 situations",
            "Announcements: at the train station, supermarket, radio, airport, school",
            "Example: 'Sonderangebot: Kaffee nur 3,99 Euro' → Situation: You want to buy cheap coffee",
            "Key words tell you the situation: Gleis = train, Flug = airport, Angebot = shopping",
            "Common traps: Two options might seem right — pick the MOST specific one",
            "Closing: 'Context clues and keywords — that's how you crack Teil 2 and 3! Remember, it's all about understanding the main idea and spotting those crucial details, just like understanding a quick chat in the market!'"
          ],
          keyVocabulary: ["das Gespräch", "die Durchsage", "die Situation", "zuordnen"],
          learningObjectives: [
            "Understand the format of Hören Teil 2 (multiple choice from dialogues)",
            "Understand the format of Hören Teil 3 (matching announcements to situations)",
            "Practice identifying key information in short conversations",
            "Learn to match announcements to the correct everyday situations"
          ],
          placeholderThumbnail: "/images/thumbnails/hoeren-teil2-3.jpg"
        }
      ],
      exercises: [
        // Teil 2 style: Dialogue → Multiple choice
        {
          id: "ex17-3-1",
          type: "multiple-choice",
          question: "🗣️ Dialogue:\nFrau: 'Entschuldigung, wo finde ich Milch?'\nMann: 'Die Milch steht im Gang 3, direkt neben dem Käse.'\nFrau: 'Danke! Und haben Sie auch frisches Brot?'\nMann: 'Ja, die Bäckerei ist gleich am Eingang links.'\n\n❓ Wo findet die Frau die Milch?",
          options: ["a) Am Eingang links", "b) Im Gang 3, neben dem Käse", "c) An der Kasse"],
          correctAnswer: "b) Im Gang 3, neben dem Käse",
          explanation: "Specific Information: They mention two places (Gang 3 and Eingang). You must listen for WHICH one is linked to 'Milch'. He explicitly says Gang 3 for milk. The entrance is for bread!",
          xpReward: 15
        },
        {
          id: "ex17-3-2",
          type: "multiple-choice",
          question: "🗣️ Dialogue:\nAnna: 'Hallo Peter, wollen wir am Samstag zusammen essen gehen?'\nPeter: 'Gerne! Wohin möchtest du?'\nAnna: 'Wie wäre es mit dem italienischen Restaurant in der Mozartstraße?'\nPeter: 'Super! Um wie viel Uhr?'\nAnna: 'Um 19 Uhr. Ich reserviere einen Tisch für zwei.'\n\n❓ Was macht Anna am Samstag?",
          options: ["a) Sie kocht zu Hause", "b) Sie geht mit Peter in ein italienisches Restaurant", "c) Sie geht allein ins Restaurant"],
          correctAnswer: "b) Sie geht mit Peter in ein italienisches Restaurant",
          explanation: "Quantity matters: 'Für zwei' (for two) and 'zusammen' (together) prove she isn't going alone. They chose the Italian place over cooking at home.",
          xpReward: 15
        },
        {
          id: "ex17-3-3",
          type: "multiple-choice",
          question: "🗣️ Dialogue:\nKunde: 'Guten Tag, ich suche ein Geschenk für meinen Sohn. Er wird 10 Jahre alt.'\nVerkäuferin: 'Wie wäre es mit einem Buch oder einem Spiel?'\nKunde: 'Ein Spiel ist eine gute Idee. Was können Sie empfehlen?'\nVerkäuferin: 'Dieses Spiel hier ist sehr beliebt. Es kostet 24,99 Euro.'\n\n❓ Was kauft der Kunde?",
          options: ["a) Ein Buch für 24,99 Euro", "b) Ein Geschenk für seine Tochter", "c) Ein Spiel für seinen Sohn"],
          correctAnswer: "c) Ein Spiel für seinen Sohn",
          explanation: "The Final Decision: The seller suggested a book, but the buyer chose the game ('Spiel'). Always listen for the 'Decision Word' (Ja/Gute Idee).",
          xpReward: 15
        },
        {
          id: "ex17-3-4",
          type: "multiple-choice",
          question: "🗣️ Dialogue:\nMann: 'Entschuldigung, wie komme ich zum Bahnhof?'\nFrau: 'Gehen Sie hier geradeaus, dann an der Ampel links. Der Bahnhof ist dann auf der rechten Seite. Etwa 10 Minuten zu Fuß.'\nMann: 'Vielen Dank!'\n\n❓ Wie weit ist der Bahnhof?",
          options: ["a) Etwa 5 Minuten zu Fuß", "b) Etwa 10 Minuten zu Fuß", "c) Etwa 20 Minuten mit dem Bus"],
          correctAnswer: "b) Etwa 10 Minuten zu Fuß",
          explanation: "Direct Match: She says '10 Minuten zu Fuß'. A1 listening often has one answer that's a direct quote. Catch it and you're set!",
          xpReward: 15
        },
        {
          id: "ex17-3-5",
          type: "multiple-choice",
          question: "🗣️ Dialogue:\nArzt: 'Was fehlt Ihnen denn?'\nPatientin: 'Ich habe seit drei Tagen Kopfschmerzen und Fieber.'\nArzt: 'Ich verschreibe Ihnen Tabletten. Nehmen Sie dreimal täglich eine Tablette nach dem Essen.'\nPatientin: 'Und soll ich zu Hause bleiben?'\nArzt: 'Ja, bleiben Sie bitte bis Freitag im Bett.'\n\n❓ Was soll die Patientin machen?",
          options: ["a) Dreimal täglich eine Tablette nehmen und bis Freitag im Bett bleiben", "b) Sofort ins Krankenhaus gehen", "c) Nur eine Tablette am Tag nehmen"],
          correctAnswer: "a) Dreimal täglich eine Tablette nehmen und bis Freitag im Bett bleiben",
          explanation: "Two-Part Answer: The patient has two jobs: take pills (3x daily) and stay in bed. Option (a) covers both bases perfectly.",
          xpReward: 15
        },
        // Teil 3 style: Announcement → Match to situation
        {
          id: "ex17-3-6",
          type: "multiple-choice",
          question: "📢 Announcement:\n\'Liebe Kundinnen und Kunden, heute im Sonderangebot: frische Erdbeeren aus der Region, nur 1,99 Euro pro Schale. Sie finden die Erdbeeren in der Obstabteilung.\'\n\n❓ In welcher Situation hören Sie das?",
          options: ["a) Am Bahnhof", "b) Im Supermarkt", "c) Im Krankenhaus"],
          correctAnswer: "b) Im Supermarkt",
          explanation: "Context Clues: 'Kundinnen und Kunden' (customers), 'Sonderangebot' (special offer), 'Erdbeeren' (strawberries), 'Obstabteilung' (fruit section) — these are all supermarket keywords. It's like hearing 'Special offer for Onam sadhya items' at Lulu Hypermarket!",
          xpReward: 15
        },
        {
          id: "ex17-3-7",
          type: "multiple-choice",
          question: "📢 Announcement:\n\'Sehr geehrte Fahrgäste, der ICE 579 nach Berlin Hauptbahnhof, planmäßige Abfahrt 14:23 Uhr, fährt heute von Gleis 8 statt von Gleis 12. Wir bitten um Beachtung.\'\n\n❓ In welcher Situation hören Sie das?",
          options: ["a) Am Flughafen", "b) In einem Restaurant", "c) Am Bahnhof"],
          correctAnswer: "c) Am Bahnhof",
          explanation: "Keywords: 'ICE' (German high-speed train), 'Fahrgäste' (passengers), 'Gleis' (platform), 'Abfahrt' (departure) — these are all train station vocabulary. The platform changed from 12 to 8. Just like a railway announcement in Ernakulam Junction!",
          xpReward: 15
        },
        {
          id: "ex17-3-8",
          type: "multiple-choice",
          question: "📢 Announcement:\n\'Und nun das Wetter für morgen: Im Norden regnet es den ganzen Tag. Im Süden wird es sonnig bei Temperaturen um 25 Grad. Packen Sie also Ihre Sonnenbrille ein!\'\n\n❓ In welcher Situation hören Sie das?",
          options: ["a) Im Radio (Wettervorhersage)", "b) In der Schule", "c) Im Flugzeug"],
          correctAnswer: "a) Im Radio (Wettervorhersage)",
          explanation: "Context Clues: 'Das Wetter für morgen' (the weather for tomorrow), regions (Norden, Süden), temperatures — this is a classic radio weather forecast (Wettervorhersage). You'd hear this on your morning drive, not in a classroom or plane.",
          xpReward: 15
        },
        {
          id: "ex17-3-9",
          type: "multiple-choice",
          question: "📢 Announcement:\n\'Achtung bitte! Flug EW 4521 nach Barcelona, Boarding beginnt jetzt an Gate B22. Alle Passagiere werden gebeten, sich sofort zum Gate zu begeben. Letzter Aufruf!\'\n\n❓ In welcher Situation hören Sie das?",
          options: ["a) Im Reisebüro", "b) Am Flughafen", "c) Am Busbahnhof"],
          correctAnswer: "b) Am Flughafen",
          explanation: "Keywords: 'Flug' (flight), 'Boarding', 'Gate B22', 'Passagiere' (passengers), 'letzter Aufruf' (last call) — all airport vocabulary. This is a final boarding call, just like at Cochin International Airport!",
          xpReward: 15
        },
        {
          id: "ex17-3-10",
          type: "multiple-choice",
          question: "📢 Announcement:\n\'Liebe Eltern, wegen des starken Regens fällt der Sportunterricht heute aus. Die Kinder haben stattdessen eine zusätzliche Stunde Kunst. Bitte holen Sie Ihre Kinder wie gewohnt um 13 Uhr ab.\'\n\n❓ In welcher Situation hören Sie das?",
          options: ["a) In einer Schule", "b) In einem Sportstudio", "c) Im Schwimmbad"],
          correctAnswer: "a) In einer Schule",
          explanation: "Context Clues: 'Eltern' (parents), 'Sportunterricht' (PE class), 'Kinder abholen' (pick up children), 'Stunde Kunst' (art class) — this is a school announcement about a class change due to rain. Very common, like a school notice about a holiday!",
          xpReward: 15
        },
        {
          id: "ex17-3-11",
          type: "dictation",
          question: "Listen and type: Ich möchte ein Geschenk kaufen.",
          correctAnswer: "Ich möchte ein Geschenk kaufen",
          explanation: "Perfect! A useful sentence for shopping dialogues.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-buy-gift.mp3"
        },
        {
          id: "ex17-3-12",
          type: "free-text",
          question: "Write in German: 'Where is the milk?' (milk = Milch)",
          correctAnswer: "Wo ist die Milch",
          explanation: "Wunderbar! A simple but essential question for the supermarket.",
          xpReward: 30
        },
        {
          id: "ex17-3-13",
          type: "free-text",
          question: "Write in German: 'I am hungry.' (hungry = hungrig / use 'Ich habe Hunger')",
          correctAnswer: "Ich habe Hunger",
          explanation: "Excellent! This is a key phrase for any restaurant or food-related dialogue.",
          xpReward: 30
        }
      ],
      vocabulary: [
        {
          id: "vocab17-3-1",
          german: "das Gespräch",
          english: "the conversation",
          malayalam: "സംഭാഷണം",
          pronunciation: "dahs ge-shprech",
          example: "Hören Sie das Gespräch und antworten Sie.",
          exampleTranslation: "Listen to the conversation and answer."
        },
        {
          id: "vocab17-3-2",
          german: "die Durchsage",
          english: "the announcement",
          malayalam: "അനൗൺസ്‌മെന്റ്",
          pronunciation: "dee doorkh-zah-ge",
          example: "Achten Sie auf die Durchsage am Bahnhof.",
          exampleTranslation: "Pay attention to the announcement at the station."
        },
        {
          id: "vocab17-3-3",
          german: "zuordnen",
          english: "to match / assign",
          malayalam: "ചേർത്തുവെക്കുക",
          pronunciation: "tsoo-ord-nen",
          example: "Ordnen Sie die Texte den Situationen zu.",
          exampleTranslation: "Match the texts to the situations."
        }
      ]
    },

    // ==================== LESSON 17-4: Lesen Teil 1 — Schilder und Anzeigen ====================
    {
      id: "17-4",
      title: "Lesen Teil 1 — Schilder und Anzeigen",
      titleGerman: "Lesen Teil 1 — Schilder und kurze Texte",
      description: "Practice reading German signs, notices, and short ads — then match them to the correct situation, exactly like the real Goethe A1 Lesen Teil 1.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v17-4-1",
          title: "Lesen Teil 1 — Reading Signs & Notices",
          duration: "12:00",
          description: "Learn to read and match German signs, notices, and short texts to everyday situations — the core skill for Lesen Teil 1.",
          scriptOutline: [
            "Opening: 'Lesen Teil 1 — Germany-il signs ellaam German-il! Let's decode them!'",
            "Format: 5 short texts (signs, notices, ads) — match each to one of 10 situations",
            "Not all situations have a matching text — some are distractors!",
            "Common signs: Rauchen verboten, Kein Eingang, Zimmer frei, Ausverkauft",
            "Opening hours format: 'Mo-Fr 8:00-18:00, Sa 8:00-13:00, So geschlossen'",
            "Abbreviations: Mo=Montag, Di=Dienstag, Mi=Mittwoch, Do=Donnerstag, Fr=Freitag, Sa=Samstag, So=Sonntag",
            "More abbreviations: EG=Erdgeschoss, OG=Obergeschoss, NK=Nebenkosten, ZKB=Zimmer-Küche-Bad",
            "Strategy: Read the SITUATION first, then look for the matching text",
            "Key words to spot: geöffnet/geschlossen, verboten/erlaubt, kostenlos/frei, ab/bis",
            "Practice: Match 5 signs to their situations step by step",
            "Tip: You don't need every word — focus on the KEY information! Decoding opening hours (Öffnungszeiten) is like checking shop timings in Kochi – 'Sunday closed' is a big deal!",
            "Closing: 'Signs use simple, direct language — focus on the action words! Understanding these signs is like navigating a new city, you need to know what's allowed and what's not. Adipoli!'"
          ],
          keyVocabulary: ["das Schild", "die Anzeige", "geöffnet", "geschlossen", "verboten"],
          learningObjectives: [
            "Read and understand German signs, notices, and short texts",
            "Match texts to appropriate everyday situations",
            "Recognize common abbreviations in German notices",
            "Use keywords to quickly identify the correct match"
          ],
          placeholderThumbnail: "/images/thumbnails/lesen-teil1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex17-4-1",
          type: "multiple-choice",
          question: "📋 Read the sign:\n\n\'Rauchen verboten!\nAuch E-Zigaretten!\'\n\n❓ Where would you see this sign?",
          options: [
            "a) In a place where you can smoke freely",
            "b) In a no-smoking area (e.g., hospital, restaurant)",
            "c) In a tobacco shop",
            "d) At an outdoor café"
          ],
          correctAnswer: "b) In a no-smoking area (e.g., hospital, restaurant)",
          explanation: "'Verboten' = Forbidden. If it's forbidden, you can't do it there. This is a common sign in public buildings in Germany, just like 'No Smoking' signs in Kerala hospitals or public transport.",
          xpReward: 15
        },
        {
          id: "ex17-4-2",
          type: "multiple-choice",
          question: "📋 Read the notice:\n\n\'Öffnungszeiten:\nMo–Fr: 8:00–18:00 Uhr\nSa: 9:00–13:00 Uhr\nSo und Feiertage: geschlossen\'\n\n❓ Situation: Sie möchten am Sonntag einkaufen. Geht das?",
          options: [
            "a) Ja, von 8:00 bis 18:00 Uhr",
            "b) Ja, von 9:00 bis 13:00 Uhr",
            "c) Nein, sonntags ist geschlossen",
            "d) Ja, aber nur nachmittags"
          ],
          correctAnswer: "c) Nein, sonntags ist geschlossen",
          explanation: "Opening Hours Decoding: In Germany, Sunday (Sonntag) is 'Ruhetag' (rest day). Almost all shops are 'geschlossen' (closed). Remember this for real life too, like how many shops in Kerala close on Sundays or specific holidays!",
          xpReward: 15
        },
        {
          id: "ex17-4-3",
          type: "multiple-choice",
          question: "📋 Read the ad:\n\n\'Zimmer frei!\n2-Bett-Zimmer mit Frühstück\n45 € pro Nacht / Person\nWLAN inklusive\nHotel Bergblick, Tel: 0761-555-234\'\n\n❓ Situation: Sie suchen ein Hotelzimmer mit Frühstück. Welche Information stimmt?",
          options: [
            "a) Das Zimmer kostet 45 € für zwei Personen",
            "b) Das Zimmer kostet 45 € pro Person und Nacht, mit Frühstück und WLAN",
            "c) Das Hotel hat kein WLAN",
            "d) Man muss extra für das Frühstück bezahlen"
          ],
          correctAnswer: "b) Das Zimmer kostet 45 € pro Person und Nacht, mit Frühstück und WLAN",
          explanation: "Details Matter: 'Pro Nacht / Person' means 'per night per person'. If two people stay, it's 90€. But the price INCLUDES (inklusive) breakfast and WiFi. Always check if the price is per person or per room, just like booking a homestay in Munnar!",
          xpReward: 15
        },
        {
          id: "ex17-4-4",
          type: "multiple-choice",
          question: "📋 Read the sign:\n\n\'Aufzug außer Betrieb!\nBitte benutzen Sie die Treppe.\nWir entschuldigen uns für die Unannehmlichkeiten.\'\n\n❓ Was sollen Sie machen?",
          options: [
            "a) Auf den Aufzug warten",
            "b) Die Treppe benutzen",
            "c) Den Techniker anrufen",
            "d) Einen anderen Eingang nehmen"
          ],
          correctAnswer: "b) Die Treppe benutzen",
          explanation: "Direct Instruction: 'Außer Betrieb' = Out of order (working alla). If the lift isn't working, 'Treppe' (stairs) is your only option. Get some exercise, machane! This is a common notice in any building, be it in Germany or India.",
          xpReward: 15
        },
        {
          id: "ex17-4-5",
          type: "multiple-choice",
          question: "📋 Read the notice:\n\n\'SONDERANGEBOT!\nDiese Woche: Bio-Äpfel\nnur 1,49 € / kg\n(statt 2,99 €)\nNur solange der Vorrat reicht!\'\n\n❓ Was ist richtig?",
          options: [
            "a) Die Äpfel kosten immer 1,49 €",
            "b) Die Äpfel sind diese Woche im Angebot — 1,49 € statt 2,99 € pro Kilo",
            "c) Man kann unbegrenzt Äpfel kaufen",
            "d) Das Angebot gilt den ganzen Monat"
          ],
          correctAnswer: "b) Die Äpfel sind diese Woche im Angebot — 1,49 € statt 2,99 € pro Kilo",
          explanation: "Offer Details: 'Statt' means 'instead of'. It was 2.99, now it's 1.49. But only 'solange der Vorrat reicht' (until stocks last). First come, first served! Just like a flash sale at a supermarket in Kerala!",
          xpReward: 15
        },
        {
          id: "ex17-4-6",
          type: "multiple-choice",
          question: "📋 Read the notice:\n\n\'Schwimmbad Stadtbad\nWegen Renovierung geschlossen\nvom 10.03. bis 25.03.\nAb 26.03. wieder geöffnet!\nHallenbad Ost bleibt als Alternative geöffnet.\'\n\n❓ Situation: Sie möchten am 15. März schwimmen gehen. Was machen Sie?",
          options: [
            "a) Zum Stadtbad gehen — es hat normal geöffnet",
            "b) Zum Hallenbad Ost gehen — das Stadtbad ist geschlossen",
            "c) Bis April warten",
            "d) Das Stadtbad ist nur am Wochenende geschlossen"
          ],
          correctAnswer: "b) Zum Hallenbad Ost gehen — das Stadtbad ist geschlossen",
          explanation: "Dates Matter! March 15th is between March 10th and 25th. So 'Stadtbad' is closed. The notice says 'Alternative: Hallenbad Ost'. Go there instead! Always check the dates carefully, like when your local swimming pool is closed for maintenance.",
          xpReward: 15
        },
        {
          id: "ex17-4-7",
          type: "multiple-choice",
          question: "📋 Read the ad:\n\n\'Flohmarkt im Gemeindezentrum!\nSamstag, 25. März\n10:00–16:00 Uhr\nStandgebühr: 5 €\nAnmeldung bis 20.03. bei Frau Klein\nTel: 0171-555-1234\'\n\n❓ Situation: Sie möchten auf dem Flohmarkt Sachen verkaufen. Was müssen Sie tun?",
          options: [
            "a) Einfach am 25. März kommen — keine Anmeldung nötig",
            "b) Sich bis zum 20. März bei Frau Klein anmelden und 5 € Standgebühr bezahlen",
            "c) Eine E-Mail an das Gemeindezentrum schreiben",
            "d) 25 € Gebühr bezahlen"
          ],
          correctAnswer: "b) Sich bis zum 20. März bei Frau Klein anmelden und 5 € Standgebühr bezahlen",
          explanation: "Deadlines! You can't just show up. You must register (Anmeldung) by the 20th and pay the fee (Gebühr). This is like registering for a local fair or exhibition in Kerala – there's always a deadline and a fee!",
          xpReward: 15
        },
        {
          id: "ex17-4-8",
          type: "multiple-choice",
          question: "📋 Read the sign:\n\n\'Parkplatz nur für Kunden!\nMaximale Parkdauer: 2 Stunden\nFalschparker werden abgeschleppt!\'\n\n❓ Was bedeutet das?",
          options: [
            "a) Jeder darf hier parken",
            "b) Nur Kunden dürfen hier maximal 2 Stunden parken",
            "c) Man darf den ganzen Tag parken",
            "d) Parken kostet 2 Euro pro Stunde"
          ],
          correctAnswer: "b) Nur Kunden dürfen hier maximal 2 Stunden parken",
          explanation: "Rules and Consequences: 'Abschleppen' means being towed away (vandi kondu povum). To avoid that, you must be a customer AND stay less than 2 hours. Strict German rules, just like 'No Parking' zones in busy Indian cities!",
          xpReward: 15
        },
        {
          id: "ex17-4-9",
          type: "multiple-choice",
          question: "📋 Read the classified ad:\n\n\'Suche Nachhilfe in Mathematik\nfür meine Tochter (8. Klasse)\n2x pro Woche, nachmittags\nBezahlung: 15 €/Stunde\nBei Interesse: 0176-333-4567 (Frau Becker)\'\n\n❓ Was sucht Frau Becker?",
          options: [
            "a) Eine Mathematiklehrerin für eine Schule",
            "b) Nachhilfe für ihre Tochter in Mathe — 2x pro Woche",
            "c) Einen Job als Nachhilfelehrerin",
            "d) Eine Schule für ihre Tochter"
          ],
          correctAnswer: "b) Nachhilfe für ihre Tochter in Mathe — 2x pro Woche",
          explanation: "Understanding 'Suche': 'Nachhilfe' = Tutoring. She isn't looking for a job; she's looking to HIRE someone for her daughter. Don't mix up 'Suche' (search) with 'Biete' (offer). It's like placing an ad for a home tutor for your child.",
          xpReward: 15
        },
        {
          id: "ex17-4-10",
          type: "multiple-choice",
          question: "📋 Read the notice:\n\n\'Liebe Mieter,\nam Donnerstag, 23.03., zwischen 8:00 und 12:00 Uhr\nfindet eine Wartung der Heizungsanlage statt.\nBitte stellen Sie sicher, dass ein Zugang\nzu Ihrer Wohnung möglich ist.\nIhre Hausverwaltung\'\n\n❓ Was müssen die Mieter machen?",
          options: [
            "a) Die Heizung selbst reparieren",
            "b) Am Donnerstagvormittag den Zugang zur Wohnung ermöglichen",
            "c) Sich bei der Hausverwaltung beschweren",
            "d) Die ganze Woche zu Hause bleiben"
          ],
          correctAnswer: "b) Am Donnerstagvormittag den Zugang zur Wohnung ermöglichen",
          explanation: "'Wartung der Heizungsanlage' = maintenance of the heating system. 'Stellen Sie sicher, dass ein Zugang möglich ist' = make sure access to your apartment is possible. Tenants need to be available or leave a key on Thursday morning.",
          xpReward: 15
        },
        {
          id: "ex17-4-11",
          type: "dictation",
          question: "Listen and type: Rauchen verboten!",
          correctAnswer: "Rauchen verboten",
          explanation: "Great! One of the most common signs you'll see in Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-no-smoking.mp3"
        },
        {
          id: "ex17-4-12",
          type: "free-text",
          question: "Write in German: 'Sunday closed' (Sunday = Sonntag, closed = geschlossen)",
          correctAnswer: "Sonntag geschlossen",
          explanation: "Wunderbar! This is a very important piece of information for life in Germany.",
          xpReward: 30
        },
        {
          id: "ex17-4-13",
          type: "dictation",
          question: "Listen and type: Der Aufzug ist außer Betrieb.",
          correctAnswer: "Der Aufzug ist außer Betrieb",
          explanation: "Perfect! 'Außer Betrieb' (out of order) is a phrase you should recognize and be able to type.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-elevator-out.mp3"
        }
      ],
      vocabulary: [
        {
          id: "vocab17-4-1",
          german: "das Schild",
          english: "the sign",
          malayalam: "ചിഹ്നം / ബോർഡ്",
          pronunciation: "dahs shilt",
          example: "Lesen Sie das Schild an der Tür.",
          exampleTranslation: "Read the sign on the door."
        },
        {
          id: "vocab17-4-2",
          german: "verboten",
          english: "forbidden / prohibited",
          malayalam: "നിരോധിച്ചിരിക്കുന്നു",
          pronunciation: "fer-boh-ten",
          example: "Parken ist hier verboten.",
          exampleTranslation: "Parking is prohibited here."
        },
        {
          id: "vocab17-4-3",
          german: "die Anzeige",
          english: "the advertisement / classified",
          malayalam: "പരസ്യം",
          pronunciation: "dee ahn-tsy-ge",
          example: "Ich habe eine Anzeige in der Zeitung gelesen.",
          exampleTranslation: "I read an advertisement in the newspaper."
        },
        {
          id: "vocab17-4-4",
          german: "die Öffnungszeiten",
          english: "the opening hours",
          malayalam: "പ്രവർത്തന സമയം",
          pronunciation: "dee uff-nungs-tsy-ten",
          example: "Die Öffnungszeiten stehen an der Tür.",
          exampleTranslation: "The opening hours are on the door."
        }
      ]
    },

    // ==================== LESSON 17-5: Lesen Teil 2 & 3 — E-Mails und Texte ====================
    {
      id: "17-5",
      title: "Lesen Teil 2 & 3 — E-Mails und Texte",
      titleGerman: "Lesen Teil 2 & 3 — Anzeigen, E-Mails und Texte",
      description: "Practice reading classifieds (Richtig/Falsch) and short emails with multiple choice — the exact format of Lesen Teil 2 and Teil 3 of the Goethe A1 exam.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v17-5-1",
          title: "Lesen Teil 2 & 3 — Ads, Emails & Texts",
          duration: "12:00",
          description: "Master reading classifieds with Richtig/Falsch and short emails with multiple choice — the two remaining parts of Lesen.",
          scriptOutline: [
            "Opening: 'Now the longer reading texts — ads and emails!'",
            "Teil 2 format: 5 short classifieds/ads — each with a Richtig/Falsch statement",
            "Ads can be: apartment listings, job postings, event notices, selling items",
            "Key info in ads: WHAT, WHERE, WHEN, HOW MUCH, CONTACT",
            "Example ad: '2-Zi-Wohnung, 55 m², 480 € + NK, ab sofort frei'",
            "Statement: 'Die Wohnung hat 3 Zimmer' → FALSCH (it's 2 Zimmer!)",
            "Teil 3 format: 5 short emails/letters — each with a multiple choice question (a/b/c)",
            "Email types: invitation, cancellation, request, thank you, complaint",
            "Key structures: 'Liebe/r...' (informal), 'Sehr geehrte/r...' (formal)",
            "What to look for: Who is writing? About what? What should the reader do?",
            "Strategy: Read the question FIRST, then scan the email for the answer",
            "The first and last sentences often contain the most important information",
            "Closing: 'Ads = numbers and facts. Emails = understand the main message!'"
          ],
          keyVocabulary: ["die Kleinanzeige", "die E-Mail", "der Betreff", "die Einladung"],
          learningObjectives: [
            "Read classifieds and decide Richtig/Falsch on statements",
            "Read short emails and answer multiple choice comprehension questions",
            "Extract key information: who, what, when, where, why",
            "Distinguish between formal and informal German emails"
          ],
          placeholderThumbnail: "/images/thumbnails/lesen-teil2-3.jpg"
        }
      ],
      exercises: [
        // Teil 2 style: Classifieds/Ads → Richtig/Falsch
        {
          id: "ex17-5-1",
          type: "multiple-choice",
          question: "📰 Read the classified ad:\n\n\'Verkaufe Fahrrad, 3 Jahre alt, guter Zustand.\nFarbe: blau. Preis: 120 €.\nNur Abholung in München-Schwabing.\nTel: 0176-555-8901 (abends ab 18 Uhr)\'\n\n📝 Statement: Das Fahrrad kann man sich liefern lassen.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Nur Abholung' = Pickup only. In Germany, if the ad says this, the seller WON'T bring it to you. You need to go there yourself. Kerala-il 'direct pickup' enn parayille? Athe pole thanne!",
          xpReward: 15
        },
        {
          id: "ex17-5-2",
          type: "multiple-choice",
          question: "📰 Read the classified ad:\n\n\'Restaurant Napoli sucht Kellner/in\nTeilzeit, 20 Std./Woche\nArbeitszeit: Do–So, 17:00–22:00 Uhr\nErfahrung in der Gastronomie erwünscht\nGute Deutschkenntnisse erforderlich\nBewerbung an: napoli@restaurant.de\'\n\n📝 Statement: Man arbeitet auch am Montag.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "Abbreviations check: 'Do–So' = Thursday to Sunday. Monday (Montag) is NOT in that list. Don't assume typical Kochi 'work all days' culture—Germans are very specific about shift days!",
          xpReward: 15
        },
        {
          id: "ex17-5-3",
          type: "multiple-choice",
          question: "📰 Read the ad:\n\n\'Wohnung zu vermieten:\n3 Zimmer, Küche, Bad\n72 m², 3. OG (kein Aufzug)\nMiete: 580 € + 120 € NK\nAb 01.05. frei\nKontakt: Hausverwaltung Müller, 0761-444-5678\'\n\n📝 Statement: Die Gesamtmiete beträgt 580 Euro pro Monat.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "The NK Trap: 580€ is 'Kaltmiete' (cold rent). You MUST add the 120€ 'Nebenkosten' (NK) for water/heating. Total = 700€. 580€ is just the base—it's not the 'Gesamtmiete' (total rent)!",
          xpReward: 15
        },
        {
          id: "ex17-5-4",
          type: "multiple-choice",
          question: "📰 Read the ad:\n\n\'Deutschkurs für Anfänger (A1)\nVolkshochschule Frankfurt\nStart: 10. April, jeden Dienstag und Donnerstag\n18:00–20:00 Uhr\n12 Wochen, Kursgebühr: 180 €\nAnmeldung online: www.vhs-frankfurt.de\'\n\n📝 Statement: Der Kurs findet dreimal pro Woche statt.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Dienstag und Donnerstag' = 2 days. The statement says 'dreimal' (thrice). Simple math logic. Always match the number of days exactly!",
          xpReward: 15
        },
        {
          id: "ex17-5-5",
          type: "multiple-choice",
          question: "📰 Read the ad:\n\n\'Babysitter gesucht!\nFür zwei Kinder (3 und 6 Jahre)\nMontag und Mittwoch, 14:00–18:00 Uhr\n12 € pro Stunde\nNichtraucher/in, Erfahrung mit Kindern\nFamilie Schmidt, Tel: 0151-222-3456\'\n\n📝 Statement: Die Familie sucht einen Babysitter für ein Kind.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "Number Check: Ad says 'zwei Kinder' (two children). Statement says 'ein Kind' (one child). Don't let the singular 'Babysitter' confuse you—look at the number of kids!",
          xpReward: 15
        },
        // Teil 3 style: Emails → Multiple choice
        {
          id: "ex17-5-6",
          type: "multiple-choice",
          question: "📧 Read the email:\n\n\'Liebe Frau Yilmaz,\nvielen Dank für Ihre Bewerbung als Verkäuferin in unserem Geschäft. Wir möchten Sie gern zu einem Vorstellungsgespräch einladen. Hätten Sie am Mittwoch, den 22. März, um 10 Uhr Zeit? Bitte bringen Sie Ihren Lebenslauf und Ihre Zeugnisse mit.\nMit freundlichen Grüßen,\nModehaus Fischer\'\n\n❓ Warum schreibt das Modehaus an Frau Yilmaz?",
          options: [
            "a) Um ihr den Job zu geben",
            "b) Um sie zu einem Vorstellungsgespräch einzuladen",
            "c) Um ihre Bewerbung abzulehnen"
          ],
          correctAnswer: "b) Um sie zu einem Vorstellungsgespräch einzuladen",
          explanation: "'Vorstellungsgespräch' = Interview. This is a very common email for job seekers. They haven't given her the job YET, just an interview invite!",
          xpReward: 15
        },
        {
          id: "ex17-5-7",
          type: "multiple-choice",
          question: "📧 Read the email:\n\n\'Lieber Marco,\nleider muss ich unser Treffen am Freitag absagen. Meine Mutter ist krank und ich muss nach Hamburg fahren. Können wir uns stattdessen nächste Woche Dienstag treffen? Gleiche Zeit, gleicher Ort?\nViele Grüße,\nSophie\'\n\n❓ Was möchte Sophie?",
          options: [
            "a) Sie möchte das Treffen am Freitag bestätigen",
            "b) Sie möchte das Treffen auf Dienstag nächste Woche verschieben",
            "c) Sie möchte das Treffen ganz absagen"
          ],
          correctAnswer: "b) Sie möchte das Treffen auf Dienstag nächste Woche verschieben",
          explanation: "Verschieben = Postpone/Move. She says 'muss absagen' for Friday but immediately asks for 'nächste Woche Dienstag'. That's a classic schedule move!",
          xpReward: 15
        },
        {
          id: "ex17-5-8",
          type: "multiple-choice",
          question: "📧 Read the email:\n\n\'Sehr geehrter Herr Braun,\nIhr Paket konnte heute leider nicht zugestellt werden, da niemand zu Hause war. Sie können das Paket ab morgen in unserer Filiale in der Hauptstraße 12 abholen. Bitte bringen Sie Ihren Personalausweis mit. Die Filiale ist Mo–Fr von 9:00 bis 18:00 Uhr geöffnet.\nMit freundlichen Grüßen,\nDHL Kundenservice\'\n\n❓ Was muss Herr Braun mitbringen?",
          options: [
            "a) Das Paket",
            "b) Seinen Personalausweis",
            "c) Die Rechnung"
          ],
          correctAnswer: "b) Seinen Personalausweis",
          explanation: "Golden Rule: In Germany, you ALWAYS need your 'Personalausweis' (ID card) to pick up a package. It's a non-negotiable rule. Malayalam-il 'Passport konduva' enn parayunna pole!",
          xpReward: 15
        },
        {
          id: "ex17-5-9",
          type: "multiple-choice",
          question: "📧 Read the email:\n\n\'Liebe Nachbarn,\nam Samstag, den 18. März, feiere ich meinen 30. Geburtstag. Die Feier beginnt um 20 Uhr und geht bis ca. 1 Uhr nachts. Es kann etwas lauter werden — ich bitte um Verständnis! Wenn Sie möchten, sind Sie herzlich eingeladen, auf ein Stück Kuchen vorbeizukommen.\nViele Grüße,\nTim aus dem 2. OG\'\n\n❓ Warum schreibt Tim an seine Nachbarn?",
          options: [
            "a) Er beschwert sich über Lärm",
            "b) Er informiert sie über seine Party und entschuldigt sich im Voraus für den Lärm",
            "c) Er bittet die Nachbarn, leise zu sein"
          ],
          correctAnswer: "b) Er informiert sie über seine Party und entschuldigt sich im Voraus für den Lärm",
          explanation: "Cultural Note: 'Ruhezeit' (Quiet Hours) is sacred in Germany. If you have a party, you MUST warn neighbors. He's being a 'Gute Nachbar' (Good Neighbor)!",
          xpReward: 15
        },
        {
          id: "ex17-5-10",
          type: "multiple-choice",
          question: "📧 Read the email:\n\n\'Sehr geehrte Kursteilnehmer,\nder Deutschkurs am Donnerstag, 16. März, fällt wegen Krankheit der Lehrerin leider aus. Der Unterricht findet am Freitag, 17. März, zur gleichen Zeit (18:00–20:00 Uhr) statt. Bitte bringen Sie das Kursbuch Kapitel 5 mit.\nMit freundlichen Grüßen,\nVolkshochschule Freiburg\'\n\n❓ Wann findet der Kurs statt?",
          options: [
            "a) Am Donnerstag wie geplant",
            "b) Am Freitag von 18:00 bis 20:00 Uhr",
            "c) Der Kurs ist komplett abgesagt"
          ],
          correctAnswer: "b) Am Freitag von 18:00 bis 20:00 Uhr",
          explanation: "'Fällt am Donnerstag aus' = cancelled on Thursday. 'Findet am Freitag, 17. März, zur gleichen Zeit statt' = takes place on Friday at the same time (18:00–20:00). The class is moved, not cancelled.",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab17-5-1",
          german: "die Kleinanzeige",
          english: "the classified ad",
          malayalam: "ക്ലാസിഫൈഡ് പരസ്യം",
          pronunciation: "dee kline-ahn-tsy-ge",
          example: "Ich habe eine Kleinanzeige aufgegeben.",
          exampleTranslation: "I placed a classified ad."
        },
        {
          id: "vocab17-5-2",
          german: "die Bewerbung",
          english: "the application",
          malayalam: "അപേക്ഷ",
          pronunciation: "dee be-ver-boong",
          example: "Schicken Sie Ihre Bewerbung per E-Mail.",
          exampleTranslation: "Send your application by email."
        },
        {
          id: "vocab17-5-3",
          german: "absagen",
          english: "to cancel",
          malayalam: "റദ്ദാക്കുക",
          pronunciation: "ahp-zah-gen",
          example: "Ich muss den Termin leider absagen.",
          exampleTranslation: "I unfortunately have to cancel the appointment."
        }
      ]
    },

    // ==================== LESSON 17-6: Übungstest — Hören & Lesen ====================
    {
      id: "17-6",
      title: "Übungstest — Hören & Lesen",
      titleGerman: "Übungstest — Hören & Lesen komplett",
      description: "Full mock exam covering ALL parts of Hören (Teil 1, 2, 3) and Lesen (Teil 1, 2, 3). 15 exercises in real exam format — test yourself under exam conditions!",
      duration: "90 min",
      xpReward: 250,
      videos: [
        {
          id: "v17-6-1",
          title: "Mock Exam — Final Tips",
          duration: "8:00",
          description: "Last-minute tips and strategy before you take the full Hören & Lesen mock exam.",
          scriptOutline: [
            "Opening: 'Machane, ippol real exam feel aanu — are you ready?'",
            "Quick recap of all 6 parts: Hören 1/2/3 + Lesen 1/2/3",
            "Time management: Hören ~20 min, Lesen ~25 min",
            "Hören: Read questions first, listen for keywords, watch for negation",
            "Lesen: Scan for key words, don't translate word-by-word",
            "If stuck: Make your best guess and MOVE ON — don't waste time!",
            "Common mistakes: Confusing 'nicht' statements, mixing up similar numbers",
            "Stay calm: Each question is independent — one wrong answer doesn't affect the next",
            "This mock has 15 exercises: 6 Hören + 9 Lesen — treat it like the real thing!",
            "Closing: 'Viel Erfolg! You've prepared well — now SHOW what you know!'"
          ],
          keyVocabulary: ["der Übungstest", "Viel Erfolg", "die Strategie"],
          learningObjectives: [
            "Apply all Hören and Lesen strategies in exam conditions",
            "Practice time management across all 6 parts",
            "Build confidence for the actual Goethe A1 exam",
            "Identify any remaining weak areas for further practice"
          ],
          placeholderThumbnail: "/images/thumbnails/mock-exam-hoeren-lesen.jpg"
        }
      ],
      exercises: [
        // ---- HÖREN TEIL 1: Richtig/Falsch (3 exercises) ----
        {
          id: "ex17-6-1",
          type: "multiple-choice",
          question: "📢 [Hören Teil 1, Nr. 1]\nYou hear:\n\'Guten Tag, hier ist die Zahnarztpraxis Dr. Hoffmann. Frau Meier, Ihr Termin am Freitag um 9 Uhr ist bestätigt. Bitte bringen Sie Ihre Versicherungskarte mit. Bis Freitag!\'\n\n📝 Statement: Frau Meier hat einen Termin am Donnerstag.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "The message says 'am Freitag um 9 Uhr' — the appointment is on FRIDAY, not Thursday (Donnerstag). → Falsch",
          xpReward: 15
        },
        {
          id: "ex17-6-2",
          type: "multiple-choice",
          question: "📢 [Hören Teil 1, Nr. 2]\nYou hear:\n\'Achtung, liebe Fahrgäste! Wegen Bauarbeiten fährt die U-Bahn-Linie 3 heute nur bis Marienplatz. Ab Marienplatz fahren Ersatzbusse. Wir bitten um Verständnis.\'\n\n📝 Statement: Die U-Bahn-Linie 3 fährt heute die ganze Strecke.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Fährt nur bis Marienplatz' — the U-Bahn only goes TO Marienplatz, not the full route. Replacement buses (Ersatzbusse) run from there. → Falsch",
          xpReward: 15
        },
        {
          id: "ex17-6-3",
          type: "multiple-choice",
          question: "📢 [Hören Teil 1, Nr. 3]\nYou hear:\n\'Hallo Stefan, hier ist Claudia. Unser Flug nach Rom am Sonntag geht um 7:15 Uhr morgens. Wir müssen also schon um 5 Uhr am Flughafen sein. Ich hole dich um 4:30 Uhr ab. Bitte sei pünktlich!\'\n\n📝 Statement: Claudia holt Stefan um 4:30 Uhr ab.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Richtig",
          explanation: "'Ich hole dich um 4:30 Uhr ab' = I'll pick you up at 4:30. The statement matches exactly. → Richtig",
          xpReward: 15
        },
        // ---- HÖREN TEIL 2: Dialogue → Multiple choice (3 exercises) ----
        {
          id: "ex17-6-4",
          type: "multiple-choice",
          question: "🗣️ [Hören Teil 2, Nr. 1]\nDialogue:\nFrau: 'Was kostet die Jacke im Schaufenster?'\nVerkäufer: 'Die war 89 Euro, aber jetzt ist sie reduziert auf 59 Euro.'\nFrau: 'Kann ich sie anprobieren?'\nVerkäufer: 'Natürlich! Die Umkleidekabinen sind dort hinten.'\n\n❓ Wie viel kostet die Jacke jetzt?",
          options: ["a) 89 Euro", "b) 59 Euro", "c) 49 Euro"],
          correctAnswer: "b) 59 Euro",
          explanation: "'Jetzt ist sie reduziert auf 59 Euro' — it's now reduced to 59 euros. The original price was 89 euros, but the CURRENT price is 59.",
          xpReward: 15
        },
        {
          id: "ex17-6-5",
          type: "multiple-choice",
          question: "🗣️ [Hören Teil 2, Nr. 2]\nDialogue:\nMann: 'Ich möchte gern ein Einzelzimmer für zwei Nächte.'\nRezeptionistin: 'Einzelzimmer haben wir leider nicht mehr frei. Aber ich kann Ihnen ein Doppelzimmer zum Einzelzimmerpreis anbieten.'\nMann: 'Das klingt gut! Was kostet es pro Nacht?'\nRezeptionistin: '75 Euro inklusive Frühstück.'\n\n❓ Was bekommt der Mann?",
          options: ["a) Ein Einzelzimmer für 75 Euro", "b) Ein Doppelzimmer zum Einzelzimmerpreis", "c) Kein Zimmer — alles ist ausgebucht"],
          correctAnswer: "b) Ein Doppelzimmer zum Einzelzimmerpreis",
          explanation: "No single rooms available ('nicht mehr frei'). She offers a double room at the single room price ('Doppelzimmer zum Einzelzimmerpreis'). Good deal! 75 Euro per night with breakfast.",
          xpReward: 15
        },
        {
          id: "ex17-6-6",
          type: "multiple-choice",
          question: "🗣️ [Hören Teil 2, Nr. 3]\nDialogue:\nLisa: 'Hast du Lust, am Wochenende wandern zu gehen?'\nTom: 'Hmm, wie wird das Wetter?'\nLisa: 'Am Samstag soll es regnen, aber am Sonntag wird es sonnig.'\nTom: 'Dann lieber am Sonntag! Um wie viel Uhr?'\nLisa: 'Treffen wir uns um 9 Uhr am Parkplatz.'\n\n❓ Wann gehen Lisa und Tom wandern?",
          options: ["a) Am Samstag um 9 Uhr", "b) Am Sonntag um 9 Uhr", "c) Am Sonntag um 10 Uhr"],
          correctAnswer: "b) Am Sonntag um 9 Uhr",
          explanation: "Tom says 'Dann lieber am Sonntag' (then better on Sunday) because Saturday has rain. Lisa suggests 9 Uhr. They hike on Sunday at 9 AM at the parking lot.",
          xpReward: 15
        },
        // ---- LESEN TEIL 1: Signs → Situation match (3 exercises) ----
        {
          id: "ex17-6-7",
          type: "multiple-choice",
          question: "📋 [Lesen Teil 1, Nr. 1]\nRead the sign:\n\n\'Bibliothek — Sommeröffnungszeiten\nJuli & August:\nMo–Do: 10:00–18:00 Uhr\nFr: 10:00–14:00 Uhr\nSa, So: geschlossen\nAb September gelten wieder die normalen Öffnungszeiten.\'\n\n❓ Situation: Sie möchten am Freitagnachmittag um 15 Uhr in die Bibliothek. Geht das im Juli?",
          options: [
            "a) Ja, die Bibliothek hat bis 18 Uhr geöffnet",
            "b) Nein, am Freitag schließt sie um 14 Uhr",
            "c) Nein, die Bibliothek ist im Sommer ganz geschlossen"
          ],
          correctAnswer: "b) Nein, am Freitag schließt sie um 14 Uhr",
          explanation: "Summer hours on Friday: '10:00–14:00 Uhr'. At 15:00 (3 PM), the library is already closed. Only Monday to Thursday is open until 18:00 in summer.",
          xpReward: 15
        },
        {
          id: "ex17-6-8",
          type: "multiple-choice",
          question: "📋 [Lesen Teil 1, Nr. 2]\nRead the sign:\n\n\'Hunde willkommen!\nBitte an der Leine führen.\nFrisches Wasser für Ihren Hund\nam Eingang.\nHundekot bitte sofort entfernen!\'\n\n❓ Situation: Sie haben einen Hund. Dürfen Sie mit dem Hund in dieses Geschäft/Café?",
          options: [
            "a) Nein, Hunde sind verboten",
            "b) Ja, aber der Hund muss an der Leine sein",
            "c) Ja, der Hund darf frei herumlaufen"
          ],
          correctAnswer: "b) Ja, aber der Hund muss an der Leine sein",
          explanation: "'Hunde willkommen' = dogs welcome! 'Bitte an der Leine führen' = please keep on a leash. Dogs are allowed but must be on a leash. There's even water for the dog at the entrance!",
          xpReward: 15
        },
        {
          id: "ex17-6-9",
          type: "multiple-choice",
          question: "📋 [Lesen Teil 1, Nr. 3]\nRead the notice:\n\n\'ACHTUNG — Baustelle!\nStraße gesperrt vom 01.04. bis 30.04.\nUmleitung über Schillerstraße.\nAnlieger frei.\nWir bitten um Verständnis.\nStadtverwaltung Freiburg\'\n\n❓ Situation: Sie wohnen in dieser Straße. Dürfen Sie durchfahren?",
          options: [
            "a) Nein, die Straße ist für alle gesperrt",
            "b) Ja, Anlieger (Anwohner) dürfen durchfahren",
            "c) Ja, aber nur am Wochenende"
          ],
          correctAnswer: "b) Ja, Anlieger (Anwohner) dürfen durchfahren",
          explanation: "'Anlieger frei' means residents have access. If you live on this street, you may drive through. Others must use the detour via Schillerstraße.",
          xpReward: 15
        },
        // ---- LESEN TEIL 2: Classified ads → Richtig/Falsch (3 exercises) ----
        {
          id: "ex17-6-10",
          type: "multiple-choice",
          question: "📰 [Lesen Teil 2, Nr. 1]\nRead the ad:\n\n\'Biete Klavierunterricht\nfür Kinder und Erwachsene\nAnfänger und Fortgeschrittene\n25 € / 45 Minuten\nBei Ihnen zu Hause oder bei mir\nKontakt: Frau Schneider, 0157-888-9012\'\n\n📝 Statement: Der Unterricht ist nur für Kinder.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Für Kinder und Erwachsene' = for children AND adults. The lessons are for both, not just children. → Falsch",
          xpReward: 15
        },
        {
          id: "ex17-6-11",
          type: "multiple-choice",
          question: "📰 [Lesen Teil 2, Nr. 2]\nRead the ad:\n\n\'Yoga im Park — kostenlos!\nJeden Samstag, 10:00–11:00 Uhr\nStadtpark, bei der großen Eiche\nAlle Levels willkommen\nBitte Matte und Wasser mitbringen\nBei Regen fällt der Kurs aus.\'\n\n📝 Statement: Der Yoga-Kurs kostet 10 Euro.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Falsch",
          explanation: "'Kostenlos' = free of charge! The yoga class costs nothing. The statement says it costs 10 euros, which is wrong. → Falsch",
          xpReward: 15
        },
        {
          id: "ex17-6-12",
          type: "multiple-choice",
          question: "📰 [Lesen Teil 2, Nr. 3]\nRead the ad:\n\n\'Suche 2-Zimmer-Wohnung in Köln\nMaximal 600 € warm\nMit Balkon oder Garten\nAb August\nNichtraucher, keine Haustiere\nMelden Sie sich bei: Lars, koeln-wohnung@mail.de\'\n\n📝 Statement: Lars sucht eine Wohnung ab August.",
          options: ["Richtig", "Falsch", "Nicht im Text"],
          correctAnswer: "Richtig",
          explanation: "'Ab August' = from August. Lars is looking for an apartment starting in August. The statement matches. → Richtig",
          xpReward: 15
        },
        // ---- LESEN TEIL 3: Emails → Multiple choice (3 exercises) ----
        {
          id: "ex17-6-13",
          type: "multiple-choice",
          question: "📧 [Lesen Teil 3, Nr. 1]\nRead the email:\n\n\'Lieber Paul,\nich bin nächste Woche in Berlin und möchte dich gern besuchen! Hast du am Mittwoch oder Donnerstag Zeit? Wir könnten zusammen essen gehen — ich lade dich ein! Sag mir Bescheid, welcher Tag besser passt.\nBis bald,\nKlara\'\n\n❓ Was möchte Klara?",
          options: [
            "a) Paul nach München einladen",
            "b) Paul in Berlin treffen und zusammen essen gehen",
            "c) Paul bitten, nach Berlin zu kommen"
          ],
          correctAnswer: "b) Paul in Berlin treffen und zusammen essen gehen",
          explanation: "Klara is coming TO Berlin and wants to visit Paul there. 'Zusammen essen gehen — ich lade dich ein' = eat together, she's treating. She wants to meet Paul in Berlin.",
          xpReward: 15
        },
        {
          id: "ex17-6-14",
          type: "multiple-choice",
          question: "📧 [Lesen Teil 3, Nr. 2]\nRead the email:\n\n\'Sehr geehrte Damen und Herren,\nich habe am 5. März online eine Lampe bestellt (Bestellnummer: 4521). Leider ist die Lampe kaputt angekommen. Der Lampenschirm hat einen großen Riss. Ich möchte die Lampe bitte umtauschen oder mein Geld zurückbekommen.\nMit freundlichen Grüßen,\nHerr Özdemir\'\n\n❓ Warum schreibt Herr Özdemir?",
          options: [
            "a) Er möchte eine neue Lampe bestellen",
            "b) Er möchte eine kaputte Lampe umtauschen oder sein Geld zurück",
            "c) Er möchte sich für die schnelle Lieferung bedanken"
          ],
          correctAnswer: "b) Er möchte eine kaputte Lampe umtauschen oder sein Geld zurück",
          explanation: "'Die Lampe ist kaputt angekommen' = arrived broken. 'Umtauschen oder mein Geld zurückbekommen' = exchange or get money back. It's a complaint email about a damaged product.",
          xpReward: 15
        },
        {
          id: "ex17-6-15",
          type: "multiple-choice",
          question: "📧 [Lesen Teil 3, Nr. 3]\nRead the email:\n\n\'Liebe Maria,\nvielen Dank für das schöne Wochenende bei dir! Das Essen war fantastisch und ich habe mich sehr gefreut, deine Familie kennenzulernen. Besonders der Kuchen deiner Mutter war unglaublich lecker! Ich hoffe, du besuchst mich bald in Hamburg.\nGanz liebe Grüße,\nSarah\'\n\n❓ Was ist der Hauptgrund für Sarahs E-Mail?",
          options: [
            "a) Sie möchte Maria nach Hamburg einladen",
            "b) Sie bedankt sich für ein schönes Wochenende bei Maria",
            "c) Sie fragt nach dem Kuchenrezept"
          ],
          correctAnswer: "b) Sie bedankt sich für ein schönes Wochenende bei Maria",
          explanation: "'Vielen Dank für das schöne Wochenende bei dir' = Thank you for the lovely weekend at your place. The main purpose is to THANK Maria. The Hamburg mention is secondary — a hope, not the main reason for writing.",
          xpReward: 15
        }
      ],
      vocabulary: []
    }
  ]
};
