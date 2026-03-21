import type { Module } from '../types';

export const MODULE_15: Module = {
  id: 15,
  title: "German Culture & Integration",
  titleGerman: "Kultur",
  description: "Understand German culture, customs, festivals, and how they compare to Kerala life!",
  icon: "🇩🇪",
  color: "#ea580c",
  totalHours: 8,
  unlockRequirement: "Complete Module 14",
  lessons: [
    // ==================== LESSON 15-1 ====================
    {
      id: "15-1",
      title: "German Customs",
      titleGerman: "Deutsche Bräuche",
      description: "Discover the unwritten rules of living in Germany — from punctuality to trash sorting!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-1-1",
          title: "Pünktlichkeit & Other German Values",
          duration: "10:00",
          description: "Learn why being on time is sacred in Germany and other core cultural values",
          scriptOutline: [
            "Opening: 'In Kerala, IST = Indian Stretchable Time. In Germany, 10:00 means 9:55!'",
            "Pünktlichkeit (punctuality) — the #1 German value",
            "Ordnung muss sein — everything must have order",
            "Mülltrennung — trash sorting explained: Restmüll, Biomüll, Papier, Plastik, Glas",
            "Why Germans sort trash: environment is a big deal here",
            "Ruhezeit — quiet hours: 22:00-06:00 strictly enforced",
            "Sunday is sacred: no drilling, no lawn mowing, shops closed!",
            "Kerala parallel: We have flexible time, Germans absolutely do NOT",
            "Pro tip: If invited for 19:00 dinner, arrive at 19:00 — not 19:30 or 18:45!"
          ],
          keyVocabulary: ["die Pünktlichkeit", "die Mülltrennung", "die Ruhezeit", "die Ordnung"],
          learningObjectives: [
            "Understand the importance of punctuality in German culture",
            "Know the basics of waste sorting in Germany",
            "Be aware of quiet hours and Sunday rules",
            "Recognize key cultural differences from Kerala"
          ],
          placeholderThumbnail: "/images/thumbnails/german-customs.jpg"
        },
        {
          id: "v15-1-2",
          title: "Rules You Need to Know",
          duration: "10:00",
          description: "Essential everyday rules for living in Germany that nobody tells you before you arrive",
          scriptOutline: [
            "Anmeldung — registering your address (mandatory within 2 weeks!)",
            "Versicherung — you MUST have health insurance in Germany",
            "Rundfunkbeitrag — the TV/radio tax everyone must pay (yes, even if you only watch Netflix)",
            "Pfand — deposit on bottles, return them to get money back",
            "Bargeld — Germans love cash! Not everywhere accepts cards",
            "Jaywalking — don't cross on red, even if no cars! People WILL judge you",
            "Recycling culture: Pfandflaschen, Gelber Sack, Altglas containers",
            "Kerala comparison: In Kerala we have jugaad, in Germany we have Vorschriften (regulations)!",
            "Summary: Respect the rules and you'll fit right in"
          ],
          keyVocabulary: ["die Anmeldung", "die Versicherung", "das Pfand", "das Bargeld"],
          learningObjectives: [
            "Know about mandatory registration (Anmeldung)",
            "Understand the health insurance requirement",
            "Learn about the bottle deposit (Pfand) system",
            "Be prepared for cash-heavy culture"
          ],
          placeholderThumbnail: "/images/thumbnails/german-rules.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-1-1",
          type: "multiple-choice",
          question: "You're invited to dinner at a German friend's house at 19:00. When should you arrive?",
          options: ["At exactly 19:00", "Around 19:30 (fashionably late)", "At 18:30 (early to help)", "Anytime between 19:00 and 20:00"],
          correctAnswer: "At exactly 19:00",
          explanation: "Pünktlichkeit! In Germany, if the invitation says 19:00, you arrive at 19:00. Being late is rude, and arriving too early can also be awkward.",
          xpReward: 10
        },
        {
          id: "ex15-1-2",
          type: "matching",
          question: "Match the trash type to the correct bin:",
          options: ["Banana peel", "Old newspaper", "Broken glass", "Plastic wrapper"],
          correctAnswer: ["Biomüll", "Papier", "Glas", "Gelber Sack / Plastik"],
          xpReward: 15
        },
        {
          id: "ex15-1-3",
          type: "multiple-choice",
          question: "What is 'Ruhezeit' in Germany?",
          options: ["Quiet hours (22:00-06:00 and Sundays)", "Lunch break at work", "School holidays", "A type of German bread"],
          correctAnswer: "Quiet hours (22:00-06:00 and Sundays)",
          explanation: "Ruhezeit means quiet hours. From 22:00 to 06:00 and on Sundays, loud noise (drilling, loud music, lawn mowing) is not allowed.",
          xpReward: 10
        },
        {
          id: "ex15-1-4",
          type: "fill-blank",
          question: "Complete: Die _____ ist in Deutschland sehr wichtig. (Punctuality is very important in Germany.)",
          options: ["Pünktlichkeit", "Freundlichkeit", "Gemütlichkeit", "Sauberkeit"],
          correctAnswer: "Pünktlichkeit",
          explanation: "Pünktlichkeit (punctuality) is considered one of the most important values in German culture.",
          xpReward: 10
        },
        {
          id: "ex15-1-5",
          type: "multiple-choice",
          question: "What happens on Sundays in Germany?",
          options: ["Most shops are closed", "Everything is open as usual", "Only restaurants close", "People work overtime"],
          correctAnswer: "Most shops are closed",
          explanation: "Sonntagsruhe! In Germany, most shops are closed on Sundays. This is very different from Kerala where shops are open every day.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab15-1-1",
          german: "die Pünktlichkeit",
          english: "punctuality",
          malayalam: "കൃത്യനിഷ്ഠ",
          pronunciation: "pynkt-likh-kite",
          example: "Pünktlichkeit ist in Deutschland sehr wichtig.",
          exampleTranslation: "Punctuality is very important in Germany."
        },
        {
          id: "vocab15-1-2",
          german: "die Mülltrennung",
          english: "waste sorting / recycling",
          malayalam: "മാലിന്യ വേര്‍തിരിക്കല്‍",
          pronunciation: "myll-tren-noong",
          example: "Die Mülltrennung ist in Deutschland Pflicht.",
          exampleTranslation: "Waste sorting is mandatory in Germany."
        },
        {
          id: "vocab15-1-3",
          german: "die Ruhezeit",
          english: "quiet hours",
          malayalam: "വിശ്രമ സമയം",
          pronunciation: "roo-he-tsayt",
          example: "Während der Ruhezeit darf man keinen Lärm machen.",
          exampleTranslation: "During quiet hours, you are not allowed to make noise."
        },
        {
          id: "vocab15-1-4",
          german: "die Ordnung",
          english: "order / tidiness",
          malayalam: "ക്രമം",
          pronunciation: "ort-noong",
          example: "Ordnung muss sein!",
          exampleTranslation: "There must be order!"
        },
        {
          id: "vocab15-1-5",
          german: "die Anmeldung",
          english: "registration",
          malayalam: "രജിസ്ട്രേഷന്‍",
          pronunciation: "an-mel-doong",
          example: "Die Anmeldung ist nach dem Umzug Pflicht.",
          exampleTranslation: "Registration is mandatory after moving."
        },
        {
          id: "vocab15-1-6",
          german: "das Pfand",
          english: "deposit (on bottles)",
          malayalam: "കുപ്പി നിക്ഷേപം",
          pronunciation: "pfant",
          example: "Die Flasche hat 25 Cent Pfand.",
          exampleTranslation: "The bottle has a 25 cent deposit."
        },
        {
          id: "vocab15-1-7",
          german: "das Bargeld",
          english: "cash",
          malayalam: "പണം (കൈയിലുള്ള)",
          pronunciation: "bar-gelt",
          example: "Viele Deutsche bezahlen mit Bargeld.",
          exampleTranslation: "Many Germans pay with cash."
        },
        {
          id: "vocab15-1-8",
          german: "die Versicherung",
          english: "insurance",
          malayalam: "ഇന്‍ഷുറന്‍സ്",
          pronunciation: "fer-zikh-er-oong",
          example: "In Deutschland braucht man eine Krankenversicherung.",
          exampleTranslation: "In Germany you need health insurance."
        }
      ]
    },

    // ==================== LESSON 15-2 ====================
    {
      id: "15-2",
      title: "Festivals & Holidays",
      titleGerman: "Feste und Feiertage",
      description: "Explore German festivals from Oktoberfest to Weihnachtsmarkt — and see how they compare to Kerala celebrations!",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-2-1",
          title: "German Festivals",
          duration: "10:00",
          description: "Discover the major festivals celebrated across Germany",
          scriptOutline: [
            "Opening: 'Kerala has Onam, Vishu, Christmas. Germany has its own amazing festivals!'",
            "Oktoberfest — world's biggest folk festival in Munich (September-October)",
            "Fun fact: Oktoberfest is actually mostly in September!",
            "Karneval / Fasching — German carnival season (before Lent)",
            "Costumes, parades, and 'Helau!' or 'Alaaf!' depending on the region",
            "Weihnachten (Christmas) — the BIG one in Germany",
            "Weihnachtsmarkt — magical Christmas markets with Glühwein and Lebkuchen",
            "Adventskranz — the Advent wreath, lighting candles each Sunday before Christmas",
            "Kerala parallel: Onam vs Oktoberfest — BOTH are harvest festivals! Pookalam vs Lederhosen!",
            "Kerala parallel: Christmas in Kerala vs Christmas in Germany — both celebrate big, different style!"
          ],
          keyVocabulary: ["Oktoberfest", "Weihnachten", "der Karneval", "der Weihnachtsmarkt"],
          learningObjectives: [
            "Know the major German festivals and when they occur",
            "Understand the cultural significance of Weihnachten",
            "Draw parallels between German and Kerala festivals",
            "Use festival-related vocabulary"
          ],
          placeholderThumbnail: "/images/thumbnails/german-festivals.jpg"
        },
        {
          id: "v15-2-2",
          title: "Public Holidays in Germany",
          duration: "10:00",
          description: "Learn about German public holidays and how they vary by state",
          scriptOutline: [
            "Opening: 'Germany has public holidays — but here's the twist: each state has different ones!'",
            "National holidays everyone gets: Tag der Deutschen Einheit (Oct 3), Neujahr (Jan 1)",
            "Ostern (Easter) — Good Friday and Easter Monday are holidays",
            "Christi Himmelfahrt — also Vatertag (Father's Day), men go on hikes with beer wagons!",
            "Silvester (New Year's Eve) — fireworks EVERYWHERE at midnight",
            "Regional holidays: Heilige Drei Könige (Jan 6) only in some states",
            "Bayern (Bavaria) has the MOST holidays — lucky them!",
            "Brückentag — 'bridge day' between holiday and weekend, everyone takes off",
            "Kerala parallel: We have Onam, Vishu, and SO many state holidays too!",
            "Pro tip: Check your Bundesland's holidays when planning trips"
          ],
          keyVocabulary: ["der Feiertag", "Ostern", "Silvester", "Neujahr"],
          learningObjectives: [
            "Know the main German public holidays",
            "Understand that holidays vary by state",
            "Learn the concept of Brückentag",
            "Relate German holidays to familiar Kerala holidays"
          ],
          placeholderThumbnail: "/images/thumbnails/german-holidays.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-2-1",
          type: "multiple-choice",
          question: "What is the German word for Christmas?",
          options: ["Weihnachten", "Silvester", "Ostern", "Karneval"],
          correctAnswer: "Weihnachten",
          explanation: "Weihnachten is Christmas in German. It comes from 'geweihte Nächte' (holy nights).",
          xpReward: 10
        },
        {
          id: "ex15-2-2",
          type: "matching",
          question: "Match the German festival to its description:",
          options: ["Oktoberfest", "Karneval", "Silvester", "Ostern"],
          correctAnswer: ["Folk festival with beer in Munich", "Costume parades before Lent", "New Year's Eve fireworks", "Easter celebrations in spring"],
          xpReward: 15
        },
        {
          id: "ex15-2-3",
          type: "multiple-choice",
          question: "Which Kerala festival is most similar to Oktoberfest?",
          options: ["Onam (both are harvest festivals)", "Vishu", "Thrissur Pooram", "Christmas"],
          correctAnswer: "Onam (both are harvest festivals)",
          explanation: "Both Onam and Oktoberfest have roots as harvest celebrations, even though they look very different today!",
          xpReward: 10
        },
        {
          id: "ex15-2-4",
          type: "fill-blank",
          question: "Complete: Der _____ ist ein heißes Getränk auf dem Weihnachtsmarkt. (_____ is a hot drink at the Christmas market.)",
          options: ["Glühwein", "Kaffee", "Apfelsaft", "Bier"],
          correctAnswer: "Glühwein",
          explanation: "Glühwein (mulled wine) is the iconic hot drink at German Christmas markets.",
          xpReward: 10
        },
        {
          id: "ex15-2-5",
          type: "multiple-choice",
          question: "What is a 'Brückentag'?",
          options: ["A day off between a holiday and the weekend", "A special bridge in Germany", "A type of bread", "A festival in June"],
          correctAnswer: "A day off between a holiday and the weekend",
          explanation: "Brückentag (bridge day) is when a holiday falls on a Thursday or Tuesday, and people take the Friday or Monday off to create a long weekend.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab15-2-1",
          german: "Weihnachten",
          english: "Christmas",
          malayalam: "ക്രിസ്മസ്",
          pronunciation: "vay-nakh-ten",
          example: "Wir feiern Weihnachten am 25. Dezember.",
          exampleTranslation: "We celebrate Christmas on December 25th."
        },
        {
          id: "vocab15-2-2",
          german: "Ostern",
          english: "Easter",
          malayalam: "ഈസ്റ്റര്‍",
          pronunciation: "oh-stern",
          example: "An Ostern suchen Kinder Ostereier.",
          exampleTranslation: "At Easter, children search for Easter eggs."
        },
        {
          id: "vocab15-2-3",
          german: "der Weihnachtsmarkt",
          english: "Christmas market",
          malayalam: "ക്രിസ്മസ് ചന്ത",
          pronunciation: "vay-nakhts-markt",
          example: "Der Weihnachtsmarkt in Nürnberg ist sehr berühmt.",
          exampleTranslation: "The Christmas market in Nuremberg is very famous."
        },
        {
          id: "vocab15-2-4",
          german: "der Glühwein",
          english: "mulled wine",
          malayalam: "ചൂടാക്കിയ വൈന്‍",
          pronunciation: "gly-vine",
          example: "Möchtest du einen Glühwein?",
          exampleTranslation: "Would you like a mulled wine?"
        },
        {
          id: "vocab15-2-5",
          german: "der Adventskranz",
          english: "Advent wreath",
          malayalam: "അഡ്വന്റ് മാല",
          pronunciation: "ad-vents-krants",
          example: "Wir zünden die erste Kerze am Adventskranz an.",
          exampleTranslation: "We light the first candle on the Advent wreath."
        },
        {
          id: "vocab15-2-6",
          german: "der Feiertag",
          english: "public holiday",
          malayalam: "പൊതു അവധി",
          pronunciation: "fay-er-tahk",
          example: "Morgen ist ein Feiertag.",
          exampleTranslation: "Tomorrow is a public holiday."
        },
        {
          id: "vocab15-2-7",
          german: "Silvester",
          english: "New Year's Eve",
          malayalam: "പുതുവര്‍ഷ രാവ്",
          pronunciation: "zil-ves-ter",
          example: "An Silvester gibt es ein großes Feuerwerk.",
          exampleTranslation: "On New Year's Eve there are big fireworks."
        },
        {
          id: "vocab15-2-8",
          german: "das Fest",
          english: "festival / celebration",
          malayalam: "ഉത്സവം",
          pronunciation: "fest",
          example: "Oktoberfest ist das größte Fest in München.",
          exampleTranslation: "Oktoberfest is the biggest festival in Munich."
        }
      ]
    },

    // ==================== LESSON 15-3 ====================
    {
      id: "15-3",
      title: "Differences from Kerala Culture",
      titleGerman: "Kulturelle Unterschiede",
      description: "A fun, honest look at what surprises Malayalis most about life in Germany — from cold dinners to personal space!",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v15-3-1",
          title: "Kerala vs Germany - Cultural Differences (with humor!)",
          duration: "12:00",
          description: "A fun comparison of everyday cultural differences between Kerala and Germany",
          scriptOutline: [
            "Opening: 'Okay, let's talk about what will SHOCK you in Germany!'",
            "FOOD: Brot (bread) for breakfast — not idli-dosa! Germans eat bread for breakfast AND dinner",
            "Abendbrot (evening bread) — cold dinner is totally normal. No hot rice and curry!",
            "Socializing: Germans need personal space. Don't stand too close!",
            "Invitations: You NEED an invite to visit. Don't just 'drop by' like in Kerala!",
            "'In Kerala, everyone is family. In Germany, even family needs an appointment!'",
            "SHOES OFF indoors — same as Kerala actually! One thing in common!",
            "Directness: If a German says 'That's not good,' they mean exactly that. Not rude, just direct.",
            "Small talk: Germans don't do as much chit-chat as Malayalis",
            "Privacy: Don't ask salary, age, or personal questions to people you just met",
            "die Gastfreundschaft — German hospitality exists but it's different. They won't force-feed you like ammachi!",
            "Weather obsession: Germans LOVE talking about das Wetter",
            "The good: Respect for rules, efficient systems, work-life balance",
            "Closing: 'Different isn't bad — just different! Adapt and enjoy both cultures!'"
          ],
          keyVocabulary: ["die Gastfreundschaft", "das Abendbrot", "die Einladung", "die Direktheit"],
          learningObjectives: [
            "Understand key cultural differences between Kerala and Germany",
            "Know about German food habits and social norms",
            "Prepare mentally for common culture shocks",
            "Appreciate both cultures' unique qualities"
          ],
          placeholderThumbnail: "/images/thumbnails/kerala-vs-germany.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-3-1",
          type: "multiple-choice",
          question: "What is 'Abendbrot' in Germany?",
          options: ["A cold dinner, usually with bread", "A type of evening prayer", "A special cake eaten at night", "The evening news program"],
          correctAnswer: "A cold dinner, usually with bread",
          explanation: "Abendbrot literally means 'evening bread.' Many Germans eat a cold dinner with bread, cheese, and cold cuts — quite different from our hot Kerala dinner!",
          xpReward: 10
        },
        {
          id: "ex15-3-2",
          type: "multiple-choice",
          question: "What should you do before visiting a German friend's home?",
          options: ["Get an invitation or call ahead", "Just drop by anytime", "Bring your whole family unannounced", "Wait outside until they notice you"],
          correctAnswer: "Get an invitation or call ahead",
          explanation: "Unlike in Kerala where dropping by is common, Germans expect you to plan visits in advance. Always call or get an invitation first!",
          xpReward: 10
        },
        {
          id: "ex15-3-3",
          type: "fill-blank",
          question: "Complete: Deutsche _____ ist anders als in Kerala — sie bieten Essen an, aber zwingen nicht! (German _____ is different from Kerala.)",
          options: ["Gastfreundschaft", "Freundschaft", "Partnerschaft", "Nachbarschaft"],
          correctAnswer: "Gastfreundschaft",
          explanation: "Gastfreundschaft (hospitality) exists in Germany, but it's less insistent than Kerala-style hospitality where guests are practically force-fed!",
          xpReward: 10
        },
        {
          id: "ex15-3-4",
          type: "matching",
          question: "Match the cultural behavior to the correct country:",
          options: ["Cold dinner with bread is normal", "Dropping by friends' houses unannounced", "Very direct communication", "Flexible with time"],
          correctAnswer: ["Germany", "Kerala", "Germany", "Kerala"],
          xpReward: 15
        },
        {
          id: "ex15-3-5",
          type: "multiple-choice",
          question: "Which cultural habit is actually SIMILAR in both Kerala and Germany?",
          options: ["Taking shoes off indoors", "Eating bread for breakfast", "Being very punctual", "Cold dinner"],
          correctAnswer: "Taking shoes off indoors",
          explanation: "Both in Kerala and Germany, people take their shoes off when entering a home! That's one thing you won't need to adjust to.",
          xpReward: 10
        }
      ],
      vocabulary: [
        {
          id: "vocab15-3-1",
          german: "die Gastfreundschaft",
          english: "hospitality",
          malayalam: "അതിഥി സല്‍ക്കാരം",
          pronunciation: "gast-froynt-shaft",
          example: "Deutsche Gastfreundschaft ist herzlich, aber anders als in Indien.",
          exampleTranslation: "German hospitality is warm, but different from India."
        },
        {
          id: "vocab15-3-2",
          german: "das Abendbrot",
          english: "evening meal (cold dinner)",
          malayalam: "രാത്രി ഭക്ഷണം (തണുത്തത്)",
          pronunciation: "ah-bent-broht",
          example: "Zum Abendbrot essen wir Brot mit Käse.",
          exampleTranslation: "For dinner we eat bread with cheese."
        },
        {
          id: "vocab15-3-3",
          german: "die Einladung",
          english: "invitation",
          malayalam: "ക്ഷണം",
          pronunciation: "ayn-lah-doong",
          example: "Hast du eine Einladung zur Party?",
          exampleTranslation: "Do you have an invitation to the party?"
        },
        {
          id: "vocab15-3-4",
          german: "die Direktheit",
          english: "directness",
          malayalam: "നേരിട്ടുള്ള സമീപനം",
          pronunciation: "di-rekt-hyte",
          example: "Die deutsche Direktheit ist nicht unhöflich.",
          exampleTranslation: "German directness is not impolite."
        },
        {
          id: "vocab15-3-5",
          german: "der Unterschied",
          english: "difference",
          malayalam: "വ്യത്യാസം",
          pronunciation: "oon-ter-sheet",
          example: "Es gibt viele Unterschiede zwischen Kerala und Deutschland.",
          exampleTranslation: "There are many differences between Kerala and Germany."
        },
        {
          id: "vocab15-3-6",
          german: "die Privatsphäre",
          english: "privacy",
          malayalam: "സ്വകാര്യത",
          pronunciation: "pri-vaht-sfeh-re",
          example: "Deutsche schätzen ihre Privatsphäre.",
          exampleTranslation: "Germans value their privacy."
        }
      ]
    },

    // ==================== LESSON 15-4 ====================
    {
      id: "15-4",
      title: "Useful Slang & Colloquial German",
      titleGerman: "Umgangssprache",
      description: "Learn everyday German slang and abbreviations that textbooks never teach you!",
      duration: "45 min",
      xpReward: 150,
      videos: [
        {
          id: "v15-4-1",
          title: "Umgangssprache - Everyday German Slang",
          duration: "12:00",
          description: "The slang, abbreviations, and colloquial expressions real Germans use every day",
          scriptOutline: [
            "Opening: 'Textbook German is great, but here's what REAL Germans say!'",
            "Cool — yes, Germans use 'cool' too! (borrowed from English)",
            "Geil — means 'awesome/cool' in slang (careful: it has other meanings!)",
            "Krass — 'crazy/extreme/wow' — can be positive or negative",
            "Alter! — 'Dude!' — used like machane in Malayalam!",
            "Na? — shortest German greeting, means 'Hey, what's up?'",
            "Bescheid sagen — 'let me know' — VERY commonly used",
            "Kein Bock — 'I don't feel like it' (informal)",
            "Keine Ahnung — 'No idea' — you'll hear this ALL the time",
            "Text abbreviations: LG (Liebe Grüße), MfG (Mit freundlichen Grüßen), vllt (vielleicht)",
            "Formal vs colloquial register: When to use what",
            "WhatsApp German vs Email German vs Business German",
            "Kerala parallel: Like how we switch between formal Malayalam and Manglish!",
            "Warning: Don't use slang in formal situations, job interviews, or with professors!"
          ],
          keyVocabulary: ["geil", "krass", "Alter", "Na?", "Bescheid sagen", "Kein Bock"],
          learningObjectives: [
            "Understand common German slang expressions",
            "Know when slang is appropriate vs inappropriate",
            "Recognize common German text abbreviations",
            "Distinguish between formal and colloquial registers"
          ],
          placeholderThumbnail: "/images/thumbnails/german-slang.jpg"
        }
      ],
      exercises: [
        {
          id: "ex15-4-1",
          type: "multiple-choice",
          question: "What does 'Kein Bock' mean in colloquial German?",
          options: ["I don't feel like it", "No goat", "No book", "No money"],
          correctAnswer: "I don't feel like it",
          explanation: "Kein Bock is informal slang meaning 'I don't feel like it' or 'I can't be bothered.' Don't use it in formal situations!",
          xpReward: 10
        },
        {
          id: "ex15-4-2",
          type: "matching",
          question: "Match the slang to its meaning:",
          options: ["Krass!", "Na?", "Alter!", "Keine Ahnung"],
          correctAnswer: ["Crazy / Wow!", "Hey, what's up?", "Dude!", "No idea"],
          xpReward: 15
        },
        {
          id: "ex15-4-3",
          type: "multiple-choice",
          question: "What does 'LG' stand for in a German text message?",
          options: ["Liebe Grüße (kind regards)", "Lustige Geschichte (funny story)", "Letzte Grenze (last border)", "Langsames Gehen (slow walking)"],
          correctAnswer: "Liebe Grüße (kind regards)",
          explanation: "LG = Liebe Grüße (kind regards/love). It's the most common sign-off in informal German texts and messages.",
          xpReward: 10
        },
        {
          id: "ex15-4-4",
          type: "fill-blank",
          question: "Complete: Kannst du mir _____ sagen? (Can you let me know?)",
          options: ["Bescheid", "Kein Bock", "Krass", "Geil"],
          correctAnswer: "Bescheid",
          explanation: "'Bescheid sagen' means 'to let someone know.' It's an extremely common phrase in everyday German.",
          xpReward: 10
        },
        {
          id: "ex15-4-5",
          type: "multiple-choice",
          question: "In which situation should you NOT use slang like 'geil' or 'Alter'?",
          options: ["In a job interview", "Chatting with friends", "Texting your buddy", "At a party with peers"],
          correctAnswer: "In a job interview",
          explanation: "Slang is for informal situations only! Never use words like 'geil' or 'Alter' in job interviews, with professors, or in formal emails.",
          xpReward: 10
        },
        {
          id: "ex15-4-6",
          type: "matching",
          question: "Match the abbreviation to the full form:",
          options: ["MfG", "vllt", "LG"],
          correctAnswer: ["Mit freundlichen Grüßen", "vielleicht", "Liebe Grüße"],
          xpReward: 15
        }
      ],
      vocabulary: [
        {
          id: "vocab15-4-1",
          german: "geil",
          english: "awesome / cool (slang)",
          malayalam: "കിടിലന്‍ (slang)",
          pronunciation: "gayl",
          example: "Das Konzert war echt geil!",
          exampleTranslation: "The concert was really awesome!"
        },
        {
          id: "vocab15-4-2",
          german: "krass",
          english: "crazy / extreme / wow",
          malayalam: "കടുപ്പം / ഭയങ്കരം",
          pronunciation: "krahs",
          example: "Krass! Das habe ich nicht erwartet!",
          exampleTranslation: "Wow! I didn't expect that!"
        },
        {
          id: "vocab15-4-3",
          german: "Alter!",
          english: "Dude! (slang)",
          malayalam: "മച്ചാനേ!",
          pronunciation: "al-ter",
          example: "Alter, das war knapp!",
          exampleTranslation: "Dude, that was close!"
        },
        {
          id: "vocab15-4-4",
          german: "Na?",
          english: "Hey / What's up?",
          malayalam: "എന്താ?",
          pronunciation: "nah",
          example: "Na? Alles klar?",
          exampleTranslation: "Hey? Everything okay?"
        },
        {
          id: "vocab15-4-5",
          german: "Bescheid sagen",
          english: "to let someone know",
          malayalam: "അറിയിക്കുക",
          pronunciation: "be-shyte zah-gen",
          example: "Sag mir bitte Bescheid, wenn du kommst.",
          exampleTranslation: "Please let me know when you're coming."
        },
        {
          id: "vocab15-4-6",
          german: "Kein Bock",
          english: "don't feel like it (slang)",
          malayalam: "മൂഡ് ഇല്ല (slang)",
          pronunciation: "kyne bok",
          example: "Ich habe keinen Bock auf Hausaufgaben.",
          exampleTranslation: "I don't feel like doing homework."
        },
        {
          id: "vocab15-4-7",
          german: "Keine Ahnung",
          english: "no idea",
          malayalam: "ഒരു പിടിയും ഇല്ല",
          pronunciation: "ky-ne ah-noong",
          example: "Wo ist der Schlüssel? — Keine Ahnung!",
          exampleTranslation: "Where is the key? — No idea!"
        },
        {
          id: "vocab15-4-8",
          german: "die Umgangssprache",
          english: "colloquial language / slang",
          malayalam: "സംസാര ഭാഷ",
          pronunciation: "oom-gangs-shprah-khe",
          example: "In der Umgangssprache sagt man 'cool' statt 'toll'.",
          exampleTranslation: "In colloquial language, people say 'cool' instead of 'toll'."
        }
      ]
    }
  ]
};
