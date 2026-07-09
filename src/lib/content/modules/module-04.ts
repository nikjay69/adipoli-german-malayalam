import type { Module } from '../types';

// Module 4: My Family & People
export const MODULE_4: Module = {
  id: 4,
  title: "My Family & People",
  titleGerman: "Meine Familie",
  description: "Talk about your family, describe people, and tackle German articles and possessive pronouns. Kerala families are big — now describe yours in German!",
  icon: "👨‍👩‍👧‍👦",
  color: "#8b5cf6",
  totalHours: 12,
  unlockRequirement: "Complete Module 3",
  learningTips: [
    "Every German noun has a gender (der/die/das). Always learn the article WITH the word — never alone!",
    "Draw your family tree in German. Label everyone with 'mein/meine' — this makes possessives stick.",
    "Adjective endings change based on gender. For now, just notice the pattern — mastery comes with practice.",
  ],
  lessons: [
    // ─── Lesson 4-1: Family Members ───
    {
      id: "4-1",
      title: "Family Members",
      titleGerman: "Familienmitglieder",
      description: "Meet the German family — from Mutter and Vater to Onkel and Tante. Kerala kudumbam, now in German!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Kuttan's Home Study Desk, Thrissur",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Kuttan is at home in Thrissur after Goethe Kochi class, with family photos open on his phone. His cousin joins from Munich on WhatsApp video and asks him to introduce Amma, Achan, and siblings in German — the ultimate 'Chettan-to-Bruder' translation challenge, machane!",
        },
        narrative: {
          previousRecap: "You've survived the 'Termin' practice at Goethe Kochi. Now, it's time to describe your own Kerala family clearly in German.",
          currentObjective: "Introduce immediate and extended family members with their correct German articles",
          nextTeaser: "Next: describing your best friend! Is he/she tall, funny, or both?",
        },
        kuttanIntro: [
          "Machane! Nammude Kerala families are massive, alle? But German-il family words simple aanu. Onkel, Tante, Bruder, Schwester — sound familiar?",
          "Ivide oru important thing: 'Chettan' and 'Chechi'-kku unique words illa. You have to say 'älterer Bruder' (older brother) or 'jüngere Schwester' (younger sister).",
          "Oma (Ammoomma) and Opa (Appooppan) mathram casual context-il use cheyyaam. Let's make our first family intro!",
        ],
        vocabEncounters: [
          { vocabId: "vocab4-1-1", encounterMoment: "Kuttan points to a family photo: 'Das ist meine Mutter Lakshmi.' His cousin waves from Munich: 'Hallo!'", contextSentence: "Das ist meine Mutter." },
          { vocabId: "vocab4-1-2", encounterMoment: "Next you show your dad: 'Das ist mein Vater Rajesh.' He's smiling from the couch.", contextSentence: "Das ist mein Vater." },
          { vocabId: "vocab4-1-3", encounterMoment: "You point to your 'Chettan': 'Das ist mein Bruder Arjun.' Arjun is a bit shy in front of foreigners!", contextSentence: "Das ist mein Bruder." },
          { vocabId: "vocab4-1-4", encounterMoment: "Your sister 'Priya' jumps into the frame: 'Das ist meine Schwester.' She's already learned 'Tschüss'!", contextSentence: "Das ist meine Schwester." },
          { vocabId: "vocab4-1-11", encounterMoment: "The cousin asks: 'Wo wohnen deine Eltern?' (Where do your parents live?). Kuttan answers: 'In Kerala.'", contextSentence: "Meine Eltern wohnen in Kerala." },
        ],
        decisionPoints: [
          {
            moment: "On the video call, the cousin asks: 'Hast du Geschwister?' (Do you have siblings?). You have one brother and one sister. How do you answer?",
            options: [
              { text: "Ich habe einen Bruder und eine Schwester.", isCorrect: true, response: "Exactly! 'Einen Bruder' (masc acc) and 'eine Schwester' (fem acc). Well said!", kuttanReaction: "Adipoli! Article care venam — masc-inu 'einen' and fem-inu 'eine'. Perfect grammar, machane! 🔥" },
              { text: "Ich habe ein Bruder und ein Schwester.", isCorrect: false, response: "Aiyyo! Those articles are for neuter nouns. You're missing the gender endings!", kuttanReaction: "Vite machane! Bruder masculine aanu, so 'einen' venam. Schwester feminine aanu, so 'eine' venam. Patterns orkkane! 😬" },
            ],
          },
          {
            moment: "Your cousin sees your grandfather in the family photo. You tell him: 'Das ist mein...'?",
            options: [
              { text: "Opa", isCorrect: true, response: "Correct! 'Opa' is the warm, casual way to say grandfather. Your cousin gets it immediately.", kuttanReaction: "Super machane! 'Großvater' formal context-il mathram mathi. Casual conversation-il 'Opa' is the king of family words! ⭐" },
              { text: "Oma", isCorrect: false, response: "Your cousin looks confused: 'But that's a man, isn't it?'", kuttanReaction: "Aiyyo! Oma Ammoomma aanu! Opa Appooppan aanu! Gender maari poyal valya confusion undakum. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v4-1-1",
          title: "Meet the German Family",
          duration: "12:00",
          description: "Learn the core family members in German — parents, siblings, and grandparents.",
          scriptOutline: [
            "Opening: 'Family is everything — Kerala-ilum Germany-ilum! Let's learn to talk about your kudumbam.'",
            "die Mutter (mother) — 'Amma' in Malayalam. Both start with 'M'!",
            "der Vater (father) — 'Achan' in Malayalam. 'Vater' sounds like English 'father' with a V.",
            "die Eltern (parents) — plural, always 'die'!",
            "der Bruder (brother) — 'broo-der', similar to English 'brother'",
            "die Schwester (sister) — 'shves-ter', a bit tricky to pronounce",
            "die Geschwister (siblings) — collectively 'siblings' parayunnathu pole",
            "die Großmutter / die Oma (grandmother) — Oma is casual, like 'Ammoomma'",
            "der Großvater / der Opa (grandfather) — Opa is casual, like 'Appooppan'",
            "das Kind (child), die Kinder (children)",
            "Kerala connection: Amma, Achan, Chechi, Chettan — German-ilum equal terms und!",
            "Practice: Describe YOUR family — 'Ich habe einen Bruder und eine Schwester'. Set aakkaam!"
          ],
          keyVocabulary: ["die Mutter", "der Vater", "der Bruder", "die Schwester", "die Großmutter", "der Großvater"],
          learningObjectives: [
            "Name immediate family members in German",
            "Name grandparents and siblings",
            "Talk about your own family using simple sentences"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Core Family Members",
              headers: ["German", "English", "Malayalam", "Article"],
              rows: [
                ["die Mutter", "mother", "അമ്മ", "die (fem)"],
                ["der Vater", "father", "അച്ഛൻ", "der (masc)"],
                ["der Bruder", "brother", "സഹോദരൻ", "der (masc)"],
                ["die Schwester", "sister", "സഹോദരി", "die (fem)"],
                ["die Oma", "grandmother", "അമ്മൂമ്മ", "die (fem)"],
                ["der Opa", "grandfather", "അപ്പൂപ്പൻ", "der (masc)"],
                ["das Kind", "child", "കുട്ടി", "das (neut)"]
              ]
            },
            {
              type: "note",
              title: "Gender Pattern in Family Words",
              variant: "tip",
              content: "Male family members are always 'der' (der Vater, der Bruder, der Opa). Female family members are always 'die' (die Mutter, die Schwester, die Oma). The article matches the actual gender — easy to remember!"
            }
          ]
        },
        {
          id: "v4-1-2",
          title: "Extended Family & Relationships",
          duration: "10:00",
          description: "Uncles, aunts, cousins, and more — the bigger family circle in German.",
          scriptOutline: [
            "Opening: 'Kerala families are BIG! Uncles, aunts, cousins everywhere. Let's name them all!'",
            "der Onkel (uncle) — 'on-kel', sounds like English 'uncle'",
            "die Tante (aunt) — 'tahn-tuh', like French 'tante'",
            "der Cousin (male cousin) — French-style: 'koo-zaN'",
            "die Cousine (female cousin) — 'koo-zee-nuh'",
            "der Neffe (nephew), die Nichte (niece)",
            "der Schwiegervater (father-in-law), die Schwiegermutter (mother-in-law)",
            "Kerala parallel: Ammavan vs Chittappan distinction German-il illa. Just 'Onkel' aanu!",
            "der Mann (husband), die Frau (wife) — also means 'man' and 'woman'",
            "Family tree activity: Draw and label a family tree in German",
            "Practice dialogue: 'Das ist mein Onkel. Er heißt Thomas.'"
          ],
          keyVocabulary: ["der Onkel", "die Tante", "der Cousin", "die Cousine", "der Neffe", "die Nichte"],
          learningObjectives: [
            "Name extended family members in German",
            "Understand the difference between Malayalam and German family terminology",
            "Introduce family members in simple sentences"
          ],
          placeholderThumbnail: "/images/kaffee_kuchen.png",
          richContent: [
            {
              type: "table",
              title: "Extended Family",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["der Onkel", "uncle", "അമ്മാവൻ / ചിറ്റപ്പൻ"],
                ["die Tante", "aunt", "അമ്മായി / ചിറ്റമ്മ"],
                ["der Cousin", "male cousin", "കസിൻ (ആൺ)"],
                ["die Cousine", "female cousin", "കസിൻ (പെൺ)"],
                ["der Neffe", "nephew", "അനന്തരവൻ"],
                ["die Nichte", "niece", "അനന്തരവൾ"],
                ["der Mann", "husband", "ഭർത്താവ്"],
                ["die Frau", "wife", "ഭാര്യ"]
              ]
            },
            {
              type: "note",
              title: "Malayalam vs German Family Terms",
              variant: "info",
              content: "Malayalam has different words for maternal uncle (Ammavan) vs paternal uncle (Chittappan). German only has ONE word: 'Onkel'. Same for aunt — just 'Tante'. Much simpler system!"
            },
            {
              type: "note",
              title: "Cousin Pronunciation",
              variant: "tip",
              content: "'Cousin' and 'Cousine' are borrowed from French! Pronounce them the French way: 'koo-zaN' (male) and 'koo-zee-nuh' (female). NOT like English 'cousin'."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex4-1-1",
          type: "matching",
          question: "Kuttan spreads the family photo album on his study desk and labels each face in German. Match the family words:",
          options: ["die Mutter → mother", "der Vater → father", "der Bruder → brother", "die Schwester → sister", "die Oma → grandmother", "der Opa → grandfather"],
          correctAnswer: ["die Mutter → mother", "der Vater → father", "der Bruder → brother", "die Schwester → sister", "die Oma → grandmother", "der Opa → grandfather"],
          explanation: "Family words follow a gender pattern: male relatives = der (der Vater, der Bruder), female relatives = die (die Mutter, die Schwester). The article tells you the gender!",
          xpReward: 20
        },
        {
          id: "ex4-1-2",
          type: "multiple-choice",
          question: "Your German host family introduces you to their 'Oma'. Who is she?",
          questionGerman: "Wer ist die 'Oma' in der Familie?",
          options: ["Grandmother", "Mother", "Aunt", "Sister"],
          correctAnswer: "Grandmother",
          explanation: "In Germany, 'Großmutter' is formal, but everyone says 'Oma' for a warm, casual feeling — just like 'Ammoomma' back home! 'Opa' is similarly used for 'Großvater'.",
          xpReward: 15,
          imageUrl: "/images/kaffeeklatsch.png"
        },
        {
          id: "ex4-1-3",
          type: "fill-blank",
          question: "'I have a brother and a sister': Ich habe einen Bruder und eine _____.",
          options: ["Schwester", "Bruder", "Mutter", "Tante"],
          correctAnswer: "Schwester",
          explanation: "Schwester (sister) is feminine = die Schwester. So 'a sister' = 'eine Schwester'. Rule: der → einen (masc acc), die → eine (fem), das → ein (neuter).",
          xpReward: 15
        },
        {
          id: "ex4-1-4",
          type: "multiple-choice",
          question: "How do you distinguish between an elder and younger brother in German, like 'Chettan' vs 'Aniyan'?",
          questionGerman: "Wie sagt man 'Chettan' oder 'Aniyan' auf Deutsch?",
          options: [
            "älterer Bruder / jüngerer Bruder",
            "Chettan / Aniyan",
            "Großbruder / Kleinbruder",
            "Bruder eins / Bruder zwei"
          ],
          correctAnswer: "älterer Bruder / jüngerer Bruder",
          explanation: "Unlike Malayalam, German doesn't have unique single words for elder/younger siblings. You simply add the adjective: 'älter' (older) or 'jünger' (younger). So, 'mein älterer Bruder' = your Chettan!",
          xpReward: 20
        },
        {
          id: "ex4-1-5",
          type: "fill-blank",
          question: "'That is my aunt': Das ist meine _____.",
          options: ["Tante", "Onkel", "Schwester", "Cousine"],
          correctAnswer: "Tante",
          explanation: "Tante is feminine (die Tante), so possessive = 'meine Tante'. Pattern: masculine nouns = mein, feminine nouns = meine. The '-e' ending signals feminine.",
          xpReward: 15
        },
        {
          id: "ex4-1-6",
          type: "multiple-choice",
          question: "Frau Weber's homework question reads: 'Hast du Geschwister?' What is she asking about?",
          options: ["The sisters", "The brothers", "The siblings", "The parents"],
          correctAnswer: "The siblings",
          explanation: "'Geschwister' = siblings (all brothers + sisters). It's always plural (die Geschwister). Useful A1 question: 'Hast du Geschwister?' (Do you have siblings?)",
          xpReward: 15
        },
        {
          id: "ex4-1-7",
          type: "dictation",
          question: "Listen and type: Meine Mutter kommt aus Kerala.",
          correctAnswer: "Meine Mutter kommt aus Kerala",
          explanation: "Perfect! 'Meine Mutter' (My mother) is feminine, so we use 'meine'. 'Kommt aus' means 'comes from'.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-mother-kerala.mp3"
        },
        {
          id: "ex4-1-8",
          type: "free-text",
          question: "Kuttan taps Appooppan's photo in the album. What do Germans call grandfather? (formal or casual)",
          correctAnswer: "Großvater / Opa",
          explanation: "Both are correct! 'Großvater' is the official term, while 'Opa' is what children (and adults!) usually call their grandfather.",
          xpReward: 20
        },
        {
          id: "ex4-1-9",
          type: "free-text",
          question: "Photo caption time: under the picture of his two brothers, Kuttan writes 'I have two brothers' in German. Type it.",
          correctAnswer: "Ich habe zwei Brüder",
          explanation: "Note the plural of Bruder is Brüder (with an Umlaut!). 'haben' triggers the accusative, but for plurals after 'zwei' nothing changes.",
          xpReward: 35
        }
      ,
        {
          id: "ex4-1-prod-speaking",
          type: "speaking",
          question: "Hold up the first photo and introduce Amma — say aloud: 'Meine Mutter wohnt in Thrissur.'",
          questionGerman: "Sprechen Sie laut: 'Meine Mutter wohnt in Thrissur.'",
          correctAnswer: "Meine Mutter wohnt in Thrissur",
          explanation: "'Meine Mutter wohnt in ...' is the opening line of every family answer in Sprechen Teil 1. Your real family makes it stick.",
          audioUrl: "/audio/exercises/ex4-1-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex4-1-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: he says 'Das ist mein Schwester.' Schwester is feminine — it needs 'meine'! Say it right: 'Das ist meine Schwester.'",
          questionGerman: "Sprechen Sie laut: 'Das ist meine Schwester.'",
          correctAnswer: "Das ist meine Schwester",
          explanation: "mein Bruder, but meine Schwester — the -e on 'meine' matches die-words. This swap is the #1 family-talk error in Sprechen Teil 1.",
          audioUrl: "/audio/exercises/ex4-1-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab4-1-1",
          german: "die Mutter",
          english: "the mother",
          malayalam: "അമ്മ",
          pronunciation: "dee moo-ter",
          example: "Meine Mutter kocht sehr gut.",
          exampleTranslation: "My mother cooks very well."
        },
        {
          id: "vocab4-1-2",
          german: "der Vater",
          english: "the father",
          malayalam: "അച്ഛൻ",
          pronunciation: "dehr fah-ter",
          example: "Mein Vater arbeitet in Kochi.",
          exampleTranslation: "My father works in Kochi."
        },
        {
          id: "vocab4-1-3",
          german: "der Bruder",
          english: "the brother",
          malayalam: "സഹോദരൻ",
          pronunciation: "dehr broo-der",
          example: "Mein Bruder ist älter als ich.",
          exampleTranslation: "My brother is older than me."
        },
        {
          id: "vocab4-1-4",
          german: "die Schwester",
          english: "the sister",
          malayalam: "സഹോദരി",
          pronunciation: "dee shves-ter",
          example: "Meine Schwester studiert Medizin.",
          exampleTranslation: "My sister studies medicine."
        },
        {
          id: "vocab4-1-5",
          german: "die Großmutter",
          english: "the grandmother",
          malayalam: "മുത്തശ്ശി",
          pronunciation: "dee grohs-moo-ter",
          example: "Meine Großmutter erzählt schöne Geschichten.",
          exampleTranslation: "My grandmother tells beautiful stories."
        },
        {
          id: "vocab4-1-6",
          german: "der Großvater",
          english: "the grandfather",
          malayalam: "മുത്തച്ഛൻ",
          pronunciation: "dehr grohs-fah-ter",
          example: "Mein Großvater ist achtzig Jahre alt.",
          exampleTranslation: "My grandfather is eighty years old."
        },
        {
          id: "vocab4-1-7",
          german: "der Onkel",
          english: "the uncle",
          malayalam: "അമ്മാവൻ / ചിറ്റപ്പൻ",
          pronunciation: "dehr on-kel",
          example: "Mein Onkel wohnt in Berlin.",
          exampleTranslation: "My uncle lives in Berlin."
        },
        {
          id: "vocab4-1-8",
          german: "die Tante",
          english: "the aunt",
          malayalam: "അമ്മായി / വലിയമ്മ",
          pronunciation: "dee tahn-tuh",
          example: "Meine Tante hat drei Kinder.",
          exampleTranslation: "My aunt has three children."
        },
        {
          id: "vocab4-1-9",
          german: "der Cousin",
          english: "the cousin (male)",
          malayalam: "കസിൻ (ആൺ)",
          pronunciation: "dehr koo-zaN",
          example: "Mein Cousin kommt aus Mumbai.",
          exampleTranslation: "My cousin comes from Mumbai."
        },
        {
          id: "vocab4-1-10",
          german: "die Cousine",
          english: "the cousin (female)",
          malayalam: "കസിൻ (പെൺ)",
          pronunciation: "dee koo-zee-nuh",
          example: "Meine Cousine spricht drei Sprachen.",
          exampleTranslation: "My cousin speaks three languages."
        },
        {
          id: "vocab4-1-11",
          german: "die Eltern",
          english: "parents",
          malayalam: "മാതാപിതാക്കൾ",
          pronunciation: "dee el-tern",
          example: "Meine Eltern wohnen in Kerala.",
          exampleTranslation: "My parents live in Kerala."
        },
        {
          id: "vocab4-1-12",
          german: "die Tochter",
          english: "daughter",
          malayalam: "മകൾ",
          pronunciation: "dee tokh-ter",
          example: "Meine Tochter ist fünf Jahre alt.",
          exampleTranslation: "My daughter is five years old."
        },
        {
          id: "vocab4-1-13",
          german: "der Sohn",
          english: "son",
          malayalam: "മകൻ",
          pronunciation: "dehr zohn",
          example: "Mein Sohn geht zur Schule.",
          exampleTranslation: "My son goes to school."
        }
      ]
    },

    // ─── Lesson 4-2: Describing People ───
    {
      id: "4-2",
      title: "Describing People",
      titleGerman: "Menschen beschreiben",
      description: "Learn to describe how people look and their personality traits — from groß to klein, from nett to lustig!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Goethe Kochi Classroom — Berlin Photo Practice",
          sceneType: "classroom",
          timeOfDay: "afternoon",
          description: "Frau Weber brings a printed photo of Tempelhofer Feld in Berlin to Goethe Kochi. You, Kuttan, and the class are still in Kerala, using the photo as future-life rehearsal. Frau Weber points to people in the picture and says: 'Beschreiben Sie die Leute dort!' (Describe the people there!). Time to flex your adjectives, machane!",
        },
        narrative: {
          previousRecap: "You've introduced your family on video call. Now, let's use a Berlin photo in Kerala to describe people you may meet in the future.",
          currentObjective: "Use adjectives to describe physical appearance and personality traits",
          nextTeaser: "Next: who owns this? Master possessive pronouns (my, your, his, her)!",
        },
        kuttanIntro: [
          "Machane! Frau Weber-inte Berlin photo nokki nammal Kerala classroom-il practice cheyyam. Chilar tall aanu (groß), chilar short aanu (klein).",
          "Adjectives parayumpo small rule undu. Adjective 'ist' kazhinju varayil simple aanu (Er ist groß). But noun-te mumpil (height, hair) varumbol small ending care venam.",
          "Personality describe cheyyan 'nett' (nice) or 'lustig' (funny) use cheyyaam. Let's start the photo people-watching challenge!",
        ],
        vocabEncounters: [
          { vocabId: "vocab4-2-1", encounterMoment: "Frau Weber points to a basketball player in the Berlin photo: 'Guck mal, er ist sehr groß!' He's truly tall, machane!", contextSentence: "Mein Vater ist sehr groß." },
          { vocabId: "vocab4-2-2", encounterMoment: "Kuttan points to a small child in the picture: 'Das Kind ist noch klein.' So cute!", contextSentence: "Das Kind ist noch klein." },
          { vocabId: "vocab4-2-4", encounterMoment: "In the printed photo, a girl has dyed hair: 'Sie hat blaue Haare!' Useful future-life vocabulary, practiced from Kerala.", contextSentence: "Sie hat lange, schwarze Haare." },
          { vocabId: "vocab4-2-5", encounterMoment: "Frau Weber describes the cafe worker in the photo: 'Er ist sehr nett.'", contextSentence: "Unsere Nachbarn sind sehr nett." },
          { vocabId: "vocab4-2-9", encounterMoment: "You spot someone studying intensely on a bench in the photo: 'Sie ist sehr fleißig.' Hard-working spirit!", contextSentence: "Deutsche Studenten sind fleißig." },
        ],
        decisionPoints: [
          {
            moment: "In Frau Weber's Berlin photo at Goethe Kochi, you see a jogger. How do you say 'He is tall and athletic' in German?",
            options: [
              { text: "Er ist groß und sportlich.", isCorrect: true, response: "Exactly! Adjectives after 'ist' don't need any special endings. Simple and clean!", kuttanReaction: "Adipoli! 'ist' kazhinju adjective mathram paranjaal mathi. No extra tension. Gold star! ⭐" },
              { text: "Er hat groß und sportlich.", isCorrect: false, response: "Aiyyo! 'Hat' (has) is for features like hair or eyes. For 'is', use 'ist'!", kuttanReaction: "Vite machane! 'He is' → 'Er ist'. 'He has' → 'Er hat'. Characteristics-inu 'ist' thanne use cheyyanam. Try again! 😬" },
            ],
          },
          {
            moment: "Stefan asks about your best friend back in Kerala. 'Hat er schwarze Haare?' (Does he have black hair?). You want to say 'Yes, and brown eyes'.",
            options: [
              { text: "Ja, und braune Augen.", isCorrect: true, response: "Correct! 'Augen' is plural, so 'braun' gets the '-e' ending.", kuttanReaction: "Super machane! Plural nouns (eyes, hair) mumpil adjective varumbol '-e' ending venam. Logic correct aayi catch cheythallo! 🔥" },
              { text: "Ja, und braun Augen.", isCorrect: false, response: "Nearly! But 'Augen' is plural, so you need that tiny '-e' at the end of 'braun'.", kuttanReaction: "Aiyyo! Plural article illaathe varumbol adjective-inu '-e' ending venam. 'braune Augen' is the correct way. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v4-2-1",
          title: "How People Look",
          duration: "12:00",
          description: "Physical descriptions — height, build, hair, eyes, and age in German.",
          scriptOutline: [
            "Opening: 'How would you describe your best friend? Let's learn the words!'",
            "Height: groß (tall/big) vs klein (short/small)",
            "Age: alt (old) vs jung (young)",
            "Build: dick (fat/thick) vs dünn (thin) — careful, 'dick' can be rude!",
            "Better alternatives: schlank (slim), sportlich (athletic)",
            "Hair: die Haare — blonde Haare, braune Haare, schwarze Haare, rote Haare",
            "Long vs short: lange Haare vs kurze Haare",
            "Eyes: die Augen — blaue Augen, braune Augen, grüne Augen",
            "Kerala connection: Most of us have 'schwarze Haare und braune Augen' (black hair and brown eyes)!",
            "Sentence pattern: 'Er/Sie ist groß und hat schwarze Haare'",
            "He/She is... and has...",
            "Practice: Describe a Bollywood actor or cricket player in German!"
          ],
          keyVocabulary: ["groß", "klein", "alt", "jung", "die Haare", "die Augen", "schwarze", "braune"],
          learningObjectives: [
            "Describe physical appearance in German",
            "Use basic adjectives for height, age, and build",
            "Talk about hair colour and eye colour",
            "Form sentences with 'ist' and 'hat'"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Physical Description Adjectives",
              headers: ["German", "English", "Opposite"],
              rows: [
                ["groß", "tall/big", "klein (short/small)"],
                ["alt", "old", "jung (young)"],
                ["schlank", "slim", "dick (fat — be careful!)"],
                ["lang", "long", "kurz (short)"],
                ["sportlich", "athletic", "—"]
              ]
            },
            {
              type: "table",
              title: "Hair & Eye Colours",
              headers: ["Hair (die Haare)", "Eyes (die Augen)"],
              rows: [
                ["schwarze Haare (black)", "braune Augen (brown)"],
                ["braune Haare (brown)", "blaue Augen (blue)"],
                ["blonde Haare (blonde)", "grüne Augen (green)"],
                ["rote Haare (red)", "graue Augen (grey)"]
              ]
            },
            {
              type: "note",
              title: "Sentence Pattern",
              variant: "tip",
              content: "Use 'ist' for descriptions and 'hat' for features: 'Er ist groß und hat schwarze Haare.' (He is tall and has black hair.) Most Malayalis: 'Ich habe schwarze Haare und braune Augen.'"
            }
          ]
        },
        {
          id: "v4-2-2",
          title: "Personality & Character",
          duration: "10:00",
          description: "Go beyond looks — describe someone's personality and character in German.",
          scriptOutline: [
            "Opening: 'Looks are one thing, but personality matters more! Let's learn character words.'",
            "Positive traits:",
            "nett (nice) — 'net', short and sweet",
            "freundlich (friendly) — 'froynt-likh', from 'Freund' (friend)",
            "lustig (funny) — 'loos-tig', someone who makes you laugh",
            "intelligent (intelligent) — same as English, just German pronunciation!",
            "fleißig (hard-working/diligent) — very valued in German culture!",
            "ehrlich (honest), hilfsbereit (helpful), geduldig (patient)",
            "Negative traits (use carefully!):",
            "faul (lazy), langweilig (boring), streng (strict)",
            "Kerala parallel: 'Fleißig' is like our 'kashtappedunna aallu' — Germans really respect hard work!",
            "Sentence patterns: 'Sie ist sehr freundlich' (She is very friendly)",
            "'Er ist lustig und intelligent' (He is funny and intelligent)",
            "Practice: Describe three family members using personality words"
          ],
          keyVocabulary: ["nett", "freundlich", "lustig", "intelligent", "fleißig", "ehrlich"],
          learningObjectives: [
            "Use personality adjectives in German",
            "Combine physical and personality descriptions",
            "Form longer descriptive sentences"
          ],
          placeholderThumbnail: "/images/berlin_people.png",
          richContent: [
            {
              type: "table",
              title: "Personality Adjectives",
              headers: ["Positive (German)", "English", "Negative (German)", "English"],
              rows: [
                ["nett", "nice", "faul", "lazy"],
                ["freundlich", "friendly", "langweilig", "boring"],
                ["lustig", "funny", "streng", "strict"],
                ["intelligent", "intelligent", "unhöflich", "rude"],
                ["fleißig", "hard-working", "schüchtern", "shy"],
                ["ehrlich", "honest", "—", "—"]
              ]
            },
            {
              type: "note",
              title: "'Fleißig' — The German Superpower",
              variant: "info",
              content: "'Fleißig' (diligent/hard-working) is the most valued trait in German culture. Calling someone 'fleißig' is a huge compliment. It is like our 'kashtappedunna aallu' — a person who works hard and earns respect!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex4-2-1",
          type: "matching",
          question: "At Goethe Kochi, Kuttan labels Frau Weber's Berlin photo. Match the adjective opposites:",
          options: ["groß → klein", "alt → jung", "dick → dünn", "lang → kurz"],
          correctAnswer: ["groß → klein", "alt → jung", "dick → dünn", "lang → kurz"],
          explanation: "groß/klein (big/small), alt/jung (old/young), dick/dünn (fat/thin), lang/kurz (long/short).",
          xpReward: 20
        },
        {
          id: "ex4-2-2",
          type: "fill-blank",
          question: "'She is tall and has brown eyes': Sie ist groß und hat _____ Augen.",
          options: ["braune", "braun", "brauner", "braunem"],
          correctAnswer: "braune",
          explanation: "Before plural nouns without an article, adjectives add '-e': braune Augen, schwarze Haare, lange Beine. This '-e' ending works for most descriptions of appearance!",
          xpReward: 15
        },
        {
          id: "ex4-2-3",
          type: "multiple-choice",
          question: "Frau Weber calls a student in the Berlin photo 'fleißig'. What does she mean?",
          options: ["lazy", "funny", "hard-working", "friendly"],
          correctAnswer: "hard-working",
          explanation: "'Fleißig' (hard-working) is the ultimate German compliment! Germans deeply value diligence. Calling someone 'fleißig' is like saying they're reliable and impressive.",
          xpReward: 15
        },
        {
          id: "ex4-2-4",
          type: "multiple-choice",
          question: "Kuttan describes Arjun at the Kerala cafe. How do you say 'He is funny and nice' in German?",
          options: [
            "Er ist lustig und nett.",
            "Er hat lustig und nett.",
            "Er ist lustig oder nett.",
            "Er bist lustig und nett."
          ],
          correctAnswer: "Er ist lustig und nett.",
          explanation: "Description formula: [Person] + ist + adjective(s) joined with 'und'. 'Er ist lustig und nett.' Remember: 'bist' is ONLY for 'du', 'ist' for er/sie/es.",
          xpReward: 20
        },
        {
          id: "ex4-2-5",
          type: "fill-blank",
          question: "'My mother has black hair': Meine Mutter hat _____ Haare.",
          options: ["schwarze", "schwarz", "schwarzer", "schwarzem"],
          correctAnswer: "schwarze",
          explanation: "Haare (hair) is plural in German, so adjectives get '-e': schwarze Haare, blonde Haare. Pattern: use 'hat' for physical features: 'Meine Mutter hat schwarze Haare.'",
          xpReward: 15
        },
        {
          id: "ex4-2-6",
          type: "ordering",
          question: "Arrange this description: 'Mein / Freund / ist / groß / und / hat / schwarze / Haare'",
          options: ["Mein Freund", "ist groß", "und", "hat", "schwarze Haare"],
          correctAnswer: ["Mein Freund", "ist groß", "und", "hat", "schwarze Haare"],
          explanation: "'Mein Freund ist groß und hat schwarze Haare.' — Using two verbs for description: 'ist' for general traits and 'hat' for physical features.",
          xpReward: 20
        },
        {
          id: "ex4-2-7",
          type: "dictation",
          question: "Goethe Kochi dictation: listen to Kuttan describing his father and type the sentence you hear.",
          correctAnswer: "Mein Vater ist groß und nett",
          explanation: "Great! Remember that 'groß' means tall when describing people. No ending is needed for adjectives that come after 'ist'!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-father-description.mp3"
        },
        {
          id: "ex4-2-8",
          type: "free-text",
          question: "Describe yourself in German. (e.g. Ich bin fleißig / Ich bin lustig)",
          correctAnswer: "Ich bin ...",
          explanation: "Wunderbar! Using 'fleißig' is very German. It shows you value hard work!",
          xpReward: 30
        },
        {
          id: "ex4-2-9",
          type: "free-text",
          question: "At Goethe Kochi, Frau Weber points to Priya and says: translate 'She is very friendly.'",
          correctAnswer: "Sie ist sehr freundlich",
          explanation: "Friendly = freundlich. 'Sehr' means 'very'. German word order is just like English here!",
          xpReward: 35
        }
      ,
        {
          id: "ex4-2-prod-speaking",
          type: "speaking",
          question: "Your turn in the Berlin photo game: describe Achan to the class — say aloud: 'Mein Vater ist sehr groß.'",
          questionGerman: "Sprechen Sie laut: 'Mein Vater ist sehr groß.'",
          correctAnswer: "Mein Vater ist sehr groß",
          explanation: "Describing a family member is a guaranteed Sprechen prompt. 'ist + adjective' with no ending is the easiest correct German you'll ever say.",
          audioUrl: "/audio/exercises/ex4-2-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex4-2-spk2",
          type: "speaking",
          question: "Repair Kuttan's photo caption: he says 'Priya ist schwarze Haare.' Hair needs 'hat', not 'ist'! Say it right: 'Priya hat schwarze Haare.'",
          questionGerman: "Sprechen Sie laut: 'Priya hat schwarze Haare.'",
          correctAnswer: "Priya hat schwarze Haare",
          explanation: "'ist' for traits (Sie ist nett), 'hat' for features (Sie hat schwarze Haare). English 'has black hair' matches German here — trust it.",
          audioUrl: "/audio/exercises/ex4-2-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab4-2-1",
          german: "groß",
          english: "tall / big",
          malayalam: "ഉയരമുള്ള / വലിയ",
          pronunciation: "grohs",
          example: "Mein Vater ist sehr groß.",
          exampleTranslation: "My father is very tall."
        },
        {
          id: "vocab4-2-2",
          german: "klein",
          english: "short / small",
          malayalam: "ചെറിയ / ഉയരം കുറഞ്ഞ",
          pronunciation: "kline",
          example: "Das Kind ist noch klein.",
          exampleTranslation: "The child is still small."
        },
        {
          id: "vocab4-2-3",
          german: "jung",
          english: "young",
          malayalam: "ചെറുപ്പമുള്ള",
          pronunciation: "yoong",
          example: "Sie ist jung und sportlich.",
          exampleTranslation: "She is young and athletic."
        },
        {
          id: "vocab4-2-4",
          german: "die Haare",
          english: "the hair",
          malayalam: "മുടി",
          pronunciation: "dee hah-ruh",
          example: "Sie hat lange, schwarze Haare.",
          exampleTranslation: "She has long, black hair."
        },
        {
          id: "vocab4-2-5",
          german: "nett",
          english: "nice",
          malayalam: "നല്ല",
          pronunciation: "net",
          example: "Unsere Nachbarn sind sehr nett.",
          exampleTranslation: "Our neighbours are very nice."
        },
        {
          id: "vocab4-2-6",
          german: "freundlich",
          english: "friendly",
          malayalam: "സൗഹൃദപരമായ",
          pronunciation: "froynt-likh",
          example: "Die Lehrerin ist freundlich.",
          exampleTranslation: "The teacher is friendly."
        },
        {
          id: "vocab4-2-7",
          german: "lustig",
          english: "funny",
          malayalam: "തമാശക്കാരൻ",
          pronunciation: "loos-tig",
          example: "Mein Onkel ist sehr lustig.",
          exampleTranslation: "My uncle is very funny."
        },
        {
          id: "vocab4-2-8",
          german: "intelligent",
          english: "intelligent",
          malayalam: "ബുദ്ധിമാൻ",
          pronunciation: "in-teh-li-gent",
          example: "Meine Schwester ist intelligent.",
          exampleTranslation: "My sister is intelligent."
        },
        {
          id: "vocab4-2-9",
          german: "fleißig",
          english: "hard-working / diligent",
          malayalam: "കഠിനാധ്വാനി",
          pronunciation: "fly-sig",
          example: "Deutsche Studenten sind fleißig.",
          exampleTranslation: "German students are hard-working."
        },
        {
          id: "vocab4-2-10",
          german: "schön",
          english: "beautiful / pretty",
          malayalam: "സുന്ദരമായ",
          pronunciation: "shoehn",
          example: "Kerala ist sehr schön.",
          exampleTranslation: "Kerala is very beautiful."
        }
      ]
    },

    // ─── Lesson 4-3: Possessive Pronouns ───
    {
      id: "4-3",
      title: "Possessive Pronouns",
      titleGerman: "Possessivpronomen",
      description: "My, your, his, her — learn how to say who owns what in German. Spoiler: possessives change with gender!",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "WG Hallway & Storage Area",
          sceneType: "home",
          timeOfDay: "morning",
          description: "The hallway is a bit cluttered after the weekend. Jackets, bags, and umbrellas are everywhere. Stefan is trying to tidy up and is asking who owns what. It's the ultimate test of 'mein' vs 'meine', and 'dein' vs 'seine'. Time to claim your stuff, machane!",
        },
        narrative: {
          previousRecap: "You've survived the people-watching challenge at the park. Now, let's sort out your belongings in the WG!",
          currentObjective: "Use possessive pronouns correctly with gender agreement",
          nextTeaser: "Next: the ultimate article battle! 'der, die, das' — let's crack the code!",
        },
        kuttanIntro: [
          "Machane! 'Ente', 'ninte', 'avante' — Malalaym-il simple aanu. But German-il possessives change with gender. 'Mein' brother, but 'Meine' sister.",
          "Nammal owned noun-inte gender nokkanam. Masculine/Neuter aano? Ending illa. Feminine/Plural aano? '-e' ending venam.",
          "Stefan-inte questions 'dein' aano ennu aakum. Answer 'mein' aayirikkum. Let's practice this 'me/you' switch!",
        ],
        vocabEncounters: [
          { vocabId: "vocab4-3-1", encounterMoment: "Stefan points to a backpack: 'Ist das dein Rucksack?' You answer: 'Ja, das ist mein Rucksack.'", contextSentence: "Das ist mein Haus." },
          { vocabId: "vocab4-3-2", encounterMoment: "You find a bag: 'Lara, ist das deine Tasche?' Feminine ending care venam!", contextSentence: "Ist das deine Tasche?" },
          { vocabId: "vocab4-3-3", encounterMoment: "Stefan points to a jacket: 'Das ist sein Mantel.' He's talking about Arjun's coat.", contextSentence: "Sein Vater ist Arzt." },
          { vocabId: "vocab4-3-4", encounterMoment: "You see a scarf: 'Ist das ihre Schal?' No, 'Schal' is masculine, so 'ist das ihr Schal?'", contextSentence: "Ihre Schwester wohnt in Deutschland." },
          { vocabId: "vocab4-3-6", encounterMoment: "You show Stefan a photo: 'Meine Familie ist groß.' He's impressed by the crowd!", contextSentence: "Meine Familie kommt aus Kerala." },
        ],
        decisionPoints: [
          {
            moment: "Stefan holds up a pen (der Stift): 'Ist das dein Stift?' How do you answer 'Yes, that is my pen'?",
            options: [
              { text: "Ja, das ist mein Stift.", isCorrect: true, response: "Correct! 'Stift' is masculine, so 'mein' has no ending.", kuttanReaction: "Adipoli! Masculine noun-inu 'mein' mathi. Simple logic perfectly apply cheythallo! 🔥" },
              { text: "Ja, das ist meine Stift.", isCorrect: false, response: "Aiyyo! 'Stift' is masculine (der Stift). '-e' ending is ONLY for feminine/plural!", kuttanReaction: "Vite machane! Gender article check cheyyu. 'der' kandaal 'mein' mathi. Try again! 😬" },
            ],
          },
          {
            moment: "You find a key (der Schlüssel). It belongs to Lara. How do you tell Stefan 'That is her key'?",
            options: [
              { text: "Das ist ihr Schlüssel.", isCorrect: true, response: "Exactly! 'ihr' for her, and no ending because 'Schlüssel' is masculine.", kuttanReaction: "Superb! 'her' is 'ihr'. 'ihr' + masc noun = ihr. Logic correct aayi catch cheythallo! ⭐" },
              { text: "Das ist ihre Schlüssel.", isCorrect: false, response: "Nearly! But 'Schlüssel' is masculine, so it should be 'ihr', not 'ihre'.", kuttanReaction: "Aiyyo! '-e' ending Lara-kkalla, key-ykkaanu kodukkunnathu. Key masculine aayathu kondu 'ihr' mathi. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v4-3-1",
          title: "Mein, Dein, Sein, Ihr - Whose is it?",
          duration: "15:00",
          description: "Master German possessive pronouns — and understand why they change endings.",
          scriptOutline: [
            "Opening: 'Mein Buch, dein Stift, sein Handy — whose is it? Let's sort it out!'",
            "The possessive pronouns:",
            "mein (my) — 'mine', from 'ich'",
            "dein (your, informal) — from 'du'",
            "sein (his/its) — from 'er/es'",
            "ihr (her) — from 'sie' (she). Also 'ihr' = your (formal)/their!",
            "unser (our) — from 'wir'",
            "euer (your, plural informal) — from 'ihr'",
            "The TWIST: Endings change based on the gender of the THING owned!",
            "Masculine/Neuter: mein Bruder (my brother), mein Kind (my child)",
            "Feminine: meine Schwester (my sister) — adds '-e'",
            "Plural: meine Eltern (my parents) — also adds '-e'",
            "Pattern applies to ALL possessives: dein/deine, sein/seine, ihr/ihre, unser/unsere",
            "Kerala parallel: Malayalam uses 'ente', 'ninte', 'avante', 'avalude' — but they don't change based on what follows! German does.",
            "Practice sentences: 'Das ist mein Bruder' / 'Das ist meine Schwester'",
            "Common mistakes: Using 'mein' when you need 'meine' for feminine nouns",
            "Real-life practice: Introducing family with possessives"
          ],
          keyVocabulary: ["mein", "meine", "dein", "deine", "sein", "seine", "ihr", "ihre", "unser", "unsere"],
          learningObjectives: [
            "Use all German possessive pronouns correctly",
            "Apply the correct ending based on noun gender",
            "Distinguish between 'mein' (masculine/neuter) and 'meine' (feminine/plural)",
            "Form sentences about possession and family"
          ],
          placeholderThumbnail: "/images/german_apartment_living_room_v2.png",
          richContent: [
            {
              type: "table",
              title: "Possessive Pronouns",
              headers: ["Person", "Base Form", "+ Feminine/Plural"],
              rows: [
                ["ich", "mein", "meine"],
                ["du", "dein", "deine"],
                ["er/es", "sein", "seine"],
                ["sie (she)", "ihr", "ihre"],
                ["wir", "unser", "unsere"],
                ["ihr (you all)", "euer", "eure"],
                ["sie/Sie", "ihr/Ihr", "ihre/Ihre"]
              ]
            },
            {
              type: "table",
              title: "Ending Rules",
              headers: ["Noun Gender", "Ending", "Example"],
              rows: [
                ["Masculine (der)", "mein", "mein Bruder"],
                ["Neuter (das)", "mein", "mein Kind"],
                ["Feminine (die)", "meine", "meine Schwester"],
                ["Plural (die)", "meine", "meine Eltern"]
              ]
            },
            {
              type: "note",
              title: "The Key Difference from Malayalam",
              variant: "info",
              content: "Malayalam possessives (ente, ninte, avante) stay the same regardless of what follows. But in German, the ending changes based on the THING owned: 'mein Bruder' but 'meine Schwester'. The possessive adapts to the noun's gender!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex4-3-1",
          type: "multiple-choice",
          question: "'That is my sister' — which is correct?",
          options: [
            "Das ist mein Schwester.",
            "Das ist meine Schwester.",
            "Das ist meiner Schwester.",
            "Das ist meines Schwester."
          ],
          correctAnswer: "Das ist meine Schwester.",
          explanation: "Possessive rule: masculine/neuter = mein (no ending), feminine/plural = meine (add -e). Schwester is feminine → meine. Bruder is masculine → mein. Check the article to decide!",
          xpReward: 20
        },
        {
          id: "ex4-3-2",
          type: "fill-blank",
          question: "'His mother is nice': _____ Mutter ist nett.",
          options: ["Seine", "Sein", "Seiner", "Seinem"],
          correctAnswer: "Seine",
          explanation: "All possessives follow the same pattern: sein → seine (feminine). The ending matches the OWNED noun's gender, not the owner's. His mother = seine Mutter (Mutter is feminine).",
          xpReward: 15
        },
        {
          id: "ex4-3-3",
          type: "multiple-choice",
          question: "Which possessive pronoun means 'our'?",
          options: ["mein", "euer", "unser", "ihr"],
          correctAnswer: "unser",
          explanation: "Possessive pronouns map from personal pronouns: ich→mein, du→dein, er→sein, sie→ihr, wir→unser, ihr→euer. Learn the pairs!",
          xpReward: 15
        },
        {
          id: "ex4-3-4",
          type: "fill-blank",
          question: "'Your (informal) brother': _____ Bruder.",
          options: ["Dein", "Deine", "Deinem", "Deinen"],
          correctAnswer: "Dein",
          explanation: "Bruder = der (masculine) → possessive has NO extra ending: dein Bruder, mein Bruder, sein Bruder. Only feminine/plural nouns trigger the '-e': deine Schwester.",
          xpReward: 15
        },
        {
          id: "ex4-3-5",
          type: "matching",
          question: "On the WG video tour, your cousin points at the name tags on each door. Match the possessives:",
          options: ["mein Vater → my father", "meine Mutter → my mother", "sein Bruder → his brother", "ihre Schwester → her sister"],
          correctAnswer: ["mein Vater → my father", "meine Mutter → my mother", "sein Bruder → his brother", "ihre Schwester → her sister"],
          explanation: "Quick test: check the article of the owned noun. Der → mein/sein (no ending). Die → meine/seine/ihre (-e ending). Das → mein/sein (no ending). Die (plural) → meine/seine (-e).",
          xpReward: 20
        },
        {
          id: "ex4-3-6",
          type: "multiple-choice",
          question: "'Our parents are in Kerala.' — Translate to German:",
          options: [
            "Unser Eltern sind in Kerala.",
            "Unsere Eltern sind in Kerala.",
            "Unseren Eltern sind in Kerala.",
            "Unserer Eltern sind in Kerala."
          ],
          correctAnswer: "Unsere Eltern sind in Kerala.",
          explanation: "Eltern (parents) is always plural → unsere Eltern. Plural nouns use the same '-e' ending as feminine: meine Eltern, deine Kinder, seine Geschwister.",
          xpReward: 20
        },
        {
          id: "ex4-3-7",
          type: "fill-blank",
          question: "'Her name is Anna': _____ Name ist Anna.",
          options: ["Ihr", "Ihre", "Ihrem", "Ihren"],
          correctAnswer: "Ihr",
          explanation: "Name is masculine (der Name) → Ihr Name (no ending).",
          xpReward: 15
        },
        {
          id: "ex4-3-8",
          type: "dictation",
          question: "Your cousin's flatmate leans into the video call and asks about your family. Listen and type the question you hear.",
          correctAnswer: "Wie heißt deine Schwester?",
          explanation: "Perfect! 'Deine' (your) has the '-e' ending because 'Schwester' is feminine.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-sister-name.mp3"
        },
        {
          id: "ex4-3-9",
          type: "free-text",
          question: "Translate: 'My parents live in Kochi.'",
          correctAnswer: "Meine Eltern wohnen in Kochi",
          explanation: "Parents = Eltern (always plural). So we use 'meine' and the verb 'wohnen' (plural for they).",
          xpReward: 35
        },
        {
          id: "ex4-3-10",
          type: "free-text",
          question: "Lightning round on the call: your cousin tests you — 'his brother' in German. Type it.",
          correctAnswer: "sein Bruder",
          explanation: "Sein (his) + Bruder (masculine). No extra ending needed!",
          xpReward: 20
        }
      ,
        {
          id: "ex4-3-prod-speaking",
          type: "speaking",
          question: "Tell your cousin's flatmates about home — say aloud: 'Meine Eltern wohnen in Kochi.'",
          questionGerman: "Sprechen Sie laut: 'Meine Eltern wohnen in Kochi.'",
          correctAnswer: "Meine Eltern wohnen in Kochi",
          explanation: "Eltern is always plural: meine Eltern, wohnen with -en. This sentence appears in nearly every Sprechen Teil 1 about family.",
          audioUrl: "/audio/exercises/ex4-3-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex4-3-spk2",
          type: "speaking",
          question: "Repair Kuttan's intro: he says 'Das ist sein Schwester' about Arjun's sister. Schwester needs 'seine'! Say it right: 'Das ist seine Schwester.'",
          questionGerman: "Sprechen Sie laut: 'Das ist seine Schwester.'",
          correctAnswer: "Das ist seine Schwester",
          explanation: "The ending matches the OWNED noun: die Schwester → seine. The owner's gender doesn't matter — different from Malayalam അവന്റെ/അവളുടെ, so drill it.",
          audioUrl: "/audio/exercises/ex4-3-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab4-3-1",
          german: "mein / meine",
          english: "my",
          malayalam: "എന്റെ",
          pronunciation: "mine / mine-uh",
          example: "Das ist mein Haus.",
          exampleTranslation: "That is my house."
        },
        {
          id: "vocab4-3-2",
          german: "dein / deine",
          english: "your (informal)",
          malayalam: "നിന്റെ",
          pronunciation: "dine / dine-uh",
          example: "Ist das deine Tasche?",
          exampleTranslation: "Is that your bag."
        },
        {
          id: "vocab4-3-3",
          german: "sein / seine",
          english: "his / its",
          malayalam: "അവന്റെ",
          pronunciation: "zine / zine-uh",
          example: "Sein Vater ist Arzt.",
          exampleTranslation: "His father is a doctor."
        },
        {
          id: "vocab4-3-4",
          german: "ihr / ihre",
          english: "her / their",
          malayalam: "അവളുടെ / അവരുടെ",
          pronunciation: "eer / eer-uh",
          example: "Ihre Schwester wohnt in Deutschland.",
          exampleTranslation: "Her sister lives in Germany."
        },
        {
          id: "vocab4-3-5",
          german: "unser / unsere",
          english: "our",
          malayalam: "നമ്മുടെ",
          pronunciation: "oon-zer / oon-zeh-ruh",
          example: "Unsere Familie ist groß.",
          exampleTranslation: "Our family is big."
        },
        {
          id: "vocab4-3-6",
          german: "die Familie",
          english: "the family",
          malayalam: "കുടുംബം",
          pronunciation: "dee fah-mee-lee-uh",
          example: "Meine Familie kommt aus Kerala.",
          exampleTranslation: "My family comes from Kerala."
        },
        {
          id: "vocab4-3-7",
          german: "das Haus",
          english: "the house",
          malayalam: "വീട്",
          pronunciation: "das hows",
          example: "Unser Haus ist in Kochi.",
          exampleTranslation: "Our house is in Kochi."
        },
        {
          id: "vocab4-3-8",
          german: "gehören",
          english: "to belong to",
          malayalam: "ഉടമസ്ഥമായിരിക്കുക",
          pronunciation: "geh-hoer-en",
          example: "Das Buch gehört mir.",
          exampleTranslation: "The book belongs to me."
        }
      ]
    },

    // ─── Lesson 4-4: Articles - der, die, das ───
    {
      id: "4-4",
      title: "Articles - der, die, das",
      titleGerman: "Artikel - der, die, das",
      description: "The most famous challenge in German! Three words for 'the' — and you have to memorise which one goes with which noun. Let's crack the code!",
      duration: "60 min",
      xpReward: 180,
      storyScene: {
        setting: {
          name: "WG Kitchen, The Sticky Note Challenge",
          sceneType: "home",
          timeOfDay: "afternoon",
          description: "The kitchen is covered in colorful Post-its. Stefan has challenge you to label every object with its correct article: der, die, or das. It feels like a high-stakes puzzle game. One wrong article and the logic of the German language collapses (okay, not really, but it feels like it, machane!).",
        },
        narrative: {
          previousRecap: "You've sorted out the possessives in the hallway. Now, it's time to tackle the big one — the three-headed monster of German articles!",
          currentObjective: "Identify grammatical gender and use the correct definite (der/die/das) and indefinite (ein/eine) articles",
          nextTeaser: "Next: the finale! Describe your whole family in a full conversation!",
        },
        kuttanIntro: [
          "Machane! German-ile 'der, die, das' logic illathoru scene aanu. Table masculine aanu, lamp feminine aanu, child neuter aanu. Aiyyo!",
          "But don't panic. Chila shortcuts undu — ending in '-ung' is always feminine (die), ending in '-chen' is always neuter (das).",
          "Nammal nouns articles-oodu koodi thanne padikkanam. Let's start labelling the kitchen and crack this code!",
        ],
        vocabEncounters: [
          { vocabId: "vocab4-4-1", encounterMoment: "Stefan points to the table: 'Der Tisch ist groß.' Blue sticky note for masculine!", contextSentence: "Der Mann trinkt Kaffee." },
          { vocabId: "vocab4-4-2", encounterMoment: "You pick up a lamp: 'Die Lampe ist neu.' Red sticky note for feminine!", contextSentence: "Die Frau liest ein Buch." },
          { vocabId: "vocab4-4-3", encounterMoment: "You look at the window: 'Das Fenster ist sauber.' Green sticky note for neuter!", contextSentence: "Das Kind spielt im Garten." },
          { vocabId: "vocab4-4-5", encounterMoment: "Stefan says: 'Die Wohnung ist schön.' Ending in '-ung', so it's die! Easy rule.", contextSentence: "Die Wohnung ist groß." },
          { vocabId: "vocab4-4-6", encounterMoment: "You see a photo of a girl: 'Das Mädchen'. Even though it means girl, it's das. Logic, machane!", contextSentence: "Das Mädchen ist zehn Jahre alt." },
        ],
        decisionPoints: [
          {
            moment: "You see the word 'Zeitung' (newspaper). Based on the ending, which article do you choose?",
            options: [
              { text: "die Zeitung", isCorrect: true, response: "Exactly! Any word ending in '-ung' is ALWAYS feminine. One less thing to worry about!", kuttanReaction: "Adipoli! '-ung' rule perfect aayi use cheythallo. Ithu pole shortcuts kandaal padikkan nalla sugamaanu! 🔥" },
              { text: "der Zeitung", isCorrect: false, response: "Aiyyo! Did you forget the '-ung' rule? It's the most reliable rule for feminine nouns!", kuttanReaction: "Vite machane! '-ung' ending kandaal 'die' fix cheythoru. Masculine-il athu varilla! Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'a book'. Book is 'das Buch'. Which one is correct?",
            options: [
              { text: "ein Buch", isCorrect: true, response: "Correct! 'das' nouns use 'ein' for the indefinite article.", kuttanReaction: "Superb! 'der' and 'das' randinum 'ein' mathi. 'die'-kku mathram 'eine' venam. Logic clear alle? ⭐" },
              { text: "eine Buch", isCorrect: false, response: "No, 'eine' is only for feminine (die) nouns. Buch is neuter!", kuttanReaction: "Aiyyo! Buch 'das' aanu, so 'ein' mathi. '-e' ending feminine context-il mathram use cheyyaam. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v4-4-1",
          title: "The Hardest Part of German!",
          duration: "14:00",
          description: "Why does German have THREE words for 'the'? Let's understand the system.",
          scriptOutline: [
            "Opening: 'der, die, das — three tiny words, but big complications. Let's settle this!'",
            "Masculine (der) — der Mann (the man), der Tisch (the table)",
            "Feminine (die) — die Frau (the woman), die Lampe (the lamp)",
            "Neuter (das) — das Kind (the child), das Buch (the book)",
            "Plural (die) — ALWAYS 'die' for plural!",
            "Kerala parallel: Malayalam-il articles illaa. So this is 100% new logic for us.",
            "English-il just 'the' — but German-il gender arinjale set aavoo.",
            "The Trap: 'das Mädchen' (the girl) is NEUTER, not feminine! Logic illalle?",
            "Secret: '-chen' suffix always neuter context-inulla result aanu.",
            "ein/eine/ein: 'a/an' also changes with gender — pattern follow cheyyaam!",
            "Strategy: Learn nouns WITH articles. Don't just say 'Bus', say 'der Bus'!"
          ],
          keyVocabulary: ["der", "die", "das", "ein", "eine", "männlich", "weiblich", "sächlich"],
          learningObjectives: [
            "Understand the concept of grammatical gender in German",
            "Know the three definite articles: der, die, das",
            "Know the indefinite articles: ein, eine",
            "Understand why this concept is challenging for Malayalam speakers"
          ],
          placeholderThumbnail: "/images/supermarket_checkout.png",
          richContent: [
            {
              type: "table",
              title: "The Three Genders",
              headers: ["Gender", "Definite (the)", "Indefinite (a/an)", "Example"],
              rows: [
                ["Masculine", "der", "ein", "der Mann (the man)"],
                ["Feminine", "die", "eine", "die Frau (the woman)"],
                ["Neuter", "das", "ein", "das Kind (the child)"],
                ["Plural", "die", "—", "die Kinder (the children)"]
              ]
            },
            {
              type: "note",
              title: "'das Mädchen' is NEUTER?!",
              variant: "warning",
              content: "Yes, 'das Mädchen' (the girl) is neuter, NOT feminine! Why? Because '-chen' is a diminutive suffix, and ALL diminutives (-chen, -lein) are neuter in German. Logic beats biology here!"
            },
            {
              type: "note",
              title: "Golden Rule",
              variant: "tip",
              content: "Always learn a noun WITH its article. Don't just memorize 'Tisch' — memorize 'der Tisch'. Think of the article as part of the word itself. This saves you from guessing later!"
            }
          ]
        },
        {
          id: "v4-4-2",
          title: "Tips to Remember Articles",
          duration: "12:00",
          description: "Handy rules and patterns to guess the right article — it's not all random!",
          scriptOutline: [
            "Opening: 'Good news — there ARE patterns! Let's learn the cheat codes.'",
            "MASCULINE (der) patterns:",
            "Male people: der Mann, der Junge, der Vater",
            "Days, months, seasons: der Montag, der Januar, der Sommer",
            "Words ending in -er (often): der Computer, der Lehrer",
            "Words ending in -ling: der Frühling, der Schmetterling",
            "FEMININE (die) patterns:",
            "Female people: die Frau, die Mutter, die Schwester",
            "Words ending in -ung: die Wohnung, die Zeitung, die Übung (ALWAYS die!)",
            "Words ending in -heit/-keit: die Freiheit, die Möglichkeit",
            "Words ending in -ie: die Energie, die Melodie",
            "Words ending in -tion: die Nation, die Situation",
            "NEUTER (das) patterns:",
            "Words ending in -ment: das Dokument, das Instrument",
            "Words ending in -chen/-lein (diminutives): das Mädchen, das Brötchen",
            "Words ending in -um: das Museum, das Datum",
            "Infinitives used as nouns: das Essen (eating/food), das Lernen (learning)",
            "Memory tip: Colour-code! Write der words in blue, die in red, das in green.",
            "Practice: Guess the article game!"
          ],
          keyVocabulary: ["-ung", "-heit", "-keit", "-ment", "-chen", "-lein"],
          learningObjectives: [
            "Know common patterns for masculine nouns",
            "Know common patterns for feminine nouns",
            "Know common patterns for neuter nouns",
            "Apply pattern recognition to guess articles for new words"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Article Cheat Codes by Ending",
              headers: ["Ending", "Gender", "Examples"],
              rows: [
                ["-er (often)", "der (masc)", "der Computer, der Lehrer"],
                ["-ling", "der (masc)", "der Frühling, der Schmetterling"],
                ["-ung (ALWAYS!)", "die (fem)", "die Wohnung, die Zeitung"],
                ["-heit / -keit", "die (fem)", "die Freiheit, die Möglichkeit"],
                ["-tion", "die (fem)", "die Nation, die Situation"],
                ["-ment", "das (neut)", "das Dokument, das Instrument"],
                ["-chen / -lein", "das (neut)", "das Mädchen, das Brötchen"],
                ["-um", "das (neut)", "das Museum, das Datum"]
              ]
            },
            {
              type: "note",
              title: "The -ung Rule is 100% Reliable!",
              variant: "tip",
              content: "Any word ending in '-ung' is ALWAYS feminine: die Wohnung, die Zeitung, die Übung, die Rechnung. This is the most reliable pattern in German. Memorize it and you will never get these wrong!"
            },
            {
              type: "note",
              title: "Colour-Code Your Vocabulary",
              variant: "tip",
              content: "Write 'der' words in blue, 'die' words in red, and 'das' words in green. Visual association helps your brain remember the gender much faster than plain text."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex4-4-1",
          type: "multiple-choice",
          question: "What article goes with 'Wohnung' (apartment)?",
          options: ["der", "die", "das"],
          correctAnswer: "die",
          explanation: "Words ending in '-ung' are ALWAYS feminine: die Wohnung.",
          xpReward: 20
        },
        {
          id: "ex4-4-2",
          type: "multiple-choice",
          question: "Why is 'das Mädchen' (the girl) neuter and not feminine?",
          options: [
            "It's a German tradition",
            "Because '-chen' (diminutive) is always neuter",
            "Because girls are neither masculine nor feminine",
            "It's an exception with no reason"
          ],
          correctAnswer: "Because '-chen' (diminutive) is always neuter",
          explanation: "The suffix '-chen' makes any word neuter, regardless of meaning. Das Mädchen, das Brötchen, etc.",
          xpReward: 20
        },
        {
          id: "ex4-4-3",
          type: "matching",
          question: "Match nouns to their correct article:",
          options: ["der Mann → masculine", "die Frau → feminine", "das Kind → neuter", "die Kinder → plural"],
          correctAnswer: ["der Mann → masculine", "die Frau → feminine", "das Kind → neuter", "die Kinder → plural"],
          explanation: "der (masc.), die (fem.), das (neuter), die (plural) — four forms of 'the'.",
          xpReward: 20
        },
        {
          id: "ex4-4-4",
          type: "fill-blank",
          question: "_____ Zeitung (the newspaper) — which article?",
          options: ["Die", "Der", "Das", "Ein"],
          correctAnswer: "Die",
          explanation: "'Zeitung' ends in '-ung', which is always feminine: die Zeitung.",
          xpReward: 15
        },
        {
          id: "ex4-4-6",
          type: "multiple-choice",
          question: "What is the indefinite article for 'Buch' (book)?",
          options: ["ein Buch", "eine Buch", "einer Buch"],
          correctAnswer: "ein Buch",
          explanation: "Buch is neuter (das Buch), so the indefinite article is 'ein': ein Buch.",
          xpReward: 20
        },
        {
          id: "ex4-4-7",
          type: "fill-blank",
          question: "'I need a pen': Ich brauche _____ Stift. (der Stift = the pen)",
          options: ["einen", "ein", "eine", "einer"],
          correctAnswer: "einen",
          explanation: "Stift is masculine. In accusative case (after 'brauche'), 'ein' becomes 'einen': einen Stift.",
          xpReward: 15
        },
        {
          id: "ex4-4-9",
          type: "dictation",
          question: "Sticky-note round: a flatmate reads one of the kitchen labels aloud. Listen and type the sentence you hear.",
          correctAnswer: "Die Zeitung ist interessant",
          explanation: "Newspaper = die Zeitung. Did you remember to capitalize 'Zeitung'? All German nouns MUST be capitalized!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-newspaper.mp3"
        },
        {
          id: "ex4-4-10",
          type: "free-text",
          question: "Type the correct article (der/die/das) for 'Mädchen': _____",
          correctAnswer: "das",
          explanation: "Correct! Even though it means girl, the '-chen' ending makes it grammatical neuter (das).",
          xpReward: 15
        },
        {
          id: "ex4-4-11",
          type: "free-text",
          question: "Type the correct article (der/die/das) for 'Wohnung': _____",
          correctAnswer: "die",
          explanation: "Correct! '-ung' endings are always feminine.",
          xpReward: 15
        }
      ,
        {
          id: "ex4-4-prod-speaking",
          type: "speaking",
          question: "Sticky-note challenge, speed round: slap the notes on and say the trio aloud: 'der Tisch, die Lampe, das Bett.'",
          questionGerman: "Sprechen Sie laut: 'der Tisch, die Lampe, das Bett.'",
          correctAnswer: "der Tisch, die Lampe, das Bett",
          explanation: "Articles only stick when they're glued to the noun out loud. This exact trio comes back in your Module 3 checkpoint — bank it now.",
          audioUrl: "/audio/exercises/ex4-4-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex4-4-spk2",
          type: "speaking",
          question: "House-tour German: point at two things in YOUR room and name them with ein/eine — model: 'Das ist eine Lampe und das ist ein Tisch.'",
          questionGerman: "Sprechen Sie laut: 'Das ist eine Lampe und das ist ein Tisch.'",
          correctAnswer: "Das ist eine Lampe und das ist ein Tisch",
          explanation: "ein for der/das nouns, eine for die nouns. Naming real objects in your room every day is the fastest article drill there is.",
          audioUrl: "/audio/exercises/ex4-4-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab4-4-1",
          german: "der (masculine)",
          english: "the (for masculine nouns)",
          malayalam: "ആർട്ടിക്കിൾ (പുല്ലിംഗം)",
          pronunciation: "dehr",
          example: "Der Mann trinkt Kaffee.",
          exampleTranslation: "The man drinks coffee."
        },
        {
          id: "vocab4-4-2",
          german: "die (feminine)",
          english: "the (for feminine nouns)",
          malayalam: "ആർട്ടിക്കിൾ (സ്ത്രീലിംഗം)",
          pronunciation: "dee",
          example: "Die Frau liest ein Buch.",
          exampleTranslation: "The woman reads a book."
        },
        {
          id: "vocab4-4-3",
          german: "das (neuter)",
          english: "the (for neuter nouns)",
          malayalam: "ആർട്ടിക്കിൾ (നപുംസകലിംഗം)",
          pronunciation: "das",
          example: "Das Kind spielt im Garten.",
          exampleTranslation: "The child plays in the garden."
        },
        {
          id: "vocab4-4-4",
          german: "ein / eine",
          english: "a / an",
          malayalam: "ഒരു",
          pronunciation: "eye-n / eye-nuh",
          example: "Ich habe ein Buch und eine Tasche.",
          exampleTranslation: "I have a book and a bag."
        },
        {
          id: "vocab4-4-5",
          german: "die Wohnung",
          english: "the apartment",
          malayalam: "അപ്പാർട്ട്മെന്റ്",
          pronunciation: "dee voh-noong",
          example: "Die Wohnung ist groß.",
          exampleTranslation: "The apartment is big."
        },
        {
          id: "vocab4-4-6",
          german: "das Mädchen",
          english: "the girl",
          malayalam: "പെൺകുട്ടി",
          pronunciation: "das mayt-khen",
          example: "Das Mädchen ist zehn Jahre alt.",
          exampleTranslation: "The girl is ten years old."
        },
        {
          id: "vocab4-4-7",
          german: "der Junge",
          english: "the boy",
          malayalam: "ആൺകുട്ടി",
          pronunciation: "dehr yoong-uh",
          example: "Der Junge spielt Fußball.",
          exampleTranslation: "The boy plays football."
        },
        {
          id: "vocab4-4-8",
          german: "die Zeitung",
          english: "the newspaper",
          malayalam: "പത്രം",
          pronunciation: "dee tsy-toong",
          example: "Mein Vater liest die Zeitung.",
          exampleTranslation: "My father reads the newspaper."
        }
      ]
    },

    // ─── Lesson 4-5: Talking About Your Family ───
    {
      id: "4-5",
      title: "Talking About Your Family",
      titleGerman: "Über deine Familie sprechen",
      description: "Put it ALL together — describe your family using everything you've learned: family words, descriptions, possessives, and articles!",
      duration: "45 min",
      xpReward: 200,
      storyScene: {
        setting: {
          name: "WG Kitchen, Friday Dinner",
          sceneType: "home",
          timeOfDay: "evening",
          description: "Pasta is on the table, and the vibe is relaxed. Stefan and Lara are curious about your life in Kerala. 'Erzähl uns von deiner Familie,' (Tell us about your family), Lara says. This is your moment to bring it all together — names, ages, looks, and jobs. Every family word you've learned is now a tool for connection.",
        },
        narrative: {
          previousRecap: "You've survived the article challenge in the kitchen. Now, it's time for the final project — a complete family introduction!",
          currentObjective: "Combine vocabulary, possessives, and descriptions into a cohesive narrative",
          nextTeaser: "Congratulations! Module 4 complete. Next: I am hungry! Time to learn about food and shopping!",
        },
        kuttanIntro: [
          "Machane! Ithanu final level. Nammude family-ne patti oru full story parayanam. 'Meine Familie ist groß' ennu thudangaam.",
          "Ivide possessives (mein/meine) and adjective endings (groß/nett) correctly use cheyyaan makkalle! Professionals parayumpo article (ein/eine) venam ennorkkane.",
          "Kerala connections and professions — focus on the Golden Formula: Name → Description → Job. Let's make them feel like they're in Kerala with us!",
        ],
        vocabEncounters: [
          { vocabId: "vocab4-1-1", encounterMoment: "You start with your mother: 'Meine Mutter heißt Lakshmi. Sie ist Lehrerin.' Lara nods.", contextSentence: "Meine Mutter ist Lehrerin." },
          { vocabId: "vocab4-1-2", encounterMoment: "Next is your dad: 'Mein Vater ist Ingenieur. Er ist sehr fleißig.' Engineering pride!", contextSentence: "Mein Vater arbeitet in Kochi." },
          { vocabId: "vocab4-5-1", encounterMoment: "You explain where everyone is: 'Meine Eltern kommen aus Kochi.' A beautiful coastal city!", contextSentence: "Ich komme aus Thiruvananthapuram." },
          { vocabId: "vocab4-5-7", encounterMoment: "You mention your uncle: 'Mein Onkel ist auch Ingenieur.' Engineering runs in the family!", contextSentence: "Mein Onkel ist Ingenieur bei Bosch." },
          { vocabId: "vocab4-5-6", encounterMoment: "You conclude: 'Wir leben zusammen in Kerala.' A happy family photo on your phone ends the story.", contextSentence: "Wir leben zusammen in einem Haus." },
        ],
        decisionPoints: [
          {
            moment: "How do you correctly say 'My brother is called Arjun and he is funny'?",
            options: [
              { text: "Mein Bruder heißt Arjun und er ist lustig.", isCorrect: true, response: "Perfect! You used 'heißt' for the name and 'ist' for the description.", kuttanReaction: "Kiraathakam machane! Name and personality logic correct aayi join cheythallo! 🔥" },
              { text: "Meine Bruder ist Arjun und he ist lustig.", isCorrect: false, response: "Aiyyo! 'Bruder' is masculine, so it should be 'mein'. And use 'er', not 'he'!", kuttanReaction: "Vite machane! Possessive and pronoun care venam. 'Mein' (mask) and 'er' (he) aanu correct. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say your mother is a teacher. How do you say 'She is a teacher' properly in German?",
            options: [
              { text: "Sie ist Lehrerin.", isCorrect: true, response: "Correct! In German, we don't use 'a/an' before professions in this context.", kuttanReaction: "Adipoli! 'Ich bin Student', 'Sie ist Lehrerin' — profession-nu article venda. German logic simple alle? ⭐" },
              { text: "Sie ist eine Lehrerin.", isCorrect: false, response: "Technically understandable, but sounds unnatural. Professionals usually drop the article!", kuttanReaction: "Aiyyo! Common mistake! Article kooduthalaanu ivide. 'Sie ist Lehrerin' mathi. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v4-5-1",
          title: "Meine Familie - A Full Family Description",
          duration: "14:00",
          description: "Watch a complete family description and learn to create your own — bringing together all Module 4 skills.",
          scriptOutline: [
            "Opening: 'Let's bring everything together! By the end of this lesson, you can talk about your whole family!'",
            "Model description — listen and follow along:",
            "'Ich komme aus Kerala. Meine Familie ist groß.'",
            "'Mein Vater heißt Rajesh. Er ist groß und freundlich. Er kommt aus Kochi.'",
            "'Meine Mutter heißt Lakshmi. Sie ist nett und intelligent. Sie ist Lehrerin.'",
            "'Ich habe einen Bruder. Mein Bruder heißt Arjun. Er ist jung und lustig.'",
            "'Ich habe eine Schwester. Meine Schwester heißt Priya. Sie hat lange, schwarze Haare.'",
            "'Meine Großmutter — wir sagen Ammoomma — wohnt bei uns. Sie ist alt und weise.'",
            "'Mein Onkel wohnt in Deutschland. Er ist Ingenieur bei Bosch.'",
            "Breaking down the structure: introduction → each person → name → description",
            "Grammar review: possessives match gender (mein Bruder / meine Schwester)",
            "Grammar review: 'ist' for descriptions, 'hat' for possession",
            "Kerala parallel: Like how we introduce family at weddings — 'Ithu ente Achan, Amma, Chechi...'",
            "Your turn: Write and practice YOUR family description!",
            "Challenge: Record yourself describing your family in German"
          ],
          keyVocabulary: ["Ich komme aus", "er/sie heißt", "er/sie ist", "er/sie hat", "wohnt"],
          learningObjectives: [
            "Give a complete family description in German",
            "Combine possessives, descriptions, and family vocabulary",
            "Use proper article and possessive agreement",
            "Speak multiple connected sentences about family"
          ],
          placeholderThumbnail: "/images/kaffeeklatsch.png",
          richContent: [
            {
              type: "table",
              title: "Family Description Building Blocks",
              headers: ["Purpose", "Pattern", "Example"],
              rows: [
                ["Name", "Mein/e ... heißt ...", "Mein Vater heißt Rajesh."],
                ["Origin", "Er/Sie kommt aus ...", "Er kommt aus Kochi."],
                ["Description", "Er/Sie ist ...", "Sie ist nett und intelligent."],
                ["Job", "Er/Sie ist ...", "Er ist Ingenieur."],
                ["Feature", "Er/Sie hat ...", "Sie hat lange, schwarze Haare."],
                ["Home", "Er/Sie wohnt in ...", "Er wohnt in Deutschland."]
              ]
            },
            {
              type: "note",
              title: "Possessives Must Match!",
              variant: "warning",
              content: "Remember: 'mein Bruder' (der Bruder = masculine) but 'meine Schwester' (die Schwester = feminine). The possessive ending must agree with the gender of the family member, not your own gender!"
            },
            {
              type: "note",
              title: "Pro Tip: Structure Your Description",
              variant: "tip",
              content: "Start with a general intro ('Meine Familie ist groß.'), then introduce each person with: name + description + job. This structure works for A1 exams and real conversation!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex4-5-1",
          type: "ordering",
          question: "Arrange these words into a correct sentence: 'heißt / meine / Maria / Mutter'",
          options: ["Meine", "Mutter", "heißt", "Maria"],
          correctAnswer: ["Meine", "Mutter", "heißt", "Maria"],
          explanation: "'Meine Mutter heißt Maria.' = My mother is called Maria.",
          xpReward: 20
        },
        {
          id: "ex4-5-2",
          type: "fill-blank",
          question: "'My father is tall and friendly': Mein Vater ist groß und _____.",
          options: ["freundlich", "freundliche", "freundlicher", "freund"],
          correctAnswer: "freundlich",
          explanation: "Groß (tall) und freundlich (friendly) — adjectives after 'ist' don't need endings!",
          xpReward: 15
        },
        {
          id: "ex4-5-3",
          type: "multiple-choice",
          question: "At the Friday dinner, the flatmates quiz Kuttan. Which sentence correctly says 'I have a sister'?",
          options: [
            "Ich habe ein Schwester.",
            "Ich habe eine Schwester.",
            "Ich habe einer Schwester.",
            "Ich bin eine Schwester."
          ],
          correctAnswer: "Ich habe eine Schwester.",
          explanation: "Schwester is feminine → eine Schwester. 'Ich habe' (I have) + eine (a, feminine).",
          xpReward: 20
        },
        {
          id: "ex4-5-4",
          type: "fill-blank",
          question: "'She lives in Germany': Sie _____ in Deutschland.",
          options: ["wohnt", "wohne", "wohnen", "wohnst"],
          correctAnswer: "wohnt",
          explanation: "'Wohnen' (to live/reside) → 'sie wohnt'. She lives = Sie wohnt.",
          xpReward: 15
        },
        {
          id: "ex4-5-5",
          type: "multiple-choice",
          question: "How would you say 'He comes from Kerala'?",
          options: [
            "Er kommen aus Kerala.",
            "Er kommt von Kerala.",
            "Er kommt aus Kerala.",
            "Er ist aus Kerala kommt."
          ],
          correctAnswer: "Er kommt aus Kerala.",
          explanation: "'Er kommt aus Kerala.' — 'kommen aus' means 'to come from'. 'Er kommt' is the correct conjugation.",
          xpReward: 20
        },
        {
          id: "ex4-5-6",
          type: "ordering",
          question: "Kuttan rehearses his family story before the dinner table goes quiet. Put the sentences in a natural order:",
          options: [
            "Mein Bruder heißt Arjun.",
            "Ich komme aus Kerala.",
            "Er ist zwanzig Jahre alt.",
            "Meine Familie ist groß."
          ],
          correctAnswer: [
            "Ich komme aus Kerala.",
            "Meine Familie ist groß.",
            "Mein Bruder heißt Arjun.",
            "Er ist zwanzig Jahre alt."
          ],
          explanation: "A good family description starts broad (where you're from, family size) then describes individual members.",
          xpReward: 20
        },
        {
          id: "ex4-5-7",
          type: "fill-blank",
          question: "Type in German: 'My mother is a teacher.' (Meine Mutter...)",
          options: ["Meine Mutter ist Lehrerin", "Meine Mutter ist eine Lehrerin", "Meine Mutter bist Lehrerin", "Mein Mutter ist Lehrerin"],
          correctAnswer: "Meine Mutter ist Lehrerin",
          explanation: "'Meine Mutter ist Lehrerin.' — Remember: no article before professions in German!",
          xpReward: 15
        },
        {
          id: "ex4-5-8",
          type: "fill-blank",
          question: "Type in German: 'I have two brothers.' (Ich habe...)",
          options: ["Ich habe zwei Brüder", "Ich habe zwei Bruder", "Ich habe zwei Bruders", "Ich zwei Brüder habe"],
          correctAnswer: "Ich habe zwei Brüder",
          explanation: "'Brüder' is the plural of 'Bruder' — notice the umlaut!",
          xpReward: 15
        },
        {
          id: "ex4-5-9",
          type: "dictation",
          question: "A flatmate mentions where Kuttan's uncle lives. Listen and type the sentence you hear.",
          correctAnswer: "Mein Onkel wohnt in Deutschland",
          explanation: "Uncle = Onkel. Lives = wohnt. Germany = Deutschland. Perfect!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-uncle-germany.mp3"
        },
        {
          id: "ex4-5-10",
          type: "free-text",
          question: "Your turn at the dinner table: write 'My family is big' in German.",
          correctAnswer: "Meine Familie ist groß",
          explanation: "Familie is feminine (die), so 'meine'. Big = groß.",
          xpReward: 25
        },
        {
          id: "ex4-5-11",
          type: "free-text",
          question: "Tell us about your brother: 'My brother is called Arjun and he is young.'",
          correctAnswer: "Mein Bruder heißt Arjun und er ist jung",
          explanation: "Excellent! You combined the name (heißt) and description (ist) perfectly.",
          xpReward: 40
        }
      ,
        {
          id: "ex4-5-prod-speaking",
          type: "speaking",
          question: "Friday dinner spotlight: open your family story — say aloud: 'Meine Familie ist groß. Mein Bruder heißt Arjun.'",
          questionGerman: "Sprechen Sie laut: 'Meine Familie ist groß. Mein Bruder heißt Arjun.'",
          correctAnswer: "Meine Familie ist groß. Mein Bruder heißt Arjun",
          explanation: "Two short sentences beat one tangled long one — that's exactly how to score in Sprechen Teil 1. Swap in your real family next time.",
          audioUrl: "/audio/exercises/ex4-5-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex4-5-spk2",
          type: "speaking",
          question: "Repair Kuttan's dinner-table line: he says 'Ich habe ein Bruder.' Bruder is masculine and 'haben' wants einen! Say it right: 'Ich habe einen Bruder.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe einen Bruder.'",
          correctAnswer: "Ich habe einen Bruder",
          explanation: "After 'Ich habe', masculine nouns flip ein → einen; feminine stays eine (Ich habe eine Schwester). This one ending earns real marks in Sprechen and Schreiben.",
          audioUrl: "/audio/exercises/ex4-5-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab4-5-1",
          german: "kommen aus",
          english: "to come from",
          malayalam: "... ൽ നിന്ന് വരുക",
          pronunciation: "kom-men ows",
          example: "Ich komme aus Thiruvananthapuram.",
          exampleTranslation: "I come from Thiruvananthapuram."
        },
        {
          id: "vocab4-5-2",
          german: "wohnen",
          english: "to live / to reside",
          malayalam: "താമസിക്കുക",
          pronunciation: "voh-nen",
          example: "Wir wohnen in Kochi.",
          exampleTranslation: "We live in Kochi."
        },
        {
          id: "vocab4-5-3",
          german: "heißen",
          english: "to be called / to be named",
          malayalam: "... എന്ന് പേരുള്ള",
          pronunciation: "hy-sen",
          example: "Meine Schwester heißt Priya.",
          exampleTranslation: "My sister is called Priya."
        },
        {
          id: "vocab4-5-4",
          german: "arbeiten",
          english: "to work",
          malayalam: "ജോലി ചെയ്യുക",
          pronunciation: "ar-by-ten",
          example: "Mein Vater arbeitet als Ingenieur.",
          exampleTranslation: "My father works as an engineer."
        },
        {
          id: "vocab4-5-5",
          german: "studieren",
          english: "to study (at university)",
          malayalam: "പഠിക്കുക (സർവ്വകലാശാലയിൽ)",
          pronunciation: "shtoo-dee-ren",
          example: "Mein Bruder studiert in München.",
          exampleTranslation: "My brother studies in Munich."
        },
        {
          id: "vocab4-5-6",
          german: "zusammen",
          english: "together",
          malayalam: "ഒരുമിച്ച്",
          pronunciation: "tsoo-zah-men",
          example: "Wir leben zusammen in einem Haus.",
          exampleTranslation: "We live together in a house."
        },
        {
          id: "vocab4-5-7",
          german: "der Ingenieur",
          english: "the engineer",
          malayalam: "എഞ്ചിനീയർ",
          pronunciation: "dehr in-zheh-nyoer",
          example: "Mein Onkel ist Ingenieur bei Bosch.",
          exampleTranslation: "My uncle is an engineer at Bosch."
        },
        {
          id: "vocab4-5-8",
          german: "die Lehrerin",
          english: "the teacher (female)",
          malayalam: "അധ്യാപിക",
          pronunciation: "dee leh-reh-rin",
          example: "Meine Mutter ist Lehrerin.",
          exampleTranslation: "My mother is a teacher."
        }
      ]
    }
  ]
};
