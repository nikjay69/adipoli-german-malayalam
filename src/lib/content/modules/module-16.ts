import type { Module } from '../types';

export const MODULE_16: Module = {
  id: 16,
  title: "A2.1 Bridge",
  titleGerman: "Nächste Schritte",
  description: "Bridge to A2 — master dative case, two-way prepositions, reflexive verbs, and complex sentences!",
  icon: "🌉",
  color: "#0d9488",
  totalHours: 12,
  unlockRequirement: "Complete Module 15",
  lessons: [
    // ==================== LESSON 16-1 ====================
    {
      id: "16-1",
      title: "Dative Case Deep Dive",
      titleGerman: "Der Dativ — Tiefgang",
      description: "Master the dative case — articles, pronouns, and verbs that demand dative!",
      duration: "60 min",
      xpReward: 180,
      videos: [
        {
          id: "v16-1-1",
          title: "Understanding the Dative Case",
          duration: "12:00",
          description: "A complete breakdown of the dative case — articles, usage, and why it matters",
          scriptOutline: [
            "Opening: 'Nominativ was easy. Akkusativ was okay. Now welcome to DATIV — the case that confuses everyone!'",
            "What is the dative case? The indirect object — 'to whom' or 'for whom'",
            "Article changes: der → dem, die → der, das → dem, die (plural) → den + n on noun",
            "Ein-words: ein → einem, eine → einer",
            "Example: Ich gebe DEM Mann das Buch. (I give the book TO THE man.)",
            "Example: Ich gebe DER Frau das Buch. (I give the book TO THE woman.)",
            "Plural dative: den Kindern, den Männern — add -n to plural noun!",
            "Kerala parallel: Think of it like Malayalam -ന് (give TO someone)",
            "Common mistake: Mixing up der (nominative feminine) and der (dative feminine)",
            "Practice sentences with clear context",
            "Summary chart: Nominativ → Akkusativ → Dativ for all genders"
          ],
          keyVocabulary: ["dem", "der (dative)", "einem", "einer"],
          learningObjectives: [
            "Understand when the dative case is used",
            "Know all dative article forms",
            "Transform nominative articles to dative",
            "Use dative in simple sentences"
          ],
          placeholderThumbnail: "/images/thumbnails/dative-case.jpg"
        },
        {
          id: "v16-1-2",
          title: "Dative Pronouns & Verbs",
          duration: "10:00",
          description: "Learn dative personal pronouns and verbs that always take the dative case",
          scriptOutline: [
            "Opening: 'Some verbs are DATIV lovers — they ALWAYS need dative!'",
            "Dative pronouns: mir (me), dir (you), ihm (him), ihr (her), uns (us), euch (you pl.), ihnen (them), Ihnen (you formal)",
            "helfen + Dativ: Ich helfe DIR. (I help you.) NOT 'Ich helfe dich'!",
            "gefallen + Dativ: Die Stadt gefällt MIR. (I like the city. / The city pleases me.)",
            "gehören + Dativ: Das Buch gehört MIR. (The book belongs to me.)",
            "danken + Dativ: Ich danke DIR. (I thank you.)",
            "folgen + Dativ: Der Hund folgt DEM Kind. (The dog follows the child.)",
            "Common mistake: Using Akkusativ with these verbs (because English uses direct object)",
            "Memory trick: 'Help, please, thank, follow — all need dative, don't be shallow!'",
            "Practice: Fill in the correct dative pronoun"
          ],
          keyVocabulary: ["mir", "dir", "ihm", "ihr", "helfen", "gefallen", "gehören"],
          learningObjectives: [
            "Know all dative personal pronouns",
            "Identify common dative verbs",
            "Use dative pronouns correctly in sentences",
            "Avoid the common mistake of using accusative with dative verbs"
          ],
          placeholderThumbnail: "/images/thumbnails/dative-pronouns.jpg"
        }
      ],
      exercises: [
        {
          id: "ex16-1-1",
          type: "multiple-choice",
          question: "What is the dative form of 'der Mann'?",
          options: ["dem Mann", "den Mann", "der Mann", "des Mannes"],
          correctAnswer: "dem Mann",
          explanation: "In the dative case, 'der' (masculine) becomes 'dem'. So 'der Mann' → 'dem Mann'.",
          xpReward: 10
        },
        {
          id: "ex16-1-2",
          type: "fill-blank",
          question: "Complete: Ich gebe _____ Frau das Geschenk. (I give the gift to the woman.)",
          options: ["der", "die", "dem", "den"],
          correctAnswer: "der",
          explanation: "In the dative case, 'die' (feminine) becomes 'der'. So 'die Frau' → 'der Frau' in dative.",
          xpReward: 10
        },
        {
          id: "ex16-1-3",
          type: "matching",
          question: "Match the nominative article to its dative form:",
          options: ["der (masc.)", "die (fem.)", "das (neut.)", "die (plural)"],
          correctAnswer: ["dem", "der", "dem", "den + n"],
          xpReward: 15
        },
        {
          id: "ex16-1-4",
          type: "multiple-choice",
          question: "Which sentence is correct?",
          options: ["Ich helfe dir.", "Ich helfe dich.", "Ich helfe du.", "Ich helfe den."],
          correctAnswer: "Ich helfe dir.",
          explanation: "'Helfen' always takes the dative case. The dative form of 'du' is 'dir', so 'Ich helfe dir' is correct.",
          xpReward: 10
        },
        {
          id: "ex16-1-5",
          type: "fill-blank",
          question: "Complete: Das Buch gehört _____. (The book belongs to me.)",
          options: ["mir", "mich", "ich", "mein"],
          correctAnswer: "mir",
          explanation: "'Gehören' takes the dative case. The dative form of 'ich' is 'mir'.",
          xpReward: 10
        },
        {
          id: "ex16-1-6",
          type: "multiple-choice",
          question: "Which verb does NOT take the dative case?",
          options: ["sehen (to see)", "helfen (to help)", "gefallen (to please)", "danken (to thank)"],
          correctAnswer: "sehen (to see)",
          explanation: "'Sehen' takes the accusative case (Ich sehe dich). The others — helfen, gefallen, danken — all require dative.",
          xpReward: 10
        },
        {
          id: "ex16-1-7",
          type: "ordering",
          question: "Put the words in the correct order: gefällt / die Stadt / mir",
          options: ["Die Stadt", "gefällt", "mir."],
          correctAnswer: ["Die Stadt", "gefällt", "mir."],
          xpReward: 15
        },
        {
          id: "ex16-1-8",
          type: "fill-blank",
          question: "Complete: Ich gebe _____ Kindern die Schokolade. (I give the chocolate to the children.)",
          options: ["den", "die", "dem", "der"],
          correctAnswer: "den",
          explanation: "In the dative plural, 'die' becomes 'den' and the noun gets an -n ending: 'den Kindern'.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab16-1-1",
          german: "helfen (+ Dativ)",
          english: "to help",
          malayalam: "സഹായിക്കുക",
          pronunciation: "hel-fen",
          example: "Ich helfe dir bei den Hausaufgaben.",
          exampleTranslation: "I help you with the homework."
        },
        {
          id: "vocab16-1-2",
          german: "gefallen (+ Dativ)",
          english: "to please / to like",
          malayalam: "ഇഷ്ടപ്പെടുക",
          pronunciation: "ge-fah-len",
          example: "Die Stadt gefällt mir sehr.",
          exampleTranslation: "I like the city very much. (The city pleases me.)"
        },
        {
          id: "vocab16-1-3",
          german: "gehören (+ Dativ)",
          english: "to belong to",
          malayalam: "സ്വന്തമാവുക",
          pronunciation: "ge-huh-ren",
          example: "Wem gehört dieses Handy?",
          exampleTranslation: "Whose phone is this? (To whom does this phone belong?)"
        },
        {
          id: "vocab16-1-4",
          german: "danken (+ Dativ)",
          english: "to thank",
          malayalam: "നന്ദി പറയുക",
          pronunciation: "dahn-ken",
          example: "Ich danke dir für die Hilfe.",
          exampleTranslation: "I thank you for the help."
        },
        {
          id: "vocab16-1-5",
          german: "folgen (+ Dativ)",
          english: "to follow",
          malayalam: "പിന്തുടരുക",
          pronunciation: "fol-gen",
          example: "Der Hund folgt dem Kind.",
          exampleTranslation: "The dog follows the child."
        },
        {
          id: "vocab16-1-6",
          german: "geben",
          english: "to give",
          malayalam: "കൊടുക്കുക",
          pronunciation: "gey-ben",
          example: "Ich gebe dem Lehrer das Buch.",
          exampleTranslation: "I give the book to the teacher."
        },
        {
          id: "vocab16-1-7",
          german: "zeigen",
          english: "to show",
          malayalam: "കാണിക്കുക",
          pronunciation: "tsay-gen",
          example: "Kannst du mir den Weg zeigen?",
          exampleTranslation: "Can you show me the way?"
        },
        {
          id: "vocab16-1-8",
          german: "schenken",
          english: "to gift / to give as a present",
          malayalam: "സമ്മാനിക്കുക",
          pronunciation: "shen-ken",
          example: "Ich schenke meiner Mutter Blumen.",
          exampleTranslation: "I give my mother flowers (as a gift)."
        }
      ]
    },

    // ==================== LESSON 16-2 ====================
    {
      id: "16-2",
      title: "Two-Way Prepositions",
      titleGerman: "Wechselpräpositionen",
      description: "Master the nine prepositions that switch between accusative and dative — depending on movement vs location!",
      duration: "60 min",
      xpReward: 180,
      videos: [
        {
          id: "v16-2-1",
          title: "Wechselpräpositionen Explained",
          duration: "12:00",
          description: "The nine two-way prepositions and why they change case",
          scriptOutline: [
            "Opening: 'These 9 prepositions are the BOSS BATTLE of German grammar!'",
            "The big rule: MOVEMENT (wohin?) = Akkusativ, LOCATION (wo?) = Dativ",
            "The nine: in, an, auf, über, unter, vor, hinter, neben, zwischen",
            "Memory song/trick to remember all nine",
            "IN: in dem = im, in das = ins",
            "AN: an dem = am, an das = ans",
            "AUF: auf dem Tisch (on the table - location), auf den Tisch (onto the table - movement)",
            "ÜBER: over/above, UNTER: under/below",
            "VOR: in front of, HINTER: behind",
            "NEBEN: next to, ZWISCHEN: between",
            "Visual examples with clear location vs movement contrast",
            "Kerala parallel: Think of it like 'mēšayil irikkunnu' (sitting ON) vs 'mēšayil vekkunnu' (putting ON)"
          ],
          keyVocabulary: ["in", "an", "auf", "über", "unter", "vor", "hinter", "neben", "zwischen"],
          learningObjectives: [
            "Name all nine two-way prepositions",
            "Understand the movement vs location rule",
            "Know the contractions (im, ins, am, ans)",
            "Apply the correct case with each preposition"
          ],
          placeholderThumbnail: "/images/thumbnails/wechselpraepositionen.jpg"
        },
        {
          id: "v16-2-2",
          title: "Wohin vs Wo - Movement vs Location",
          duration: "10:00",
          description: "Practice distinguishing between movement (accusative) and location (dative) with real examples",
          scriptOutline: [
            "Opening: 'Wo bist du? vs Wohin gehst du? — THIS is the key!'",
            "WO? (Where?) = Location = DATIV: 'Ich bin IM Zimmer.' (I am in the room.)",
            "WOHIN? (Where to?) = Movement = AKKUSATIV: 'Ich gehe INS Zimmer.' (I go into the room.)",
            "Detailed examples with IN:",
            "  Dativ: Das Buch liegt auf DEM Tisch. (The book is lying on the table.)",
            "  Akkusativ: Ich lege das Buch auf DEN Tisch. (I put the book on the table.)",
            "liegen (lie/be) vs legen (lay/put) — stehen vs stellen — sitzen vs setzen",
            "These verb pairs are KEY to understanding Wechselpräpositionen",
            "More practice: hinter dem Haus (behind the house) vs hinter das Haus (to behind the house)",
            "Common mistakes and how to avoid them",
            "Practice exercise: Is it movement or location?"
          ],
          keyVocabulary: ["wo", "wohin", "liegen", "legen", "stehen", "stellen"],
          learningObjectives: [
            "Distinguish between wo (location) and wohin (direction) questions",
            "Use dative for location and accusative for movement",
            "Know the verb pairs: liegen/legen, stehen/stellen, sitzen/setzen",
            "Form correct sentences with two-way prepositions"
          ],
          placeholderThumbnail: "/images/thumbnails/wohin-vs-wo.jpg"
        }
      ],
      exercises: [
        {
          id: "ex16-2-1",
          type: "multiple-choice",
          question: "Which case do two-way prepositions take when showing LOCATION (no movement)?",
          options: ["Dativ", "Akkusativ", "Nominativ", "Genitiv"],
          correctAnswer: "Dativ",
          explanation: "When there is no movement (answering 'wo?' — where?), two-way prepositions take the dative case.",
          xpReward: 10
        },
        {
          id: "ex16-2-2",
          type: "fill-blank",
          question: "Complete: Das Buch liegt auf _____ Tisch. (The book is lying on the table.)",
          options: ["dem", "den", "der", "das"],
          correctAnswer: "dem",
          explanation: "The book is lying (location, no movement) → dative. 'Der Tisch' in dative = 'dem Tisch'.",
          xpReward: 10
        },
        {
          id: "ex16-2-3",
          type: "fill-blank",
          question: "Complete: Ich lege das Buch auf _____ Tisch. (I put the book on the table.)",
          options: ["den", "dem", "der", "das"],
          correctAnswer: "den",
          explanation: "Putting the book (movement/direction) → accusative. 'Der Tisch' in accusative = 'den Tisch'.",
          xpReward: 10
        },
        {
          id: "ex16-2-4",
          type: "matching",
          question: "Match the sentence to the correct case used:",
          options: ["Ich bin im Zimmer.", "Ich gehe ins Zimmer.", "Die Katze sitzt auf dem Stuhl.", "Die Katze springt auf den Stuhl."],
          correctAnswer: ["Dativ (location)", "Akkusativ (movement)", "Dativ (location)", "Akkusativ (movement)"],
          xpReward: 15
        },
        {
          id: "ex16-2-5",
          type: "multiple-choice",
          question: "Which are the correct contractions?",
          options: ["in dem = im, in das = ins", "in dem = indem, in das = indas", "in der = ir, in die = ie", "in den = inden, in dem = indem"],
          correctAnswer: "in dem = im, in das = ins",
          explanation: "The standard contractions are: in dem → im, in das → ins, an dem → am, an das → ans.",
          xpReward: 10
        },
        {
          id: "ex16-2-6",
          type: "multiple-choice",
          question: "Which sentence is correct? 'The picture hangs on the wall.'",
          options: ["Das Bild hängt an der Wand.", "Das Bild hängt an die Wand.", "Das Bild hängt an dem Wand.", "Das Bild hängt an den Wand."],
          correctAnswer: "Das Bild hängt an der Wand.",
          explanation: "The picture is hanging (location, no movement) → dative. 'Die Wand' (feminine) in dative = 'der Wand'.",
          xpReward: 10
        },
        {
          id: "ex16-2-7",
          type: "ordering",
          question: "Put the words in the correct order: stelle / den Schrank / ich / neben / den Stuhl",
          options: ["Ich", "stelle", "den Schrank", "neben", "den Stuhl."],
          correctAnswer: ["Ich", "stelle", "den Schrank", "neben", "den Stuhl."],
          xpReward: 15
        },
        {
          id: "ex16-2-8",
          type: "fill-blank",
          question: "Complete: Die Kinder spielen _____ den Bäumen. (The children play between the trees.)",
          options: ["zwischen", "neben", "über", "unter"],
          correctAnswer: "zwischen",
          explanation: "'Zwischen' means 'between.' The children play between the trees (location) → dative: zwischen den Bäumen.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab16-2-1",
          german: "in (+ Akk./Dat.)",
          english: "in / into",
          malayalam: "ഉള്ളില്‍ / ഉള്ളിലേക്ക്",
          pronunciation: "in",
          example: "Ich bin im Haus. / Ich gehe ins Haus.",
          exampleTranslation: "I am in the house. / I go into the house."
        },
        {
          id: "vocab16-2-2",
          german: "auf (+ Akk./Dat.)",
          english: "on / onto",
          malayalam: "മുകളില്‍ / മുകളിലേക്ക്",
          pronunciation: "owf",
          example: "Das Buch liegt auf dem Tisch.",
          exampleTranslation: "The book is lying on the table."
        },
        {
          id: "vocab16-2-3",
          german: "an (+ Akk./Dat.)",
          english: "at / on (vertical surface)",
          malayalam: "ചുമരില്‍ / അരികില്‍",
          pronunciation: "an",
          example: "Das Bild hängt an der Wand.",
          exampleTranslation: "The picture hangs on the wall."
        },
        {
          id: "vocab16-2-4",
          german: "über (+ Akk./Dat.)",
          english: "over / above",
          malayalam: "മുകളില്‍",
          pronunciation: "y-ber",
          example: "Die Lampe hängt über dem Tisch.",
          exampleTranslation: "The lamp hangs over the table."
        },
        {
          id: "vocab16-2-5",
          german: "unter (+ Akk./Dat.)",
          english: "under / below",
          malayalam: "താഴെ / അടിയില്‍",
          pronunciation: "oon-ter",
          example: "Die Katze schläft unter dem Bett.",
          exampleTranslation: "The cat sleeps under the bed."
        },
        {
          id: "vocab16-2-6",
          german: "neben (+ Akk./Dat.)",
          english: "next to / beside",
          malayalam: "അടുത്ത്",
          pronunciation: "ney-ben",
          example: "Das Café ist neben der Bäckerei.",
          exampleTranslation: "The café is next to the bakery."
        },
        {
          id: "vocab16-2-7",
          german: "zwischen (+ Akk./Dat.)",
          english: "between",
          malayalam: "ഇടയില്‍",
          pronunciation: "tsvi-shen",
          example: "Der Park liegt zwischen dem Rathaus und der Kirche.",
          exampleTranslation: "The park is between the town hall and the church."
        },
        {
          id: "vocab16-2-8",
          german: "hinter (+ Akk./Dat.)",
          english: "behind",
          malayalam: "പിന്നില്‍",
          pronunciation: "hin-ter",
          example: "Der Garten ist hinter dem Haus.",
          exampleTranslation: "The garden is behind the house."
        }
      ]
    },

    // ==================== LESSON 16-3 ====================
    {
      id: "16-3",
      title: "Reflexive Verbs",
      titleGerman: "Reflexive Verben",
      description: "Learn verbs where the action reflects back on the subject — sich waschen, sich freuen, and more!",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v16-3-1",
          title: "Reflexive Verbs - sich waschen, sich freuen...",
          duration: "12:00",
          description: "Understanding reflexive verbs and pronouns — when you do something to yourself",
          scriptOutline: [
            "Opening: 'In German, sometimes YOU do something to YOURSELF. That's reflexive!'",
            "What is a reflexive verb? The subject and object are the SAME person",
            "sich waschen — to wash oneself: Ich wasche MICH. (I wash myself.)",
            "sich anziehen — to get dressed: Er zieht SICH an. (He gets himself dressed.)",
            "sich setzen — to sit down: Bitte setzen Sie SICH. (Please sit down.)",
            "sich freuen — to be happy/glad: Ich freue MICH auf den Urlaub! (I'm looking forward to the holiday!)",
            "sich erinnern — to remember: Erinnerst du DICH an Kerala? (Do you remember Kerala?)",
            "sich fühlen — to feel: Wie fühlst du DICH? (How do you feel?)",
            "Reflexive pronouns: mich/mir, dich/dir, sich, uns, euch, sich",
            "Akkusativ reflexive vs Dativ reflexive:",
            "  Akkusativ: Ich wasche MICH. (washing all of me)",
            "  Dativ: Ich wasche MIR die Hände. (washing a specific body part)",
            "Full conjugation table for sich waschen",
            "Kerala parallel: Like saying 'ഞാന്‍ എന്നെത്തന്നെ' — doing something to yourself",
            "Common reflexive verbs list for daily routines"
          ],
          keyVocabulary: ["sich waschen", "sich anziehen", "sich freuen", "sich erinnern", "sich fühlen", "sich setzen"],
          learningObjectives: [
            "Understand what reflexive verbs are",
            "Know all reflexive pronouns (accusative and dative)",
            "Conjugate common reflexive verbs",
            "Distinguish between accusative and dative reflexive pronouns"
          ],
          placeholderThumbnail: "/images/thumbnails/reflexive-verbs.jpg"
        }
      ],
      exercises: [
        {
          id: "ex16-3-1",
          type: "fill-blank",
          question: "Complete: Ich wasche _____ jeden Morgen. (I wash myself every morning.)",
          options: ["mich", "mir", "sich", "dich"],
          correctAnswer: "mich",
          explanation: "With 'sich waschen' (washing your whole self, no specific body part), use the accusative reflexive pronoun: 'mich' for 'ich'.",
          xpReward: 10
        },
        {
          id: "ex16-3-2",
          type: "multiple-choice",
          question: "Which sentence is correct?",
          options: ["Er wäscht sich die Hände.", "Er wäscht mich die Hände.", "Er wäscht ihn die Hände.", "Er wäscht dich die Hände."],
          correctAnswer: "Er wäscht sich die Hände.",
          explanation: "Since 'er' is washing HIS OWN hands, the reflexive pronoun 'sich' is used. The dative is used because a body part (die Hände) is specified.",
          xpReward: 10
        },
        {
          id: "ex16-3-3",
          type: "matching",
          question: "Match the subject to the correct reflexive pronoun (accusative):",
          options: ["ich", "du", "er/sie/es", "wir"],
          correctAnswer: ["mich", "dich", "sich", "uns"],
          xpReward: 15
        },
        {
          id: "ex16-3-4",
          type: "fill-blank",
          question: "Complete: Wir freuen _____ auf die Ferien! (We are looking forward to the holidays!)",
          options: ["uns", "sich", "euch", "mich"],
          correctAnswer: "uns",
          explanation: "The reflexive pronoun for 'wir' is 'uns'. 'Sich freuen auf' means 'to look forward to.'",
          xpReward: 10
        },
        {
          id: "ex16-3-5",
          type: "multiple-choice",
          question: "What does 'Ich erinnere mich an meinen Urlaub' mean?",
          options: ["I remember my vacation.", "I remind my vacation.", "I forget my vacation.", "I plan my vacation."],
          correctAnswer: "I remember my vacation.",
          explanation: "'Sich erinnern an' means 'to remember.' The reflexive pronoun 'mich' shows the remembering is done by the subject about themselves.",
          xpReward: 10
        },
        {
          id: "ex16-3-6",
          type: "fill-blank",
          question: "Complete: Bitte setzen Sie _____! (Please sit down! — formal)",
          options: ["sich", "Sie", "mich", "Ihnen"],
          correctAnswer: "sich",
          explanation: "The reflexive pronoun for 'Sie' (formal) is 'sich'. 'Sich setzen' means 'to sit down.'",
          xpReward: 10
        },
        {
          id: "ex16-3-7",
          type: "ordering",
          question: "Put the words in the correct order: mich / fühle / heute / ich / gut",
          options: ["Ich", "fühle", "mich", "heute", "gut."],
          correctAnswer: ["Ich", "fühle", "mich", "heute", "gut."],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab16-3-1",
          german: "sich waschen",
          english: "to wash oneself",
          malayalam: "കുളിക്കുക / കഴുകുക",
          pronunciation: "zikh vah-shen",
          example: "Ich wasche mich jeden Morgen.",
          exampleTranslation: "I wash myself every morning."
        },
        {
          id: "vocab16-3-2",
          german: "sich anziehen",
          english: "to get dressed",
          malayalam: "വസ്ത്രം ധരിക്കുക",
          pronunciation: "zikh an-tsee-en",
          example: "Er zieht sich schnell an.",
          exampleTranslation: "He gets dressed quickly."
        },
        {
          id: "vocab16-3-3",
          german: "sich setzen",
          english: "to sit down",
          malayalam: "ഇരിക്കുക",
          pronunciation: "zikh zet-sen",
          example: "Bitte setzen Sie sich!",
          exampleTranslation: "Please sit down!"
        },
        {
          id: "vocab16-3-4",
          german: "sich freuen (auf/über)",
          english: "to be happy / to look forward to",
          malayalam: "സന്തോഷിക്കുക",
          pronunciation: "zikh froy-en",
          example: "Ich freue mich auf den Urlaub.",
          exampleTranslation: "I am looking forward to the vacation."
        },
        {
          id: "vocab16-3-5",
          german: "sich erinnern (an)",
          english: "to remember",
          malayalam: "ഓര്‍ക്കുക",
          pronunciation: "zikh er-in-ern",
          example: "Erinnerst du dich an unsere Schulzeit?",
          exampleTranslation: "Do you remember our school days?"
        },
        {
          id: "vocab16-3-6",
          german: "sich fühlen",
          english: "to feel",
          malayalam: "അനുഭവപ്പെടുക",
          pronunciation: "zikh fy-len",
          example: "Ich fühle mich heute großartig!",
          exampleTranslation: "I feel great today!"
        },
        {
          id: "vocab16-3-7",
          german: "sich vorstellen",
          english: "to introduce oneself / to imagine",
          malayalam: "സ്വയം പരിചയപ്പെടുത്തുക",
          pronunciation: "zikh for-shtel-en",
          example: "Darf ich mich vorstellen? Ich bin Arun.",
          exampleTranslation: "May I introduce myself? I am Arun."
        },
        {
          id: "vocab16-3-8",
          german: "sich beeilen",
          english: "to hurry (up)",
          malayalam: "തിരക്കുകൂട്ടുക",
          pronunciation: "zikh be-ay-len",
          example: "Beeil dich! Wir sind spät dran.",
          exampleTranslation: "Hurry up! We're running late."
        }
      ]
    },

    // ==================== LESSON 16-4 ====================
    {
      id: "16-4",
      title: "Subordinate Clauses",
      titleGerman: "Nebensätze",
      description: "Learn to build complex sentences with weil, dass, wenn, and als — where the verb goes to the END!",
      duration: "60 min",
      xpReward: 180,
      videos: [
        {
          id: "v16-4-1",
          title: "weil, dass, wenn — Verb Goes to the End!",
          duration: "12:00",
          description: "Master subordinate clauses — the key to sounding more fluent in German",
          scriptOutline: [
            "Opening: 'Ready for the BIGGEST German grammar rule? In subordinate clauses, the verb goes to the END!'",
            "What is a subordinate clause? A dependent clause that can't stand alone",
            "THE RULE: In a subordinate clause, the conjugated verb moves to the LAST position",
            "WEIL (because):",
            "  Main clause: Ich lerne Deutsch. → Ich lerne Deutsch, WEIL ich in Deutschland leben MÖCHTE.",
            "  The verb 'möchte' moves to the end!",
            "DASS (that):",
            "  Ich denke, DASS Deutsch interessant IST.",
            "  Ich hoffe, DASS du kommst.",
            "WENN (when/if — for present or repeated past):",
            "  WENN es regnet, bleibe ich zu Hause.",
            "  Note: When the subordinate clause comes first, the main clause verb comes right after the comma!",
            "Word order flip when subordinate clause comes first: Wenn..., VERB + subject...",
            "Kerala parallel: In Malayalam, the verb also goes at the end of sentences! So this might feel natural!",
            "Common mistakes and tips"
          ],
          keyVocabulary: ["weil", "dass", "wenn", "der Nebensatz"],
          learningObjectives: [
            "Understand what subordinate clauses are",
            "Use weil, dass, and wenn correctly",
            "Move the verb to the end of subordinate clauses",
            "Handle word order when subordinate clause comes first"
          ],
          placeholderThumbnail: "/images/thumbnails/subordinate-clauses.jpg"
        },
        {
          id: "v16-4-2",
          title: "Connecting Ideas in German",
          duration: "10:00",
          description: "Practice building complex sentences with als, ob, and combining clauses",
          scriptOutline: [
            "Opening: 'Let's add more connectors to your German toolkit!'",
            "ALS (when — for SINGLE events in the PAST):",
            "  Als ich in Kerala WAR, habe ich Fisch gegessen.",
            "  Als ich ein Kind WAR, habe ich viel gespielt.",
            "WENN vs ALS: wenn = present/repeated, als = one-time past event",
            "OB (whether/if — for indirect questions):",
            "  Ich weiß nicht, OB er kommt.",
            "  Weißt du, OB das Restaurant offen ist?",
            "Combining multiple clauses:",
            "  Ich denke, dass er kommt, weil er Hunger hat.",
            "Practice: Convert simple sentences to complex ones",
            "Tip: Start with short subordinate clauses, then build longer ones",
            "Common mistakes: forgetting to move the verb, wrong comma placement",
            "Summary: Your German is now getting COMPLEX — that's A2 level!"
          ],
          keyVocabulary: ["als", "ob", "der Hauptsatz", "der Nebensatz"],
          learningObjectives: [
            "Use 'als' for single past events vs 'wenn' for repeated/present",
            "Form indirect questions with 'ob'",
            "Combine multiple subordinate clauses",
            "Produce A2-level complex sentences"
          ],
          placeholderThumbnail: "/images/thumbnails/connecting-ideas.jpg"
        }
      ],
      exercises: [
        {
          id: "ex16-4-1",
          type: "multiple-choice",
          question: "Where does the conjugated verb go in a subordinate clause?",
          options: ["At the end of the clause", "In second position", "At the beginning", "It doesn't change position"],
          correctAnswer: "At the end of the clause",
          explanation: "In German subordinate clauses (after weil, dass, wenn, als, ob...), the conjugated verb always moves to the end of the clause.",
          xpReward: 10
        },
        {
          id: "ex16-4-2",
          type: "fill-blank",
          question: "Complete: Ich lerne Deutsch, weil ich in Deutschland leben _____. (I learn German because I want to live in Germany.)",
          options: ["möchte", "möchten", "will", "wollen"],
          correctAnswer: "möchte",
          explanation: "In the subordinate clause with 'weil,' the verb 'möchte' goes to the end. 'Möchte' matches 'ich.'",
          xpReward: 10
        },
        {
          id: "ex16-4-3",
          type: "multiple-choice",
          question: "Which sentence uses 'dass' correctly?",
          options: ["Ich denke, dass Deutsch interessant ist.", "Ich denke, dass ist Deutsch interessant.", "Ich denke, Deutsch dass interessant ist.", "Ich denke dass, Deutsch interessant ist."],
          correctAnswer: "Ich denke, dass Deutsch interessant ist.",
          explanation: "After 'dass,' the verb 'ist' moves to the end: 'Ich denke, dass Deutsch interessant IST.'",
          xpReward: 10
        },
        {
          id: "ex16-4-4",
          type: "ordering",
          question: "Build the correct sentence: es / wenn / bleibe / regnet / ich / zu Hause",
          options: ["Wenn", "es", "regnet,", "bleibe", "ich", "zu Hause."],
          correctAnswer: ["Wenn", "es", "regnet,", "bleibe", "ich", "zu Hause."],
          xpReward: 15
        },
        {
          id: "ex16-4-5",
          type: "multiple-choice",
          question: "When do you use 'als' instead of 'wenn'?",
          options: ["For a single event in the past", "For repeated events", "For present situations", "For future plans"],
          correctAnswer: "For a single event in the past",
          explanation: "'Als' is used for one-time events in the past. 'Wenn' is used for present situations, future, or repeated past events.",
          xpReward: 10
        },
        {
          id: "ex16-4-6",
          type: "fill-blank",
          question: "Complete: _____ ich ein Kind war, habe ich in Kerala gewohnt. (When I was a child, I lived in Kerala.)",
          options: ["Als", "Wenn", "Weil", "Dass"],
          correctAnswer: "Als",
          explanation: "Being a child is a one-time period in the past, so we use 'als' (not 'wenn').",
          xpReward: 10
        },
        {
          id: "ex16-4-7",
          type: "multiple-choice",
          question: "What does 'Ich weiß nicht, ob er kommt' mean?",
          options: ["I don't know whether he's coming.", "I don't know because he's coming.", "I don't know that he's coming.", "I know that he's not coming."],
          correctAnswer: "I don't know whether he's coming.",
          explanation: "'Ob' means 'whether/if' and is used for indirect yes/no questions. The verb 'kommt' goes to the end.",
          xpReward: 10
        },
        {
          id: "ex16-4-8",
          type: "ordering",
          question: "Build the sentence: dass / hoffe / bald / ich / du / kommst",
          options: ["Ich", "hoffe,", "dass", "du", "bald", "kommst."],
          correctAnswer: ["Ich", "hoffe,", "dass", "du", "bald", "kommst."],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab16-4-1",
          german: "weil",
          english: "because",
          malayalam: "കാരണം / എന്തെന്നാല്‍",
          pronunciation: "vayl",
          example: "Ich bleibe zu Hause, weil ich krank bin.",
          exampleTranslation: "I stay at home because I am sick."
        },
        {
          id: "vocab16-4-2",
          german: "dass",
          english: "that (conjunction)",
          malayalam: "എന്ന്",
          pronunciation: "dahs",
          example: "Ich denke, dass du Recht hast.",
          exampleTranslation: "I think that you are right."
        },
        {
          id: "vocab16-4-3",
          german: "wenn",
          english: "when / if",
          malayalam: "എപ്പോള്‍ / എങ്കില്‍",
          pronunciation: "ven",
          example: "Wenn du Zeit hast, können wir uns treffen.",
          exampleTranslation: "If you have time, we can meet."
        },
        {
          id: "vocab16-4-4",
          german: "als",
          english: "when (single past event)",
          malayalam: "അപ്പോള്‍ (ഭൂതകാലം)",
          pronunciation: "als",
          example: "Als ich jung war, wollte ich Pilot werden.",
          exampleTranslation: "When I was young, I wanted to become a pilot."
        },
        {
          id: "vocab16-4-5",
          german: "ob",
          english: "whether / if (indirect question)",
          malayalam: "ഓ എന്ന് (പരോക്ഷ ചോദ്യം)",
          pronunciation: "op",
          example: "Ich frage mich, ob es morgen regnet.",
          exampleTranslation: "I wonder whether it will rain tomorrow."
        },
        {
          id: "vocab16-4-6",
          german: "der Nebensatz",
          english: "subordinate clause",
          malayalam: "ഉപവാക്യം",
          pronunciation: "ney-ben-zats",
          example: "Im Nebensatz steht das Verb am Ende.",
          exampleTranslation: "In a subordinate clause, the verb is at the end."
        }
      ]
    },

    // ==================== LESSON 16-5 ====================
    {
      id: "16-5",
      title: "Reading Comprehension Practice",
      titleGerman: "Leseverstehen",
      description: "Practice reading real German texts — emails, ads, blogs — and build your reading confidence for A2!",
      duration: "60 min",
      xpReward: 200,
      videos: [
        {
          id: "v16-5-1",
          title: "Reading German Texts - Strategies & Practice",
          duration: "15:00",
          description: "Learn effective strategies for reading German texts and practice with real-world examples",
          scriptOutline: [
            "Opening: 'You've learned grammar and vocab. Now let's READ real German!'",
            "Strategy 1: SCANNING — don't read every word, look for key information first",
            "Strategy 2: Guess from CONTEXT — you don't need to know every word",
            "Strategy 3: Identify KEY WORDS — nouns, verbs, and question words",
            "Strategy 4: Look for COGNATES — words similar to English (Telefon, Computer, Musik)",
            "Practice Text 1: An EMAIL from a colleague",
            "  'Lieber Arun, kannst du morgen um 10 Uhr ins Büro kommen? Wir haben ein Meeting...'",
            "  Exercise: Answer questions about the email",
            "Practice Text 2: An ADVERTISEMENT for an apartment",
            "  '2-Zimmer-Wohnung, 60qm, Küche, Bad, Balkon, 650€ warm, ab sofort...'",
            "  Exercise: Find specific information (price, size, when available)",
            "Practice Text 3: A short NEWS SNIPPET about weather",
            "Practice Text 4: A BLOG POST about life in Germany",
            "  'Ich bin vor zwei Jahren aus Kerala nach Berlin gezogen...'",
            "Tips: Read German news apps, children's books, social media posts",
            "Closing: 'Congratulations! You're now ready for A2! Adipoli!'"
          ],
          keyVocabulary: ["der Text", "verstehen", "der Absatz", "die Bedeutung", "der Zusammenhang", "lesen"],
          learningObjectives: [
            "Apply scanning and skimming strategies to German texts",
            "Guess word meanings from context",
            "Extract specific information from emails and advertisements",
            "Build confidence reading authentic German materials"
          ],
          placeholderThumbnail: "/images/thumbnails/reading-comprehension.jpg"
        }
      ],
      exercises: [
        {
          id: "ex16-5-1",
          type: "multiple-choice",
          question: "Read: 'Lieber Arun, kannst du morgen um 10 Uhr ins Büro kommen? Wir haben ein wichtiges Meeting. LG, Thomas.' — When should Arun come to the office?",
          options: ["Tomorrow at 10:00", "Today at 10:00", "Tomorrow at 12:00", "Next week at 10:00"],
          correctAnswer: "Tomorrow at 10:00",
          explanation: "'Morgen um 10 Uhr' means 'tomorrow at 10 o'clock.' Key words: morgen (tomorrow), 10 Uhr (10 o'clock).",
          xpReward: 15
        },
        {
          id: "ex16-5-2",
          type: "multiple-choice",
          question: "Read: '2-Zimmer-Wohnung, 60qm, Küche, Bad, Balkon, 650€ warm, ab sofort, Nähe Hauptbahnhof.' — How much is the rent?",
          options: ["650€ including utilities", "650€ without utilities", "60€ per month", "2€ per square meter"],
          correctAnswer: "650€ including utilities",
          explanation: "'650€ warm' means 650 euros 'warm rent' — which includes basic utilities (heating, water). 'Kalt' would mean without utilities.",
          xpReward: 15
        },
        {
          id: "ex16-5-3",
          type: "multiple-choice",
          question: "Read: 'Morgen wird es in ganz Deutschland regnen. Die Temperaturen liegen zwischen 8 und 12 Grad.' — What will the weather be like tomorrow?",
          options: ["Rainy, 8-12 degrees", "Sunny, 8-12 degrees", "Snowy, below 0 degrees", "Cloudy, 18-22 degrees"],
          correctAnswer: "Rainy, 8-12 degrees",
          explanation: "'Regnen' means 'to rain,' and 'zwischen 8 und 12 Grad' means 'between 8 and 12 degrees.'",
          xpReward: 15
        },
        {
          id: "ex16-5-4",
          type: "fill-blank",
          question: "Read: 'Das Restaurant ist montags bis freitags von 11 bis 22 Uhr geöffnet. Am Wochenende von 10 bis 23 Uhr.' — The restaurant is _____ on weekdays.",
          options: ["open from 11 to 22", "closed", "open from 10 to 23", "open 24 hours"],
          correctAnswer: "open from 11 to 22",
          explanation: "'Montags bis freitags von 11 bis 22 Uhr geöffnet' means open Monday to Friday from 11:00 to 22:00.",
          xpReward: 10
        },
        {
          id: "ex16-5-5",
          type: "multiple-choice",
          question: "What does 'ab sofort' mean in an apartment listing?",
          options: ["Available immediately", "From September", "Only on weekdays", "After renovation"],
          correctAnswer: "Available immediately",
          explanation: "'Ab sofort' means 'from now' or 'immediately available.' You'll see this often in apartment and job listings.",
          xpReward: 10
        },
        {
          id: "ex16-5-6",
          type: "matching",
          question: "Match the reading strategy to its description:",
          options: ["Scanning", "Context guessing", "Cognate recognition", "Key word identification"],
          correctAnswer: ["Looking for specific information quickly", "Figuring out word meaning from surrounding text", "Finding words similar to English", "Focusing on nouns, verbs, and question words"],
          xpReward: 15
        },
        {
          id: "ex16-5-7",
          type: "multiple-choice",
          question: "Read: 'Ich bin vor zwei Jahren aus Kerala nach Berlin gezogen. Am Anfang war alles schwer, aber jetzt gefällt mir das Leben hier.' — How long has the person lived in Berlin?",
          options: ["Two years", "One year", "Three months", "Five years"],
          correctAnswer: "Two years",
          explanation: "'Vor zwei Jahren' means 'two years ago.' The person moved from Kerala to Berlin two years ago.",
          xpReward: 15
        },
        {
          id: "ex16-5-8",
          type: "multiple-choice",
          question: "Which German word is a cognate (similar to English)?",
          options: ["Telefon (telephone)", "Straße (street)", "Mädchen (girl)", "Schmetterling (butterfly)"],
          correctAnswer: "Telefon (telephone)",
          explanation: "Cognates are words that look and sound similar across languages. 'Telefon' is very close to 'telephone,' making it easy to guess!",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab16-5-1",
          german: "der Text",
          english: "text",
          malayalam: "വാചകം",
          pronunciation: "tekst",
          example: "Lesen Sie den Text und beantworten Sie die Fragen.",
          exampleTranslation: "Read the text and answer the questions."
        },
        {
          id: "vocab16-5-2",
          german: "verstehen",
          english: "to understand",
          malayalam: "മനസ്സിലാക്കുക",
          pronunciation: "fer-shtey-en",
          example: "Ich verstehe den Text gut.",
          exampleTranslation: "I understand the text well."
        },
        {
          id: "vocab16-5-3",
          german: "der Absatz",
          english: "paragraph",
          malayalam: "ഖണ്ഡിക",
          pronunciation: "ap-zats",
          example: "Lesen Sie den ersten Absatz.",
          exampleTranslation: "Read the first paragraph."
        },
        {
          id: "vocab16-5-4",
          german: "die Bedeutung",
          english: "meaning",
          malayalam: "അര്‍ഥം",
          pronunciation: "be-doy-toong",
          example: "Was ist die Bedeutung dieses Wortes?",
          exampleTranslation: "What is the meaning of this word?"
        },
        {
          id: "vocab16-5-5",
          german: "der Zusammenhang",
          english: "context / connection",
          malayalam: "സന്ദര്‍ഭം",
          pronunciation: "tsoo-zah-men-hang",
          example: "Man kann die Bedeutung aus dem Zusammenhang erraten.",
          exampleTranslation: "You can guess the meaning from the context."
        },
        {
          id: "vocab16-5-6",
          german: "lesen",
          english: "to read",
          malayalam: "വായിക്കുക",
          pronunciation: "ley-zen",
          example: "Ich lese gern deutsche Bücher.",
          exampleTranslation: "I like to read German books."
        }
      ]
    }
  ]
};
