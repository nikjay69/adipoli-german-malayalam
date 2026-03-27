import type { Module } from '../types';

export const MODULE_1: Module = {
  id: 1,
  title: "Welcome to German!",
  titleGerman: "Willkommen!",
  description: "Your true beginner foundation: motivation, core sounds, greetings, and first conversation patterns. This module is designed to reduce fear, build correct pronunciation early, and prepare learners for basic A1 speaking and listening tasks.",

  icon: "👋",
  color: "#e94560",
  totalHours: 12,
  learningTips: [
    "Say every new word OUT LOUD — your mouth needs practice too!",
    "Don't memorize — LISTEN and REPEAT. Your brain learns better through sound.",
    "German pronunciation is regular: once you learn the rules, you can read any word.",
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
        { id: "ex1-2-1", type: "multiple-choice", question: "Which German city name is often hard for English speakers, but easier for Malayalis due to the 'ch' and 'ü' sounds?", questionGerman: "Welcher Stadtname ist für Malayalis wegen 'ch' und 'ü' einfacher?", options: ["München", "Berlin", "Frankfurt", "Hamburg"], correctAnswer: "München", explanation: "English speakers say 'Munich', but the German 'München' uses the soft 'ch' (like Malayalam ച) and the 'ü'. Malayalis often master these 'tricky' sounds faster because our language has similar mouth positions!", xpReward: 10 },
        { id: "ex1-2-2", type: "multiple-choice", question: "What is the ß called in German?", questionGerman: "Wie heißt das Zeichen 'ß'?", options: ["Eszett", "Umlaut", "Doppel-S", "Scharfes B"], correctAnswer: "Eszett", explanation: "ß (Eszett) = a long 'ss' sound. It appears after long vowels: Straße, Fuß. After short vowels, German uses 'ss' instead: Wasser, essen.", xpReward: 10 },
        { id: "ex1-2-3", type: "matching", question: "Match the German letter to its sound description:", questionGerman: "Verbinden Sie die Buchstaben mit den Lauten:", options: ["ä", "ö", "ü"], correctAnswer: ["Like 'e' in bed", "Lips like 'o', say 'e'", "Lips like 'u', say 'i'"], xpReward: 15 },
        { id: "ex1-2-4", type: "fill-blank", question: "German meaning changes with dots! 'Schon' means 'already', but 'Sch___n' means 'beautiful'.", questionGerman: "Schon = schon, aber Sch___n = schön. Ergänzen Sie:", options: ["ö", "ä", "ü", "o"], correctAnswer: "ö", explanation: "Small dots, big difference! 'Schon' (already) vs 'Schön' (beautiful). This is why mastering Umlauts (ä, ö, ü) is essential from Lesson 1.", xpReward: 10 },
        { id: "ex1-2-5", type: "multiple-choice", question: "How is the German 'w' pronounced?", questionGerman: "Wie spricht man das 'w' aus?", options: ["Like English 'v'", "Like English 'w'", "Like English 'f'", "It is silent"], correctAnswer: "Like English 'v'", explanation: "Memory trick: German W = English V, German V = English F. So Wasser = 'Vasser', Vater = 'Fahter'. The letters are 'shifted' one position!", xpReward: 10 },
        { id: "ex1-2-6", type: "multiple-choice", question: "You're in Germany and someone says 'Tseit' out loud. Which word did they say?", questionGerman: "Jemand sagt 'Tseit'. Welches Wort?", options: ["Zeit (time)", "Seit (since)", "Seite (page)", "Ziel (goal)"], correctAnswer: "Zeit (time)", explanation: "German Z is always pronounced 'ts'. So 'Zeit' (time) sounds like 'Tsait'. This 'ts' start catches every beginner — but you'll hear it everywhere: Zeitung (newspaper), zusammen (together), Zimmer (room).", xpReward: 15 },
        { id: "ex1-2-7", type: "multiple-choice", question: "In the word 'Bier' (beer), how is 'ie' pronounced?", questionGerman: "Wie spricht man 'ie' in 'Bier' aus?", options: ["Like 'ee' in 'see'", "Like 'eye'", "Like 'ay'", "It is silent"], correctAnswer: "Like 'ee' in 'see'", explanation: "The 'ie' vs 'ei' rule: the SECOND letter wins. 'ie' → the 'e' sound = 'ee'. 'ei' → the 'i' sound = 'eye'. Bier = 'beer', Bein = 'byne'.", xpReward: 10 },
        { id: "ex1-2-8", type: "ordering", question: "Order these German sounds by how much you need to round your lips (from flat to most round):", questionGerman: "Bringen Sie die Laute in eine Reihenfolge (Lippenrundung):", options: ["ü (maximum rounding)", "i (flat/smile)", "u (medium rounding)"], correctAnswer: ["i (flat/smile)", "u (medium rounding)", "ü (maximum rounding)"], xpReward: 20 }
      ],
      vocabulary: [
        { id: "vocab1-2-1", german: "ich", english: "I", malayalam: "ഞാൻ", pronunciation: "ikh (soft ch)", example: "Ich bin hier.", exampleTranslation: "I am here." },
        { id: "vocab1-2-2", german: "Mädchen", english: "girl", malayalam: "പെൺകുട്ടി", pronunciation: "med-khen", example: "Das Mädchen spielt.", exampleTranslation: "The girl is playing." },
        { id: "vocab1-2-3", german: "schön", english: "beautiful", malayalam: "സുന്ദരം", pronunciation: "shöhn (round lips like 'o', say 'e')", example: "Das ist schön!", exampleTranslation: "That is beautiful!" },
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
        { id: "ex1-3-1", type: "multiple-choice", question: "When greeting someone formally in Germany, what is the 'Golden Rule'?", questionGerman: "Was ist die 'Goldene Regel' bei einer formellen Begrüßung?", options: ["Firm handshake and direct eye contact", "A slight bow without touching", "Avoiding eye contact out of respect", "A high-five"], correctAnswer: "Firm handshake and direct eye contact", explanation: "In Germany, a firm (but not crushing) handshake with direct eye contact signals confidence and honesty. Avoiding eye contact can be seen as having something to hide!", xpReward: 10 },
        { id: "ex1-3-2", type: "multiple-choice", question: "You meet your professor for the first time. Which form should you use?", questionGerman: "Sie treffen Ihren Professor zum ersten Mal. Welche Form nutzen Sie?", options: ["Sie (formal)", "Du (informal)", "Either is fine", "No pronoun needed"], correctAnswer: "Sie (formal)", explanation: "Sie = formal 'you' (like Malayalam 'Ningal'). Use with strangers, bosses, and anyone older. When in doubt, use Sie!", xpReward: 10 },
        { id: "ex1-3-3", type: "multiple-choice", question: "Which greeting is used ONLY when going to sleep?", questionGerman: "Welcher Gruß wird NUR vor dem Schlafengehen verwendet?", options: ["Gute Nacht", "Guten Abend", "Guten Tag", "Hallo"], correctAnswer: "Gute Nacht", explanation: "'Gute Nacht' = only when going to BED, not just evening. At 8 PM meeting someone? Say 'Guten Abend'. Leaving to sleep? 'Gute Nacht'.", xpReward: 10 },
        { id: "ex1-3-4", type: "matching", question: "Match the time to the correct greeting:", questionGerman: "Ordnen Sie die Uhrzeit der richtigen Begrüßung zu:", options: ["8:00 AM", "2:00 PM", "7:00 PM"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend"], xpReward: 15 },
        { id: "ex1-3-5", type: "fill-blank", question: "Complete: Guten _____, wie geht es Ihnen? (It's 3 PM)", questionGerman: "Ergänzen Sie: Guten _____, wie geht es Ihnen?", options: ["Tag", "Morgen", "Abend", "Nacht"], correctAnswer: "Tag", explanation: "'Guten Tag' covers noon to ~6 PM. Memory trick: Tag = day = daylight hours. Once the sun sets, switch to 'Guten Abend'.", xpReward: 10 },
        { id: "ex1-3-6", type: "multiple-choice", question: "Which regional German greeting is used in Bavaria (southern Germany)?", questionGerman: "Welcher regionale Gruß wird in Bayern verwendet?", options: ["Grüß Gott", "Moin", "Tach", "Ahoi"], correctAnswer: "Grüß Gott", explanation: "Germany has regional greetings! Grüß Gott (Bavaria/Austria), Moin (North), Servus (Austria). At A1 level, stick with Hallo/Guten Tag — universally understood.", xpReward: 10 },
        { id: "ex1-3-7", type: "ordering", question: "Put these greetings in order from morning to night:", questionGerman: "Bringen Sie die Grüße in die richtige Reihenfolge (Morgen bis Nacht):", options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Guten Tag"], correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"], xpReward: 20 },
        { id: "ex1-3-8", type: "fill-blank", question: "You walk into a small local bakery. What is the expected polite greeting?", questionGerman: "Sie gehen in eine kleine Bäckerei. Wie grüßen Sie?", options: ["Guten Tag", "Tschüss", "Gute Nacht", "Mahnzeit"], correctAnswer: "Guten Tag", explanation: "In Germany, when entering small shops, bakeries, or doctors' offices, it is polite and expected to say 'Guten Tag' or 'Hallo' to everyone, not just the staff. It's part of being 'höflich' (polite).", xpReward: 10 }
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
        { id: "ex1-4-1", type: "multiple-choice", question: "You're leaving a business meeting. What do you say?", questionGerman: "Sie verlassen ein Geschäftstreffen. Was sagen Sie?", options: ["Auf Wiedersehen!", "Tschüss!", "Bis bald!", "Hallo!"], correctAnswer: "Auf Wiedersehen!", explanation: "'Auf Wiedersehen' literally means 'until we see again' — formal and polite. For casual goodbyes, use 'Tschüss'. Rule: formal setting = Auf Wiedersehen.", xpReward: 10 },
        { id: "ex1-4-2", type: "multiple-choice", question: "What does 'Bitte' mean when someone says 'Danke' to you?", questionGerman: "Was bedeutet 'Bitte', wenn jemand 'Danke' sagt?", options: ["You're welcome", "Please", "Sorry", "Hello"], correctAnswer: "You're welcome", explanation: "'Bitte' is a 2-in-1 word! Before getting something: 'Bitte' = please. After 'Danke': 'Bitte' = you're welcome. Context decides the meaning.", xpReward: 10 },
        { id: "ex1-4-3", type: "fill-blank", question: "Complete: _____ schön! (Thank you very much)", questionGerman: "Ergänzen Sie: _____ schön!", options: ["Danke", "Bitte", "Guten", "Auf"], correctAnswer: "Danke", xpReward: 10 },
        { id: "ex1-4-4", type: "multiple-choice", question: "You accidentally bump into someone. What do you say?", questionGerman: "Sie stoßen versehentlich gegen jemanden. Was sagen Sie?", options: ["Entschuldigung!", "Danke!", "Tschüss!", "Bitte!"], correctAnswer: "Entschuldigung!", explanation: "'Entschuldigung' works for both bumping into someone AND getting attention. It's your Swiss Army knife for polite German interactions.", xpReward: 10 },
        { id: "ex1-4-5", type: "matching", question: "Match the German phrase to its English meaning:", questionGerman: "Verbinden Sie den deutschen Ausdruck mit dem Englischen:", options: ["Auf Wiedersehen", "Bis bald", "Bis morgen", "Tschüss"], correctAnswer: ["Goodbye (formal)", "See you soon", "See you tomorrow", "Bye (casual)"], xpReward: 15 },
        { id: "ex1-4-6", type: "fill-blank", question: "You don't understand something. Complete: Entschuldigung, ich _____ nicht.", questionGerman: "Sie verstehen etwas nicht. Ergänzen Sie: Entschuldigung, ich _____ nicht.", options: ["verstehe", "spreche", "danke", "bitte"], correctAnswer: "verstehe", explanation: "'Ich verstehe nicht' = 'I don't understand'. This is your survival phrase #1 in Germany. Say it confidently and Germans will slow down for you.", xpReward: 10 },
        { id: "ex1-4-7", type: "ordering", question: "You're at a traditional German bakery. Order of a typical 'Nur Barzahlung' (Cash only) interaction:", questionGerman: "Bringen Sie die Interaktion in einer traditionellen Bäckerei (Barzahlung) in die richtige Reihenfolge:", options: ["'Nur Barzahlung!' (Cash only!)", "'Ein Brötchen, bitte!'", "'Danke schön!'", "Wait for change (Wechselgeld)"], correctAnswer: ["'Ein Brötchen, bitte!'", "'Nur Barzahlung!' (Cash only!)", "Wait for change (Wechselgeld)", "'Danke schön!'"], explanation: "Many small German shops and bakeries still follow the 'Nur Bares ist Wahres' (Only cash is true) rule. Always carry some coins — your card might not be welcome at the local Bäckerei!", xpReward: 20 },
        { id: "ex1-4-8", type: "multiple-choice", question: "Which phrase expresses a more sincere apology than 'Entschuldigung'?", questionGerman: "Welcher Ausdruck ist eine ehrlichere Entschuldigung?", options: ["Es tut mir leid", "Danke schön", "Auf Wiedersehen", "Kein Problem"], correctAnswer: "Es tut mir leid", explanation: "Two levels of sorry: 'Entschuldigung' = light (oops!), 'Es tut mir leid' = sincere (I'm truly sorry). Use 'Es tut mir leid' when something is genuinely your fault.", xpReward: 10 }
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
