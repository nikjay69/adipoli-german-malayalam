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
  learningTips: [
    "German reverses numbers: 21 = einundzwanzig (one-and-twenty). Practice counting backwards!",
    "Write the time in German every time you check your phone today.",
    "Numbers become automatic only with daily practice. Count your steps in German!",
  ],
  lessons: [
    // ─── Lesson 3-1: Numbers 0-20 ───
    {
      id: "3-1",
      title: "Numbers 0-20",
      titleGerman: "Zahlen 0-20",
      description: "This lesson should make 0–20 automatic enough for prices, phone numbers, ages, and simple listening tasks. The goal is not just recognition, but fast retrieval under light pressure.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Lidl Supermarket, checkout line",
          sceneType: "shopping",
          timeOfDay: "afternoon",
          description: "The familiar blue-and-yellow beep of the Lidl checkout. You've got a bag of Brötchen, some milk, and eggs. The line is moving fast — typical German efficiency. You need to understand the price the cashier says before the person behind you starts getting impatient. No pressure, machane!",
        },
        narrative: {
          previousRecap: "You've successfully introduced yourself at the airport. Now, you need to survive your first grocery run!",
          currentObjective: "Understand prices and small numbers (0-20) in a fast-paced retail environment",
          nextTeaser: "Next: bigger numbers at the bakery! Time for the 'one-and-twenty' reversal twist!",
        },
        kuttanIntro: [
          "Machane! Germany-il Lidl/Aldi checkout line-il 'patience' kuravaanu. Cashier lightning speed-ile barcode scan cheyyu — speed level 100!",
          "Nammal total samyam mathramalla, 'Cent' vs 'Euro' price-um catch cheyyanam. Digital board-ile comma (,) nokkan marakkalle, athanu decimal separator.",
          "0-20 numbers simple aanu — English 'eleven' and 'twelve' pole 'elf' and 'zwölf' mathram oru special case. Let's clear this level!",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-1-3", encounterMoment: "The cashier holds up two fingers: 'Zwei Euro, bitte.' She's waiting for your coins.", contextSentence: "Das macht zwei Euro." },
          { vocabId: "vocab3-1-5", encounterMoment: "You see a pack of 5 eggs. 'Fünf Eier,' you count to yourself. Numbers are getting useful!", contextSentence: "Fünf Eier, bitte." },
          { vocabId: "vocab3-1-9", encounterMoment: "The total price on the screen shows 15,40. The cashier says: 'Fünfzehn Euro vierzig.'", contextSentence: "Das macht fünfzehn Euro vierzig." },
          { vocabId: "vocab3-1-10", encounterMoment: "You hand over a 20 Euro note. 'Zwanzig Euro,' the cashier acknowledges with a nod.", contextSentence: "Hier sind zwanzig Euro." },
          { vocabId: "vocab3-1-8", encounterMoment: "You see the number of eggs in a carton: 'Zwölf Stück.' Twelve pieces. 'Zwölf' is a rebel number, machane!", contextSentence: "Zwölf Eier." },
        ],
        decisionPoints: [
          {
            moment: "The screen says '4,50 €'. The cashier is looking at you. How do you prepare the money?",
            options: [
              { text: "Four Euro and fifty cents.", isCorrect: true, response: "Exactly! You count out four Euros and two twenty-cent coins + one ten-cent coin. Pro level!", kuttanReaction: "Adipoli! 4,50 ennu digital board-il kandaal 'Vier Euro fünfzig' ennu vayikkaam. Comma decimal separator aano ennorkkane! 😉" },
              { text: "Forty-five Euro.", isCorrect: false, response: "The cashier laughs gently: 'Nein, vier Euro fünfzig Cent, bitte!' That comma is a decimal, not a thousands separator!", kuttanReaction: "Aiyyo! 4,50 kandaal 45 aano? Decimal separator ivide comma aanu (,)! Pinne 45 Euro-inu oru paal-um bread-um kittillallo! Try again! 😬" },
            ],
          },
          {
            moment: "You hear 'Zwölf' for the egg carton. Which number is that?",
            options: [
              { text: "12", isCorrect: true, response: "Correct! 'Zwölf' is 12. You're starting to hear the difference!", kuttanReaction: "Super machane! 11 is 'elf', 12 is 'zwölf'. Ithu randum pattern-il varatha numbers aanu, so memorize cheyyanam. High-five! ✋" },
              { text: "20", isCorrect: false, response: "Incorrect! 20 is 'zwanzig'. 'Zwölf' is lower, machane!", kuttanReaction: "Vite machane! 20 is 'zwanzig' (Z-sounding). 12 is 'zwölf' (Tsv-sounding). Confusion venal training koottaam! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v3-1-1",
          title: "Counting in German 0-10",
          duration: "12:00",
          description: "Start with the basics — your first German numbers from null to zehn.",
          scriptOutline: [
            "Opening: 'Namaskaram machane! Numbers are everywhere — prices, phone numbers, bus numbers. Let's start counting!'",
            "null (0) — like English 'null', valya scene illa",
            "eins (1) — 'eye-ns', rhymes with 'mines'",
            "zwei (2) — 'tsvye', starts with 'ts' sound like 'tsunami'",
            "drei (3) — 'dry', rhymes with English 'dry'",
            "vier (4) — 'feer', rhymes with 'fear'",
            "fünf (5) — 'fuenf', ü is like saying 'ee' with rounded lips",
            "sechs (6) — 'zeks', rhymes with 'decks'",
            "sieben (7) — 'zee-ben', cool and calm",
            "acht (8) — 'ahkt', that 'ch' sound we practiced!",
            "neun (9) — 'noyn', rhymes with 'coin'",
            "zehn (10) — 'tsayn', ts-sound venam!",
            "Practice: Counting up and down — speed speed!",
            "Kerala connection: Just like onnë, randë, moonnë... these become natural with practice!"
          ],
          keyVocabulary: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"],
          learningObjectives: [
            "Count from 0 to 10 in German confidently",
            "Pronounce each number correctly",
            "Recognize German numbers when heard"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "German Numbers 0-10",
              headers: ["Number", "German", "Pronunciation"],
              rows: [
                ["0", "null", "nool"],
                ["1", "eins", "eye-ns"],
                ["2", "zwei", "tsvye"],
                ["3", "drei", "dry"],
                ["4", "vier", "feer"],
                ["5", "fünf", "fuenf"],
                ["6", "sechs", "zeks"],
                ["7", "sieben", "zee-ben"],
                ["8", "acht", "ahkt"],
                ["9", "neun", "noyn"],
                ["10", "zehn", "tsayn"]
              ]
            },
            {
              type: "note",
              title: "Decimal Separator Trap!",
              variant: "warning",
              content: "Germany uses a COMMA (,) as the decimal separator, not a dot! So 4,50 means four euros and fifty cents. Don't confuse 4,50 with 450!"
            },
            {
              type: "note",
              title: "Quick Memory Trick",
              variant: "tip",
              content: "'zwei' starts with 'ts' like 'tsunami'. 'drei' rhymes with English 'dry'. 'vier' rhymes with 'fear'. Count your fingers in German every morning!"
            }
          ]
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
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Numbers 11-20",
              headers: ["Number", "German", "Pattern"],
              rows: [
                ["11", "elf", "Irregular!"],
                ["12", "zwölf", "Irregular!"],
                ["13", "dreizehn", "drei + zehn"],
                ["14", "vierzehn", "vier + zehn"],
                ["15", "fünfzehn", "fünf + zehn"],
                ["16", "sechzehn", "sech + zehn (no 's'!)"],
                ["17", "siebzehn", "sieb + zehn (no 'en'!)"],
                ["18", "achtzehn", "acht + zehn"],
                ["19", "neunzehn", "neun + zehn"],
                ["20", "zwanzig", "First round number!"]
              ]
            },
            {
              type: "note",
              title: "Watch Out for 16 and 17!",
              variant: "warning",
              content: "16 is 'sechzehn' (NOT 'sechszehn' — the 's' is dropped). 17 is 'siebzehn' (NOT 'siebenzehn' — the 'en' is dropped). These are the two sneaky exceptions in the teens!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex3-1-1",
          type: "type-answer",
          question: "Write the number 7 in German.",
          correctAnswer: "sieben",
          explanation: "'Sieben' = 7. One of the first numbers to memorize!",
          xpReward: 15
        },
        { id: "ex3-1-2", type: "multiple-choice", question: "Which German number is 'zwölf'?", questionGerman: "Welche Zahl ist 'zwölf'?", options: ["12", "11", "20", "2"], correctAnswer: "12", explanation: "'Zwölf' = 12. It's irregular — just memorize it along with 'elf' (11)!", xpReward: 10 },
        {
          id: "ex3-1-3",
          type: "fill-blank",
          question: "Complete the pattern: dreizehn (13), vierzehn (14), _____ (15)",
          options: ["fünfzehn", "sechzehn", "fünfzig", "fünf"],
          correctAnswer: "fünfzehn",
          explanation: "Teen numbers = unit + zehn. So 15 = fünf+zehn = fünfzehn. But watch for shortcuts: sechs drops the 's' (sechzehn), sieben drops the 'en' (siebzehn).",
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
          type: "type-answer",
          question: "Write 16 in German.",
          correctAnswer: "sechzehn",
          explanation: "'Sechzehn' = 16. Note: 'sechs' drops the 's' when combined with 'zehn' for easier pronunciation.",
          xpReward: 15
        },
        {
          id: "ex3-1-6",
          type: "fill-blank",
          question: "Write the German word for 20: _____",
          options: ["zwanzig", "zweiundzwanzig", "zwölf", "dreißig"],
          correctAnswer: "zwanzig",
          explanation: "'-zig' is the German suffix for tens: zwanzig (20), dreißig (30), vierzig (40)... Exception: dreißig uses '-ßig' instead of '-zig'. All others are regular!",
          xpReward: 20
        },
        {
          id: "ex3-1-7",
          type: "dictation",
          question: "Listen and type the number: 17 (siebzehn)",
          correctAnswer: "siebzehn",
          explanation: "Remember the spelling: sieben loses the 'en' when combined with 'zehn'.",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-17.mp3"
        },
        {
          id: "ex3-1-8",
          type: "free-text",
          question: "How do you say 'fifteen' in German?",
          correctAnswer: "fünfzehn",
          explanation: "Fünf (5) + zehn (10) = fünfzehn (15). Just like English, except simpler!",
          xpReward: 25
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
      storyScene: {
        setting: {
          name: "Traditional Bakery (Bäckerei), Berlin",
          sceneType: "cafe",
          timeOfDay: "morning",
          description: "The divine smell of freshly baked Brot and cinnamon rolls. You're at the counter of a 'Kiez-Bäckerei'. It's busy, and the cashier is calling out totals. You've ordered for yourself and your WG friend. Now comes the real challenge: German two-digit numbers.",
        },
        narrative: {
          previousRecap: "You've survived the supermarket. Now, let's move to 21-100. It's time to learn the 'one-and-twenty' logic!",
          currentObjective: "Master the reversed number system (ones before tens) in a social context",
          nextTeaser: "Next: catch the U-Bahn on time! The 'halb' time trap awaits!",
        },
        kuttanIntro: [
          "Machane! German numbers-inte logic oru bit weird aanu. English-il 'twenty-one' ennu parayumpo, German-il 'one-and-twenty' (einundzwanzig) ennu parayanam.",
          "Mirror image logic aanu — last digit first parayanam. Ithu thudiakkathil nalla confusion undakkum. But relax, once it clicks, it's actually fun!",
          "Bakery-il 24 Euro ennu parayumpo, mind-il 'four-and-twenty' (vierundzwanzig) ennu thonnikkanam. Let's practice this twist!",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-2-1", encounterMoment: "The cashier says: 'Das macht einundzwanzig Euro, bitte.' You pause to do the mental math.", contextSentence: "Das macht einundzwanzig Euro." },
          { vocabId: "vocab3-2-2", encounterMoment: "You see a sign: 'Großes Frühstück für dreißig Euro.' A bit pricey, but looks delicious!", contextSentence: "Dreißig Euro, bitte." },
          { vocabId: "vocab3-2-3", encounterMoment: "Another customer pays 'vierzig Euro' for a huge birthday cake. You're getting the hang of the tens!", contextSentence: "Mein Vater ist vierzig." },
          { vocabId: "vocab3-2-7", encounterMoment: "The bakery has been open for 'hundert Jahre'. A century of baking tradition!", contextSentence: "Hundert Prozent richtig!" },
          { vocabId: "vocab3-2-5", encounterMoment: "You check your watch: 'Sechzig Minuten' to your next appointment. Time is flying!", contextSentence: "Sechzig Minuten sind eine Stunde." },
        ],
        decisionPoints: [
          {
            moment: "The total is 32 Euro. The cashier says 'Zweiunddreißig Euro'. How do you interpret this?",
            options: [
              { text: "Two-and-thirty (32)", isCorrect: true, response: "Exactly! Zwei (2) + und + dreißig (30) = 32. You've got the logic down!", kuttanReaction: "Kiraathakam machane! 'Zwei' then 'dreißig'. Reverse pattern perfectly catch cheythu. Gold star! ⭐" },
              { text: "Twenty-three (23)", isCorrect: false, response: "Wait! That would be 'dreiundzwanzig'. 32 is 'zweiunddreißig'!", kuttanReaction: "Aiyyo! First digit unit aanu, second digit tens aanu. 32-inu 'zwei' mumpil varanam. Don't flip it again! 😬" },
            ],
          },
          {
            moment: "You want to buy 4 croissants. Each costs 1,20. Total is 4,80. Cashier says 'Vier Euro achtzig'. Which is 80?",
            options: [
              { text: "achtzig", isCorrect: true, response: "Correct! 'Achtzig' is 80. 'Acht' (8) + 'zig' (tens suffix).", kuttanReaction: "Superb! 'zig' suffix kandaal tens aanennu urappichoro. 80 = achtzig. Correct aayi paranjallo! 🔥" },
              { text: "achtzehn", isCorrect: false, response: "No! 'Achtzehn' is 18 (acht + zehn). 80 is 'achtzig'!", kuttanReaction: "Vite machane! 'zehn' end cheythaal teens, 'zig' end cheythaal tens. Confusion aayaruthe! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v3-2-1",
          title: "Big Numbers - The German Twist",
          duration: "15:00",
          description: "Discover how Germans reverse their two-digit numbers — and why it's not as hard as it sounds!",
          scriptOutline: [
            "Opening: 'Ready for the German number twist? Mirror-il kaanunnathu poloru logic aanu!'",
            "The rule: German-il ones come BEFORE tens for 21-99. Reverse aanu!",
            "einundzwanzig (21) = ein + und + zwanzig = 'one and twenty'",
            "zweiunddreißig (32) = zwei + und + dreißig = 'two and thirty'",
            "Why? 'Logic' anganeya... even Germans don't know why, so don't ask!",
            "The tens: dreißig (30) — note 'ßig' ending, bakki ellam 'zig'!",
            "vierzig (40), fünfzig (50), sechzig (60) — note: sech-zig (no 's')",
            "siebzig (70) — note: sieb-zig (no 'en')",
            "achtzig (80), neunzig (90), hundert (100) — milestone!",
            "Memory trick: Write it while you say it — 21 is 1 then 2! Confusing alle?",
            "Practice: Your age, your phone number, your house number.",
            "Manglish recap: 'Mirror effect aanu machane — ones first, pinne tens!'"
          ],
          keyVocabulary: ["einundzwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig", "hundert"],
          learningObjectives: [
            "Understand the ones-before-tens rule in German",
            "Say any two-digit number in German",
            "Count by tens from 20 to 100",
            "Recognize the irregular tens (dreißig, sechzig, siebzig)"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "Tens (20-100)",
              headers: ["Number", "German", "Note"],
              rows: [
                ["20", "zwanzig", ""],
                ["30", "dreißig", "Uses 'ßig' not 'zig'!"],
                ["40", "vierzig", ""],
                ["50", "fünfzig", ""],
                ["60", "sechzig", "Drops the 's' (not sechszig)"],
                ["70", "siebzig", "Drops the 'en' (not siebenzig)"],
                ["80", "achtzig", ""],
                ["90", "neunzig", ""],
                ["100", "hundert", ""]
              ]
            },
            {
              type: "note",
              title: "The German Number Twist!",
              variant: "info",
              content: "For 21-99, Germans say the ones BEFORE the tens! 21 = einundzwanzig (one-and-twenty). 45 = fünfundvierzig (five-and-forty). Think of it as reading the number backwards!"
            },
            {
              type: "note",
              title: "The 'und' Glue",
              variant: "tip",
              content: "The word 'und' (and) always connects the ones and tens: drei-UND-vierzig (43), acht-UND-fünfzig (58). No exceptions for 21-99!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex3-2-1",
          type: "multiple-choice",
          question: "You are at a traditional bakery that has a sign 'Nur Barzahlung'. You need to pay forty Euro. What do you say?",
          questionGerman: "Sie müssen vierzig Euro bezahlen. Was sagen Sie?",
          options: [
            "Vierzig Euro, bitte.",
            "Vier Euro, bitte.",
            "Vierzehn Euro, bitte.",
            "Fünfzig Euro, bitte."
          ],
          correctAnswer: "Vierzig Euro, bitte.",
          explanation: "The suffix for tens is '-zig'. So 40 is 'vier-zig'. 'Nur Barzahlung' means 'Cash only' — extremely common in German bakeries and small cafes!",
          xpReward: 20
        },
        {
          id: "ex3-2-2",
          type: "fill-blank",
          question: "67 in German is sieben_____sechzig.",
          options: ["und", "oder", "mit", "von"],
          correctAnswer: "und",
          explanation: "The formula: [ones] + und + [tens]. Always 'und' in the middle, like glue: sieben-UND-sechzig. No exceptions for 21-99!",
          xpReward: 15
        },
        {
          id: "ex3-2-3",
          type: "type-answer",
          question: "Write 30 in German.",
          correctAnswer: "dreißig",
          explanation: "'Dreißig' = 30. Note the ß! It's the only tens number that uses 'ßig' instead of 'zig'.",
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
          explanation: "To build any 2-digit number: say the ones digit, add 'und', then the tens. 83 = drei+und+achtzig. Practice with your age, phone number, and house number!",
          xpReward: 20
        },
        {
          id: "ex3-2-6",
          type: "free-text",
          question: "How do you say 42 in German? (Hint: two-and-forty)",
          correctAnswer: "zweiundvierzig",
          explanation: "Ones bit (zwei) + und + Tens bit (vierzig). No spaces in German numbers!",
          xpReward: 30
        },
        {
          id: "ex3-2-7",
          type: "dictation",
          question: "Listen and type the number: einundzwanzig (21)",
          correctAnswer: "einundzwanzig",
          explanation: "Ein (1) + und + zwanzig (20) = 21. Perfect reversal!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-21.mp3"
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
      storyScene: {
        setting: {
          name: "Alexanderplatz U-Bahn Station, Berlin",
          sceneType: "shopping",
          timeOfDay: "afternoon",
          description: "The echoing corridors of Alexanderplatz station. You're standing on the yellow line, looking at the digital display board. The next U8 train is arriving soon. You need to meet a friend at a specific time, but the 'halb' logic is spinning in your head. Punctuality is the goal, machane!",
        },
        narrative: {
          previousRecap: "You've mastered prices at the bakery. Now, it's time to master the German clock before you miss your train!",
          currentObjective: "Navigate the 24-hour clock and avoid the 'halb' time trap",
          nextTeaser: "Next: don't forget the trash! Time to learn days of the week and the 'Mittwoch' rule!",
        },
        kuttanIntro: [
          "Machane! Germany-il time parayunnathu oru logic puzzle poleyaanu. '3:30' ennu parayan 'half past three' ennu parayilla — avaru 'half to four' (halb vier) ennu parayum!",
          "Ithu kure perkk 'Termin' miss aakan ulla reason aanu. Always think about the NEXT hour when you hear 'halb'.",
          "Pinne, official schedules-il ellam 24-hour clock aanu. 15:00 kandaal athu 3 PM aanennu catch cheyyanam. Let's make sure we're pünktlich!",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-3-1", encounterMoment: "An old lady with a suitcase asks: 'Entschuldigung, wie spät ist es?' You check your phone quickly.", contextSentence: "Wie spät ist es?" },
          { vocabId: "vocab3-3-3", encounterMoment: "Your friend texts: 'Wir treffen uns um halb sechs.' You calculate: half before six... 5:30!", contextSentence: "Es ist halb sechs." },
          { vocabId: "vocab3-3-2", encounterMoment: "You look at the station clock: 'Die Uhr zeigt 16:15.' Quarter past four.", contextSentence: "Es ist vier Uhr fünfzehn." },
          { vocabId: "vocab3-3-8", encounterMoment: "The display says the train is 'pünktlich'. In Germany, this is a beautiful word!", contextSentence: "Der Zug ist pünktlich." },
          { vocabId: "vocab3-3-4", encounterMoment: "The announcement says: 'Viertel vor fünf.' Quarter to five. Time to move!", contextSentence: "Es ist Viertel vor fünf." },
        ],
        decisionPoints: [
          {
            moment: "Your friend says: 'Komm bitte um halb acht.' What time should you be there?",
            options: [
              { text: "7:30", isCorrect: true, response: "Correct! 'Halb acht' = half before eight = 7:30. You pass the trap!", kuttanReaction: "Mass machane! Ithanu njan paranja 'halb' trap. 7:30-inu 'halb acht' ennu parayum. Confusion illaathe catch cheythallo! 🔥" },
              { text: "8:30", isCorrect: false, response: "Aiyyo! That would be 'halb neun'. You're one hour late!", kuttanReaction: "Vite machane! German-il 'halb' parayumpo NEXT hour-iloottu aanu njan look cheyyunnathu. So 8:30 is NOT 'halb acht'. Try again! 😬" },
            ],
          },
          {
            moment: "You see '18:45' on the schedule. How do you say this informally?",
            options: [
              { text: "Viertel vor sieben", isCorrect: true, response: "Exactly! Quarter before seven. You're thinking like a local now.", kuttanReaction: "Adipoli! 18:45 is 6:45 PM. So 'Viertel vor sieben' (quarter to 7) is perfect. Keep it up! 🎯" },
              { text: "Viertel nach sechs", isCorrect: false, response: "No, that would be 6:15 (18:15). 18:45 is much later!", kuttanReaction: "Aiyyo! 'nach' is after, 'vor' is before. 6:45 is before 7! So it's 'vor sieben'. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v3-3-1",
          title: "Telling Time - Wie spät ist es?",
          duration: "12:00",
          description: "Master the basics of telling time in German — o'clock, half past, and quarter hours.",
          scriptOutline: [
            "Opening: 'Wie spät ist es? — Germany-il train varaan wait cheyyumpo ithu venam!'",
            "The key phrase: 'Es ist...' — Nammude 'samayam ... aanu' pole",
            "Full hours: 'Es ist drei Uhr' (It is three o'clock)",
            "Uhr = clock — 'mani' ennu parayunnathu pole",
            "THE TRAP: 'halb vier' means half BEFORE four = 3:30!",
            "IMPORTANT: 3:30 refers to the *next* hour's half. Kerala-il 'moonara' — but Germany-il 'halb naalu'!",
            "Quarter past: 'Viertel nach drei' = 3:15",
            "Quarter to: 'Viertel vor vier' = 3:45",
            "nach = after, vor = before — simple calculation",
            "Minutes: 'fünf nach drei' = 3:05",
            "Practice: Reading clock faces correctly — trap-il veezharuthu!"
          ],
          keyVocabulary: ["Wie spät ist es?", "Es ist", "Uhr", "halb", "Viertel", "nach", "vor"],
          learningObjectives: [
            "Ask and answer 'What time is it?' in German",
            "Tell time using full hours, half hours, and quarter hours",
            "Understand that 'halb' refers to half BEFORE the next hour"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Telling Time in German",
              headers: ["Time", "German (informal)", "Literal Meaning"],
              rows: [
                ["3:00", "Es ist drei Uhr", "It is three o'clock"],
                ["3:15", "Viertel nach drei", "Quarter after three"],
                ["3:30", "halb vier", "Half (before) four!"],
                ["3:45", "Viertel vor vier", "Quarter before four"],
                ["3:05", "fünf nach drei", "Five after three"],
                ["3:55", "fünf vor vier", "Five before four"]
              ]
            },
            {
              type: "note",
              title: "THE Biggest Trap: 'halb'",
              variant: "warning",
              content: "'halb vier' = 3:30 (NOT 4:30!). German 'halb' means half BEFORE the next hour. This is the #1 reason foreigners miss appointments! Think of it as: the hour is only 'half' done."
            },
            {
              type: "vocabulary",
              items: [
                { german: "Wie spät ist es?", english: "What time is it?", malayalam: "സമയം എത്രയായി?", pronunciation: "vee shpayt ist es" },
                { german: "die Uhr", english: "clock / o'clock", malayalam: "മണി", pronunciation: "oor" },
                { german: "halb", english: "half (before)", malayalam: "അര (അടുത്ത മണിക്കൂറിന്)", pronunciation: "halp" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "24-Hour vs 12-Hour Time",
              headers: ["24-Hour (Formal)", "12-Hour (Informal)", "Context"],
              rows: [
                ["dreizehn Uhr", "ein Uhr (nachmittags)", "Train schedule vs conversation"],
                ["fünfzehn Uhr dreißig", "halb vier", "Appointment vs friend"],
                ["achtzehn Uhr", "sechs Uhr (abends)", "Office hours vs casual"],
                ["null Uhr / Mitternacht", "zwölf Uhr (nachts)", "Official vs spoken"]
              ]
            },
            {
              type: "table",
              title: "Time of Day Words",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["morgens", "in the morning", "രാവിലെ"],
                ["mittags", "at noon", "ഉച്ചയ്ക്ക്"],
                ["nachmittags", "in the afternoon", "ഉച്ചകഴിഞ്ഞ്"],
                ["abends", "in the evening", "വൈകുന്നേരം"],
                ["nachts", "at night", "രാത്രി"]
              ]
            },
            {
              type: "note",
              title: "Pünktlichkeit (Punctuality)!",
              variant: "tip",
              content: "Germans are extremely punctual. If your train says '15:32', it means 15:32, not 'around 3:30 PM'. Read 24-hour time fluently — you will see it on every schedule, ticket, and appointment slip."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex3-3-1",
          type: "multiple-choice",
          question: "THE TRAP: A German friend says 'Wir treffen uns um halb acht'. What time should you be there?",
          questionGerman: "Wann treffen Sie sich bei 'halb acht'?",
          options: ["7:30", "8:30", "7:15", "8:15"],
          correctAnswer: "7:30",
          explanation: "CRITICAL: 'halb acht' literally means 'half TO eight'. So it is 7:30. In English, you say 'half past', but in Germany, we think of the NEXT hour! This is the #1 way foreigners miss appointments.",
          xpReward: 25
        },
        {
          id: "ex3-3-2",
          type: "fill-blank",
          question: "3:15 in German is 'Viertel _____ drei'.",
          options: ["nach", "vor", "halb", "um"],
          correctAnswer: "nach",
          explanation: "'Nach' = after, 'vor' = before. So: Viertel NACH drei = 3:15 (quarter after 3), Viertel VOR vier = 3:45 (quarter before 4). Nach/vor are your time prepositions.",
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
          explanation: "'Viertel vor acht' = quarter before 8 = 7:45. In German time, you always reference the NEXT hour for 'vor' and 'halb'. Think forward, not backward!",
          xpReward: 20
        },
        {
          id: "ex3-3-4",
          type: "fill-blank",
          question: "'It is five o'clock' in German: Es ist fünf _____.",
          options: ["Uhr", "Stunde", "Zeit", "Minuten"],
          correctAnswer: "Uhr",
          explanation: "'Uhr' = o'clock/clock. For exact hours: 'Es ist [number] Uhr'. For minutes past, drop Uhr and use nach/vor. 'Fünf Uhr' vs 'fünf nach drei'.",
          xpReward: 15
        },
        {
          id: "ex3-3-5",
          type: "multiple-choice",
          question: "You see '15:30' on a DB (Deutsche Bahn) schedule board. What time is the train?",
          questionGerman: "Um wie viel Uhr fährt der Zug (15:30)?",
          options: ["3:30 PM", "5:30 PM", "1:30 PM", "5:30 AM"],
          correctAnswer: "3:30 PM",
          explanation: "Germany uses the 24-hour clock for ALL formal schedules. Just subtract 12 to get the PM time (15 - 12 = 3). 'Fünfzehn Uhr dreißig' is the formal way to say it.",
          xpReward: 20,
          imageUrl: "/images/db_schedule.png"
        },
        {
          id: "ex3-3-6",
          type: "matching",
          question: "Match the German time expressions to their meanings:",
          options: ["morgens → in the morning", "nachmittags → in the afternoon", "abends → in the evening", "pünktlich → on time"],
          correctAnswer: ["morgens → in the morning", "nachmittags → in the afternoon", "abends → in the evening", "pünktlich → on time"],
          explanation: "These time-of-day words help specify AM or PM when using the informal 12-hour clock.",
          xpReward: 20
        },
        {
          id: "ex3-3-7",
          type: "free-text",
          question: "It is 8:30 AM. Write this informally (use 'halb').",
          correctAnswer: "Es ist halb neun",
          explanation: "Crucial! 'halb neun' means half *before* nine. Always think of the next hour!",
          xpReward: 35
        },
        {
          id: "ex3-3-8",
          type: "dictation",
          question: "Listen and type: Viertel vor acht.",
          correctAnswer: "Viertel vor acht",
          explanation: "Quarter before eight = 7:45. Good job handling the prepositions!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-745.mp3"
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
      storyScene: {
        setting: {
          name: "WG Apartment, Trash Storage Room (Müllraum)",
          sceneType: "home",
          timeOfDay: "morning",
          description: "A small, tidy room with four different colored bins: Blue, Yellow, Brown, and Grey. Stefan is showing you the 'Müllkalender' (trash calendar). In Germany, every day has a purpose, and missing the collection day is a cardinal sin. It's time to master the days of the week, machane!",
        },
        narrative: {
          previousRecap: "You've successfully caught the train on time. Now, let's make sure you don't mess up the house rules!",
          currentObjective: "Learn the days of the week and months to manage your German schedule",
          nextTeaser: "Next: happy birthday! Time to learn dates and the verb 'haben'!",
        },
        kuttanIntro: [
          "Machane! Germany-il 'Mülltrennung' (trash separation) oru religion poleyaanu. Athepole importance aanu 'collection days'-um.",
          "Nammal 'Mittwoch' (Wednesday) kandaal athu middle of the week aanennu catch cheyyanam. Pinne German week Montag (Monday) aanu thudangunnathu.",
          "Months names almost English pole thanneyaanu — 'März' (March) and 'Januar' (January) mathram care venam. Let's set our calendar!",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-4-1", encounterMoment: "Stefan points to the calendar: 'Am Montag wird das Altpapier abgeholt.' Blue bin day!", contextSentence: "Am Montag ist Altpapier." },
          { vocabId: "vocab3-4-3", encounterMoment: "He warns you: 'Vergiss Mittwoch nicht! Da kommt die graue Tonne.' General waste day.", contextSentence: "Mittwoch ist sehr wichtig." },
          { vocabId: "vocab3-4-5", encounterMoment: "You look forward to the weekend: 'Am Freitag haben wir keine Vorlesung.' No lectures on Friday!", contextSentence: "Freitag ist mein Lieblingstag." },
          { vocabId: "vocab3-4-8", encounterMoment: "Stefan says: 'Diesen Monat haben wir viel Müll.' This month we have a lot of trash.", contextSentence: "Ein Jahr hat zwölf Monate." },
          { vocabId: "vocab3-4-11", encounterMoment: "You look at the 'Winter' section of the calendar. 'Januar is real cold,' Stefan notes.", contextSentence: "Im Winter ist es kalt." },
        ],
        decisionPoints: [
          {
            moment: "Stefan asks: 'Welcher Tag ist heute?' (What day is today?). It's the middle of the week. What do you say?",
            options: [
              { text: "Heute ist Mittwoch.", isCorrect: true, response: "Exactly! 'Mittwoch' = Middle (Mitte) + Week (Woche). Logical alle?", kuttanReaction: "Correct machane! German-il Wednesday 'Mittwoch' aanu. Ithu oru bit unique name aanu, so carefully thiriayanam! 🎯" },
              { text: "Heute ist Montag.", isCorrect: false, response: "Stefan shakes his head: 'Nein, Montag war vorgestern. Heute ist Mittwoch!'", kuttanReaction: "Aiyyo! Monday collection day alla! Wednesday aanu nammude general waste collection. Don't miss it! 😬" },
            ],
          },
          {
            moment: "Which month in German sounds the most like 'March'?",
            options: [
              { text: "März", isCorrect: true, response: "Correct! 'März' has the umlaut but the 'M-r-z' core is like 'March'.", kuttanReaction: "Adipoli! März is for March. Umlaut care venam — 'mairts' ennu parayanam. Gold star! ⭐" },
              { text: "Mai", isCorrect: false, response: "No, 'Mai' is May! 'März' is the one for March.", kuttanReaction: "Vite machane! Confusion aayallo? Mai is May, März is March. Ithu randum different aanu! Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v3-4-1",
          title: "Montag to Sonntag & Januar to Dezember",
          duration: "15:00",
          description: "All the days, months, and seasons you need to navigate a German calendar.",
          scriptOutline: [
            "Opening: 'Let's fill your calendar — Montag to Sonntag!'",
            "Days end in '-tag' (day):",
            "Montag (Monday) — Moon-day, easy connect",
            "Dienstag (Tuesday), Mittwoch (Wednesday) — 'Middle of the week'!",
            "Donnerstag (Thursday) — 'Donner' = thunder (Thor's day machane!)",
            "Freitag (Friday), Samstag (Saturday), Sonntag (Sunday) — Sun-day!",
            "Rule: German week starts on Montag. Sunday kandaal leave alle!",
            "Months: sound almost same as English — Januar, Februar, März...",
            "März = March — umlaut care venam!",
            "Seasons: Frühling (spring), Sommer (summer), Herbst (autumn), Winter (winter)",
            "Kerala vs Germany: Evide randaanu season (rain/sun) — avide naalaanu!",
            "Seasons are real: Winter-il snow kandaal mind blow cheyyum!"
          ],
          keyVocabulary: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag", "Januar", "Dezember", "Frühling", "Sommer", "Herbst", "Winter"],
          learningObjectives: [
            "Name all 7 days of the week in German",
            "Name all 12 months in German",
            "Know the 4 seasons in German",
            "Understand German calendar conventions"
          ],
          placeholderThumbnail: "/images/home_office.png",
          richContent: [
            {
              type: "table",
              title: "Days of the Week",
              headers: ["German", "English", "Memory Trick"],
              rows: [
                ["Montag", "Monday", "Moon-day (Mond)"],
                ["Dienstag", "Tuesday", "Service day"],
                ["Mittwoch", "Wednesday", "Middle of week!"],
                ["Donnerstag", "Thursday", "Thunder day (Thor!)"],
                ["Freitag", "Friday", "Free day feeling"],
                ["Samstag", "Saturday", "Sabbath day"],
                ["Sonntag", "Sunday", "Sun day (Sonne)"]
              ]
            },
            {
              type: "table",
              title: "4 Seasons",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Frühling", "Spring", "വസന്തം"],
                ["der Sommer", "Summer", "വേനൽക്കാലം"],
                ["der Herbst", "Autumn", "ശരത്കാലം"],
                ["der Winter", "Winter", "ശീതകാലം"]
              ]
            },
            {
              type: "note",
              title: "German Week Starts on Monday!",
              variant: "info",
              content: "Unlike in India/USA where calendars start on Sunday, German calendars start on MONDAY. Also, all days and months are masculine (der Montag, der Januar). They are always capitalized!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex3-4-1",
          type: "multiple-choice",
          question: "Your 'Graue Tonne' (Grey trash bin) is collected every 'Mittwoch'. Which day of the week is that?",
          questionGerman: "An welchem Wochentag ist Mittwoch?",
          options: ["Wednesday", "Tuesday", "Thursday", "Monday"],
          correctAnswer: "Wednesday",
          explanation: "Punctuality applies to trash too! You must put your bin out on the correct day. 'Mittwoch' = middle of the week. Note the four bin colors in Germany: Blue (Paper), Yellow (Plastic), Brown (Organic), and Grey (General).",
          xpReward: 20,
          imageUrl: "/images/trash_bins.png"
        },
        {
          id: "ex3-4-2",
          type: "type-answer",
          question: "What day comes after Dienstag?",
          correctAnswer: "Mittwoch",
          explanation: "'Mittwoch' = Wednesday. It follows 'Dienstag' (Tuesday) in the German week.",
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
          type: "fill-blank",
          question: "Complete: Mein Geburtstag ist im _____. (January)",
          options: ["Januar", "Juni", "Juli", "März"],
          correctAnswer: "Januar",
          explanation: "'Januar' = January. 'Im Januar' = in January. Most German months are similar to English!",
          xpReward: 15
        },
        {
          id: "ex3-4-6",
          type: "free-text",
          question: "Which day is 'middle of the week'? Write it in German.",
          correctAnswer: "Mittwoch",
          explanation: "Mitte (Middle) + Woche (Week) = Mittwoch! German logic is awesome.",
          xpReward: 25
        },
        {
          id: "ex3-4-7",
          type: "dictation",
          question: "Listen and type: Heute ist Montag.",
          correctAnswer: "Heute ist Montag",
          explanation: "Today is Monday. Remember: days of the week are names, so CAPITALize them!",
          xpReward: 20,
          audioUrl: "/audio/exercises/dictation-montag.mp3"
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
      storyScene: {
        setting: {
          name: "WG Living Room, Birthday Planning",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Lara and Stefan are sitting on the couch with a calendar. 'Kuttan, wann hast du Geburtstag?' Lara asks. They're planning a surprise party (Well, not a surprise anymore!). In Germany, birthdays are a big deal, and the date format is Tag.Monat.Jahr — just like in India!",
        },
        narrative: {
          previousRecap: "You've mastered the trash schedule. Now, let's move to the fun stuff — birthdays and celebrations!",
          currentObjective: "Express dates correctly and use the essential verb 'haben'",
          nextTeaser: "Next: the final challenge! Scheduling a formal 'Termin' like a pro!",
        },
        kuttanIntro: [
          "Machane! Birthdays in Germany are slightly different. Common sense rule: Never wish someone 'Happy Birthday' before the actual day — it's considered bad luck (Undaampori logic!).",
          "Date format nammude 'Tag.Monat.Jahr' (DD.MM.YYYY) thanneyaanu. So America-kkaare pole confuse aakenda.",
          "Pinne 'haben' verb. 'Ich habe... du hast...' Ithu 'sein' pole thanne super important aanu. Let's celebrate our progress!",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-5-1", encounterMoment: "Lara looks at the calendar: 'Mein Geburtstag ist im Mai.' She's excited about the spring party.", contextSentence: "Wann hast du Geburtstag?" },
          { vocabId: "vocab3-5-2", encounterMoment: "Stefan checks the invite: 'Welches Datum ist heute?' He needs to write it down correctly.", contextSentence: "Welches Datum ist heute?" },
          { vocabId: "vocab3-5-3", encounterMoment: "You answer Lara's question: 'Ich habe im Januar Geburtstag.' You specify the month with 'haben'.", contextSentence: "Ich habe im Januar Geburtstag." },
          { vocabId: "vocab3-3-8", encounterMoment: "Lara adds a note: 'Bitte pünktlich sein!' Even for a party, Germans like the 8:00 start!", contextSentence: "Pünktlich sein ist wichtig." },
          { vocabId: "vocab3-5-4", encounterMoment: "Stefan notes a holiday: 'Der erste Januar ist Neujahr.' The very first day of the year.", contextSentence: "Der erste Januar ist Neujahr." },
        ],
        decisionPoints: [
          {
            moment: "Lara asks: 'Wann hast du Geburtstag?' Your birthday is on the 15th of August. How do you answer using the German date format?",
            options: [
              { text: "Ich habe am fünfzehnten August Geburtstag.", isCorrect: true, response: "Perfect! You used the ordinal '-ten' ending and the correct month.", kuttanReaction: "Adipoli machane! 'fünfzehnte' becomes 'fünfzehnten' when you use 'am'. Real pro German vibe! 🎂" },
              { text: "Ich bin August fünfzehn.", isCorrect: false, response: "Lara looks confused: 'Du BIST August? Und... August fünfzehn?' You're mixing stay English patterns, machane!", kuttanReaction: "Aiyyo! 'Ich habe' (I have) use cheyyeda! Pinne Month first parayalle — 'Tag.Monat' aanu rule. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'You have a cake'. Which conjugation of 'haben' is correct for 'du'?",
            options: [
              { text: "Du hast einen Kuchen.", isCorrect: true, response: "Correct! 'Du hast' is the right form.", kuttanReaction: "Superb! 'Ich habe, du hast, er hat'. Pattern correctly catch cheythallo! Let's eat! 🍰" },
              { text: "Du habst einen Kuchen.", isCorrect: false, response: "No, 'habst' is not a word. It's 'hast' — a bit irregular like 'bist'!", kuttanReaction: "Vite machane! 'haben' vowel-change pole small shortcut undu — it's 'hast', not 'habst'. Small mistake, big difference! Try again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Conjugation of 'haben' (to have)",
              headers: ["Person", "German", "English"],
              rows: [
                ["ich", "habe", "I have"],
                ["du", "hast", "you have"],
                ["er/sie/es", "hat", "he/she/it has"],
                ["wir", "haben", "we have"],
                ["ihr", "habt", "you all have"],
                ["sie/Sie", "haben", "they/you (formal) have"]
              ]
            },
            {
              type: "table",
              title: "Ordinal Numbers (Dates)",
              headers: ["Number", "Ordinal", "Rule"],
              rows: [
                ["1", "erste", "Irregular"],
                ["2", "zweite", "Irregular"],
                ["3", "dritte", "Irregular"],
                ["4-19", "vierte, fünfte...", "Add '-te'"],
                ["8", "achte", "Drops a 't' (not achtte)"],
                ["20+", "zwanzigste, dreißigste...", "Add '-ste'"]
              ]
            },
            {
              type: "note",
              title: "German Date Format",
              variant: "info",
              content: "Germany writes dates as DD.MM.YYYY (day.month.year) — same as India! Example: 15.08.1947 = der fünfzehnte August. Always use ordinal numbers for the day."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex3-5-1",
          type: "fill-blank",
          question: "Complete: Ich _____ am fünften März Geburtstag. (I have...)",
          options: ["habe", "bin", "ist", "hat"],
          correctAnswer: "habe",
          explanation: "'Ich habe Geburtstag' = I have my birthday. 'Haben' with 'ich' = 'habe'.",
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
          type: "fill-blank",
          question: "Complete: Heute ist der _____ Mai. (Today is the 3rd of May.)",
          options: ["dritte", "dreite", "drei", "dritten"],
          correctAnswer: "dritte",
          explanation: "'Dritte' = third. It's irregular — not 'dreite'. Used for dates: 'der dritte Mai' = the 3rd of May.",
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
        },
        {
          id: "ex3-5-6",
          type: "free-text",
          question: "When is your birthday? Type: Ich habe im [Month] Geburtstag. (e.g. im Januar)",
          correctAnswer: "Ich habe im ... Geburtstag",
          explanation: "Perfect! 'Ich habe im [Month] Geburtstag' is the standard way to answer. Germans love being wished a happy birthday, but NEVER before the actual day – it's bad luck!",
          xpReward: 30
        },
        {
          id: "ex3-5-7",
          type: "dictation",
          question: "Listen and type the date: 15.08.1947",
          correctAnswer: "fünfzehnte August neunzehnhundertsiebenundvierzig",
          explanation: "Mastering years in German: before 2000, we say 'nineteen-hundred-seven-and-forty'. After 2000, we say 'two-thousand-twenty-four'. Practice this!",
          xpReward: 40,
          audioUrl: "/audio/exercises/dictation-independence.mp3"
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
      storyScene: {
        setting: {
          name: "Doctor's Reception (Arztpraxis), Berlin-Mitte",
          sceneType: "office",
          timeOfDay: "morning",
          description: "A clean, minimalist reception area with the scent of disinfectant and fresh flowers. You're at the front desk, facing a receptionist with a headset. You need a check-up, but the calendar is full. It's time to use every number, day, and time phrase you've learned to secure that 'Termin'.",
        },
        narrative: {
          previousRecap: "You've survived the party planning. Now, it's time for the ultimate adulting task — making a formal appointment!",
          currentObjective: "Schedule a professional meeting using specific time and date prepositions",
          nextTeaser: "Congratulations! Module 3 complete. Next: I am hungry! Time to learn about food and shopping!",
        },
        kuttanIntro: [
          "Machane! Germany-il 'Termin' paranjaal athu oru holy thing poleyaanu. Without a Termin, you can't see a doctor, open a bank account, or sometimes even get a haircut!",
          "Ivide preposition care venam. Days-in 'am' (Am Montag), Time-in 'um' (Um zehn Uhr). Pinne 'von... bis' (from... to) duration parayan super aanu.",
          "Be polite, be pünktlich, and be clear. Let's get that appointment set! Ready alle?",
        ],
        vocabEncounters: [
          { vocabId: "vocab3-6-1", encounterMoment: "The receptionist asks: 'Haben Sie einen Termin?' You answer: 'Nein, ich möchte einen Termin machen.'", contextSentence: "Ich möchte einen Termin machen." },
          { vocabId: "vocab3-6-2", encounterMoment: "She checks her screen: 'Wann haben Sie Zeit?' She's giving you the choice of days.", contextSentence: "Wann haben Sie Zeit?" },
          { vocabId: "vocab3-6-3", encounterMoment: "You suggest a range: 'Ich habe von Montag bis Mittwoch Zeit.' Flexing those day names!", contextSentence: "Von Montag bis Mittwoch." },
          { vocabId: "vocab3-3-8", encounterMoment: "She confirms: 'Dienstag um neun Uhr. Seien Sie bitte pünktlich!' The P-word again!", contextSentence: "Seien Sie bitte pünktlich." },
          { vocabId: "vocab3-6-5", encounterMoment: "You ask about the duration: 'Wie lange dauert der Termin?' You have a class later.", contextSentence: "Wie lange dauert das?" },
        ],
        decisionPoints: [
          {
            moment: "The receptionist offers: 'Dienstag um zehn Uhr oder Mittwoch um vierzehn Uhr?' Which one works for 'Tuesday at 10:00'?",
            options: [
              { text: "Dienstag um zehn Uhr.", isCorrect: true, response: "Correct! She writes it down. 'Abgemacht! Dienstag um zehn.'", kuttanReaction: "Adipoli! Selasaicha (Tuesday) 10 mani. Correct aayi pick cheythallo! 'Dienstag' is Tuesday. 🎯" },
              { text: "Mittwoch um vierzehn Uhr.", isCorrect: false, response: "Wait! That's Wednesday at 2 PM. You wanted Tuesday!", kuttanReaction: "Aiyyo! 'Mittwoch' is Wednesday, machane! Tuesday 'Dienstag' aanu. Day maari poyal doctor-ne kaanan pattilla! Try again! 😬" },
            ],
          },
          {
            moment: "How do you say 'On Monday at three o'clock' using the correct prepositions?",
            options: [
              { text: "Am Montag um drei Uhr.", isCorrect: true, response: "Perfect prepositions! 'Am' for days, 'um' for time.", kuttanReaction: "Mass machane! 'Am' and 'Um' pair perfectly catch cheythu. Ithanu basic grammar rules! Well done! 🔥" },
              { text: "Um Montag am drei Uhr.", isCorrect: false, response: "No, you swapped them! 'Am' is for the day, 'um' is for the time.", kuttanReaction: "Vite machane! Prepositions maari poyi. 'Am' for Days (Monday), 'Um' for Time (3:00). Swap it back! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/doctor_waiting_room.png",
          richContent: [
            {
              type: "table",
              title: "Scheduling Prepositions",
              headers: ["Preposition", "Used With", "Example"],
              rows: [
                ["am", "Days / Dates", "Am Montag (On Monday)"],
                ["um", "Clock times", "Um drei Uhr (At 3 o'clock)"],
                ["von...bis", "Time ranges", "Von 9 bis 17 Uhr (9 to 5)"],
                ["im", "Months / Seasons", "Im Januar (In January)"]
              ]
            },
            {
              type: "vocabulary",
              items: [
                { german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen" },
                { german: "Wann?", english: "When?", malayalam: "എപ്പോൾ?", pronunciation: "van" },
                { german: "Um wie viel Uhr?", english: "At what time?", malayalam: "എത്ര മണിക്ക്?", pronunciation: "oom vee feel oor" },
                { german: "Wie lange?", english: "How long?", malayalam: "എത്ര നേരം?", pronunciation: "vee lan-ge" }
              ]
            },
            {
              type: "note",
              title: "IST Won't Work Here!",
              variant: "warning",
              content: "'Indian Stretchable Time' does not exist in Germany! If your doctor's appointment is at 10:00, arrive at 09:55. Being late is considered extremely rude and unprofessional."
            }
          ]
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
          type: "fill-blank",
          question: "Complete: Ich habe einen _____ um 10 Uhr. (appointment)",
          options: ["Termin", "Zeit", "Stunde", "Tag"],
          correctAnswer: "Termin",
          explanation: "'Der Termin' = the appointment. 'Ich habe einen Termin' = I have an appointment.",
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
