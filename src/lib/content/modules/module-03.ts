import type { Module } from '../types';

// Module 3: Numbers & Time
export const MODULE_3: Module = {
  id: 3,
  title: "Numbers & Time",
  titleGerman: "Zahlen und Zeit",
  description: "Numbers, time, dates, and scheduling are essential A1 survival skills. This module should help learners handle prices, phone numbers, appointments, birthdays, and simple exam listening tasks without freezing.",
  icon: "🔢",
  color: "#10b981",
  totalHours: 12,
  unlockRequirement: "Complete Module 2",
  lessons: [
    // ─── Lesson 3-1: Numbers 0-20 ───
    {
      id: "3-1",
      title: "Numbers 0-20",
      titleGerman: "Zahlen 0-20",
      description: "This lesson should make 0–20 automatic enough for prices, phone numbers, ages, and simple listening tasks. The goal is not just recognition, but fast retrieval under light pressure.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v3-1-1",
          title: "Counting in German 0-10",
          duration: "12:00",
          description: "Start with the basics — your first German numbers from null to zehn.",
          scriptOutline: [
            "Opening: 'Numbers are everywhere — prices, phone numbers, addresses. Let's start counting!'",
            "null (0) — like the English word 'null', means nothing/zero",
            "eins (1) — 'eye-ns', rhymes with 'mines'",
            "zwei (2) — 'tsvye', starts with a 'ts' sound like in 'tsunami'",
            "drei (3) — 'dry', like the English word!",
            "vier (4) — 'feer', like 'fear' with a V sound",
            "fünf (5) — 'fuenf', the ü is like saying 'ee' with rounded lips",
            "sechs (6) — 'zeks', don't confuse with English 'sex'!",
            "sieben (7) — 'zee-ben', nice and easy",
            "acht (8) — 'ahkt', that 'ch' sound we practiced!",
            "neun (9) — 'noyn', rhymes with 'coin'",
            "zehn (10) — 'tsayn', remember the 'ts' start!",
            "Practice round: Counting up and down, speed drill",
            "Kerala connection: Just like we count onnë, randë, moonnë... these become second nature!"
          ],
          keyVocabulary: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"],
          learningObjectives: [
            "Count from 0 to 10 in German confidently",
            "Pronounce each number correctly",
            "Recognize German numbers when heard"
          ],
          placeholderThumbnail: "/images/thumbnails/numbers-0-10.jpg"
        },
        {
          id: "v3-1-2",
          title: "Numbers 11-20",
          duration: "10:00",
          description: "Continue counting with the teen numbers — spot the patterns!",
          scriptOutline: [
            "Quick recap of 0-10 with a speed round",
            "elf (11) — 'elf', yes, like the little fantasy creature!",
            "zwölf (12) — 'tsvoelf', unique like English 'twelve'",
            "Pattern alert! 13-19 follow a rule: unit + zehn",
            "dreizehn (13) = drei + zehn — 'dry-tsayn'",
            "vierzehn (14) = vier + zehn — 'feer-tsayn'",
            "fünfzehn (15), sechzehn (16) — note: sechs loses the 's' → sech-zehn",
            "siebzehn (17) — note: sieben loses the 'en' → sieb-zehn",
            "achtzehn (18), neunzehn (19) — straightforward",
            "zwanzig (20) — 'tsvan-tsig', our first round number!",
            "Memory tricks: 11 and 12 are special, 13-19 follow the pattern",
            "Practice: Random number flashcard game"
          ],
          keyVocabulary: ["elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig"],
          learningObjectives: [
            "Count from 11 to 20 in German",
            "Understand the pattern for teen numbers",
            "Recognize the irregularities in 11, 12, 16, and 17"
          ],
          placeholderThumbnail: "/images/thumbnails/numbers-11-20.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-1-1",
          type: "matching",
          question: "Match the German numbers with their English equivalents:",
          options: ["eins → 1", "fünf → 5", "acht → 8", "drei → 3", "zehn → 10", "sieben → 7"],
          correctAnswer: ["eins → 1", "fünf → 5", "acht → 8", "drei → 3", "zehn → 10", "sieben → 7"],
          explanation: "These are the core numbers 0-10 that form the building blocks for all larger numbers.",
          xpReward: 20
        },
        {
          id: "ex3-1-2",
          type: "multiple-choice",
          question: "What is 'zwölf' in English?",
          options: ["10", "11", "12", "20"],
          correctAnswer: "12",
          explanation: "Zwölf = 12. Like English 'twelve', it's an irregular number that doesn't follow the teen pattern.",
          xpReward: 15
        },
        {
          id: "ex3-1-3",
          type: "fill-blank",
          question: "Complete the pattern: dreizehn (13), vierzehn (14), _____ (15)",
          options: ["fünfzehn", "sechzehn", "fünfzig", "fünf"],
          correctAnswer: "fünfzehn",
          explanation: "The pattern for 13-19 is: unit + zehn. So 15 = fünf + zehn = fünfzehn.",
          xpReward: 20
        },
        {
          id: "ex3-1-4",
          type: "ordering",
          question: "Put these German numbers in order from smallest to largest:",
          options: ["neun", "drei", "sieben", "eins", "fünf"],
          correctAnswer: ["eins", "drei", "fünf", "sieben", "neun"],
          explanation: "eins (1), drei (3), fünf (5), sieben (7), neun (9) — all the odd numbers!",
          xpReward: 20
        },
        {
          id: "ex3-1-5",
          type: "multiple-choice",
          question: "Why does 'sechzehn' (16) drop the 's' from 'sechs'?",
          options: [
            "It's a spelling mistake",
            "For easier pronunciation — 'sechszehn' is hard to say",
            "Because 16 is an unlucky number",
            "It's an old German tradition"
          ],
          correctAnswer: "For easier pronunciation — 'sechszehn' is hard to say",
          explanation: "German drops the 's' from sechs and the 'en' from sieben in teen numbers for smoother pronunciation.",
          xpReward: 15
        },
        {
          id: "ex3-1-6",
          type: "fill-blank",
          question: "Write the German word for 20: _____",
          options: ["zwanzig", "zweiundzwanzig", "zwölf", "dreißig"],
          correctAnswer: "zwanzig",
          explanation: "Zwanzig (20) is the first 'tens' number. It comes from 'zwanz' (related to zwei/two) + '-zig' (the tens suffix).",
          xpReward: 20
        }
      ],
      vocabulary: [
        {
          id: "vocab3-1-1",
          german: "null",
          english: "zero",
          malayalam: "പൂജ്യം",
          pronunciation: "nool",
          example: "Die Temperatur ist null Grad.",
          exampleTranslation: "The temperature is zero degrees."
        },
        {
          id: "vocab3-1-2",
          german: "eins",
          english: "one",
          malayalam: "ഒന്ന്",
          pronunciation: "eye-ns",
          example: "Ich habe eins.",
          exampleTranslation: "I have one."
        },
        {
          id: "vocab3-1-3",
          german: "zwei",
          english: "two",
          malayalam: "രണ്ട്",
          pronunciation: "tsvye",
          example: "Zwei Kaffee, bitte.",
          exampleTranslation: "Two coffees, please."
        },
        {
          id: "vocab3-1-4",
          german: "drei",
          english: "three",
          malayalam: "മൂന്ന്",
          pronunciation: "dry",
          example: "Ich habe drei Geschwister.",
          exampleTranslation: "I have three siblings."
        },
        {
          id: "vocab3-1-5",
          german: "fünf",
          english: "five",
          malayalam: "അഞ്ച്",
          pronunciation: "fuenf",
          example: "Es ist fünf Uhr.",
          exampleTranslation: "It is five o'clock."
        },
        {
          id: "vocab3-1-6",
          german: "zehn",
          english: "ten",
          malayalam: "പത്ത്",
          pronunciation: "tsayn",
          example: "Ich zähle bis zehn.",
          exampleTranslation: "I count to ten."
        },
        {
          id: "vocab3-1-7",
          german: "elf",
          english: "eleven",
          malayalam: "പതിനൊന്ന്",
          pronunciation: "elf",
          example: "Das Spiel beginnt um elf.",
          exampleTranslation: "The game starts at eleven."
        },
        {
          id: "vocab3-1-8",
          german: "zwölf",
          english: "twelve",
          malayalam: "പന്ത്രണ്ട്",
          pronunciation: "tsvoelf",
          example: "Es gibt zwölf Monate.",
          exampleTranslation: "There are twelve months."
        },
        {
          id: "vocab3-1-9",
          german: "fünfzehn",
          english: "fifteen",
          malayalam: "പതിനഞ്ച്",
          pronunciation: "fuenf-tsayn",
          example: "Der Bus kommt in fünfzehn Minuten.",
          exampleTranslation: "The bus comes in fifteen minutes."
        },
        {
          id: "vocab3-1-10",
          german: "zwanzig",
          english: "twenty",
          malayalam: "ഇരുപത്",
          pronunciation: "tsvan-tsig",
          example: "Ich bin zwanzig Jahre alt.",
          exampleTranslation: "I am twenty years old."
        },
        {
          id: "vocab3-1-11",
          german: "sechs",
          english: "six",
          malayalam: "ആറ്",
          pronunciation: "zeks",
          example: "Wir sind sechs Personen.",
          exampleTranslation: "We are six people."
        },
        {
          id: "vocab3-1-12",
          german: "sieben",
          english: "seven",
          malayalam: "ഏഴ്",
          pronunciation: "zee-ben",
          example: "Die Woche hat sieben Tage.",
          exampleTranslation: "The week has seven days."
        },
        {
          id: "vocab3-1-13",
          german: "neun",
          english: "nine",
          malayalam: "ഒമ്പത്",
          pronunciation: "noyn",
          example: "Der Kurs beginnt um neun Uhr.",
          exampleTranslation: "The course starts at nine o'clock."
        }
      ]
    },

    // ─── Lesson 3-2: Numbers 21-100 ───
    {
      id: "3-2",
      title: "Numbers 21-100",
      titleGerman: "Zahlen 21-100",
      description: "Here's the German twist — they say numbers backwards! Twenty-one is 'one-and-twenty'. Once you get the pattern, it's actually fun!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v3-2-1",
          title: "Big Numbers - The German Twist",
          duration: "15:00",
          description: "Discover how Germans reverse their two-digit numbers — and why it's not as hard as it sounds!",
          scriptOutline: [
            "Opening: 'Ready for the German number twist? It's like reading numbers in a mirror!'",
            "The rule: In German, ones come BEFORE tens for 21-99",
            "einundzwanzig (21) = ein + und + zwanzig = 'one and twenty'",
            "zweiunddreißig (32) = zwei + und + dreißig = 'two and thirty'",
            "Kerala parallel: Think of Malayalam — naalpatth-onnu (41) is 'forty-one' order. German does it opposite!",
            "The tens: dreißig (30) — note the special 'ßig' ending, not 'zig'!",
            "vierzig (40), fünfzig (50), sechzig (60) — note: sechs → sech",
            "siebzig (70) — note: sieben → sieb",
            "achtzig (80), neunzig (90)",
            "hundert (100) — 'hoon-dert', the big milestone!",
            "Practice: Building random two-digit numbers",
            "Speed round: Hear a number, write it down",
            "Pro tip: When writing checks or dates, this order really matters!",
            "Phone number practice: Reading out German phone numbers"
          ],
          keyVocabulary: ["einundzwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig", "hundert"],
          learningObjectives: [
            "Understand the ones-before-tens rule in German",
            "Say any two-digit number in German",
            "Count by tens from 20 to 100",
            "Recognize the irregular tens (dreißig, sechzig, siebzig)"
          ],
          placeholderThumbnail: "/images/thumbnails/numbers-big.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-2-1",
          type: "multiple-choice",
          question: "How do you say 45 in German?",
          options: [
            "vierundvierzig",
            "fünfundvierzig",
            "vierfünfzig",
            "fünfvierzig"
          ],
          correctAnswer: "fünfundvierzig",
          explanation: "45 = fünf (5) + und + vierzig (40) = fünfundvierzig. Remember: ones come first!",
          xpReward: 20
        },
        {
          id: "ex3-2-2",
          type: "fill-blank",
          question: "67 in German is sieben_____sechzig.",
          options: ["und", "oder", "mit", "von"],
          correctAnswer: "und",
          explanation: "German two-digit numbers use 'und' (and) between the ones and tens: siebenundsechzig.",
          xpReward: 15
        },
        {
          id: "ex3-2-3",
          type: "multiple-choice",
          question: "Which tens number has a special spelling (uses 'ß' instead of 'z')?",
          options: ["zwanzig (20)", "dreißig (30)", "vierzig (40)", "fünfzig (50)"],
          correctAnswer: "dreißig (30)",
          explanation: "Dreißig is the only tens number that uses 'ßig' instead of 'zig'. All others end in '-zig'.",
          xpReward: 20
        },
        {
          id: "ex3-2-4",
          type: "ordering",
          question: "Arrange these German numbers from smallest to largest:",
          options: ["neunzig", "dreißig", "sechzig", "hundert", "fünfzig"],
          correctAnswer: ["dreißig", "fünfzig", "sechzig", "neunzig", "hundert"],
          explanation: "dreißig (30), fünfzig (50), sechzig (60), neunzig (90), hundert (100).",
          xpReward: 20
        },
        {
          id: "ex3-2-5",
          type: "fill-blank",
          question: "Write 83 in German: _____",
          options: ["dreiundachtzig", "achtunddreißig", "dreizehn", "achtzig"],
          correctAnswer: "dreiundachtzig",
          explanation: "83 = drei (3) + und + achtzig (80) = dreiundachtzig. Ones first, then 'und', then tens!",
          xpReward: 20
        }
      ],
      vocabulary: [
        {
          id: "vocab3-2-1",
          german: "einundzwanzig",
          english: "twenty-one",
          malayalam: "ഇരുപത്തിയൊന്ന്",
          pronunciation: "eye-n-oont-tsvan-tsig",
          example: "Ich bin einundzwanzig Jahre alt.",
          exampleTranslation: "I am twenty-one years old."
        },
        {
          id: "vocab3-2-2",
          german: "dreißig",
          english: "thirty",
          malayalam: "മുപ്പത്",
          pronunciation: "dry-sig",
          example: "Es kostet dreißig Euro.",
          exampleTranslation: "It costs thirty euros."
        },
        {
          id: "vocab3-2-3",
          german: "vierzig",
          english: "forty",
          malayalam: "നാൽപ്പത്",
          pronunciation: "feer-tsig",
          example: "Mein Vater ist vierzig.",
          exampleTranslation: "My father is forty."
        },
        {
          id: "vocab3-2-4",
          german: "fünfzig",
          english: "fifty",
          malayalam: "അമ്പത്",
          pronunciation: "fuenf-tsig",
          example: "Es gibt fünfzig Schüler.",
          exampleTranslation: "There are fifty students."
        },
        {
          id: "vocab3-2-5",
          german: "sechzig",
          english: "sixty",
          malayalam: "അറുപത്",
          pronunciation: "zeg-tsig",
          example: "Sechzig Minuten sind eine Stunde.",
          exampleTranslation: "Sixty minutes are one hour."
        },
        {
          id: "vocab3-2-6",
          german: "siebzig",
          english: "seventy",
          malayalam: "എഴുപത്",
          pronunciation: "zeeb-tsig",
          example: "Meine Großmutter ist siebzig.",
          exampleTranslation: "My grandmother is seventy."
        },
        {
          id: "vocab3-2-7",
          german: "hundert",
          english: "hundred",
          malayalam: "നൂറ്",
          pronunciation: "hoon-dert",
          example: "Hundert Prozent richtig!",
          exampleTranslation: "One hundred percent correct!"
        },
        {
          id: "vocab3-2-8",
          german: "die Zahl",
          english: "the number",
          malayalam: "സംഖ്യ",
          pronunciation: "dee tsaal",
          example: "Was ist deine Lieblingszahl?",
          exampleTranslation: "What is your favourite number?"
        }
      ]
    },

    // ─── Lesson 3-3: What Time Is It? ───
    {
      id: "3-3",
      title: "What Time Is It?",
      titleGerman: "Wie spät ist es?",
      description: "Learn to tell time in German — both the formal 24-hour clock and the casual way Germans talk about time in daily life.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v3-3-1",
          title: "Telling Time - Wie spät ist es?",
          duration: "12:00",
          description: "Master the basics of telling time in German — o'clock, half past, and quarter hours.",
          scriptOutline: [
            "Opening: 'Wie spät ist es? — The question you'll ask every day in Germany!'",
            "The key phrase: 'Es ist...' (It is...)",
            "Full hours: 'Es ist drei Uhr' (It is three o'clock)",
            "Uhr = clock/o'clock — like our 'mani' in Malayalam for time",
            "Half past: 'halb vier' means half BEFORE four = 3:30!",
            "IMPORTANT: 'halb vier' = 3:30, NOT 4:30! This trips everyone up!",
            "Quarter past: 'Viertel nach drei' (quarter after three) = 3:15",
            "Quarter to: 'Viertel vor vier' (quarter before four) = 3:45",
            "nach = after, vor = before — remember these!",
            "Minutes: 'fünf nach drei' (five after three) = 3:05",
            "Practice with a clock face — multiple examples"
          ],
          keyVocabulary: ["Wie spät ist es?", "Es ist", "Uhr", "halb", "Viertel", "nach", "vor"],
          learningObjectives: [
            "Ask and answer 'What time is it?' in German",
            "Tell time using full hours, half hours, and quarter hours",
            "Understand that 'halb' refers to half BEFORE the next hour"
          ],
          placeholderThumbnail: "/images/thumbnails/time-basics.jpg"
        },
        {
          id: "v3-3-2",
          title: "Formal vs Informal Time",
          duration: "10:00",
          description: "Germany uses the 24-hour clock officially — learn both systems!",
          scriptOutline: [
            "Formal time: Germany uses 24-hour clock for schedules, trains, appointments",
            "13:00 = dreizehn Uhr, 15:30 = fünfzehn Uhr dreißig",
            "You'll see 24-hour time on train schedules, movie times, shop hours",
            "Informal time: In conversation, people use 12-hour format",
            "'Der Zug kommt um fünfzehn Uhr dreißig' (formal: train at 15:30)",
            "'Wir treffen uns um halb vier' (informal: we meet at 3:30)",
            "morgens (in the morning), nachmittags (in the afternoon), abends (in the evening)",
            "Kerala parallel: Like how we say 'raavile 8 mani' vs just '8 mani'",
            "Real-life practice: Reading a German train schedule",
            "Common time phrases: pünktlich (on time) — Germans LOVE punctuality!"
          ],
          keyVocabulary: ["morgens", "nachmittags", "abends", "pünktlich", "der Zug"],
          learningObjectives: [
            "Read and use 24-hour (formal) time",
            "Understand when to use formal vs informal time",
            "Know time-of-day words (morning, afternoon, evening)"
          ],
          placeholderThumbnail: "/images/thumbnails/time-formal.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-3-1",
          type: "multiple-choice",
          question: "What time is 'halb vier'?",
          options: ["4:30", "3:30", "3:15", "4:15"],
          correctAnswer: "3:30",
          explanation: "'Halb vier' means half (way to) four = 3:30. This is one of the trickiest parts of German time!",
          xpReward: 20
        },
        {
          id: "ex3-3-2",
          type: "fill-blank",
          question: "3:15 in German is 'Viertel _____ drei'.",
          options: ["nach", "vor", "halb", "um"],
          correctAnswer: "nach",
          explanation: "Viertel nach drei = quarter AFTER three = 3:15. 'Nach' means after.",
          xpReward: 15
        },
        {
          id: "ex3-3-3",
          type: "multiple-choice",
          question: "How do you say 7:45 in informal German?",
          options: [
            "Viertel vor acht",
            "Viertel nach sieben",
            "halb acht",
            "Viertel vor sieben"
          ],
          correctAnswer: "Viertel vor acht",
          explanation: "7:45 = quarter BEFORE eight = 'Viertel vor acht'. 'Vor' means before.",
          xpReward: 20
        },
        {
          id: "ex3-3-4",
          type: "fill-blank",
          question: "'It is five o'clock' in German: Es ist fünf _____.",
          options: ["Uhr", "Stunde", "Zeit", "Minuten"],
          correctAnswer: "Uhr",
          explanation: "'Uhr' means 'clock' or 'o'clock'. 'Es ist fünf Uhr' = It is five o'clock.",
          xpReward: 15
        },
        {
          id: "ex3-3-5",
          type: "multiple-choice",
          question: "What does 'fünfzehn Uhr dreißig' mean?",
          options: ["5:30 AM", "3:30 PM", "1:30 PM", "5:30 PM"],
          correctAnswer: "3:30 PM",
          explanation: "Fünfzehn Uhr dreißig = 15:30 in 24-hour format = 3:30 PM.",
          xpReward: 20
        },
        {
          id: "ex3-3-6",
          type: "matching",
          question: "Match the German time expressions to their meanings:",
          options: ["morgens → in the morning", "nachmittags → in the afternoon", "abends → in the evening", "pünktlich → on time"],
          correctAnswer: ["morgens → in the morning", "nachmittags → in the afternoon", "abends → in the evening", "pünktlich → on time"],
          explanation: "These time-of-day words help specify AM or PM when using the informal 12-hour clock.",
          xpReward: 20
        }
      ],
      vocabulary: [
        {
          id: "vocab3-3-1",
          german: "Wie spät ist es?",
          english: "What time is it?",
          malayalam: "എത്ര മണിയായി?",
          pronunciation: "vee shpayt ist es",
          example: "Entschuldigung, wie spät ist es?",
          exampleTranslation: "Excuse me, what time is it?"
        },
        {
          id: "vocab3-3-2",
          german: "die Uhr",
          english: "clock / o'clock",
          malayalam: "ഘടികാരം / മണി",
          pronunciation: "dee oor",
          example: "Es ist drei Uhr.",
          exampleTranslation: "It is three o'clock."
        },
        {
          id: "vocab3-3-3",
          german: "halb",
          english: "half (before the next hour)",
          malayalam: "പകുതി (അടുത്ത മണിക്കൂറിന് മുമ്പ്)",
          pronunciation: "halp",
          example: "Es ist halb sechs.",
          exampleTranslation: "It is 5:30 (half to six)."
        },
        {
          id: "vocab3-3-4",
          german: "Viertel",
          english: "quarter",
          malayalam: "കാൽ",
          pronunciation: "feer-tel",
          example: "Es ist Viertel nach zehn.",
          exampleTranslation: "It is quarter past ten."
        },
        {
          id: "vocab3-3-5",
          german: "nach",
          english: "after / past",
          malayalam: "കഴിഞ്ഞ്",
          pronunciation: "nahk",
          example: "Es ist zehn nach acht.",
          exampleTranslation: "It is ten past eight."
        },
        {
          id: "vocab3-3-6",
          german: "vor",
          english: "before / to",
          malayalam: "മുമ്പ്",
          pronunciation: "for",
          example: "Es ist fünf vor zwölf.",
          exampleTranslation: "It is five to twelve."
        },
        {
          id: "vocab3-3-7",
          german: "morgens",
          english: "in the morning",
          malayalam: "രാവിലെ",
          pronunciation: "mor-gens",
          example: "Ich stehe morgens um sechs auf.",
          exampleTranslation: "I get up at six in the morning."
        },
        {
          id: "vocab3-3-8",
          german: "pünktlich",
          english: "on time / punctual",
          malayalam: "സമയനിഷ്ഠ",
          pronunciation: "puenkt-likh",
          example: "Der Zug ist immer pünktlich.",
          exampleTranslation: "The train is always on time."
        }
      ]
    },

    // ─── Lesson 3-4: Days of the Week & Months ───
    {
      id: "3-4",
      title: "Days of the Week & Months",
      titleGerman: "Wochentage und Monate",
      description: "From Montag to Sonntag and Januar to Dezember — learn the calendar in German, plus the four seasons!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v3-4-1",
          title: "Montag to Sonntag & Januar to Dezember",
          duration: "15:00",
          description: "All the days, months, and seasons you need to navigate a German calendar.",
          scriptOutline: [
            "Opening: 'Let's fill your German calendar — days, months, and seasons!'",
            "Days of the week — all end in '-tag' (day):",
            "Montag (Monday) — Moon-day, like English!",
            "Dienstag (Tuesday), Mittwoch (Wednesday) — 'Mitte der Woche' = middle of the week!",
            "Donnerstag (Thursday) — 'Donner' = thunder, like Thor's day!",
            "Freitag (Friday), Samstag (Saturday), Sonntag (Sunday) — Sun-day!",
            "Pro tip: German week starts on Montag, not Sunday like in India!",
            "Months — many sound similar to English!",
            "Januar, Februar, März, April, Mai, Juni",
            "Juli, August, September, Oktober, November, Dezember",
            "Kerala parallel: Notice how many months sound almost the same as English!",
            "Seasons: Frühling (spring), Sommer (summer), Herbst (autumn), Winter (winter)",
            "Germany has VERY different seasons from Kerala — real snow in winter!",
            "Practice: 'Heute ist Montag' (Today is Monday), month names speed drill"
          ],
          keyVocabulary: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag", "Januar", "Dezember", "Frühling", "Sommer", "Herbst", "Winter"],
          learningObjectives: [
            "Name all 7 days of the week in German",
            "Name all 12 months in German",
            "Know the 4 seasons in German",
            "Understand German calendar conventions"
          ],
          placeholderThumbnail: "/images/thumbnails/days-months.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-4-1",
          type: "ordering",
          question: "Put the days of the week in the correct order (starting from Monday):",
          options: ["Freitag", "Mittwoch", "Montag", "Donnerstag", "Dienstag"],
          correctAnswer: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
          explanation: "The German work week: Montag, Dienstag, Mittwoch, Donnerstag, Freitag.",
          xpReward: 20
        },
        {
          id: "ex3-4-2",
          type: "multiple-choice",
          question: "What does 'Mittwoch' literally mean?",
          options: [
            "My day",
            "Middle of the week",
            "Third day",
            "Market day"
          ],
          correctAnswer: "Middle of the week",
          explanation: "'Mittwoch' comes from 'Mitte der Woche' = middle of the week (Wednesday).",
          xpReward: 15
        },
        {
          id: "ex3-4-3",
          type: "fill-blank",
          question: "The German word for March is: _____",
          options: ["März", "Mai", "Montag", "Mittwoch"],
          correctAnswer: "März",
          explanation: "März = March. Note the Umlaut (ä) — it's pronounced like 'mairts'.",
          xpReward: 15
        },
        {
          id: "ex3-4-4",
          type: "matching",
          question: "Match the seasons with their German names:",
          options: ["Frühling → Spring", "Sommer → Summer", "Herbst → Autumn", "Winter → Winter"],
          correctAnswer: ["Frühling → Spring", "Sommer → Summer", "Herbst → Autumn", "Winter → Winter"],
          explanation: "Frühling (spring), Sommer (summer), Herbst (autumn), Winter (winter).",
          xpReward: 20
        },
        {
          id: "ex3-4-5",
          type: "multiple-choice",
          question: "Which month name is MOST different from its English equivalent?",
          options: ["Februar", "Oktober", "März", "August"],
          correctAnswer: "März",
          explanation: "März (March) looks and sounds the most different due to the Umlaut. Most other months are nearly identical to English.",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab3-4-1",
          german: "Montag",
          english: "Monday",
          malayalam: "തിങ്കളാഴ്ച",
          pronunciation: "mohn-tahg",
          example: "Am Montag gehe ich zur Arbeit.",
          exampleTranslation: "On Monday I go to work."
        },
        {
          id: "vocab3-4-2",
          german: "Dienstag",
          english: "Tuesday",
          malayalam: "ചൊവ്വാഴ്ച",
          pronunciation: "deens-tahg",
          example: "Dienstag ist mein Lieblingstag.",
          exampleTranslation: "Tuesday is my favourite day."
        },
        {
          id: "vocab3-4-3",
          german: "Mittwoch",
          english: "Wednesday",
          malayalam: "ബുധനാഴ്ച",
          pronunciation: "mit-vokh",
          example: "Am Mittwoch habe ich frei.",
          exampleTranslation: "On Wednesday I have a day off."
        },
        {
          id: "vocab3-4-4",
          german: "Donnerstag",
          english: "Thursday",
          malayalam: "വ്യാഴാഴ്ച",
          pronunciation: "don-ers-tahg",
          example: "Donnerstag kommt nach Mittwoch.",
          exampleTranslation: "Thursday comes after Wednesday."
        },
        {
          id: "vocab3-4-5",
          german: "Freitag",
          english: "Friday",
          malayalam: "വെള്ളിയാഴ്ച",
          pronunciation: "fry-tahg",
          example: "Am Freitag gehen wir aus.",
          exampleTranslation: "On Friday we go out."
        },
        {
          id: "vocab3-4-6",
          german: "Samstag",
          english: "Saturday",
          malayalam: "ശനിയാഴ്ച",
          pronunciation: "zahms-tahg",
          example: "Samstag ist Einkaufstag.",
          exampleTranslation: "Saturday is shopping day."
        },
        {
          id: "vocab3-4-7",
          german: "Sonntag",
          english: "Sunday",
          malayalam: "ഞായറാഴ്ച",
          pronunciation: "zon-tahg",
          example: "Am Sonntag ruhen wir uns aus.",
          exampleTranslation: "On Sunday we rest."
        },
        {
          id: "vocab3-4-8",
          german: "der Monat",
          english: "the month",
          malayalam: "മാസം",
          pronunciation: "dehr moh-naht",
          example: "Ein Jahr hat zwölf Monate.",
          exampleTranslation: "A year has twelve months."
        },
        {
          id: "vocab3-4-9",
          german: "die Woche",
          english: "the week",
          malayalam: "ആഴ്ച",
          pronunciation: "dee vo-khuh",
          example: "Die Woche hat sieben Tage.",
          exampleTranslation: "The week has seven days."
        },
        {
          id: "vocab3-4-10",
          german: "der Frühling",
          english: "spring (season)",
          malayalam: "വസന്തകാലം",
          pronunciation: "dehr frue-ling",
          example: "Im Frühling blühen die Blumen.",
          exampleTranslation: "In spring the flowers bloom."
        },
        {
          id: "vocab3-4-11",
          german: "der Herbst",
          english: "autumn",
          malayalam: "ശരത്കാലം",
          pronunciation: "dehr herpst",
          example: "Im Herbst fallen die Blätter.",
          exampleTranslation: "In autumn the leaves fall."
        },
        {
          id: "vocab3-4-12",
          german: "die Jahreszeit",
          english: "the season",
          malayalam: "ഋതു",
          pronunciation: "dee yah-res-tsyte",
          example: "Deutschland hat vier Jahreszeiten.",
          exampleTranslation: "Germany has four seasons."
        }
      ]
    },

    // ─── Lesson 3-5: Dates & Birthdays ───
    {
      id: "3-5",
      title: "Dates & Birthdays",
      titleGerman: "Datum und Geburtstage",
      description: "Learn ordinal numbers, the German date format, and how to ask about birthdays. Plus — master the important verb 'haben' (to have)!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v3-5-1",
          title: "Wann hast du Geburtstag?",
          duration: "12:00",
          description: "Birthdays, dates, and ordinal numbers — celebrate like a German!",
          scriptOutline: [
            "Opening: 'Wann hast du Geburtstag? — When is your birthday? Let's find out how to answer!'",
            "German date format: Tag.Monat.Jahr (DD.MM.YYYY) — opposite of American, same as Indian!",
            "Example: 15.08.1947 = der fünfzehnte August neunzehnhundertsiebenundvierzig",
            "Ordinal numbers — adding '-te' (1-19) or '-ste' (20+):",
            "erste (1st), zweite (2nd), dritte (3rd) — these are irregular!",
            "vierte (4th), fünfte (5th), sechste (6th), siebte (7th) — regular pattern",
            "achte (8th) — drops an 't', not 'achtte'",
            "neunte (9th), zehnte (10th)... zwanzigste (20th), dreißigste (30th)",
            "Grammar spotlight: 'haben' (to have) conjugation:",
            "ich habe (I have), du hast (you have), er/sie hat (he/she has)",
            "wir haben (we have), ihr habt (you all have), sie haben (they have)",
            "Kerala parallel: 'Enikku birthday January il aanu' → 'Ich habe im Januar Geburtstag'",
            "Practice dialogue: Asking and answering birthday questions",
            "Fun fact: Germans celebrate 'Namenstag' (name day) too in some regions!"
          ],
          keyVocabulary: ["der Geburtstag", "Wann?", "erste", "zweite", "dritte", "haben", "das Datum"],
          learningObjectives: [
            "Say and understand dates in German format",
            "Use ordinal numbers (first through thirty-first)",
            "Conjugate 'haben' (to have) in the present tense",
            "Ask and answer birthday questions"
          ],
          placeholderThumbnail: "/images/thumbnails/dates-birthday.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-5-1",
          type: "multiple-choice",
          question: "How does Germany write the date 5th March 2024?",
          options: [
            "03.05.2024",
            "05.03.2024",
            "2024.03.05",
            "5/3/2024"
          ],
          correctAnswer: "05.03.2024",
          explanation: "Germany uses Tag.Monat.Jahr (DD.MM.YYYY): 05.03.2024.",
          xpReward: 15
        },
        {
          id: "ex3-5-2",
          type: "fill-blank",
          question: "Complete the conjugation: ich habe, du _____, er hat.",
          options: ["hast", "habe", "hat", "haben"],
          correctAnswer: "hast",
          explanation: "'Haben' conjugation: ich habe, du hast, er/sie/es hat.",
          xpReward: 15
        },
        {
          id: "ex3-5-3",
          type: "multiple-choice",
          question: "What is the ordinal form of 'drei' (3)?",
          options: ["dreite", "dritte", "dreiste", "dreiete"],
          correctAnswer: "dritte",
          explanation: "'Dritte' (third) is irregular. It doesn't follow the regular '-te' pattern of 'dreite'.",
          xpReward: 20
        },
        {
          id: "ex3-5-4",
          type: "fill-blank",
          question: "Wann _____ du Geburtstag? — When is your birthday?",
          options: ["hast", "habe", "hat", "bist"],
          correctAnswer: "hast",
          explanation: "'Wann hast du Geburtstag?' uses 'du hast' (you have). German says 'you have birthday' not 'your birthday is'.",
          xpReward: 15
        },
        {
          id: "ex3-5-5",
          type: "matching",
          question: "Match the ordinal numbers:",
          options: ["erste → first", "zweite → second", "dritte → third", "achte → eighth"],
          correctAnswer: ["erste → first", "zweite → second", "dritte → third", "achte → eighth"],
          explanation: "Erste, zweite, dritte, and achte are all irregular ordinal numbers in German.",
          xpReward: 20
        }
      ],
      vocabulary: [
        {
          id: "vocab3-5-1",
          german: "der Geburtstag",
          english: "birthday",
          malayalam: "ജന്മദിനം",
          pronunciation: "dehr geh-boorts-tahg",
          example: "Mein Geburtstag ist am dritten Mai.",
          exampleTranslation: "My birthday is on the third of May."
        },
        {
          id: "vocab3-5-2",
          german: "das Datum",
          english: "the date",
          malayalam: "തീയതി",
          pronunciation: "das dah-toom",
          example: "Welches Datum ist heute?",
          exampleTranslation: "What is today's date?"
        },
        {
          id: "vocab3-5-3",
          german: "haben",
          english: "to have",
          malayalam: "ഉണ്ടായിരിക്കുക",
          pronunciation: "hah-ben",
          example: "Ich habe zwei Brüder.",
          exampleTranslation: "I have two brothers."
        },
        {
          id: "vocab3-5-4",
          german: "erste",
          english: "first",
          malayalam: "ഒന്നാമത്തെ",
          pronunciation: "ehr-stuh",
          example: "Der erste Januar ist Neujahr.",
          exampleTranslation: "The first of January is New Year."
        },
        {
          id: "vocab3-5-5",
          german: "das Jahr",
          english: "the year",
          malayalam: "വർഷം",
          pronunciation: "das yahr",
          example: "Ein Jahr hat zwölf Monate.",
          exampleTranslation: "A year has twelve months."
        },
        {
          id: "vocab3-5-6",
          german: "heute",
          english: "today",
          malayalam: "ഇന്ന്",
          pronunciation: "hoy-tuh",
          example: "Heute ist Freitag.",
          exampleTranslation: "Today is Friday."
        }
      ]
    },

    // ─── Lesson 3-6: Making Appointments ───
    {
      id: "3-6",
      title: "Making Appointments",
      titleGerman: "Termine machen",
      description: "Put it all together — schedule meetings, make plans, and ask about times like a pro. Germans take punctuality seriously!",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v3-6-1",
          title: "Um wie viel Uhr? - Scheduling in German",
          duration: "14:00",
          description: "Learn to make appointments, ask about schedules, and use time phrases in real conversations.",
          scriptOutline: [
            "Opening: 'Time to put everything together! Let's make plans in German!'",
            "Key question words for scheduling:",
            "Wann? (When?) — the most basic time question",
            "Um wie viel Uhr? (At what time?) — more specific",
            "Wie lange? (How long?) — for duration",
            "Answering with 'am' + day: 'Am Montag' (On Monday)",
            "Answering with 'um' + time: 'Um drei Uhr' (At three o'clock)",
            "Combining: 'Am Montag um drei Uhr' (On Monday at three o'clock)",
            "Duration: 'Von drei bis fünf Uhr' (From three to five o'clock)",
            "von...bis = from...to — very useful!",
            "Practical dialogues:",
            "Making a doctor's appointment: 'Ich möchte einen Termin, bitte.'",
            "Meeting a friend: 'Wann treffen wir uns?' — 'Um halb vier!'",
            "Kerala parallel: Germans are VERY punctual — 'IST' (Indian Stretchable Time) won't work!",
            "If you say 3:00, they mean 3:00, not 3:15!",
            "Practice: Role-play scheduling scenarios"
          ],
          keyVocabulary: ["Wann?", "Um wie viel Uhr?", "Wie lange?", "am", "um", "von", "bis", "der Termin"],
          learningObjectives: [
            "Ask when, at what time, and how long in German",
            "Schedule appointments using days and times",
            "Use 'von...bis...' for time ranges",
            "Understand German punctuality culture"
          ],
          placeholderThumbnail: "/images/thumbnails/appointments.jpg"
        }
      ],
      exercises: [
        {
          id: "ex3-6-1",
          type: "multiple-choice",
          question: "How do you ask 'At what time?' in German?",
          options: [
            "Wie spät ist es?",
            "Um wie viel Uhr?",
            "Wann ist es?",
            "Wie viel Zeit?"
          ],
          correctAnswer: "Um wie viel Uhr?",
          explanation: "'Um wie viel Uhr?' = 'At what time?'. 'Wie spät ist es?' asks 'What time is it now?'",
          xpReward: 15
        },
        {
          id: "ex3-6-2",
          type: "fill-blank",
          question: "'On Monday at 3 o'clock' in German: _____ Montag um drei Uhr.",
          options: ["Am", "Im", "Um", "An"],
          correctAnswer: "Am",
          explanation: "'Am' is used before days of the week: 'Am Montag' (On Monday).",
          xpReward: 15
        },
        {
          id: "ex3-6-3",
          type: "fill-blank",
          question: "'From 2 to 4 o'clock' in German: _____ zwei bis vier Uhr.",
          options: ["Von", "Um", "Am", "Bis"],
          correctAnswer: "Von",
          explanation: "'Von...bis...' = 'From...to...' is used for time ranges.",
          xpReward: 20
        },
        {
          id: "ex3-6-4",
          type: "multiple-choice",
          question: "Your German friend says 'Treffen wir uns um halb drei.' When should you arrive?",
          options: ["2:30", "3:30", "2:00", "3:00"],
          correctAnswer: "2:30",
          explanation: "'Halb drei' = half (way to) three = 2:30. In Germany, be on time — not even 5 minutes late!",
          xpReward: 20
        },
        {
          id: "ex3-6-5",
          type: "multiple-choice",
          question: "What does 'der Termin' mean?",
          options: ["The terminal", "The appointment", "The deadline", "The time"],
          correctAnswer: "The appointment",
          explanation: "'Der Termin' = the appointment / scheduled meeting. Don't confuse it with English 'terminal'!",
          xpReward: 15
        },
        {
          id: "ex3-6-6",
          type: "fill-blank",
          question: "'_____ lange dauert der Film?' (How long does the movie last?)",
          options: ["Wie", "Was", "Wo", "Wann"],
          correctAnswer: "Wie",
          explanation: "'Wie lange?' = 'How long?' is used to ask about duration.",
          xpReward: 15
        },
        {
          id: "ex3-6-7",
          type: "fill-blank",
          question: "Type in German: 'It is three o'clock.' (Es ist...)",
          options: ["Es ist drei Uhr", "Es ist drei", "Es drei Uhr ist", "Drei Uhr es ist"],
          correctAnswer: "Es ist drei Uhr",
          explanation: "'Es ist [number] Uhr' is the standard way to tell the time in German. Don't forget 'Uhr'!",
          xpReward: 15
        },
        {
          id: "ex3-6-8",
          type: "fill-blank",
          question: "Type in German: 'I have an appointment on Monday.' (Ich habe...)",
          options: ["Ich habe am Montag einen Termin", "Ich habe einen Termin Montag", "Ich habe Montag am Termin", "Am Montag ich habe einen Termin"],
          correctAnswer: "Ich habe am Montag einen Termin",
          explanation: "'Ich habe am Montag einen Termin.' — Use 'am' before days of the week and 'einen' because Termin is masculine (accusative).",
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab3-6-1",
          german: "der Termin",
          english: "the appointment",
          malayalam: "അപ്പോയിന്റ്മെന്റ്",
          pronunciation: "dehr ter-meen",
          example: "Ich habe einen Termin um zehn Uhr.",
          exampleTranslation: "I have an appointment at ten o'clock."
        },
        {
          id: "vocab3-6-2",
          german: "Wann?",
          english: "When?",
          malayalam: "എപ്പോൾ?",
          pronunciation: "van",
          example: "Wann beginnt der Kurs?",
          exampleTranslation: "When does the course start?"
        },
        {
          id: "vocab3-6-3",
          german: "von ... bis ...",
          english: "from ... to ...",
          malayalam: "... മുതൽ ... വരെ",
          pronunciation: "fon ... bis ...",
          example: "Ich arbeite von neun bis fünf.",
          exampleTranslation: "I work from nine to five."
        },
        {
          id: "vocab3-6-4",
          german: "treffen",
          english: "to meet",
          malayalam: "കാണുക",
          pronunciation: "tref-fen",
          example: "Wir treffen uns am Freitag.",
          exampleTranslation: "We meet on Friday."
        },
        {
          id: "vocab3-6-5",
          german: "dauern",
          english: "to last / to take (time)",
          malayalam: "നീണ്ടുനിൽക്കുക",
          pronunciation: "dow-ern",
          example: "Der Film dauert zwei Stunden.",
          exampleTranslation: "The movie lasts two hours."
        },
        {
          id: "vocab3-6-6",
          german: "die Stunde",
          english: "the hour",
          malayalam: "മണിക്കൂർ",
          pronunciation: "dee shtoon-duh",
          example: "Eine Stunde hat sechzig Minuten.",
          exampleTranslation: "One hour has sixty minutes."
        }
      ]
    }
  ]
};
