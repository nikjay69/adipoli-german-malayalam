import type { Module } from '../types';

export const MODULE_1: Module = {
  id: 1,
  title: "Welcome to German!",
  titleGerman: "Willkommen!",
  description: "Your true beginner foundation: motivation, core sounds, greetings, and first conversation patterns. This module is designed to reduce fear, build correct pronunciation early, and prepare learners for basic A1 speaking and listening tasks.",

  icon: "👋",
  color: "#e94560",
  totalHours: 12,
  lessons: [
    // ===================== LESSON 1-1 =====================
    {
      id: "1-1",
      title: "Why Learn German?",
      titleGerman: "Warum Deutsch lernen?",
      description: "Start with motivation and practical context, but keep the real goal clear: learners should leave this lesson able to say a few core German words confidently and understand why A1 matters for real Germany pathways.",
      duration: "45 min",
      xpReward: 100,
      videos: [
        {
          id: "v1-1-1",
          title: "Why German? A Malayali's Gateway to Europe",
          duration: "10:00",
          description: "An inspiring introduction to German opportunities for Malayalis",
          scriptOutline: [
            "Opening: 'Namaskaram! Guten Tag!' - greet in both languages",
            "The German Economy: 4th largest economy, job opportunities",
            "Free Education: German universities offer free/low-cost education",
            "Kerala-Germany Connection: Thousands of Malayali nurses, IT professionals in Germany",
            "German Companies in India: Bosch, Siemens, BMW presence in Kerala/India",
            "Success Stories: Brief mention of Malayalis who made it in Germany",
            "Salary comparison: Average German salary vs Indian salary — mind = blown",
            "The language advantage: B1/B2 German = direct ticket to Ausbildung or university",
            "Cultural parallels: Germans value punctuality (unlike our 'IST - Indian Stretchable Time'!)",
            "What you'll learn in this course - overview",
            "Motivation: 'By the end of this course, you'll be able to have basic conversations!'",
            "Closing challenge: 'Tell one person today that you are learning German!'"
          ],
          keyVocabulary: ["Deutsch", "Deutschland", "lernen"],
          learningObjectives: [
            "Understand why German is valuable for career growth",
            "Know about opportunities in Germany for Indians",
            "Feel motivated to start the learning journey"
          ],
          placeholderThumbnail: "/images/thumbnails/why-german.jpg"
        },
        {
          id: "v1-1-2",
          title: "Malayalis in Germany — Real Success Stories",
          duration: "10:00",
          description: "Hear how real Malayalis built their careers in Germany — nurses, engineers, and students who made it big",
          scriptOutline: [
            "Opening: 'Nammude aalukal Germany-il entha cheyyunne? Ella field-ilum und!'",
            "Nursing boom: How thousands of Kerala nurses found better pay and work-life balance",
            "IT sector: Malayali software engineers at SAP, Siemens, and German startups",
            "Student stories: Free university education — TU Munich, RWTH Aachen, etc.",
            "Ausbildung path: Vocational training that pays YOU while you learn",
            "The numbers: 20,000+ Indians move to Germany every year — and growing",
            "Visa types: Blue Card, Student Visa, Job Seeker Visa — options galore",
            "Quality of life: Healthcare, public transport, 30 days vacation (yes, THIRTY!)",
            "Language requirement reality check: A1 for family reunion, B1 for citizenship, B2 for most jobs",
            "Kerala foods in Germany: Yes, you CAN get Malabar parotta in Berlin and Munich!",
            "Motivational close: 'Ingane oru opportunity vere evideyum illa — let's grab it!'"
          ],
          keyVocabulary: ["Arbeit", "Studium", "Ausbildung", "Visum"],
          learningObjectives: [
            "Know the different career paths available in Germany",
            "Understand visa and language level requirements",
            "Feel inspired by real Malayali success stories"
          ],
          placeholderThumbnail: "/images/thumbnails/malayalis-germany.jpg"
        }
      ],
      exercises: [
        { id: "ex1-1-1", type: "multiple-choice", question: "What is the main advantage of studying in Germany?", options: ["Free or very low tuition fees", "Always sunny weather", "No need to learn German", "Shorter courses"], correctAnswer: "Free or very low tuition fees", explanation: "Germany offers free or very low tuition fees at public universities, making it attractive for international students.", xpReward: 10 },
        { id: "ex1-1-2", type: "multiple-choice", question: "Which German companies have presence in India?", options: ["Bosch, Siemens, BMW", "Toyota, Sony, Samsung", "Apple, Google, Microsoft", "Tata, Reliance, Infosys"], correctAnswer: "Bosch, Siemens, BMW", explanation: "Many German companies like Bosch, Siemens, and BMW have significant operations in India.", xpReward: 10 },
        { id: "ex1-1-3", type: "fill-blank", question: "Complete: Ich lerne _____ (I am learning German)", options: ["Deutsch", "Deutschland", "Englisch", "Hindi"], correctAnswer: "Deutsch", explanation: "'Deutsch' means the German language. 'Deutschland' means the country Germany.", xpReward: 10 },
        { id: "ex1-1-4", type: "multiple-choice", question: "What German language level is typically needed for university admission?", options: ["B2 or C1", "A1", "Native level only", "No German needed"], correctAnswer: "B2 or C1", explanation: "Most German universities require B2 or C1 level, proven through TestDaF or DSH exams.", xpReward: 10 },
        { id: "ex1-1-5", type: "matching", question: "Match the German word to its English meaning:", options: ["Deutsch", "Deutschland", "lernen", "Arbeit"], correctAnswer: ["German (language)", "Germany", "to learn", "work"], xpReward: 15 },
        { id: "ex1-1-6", type: "multiple-choice", question: "What is 'Ausbildung' in Germany?", options: ["Vocational training where you earn while learning", "A type of German food", "A university degree", "A tourist visa"], correctAnswer: "Vocational training where you earn while learning", explanation: "Ausbildung is Germany's dual vocational training system where you work and study simultaneously — and get paid for it!", xpReward: 10 },
        { id: "ex1-1-7", type: "ordering", question: "Order these German language levels from beginner to advanced:", options: ["B1", "A1", "C1", "A2", "B2"], correctAnswer: ["A1", "A2", "B1", "B2", "C1"], xpReward: 20 },
        { id: "ex1-1-8", type: "multiple-choice", question: "How many days of paid vacation do German employees typically get per year?", options: ["Around 30 days", "Around 10 days", "Around 5 days", "No paid vacation"], correctAnswer: "Around 30 days", explanation: "Germany mandates a minimum of 20 vacation days, and most employers offer 28-30. That's Kerala's Onam + Christmas + every other festival combined — and more!", xpReward: 10 }
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
        { id: "vocab1-1-10", german: "Chance", english: "opportunity / chance", malayalam: "അവസരം", pronunciation: "shahn-se", example: "Das ist eine gute Chance!", exampleTranslation: "That is a good opportunity!" }
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
      videos: [
        {
          id: "v1-2-1",
          title: "You Already Know Some German Sounds!",
          duration: "10:00",
          description: "Malayalam sounds that match German - you're already ahead!",
          scriptOutline: [
            "Introduction: 'Good news - you already know many German sounds!'",
            "The 'ch' in 'ich' - similar to Malayalam ച sound",
            "German 'r' - similar to Malayalam ര (not English R)",
            "Hard consonants: k, t, p - same as Malayalam ക, ട, പ",
            "The 'sch' sound = Malayalam ശ/ഷ — you already say this!",
            "German 'w' sounds like English 'v' — think 'Wasser' = 'Vasser'",
            "German 'v' sounds like English 'f' — think 'Vater' = 'Fahter'",
            "The 'z' in German = 'ts' sound — like 'pizza' without the 'pi'",
            "Practice words: ich, machen, Kuchen",
            "Comparison exercise: Say Malayalam word, then German word",
            "Common mistakes Indians make (and how to avoid them)",
            "Tongue twisters: 'Fischers Fritz fischt frische Fische' — try it!"
          ],
          keyVocabulary: ["ich", "machen", "Kuchen"],
          learningObjectives: [
            "Recognize German sounds similar to Malayalam",
            "Pronounce basic German words correctly",
            "Build confidence in German pronunciation"
          ],
          placeholderThumbnail: "/images/thumbnails/sounds-1.jpg"
        },
        {
          id: "v1-2-2",
          title: "The Special German Sounds",
          duration: "10:00",
          description: "Master the Umlauts and other unique German sounds",
          scriptOutline: [
            "The Umlauts: ä, ö, ü - what they are",
            "ä - like 'e' in 'bed' but longer",
            "ö - round your lips like 'o', say 'e' (like Malayalam ഓ + എ mixed)",
            "ü - round your lips like 'u', say 'i'",
            "Practice ö: Think of it like saying 'e' through a straw — lips round, tongue forward",
            "Practice ü: Whistle position + 'ee' sound = perfect ü",
            "The ß (Eszett) - just a long 's' sound",
            "The 'ch' sounds - ich-Laut vs ach-Laut",
            "ich-Laut (after e, i, ä, ö, ü, consonants): soft, like a cat hissing gently",
            "ach-Laut (after a, o, u, au): deeper, like you're clearing your throat after Malabar biryani",
            "Practice: Mädchen, schön, München, Straße",
            "The 'ei' vs 'ie' trap: 'ei' = 'eye', 'ie' = 'ee' — NEVER mix them up!",
            "Tips for practicing at home: Record yourself, listen back, compare"
          ],
          keyVocabulary: ["Mädchen", "schön", "München", "Straße"],
          learningObjectives: [
            "Pronounce German Umlauts correctly",
            "Understand when to use different 'ch' sounds",
            "Know what ß represents"
          ],
          placeholderThumbnail: "/images/thumbnails/sounds-2.jpg"
        }
      ],
      exercises: [
        { id: "ex1-2-1", type: "multiple-choice", question: "Which Malayalam sound is similar to German 'ch' in 'ich'?", options: ["ച", "ക", "ഹ", "ശ"], correctAnswer: "ച", explanation: "The German 'ch' in 'ich' is similar to the Malayalam ച sound.", xpReward: 10 },
        { id: "ex1-2-2", type: "multiple-choice", question: "What is the ß called in German?", options: ["Eszett", "Umlaut", "Doppel-S", "Scharfes B"], correctAnswer: "Eszett", explanation: "ß is called Eszett (or sometimes Scharfes S). It represents a long 's' sound.", xpReward: 10 },
        { id: "ex1-2-3", type: "matching", question: "Match the German letter to its sound description:", options: ["ä", "ö", "ü"], correctAnswer: ["Like 'e' in bed", "Lips like 'o', say 'e'", "Lips like 'u', say 'i'"], xpReward: 15 },
        { id: "ex1-2-4", type: "fill-blank", question: "The German word 'Sch___n' means 'beautiful'. Fill in the missing umlaut.", options: ["ö", "ä", "ü", "o"], correctAnswer: "ö", explanation: "'Schön' means beautiful. The ö umlaut gives it that unique rounded sound.", xpReward: 10 },
        { id: "ex1-2-5", type: "multiple-choice", question: "How is the German 'w' pronounced?", options: ["Like English 'v'", "Like English 'w'", "Like English 'f'", "It is silent"], correctAnswer: "Like English 'v'", explanation: "German 'w' = English 'v'. So 'Wasser' (water) is pronounced 'Vasser'.", xpReward: 10 },
        { id: "ex1-2-6", type: "matching", question: "Match the German word to its correct pronunciation:", options: ["Wasser", "Vater", "Zeit", "schön"], correctAnswer: ["Vasser", "Fahter", "Tsyte", "Shurn"], xpReward: 15 },
        { id: "ex1-2-7", type: "multiple-choice", question: "In the word 'Bier' (beer), how is 'ie' pronounced?", options: ["Like 'ee' in 'see'", "Like 'eye'", "Like 'ay'", "It is silent"], correctAnswer: "Like 'ee' in 'see'", explanation: "German 'ie' always sounds like 'ee'. Remember: 'ie' = 'ee', 'ei' = 'eye'. The second letter tells you the sound!", xpReward: 10 },
        { id: "ex1-2-8", type: "ordering", question: "Order these German sounds from most similar to Malayalam to most unique:", options: ["ü (no Malayalam equivalent)", "r (similar to Malayalam ര)", "k (same as Malayalam ക)", "ö (no Malayalam equivalent)"], correctAnswer: ["k (same as Malayalam ക)", "r (similar to Malayalam ര)", "ö (no Malayalam equivalent)", "ü (no Malayalam equivalent)"], xpReward: 20 }
      ],
      vocabulary: [
        { id: "vocab1-2-1", german: "ich", english: "I", malayalam: "ഞാൻ", pronunciation: "ikh (soft ch)", example: "Ich bin hier.", exampleTranslation: "I am here." },
        { id: "vocab1-2-2", german: "Mädchen", english: "girl", malayalam: "പെൺകുട്ടി", pronunciation: "med-khen", example: "Das Mädchen spielt.", exampleTranslation: "The girl is playing." },
        { id: "vocab1-2-3", german: "schön", english: "beautiful", malayalam: "സുന്ദരം", pronunciation: "shurn", example: "Das ist schön!", exampleTranslation: "That is beautiful!" },
        { id: "vocab1-2-4", german: "München", english: "Munich", malayalam: "മ്യൂണിക്ക്", pronunciation: "myn-khen", example: "München ist groß.", exampleTranslation: "Munich is big." },
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
      videos: [
        {
          id: "v1-3-1",
          title: "Saying Hello the German Way",
          duration: "10:00",
          description: "Master all the German greetings for different times of day",
          scriptOutline: [
            "Opening: Start with 'Namaskaram... or should I say, Guten Tag!'",
            "Hallo! - The casual hello (like 'Hi' or 'Hei')",
            "Guten Morgen! - Good morning (like 'Suprabhatham'!)",
            "Guten Tag! - Good day (formal, used until evening)",
            "Guten Abend! - Good evening",
            "Gute Nacht! - Good night (only when going to sleep)",
            "Regional variations: Grüß Gott (Bavaria), Moin (North), Servus (Austria)",
            "Practice scenarios: Meeting boss vs meeting friend",
            "The handshake: Germans shake hands A LOT — firm grip, eye contact",
            "Kerala parallel: Like how we say 'Enna vishesham' vs 'Namasthe'",
            "Body language: Germans nod, don't do the Indian head wobble!",
            "Quick practice: Say each greeting 3 times with correct pronunciation"
          ],
          keyVocabulary: ["Hallo", "Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"],
          learningObjectives: [
            "Greet people appropriately at different times",
            "Know when to use formal vs informal greetings",
            "Pronounce greetings correctly"
          ],
          placeholderThumbnail: "/images/thumbnails/greetings-1.jpg"
        },
        {
          id: "v1-3-2",
          title: "Formal vs Informal - Like 'Ningal' vs 'Nee'",
          duration: "10:00",
          description: "Understanding Sie vs Du - the German respect system",
          scriptOutline: [
            "Introduction: Germans also have formal/informal like Malayalam!",
            "Sie - formal 'you' (like Malayalam 'Ningal/Thangal')",
            "Du - informal 'you' (like Malayalam 'Nee')",
            "When to use Sie: Boss, strangers, elderly, officials",
            "When to use Du: Friends, family, children, peers who offer",
            "The 'Duzen' - when someone offers to use Du",
            "Real-world scenario: Your first day at a German office",
            "Common mistake: Using Du with professors/bosses — could be super awkward!",
            "Practice dialogues: Formal meeting vs casual café chat",
            "How verb forms change: 'Haben Sie..?' vs 'Hast du..?'",
            "Email etiquette: 'Sehr geehrte/r...' (formal) vs 'Liebe/r...' (informal)",
            "Tip: When in doubt, use Sie! Better to be too formal than too casual"
          ],
          keyVocabulary: ["Sie", "du", "Herr", "Frau"],
          learningObjectives: [
            "Understand the Sie/Du distinction",
            "Know when to use each form",
            "Avoid common respect-related mistakes"
          ],
          placeholderThumbnail: "/images/thumbnails/greetings-2.jpg"
        }
      ],
      exercises: [
        { id: "ex1-3-1", type: "multiple-choice", question: "It's 9 AM. How do you greet your German colleague?", options: ["Guten Morgen!", "Guten Abend!", "Gute Nacht!", "Hallo Nacht!"], correctAnswer: "Guten Morgen!", explanation: "Guten Morgen is used in the morning until around noon.", xpReward: 10 },
        { id: "ex1-3-2", type: "multiple-choice", question: "You meet your professor for the first time. Which form should you use?", options: ["Sie (formal)", "Du (informal)", "Either is fine", "No pronoun needed"], correctAnswer: "Sie (formal)", explanation: "Always use Sie with professors, bosses, and people you don't know well.", xpReward: 10 },
        { id: "ex1-3-3", type: "multiple-choice", question: "Which greeting is used ONLY when going to sleep?", options: ["Gute Nacht", "Guten Abend", "Guten Tag", "Hallo"], correctAnswer: "Gute Nacht", explanation: "Gute Nacht is said when you or someone else is going to sleep, not just at night.", xpReward: 10 },
        { id: "ex1-3-4", type: "matching", question: "Match the time to the correct greeting:", options: ["8:00 AM", "2:00 PM", "7:00 PM"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend"], xpReward: 15 },
        { id: "ex1-3-5", type: "fill-blank", question: "Complete: Guten _____, wie geht es Ihnen? (It's 3 PM)", options: ["Tag", "Morgen", "Abend", "Nacht"], correctAnswer: "Tag", explanation: "'Guten Tag' is used during the daytime, roughly from noon until early evening.", xpReward: 10 },
        { id: "ex1-3-6", type: "multiple-choice", question: "Which regional German greeting is used in Bavaria (southern Germany)?", options: ["Grüß Gott", "Moin", "Tach", "Ahoi"], correctAnswer: "Grüß Gott", explanation: "Grüß Gott (literally 'Greet God') is the standard greeting in Bavaria and Austria.", xpReward: 10 },
        { id: "ex1-3-7", type: "ordering", question: "Put these greetings in order from morning to night:", options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Guten Tag"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"], xpReward: 20 },
        { id: "ex1-3-8", type: "fill-blank", question: "You walk into a shop at 10 AM. Complete: _____ Morgen! Kann ich Ihnen helfen?", options: ["Guten", "Gute", "Gut", "Guter"], correctAnswer: "Guten", explanation: "It's 'Guten Morgen' — 'Guten' is the correct form here (accusative masculine).", xpReward: 10 }
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
      title: "Goodbye & Polite Words",
      titleGerman: "Auf Wiedersehen & Höfliche Wörter",
      description: "Learn to say goodbye politely and master essential courtesy phrases. Germans take politeness seriously — 'Bitte' and 'Danke' are your survival toolkit!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v1-4-1",
          title: "Saying Goodbye & Being Polite",
          duration: "10:00",
          description: "Master farewell expressions and essential polite words",
          scriptOutline: [
            "Opening: 'Before we say Auf Wiedersehen to this lesson...'",
            "Auf Wiedersehen! - Formal goodbye (literally: 'Until we see again')",
            "Tschüss! - Casual goodbye (like 'Bye!')",
            "Bis bald! - See you soon",
            "Bis später! - See you later",
            "Bis morgen! - See you tomorrow (you'll use this A LOT at work)",
            "Danke! - Thank you (like 'Nanni'!)",
            "Danke schön! / Vielen Dank! - Thank you very much",
            "Bitte! - Please / You're welcome (dual meaning!)",
            "Entschuldigung! - Excuse me / Sorry",
            "Es tut mir leid - I'm sorry (more sincere than Entschuldigung)",
            "Practice scenarios: Leaving office, leaving friend's house, shopping",
            "Pro tip: Germans say 'Bitte schön' when handing something to you — reply 'Danke schön'"
          ],
          keyVocabulary: ["Auf Wiedersehen", "Tschüss", "Danke", "Bitte", "Entschuldigung"],
          learningObjectives: [
            "Say goodbye in formal and informal situations",
            "Use thank you and please appropriately",
            "Apologize or get attention politely"
          ],
          placeholderThumbnail: "/images/thumbnails/goodbye-1.jpg"
        },
        {
          id: "v1-4-2",
          title: "Polite Phrases That Will Save Your Life in Germany",
          duration: "10:00",
          description: "Essential phrases for daily survival — shopping, asking directions, and not being rude!",
          scriptOutline: [
            "Opening: 'These phrases are your BEST friends in Germany!'",
            "At the bakery: 'Ein Brötchen, bitte!' — ordering bread rolls (Germans LOVE their bread!)",
            "At the Kasse (checkout): 'Bitte' when paying, 'Danke' when receiving change",
            "Asking for help: 'Entschuldigung, können Sie mir helfen?'",
            "When you don't understand: 'Entschuldigung, ich verstehe nicht'",
            "Saying sorry when you bump someone: 'Oh! Entschuldigung!'",
            "The magic word combo: 'Bitte schön' + 'Danke schön' — use them EVERYWHERE",
            "Kein Problem! — No problem! (When someone thanks you)",
            "Gern geschehen! — You're welcome! (More polite version)",
            "Kerala parallel: Think of German 'Bitte' as our 'Please' — it opens all doors",
            "Common situation: Holding the door open — Germans expect 'Danke' every time!",
            "Practice: Role-play buying chai... err, Kaffee at a German café"
          ],
          keyVocabulary: ["Kein Problem", "Gern geschehen", "ich verstehe nicht", "helfen"],
          learningObjectives: [
            "Handle basic polite interactions in shops and streets",
            "Know what to say when you don't understand something",
            "Use polite phrases naturally in daily life"
          ],
          placeholderThumbnail: "/images/thumbnails/polite-phrases.jpg"
        }
      ],
      exercises: [
        { id: "ex1-4-1", type: "multiple-choice", question: "You're leaving a business meeting. What do you say?", options: ["Auf Wiedersehen!", "Tschüss!", "Bis bald!", "Hallo!"], correctAnswer: "Auf Wiedersehen!", explanation: "Auf Wiedersehen is the formal way to say goodbye, appropriate for business settings.", xpReward: 10 },
        { id: "ex1-4-2", type: "multiple-choice", question: "What does 'Bitte' mean when someone says 'Danke' to you?", options: ["You're welcome", "Please", "Sorry", "Hello"], correctAnswer: "You're welcome", explanation: "Bitte means 'please' when asking for something, but 'you're welcome' as a response to Danke.", xpReward: 10 },
        { id: "ex1-4-3", type: "fill-blank", question: "Complete: _____ schön! (Thank you very much)", options: ["Danke", "Bitte", "Guten", "Auf"], correctAnswer: "Danke", xpReward: 10 },
        { id: "ex1-4-4", type: "multiple-choice", question: "You accidentally bump into someone. What do you say?", options: ["Entschuldigung!", "Danke!", "Tschüss!", "Bitte!"], correctAnswer: "Entschuldigung!", explanation: "Entschuldigung is used to apologize or say 'excuse me'.", xpReward: 10 },
        { id: "ex1-4-5", type: "matching", question: "Match the German phrase to its English meaning:", options: ["Auf Wiedersehen", "Bis bald", "Bis morgen", "Tschüss"], correctAnswer: ["Goodbye (formal)", "See you soon", "See you tomorrow", "Bye (casual)"], xpReward: 15 },
        { id: "ex1-4-6", type: "fill-blank", question: "You don't understand something. Complete: Entschuldigung, ich _____ nicht.", options: ["verstehe", "spreche", "danke", "bitte"], correctAnswer: "verstehe", explanation: "'Ich verstehe nicht' means 'I don't understand' — one of the most useful phrases when you're starting out!", xpReward: 10 },
        { id: "ex1-4-7", type: "ordering", question: "Put this café interaction in the correct order:", options: ["Bitte schön! (server hands coffee)", "Danke schön!", "Auf Wiedersehen!", "Ein Kaffee, bitte!"], correctAnswer: ["Ein Kaffee, bitte!", "Bitte schön! (server hands coffee)", "Danke schön!", "Auf Wiedersehen!"], xpReward: 20 },
        { id: "ex1-4-8", type: "multiple-choice", question: "Which phrase expresses a more sincere apology than 'Entschuldigung'?", options: ["Es tut mir leid", "Danke schön", "Auf Wiedersehen", "Kein Problem"], correctAnswer: "Es tut mir leid", explanation: "'Es tut mir leid' (literally: 'it does me sorrow') is a deeper apology, used when something is genuinely your fault.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab1-4-1", german: "Auf Wiedersehen", english: "Goodbye (formal)", malayalam: "വിട (ഔപചാരികം)", pronunciation: "owf vee-der-zey-en", example: "Auf Wiedersehen, bis Montag!", exampleTranslation: "Goodbye, see you Monday!" },
        { id: "vocab1-4-2", german: "Tschüss", english: "Bye (casual)", malayalam: "ബൈ", pronunciation: "chüss", example: "Tschüss, mach's gut!", exampleTranslation: "Bye, take care!" },
        { id: "vocab1-4-3", german: "Danke", english: "Thank you", malayalam: "നന്ദി", pronunciation: "dahn-ke", example: "Danke für die Hilfe!", exampleTranslation: "Thank you for the help!" },
        { id: "vocab1-4-4", german: "Bitte", english: "Please / You're welcome", malayalam: "ദയവായി / ഒന്നുമില്ല", pronunciation: "bit-te", example: "Kann ich bitte einen Kaffee haben?", exampleTranslation: "Can I please have a coffee?" },
        { id: "vocab1-4-5", german: "Entschuldigung", english: "Excuse me / Sorry", malayalam: "ക്ഷമിക്കണം", pronunciation: "ent-shool-di-goong", example: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Excuse me, where is the train station?" },
        { id: "vocab1-4-6", german: "Vielen Dank", english: "Many thanks", malayalam: "വളരെ നന്ദി", pronunciation: "fee-len dahnk", example: "Vielen Dank für alles!", exampleTranslation: "Many thanks for everything!" },
        { id: "vocab1-4-7", german: "Bis bald", english: "See you soon", malayalam: "ഉടനെ കാണാം", pronunciation: "bis bahlt", example: "Tschüss, bis bald!", exampleTranslation: "Bye, see you soon!" },
        { id: "vocab1-4-8", german: "Es tut mir leid", english: "I'm sorry", malayalam: "എനിക്ക് ദുഃഖമുണ്ട്", pronunciation: "es toot meer lyte", example: "Es tut mir leid, das war mein Fehler.", exampleTranslation: "I'm sorry, that was my mistake." },
        { id: "vocab1-4-9", german: "Kein Problem", english: "No problem", malayalam: "കുഴപ്പമില്ല", pronunciation: "kyne pro-blaym", example: "Kein Problem, das macht nichts!", exampleTranslation: "No problem, that doesn't matter!" },
        { id: "vocab1-4-10", german: "Gern geschehen", english: "You're welcome (polite)", malayalam: "സന്തോഷം", pronunciation: "gairn ge-shey-en", example: "Danke! — Gern geschehen!", exampleTranslation: "Thanks! — You're welcome!" }
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
          placeholderThumbnail: "/images/thumbnails/conversation-1.jpg"
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
          placeholderThumbnail: "/images/thumbnails/conversation-2.jpg"
        }
      ],
      exercises: [
        { id: "ex1-5-1", type: "ordering", question: "Put this conversation in the correct order:", options: ["Auch gut, danke!", "Guten Tag!", "Gut, danke! Und Ihnen?", "Hallo! Wie geht es Ihnen?"], correctAnswer: ["Guten Tag!", "Hallo! Wie geht es Ihnen?", "Gut, danke! Und Ihnen?", "Auch gut, danke!"], xpReward: 20 },
        { id: "ex1-5-2", type: "multiple-choice", question: "Someone asks 'Wie geht es Ihnen?' - What's an appropriate response?", options: ["Gut, danke! Und Ihnen?", "Auf Wiedersehen!", "Ich heiße Anna", "Guten Morgen!"], correctAnswer: "Gut, danke! Und Ihnen?", explanation: "This means 'Good, thanks! And you?' - the polite way to respond and return the question.", xpReward: 10 },
        { id: "ex1-5-3", type: "fill-blank", question: "Complete: Wie geht es _____? (formal 'you')", options: ["Ihnen", "dir", "du", "Sie"], correctAnswer: "Ihnen", explanation: "Ihnen is the dative form of Sie, used in the question 'How are you?' (formal).", xpReward: 10 },
        { id: "ex1-5-4", type: "fill-blank", question: "At airport immigration, the officer says: 'Ihren _____, bitte.' What does he want?", options: ["Pass", "Kaffee", "Namen", "Danke"], correctAnswer: "Pass", explanation: "'Ihren Pass, bitte' means 'Your passport, please' — one of the first things you'll hear at a German airport!", xpReward: 10 },
        { id: "ex1-5-5", type: "matching", question: "Match the formal question to the informal version:", options: ["Wie geht es Ihnen?", "Wie heißen Sie?", "Und Ihnen?"], correctAnswer: ["Wie geht's dir?", "Wie heißt du?", "Und dir?"], xpReward: 15 },
        { id: "ex1-5-6", type: "ordering", question: "Put this café order in the correct sequence:", options: ["Danke schön!", "Bitte schön! Zwei Euro fünfzig.", "Guten Tag! Einen Kaffee, bitte.", "Klein, bitte.", "Groß oder klein?"], correctAnswer: ["Guten Tag! Einen Kaffee, bitte.", "Groß oder klein?", "Klein, bitte.", "Bitte schön! Zwei Euro fünfzig.", "Danke schön!"], xpReward: 20 },
        { id: "ex1-5-7", type: "multiple-choice", question: "Your new German flatmate says 'Willkommen in der WG!' What is a 'WG'?", options: ["A shared apartment (Wohngemeinschaft)", "A type of greeting", "A German university", "A train station"], correctAnswer: "A shared apartment (Wohngemeinschaft)", explanation: "WG (Wohngemeinschaft) is a shared flat — very common in Germany, especially for students. Think of it as German-style hostel life!", xpReward: 10 },
        { id: "ex1-5-8", type: "fill-blank", question: "Someone introduces themselves: 'Hallo! Ich bin Anna. Und _____?'", options: ["du", "Sie", "ich", "wir"], correctAnswer: "du", explanation: "Since they said 'Hallo' and used their first name, this is informal. 'Und du?' means 'And you?' (casual).", xpReward: 10 }
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
        { id: "vocab1-5-10", german: "Ich heiße...", english: "My name is...", malayalam: "എന്റെ പേര് ... ആണ്", pronunciation: "ikh hy-se", example: "Ich heiße Maria.", exampleTranslation: "My name is Maria." }
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
          placeholderThumbnail: "/images/thumbnails/formal-informal.jpg"
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
          placeholderThumbnail: "/images/thumbnails/formal-writing.jpg"
        }
      ],
      exercises: [
        {
          id: "ex1-6-1",
          type: "multiple-choice",
          question: "You're at the Ausländerbehörde (immigration office). How do you address the officer?",
          options: ["Guten Tag! Können Sie mir bitte helfen?", "Hey! Kannst du mir helfen?", "Hallo! Hilf mir mal!", "Moin! Was geht?"],
          correctAnswer: "Guten Tag! Können Sie mir bitte helfen?",
          explanation: "Government offices are always formal. Use Sie and polite phrases like 'Guten Tag' and 'bitte'.",
          xpReward: 10
        },
        {
          id: "ex1-6-2",
          type: "fill-blank",
          question: "Complete: _____ Müller, wie geht es Ihnen? (addressing a man formally)",
          options: ["Herr", "Frau", "Du", "Mein"],
          correctAnswer: "Herr",
          explanation: "Herr (Mr.) is used before a man's last name in formal address.",
          xpReward: 10
        },
        {
          id: "ex1-6-3",
          type: "matching",
          question: "Match each situation to the correct form of address:",
          options: ["Meeting your professor", "Chatting with classmates", "Talking to a police officer"],
          correctAnswer: ["Sie (formal)", "Du (informal)", "Sie (formal)"],
          xpReward: 15
        },
        {
          id: "ex1-6-4",
          type: "multiple-choice",
          question: "Your German colleague says 'Wir können uns duzen!' What does this mean?",
          options: ["They're offering to use the informal Du with each other", "They want you to leave", "They're asking your name", "They want to speak English instead"],
          correctAnswer: "They're offering to use the informal Du with each other",
          explanation: "'Duzen' means to use the Du form. When someone offers this, it means you can both switch to informal address.",
          xpReward: 10
        },
        {
          id: "ex1-6-5",
          type: "ordering",
          question: "Order these situations from MOST formal to LEAST formal:",
          options: ["Talking to friends at a party", "Meeting your boss for the first time", "Chatting with a fellow student", "Speaking at a government office"],
          correctAnswer: ["Speaking at a government office", "Meeting your boss for the first time", "Chatting with a fellow student", "Talking to friends at a party"],
          xpReward: 20
        },
        {
          id: "ex1-6-6",
          type: "fill-blank",
          question: "Begin a formal email: '_____ geehrte Frau Schmidt,' (Dear Mrs. Schmidt,)",
          options: ["Sehr", "Liebe", "Hallo", "Guten"],
          correctAnswer: "Sehr",
          explanation: "'Sehr geehrte Frau...' is the standard formal email opening, equivalent to 'Dear Mrs...' in English.",
          xpReward: 10
        },
        {
          id: "ex1-6-7",
          type: "matching",
          question: "Match the email opening to the correct context:",
          options: ["Sehr geehrte Damen und Herren,", "Liebe Anna,", "Hey!", "Sehr geehrter Herr Professor Müller,"],
          correctAnswer: ["Formal email to unknown recipient", "Semi-formal email to a friend", "Casual WhatsApp message", "Formal email to a professor"],
          xpReward: 15
        },
        {
          id: "ex1-6-8",
          type: "multiple-choice",
          question: "If you can't type the ü character, which substitute can you use?",
          options: ["ue", "u", "ou", "oo"],
          correctAnswer: "ue",
          explanation: "When special characters aren't available: ae = ä, oe = ö, ue = ü, ss = ß. So 'München' becomes 'Muenchen'.",
          xpReward: 10
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
