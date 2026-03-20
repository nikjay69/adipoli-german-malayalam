// Course content data structure

export interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  scriptOutline: string[];
  keyVocabulary: string[];
  learningObjectives: string[];
  placeholderThumbnail: string;
  /** Full video script for recording/generation */
  script?: string;
  /** URL once video is uploaded */
  videoUrl?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleGerman: string;
  description: string;
  duration: string;
  xpReward: number;
  videos: Video[];
  exercises: Exercise[];
  vocabulary: VocabItem[];
}

export interface VocabItem {
  id: string;
  german: string;
  english: string;
  malayalam: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  audioPlaceholder?: string;
}

export interface Module {
  id: number;
  title: string;
  titleGerman: string;
  description: string;
  icon: string;
  color: string;
  totalHours: number;
  lessons: Lesson[];
  unlockRequirement?: string;
}

// Module 1: Welcome to German!
export const MODULE_1: Module = {
  id: 1,
  title: "Welcome to German!",
  titleGerman: "Willkommen!",
  description: "Start your German journey with basic greetings, sounds, and polite expressions. Learn how Malayalam can help you master German pronunciation!",
  icon: "👋",
  color: "#e94560",
  totalHours: 4,
  lessons: [
    {
      id: "1-1",
      title: "Why Learn German?",
      titleGerman: "Warum Deutsch lernen?",
      description: "Discover why German is a gateway to opportunities in Europe and how Malayalis are thriving in Germany.",
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
            "What you'll learn in this course - overview",
            "Motivation: 'By the end of this course, you'll be able to have basic conversations!'"
          ],
          keyVocabulary: ["Deutsch", "Deutschland", "lernen"],
          learningObjectives: [
            "Understand why German is valuable for career growth",
            "Know about opportunities in Germany for Indians",
            "Feel motivated to start the learning journey"
          ],
          placeholderThumbnail: "/images/thumbnails/why-german.jpg"
        }
      ],
      exercises: [
        {
          id: "ex1-1-1",
          type: "multiple-choice",
          question: "What is the main advantage of studying in Germany?",
          options: [
            "Free or very low tuition fees",
            "Always sunny weather",
            "No need to learn German",
            "Shorter courses"
          ],
          correctAnswer: "Free or very low tuition fees",
          explanation: "Germany offers free or very low tuition fees at public universities, making it attractive for international students.",
          xpReward: 10
        },
        {
          id: "ex1-1-2",
          type: "multiple-choice",
          question: "Which German companies have presence in India?",
          options: [
            "Bosch, Siemens, BMW",
            "Toyota, Sony, Samsung",
            "Apple, Google, Microsoft",
            "Tata, Reliance, Infosys"
          ],
          correctAnswer: "Bosch, Siemens, BMW",
          explanation: "Many German companies like Bosch, Siemens, and BMW have significant operations in India.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab1-1-1",
          german: "Deutsch",
          english: "German (language)",
          malayalam: "ജർമ്മൻ (ഭാഷ)",
          pronunciation: "doych",
          example: "Ich lerne Deutsch.",
          exampleTranslation: "I am learning German."
        },
        {
          id: "vocab1-1-2",
          german: "Deutschland",
          english: "Germany",
          malayalam: "ജർമ്മനി",
          pronunciation: "doych-lant",
          example: "Deutschland ist schön.",
          exampleTranslation: "Germany is beautiful."
        },
        {
          id: "vocab1-1-3",
          german: "lernen",
          english: "to learn",
          malayalam: "പഠിക്കുക",
          pronunciation: "lair-nen",
          example: "Wir lernen zusammen.",
          exampleTranslation: "We learn together."
        }
      ]
    },
    {
      id: "1-2",
      title: "German Sounds for Malayalam Speakers",
      titleGerman: "Deutsche Laute für Malayalam-Sprecher",
      description: "Discover the sounds you already know and learn the new ones! Your Malayalam background gives you an advantage.",
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
            "Practice words: ich, machen, Kuchen",
            "Comparison exercise: Say Malayalam word, then German word",
            "Common mistakes Indians make (and how to avoid them)"
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
            "The ß (Eszett) - just a long 's' sound",
            "The 'ch' sounds - ich-Laut vs ach-Laut",
            "Practice: Mädchen, schön, München, Straße",
            "Tips for practicing at home"
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
        {
          id: "ex1-2-1",
          type: "multiple-choice",
          question: "Which Malayalam sound is similar to German 'ch' in 'ich'?",
          options: ["ച", "ക", "ഹ", "ശ"],
          correctAnswer: "ച",
          explanation: "The German 'ch' in 'ich' is similar to the Malayalam ച sound.",
          xpReward: 10
        },
        {
          id: "ex1-2-2",
          type: "multiple-choice",
          question: "What is the ß called in German?",
          options: ["Eszett", "Umlaut", "Doppel-S", "Scharfes B"],
          correctAnswer: "Eszett",
          explanation: "ß is called Eszett (or sometimes Scharfes S). It represents a long 's' sound.",
          xpReward: 10
        },
        {
          id: "ex1-2-3",
          type: "matching",
          question: "Match the German letter to its sound description:",
          options: ["ä", "ö", "ü"],
          correctAnswer: ["Like 'e' in bed", "Lips like 'o', say 'e'", "Lips like 'u', say 'i'"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab1-2-1",
          german: "ich",
          english: "I",
          malayalam: "ഞാൻ",
          pronunciation: "ikh (soft ch)",
          example: "Ich bin hier.",
          exampleTranslation: "I am here."
        },
        {
          id: "vocab1-2-2",
          german: "Mädchen",
          english: "girl",
          malayalam: "പെൺകുട്ടി",
          pronunciation: "med-khen",
          example: "Das Mädchen spielt.",
          exampleTranslation: "The girl is playing."
        },
        {
          id: "vocab1-2-3",
          german: "schön",
          english: "beautiful",
          malayalam: "സുന്ദരം",
          pronunciation: "shurn",
          example: "Das ist schön!",
          exampleTranslation: "That is beautiful!"
        },
        {
          id: "vocab1-2-4",
          german: "München",
          english: "Munich",
          malayalam: "മ്യൂണിക്ക്",
          pronunciation: "myn-khen",
          example: "München ist groß.",
          exampleTranslation: "Munich is big."
        },
        {
          id: "vocab1-2-5",
          german: "Straße",
          english: "street",
          malayalam: "തെരുവ്",
          pronunciation: "shtrah-se",
          example: "Die Straße ist lang.",
          exampleTranslation: "The street is long."
        }
      ]
    },
    {
      id: "1-3",
      title: "Basic Greetings",
      titleGerman: "Grundlegende Begrüßungen",
      description: "Learn to say hello, goodbye, and basic greetings in German - with Kerala-style explanations!",
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
            "Regional variations: Grüß Gott (Bavaria), Moin (North)",
            "Practice scenarios: Meeting boss vs meeting friend",
            "Kerala parallel: Like how we say 'Enna vishesham' vs 'Namasthe'"
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
            "Common mistake: Using Du with professors/bosses",
            "Practice dialogues: Formal meeting vs casual café chat",
            "Tip: When in doubt, use Sie!"
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
        {
          id: "ex1-3-1",
          type: "multiple-choice",
          question: "It's 9 AM. How do you greet your German colleague?",
          options: ["Guten Morgen!", "Guten Abend!", "Gute Nacht!", "Hallo Nacht!"],
          correctAnswer: "Guten Morgen!",
          explanation: "Guten Morgen is used in the morning until around noon.",
          xpReward: 10
        },
        {
          id: "ex1-3-2",
          type: "multiple-choice",
          question: "You meet your professor for the first time. Which form should you use?",
          options: ["Sie (formal)", "Du (informal)", "Either is fine", "No pronoun needed"],
          correctAnswer: "Sie (formal)",
          explanation: "Always use Sie with professors, bosses, and people you don't know well.",
          xpReward: 10
        },
        {
          id: "ex1-3-3",
          type: "multiple-choice",
          question: "Which greeting is used ONLY when going to sleep?",
          options: ["Gute Nacht", "Guten Abend", "Guten Tag", "Hallo"],
          correctAnswer: "Gute Nacht",
          explanation: "Gute Nacht is said when you or someone else is going to sleep, not just at night.",
          xpReward: 10
        },
        {
          id: "ex1-3-4",
          type: "matching",
          question: "Match the time to the correct greeting:",
          options: ["8:00 AM", "2:00 PM", "7:00 PM"],
          correctAnswer: ["Guten Morgen", "Guten Tag", "Guten Abend"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab1-3-1",
          german: "Hallo",
          english: "Hello",
          malayalam: "ഹലോ",
          pronunciation: "hah-loh",
          example: "Hallo, wie geht's?",
          exampleTranslation: "Hello, how are you?"
        },
        {
          id: "vocab1-3-2",
          german: "Guten Morgen",
          english: "Good morning",
          malayalam: "സുപ്രഭാതം",
          pronunciation: "goo-ten mor-gen",
          example: "Guten Morgen, Herr Müller!",
          exampleTranslation: "Good morning, Mr. Müller!"
        },
        {
          id: "vocab1-3-3",
          german: "Guten Tag",
          english: "Good day",
          malayalam: "നല്ല ദിവസം",
          pronunciation: "goo-ten tahk",
          example: "Guten Tag, kann ich Ihnen helfen?",
          exampleTranslation: "Good day, can I help you?"
        },
        {
          id: "vocab1-3-4",
          german: "Guten Abend",
          english: "Good evening",
          malayalam: "ശുഭ സന്ധ്യ",
          pronunciation: "goo-ten ah-bent",
          example: "Guten Abend, willkommen!",
          exampleTranslation: "Good evening, welcome!"
        },
        {
          id: "vocab1-3-5",
          german: "Gute Nacht",
          english: "Good night",
          malayalam: "ശുഭ രാത്രി",
          pronunciation: "goo-te nakht",
          example: "Gute Nacht, schlaf gut!",
          exampleTranslation: "Good night, sleep well!"
        },
        {
          id: "vocab1-3-6",
          german: "Sie",
          english: "You (formal)",
          malayalam: "നിങ്ങൾ (ബഹുമാനം)",
          pronunciation: "zee",
          example: "Wie heißen Sie?",
          exampleTranslation: "What is your name? (formal)"
        },
        {
          id: "vocab1-3-7",
          german: "du",
          english: "You (informal)",
          malayalam: "നീ",
          pronunciation: "doo",
          example: "Wie heißt du?",
          exampleTranslation: "What is your name? (informal)"
        }
      ]
    },
    {
      id: "1-4",
      title: "Goodbye & Polite Words",
      titleGerman: "Auf Wiedersehen & Höfliche Wörter",
      description: "Learn to say goodbye politely and master essential courtesy phrases.",
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
            "Danke! - Thank you (like 'Nanni'!)",
            "Danke schön! / Vielen Dank! - Thank you very much",
            "Bitte! - Please / You're welcome (dual meaning!)",
            "Entschuldigung! - Excuse me / Sorry",
            "Practice scenarios: Leaving office, leaving friend's house, shopping"
          ],
          keyVocabulary: ["Auf Wiedersehen", "Tschüss", "Danke", "Bitte", "Entschuldigung"],
          learningObjectives: [
            "Say goodbye in formal and informal situations",
            "Use thank you and please appropriately",
            "Apologize or get attention politely"
          ],
          placeholderThumbnail: "/images/thumbnails/goodbye-1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex1-4-1",
          type: "multiple-choice",
          question: "You're leaving a business meeting. What do you say?",
          options: ["Auf Wiedersehen!", "Tschüss!", "Bis bald!", "Hallo!"],
          correctAnswer: "Auf Wiedersehen!",
          explanation: "Auf Wiedersehen is the formal way to say goodbye, appropriate for business settings.",
          xpReward: 10
        },
        {
          id: "ex1-4-2",
          type: "multiple-choice",
          question: "What does 'Bitte' mean when someone says 'Danke' to you?",
          options: ["You're welcome", "Please", "Sorry", "Hello"],
          correctAnswer: "You're welcome",
          explanation: "Bitte means 'please' when asking for something, but 'you're welcome' as a response to Danke.",
          xpReward: 10
        },
        {
          id: "ex1-4-3",
          type: "fill-blank",
          question: "Complete: _____ schön! (Thank you very much)",
          options: ["Danke", "Bitte", "Guten", "Auf"],
          correctAnswer: "Danke",
          xpReward: 10
        },
        {
          id: "ex1-4-4",
          type: "multiple-choice",
          question: "You accidentally bump into someone. What do you say?",
          options: ["Entschuldigung!", "Danke!", "Tschüss!", "Bitte!"],
          correctAnswer: "Entschuldigung!",
          explanation: "Entschuldigung is used to apologize or say 'excuse me'.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab1-4-1",
          german: "Auf Wiedersehen",
          english: "Goodbye (formal)",
          malayalam: "വിട (ഔപചാരികം)",
          pronunciation: "owf vee-der-zey-en",
          example: "Auf Wiedersehen, bis Montag!",
          exampleTranslation: "Goodbye, see you Monday!"
        },
        {
          id: "vocab1-4-2",
          german: "Tschüss",
          english: "Bye (casual)",
          malayalam: "ബൈ",
          pronunciation: "chüss",
          example: "Tschüss, mach's gut!",
          exampleTranslation: "Bye, take care!"
        },
        {
          id: "vocab1-4-3",
          german: "Danke",
          english: "Thank you",
          malayalam: "നന്ദി",
          pronunciation: "dahn-ke",
          example: "Danke für die Hilfe!",
          exampleTranslation: "Thank you for the help!"
        },
        {
          id: "vocab1-4-4",
          german: "Bitte",
          english: "Please / You're welcome",
          malayalam: "ദയവായി / സ്വാഗതം",
          pronunciation: "bit-te",
          example: "Kann ich bitte einen Kaffee haben?",
          exampleTranslation: "Can I please have a coffee?"
        },
        {
          id: "vocab1-4-5",
          german: "Entschuldigung",
          english: "Excuse me / Sorry",
          malayalam: "ക്ഷമിക്കണം",
          pronunciation: "ent-shool-di-goong",
          example: "Entschuldigung, wo ist der Bahnhof?",
          exampleTranslation: "Excuse me, where is the train station?"
        },
        {
          id: "vocab1-4-6",
          german: "Vielen Dank",
          english: "Many thanks",
          malayalam: "വളരെ നന്ദി",
          pronunciation: "fee-len dahnk",
          example: "Vielen Dank für alles!",
          exampleTranslation: "Many thanks for everything!"
        },
        {
          id: "vocab1-4-7",
          german: "Bis bald",
          english: "See you soon",
          malayalam: "ഉടനെ കാണാം",
          pronunciation: "bis bahlt",
          example: "Tschüss, bis bald!",
          exampleTranslation: "Bye, see you soon!"
        }
      ]
    },
    {
      id: "1-5",
      title: "Your First Conversation",
      titleGerman: "Dein erstes Gespräch",
      description: "Put it all together! Practice your first complete German conversation.",
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
            "Scenario setup: Meeting someone at Kochi airport",
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
        }
      ],
      exercises: [
        {
          id: "ex1-5-1",
          type: "ordering",
          question: "Put this conversation in the correct order:",
          options: [
            "Auch gut, danke!",
            "Guten Tag!",
            "Gut, danke! Und Ihnen?",
            "Hallo! Wie geht es Ihnen?"
          ],
          correctAnswer: ["Guten Tag!", "Hallo! Wie geht es Ihnen?", "Gut, danke! Und Ihnen?", "Auch gut, danke!"],
          xpReward: 20
        },
        {
          id: "ex1-5-2",
          type: "multiple-choice",
          question: "Someone asks 'Wie geht es Ihnen?' - What's an appropriate response?",
          options: [
            "Gut, danke! Und Ihnen?",
            "Auf Wiedersehen!",
            "Ich heiße Anna",
            "Guten Morgen!"
          ],
          correctAnswer: "Gut, danke! Und Ihnen?",
          explanation: "This means 'Good, thanks! And you?' - the polite way to respond and return the question.",
          xpReward: 10
        },
        {
          id: "ex1-5-3",
          type: "fill-blank",
          question: "Complete: Wie geht es _____? (formal 'you')",
          options: ["Ihnen", "dir", "du", "Sie"],
          correctAnswer: "Ihnen",
          explanation: "Ihnen is the dative form of Sie, used in the question 'How are you?' (formal).",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab1-5-1",
          german: "Wie geht es Ihnen?",
          english: "How are you? (formal)",
          malayalam: "സുഖമാണോ? (ഔപചാരികം)",
          pronunciation: "vee gayt es ee-nen",
          example: "Guten Tag, wie geht es Ihnen?",
          exampleTranslation: "Good day, how are you?"
        },
        {
          id: "vocab1-5-2",
          german: "Wie geht's?",
          english: "How's it going? (casual)",
          malayalam: "എന്താ വിശേഷം?",
          pronunciation: "vee gayts",
          example: "Hey, wie geht's?",
          exampleTranslation: "Hey, how's it going?"
        },
        {
          id: "vocab1-5-3",
          german: "Gut, danke",
          english: "Good, thanks",
          malayalam: "നന്നായിരിക്കുന്നു, നന്ദി",
          pronunciation: "goot, dahn-ke",
          example: "Mir geht es gut, danke!",
          exampleTranslation: "I'm doing well, thanks!"
        },
        {
          id: "vocab1-5-4",
          german: "Und Ihnen?",
          english: "And you? (formal)",
          malayalam: "നിങ്ങളോ?",
          pronunciation: "oont ee-nen",
          example: "Gut, danke! Und Ihnen?",
          exampleTranslation: "Good, thanks! And you?"
        },
        {
          id: "vocab1-5-5",
          german: "Und dir?",
          english: "And you? (informal)",
          malayalam: "നീയോ?",
          pronunciation: "oont deer",
          example: "Super! Und dir?",
          exampleTranslation: "Great! And you?"
        }
      ]
    }
  ]
};

// Module 2: Who Are You?
export const MODULE_2: Module = {
  id: 2,
  title: "Who Are You?",
  titleGerman: "Wer bist du?",
  description: "Learn to introduce yourself, ask names, talk about where you're from, and count in German!",
  icon: "🙋",
  color: "#0f3460",
  totalHours: 8,
  lessons: [
    {
      id: "2-1",
      title: "What's Your Name?",
      titleGerman: "Wie heißt du?",
      description: "Learn to ask and tell names in German, including how to pronounce Kerala names!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v2-1-1",
          title: "Ich heiße... - What's Your Name?",
          duration: "10:00",
          description: "Master introducing yourself and asking names",
          scriptOutline: [
            "Opening: 'Ich heiße [Your name]. Und du?'",
            "Wie heißt du? - What's your name? (informal)",
            "Wie heißen Sie? - What's your name? (formal)",
            "Ich heiße [Name] - My name is...",
            "Ich bin [Name] - I am...",
            "Freut mich! - Nice to meet you!",
            "Kerala names in German - pronunciation tips:",
            "  - Akhil → Germans might say 'A-kil'",
            "  - Lakshmi → 'Lak-shmi' (they'll try!)",
            "  - Gopinath → 'Go-pi-nat'",
            "Tip: Spell out your name phonetically",
            "Practice introductions with partner"
          ],
          keyVocabulary: ["Wie heißt du?", "Ich heiße", "Freut mich"],
          learningObjectives: [
            "Ask someone's name formally and informally",
            "Introduce yourself properly",
            "Help Germans pronounce your Kerala name"
          ],
          placeholderThumbnail: "/images/thumbnails/name-1.jpg"
        },
        {
          id: "v2-1-2",
          title: "Where Are You From?",
          duration: "10:00",
          description: "Talk about your origin - Kerala, India, and German geography",
          scriptOutline: [
            "Opening: 'Ich komme aus Kerala!' Show Kerala on map",
            "Woher kommst du? - Where are you from? (informal)",
            "Woher kommen Sie? - Where are you from? (formal)",
            "Ich komme aus [Place] - I come from...",
            "Ich bin aus [Place] - I am from...",
            "Kerala in German: 'Ich komme aus Kerala in Indien'",
            "Major German cities to know:",
            "  - Berlin (capital)",
            "  - München (Munich - Bavaria)",
            "  - Hamburg (port city)",
            "  - Köln (Cologne)",
            "  - Frankfurt (financial hub)",
            "German states = Bundesländer (like Kerala is a state)",
            "Fun parallel: Germany has 16 states, India has 28!",
            "Practice: Point to map and say where you're from"
          ],
          keyVocabulary: ["Woher kommst du?", "Ich komme aus", "Indien", "Kerala"],
          learningObjectives: [
            "Ask and answer about origin",
            "Know major German cities",
            "Explain where Kerala is"
          ],
          placeholderThumbnail: "/images/thumbnails/origin-1.jpg"
        }
      ],
      exercises: [
        {
          id: "ex2-1-1",
          type: "multiple-choice",
          question: "How do you ask 'What's your name?' to your new boss?",
          options: [
            "Wie heißen Sie?",
            "Wie heißt du?",
            "Ich heiße...",
            "Wer bist du?"
          ],
          correctAnswer: "Wie heißen Sie?",
          explanation: "Use 'Sie' form with bosses and in formal situations.",
          xpReward: 10
        },
        {
          id: "ex2-1-2",
          type: "fill-blank",
          question: "Complete: Ich _____ aus Kerala. (I come from Kerala)",
          options: ["komme", "bin", "heiße", "gehe"],
          correctAnswer: "komme",
          explanation: "'Ich komme aus' means 'I come from' - used for origin.",
          xpReward: 10
        },
        {
          id: "ex2-1-3",
          type: "multiple-choice",
          question: "What does 'Freut mich!' mean?",
          options: [
            "Nice to meet you!",
            "Where are you from?",
            "What's your name?",
            "I'm fine, thanks"
          ],
          correctAnswer: "Nice to meet you!",
          explanation: "Freut mich (literally 'pleases me') is used when meeting someone.",
          xpReward: 10
        },
        {
          id: "ex2-1-4",
          type: "matching",
          question: "Match the German city to its description:",
          options: ["Berlin", "München", "Hamburg"],
          correctAnswer: ["Capital city", "Bavaria's capital", "Major port city"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab2-1-1",
          german: "Wie heißt du?",
          english: "What's your name? (informal)",
          malayalam: "നിന്റെ പേര് എന്താ?",
          pronunciation: "vee hysst doo",
          example: "Hallo! Wie heißt du?",
          exampleTranslation: "Hello! What's your name?"
        },
        {
          id: "vocab2-1-2",
          german: "Wie heißen Sie?",
          english: "What's your name? (formal)",
          malayalam: "നിങ്ങളുടെ പേര് എന്താണ്?",
          pronunciation: "vee hyssen zee",
          example: "Guten Tag! Wie heißen Sie?",
          exampleTranslation: "Good day! What's your name?"
        },
        {
          id: "vocab2-1-3",
          german: "Ich heiße",
          english: "My name is",
          malayalam: "എന്റെ പേര്",
          pronunciation: "ikh hysse",
          example: "Ich heiße Arun.",
          exampleTranslation: "My name is Arun."
        },
        {
          id: "vocab2-1-4",
          german: "Freut mich!",
          english: "Nice to meet you!",
          malayalam: "സന്തോഷം!",
          pronunciation: "froyt mikh",
          example: "Freut mich, Sie kennenzulernen!",
          exampleTranslation: "Nice to meet you!"
        },
        {
          id: "vocab2-1-5",
          german: "Woher kommst du?",
          english: "Where are you from? (informal)",
          malayalam: "നീ എവിടെ നിന്നാ?",
          pronunciation: "vo-hair komst doo",
          example: "Woher kommst du ursprünglich?",
          exampleTranslation: "Where are you originally from?"
        },
        {
          id: "vocab2-1-6",
          german: "Ich komme aus",
          english: "I come from",
          malayalam: "ഞാൻ ... ൽ നിന്നാണ്",
          pronunciation: "ikh kom-me ows",
          example: "Ich komme aus Thiruvananthapuram.",
          exampleTranslation: "I come from Thiruvananthapuram."
        },
        {
          id: "vocab2-1-7",
          german: "Indien",
          english: "India",
          malayalam: "ഇന്ത്യ",
          pronunciation: "in-dee-en",
          example: "Indien ist ein großes Land.",
          exampleTranslation: "India is a big country."
        },
        {
          id: "vocab2-1-8",
          german: "Berlin",
          english: "Berlin",
          malayalam: "ബെർലിൻ",
          pronunciation: "bair-leen",
          example: "Berlin ist die Hauptstadt.",
          exampleTranslation: "Berlin is the capital."
        }
      ]
    }
  ],
  unlockRequirement: "Complete Module 1"
};

// All modules array (will expand)
export const ALL_MODULES: Module[] = [MODULE_1, MODULE_2];

// Helper function to get all vocabulary from all modules
export const getAllVocabulary = (): VocabItem[] => {
  const vocab: VocabItem[] = [];
  ALL_MODULES.forEach(module => {
    module.lessons.forEach(lesson => {
      vocab.push(...lesson.vocabulary);
    });
  });
  return vocab;
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const module of ALL_MODULES) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

// Helper function to get module by ID
export const getModuleById = (moduleId: number): Module | undefined => {
  return ALL_MODULES.find(m => m.id === moduleId);
};
