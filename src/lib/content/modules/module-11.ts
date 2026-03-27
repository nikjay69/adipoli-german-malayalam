import type { Module } from '../types';

export const MODULE_11: Module = {
  id: 11,
  title: "Work & Study",
  titleGerman: "Arbeit und Studium",
  description: "Master work and study vocabulary — emails, office life, skills, and job interview basics for Malayalis heading to Germany!",
  icon: "💼",
  color: "#0891b2",
  totalHours: 10,
  unlockRequirement: "Complete Module 10",
  learningTips: [
    "Write a mock German email every week. Start with 'Sehr geehrte Damen und Herren,' — muscle memory for formal writing.",
    "German work culture values punctuality and directness. Learn 'pünktlich' (punctual) — it's a compliment!",
    "Practice your self-introduction for interviews: Name, Herkunft, Beruf, Sprachen — in that order.",
  ],
  lessons: [
    // ─── Lesson 11-1: Professions in Detail ───────────────────────────
    {
      id: "11-1",
      title: "Professions in Detail",
      titleGerman: "Berufe im Detail",
      description: "Learn detailed profession names in German with masculine and feminine forms — plus how to ask someone what they do. Nursing, IT, engineering — nammude Malayali favorites ellam und!",
      duration: "50 min",
      xpReward: 140,
      videos: [
        {
          id: "v11-1-1",
          title: "Berufe - Professions in German",
          duration: "12:00",
          description: "A comprehensive guide to German profession names with gender forms and cultural context for Malayalis",
          scriptOutline: [
            "Opening: 'Was sind Sie von Beruf? — Let's learn to talk about jobs in German! Germany-yil job nokkunna Malayalikalku ithu must-learn aanu!'",
            "Why gender matters in professions: masculine (-er) and feminine (-in) endings",
            "der Ingenieur / die Ingenieurin — Engineer (Malayali engineers rock German auto industry!)",
            "der Programmierer / die Programmiererin — Programmer (IT sector-il nammude aalukal everywhere!)",
            "der Krankenpfleger / die Krankenschwester — Nurse (Germany's biggest Malayali workforce — 30,000+ nurses!)",
            "der Lehrer / die Lehrerin — Teacher",
            "der Arzt / die Ärztin — Doctor (many Malayali doctors doing Approbation in Germany)",
            "der Anwalt / die Anwältin — Lawyer",
            "der Wissenschaftler / die Wissenschaftlerin — Scientist",
            "der Unternehmer / die Unternehmerin — Entrepreneur",
            "der Buchhalter / die Buchhalterin — Accountant (nammude commerce students!)",
            "der Koch / die Köchin — Cook/Chef (Kerala restaurants in Berlin!)",
            "Informal question: 'Was machst du beruflich?' — What do you do for a living?",
            "Cultural tip: In Germany, your Beruf is part of your identity — people love talking about it!"
          ],
          keyVocabulary: ["der Beruf", "Was sind Sie von Beruf?", "Ingenieur", "Programmiererin", "Krankenschwester", "Ärztin"],
          learningObjectives: [
            "Name at least 10 professions in German with correct articles",
            "Form both masculine and feminine versions of professions",
            "Ask and answer 'What is your profession?' formally and informally"
          ],
          placeholderThumbnail: "/images/thumbnails/professions.jpg"
        },
        {
          id: "v11-1-2",
          title: "Talking About Your Career Path",
          duration: "10:00",
          description: "Describe your career, studies, and professional background in German — essential for Malayalis starting a new life in Germany",
          scriptOutline: [
            "Opening: 'Career path-ne kurichu German-il parayaan padikkaam — essential for networking and interviews!'",
            "Ich arbeite als... — I work as a...: 'Ich arbeite als Krankenschwester.'",
            "Ich studiere... — I study...: 'Ich studiere Informatik.'",
            "Ich habe ... studiert — I studied...: 'Ich habe Medizin studiert.'",
            "Ich mache eine Ausbildung als... — I'm doing vocational training as... (very common path for Malayalis!)",
            "die Ausbildung vs. das Studium — Vocational training vs. university (key German distinction!)",
            "Example: 'Ich komme aus Kerala und mache eine Ausbildung als Pflegefachmann.'",
            "die Anerkennung — recognition of foreign qualifications (critical for nurses and doctors from India!)",
            "Talking about where you work: 'Ich arbeite bei Siemens / im Krankenhaus / an der Universität'",
            "Practice: Introduce your professional background in 3-4 sentences",
            "Tip: 'Ich bin gelernte/r ...' = I am a trained ... — shows your qualification!"
          ],
          keyVocabulary: ["arbeiten als", "studieren", "die Ausbildung", "die Anerkennung", "arbeiten bei"],
          learningObjectives: [
            "Describe your career path and studies in German",
            "Distinguish between Ausbildung and Studium",
            "Talk about where and what you work"
          ],
          placeholderThumbnail: "/images/thumbnails/career-path.jpg"
        }
      ],
      exercises: [
        {
          id: "ex11-1-1",
          type: "multiple-choice",
          question: "How do you formally ask someone their profession in German?",
          options: ["Was sind Sie von Beruf?", "Was machst du?", "Wer bist du?", "Wie heißen Sie?"],
          correctAnswer: "Was sind Sie von Beruf?",
          explanation: "'Was sind Sie von Beruf?' is the formal standard. Use this for anybody you don't know well. For friends, use 'Was machst du beruflich?'.",
          xpReward: 10
        },
        {
          id: "ex11-1-2",
          type: "matching",
          question: "Match the masculine profession to its feminine form:",
          options: ["der Arzt", "der Lehrer", "der Anwalt", "der Koch"],
          correctAnswer: ["die Ärztin", "die Lehrerin", "die Anwältin", "die Köchin"],
          explanation: "In German, adding '-in' makes the feminine form. Note the Umlaut change in Arzt -> Ärztin and Koch -> Köchin. Grammar follows gender here!",
          xpReward: 15
        },
        {
          id: "ex11-1-3",
          type: "fill-blank",
          question: "Complete: Meine Mutter ist _____ von Beruf. (She is a doctor.)",
          options: ["Ärztin", "Arzt", "Arztin", "Doktor"],
          correctAnswer: "Ärztin",
          explanation: "In German, you don't say 'eine Ärztin' (a doctor) like in English. You just say the profession title directly. And since it's 'Mutter', we use the feminine 'Ärztin'.",
          xpReward: 10
        },
        {
          id: "ex11-1-4",
          type: "multiple-choice",
          question: "What is the German word for 'nurse' (female)?",
          options: ["die Krankenschwester", "die Krankenpflegerin", "die Nurserin", "die Ärztin"],
          correctAnswer: "die Krankenschwester",
          explanation: "Krankenschwester (Sick-sister) is the historical name. In modern hospital settings, 'Pflegefachfrau' is the official title, but 'Krankenschwester' is still used 99% of the time by patients.",
          xpReward: 10
        },
        {
          id: "ex11-1-5",
          type: "ordering",
          question: "Put this sentence in the correct word order: 'I am an engineer by profession.'",
          options: ["von Beruf", "Ich", "Ingenieur", "bin"],
          correctAnswer: ["Ich", "bin", "Ingenieur", "von Beruf"],
          explanation: "Simple Subject-Verb-Complement structure. 'Von Beruf' always tags along at the end to specify that we're talking about work.",
          xpReward: 15
        },
        {
          id: "ex11-1-6",
          type: "fill-blank",
          question: "Complete: Ich _____ als Programmiererin bei Siemens. (I work as a programmer at Siemens.)",
          options: ["arbeite", "mache", "bin", "studiere"],
          correctAnswer: "arbeite",
          explanation: "The formula is: [arbeiten] + [als] + [profession] + [bei] + [company]. Memorize this 'Als/Bei' combo!",
          xpReward: 10
        },
        {
          id: "ex11-1-7",
          type: "multiple-choice",
          question: "Many Malayalis do an 'Ausbildung' in Germany. What is it?",
          options: ["Vocational training", "University degree", "Language course", "Internship"],
          correctAnswer: "Vocational training",
          explanation: "Unlike in India, a vocational 'Ausbildung' is highly respected in Germany. You get paid while you learn! It's the #1 path for Kerala nurses arriving in Germany.",
          xpReward: 10
        },
        {
          id: "ex11-1-8",
          type: "matching",
          question: "Match the German sentence to its meaning:",
          options: ["Ich studiere Informatik.", "Ich mache eine Ausbildung.", "Ich arbeite im Krankenhaus."],
          correctAnswer: ["I study computer science.", "I am doing vocational training.", "I work in the hospital."],
          explanation: "Distinguishing between these 3 states (Student, Trainee, Worker) is essential for your residence permit paperwork too!",
          xpReward: 15
        },
        {
          id: "ex11-1-9",
          type: "dictation",
          question: "Listen and type: Ich arbeite als Krankenschwester.",
          correctAnswer: "Ich arbeite als Krankenschwester",
          explanation: "Great job! A very important sentence for thousands of Malayalis in Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-work-nurse.mp3"
        },
        {
          id: "ex11-1-10",
          type: "free-text",
          question: "Write in German: 'What is your profession?' (formal)",
          correctAnswer: "Was sind Sie von Beruf",
          explanation: "Wunderbar! 'Was sind Sie von Beruf?' is the polite way to ask about someone's job.",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab11-1-1", german: "der Beruf", english: "profession", malayalam: "തൊഴിൽ", pronunciation: "beh-roof", example: "Was sind Sie von Beruf?", exampleTranslation: "What is your profession?" },
        { id: "vocab11-1-2", german: "der Ingenieur / die Ingenieurin", english: "engineer", malayalam: "എഞ്ചിനീയർ", pronunciation: "in-zheh-nyur / in-zheh-nyur-in", example: "Mein Vater ist Ingenieur.", exampleTranslation: "My father is an engineer." },
        { id: "vocab11-1-3", german: "der Programmierer / die Programmiererin", english: "programmer", malayalam: "പ്രോഗ്രാമർ", pronunciation: "pro-gra-meer-er / pro-gra-meer-er-in", example: "Sie arbeitet als Programmiererin bei SAP.", exampleTranslation: "She works as a programmer at SAP." },
        { id: "vocab11-1-4", german: "die Krankenschwester / der Krankenpfleger", english: "nurse", malayalam: "നഴ്‌സ്", pronunciation: "kran-ken-shves-ter / kran-ken-pfley-ger", example: "Viele Malayalis arbeiten als Krankenschwester in Deutschland.", exampleTranslation: "Many Malayalis work as nurses in Germany." },
        { id: "vocab11-1-5", german: "der Lehrer / die Lehrerin", english: "teacher", malayalam: "അധ്യാപകൻ / അധ്യാപിക", pronunciation: "ley-rer / ley-rer-in", example: "Die Lehrerin erklärt die Grammatik.", exampleTranslation: "The teacher explains the grammar." },
        { id: "vocab11-1-6", german: "der Arzt / die Ärztin", english: "doctor", malayalam: "ഡോക്ടർ", pronunciation: "artst / erts-tin", example: "Der Arzt untersucht den Patienten.", exampleTranslation: "The doctor examines the patient." },
        { id: "vocab11-1-7", german: "der Anwalt / die Anwältin", english: "lawyer", malayalam: "അഭിഭാഷകൻ / അഭിഭാഷക", pronunciation: "an-valt / an-vel-tin", example: "Mein Bruder ist Anwalt.", exampleTranslation: "My brother is a lawyer." },
        { id: "vocab11-1-8", german: "die Ausbildung", english: "vocational training", malayalam: "തൊഴിൽ പരിശീലനം", pronunciation: "ows-bil-doong", example: "Ich mache eine Ausbildung als Pflegefachmann.", exampleTranslation: "I am doing vocational training as a nursing specialist." },
        { id: "vocab11-1-9", german: "der Koch / die Köchin", english: "cook / chef", malayalam: "പാചകക്കാരൻ / പാചകക്കാരി", pronunciation: "kokh / kur-khin", example: "Der Koch bereitet das Essen vor.", exampleTranslation: "The chef prepares the food." },
        { id: "vocab11-1-10", german: "die Anerkennung", english: "recognition (of qualifications)", malayalam: "അംഗീകാരം", pronunciation: "an-er-ken-noong", example: "Die Anerkennung meines Diploms dauert drei Monate.", exampleTranslation: "The recognition of my diploma takes three months." }
      ]
    },

    // ─── Lesson 11-2: At the Office / University ─────────────────────
    {
      id: "11-2",
      title: "At the Office / University",
      titleGerman: "Im Büro und an der Universität",
      description: "Learn essential vocabulary for your workplace and university life in Germany. Office culture ingane aanu, Uni life ithu pole!",
      duration: "50 min",
      xpReward: 140,
      videos: [
        {
          id: "v11-2-1",
          title: "Im Büro - Office Vocabulary",
          duration: "12:00",
          description: "Navigate your German office with confidence — essential vocabulary, phrases, and cultural insights",
          scriptOutline: [
            "Opening: 'Whether you're heading to a Büro or a Uni in Germany, you need these words! Office-il first day-kku ready aakaam machane!'",
            "Office basics: das Büro, der Schreibtisch (writing-table), der Computer, der Bildschirm (screen).",
            "The Power Hierarchy: der Kollege (colleague), der Chef (boss). Note: Your boss is your 'Chef', but they aren't cooking biryani—it's just the word for leader!",
            "Useful phrases: 'Ich habe eine Besprechung um 10 Uhr' — I have a meeting at 10.",
            "The Phone Ritual: 'Guten Tag, hier spricht...' — Hello, this is... speaking. Never just say 'Hello'!",
            "German work culture: Pünktlichkeit (punctuality) is not a tip, it's a LAW! 5 minutes early = on time. On time = already late!",
            "Mittagspause — lunch break: Germans shut down everything. Don't disturb a German during their Schnittchen (sandwich) time!",
            "Feierabend — The sacred end of work day: Once you hear 'Schönen Feierabend!', work stops. No more WhatsApp messages from the boss!",
            "Kerala vs. Germany: No 11 AM chai break, but the Kaffeepause is sacred.",
            "Duzen vs. Siezen: Always start with 'Sie' unless your boss explicitly says 'Du'. Don't jump the gun!",
            "Small talk: 'Wie war Ihr Wochenende?' — The Friday/Monday standard question."
          ],
          keyVocabulary: ["das Büro", "die Besprechung", "der Kollege", "der Chef", "Pünktlichkeit", "Feierabend"],
          learningObjectives: [
            "Name common office objects and roles in German",
            "Use basic workplace phrases for meetings, calls, and emails",
            "Understand key German work culture concepts"
          ],
          placeholderThumbnail: "/images/thumbnails/office-vocabulary.jpg"
        },
        {
          id: "v11-2-2",
          title: "An der Uni - University Life",
          duration: "10:00",
          description: "Everything you need for campus life — lectures, exams, library, and the Mensa!",
          scriptOutline: [
            "Opening: 'Germany-yil padikkaan pokkunna Malayalikalku — Uni life guide!'",
            "University basics: die Vorlesung (lecture), das Seminar, die Prüfung (exam), die Hausarbeit (term paper)",
            "Campus spaces: die Bibliothek, die Mensa, der Hörsaal (lecture hall), das Studentenwohnheim (dorm)",
            "Registration: sich einschreiben / die Immatrikulation — enrolling at a German university",
            "Useful phrases: 'Wann beginnt die Vorlesung?' — When does the lecture start?",
            "'Ich muss für die Prüfung lernen.' — I have to study for the exam.",
            "'Ich gehe in die Mensa.' — I'm going to the cafeteria.",
            "The Semesterticket — free public transport for students! Adipoli deal!",
            "Study groups: die Lerngruppe — very common and helpful in German unis",
            "Kerala connection: Unlike India's strict attendance, many German lectures are optional — but don't skip!",
            "Tip: German professors expect you to be independent — no spoon-feeding like back home!"
          ],
          keyVocabulary: ["die Vorlesung", "die Prüfung", "die Mensa", "der Hörsaal", "sich einschreiben"],
          learningObjectives: [
            "Describe university spaces and activities in German",
            "Use essential phrases for student life",
            "Understand differences between Indian and German university culture"
          ],
          placeholderThumbnail: "/images/thumbnails/university-life.jpg"
        }
      ],
      exercises: [
        {
          id: "ex11-2-1",
          type: "matching",
          question: "Match the German word to its English meaning:",
          options: ["die Besprechung", "der Drucker", "die Mensa", "der Hörsaal"],
          correctAnswer: ["meeting", "printer", "cafeteria", "lecture hall"],
          explanation: "Mastering these locations is the first step to navigating a German campus or office building.",
          xpReward: 15
        },
        {
          id: "ex11-2-2",
          type: "multiple-choice",
          question: "Where do German university students typically eat lunch on campus?",
          options: ["die Mensa", "das Büro", "die Bibliothek", "der Hörsaal"],
          correctAnswer: "die Mensa",
          explanation: "Die Mensa is the heart of German uni life! It's cheap, fast, and where all the social plans are made. Most Mensas even offer vegan options long before it was trendy!",
          xpReward: 10
        },
        {
          id: "ex11-2-3",
          type: "fill-blank",
          question: "Complete: Ich habe eine _____ um 14 Uhr. (I have a meeting at 2 PM.)",
          options: ["Besprechung", "Vorlesung", "Prüfung", "Bibliothek"],
          correctAnswer: "Besprechung",
          explanation: "Besprechung = meeting. German meetings are very structured. Agendas are meant to be followed!",
          xpReward: 10
        },
        {
          id: "ex11-2-4",
          type: "multiple-choice",
          question: "What does 'Feierabend' mean in German work culture?",
          options: ["End of the work day / quitting time", "Holiday party", "Friday evening", "Overtime"],
          correctAnswer: "End of the work day / quitting time",
          explanation: "It's a sacred German concept. It means work is DONE. Your computer is off, and you're officially a private person again. Malayalis used to long hours back home find this refreshing!",
          xpReward: 10
        },
        {
          id: "ex11-2-5",
          type: "ordering",
          question: "Put this sentence in the correct order: 'The exam is next week.'",
          options: ["nächste Woche", "Die", "ist", "Prüfung"],
          correctAnswer: ["Die", "Prüfung", "ist", "nächste Woche"],
          explanation: "Simple Subject (Die Prüfung) + Verb (ist) + Time (nächste Woche).",
          xpReward: 15
        },
        {
          id: "ex11-2-6",
          type: "multiple-choice",
          question: "Your colleague in Germany is called 'der Kollege'. What is the feminine form?",
          options: ["die Kollegin", "die Kollegin", "die Kollegerin", "die Kollegatin"],
          correctAnswer: "die Kollegin",
          explanation: "The masculine -e often drops to make room for the feminine -in. der Kollege -> die Kollegin.",
          xpReward: 10
        },
        {
          id: "ex11-2-7",
          type: "fill-blank",
          question: "Complete: Die Vorlesung _____ zwei Stunden. (The lecture lasts two hours.)",
          options: ["dauert", "macht", "hat", "geht"],
          correctAnswer: "dauert",
          explanation: "'Dauern' is specifically for duration. 'How long does the movie/lecture/flight last?' = Wie lange DAUERT es?",
          xpReward: 10
        },
        {
          id: "ex11-2-8",
          type: "matching",
          question: "Match the workplace phrase to its meaning:",
          options: ["Guten Tag, hier spricht...", "Ich sende Ihnen die Datei.", "Wie war Ihr Wochenende?"],
          correctAnswer: ["Hello, this is... speaking", "I'll send you the file.", "How was your weekend?"],
          xpReward: 15
        },
        {
          id: "ex11-2-9",
          type: "dictation",
          question: "Listen and type: Das Büro ist im dritten Stock.",
          correctAnswer: "Das Büro ist im dritten Stock",
          explanation: "Perfect! 'Stock' means floor. And remember: 'im' = in + dem (Dative).",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-office-floor.mp3"
        },
        {
          id: "ex11-2-10",
          type: "free-text",
          question: "Translate to German: 'I have a meeting at 10 o'clock.' (meeting = Besprechung)",
          correctAnswer: "Ich habe eine Besprechung um 10 Uhr",
          explanation: "Excellent! 'um' is used for exact times. German meetings always start 'pünktlich'!",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab11-2-1", german: "das Büro", english: "office", malayalam: "ഓഫീസ്", pronunciation: "byu-roh", example: "Ich arbeite im Büro.", exampleTranslation: "I work in the office." },
        { id: "vocab11-2-2", german: "der Schreibtisch", english: "desk", malayalam: "മേശ", pronunciation: "shryb-tish", example: "Mein Schreibtisch ist aufgeräumt.", exampleTranslation: "My desk is tidy." },
        { id: "vocab11-2-3", german: "der Drucker", english: "printer", malayalam: "പ്രിന്റർ", pronunciation: "droo-ker", example: "Der Drucker funktioniert nicht.", exampleTranslation: "The printer is not working." },
        { id: "vocab11-2-4", german: "die Besprechung", english: "meeting", malayalam: "മീറ്റിംഗ്", pronunciation: "beh-shpreh-khoong", example: "Die Besprechung beginnt um 10 Uhr.", exampleTranslation: "The meeting starts at 10 o'clock." },
        { id: "vocab11-2-5", german: "der Kollege / die Kollegin", english: "colleague", malayalam: "സഹപ്രവർത്തകൻ / സഹപ്രവർത്തക", pronunciation: "ko-ley-ge / ko-ley-gin", example: "Meine Kollegin hilft mir immer.", exampleTranslation: "My colleague always helps me." },
        { id: "vocab11-2-6", german: "die Vorlesung", english: "lecture", malayalam: "പ്രഭാഷണം", pronunciation: "for-ley-zoong", example: "Die Vorlesung dauert zwei Stunden.", exampleTranslation: "The lecture lasts two hours." },
        { id: "vocab11-2-7", german: "die Prüfung", english: "exam", malayalam: "പരീക്ഷ", pronunciation: "pryu-foong", example: "Die Prüfung ist nächste Woche.", exampleTranslation: "The exam is next week." },
        { id: "vocab11-2-8", german: "die Mensa", english: "cafeteria (university)", malayalam: "കാന്റീൻ", pronunciation: "men-za", example: "Das Essen in der Mensa ist günstig.", exampleTranslation: "The food in the cafeteria is cheap." },
        { id: "vocab11-2-9", german: "der Hörsaal", english: "lecture hall", malayalam: "ലക്ചർ ഹാൾ", pronunciation: "hur-zaal", example: "Der Hörsaal ist im dritten Stock.", exampleTranslation: "The lecture hall is on the third floor." },
        { id: "vocab11-2-10", german: "der Feierabend", english: "end of work day", malayalam: "ജോലി കഴിയുന്ന സമയം", pronunciation: "fy-er-ah-bent", example: "Ich mache um 17 Uhr Feierabend.", exampleTranslation: "I finish work at 5 PM." }
      ]
    },

    // ─── Lesson 11-3: Writing a Simple Email ─────────────────────────
    {
      id: "11-3",
      title: "Writing a Simple Email",
      titleGerman: "Eine einfache E-Mail schreiben",
      description: "Learn to write formal and informal emails in German — essential for university applications, job inquiries, and impressing your German boss!",
      duration: "60 min",
      xpReward: 160,
      videos: [
        {
          id: "v11-3-1",
          title: "Formal Email Structure",
          duration: "14:00",
          description: "Master the structure of a formal German email — from greeting to sign-off. University-yilekku apply cheyyaan, job-nu email ayakkaan — ithu must!",
          scriptOutline: [
            "Opening: 'Emails in German follow a very specific structure — let's crack it! Germany-yil email ethra important aanu ennariyo?'",
            "Subject line: der Betreff — always clear and concise. Germans HATE vague subjects!",
            "Formal greeting: 'Sehr geehrte Frau...' / 'Sehr geehrter Herr...' (with comma at the end!)",
            "If you don't know the name: 'Sehr geehrte Damen und Herren'",
            "Body: Keep it polite, use Sie throughout — no shortcuts!",
            "Opening line: 'Ich schreibe Ihnen bezüglich...' — I'm writing to you regarding...",
            "Request: 'Könnten Sie mir bitte...' — Could you please...",
            "Closing line: 'Ich freue mich auf Ihre Antwort.' — I look forward to your reply.",
            "Formal sign-off: 'Mit freundlichen Grüßen' (the gold standard — MfG for short)",
            "Your name and contact details at the end",
            "Common mistakes: Don't use 'Liebe/r' in formal emails! Don't write 'Hi' or 'Hey'!",
            "Kerala parallel: Remember how we start formal letters with 'ബഹുമാനപ്പെട്ട...'? Same energy!"
          ],
          keyVocabulary: ["Sehr geehrte/r", "Betreff", "Mit freundlichen Grüßen", "bezüglich", "Könnten Sie"],
          learningObjectives: [
            "Structure a formal German email correctly",
            "Use appropriate formal greetings and closings",
            "Write a polite request or inquiry email"
          ],
          placeholderThumbnail: "/images/thumbnails/formal-email.jpg"
        },
        {
          id: "v11-3-2",
          title: "Sample Emails for Real Situations",
          duration: "12:00",
          description: "Real-world email examples — to a professor, colleague, landlord, and company. Malayalis in Germany-kku actually useful aaya emails!",
          scriptOutline: [
            "Opening: 'Let's write some real emails you'll actually need! Practical aaya content — no boring textbook stuff!'",
            "Email 1: To a professor — asking about a course or thesis topic",
            "  - 'Sehr geehrte Frau Professor Müller, ich bin Student im Fach Informatik...'",
            "Email 2: To a landlord — asking about an apartment (THE most important email for new arrivals!)",
            "  - 'Sehr geehrte Damen und Herren, ich interessiere mich für die Wohnung...'",
            "Email 3: To a colleague — informal but professional",
            "  - 'Liebe Frau Schmidt, / Lieber Herr Weber,' + 'Viele Grüße' as closing",
            "Email 4: To a company — job inquiry or Ausbildung application",
            "  - 'Sehr geehrte Damen und Herren, hiermit bewerbe ich mich um die Stelle als...'",
            "Informal emails to friends: 'Hallo...!', 'Liebe/Lieber...', 'LG' (Liebe Grüße)",
            "Key tip: Germans reply promptly — if you don't hear back in 3 days, follow up!",
            "Practice: Write your own email applying for an Ausbildung position"
          ],
          keyVocabulary: ["Liebe/Lieber", "Viele Grüße", "hiermit", "bewerben", "sich interessieren für"],
          learningObjectives: [
            "Write emails for different real-world scenarios",
            "Switch between formal and semi-formal email styles",
            "Use common email phrases naturally"
          ],
          placeholderThumbnail: "/images/thumbnails/sample-emails.jpg"
        }
      ],
      exercises: [
        {
          id: "ex11-3-1",
          type: "multiple-choice",
          question: "How do you start a formal email to a woman named Dr. Schneider?",
          options: ["Sehr geehrte Frau Dr. Schneider,", "Liebe Dr. Schneider,", "Hallo Frau Schneider!", "Hey Schneider,"],
          correctAnswer: "Sehr geehrte Frau Dr. Schneider,",
          explanation: "'Sehr geehrte' is the formal greeting for women. If she has a title like 'Dr.', you MUST include it. It’s a sign of respect in German hierarchy!",
          xpReward: 10
        },
        {
          id: "ex11-3-2",
          type: "fill-blank",
          question: "Complete the formal email closing: Mit freundlichen _____",
          options: ["Grüßen", "Grüße", "Gruß", "Grüssen"],
          correctAnswer: "Grüßen",
          explanation: "The full phrase is 'Mit freundlichen Grüßen'. In emails, people often shorten it to 'MfG', but in formal writing, always write it out fully.",
          xpReward: 10
        },
        {
          id: "ex11-3-3",
          type: "multiple-choice",
          question: "You don't know the recipient's name. How do you start your formal email?",
          options: ["Sehr geehrte Damen und Herren,", "Hallo zusammen,", "An wen es betrifft,", "Liebe alle,"],
          correctAnswer: "Sehr geehrte Damen und Herren,",
          explanation: "Literally 'Very honored Ladies and Gentlemen'. Use this when emailing a general office or HR department where the specific person is unknown.",
          xpReward: 10
        },
        {
          id: "ex11-3-4",
          type: "matching",
          question: "Match the email element to its German term:",
          options: ["Subject line", "Dear Mr.", "Kind regards", "Attachment"],
          correctAnswer: ["Betreff", "Sehr geehrter Herr", "Mit freundlichen Grüßen", "die Anlage"],
          explanation: "Crucial vocabulary! If you forget 'Betreff', your email might get filtered as spam. If you forget 'Anlage', they won't look for your CV!",
          xpReward: 15
        },
        {
          id: "ex11-3-5",
          type: "ordering",
          question: "Put these email parts in the correct order:",
          options: ["Mit freundlichen Grüßen, [Name]", "Sehr geehrte Frau Müller,", "Betreff: Frage zur Vorlesung", "Ich schreibe Ihnen bezüglich der Vorlesung am Montag."],
          correctAnswer: ["Betreff: Frage zur Vorlesung", "Sehr geehrte Frau Müller,", "Ich schreibe Ihnen bezüglich der Vorlesung am Montag.", "Mit freundlichen Grüßen, [Name]"],
          explanation: "Structure: Subject line FIRST. Then greeting. Then body. Then sign-off. Germans love this exact order.",
          xpReward: 20
        },
        {
          id: "ex11-3-6",
          type: "multiple-choice",
          question: "Which closing is appropriate for a semi-formal email to a colleague you know well?",
          options: ["Viele Grüße", "Mit freundlichen Grüßen", "Hochachtungsvoll", "Tschüss"],
          correctAnswer: "Viele Grüße",
          explanation: "'Viele Grüße' is the perfect middle ground—professional but friendly. 'Hochachtungsvoll' is too old-fashioned (reserved for legal letters!), and 'Tschüss' is too casual.",
          xpReward: 10
        },
        {
          id: "ex11-3-7",
          type: "fill-blank",
          question: "Complete: Ich schreibe Ihnen _____ Ihrer Stellenanzeige. (I am writing to you regarding your job posting.)",
          options: ["bezüglich", "über", "für", "mit"],
          correctAnswer: "bezüglich",
          explanation: "'Bezüglich' + Genitive (though colloquially used with Dative) is the formal way to say 'regarding'. It makes you sound very competent!",
          xpReward: 10
        },
        {
          id: "ex11-3-8",
          type: "multiple-choice",
          question: "You want to say 'Please find my CV attached.' Which is correct?",
          options: ["In der Anlage finden Sie meinen Lebenslauf.", "Ich habe meinen Lebenslauf.", "Mein Lebenslauf ist hier.", "Bitte sehen Sie meinen Lebenslauf."],
          correctAnswer: "In der Anlage finden Sie meinen Lebenslauf.",
          explanation: "The standard 'Business German' formula. 'In der Anlage' = In the attachment. 'finden Sie' = you find. 'Lebenslauf' = life's-run (CV).",
          xpReward: 10
        },
        {
          id: "ex11-3-9",
          type: "dictation",
          question: "Listen and type: Sehr geehrte Damen und Herren,",
          correctAnswer: "Sehr geehrte Damen und Herren",
          explanation: "Great! This is the most formal way to address people when you don't know their names.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-email-formal-greeting.mp3"
        },
        {
          id: "ex11-3-10",
          type: "free-text",
          question: "Write in German: 'Kind regards' (formal email closing)",
          correctAnswer: "Mit freundlichen Grüßen",
          explanation: "Wunderbar! 'Mit freundlichen Grüßen' is the gold standard for formal closings.",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab11-3-1", german: "der Betreff", english: "subject (of email)", malayalam: "വിഷയം", pronunciation: "beh-tref", example: "Der Betreff muss klar sein.", exampleTranslation: "The subject must be clear." },
        { id: "vocab11-3-2", german: "Sehr geehrte/r", english: "Dear (formal)", malayalam: "ബഹുമാനപ്പെട്ട", pronunciation: "zeyr geh-eyr-te/ter", example: "Sehr geehrter Herr Müller, ...", exampleTranslation: "Dear Mr. Müller, ..." },
        { id: "vocab11-3-3", german: "Mit freundlichen Grüßen", english: "Kind regards", malayalam: "സ്നേഹപൂർവ്വം", pronunciation: "mit froynt-likh-en gryu-sen", example: "Mit freundlichen Grüßen, Anna Schmidt.", exampleTranslation: "Kind regards, Anna Schmidt." },
        { id: "vocab11-3-4", german: "Liebe / Lieber", english: "Dear (informal)", malayalam: "പ്രിയ", pronunciation: "lee-be / lee-ber", example: "Liebe Maria, wie geht es dir?", exampleTranslation: "Dear Maria, how are you?" },
        { id: "vocab11-3-5", german: "Viele Grüße", english: "Many greetings / Best wishes", malayalam: "ഒരുപാട് ആശംസകൾ", pronunciation: "fee-le gryu-se", example: "Viele Grüße aus Berlin!", exampleTranslation: "Many greetings from Berlin!" },
        { id: "vocab11-3-6", german: "bezüglich", english: "regarding / concerning", malayalam: "സംബന്ധിച്ച്", pronunciation: "beh-tsyuk-likh", example: "Ich schreibe Ihnen bezüglich Ihrer Anzeige.", exampleTranslation: "I am writing to you regarding your advertisement." },
        { id: "vocab11-3-7", german: "die Anlage", english: "attachment", malayalam: "അറ്റാച്ച്മെന്റ്", pronunciation: "an-lah-ge", example: "In der Anlage finden Sie meinen Lebenslauf.", exampleTranslation: "In the attachment you will find my CV." },
        { id: "vocab11-3-8", german: "die Antwort", english: "reply / answer", malayalam: "മറുപടി", pronunciation: "ant-vort", example: "Ich freue mich auf Ihre Antwort.", exampleTranslation: "I look forward to your reply." },
        { id: "vocab11-3-9", german: "hiermit", english: "hereby / with this", malayalam: "ഇതിനാൽ", pronunciation: "heer-mit", example: "Hiermit bewerbe ich mich um die Stelle.", exampleTranslation: "I hereby apply for the position." },
        { id: "vocab11-3-10", german: "Könnten Sie mir bitte...", english: "Could you please...", malayalam: "ദയവായി നിങ്ങൾക്ക്... കഴിയുമോ", pronunciation: "kurn-ten zee meer bi-te", example: "Könnten Sie mir bitte die Unterlagen senden?", exampleTranslation: "Could you please send me the documents?" }
      ]
    },

    // ─── Lesson 11-4: Talking About Skills ───────────────────────────
    {
      id: "11-4",
      title: "Talking About Skills",
      titleGerman: "Über Fähigkeiten sprechen",
      description: "Learn to describe your skills, qualifications, and interests in German — essential for job applications, LinkedIn profiles, and networking at meetups!",
      duration: "50 min",
      xpReward: 140,
      videos: [
        {
          id: "v11-4-1",
          title: "Ich kann... - Describing Your Skills",
          duration: "12:00",
          description: "Express your abilities, experience, and interests in German with confidence — because Malayalis have no shortage of skills!",
          scriptOutline: [
            "Opening: 'Time to show off what you can do — auf Deutsch! Nammude skills world-class aanu, athu German-il parayaan padikkaam!'",
            "Ich kann + verb: 'Ich kann programmieren', 'Ich kann gut kochen'",
            "Ich kann gut/schlecht...: rating your skills — Germans appreciate honesty!",
            "Ich habe Erfahrung mit + Dativ: 'Ich habe Erfahrung mit Programmierung'",
            "die Kenntnisse: 'Ich habe gute Deutschkenntnisse' — knowledge/skills in a specific area",
            "die Fähigkeiten: 'Meine Fähigkeiten sind...' — abilities/competencies",
            "Ich bin gut in + Dativ: 'Ich bin gut in Mathematik'",
            "Ich interessiere mich für + Akkusativ: 'Ich interessiere mich für Technik'",
            "Soft skills in German: teamfähig, flexibel, pünktlich, zuverlässig (reliable), kreativ",
            "IT skills: Programmierung, Datenanalyse, Webentwicklung, künstliche Intelligenz",
            "Language skills: Ich spreche fließend Englisch, Malayalam und Deutsch. (Trilingual power!)",
            "Practice: Describe yourself using these phrases — like a mini LinkedIn bio auf Deutsch!",
            "Tip: In Germany, be confident but humble — 'Ich kann gut...' is better than 'Ich bin der Beste!'"
          ],
          keyVocabulary: ["können", "die Erfahrung", "die Kenntnisse", "die Fähigkeiten", "sich interessieren für", "zuverlässig"],
          learningObjectives: [
            "Describe your skills using 'Ich kann...' and related structures",
            "Talk about experience, knowledge, and soft skills",
            "Express interests using 'sich interessieren für'"
          ],
          placeholderThumbnail: "/images/thumbnails/skills.jpg"
        },
        {
          id: "v11-4-2",
          title: "Qualifikationen & Zertifikate",
          duration: "10:00",
          description: "Talk about your qualifications, certificates, and education — key vocabulary for German job applications",
          scriptOutline: [
            "Opening: 'Qualifications German-il engane parayaam? Ithu job application-nu vital aanu!'",
            "das Zeugnis (certificate/transcript) — you'll need these a LOT in Germany!",
            "das Diplom / der Abschluss — degree/diploma: 'Ich habe einen Bachelor-Abschluss in Informatik.'",
            "der Führerschein — driving license (sometimes required even for non-driving jobs!)",
            "das Sprachzertifikat — language certificate: 'Ich habe das B1-Zertifikat in Deutsch.'",
            "B1/B2/C1 — language levels matter hugely for Ausbildung and job applications",
            "die Weiterbildung — further education/continuing training",
            "beherrschen — to master: 'Ich beherrsche Python und Java.'",
            "Kerala connection: Nammude IELTS/OET polae aanu German-il Goethe-Zertifikat!",
            "Practice: List your qualifications in German — education, certificates, languages",
            "Tip: Germans value formal certificates — get everything documented and translated!"
          ],
          keyVocabulary: ["das Zeugnis", "der Abschluss", "das Sprachzertifikat", "die Weiterbildung", "beherrschen"],
          learningObjectives: [
            "Name your qualifications and certificates in German",
            "Talk about your education and degrees",
            "Describe your language proficiency levels"
          ],
          placeholderThumbnail: "/images/thumbnails/qualifications.jpg"
        }
      ],
      exercises: [
        {
          id: "ex11-4-1",
          type: "fill-blank",
          question: "Complete: Ich _____ gut programmieren. (I can program well.)",
          options: ["kann", "bin", "habe", "mache"],
          correctAnswer: "kann",
          explanation: "Können (can) is the modal verb for skills and abilities. Verb 1 (kann) stays at position 2, and Verb 2 (programmieren) goes to the END. The 'Abhibhashaka-Rule' (Verb final).",
          xpReward: 10
        },
        {
          id: "ex11-4-2",
          type: "multiple-choice",
          question: "How do you say 'I have experience with programming' in German?",
          options: ["Ich habe Erfahrung mit Programmierung.", "Ich kann Erfahrung programmieren.", "Ich bin Erfahrung mit Programmierung.", "Ich mache Erfahrung Programmierung."],
          correctAnswer: "Ich habe Erfahrung mit Programmierung.",
          explanation: "The formula: Ich habe + Erfahrung + mit + [Dativ topic]. Dativ triggers here, but for nouns like Programmierung, it's straightforward.",
          xpReward: 10
        },
        {
          id: "ex11-4-3",
          type: "matching",
          question: "Match the German skill word to its English meaning:",
          options: ["teamfähig", "zuverlässig", "flexibel", "pünktlich"],
          correctAnswer: ["team-oriented", "reliable", "flexible", "punctual"],
          explanation: "These are 'Adjectives from Heaven' for your German CV. Germans value 'Zuverlässig' (Reliable) above almost everything else!",
          xpReward: 15
        },
        {
          id: "ex11-4-4",
          type: "fill-blank",
          question: "Complete: Ich interessiere _____ für Technik. (I am interested in technology.)",
          options: ["mich", "mir", "ich", "mein"],
          correctAnswer: "mich",
          explanation: "'Sich interessieren für' is reflexive. Since the subject is 'Ich', the pronoun MUST be 'mich'. It means 'I interest MYSELF for tech'.",
          xpReward: 10
        },
        {
          id: "ex11-4-5",
          type: "ordering",
          question: "Put this sentence in correct order: 'I have good German skills.'",
          options: ["Deutschkenntnisse", "gute", "habe", "Ich"],
          correctAnswer: ["Ich", "habe", "gute", "Deutschkenntnisse"],
          explanation: "Subject (Ich) + Verb (habe) + Adjective (gute) + Compound Noun (Deutsch+kenntnisse). Knowledge of German = Deutschkenntnisse.",
          xpReward: 15
        },
        {
          id: "ex11-4-6",
          type: "multiple-choice",
          question: "What does 'das Zeugnis' mean?",
          options: ["certificate / transcript", "job application", "interview", "contract"],
          correctAnswer: "certificate / transcript",
          explanation: "In Germany, 'Zeugnisse' are a way of life. From school to every job you leave, you get a Zeugnis. No Zeugnis = proof-of-work missing!",
          xpReward: 10
        },
        {
          id: "ex11-4-7",
          type: "fill-blank",
          question: "Complete: Ich habe einen Bachelor-_____ in Informatik. (I have a Bachelor's degree in Computer Science.)",
          options: ["Abschluss", "Zeugnis", "Kenntnisse", "Erfahrung"],
          correctAnswer: "Abschluss",
          explanation: "Abschluss literally means 'Closing/Finishing'. It implies you finished the degree successfully. 'Bachelor-Abschluss' is the modern German way to say degree.",
          xpReward: 10
        },
        {
          id: "ex11-4-8",
          type: "multiple-choice",
          question: "Which German word means 'to master' a skill?",
          options: ["beherrschen", "können", "lernen", "verstehen"],
          correctAnswer: "beherrschen",
          explanation: "To master something at a high level. Use this for languages or software you know inside out. 'Ich beherrsche Java.'",
          xpReward: 10
        },
        {
          id: "ex11-4-9",
          type: "dictation",
          question: "Listen and type: Ich kann Deutsch sprechen.",
          correctAnswer: "Ich kann Deutsch sprechen",
          explanation: "Perfect! Modal verb in position 2, main verb at the end. That's a great skill to have!",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-can-speak-german.mp3"
        },
        {
          id: "ex11-4-10",
          type: "free-text",
          question: "Translate to German: 'I am interested in computer science.' (computer science = Informatik)",
          correctAnswer: "Ich interessiere mich für Informatik",
          explanation: "Excellent! 'sich interessieren für' is the reflexive phrase you need. Don't forget 'mich'!",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab11-4-1", german: "die Erfahrung", english: "experience", malayalam: "അനുഭവം", pronunciation: "er-fah-roong", example: "Ich habe viel Erfahrung mit Java.", exampleTranslation: "I have a lot of experience with Java." },
        { id: "vocab11-4-2", german: "die Kenntnisse", english: "knowledge / skills (pl.)", malayalam: "അറിവ് / പരിജ്ഞാനം", pronunciation: "kent-ni-se", example: "Sie hat gute Englischkenntnisse.", exampleTranslation: "She has good English skills." },
        { id: "vocab11-4-3", german: "die Fähigkeiten", english: "abilities / skills (pl.)", malayalam: "കഴിവുകൾ", pronunciation: "fey-ikh-ky-ten", example: "Welche Fähigkeiten bringen Sie mit?", exampleTranslation: "What skills do you bring?" },
        { id: "vocab11-4-4", german: "können", english: "can / to be able to", malayalam: "കഴിയുക", pronunciation: "kur-nen", example: "Ich kann drei Sprachen sprechen.", exampleTranslation: "I can speak three languages." },
        { id: "vocab11-4-5", german: "sich interessieren für", english: "to be interested in", malayalam: "താൽപ്പര്യമുള്ള", pronunciation: "zikh in-te-re-see-ren fyr", example: "Ich interessiere mich für Informatik.", exampleTranslation: "I am interested in computer science." },
        { id: "vocab11-4-6", german: "zuverlässig", english: "reliable", malayalam: "വിശ്വസനീയം", pronunciation: "tsoo-fer-less-ikh", example: "Er ist ein sehr zuverlässiger Mitarbeiter.", exampleTranslation: "He is a very reliable employee." },
        { id: "vocab11-4-7", german: "das Zeugnis", english: "certificate / transcript", malayalam: "സർട്ടിഫിക്കറ്റ്", pronunciation: "tsoyg-nis", example: "Bitte senden Sie Ihre Zeugnisse.", exampleTranslation: "Please send your certificates." },
        { id: "vocab11-4-8", german: "der Abschluss", english: "degree / diploma", malayalam: "ബിരുദം", pronunciation: "ap-shloos", example: "Ich habe einen Master-Abschluss.", exampleTranslation: "I have a Master's degree." },
        { id: "vocab11-4-9", german: "beherrschen", english: "to master / command", malayalam: "വൈദഗ്ധ്യം നേടുക", pronunciation: "be-herr-shen", example: "Ich beherrsche Python und JavaScript.", exampleTranslation: "I have mastery of Python and JavaScript." },
        { id: "vocab11-4-10", german: "das Sprachzertifikat", english: "language certificate", malayalam: "ഭാഷാ സർട്ടിഫിക്കറ്റ്", pronunciation: "shprakh-tser-ti-fi-kaht", example: "Für die Ausbildung brauche ich ein B1-Sprachzertifikat.", exampleTranslation: "For the vocational training I need a B1 language certificate." }
      ]
    },

    // ─── Lesson 11-5: Job Interview Basics ───────────────────────────
    {
      id: "11-5",
      title: "Job Interview Basics",
      titleGerman: "Grundlagen des Vorstellungsgesprächs",
      description: "Prepare for a German job interview — common questions, key vocabulary, and cultural tips. Germany-yil interview crack cheyyaan ulla complete guide!",
      duration: "60 min",
      xpReward: 180,
      videos: [
        {
          id: "v11-5-1",
          title: "Das Vorstellungsgespräch - Interview Prep",
          duration: "14:00",
          description: "Everything you need to know about job interviews in Germany — structure, etiquette, and key phrases for Malayalis",
          scriptOutline: [
            "Opening: 'The Vorstellungsgespräch — your gateway to working in Germany! Interview prepare cheyyaan nadakkaam!'",
            "The application process: die Bewerbung (application), der Lebenslauf (CV), das Anschreiben (cover letter)",
            "German CV format: Photo, personal details, education, experience — very structured!",
            "Kerala parallel: Unlike India's walk-in interviews, Germany needs a full Bewerbungsmappe (application folder)",
            "Interview structure: Greeting → Self-introduction → Questions → Your questions → Goodbye",
            "First impression: Firm handshake, eye contact, punctuality (be 5 minutes early!)",
            "Dress code: Business formal for most jobs, smart casual for IT/startups",
            "Key phrase: 'Erzählen Sie etwas über sich' — Tell me about yourself",
            "How to structure your self-introduction: Name → Background → Education → Experience → Why this job",
            "Example: 'Ich komme aus Kerala, Indien. Ich habe Informatik studiert und habe drei Jahre Erfahrung...'",
            "Cultural tip: Germans value Direktheit (directness) — be clear and concise, no beating around the bush!",
            "Tip: Prepare 2-3 questions to ask THEM — 'Wie sieht ein typischer Arbeitstag aus?'"
          ],
          keyVocabulary: ["das Vorstellungsgespräch", "die Bewerbung", "der Lebenslauf", "das Anschreiben", "Erzählen Sie"],
          learningObjectives: [
            "Understand the German job application process",
            "Know what to expect in a German interview",
            "Introduce yourself professionally in German"
          ],
          placeholderThumbnail: "/images/thumbnails/interview-prep.jpg"
        },
        {
          id: "v11-5-2",
          title: "Common Interview Questions & Answers",
          duration: "12:00",
          description: "Practice answering the most common German interview questions — with sample responses tailored for Malayalis",
          scriptOutline: [
            "Opening: 'Let's practice the questions they WILL ask you! Ready aakaam — Malayali confidence-il!'",
            "'Erzählen Sie etwas über sich.' — Tell me about yourself",
            "  Sample: 'Ich komme aus Kerala, Indien. Ich habe Informatik studiert und arbeite seit zwei Jahren als Entwickler.'",
            "'Warum möchten Sie hier arbeiten?' — Why do you want to work here?",
            "  Sample: 'Ihre Firma ist führend im Bereich der Technologie, und ich möchte mich weiterentwickeln.'",
            "'Was sind Ihre Stärken?' — What are your strengths?",
            "  Sample: 'Ich bin teamfähig, zuverlässig und lerne schnell neue Technologien.'",
            "'Was sind Ihre Schwächen?' — What are your weaknesses?",
            "  Tip: Pick a real weakness but show you're working on it — 'Manchmal bin ich zu perfektionistisch.'",
            "'Wo sehen Sie sich in fünf Jahren?' — Where do you see yourself in 5 years?",
            "  Sample: 'Ich möchte mich zum Senior-Entwickler weiterentwickeln.'",
            "'Haben Sie noch Fragen?' — Do you have any questions?",
            "  Always say yes! Ask about team, training, next steps — 'Wie groß ist das Team?'",
            "Salary negotiation: 'Meine Gehaltsvorstellung liegt bei...' — My salary expectation is..."
          ],
          keyVocabulary: ["Stärken", "Schwächen", "teamfähig", "Gehaltsvorstellung", "sich weiterentwickeln"],
          learningObjectives: [
            "Answer common interview questions in German confidently",
            "Describe your strengths and weaknesses professionally",
            "Ask appropriate questions and discuss salary expectations"
          ],
          placeholderThumbnail: "/images/thumbnails/interview-questions.jpg"
        }
      ],
      exercises: [
        {
          id: "ex11-5-1",
          type: "multiple-choice",
          question: "What does 'Erzählen Sie etwas über sich' mean?",
          options: ["Tell me about yourself", "What are your strengths?", "Why do you want this job?", "Do you have questions?"],
          correctAnswer: "Tell me about yourself",
          explanation: "The standard opening of EVERY interview. It's your time to shine for 2 minutes. Focus on Your Origin -> Studies -> Experience.",
          xpReward: 10
        },
        {
          id: "ex11-5-2",
          type: "matching",
          question: "Match the German term to its English equivalent:",
          options: ["die Bewerbung", "der Lebenslauf", "das Anschreiben", "die Stelle"],
          correctAnswer: ["application", "CV / resume", "cover letter", "position / job"],
          explanation: "Master the terminology! When an HR person asks for your 'Unterlagen', they want this whole set of documents.",
          xpReward: 15
        },
        {
          id: "ex11-5-3",
          type: "fill-blank",
          question: "Complete: Warum _____ Sie hier arbeiten? (Why do you want to work here?)",
          options: ["möchten", "können", "müssen", "haben"],
          correctAnswer: "möchten",
          explanation: "Möchten (would like) is the polite modal verb. Avoid saying 'Ich WILL' (I want), it sounds too demanding for an interview!",
          xpReward: 10
        },
        {
          id: "ex11-5-4",
          type: "multiple-choice",
          question: "What does 'teamfähig' mean?",
          options: ["able to work in a team", "team leader", "team member", "team building"],
          correctAnswer: "able to work in a team",
          explanation: "'Team-fähig' = Team-capable. It’s the most requested soft skill in Germany. Mention it, and you're halfway there!",
          xpReward: 10
        },
        {
          id: "ex11-5-5",
          type: "ordering",
          question: "Put this self-introduction in logical order:",
          options: ["Deshalb möchte ich bei Ihrer Firma arbeiten.", "Ich komme aus Kerala, Indien.", "Ich habe drei Jahre Erfahrung als Programmierer.", "Ich habe Informatik studiert."],
          correctAnswer: ["Ich komme aus Kerala, Indien.", "Ich habe Informatik studiert.", "Ich habe drei Jahre Erfahrung als Programmierer.", "Deshalb möchte ich bei Ihrer Firma arbeiten."],
          explanation: "Logic: Where you are from -> Your foundation (studies) -> Your practical proof (experience) -> Why you are HERE.",
          xpReward: 20
        },
        {
          id: "ex11-5-6",
          type: "fill-blank",
          question: "Complete: Was sind Ihre _____? (What are your strengths?)",
          options: ["Stärken", "Schwächen", "Fragen", "Hobbys"],
          correctAnswer: "Stärken",
          explanation: "'Stärken' means strengths. 'Was sind Ihre Stärken?' is a classic interview question.",
          xpReward: 10
        },
        {
          id: "ex11-5-7",
          type: "multiple-choice",
          question: "At the end of a German interview, they ask 'Haben Sie noch Fragen?' What should you do?",
          options: ["Ask a thoughtful question about the role or company", "Say 'Nein, danke' and leave", "Ask about salary immediately", "Say nothing"],
          correctAnswer: "Ask a thoughtful question about the role or company",
          explanation: "In Germany, having no questions can signal disinterest. Always prepare 1-2 thoughtful questions!",
          xpReward: 10
        },
        {
          id: "ex11-5-8",
          type: "matching",
          question: "Match the interview question to its German translation:",
          options: ["What are your weaknesses?", "Where do you see yourself in 5 years?", "Why should we hire you?"],
          correctAnswer: ["Was sind Ihre Schwächen?", "Wo sehen Sie sich in fünf Jahren?", "Warum sollten wir Sie einstellen?"],
          xpReward: 15
        },
        {
          id: "ex11-5-9",
          type: "dictation",
          question: "Listen and type: Erzählen Sie etwas über sich.",
          correctAnswer: "Erzählen Sie etwas über sich",
          explanation: "Great job! This is the most common invitation to introduce yourself in an interview.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-tell-about-self.mp3"
        },
        {
          id: "ex11-5-10",
          type: "free-text",
          question: "Write in German: 'I have three years of experience.' (experience = Erfahrung)",
          correctAnswer: "Ich habe drei Jahre Erfahrung",
          explanation: "Wunderbar! 'Ich habe drei Jahre Erfahrung.' — This is exactly what employers want to hear!",
          xpReward: 30
        }
      ],
      vocabulary: [
        { id: "vocab11-5-1", german: "das Vorstellungsgespräch", english: "job interview", malayalam: "ജോബ് ഇന്റർവ്യൂ", pronunciation: "for-shtel-oongs-geh-shpreykh", example: "Mein Vorstellungsgespräch ist morgen.", exampleTranslation: "My job interview is tomorrow." },
        { id: "vocab11-5-2", german: "die Bewerbung", english: "application", malayalam: "അപേക്ഷ", pronunciation: "beh-ver-boong", example: "Ich schicke meine Bewerbung per E-Mail.", exampleTranslation: "I am sending my application by email." },
        { id: "vocab11-5-3", german: "der Lebenslauf", english: "CV / resume", malayalam: "ബയോഡാറ്റ / സിവി", pronunciation: "ley-bens-lowf", example: "Mein Lebenslauf hat zwei Seiten.", exampleTranslation: "My CV has two pages." },
        { id: "vocab11-5-4", german: "das Anschreiben", english: "cover letter", malayalam: "കവർ ലെറ്റർ", pronunciation: "an-shry-ben", example: "Das Anschreiben muss individuell sein.", exampleTranslation: "The cover letter must be personalized." },
        { id: "vocab11-5-5", german: "die Stärken", english: "strengths", malayalam: "ശക്തികൾ", pronunciation: "shter-ken", example: "Was sind Ihre Stärken?", exampleTranslation: "What are your strengths?" },
        { id: "vocab11-5-6", german: "die Schwächen", english: "weaknesses", malayalam: "ദൗർബല്യങ്ങൾ", pronunciation: "shve-khen", example: "Was sind Ihre Schwächen?", exampleTranslation: "What are your weaknesses?" },
        { id: "vocab11-5-7", german: "teamfähig", english: "able to work in a team", malayalam: "ടീമിൽ പ്രവർത്തിക്കാൻ കഴിവുള്ള", pronunciation: "teem-fey-ikh", example: "Ich bin sehr teamfähig.", exampleTranslation: "I am very capable of teamwork." },
        { id: "vocab11-5-8", german: "die Stelle", english: "position / job", malayalam: "ജോലി സ്ഥാനം", pronunciation: "shtel-le", example: "Ich bewerbe mich um diese Stelle.", exampleTranslation: "I am applying for this position." },
        { id: "vocab11-5-9", german: "die Gehaltsvorstellung", english: "salary expectation", malayalam: "ശമ്പള പ്രതീക്ഷ", pronunciation: "ge-halts-for-shtel-oong", example: "Meine Gehaltsvorstellung liegt bei 45.000 Euro.", exampleTranslation: "My salary expectation is 45,000 euros." },
        { id: "vocab11-5-10", german: "sich weiterentwickeln", english: "to further develop oneself", malayalam: "കൂടുതൽ വികസിക്കുക", pronunciation: "zikh vy-ter-ent-vik-eln", example: "Ich möchte mich beruflich weiterentwickeln.", exampleTranslation: "I want to develop myself professionally." }
      ]
    }
  ]
};
