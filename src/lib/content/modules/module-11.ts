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
      storyScene: {
        setting: {
          name: "Career Fair (Jobmesse)",
          sceneType: "university",
          timeOfDay: "morning",
          description: "A huge hall filled with company booths, banners, and free coffee. You're here with Arjun to check out the job market. There are posters for 'IT-Ingenieure' and 'Pflegefachkräfte' everywhere. In Kerala, a job is a job, but here, every 'Beruf' has a masculine and a feminine name. Mastering these is your first step to a German career. Ready to network, machane?",
        },
        narrative: {
          previousRecap: "You've mastered the language of your body and health. Now, let's look at your professional life!",
          currentObjective: "Identify various professions with gendered forms and ask/answer 'What is your profession?'",
          nextTeaser: "Next: Office and Uni life! Let's see where you'll actually work!",
        },
        kuttanIntro: [
          "Machane! Professions German-il parayumbol gender valare important aanu. Masculine-il 'er' ennu theerum, but feminine-il 'in' add cheyyanam — 'Informatiker' vs 'Informatikerin'.",
          "Nursing (Krankenschwester) and IT (Programmierer) jobs-inu Germany-yil bhayankara demand aanu. Nammude Malayali favorites!",
          "Pinne 'Anerkennung' (recognition) enna word sradhikkanne. Kerala-yile degrees Germany-yil recognize cheyyunnthinnaanu ithu parayunnathu. Let's find some jobs!",
        ],
        vocabEncounters: [
          { vocabId: "vocab11-1-1", encounterMoment: "A recruiter asks: 'Was sind Sie von Beruf?' (What is your profession?).", contextSentence: "Was sind Sie von Beruf?" },
          { vocabId: "vocab11-1-4", encounterMoment: "You see a booth for: 'Krankenschwester gesucht' (Nurse wanted).", contextSentence: "Viele Malayalis arbeiten als Krankenschwester in Deutschland." },
          { vocabId: "vocab11-1-3", encounterMoment: "Arjun points to SAP: 'Ich will Programmierer werden.' (I want to be a programmer).", contextSentence: "Sie arbeitet als Programmiererin bei SAP." },
          { vocabId: "vocab11-1-10", encounterMoment: "A consultant notes: 'Sie brauchen die Anerkennung.' (You need the recognition).", contextSentence: "Die Anerkennung meines Diploms dauert drei Monate." },
        ],
        decisionPoints: [
          {
            moment: "You are meeting a female engineer. How do you correctly refer to her profession?",
            options: [
              { text: "die Ingenieurin.", isCorrect: true, response: "Exactly! Add '-in' for the feminine form.", kuttanReaction: "Adipoli! Gender logic perfectly catch cheythallo! 🔥" },
              { text: "der Ingenieur.", isCorrect: false, response: "Aiyyo! 'der Ingenieur' is for a man. For a woman, you need the '-in' ending.", kuttanReaction: "Vite machane! Gender endings important aanu in German. Try again! 😬" },
            ],
          },
          {
            moment: "Someone asks you 'Was sind Sie von Beruf?'. You are an accountant. How do you respond?",
            options: [
              { text: "Ich bin Buchhalter.", isCorrect: true, response: "Correct! Note that you don't say 'a' accountant in German.", kuttanReaction: "Superb! Sentence structure correct aayi pick cheythallo. ⭐" },
              { text: "Ich bin ein Buchhalter.", isCorrect: false, response: "Aiyyo! In German, we usually drop the 'ein' (a) when stating professions.", kuttanReaction: "Aiyyo! 'ein' use cheyyenda necessary illa, just profession paranjaal mathi. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v11-1-1",
          title: "Berufe - Professions in German",
          duration: "12:00",
          description: "A comprehensive guide to German profession names with gender forms and cultural context for Malayalis",
          scriptOutline: [
            "Opening: 'Was sind Sie von Beruf? Germany-yil job nokkunna Malayalikalku ithu must-learn aanu! Nurse and IT jobs-inu heavy demand undu!'",
            "Gender Logic: Jobs-inu masculine (-er) and feminine (-in) endings undu. Ithu fix cheyyanam!",
            "der Ingenieur / die Ingenieurin — Kerala engineers rock German auto industry!",
            "der Programmierer / die Programmiererin — IT sector-il nammude aalukal mass aanu!",
            "Krankenpfleger / Krankenschwester — Germany-yile biggest Malayali workforce! Salute, machane!",
            "der Lehrer / die Lehrerin — Teachers. Respect focus fixed aanu.",
            "der Arzt / die Ärztin — Doctors doing Approbation. Nalla future undu!",
            "der Buchhalter / die Buchhalterin — Accountants. Commerce graduates focus!",
            "der Koch / die Köchin — Keralite chefs in Berlin logic? Possible!",
            "Informal: 'Was machst du beruflich?' — Living-inu vendi enna pani cheyyunnu?",
            "Cultural tip: Germany-yil profession identity-ude part aanu. Passion focus venam!"
          ],
          keyVocabulary: ["der Beruf", "Was sind Sie von Beruf?", "Ingenieur", "Programmiererin", "Krankenschwester", "Ärztin"],
          learningObjectives: [
            "Name at least 10 professions in German with correct articles",
            "Form both masculine and feminine versions of professions",
            "Ask and answer 'What is your profession?' formally and informally"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Professions — Masculine & Feminine",
              headers: ["Masculine (der)", "Feminine (die)", "English"],
              rows: [
                ["der Ingenieur", "die Ingenieurin", "engineer"],
                ["der Programmierer", "die Programmiererin", "programmer"],
                ["der Krankenpfleger", "die Krankenschwester", "nurse"],
                ["der Lehrer", "die Lehrerin", "teacher"],
                ["der Arzt", "die Ärztin", "doctor"],
                ["der Buchhalter", "die Buchhalterin", "accountant"],
                ["der Koch", "die Köchin", "chef/cook"]
              ]
            },
            {
              type: "note",
              title: "Gender Endings for Jobs",
              variant: "tip",
              content: "Most masculine professions end in '-er'. Add '-in' to make it feminine: Lehrer → Lehrerin, Programmierer → Programmiererin. Some get Umlauts: Arzt → Ärztin, Koch → Köchin. Always learn both forms!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "Was sind Sie von Beruf?", english: "What is your profession? (formal)", malayalam: "നിങ്ങളുടെ ജോലി എന്താണ്?", pronunciation: "vas zint zee fon be-roof" },
                { german: "Was machst du beruflich?", english: "What do you do for work? (informal)", malayalam: "നീ എന്ത് ജോലി ചെയ്യുന്നു?", pronunciation: "vas mahkst doo be-roof-likh" }
              ]
            }
          ]
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
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Talking About Your Career",
              headers: ["German", "English", "Example"],
              rows: [
                ["Ich arbeite als...", "I work as a...", "Ich arbeite als Krankenschwester."],
                ["Ich studiere...", "I study...", "Ich studiere Informatik."],
                ["Ich habe ... studiert.", "I studied...", "Ich habe Medizin studiert."],
                ["Ich mache eine Ausbildung als...", "I'm doing vocational training as...", "...als Pflegefachmann."],
                ["Ich arbeite bei...", "I work at...", "Ich arbeite bei Siemens."]
              ]
            },
            {
              type: "table",
              title: "Ausbildung vs Studium",
              headers: ["", "Ausbildung", "Studium"],
              rows: [
                ["Type", "Vocational training", "University degree"],
                ["Duration", "2-3.5 years", "3-5 years"],
                ["Salary", "Paid (€800-1200/month)", "No salary (part-time jobs)"],
                ["Popular for Malayalis", "Nursing, mechanics", "IT, engineering, medicine"]
              ]
            },
            {
              type: "note",
              title: "die Anerkennung — Critical for Indians!",
              variant: "warning",
              content: "If you have an Indian degree, you need 'Anerkennung' (recognition) to work in Germany. Nurses, doctors, and engineers must get their qualifications officially recognized. Start the process early — it can take months!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex11-1-2",
          type: "matching",
          question: "Frau Weber lists the class's dream jobs on the board, masculine forms only. Match each to its feminine form:",
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
          type: "free-text",
          question: "The Hamburg cousin's proud line, now Kuttan borrows it for practice. Type it in German — 'I am an engineer by profession.' (Ingenieur, von Beruf):",
          correctAnswer: "Ich bin Ingenieur von Beruf",
          explanation: "Subject-Verb-Complement, with 'von Beruf' tagging along at the end. And no 'ein' before the job — German drops the article there.",
          xpReward: 30
        },
        {
          id: "ex11-1-6",
          type: "type-answer",
          question: "Priya rehearses her dream introduction: 'Ich ___ als Programmiererin bei Siemens.' Type the missing verb (work):",
          correctAnswer: "arbeite",
          explanation: "The formula is: [arbeiten] + [als] + [profession] + [bei] + [company]. Memorize this 'Als/Bei' combo!",
          xpReward: 15
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
          type: "type-answer",
          question: "The visa form asks Kuttan's current status. He's doing vocational training — type his German status line ('I am doing an Ausbildung'):",
          correctAnswer: "Ich mache eine Ausbildung.",
          explanation: "Three status lines run your paperwork life: Ich studiere … (student), Ich mache eine Ausbildung (trainee), Ich arbeite … (worker). Pick the true one, every form, every time.",
          xpReward: 20
        },
        {
          id: "ex11-1-9",
          type: "dictation",
          question: "On the video call, the cousin's flatmate — one of thousands of Malayali nurses in Germany — introduces her work. Listen and type exactly what you hear.",
          correctAnswer: "Ich arbeite als Krankenschwester",
          explanation: "Possibly the most-spoken German sentence in the Kerala-to-Germany story. arbeiten + als + profession.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-work-nurse.mp3"
        },
        {
          id: "ex11-1-10",
          type: "free-text",
          question: "Sprechen Teil 2, topic card 'Beruf': ask the formal question back to the examiner. Type it in German — 'What is your profession?':",
          correctAnswer: "Was sind Sie von Beruf",
          explanation: "'Was sind Sie von Beruf?' — the polite standard. For friends it relaxes to 'Was machst du beruflich?'",
          xpReward: 30
        }
      ,
        {
          id: "ex11-1-prod-speaking",
          type: "speaking",
          question: "Interview warm-up at the imagined Münster office — introduce your work aloud: 'Ich studiere Deutsch und arbeite am Computer.'",
          questionGerman: "Sprechen Sie laut: 'Ich studiere Deutsch und arbeite am Computer.'",
          correctAnswer: "Ich studiere Deutsch und arbeite am Computer",
          explanation: "Two present-tense verbs joined with 'und' — exactly the shape of a Sprechen Teil 1 answer about your work.",
          audioUrl: "/audio/exercises/ex11-1-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex11-1-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: at the interview he says 'Ich bin ein Student.' German drops the article before professions! Say it right: 'Ich bin Student.'",
          questionGerman: "Sprechen Sie laut: 'Ich bin Student.'",
          correctAnswer: "Ich bin Student",
          explanation: "Ich bin Lehrer, Ich bin Krankenschwester, Ich bin Student — never 'ein'. English forces the article, German forbids it; this exact slip is on the examiner's checklist.",
          audioUrl: "/audio/exercises/ex11-1-spk2-model.mp3",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "Main Office (Modernes Büro)",
          sceneType: "station",
          timeOfDay: "morning",
          description: "It's your first day at a German office. The air is filled with the smell of fresh coffee and the sound of quiet typing. Your 'Schreibtisch' (desk) is ready. You're meeting your 'Kollegen' (colleagues). In Kerala, we might have a long chat over chai, but here, the 'Besprechung' (meeting) starts exactly on time. And when 5 PM hits, everyone yells 'Schönen Feierabend!'. Let's master the office lingo, machane!",
        },
        narrative: {
          previousRecap: "You've identified what you want to do. Now, let's see where you'll do it!",
          currentObjective: "Navigate office and university spaces and understand the concepts of meetings, cafeteria, and end-of-work",
          nextTeaser: "Next: Writing emails! Let's get that formal tone right!",
        },
        kuttanIntro: [
          "Machane! Office culture German-il valare structured aanu. 'Pünktlichkeit' (punctuality) is not just a word, it's a religion!",
          "Lunch time-il everyone goes to the 'Mensa' (canteen). Cheap food and socialising logic! IT sector-il 'Chef' ennu paranjaal boss aannu, kitchen cook alla.",
          "Pinne 'Feierabend' — my favorite German word. Work kazhinjaal pinne rest! No more emails! Let's get through the day!",
        ],
        vocabEncounters: [
          { vocabId: "vocab11-2-1", encounterMoment: "You walk in: 'Hier ist mein Büro.' (Here is my office).", contextSentence: "Ich arbeite im Büro." },
          { vocabId: "vocab11-2-4", encounterMoment: "Stefan says: 'Die Besprechung beginnt.' (The meeting starts).", contextSentence: "Die Besprechung beginnt um 10 Uhr." },
          { vocabId: "vocab11-2-8", encounterMoment: "Lunch break: 'Gehen wir in die Mensa?' (Shall we go to the canteen?).", contextSentence: "Das Essen in der Mensa ist günstig." },
          { vocabId: "vocab11-2-10", encounterMoment: "Clock hits 5: 'Schönen Feierabend!' (Have a nice evening/work's over!).", contextSentence: "Ich mache um 17 Uhr Feierabend." },
        ],
        decisionPoints: [
          {
            moment: "It's lunch time at the university. Where should you go for a cheap student meal?",
            options: [
              { text: "die Mensa.", isCorrect: true, response: "Exactly! The Mensa is the student cafeteria.", kuttanReaction: "Adipoli! Cheap food logic correctly capture cheythallo! 🔥" },
              { text: "der Hörsaal.", isCorrect: false, response: "Aiyyo! That's the lecture hall! You can't eat a full meal during a lecture!", kuttanReaction: "Vite machane! Study logic and food logic separate cheyyanne. Try again! 😬" },
            ],
          },
          {
            moment: "Your colleague says 'Schönen Feierabend!'. What does it mean?",
            options: [
              { text: "Work is done for the day, enjoy your free time.", isCorrect: true, response: "Correct! It's the sacred end of the workday.", kuttanReaction: "Superb! Best German concept correctly noted! ⭐" },
              { text: "Merry Christmas!", isCorrect: false, response: "No! 'Feier' means party/celebration, but 'Feierabend' is specifically for finishing work.", kuttanReaction: "Aiyyo! Every day Christmas alla machane! Just work ending aanu. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v11-2-1",
          title: "Im Büro - Office Vocabulary",
          duration: "12:00",
          description: "Navigate your German office with confidence — essential vocabulary, phrases, and cultural insights",
          scriptOutline: [
            "Opening: 'Büro or Uni, German culture specific aanu! Office first day-kku ready aakaam machane!'",
            "Basics: das Büro, der Schreibtisch (table), der Computer, der Bildschirm (screen).",
            "THE BOSS: der Chef/die Chefin. Remember: Chef is leader, kitchen-il cook alla!",
            "Meeting logic: 'Ich habe eine Besprechung'. Minutes follow cheyyanam!",
            "Phone: 'Guten Tag, hier spricht [Name]'. Direct aayittu identity parayuka.",
            "LAW OF TIME: Pünktlichkeit! On time = already late! 5 mins mumpue reach cheyyanam!",
            "Mittagspause: Sacred lunch break. Schnittchen (sandwich) time-il aareyum disturb cheyyaruthu!",
            "Feierabend: Sacred end of day. 'Schönen Feierabend!' paranjaal pinne work thottu pokaruthu!",
            "Duzen vs Siezen: Always start with 'Sie'. Boss explicitly allow cheyyathe 'Du' parayaruthu!",
            "Small talk: 'Wie war Ihr Wochenende?' (Weekend engane undayirunnu?) — Standard question."
          ],
          keyVocabulary: ["das Büro", "die Besprechung", "der Kollege", "der Chef", "Pünktlichkeit", "Feierabend"],
          learningObjectives: [
            "Name common office objects and roles in German",
            "Use basic workplace phrases for meetings, calls, and emails",
            "Understand key German work culture concepts"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Office Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["das Büro", "office", "ഓഫീസ്"],
                ["der Schreibtisch", "desk", "മേശ"],
                ["der Computer", "computer", "കമ്പ്യൂട്ടർ"],
                ["der Bildschirm", "screen", "സ്ക്രീൻ"],
                ["der Chef / die Chefin", "boss", "ബോസ്"],
                ["die Besprechung", "meeting", "മീറ്റിങ്"],
                ["der Kollege / die Kollegin", "colleague", "സഹപ്രവർത്തകൻ"],
                ["die Mittagspause", "lunch break", "ഉച്ച ഭക്ഷണ ഇടവേള"]
              ]
            },
            {
              type: "note",
              title: "Pünktlichkeit — On Time = Already Late!",
              variant: "warning",
              content: "German work culture worships punctuality! If the meeting is at 10:00, arrive by 09:55. Being late is seen as disrespectful. Also respect 'Feierabend' (end of work) — no emails after hours!"
            },
            {
              type: "note",
              title: "Du vs Sie at Work",
              variant: "info",
              content: "ALWAYS start with 'Sie' (formal you) at work. Only switch to 'Du' (informal) when the boss or senior colleague explicitly offers it. Using 'Du' too early is a social mistake in German offices!"
            }
          ]
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
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "University Vocabulary",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["die Vorlesung", "lecture", "ക്ലാസ്"],
                ["das Seminar", "seminar", "സെമിനാർ"],
                ["die Prüfung", "exam", "പരീക്ഷ"],
                ["die Hausarbeit", "term paper", "പ്രോജക്ട്"],
                ["die Bibliothek", "library", "ലൈബ്രറി"],
                ["die Mensa", "cafeteria", "കാന്റീൻ"],
                ["der Hörsaal", "lecture hall", "ലക്ചർ ഹാൾ"],
                ["das Studentenwohnheim", "student dorm", "ഹോസ്റ്റൽ"]
              ]
            },
            {
              type: "note",
              title: "Semesterticket = Free Transport!",
              variant: "tip",
              content: "Most German universities include a 'Semesterticket' in your tuition fee — free public transport across the city! This alone can save you €200+ per semester. Check your university's specific coverage area."
            },
            {
              type: "vocabulary",
              items: [
                { german: "sich einschreiben", english: "to enroll/register", malayalam: "രജിസ്റ്റർ ചെയ്യുക", pronunciation: "zikh ayn-shry-ben" },
                { german: "die Immatrikulation", english: "enrollment", malayalam: "പ്രവേശനം", pronunciation: "im-ma-tri-ku-la-tsion" },
                { german: "die Lerngruppe", english: "study group", malayalam: "പഠന ഗ്രൂപ്പ്", pronunciation: "lern-groo-pe" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex11-2-1",
          type: "matching",
          question: "First day on the imagined campus — match the places and machines:",
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
          question: "17:00 sharp, and the whole imagined office stands up at once. Kuttan's colleague grins: 'Feierabend!' What just happened?",
          options: ["End of the work day / quitting time", "Holiday party", "Friday evening", "Overtime"],
          correctAnswer: "End of the work day / quitting time",
          explanation: "It's a sacred German concept. It means work is DONE. Your computer is off, and you're officially a private person again. Malayalis used to long hours back home find this refreshing!",
          xpReward: 10
        },
        {
          id: "ex11-2-5",
          type: "free-text",
          question: "Kuttan checks the Goethe exam calendar and gulps. Type the fact in German — 'The exam is next week.' (die Prüfung, nächste Woche):",
          correctAnswer: "Die Prüfung ist nächste Woche",
          explanation: "Subject (Die Prüfung) + Verb (ist) + Time (nächste Woche). A sentence that motivates like nothing else.",
          xpReward: 30
        },
        {
          id: "ex11-2-6",
          type: "type-answer",
          question: "Kuttan's deskmate at the imagined office is Maria — so 'der Kollege' becomes…? Type the feminine form WITH its article:",
          correctAnswer: "die Kollegin",
          explanation: "The masculine -e drops to make room for the feminine -in: der Kollege → die Kollegin.",
          xpReward: 15
        },
        {
          id: "ex11-2-7",
          type: "type-answer",
          question: "Two hours in the Hörsaal and counting: 'Die Vorlesung ___ zwei Stunden.' Type the duration verb (lasts):",
          correctAnswer: "dauert",
          explanation: "'Dauern' is specifically for duration. 'How long does the movie/lecture/flight last?' = Wie lange DAUERT es?",
          xpReward: 15
        },
        {
          id: "ex11-2-9",
          type: "dictation",
          question: "Kuttan asks the receptionist where to go. Listen to her answer and type exactly what you hear.",
          correctAnswer: "Das Büro ist im dritten Stock",
          explanation: "'Stock' means floor — and 'im' = in + dem (Dative). Third floor, no lift, welcome to Germany.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-office-floor.mp3"
        },
        {
          id: "ex11-2-10",
          type: "free-text",
          question: "Kuttan blocks his calendar, German-style. Type it — 'I have a meeting at 10 o'clock.' (die Besprechung, um):",
          correctAnswer: "Ich habe eine Besprechung um 10 Uhr",
          explanation: "'um' is used for exact times. German meetings always start 'pünktlich'!",
          xpReward: 30
        }
      ,
        {
          id: "ex11-2-prod-speaking",
          type: "speaking",
          question: "First day small talk in the imagined office kitchen — say aloud: 'Ich arbeite im Büro.'",
          questionGerman: "Sprechen Sie laut: 'Ich arbeite im Büro.'",
          correctAnswer: "Ich arbeite im Büro",
          explanation: "im Büro = in dem Büro. Short, correct, and the answer to 'Wo arbeiten Sie?' in the exam and in life.",
          audioUrl: "/audio/exercises/ex11-2-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex11-2-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: he announces 'Ich habe eine Besprechung in 10 Uhr.' Clock times take um, not in! Say it right: 'Ich habe eine Besprechung um 10 Uhr.'",
          questionGerman: "Sprechen Sie laut: 'Ich habe eine Besprechung um 10 Uhr.'",
          correctAnswer: "Ich habe eine Besprechung um 10 Uhr",
          explanation: "um for clock times (um 10 Uhr), am for days (am Montag), im for months (im Juli). The um/in swap is a Hören trap too — announcements test exactly this.",
          audioUrl: "/audio/exercises/ex11-2-spk2-model.mp3",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "WG Living Room (The Laptop Screen)",
          sceneType: "home",
          timeOfDay: "evening",
          description: "You're sitting at your desk, laptop open, deep in concentration. You need to write a 'Bewerbung' (application). In Kerala, we might be a bit loose with email structure, but in Germany, it's like a scientific formula. You need a 'Betreff' (subject), a correct greeting, and the 'Anlage' (attachment). Master the block-building approach, machane!",
        },
        narrative: {
          previousRecap: "You've navigated the office corridors. Now, let's master the office communications!",
          currentObjective: "Draft a formal email with the correct structure, greeting, and professional closing",
          nextTeaser: "Next: Skills! Let's talk about what YOU can bring to the table!",
        },
        kuttanIntro: [
          "Machane! German emails-il first step eppozhum correct 'Betreff' (subject) ezhuthaan aanu. Subject line clear aayirunnal mathrame aalukal open cheyyoo.",
          "Greeting logic sradhikkanne: if name ariyamel 'Sehr geehrte Frau [Name]', if name ariyamel 'Sehr geehrte Damen und Herren'. Super formal energy!",
          "Pinne 'Anlage' (attachment) specify cheyyaan marakkaruthu. 'In der Anlage finden Sie...' — gold standard phrase for sending your CV. Let's write it!",
        ],
        vocabEncounters: [
          { vocabId: "vocab11-3-1", encounterMoment: "You type the subject: 'Betreff: Bewerbung'.", contextSentence: "Der Betreff muss klar sein." },
          { vocabId: "vocab11-3-2", encounterMoment: "You start the greeting: 'Sehr geehrte Damen und Herren,'.", contextSentence: "Sehr geehrter Herr Müller, ..." },
          { vocabId: "vocab11-3-7", encounterMoment: "You check the file: 'Die Anlage ist bereit.' (The attachment is ready).", contextSentence: "In der Anlage finden Sie meinen Lebenslauf." },
          { vocabId: "vocab11-3-3", encounterMoment: "You sign off: 'Mit freundlichen Grüßen, Kuttan'.", contextSentence: "Mit freundlichen Grüßen, Anna Schmidt." },
        ],
        decisionPoints: [
          {
            moment: "You are writing to a company but don't know the person's name. What is the correct formal greeting?",
            options: [
              { text: "Sehr geehrte Damen und Herren,", isCorrect: true, response: "Exactly! This is the universal formal greeting when the name is unknown.", kuttanReaction: "Adipoli! Formal logic perfectly capture cheythallo! 🔥" },
              { text: "Hallo zusammen,", isCorrect: false, response: "Aiyyo! 'Hallo zusammen' is too casual for a job inquiry! Use 'Sehr geehrte Damen und Herren'.", kuttanReaction: "Vite machane! Business formal mode-il 'Hallo' use cheyyaruthu. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'Best regards' at the end of a formal email. Which phrase is correct?",
            options: [
              { text: "Mit freundlichen Grüßen.", isCorrect: true, response: "Correct! The gold standard for formal closings.", kuttanReaction: "Superb! Sign-off logic correctly noted! ⭐" },
              { text: "Tschüss!", isCorrect: false, response: "No! 'Tschüss' is 'Bye' for friends. In an email, use 'Mit freundlichen Grüßen'.", kuttanReaction: "Aiyyo! Company-il 'Tschüss' paranjaal serious aayi edukilla. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v11-3-1",
          title: "Formal Email Structure",
          duration: "14:00",
          description: "Master the structure of a formal German email — from greeting to sign-off. University-yilekku apply cheyyaan, job-nu email ayakkaan — ithu must!",
          scriptOutline: [
            "Opening: 'German emails follow a strict building blocks structure. Ithu crack cheyyaam machane!'",
            "Betreff (Subject): Concise venam. Vague aayittu subject ezhutharuthu, HATE aanu!",
            "GREETING: 'Sehr geehrte Frau...' / 'Sehr geehrter Herr...' (Bahumaanappetta energy thanne).",
            "Universal: 'Sehr geehrte Damen und Herren' (if name unknown).",
            "Body: Stay polite, use 'Sie' throughout. No shortcuts like 'Hi/Hey' in formal mode!",
            "Hook: 'Ich schreibe Ihnen bezüglich...' (I am writing regarding...).",
            "Request: 'Könnten Sie mir bitte...' (Can you please help?).",
            "Closing: 'Ich freue mich auf Ihre Antwort' (Look forward to hearing from you).",
            "MfG: 'Mit freundlichen Grüßen' — the gold standard sign-off.",
            "Kerala connection: Letter writing logic same aanu, but words German logic-il venam!"
          ],
          keyVocabulary: ["Sehr geehrte/r", "Betreff", "Mit freundlichen Grüßen", "bezüglich", "Könnten Sie"],
          learningObjectives: [
            "Structure a formal German email correctly",
            "Use appropriate formal greetings and closings",
            "Write a polite request or inquiry email"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Formal Email Structure",
              headers: ["Part", "German", "English"],
              rows: [
                ["Subject", "Betreff: Anfrage bezüglich...", "Subject: Inquiry regarding..."],
                ["Greeting (known)", "Sehr geehrte Frau Müller,", "Dear Ms. Müller,"],
                ["Greeting (unknown)", "Sehr geehrte Damen und Herren,", "Dear Sir/Madam,"],
                ["Opening", "Ich schreibe Ihnen bezüglich...", "I am writing regarding..."],
                ["Request", "Könnten Sie mir bitte...", "Could you please..."],
                ["Closing", "Ich freue mich auf Ihre Antwort.", "I look forward to your reply."],
                ["Sign-off", "Mit freundlichen Grüßen", "With kind regards"]
              ]
            },
            {
              type: "note",
              title: "MfG — The Email Sign-Off",
              variant: "tip",
              content: "'Mit freundlichen Grüßen' (MfG) is the gold standard formal closing. For semi-formal, use 'Viele Grüße' or 'Beste Grüße'. For friends: 'Liebe Grüße' (LG). Never use 'MfG' abbreviation in truly formal emails!"
            },
            {
              type: "note",
              title: "Always Use 'Sie' in Formal Emails",
              variant: "warning",
              content: "In formal emails, use 'Sie' (You) and 'Ihnen' (to You) throughout. Write 'Sie' and 'Ihr' with capital letters to show respect. Switching to 'du' in a formal email is a serious faux pas!"
            }
          ]
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Email Templates by Situation",
              headers: ["Situation", "Greeting", "Key Phrase", "Sign-off"],
              rows: [
                ["To professor", "Sehr geehrte Frau Prof. ...,", "Ich bin Student im Fach...", "MfG"],
                ["To landlord", "Sehr geehrte Damen und Herren,", "Ich interessiere mich für...", "MfG"],
                ["To colleague", "Liebe Frau Schmidt,", "Könnten Sie mir bitte...", "Viele Grüße"],
                ["Job application", "Sehr geehrte Damen und Herren,", "Hiermit bewerbe ich mich...", "MfG"],
                ["To friend", "Hallo [Name]!", "Hast du Lust...?", "LG"]
              ]
            },
            {
              type: "note",
              title: "Formal vs Semi-Formal",
              variant: "tip",
              content: "After a few emails, a German contact may switch from 'Sehr geehrte/r' to 'Liebe/r'. This is a signal that you can also become less formal. Follow their lead — if they use 'Liebe Grüße', you can too!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "hiermit bewerbe ich mich", english: "I hereby apply", malayalam: "ഞാൻ ഇതിനാൽ അപേക്ഷിക്കുന്നു", pronunciation: "heer-mit be-ver-be ikh mikh" },
                { german: "sich interessieren für", english: "to be interested in", malayalam: "താൽപ്പര്യമുണ്ട്", pronunciation: "zikh in-te-re-see-ren foor" }
              ]
            }
          ]
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
          question: "Kuttan signs off his first formal German email, tongue between his teeth: 'Mit freundlichen _____'",
          options: ["Grüßen", "Grüße", "Gruß", "Grüssen"],
          correctAnswer: "Grüßen",
          explanation: "The full phrase is 'Mit freundlichen Grüßen'. In emails, people often shorten it to 'MfG', but in formal writing, always write it out fully.",
          xpReward: 10
        },
        {
          id: "ex11-3-4",
          type: "matching",
          question: "Frau Weber dissects a real German job-application email on the projector. Match each part to its German name:",
          options: ["Subject line", "Dear Mr.", "Kind regards", "Attachment"],
          correctAnswer: ["Betreff", "Sehr geehrter Herr", "Mit freundlichen Grüßen", "die Anlage"],
          explanation: "Crucial vocabulary! If you forget 'Betreff', your email might get filtered as spam. If you forget 'Anlage', they won't look for your CV!",
          xpReward: 15
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
          type: "type-answer",
          question: "Kuttan opens his application for the Ausbildung posting: 'Ich schreibe Ihnen ___ Ihrer Stellenanzeige.' Type the formal word (regarding):",
          correctAnswer: "bezüglich",
          explanation: "'Bezüglich' is the formal way to say 'regarding'. It makes you sound very competent — which is the whole point of a first email.",
          xpReward: 20
        },
        {
          id: "ex11-3-8",
          type: "free-text",
          question: "CV attached, one sentence left to point at it. Type the business-German formula — 'Please find my CV attached.' (die Anlage, der Lebenslauf):",
          correctAnswer: "In der Anlage finden Sie meinen Lebenslauf.",
          explanation: "The standard Business-German formula: 'In der Anlage' = in the attachment, 'finden Sie' = you find, 'Lebenslauf' = life's-run (CV).",
          xpReward: 30
        },
        {
          id: "ex11-3-9",
          type: "dictation",
          question: "Frau Weber dictates the opener for emails to strangers — the one every applicant needs. Listen and type exactly what you hear.",
          correctAnswer: "Sehr geehrte Damen und Herren",
          explanation: "The most formal way to address people when you don't know their names — HR departments read it a hundred times a day.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-email-formal-greeting.mp3"
        },
        {
          id: "ex11-3-10",
          type: "free-text",
          question: "Every formal German email ends the same three words. Kuttan types them without thinking now — you type them too ('Kind regards', formal):",
          correctAnswer: "Mit freundlichen Grüßen",
          explanation: "'Mit freundlichen Grüßen' is the gold standard for formal closings — the Schreiben Teil 2 rubric looks for exactly this frame.",
          xpReward: 30
        }
      ,
        {
          id: "ex11-3-prod-speaking",
          type: "speaking",
          question: "Read your email opener aloud before sending: 'Vielen Dank für Ihre E-Mail.'",
          questionGerman: "Sprechen Sie laut: 'Vielen Dank für Ihre E-Mail.'",
          correctAnswer: "Vielen Dank für Ihre E-Mail",
          explanation: "'Vielen Dank für Ihre E-Mail' opens half of all polite German replies. Capital I in Ihre — it's the formal you.",
          audioUrl: "/audio/exercises/ex11-3-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex11-3-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: he opens his application to an unknown HR person with 'Liebe Damen und Herren'. First contact is 'Sehr geehrte'! Say the correct opener aloud: 'Sehr geehrte Damen und Herren'.",
          questionGerman: "Sprechen Sie laut: 'Sehr geehrte Damen und Herren.'",
          correctAnswer: "Sehr geehrte Damen und Herren",
          explanation: "'Liebe/Lieber' is for people you know; 'Sehr geehrte/geehrter' is for strangers and officials. The Schreiben rubric scores this register choice directly.",
          audioUrl: "/audio/exercises/ex11-3-spk2-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        { id: "vocab11-3-1", german: "der Betreff", english: "subject (of email)", malayalam: "വിഷയം", pronunciation: "beh-tref", example: "Der Betreff muss klar sein.", exampleTranslation: "The subject must be clear." },
        { id: "vocab11-3-2", german: "Sehr geehrte/r", english: "Dear (formal)", malayalam: "ബഹുമാനപ്പെട്ട", pronunciation: "zeyr geh-eyr-te/ter", example: "Sehr geehrter Herr Müller, ...", exampleTranslation: "Dear Mr. Müller, ..." },
        { id: "vocab11-3-3", german: "Mit freundlichen Grüßen", english: "Kind regards", malayalam: "സ്നേഹപൂർവ്വം", pronunciation: "mit froynt-likh-en grue-sen", example: "Mit freundlichen Grüßen, Anna Schmidt.", exampleTranslation: "Kind regards, Anna Schmidt." },
        { id: "vocab11-3-4", german: "Liebe / Lieber", english: "Dear (informal)", malayalam: "പ്രിയ", pronunciation: "lee-be / lee-ber", example: "Liebe Maria, wie geht es dir?", exampleTranslation: "Dear Maria, how are you?" },
        { id: "vocab11-3-5", german: "Viele Grüße", english: "Many greetings / Best wishes", malayalam: "ഒരുപാട് ആശംസകൾ", pronunciation: "fee-le grue-se", example: "Viele Grüße aus Berlin!", exampleTranslation: "Many greetings from Berlin!" },
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
      storyScene: {
        setting: {
          name: "Networking Mixer (Stammtisch)",
          sceneType: "station",
          timeOfDay: "evening",
          description: "You're at a local 'Stammtisch' for professionals. People are exchanging business cards and talking about their 'Erfahrung' (experience). In Kerala, we might be humble about our skills, but here, you need to clearly state 'Ich kann...' (I can...). Whether it's programming or nursing, your 'Fähigkeiten' (abilities) are your currency. Time to pitch yourself, machane!",
        },
        narrative: {
          previousRecap: "You've written the email. Now, let's talk about what's IN that resume!",
          currentObjective: "Describe your professional skills and interests using 'Ich kann...' and 'Ich interessiere mich für...'",
          nextTeaser: "Final lesson: The Job Interview! Let's land that dream job!",
        },
        kuttanIntro: [
          "Machane! Skills parayumpol 'können' (can) enna modal verb aanu nammude main weapon. 'Ich kann Java' or 'Ich kann Blut abnehmen' (I can take blood).",
          "German-il 'Erfahrung' (experience) eppozhum pratheykichu mention cheyyaname. Pinne 'zuverlässig' (reliable) ennu paranjaal boss-inu nalla impression kuttum.",
          "Interests-ine patti samsaarikkan 'sich interessieren für' use cheyyaam. Ithoru reflexive phrase aanu, so 'mich' add cheyyanam. Let's showcase your talents!",
        ],
        vocabEncounters: [
          { vocabId: "vocab11-4-4", encounterMoment: "You say: 'Ich kann gut programmieren.' (I can program well).", contextSentence: "Ich kann drei Sprachen sprechen." },
          { vocabId: "vocab11-4-1", encounterMoment: "Stefan asks: 'Haben Sie Erfahrung?' (Do you have experience?).", contextSentence: "Ich habe viel Erfahrung mit Java." },
          { vocabId: "vocab11-4-6", encounterMoment: "The recruiter notes: 'Er ist sehr zuverlässig.' (He is very reliable).", contextSentence: "Er ist ein sehr zuverlässiger Mitarbeiter." },
          { vocabId: "vocab11-4-7", encounterMoment: "You mention: 'Hier ist mein Zeugnis.' (Here is my certificate).", contextSentence: "Bitte senden Sie Ihre Zeugnisse." },
        ],
        decisionPoints: [
          {
            moment: "You want to say 'I can speak German' using a modal verb. Which structure is correct?",
            options: [
              { text: "Ich kann Deutsch sprechen.", isCorrect: true, response: "Exactly! Modal verb in position 2, main verb (sprechen) at the end.", kuttanReaction: "Adipoli! Sentence structure logic perfectly capture cheythallo! 🔥" },
              { text: "Ich kann sprechen Deutsch.", isCorrect: false, response: "Aiyyo! In German, the action verb 'sprechen' MUST go to the end of the sentence.", kuttanReaction: "Vite machane! Verb-final rule marakkalle! Try again! 😬" },
            ],
          },
          {
            moment: "You want to say 'I am interested in technology'. Which phrase is reflexive?",
            options: [
              { text: "Ich interessiere mich für Technik.", isCorrect: true, response: "Correct! 'mich' makes it reflexive.", kuttanReaction: "Superb! Reflexive grammar logic correctly noted! ⭐" },
              { text: "Ich interessiere für Technik.", isCorrect: false, response: "No! 'Sich interessieren für' is reflexive, so you MUST include 'mich'.", kuttanReaction: "Aiyyo! 'mich' missing aanu machane! Try again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Describing Your Skills",
              headers: ["Structure", "German Example", "English"],
              rows: [
                ["Ich kann + verb", "Ich kann gut programmieren.", "I can program well."],
                ["Ich habe Erfahrung mit + Dativ", "Ich habe Erfahrung mit Programmierung.", "I have experience with programming."],
                ["Ich bin gut in + Dativ", "Ich bin gut in Mathematik.", "I'm good at maths."],
                ["Ich interessiere mich für + Akk.", "Ich interessiere mich für Technik.", "I'm interested in technology."],
                ["Ich spreche fließend...", "Ich spreche fließend Englisch.", "I speak fluent English."]
              ]
            },
            {
              type: "table",
              title: "Soft Skills in German",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["teamfähig", "team-oriented", "ടീം വർക്ക്"],
                ["flexibel", "flexible", "ഫ്ലെക്സിബിൾ"],
                ["pünktlich", "punctual", "സമയനിഷ്ഠ"],
                ["zuverlässig", "reliable", "വിശ്വസനീയം"],
                ["kreativ", "creative", "സർഗ്ഗാത്മകം"]
              ]
            },
            {
              type: "note",
              title: "Confident but Humble",
              variant: "tip",
              content: "In Germany, say 'Ich kann gut programmieren' (I can program well) — not 'Ich bin der Beste!' (I'm the best!). Germans value honest self-assessment. Overconfidence is a turnoff in professional settings."
            }
          ]
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
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Qualifications & Certificates",
              headers: ["German", "English", "Malayalam"],
              rows: [
                ["das Zeugnis", "certificate/transcript", "സർട്ടിഫിക്കറ്റ്"],
                ["der Abschluss", "degree/diploma", "ബിരുദം"],
                ["das Diplom", "diploma", "ഡിപ്ലോമ"],
                ["der Führerschein", "driving license", "ഡ്രൈവിങ് ലൈസൻസ്"],
                ["das Sprachzertifikat", "language certificate", "ഭാഷാ സർട്ടിഫിക്കറ്റ്"],
                ["die Weiterbildung", "further training", "കൂടുതൽ പരിശീലനം"]
              ]
            },
            {
              type: "table",
              title: "German Language Levels",
              headers: ["Level", "What You Can Do", "Required For"],
              rows: [
                ["A1", "Basic greetings, simple phrases", "Family reunion visa"],
                ["A2", "Everyday conversations", "Some Ausbildung programs"],
                ["B1", "Independent communication", "Nursing, most Ausbildung"],
                ["B2", "Complex topics, fluent speech", "University, many jobs"],
                ["C1", "Near-native proficiency", "Medicine, law, teaching"]
              ]
            },
            {
              type: "note",
              title: "Get Everything Documented!",
              variant: "warning",
              content: "Germans value formal certificates above all else. Get your degrees translated (beglaubigte Übersetzung), obtain your Goethe-Zertifikat or telc certificate, and keep everything in a tidy folder. 'Ohne Zeugnis, kein Beweis!' (No certificate, no proof!)"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex11-4-1",
          type: "type-answer",
          question: "At the Kerala Stammtisch prep with Kuttan, you want to say you can program well: 'Ich ___ gut programmieren.' Type the modal verb (can):",
          correctAnswer: "kann",
          explanation: "Können (can) is the modal verb for skills and abilities. Verb 1 (kann) stays at position 2, and Verb 2 (programmieren) goes to the END. The 'Abhibhashaka-Rule' (Verb final).",
          xpReward: 10
        },
        {
          id: "ex11-4-2",
          type: "multiple-choice",
          question: "At the Kerala professionals' Stammtisch, Stefan asks about your CV. How do you say 'I have experience with programming' in German?",
          options: ["Ich habe Erfahrung mit Programmierung.", "Ich kann Erfahrung programmieren.", "Ich bin Erfahrung mit Programmierung.", "Ich mache Erfahrung Programmierung."],
          correctAnswer: "Ich habe Erfahrung mit Programmierung.",
          explanation: "The formula: Ich habe + Erfahrung + mit + [Dativ topic]. Dativ triggers here, but for nouns like Programmierung, it's straightforward.",
          xpReward: 10
        },
        {
          id: "ex11-4-3",
          type: "matching",
          question: "Kuttan is helping you polish a German-style CV in Kerala. Match each skill word to its English meaning:",
          options: ["teamfähig", "zuverlässig", "flexibel", "pünktlich"],
          correctAnswer: ["team-oriented", "reliable", "flexible", "punctual"],
          explanation: "These are 'Adjectives from Heaven' for your German CV. Germans value 'Zuverlässig' (Reliable) above almost everything else!",
          xpReward: 15
        },
        {
          id: "ex11-4-4",
          type: "fill-blank",
          question: "At the Stammtisch practice table, Priya says she is interested in technology. Complete: Ich interessiere _____ für Technik.",
          options: ["mich", "mir", "ich", "mein"],
          correctAnswer: "mich",
          explanation: "'Sich interessieren für' is reflexive. Since the subject is 'Ich', the pronoun MUST be 'mich'. It means 'I interest MYSELF for tech'.",
          xpReward: 10
        },
        {
          id: "ex11-4-5",
          type: "free-text",
          question: "The line every German CV needs — and after this course it'll even be true. Type it: 'I have good German skills.' (Deutschkenntnisse):",
          correctAnswer: "Ich habe gute Deutschkenntnisse",
          explanation: "Subject (Ich) + Verb (habe) + Adjective (gute) + Compound Noun (Deutsch+kenntnisse). Knowledge of German = Deutschkenntnisse.",
          xpReward: 30
        },
        {
          id: "ex11-4-6",
          type: "multiple-choice",
          question: "Frau Weber checks your application folder at Goethe Kochi. What does 'das Zeugnis' mean?",
          options: ["certificate / transcript", "job application", "interview", "contract"],
          correctAnswer: "certificate / transcript",
          explanation: "In Germany, 'Zeugnisse' are a way of life. From school to every job you leave, you get a Zeugnis. No Zeugnis = proof-of-work missing!",
          xpReward: 10
        },
        {
          id: "ex11-4-7",
          type: "type-answer",
          question: "Kuttan points to the education line in your CV draft: 'Ich habe einen Bachelor-___ in Informatik.' Type the missing word (degree):",
          correctAnswer: "Abschluss",
          explanation: "Abschluss literally means 'Closing/Finishing'. It implies you finished the degree successfully. 'Bachelor-Abschluss' is the modern German way to say degree.",
          xpReward: 10
        },
        {
          id: "ex11-4-8",
          type: "type-answer",
          question: "CV verb upgrade: Kuttan knows Java inside out — 'kann' feels too small. Type the master-level verb ('to master a skill'):",
          correctAnswer: "beherrschen",
          explanation: "To master something at a high level. Use this for languages or software you know inside out. 'Ich beherrsche Java.'",
          xpReward: 20
        },
        {
          id: "ex11-4-9",
          type: "dictation",
          question: "Kuttan plays a Stammtisch practice audio — the proudest CV line of all. Listen and type exactly what you hear.",
          correctAnswer: "Ich kann Deutsch sprechen",
          explanation: "Modal verb in position 2, main verb at the end — and a sentence that's about to be true on your CV too.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-can-speak-german.mp3"
        },
        {
          id: "ex11-4-10",
          type: "free-text",
          question: "At the Kerala networking practice, write the German sentence for Priya's line: 'I am interested in computer science.' (computer science = Informatik)",
          correctAnswer: "Ich interessiere mich für Informatik",
          explanation: "'sich interessieren für' is the reflexive phrase you need — and the 'mich' is not optional.",
          xpReward: 30
        }
      ,
        {
          id: "ex11-4-prod-speaking",
          type: "speaking",
          question: "The interviewer asks about languages. Sell yourself aloud: 'Ich kann gut Englisch sprechen.'",
          questionGerman: "Sprechen Sie laut: 'Ich kann gut Englisch sprechen.'",
          correctAnswer: "Ich kann gut Englisch sprechen",
          explanation: "können + skill + infinitive at the end. Swap Englisch for Malayalam, Hindi, Deutsch — your whole skills answer.",
          audioUrl: "/audio/exercises/ex11-4-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex11-4-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: at the Stammtisch he says 'Ich interessiere für Technik.' The mich is not optional! Say it right: 'Ich interessiere mich für Technik.'",
          questionGerman: "Sprechen Sie laut: 'Ich interessiere mich für Technik.'",
          correctAnswer: "Ich interessiere mich für Technik",
          explanation: "'sich interessieren für' is reflexive — German makes you interest YOURSELF in things. Dropping the mich is the most common reflexive slip at A1.",
          audioUrl: "/audio/exercises/ex11-4-spk2-model.mp3",
          xpReward: 25
        }],
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
      storyScene: {
        setting: {
          name: "Conference Room (Besprechungsraum)",
          sceneType: "station",
          timeOfDay: "morning",
          description: "This is it. The big moment. You're sitting in a sleek glass conference room, opposite two interviewers. Your 'Lebenslauf' (CV) is on the table between you. In Kerala, we might be a bit modest, but here, 'Direktheit' (directness) and clarity are valued. You've practiced your intro 100 times. Time to show them the Malayali spirit, machane!",
        },
        narrative: {
          previousRecap: "You've listed your skills. Now, let's defend them in person!",
          currentObjective: "Answer common interview questions confidently and describe your strengths professionally in German",
          nextTeaser: "Module 11 complete! You're professional ready! Next: Module 12 - House and Home!",
        },
        kuttanIntro: [
          "Machane! Interview-il first impression eppozhum correct aayirikkanam. Handshake firm aayirikkanum, but principal rule 'Pünktlichkeit' aanu. 5 mins early reach cheyyanam!",
          "Main question: 'Erzählen Sie etwas über sich' (Tell me about yourself). Name -> Origin -> Studies -> Experience — ee order-il short aayi parayuka.",
          "Pinne 'Stärken' (strengths) chodikumpo 'teamfähig' (team player) and 'zuverlässig' (reliable) ennu parayaan marakkaruthu. Let's land this job!",
        ],
        vocabEncounters: [
          { vocabId: "vocab11-5-1", encounterMoment: "The email says: 'Ihr Vorstellungsgespräch ist um 9 Uhr.'", contextSentence: "Mein Vorstellungsgespräch ist morgen." },
          { vocabId: "vocab11-5-5", encounterMoment: "Interviewer asks: 'Was sind Ihre Stärken?' (What are your strengths?).", contextSentence: "Was sind Ihre Stärken?" },
          { vocabId: "vocab11-5-7", encounterMoment: "You answer: 'Ich bin sehr teamfähig.' (I am very good in a team).", contextSentence: "Ich bin sehr teamfähig." },
          { vocabId: "vocab11-5-10", encounterMoment: "You conclude: 'Ich möchte mich weiterentwickeln.' (I want to further develop myself).", contextSentence: "Ich möchte mich beruflich weiterentwickeln." },
        ],
        decisionPoints: [
          {
            moment: "The interviewer asks 'Erzählen Sie etwas über sich'. How do you start your professional intro?",
            options: [
              { text: "Ich komme aus Kerala, Indien. Ich habe Informatik studiert...", isCorrect: true, response: "Exactly! Start with your origin and education to ground your background.", kuttanReaction: "Adipoli! Intro correct aayi start cheythallo! 🔥" },
              { text: "Ich habe ein Hobby. Ich spiele Fußball.", isCorrect: false, response: "Aiyyo! Hobbies specify cheyyanam, but intro-yil professional points first venam.", kuttanReaction: "Vite machane! Career points first, then personality. Try again! 😬" },
            ],
          },
          {
            moment: "You want to say you are a reliable person. Which word should you use?",
            options: [
              { text: "zuverlässig.", isCorrect: true, response: "Correct! 'Zuverlässig' is one of the most valued traits in Germany.", kuttanReaction: "Superb! Character logic correctly picked! ⭐" },
              { text: "müde.", isCorrect: false, response: "No! 'müde' means tired. Don't say that in an interview!", kuttanReaction: "Aiyyo! Enthina tired ennu parayunnathu? Active aayi irikkaam! Try again! 🚫" },
            ],
          },
        ],
      },
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
          placeholderThumbnail: "/images/job_interview.png",
          richContent: [
            {
              type: "table",
              title: "German Job Application Package",
              headers: ["German", "English", "What It Is"],
              rows: [
                ["die Bewerbung", "application", "The complete package"],
                ["der Lebenslauf", "CV / resume", "Photo + details + experience"],
                ["das Anschreiben", "cover letter", "Why you want this job"],
                ["das Zeugnis", "certificate", "Education & work certificates"],
                ["die Bewerbungsmappe", "application folder", "Everything in one neat folder"]
              ]
            },
            {
              type: "table",
              title: "Interview Flow",
              headers: ["Step", "What Happens"],
              rows: [
                ["1. Greeting", "Firm handshake, eye contact, arrive 5 min early"],
                ["2. Self-intro", "Name → Background → Education → Experience"],
                ["3. Questions", "They ask about skills, motivation, weaknesses"],
                ["4. Your questions", "You ask about team, training, next steps"],
                ["5. Goodbye", "Thank them, firm handshake again"]
              ]
            },
            {
              type: "note",
              title: "Direktheit (Directness) is Key",
              variant: "tip",
              content: "Germans value directness in interviews. Be clear and concise — no beating around the bush. State your qualifications confidently: 'Ich habe drei Jahre Erfahrung in...' Prepare a 2-minute self-introduction!"
            }
          ]
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
          placeholderThumbnail: "/images/job_interview.png",
          richContent: [
            {
              type: "table",
              title: "Common Interview Questions & Sample Answers",
              headers: ["German Question", "English", "Sample Start"],
              rows: [
                ["Erzählen Sie etwas über sich.", "Tell me about yourself.", "Ich komme aus Kerala..."],
                ["Warum möchten Sie hier arbeiten?", "Why do you want to work here?", "Ihre Firma ist führend..."],
                ["Was sind Ihre Stärken?", "What are your strengths?", "Ich bin teamfähig und..."],
                ["Was sind Ihre Schwächen?", "What are your weaknesses?", "Manchmal bin ich zu..."],
                ["Wo sehen Sie sich in 5 Jahren?", "Where do you see yourself in 5 years?", "Ich möchte mich zum..."],
                ["Haben Sie noch Fragen?", "Do you have any questions?", "Wie groß ist das Team?"]
              ]
            },
            {
              type: "note",
              title: "The Weakness Question Trick",
              variant: "tip",
              content: "For 'Was sind Ihre Schwächen?', pick a real weakness but show you're working on it: 'Manchmal bin ich zu perfektionistisch, aber ich lerne, Aufgaben besser zu delegieren.' Never say 'I have no weaknesses'!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "die Gehaltsvorstellung", english: "salary expectation", malayalam: "ശമ്പള പ്രതീക്ഷ", pronunciation: "ge-halts-for-shtel-oong" },
                { german: "sich weiterentwickeln", english: "to develop further", malayalam: "കൂടുതൽ വളരുക", pronunciation: "zikh vy-ter-ent-vik-eln" },
                { german: "die Stärke", english: "strength", malayalam: "ശക്തി", pronunciation: "shtehr-ke" }
              ]
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex11-5-1",
          type: "multiple-choice",
          question: "Mock interview at Goethe Kochi: Frau Weber leans back and opens with 'Erzählen Sie etwas über sich.' What is she asking?",
          options: ["Tell me about yourself", "What are your strengths?", "Why do you want this job?", "Do you have questions?"],
          correctAnswer: "Tell me about yourself",
          explanation: "The standard opening of EVERY interview. It's your time to shine for 2 minutes. Focus on Your Origin -> Studies -> Experience.",
          xpReward: 10
        },
        {
          id: "ex11-5-2",
          type: "type-answer",
          question: "HR replies to Kuttan: 'Bitte senden Sie Ihre vollständigen ___.' — the one word covering CV, cover letter, certificates, everything. Type it (documents):",
          correctAnswer: "Unterlagen",
          explanation: "'Unterlagen' is the whole application bundle: die Bewerbung (application), der Lebenslauf (CV), das Anschreiben (cover letter). When HR asks for Unterlagen, they want it all.",
          xpReward: 20
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
          type: "type-answer",
          question: "Every job ad Kuttan opens demands the same soft-skill word: 'teamfähig'. Type in English what it promises:",
          correctAnswer: "able to work in a team",
          explanation: "'Team-fähig' = Team-capable. It's the most requested soft skill in Germany. Mention it, and you're halfway there!",
          xpReward: 15
        },
        {
          id: "ex11-5-6",
          type: "type-answer",
          question: "Frau Weber fires the classic follow-up: 'Was sind Ihre ___?' Type the missing word (strengths):",
          correctAnswer: "Stärken",
          explanation: "'Stärken' means strengths — and its evil twin 'Schwächen' (weaknesses) usually follows right behind it.",
          xpReward: 15
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
          question: "Interview prep flash round — match each classic question to its German:",
          options: ["What are your weaknesses?", "Where do you see yourself in 5 years?", "Why should we hire you?"],
          correctAnswer: ["Was sind Ihre Schwächen?", "Wo sehen Sie sich in fünf Jahren?", "Warum sollten wir Sie einstellen?"],
          explanation: "These three questions appear in nearly every German interview. Recognize them instantly so your brain can spend its energy on the answer.",
          xpReward: 15
        },
        {
          id: "ex11-5-9",
          type: "dictation",
          question: "The mock interview begins. Frau Weber's opening line is the one every interviewer uses. Listen and type exactly what you hear.",
          correctAnswer: "Erzählen Sie etwas über sich",
          explanation: "The most common invitation to introduce yourself in an interview — hear it, recognize it, and launch your prepared two minutes.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-tell-about-self.mp3"
        },
        {
          id: "ex11-5-10",
          type: "free-text",
          question: "The interviewer flips to Kuttan's CV. Back it up in German — type: 'I have three years of experience.' (die Erfahrung):",
          correctAnswer: "Ich habe drei Jahre Erfahrung",
          explanation: "'Ich habe drei Jahre Erfahrung.' — exactly what employers want to hear, in exactly the word order they want to hear it.",
          xpReward: 30
        }
      ,
        {
          id: "ex11-5-prod-speaking",
          type: "speaking",
          question: "Door opens, interview begins — deliver your opener aloud: 'Guten Tag, mein Name ist Kuttan. Ich komme aus Indien.'",
          questionGerman: "Sprechen Sie laut: 'Guten Tag, mein Name ist Kuttan. Ich komme aus Indien.'",
          correctAnswer: "Guten Tag, mein Name ist Kuttan. Ich komme aus Indien",
          explanation: "Greeting, name, origin — the first ten seconds of every interview and of Sprechen Teil 1. Use your real name.",
          audioUrl: "/audio/exercises/ex11-5-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex11-5-spk2",
          type: "speaking",
          question: "Repair Kuttan's slip: closing the interview he blurts 'Ich will bei Ihrer Firma arbeiten.' — demanding! The interview verb is möchte. Say it right: 'Ich möchte bei Ihrer Firma arbeiten.'",
          questionGerman: "Sprechen Sie laut: 'Ich möchte bei Ihrer Firma arbeiten.'",
          correctAnswer: "Ich möchte bei Ihrer Firma arbeiten",
          explanation: "'will' = I WANT (a toddler's demand); 'möchte' = I would like (a professional's wish). In interviews and in Sprechen Teil 3, möchte wins every time.",
          audioUrl: "/audio/exercises/ex11-5-spk2-model.mp3",
          xpReward: 25
        }],
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
