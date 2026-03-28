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
                { german: "Deutschland", english: "Germany", malayalam: "ജർമ്മനി", pronunciation: "doych-land" },
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
        { id: "ex1-1-1", type: "multiple-choice", question: "In German work culture, what does the term 'Feierabend' celebrate?", questionGerman: "Was feiert man mit dem Begriff 'Feierabend'?", options: ["The end of the workday", "A birthday at the office", "A national holiday", "A Friday night party"], correctAnswer: "The end of the workday", explanation: "'Feierabend' is a unique German concept. It's the sacred time after work ends when you stop checking emails and focus entirely on rest or hobbies. For Germans, work-life balance starts with a clear 'Feierabend'!", xpReward: 10, imageUrl: "/images/feierabend.png" },
        { id: "ex1-1-2", type: "multiple-choice", question: "Germany is in the heart of Europe and borders 9 countries. Which of these is NOT a neighbor?", questionGerman: "Deutschland hat 9 Nachbarländer. Welches Land ist KEIN Nachbar?", options: ["United Kingdom", "France", "Poland", "Denmark"], correctAnswer: "United Kingdom", explanation: "Germany shares borders with 9 countries (Denmark, Poland, Czechia, Austria, Switzerland, France, Luxembourg, Belgium, and Netherlands). The UK is separated by the sea!", xpReward: 10 },
        { id: "ex1-1-3", type: "fill-blank", question: "Complete: Ich lerne _____ (I am learning German)", questionGerman: "Ergänzen Sie: Ich lerne _____", options: ["Deutsch", "Deutschland", "Englisch", "Hindi"], correctAnswer: "Deutsch", explanation: "'Deutsch' means the German language. 'Deutschland' means the country Germany.", xpReward: 10 },
        { id: "ex1-1-4", type: "multiple-choice", question: "Students in Germany now get the 'Deutschlandsemesterticket'. What is its biggest advantage?", questionGerman: "Was ist der größte Vorteil des 'Deutschlandsemesterticket'?", options: ["Unlimited local transport across ALL of Germany", "Free rides on high-speed ICE trains", "It is completely free for all students", "It includes free international flights"], correctAnswer: "Unlimited local transport across ALL of Germany", explanation: "The new Deutschlandsemesterticket (priced at approx. €29.40/month in 2024) is a game-changer! Unlike the old regional tickets, this one lets you travel on all buses, trams, and regional trains from the Alps in the south to the Baltic Sea in the north.", xpReward: 10, imageUrl: "/images/deutschland_ticket.png" },
        { id: "ex1-1-5", type: "matching", question: "Match the German word to its English meaning:", questionGerman: "Verbinden Sie die Wörter:", options: ["Deutsch", "Deutschland", "lernen", "Arbeit"], correctAnswer: ["German (language)", "Germany", "to learn", "work"], xpReward: 15 },
        { id: "ex1-1-6", type: "multiple-choice", question: "Most students in Germany live in a 'WG'. What is a 'WG' (Wohngemeinschaft)?", questionGerman: "Was ist eine 'WG' (Wohngemeinschaft)?", options: ["A shared apartment with flatmates", "A type of student dormitory", "A university library", "A German sports club"], correctAnswer: "A shared apartment with flatmates", explanation: "WG = Wohngemeinschaft. Instead of living alone, students share an apartment to save costs and make friends. It's the heart of German student social life!", xpReward: 10, imageUrl: "/images/wg_living.png" },
        { id: "ex1-1-7", type: "ordering", question: "Order the steps of your German journey:", questionGerman: "Bringen Sie die Schritte in die richtige Reihenfolge:", options: ["Apply for a visa", "Move to Germany", "Learn A1 German", "Pass the A1 exam"], correctAnswer: ["Learn A1 German", "Pass the A1 exam", "Apply for a visa", "Move to Germany"], xpReward: 20 },
        { id: "ex1-1-8", type: "multiple-choice", question: "If you are in Germany on a Sunday, what will you notice about 'Sonntagsruhe'?", questionGerman: "Was bemerkt man am Sonntag (Sonntagsruhe) in Deutschland?", options: ["Almost all shops are closed", "Everyone must wear formal clothes", "Public transport stops running", "Internet is turned off"], correctAnswer: ["Almost all shops are closed"], explanation: "Sunday is 'Ruhetag' (Day of rest). Shops/supermarkets are closed, and loud activities (like mowing the lawn) are discouraged. It's a day for family, walks, and 'Kaffee und Kuchen'!", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab1-1-1", german: "Deutsch", english: "German (language)", malayalam: "ജർമ്മൻ (ഭാഷ)", pronunciation: "doych", example: "Ich lerne Deutsch.", exampleTranslation: "I am learning German." },
        { id: "vocab1-1-2", german: "Deutschland", english: "Germany", malayalam: "ജർമ്മനി", pronunciation: "doych-lant", example: "Deutschland ist schön.", exampleTranslation: "Germany is beautiful." },
        { id: "vocab1-1-3", german: "lernen", english: "to learn", malayalam: "പഠിക്കുക", pronunciation: "lair-nen", example: "Wir lernen zusammen.", exampleTranslation: "We learn together." },
        { id: "vocab1-1-4", german: "Arbeit", english: "work", malayalam: "ജോലി", pronunciation: "ar-bite", example: "Die Arbeit ist interessant.", exampleTranslation: "The work is interesting." },
        { id: "vocab1-1-5", german: "Studium", english: "studies / university education", malayalam: "പഠനം", pronunciation: "shtoo-dee-um", example: "Mein Studium dauert vier Jahre.", exampleTranslation: "My studies last four years." },
        { id: "vocab1-1-6", german: "Sprache", english: "language", malayalam: "ഭാഷ", pronunciation: "shprah-khe", example: "Deutsch ist eine schöne Sprache.", exampleTranslation: "German is a beautiful language." },
        { id: "vocab1-1-7", german: "Ausbildung", english: "vocational training", malayalam: "തൊഴിൽ പരിശീലനം", pronunciation: "ows-bil-doong", example: "Eine Ausbildung dauert drei Jahre.", exampleTranslation: "A vocational training lasts three years." },
        { id: "vocab1-1-8", german: "Universität", english: "university", malayalam: "സർവകലാശാല", pronunciation: "oo-ni-ver-zi-tayt", example: "Die Universität ist groß.", exampleTranslation: "The university is big." },
        { id: "vocab1-1-9", german: "Visum", english: "visa", malayalam: "വിസ", pronunciation: "vee-zoom", example: "Ich brauche ein Visum.", exampleTranslation: "I need a visa." },
        { id: "vocab1-1-10", german: "Chance", english: "opportunity / chance", malayalam: "അവസരം", pronunciation: "shahn-se", example: "Das ist eine gute Chance!", exampleTranslation: "That is a good opportunity!" },
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
                { german: "schön", english: "beautiful", malayalam: "മനോഹരം", pronunciation: "shurn" },
                { german: "München", english: "Munich", malayalam: "മ്യൂണിക്ക്", pronunciation: "muen-shen" },
                { german: "Wasser", english: "water", malayalam: "വെള്ളം", pronunciation: "vahs-ser" }
              ]
            }
          ]
        },
        {
          id: "v1-2-2",
          title: "Alphabet & Spelling: The Amt Survival Skill",
          duration: "10:00",
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
        { id: "ex1-2-1", type: "multiple-choice", question: "In German, 'schon' means 'already'. Adding two dots changes it to 'schön'. What does 'schön' mean?", questionGerman: "Was bedeutet 'schön'?", options: ["Beautiful", "Fast", "Old", "New"], correctAnswer: "Beautiful", explanation: "Two tiny dots (Umlaut) completely change the meaning! schon = already, schön = beautiful. These dots are NOT decorative — they change the vowel sound and meaning.", xpReward: 10 },
        { id: "ex1-2-2", type: "multiple-choice", question: "What is the ß called in German?", questionGerman: "Wie heißt das Zeichen 'ß'?", options: ["Eszett", "Umlaut", "Doppel-S", "Scharfes B"], correctAnswer: "Eszett", explanation: "ß (Eszett) = a long 'ss' sound. It appears after long vowels: Straße, Fuß. After short vowels, German uses 'ss' instead: Wasser, essen.", xpReward: 10 },
        { id: "ex1-2-3", type: "multiple-choice", question: "You see a sign that says 'Straße'. What does the ß tell you?", questionGerman: "Was bedeutet das ß in 'Straße'?", options: ["The 'a' before it is long", "It's a foreign word", "It's an old spelling", "The word is plural"], correctAnswer: "The 'a' before it is long", explanation: "ß (Eszett) appears after LONG vowels: Straße, Fuß, Maß. After SHORT vowels, German uses 'ss': Wasser, essen. The ß is your clue to stretch the vowel!", xpReward: 15 },
        { id: "ex1-2-4", type: "fill-blank", question: "German meaning changes with dots! 'Schon' means 'already', but 'Sch___n' means 'beautiful'.", questionGerman: "Schon = schon, aber Sch___n = schön. Ergänzen Sie:", options: ["ö", "ä", "ü", "o"], correctAnswer: "ö", explanation: "Small dots, big difference! 'Schon' (already) vs 'Schön' (beautiful). This is why mastering Umlauts (ä, ö, ü) is essential from Lesson 1.", xpReward: 10 },
        { id: "ex1-2-5", type: "multiple-choice", question: "You see a German menu that says 'Wasser'. An English speaker would read it as 'Wasser', but Germans actually say it more like...?", questionGerman: "Wie sagen Deutsche 'Wasser'?", options: ["Vasser", "Wasser (same as English)", "Fasser", "Hasser"], correctAnswer: "Vasser", explanation: "German W = English V sound. So Wasser sounds like 'Vasser'. Similarly, 'Wein' (wine) = 'Vine'. This W→V shift trips up every beginner!", xpReward: 10 },
        { id: "ex1-2-6", type: "multiple-choice", question: "You're in Germany and someone says 'Tseit' out loud. Which word did they say?", questionGerman: "Jemand sagt 'Tseit'. Welches Wort?", options: ["Zeit (time)", "Seit (since)", "Seite (page)", "Ziel (goal)"], correctAnswer: "Zeit (time)", explanation: "German Z is always pronounced 'ts'. So 'Zeit' (time) sounds like 'Tsait'. This 'ts' start catches every beginner — but you'll hear it everywhere: Zeitung (newspaper), zusammen (together), Zimmer (room).", xpReward: 15 },
        { id: "ex1-2-7", type: "multiple-choice", question: "German 'ie' and 'ei' look similar but sound completely different. 'Bier' means beer, 'Bein' means leg. Which rule helps you remember?", questionGerman: "Wie unterscheidet man 'ie' und 'ei'?", options: ["The SECOND letter determines the sound", "The FIRST letter determines the sound", "They sound the same", "It depends on the word"], correctAnswer: "The SECOND letter determines the sound", explanation: "The second letter wins! ie → long 'ee' (Bier = beer), ei → long 'eye' (Bein = byne). This rule NEVER has exceptions in German. Memorize it once, use it forever.", xpReward: 10 },
        { id: "ex1-2-8", type: "multiple-choice", question: "A German friend texts you 'Ich wohne in der Königstraße'. What two special characters appear?", questionGerman: "Welche zwei besonderen Zeichen stehen in 'Königstraße'?", options: ["ö and ß", "ä and ü", "ö and ü", "ß and ä"], correctAnswer: "ö and ß", explanation: "König (king) has ö, Straße (street) has ß. You'll see these special characters everywhere in German — get comfortable spotting them!", xpReward: 15 }
      ],
      vocabulary: [
        { id: "vocab1-2-1", german: "ich", english: "I", malayalam: "ഞാൻ", pronunciation: "ikh (soft ch)", example: "Ich bin hier.", exampleTranslation: "I am here." },
        { id: "vocab1-2-2", german: "Mädchen", english: "girl", malayalam: "പെൺകുട്ടി", pronunciation: "med-khen", example: "Das Mädchen spielt.", exampleTranslation: "The girl is playing." },
        { id: "vocab1-2-3", german: "schön", english: "beautiful", malayalam: "സുന്ദരം", pronunciation: "shöhn (round lips like 'o', say 'e')", example: "Das ist schön!", exampleTranslation: "That is beautiful!" },
        { id: "vocab1-2-4", german: "München", english: "Munich", malayalam: "മ്യൂണിക്ക്", pronunciation: "muen-shen", example: "München ist groß.", exampleTranslation: "Munich is big." },
        { id: "vocab1-2-5", german: "Straße", english: "street", malayalam: "തെരുവ്", pronunciation: "shtrah-se", example: "Die Straße ist lang.", exampleTranslation: "The street is long." },
        { id: "vocab1-2-6", german: "Wasser", english: "water", malayalam: "വെള്ളം", pronunciation: "vah-ser", example: "Das Wasser ist kalt.", exampleTranslation: "The water is cold." },
        { id: "vocab1-2-7", german: "Kuchen", english: "cake", malayalam: "കേക്ക്", pronunciation: "koo-khen", example: "Der Kuchen schmeckt gut.", exampleTranslation: "The cake tastes good." },
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
          name: "Berlin Hauptbahnhof",
          sceneType: "bahnhof",
          timeOfDay: "morning",
          description: "Berlin Hauptbahnhof. Glass ceilings, rushing commuters, German announcements. Your new life starts now.",
        },
        narrative: {
          previousRecap: "You learned why German matters and practiced the sounds. Now it's time to actually talk to people!",
          currentObjective: "Greet people properly at the train station",
          nextTeaser: "Next up: saying goodbye without being awkward...",
        },
        kuttanIntro: [
          "Machane! Nammude first day in Berlin! Train station-il ethiyirikkunnu. Aarenkilum 'Hallo' parayan padikkaam!",
          "Berlin Hauptbahnhof-il aanu nammal! Ee station kandu nee shock aayikaanum... but don't worry, I'm here! Let's learn to greet people!",
          "Enthayaalum nammal Berlin-il ethii! First thing first — greetings padikkaam. Ini aarenkilum parichayapedaan pattum!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-3-1", encounterMoment: "A friendly person on the platform smiles at you. 'Hallo!' they say warmly.", contextSentence: "Hallo, wie geht's?" },
          { vocabId: "vocab1-3-2", encounterMoment: "It's 8 AM. The coffee shop attendant greets you: 'Guten Morgen! Was möchten Sie?'", contextSentence: "Guten Morgen, Herr Müller!" },
          { vocabId: "vocab1-3-3", encounterMoment: "At the info desk, the officer nods professionally. 'Guten Tag, kann ich Ihnen helfen?'", contextSentence: "Guten Tag, kann ich Ihnen helfen?" },
          { vocabId: "vocab1-3-4", encounterMoment: "Later, arriving at your hostel in the evening, the receptionist greets you: 'Guten Abend, willkommen!'", contextSentence: "Guten Abend, willkommen!" },
          { vocabId: "vocab1-3-5", encounterMoment: "Your roommate yawns and heads to bed. 'Gute Nacht, schlaf gut!' they whisper.", contextSentence: "Gute Nacht, schlaf gut!" },
          { vocabId: "vocab1-3-6", encounterMoment: "The police officer at the station asks formally: 'Wie heißen Sie?' — he uses 'Sie', the respectful form.", contextSentence: "Wie heißen Sie?" },
          { vocabId: "vocab1-3-7", encounterMoment: "A student your age waves casually: 'Hey! Wie heißt du?' — the friendly 'du' form.", contextSentence: "Wie heißt du?" },
          { vocabId: "vocab1-3-8", encounterMoment: "A Bavarian tourist on the platform says something unexpected: 'Grüß Gott!' — a regional greeting from southern Germany.", contextSentence: "Grüß Gott, Frau Schmidt!" },
          { vocabId: "vocab1-3-9", encounterMoment: "Two guys in Hamburg FC scarves walk past: 'Moin!' they say to each other — the northern German hello.", contextSentence: "Moin! Alles klar?" },
          { vocabId: "vocab1-3-10", encounterMoment: "A big banner at the station exit reads: 'Herzlich willkommen in Deutschland!'", contextSentence: "Herzlich willkommen in Deutschland!" },
        ],
        decisionPoints: [
          {
            moment: "You approach the info desk. The officer looks up. It's 3 PM. How do you greet them?",
            options: [
              { text: "Guten Tag!", isCorrect: true, response: "The officer smiles and answers your question helpfully. Perfect — formal and time-appropriate!", kuttanReaction: "Adipoli! Guten Tag is perfect for afternoon + formal situation! 💪" },
              { text: "Hallo!", isCorrect: false, response: "The officer helps you, but looks slightly surprised. 'Hallo' works, but 'Guten Tag' would be more appropriate in a formal setting.", kuttanReaction: "Hallo works machane, but Guten Tag is better for formal situations! No worries though! 😊" },
              { text: "Guten Morgen!", isCorrect: false, response: "The officer raises an eyebrow — it's 3 PM, not morning! They help you anyway.", kuttanReaction: "Aiyyo! Guten Morgen is for morning only! It's afternoon now — Guten Tag aanu correct! 😅" },
            ],
          },
          {
            moment: "At the hostel, a student your age introduces herself. 'Hi! Ich bin Lisa. Und du?' What do you say?",
            options: [
              { text: "Hallo! Ich bin [your name]. Wie geht's?", isCorrect: true, response: "Lisa grins. 'Mir geht's gut, danke! Bist du auch neu hier?' A friendship is forming!", kuttanReaction: "Perfect machane! Informal greeting + asking how they are = friendly and natural! You're making friends already! 🔥" },
              { text: "Guten Tag, Frau Lisa. Wie geht es Ihnen?", isCorrect: false, response: "Lisa laughs. 'Frau Lisa?! Das ist so süß! Du kannst einfach Lisa sagen.' She's amused but it's too formal for someone your age.", kuttanReaction: "Enthayaalum too formal aanu machane! She's your age — use du, not Sie! But she liked the effort 😂" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-3-1",
          title: "Guten Tag! German Greetings for Real Life",
          duration: "10:30",
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
        { id: "ex1-3-1", type: "multiple-choice", question: "When greeting someone formally in Germany, what is the 'Golden Rule'?", questionGerman: "Was ist die 'Goldene Regel' bei einer formellen Begrüßung?", options: ["Firm handshake and direct eye contact", "A slight bow without touching", "Avoiding eye contact out of respect", "A high-five"], correctAnswer: "Firm handshake and direct eye contact", explanation: "In Germany, a firm (but not crushing) handshake with direct eye contact signals confidence and honesty. Avoiding eye contact can be seen as having something to hide!", xpReward: 10 },
        { id: "ex1-3-2", type: "multiple-choice", question: "You meet your professor for the first time. Which form should you use?", questionGerman: "Sie treffen Ihren Professor zum ersten Mal. Welche Form nutzen Sie?", options: ["Sie (formal)", "Du (informal)", "Either is fine", "No pronoun needed"], correctAnswer: "Sie (formal)", explanation: "Sie = formal 'you' (like Malayalam 'Ningal'). Use with strangers, bosses, and anyone older. When in doubt, use Sie!", xpReward: 10 },
        { id: "ex1-3-3", type: "multiple-choice", question: "Which greeting is used ONLY when going to sleep?", questionGerman: "Welcher Gruß wird NUR vor dem Schlafengehen verwendet?", options: ["Gute Nacht", "Guten Abend", "Guten Tag", "Hallo"], correctAnswer: "Gute Nacht", explanation: "'Gute Nacht' = only when going to BED, not just evening. At 8 PM meeting someone? Say 'Guten Abend'. Leaving to sleep? 'Gute Nacht'.", xpReward: 10 },
        { id: "ex1-3-4", type: "matching", question: "Match the time to the correct greeting:", questionGerman: "Ordnen Sie die Uhrzeit der richtigen Begrüßung zu:", options: ["8:00 AM", "2:00 PM", "7:00 PM"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend"], xpReward: 15 },
        { id: "ex1-3-5", type: "fill-blank", question: "Complete: Guten _____, wie geht es Ihnen? (It's 3 PM)", questionGerman: "Ergänzen Sie: Guten _____, wie geht es Ihnen?", options: ["Tag", "Morgen", "Abend", "Nacht"], correctAnswer: "Tag", explanation: "'Guten Tag' covers noon to ~6 PM. Memory trick: Tag = day = daylight hours. Once the sun sets, switch to 'Guten Abend'.", xpReward: 10 },
        { id: "ex1-3-6", type: "multiple-choice", question: "Which regional German greeting is used in Bavaria (southern Germany)?", questionGerman: "Welcher regionale Gruß wird in Bayern verwendet?", options: ["Grüß Gott", "Moin", "Tach", "Ahoi"], correctAnswer: "Grüß Gott", explanation: "Germany has regional greetings! Grüß Gott (Bavaria/Austria), Moin (North), Servus (Austria). At A1 level, stick with Hallo/Guten Tag — universally understood.", xpReward: 10 },
        { id: "ex1-3-7", type: "ordering", question: "Put these greetings in order from morning to night:", questionGerman: "Bringen Sie die Grüße in die richtige Reihenfolge (Morgen bis Nacht):", options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Guten Tag"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"], xpReward: 20 },
        { id: "ex1-3-8", type: "multiple-choice", question: "You walk into a small local bakery. What is the expected polite greeting?", questionGerman: "Sie gehen in eine kleine Bäckerei. Wie grüßen Sie?", options: ["Guten Tag", "Tschüss", "Gute Nacht", "Mahnzeit"], correctAnswer: "Guten Tag", explanation: "In Germany, when entering small shops, bakeries, or doctors' offices, it is polite and expected to say 'Guten Tag' or 'Hallo' to everyone, not just the staff. It's part of being 'höflich' (polite).", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab1-3-1", german: "Hallo", english: "Hello", malayalam: "ഹലോ", pronunciation: "hah-loh", example: "Hallo, wie geht's?", exampleTranslation: "Hello, how are you?" },
        { id: "vocab1-3-2", german: "Guten Morgen", english: "Good morning", malayalam: "സുപ്രഭാതം", pronunciation: "goo-ten mor-gen", example: "Guten Morgen, Herr Müller!", exampleTranslation: "Good morning, Mr. Müller!" },
        { id: "vocab1-3-3", german: "Guten Tag", english: "Good day", malayalam: "നല്ല ദിവസം", pronunciation: "goo-ten tahk", example: "Guten Tag, kann ich Ihnen helfen?", exampleTranslation: "Good day, can I help you?" },
        { id: "vocab1-3-4", german: "Guten Abend", english: "Good evening", malayalam: "ശുഭ സന്ധ്യ", pronunciation: "goo-ten ah-bent", example: "Guten Abend, willkommen!", exampleTranslation: "Good evening, welcome!" },
        { id: "vocab1-3-5", german: "Gute Nacht", english: "Good night", malayalam: "ശുഭ രാത്രി", pronunciation: "goo-te nakht", example: "Gute Nacht, schlaf gut!", exampleTranslation: "Good night, sleep well!" },
        { id: "vocab1-3-6", german: "Sie", english: "You (formal)", malayalam: "നിങ്ങൾ (ബഹുമാനം)", pronunciation: "zee", example: "Wie heißen Sie?", exampleTranslation: "What is your name? (formal)" },
        { id: "vocab1-3-7", german: "du", english: "You (informal)", malayalam: "നീ", pronunciation: "doo", example: "Wie heißt du?", exampleTranslation: "What is your name? (informal)" },
        { id: "vocab1-3-8", german: "Grüß Gott", english: "Hello (Bavarian/Austrian)", malayalam: "ഹലോ (ബവേറിയൻ)", pronunciation: "grüss got", example: "Grüß Gott, Frau Schmidt!", exampleTranslation: "Hello, Mrs. Schmidt! (Bavarian style)" },
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
          name: "Berlin Hostel Lobby",
          sceneType: "cafe",
          timeOfDay: "evening",
          description: "Last evening at the Berlin hostel. Your new friends are gathered in the lobby. Tomorrow everyone leaves. Time to say goodbye properly.",
        },
        narrative: {
          previousRecap: "You mastered greetings and had your first German conversations. Now comes the harder part — saying goodbye without being awkward!",
          currentObjective: "Learn to say goodbye properly",
          nextTeaser: "Next: your first full German conversation — putting EVERYTHING together!",
        },
        kuttanIntro: [
          "Machane! Hostel lobby-il last evening aanu — ninte new friends okke naalae povum. Goodbye parayan padikkaam, but ivide vivaravum manners-um important aanu!",
          "Germans-nu goodbye oru art aanu! 'Tschüss' casual-aanu, 'Auf Wiedersehen' formal — wrong one use cheythaal awkward aakum!",
          "Plus, 'Danke' and 'Bitte' — ee randu words illathe Germany-il survive cheyyaan pattilla. Let's learn the polite way!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-4-1", encounterMoment: "The hostel receptionist says formally: 'Auf Wiedersehen! Gute Reise!' as an older guest checks out. You notice this is the formal goodbye.", contextSentence: "Auf Wiedersehen, bis Montag!" },
          { vocabId: "vocab1-4-2", encounterMoment: "Lisa waves casually to a friend leaving: 'Tschüss! Mach's gut!' — the easy, friendly goodbye you'll use with everyone your age.", contextSentence: "Tschüss, mach's gut!" },
          { vocabId: "vocab1-4-3", encounterMoment: "Marco hands you a Berlin fridge magnet as a gift. 'Danke!' you say instinctively. The magic word works in every language!", contextSentence: "Danke für die Hilfe!" },
          { vocabId: "vocab1-4-4", encounterMoment: "You pass the salt to Yuki at dinner. 'Bitte!' you say, handing it over. She grins — you used it like a real German!", contextSentence: "Kann ich bitte einen Kaffee haben?" },
          { vocabId: "vocab1-4-5", encounterMoment: "You accidentally bump into someone's chair getting up. 'Entschuldigung!' flies out of your mouth. The person smiles — no harm done.", contextSentence: "Entschuldigung, wo ist der Bahnhof?" },
          { vocabId: "vocab1-4-6", encounterMoment: "Lisa helped you book your train ticket online. You feel extra grateful: 'Vielen Dank, Lisa!' — the upgraded version of thanks.", contextSentence: "Vielen Dank für alles!" },
        ],
        decisionPoints: [
          {
            moment: "It's 11 PM. Lisa yawns and says she's heading to bed. Marco is staying up. How do you say goodbye to each?",
            options: [
              { text: "'Gute Nacht, Lisa!' to Lisa, 'Tschüss, bis morgen!' to Marco", isCorrect: true, response: "Lisa smiles: 'Gute Nacht! Schlaf gut!' Marco gives you a fist bump: 'Bis morgen, Freund!' You nailed both levels perfectly.", kuttanReaction: "Perfect machane! 'Gute Nacht' for someone going to SLEEP, 'Tschüss' for someone staying up — context is everything! 🌙" },
              { text: "'Tschüss!' to both of them", isCorrect: false, response: "Lisa gives a small laugh: 'Nicht Tschüss — ich gehe schlafen! Sag Gute Nacht!' She's going to BED, not just leaving the room.", kuttanReaction: "Almost machane! Bedtime-nu 'Gute Nacht' aanu correct — 'Tschüss' is for people just leaving. Small difference, big impact! 😊" },
              { text: "'Auf Wiedersehen' to both", isCorrect: false, response: "Marco chuckles: 'So formal! Wir sind doch Freunde!' — you're friends now, no need for the stiff goodbye.", kuttanReaction: "Enthaa machane, exam hall-il aano? Friends-odu 'Auf Wiedersehen' venda — 'Tschüss' mathiyaakum! Relax! 😂" },
            ],
          },
          {
            moment: "The next morning, you check out. The receptionist hands you your deposit back. What's the polite exchange?",
            options: [
              { text: "'Vielen Dank! Auf Wiedersehen!' and smile", isCorrect: true, response: "The receptionist beams: 'Gern geschehen! Einen schönen Tag noch!' — you just had a perfect German polite exchange!", kuttanReaction: "Wunderbar! 'Vielen Dank' + 'Auf Wiedersehen' = professional AND warm! Receptionist impressed aanu! ✨" },
              { text: "Just take the money and walk out", isCorrect: false, response: "The receptionist looks a bit disappointed. In Germany, not saying 'Danke' when receiving something is considered quite rude.", kuttanReaction: "Aiyyo! Germany-il 'Danke' parayaathe poyaal rude aanu machane! Always say thanks — it costs nothing! 😬" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-4-1",
          title: "Saying Goodbye & Being Polite",
          duration: "10:45",
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
        { id: "ex1-4-1", type: "multiple-choice", question: "Which phrase is used specifically for goodbyes on the PHONE?", questionGerman: "Welche Phrase nutzt man speziell für Verabschiedungen am TELEFON?", options: ["Auf Wiedersehen", "Auf Wiederhören", "Tschüss", "Gute Nacht"], correctAnswer: "Auf Wiederhören", explanation: "Sehen = to see, Hören = to hear. On the phone, you don't see them, you hear them! 'Auf Wiederhören' shows you have great German telephone habits.", xpReward: 10 },
        { id: "ex1-4-2", type: "multiple-choice", question: "You bumped into someone accidentally at the train station. What do you say?", questionGerman: "Sie sind am Bahnhof gegen jemanden gestoßen. Was sagen Sie?", options: ["Entschuldigung!", "Bitte!", "Guten Tag!", "Kein Problem!"], correctAnswer: "Entschuldigung!", explanation: "Use 'Entschuldigung' for small interruptions or accidental bumps. It works just like 'Excuse me' or 'Sorry'.", xpReward: 10 },
        { id: "ex1-4-3", type: "fill-blank", question: "Complete the checkout phrase: Einen _____ Tag noch!", questionGerman: "Ergänzen Sie den Kassenspruch: Einen _____ Tag noch!", options: ["schönen", "guten", "bitte", "danke"], correctAnswer: "schönen", explanation: "'Einen schönen Tag noch!' (Have a nice day) is the pro way to leave a shop or supermarket.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab1-4-1", german: "Auf Wiedersehen", english: "Goodbye (formal)", malayalam: "വിട (ഔപചാരികം)", pronunciation: "owf vee-der-zey-en", example: "Auf Wiedersehen, bis Montag!", exampleTranslation: "Goodbye, see you Monday!" },
        { id: "vocab1-4-2", german: "Tschüss", english: "Bye (casual)", malayalam: "ബൈ", pronunciation: "chüss", example: "Tschüss, mach's gut!", exampleTranslation: "Bye, take care!" },
        { id: "vocab1-4-3", german: "Danke", english: "Thank you", malayalam: "നന്ദി", pronunciation: "dahn-ke", example: "Danke für die Hilfe!", exampleTranslation: "Thank you for the help!" },
        { id: "vocab1-4-4", german: "Bitte", english: "Please / You're welcome", malayalam: "ദയവായി / ഒന്നുമില്ല", pronunciation: "bit-te", example: "Kann ich bitte einen Kaffee haben?", exampleTranslation: "Can I please have a coffee?" },
        { id: "vocab1-4-5", german: "Entschuldigung", english: "Excuse me / Sorry", malayalam: "ക്ഷമിക്കണം", pronunciation: "ent-shool-di-goong", example: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Excuse me, where is the train station!" },
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
      description: "Put it all together! Practice your first complete German conversation. Imagine you just landed at Frankfurt Airport and need to talk to people — let's get you ready!",
      duration: "30 min",
      xpReward: 200,
      storyScene: {
        setting: {
          name: "Café Einstein, Berlin",
          sceneType: "cafe",
          timeOfDay: "afternoon",
          description: "A cozy Berlin café. Fresh coffee, a friendly face at the next table. Time for your first real German conversation.",
        },
        narrative: {
          previousRecap: "You learned to greet people and say goodbye. Now let's put it ALL together in a real conversation!",
          currentObjective: "Have your first full conversation in German",
          nextTeaser: "Next: mastering the formal vs informal balance — crucial for work and daily life...",
        },
        kuttanIntro: [
          "Machane! Café-il keraam! Ivide oru conversation nadakkaan pokkunnu — nee ready aano?!",
          "Ithaa nammude first German conversation! Café Einstein-il aaanu nammal. Coffee order cheyyaam, aarenkilum parichayapedaam!",
          "Berlin café life start aakkaaam! Ee café-il nee someone-ne parichayapedaan pokkunnu. Let's go!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-5-1", encounterMoment: "The café owner approaches your table formally: 'Guten Tag! Wie geht es Ihnen?' — the polite version.", contextSentence: "Guten Tag, wie geht es Ihnen?" },
          { vocabId: "vocab1-5-2", encounterMoment: "A student at the next table leans over casually: 'Hey! Wie geht's?' — the friendly version.", contextSentence: "Hey, wie geht's?" },
          { vocabId: "vocab1-5-3", encounterMoment: "You respond naturally: 'Gut, danke!' The student smiles — you nailed it!", contextSentence: "Mir geht es gut, danke!" },
          { vocabId: "vocab1-5-7", encounterMoment: "Time to introduce yourself! 'Ich bin...' — say your name with confidence.", contextSentence: "Ich bin Rahul aus Kerala." },
          { vocabId: "vocab1-5-9", encounterMoment: "The student asks: 'Wie heißt du?' — your chance to respond!", contextSentence: "Hallo! Wie heißt du?" },
          { vocabId: "vocab1-5-10", encounterMoment: "You answer smoothly: 'Ich heiße...' — your first self-introduction in German!", contextSentence: "Ich heiße Maria." },
          { vocabId: "vocab1-5-6", encounterMoment: "The waiter brings your coffee. You hand over money: 'Hier, bitte!'", contextSentence: "Hier, bitte — mein Pass." },
        ],
        decisionPoints: [
          {
            moment: "The student says 'Ich bin Lisa! Woher kommst du?' (Where do you come from?) How do you answer?",
            options: [
              { text: "Ich komme aus Indien — aus Kerala!", isCorrect: true, response: "Lisa's eyes light up! 'Kerala! Ich liebe indisches Essen!' The conversation flows naturally!", kuttanReaction: "Adipoli machane! Perfect answer! She loves Indian food — nee already making friends! 🎉" },
              { text: "India.", isCorrect: false, response: "Lisa nods but waits for more. A one-word answer doesn't keep the conversation going!", kuttanReaction: "Ath sheriyaa but try a full sentence machane! 'Ich komme aus...' enna parayan padikk! Conversation is about sharing! 💬" },
            ],
          },
          {
            moment: "The café owner approaches: 'Noch etwas?' (Anything else?) You want to order an Apfelschorle. What do you say?",
            options: [
              { text: "Eine Apfelschorle, bitte!", isCorrect: true, response: "The owner smiles: 'Kommt sofort!' (Coming right away!) You just ordered like a local!", kuttanReaction: "WUNDERBAR! '[Item], bitte' — ee formula arinjaal Germany survive cheyyaam! 🍹" },
              { text: "Apfelschorle.", isCorrect: false, response: "The owner nods but seems to expect a 'bitte'. In Germany, 'bitte' is the magic word!", kuttanReaction: "Almost! Just add 'bitte' at the end machane. 'Bitte' is like our 'please' — Germans expect it! 😊" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-5-1",
          title: "Putting It Together - Your First German Chat",
          duration: "10:00",
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
        { id: "ex1-5-2", type: "free-text", question: "Someone says: 'Guten Tag! Wie heißen Sie?' Write your reply in German (e.g., 'Ich heiße...'):", questionGerman: "Jemand sagt: 'Guten Tag! Wie heißen Sie?' Antworten Sie auf Deutsch:", correctAnswer: "Ich heiße", explanation: "Start your reply with 'Ich heiße' followed by your name.", xpReward: 25 },
        { id: "ex1-5-3", type: "fill-blank", question: "Complete: Wie geht es _____? (formal 'you')", questionGerman: "Ergänzen Sie: Wie geht es _____? (formell)", options: ["Ihnen", "dir", "du", "Sie"], correctAnswer: "Ihnen", explanation: "Formal: 'Wie geht es Ihnen?' (Ihnen = formal you). Informal: 'Wie geht es dir?' (dir = informal you). Just memorize these as fixed phrases for now.", xpReward: 10 },
        { id: "ex1-5-4", type: "dictation", question: "Listen and type what you hear: (Imagine audio says 'Guten Tag')", questionGerman: "Hören Sie und tippen Sie, was Sie hören:", audioUrl: "/audio/hoeren/t1-h1-4.mp3", correctAnswer: "Guten Tag", explanation: "Spelling matters! Ensure nouns are capitalized.", xpReward: 30 },
        { id: "ex1-5-5", type: "matching", question: "Match the formal question to the informal version:", questionGerman: "Ordnen Sie die formelle Frage der informellen zu:", options: ["Wie geht es Ihnen?", "Wie heißen Sie?", "Und Ihnen?"], correctAnswer: ["Wie geht's dir?", "Wie heißt du?", "Und dir?"], explanation: "The formal 'Ihnen/Sie' changes to informal 'dir/du' among friends and peers. Matching these pairs is crucial for A1 communication.", xpReward: 15 },
        { id: "ex1-5-6", type: "ordering", question: "Put this café order in the correct sequence:", questionGerman: "Bringen Sie die Bestellung im Café in die richtige Reihenfolge:", options: ["Danke schön!", "Bitte schön! Zwei Euro fünfzig.", "Guten Tag! Einen Kaffee, bitte.", "Klein, bitte.", "Groß oder klein?"], correctAnswer: ["Guten Tag! Einen Kaffee, bitte.", "Groß oder klein?", "Klein, bitte.", "Bitte schön! Zwei Euro fünfzig.", "Danke schön!"], explanation: "A typical ordering flow: Greeting & Order → Request for size → Choosing size → Payment → Saying thanks. Essential for daily life!", xpReward: 20 },
        { id: "ex1-5-7", type: "image-prompt", question: "What is this popular German drink (Apple juice + Sparkling water)? Tip: It ends with '-schorle'.", questionGerman: "Wie heißt dieses beliebte deutsche Getränk (Apfelsaft + Sprudel)?", imageUrl: "/images/apfelschorle.png", correctAnswer: "Apfelschorle", explanation: "Apfelschorle is the unofficial national drink of Germany! It's healthier than soda and perfect for a 'Durstlöscher' (thirst quencher). You'll see it everywhere!", xpReward: 25 },
        { id: "ex1-5-8", type: "fill-blank", question: "Someone introduces themselves: 'Hallo! Ich bin Anna. Und _____?'", questionGerman: "Jemand stellt sich vor: 'Hallo! Ich bin Anna. Und _____?'", options: ["du", "Sie", "ich", "wir"], correctAnswer: "du", explanation: "Context clue: 'Hallo' + first name = informal setting, so use 'du'. If they'd said 'Guten Tag, ich bin Frau Schmidt', you'd use 'Sie'.", xpReward: 10 },
        { id: "ex1-5-9", type: "free-text", question: "You're at a restaurant. How do you politely order an Apfelschorle?", questionGerman: "Sie sind im Restaurant. Bestellen Sie höflich eine Apfelschorle:", correctAnswer: "Eine Apfelschorle, bitte", explanation: "The magic formula: '[Item name], bitte'. Simple, polite, and works 100% of the time in Germany!", xpReward: 25 }
      ],
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
      duration: "45 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Ausländerbehörde, Berlin",
          sceneType: "office",
          timeOfDay: "morning",
          description: "Ausländerbehörde, Berlin. Your ticket says A-251. The display reads A-247. This is NOT the place for casual German.",
        },
        narrative: {
          previousRecap: "You survived greetings, goodbyes, and your first conversations. Now it's time for the real test — formal German in an official setting!",
          currentObjective: "Master formal German for official situations",
          nextTeaser: "Module 1 complete! Next module: introducing yourself properly — name, age, country, and more!",
        },
        kuttanIntro: [
          "Machane! Ausländerbehörde — ee word thanne scary aanu, but this is THE most important office for any foreigner in Germany. Calm aayirikkeda!",
          "Ivide EVERYTHING formal aanu. 'Du' use cheythaal officer kalikku varum! 'Sie' mathram — like nammude 'Ningal' or 'Saar' basically.",
          "Herr, Frau, Sie, Ihnen — ivide ee words ninte best friends aanu. Let me show you how to survive this place!",
        ],
        vocabEncounters: [
          { vocabId: "vocab1-6-1", encounterMoment: "The display shows: 'Herr Kumar — Zimmer 3.' They call men 'Herr' + last name. You stand up nervously.", contextSentence: "Guten Tag, Herr Schmidt!" },
          { vocabId: "vocab1-6-2", encounterMoment: "A woman ahead of you is called: 'Frau Meier, bitte!' — the formal address for women. No first names here, ever.", contextSentence: "Frau Meier, können Sie mir helfen?" },
          { vocabId: "vocab1-6-3", encounterMoment: "A sign on the wall reads: 'Bitte bleiben Sie formell.' Please remain formal. Even the signs remind you this isn't a café!", contextSentence: "Die Sprache ist sehr formell." },
          { vocabId: "vocab1-6-4", encounterMoment: "Two students in the waiting room chat casually using 'du' with each other. But the moment their number is called, they switch to 'Sie' mode. Informell outside, formell inside.", contextSentence: "Unter Freunden ist es informell." },
          { vocabId: "vocab1-6-5", encounterMoment: "The officer nods approvingly when you say 'Guten Tag, könnten Sie mir bitte helfen?' Being höflich (polite) gets you faster service here.", contextSentence: "Sei immer höflich!" },
          { vocabId: "vocab1-6-6", encounterMoment: "A frustrated man shouts at the counter. The officer's face turns cold: 'Das ist unhöflich.' Being rude here can delay your visa by weeks.", contextSentence: "Das war unhöflich." },
        ],
        decisionPoints: [
          {
            moment: "You enter Zimmer 3. The officer behind the desk looks up. It's 9:30 AM. How do you greet them?",
            options: [
              { text: "Guten Morgen! Ich bin Herr Kumar. Ich habe einen Termin.", isCorrect: true, response: "The officer's stern face softens slightly. 'Guten Morgen, Herr Kumar. Bitte setzen Sie sich.' A perfect formal opening!", kuttanReaction: "PERFECT machane! 'Guten Morgen' + 'Herr' + last name + purpose = official greeting gold standard! Officer impressed aanu! 💯" },
              { text: "Hallo! Ich bin Rahul. Wie geht's?", isCorrect: false, response: "The officer raises an eyebrow. 'Guten Morgen... Herr...?' They wait for your last name. Too casual for this setting!", kuttanReaction: "Aiyyo machane! Government office-il 'Hallo' and first name? That's like calling Collector-ne 'machane'! Sie + Herr/Frau use cheyyeda! 😬" },
              { text: "Hey! Ich brauche mein Visum.", isCorrect: false, response: "The officer frowns deeply. 'Bitte sprechen Sie formell.' You just made this appointment twice as difficult.", kuttanReaction: "Enthayaalum machane! 'Hey' is for friends, NOT for the Ausländerbehörde! Formal aayille — ninte visa delay aakum! 🚫" },
            ],
          },
          {
            moment: "Your application is processed. The officer says: 'Alles in Ordnung, Herr Kumar. Ihr Visum kommt in zwei Wochen.' How do you respond and leave?",
            options: [
              { text: "Vielen Dank! Auf Wiedersehen!", isCorrect: true, response: "The officer nods respectfully: 'Auf Wiedersehen, Herr Kumar. Einen schönen Tag noch.' You walk out with your head held high — you survived the Ausländerbehörde!", kuttanReaction: "Adipoli machane! 'Vielen Dank' + 'Auf Wiedersehen' = perfect formal exit! Nee already Germany-il survive cheyyum! 🇩🇪" },
              { text: "Danke, tschüss!", isCorrect: false, response: "The officer's lip twitches. It works, but 'Tschüss' in a government office is like wearing lungi to a wedding — technically fine, but not ideal.", kuttanReaction: "Paravaala machane, but 'Auf Wiedersehen' aanu ivide better. 'Tschüss' is too casual for office setting! Level up cheyyeda! 😊" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v1-6-1",
          title: "Mastering Sie and Du in Real Life",
          duration: "10:00",
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
        },
        {
          id: "v1-6-2",
          title: "Writing Formal vs Informal — Emails, Texts & More",
          duration: "10:00",
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
          type: "multiple-choice",
          question: "Your German colleague says 'Wir können uns duzen!' What does this mean?",
          questionGerman: "Ihr deutscher Kollege sagt: 'Wir können uns duzen!' Was bedeutet das?",
          options: ["They're offering to use the informal Du with each other", "They want you to leave", "They're asking your name", "They want to speak English instead"],
          correctAnswer: "They're offering to use the informal Du with each other",
          explanation: "'Duzen' = using Du, 'Siezen' = using Sie. The switch from Sie to Du is a mini-ceremony in German culture! The older/higher-ranking person offers it first.",
          xpReward: 10
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
          type: "multiple-choice",
          question: "If you can't type the ü character, which substitute can you use?",
          questionGerman: "Wenn Sie kein 'ü' tippen können, welchen Ersatz nutzen Sie?",
          options: ["ue", "u", "ou", "oo"],
          correctAnswer: "ue",
          explanation: "Umlaut substitution rule: ä=ae, ö=oe, ü=ue, ß=ss. Germans accept these in emails/forms. 'München' = 'Muenchen', 'Straße' = 'Strasse'.",
          xpReward: 10
        },
        {
          id: "ex1-6-9",
          type: "multiple-choice",
          question: "German is unique! Which words are ALWAYS capitalized in a sentence?",
          questionGerman: "Welche Wörter werden im Deutschen IMMER großgeschrieben?",
          options: ["Nouns (all naming words)", "Only names of people", "Only the first word", "Verbs (action words)"],
          correctAnswer: "Nouns (all naming words)",
          explanation: "In German, every single noun (Person, Table, Idea, Milk) must start with a CAPITAL letter. It makes reading easier once you get used to it! Example: 'Ich trinke Milch.' (not 'milch').",
          xpReward: 15
        },
        {
          id: "ex1-6-10",
          type: "free-text",
          question: "How do you say 'I am learning German because it is interesting' in German? (Hint: Ich lerne Deutsch, weil...)",
          correctAnswer: "Ich lerne Deutsch, weil es interessant ist.",
          explanation: "Verb-Third/End Rule! The verb 'ist' goes to the end after 'weil'. Great job with this advanced A1 pattern!",
          xpReward: 35
        }
      ],
      vocabulary: [
        { id: "vocab1-6-1", german: "Herr", english: "Mr.", malayalam: "ശ്രീ", pronunciation: "hair", example: "Guten Tag, Herr Schmidt!", exampleTranslation: "Good day, Mr. Schmidt!" },
        { id: "vocab1-6-2", german: "Frau", english: "Mrs. / Ms.", malayalam: "ശ്രീമതി", pronunciation: "frow", example: "Frau Meier, können Sie mir helfen?", exampleTranslation: "Mrs. Meier, can you help me?" },
        { id: "vocab1-6-3", german: "formell", english: "formal", malayalam: "ഔപചാരികം", pronunciation: "for-mel", example: "Die Sprache ist sehr formell.", exampleTranslation: "The language is very formal." },
        { id: "vocab1-6-4", german: "informell", english: "informal", malayalam: "അനൗപചാരികം", pronunciation: "in-for-mel", example: "Unter Freunden ist es informell.", exampleTranslation: "Among friends it is informal." },
        { id: "vocab1-6-5", german: "höflich", english: "polite", malayalam: "മര്യാദയുള്ള", pronunciation: "huf-likh", example: "Sei immer höflich!", exampleTranslation: "Always be polite!" },
        { id: "vocab1-6-6", german: "unhöflich", english: "impolite / rude", malayalam: "മര്യാദയില്ലാത്ത", pronunciation: "oon-huf-likh", example: "Das war unhöflich.", exampleTranslation: "That was rude." },
        { id: "vocab1-6-7", german: "Sehr geehrte/r", english: "Dear (formal letter)", malayalam: "ബഹുമാനപ്പെട്ട", pronunciation: "zair ge-air-te/ter", example: "Sehr geehrte Frau Müller, ...", exampleTranslation: "Dear Mrs. Müller, ..." },
        { id: "vocab1-6-8", german: "Mit freundlichen Grüßen", english: "With kind regards", malayalam: "ബഹുമാനത്തോടെ", pronunciation: "mit froynt-li-khen grü-sen", example: "Mit freundlichen Grüßen, Rahul Kumar", exampleTranslation: "With kind regards, Rahul Kumar" },
        { id: "vocab1-6-9", german: "Liebe Grüße", english: "Best wishes / Love (casual)", malayalam: "സ്നേഹത്തോടെ", pronunciation: "lee-be grü-se", example: "Liebe Grüße, Anna", exampleTranslation: "Best wishes, Anna" },
        { id: "vocab1-6-10", german: "sprechen", english: "to speak", malayalam: "സംസാരിക്കുക", pronunciation: "shpre-khen", example: "Ich spreche ein bisschen Deutsch.", exampleTranslation: "I speak a little German." }
      ]
    }
  ]
};
