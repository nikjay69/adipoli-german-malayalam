import type { Module } from '../types';

export const MODULE_2: Module = {
  id: 2,
  title: "Who Are You?",
  titleGerman: "Wer bist du?",
  description: "This module builds the personal-information core of A1: name, origin, profession, languages, and simple identity statements. It should directly strengthen form filling, self-introduction, and short exam-style conversations.",
  icon: "🙋",
  color: "#0f3460",
  totalHours: 12,
  unlockRequirement: "Complete Module 1",
  learningTips: [
    "Practice introducing yourself in the mirror every morning. Repetition builds confidence.",
    "Spell your name in German letters daily — you WILL need this at German offices.",
    "The verb 'sein' (to be) is used in nearly every sentence. Drill it until it's automatic: bin, bist, ist, sind, seid, sind.",
  ],
  lessons: [
    // ──────────────────────────────────────────────
    // LESSON 2-1: What's Your Name?
    // ──────────────────────────────────────────────
    {
      id: "2-1",
      title: "What's Your Name?",
      titleGerman: "Wie heißt du?",
      description: "A1 learners must control this cold: asking names, saying their own name, spelling it clearly, and reacting politely. This lesson should move learners from recognition to actual spoken self-introduction.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        learnerOwner: 'nivin',
        setting: {
          name: "Goethe-Institut Kochi — Day 5 Icebreaker",
          sceneType: "classroom",
          timeOfDay: "morning",
          description: "Day 5 at Goethe Kochi. Frau Fischer rearranges the room: 'New partners today — introduce yourselves in German, spell your names.' She pairs you with Akhil — a software engineer from Trivandrum. Everyone groans playfully. Malayali names are the ultimate buchstabieren test.",
        },
        narrative: {
          previousRecap: "You survived mock interviews in Lesson 1-6. Now comes the personal-info backbone — who you are, where you're from, what you do.",
          currentObjective: "Introduce yourself and spell your name using the German alphabet",
          nextTeaser: "Next: where in India are you from? Time to locate your origin on a German map.",
        },
        peerIntro: [
          "Machaane! Goethe Kochi Day 5 — Frau Fischer says new partners. Ente partner Akhil aanu, Trivandrum-ile software engineer.",
          "Ivide ore challenge undu — Malayali names German-il spell cheyyaan tough aanu! 'Akhil' Avarkku 'A-kil' aayi kelkum.",
          "Ich heiße, Freut mich, plus German alphabet spell-out — ithokke ithiritharam kettal kittiya bore alla. Try cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab2-1-1", encounterMoment: "Akhil leans forward: 'Hi, ich bin Akhil. Wie heißt du?' His accent is still Malayali, but the German is clear.", contextSentence: "Wie heißt du?" },
          { vocabId: "vocab2-1-3", encounterMoment: "You answer confidently: 'Ich heiße Nivin.' Short, clear, correct form.", contextSentence: "Ich heiße Nivin." },
          { vocabId: "vocab2-1-5", encounterMoment: "Akhil extends a hand: 'Freut mich, Nivin!' You shake: 'Freut mich!' back. First Goethe friendship locked in.", contextSentence: "Freut mich, Akhil!" },
          { vocabId: "vocab2-1-6", encounterMoment: "Frau Fischer circles past and smiles: 'Sehr gut — und die richtige Antwort ist?' You remember: 'Gleichfalls!'", contextSentence: "Freut mich! — Gleichfalls!" },
          { vocabId: "vocab2-1-7", encounterMoment: "Akhil picks up a pen: 'Buchstabiere deinen Namen, bitte!' Nivin models N-I-V-I-N, then you spell your own name.", contextSentence: "Können Sie das buchstabieren?" },
          { vocabId: "vocab2-1-2", encounterMoment: "Frau Fischer quizzes: 'Und wenn der Interviewer am Konsulat fragt?' That would be formal: 'Wie heißen Sie?'. Different register, same question.", contextSentence: "Wie heißen Sie?" },
        ],
        decisionPoints: [
          {
            moment: "Akhil asks: 'Wie heißt du?' You want to sound friendly but complete — this is practice for the consulate later. What's your pick?",
            options: [
              { text: "Ich heiße Nivin. Freut mich!", isCorrect: true, response: "Akhil grins: 'Freut mich auch! Same boat — Trivandrum, Thrissur, Germany pokunnu.' Frau Fischer gives a nod from across the room.", peerReaction: "Adipoli machaane! Ich heiße + Freut mich = textbook combo. Frau Fischer watching, she's pleased! 😉" },
              { text: "Mein Name ist Nivin.", isCorrect: true, response: "Akhil nods: 'Hallo Nivin.' It's slightly formal but perfectly correct for A1.", peerReaction: "Correct aanu machaane! Mein Name ist = slightly more formal, but very clear. Keep going! 👍" },
              { text: "Nivin.", isCorrect: false, response: "Akhil waits a beat. 'Und... ich heiße Akhil. Freut mich.' Just the name is too short — Germans expect a full sentence.", peerReaction: "Aiyyo! Veruthe peru parayaal abrupt aanu. Full sentence — Ich heiße Nivin — always! 😬" },
            ],
          },
          {
            moment: "Akhil picks up a pen: 'Buchstabiere Nivin, bitte.' You need to spell it using German letter names, not English. How do you start?",
            options: [
              { text: "N (Enn) - I (Ee) - V (Fow) - I (Ee) - N (Enn)", isCorrect: true, response: "Akhil writes N-I-V-I-N cleanly. 'Super! Mein Name ist schwieriger — A-K-H-I-L.' You both laugh at the H drama.", peerReaction: "Gold star machaane! German letter names-il perfect spelling — athaanu correct! ✋" },
              { text: "K (Kay) - U (You) - T (Tee) - T (Tee) - A (Ay) - N (En)", isCorrect: false, response: "Akhil looks confused: 'Moment — English namen? Auf Deutsch bitte!' He starts demoing the German letter sounds.", peerReaction: "Aiyyo! Ithu German spell-out aanu, not English! K = Kah, A = Ah, T = Tay. Try cheyyu! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v2-1-1",
          title: "Ich heiße... - What's Your Name?",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-1-1.mp4"
          description: "Master introducing yourself and asking names — formal and informal, the full deal!",
          scriptOutline: [
            "Opening: 'Namaskaram! Today we learn the most important thing — your NAME in German! Nammude peru introduce cheyyaam!'",
            "Two ways to ask 'What's your name?':",
            "  Wie heißt du? — informal (friends, peers)",
            "  Wie heißen Sie? — formal (boss, professor, strangers)",
            "Three ways to answer:",
            "  Ich heiße [Name] — I am called... (standard format)",
            "  Mein Name ist [Name] — My name is... (formal/written stuff)",
            "  Ich bin [Name] — I am... (casual vibe)",
            "Freut mich! — Nice to meet you! (Kandathil santhosham!)",
            "Gleichfalls! — Likewise! (Same here!)",
            "Kerala names in German — pronunciation survival guide:",
            "  Akhil → Germans say 'A-kil' (h skip cheyyum)",
            "  Lakshmi → 'Lak-shmi' (avaru try cheyyum!)",
            "  Gopinath → 'Go-pi-nat' (th stays t)",
            "  Sreelakshmi → Ithoru workout aanu avarkku — keep a nickname ready!",
            "Pro tip: Spell your name slowly — 'Ich heiße Arun. A-R-U-N.'",
            "The German alphabet — name spell cheyyaan ithu venam!",
            "Manglish moment: 'Nammude peru parayan German-il ithra easy aanu!'",
            "Practice: Say 'Hallo! Ich heiße [your name]. Freut mich!' 5 times fast — set aakkaam!"
          ],
          keyVocabulary: ["Wie heißt du?", "Wie heißen Sie?", "Ich heiße", "Mein Name ist", "Freut mich", "Gleichfalls"],
          learningObjectives: [
            "Ask someone's name formally and informally",
            "Introduce yourself using three different patterns",
            "Respond with 'Freut mich' and 'Gleichfalls'",
            "Help Germans pronounce your Kerala name"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "3 Ways to Introduce Yourself",
              headers: ["Pattern", "German", "English"],
              rows: [
                ["Standard", "Ich heiße Rahul.", "I am called Rahul."],
                ["Formal", "Mein Name ist Rahul.", "My name is Rahul."],
                ["Casual", "Ich bin Rahul.", "I am Rahul."]
              ]
            },
            {
              type: "table",
              title: "Formal vs Informal",
              headers: ["", "Informal (du)", "Formal (Sie)"],
              rows: [
                ["Asking name", "Wie heißt du?", "Wie heißen Sie?"],
                ["Response", "Freut mich!", "Freut mich, Sie kennenzulernen!"]
              ]
            },
            {
              type: "note",
              title: "Kerala Names in German",
              variant: "tip",
              content: "Germans struggle with long names! Keep a short version ready. Sreelakshmi -> 'Sree', Gopinath -> 'Gopi'. Also, German 'th' is always just 't', so Gopinath becomes 'Go-pi-nat'."
            },
            {
              type: "vocabulary",
              items: [
                { german: "Wie heißt du?", english: "What's your name?", malayalam: "നിന്റെ പേരെന്താ?", pronunciation: "vee haiyst doo" },
                { german: "Ich heiße...", english: "I am called...", malayalam: "എന്റെ പേര്...", pronunciation: "ikh hai-se" },
                { german: "Freut mich!", english: "Nice to meet you!", malayalam: "കണ്ടതിൽ സന്തോഷം!", pronunciation: "froyt mikh" },
                { german: "Gleichfalls!", english: "Likewise!", malayalam: "അതുപോലെ!", pronunciation: "glysh-falls" }
              ]
            }
          ]
        },
        {
          id: "v2-1-2",
          title: "Spelling Your Name — The German Alphabet",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-1-2.mp4"
          description: "Learn the German alphabet so you can spell your name like a boss — no more confusion at the Ausländerbehörde!",
          scriptOutline: [
            "Opening: 'Imagine you're at a German office and they ask you to spell your name... pinne?'",
            "Why spelling matters: German offices NEED correct spelling — one wrong letter is a scene!",
            "The German alphabet — all 26 letters + special ones:",
            "  A (ah), B (beh), C (tseh), D (deh), E (eh), F (eff)...",
            "  Tricky: J = 'yot', V = 'fow', W = 'veh', Y = 'üpsilon', Z = 'tset'",
            "  Special: Ä (ah-umlaut), Ö (oh-umlaut), Ü (uh-umlaut), ß (es-tset)",
            "Practice: Common Kerala names letter by letter — A-R-U-N, P-R-I-Y-A...",
            "Buchstabieren — to spell: 'Können Sie das buchstabieren?'",
            "Scenario: At the Ausländerbehörde, name and address spell cheyyumpo...",
            "Trap: German 'E' sounds like English 'A', German 'I' sounds like English 'E'!",
            "Manglish tip: 'Panic aakanda — practice cheythaal mathi!'",
            "Challenge: Spell your full name aloud in German right now!"
          ],
          keyVocabulary: ["buchstabieren", "der Buchstabe", "das Alphabet", "Können Sie das buchstabieren?"],
          learningObjectives: [
            "Recite the German alphabet with correct pronunciation",
            "Spell your name using German letter names",
            "Understand commonly confused letters (J, V, W, Z)",
            "Handle spelling requests at German offices"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "German Alphabet — Tricky Letters",
              headers: ["Letter", "German Name", "Sounds Like"],
              rows: [
                ["J", "Jot", "Yot (not Jay!)"],
                ["V", "Fau", "Fow (like 'f' sound)"],
                ["W", "Weh", "Veh (like English 'v')"],
                ["Y", "Üpsilon", "Ue-psilon"],
                ["Z", "Tsett", "Tset (like 'ts' in tsunami)"]
              ]
            },
            {
              type: "table",
              title: "Special German Letters",
              headers: ["Letter", "Name", "Example"],
              rows: [
                ["Ä", "Ah-Umlaut", "Bär (bear)"],
                ["Ö", "Oh-Umlaut", "schön (beautiful)"],
                ["Ü", "Uh-Umlaut", "über (over)"],
                ["ß", "Eszett", "Straße (street)"]
              ]
            },
            {
              type: "note",
              title: "Confusing Letter Trap!",
              variant: "warning",
              content: "German 'E' sounds like English 'A' (ay), and German 'I' sounds like English 'E' (ee). If you spell using English sounds, Germans will write the wrong letters!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex2-1-0",
          type: "multiple-choice",
          question: "At the Goethe reception desk, the examiner asks for your name. Which form is she using?",
          questionGerman: "Die Prüferin fragt 'Wie heißen Sie?' Welche Form benutzt sie?",
          options: ["Formal (Sie)", "Informal (du)", "Plural (ihr)", "Impersonal (man)"],
          correctAnswer: "Formal (Sie)",
          explanation: "'Wie heißen Sie?' is the formal version (Sie → heißen). A peer would ask 'Wie heißt du?' (du → heißt). Always match the register they set.",
          xpReward: 10
        },
        {
          id: "ex2-1-1",
          type: "fill-blank",
          question: "Complete: _____ heiße Anna. (My name is Anna.)",
          options: ["Ich", "Du", "Er", "Wir"],
          correctAnswer: "Ich",
          explanation: "'Ich heiße' = My name is / I am called. The most basic self-introduction in German!",
          xpReward: 10
        },
        { id: "ex2-1-3", type: "multiple-choice", question: "What does 'Freut mich!' mean when meeting someone?", questionGerman: "Was bedeutet 'Freut mich!'?", options: ["Nice to meet you!", "Where are you from?", "What's your name?", "I am fine"], correctAnswer: "Nice to meet you!", explanation: "Full version is 'Es freut mich, Sie kennenzulernen', but everyone just says 'Freut mich!'. It's the perfect way to build early rapport.", xpReward: 10 },
        { id: "ex2-1-4", type: "matching", question: "Match the German phrase to its meaning:", questionGerman: "Verbinden Sie die Sätze:", options: ["Wie heißt du?", "Mein Name ist...", "Gleichfalls!"], correctAnswer: ["What's your name? (informal)", "My name is...", "Likewise!"], xpReward: 15 },
        { id: "ex2-1-5", type: "ordering", question: "Put this polite greeting in order:", questionGerman: "Bringen Sie die Begrüßung in die richtige Reihenfolge:", options: ["Freut mich! - Gleichfalls!", "Ich heiße Meera. Und du?", "Hallo! Wie heißt du?", "Ich bin Arun."], correctAnswer: ["Hallo! Wie heißt du?", "Ich heiße Meera. Und du?", "Ich bin Arun.", "Freut mich! - Gleichfalls!"], xpReward: 20 },
        {
          id: "ex2-1-6",
          type: "fill-blank",
          question: "Complete: Können Sie das _____? (Can you spell that?)",
          options: ["buchstabieren", "sprechen", "schreiben", "hören"],
          correctAnswer: "buchstabieren",
          explanation: "'Buchstabieren' = to spell (from 'Buchstabe' = letter). At German offices, you'll hear 'Können Sie das buchstabieren?' constantly. Practice spelling your name in German letters!",
          xpReward: 10
        },
        {
          id: "ex2-1-7",
          type: "multiple-choice",
          question: "Someone says 'Freut mich!' to you. What's the best response?",
          options: ["Gleichfalls!", "Danke schön!", "Auf Wiedersehen!", "Ich heiße..."],
          correctAnswer: "Gleichfalls!",
          explanation: "The pair: 'Freut mich!' → 'Gleichfalls!' works like 'Nice to meet you' → 'You too!' in English. Always respond — staying silent is awkward!",
          xpReward: 10
        },
        {
          id: "ex2-1-8",
          type: "multiple-choice",
          question: "Someone asks 'Wie heißen Sie?' You reply...?",
          options: ["Ich heiße Rahul.", "Ich bin gut.", "Danke schön.", "Auf Wiedersehen."],
          correctAnswer: "Ich heiße Rahul.",
          explanation: "'Wie heißen Sie?' = What is your name? (formal). Answer with 'Ich heiße...' + your name.",
          xpReward: 10
        },
        {
          id: "ex2-1-9",
          type: "dictation",
          question: "Listen and spell the name: A - R - U - N",
          correctAnswer: "Arun",
          explanation: "Spelling is a core A1 skill. You'll often have to spell your name at the 'Bürgeramt' or bank.",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-arun.mp3"
        },
        {
          id: "ex2-1-10",
          type: "free-text",
          question: "How do you say 'Nice to meet you' in German?",
          correctAnswer: ["Freut mich", "Freut mich!", "Es freut mich", "Es freut mich!", "Sehr erfreut", "Angenehm"],
          explanation: "Short and sweet: 'Freut mich!'. Formal variants: 'Es freut mich' or 'Sehr erfreut'. Old-fashioned: 'Angenehm'. All work.",
          xpReward: 25
        }
      ,
        {
          id: "ex2-1-prod-speaking",
          type: "speaking",
          question: "Nivin practice: Say aloud for this lesson (What's Your Name?): 'Ich heiße Nivin und komme aus Kerala.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Nivin und komme aus Kerala.'",
          correctAnswer: "Ich heiße Nivin und komme aus Kerala",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex2-1-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab2-1-1", german: "Wie heißt du?", english: "What's your name? (informal)", malayalam: "നിന്റെ പേര് എന്താ?", pronunciation: "vee hysst doo", example: "Hallo! Wie heißt du?", exampleTranslation: "Hello! What's your name?" },
        { id: "vocab2-1-2", german: "Wie heißen Sie?", english: "What's your name? (formal)", malayalam: "നിങ്ങളുടെ പേര് എന്താണ്?", pronunciation: "vee hyssen zee", example: "Guten Tag! Wie heißen Sie?", exampleTranslation: "Good day! What's your name?" },
        { id: "vocab2-1-3", german: "Ich heiße", english: "My name is", malayalam: "എന്റെ പേര്", pronunciation: "ikh hysse", example: "Ich heiße Arun.", exampleTranslation: "My name is Arun." },
        { id: "vocab2-1-4", german: "Mein Name ist", english: "My name is (formal)", malayalam: "എന്റെ പേര് ആണ്", pronunciation: "myne nah-me ist", example: "Mein Name ist Priya Nair.", exampleTranslation: "My name is Priya Nair." },
        { id: "vocab2-1-5", german: "Freut mich!", english: "Nice to meet you!", malayalam: "സന്തോഷം!", pronunciation: "froyt mikh", example: "Freut mich, Sie kennenzulernen!", exampleTranslation: "Nice to meet you!" },
        { id: "vocab2-1-6", german: "Gleichfalls!", english: "Likewise!", malayalam: "അതുപോലെ തന്നെ!", pronunciation: "glykh-fals", example: "Freut mich! — Gleichfalls!", exampleTranslation: "Nice to meet you! — Likewise!" },
        { id: "vocab2-1-7", german: "buchstabieren", english: "to spell", malayalam: "അക്ഷരങ്ങൾ പറയുക", pronunciation: "bookh-shtah-beer-en", example: "Können Sie Ihren Namen buchstabieren?", exampleTranslation: "Can you spell your name?" },
        { id: "vocab2-1-8", german: "der Name", english: "name", malayalam: "പേര്", pronunciation: "dair nah-me", example: "Wie ist Ihr Name?", exampleTranslation: "What is your name?" },
        { id: "vocab2-1-9", german: "heißen", english: "to be called", malayalam: "എന്ന് പേരുള്ള", pronunciation: "hyssen", example: "Wie heißen Sie?", exampleTranslation: "What are you called?" },
        { id: "vocab2-1-10", german: "und", english: "and", malayalam: "ഉം / -ഉം", pronunciation: "oont", example: "Ich heiße Arun, und du?", exampleTranslation: "My name is Arun, and you?" }
      ]
    },

    // ──────────────────────────────────────────────
    // LESSON 2-2: Where Are You From?
    // ──────────────────────────────────────────────
    {
      id: "2-2",
      title: "Where Are You From?",
      titleGerman: "Woher kommst du?",
      description: "Keep the focus on usable A1 output: where are you from, what nationality are you, and what languages do you speak. The lesson should prioritize exam- and life-useful self-description over decorative geography.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        learnerOwner: 'meera',
        setting: {
          name: "Goethe-Institut Kochi — Origin Drill",
          sceneType: "classroom",
          timeOfDay: "evening",
          description: "Frau Fischer pins a Kerala map and a small Europe map on the board. Two classmates, Marie and Carlos, join a mock A1 speaking circle. The task is simple: answer where you are from clearly, then correct one common nationality mistake.",
        },
        narrative: {
          previousRecap: "You've introduced yourself in the Goethe Kochi classroom. Now the mock examiner asks where you are from.",
          currentObjective: "Explain your origin and nationality with pride and precision",
          nextTeaser: "Next: say your job or student status in one clean A1 line.",
        },
        peerIntro: [
          "Goethe Kochi mock circle aanu. Question short: 'Woher kommen Sie?' Answer short: 'Ich komme aus Kerala.'",
          "If the examiner asks for country, add: 'Ich komme aus Indien.' Kerala and India both stay useful for A1.",
          "One real trap: never say 'Indianer'. Say 'Inder' or 'Inderin'. Clean, adult, exam-safe.",
        ],
        vocabEncounters: [
          { vocabId: "vocab2-2-1", encounterMoment: "In the Goethe Kochi role-play, Marie turns to you: 'Hallo! Ich bin Marie. Und woher kommst du?'", contextSentence: "Woher kommst du?" },
          { vocabId: "vocab2-2-4", encounterMoment: "You answer clearly: 'Ich komme aus Indien.' Frau Fischer nods: short answer first, details after.", contextSentence: "Ich komme aus Indien." },
          { vocabId: "vocab2-2-2", encounterMoment: "You add a little more detail: 'Ich komme aus Kerala, in Südindien.' You show her a photo of the backwaters on your phone.", contextSentence: "Ich komme aus Kerala." },
          { vocabId: "vocab2-2-6", encounterMoment: "Marie's sample card says: 'Ich komme aus der Schweiz.' Frau Fischer marks the article: die Schweiz → aus der Schweiz.", contextSentence: "Ich komme aus der Schweiz." },
          { vocabId: "vocab2-2-7", encounterMoment: "The map drill shows Europe as the future destination, not today's setting. You only need the simple A1 continent word now.", contextSentence: "Europa ist ein schöner Kontinent." },
          { vocabId: "vocab2-2-10", encounterMoment: "After your answer, Frau Fischer says: 'Gut. Sie lernen Deutsch.' The compliment belongs to the classroom rehearsal.", contextSentence: "Ich lerne die deutsche Sprache." },
        ],
        decisionPoints: [
          {
            moment: "Carlos asks: 'Bist du Indianer?' He's using the wrong word. How do you gently correct him and state your nationality?",
            options: [
              { text: "Nein, ich bin Inder. Ich komme aus Indien.", isCorrect: true, response: "Carlos realizes his mistake: 'Ah, sorry! Klar, Inder! Danke für die Korrektur.' He won't make that mistake again!", peerReaction: "Correct aayi parayeda machane! 'Inder' for Indians, 'Indianer' for Red Indians. Ithu clear aayillel confuse aakum! Well handled! 🎯" },
              { text: "Ja, ich bin Indianer.", isCorrect: false, response: "Carlos looks confused. 'Bist du sicher? Also... wie in Western-Filmen?' You just told him you're a Native American, machane!", peerReaction: "Aiyyo! Entheeda ithu! 'Indianer' ennu paranjaal pipe smoke cheyyunna 'Red Indian' ennu avarkku thonnum! Nammal 'Inder' aanu! Try again! 🚫" },
            ],
          },
          {
            moment: "Marie asks: 'Wo genau in Indien?' How do you describe Kerala's location?",
            options: [
              { text: "Ich komme aus Kerala, im Süden von Indien.", isCorrect: true, response: "Marie nods: 'Südindien! Da ist es warm, oder? Toll!' You've just started a great conversation about home.", peerReaction: "Adipoli! 'Süden' (South) is a good word to know. Showing them the map makes the connection stronger. Kerala power! 🌴" },
              { text: "Ich komme aus Kerala, im Norden von Indien.", isCorrect: false, response: "Marie looks at a map on her phone: 'Aber Kerala ist doch ganz unten, im Süden?' Geography fail, machane!", peerReaction: "Aiyyo! Kerala North-il aano? Nammal South (Süden) aanu machane! Direction maari poyalo? Norden is North! 😅" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v2-2-1",
          title: "Countries and Nationalities in German",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-2-1.mp4"
          description: "Learn how to say where you're from and what nationality you are — with the Kerala diaspora twist!",
          scriptOutline: [
            "Opening: 'Ich bin Inder — and proud! But how do we say all this in German? Let's check!'",
            "Key phrases first:",
            "  Woher kommst du? — Where are you from? (informal)",
            "  Woher kommen Sie? — Where are you from? (formal)",
            "  Ich komme aus [Place] — Njaan ...-il ninnum aanu",
            "Country → Nationality → Language pattern — this is mass!",
            "  Indien → Inder / Inderin → Hindi, Malayalam, Tamil",
            "  Deutschland → Deutscher / Deutsche → Deutsch",
            "  Frankreich → Franzose / Französin → Französisch",
            "Nationality: Male vs Female forms — usually add '-in'",
            "  Inder / Inderin, Student / Studentin — easy scene!",
            "CAREFUL! 'Indianer' means Red Indian (Native American). Nammalthalla! So don't use it!",
            "Kerala connection: 'Ich komme aus Kerala in Indien' — map-il kaanikkanam",
            "Major Cities: Berlin, München, Hamburg, Frankfurt (airport pinne!)",
            "Fun fact: Germany has 16 Bundesländer — nammude states pole!",
            "Practice: 'Ich bin Inder. Ich komme aus Kerala.' — set aakkaam!"
          ],
          keyVocabulary: ["Indien", "indisch", "Inder", "Deutschland", "deutsch", "Frankreich", "französisch"],
          learningObjectives: [
            "Name major countries in German",
            "State your nationality correctly (noun and adjective forms)",
            "Understand the country-nationality-language pattern",
            "Know the difference between Inder and Indianer",
            "Name major German cities"
          ],
          placeholderThumbnail: "/images/germany_map.png",
          richContent: [
            {
              type: "table",
              title: "Country → Nationality → Language",
              headers: ["Country", "Nationality (m/f)", "Language"],
              rows: [
                ["Indien", "Inder / Inderin", "Hindi, Malayalam"],
                ["Deutschland", "Deutscher / Deutsche", "Deutsch"],
                ["Frankreich", "Franzose / Französin", "Französisch"],
                ["England", "Engländer / Engländerin", "Englisch"]
              ]
            },
            {
              type: "note",
              title: "Inder vs Indianer — Big Difference!",
              variant: "warning",
              content: "'Inder' = Indian (from India). 'Indianer' = Native American. NEVER say 'Ich bin Indianer' — completely wrong meaning! Always use 'Inder/Inderin'."
            },
            {
              type: "vocabulary",
              items: [
                { german: "Woher kommst du?", english: "Where are you from?", malayalam: "നീ എവിടെ നിന്നാ?", pronunciation: "vo-hair komst doo" },
                { german: "Ich komme aus Indien.", english: "I come from India.", malayalam: "ഞാൻ ഇന്ത്യയിൽ നിന്നാണ്.", pronunciation: "ikh ko-me ows in-dee-en" },
                { german: "Ich bin Inder.", english: "I am Indian. (male)", malayalam: "ഞാൻ ഇന്ത്യക്കാരനാണ്.", pronunciation: "ikh bin in-der" }
              ]
            }
          ]
        },
        {
          id: "v2-2-2",
          title: "Continents and the Grammar of 'aus'",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-2-2.mp4"
          description: "Learn continents and master 'Ich komme aus + Dativ' — including the tricky countries that need articles!",
          scriptOutline: [
            "Opening: 'Europe, Asia, Africa — let's learn these auf Deutsch! Continents padikkaam!'",
            "All 7 continents in German:",
            "  Europa, Asien, Afrika, Nordamerika, Südamerika, Australien, Antarktis",
            "Grammar spotlight: 'aus' needs the Dativ case — don't panic, it's easier than it sounds!",
            "Most countries: no article needed — 'aus Indien', 'aus Deutschland', 'aus Japan'",
            "But SOME countries need articles — ithu important aanu!",
            "  die Schweiz → aus der Schweiz (Switzerland)",
            "  die Türkei → aus der Türkei (Turkey)",
            "  die USA (plural) → aus den USA (USA)",
            "  der Iran → aus dem Iran (Iran)",
            "  der Irak → aus dem Irak (Iraq)",
            "Why? Because 'aus' changes the article: die → der, der → dem, die (plural) → den",
            "Quick Dativ trick for now: die → der, der → dem — just memorize these country exceptions!",
            "Fun geography: Where are Malayalis worldwide? Everywhere!",
            "  'Malayalis wohnen in der Schweiz, in den USA, in Deutschland, in Australien...'",
            "  We are literally everywhere — Gulf, Europe, Americas, Australia!",
            "Practice round: 'Ich komme aus Indien in Asien'",
            "Mini quiz: 'Ich komme aus ___ Schweiz' — what goes in the blank?"
          ],
          keyVocabulary: ["Europa", "Asien", "Afrika", "aus der Schweiz", "aus den USA", "der Kontinent"],
          learningObjectives: [
            "Name all continents in German",
            "Understand that 'aus' requires Dativ",
            "Know which countries need articles",
            "Apply Dativ article changes with 'aus'"
          ],
          placeholderThumbnail: "/images/german_train_station.png",
          richContent: [
            {
              type: "table",
              title: "7 Continents in German",
              headers: ["German", "English"],
              rows: [
                ["Europa", "Europe"],
                ["Asien", "Asia"],
                ["Afrika", "Africa"],
                ["Nordamerika", "North America"],
                ["Südamerika", "South America"],
                ["Australien", "Australia"],
                ["Antarktis", "Antarctica"]
              ]
            },
            {
              type: "table",
              title: "Countries That Need Articles",
              headers: ["Country", "With 'aus'", "Article Type"],
              rows: [
                ["die Schweiz", "aus der Schweiz", "Feminine"],
                ["die Türkei", "aus der Türkei", "Feminine"],
                ["die USA", "aus den USA", "Plural"],
                ["der Iran", "aus dem Iran", "Masculine"],
                ["der Irak", "aus dem Irak", "Masculine"]
              ]
            },
            {
              type: "note",
              title: "'aus' Needs Dativ!",
              variant: "info",
              content: "Most countries need no article: 'aus Indien', 'aus Deutschland'. But some do! The article changes in Dativ: die -> der, der -> dem, die (plural) -> den. Just memorize the exceptions for now."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex2-2-1",
          type: "multiple-choice",
          question: "You are representing your company. How do you say 'I am Indian' as a male speaker?",
          questionGerman: "Stellen Sie sich vor: Wie sagen Sie 'I am Indian'?",
          options: ["Ich bin Inder.", "Ich bin indisch.", "Ich bin Indien.", "Ich bin Indianer."],
          correctAnswer: "Ich bin Inder.",
          explanation: "Critical nuance: 'Inder' = Indian citizen. 'Indianer' = Native American. Germans will correct you, but it's embarrassing! For a female, say 'Ich bin Inderin'.",
          xpReward: 10
        },
        {
          id: "ex2-2-2",
          type: "matching",
          question: "Match the country to its nationality (male form):",
          options: ["Deutschland", "Frankreich", "Indien"],
          correctAnswer: ["Deutscher", "Franzose", "Inder"],
          xpReward: 15
        },
        {
          id: "ex2-2-3",
          type: "fill-blank",
          question: "Complete: Ich komme aus _____ Schweiz. (I come from Switzerland)",
          options: ["der", "die", "das", "dem"],
          correctAnswer: "der",
          explanation: "'Aus' triggers Dativ case: die → der. So 'die Schweiz' becomes 'aus der Schweiz'. Just memorize the exceptions: die Schweiz, die Türkei, die USA, der Iran need articles.",
          xpReward: 10
        },
        {
          id: "ex2-2-4",
          type: "fill-blank",
          question: "Complete: Ich komme _____ Indien. (I come from India.)",
          options: ["aus", "in", "von", "nach"],
          correctAnswer: "aus",
          explanation: "'Ich komme aus' + country = I come from. 'Aus' is the preposition for origin.",
          xpReward: 10
        },
        {
          id: "ex2-2-5",
          type: "multiple-choice",
          question: "How do you say 'I live in Berlin' in German?",
          options: ["Ich wohne in Berlin", "Ich komme in Berlin", "Ich bin aus Berlin", "Ich gehe in Berlin"],
          correctAnswer: "Ich wohne in Berlin",
          explanation: "'Ich wohne in' + city = I live in. 'Wohnen' is the verb for residing somewhere.",
          xpReward: 10
        },
        {
          id: "ex2-2-6",
          type: "ordering",
          question: "Build a correct sentence: introduce yourself as being from India in Asia.",
          options: ["in Asien", "Ich", "aus Indien", "komme"],
          correctAnswer: ["Ich", "komme", "aus Indien", "in Asien"],
          xpReward: 20
        },
        {
          id: "ex2-2-7",
          type: "fill-blank",
          question: "Complete: Ich komme aus _____ USA. (I come from the USA)",
          options: ["den", "der", "die", "dem"],
          correctAnswer: "den",
          explanation: "USA is plural (die USA), so in Dativ: die → den. 'Aus den USA.' Dativ rule: der→dem, die→der, die(plural)→den. You'll master this over time!",
          xpReward: 10
        },
        {
          id: "ex2-2-8",
          type: "matching",
          question: "Match the continent to its German name:",
          options: ["Asia", "Africa", "South America"],
          correctAnswer: ["Asien", "Afrika", "Südamerika"],
          explanation: "Mastering the vowel changes (e→i, e→ie, a→ä) is essential for natural German speech.",
          xpReward: 15
        },
        {
          id: "ex2-2-9",
          type: "free-text",
          question: "A German asks 'Woher kommen Sie?' Use the sample origin card: Kochi, Kerala.",
          correctAnswer: [
            "Ich komme aus Kochi",
            "Ich komme aus Kerala",
            "Ich komme aus Kochi, Kerala",
            "Ich komme aus Indien",
            "Ich komme aus Kochi in Kerala",
            "Ich komme aus Kochi in Indien",
            "Ich komme aus Kerala, Indien"
          ],
          explanation: "'Ich komme aus' + your location. All these work. Kerala, Kochi, India — pick what feels right.",
          xpReward: 30
        },
        {
          id: "ex2-2-10",
          type: "dictation",
          question: "Listen and type: Ich komme aus Indien.",
          correctAnswer: "Ich komme aus Indien",
          explanation: "Capitalize 'Indien' and 'Ich'. German capitalization is strict!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-indien.mp3"
        }
      ,
        {
          id: "ex2-2-prod-speaking",
          type: "speaking",
          question: "Meera practice: Say aloud for this lesson (Where Are You From?): 'Ich heiße Meera und komme aus Kerala.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Meera und komme aus Kerala.'",
          correctAnswer: "Ich heiße Meera und komme aus Kerala",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex2-2-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab2-2-1", german: "Woher kommst du?", english: "Where are you from? (informal)", malayalam: "നീ എവിടെ നിന്നാ?", pronunciation: "vo-hair komst doo", example: "Woher kommst du ursprünglich?", exampleTranslation: "Where are you originally from?" },
        { id: "vocab2-2-2", german: "Ich komme aus", english: "I come from", malayalam: "ഞാൻ ... ൽ നിന്നാണ്", pronunciation: "ikh kom-me ows", example: "Ich komme aus Thiruvananthapuram.", exampleTranslation: "I come from Thiruvananthapuram." },
        { id: "vocab2-2-3", german: "das Land", english: "country", malayalam: "രാജ്യം", pronunciation: "das lahnt", example: "Deutschland ist ein schönes Land.", exampleTranslation: "Germany is a beautiful country." },
        { id: "vocab2-2-4", german: "Indien", english: "India", malayalam: "ഇന്ത്യ", pronunciation: "in-dee-en", example: "Indien ist ein großes Land.", exampleTranslation: "India is a big country." },
        { id: "vocab2-2-5", german: "Frankreich", english: "France", malayalam: "ഫ്രാൻസ്", pronunciation: "frank-rykh", example: "Frankreich liegt neben Deutschland.", exampleTranslation: "France is next to Germany." },
        { id: "vocab2-2-6", german: "die Schweiz", english: "Switzerland", malayalam: "സ്വിറ്റ്സർലൻഡ്", pronunciation: "dee shvyts", example: "Ich reise in die Schweiz.", exampleTranslation: "I am traveling to Switzerland." },
        { id: "vocab2-2-7", german: "Europa", english: "Europe", malayalam: "യൂറോപ്പ്", pronunciation: "oy-roh-pa", example: "Europa hat viele Sprachen.", exampleTranslation: "Europe has many languages." },
        { id: "vocab2-2-8", german: "Asien", english: "Asia", malayalam: "ഏഷ്യ", pronunciation: "ah-zee-en", example: "Indien liegt in Asien.", exampleTranslation: "India is in Asia." },
        { id: "vocab2-2-9", german: "indisch", english: "Indian (adjective)", malayalam: "ഇന്ത്യൻ", pronunciation: "in-dish", example: "Indisches Essen ist lecker!", exampleTranslation: "Indian food is delicious!" },
        { id: "vocab2-2-10", german: "deutsch", english: "German (adjective)", malayalam: "ജർമ്മൻ", pronunciation: "doych", example: "Ich lerne die deutsche Sprache.", exampleTranslation: "I am learning the German language." }
      ]
    },

    // ──────────────────────────────────────────────
    // LESSON 2-3: What Do You Do?
    // ──────────────────────────────────────────────
    {
      id: "2-3",
      title: "What Do You Do?",
      titleGerman: "Was machst du?",
      description: "Professions, jobs, and the all-important verb 'sein' (to be) — the backbone of German! Entha ninde job? Let's learn to say it auf Deutsch!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        learnerOwner: 'nivin',
        setting: {
          name: "Goethe-Institut Kochi — Beruf Role-Play",
          sceneType: "classroom",
          timeOfDay: "afternoon",
          description: "Frau Fischer turns the classroom into a small A1 speaking desk. Each learner gets a role card: student, nurse, engineer, programmer. Your job is to answer 'Was sind Sie von Beruf?' without copying English articles into German.",
        },
        narrative: {
          previousRecap: "You've shared your origin in the Goethe Kochi mock circle. Now you add job or student status.",
          currentObjective: "Define your professional identity using the verb 'sein'",
          nextTeaser: "Next: you speak more languages than you think! Time to flex those skills!",
        },
        peerIntro: [
          "Classroom role-play aanu. Frau Fischer asks: 'Was sind Sie von Beruf?' You answer in one clean line.",
          "German-il profession parayumpo 'Ich bin a student' alla. Just: 'Ich bin Student' or 'Ich bin Studentin'.",
          "Main tool: sein. For your own answer, start with 'Ich bin...'. Keep it useful before full grammar tables.",
        ],
        vocabEncounters: [
          { vocabId: "vocab2-3-1", encounterMoment: "Your role-play partner asks: 'Und du, was ist dein Beruf?' They need one clear A1 answer.", contextSentence: "Was ist dein Beruf?" },
          { vocabId: "vocab2-3-5", encounterMoment: "You answer: 'Ich bin Student.' Frau Fischer points out: no article before professions.", contextSentence: "Ich bin Studentin." },
          { vocabId: "vocab2-3-2", encounterMoment: "You mention your friend back home: 'Mein Freund ist Ingenieur.' Engineering is the classic choice for many of us!", contextSentence: "Ich bin Ingenieur." },
          { vocabId: "vocab2-3-10", encounterMoment: "A second card says: 'Ich will Arzt sein.' You notice how sein carries identity and plans.", contextSentence: "Ich will Arzt sein." },
          { vocabId: "vocab2-3-7", encounterMoment: "The IT role card says: 'Programmierer'. You practice the job word without turning the scene into a Germany campus fantasy.", contextSentence: "Er ist Programmierer bei Bosch." },
        ],
        decisionPoints: [
          {
            moment: "The student asks: 'Was bist du von Beruf?' How do you answer correctly without the 'a/an' trap?",
            options: [
              { text: "Ich bin Student.", isCorrect: true, response: "Exactly! 'Ich bin Student' — simple, clear, and grammatically perfect. The student smiles and nods.", peerReaction: "Superb machane! Artikels venda professions-nu! 'Ich bin Student' paranjappol thanne nee pro aayi! 🎓" },
              { text: "Ich bin ein Student.", isCorrect: false, response: "The student understands, but corrects you gently: 'In German we just say: Ich bin Student.' Always skip the 'ein' for jobs!", peerReaction: "Aiyyo! English 'a student' ne angane thanne copy cheyyalle! Professions parayumpo 'ein' vendeeda! Just say 'Ich bin Student'. Try again! 😬" },
            ],
          },
          {
            moment: "You want to introduce Priya who is also studying with you. What do you say?",
            options: [
              { text: "Sie ist Studentin.", isCorrect: true, response: "Correct! Feminine form uses '-in'. Priya is a 'Studentin'.", peerReaction: "Correct aayille! Male student, female studentin. Ithu easy rule aanu, but important! Well done! ✨" },
              { text: "Sie ist Student.", isCorrect: false, response: "At A1, this is wrong. Female professions always take the -in ending: Studentin, Lehrerin, Ärztin. 'Sie ist Student' sounds broken to German ears.", peerReaction: "Vite machane! Female-nu '-in' add cheyyanam. Studentin, Lehrerin, Ingenieurin — ithu fixed rule aanu. 📝" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v2-3-1",
          title: "Ich bin Ingenieur! — Professions in German",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-3-1.mp4"
          description: "Learn common professions and how to say what you do — with Kerala career vibes!",
          scriptOutline: [
            "Opening: 'Was machst du? Entha ninde job? Let's fix this auf Deutsch!'",
            "Key pattern: 'Ich bin [profession]' — NO 'ein/eine' needed!",
            "  English: 'I am AN engineer' vs German: 'Ich bin Ingenieur'. Artikels venda!",
            "  Ithu oro thavanayum beginners kathi pokunna trap aanu — don't fall for it!",
            "Two ways to ask:",
            "  Was machst du beruflich? — informal",
            "  Was sind Sie von Beruf? — formal",
            "Malayali Special Careers:",
            "  Ingenieur/Ingenieurin — Engineer (the OG classic!)",
            "  Arzt/Ärztin — Doctor (Umlaut care venam!)",
            "  Krankenpfleger/Krankenschwester — Nurse (Demand vere level aanu!)",
            "  Programmierer — IT boom machaa!",
            "  Student — Free education context",
            "  Koch / Köchin — Kerala biryani experts!",
            "Male vs Female: Just add '-in' — Student becomes Studentin.",
            "Exceptions: Arzt → Ärztin, Kaufmann → Kauffrau",
            "Kerala connect: 'Thousands of nurses in Germany — career set aanu!'",
            "Practice: 'Ich bin Studentin. Was machst du beruflich?'"
          ],
          keyVocabulary: ["Ingenieur", "Arzt", "Krankenschwester", "Student", "Beruf", "Kaufmann", "Wissenschaftler"],
          learningObjectives: [
            "Name 10+ professions in German",
            "State your own profession correctly without an article",
            "Know male and female forms of professions",
            "Ask about someone's profession formally and informally"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Professions — Male & Female Forms",
              headers: ["Male (der)", "Female (die)", "English"],
              rows: [
                ["Ingenieur", "Ingenieurin", "Engineer"],
                ["Arzt", "Ärztin", "Doctor"],
                ["Krankenpfleger", "Krankenschwester", "Nurse"],
                ["Student", "Studentin", "Student"],
                ["Programmierer", "Programmiererin", "Programmer"],
                ["Koch", "Köchin", "Cook/Chef"]
              ]
            },
            {
              type: "note",
              title: "No Article Before Professions!",
              variant: "warning",
              content: "In German, you say 'Ich bin Ingenieur' (I am engineer) — NO 'ein/eine'! In English we say 'I am AN engineer' but German drops the article. This is a very common mistake!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Was machst du beruflich?", english: "What do you do? (informal)", malayalam: "നിന്റെ ജോലി എന്താ?", pronunciation: "vas mahkst doo be-roof-likh" },
                { german: "Was sind Sie von Beruf?", english: "What is your profession? (formal)", malayalam: "നിങ്ങളുടെ തൊഴിൽ എന്താണ്?", pronunciation: "vas zint zee fon be-roof" },
                { german: "Ich bin Ingenieur.", english: "I am an engineer.", malayalam: "ഞാൻ എൻജിനീയർ ആണ്.", pronunciation: "ikh bin in-zhen-yer" }
              ]
            }
          ]
        },
        {
          id: "v2-3-2",
          title: "The Verb 'sein' — To Be or Not To Be!",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-3-2.mp4"
          description: "Master the most important German verb — sein (to be). Irregular? Yes. Essential? 100%!",
          scriptOutline: [
            "Opening: 'The most important verb in ANY language — sein! To be! Aayirikuka!'",
            "Why 'sein' matters: You use it EVERYWHERE — name, profession, origin, feelings...",
            "Full conjugation of 'sein' — memorize this like your phone number!",
            "  ich bin — I am (Ich bin Arun. Ich bin Student.)",
            "  du bist — you are, informal (Du bist nett. Du bist aus Kerala.)",
            "  er ist — he is (Er ist Arzt.)",
            "  sie ist — she is (Sie ist Ingenieurin.)",
            "  es ist — it is (Es ist schön.)",
            "  wir sind — we are (Wir sind aus Kerala!)",
            "  ihr seid — you all are (Ihr seid Studenten.)",
            "  sie sind — they are (Sie sind nett.)",
            "  Sie sind — you are, formal (Sie sind sehr höflich.)",
            "Compare with English: I am, you are, he is — also irregular! So don't complain!",
            "Malayalam parallel: ആണ് (aanu) doesn't change much — but German 'sein' changes for every person!",
            "Memory trick — the 'sein' song: 'bin-bist-ist, sind-seid-sind' — sing it!",
            "Practice sentences with Kerala context:",
            "  'Ich bin aus Kochi.' — I am from Kochi",
            "  'Du bist mein Freund.' — You are my friend",
            "  'Er ist Programmierer bei Bosch.' — He is a programmer at Bosch",
            "  'Wir sind Malayalis in Deutschland.' — We are Malayalis in Germany",
            "  'Sie sind sehr freundlich.' — You are very friendly (formal)",
            "Common mistakes to avoid:",
            "  WRONG: 'Ich ist Student' → RIGHT: 'Ich bin Student'",
            "  WRONG: 'Du bin nett' → RIGHT: 'Du bist nett'",
            "Manglish recap: 'sein = aarikuka. Ich bin = Njan aanu. Easy alle?'"
          ],
          keyVocabulary: ["bin", "bist", "ist", "sind", "seid", "sein"],
          learningObjectives: [
            "Conjugate 'sein' for all six persons",
            "Use 'sein' correctly in everyday sentences",
            "Understand that 'sein' is irregular like English 'to be'",
            "Avoid the most common conjugation mistakes"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Conjugation of 'sein' (to be)",
              headers: ["Person", "German", "English"],
              rows: [
                ["ich", "bin", "I am"],
                ["du", "bist", "you are (informal)"],
                ["er/sie/es", "ist", "he/she/it is"],
                ["wir", "sind", "we are"],
                ["ihr", "seid", "you all are"],
                ["sie/Sie", "sind", "they are / you are (formal)"]
              ]
            },
            {
              type: "note",
              title: "Memory Trick",
              variant: "tip",
              content: "Sing it like a rhythm: 'bin-bist-ist, sind-seid-sind'. The 'wir' and 'sie/Sie' forms are always the same — 'sind'. Less to memorize!"
            },
            {
              type: "note",
              title: "Common Mistakes to Avoid",
              variant: "warning",
              content: "'Ich ist' is WRONG (use 'bin'). 'Du bin' is WRONG (use 'bist'). Each person has its own unique form — no shortcuts!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex2-3-1",
          type: "multiple-choice",
          question: "How do you say 'I am an engineer' in German?",
          options: ["Ich bin Ingenieur.", "Ich bin ein Ingenieur.", "Ich habe Ingenieur.", "Ich bin der Ingenieur."],
          correctAnswer: "Ich bin Ingenieur.",
          explanation: "German rule: NO article before professions! English says 'I am AN engineer', but German says 'Ich bin Ingenieur' — drop the 'ein'. This catches everyone!",
          xpReward: 10
        },
        {
          id: "ex2-3-2",
          type: "fill-blank",
          question: "Complete: Du _____ sehr nett. (You are very nice.)",
          options: ["bist", "bin", "ist", "sind"],
          correctAnswer: "bist",
          explanation: "Sein conjugation chant: ich BIN, du BIST, er IST, wir SIND, ihr SEID, sie SIND. Sing it like a song — rhythm helps memory!",
          xpReward: 10
        },
        {
          id: "ex2-3-3",
          type: "matching",
          question: "Match the pronoun to the correct form of 'sein':",
          options: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"],
          correctAnswer: ["bin", "bist", "ist", "sind", "seid", "sind"],
          xpReward: 15
        },
        {
          id: "ex2-3-5",
          type: "matching",
          question: "Match the German profession to its English meaning:",
          questionGerman: "Ordnen Sie den Beruf der Bedeutung zu:",
          options: ["Lehrer", "Koch", "Kellner", "Krankenpfleger"],
          correctAnswer: ["Teacher", "Cook / Chef", "Waiter", "Nurse (male)"],
          explanation: "For women, add -in: Lehrerin, Köchin, Kellnerin, Krankenpflegerin. This -in rule covers most professions in German.",
          xpReward: 15
        },
        {
          id: "ex2-3-6",
          type: "ordering",
          question: "Arrange the 'sein' conjugation in order: ich, du, er/sie/es, wir, ihr, sie/Sie",
          options: ["seid", "bin", "sind (wir)", "ist", "bist", "sind (sie)"],
          correctAnswer: ["bin", "bist", "ist", "sind (wir)", "seid", "sind (sie)"],
          xpReward: 20
        },
        {
          id: "ex2-3-7",
          type: "multiple-choice",
          question: "How do you ask 'What is your profession?' formally?",
          options: ["Was sind Sie von Beruf?", "Was machst du?", "Wie heißen Sie?", "Wo arbeiten du?"],
          correctAnswer: "Was sind Sie von Beruf?",
          explanation: "Two ways to ask: formal = 'Was sind Sie von Beruf?' (with Sie), casual = 'Was machst du beruflich?' (with du). For job interviews, always use the Sie version!",
          xpReward: 10
        },
        {
          id: "ex2-3-8",
          type: "fill-blank",
          question: "Complete: Er _____ Programmierer bei Bosch. (He is a programmer at Bosch.)",
          options: ["ist", "bin", "bist", "sind"],
          correctAnswer: "ist",
          explanation: "'Er ist' = he is. Same form for sie (she) ist and es (it) ist. All three third-person singulars use 'ist' — that's one less thing to memorize!",
          xpReward: 10
        },
        {
          id: "ex2-3-9",
          type: "free-text",
          question: "Someone asks 'Was machen Sie beruflich?' Use the male practice card: Student.",
          correctAnswer: ["Ich bin Student"],
          explanation: "No 'ein' or 'eine' before professions: the male sample is 'Ich bin Student'; the female sample is 'Ich bin Studentin'. Use the form that matches the practice card.",
          xpReward: 30
        },
        {
          id: "ex2-3-10",
          type: "dictation",
          question: "Listen and type: Ich bin Ingenieur.",
          correctAnswer: "Ich bin Ingenieur",
          explanation: "Ingenieur (Engineer) — a very common path for Malayalis in Germany!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-ingenieur.mp3"
        }
      ,
        {
          id: "ex2-3-prod-speaking",
          type: "speaking",
          question: "Nivin practice: Say aloud for this lesson (What Do You Do?): 'Ich heiße Nivin und komme aus Kerala.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Nivin und komme aus Kerala.'",
          correctAnswer: "Ich heiße Nivin und komme aus Kerala",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex2-3-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab2-3-1", german: "der Beruf", english: "profession", malayalam: "തൊഴിൽ", pronunciation: "dair be-roof", example: "Was ist Ihr Beruf?", exampleTranslation: "What is your profession?" },
        { id: "vocab2-3-2", german: "Ingenieur/Ingenieurin", english: "engineer", malayalam: "എഞ്ചിനീയർ", pronunciation: "in-zheh-nyur / in-zheh-nyur-in", example: "Ich bin Ingenieur.", exampleTranslation: "I am an engineer." },
        { id: "vocab2-3-3", german: "Arzt/Ärztin", english: "doctor", malayalam: "ഡോക്ടർ", pronunciation: "artst / airts-tin", example: "Mein Bruder ist Arzt.", exampleTranslation: "My brother is a doctor." },
        { id: "vocab2-3-4", german: "Krankenschwester/Krankenpfleger", english: "nurse (f/m)", malayalam: "നഴ്സ്", pronunciation: "kran-ken-shves-ter / kran-ken-pflay-ger", example: "Sie ist Krankenschwester in München.", exampleTranslation: "She is a nurse in Munich." },
        { id: "vocab2-3-5", german: "Student/Studentin", english: "student", malayalam: "വിദ്യാർത്ഥി", pronunciation: "shtoo-dent / shtoo-den-tin", example: "Ich bin Studentin in Berlin.", exampleTranslation: "I am a student in Berlin." },
        { id: "vocab2-3-6", german: "Lehrer/Lehrerin", english: "teacher", malayalam: "അധ്യാപകൻ / അധ്യാപിക", pronunciation: "lair-er / lair-er-in", example: "Meine Mutter ist Lehrerin.", exampleTranslation: "My mother is a teacher." },
        { id: "vocab2-3-7", german: "Programmierer/Programmiererin", english: "programmer", malayalam: "പ്രോഗ്രാമർ", pronunciation: "pro-gra-meer-er / pro-gra-meer-er-in", example: "Er ist Programmierer bei Bosch.", exampleTranslation: "He is a programmer at Bosch." },
        { id: "vocab2-3-8", german: "Koch/Köchin", english: "cook / chef", malayalam: "പാചകക്കാരൻ / പാചകക്കാരി", pronunciation: "kokh / kur-khin", example: "Der Koch macht gutes Essen.", exampleTranslation: "The cook makes good food." },
        { id: "vocab2-3-9", german: "Kellner/Kellnerin", english: "waiter / waitress", malayalam: "വെയിറ്റർ", pronunciation: "kell-ner / kell-ner-in", example: "Der Kellner bringt das Essen.", exampleTranslation: "The waiter brings the food." },
        { id: "vocab2-3-10", german: "sein", english: "to be", malayalam: "ആയിരിക്കുക", pronunciation: "zyne", example: "Ich will Arzt sein.", exampleTranslation: "I want to be a doctor." }
      ]
    },

    // ──────────────────────────────────────────────
    // LESSON 2-4: Languages I Speak
    // ──────────────────────────────────────────────
    {
      id: "2-4",
      title: "Languages I Speak",
      titleGerman: "Sprachen, die ich spreche",
      description: "Talk about the languages you speak — and as a Malayali, you probably speak more than most! Time to flex your multilingual skills auf Deutsch!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        learnerOwner: 'meera',
        setting: {
          name: "Goethe-Institut Kochi — Language Circle",
          sceneType: "classroom",
          timeOfDay: "afternoon",
          description: "Frau Fischer runs a quick language-circle drill. Every learner says their mother tongue, English, and the honest A1 line for German: 'ein bisschen Deutsch.' The scene stays in Kerala while the future Germany goal stays visible.",
        },
        narrative: {
          previousRecap: "You've explained job or student status in the role-play. Now you add the languages you actually speak.",
          currentObjective: "Discuss language proficiency and the 'vowel-changing' verb sprechen",
          nextTeaser: "Next: the final challenge! Putting it all together for a full conversation!",
        },
        peerIntro: [
          "Language circle aanu. Output simple: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.'",
          "Malayali learners usually have a real multilingual advantage. Say it calmly; no flexing needed.",
          "Context care venam: 'sprechen' changes with du: 'du sprichst'. For your A1 intro, 'ich spreche' is enough.",
        ],
        vocabEncounters: [
          { vocabId: "vocab2-4-2", encounterMoment: "Your partner card asks: 'Welche Sprachen sprichst du?' You answer from your real life.", contextSentence: "Ich spreche drei Sprachen." },
          { vocabId: "vocab2-4-9", encounterMoment: "You explain: 'Malayalam ist meine Muttersprache.' Frau Fischer repeats it slowly for the class.", contextSentence: "Malayalam ist meine Muttersprache." },
          { vocabId: "vocab2-4-3", encounterMoment: "The mock examiner checks: 'Sprechen Sie Englisch?' You answer with the safest phrase.", contextSentence: "Sprechen Sie Englisch?" },
          { vocabId: "vocab2-4-7", encounterMoment: "When they ask about your German progress, you stay humble: 'Ich spreche nur ein bisschen Deutsch.'", contextSentence: "Ich spreche ein bisschen Deutsch." },
          { vocabId: "vocab2-4-8", encounterMoment: "Frau Fischer labels 'fließend' as a future word. Today, the honest A1 answer is 'ein bisschen'.", contextSentence: "Sie spricht fließend Deutsch." },
        ],
        decisionPoints: [
          {
            moment: "Sophie asks: 'Welche Sprachen sprichst du?' How do you answer while including your 'mother tongue'?",
            options: [
              { text: "Malayalam ist meine Muttersprache. Ich spreche auch Englisch.", isCorrect: true, response: "Sophie's eyes widen: 'Wow, Malayalam! Das klingt cool.' She's never heard of it but loves the name.", peerReaction: "Adipoli machane! 'Muttersprache' (Mother tongue) ennu parayumpo oru mass undu! Always mention Malayalam first — it's our identity! 🇮🇳" },
              { text: "Ich spreche Malayalam und Englisch.", isCorrect: true, response: "Simple and correct. Sophie nods: 'Zwei Sprachen? Toll!'", peerReaction: "Short and sweet! 'Ich spreche' is the core phrase. Good job machane! 👍" },
              { text: "Ich bin Malayalam.", isCorrect: false, response: "Sophie looks confused: 'Du BIST eine Sprache? Wie geht das?' You said 'I AM Malayalam', machane!", peerReaction: "Aiyyo! Language-ne 'Ich bin' ennu parayalle! 'Ich spreche' (I speak) ennu parayeda! Nee manushyan alle, bhasha allalo? 😂" },
            ],
          },
          {
            moment: "You want to ask Sophie if she speaks English too. What's the correct conjugation for 'du'?",
            options: [
              { text: "Sprichst du Englisch?", isCorrect: true, response: "Perfect stem change! 'Sprichst du' (e to i). Sophie answers: 'Ja, natürlich!'", peerReaction: "Mass machane! Vowel change (e to i) accurately catch cheythu! 'Sprichst du' is 10/10 German! 🔥" },
              { text: "Sprechst du Englisch?", isCorrect: false, response: "Sophie understands, but 'sprechst' sounds a bit off. It should be 'sprichst'!", peerReaction: "Vite machane! 'sprechen' changes vowel for 'du'. It's 'sprichst'. Ithu oru bit tricky aanu, but practice cheythaal set aakum! 💪" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v2-4-1",
          title: "Ich spreche Malayalam und Englisch!",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-4-1.mp4"
          description: "Learn to talk about languages you speak — and how well you speak them. Malayali language flexing starts here!",
          scriptOutline: [
            "Opening: 'Malayalis are language superstars — most of us speak 3-4 languages! Germans will be impressed, trust me!'",
            "Key phrase: 'Ich spreche [language]' — I speak [language]",
            "Languages in German — learn these names:",
            "  Deutsch — German",
            "  Englisch — English",
            "  Malayalam — Malayalam (same word! Even Germans can't mess this up... well, maybe)",
            "  Hindi — Hindi",
            "  Tamil — Tamil",
            "  Französisch — French",
            "  Spanisch — Spanish",
            "  Arabisch — Arabic (Gulf Malayalis, this is for you!)",
            "  Japanisch — Japanese",
            "  Chinesisch — Chinese",
            "Conjugation of 'sprechen' (to speak) — CAREFUL, it's a vowel-changer!",
            "  ich spreche — I speak",
            "  du sprichst — you speak (e → i change!)",
            "  er/sie/es spricht — he/she/it speaks (e → i change!)",
            "  wir sprechen — we speak",
            "  ihr sprecht — you all speak",
            "  sie/Sie sprechen — they/you (formal) speak",
            "Note: The vowel change e → i happens ONLY in du and er/sie/es forms!",
            "How well do you speak? Proficiency levels:",
            "  ein bisschen — a little (just started, machaa!)",
            "  gut — well (getting there!)",
            "  sehr gut — very well (adipoli level!)",
            "  fließend — fluently (like a native, almost!)",
            "  Muttersprache — mother tongue (nammude swantham Malayalam!)",
            "Full example: 'Malayalam ist meine Muttersprache. Ich spreche auch Englisch und Hindi gut, und ein bisschen Deutsch.'",
            "Asking others: 'Welche Sprachen sprichst du?' — What languages do you speak?",
            "Kerala flex moment: 'Ich spreche Malayalam, Englisch, Hindi und lerne Deutsch!'",
            "Manglish motivation: 'Germans will be shook when you say you speak 4 languages — athinu ivide RESPECT undu!'"
          ],
          keyVocabulary: ["sprechen", "die Sprache", "fließend", "ein bisschen", "Muttersprache", "Welche Sprachen"],
          learningObjectives: [
            "Name 10+ languages in German",
            "Conjugate 'sprechen' correctly (including vowel change)",
            "Describe your language ability at different levels",
            "Talk about being multilingual with confidence"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Conjugation of 'sprechen' (to speak)",
              headers: ["Person", "Form", "Note"],
              rows: [
                ["ich", "spreche", "Regular"],
                ["du", "sprichst", "e -> i change!"],
                ["er/sie/es", "spricht", "e -> i change!"],
                ["wir", "sprechen", "Regular"],
                ["ihr", "sprecht", "Regular"],
                ["sie/Sie", "sprechen", "Regular"]
              ]
            },
            {
              type: "table",
              title: "Proficiency Levels",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["ein bisschen", "a little", "കുറച്ച്"],
                ["gut", "well", "നന്നായി"],
                ["sehr gut", "very well", "വളരെ നന്നായി"],
                ["fließend", "fluently", "ഒഴുക്കോടെ"],
                ["Muttersprache", "mother tongue", "മാതൃഭാഷ"]
              ]
            },
            {
              type: "note",
              title: "Malayali Language Flex",
              variant: "tip",
              content: "Most Malayalis speak 3-4 languages (Malayalam, English, Hindi + maybe Tamil/Kannada). Germans are impressed by multilingual people! Say: 'Ich spreche Malayalam, Englisch, Hindi und lerne Deutsch!'"
            }
          ]
        },
        {
          id: "v2-4-2",
          title: "Verbs That Change Vowels — Stem-Changing Verbs",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-4-2.mp4"
          description: "sprechen isn't the only tricky verb! Learn the pattern of stem-changing verbs so you're ready for more.",
          scriptOutline: [
            "Opening: 'Remember how sprechen changes to sprichst? There are MORE verbs like this — but don't worry, there's a pattern!'",
            "What are stem-changing verbs? Verbs where the vowel changes in du and er/sie/es forms",
            "Pattern 1: e → i (like sprechen)",
            "  sprechen → du sprichst, er spricht",
            "  geben (to give) → du gibst, er gibt",
            "  helfen (to help) → du hilfst, er hilft",
            "Pattern 2: e → ie (longer vowel)",
            "  lesen (to read) → du liest, er liest",
            "  sehen (to see) → du siehst, er sieht",
            "Pattern 3: a → ä (umlaut!)",
            "  fahren (to drive) → du fährst, er fährt",
            "  schlafen (to sleep) → du schläfst, er schläft",
            "The GOOD news: Only du and er/sie/es forms change! ich, wir, ihr, sie stay normal.",
            "Memory hack: Think of it like Malayalam verb forms — different endings for different subjects",
            "Why this matters: You'll sound much more natural when you get these right",
            "Manglish tip: 'Ivide pattern arinjaal, pinne easyaanu — just du and er/sie/es forms mathram change aavum!'",
            "Quick practice: 'Du sprichst gut Deutsch!' 'Er liest ein Buch.' 'Sie fährt nach Berlin.'"
          ],
          keyVocabulary: ["sprechen", "geben", "helfen", "lesen", "sehen", "fahren"],
          learningObjectives: [
            "Understand what stem-changing verbs are",
            "Recognize the three vowel-change patterns (e→i, e→ie, a→ä)",
            "Know that only du and er/sie/es forms change",
            "Conjugate a few common stem-changing verbs"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Stem-Changing Verb Patterns",
              headers: ["Pattern", "Infinitive", "du", "er/sie/es"],
              rows: [
                ["e -> i", "sprechen", "sprichst", "spricht"],
                ["e -> i", "geben", "gibst", "gibt"],
                ["e -> i", "helfen", "hilfst", "hilft"],
                ["e -> ie", "lesen", "liest", "liest"],
                ["e -> ie", "sehen", "siehst", "sieht"],
                ["a -> ä", "fahren", "fährst", "fährt"],
                ["a -> ä", "schlafen", "schläfst", "schläft"]
              ]
            },
            {
              type: "note",
              title: "Only 'du' and 'er/sie/es' Change!",
              variant: "info",
              content: "The vowel change only affects 'du' and 'er/sie/es' forms. The ich, wir, ihr, and sie/Sie forms stay completely regular. So you only need to watch out for 2 out of 6 forms!"
            },
            {
              type: "note",
              title: "How to Spot Them",
              variant: "tip",
              content: "There is no shortcut — you must learn which verbs change. But the good news: the pattern (e->i, e->ie, a->ä) is always consistent within each verb. Dictionaries mark them!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex2-4-1",
          type: "fill-blank",
          question: "Complete: Du _____ sehr gut Deutsch! (You speak very good German!)",
          options: ["sprichst", "spreche", "spricht", "sprechen"],
          correctAnswer: "sprichst",
          explanation: "Stem-changing verbs: the vowel changes for du and er/sie/es ONLY. sprechen: ich spreche, du sprichst (e→i), er spricht. Wir/ihr/sie stay normal!",
          xpReward: 10
        },
        {
          id: "ex2-4-2",
          type: "multiple-choice",
          question: "How do you say 'Malayalam is my mother tongue' in German?",
          options: ["Malayalam ist meine Muttersprache.", "Malayalam ist mein Muttersprache.", "Ich habe Malayalam Muttersprache.", "Meine Sprache ist Malayalam Mutter."],
          correctAnswer: "Malayalam ist meine Muttersprache.",
          explanation: "'Muttersprache' = mother tongue (die Muttersprache, feminine). Memory trick: Mutter (mother) + Sprache (language). With feminine nouns, use 'meine' not 'mein'.",
          xpReward: 10
        },
        {
          id: "ex2-4-3",
          type: "matching",
          question: "Match the language to its German name:",
          options: ["French", "Spanish", "English", "Arabic"],
          correctAnswer: ["Französisch", "Spanisch", "Englisch", "Arabisch"],
          explanation: "Language names in German often end in '-isch'. French = Französisch, Spanish = Spanisch.",
          xpReward: 15
        },
        {
          id: "ex2-4-4",
          type: "ordering",
          question: "Order from LEAST to MOST fluent:",
          options: ["fließend", "gut", "Muttersprache", "ein bisschen"],
          correctAnswer: ["ein bisschen", "gut", "fließend", "Muttersprache"],
          explanation: "The hierarchy of proficiency: 'ein bisschen' (a little) < 'gut' (well) < 'fließend' (fluent) < 'Muttersprache' (mother tongue/native).",
          xpReward: 20
        },
        {
          id: "ex2-4-5",
          type: "multiple-choice",
          question: "What is the correct conjugation: 'Er _____ drei Sprachen.'?",
          options: ["spricht", "spreche", "sprichst", "sprechen"],
          correctAnswer: "spricht",
          explanation: "Both du and er/sie/es get the vowel change: du sprichst, er spricht. Memory trick: the 'short' subjects (du, er) get the changed vowel. The 'longer' subjects (wir, sie) keep the original.",
          xpReward: 10
        },
        {
          id: "ex2-4-6",
          type: "fill-blank",
          question: "Complete: Wir _____ zu Hause Malayalam. (We speak Malayalam at home.)",
          options: ["sprechen", "spreche", "sprichst", "spricht"],
          correctAnswer: "sprechen",
          explanation: "Key rule: the stem change e→i happens ONLY with du and er/sie/es. Plural forms (wir, ihr, sie) keep the normal stem: wir sprechen, ihr sprecht, sie sprechen. Don't over-apply the rule!",
          xpReward: 10
        },
        {
          id: "ex2-4-7",
          type: "fill-blank",
          question: "Complete: Er _____ gern Bücher. (He reads books.)",
          options: ["liest", "lest", "lesen", "lese"],
          correctAnswer: "liest",
          explanation: "'Lesen' changes stem for er/sie/es: 'liest' (not 'lest'). This e→ie change is common in German verbs.",
          xpReward: 10
        },
        {
          id: "ex2-4-8",
          type: "multiple-choice",
          question: "'Du fährst nach Berlin.' What does 'fährst' mean?",
          options: ["You drive/travel", "You fly", "You walk", "You run"],
          correctAnswer: "You drive/travel",
          explanation: "'Fahren' = to drive/travel. With 'du' it changes to 'fährst' (a→ä). 'Fährst du nach Berlin?'",
          xpReward: 15
        },
        {
          id: "ex2-4-9",
          type: "free-text",
          question: "A new German colleague asks which languages you speak. Reply in German — Malayalam, English, and a little German.",
          correctAnswer: [
            "Ich spreche Malayalam, Englisch und ein bisschen Deutsch",
            "Ich spreche Malayalam, Englisch, und ein bisschen Deutsch",
            "Ich spreche Malayalam und Englisch und ein bisschen Deutsch",
            "Ich spreche Malayalam, Englisch und etwas Deutsch",
            "Malayalam, Englisch und ein bisschen Deutsch"
          ],
          explanation: "'Ich spreche' + languages joined with 'und'. 'Ein bisschen' = a little — the honest A1 phrase.",
          xpReward: 35
        },
        {
          id: "ex2-4-10",
          type: "dictation",
          question: "Listen and type: Ich spreche Englisch.",
          correctAnswer: "Ich spreche Englisch",
          explanation: "Don't forget to capitalize 'Englisch'. Languages are always capitalized in German!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-englisch.mp3"
        }
      ,
        {
          id: "ex2-4-prod-speaking",
          type: "speaking",
          question: "Meera practice: Say aloud for this lesson (Languages I Speak): 'Ich heiße Meera und komme aus Kerala.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Meera und komme aus Kerala.'",
          correctAnswer: "Ich heiße Meera und komme aus Kerala",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex2-4-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab2-4-1", german: "die Sprache", english: "language", malayalam: "ഭാഷ", pronunciation: "dee shprah-khe", example: "Deutsch ist eine schöne Sprache.", exampleTranslation: "German is a beautiful language." },
        { id: "vocab2-4-2", german: "sprechen", english: "to speak", malayalam: "സംസാരിക്കുക", pronunciation: "shpreh-khen", example: "Ich spreche drei Sprachen.", exampleTranslation: "I speak three languages." },
        { id: "vocab2-4-3", german: "Englisch", english: "English", malayalam: "ഇംഗ്ലീഷ്", pronunciation: "eng-lish", example: "Sprechen Sie Englisch?", exampleTranslation: "Do you speak English?" },
        { id: "vocab2-4-4", german: "Hindi", english: "Hindi", malayalam: "ഹിന്ദി", pronunciation: "hin-dee", example: "Ich spreche ein bisschen Hindi.", exampleTranslation: "I speak a little Hindi." },
        { id: "vocab2-4-5", german: "Französisch", english: "French", malayalam: "ഫ്രഞ്ച്", pronunciation: "fran-tsur-zish", example: "Französisch ist romantisch.", exampleTranslation: "French is romantic." },
        { id: "vocab2-4-6", german: "Arabisch", english: "Arabic", malayalam: "അറബി", pronunciation: "ah-rah-bish", example: "Viele Malayalis sprechen Arabisch.", exampleTranslation: "Many Malayalis speak Arabic." },
        { id: "vocab2-4-7", german: "ein bisschen", english: "a little", malayalam: "കുറച്ച്", pronunciation: "ayn bis-khen", example: "Ich spreche ein bisschen Deutsch.", exampleTranslation: "I speak a little German." },
        { id: "vocab2-4-8", german: "fließend", english: "fluently", malayalam: "ഒഴുക്കോടെ", pronunciation: "flee-sent", example: "Sie spricht fließend Deutsch.", exampleTranslation: "She speaks fluent German." },
        { id: "vocab2-4-9", german: "die Muttersprache", english: "mother tongue", malayalam: "മാതൃഭാഷ", pronunciation: "dee moo-ter-shprah-khe", example: "Malayalam ist meine Muttersprache.", exampleTranslation: "Malayalam is my mother tongue." },
        { id: "vocab2-4-10", german: "Welche Sprachen sprichst du?", english: "What languages do you speak?", malayalam: "നീ ഏതൊക്കെ ഭാഷകൾ സംസാരിക്കും?", pronunciation: "vel-khe shprah-khen shprikhst doo", example: "Welche Sprachen sprichst du? — Ich spreche Malayalam und Deutsch.", exampleTranslation: "What languages do you speak? — I speak Malayalam and German." }
      ]
    },

    // ──────────────────────────────────────────────
    // LESSON 2-5: My First Full Conversation
    // ──────────────────────────────────────────────
    {
      id: "2-5",
      title: "My First Full Conversation",
      titleGerman: "Mein erstes vollständiges Gespräch",
      description: "Put everything together — introduce yourself fully with name, origin, profession, and languages! Three real-life scenarios await you. Adipoli moment incoming!",
      duration: "60 min",
      xpReward: 200,
      storyScene: {
        learnerOwner: 'nivin',
        setting: {
          name: "Goethe-Institut Kochi — Mock Consulate, Full Self-Intro",
          sceneType: "office",
          timeOfDay: "morning",
          description: "Goethe Kochi. Month 2 of your A1 course. Herr Dr. Bauer is back — this time for a longer mock consulate interview. Today you must combine everything: name, origin, profession, languages. A folder on the desk holds your practice documents. The real visa appointment is in a few months. This is a full dress rehearsal.",
        },
        narrative: {
          previousRecap: "You've practiced name, origin, job, and languages in partner exercises. Now — combine them all in a real mock consulate interview.",
          currentObjective: "Deliver a complete self-introduction under consulate-level pressure",
          nextTeaser: "Module 2 complete. Next: numbers — prices at the Kerala supermarket, phone numbers, ages, dates. Numbers in German are backwards. Ready?",
        },
        peerIntro: [
          "Machaane! Ithu njan paranja 'Boss Battle' aanu — Goethe Kochi-il mock consulate interview, Month 2.",
          "Herr Dr. Bauer vannirikkunnu again — Hauptstelle-nte examiner. Official aanu, but ithu practice aanu. Real-ul consulate-il poyaal confident aayi varum.",
          "Name, Origin, Profession, Language — naalu components flow-aayi parayaam. Full Sie. Deep breath. Pokaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab2-5-1", encounterMoment: "Dr. Bauer opens a folder. 'Guten Tag, Herr Kumar. Stellen Sie sich bitte vor.' He wants the full self-introduction.", contextSentence: "Stellen Sie sich vor!" },
          { vocabId: "vocab2-5-3", encounterMoment: "You start the editable formula: 'Ich heiße … Ich komme aus … Ich bin von Beruf …' The examiner scribbles notes.", contextSentence: "Ich heiße … und komme aus …" },
          { vocabId: "vocab2-5-5", encounterMoment: "He asks about your German level. 'Ich lerne noch,' you answer modestly. Honest + effort-showing — always works.", contextSentence: "Ich lerne noch Deutsch." },
          { vocabId: "vocab2-1-5", encounterMoment: "He nods slowly. 'Ihre Aussprache ist gut. Freut mich, Sie kennenzulernen.' You reply carefully: 'Freut mich auch!'", contextSentence: "Freut mich!" },
          { vocabId: "vocab2-1-6", encounterMoment: "He says: 'Einen schönen Tag noch, Herr Kumar.' You respond: 'Gleichfalls, Herr Dr. Bauer.' The perfect formal exit.", contextSentence: "Einen schönen Tag noch! — Gleichfalls!" },
        ],
        decisionPoints: [
          {
            moment: "Dr. Bauer asks: 'Was wollen Sie in Deutschland machen?' You plan to study — what's the cleanest A1 answer?",
            options: [
              { text: "Ich bin Student. Ich möchte in München Informatik studieren.", isCorrect: true, response: "Dr. Bauer looks up: 'Informatik in München? Sehr gut. Welche Universität?' Real follow-up question — which means your answer landed.", peerReaction: "Adipoli machaane! Student + clear city + subject = officer engaged! Follow-up question vannu — athaanu correct answer-inte sign! 🎓" },
              { text: "Ich will nach Deutschland.", isCorrect: false, response: "Dr. Bauer frowns slightly: 'Ja, aber warum? Was machen Sie dort?' Vague answer → he has to dig. Not a pass-level response.", peerReaction: "Aiyyo! 'Will nach Deutschland' madiyilla — reason parayaan venam. Student aano? Arbeit aano? Specific aakku! 😅" },
            ],
          },
          {
            moment: "Dr. Bauer closes his folder. 'Danke, Herr Kumar. Das war gut.' How do you leave the mock interview?",
            options: [
              { text: "Vielen Dank, Herr Dr. Bauer. Auf Wiedersehen!", isCorrect: true, response: "He stands and extends a hand. 'Auf Wiedersehen. Viel Erfolg für Ihre richtige Prüfung.' Outside, Frau Fischer mouths 'gut gemacht'. You've passed the dress rehearsal.", peerReaction: "YOU DID IT machaane! Full introduction + formal exit = real consulate-ready. Ithanu cleaner — next step real interview! 🇩🇪" },
              { text: "Thanks, tschüss!", isCorrect: false, response: "Dr. Bauer's eyebrow lifts. 'In einem Konsulatsinterview — Auf Wiedersehen, bitte.' Gentle but clear: Tschüss is not for this setting.", peerReaction: "Excitement koodi Tschüss paranju! Office-il Auf Wiedersehen aanu. Level up cheyyaam — you got the content right! 😂" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v2-5-1",
          title: "Your Complete Self-Introduction in German",
          duration: "12:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-5-1.mp4"
          description: "Practice a full self-introduction in one Goethe Kochi mock exam, with future airport/university/office scenarios kept as later imagination.",
          scriptOutline: [
            "Opening: 'Adipoli! Time to put it ALL together — name, origin, job, languages! Full introduction, German style!'",
            "The Complete Self-Introduction Template — your golden formula:",
            "  1. Greeting: 'Guten Tag!' / 'Hallo!'",
            "  2. Name: 'Ich heiße [Name].' / 'Mein Name ist [Name].'",
            "  3. Origin: 'Ich komme aus Kerala in Indien.'",
            "  4. Profession: 'Ich bin [profession].'",
            "  5. Languages: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.'",
            "  6. Closing: 'Freut mich!'",
            "Scenario — Goethe Kochi speaking mock (FORMAL — use Sie):",
            "  Examiner: 'Guten Tag. Wie heißen Sie?'",
            "  You: 'Guten Tag. Ich heiße Priya Nair.'",
            "  Examiner: 'Woher kommen Sie?'",
            "  You: 'Ich komme aus Kerala in Indien.'",
            "  Examiner: 'Was sind Sie von Beruf?'",
            "  You: 'Ich bin Studentin.'",
            "  Examiner: 'Sprechen Sie Deutsch?'",
            "  You: 'Ein bisschen. Ich lerne noch.'",
            "Practice variants: use your real name, your Kerala city, your job, and your languages.",
            "Future-use rehearsal: the same intro later helps at airports, universities, and offices — but today the scene stays in Kerala.",
            "Key phrase: 'Stellen Sie sich vor' = 'Introduce yourself' — you'll hear this a lot!",
            "Practice tips: Record yourself giving all three introductions, practice in front of mirror",
            "Manglish motivation: 'You just learned to introduce yourself in GERMAN — sho! That's a massive achievement!'"
          ],
          keyVocabulary: ["sich vorstellen", "Stellen Sie sich vor", "Willkommen", "Ich lerne noch", "Gleichfalls"],
          learningObjectives: [
            "Deliver a complete self-introduction in German",
            "Adapt formality based on the situation (Sie vs du)",
            "Confidently answer common introductory questions",
            "Handle a Goethe-style self-introduction first, then transfer it to future real-life settings"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Self-Introduction Template",
              headers: ["Step", "German", "English"],
              rows: [
                ["1. Greeting", "Guten Tag! / Hallo!", "Hello!"],
                ["2. Name", "Ich heiße [Name].", "I am called [Name]."],
                ["3. Origin", "Ich komme aus Kerala in Indien.", "I come from Kerala in India."],
                ["4. Job", "Ich bin [Beruf].", "I am a [profession]."],
                ["5. Languages", "Ich spreche Malayalam und Englisch.", "I speak Malayalam and English."],
                ["6. Closing", "Freut mich!", "Nice to meet you!"]
              ]
            },
            {
              type: "table",
              title: "Formal (Sie) vs Informal (du)",
              headers: ["Situation", "Use", "Example"],
              rows: [
                ["Goethe / Office", "Sie", "Wie heißen Sie?"],
                ["Classmate / Friend", "du", "Wie heißt du?"],
                ["Mixed (Boss + Colleagues)", "Start Sie, switch to du if invited", "Wir können uns duzen!"]
              ]
            },
            {
              type: "note",
              title: "'Stellen Sie sich vor!'",
              variant: "info",
              content: "This phrase means 'Introduce yourself!' — you will hear it at job interviews, university orientations, and German courses. Have your 6-step intro ready to go!"
            }
          ]
        },
        {
          id: "v2-5-2",
          title: "Common Follow-Up Questions and Answers",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v2-5-2.mp4"
          description: "After the intro, people ask more questions! Learn the most common follow-ups so you're never caught off-guard.",
          scriptOutline: [
            "Opening: 'Okay, you introduced yourself — adipoli! But people will ask MORE questions. Let's be ready!'",
            "Follow-up question 1: 'Wie alt bist du?' — How old are you?",
            "  Answer: 'Ich bin [number] Jahre alt.' — I am [number] years old.",
            "  Example: 'Ich bin vierundzwanzig Jahre alt.' — I am 24 years old.",
            "Follow-up question 2: 'Wo wohnst du?' — Where do you live?",
            "  Answer: 'Ich wohne in [city].' — I live in [city].",
            "  Example: 'Ich wohne in München.' — I live in Munich.",
            "Follow-up question 3: 'Bist du verheiratet?' — Are you married?",
            "  Answer: 'Nein, ich bin ledig.' / 'Ja, ich bin verheiratet.'",
            "  (Germans ask this casually — don't be surprised!)",
            "Follow-up question 4: 'Hast du Geschwister?' — Do you have siblings?",
            "  Answer: 'Ja, ich habe einen Bruder/eine Schwester.' — Yes, I have a brother/sister.",
            "Follow-up question 5: 'Wie lange bist du schon in Deutschland?' — How long have you been in Germany?",
            "  Answer: 'Seit [time].' — Since/For [time].",
            "  Example: 'Seit drei Monaten.' — For three months.",
            "Manglish tip: 'Germans love small talk about these topics — prepare cheyy, ready aayi nilkk!'",
            "Practice: Answer all 5 follow-up questions about yourself — write them down!",
            "Pro tip: Keep a small 'cheat card' in your wallet with your intro + follow-up answers for the first few weeks"
          ],
          keyVocabulary: ["Wie alt bist du?", "Wo wohnst du?", "verheiratet", "ledig", "Geschwister"],
          learningObjectives: [
            "Answer common follow-up questions after an introduction",
            "State your age, city, and marital status in German",
            "Talk about siblings",
            "Handle real conversation flow beyond the basic intro"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Common Follow-Up Questions",
              headers: ["Question", "Answer Pattern", "Example"],
              rows: [
                ["Wie alt bist du?", "Ich bin ... Jahre alt.", "Ich bin vierundzwanzig Jahre alt."],
                ["Wo wohnst du?", "Ich wohne in ...", "Ich wohne in München."],
                ["Bist du verheiratet?", "Ja / Nein, ich bin ledig.", "Nein, ich bin ledig."],
                ["Hast du Geschwister?", "Ja, ich habe einen/eine ...", "Ja, ich habe einen Bruder."],
                ["Wie lange bist du in DE?", "Seit ...", "Seit drei Monaten."]
              ]
            },
            {
              type: "vocabulary",
              items: [
                { german: "verheiratet", english: "married", malayalam: "വിവാഹിത(ൻ/ള്‍)", pronunciation: "fer-hy-ra-tet" },
                { german: "ledig", english: "single", malayalam: "അവിവാഹിത(ൻ/ള്‍)", pronunciation: "lay-dig" },
                { german: "die Geschwister", english: "siblings", malayalam: "സഹോദരങ്ങൾ", pronunciation: "ge-shvis-ter" }
              ]
            },
            {
              type: "note",
              title: "Germans Ask Personal Questions!",
              variant: "tip",
              content: "Don't be surprised if new acquaintances ask about your age, marital status, or siblings. It is considered normal small talk in Germany, not rude. Keep your answers ready!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex2-5-1",
          type: "ordering",
          question: "Put this self-introduction in the correct logical order:",
          options: [
            "Ich spreche Malayalam, Englisch und ein bisschen Deutsch.",
            "Guten Tag! Ich heiße Meera.",
            "Ich bin Ingenieurin.",
            "Ich komme aus Kochi in Indien.",
            "Freut mich!"
          ],
          correctAnswer: [
            "Guten Tag! Ich heiße Meera.",
            "Ich komme aus Kochi in Indien.",
            "Ich bin Ingenieurin.",
            "Ich spreche Malayalam, Englisch und ein bisschen Deutsch.",
            "Freut mich!"
          ],
          explanation: "A natural introduction flow: Greeting & Name → Origin → Profession → Languages → Closing. This is the standard A1 exam format.",
          xpReward: 20
        },
        {
          id: "ex2-5-2",
          type: "multiple-choice",
          question: "At the immigration counter, the officer asks 'Was machen Sie in Deutschland?' You're a student at TU München. Which reply fits best?",
          options: [
            "Ich studiere an der TU München.",
            "Ich komme aus Indien.",
            "Ich heiße Nivin.",
            "Ich spreche Deutsch."
          ],
          correctAnswer: "Ich studiere an der TU München.",
          explanation: "'Was machen Sie in Deutschland?' asks about the purpose of your stay, not your name or origin. 'Ich studiere an der TU München' (I study at TU Munich) directly answers it.",
          xpReward: 15
        },
        {
          id: "ex2-5-3",
          type: "fill-blank",
          question: "Complete: Ich _____ Programmiererin bei Siemens. (I am a programmer at Siemens.)",
          options: ["bin", "bist", "ist", "habe"],
          correctAnswer: "bin",
          explanation: "'Ich bin' — I am. Remember: no article before professions in German!",
          xpReward: 10
        },
        {
          id: "ex2-5-4",
          type: "multiple-choice",
          question: "You're at university orientation. A fellow student says 'Woher kommst du?' How do you reply?",
          options: ["Ich komme aus Kerala in Indien.", "Ich heiße Kerala.", "Kerala ist schön.", "Ich bin aus Deutsch."],
          correctAnswer: "Ich komme aus Kerala in Indien.",
          explanation: "'Ich komme aus [place]' is the correct pattern for stating your origin.",
          xpReward: 10
        },
        {
          id: "ex2-5-5",
          type: "matching",
          question: "Match the question to the correct answer:",
          options: ["Wie heißen Sie?", "Woher kommen Sie?", "Was sind Sie von Beruf?", "Sprechen Sie Deutsch?"],
          correctAnswer: ["Ich heiße Arun.", "Ich komme aus Indien.", "Ich bin Ingenieur.", "Ja, ein bisschen."],
          explanation: "Connecting the core personal information questions with their appropriate answers is vital for identity statements.",
          xpReward: 15
        },
        {
          id: "ex2-5-6",
          type: "multiple-choice",
          question: "Which situation requires Sie (formal) instead of Du?",
          options: ["Speaking to an immigration officer", "Chatting with a fellow student at orientation", "Talking to your roommate", "Messaging a friend online"],
          correctAnswer: "Speaking to an immigration officer",
          explanation: "Immigration officers, police, and government officials always require Sie (formal address).",
          xpReward: 10
        },
        {
          id: "ex2-5-7",
          type: "fill-blank",
          question: "Complete: Ich bin vierundzwanzig Jahre _____. (I am 24 years old.)",
          options: ["alt", "jung", "groß", "gut"],
          correctAnswer: "alt",
          explanation: "'Ich bin [number] Jahre alt' is the fixed pattern for stating your age. 'Alt' literally means 'old' but in this phrase it just means 'of age'.",
          xpReward: 10
        },
        {
          id: "ex2-5-8",
          type: "ordering",
          question: "Put this conversation at university in the correct order:",
          options: [
            "Aus Kerala in Südindien. Und du?",
            "Informatik. Und du?",
            "Aus Hamburg. Was studierst du?",
            "Hi! Wie heißt du? — Ich heiße Arun. Woher kommst du?"
          ],
          correctAnswer: [
            "Hi! Wie heißt du? — Ich heiße Arun. Woher kommst du?",
            "Aus Kerala in Südindien. Und du?",
            "Aus Hamburg. Was studierst du?",
            "Informatik. Und du?"
          ],
          explanation: "In casual settings, small talk flows through question-answer pairs with 'Und du?' (And you?) as the connective tissue.",
          xpReward: 20
        },
        {
          id: "ex2-5-9",
          type: "fill-blank",
          question: "Type in German: 'I come from India.' (Ich...)",
          options: ["Ich komme aus Indien", "Ich bin aus Indien", "Ich komme von Indien", "Ich gehe aus Indien"],
          correctAnswer: "Ich komme aus Indien",
          explanation: "'Ich komme aus...' is the correct pattern for stating where you are from. Always use 'aus', not 'von'!",
          xpReward: 15
        },
        {
          id: "ex2-5-10",
          type: "free-text",
          question: "Say in German: 'I speak a little German.'",
          correctAnswer: [
            "Ich spreche ein bisschen Deutsch",
            "Ich spreche ein wenig Deutsch",
            "Ich spreche etwas Deutsch",
            "Ich spreche nur ein bisschen Deutsch",
            "Ich spreche ein bisschen Deutsch."
          ],
          explanation: "'Ein bisschen', 'ein wenig', and 'etwas' all mean 'a little'. Any of them works — 'ein bisschen' is most common in spoken German.",
          xpReward: 15
        },
        {
          id: "ex2-5-11",
          type: "dictation",
          question: "Listen and type: Mein Name ist Meera.",
          correctAnswer: "Mein Name ist Meera",
          explanation: "Formal self-introduction using 'Mein Name ist...'. Excellent!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-meera.mp3"
        },
        {
          id: "ex2-5-12",
          type: "free-text",
          question: "How do you ask 'How old are you?' informally in German?",
          correctAnswer: ["Wie alt bist du?", "Wie alt bist du"],
          explanation: "'Wie alt bist du?' (informal) or 'Wie alt sind Sie?' (formal). Always pair 'bist' with 'du', 'sind' with 'Sie'.",
          xpReward: 25
        }
      ,
        {
          id: "ex2-5-prod-speaking",
          type: "speaking",
          question: "Nivin practice: Say aloud for this lesson (My First Full Conversation): 'Ich heiße Nivin und komme aus Kerala.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Nivin und komme aus Kerala.'",
          correctAnswer: "Ich heiße Nivin und komme aus Kerala",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex2-5-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab2-5-1", german: "sich vorstellen", english: "to introduce oneself", malayalam: "സ്വയം പരിചയപ്പെടുത്തുക", pronunciation: "zikh for-shtell-en", example: "Darf ich mich vorstellen?", exampleTranslation: "May I introduce myself?" },
        { id: "vocab2-5-2", german: "Stellen Sie sich vor!", english: "Introduce yourself! (formal)", malayalam: "സ്വയം പരിചയപ്പെടുത്തൂ!", pronunciation: "shtel-len zee zikh for", example: "Bitte stellen Sie sich kurz vor.", exampleTranslation: "Please introduce yourself briefly." },
        { id: "vocab2-5-3", german: "die Heimat", english: "homeland", malayalam: "നാട്", pronunciation: "dee hy-maht", example: "Kerala ist meine Heimat.", exampleTranslation: "Kerala is my homeland." },
        { id: "vocab2-5-4", german: "studieren", english: "to study (at university)", malayalam: "പഠിക്കുക (സർവ്വകലാശാലയിൽ)", pronunciation: "shtoo-dee-ren", example: "Ich studiere Informatik in München.", exampleTranslation: "I study computer science in Munich." },
        { id: "vocab2-5-5", german: "arbeiten", english: "to work", malayalam: "ജോലി ചെയ്യുക", pronunciation: "ar-by-ten", example: "Ich arbeite bei Bosch.", exampleTranslation: "I work at Bosch." },
        { id: "vocab2-5-6", german: "Freut mich, Sie kennenzulernen!", english: "Nice to meet you! (formal)", malayalam: "നിങ്ങളെ പരിചയപ്പെട്ടതിൽ സന്തോഷം!", pronunciation: "froyt mikh, zee ken-nen-tsoo-lair-nen", example: "Guten Tag, Herr Schmidt. Freut mich, Sie kennenzulernen!", exampleTranslation: "Good day, Mr. Schmidt. Nice to meet you!" },
        { id: "vocab2-5-7", german: "Wie alt bist du?", english: "How old are you? (informal)", malayalam: "നിനക്ക് എത്ര വയസ്സായി?", pronunciation: "vee alt bist doo", example: "Wie alt bist du? — Ich bin fünfundzwanzig.", exampleTranslation: "How old are you? — I am twenty-five." },
        { id: "vocab2-5-8", german: "Wo wohnst du?", english: "Where do you live? (informal)", malayalam: "നീ എവിടെയാ താമസിക്കുന്നത്?", pronunciation: "vo vohnst doo", example: "Wo wohnst du? — Ich wohne in Berlin.", exampleTranslation: "Where do you live? — I live in Berlin." },
        { id: "vocab2-5-9", german: "auch", english: "also / too", malayalam: "കൂടി / ഉം", pronunciation: "owkh", example: "Ich spreche auch ein bisschen Hindi.", exampleTranslation: "I also speak a little Hindi." },
        { id: "vocab2-5-10", german: "Willkommen!", english: "Welcome!", malayalam: "സ്വാഗതം!", pronunciation: "vil-kom-men", example: "Willkommen in Deutschland!", exampleTranslation: "Welcome to Germany!" }
      ]
    }
  ]
};
