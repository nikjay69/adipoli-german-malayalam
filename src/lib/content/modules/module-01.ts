import type { Module } from '../types';

export const MODULE_1: Module = {
  id: 1,
  title: "First Steps - Namaskaram Germany!",
  titleGerman: "Erste Schritte",
  description: "Start your journey here! Learn why Germany is a dream for Malayalis, master the sounds, and survive your first conversations.",
  icon: "🚀",
  color: "#e94560",
  totalHours: 12,
  learningTips: [
    "German sounds are logical - learn the rules once, and you can read anything!",
    "When in doubt about respect, use 'Sie'. It's always safer.",
    "Punctuality is a religion in Germany - if you're on time, you're late! Be 5 mins early."
  ],
  lessons: [
    // ===================== LESSON 1-1 =====================
    {
      id: "1-1",
      title: "Why Learn German?",
      titleGerman: "Warum Deutsch lernen?",
      description: "Start with motivation and practical context, but keep the real goal clear: learners should leave this lesson able to say a few core German words confidently and understand why A1 matters for real Germany pathways.",
      duration: "45 min",
      xpReward: 100,
      storyScene: {
        setting: {
          name: "Kuttan's Home, Thrissur",
          sceneType: "classroom",
          timeOfDay: "evening",
          description: "A warm Kerala evening. Your cousin in Munich just sent a WhatsApp: 'Free university, machane!' Your world is about to change.",
        },
        narrative: {
          currentObjective: "Discover why Germany is the land of opportunity for Malayalis",
          nextTeaser: "Next up: mastering German sounds — your tongue is about to learn new tricks!",
        },
        kuttanIntro: [
          "Machane! Nammude Germany journey thudangaam! Innale vare nee 'Deutsch' ennu kelkkumbol 'Oktoberfest' mathre aalochichirunullu — but ithil pinne valiya scope undu!",
          "Ente cousin Munich-il aanu — free education, fat salary, Alps weekend trip... Nee sherikkum padikkaan ready aano?",
          "Chill aayirikkeda! First step — enthukond German padikkanum, athinu enthokke opportunities undu ennokke nokkaam. Let's go!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-1-1", encounterMoment: "Your cousin texts: 'Bro, start learning Deutsch! Athaan gateway.' The word 'Deutsch' pops up everywhere in German life.", contextSentence: "Ich lerne Deutsch." },
          { vocabId: "vocab1-1-2", encounterMoment: "You open Google Maps and zoom into Deutschland — it's right in the heart of Europe, surrounded by 9 countries!", contextSentence: "Deutschland ist schön." },
          { vocabId: "vocab1-1-3", encounterMoment: "Your cousin sends a voice note: 'Nee lernen thudangu machane! Start learning today!' The word 'lernen' means to learn.", contextSentence: "Wir lernen zusammen." },
          { vocabId: "vocab1-1-4", encounterMoment: "You find a YouTube video titled 'Arbeit in Deutschland' — work opportunities for Indians. The comment section is full of Malayalis!", contextSentence: "Die Arbeit ist interessant." },
          { vocabId: "vocab1-1-5", encounterMoment: "A university website shows: 'Studium — 0 Euro Tuition!' Free studies? This can't be real... but it is!", contextSentence: "Mein Studium dauert vier Jahre." },
          { vocabId: "vocab1-1-6", encounterMoment: "The Goethe-Institut page reads: 'Die deutsche Sprache öffnet Türen.' The German language opens doors. You feel the excitement building.", contextSentence: "Deutsch ist eine schöne Sprache." },
        ],
        decisionPoints: [
          {
            moment: "Your cousin asks on a video call: 'So machane, which Germany pathway are you thinking — Studium, Ausbildung, or IT job?' What catches your eye?",
            options: [
              { text: "Studium — free university education sounds unreal!", isCorrect: true, response: "Your cousin grins: 'Over 400 public universities with zero tuition! You just need to learn German to B2 level.' He shares a link to DAAD.", kuttanReaction: "Adipoli! Free education + world-class degree = best investment ever! Padikkaam machane! 🎓" },
              { text: "Ausbildung — earn while you learn? Sign me up!", isCorrect: true, response: "Your cousin nods excitedly: 'Companies PAY you €800-€1200/month while training you! No degree needed, just B1 German.' He sends you success stories.", kuttanReaction: "Smart choice machane! Ausbildung is Germany's hidden gem — padikkukayum salary vangukayum oru time-il! 💰" },
              { text: "I'll just figure it out when I get there...", isCorrect: false, response: "Your cousin shakes his head: 'Machane, Germany is NOT like that. You need a plan and German language BEFORE you land.' He shares a checklist.", kuttanReaction: "Aiyyo! Germany plan illathe povaan pattilla machane! But don't worry — athinaanu nammude ee course! Let's plan it properly! 📋" },
            ],
          },
          {
            moment: "You sit down to tell your parents about your Germany plan. Amma asks: 'Enthinaa avide pokkunne? Ivide nalla job illayo?' What's your best response?",
            options: [
              { text: "Show the salary comparison — Kochi vs Munich numbers", isCorrect: true, response: "Amma's eyes widen at the salary table. 'Athrem difference aano?!' Even Achan puts down his newspaper to look. Facts win every time!", kuttanReaction: "Numbers don't lie machane! Amma-ye convince cheyyaan data venam — you nailed it! 📊" },
              { text: "Just say 'Trust me, it'll work out'", isCorrect: false, response: "Amma gives you The Look. 'Concrete plan kondu vaa, pinne samsaarikaam.' You need better ammunition!", kuttanReaction: "Paravaala, but Malayali parents-ne convince cheyyaan proper data venam machane! Show them the numbers! 😅" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-1-1",
          title: "Why German? A Malayali's Gateway to Europe",
          duration: "10:00",
          description: "An inspiring introduction to German opportunities for Malayalis. Why learn this language? Because it's your ticket to free education and huge careers!",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-1-1.mp4"
          scriptOutline: [
            "Economy: 4th largest in the world",
            "Free Education: €0 tuition at public universities",
            "Salary: Compare Kochi vs Munich (mind-blown!)",
            "The Kerala Connection: 30,000+ Malayalis already there",
            "First 3 Words: Deutsch, Deutschland, lernen"
          ],
          keyVocabulary: ["Deutsch", "Deutschland", "lernen"],
          learningObjectives: [
            "Understand why German is valuable for career growth",
            "Know about opportunities in Germany for Indians",
            "Speak your first German sentence: 'Ich lerne Deutsch.'"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "note",
              title: "Why Germany?",
              variant: "info",
              content: "Free university education (over 400 public universities), 4th largest economy, and salaries 4-5x higher than in India. Germany literally pays you to learn through 'Ausbildung' (vocational training)!"
            },
            {
              type: "table",
              title: "Salary Comparison (Annual)",
              headers: ["Role", "Kochi", "Munich"],
              rows: [
                ["Software Engineer", "₹6–8 Lakhs", "€60,000 (~₹55L)"],
                ["Nurse", "₹2.5–4 Lakhs", "€35,000 (~₹32L)"],
                ["Student Part-time", "₹50k-1L", "€12,000 (~₹11L)"]
              ]
            },
            {
              type: "vocabulary",
              items: [
                { german: "Deutsch", english: "German", malayalam: "ജർമ്മൻ", pronunciation: "doych" },
                { german: "Deutschland", english: "Germany", malayalam: "ജർമ്മനി", pronunciation: "doych-lant" },
                { german: "lernen", english: "to learn", malayalam: "പഠിക്കുക", pronunciation: "ler-nen" }
              ]
            },
            {
              type: "note",
              title: "Pünktlichkeit (Punctuality)",
              variant: "tip",
              content: "Germans worship time! If a meeting is at 10:00, you arrive at 09:55. 'Indian Stretchable Time' (IST) doesn't work there — punctuality is a sign of respect."
            }
          ]
        },
        {
          id: "v1-1-2",
          title: "Malayalis in Germany: Which Path is Yours?",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-1-2.mp4"
          description: "Nursing, IT, Studies, or Ausbildung? Find out which career pathway fits your background and what level of German you actually need.",
          scriptOutline: [
            "The 4 Main Paths: Nursing, IT, Ausbildung, Studium",
            "Requirements at a glance (Degree + Language)",
            "The Blue Card: Fast-track for technical pros",
            "Ausbildung: The 'earn while you learn' secret",
            "Studium: Free master's and bachelor's degrees"
          ],
          keyVocabulary: ["Krankenpfleger", "Ingenieur", "Ausbildung", "Studium", "Visum"],
          learningObjectives: [
            "Identify your personal career path to Germany",
            "Learn the specific German level required for your goal",
            "Understand the unique 'Ausbildung' system"
          ],
          placeholderThumbnail: "/images/hiwi_student.png",
          richContent: [
            {
              type: "note",
              title: "Career Entry Points",
              variant: "info",
              content: "Germany offers 4 main entry points for Indians: Nursing (massive demand!), IT/Engineering (via Blue Card), Ausbildung (paid vocational training), and University Studium (free tuition)."
            },
            {
              type: "table",
              title: "Requirements at a Glance",
              headers: ["Pathway", "Degree Needed", "German Level"],
              rows: [
                ["Nursing", "BSc/GNM", "B1 / B2"],
                ["IT / Engg", "B.Tech/MCA", "A1 / B1"],
                ["Ausbildung", "10th / 12th", "B1 / B2"],
                ["Studium", "12th / Bachelors", "B2 / C1"]
              ]
            },
            {
              type: "vocabulary",
              items: [
                { german: "Krankenpfleger", english: "Nurse", malayalam: "നഴ്സ്", pronunciation: "krahn-ken-pfley-ger" },
                { german: "Ingenieur", english: "Engineer", malayalam: "എൻജിനീയർ", pronunciation: "in-zhen-yer" },
                { german: "Ausbildung", english: "Vocational Tr.", malayalam: "തൊഴിൽ പഠനം", pronunciation: "ows-bil-doong" }
              ]
            },
            {
              type: "note",
              title: "Ausbildung - The Hidden Gem",
              variant: "tip",
              content: "In an 'Ausbildung', you don't pay fees. Instead, the company pays YOU (€800–€1,200/month) while you learn the trade. It's the most stable way to settle without a university degree!"
            }
          ]
        }
      ],
      exercises: [
        { id: "ex1-1-2", type: "multiple-choice", question: "How do you say 'I need a visa' in German?", questionGerman: "Wie sagt man 'I need a visa'?", options: ["Ich brauche ein Visum", "Ich habe ein Visum", "Ich bin ein Visum", "Ich lerne ein Visum"], correctAnswer: "Ich brauche ein Visum", explanation: "'Brauche' = need. 'Ich brauche ein Visum' is one of the first sentences you'll use in Germany!", xpReward: 10 },
        { id: "ex1-1-3", type: "fill-blank", question: "Ich möchte in München arbeiten. Zuerst lerne ich _____.", questionGerman: "Ergänzen Sie: Zuerst lerne ich _____.", options: ["Deutsch", "Deutschland", "Englisch", "Hindi"], correctAnswer: "Deutsch", explanation: "'Deutsch' means the German language. 'Deutschland' means the country. You live in Deutschland, but you learn Deutsch.", xpReward: 10 },
        { id: "ex1-1-4", type: "fill-blank", question: "Complete: Die _____ ist groß. (The university is big.)", questionGerman: "Ergänzen Sie: Die _____ ist groß.", options: ["Universität", "Studium", "Sprache", "Arbeit"], correctAnswer: "Universität", explanation: "'Universität' is feminine (die Universität). In German, every noun has a gender — articles matter! 'Die Universität ist groß.'", xpReward: 10 },
        { id: "ex1-1-5", type: "matching", question: "Match the German word to its English meaning:", questionGerman: "Verbinden Sie die Wörter:", options: ["Deutsch", "Deutschland", "lernen", "Arbeit"], correctAnswer: ["German (language)", "Germany", "to learn", "work"], xpReward: 15 },
        { id: "ex1-1-7", type: "ordering", question: "Order the steps of your German journey:", questionGerman: "Bringen Sie die Schritte in die richtige Reihenfolge:", options: ["Apply for a visa", "Move to Germany", "Learn A1 German", "Pass the A1 exam"], correctAnswer: ["Learn A1 German", "Pass the A1 exam", "Apply for a visa", "Move to Germany"], xpReward: 20 },
        { id: "ex1-1-8", type: "type-answer", question: "How do you say 'opportunity' in German?", correctAnswer: ["Chance", "Möglichkeit", "Gelegenheit"], explanation: "Three words all work. 'Chance' (French-origin, pronounced 'shahn-se') is the most casual and common. 'Möglichkeit' = possibility. 'Gelegenheit' = occasion/chance.", xpReward: 10 },
        { id: "ex1-1-9", type: "speaking", question: "Say aloud: 'Ich lerne Deutsch.' — your first full German sentence. Take your time; the goal is being understood.", questionGerman: "Sprechen Sie laut: 'Ich lerne Deutsch.'", correctAnswer: "Ich lerne Deutsch", explanation: "This is your first real German sentence — 'I am learning German.' Germans love hearing learners try, even imperfectly. Sprich laut!", audioUrl: "/audio/exercises/ex1-1-9-model.mp3", xpReward: 25 }
      ,
        {
          id: "ex1-1-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-1-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-1-1", german: "Deutsch", english: "German (language)", malayalam: "ജർമ്മൻ (ഭാഷ)", pronunciation: "doych", example: "Ich lerne Deutsch.", exampleTranslation: "I am learning German." },
        { id: "vocab1-1-2", german: "Deutschland", english: "Germany", malayalam: "ജർമ്മനി", pronunciation: "doych-lant (final d sounds like t)", example: "Deutschland ist schön.", exampleTranslation: "Germany is beautiful." },
        { id: "vocab1-1-3", german: "lernen", english: "to learn", malayalam: "പഠിക്കുക", pronunciation: "lair-nen", example: "Wir lernen zusammen.", exampleTranslation: "We learn together." },
        { id: "vocab1-1-4", german: "Arbeit", english: "work", malayalam: "ജോലി", pronunciation: "ar-bite", example: "Die Arbeit ist interessant.", exampleTranslation: "The work is interesting." },
        { id: "vocab1-1-5", german: "Studium", english: "studies / university education", malayalam: "പഠനം", pronunciation: "shtoo-dee-um", example: "Mein Studium dauert vier Jahre.", exampleTranslation: "My studies last four years." },
        { id: "vocab1-1-6", german: "Sprache", english: "language", malayalam: "ഭാഷ", pronunciation: "shprah-khe", example: "Deutsch ist eine schöne Sprache.", exampleTranslation: "German is a beautiful language." },
        { id: "vocab1-1-7", german: "Ausbildung", english: "vocational training", malayalam: "തൊഴിൽ പരിശീലനം", pronunciation: "ows-bil-doong", example: "Eine Ausbildung dauert drei Jahre.", exampleTranslation: "A vocational training lasts three years." },
        { id: "vocab1-1-8", german: "Universität", english: "university", malayalam: "സർവകലാശാല", pronunciation: "oo-ni-ver-zi-tayt", example: "Die Universität ist groß.", exampleTranslation: "The university is big." },
        { id: "vocab1-1-9", german: "Visum", english: "visa", malayalam: "വിസ", pronunciation: "vee-zoom", example: "Ich brauche ein Visum.", exampleTranslation: "I need a visa." },
        { id: "vocab1-1-10", german: "Chance", english: "chance / opportunity (borrowed from French)", malayalam: "അവസരം", pronunciation: "shahn-se (French-style)", example: "Das ist eine gute Chance!", exampleTranslation: "That is a good opportunity!" },
        { id: "vocab1-1-11", german: "warum", english: "why", malayalam: "എന്തുകൊണ്ട്", pronunciation: "vah-room", example: "Warum lernst du Deutsch?", exampleTranslation: "Why are you learning German?" }
      ]
    },

    // ===================== LESSON 1-2 =====================
    {
      id: "1-2",
      title: "German Sounds for Malayalam Speakers",
      titleGerman: "Deutsche Laute für Malayalam-Sprecher",
      description: "Build pronunciation deliberately from day one. This lesson should make Malayalam speakers notice what already transfers well, what needs extra care, and why sound accuracy matters for A1 listening and speaking confidence.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Goethe-Institut, Kochi",
          sceneType: "classroom",
          timeOfDay: "morning",
          description: "Goethe-Institut, Kochi. Frau Weber writes ä, ö, ü on the whiteboard. Twenty nervous students stare. Time to make your mouth do new things.",
        },
        narrative: {
          previousRecap: "You discovered why Germany is a goldmine for Malayalis. Now it's time to actually make German sounds come out of your mouth!",
          currentObjective: "Master German sounds before the journey",
          nextTeaser: "Next: your first real greetings — time to say 'Hallo' like a pro!",
        },
        kuttanIntro: [
          "Machane! Nammude first German class! Goethe-Institut Kochi-il aanu nammal — Frau Weber sherikkum strict aanu, but she's the best!",
          "Board-il nokkeda — aa randu dots ulla letters kaanunundo? Ä, Ö, Ü — ithu Malayalam-il illa, but nammude mouth-inu ithu padikkaan pattum!",
          "Don't worry about perfect accent — goal is 'being understood', not 'sounding like a German movie star'. Let's crack these sounds!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-2-1", encounterMoment: "Frau Weber points at you: 'Sagen Sie: ich.' You try the soft 'ch' sound — it's like a cat hissing! 'Ich bin hier,' she demonstrates.", contextSentence: "Ich bin hier." },
          { vocabId: "vocab1-2-2", encounterMoment: "She writes 'Mädchen' on the board. 'This word has BOTH tricky sounds — the ä AND the ch!' The class groans, but you're determined.", contextSentence: "Das Mädchen spielt." },
          { vocabId: "vocab1-2-3", encounterMoment: "Frau Weber smiles and says: 'Schön! Das ist schön!' She makes the class repeat 'schön' — lips rounded like 'O' but saying 'E'. Mind = blown.", contextSentence: "Das ist schön!" },
          { vocabId: "vocab1-2-4", encounterMoment: "A travel poster on the wall shows München. 'München has the ü sound!' Frau Weber says. 'Round your lips like a straw and say EE.'", contextSentence: "München ist groß." },
          { vocabId: "vocab1-2-5", encounterMoment: "Frau Weber points to the street outside: 'Die Straße — notice the ß! It means a long S sound after a long vowel.' You spot the word on a map of Berlin.", contextSentence: "Die Straße ist lang." },
          { vocabId: "vocab1-2-6", encounterMoment: "During the break, Frau Weber offers you water: 'Möchten Sie Wasser?' You notice she says 'Vasser' not 'Wasser' — German W = English V!", contextSentence: "Das Wasser ist kalt." },
        ],
        decisionPoints: [
          {
            moment: "Frau Weber asks the class to pronounce 'schön'. She's watching you closely. How do you shape your mouth?",
            options: [
              { text: "Round lips like 'O', but try to say 'E' inside", isCorrect: true, response: "Frau Weber claps! 'Sehr gut! Perfekt!' The ö sound comes out naturally. Your classmates look impressed.", kuttanReaction: "Adipoli machane! Ö sound crack cheythu! Round lips + E sound = perfect German ö! Frau Weber-kku ninte pronunciation ishttaayi! 🔥" },
              { text: "Just say 'shown' like in English", isCorrect: false, response: "Frau Weber shakes her head gently: 'Nein, nicht wie Englisch. Die Lippen müssen rund sein!' She demonstrates the lip rounding again.", kuttanReaction: "Aiyyo! English 'shown' allaa machane! Lips round cheyyeda — 'O' pole lips, but 'E' parayan nokkeda! Try again! 💪" },
            ],
          },
          {
            moment: "A classmate writes 'Strasse' in their notebook instead of 'Straße'. Frau Weber asks: 'Who can tell me the difference between ss and ß?' You raise your hand.",
            options: [
              { text: "ß comes after LONG vowels, ss after SHORT vowels", isCorrect: true, response: "Frau Weber beams: 'Ausgezeichnet! Straße has a long A, Wasser has a short A — that's the rule!' She gives you a gold star sticker.", kuttanReaction: "Gold star machane! ß = long vowel, ss = short vowel — ee rule oru thavana padichaal life-il marakkilla! 🌟" },
              { text: "They're the same thing, just different styles", isCorrect: false, response: "Frau Weber explains patiently: 'Nein! ß tells you the vowel before it is LONG. Very important difference!'", kuttanReaction: "Paravaala machane! Ithu common mistake aanu. Remember: ß = long vowel before it, ss = short vowel. Simple rule! 📝" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-2-1",
          title: "German Sounds: No Perfect Accent Needed",
          duration: "11:30",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-2-1.mp4"
          description: "Stop worrying about sounding like a movie star. Learn the key sounds that actually matter for being understood: Umlauts (ä, ö, ü) and 'ch'.",
          scriptOutline: [
            "Goal: Be understood, not perfect native accent",
            "Mouth Tricks: Easy ways to shape 'ö' and 'ü'",
            "The Forward 'ä': Like the 'bed' in English",
            "The Back and Front 'ch': Buch vs ich",
            "Spelling Traps: W, V, Z, and St/Sp"
          ],
          keyVocabulary: ["ä", "ö", "ü", "ch"],
          learningObjectives: [
            "Master the 3 Umlauts using simple mouth tricks",
            "Distinguish between the two 'ch' sounds",
            "Avoid the 4 most common spelling/pronunciation traps"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "note",
              title: "Mouth Position Trick",
              variant: "tip",
              content: "Umlauts are easier than they look! \n- ö: Shape your mouth for 'E', but round your lips like 'O'. \n- ü: Shape your mouth for 'EE', but round your lips like 'U'. \nTry it: schön, München!"
            },
            {
              type: "table",
              title: "The 4 Spelling Traps",
              headers: ["Letter", "Sounds Like", "Example"],
              rows: [
                ["W", "V", "Wasser (Vah-ser)"],
                ["V", "F", "Vater (Fah-ter)"],
                ["Z", "TS", "Zeit (Tsyte)"],
                ["St / Sp", "Sht / Shp", "Straße / Spielen"]
              ]
            },
            {
              type: "note",
              title: "The two 'ch' sounds",
              variant: "info",
              content: "German has 2 sounds for 'ch': \n- Back (ach-Laut): After A, O, U (e.g., Buch, auch). Like clearing your throat! \n- Front (ich-Laut): After E, I, Ä, Ö, Ü (e.g., ich, Milch). Soft like a cat hissing."
            },
            {
              type: "vocabulary",
              items: [
                { german: "schön", english: "beautiful", malayalam: "മനോഹരം", pronunciation: "shurn (lip-O + tongue-E)" },
                { german: "München", english: "Munich", malayalam: "മ്യൂണിക്ക്", pronunciation: "myoon-shen (lips round like a straw, say ee inside)" },
                { german: "Wasser", english: "water", malayalam: "വെള്ളം", pronunciation: "vahs-ser" }
              ]
            }
          ]
        },
        {
          id: "v1-2-2",
          title: "Alphabet & Spelling: The Amt Survival Skill",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-2-2.mp4"
          description: "Learn how to spell your name and say your phone number in German. Essential for every visit to a government office (Amt) or filling out forms.",
          scriptOutline: [
            "The Amt Moment: 'Können Sie Ihren Namen buchstabieren?'",
            "The 7 Trap Letters: J, W, V, Z, Y, R, ß",
            "Spelling Your Name: Common Malayali name examples",
            "Buchstabiertafel: Using 'A wie Anton' for clarity",
            "Phone Numbers: Why Germans read them in pairs"
          ],
          keyVocabulary: ["buchstabieren", "Buchstabe", "A wie Anton", "Telefonnummer"],
          learningObjectives: [
            "Spell your full name confidently in German",
            "Say any phone number using the German pairing system",
            "Master the 7 letters that differ from English names"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "note",
              title: "The 7 Trap Letters",
              variant: "warning",
              content: "These letters sound NOTHING like English. If you use the English names at a German office, the clerk will write the wrong thing! \n- J = 'yot', W = 'vay', V = 'fow', Z = 'tset', Y = 'üpsilon', R = 'err', ß = 'Eszett'."
            },
            {
              type: "table",
              title: "Phone Number Etiquette",
              headers: ["Section", "How to Speak", "Example"],
              rows: [
                ["Prefix (0176)", "Digit by Digit", "null-eins-sieben-sechs"],
                ["The Rest", "In Pairs (34 56)", "vierunddreißig..."]
              ]
            },
            {
              type: "note",
              title: "Clarifying on the Phone",
              variant: "tip",
              content: "Use 'Letter + wie + Name' to be super clear. \n- 'V wie Viktor' (not W) \n- 'J wie Julius' (not G)"
            },
            {
              type: "vocabulary",
              items: [
                { german: "buchstabieren", english: "to spell", malayalam: "അക്ഷരവിന്യാസം", pronunciation: "bookh-shtah-bee-ren" },
                { german: "der Buchstabe", english: "letter", malayalam: "അക്ഷരം", pronunciation: "bookh-shtah-be" },
                { german: "das Visum", english: "visa", malayalam: "വിസ", pronunciation: "vee-zoom" }
              ]
            }
          ]
        }
      ],
      exercises: [
        { id: "ex1-2-1", type: "multiple-choice", question: "How do you say 'beautiful' in German?", questionGerman: "Wie sagt man 'beautiful' auf Deutsch?", options: ["schön", "schon", "schnell", "schlecht"], correctAnswer: "schön", explanation: "'Schön' = beautiful. Don't confuse with 'schon' (already) — the Umlaut changes the meaning!", xpReward: 10 },
        { id: "ex1-2-2", type: "type-answer", question: "How do you say 'street' in German?", correctAnswer: "Straße", explanation: "'Straße' = street. The ß makes a long 'ss' sound after the long 'a' vowel.", xpReward: 10 },
        { id: "ex1-2-3", type: "fill-blank", question: "Complete: Das Mädchen ist _____. (The girl is beautiful.)", questionGerman: "Ergänzen Sie: Das Mädchen ist _____.", options: ["schön", "groß", "schnell", "hier"], correctAnswer: "schön", explanation: "'Schön' = beautiful. 'Das Mädchen ist schön' is a simple sentence using an Umlaut word.", xpReward: 15 },
        { id: "ex1-2-4", type: "fill-blank", question: "Which umlaut turns 'schon' (already) into 'beautiful'?", questionGerman: "Welcher Umlaut macht aus 'schon' das Wort 'schön'?", options: ["ö", "ä", "ü", "ß"], correctAnswer: "ö", explanation: "Two dots flip the meaning: 'schon' (already) → 'schön' (beautiful). Umlauts (ä, ö, ü) aren't decoration — they're different letters.", xpReward: 10 },
        { id: "ex1-2-5", type: "multiple-choice", question: "What does 'Wasser' mean?", questionGerman: "Was bedeutet 'Wasser'?", options: ["Water", "Tea", "Coffee", "Juice"], correctAnswer: "Water", explanation: "'Wasser' = water. Pronounced 'vasser' — German W sounds like English V. Watch for this: 'Ich trinke Wasser' sounds like 'ikh trink-e vasser'.", xpReward: 10 },
        { id: "ex1-2-6", type: "fill-blank", question: "Frustrated Kuttan mutters: 'Aiyyo, keine _____!' (Oh no, no time!)", questionGerman: "Ergänzen Sie: 'Keine _____!' (keine Zeit)", options: ["Zeit", "Zeile", "Ziel", "Zelt"], correctAnswer: "Zeit", explanation: "'Zeit' = time. 'Keine Zeit!' = 'No time!' — you'll say this approximately 400 times in Germany. Pronounced 'tsait'.", xpReward: 15 },
        { id: "ex1-2-7", type: "multiple-choice", question: "Which spelling is correct for 'street'?", questionGerman: "Welche Schreibweise ist richtig für 'street'?", options: ["Straße", "Strasse", "Strase", "Strass"], correctAnswer: "Straße", explanation: "Official spelling: 'Straße' with ß (eszett). 'Strasse' (with ss) is also accepted — Germans use it when ß isn't on the keyboard, and it's the Swiss standard. Never 'Strase' (missing letter) or 'Strass' (means rhinestone).", xpReward: 15 },
        { id: "ex1-2-9", type: "speaking", question: "Say aloud: 'ich' — the soft 'ch' sound, like a cat hissing. Not a hard 'k' sound.", questionGerman: "Sprechen Sie laut: 'ich'", correctAnswer: "ich", explanation: "The 'ich-Laut' is the soft ch — tongue near the roof of the mouth, gentle breath. Practice this; every 'ch' after e/i/ä/ö/ü uses this sound.", audioUrl: "/audio/exercises/ex1-2-9-model.mp3", xpReward: 20 },
        { id: "ex1-2-10", type: "speaking", question: "Say aloud: 'schön' — shape your lips like an O, but say E inside.", questionGerman: "Sprechen Sie laut: 'schön'", correctAnswer: "schön", explanation: "The ö (umlaut) is the lip-O + tongue-E trick. This single sound shows up in schön, schöne, Köln, hören — master it once, use it everywhere.", audioUrl: "/audio/exercises/ex1-2-10-model.mp3", xpReward: 20 },
        { id: "ex1-2-11", type: "speaking", question: "Say aloud: 'München' — round your lips like a straw and say 'EE' for the ü.", questionGerman: "Sprechen Sie laut: 'München'", correctAnswer: "München", explanation: "ü = lips rounded like straw, tongue position for 'ee'. München, über, für, Tür — all use this sound.", audioUrl: "/audio/exercises/ex1-2-11-model.mp3", xpReward: 20 }
      ,
        {
          id: "ex1-2-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-2-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-2-1", german: "ich", english: "I", malayalam: "ഞാൻ", pronunciation: "ikh (soft ch)", example: "Ich bin hier.", exampleTranslation: "I am here." },
        { id: "vocab1-2-2", german: "Mädchen", english: "girl", malayalam: "പെൺകുട്ടി", pronunciation: "maid-shen", example: "Das Mädchen spielt.", exampleTranslation: "The girl is playing." },
        { id: "vocab1-2-3", german: "schön", english: "beautiful", malayalam: "സുന്ദരം", pronunciation: "shurn (lip-O + tongue-E)", example: "Das ist schön!", exampleTranslation: "That is beautiful!" },
        { id: "vocab1-2-4", german: "München", english: "Munich", malayalam: "മ്യൂണിക്ക്", pronunciation: "myoon-shen (lips round like a straw, say ee inside)", example: "München ist groß.", exampleTranslation: "Munich is big." },
        { id: "vocab1-2-5", german: "Straße", english: "street", malayalam: "തെരുവ്", pronunciation: "shtrah-se", example: "Die Straße ist lang.", exampleTranslation: "The street is long." },
        { id: "vocab1-2-6", german: "Wasser", english: "water", malayalam: "വെള്ളം", pronunciation: "vah-ser", example: "Das Wasser ist kalt.", exampleTranslation: "The water is cold." },
        { id: "vocab1-2-7", german: "Buch", english: "book", malayalam: "പുസ്തകം", pronunciation: "bookh (hard 'ch' after oo)", example: "Das Buch ist gut.", exampleTranslation: "The book is good." },
        { id: "vocab1-2-8", german: "Bier", english: "beer", malayalam: "ബിയർ", pronunciation: "beer", example: "Ein Bier, bitte!", exampleTranslation: "A beer, please!" },
        { id: "vocab1-2-9", german: "Vater", english: "father", malayalam: "അച്ഛൻ", pronunciation: "fah-ter", example: "Mein Vater ist nett.", exampleTranslation: "My father is nice." },
        { id: "vocab1-2-10", german: "Zeit", english: "time", malayalam: "സമയം", pronunciation: "tsyte", example: "Die Zeit vergeht schnell.", exampleTranslation: "Time passes quickly." }
      ]
    },

    // ===================== LESSON 1-3 =====================
    {
      id: "1-3",
      title: "Basic Greetings",
      titleGerman: "Grundlegende Begrüßungen",
      description: "Teach greetings as real communication, not just word lists. By the end, learners should be able to greet, respond, and choose between formal and informal situations with confidence — exactly the kind of control A1 speaking expects.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Goethe-Institut, Kochi — Classroom",
          sceneType: "classroom",
          timeOfDay: "morning",
          description: "Goethe-Institut Kochi, day three of your A1 course. Twenty students from Thrissur, Kottayam, Trivandrum fill the room. Frau Weber claps: 'Partner up — greet each other in German. Los!' Your heart thumps.",
        },
        narrative: {
          previousRecap: "You cracked the umlauts and the soft ch. Now Frau Weber wants real greetings — out loud, to real people.",
          currentObjective: "Greet your classmates and your teacher properly, in your first real German exchange",
          nextTeaser: "Next up: your cousin is flying back to Munich tomorrow — time to say goodbye in German.",
        },
        kuttanIntro: [
          "Machaane! Goethe Kochi-il day three! Frau Weber paranju: 'Partner-e greet cheyyu, auf Deutsch!' Heart oru thump aanu.",
          "Kerala-il ninnu ethraa perundu ivide — Thrissur, Kottayam, Trivandrum. Everyone is nervous — nammude same boat.",
          "Time-depending choice, Sie vs du, Herr vs nothing — all at once. Polayaanu, but try cheyyaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-3-1", encounterMoment: "Your partner Reshma from Kottayam smiles nervously and whispers: 'Hallo!' — the safest opener.", contextSentence: "Hallo, wie geht's?" },
          { vocabId: "vocab1-3-2", encounterMoment: "It's 9 AM. Frau Weber enters: 'Guten Morgen, Klasse!' The whole room echoes back. Morning is Guten Morgen.", contextSentence: "Guten Morgen, Klasse!" },
          { vocabId: "vocab1-3-3", encounterMoment: "A late classmate slips in at noon: 'Guten Tag, Frau Weber — Entschuldigung!' She nods. Tag covers midday to evening.", contextSentence: "Guten Tag, kann ich Ihnen helfen?" },
          { vocabId: "vocab1-3-4", encounterMoment: "Frau Weber role-plays an evening shop scene: 'Guten Abend, Herr Kumar!' Everyone repeats. Abend is after ~6 PM.", contextSentence: "Guten Abend, willkommen!" },
          { vocabId: "vocab1-3-5", encounterMoment: "She holds up a hand: 'Gute Nacht is ONLY for bedtime — not for leaving the café at 9 PM.' You note this carefully.", contextSentence: "Gute Nacht, schlaf gut!" },
          { vocabId: "vocab1-3-6", encounterMoment: "'To me — your teacher — use Sie,' Frau Weber says, pointing at herself. 'Like Malayalam Ningal.'", contextSentence: "Wie heißen Sie?" },
          { vocabId: "vocab1-3-7", encounterMoment: "'To Reshma, your classmate — use du. Like nee.' She gestures between you two.", contextSentence: "Wie heißt du?" },
          { vocabId: "vocab1-3-8", encounterMoment: "'And if you ever travel to Bavaria,' Frau Weber laughs, 'Grüß Gott is their Hallo. Sounds strange, perfectly normal there.'", contextSentence: "Grüß Gott, Frau Schmidt!" },
          { vocabId: "vocab1-3-9", encounterMoment: "'Up north in Hamburg — just Moin. Any time, any person.' The class chuckles at the shortest greeting.", contextSentence: "Moin! Alles klar?" },
          { vocabId: "vocab1-3-10", encounterMoment: "A big poster above the whiteboard reads: 'Willkommen bei Goethe-Institut Kochi!' You smile — that's you, a week in.", contextSentence: "Willkommen bei Goethe-Institut Kochi!" },
        ],
        decisionPoints: [
          {
            moment: "Frau Weber calls you to the front. 'Begrüßen Sie die Klasse' — greet the class. It's 10 AM, all eyes on you. How do you start?",
            options: [
              { text: "Guten Morgen! Ich bin Kuttan.", isCorrect: true, response: "Frau Weber nods approvingly. 'Sehr gut — formal, richtig für die Zeit.' The class repeats back: 'Guten Morgen, Kuttan!'", kuttanReaction: "Adipoli machaane! Classroom-il 9-11 AM = Guten Morgen. Formal + time-correct. Frau Weber happy aanu! 💪" },
              { text: "Hallo!", isCorrect: false, response: "Frau Weber tilts her head: 'Hallo ist informell, Kuttan. Für den Klassenraum — Guten Morgen.' Gentle correction.", kuttanReaction: "Hallo work cheyyum, but classroom-il Guten Morgen better. Small tune-up! 😊" },
              { text: "Guten Tag!", isCorrect: false, response: "Frau Weber smiles: 'Es ist erst zehn Uhr — also Guten Morgen.' It's 10 AM — still morning, not Tag.", kuttanReaction: "Aiyyo! 12 noon vare Guten Morgen aanu. Afternoon thudangumbol Guten Tag. Clock nokkeda! 😅" },
            ],
          },
          {
            moment: "Break time. Reshma, your partner, grabs a chai and walks over. 'Hi, ich bin Reshma. Und du?' She's your age.",
            options: [
              { text: "Hallo! Ich bin Kuttan. Wie geht's?", isCorrect: true, response: "Reshma grins. 'Gut, danke! Nee engine aanu?' She switches to Manglish naturally. Your first Goethe friendship.", kuttanReaction: "Perfect machaane! Classmate = du + Hallo = warm + correct. Wie geht's asking-return = friendly! 🔥" },
              { text: "Guten Tag, Frau Reshma. Wie geht es Ihnen?", isCorrect: false, response: "Reshma laughs out loud: 'Frau?! Njan 22 aanu da! Und Sie? Relax machaane — classmates-odu du enough.' Friendly amused.", kuttanReaction: "Over-polite aayi poyi! Peers-ne 'Frau' venda, 'du' mathi. Effort likes cheythu she did — but du! 😂" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-3-1",
          title: "Guten Tag! German Greetings for Real Life",
          duration: "10:30",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-3-1.mp4"
          description: "Forget 10 greetings, start with the 4 you actually need. Master the safe defaults for shops, offices, and exams.",
          scriptOutline: [
            "The 5-second rule: Why greetings matter in Germany",
            "The Starter Toolkit: Morgen, Tag, Abend, Hallo",
            "Formal or Casual? Choosing between Sie and du",
            "Wie geht's? The 'Ask Back' rule",
            "Roleplays: Safe formal and informal openings"
          ],
          keyVocabulary: ["Guten Tag", "Guten Morgen", "Guten Abend", "Hallo"],
          learningObjectives: [
            "Greet anyone appropriately based on the time of day",
            "Differentiate between formal and informal social contexts",
            "Respond naturally to 'How are you?' questions"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "note",
              title: "The Starter Toolkit",
              variant: "info",
              content: "You only need 4 tools to greet anyone in Germany! \n- Guten Morgen: Morning (until ~11:00) \n- Guten Tag: Day (Standard safe default!) \n- Guten Abend: Evening (after ~18:00) \n- Hallo: Anytime / Informal"
            },
            {
              type: "table",
              title: "Respect Levels: Sie vs. du",
              headers: ["German", "Malayalam Parallel", "Relationship"],
              rows: [
                ["Sie (Formal)", "നിങ്ങൾ / താങ്കൾ", "Officials, Bosses, Strangers"],
                ["du (Informal)", "നീ", "Friends, Family, Classmates"]
              ]
            },
            {
              type: "note",
              title: "The 'Ask Back' Rule",
              variant: "tip",
              content: "In Germany, if someone asks 'How are you?', it's polite to ask back. \n- Formal: 'Gut, danke! Und Ihnen?' \n- Informal: 'Gut, danke! Und dir?' \nNever just say 'I am fine' and stop — it sounds abrupt!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Guten Tag", english: "Good day", malayalam: "ശുഭദിനം", pronunciation: "goo-ten tahk" },
                { german: "Wie geht es Ihnen?", english: "How are you? (F)", malayalam: "എങ്ങനെയുണ്ട്?", pronunciation: "vee geyt es ee-nen" },
                { german: "Freut mich", english: "Nice to meet you", malayalam: "കണ്ടതിൽ സന്തോഷം", pronunciation: "froy-t mikh" }
              ]
            }
          ]
        },
        {
          id: "v1-3-2",
          title: "Formal vs Informal: Like 'Ningal' vs 'Nee'",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-3-2.mp4"
          description: "Master the German respect system using your Malayalam intuition. Learn exactly when to switch and how it affects the grammar.",
          scriptOutline: [
            "Direct Parallel: Sie = Ningal / du = Nee",
            "The Verb Change: -en vs -st endings",
            "The 'Duzen' Switch: Moving from formal to casual",
            "Exam Tip: Why you should ALWAYS use 'Sie' in exams"
          ],
          keyVocabulary: ["Sie", "du", "Ihnen", "dir"],
          learningObjectives: [
            "Use your Malayalam intuition to choose the right pronoun",
            "Pair 'Sie' and 'du' with correct verb endings",
            "Navigate social transitions from formal to informal"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "Like Malayalam!",
              headers: ["German", "Malayalam Parellel", "Relationship"],
              rows: [
                ["Sie (Formal)", "നിങ്ങൾ / താങ്കൾ", "Bosses, Strangers, Elders"],
                ["du (Informal)", "നീ", "Friends, Family, Kids"]
              ]
            },
            {
              type: "note",
              title: "Verb Endings Change",
              variant: "info",
              content: "It's not just the word 'you' that changes. The verb must match: \n- Sie takes -en (e.g., Wo wohnen Sie?) \n- du takes -st (e.g., Wo wohnst du?) \nTip: 'Sie' is smooth, 'du' has a hiss!"
            },
            {
              type: "note",
              title: "The Exam Rule",
              variant: "warning",
              content: "In the Goethe A1 exam, NEVER use 'du' with the examiner. Always use Sie, even if they are friendly."
            },
            {
              type: "vocabulary",
              items: [
                { german: "Wie heißen Sie?", english: "What is your name? (F)", malayalam: "താങ്കളുടെ പേരെന്താണ്?", pronunciation: "vee hy-sen zee" },
                { german: "Ihnen", english: "to you (F)", malayalam: "താങ്കൾക്ക്", pronunciation: "ee-nen" },
                { german: "dir", english: "to you (I)", malayalam: "നിനക്ക്", pronunciation: "deer" }
              ]
            }
          ]
        }
      ],
      exercises: [
        { id: "ex1-3-1", type: "fill-blank", question: "Complete: Guten _____, wie geht es Ihnen? (9 AM)", questionGerman: "Ergänzen Sie: Guten _____.", options: ["Morgen", "Tag", "Abend", "Nacht"], correctAnswer: "Morgen", explanation: "'Guten Morgen' is used in the morning. At 9 AM, this is the right greeting!", xpReward: 10 },
        { id: "ex1-3-2", type: "multiple-choice", question: "You meet your professor for the first time. Which form should you use?", questionGerman: "Sie treffen Ihren Professor zum ersten Mal. Welche Form nutzen Sie?", options: ["Sie (formal)", "Du (informal)", "Either is fine", "No pronoun needed"], correctAnswer: "Sie (formal)", explanation: "Sie = formal 'you' (like Malayalam 'Ningal'). Use with strangers, bosses, and anyone older. When in doubt, use Sie!", xpReward: 10 },
        { id: "ex1-3-3", type: "multiple-choice", question: "It's 8 PM. You meet your neighbor. You say...?", questionGerman: "Es ist 20 Uhr. Sie treffen Ihren Nachbarn.", options: ["Guten Abend", "Gute Nacht", "Guten Morgen", "Guten Tag"], correctAnswer: "Guten Abend", explanation: "'Guten Abend' = good evening, used when meeting people in the evening. 'Gute Nacht' is only for bedtime!", xpReward: 10 },
        { id: "ex1-3-4", type: "matching", question: "Match the time to the correct greeting:", questionGerman: "Ordnen Sie die Uhrzeit der richtigen Begrüßung zu:", options: ["8:00 AM", "2:00 PM", "7:00 PM"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend"], xpReward: 15 },
        { id: "ex1-3-5", type: "speaking", question: "At Berlin Hauptbahnhof, an officer looks up. Say aloud: 'Guten Tag, wie geht es Ihnen?'", questionGerman: "Sprechen Sie laut: 'Guten Tag, wie geht es Ihnen?'", correctAnswer: "Guten Tag, wie geht es Ihnen", explanation: "The full formal greeting. Emphasis on 'GU-ten TAG'. Practice this — you'll use it every day in Germany.", audioUrl: "/audio/exercises/ex1-3-5-model.mp3", xpReward: 20 },
        { id: "ex1-3-6", type: "type-answer", question: "How do you say 'Goodbye' formally in German?", correctAnswer: "Auf Wiedersehen", explanation: "'Auf Wiedersehen' = formal goodbye. Literally 'until we see again'. Use with strangers or bosses.", xpReward: 10 },
        { id: "ex1-3-7", type: "ordering", question: "Put these greetings in order from morning to night:", questionGerman: "Bringen Sie die Grüße in die richtige Reihenfolge (Morgen bis Nacht):", options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Guten Tag"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"], xpReward: 20 },
        { id: "ex1-3-8", type: "multiple-choice", question: "You walk into a small local bakery. What is the expected polite greeting?", questionGerman: "Sie gehen in eine kleine Bäckerei. Wie grüßen Sie?", options: ["Guten Tag", "Tschüss", "Gute Nacht", "Mahlzeit"], correctAnswer: "Guten Tag", explanation: "In Germany, when entering small shops, bakeries, or doctors' offices, it is polite and expected to say 'Guten Tag' or 'Hallo' to everyone, not just the staff. ('Mahlzeit!' is a different greeting — used around lunch time among colleagues.)", xpReward: 10 },
        { id: "ex1-3-9", type: "matching", question: "Rapid fire: match each situation to du or Sie.", questionGerman: "Schnell: ordnen Sie jede Situation dem richtigen du oder Sie zu.", options: ["Your German professor", "The barista's 8-year-old daughter", "A police officer at a traffic stop", "Your new flatmate your age"], correctAnswer: ["Sie", "du", "Sie", "du"], explanation: "Rule of thumb: authority + strangers + work = Sie. Kids + close peers = du. When in doubt at 18+, start with Sie and let them offer du.", xpReward: 20 },
        { id: "ex1-3-10", type: "fill-blank", question: "Your manager at the Pflegedienst asks 'Wie geht es Ihnen?' You answer 'Gut, danke! Und _____?'", questionGerman: "Ihr Chef fragt 'Wie geht es Ihnen?' Sie antworten 'Gut, danke! Und _____?'", options: ["Ihnen", "dir", "Sie", "du"], correctAnswer: "Ihnen", explanation: "The manager used 'Ihnen' (formal), so mirror it back: 'Und Ihnen?' Using 'dir' here would drop the register and feel rude. Always echo the formality they set.", xpReward: 15 },
        { id: "ex1-3-11", type: "speaking", question: "In Munich, the default morning greeting is 'Guten Morgen.' But in Bavaria you'll also hear 'Grüß Gott'. Say it aloud.", questionGerman: "Sprechen Sie laut: 'Grüß Gott'", correctAnswer: "Grüß Gott", explanation: "'Grüß Gott' literally means 'greet God' — the Bavarian/Austrian regional default. Completely neutral, works all day. Hamburg and Northern Germany use 'Moin' instead. Kerala parallel: like 'namaskaaram' vs 'vanakkam'.", audioUrl: "/audio/exercises/ex1-3-11-model.mp3", xpReward: 20 }
      ,
        {
          id: "ex1-3-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-3-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-3-1", german: "Hallo", english: "Hello", malayalam: "ഹലോ", pronunciation: "hah-loh", example: "Hallo, wie geht's?", exampleTranslation: "Hello, how are you?" },
        { id: "vocab1-3-2", german: "Guten Morgen", english: "Good morning", malayalam: "സുപ്രഭാതം", pronunciation: "goo-ten mor-gen", example: "Guten Morgen, Herr Müller!", exampleTranslation: "Good morning, Mr. Müller!" },
        { id: "vocab1-3-3", german: "Guten Tag", english: "Good day", malayalam: "നല്ല ദിവസം", pronunciation: "goo-ten tahk", example: "Guten Tag, kann ich Ihnen helfen?", exampleTranslation: "Good day, can I help you?" },
        { id: "vocab1-3-4", german: "Guten Abend", english: "Good evening", malayalam: "ശുഭ സന്ധ്യ", pronunciation: "goo-ten ah-bent", example: "Guten Abend, willkommen!", exampleTranslation: "Good evening, welcome!" },
        { id: "vocab1-3-5", german: "Gute Nacht", english: "Good night", malayalam: "ശുഭ രാത്രി", pronunciation: "goo-te nakht", example: "Gute Nacht, schlaf gut!", exampleTranslation: "Good night, sleep well!" },
        { id: "vocab1-3-6", german: "Sie", english: "You (formal)", malayalam: "നിങ്ങൾ (ബഹുമാനം)", pronunciation: "zee", example: "Wie heißen Sie?", exampleTranslation: "What is your name? (formal)" },
        { id: "vocab1-3-7", german: "du", english: "You (informal)", malayalam: "നീ", pronunciation: "doo", example: "Wie heißt du?", exampleTranslation: "What is your name? (informal)" },
        { id: "vocab1-3-8", german: "Grüß Gott", english: "Hello (Bavarian/Austrian)", malayalam: "ഹലോ (ബവേറിയൻ)", pronunciation: "grues got", example: "Grüß Gott, Frau Schmidt!", exampleTranslation: "Hello, Mrs. Schmidt! (Bavarian style)" },
        { id: "vocab1-3-9", german: "Moin", english: "Hello (Northern German)", malayalam: "ഹലോ (വടക്കൻ ജർമ്മൻ)", pronunciation: "moyn", example: "Moin! Alles klar?", exampleTranslation: "Hello! Everything okay?" },
        { id: "vocab1-3-10", german: "willkommen", english: "welcome", malayalam: "സ്വാഗതം", pronunciation: "vil-koh-men", example: "Herzlich willkommen in Deutschland!", exampleTranslation: "Warmly welcome to Germany!" }
      ]
    },

    // ===================== LESSON 1-4 =====================
    {
      id: "1-4",
      title: "Goodbyes & Politeness (The Survival Kit)",
      titleGerman: "Abschied und Höflichkeit",
      description: "Ending a conversation is as important as starting one. Master the 'Danke/Bitte' dance and learn which 'sorry' to use when you're in a pinch.",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "Kuttan's Home, Thrissur — Cousin's Last Evening",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Your cousin came home for Onam — ten days of sadya, banter, and surprise pop-quiz German lessons from him. Tonight is his last night. 5 AM flight to Munich tomorrow. The family is gathered. Time to say goodbye — in German.",
        },
        narrative: {
          previousRecap: "You survived your first real classroom greetings. Now use it on family — your cousin wants to see your German before he flies back.",
          currentObjective: "Say goodbye to your cousin and thank the family, mixing formal and informal registers",
          nextTeaser: "Next: two German tourists get lost in Fort Kochi — time for your first real-world conversation with strangers.",
        },
        kuttanIntro: [
          "Machaane! Ente cousin-nte last evening at home. Naale Munich-lekku parakkukayaanu — 5 AM flight.",
          "Avan test cheyyaan poyirikkukayaa — 'German-il goodbye paraya, Amma-kku Danke paraya, cheythu kaattu.' Pressure aanu!",
          "Cousin-odu warm goodbye, Appachan-odu respectful, pinne Amma-kku heartfelt Danke for the sadya. Pokaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-4-1", encounterMoment: "Your cousin stacks his Goethe A1 books and hands them to you: 'Nee these venam. Auf Wiedersehen, kuttyy — formal because I'm proud of you.'", contextSentence: "Auf Wiedersehen, bis Montag!" },
          { vocabId: "vocab1-4-2", encounterMoment: "His phone rings — a friend in Munich. He waves casually: 'Ja, ja, Tschüss!' and hangs up. Friends = Tschüss, no drama.", contextSentence: "Tschüss, mach's gut!" },
          { vocabId: "vocab1-4-3", encounterMoment: "Amma passes you an extra piece of payasam. 'Danke, Amma!' you say, Germanified. She glows.", contextSentence: "Danke für die Hilfe!" },
          { vocabId: "vocab1-4-4", encounterMoment: "Cousin slides his Munich apartment keys across the table to practice: 'Bitte — hier, bitte!' You repeat it, feeling the natural flow.", contextSentence: "Hier, bitte." },
          { vocabId: "vocab1-4-5", encounterMoment: "You accidentally knock over Achan's cup of tea. 'Entschuldigung, Acha!' you gasp in German. He pretends not to understand — family comedy.", contextSentence: "Entschuldigung!" },
          { vocabId: "vocab1-4-6", encounterMoment: "Cousin has gifted you his whole A1 exam guide. 'Vielen Dank, machaane!' you say, heartfelt. The 'Vielen' makes it bigger than just 'Danke'.", contextSentence: "Vielen Dank für alles!" },
        ],
        decisionPoints: [
          {
            moment: "11 PM. Cousin stands up, yawning. '5 AM flight, da. I'm going to crash.' How do you say goodnight in German?",
            options: [
              { text: "Gute Nacht, machaane! Gute Reise!", isCorrect: true, response: "He hugs you hard. 'Adipoli German, kuttyy. Proud aanu.' He disappears into the guest room. Perfect — Gute Nacht for bedtime + Gute Reise because he's traveling.", kuttanReaction: "Wunderbar! Gute Nacht bedtime-nu, Gute Reise travel-nu. Combo perfect. Cousin-nu proud aayi! 🌙" },
              { text: "Tschüss!", isCorrect: false, response: "He laughs: 'Tschüss is for when I LEAVE THE HOUSE, not for going to sleep! Gute Nacht aanu correct.' Light correction, no big deal.", kuttanReaction: "Almost! Bedtime = Gute Nacht mathram. Tschüss = leaving. Small but different! 😊" },
              { text: "Auf Wiedersehen!", isCorrect: false, response: "He snorts: 'Cousin-odu Auf Wiedersehen?! Enthaa, visa interview aano? Gute Nacht enough!' Too stiff for your own cousin.", kuttanReaction: "Aiyyo! Cousin-odu Auf Wiedersehen venda — overly formal aanu! Gute Nacht aanu correct! 😂" },
            ],
          },
          {
            moment: "5:30 AM at Kochi airport. Cousin has just checked in. He turns at the security gate for one last wave. What's your send-off?",
            options: [
              { text: "Vielen Dank für alles! Auf Wiedersehen, bis bald!", isCorrect: true, response: "He waves both hands over his head. 'Bis bald, kuttyy! Next Munich-il kaanaam — A1 pass cheyyathe varunillaa!' Then he's through security. You stand there, eyes stinging.", kuttanReaction: "Adipoli machaane! Vielen Dank + Auf Wiedersehen + Bis bald — triple combo for a big goodbye at an airport. This IS the German we're learning! ✨" },
              { text: "Bye, da!", isCorrect: false, response: "He turns, wags a finger, mock-stern: 'Auf Deutsch! Nee paadikkunno illayo?!' You both laugh, but you missed the chance.", kuttanReaction: "Chance missed machaane! Real moment vannappo English venda. Vielen Dank parayaan marakkaruthu! 😅" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-4-1",
          title: "Saying Goodbye & Being Polite",
          duration: "10:45",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-4-1.mp4"
          description: "A compact polite-exit toolkit: the safest goodbyes, the Danke/Bitte exchange, and common beginner traps.",
          scriptOutline: [
            "Exit Toolkit: Auf Wiedersehen, Tschüss, Gute Nacht",
            "Phone Logic: Seeing (sehen) vs Hearing (hören)",
            "The Danke / Bitte Dance: More than just thanks",
            "Entschuldigung vs Es tut mir leid: getting attention vs real apologies"
          ],
          keyVocabulary: ["Auf Wiedersehen", "Tschüss", "Danke", "Bitte", "Entschuldigung"],
          learningObjectives: [
            "Use the correct goodbye based on formal/informal setting",
            "Apply the Danke/Bitte exchange naturally",
            "Differentiate between the two types of German apologies"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "note",
              title: "The 3 Goodbyes",
              variant: "info",
              content: "Don't just say 'Bye'. Choose the right level: \n- Auf Wiedersehen: Formal (Offices, shops, exams) \n- Tschüss: Casual (Friends, classmates) \n- Gute Nacht: ONLY for bedtime!"
            },
            {
              type: "table",
              title: "The 'Bitte' Magic Word",
              headers: ["Context", "Meaning", "Example"],
              rows: [
                ["After 'Danke'", "You're welcome", "Danke! - Bitte!"],
                ["Making a request", "Please", "Ein Brot, bitte."],
                ["Giving something", "Here you go", "Hier, bitte."]
              ]
            },
            {
              type: "note",
              title: "Entschuldigung vs. Es tut mir leid",
              variant: "warning",
              content: "Which 'Sorry' should you use? \n- Entschuldigung: Getting attention or a small mistake (Excuse me). \n- Es tut mir leid: A real apology for something bigger (I'm sorry). \nTip: Use 'Entschuldigung' at a counter to get the staff's attention!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Auf Wiederhören", english: "Goodbye (Phone)", malayalam: "ഫോണിൽ സംസാരിച്ച് തീരുമ്പോൾ", pronunciation: "owf-vee-der-her-ren" },
                { german: "Danke schön", english: "Thank you very much", malayalam: "വളരെയധികം നന്ദി", pronunciation: "dahn-ke shurn" },
                { german: "Bitte schön", english: "You're very welcome", malayalam: "സന്തോഷമേയുള്ളൂ", pronunciation: "bit-te shurn" }
              ]
            }
          ]
        },
        {
          id: "v1-4-2",
          title: "Survival Politeness: The Magic Words at Work",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-4-2.mp4"
          description: "Watch the magic words in action at 3 real-world spots: the bakery, the supermarket, and the street.",
          scriptOutline: [
            "The Bakery Pattern: Number + Item + bitte",
            "The Supermarket Kasse: 'Einen schönen Tag noch!'",
            "The Street: 'Entschuldigung, können Sie mir helfen?'",
            "The Exam Rule: 'Wie bitte?' for easy points"
          ],
          keyVocabulary: ["Bäckerei", "Kasse", "Karte", "helfen"],
          learningObjectives: [
            "Order food and drink using the standard polite pattern",
            "Sound like a pro at the supermarket checkout",
            "Ask for help from strangers with the correct attention-getter"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "note",
              title: "The Magic Bakery Pattern",
              variant: "info",
              content: "When ordering at a German bakery (Bäckerei), use this pattern: \n- Number + Item + bitte. \n- Example: 'Ein Brötchen, bitte.' (One roll, please.)"
            },
            {
              type: "table",
              title: "Politeness Matrix",
              headers: ["Action", "Phrase", "Meaning"],
              rows: [
                ["Handing something over", "Hier, bitte schön.", "Here you go."],
                ["Leaving a shop", "Einen schönen Tag noch!", "Have a nice day!"],
                ["Responding to thanks", "Gern geschehen!", "You're welcome!"],
                ["Pardon? (To examiner)", "Wie bitte?", "What please? / Pardon?"]
              ]
            },
            {
              type: "note",
              title: "The 'Magic Exit' Phrase",
              variant: "tip",
              content: "Instead of just saying 'Tschüss' at the checkout, say: \n- 'Einen schönen Tag noch!' (Have a nice day!) \n- The staff will reply: 'Danke, ebenfalls!' (Thanks, you too!)"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Bäckerei", english: "bakery", malayalam: "ബേക്കറി", pronunciation: "beck-er-eye" },
                { german: "Mit Karte, bitte", english: "With card, please", malayalam: "കാർഡ് വഴി പേ ചെയ്യാം", pronunciation: "mit kar-te bit-te" },
                { german: "Wie viel kostet das?", english: "How much is it?", malayalam: "ഇതിന് എത്ര രൂപയാകും?", pronunciation: "vee-feel kos-tet dahs" }
              ]
            }
          ]
        }
      ],
      exercises: [
        { id: "ex1-4-1", type: "fill-blank", question: "At a shop: _____ schön! (Thank you very much!)", questionGerman: "Ergänzen Sie: _____ schön!", options: ["Danke", "Bitte", "Guten", "Auf"], correctAnswer: "Danke", explanation: "'Danke schön' = thank you very much. You'll use this dozens of times daily in Germany!", xpReward: 10 },
        { id: "ex1-4-2", type: "multiple-choice", question: "You bumped into someone accidentally at the train station. What do you say?", questionGerman: "Sie sind am Bahnhof gegen jemanden gestoßen. Was sagen Sie?", options: ["Entschuldigung!", "Bitte!", "Guten Tag!", "Kein Problem!"], correctAnswer: "Entschuldigung!", explanation: "Use 'Entschuldigung' for small interruptions or accidental bumps. It works just like 'Excuse me' or 'Sorry'.", xpReward: 10 },
        { id: "ex1-4-3", type: "fill-blank", question: "Complete the checkout phrase: Einen _____ Tag noch!", questionGerman: "Ergänzen Sie den Kassenspruch: Einen _____ Tag noch!", options: ["schönen", "guten", "bitte", "danke"], correctAnswer: "schönen", explanation: "'Einen schönen Tag noch!' (Have a nice day) is the pro way to leave a shop or supermarket.", xpReward: 10 },
        { id: "ex1-4-4", type: "speaking", question: "At your hostel checkout, the receptionist hands back your deposit. Say aloud: 'Vielen Dank! Auf Wiedersehen!'", questionGerman: "Sprechen Sie laut: 'Vielen Dank! Auf Wiedersehen!'", correctAnswer: "Vielen Dank Auf Wiedersehen", explanation: "The warm-but-professional exit. Use this in shops, offices, and anywhere you want to sound put-together.", audioUrl: "/audio/exercises/ex1-4-4-model.mp3", xpReward: 20 },
        { id: "ex1-4-5", type: "multiple-choice", question: "You're leaving a bakery at 5 PM. What's the 'pro' goodbye that impresses the baker?", questionGerman: "Sie verlassen eine Bäckerei um 17 Uhr. Welcher Abschied klingt am besten?", options: ["Einen schönen Tag noch!", "Gute Nacht!", "Hallo!", "Auf Wiederhören!"], correctAnswer: "Einen schönen Tag noch!", explanation: "'Einen schönen Tag noch!' (Have a nice day still) is what regulars say. Staff reply 'Danke, ebenfalls!' It marks you as someone who knows the social code. 'Auf Wiederhören' is phone-only.", xpReward: 15 },
        { id: "ex1-4-6", type: "matching", question: "Match each situation to the correct word to say:", questionGerman: "Verbinden Sie die Situation mit dem richtigen Wort:", options: ["Bumped into someone on the U-Bahn", "Received a gift from a friend", "Broke a friend's coffee mug"], correctAnswer: ["Entschuldigung", "Danke", "Es tut mir leid"], explanation: "Entschuldigung = small excuse-me. Danke = thanks. Es tut mir leid = a real apology for something significant. Germans use these three precisely — don't mix them.", xpReward: 20 },
        { id: "ex1-4-7", type: "fill-blank", question: "Complete the sincere apology: Es tut mir _____, das war mein Fehler.", questionGerman: "Ergänzen Sie: Es tut mir _____, das war mein Fehler.", options: ["leid", "schade", "Danke", "bitte"], correctAnswer: "leid", explanation: "'Es tut mir leid' literally 'it does me sorrow' = 'I am sorry'. The full phrase for real apologies — save it for situations that deserve it.", xpReward: 15 },
        { id: "ex1-4-8", type: "free-text", question: "You accidentally bumped someone's coffee at a café. Write a one-sentence polite apology in German.", questionGerman: "Schreiben Sie eine höfliche Entschuldigung auf Deutsch.", correctAnswer: ["Entschuldigung", "Oh, Entschuldigung", "Entschuldigung!", "Entschuldigung, das war mein Fehler", "Es tut mir leid", "Es tut mir leid!", "Es tut mir sehr leid", "Tut mir leid", "Oh, Entschuldigung!", "Oh, tut mir leid"], explanation: "'Entschuldigung' (excuse me) and 'Es tut mir leid' (I'm sorry) both work. Any variant with those words is natural.", xpReward: 25 }
      ,
        {
          id: "ex1-4-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-4-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-4-1", german: "Auf Wiedersehen", english: "Goodbye (formal)", malayalam: "വിട (ഔപചാരികം)", pronunciation: "owf vee-der-zey-en", example: "Auf Wiedersehen, bis Montag!", exampleTranslation: "Goodbye, see you Monday!" },
        { id: "vocab1-4-2", german: "Tschüss", english: "Bye (casual)", malayalam: "ബൈ", pronunciation: "chues", example: "Tschüss, mach's gut!", exampleTranslation: "Bye, take care!" },
        { id: "vocab1-4-3", german: "Danke", english: "Thank you", malayalam: "നന്ദി", pronunciation: "dahn-ke", example: "Danke für die Hilfe!", exampleTranslation: "Thank you for the help!" },
        { id: "vocab1-4-4", german: "Bitte", english: "Please / You're welcome", malayalam: "ദയവായി / ഒന്നുമില്ല", pronunciation: "bit-te", example: "Kann ich bitte einen Kaffee haben?", exampleTranslation: "Can I please have a coffee?" },
        { id: "vocab1-4-5", german: "Entschuldigung", english: "Excuse me / Sorry", malayalam: "ക്ഷമിക്കണം", pronunciation: "ent-shool-di-goong", example: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Excuse me, where is the train station?" },
        { id: "vocab1-4-6", german: "Vielen Dank", english: "Many thanks", malayalam: "വളരെ നന്ദി", pronunciation: "fee-len dahnk", example: "Vielen Dank für alles!", exampleTranslation: "Many thanks for everything!" },
        { id: "vocab1-4-7", german: "Bis bald", english: "See you soon", malayalam: "ഉടനെ കാണാം", pronunciation: "bis bahlt", example: "Tschüss, bis bald!", exampleTranslation: "Bye, see you soon!" },
        { id: "vocab1-4-8", german: "Es tut mir leid", english: "I'm sorry", malayalam: "എനിക്ക് ദുഃഖമുണ്ട്", pronunciation: "es toot meer lyte", example: "Es tut mir leid, das war mein Fehler.", exampleTranslation: "I'm sorry, that was my mistake." },
        { id: "vocab1-4-9", german: "Kein Problem", english: "No problem", malayalam: "കുഴപ്പമില്ല", pronunciation: "kyne pro-blaym", example: "Kein Problem, das macht nichts!", exampleTranslation: "No problem, that doesn't matter!" },
        { id: "vocab1-4-10", german: "Gern geschehen", english: "You're welcome (polite)", malayalam: "സന്തോഷം", pronunciation: "gairn ge-shey-en", example: "Danke! — Gern geschehen!", exampleTranslation: "Thanks! — You're welcome!" },
        { id: "vocab1-4-11", german: "nein", english: "no", malayalam: "ഇല്ല", pronunciation: "nyne", example: "Nein, danke!", exampleTranslation: "No, thank you!" }
      ]
    },

    // ===================== LESSON 1-5 =====================
    {
      id: "1-5",
      title: "Your First Conversation",
      titleGerman: "Dein erstes Gespräch",
      description: "Put it all together. A German tourist couple stops you in Fort Kochi to ask for directions — your first real German conversation with actual strangers. All from right here in Kerala.",
      duration: "30 min",
      xpReward: 200,
      storyScene: {
        setting: {
          name: "Fort Kochi — Saturday Afternoon",
          sceneType: "street",
          timeOfDay: "afternoon",
          description: "Saturday, 4 PM. You're at Fort Kochi with Kuttan — the beach walk, the Chinese fishing nets, tourists everywhere. A German couple in their 40s with a guidebook look lost. They glance your way. This is it — your first real conversation with actual Germans.",
        },
        narrative: {
          previousRecap: "You said goodbye to your cousin at Kochi airport. Now — a test with strangers, in your own city.",
          currentObjective: "Help a German tourist couple using your first real German conversation",
          nextTeaser: "Next: Frau Weber arranges a mock visa interview — formal register, maximum pressure.",
        },
        kuttanIntro: [
          "Machaane! Fort Kochi, Saturday evening — tourists everywhere!",
          "Aa randu peru kaanunundo — maps kond pidichukondu lost aayi nilkkunnu. Accent keattaal German-aano enn thonnum.",
          "Ithu ninte first real test aanu — classroom allaa, Frau Weber-um illa. Just go over and try!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-5-1", encounterMoment: "You walk over, smile, and lead with formality since they're strangers: 'Hallo, kann ich helfen? Wie geht es Ihnen?'", contextSentence: "Guten Tag, wie geht es Ihnen?" },
          { vocabId: "vocab1-5-2", encounterMoment: "The wife nudges her husband. 'Oh, er spricht Deutsch! Wie geht's?' She instantly drops to casual — you're helping them.", contextSentence: "Hey, wie geht's?" },
          { vocabId: "vocab1-5-3", encounterMoment: "You reply: 'Gut, danke!' And suddenly you're in a real German conversation in Fort Kochi.", contextSentence: "Gut, danke!" },
          { vocabId: "vocab1-5-4", encounterMoment: "You remember the 'ask back' rule. 'Und Ihnen?' — polite version, because you don't know them.", contextSentence: "Gut, danke! Und Ihnen?" },
          { vocabId: "vocab1-5-5", encounterMoment: "Their 10-year-old daughter Luna jumps in. You switch: 'Und dir?' — casual, because she's a kid.", contextSentence: "Super! Und dir?" },
          { vocabId: "vocab1-5-6", encounterMoment: "You show them the walking route on your phone: 'Hier, bitte — die Straße ist hier.'", contextSentence: "Hier, bitte." },
          { vocabId: "vocab1-5-7", encounterMoment: "The husband asks your name. You answer: 'Ich bin Kuttan — aus Thrissur.'", contextSentence: "Ich bin Kuttan aus Kerala." },
          { vocabId: "vocab1-5-8", encounterMoment: "You ask formally back: 'Und wie heißen Sie?' Respect for strangers = Sie + wie heißen Sie.", contextSentence: "Wie heißen Sie?" },
          { vocabId: "vocab1-5-9", encounterMoment: "To Luna (the kid) you ask casually: 'Und wie heißt du?'", contextSentence: "Wie heißt du?" },
          { vocabId: "vocab1-5-10", encounterMoment: "The wife answers: 'Ich heiße Anna. Das ist Marco, mein Mann, und Luna.'", contextSentence: "Ich heiße Anna." },
          { vocabId: "vocab1-5-11", encounterMoment: "Marco laughs: 'Mein Deutsch ist schlecht today — too much sun!' Anna nudges him playfully.", contextSentence: "Mir geht es schlecht." },
          { vocabId: "vocab1-5-12", encounterMoment: "You ask: 'Wohin gehen Sie?' — where are you going? They point: the Chinese fishing nets.", contextSentence: "Wohin gehst du?" },
        ],
        decisionPoints: [
          {
            moment: "Marco says: 'Gibt es hier ein gutes Café?' — is there a good café nearby? You know Kashi Art Café is two streets away. How do you answer?",
            options: [
              { text: "Ja! Kashi Café — hier, bitte. (points on map) Einen schönen Tag noch!", isCorrect: true, response: "Marco grins wide. 'Vielen Dank! Das war super nett.' He shakes your hand. Anna claps Luna on the shoulder: 'Siehst du? Kerala ist wunderbar!'", kuttanReaction: "Adipoli machaane! 'Hier, bitte' + map + 'schönen Tag noch' = complete German helper mode! You JUST had your first real German convo! 🎉" },
              { text: "Yes, Kashi Café is right there.", isCorrect: false, response: "They smile and thank you — but Anna whispers something to Marco about missing a chance to practice. You walk away with a tiny pinch of regret.", kuttanReaction: "Missed chance machaane! Momentum English-lekku pokki. Try cheyyaan phayappedanda — 'Ja, hier bitte' mathram madhi! 😅" },
            ],
          },
          {
            moment: "As they're about to leave, Anna turns: 'Vielen Dank! Wie heißen Sie nochmal?' — she's asking your name again, to remember you.",
            options: [
              { text: "Ich heiße Kuttan. Auf Wiedersehen!", isCorrect: true, response: "Anna pulls out a notebook and writes it down. 'Auf Wiedersehen, Kuttan! Bis bald vielleicht — wir kommen wieder nach Kochi.' Luna waves both hands.", kuttanReaction: "Wunderbar! Nee ore German person-nte notebook-il ethi! Ichiri kazhinjaal she might come back — real, lasting impression! ✨" },
              { text: "Just smile and wave", isCorrect: false, response: "They wave and walk on. You realize you didn't use your name — they'll remember you as 'a helpful guy' instead of 'Kuttan from Kerala'.", kuttanReaction: "Name parayaan marakkaruthu machaane! Ich heiße [name] — oru word, big difference. Next time parayaam! 😊" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-5-1",
          title: "Putting It Together - Your First German Chat",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-5-1.mp4"
          description: "A complete conversation practice with Kerala context",
          scriptOutline: [
            "Opening: 'Time to use everything you've learned!'",
            "Scenario setup: Meeting someone at Kochi airport who's heading to Germany too",
            "Sample dialogue with Kerala context:",
            "  - A: Guten Tag! (Good day!)",
            "  - B: Hallo! Guten Tag! (Hello! Good day!)",
            "  - A: Wie geht es Ihnen? (How are you?)",
            "  - B: Gut, danke! Und Ihnen? (Good, thanks! And you?)",
            "  - A: Auch gut, danke! (Also good, thanks!)",
            "  - [conversation about Kerala/Germany]",
            "  - A: Auf Wiedersehen! (Goodbye!)",
            "  - B: Tschüss! Bis bald! (Bye! See you soon!)",
            "Break down each line - grammar and cultural notes",
            "Casual version: Same chat but with Du and informal style",
            "Practice tips: Talk to yourself, record and listen",
            "Challenge: Try greeting someone in German this week!"
          ],
          keyVocabulary: ["Wie geht es Ihnen?", "Gut, danke", "Und Ihnen?"],
          learningObjectives: [
            "Have a basic German conversation",
            "Respond appropriately to common questions",
            "Feel confident using learned vocabulary"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
        },
        {
          id: "v1-5-2",
          title: "Real Situations — Airport, Café & First Meeting",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-5-2.mp4"
          description: "Practice conversations for three real-life scenarios you'll face in Germany",
          scriptOutline: [
            "Opening: 'Let's practice THREE real conversations you WILL need!'",
            "Scenario 1 — At the Airport Immigration:",
            "  - Officer: Guten Tag. Ihren Pass, bitte.",
            "  - You: Guten Tag! Hier, bitte. (Here, please.)",
            "  - Officer: Danke. Willkommen in Deutschland!",
            "  - You: Vielen Dank!",
            "Scenario 2 — Ordering at a Café:",
            "  - You: Guten Tag! Einen Kaffee, bitte.",
            "  - Barista: Groß oder klein?",
            "  - You: Klein, bitte. Danke schön!",
            "  - Barista: Bitte schön! Zwei Euro fünfzig.",
            "Scenario 3 — Meeting your new flatmate:",
            "  - Flatmate: Hallo! Ich bin Anna. Und du?",
            "  - You: Hallo! Ich bin [name]. Wie geht's?",
            "  - Flatmate: Gut, danke! Willkommen in der WG!",
            "  - You: Danke! Bis später!",
            "Kerala connection: It's like arriving at someone's house — 'Sugamaano?' exchange",
            "Practice challenge: Record yourself doing all three conversations"
          ],
          keyVocabulary: ["Ihren Pass, bitte", "Hier, bitte", "Willkommen"],
          learningObjectives: [
            "Handle basic airport interactions in German",
            "Order food/drinks using polite phrases",
            "Introduce yourself in an informal setting"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
        }
      ],
      exercises: [
        { id: "ex1-5-1", type: "ordering", question: "Put this conversation in the correct order:", questionGerman: "Bringen Sie das Gespräch in die richtige Reihenfolge:", options: ["Auch gut, danke!", "Guten Tag!", "Gut, danke! Und Ihnen?", "Hallo! Wie geht es Ihnen?"], correctAnswer: ["Guten Tag!", "Hallo! Wie geht es Ihnen?", "Gut, danke! Und Ihnen?", "Auch gut, danke!"], explanation: "A standard polite exchange: Greeting → How are you? → Answer and counter-question → Closing answer. This is the basic building block of any first meeting in Germany.", xpReward: 20 },
        { id: "ex1-5-2", type: "free-text", question: "You meet a German tourist. They ask: 'Guten Tag! Wie heißen Sie?' Introduce yourself as Kuttan (you can say 'Ich heiße Kuttan' or 'Mein Name ist Kuttan').", questionGerman: "Jemand sagt: 'Guten Tag! Wie heißen Sie?' Stellen Sie sich als Kuttan vor.", correctAnswer: ["Ich heiße Kuttan", "Ich bin Kuttan", "Mein Name ist Kuttan"], explanation: "Three equally correct ways: 'Ich heiße...', 'Ich bin...', or 'Mein Name ist...'. All three work in Germany.", xpReward: 25 },
        { id: "ex1-5-3", type: "fill-blank", question: "Complete: Wie geht es _____? (formal 'you')", questionGerman: "Ergänzen Sie: Wie geht es _____? (formell)", options: ["Ihnen", "dir", "du", "Sie"], correctAnswer: "Ihnen", explanation: "'Ihnen' = dative form of 'Sie' (formal you). 'dir' = dative of 'du' (informal). You'll see this 'Sie→Ihnen' and 'du→dir' dative swap in many fixed phrases (Und Ihnen?, Mit dir, Wie geht es Ihnen/dir?). Learn one, unlock the rest.", xpReward: 10 },
        { id: "ex1-5-5", type: "matching", question: "Match the formal question to the informal version:", questionGerman: "Ordnen Sie die formelle Frage der informellen zu:", options: ["Wie geht es Ihnen?", "Wie heißen Sie?", "Und Ihnen?"], correctAnswer: ["Wie geht's dir?", "Wie heißt du?", "Und dir?"], explanation: "The formal 'Ihnen/Sie' changes to informal 'dir/du' among friends and peers. Matching these pairs is crucial for A1 communication.", xpReward: 15 },
        { id: "ex1-5-6", type: "ordering", question: "Put this café order in the correct sequence:", questionGerman: "Bringen Sie die Bestellung im Café in die richtige Reihenfolge:", options: ["Danke schön!", "Bitte schön! Zwei Euro fünfzig.", "Guten Tag! Einen Kaffee, bitte.", "Klein, bitte.", "Groß oder klein?"], correctAnswer: ["Guten Tag! Einen Kaffee, bitte.", "Groß oder klein?", "Klein, bitte.", "Bitte schön! Zwei Euro fünfzig.", "Danke schön!"], explanation: "A typical ordering flow: Greeting & Order → Request for size → Choosing size → Payment → Saying thanks. Essential for daily life!", xpReward: 20 },
        { id: "ex1-5-7", type: "image-prompt", question: "What is this popular German drink? (Hint: Apfel = apple.)", questionGerman: "Wie heißt dieses beliebte deutsche Getränk?", imageUrl: "/images/apfelschorle.png", correctAnswer: ["Apfelschorle", "apfelschorle"], explanation: "Apfelschorle (apple juice + sparkling water) is the unofficial national drink of Germany! 'Schorle' = any juice mixed with sparkling water. Traubenschorle, Orangenschorle — same pattern.", xpReward: 25 },
        { id: "ex1-5-8", type: "fill-blank", question: "Someone introduces themselves: 'Hallo! Ich bin Anna. Und _____?'", questionGerman: "Jemand stellt sich vor: 'Hallo! Ich bin Anna. Und _____?'", options: ["du", "Sie", "ich", "wir"], correctAnswer: "du", explanation: "Context clue: 'Hallo' + first name = informal setting, so use 'du'. If they'd said 'Guten Tag, ich bin Frau Schmidt', you'd use 'Sie'.", xpReward: 10 },
        { id: "ex1-5-9", type: "free-text", question: "You're at a restaurant. How do you politely order an Apfelschorle?", questionGerman: "Sie sind im Restaurant. Bestellen Sie höflich eine Apfelschorle:", correctAnswer: ["Eine Apfelschorle, bitte", "Eine Apfelschorle bitte", "Ich möchte eine Apfelschorle, bitte", "Ich möchte eine Apfelschorle bitte", "Ich hätte gerne eine Apfelschorle", "Ich hätte gerne eine Apfelschorle, bitte"], explanation: "The magic formula: '[Item name], bitte'. Or the fancier 'Ich möchte... / Ich hätte gerne...'. All three work 100% of the time in Germany!", xpReward: 25 },
        { id: "ex1-5-10", type: "speaking", question: "The Fort Kochi tourist couple approaches you. Say the full opener aloud: 'Hallo! Kann ich Ihnen helfen? Wie geht es Ihnen?'", questionGerman: "Sprechen Sie laut: 'Hallo! Kann ich Ihnen helfen? Wie geht es Ihnen?'", correctAnswer: "Hallo Kann ich Ihnen helfen Wie geht es Ihnen", explanation: "This is your first real German conversation opener — friendly but formal (you used Ihnen, not dir). Practice it aloud three times today. Muscle memory matters more than perfection.", audioUrl: "/audio/exercises/ex1-5-10-model.mp3", xpReward: 30 }
      ,
        {
          id: "ex1-5-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-5-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-5-1", german: "Wie geht es Ihnen?", english: "How are you? (formal)", malayalam: "സുഖമാണോ? (ഔപചാരികം)", pronunciation: "vee gayt es ee-nen", example: "Guten Tag, wie geht es Ihnen?", exampleTranslation: "Good day, how are you?" },
        { id: "vocab1-5-2", german: "Wie geht's?", english: "How's it going? (casual)", malayalam: "എന്താ വിശേഷം?", pronunciation: "vee gayts", example: "Hey, wie geht's?", exampleTranslation: "Hey, how's it going?" },
        { id: "vocab1-5-3", german: "Gut, danke", english: "Good, thanks", malayalam: "നന്നായിരിക്കുന്നു, നന്ദി", pronunciation: "goot, dahn-ke", example: "Mir geht es gut, danke!", exampleTranslation: "I'm doing well, thanks!" },
        { id: "vocab1-5-4", german: "Und Ihnen?", english: "And you? (formal)", malayalam: "നിങ്ങളോ?", pronunciation: "oont ee-nen", example: "Gut, danke! Und Ihnen?", exampleTranslation: "Good, thanks! And you?" },
        { id: "vocab1-5-5", german: "Und dir?", english: "And you? (informal)", malayalam: "നീയോ?", pronunciation: "oont deer", example: "Super! Und dir?", exampleTranslation: "Great! And you?" },
        { id: "vocab1-5-6", german: "Hier, bitte", english: "Here, please / Here you go", malayalam: "ഇതാ, ദയവായി", pronunciation: "heer, bit-te", example: "Hier, bitte — mein Pass.", exampleTranslation: "Here, please — my passport." },
        { id: "vocab1-5-7", german: "Ich bin...", english: "I am...", malayalam: "ഞാൻ ... ആണ്", pronunciation: "ikh bin", example: "Ich bin Rahul aus Kerala.", exampleTranslation: "I am Rahul from Kerala." },
        { id: "vocab1-5-8", german: "Wie heißen Sie?", english: "What is your name? (formal)", malayalam: "നിങ്ങളുടെ പേര് എന്താണ്?", pronunciation: "vee hy-sen zee", example: "Guten Tag! Wie heißen Sie?", exampleTranslation: "Good day! What is your name?" },
        { id: "vocab1-5-9", german: "Wie heißt du?", english: "What is your name? (informal)", malayalam: "നിന്റെ പേര് എന്താ?", pronunciation: "vee hyst doo", example: "Hallo! Wie heißt du?", exampleTranslation: "Hello! What's your name?" },
        { id: "vocab1-5-10", german: "Ich heiße...", english: "My name is...", malayalam: "എന്റെ പേര് ... ആണ്", pronunciation: "ikh hy-se", example: "Ich heiße Maria.", exampleTranslation: "My name is Maria." },
        { id: "vocab1-5-11", german: "schlecht", english: "bad", malayalam: "മോശം", pronunciation: "shlekht", example: "Mir geht es schlecht.", exampleTranslation: "I am doing badly." },
        { id: "vocab1-5-12", german: "wohin", english: "where to", malayalam: "എങ്ങോട്ട്", pronunciation: "vo-hin", example: "Wohin gehst du?", exampleTranslation: "Where are you going?" }
      ]
    },

    // ===================== LESSON 1-6 =====================
    {
      id: "1-6",
      title: "Formal vs Informal",
      titleGerman: "Formell und Informell",
      description: "Master the art of formal and informal German — crucial for your first days in Germany! Get this wrong and it's like calling your boss 'machane' on day one.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Goethe-Institut Kochi — Mock Visa Interview",
          sceneType: "office",
          timeOfDay: "morning",
          description: "Goethe Kochi has set up a mock German consulate interview — practice for the real one coming in a few months. A visiting examiner, Herr Dr. Bauer from the Goethe Hauptstelle, plays the consular officer. Strict Sie. Formal German only. Your ticket is A-17. You wait in the corridor, palms sweaty.",
        },
        narrative: {
          previousRecap: "You helped German tourists in Fort Kochi — real-world proof of your German. Now: a harder test in the controlled setting of Goethe Kochi.",
          currentObjective: "Survive a mock visa interview using formal register only — Sie, Herr/Frau, full names",
          nextTeaser: "Module 1 complete. Next: introducing yourself properly — name, age, country, nationality — the A1 interview classic.",
        },
        kuttanIntro: [
          "Machaane! Frau Weber paranju — Goethe Kochi-il mock visa interview. Herr Dr. Bauer vannirikkunnu, Hauptstelle-nte examiner.",
          "Ivide EVERYTHING formal. 'Du' use cheythaal points poyi. 'Sie', 'Herr Dr. Bauer', full name — Malayalam-ile 'Ningal' + 'Saar' pole.",
          "Scary alle, but ith practice aanu — real embassy trip vanaal ninakku confident aayi vara pattum. Pokaam!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-6-1", encounterMoment: "The receptionist calls: 'Herr Kumar — Raum 3.' You stand. Full last name. This room uses Herr + surname, nothing else.", contextSentence: "Guten Tag, Herr Schmidt!" },
          { vocabId: "vocab1-6-2", encounterMoment: "A classmate before you — Reshma — was called 'Frau Menon.' No first names, no nicknames, no 'machaane'.", contextSentence: "Frau Meier, können Sie mir helfen?" },
          { vocabId: "vocab1-6-3", encounterMoment: "A printed sign on Dr. Bauer's door reads: 'Bitte formell — auf Deutsch.' Stay formal. Stay in German. The rules are non-negotiable.", contextSentence: "Die Sprache ist sehr formell." },
          { vocabId: "vocab1-6-4", encounterMoment: "Outside in the corridor, classmates chat informell with 'du'. The moment a name is called, they stand up and switch to Sie mode. Two registers, one building.", contextSentence: "Unter Freunden ist es informell." },
          { vocabId: "vocab1-6-5", encounterMoment: "Dr. Bauer nods when you say 'Könnten Sie das bitte wiederholen?' (Could you please repeat?) — being höflich earns respect in German officialdom.", contextSentence: "Sei immer höflich!" },
          { vocabId: "vocab1-6-6", encounterMoment: "Dr. Bauer hints that using 'du' with him would be unhöflich — rude. You keep Sie all the way through. This is what the real consulate will expect.", contextSentence: "Das war unhöflich." },
        ],
        decisionPoints: [
          {
            moment: "You enter Raum 3. Dr. Bauer looks up over his glasses. It's 9:30 AM. How do you greet him?",
            options: [
              { text: "Guten Morgen, Herr Dr. Bauer. Ich heiße Kuttan Kumar.", isCorrect: true, response: "He nods slightly, makes a tick mark on his paper. 'Guten Morgen, Herr Kumar. Bitte, setzen Sie sich.' You exhale — first hurdle cleared.", kuttanReaction: "PERFECT machaane! Guten Morgen + Herr + Dr. + last name + 'Ich heiße' — real consulate-level opener! Frau Weber proud aayirikkum! 💯" },
              { text: "Hallo, ich bin Kuttan!", isCorrect: false, response: "Dr. Bauer's eyebrow goes up. 'Bitte, Herr Kumar — formell.' He makes a different mark on his paper. Feedback comes later: too casual.", kuttanReaction: "Aiyyo machaane! Official office-il Hallo + first name venda! Collector-ne 'machaane' ennu vili cheyyunna pole aakum athu! Sie + Herr! 😬" },
              { text: "Namaste, Sir!", isCorrect: false, response: "Dr. Bauer smiles politely but firmly: 'Bitte auf Deutsch — das ist eine Prüfung auf Deutsch.' Back to German only.", kuttanReaction: "Warmth nalla sheri, but ithu German-nte practice aanu — Namaste venda, full German-il pokaam! Pattaalum try cheyyeda! 🇩🇪" },
            ],
          },
          {
            moment: "After the interview, Dr. Bauer says: 'Alles in Ordnung, Herr Kumar. Danke für Ihr Kommen.' How do you leave?",
            options: [
              { text: "Vielen Dank, Herr Dr. Bauer. Auf Wiedersehen!", isCorrect: true, response: "He nods once. 'Auf Wiedersehen, Herr Kumar. Einen schönen Tag noch.' You walk out. In the corridor, Frau Weber catches your eye and gives you a thumbs-up.", kuttanReaction: "Adipoli machaane! Vielen Dank + Herr + Auf Wiedersehen = complete formal exit. Ithu real embassy-il valare perfect work cheyyum! 🇩🇪" },
              { text: "Danke, tschüss!", isCorrect: false, response: "His mouth twitches. It works, but 'Tschüss' in a mock consulate is like wearing chappals to a job interview — technically fine, but not ideal. Feedback docks you a point.", kuttanReaction: "Almost! Office-il Auf Wiedersehen aanu better. Tschüss venda ivide — level up! 😊" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-6-1",
          title: "Mastering Sie and Du in Real Life",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-6-1.mp4"
          description: "Navigate formal and informal German like a pro — at work, shops, and university",
          scriptOutline: [
            "Opening: 'You know Sie and Du exist — now let's master WHEN to switch!'",
            "Quick recap: Sie = formal (like Malayalam 'Ningal'), Du = informal (like 'Nee')",
            "Scenario 1 — At Work: Always Sie with boss, HR, new colleagues",
            "  - 'Guten Morgen, Herr Schmidt. Wie geht es Ihnen?'",
            "  - When a colleague says 'Wir können uns duzen' — they're offering Du!",
            "Scenario 2 — Shopping: Sie with shopkeepers and strangers",
            "  - 'Entschuldigung, können Sie mir helfen?'",
            "Scenario 3 — University: Sie with professors, Du with fellow students",
            "  - 'Frau Professor Meier, könnten Sie das erklären?'",
            "  - 'Hey, hast du die Hausaufgaben gemacht?'",
            "Scenario 4 — Social media and younger generation: Du is normal online",
            "The golden rule: When in doubt, use Sie. Let the other person offer Du.",
            "Herr and Frau — always use with last names in formal settings",
            "Common mistakes: Using Du with police, officials, or elderly strangers",
            "Practice: Role-play switching between Sie and Du",
            "Kerala parallel: Like switching between 'Ningal' and 'Nee' based on context"
          ],
          keyVocabulary: ["Herr", "Frau", "formell", "informell", "höflich", "unhöflich"],
          learningObjectives: [
            "Confidently choose between Sie and Du in any situation",
            "Use Herr and Frau correctly with names",
            "Recognize when someone offers to switch to Du",
            "Avoid common formality mistakes in Germany"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "Goethe Kochi mock interview — Sie or du?",
              headers: ["Person", "Use", "Safe A1 sentence"],
              rows: [
                ["Herr Dr. Bauer / official", "Sie", "Guten Morgen, Herr Dr. Bauer."],
                ["Frau Weber / teacher", "Sie", "Können Sie das bitte wiederholen?"],
                ["Classmate in the corridor", "du", "Wie geht es dir?"],
                ["Unknown adult at an office", "Sie", "Können Sie mir bitte helfen?"]
              ]
            },
            {
              type: "note",
              title: "Kerala bridge",
              variant: "tip",
              content: "Think of Sie as respectful 'ningal' mode. In official German spaces, start with Sie and switch to du only after the other person clearly offers it."
            }
          ]
        },
        {
          id: "v1-6-2",
          title: "Writing Formal vs Informal — Emails, Texts & More",
          duration: "10:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v1-6-2.mp4"
          description: "How to write German emails and messages — formal for your boss, casual for your friends",
          scriptOutline: [
            "Opening: 'Speaking formal German is one thing — WRITING it is another level!'",
            "Formal email opening: 'Sehr geehrte Frau Müller,' (Dear Mrs. Müller,)",
            "Formal email opening (when you don't know the name): 'Sehr geehrte Damen und Herren,'",
            "Informal email/message opening: 'Liebe Anna,' / 'Lieber Tom,'",
            "Very casual (WhatsApp): 'Hey!' / 'Hi!' / 'Na?'",
            "Formal closing: 'Mit freundlichen Grüßen' (With kind regards)",
            "Informal closing: 'Liebe Grüße' / 'LG' (the German 'regards')",
            "Very casual closing: 'Bis dann!' / 'CU!' / 'Bussi' (Bavaria = kiss!)",
            "Real example: Writing to your university professor vs texting a classmate",
            "The keyboard situation: How to type ä, ö, ü, ß on an English keyboard",
            "Pro tip: ae = ä, oe = ö, ue = ü, ss = ß (when you can't type special characters)",
            "Practice: Write a formal email requesting information about a course"
          ],
          keyVocabulary: ["Sehr geehrte/r", "Mit freundlichen Grüßen", "Liebe Grüße"],
          learningObjectives: [
            "Write a basic formal German email",
            "Know the difference between formal and informal writing",
            "Type special German characters or use substitutes"
          ],
          placeholderThumbnail: "/images/home_office.png"
        }
      ],
      exercises: [
        {
          id: "ex1-6-1",
          type: "multiple-choice",
          question: "You've worked at a firm for a month. Your boss says: 'Wir können uns duzen.' What should you do?",
          questionGerman: "Ihr Chef sagt: 'Wir können uns duzen.' Was machen Sie?",
          options: ["Start addressing them with 'Du' and their first name", "Politely decline and keep using 'Sie'", "Address them with 'Sie' but use their first name", "Call them 'Machane'"],
          correctAnswer: "Start addressing them with 'Du' and their first name",
          explanation: "In German hierarchy, the person with higher status (the boss) always offers the 'Du' first. Once offered, it's a sign of trust and a closer working relationship. Go for it!",
          xpReward: 10
        },
        {
          id: "ex1-6-2",
          type: "fill-blank",
          question: "Complete: _____ Müller, wie geht es Ihnen? (addressing a man formally)",
          questionGerman: "Ergänzen Sie: _____ Müller, wie geht es Ihnen?",
          options: ["Herr", "Frau", "Du", "Mein"],
          correctAnswer: "Herr",
          explanation: "Herr = Mr., Frau = Mrs./Ms. Always use with LAST name: 'Herr Müller', never 'Herr Thomas'. Germans use first names only after being invited to.",
          xpReward: 10
        },
        {
          id: "ex1-6-3",
          type: "matching",
          question: "Match each situation to the correct form of address:",
          questionGerman: "Ordnen Sie die Situation der richtigen Anrede zu:",
          options: ["Meeting your professor", "Chatting with classmates", "Talking to a police officer"],
          correctAnswer: ["Sie (formal)", "Du (informal)", "Sie (formal)"],
          explanation: "Strangers and officials (police, professors) get the 'Sie' (Ningal) treatment, while peers and classmates get 'Du' (Nee).",
          xpReward: 15
        },
        {
          id: "ex1-6-4",
          type: "fill-blank",
          question: "Complete the formal email opening to a woman: 'Sehr _____ Frau Schmidt,'",
          questionGerman: "Ergänzen Sie die formelle Anrede: 'Sehr _____ Frau Schmidt,'",
          options: ["geehrte", "geehrter", "geehrten", "geehrtes"],
          correctAnswer: "geehrte",
          explanation: "Adjective agreement: 'Sehr geehrte Frau' (feminine) vs 'Sehr geehrter Herr' (masculine). A single letter changes the register — get it right or look careless.",
          xpReward: 15
        },
        {
          id: "ex1-6-5",
          type: "ordering",
          question: "Order these situations from MOST formal to LEAST formal:",
          questionGerman: "Bringen Sie die Situationen in eine Reihenfolge (formell bis informell):",
          options: ["Talking to friends at a party", "Meeting your boss for the first time", "Chatting with a fellow student", "Speaking at a government office"],
          correctAnswer: ["Speaking at a government office", "Meeting your boss for the first time", "Chatting with a fellow student", "Talking to friends at a party"],
          explanation: "Public offices are the most formal (Stiff Sie!), followed by work. Peers and friends are where 'Du' (informal) lives.",
          xpReward: 20
        },
        {
          id: "ex1-6-6",
          type: "fill-blank",
          question: "Begin a formal email: '_____ geehrte Frau Schmidt,' (Dear Mrs. Schmidt,)",
          questionGerman: "Beginnen Sie eine formelle E-Mail: '_____ geehrte Frau Schmidt,'",
          options: ["Sehr", "Liebe", "Hallo", "Guten"],
          correctAnswer: "Sehr",
          explanation: "Formal email formula: 'Sehr geehrte Frau [Name],' (women) or 'Sehr geehrter Herr [Name],' (men). Don't know who? Use 'Sehr geehrte Damen und Herren,'.",
          xpReward: 10
        },
        {
          id: "ex1-6-7",
          type: "matching",
          question: "Match the email opening to the correct context:",
          questionGerman: "Ordnen Sie die E-Mail-Anrede dem richtigen Kontext zu:",
          options: ["Sehr geehrte Damen und Herren,", "Liebe Anna,", "Hey!", "Sehr geehrter Herr Professor Müller,"],
          correctAnswer: ["Formal email to unknown recipient", "Semi-formal email to a friend", "Casual WhatsApp message", "Formal email to a professor"],
          explanation: "Knowing the exact opening for the right person is key for professional communication in Germany.",
          xpReward: 15
        },
        {
          id: "ex1-6-8",
          type: "fill-blank",
          question: "Email to your boss: Sehr geehrter _____ Müller,",
          questionGerman: "E-Mail an Ihren Chef: Sehr geehrter _____ Müller,",
          options: ["Herr", "Frau", "Du", "Lieber"],
          correctAnswer: "Herr",
          explanation: "'Sehr geehrter Herr Müller' = formal email opening to a man. Note the -r on 'geehrter' (masculine). For a woman you'd write 'Sehr geehrte Frau ...'.",
          xpReward: 10
        },
        {
          id: "ex1-6-10",
          type: "type-answer",
          question: "Say 'Please' and 'Thank you' in German.",
          correctAnswer: ["Bitte und Danke", "Danke und Bitte", "Bitte, Danke", "Danke, Bitte", "Bitte. Danke.", "bitte und danke"],
          explanation: "'Bitte' = please, 'Danke' = thank you. The two most essential polite words in German. Either order works — they're equally common.",
          xpReward: 35
        },
        {
          id: "ex1-6-11",
          type: "speaking",
          question: "You enter the Ausländerbehörde at 9:30 AM. Say aloud, formal register: 'Guten Morgen, Herr Schmidt. Wie geht es Ihnen?'",
          questionGerman: "Sprechen Sie laut, formell: 'Guten Morgen, Herr Schmidt. Wie geht es Ihnen?'",
          correctAnswer: "Guten Morgen Herr Schmidt Wie geht es Ihnen",
          explanation: "Formal register = slower, clearer pronunciation. 'IHnen' (not dir) is the key word — marks it as formal.",
          audioUrl: "/audio/exercises/ex1-6-11-model.mp3",
          xpReward: 25
        },
        {
          id: "ex1-6-12",
          type: "free-text",
          question: "Write the first line of a formal email to your university supervisor, Professor Müller (female).",
          questionGerman: "Schreiben Sie die erste Zeile einer formellen E-Mail an Frau Professor Müller.",
          correctAnswer: [
            "Sehr geehrte Frau Müller",
            "Sehr geehrte Frau Müller,",
            "Sehr geehrte Frau Professor Müller",
            "Sehr geehrte Frau Professor Müller,",
            "Sehr geehrte Frau Prof. Müller",
            "Sehr geehrte Frau Prof. Müller,"
          ],
          explanation: "Three equally correct phrasings: 'Sehr geehrte Frau Müller', 'Sehr geehrte Frau Professor Müller', or 'Sehr geehrte Frau Prof. Müller'. Feminine gender → 'geehrte' (no -r).",
          xpReward: 25
        },
        {
          id: "ex1-6-13",
          type: "multiple-choice",
          question: "Your keyboard doesn't have the ü key. You need to type 'München' in an official form. What's the correct substitution?",
          questionGerman: "Ihre Tastatur hat kein ü. Wie schreiben Sie 'München' richtig?",
          options: ["Muenchen", "Munchen", "Muchen", "Mu:nchen"],
          correctAnswer: "Muenchen",
          explanation: "Standard substitutions: ü→ue, ö→oe, ä→ae, ß→ss. Germans accept 'Muenchen' on every official form. Never drop the umlaut (Munchen) — it changes meaning.",
          xpReward: 15
        }
      ,
        {
          id: "ex1-6-prod-dictation",
          type: "dictation",
          question: "Listen and type the A1 sentence you hear.",
          audioUrl: "/audio/hoeren/module-01/ex1-6-prod-dictation.mp3",
          correctAnswer: "Ich lerne Deutsch",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab1-6-1", german: "Herr", english: "Mr.", malayalam: "ശ്രീ", pronunciation: "hair", example: "Guten Tag, Herr Schmidt!", exampleTranslation: "Good day, Mr. Schmidt!" },
        { id: "vocab1-6-2", german: "Frau", english: "Mrs. / Ms.", malayalam: "ശ്രീമതി", pronunciation: "frow", example: "Frau Meier, können Sie mir helfen?", exampleTranslation: "Mrs. Meier, can you help me?" },
        { id: "vocab1-6-3", german: "formell", english: "formal", malayalam: "ഔപചാരികം", pronunciation: "for-mel", example: "Die Sprache ist sehr formell.", exampleTranslation: "The language is very formal." },
        { id: "vocab1-6-4", german: "informell", english: "informal", malayalam: "അനൗപചാരികം", pronunciation: "in-for-mel", example: "Unter Freunden ist es informell.", exampleTranslation: "Among friends it is informal." },
        { id: "vocab1-6-5", german: "höflich", english: "polite", malayalam: "മര്യാദയുള്ള", pronunciation: "huf-likh", example: "Sei immer höflich!", exampleTranslation: "Always be polite!" },
        { id: "vocab1-6-6", german: "unhöflich", english: "impolite / rude", malayalam: "മര്യാദയില്ലാത്ത", pronunciation: "oon-huf-likh", example: "Das war unhöflich.", exampleTranslation: "That was rude." },
        { id: "vocab1-6-7", german: "Sehr geehrte/r", english: "Dear (formal letter)", malayalam: "ബഹുമാനപ്പെട്ട", pronunciation: "zair ge-air-te/ter", example: "Sehr geehrte Frau Müller, ...", exampleTranslation: "Dear Mrs. Müller, ..." },
        { id: "vocab1-6-8", german: "Mit freundlichen Grüßen", english: "With kind regards", malayalam: "ബഹുമാനത്തോടെ", pronunciation: "mit froynt-li-khen grue-sen", example: "Mit freundlichen Grüßen, Rahul Kumar", exampleTranslation: "With kind regards, Rahul Kumar" },
        { id: "vocab1-6-9", german: "Liebe Grüße", english: "Best wishes / Love (casual)", malayalam: "സ്നേഹത്തോടെ", pronunciation: "lee-be grue-se", example: "Liebe Grüße, Anna", exampleTranslation: "Best wishes, Anna" },
        { id: "vocab1-6-10", german: "sprechen", english: "to speak", malayalam: "സംസാരിക്കുക", pronunciation: "shpre-khen", example: "Ich spreche ein bisschen Deutsch.", exampleTranslation: "I speak a little German." }
      ]
    }
  ]
};
