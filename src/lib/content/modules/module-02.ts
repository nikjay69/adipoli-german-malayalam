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
      videos: [
        {
          id: "v2-1-1",
          title: "Ich heiße... - What's Your Name?",
          duration: "12:00",
          description: "Master introducing yourself and asking names — formal and informal, the full deal!",
          scriptOutline: [
            "Opening: 'Namaskaram machaa! Today we learn the most important thing — your NAME in German!'",
            "Two ways to ask 'What's your name?':",
            "  Wie heißt du? — informal (friends, classmates, peers)",
            "  Wie heißen Sie? — formal (boss, professor, strangers)",
            "Three ways to answer:",
            "  Ich heiße [Name] — My name is... (most common)",
            "  Mein Name ist [Name] — My name is... (more formal, written style)",
            "  Ich bin [Name] — I am... (casual, among friends)",
            "Freut mich! — Nice to meet you! (literally: 'Pleases me!')",
            "Gleichfalls! — Likewise! (when someone says Freut mich to you)",
            "Kerala names in German — pronunciation survival guide:",
            "  Akhil → Germans say 'A-kil' (they skip the aspirated 'kh')",
            "  Lakshmi → 'Lak-shmi' (they'll try their best!)",
            "  Gopinath → 'Go-pi-nat' (the 'th' becomes just 't')",
            "  Sreelakshmi → This one will be a workout for them — maybe offer a nickname!",
            "Pro tip: Spell your name slowly the first time — 'Ich heiße Arun. A-R-U-N.'",
            "The German alphabet — quick preview for spelling your name",
            "Manglish moment: 'Nammude peru parayan German-il ithra easy aanu!'",
            "Practice: Say 'Hallo! Ich heiße [your name]. Freut mich!' 5 times fast"
          ],
          keyVocabulary: ["Wie heißt du?", "Wie heißen Sie?", "Ich heiße", "Mein Name ist", "Freut mich", "Gleichfalls"],
          learningObjectives: [
            "Ask someone's name formally and informally",
            "Introduce yourself using three different patterns",
            "Respond with 'Freut mich' and 'Gleichfalls'",
            "Help Germans pronounce your Kerala name"
          ],
          placeholderThumbnail: "/images/thumbnails/name-1.jpg"
        },
        {
          id: "v2-1-2",
          title: "Spelling Your Name — The German Alphabet",
          duration: "10:00",
          description: "Learn the German alphabet so you can spell your name like a boss — no more confusion at the Ausländerbehörde!",
          scriptOutline: [
            "Opening: 'Imagine you're at a German office and they ask you to spell your name... pinne?'",
            "Why spelling matters: German offices NEED correct spelling — one wrong letter = big trouble!",
            "The German alphabet — all 26 letters + special ones:",
            "  A (ah), B (beh), C (tseh), D (deh), E (eh), F (eff)...",
            "  Tricky ones: J = 'yot', V = 'fow', W = 'veh', Y = 'üpsilon', Z = 'tset'",
            "  Special characters: Ä (ah-umlaut), Ö (oh-umlaut), Ü (uh-umlaut), ß (es-tset)",
            "Practice spelling common Kerala names letter by letter:",
            "  A-R-U-N, P-R-I-Y-A, M-E-E-R-A, A-K-H-I-L",
            "Buchstabieren — to spell: 'Können Sie das buchstabieren?' (Can you spell that?)",
            "Real-life scenario: At the Ausländerbehörde, spelling your address and name",
            "Common confusion: German 'E' sounds like English 'A', German 'I' sounds like English 'E'",
            "Manglish tip: 'Office-il chelapo spell cheyyaan paranjaal, panic aakanda — practice cheythaal mathi!'",
            "Practice: Spell your full name aloud in German right now!"
          ],
          keyVocabulary: ["buchstabieren", "der Buchstabe", "das Alphabet", "Können Sie das buchstabieren?"],
          learningObjectives: [
            "Recite the German alphabet with correct pronunciation",
            "Spell your name using German letter names",
            "Understand commonly confused letters (J, V, W, Z)",
            "Handle spelling requests at German offices"
          ],
          placeholderThumbnail: "/images/thumbnails/alphabet-1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex2-1-1",
          type: "multiple-choice",
          question: "How do you ask 'What's your name?' to your new boss?",
          options: ["Wie heißen Sie?", "Wie heißt du?", "Ich heiße...", "Wer bist du?"],
          correctAnswer: "Wie heißen Sie?",
          explanation: "The verb changes with formality: 'Wie heißT DU?' (informal, -t ending) vs 'Wie heißEN SIE?' (formal, -en ending). Boss = always Sie.",
          xpReward: 10
        },
        {
          id: "ex2-1-2",
          type: "fill-blank",
          question: "Complete: _____ heiße Priya. (My name is Priya.)",
          options: ["Ich", "Du", "Er", "Wir"],
          correctAnswer: "Ich",
          explanation: "'Ich heiße' literally means 'I am called'. Three ways to say your name: 'Ich heiße...' (standard), 'Mein Name ist...' (formal), 'Ich bin...' (casual).",
          xpReward: 10
        },
        {
          id: "ex2-1-3",
          type: "multiple-choice",
          question: "What does 'Freut mich!' mean?",
          options: ["Nice to meet you!", "Where are you from?", "What's your name?", "I'm fine, thanks"],
          correctAnswer: "Nice to meet you!",
          explanation: "'Freut mich!' literally means 'pleases me!' — said when meeting someone. The reply is 'Gleichfalls!' (likewise). This pair is your go-to for first meetings.",
          xpReward: 10
        },
        {
          id: "ex2-1-4",
          type: "matching",
          question: "Match the German phrase to its English meaning:",
          options: ["Wie heißt du?", "Mein Name ist...", "Gleichfalls!"],
          correctAnswer: ["What's your name? (informal)", "My name is...", "Likewise!"],
          xpReward: 15
        },
        {
          id: "ex2-1-5",
          type: "ordering",
          question: "Put this greeting conversation in the correct order:",
          options: ["Freut mich! Gleichfalls!", "Ich heiße Meera. Und du?", "Hallo! Wie heißt du?", "Ich bin Arun."],
          correctAnswer: ["Hallo! Wie heißt du?", "Ich heiße Meera. Und du?", "Ich bin Arun.", "Freut mich! Gleichfalls!"],
          xpReward: 20
        },
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
          question: "Which letter in the German alphabet is pronounced 'tset'?",
          options: ["Z", "C", "S", "T"],
          correctAnswer: "Z",
          explanation: "German Z = 'tset', not 'zee'! Tricky German letters: J='yot', V='fow', W='veh', Y='üpsilon', Z='tset'. These catch Indians off-guard the most.",
          xpReward: 10
        }
      ],
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
      videos: [
        {
          id: "v2-2-1",
          title: "Countries and Nationalities in German",
          duration: "12:00",
          description: "Learn how to say where you're from and what nationality you are — with the Kerala diaspora twist!",
          scriptOutline: [
            "Opening: 'Ich bin Inder — and proud! But how do we say all this in German? Let's find out!'",
            "Key phrases first:",
            "  Woher kommst du? — Where are you from? (informal)",
            "  Woher kommen Sie? — Where are you from? (formal)",
            "  Ich komme aus [Place] — I come from...",
            "Country → Nationality → Language pattern — this is gold!",
            "  Deutschland → deutsch/Deutscher/Deutsche → Deutsch",
            "  Indien → indisch/Inder/Inderin → Hindi, Malayalam, etc.",
            "  Frankreich → französisch/Franzose/Französin → Französisch",
            "  Spanien → spanisch/Spanier/Spanierin → Spanisch",
            "  England → englisch/Engländer/Engländerin → Englisch",
            "  China → chinesisch/Chinese/Chinesin → Chinesisch",
            "  Japan → japanisch/Japaner/Japanerin → Japanisch",
            "Nationality as noun: Male vs Female forms — most add '-in' for female",
            "  Inder/Inderin, Deutscher/Deutsche, Franzose/Französin",
            "CAREFUL! 'Indianer' means Native American, NOT Indian! Confusion avoid cheyyuka!",
            "Nationality as adjective: lowercase! 'Ich bin indisch' (no capital 'I'!)",
            "Kerala connection: 'Ich komme aus Kerala in Südindien' — show Kerala on map",
            "Major German cities every Malayali should know:",
            "  Berlin (capital — big Malayali community!), München (Munich — Bavaria, beer, BMW!)",
            "  Hamburg (port city, cold!), Köln (Cologne — cathedral, carnival!)",
            "  Frankfurt (financial hub — airport pinne!)",
            "Fun fact: Germany has 16 Bundesländer (states) — like India has 28!",
            "Practice: 'Ich bin Inder/Inderin. Ich komme aus Kerala in Indien.'"
          ],
          keyVocabulary: ["Indien", "indisch", "Inder", "Deutschland", "deutsch", "Frankreich", "französisch"],
          learningObjectives: [
            "Name major countries in German",
            "State your nationality correctly (noun and adjective forms)",
            "Understand the country-nationality-language pattern",
            "Know the difference between Inder and Indianer",
            "Name major German cities"
          ],
          placeholderThumbnail: "/images/thumbnails/countries-1.jpg"
        },
        {
          id: "v2-2-2",
          title: "Continents and the Grammar of 'aus'",
          duration: "10:00",
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
          placeholderThumbnail: "/images/thumbnails/continents-1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex2-2-1",
          type: "multiple-choice",
          question: "How do you say 'I am Indian' in German (male speaker)?",
          options: ["Ich bin Inder.", "Ich bin indisch.", "Ich bin Indien.", "Ich bin Indianer."],
          correctAnswer: "Ich bin Inder.",
          explanation: "CAREFUL: Inder = Indian person, Indianer = Native American! This is a common and embarrassing mistake. Male: Inder, Female: Inderin. Never say 'Indianer' about yourself!",
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
          type: "multiple-choice",
          question: "Which continent is Germany in?",
          options: ["Europa", "Asien", "Nordamerika", "Afrika"],
          correctAnswer: "Europa",
          explanation: "Deutschland liegt in Europa. Memory trick: the 7 continents in German are mostly similar to English — Europa, Asien, Afrika, Nordamerika, Südamerika, Australien, Antarktis.",
          xpReward: 10
        },
        {
          id: "ex2-2-5",
          type: "multiple-choice",
          question: "Which of these countries NEEDS an article in German?",
          options: ["die Schweiz", "Indien", "Deutschland", "Spanien"],
          correctAnswer: "die Schweiz",
          explanation: "Most countries need NO article: 'aus Indien', 'aus Deutschland'. But some always need one: die Schweiz, die Türkei, die USA, der Iran. Memorize these 4 exceptions!",
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
          xpReward: 15
        }
      ],
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
        { id: "vocab2-2-10", german: "deutsch", english: "German (adjective)", malayalam: "ജർമ്മൻ", pronunciation: "doych", example: "Ich lerne die deutsche Sprache.", exampleTranslation: "I am learning the German language." },
        { id: "vocab2-2-11", german: "die Telefonnummer", english: "phone number", malayalam: "ഫോൺ നമ്പർ", pronunciation: "dee teh-le-fohn-noo-mer", example: "Wie ist Ihre Telefonnummer?", exampleTranslation: "What is your phone number?" }
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
      videos: [
        {
          id: "v2-3-1",
          title: "Ich bin Ingenieur! — Professions in German",
          duration: "12:00",
          description: "Learn common professions and how to say what you do — with Kerala career vibes!",
          scriptOutline: [
            "Opening: 'Was machst du? Entha ninde job? Let's learn to answer this auf Deutsch!'",
            "Key pattern: 'Ich bin [profession]' — NO article needed!",
            "  English: 'I am AN engineer' vs German: 'Ich bin Ingenieur' (no 'ein'!)",
            "  This is a super common mistake — even advanced learners forget this!",
            "Two ways to ask about someone's profession:",
            "  Was machst du beruflich? — What do you do (for work)? (informal)",
            "  Was sind Sie von Beruf? — What is your profession? (formal)",
            "Common professions for Malayalis in Germany — careers that open doors!",
            "  Ingenieur/Ingenieurin — Engineer (the Malayali classic!)",
            "  Arzt/Ärztin — Doctor (many Kerala doctors in German hospitals)",
            "  Krankenpfleger/Krankenschwester — Nurse (thousands of Malayali nurses in Germany!)",
            "  Programmierer/Programmiererin — Programmer (IT boom machaa!)",
            "  Student/Studentin — Student (free education, remember?)",
            "  Lehrer/Lehrerin — Teacher",
            "  Koch/Köchin — Cook/Chef (Kerala food ambassador!)",
            "  Kellner/Kellnerin — Waiter/Waitress (common student job)",
            "  Kaufmann/Kauffrau — Businessman/Businesswoman",
            "  Wissenschaftler/Wissenschaftlerin — Scientist",
            "Male vs Female forms: Most professions add '-in' for female",
            "  But some change more: Arzt → Ärztin (umlaut!), Kaufmann → Kauffrau",
            "Kerala connect: 'Thousands of Malayali Krankenschwestern work in Germany — athinte demand verum level aanu!'",
            "Practice: 'Ich bin [your profession]. Was machst du beruflich?'"
          ],
          keyVocabulary: ["Ingenieur", "Arzt", "Krankenschwester", "Student", "Beruf", "Kaufmann", "Wissenschaftler"],
          learningObjectives: [
            "Name 10+ professions in German",
            "State your own profession correctly without an article",
            "Know male and female forms of professions",
            "Ask about someone's profession formally and informally"
          ],
          placeholderThumbnail: "/images/thumbnails/professions-1.jpg"
        },
        {
          id: "v2-3-2",
          title: "The Verb 'sein' — To Be or Not To Be!",
          duration: "12:00",
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
          placeholderThumbnail: "/images/thumbnails/sein-1.jpg"
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
          id: "ex2-3-4",
          type: "multiple-choice",
          question: "What is the female form of 'Arzt' (doctor)?",
          options: ["Ärztin", "Arztin", "Arztfrau", "Doktorin"],
          correctAnswer: "Ärztin",
          explanation: "Female professions usually add '-in': Lehrer → Lehrerin. But some also get an umlaut: Arzt → Ärztin, Koch → Köchin. Watch for these vowel changes!",
          xpReward: 10
        },
        {
          id: "ex2-3-5",
          type: "fill-blank",
          question: "Complete: Wir _____ aus Kerala. (We are from Kerala.)",
          options: ["sind", "bin", "seid", "ist"],
          correctAnswer: "sind",
          explanation: "'Wir sind' (we are) and 'sie sind' (they are) use the SAME form — 'sind'. Handy! Only ich/du/er have unique forms: bin/bist/ist.",
          xpReward: 10
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
        }
      ],
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
      videos: [
        {
          id: "v2-4-1",
          title: "Ich spreche Malayalam und Englisch!",
          duration: "12:00",
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
          placeholderThumbnail: "/images/thumbnails/languages-1.jpg"
        },
        {
          id: "v2-4-2",
          title: "Verbs That Change Vowels — Stem-Changing Verbs",
          duration: "10:00",
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
          placeholderThumbnail: "/images/thumbnails/stem-verbs-1.jpg"
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
          xpReward: 15
        },
        {
          id: "ex2-4-4",
          type: "ordering",
          question: "Order from LEAST to MOST fluent:",
          options: ["fließend", "gut", "Muttersprache", "ein bisschen"],
          correctAnswer: ["ein bisschen", "gut", "fließend", "Muttersprache"],
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
          question: "Complete: Welche Sprachen _____ du? (What languages do you speak?)",
          options: ["sprichst", "spreche", "spricht", "sprechen"],
          correctAnswer: "sprichst",
          explanation: "In questions, the verb comes first but still changes: 'Sprichst du?' not 'Sprechst du?' The stem change happens regardless of word order.",
          xpReward: 10
        },
        {
          id: "ex2-4-7",
          type: "multiple-choice",
          question: "Which of these is a stem-changing verb pattern in German?",
          options: ["e → i (like sprechen → sprichst)", "o → u (like kommen → kummst)", "i → e (like bin → best)", "a → o (like machen → mochst)"],
          correctAnswer: "e → i (like sprechen → sprichst)",
          explanation: "Three vowel-change patterns to know: e→i (sprechen→sprichst), e→ie (lesen→liest), a→ä (fahren→fährst). Only du and er/sie/es are affected — the rest stay regular!",
          xpReward: 10
        },
        {
          id: "ex2-4-8",
          type: "matching",
          question: "Match the verb to its du-form:",
          options: ["sprechen", "lesen", "fahren"],
          correctAnswer: ["du sprichst", "du liest", "du fährst"],
          xpReward: 15
        }
      ],
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
      videos: [
        {
          id: "v2-5-1",
          title: "Your Complete Self-Introduction in German",
          duration: "12:00",
          description: "Practice a full self-introduction in three real-life scenarios — airport, university, and office!",
          scriptOutline: [
            "Opening: 'Adipoli! Time to put it ALL together — name, origin, job, languages! Full introduction, German style!'",
            "The Complete Self-Introduction Template — your golden formula:",
            "  1. Greeting: 'Guten Tag!' / 'Hallo!'",
            "  2. Name: 'Ich heiße [Name].' / 'Mein Name ist [Name].'",
            "  3. Origin: 'Ich komme aus Kerala in Indien.'",
            "  4. Profession: 'Ich bin [profession].'",
            "  5. Languages: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.'",
            "  6. Closing: 'Freut mich!'",
            "Scenario 1 — Airport Arrival in Frankfurt (FORMAL — use Sie!):",
            "  Immigration officer: 'Guten Tag. Wie heißen Sie?'",
            "  You: 'Guten Tag. Ich heiße Priya Nair.'",
            "  Officer: 'Woher kommen Sie?'",
            "  You: 'Ich komme aus Indien.'",
            "  Officer: 'Was machen Sie in Deutschland?'",
            "  You: 'Ich bin Studentin. Ich studiere Informatik in München.'",
            "  Officer: 'Sprechen Sie Deutsch?'",
            "  You: 'Ein bisschen. Ich lerne noch.'",
            "  Officer: 'Willkommen in Deutschland!'",
            "Scenario 2 — University Orientation in Munich (INFORMAL — use du!):",
            "  Fellow student: 'Hi! Wie heißt du?'",
            "  You: 'Ich heiße Arun. Und du?'",
            "  Student: 'Ich bin Lisa. Woher kommst du?'",
            "  You: 'Aus Kerala in Südindien. Und du?'",
            "  Student: 'Aus Hamburg. Was studierst du?'",
            "  You: 'Informatik. Und du?'",
            "  Student: 'Medizin. Sprichst du Deutsch?'",
            "  You: 'Ein bisschen! Ich lerne noch. Aber ich spreche gut Englisch.'",
            "  Student: 'Cool! Wir können auf Englisch sprechen. Freut mich!'",
            "  You: 'Gleichfalls!'",
            "Scenario 3 — First Day at Office in Berlin (MIX of formal/informal):",
            "  Boss (formal): 'Guten Morgen! Willkommen! Stellen Sie sich bitte vor.'",
            "  You: 'Guten Morgen! Ich heiße Meera Kumar. Ich komme aus Kerala in Indien. Ich bin Ingenieurin. Ich spreche Malayalam, Englisch, Hindi und ein bisschen Deutsch. Freut mich, Sie alle kennenzulernen!'",
            "  Colleague (switches to informal): 'Cool! Ich bin Tom. Wir können uns duzen!'",
            "Key phrase: 'Stellen Sie sich vor' = 'Introduce yourself' — you'll hear this a lot!",
            "Practice tips: Record yourself giving all three introductions, practice in front of mirror",
            "Manglish motivation: 'You just learned to introduce yourself in GERMAN — sho! That's a massive achievement!'"
          ],
          keyVocabulary: ["sich vorstellen", "Stellen Sie sich vor", "Willkommen", "Ich lerne noch", "Gleichfalls"],
          learningObjectives: [
            "Deliver a complete self-introduction in German",
            "Adapt formality based on the situation (Sie vs du)",
            "Confidently answer common introductory questions",
            "Handle real-life scenarios at airports, universities, and offices"
          ],
          placeholderThumbnail: "/images/thumbnails/full-conversation-1.jpg"
        },
        {
          id: "v2-5-2",
          title: "Common Follow-Up Questions and Answers",
          duration: "10:00",
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
          placeholderThumbnail: "/images/thumbnails/followup-1.jpg"
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
          xpReward: 20
        },
        {
          id: "ex2-5-2",
          type: "multiple-choice",
          question: "At the immigration counter, the officer asks 'Was machen Sie in Deutschland?' What is he asking?",
          options: ["What are you doing in Germany?", "How are you?", "Where are you from?", "What is your name?"],
          correctAnswer: "What are you doing in Germany?",
          explanation: "'Was machen Sie in Deutschland?' literally means 'What are you doing in Germany?' — they want to know the purpose of your visit.",
          xpReward: 10
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
          type: "fill-blank",
          question: "Type in German: 'I speak a little German.' (Ich...)",
          options: ["Ich spreche ein bisschen Deutsch", "Ich spreche wenig Deutsch", "Ich kann ein bisschen Deutsch", "Ich rede ein bisschen Deutsch"],
          correctAnswer: "Ich spreche ein bisschen Deutsch",
          explanation: "'Ich spreche ein bisschen Deutsch' is the standard way to say you speak a little German. 'Ein bisschen' = a little bit.",
          xpReward: 15
        }
      ],
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
