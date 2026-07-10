import type { Module } from '../types';

export const MODULE_18: Module = {
  id: 18,
  title: "Goethe A1 Exam — Schreiben & Sprechen",
  titleGerman: "Goethe A1 Prüfung — Schreiben & Sprechen",
  description: "Complete your exam prep! Practice writing and speaking in authentic Goethe A1 (Start Deutsch 1) format.",
  icon: "✍️",
  color: "#166534",
  totalHours: 12,
  unlockRequirement: "Complete Module 17",
  learningTips: [
    "For Schreiben: practice writing one short email per day (3-4 sentences). Speed AND accuracy matter on exam day.",
    "For Sprechen: practice with a timer. Part 1 (introduce yourself) should be smooth in under 2 minutes.",
    "Simulate exam conditions: set a timer, no dictionary, quiet room. Your brain needs to practice under pressure.",
  ],
  lessons: [
    // ==================== LESSON 18-1 ====================
    {
      id: "18-1",
      title: "Schreiben Teil 1 — Formulare ausfüllen",
      titleGerman: "Schreiben Teil 1 — Formulare ausfüllen",
      description: "Master Schreiben Teil 1! Practice filling out real German forms — Anmeldeformular, Bibliotheksausweis, and Sprachkurs-Anmeldung with correct date and address formats.",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "Exam Hall (Im Prüfungssaal)",
          sceneType: "office",
          timeOfDay: "morning",
          description: "Silence. Only the sound of pens. You've got an 'Anmeldeformular' (registration form) in front of you. You need to fill in 5 fields using a short text about a person. 'Vorname', 'Nachname', 'Geburtsdatum'... simple copy-paste, right? But wait! The date must be DD.MM.YYYY, and the address must be Street + Number. No mistakes, machane!",
        },
        narrative: {
          previousRecap: "You've mastered the listening and reading. Now, let's show them your writing skills!",
          currentObjective: "Correctly extract personal information from a short text and fill out a German form with 100% accuracy",
          nextTeaser: "Final Writing: The Email challenge! Let's write a perfect 30-word message!",
        },
        kuttanIntro: [
          "Machane! This is the 'Free Marks' section. No complicated grammar, just careful copying from the text into the form.",
          "Check the labels: 'Vorname' is your first name, 'Nachname' or 'Familienname' is your surname. Kerala-il initials mbue varum, but ivide sequence sradhikkuka!",
          "And remember the Golden Date: TT.MM.JJJJ (05.03.1998). Dots use cheyyanam, slashes alla! Let's fill these forms like a pro!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-1-1", encounterMoment: "You look at the paper: 'Bitte füllen Sie das Formular aus.'", contextSentence: "Das Formular ist für die Anmeldung." },
          { vocabId: "vocab18-1-2", encounterMoment: "The examiner says: 'Sie müssen alles ausfüllen.'", contextSentence: "Ich helfe dir beim Ausfüllen." },
          { vocabId: "vocab18-1-3", encounterMoment: "You check the DOB field: 'Ihr Geburtsdatum, bitte.'", contextSentence: "Mein Geburtsdatum ist der 10. Mai." },
          { vocabId: "vocab18-1-5", encounterMoment: "You look for nationality: 'Ihre Staatsangehörigkeit ist indisch.'", contextSentence: "Was ist Ihre Staatsangehörigkeit?" },
        ],
        decisionPoints: [
          {
            moment: "You're filling out a form for 'Arun Krishnan Nair'. Which name goes into the 'Nachname' field?",
            options: [
              { text: "Nair.", isCorrect: true, response: "Exactly! The last name is the 'Nachname' or 'Familienname'.", kuttanReaction: "Adipoli! Name logic perfectly capture cheythallo! 🔥" },
              { text: "Arun Krishnan.", isCorrect: false, response: "Aiyyo! That's the 'Vorname' (First Name). Don't swap them, machaa!", kuttanReaction: "Vite machane! Labels sradhikkuka. Try again! 😬" },
            ],
          },
          {
            moment: "You need to write the date: 7th November 2001. Which format is correct for a German form?",
            options: [
              { text: "07.11.2001.", isCorrect: true, response: "Correct! Day.Month.Year with dots is the German standard.", kuttanReaction: "Superb! Date logic correctly picked! ⭐" },
              { text: "11/07/2001.", isCorrect: false, response: "No! Slashes are for English. Use dots in Germany, or they'll think you were born in July!", kuttanReaction: "Aiyyo! Date mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-1-1",
          title: "Exam Writing Part 1 - Form Filling",
          duration: "10:00",
          description: "Learn exactly how to fill out German forms in the Goethe A1 exam — what each field means and common mistakes to avoid.",
          scriptOutline: [
            "Opening: 'Schreiben Teil 1 — nammude personal details fill cheyyunnathu pole thanne. Address-um date-um German format-il aakanam, athrem mathi. Free marks machane!'",
            "Task: You get a small situation and a form. 5 fields fill cheyyanam using the info from the text.",
            "Form Terms: Vorname (First Name), Nachname (Surname), PLZ (Pincode), Ort (City), Geburtsdatum (DOB).",
            "DATE LOGIC: TT.MM.JJJJ (05.03.1998). Dots use cheyyanam, slashes alla! Germany-il idh aanu standard.",
            "ADDRESS: Straße + Number FIRST, then PLZ + City. Sequence maariyaal confusion aakum.",
            "Staatsangehörigkeit: 'indisch' or 'Indien' (usually adjective preferred).",
            "Common Pitfall: Reading 'Priya Menon' and writing 'Priya' in Nachname. Surname focus cheyyanam!",
            "Strategy: Text-il ulla EXACT words match cheyithu form-ilekku copy-paste cheyuka.",
            "Closing: 'Ithu full score edukkan ulla section aanu. No spelling mistakes, just copy carefully!'"
          ],
          keyVocabulary: ["das Formular", "ausfüllen", "der Vorname", "der Nachname", "das Geburtsdatum", "die Adresse"],
          learningObjectives: [
            "Understand common German form types and their fields",
            "Fill in personal information correctly in German format",
            "Use the correct German date format (TT.MM.JJJJ)",
            "Write German addresses in correct format (Straße Nr, PLZ Stadt)"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Schreiben Teil 1 — Form Fields",
              headers: ["Field", "German", "Example"],
              rows: [
                ["First name", "Vorname", "Arun Krishnan"],
                ["Surname", "Nachname / Familienname", "Nair"],
                ["Date of birth", "Geburtsdatum", "05.03.1998"],
                ["Place of birth", "Geburtsort", "Kochi"],
                ["Nationality", "Staatsangehörigkeit", "indisch"],
                ["Address", "Adresse", "Mozartstr. 12, 10115 Berlin"]
              ]
            },
            {
              type: "note",
              title: "Free Marks Section!",
              variant: "tip",
              content: "Schreiben Teil 1 is the EASIEST section. Just copy information from the text into the correct form fields. No spelling mistakes, correct date format (TT.MM.JJJJ), and you get full marks!"
            },
            {
              type: "note",
              title: "Vorname vs Nachname",
              variant: "warning",
              content: "Vorname = first/given name. Nachname = family/surname. If you are 'Priya Menon', Vorname = Priya, Nachname = Menon. Don't swap them!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-1-1",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Volkshochschule Berlin\n\nYou are registering for a German course. Your name is Arun Krishnan Nair.\n\nForm field: 'Vorname' → ___",
          options: ["Arun Krishnan", "Nair", "Arun Krishnan Nair", "Krishnan"],
          correctAnswer: "Arun Krishnan",
          imageUrl: "/images/university_library.png",
          explanation: "Point Check: 'Vorname' is your First Name (Arun Krishnan). Your family name/surname is the 'Nachname' (Nair). Don't swap them, or the system might call you 'Mr. Arun' instead of 'Mr. Nair'!",
          xpReward: 12
        },
        {
          id: "ex18-1-2",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Volkshochschule Berlin\n\nYou are Priya Menon, born 23rd March 1999.\n\nForm field: 'Familienname' → ___",
          options: ["Menon", "Priya", "Priya Menon", "Nair"],
          correctAnswer: "Menon",
          explanation: "'Familienname' is just another word for 'Nachname'. In Kerala, we often put initials first, but in Germany, the family name is the big one. Here, it's 'Menon'.",
          xpReward: 12
        },
        {
          id: "ex18-1-3",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Sprachkurs\n\nYou were born on 7th November 2001.\n\nForm field: 'Geburtsdatum' → ___",
          options: ["07.11.2001", "11.07.2001", "7/11/2001", "2001-11-07"],
          correctAnswer: "07.11.2001",
          explanation: "The Golden Format: Day.Month.Year (TT.MM.JJJJ). If you write 11.07, they will think you were born in July! Use dots, not slashes.",
          xpReward: 12
        },
        {
          id: "ex18-1-4",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Stadtbibliothek München\n\nYou live at Schillerstraße 24 in München. The postal code is 80336.\n\nForm field: 'Straße, Hausnummer' → ___",
          options: ["Schillerstraße 24", "24 Schillerstraße", "80336 München", "München Schillerstraße"],
          correctAnswer: "Schillerstraße 24",
          explanation: "Street Logic: In Germany, it's [Name] + [Number]. Schillerstraße 24. No commas needed between them on this line!",
          xpReward: 12
        },
        {
          id: "ex18-1-5",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Stadtbibliothek München\n\nYou live at Schillerstraße 24, 80336 München.\n\nForm field: 'PLZ, Ort' → ___",
          options: ["80336 München", "Schillerstraße 24", "München 80336", "80336"],
          correctAnswer: "80336 München",
          explanation: "PLZ is your Pincode. 'Ort' is your City. 80336 München. Always 5 digits for the PLZ in Germany!",
          xpReward: 12
        },
        {
          id: "ex18-1-6",
          type: "multiple-choice",
          question: "📋 ANMELDEFORMULAR — Sprachschule\n\nYou see the field 'Geburtsort'. What should you write here?",
          options: ["Your date of birth", "The city where you were born", "Your current address", "Your nationality"],
          correctAnswer: "The city where you were born",
          explanation: "'Ort' = Place. 'Geburt' = Birth. So, 'Geburtsort' is your birthplace. E.g., Kochi, Thrissur, etc.",
          xpReward: 12
        },
        {
          id: "ex18-1-7",
          type: "fill-blank",
          question: "📋 SPRACHKURS-ANMELDUNG — Goethe-Institut\n\nYou are a software engineer (male).\n\nForm field: 'Beruf' → ___",
          options: ["Softwareentwickler", "Software", "Ingenieur", "Programm"],
          correctAnswer: "Softwareentwickler",
          explanation: "Professional Vocabulary: 'Beruf' is your job. Softwareentwickler is the common term. Don't just write 'IT' or 'Software'—be specific!",
          xpReward: 12
        },
        {
          id: "ex18-1-8",
          type: "multiple-choice",
          question: "📋 ANMELDEFORMULAR\n\nThe form asks for 'Staatsangehörigkeit'. You are from India. What do you write?",
          options: ["Indien", "indisch", "Inder", "India"],
          correctAnswer: "indisch",
          explanation: "Citizenship Rule: Use the adjective (indisch) or the noun for the people (Inder). 'Indien' is the country. A1 usually prefers 'indisch'.",
          xpReward: 12
        },
        {
          id: "ex18-1-9",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Antrag\n\nForm field: 'Telefonnummer' — Your German mobile number is 0152 3847 6521.\n\nWhat do you write? → ___",
          options: ["0152 3847 6521", "3847 6521", "+49 152 3847 6521", "0152"],
          correctAnswer: "0152 3847 6521",
          explanation: "Mobile Format: Start with the zero (0152...). It's the standard way to write your local mobile number on a German form.",
          xpReward: 12
        },
        {
          id: "ex18-1-10",
          type: "multiple-choice",
          question: "📋 SPRACHKURS-ANMELDUNG\n\nThe form has a field: 'Geschlecht: □ männlich □ weiblich □ divers'\n\nWhat does this field ask?",
          options: ["Your age", "Your gender", "Your marital status", "Your profession"],
          correctAnswer: "Your gender",
          explanation: "'Geschlecht' is Gender. Männlich (Male) or Weiblich (Female). 'Divers' is the German legal term for non-binary/other. You tick the appropriate box. Don't confuse with 'Familienstand' (marital status).",
          xpReward: 12
        },
        {
          id: "ex18-1-11",
          type: "free-text",
          question: "Type your first name as it would appear in the 'Vorname' field (e.g., Arun Krishnan):",
          correctAnswer: "Arun Krishnan",
          explanation: "Wunderbar! Remember, 'Vorname' is your first name(s).",
          xpReward: 30
        },
        {
          id: "ex18-1-12",
          type: "free-text",
          question: "Type today's date in German format (TT.MM.JJJJ) - e.g., 27.03.2024:",
          correctAnswer: "27.03.2024",
          explanation: "Perfect! Always use dots and the DD.MM.YYYY order in Germany.",
          xpReward: 30
        },
        {
          id: "ex18-1-13",
          type: "free-text",
          question: "Type your city of birth as it would appear in the 'Geburtsort' field (e.g., Kochi):",
          correctAnswer: "Kochi",
          explanation: "Wunderbar! 'Geburtsort' = Place of birth.",
          xpReward: 30
        }
      ,
        {
          id: "ex18-1-prod-speaking",
          type: "speaking",
          question: "Read the form fields aloud like a pre-flight checklist: 'Vorname, Nachname, Straße, Wohnort.'",
          questionGerman: "Sprechen Sie laut: 'Vorname, Nachname, Straße, Wohnort.'",
          correctAnswer: "Vorname, Nachname, Straße, Wohnort",
          explanation: "Vorname = first name, Nachname = family name — the #1 swap error on real forms. Saying the labels kills the confusion.",
          audioUrl: "/audio/exercises/ex18-1-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex18-1-prod-dictation",
          type: "dictation",
          question: "At the Goethe Kochi writing desk, Kuttan plays a polite A1 help sentence. Listen and type the sentence you hear.",
          audioUrl: "/audio/hoeren/module-18/ex18-1-prod-dictation.mp3",
          correctAnswer: "Können Sie mir bitte helfen",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab18-1-1",
          german: "das Formular",
          english: "the form",
          malayalam: "ഫോം",
          pronunciation: "dahs for-moo-lahr",
          example: "Bitte füllen Sie das Formular aus.",
          exampleTranslation: "Please fill out the form."
        },
        {
          id: "vocab18-1-2",
          german: "ausfüllen",
          english: "to fill out",
          malayalam: "പൂരിപ്പിക്കുക",
          pronunciation: "ows-fü-len",
          example: "Füllen Sie bitte das Anmeldeformular aus.",
          exampleTranslation: "Please fill out the registration form."
        },
        {
          id: "vocab18-1-3",
          german: "das Geburtsdatum",
          english: "the date of birth",
          malayalam: "ജനനത്തീയതി",
          pronunciation: "dahs ge-boorts-dah-toom",
          example: "Mein Geburtsdatum ist der 10.05.1998.",
          exampleTranslation: "My date of birth is 10th May 1998."
        },
        {
          id: "vocab18-1-4",
          german: "die Postleitzahl (PLZ)",
          english: "the postal code",
          malayalam: "പോസ്റ്റൽ കോഡ്",
          pronunciation: "dee post-lyt-tsahl",
          example: "Die Postleitzahl von München ist 80331.",
          exampleTranslation: "The postal code of Munich is 80331."
        },
        {
          id: "vocab18-1-5",
          german: "die Staatsangehörigkeit",
          english: "the nationality",
          malayalam: "പൗരത്വം",
          pronunciation: "dee shtahts-an-ge-hö-rikh-kyt",
          example: "Meine Staatsangehörigkeit ist indisch.",
          exampleTranslation: "My nationality is Indian."
        }
      ]
    },

    // ==================== LESSON 18-2 ====================
    {
      id: "18-2",
      title: "Schreiben Teil 2 — Kurze Nachrichten",
      titleGerman: "Schreiben Teil 2 — Kurze Nachrichten schreiben",
      description: "Master Schreiben Teil 2! Write short messages of about 30 words responding to real exam prompts — each with 3 Inhaltspunkte to address.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Exam Hall (Im Prüfungssaal)",
          sceneType: "office",
          timeOfDay: "morning",
          description: "The final writing task! You have to write an email (around 30 words) based on 3 points. You're writing to your teacher, Frau Müller, because you can't come to class. You're sick. You're asking for homework. You remember the golden rule: Apologize, give a reason, and make a request. Informal vs formal greetings... 'Liebe Frau Müller' or 'Sehr geehrte...'? You've got this, machane!",
        },
        narrative: {
          previousRecap: "Forms are filled! Now, let's flex those sentence-building muscles!",
          currentObjective: "Write a short, grammatically correct German email that addresses all three provided content points accurately",
          nextTeaser: "Final Score: Speaking! Let's introduce ourselves to the examiners!",
        },
        kuttanIntro: [
          "Machane! This is where we show off our writing. 30 words ezhuthiyaal mathi, but those 30 words must hit 3 target points (Inhaltspunkte).",
          "One point miss aayaal marks pokum. Each point-inum oru sentence ezhuthaname! Keep it simple—subject, verb, object.",
          "Check the audience: If it's a friend, use 'Lieber/Liebe'. If it's a teacher or landlord, go formal with 'Sehr geehrte...'. Let's draft a perfect message!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-2-1", encounterMoment: "You look at the prompt: 'Schreiben Sie eine Nachricht.'", contextSentence: "Die Nachricht ist sehr kurz." },
          { vocabId: "vocab18-2-2", encounterMoment: "You start the email: 'Ich möchte mich entschuldigen.'", contextSentence: "Sie müssen sich beim Lehrer entschuldigen." },
          { vocabId: "vocab18-2-3", encounterMoment: "You write to a friend: 'Vielen Dank für die Einladung.'", contextSentence: "Ich sende dir eine Einladung." },
          { vocabId: "vocab18-2-4", encounterMoment: "You check your points: 'Drei Inhaltspunkte sind wichtig.'", contextSentence: "Beachten Sie alle Inhaltspunkte." },
        ],
        decisionPoints: [
          {
            moment: "📋 Situation: You're inviting Max to dinner on Saturday. You need to thank him for helping you move, invite him, and ask what he likes to eat. Which sentence covers the food part correctly?",
            options: [
              { text: "Was isst du gern?", isCorrect: true, response: "Exactly! A direct question about his preference.", kuttanReaction: "Adipoli! Food logic perfectly capture cheythallo! 🔥" },
              { text: "Was machen wir am Samstag?", isCorrect: false, response: "Aiyyo! That's too general. You specifically need to ask about what he eats, machaa!", kuttanReaction: "Vite machane! Prompt sradhikkuka. Try again! 😬" },
            ],
          },
          {
            moment: "You're writing to your friend Tom. Which greeting is correct?",
            options: [
              { text: "Lieber Tom.", isCorrect: true, response: "Correct! 'Lieber' for boys, 'Liebe' for girls. Simple gender logic.", kuttanReaction: "Superb! Greeting logic correctly picked! ⭐" },
              { text: "Sehr geehrter Tom.", isCorrect: false, response: "No! 'Sehr geehrter' is too formal for a friend, machaa! Sounds weird.", kuttanReaction: "Aiyyo! Tone mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-2-1",
          title: "Writing Short Messages & Emails",
          duration: "10:00",
          description: "Learn the structure and strategy for writing a 30-word message in the Goethe A1 Schreiben Teil 2.",
          scriptOutline: [
            "Opening: 'Email writing time! 30 words ezhuthiyaal mathi, but those 30 words must hit 3 target points.'",
            "Task: You get 3 Inhaltspunkte (content points). Ovvoru point-inum oru sentence ezhuthaname!",
            "STRUCTURE: Anrede (Greeting) + Body (3 points) + Gruß (Closing) + Signature.",
            "Formal: 'Sehr geehrte Damen und Herren' + 'Mit freundlichen Grüßen'. Vermieter/Doctor-inu best choice.",
            "Informal: 'Lieber/Liebe...' + 'Viele Grüße'. Friends or colleagues-inu use cheyyaam.",
            "Logic: Don't over-explain! Grammatical accuracy-nu aanu priority, complexity-kk alla.",
            "Sample: Cancel a doctor's appointment. (1) Cancel, (2) Reason (sick), (3) Ask for new time. Simple sentences!",
            "Tips: Comma after greeting means the NEXT word starts with SMALL letter (unless it's a Noun). Watch out!",
            "Closing: 'Simple sentences, all 3 points covered — athrem mathi for full marks! Adipoli!'"
          ],
          keyVocabulary: ["die Nachricht", "die Einladung", "absagen", "sich entschuldigen", "vorschlagen"],
          learningObjectives: [
            "Understand the Schreiben Teil 2 exam format with 3 Inhaltspunkte",
            "Write a short message addressing all 3 required points",
            "Use appropriate greetings (Anrede) and closings (Gruß)",
            "Keep within the 30-word target"
          ],
          placeholderThumbnail: "/images/office_building.png",
          richContent: [
            {
              type: "table",
              title: "Schreiben Teil 2 — Email Structure",
              headers: ["Part", "Formal", "Informal"],
              rows: [
                ["Greeting", "Sehr geehrte Damen und Herren,", "Lieber Tom, / Liebe Anna,"],
                ["Point 1", "(e.g., apologize / cancel)", "(e.g., apologize / cancel)"],
                ["Point 2", "(e.g., give reason)", "(e.g., give reason)"],
                ["Point 3", "(e.g., ask / suggest)", "(e.g., ask / suggest)"],
                ["Closing", "Mit freundlichen Grüßen", "Viele Grüße"]
              ]
            },
            {
              type: "note",
              title: "3 Points = Full Marks!",
              variant: "warning",
              content: "You MUST address all 3 Inhaltspunkte (content points). Missing even one point costs you marks. Write one sentence per point — simple and grammatically correct is better than complex and wrong."
            },
            {
              type: "note",
              title: "Gender in Greetings",
              variant: "tip",
              content: "'Lieber' for male recipients (Lieber Tom), 'Liebe' for female recipients (Liebe Anna). After the comma, the next word starts with a SMALL letter (unless it's a noun)."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-2-1",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2 — Prüfungsaufgabe\n\nSituation: Sie können morgen nicht zum Deutschkurs kommen.\n\nSchreiben Sie eine Nachricht an Ihre Lehrerin Frau Müller.\n— sich entschuldigen\n— Grund nennen (krank)\n— nach Hausaufgaben fragen\n\nWhich message addresses ALL 3 Inhaltspunkte correctly?",
          options: [
            "Liebe Frau Müller, es tut mir leid, ich kann morgen nicht zum Kurs kommen. Ich bin leider krank. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Vielen Dank und viele Grüße, Arun",
            "Hallo Frau Müller, ich bin krank. Tschüss.",
            "Sehr geehrte Frau Müller, ich komme morgen nicht. Viele Grüße.",
            "Liebe Frau Müller, ich möchte eine Pizza bestellen. Können Sie mir helfen? Danke!"
          ],
          correctAnswer: "Liebe Frau Müller, es tut mir leid, ich kann morgen nicht zum Kurs kommen. Ich bin leider krank. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Vielen Dank und viele Grüße, Arun",
          explanation: "The 3-Point Rule: To get full marks, you MUST cover all three prompts. (1) Apology ('es tut mir leid'), (2) Reason ('krank'), (3) Request ('Hausaufgaben schicken'). This option hits all three perfectly with a polite tone.",
          xpReward: 15
        },
        {
          id: "ex18-2-2",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou are writing to your friend Tom to invite him to dinner.\n\nComplete the greeting: '___ Tom, ich möchte dich zum Abendessen einladen.'",
          options: ["Lieber", "Liebe", "Sehr geehrter", "Hallo"],
          correctAnswer: "Lieber",
          explanation: "Gender Matching: Use 'Lieber' for boys (Tom) and 'Liebe' for girls (Anna). It's like 'Priya pettu' vs 'Priya petta' in Malayalam—gender matters for the ending!",
          xpReward: 15
        },
        {
          id: "ex18-2-3",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2 — Prüfungsaufgabe\n\nSituation: Ihr Freund Max hat Ihnen bei Ihrem Umzug geholfen.\n\nSchreiben Sie eine Nachricht an Max.\n— sich bedanken\n— zum Essen einladen (Samstag)\n— fragen: was er gern isst\n\nWhich message is correct?",
          options: [
            "Lieber Max, vielen Dank für deine Hilfe beim Umzug! Ich möchte dich am Samstag zum Essen einladen. Was isst du gern? Liebe Grüße, Priya",
            "Lieber Max, danke. Samstag. Essen. Grüße.",
            "Sehr geehrter Herr Max, mit freundlichen Grüßen.",
            "Lieber Max, ich brauche Hilfe beim Umzug am Samstag. Kannst du kommen? Viele Grüße, Priya"
          ],
          correctAnswer: "Lieber Max, vielen Dank für deine Hilfe beim Umzug! Ich möchte dich am Samstag zum Essen einladen. Was isst du gern? Liebe Grüße, Priya",
          explanation: "Coverage is Key: You thanked him, invited him for Saturday, and asked his preference. Option B is too short (robot style), and Option C is way too formal for a friend named Max.",
          xpReward: 15
        },
        {
          id: "ex18-2-4",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou want to apologize for not coming: 'Es tut mir ___, ich kann leider nicht kommen.'",
          options: ["leid", "Leid", "schlecht", "traurig"],
          correctAnswer: "leid",
          explanation: "The Fixed Phrase: 'Es tut mir leid' (I am sorry). This is your bread and butter for cancelling plans in the exam. Small 'l' for 'leid' here!",
          xpReward: 15
        },
        {
          id: "ex18-2-5",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2 — Prüfungsaufgabe\n\nSituation: Sie haben eine Anzeige für eine Wohnung gelesen.\n\nSchreiben Sie an den Vermieter.\n— sich vorstellen (Name, Beruf)\n— Informationen über die Wohnung erfragen (Größe)\n— einen Besichtigungstermin vorschlagen\n\nWhich greeting is appropriate here?",
          options: [
            "Lieber Vermieter",
            "Hi!",
            "Sehr geehrte Damen und Herren",
            "Hallo Freund"
          ],
          correctAnswer: "Sehr geehrte Damen und Herren",
          explanation: "Formality Trap: If you're writing to a 'Vermieter' (landlord) you don't know, 'Sehr geehrte Damen und Herren' is the gold standard. It's safe and professional.",
          xpReward: 15
        },
        {
          id: "ex18-2-6",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2 — Prüfungsaufgabe\n\nSituation: Sie haben einen Arzttermin am Montag um 14 Uhr, aber Sie können nicht kommen.\n\nSchreiben Sie an die Arztpraxis.\n— Termin absagen\n— Grund nennen\n— neuen Termin vorschlagen (Mittwoch)\n\nWhich message covers all 3 points?",
          options: [
            "Sehr geehrte Damen und Herren, ich muss leider meinen Termin am Montag um 14 Uhr absagen. Ich muss an dem Tag arbeiten. Kann ich am Mittwoch kommen? Mit freundlichen Grüßen, Rahul Nair",
            "Hallo, ich komme Montag nicht. Tschüss!",
            "Lieber Arzt, ich bin krank. Viele Grüße.",
            "Sehr geehrte Damen und Herren, ich möchte eine Wohnung mieten. Mit freundlichen Grüßen."
          ],
          correctAnswer: "Sehr geehrte Damen und Herren, ich muss leider meinen Termin am Montag um 14 Uhr absagen. Ich muss an dem Tag arbeiten. Kann ich am Mittwoch kommen? Mit freundlichen Grüßen, Rahul Nair",
          explanation: "Clarity over Speed: You cancelled the specific slot, gave the reason ('arbeiten'), and proposed the new day (Wednesday). This is a 5/5 score message.",
          xpReward: 15
        },
        {
          id: "ex18-2-7",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou want to suggest meeting on a different day: 'Können wir ___ am Freitag treffen?'",
          options: ["uns", "sich", "euch", "mich"],
          correctAnswer: "uns",
          explanation: "'Können wir uns treffen?' = Can we meet? 'sich treffen' is a reflexive verb — you need 'uns' (ourselves) for 'wir'. This is a very useful phrase for suggesting alternatives in Schreiben Teil 2.",
          xpReward: 15
        },
        {
          id: "ex18-2-8",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2\n\nWhich closing is correct for a FORMAL message (e.g., to a Vermieter or Arztpraxis)?",
          options: ["Viele Grüße", "Liebe Grüße", "Mit freundlichen Grüßen", "Tschüss"],
          correctAnswer: "Mit freundlichen Grüßen",
          explanation: "'Mit freundlichen Grüßen' = With kind regards — this is the standard formal closing. 'Viele Grüße' and 'Liebe Grüße' are informal (for friends). 'Tschüss' is too casual for written messages.",
          xpReward: 15
        },
        {
          id: "ex18-2-9",
          type: "multiple-choice",
          question: "📝 SCHREIBEN TEIL 2 — Prüfungsaufgabe\n\nSituation: Ihre Freundin Sara hat Geburtstag am Samstag.\n\nSchreiben Sie eine Nachricht an Sara.\n— zum Geburtstag gratulieren\n— sagen: Sie bringen einen Kuchen mit\n— fragen: wann die Party beginnt\n\nWhich message is best?",
          options: [
            "Liebe Sara, herzlichen Glückwunsch zum Geburtstag! Ich bringe einen Kuchen mit. Um wie viel Uhr beginnt die Party? Liebe Grüße, Meera",
            "Liebe Sara, alles Gute! Tschüss.",
            "Sehr geehrte Sara, mit freundlichen Grüßen.",
            "Liebe Sara, ich kann nicht kommen. Es tut mir leid. Viele Grüße."
          ],
          correctAnswer: "Liebe Sara, herzlichen Glückwunsch zum Geburtstag! Ich bringe einen Kuchen mit. Um wie viel Uhr beginnt die Party? Liebe Grüße, Meera",
          explanation: "All 3 Inhaltspunkte: (1) gratulieren — 'herzlichen Glückwunsch', (2) Kuchen — 'ich bringe einen Kuchen mit', (3) fragen — 'Um wie viel Uhr beginnt die Party?' Natural, informal tone for a friend.",
          xpReward: 15
        },
        {
          id: "ex18-2-10",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou want to change an appointment: 'Ich möchte meinen Termin gern ___.'",
          options: ["verschieben", "absagen", "machen", "bestätigen"],
          correctAnswer: "verschieben",
          explanation: "'verschieben' = to postpone/reschedule. 'Ich möchte meinen Termin verschieben' = I would like to reschedule my appointment. Very common in Schreiben Teil 2 tasks about changing plans.",
          xpReward: 15
        },
        {
          id: "ex18-2-11",
          type: "dictation",
          question: "Kuttan replays a short message opening after the Goethe Kochi writing mock. Listen and type: Liebe Maria, wie geht es dir?",
          correctAnswer: "Liebe Maria wie geht es dir",
          explanation: "Great! This is the standard informal greeting and opening for an email.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-greeting.mp3"
        },
        {
          id: "ex18-2-12",
          type: "free-text",
          question: "Write in German: 'I am coming on Saturday.' (Saturday = Samstag)",
          correctAnswer: "Ich komme am Samstag",
          explanation: "Wunderbar! 'am' is used for days of the week.",
          xpReward: 30
        },
        {
          id: "ex18-2-13",
          type: "free-text",
          question: "Write in German: 'I am sorry, I am sick.' (sorry = leid, sick = krank)",
          correctAnswer: "Es tut mir leid ich bin krank",
          explanation: "Excellent! A perfect way to cancel an appointment.",
          xpReward: 30
        },
        {
          id: "ex18-2-14",
          type: "free-text",
          question: "Write in German: 'Can we meet at 6 PM?' (6 PM = 18 Uhr)",
          correctAnswer: "Können wir uns um 18 Uhr treffen",
          explanation: "Wunderbar! Using 'um' and 'treffen' correctly.",
          xpReward: 30
        }
      ,
        {
          id: "ex18-2-prod-speaking",
          type: "speaking",
          question: "The three points are the whole game. Say the rule aloud: 'Ich schreibe zu allen drei Punkten.'",
          questionGerman: "Sprechen Sie laut: 'Ich schreibe zu allen drei Punkten.'",
          correctAnswer: "Ich schreibe zu allen drei Punkten",
          explanation: "Miss one content point and the message fails, however pretty the German. All three points, every time.",
          audioUrl: "/audio/exercises/ex18-2-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab18-2-1",
          german: "die Nachricht",
          english: "the message",
          malayalam: "സന്ദേശം",
          pronunciation: "dee nahkh-rikht",
          example: "Ich schreibe eine kurze Nachricht.",
          exampleTranslation: "I am writing a short message."
        },
        {
          id: "vocab18-2-2",
          german: "sich entschuldigen",
          english: "to apologize",
          malayalam: "മാപ്പ് പറയുക",
          pronunciation: "zikh ent-shool-di-gen",
          example: "Ich möchte mich für die Verspätung entschuldigen.",
          exampleTranslation: "I would like to apologize for the delay."
        },
        {
          id: "vocab18-2-3",
          german: "die Einladung",
          english: "the invitation",
          malayalam: "ക്ഷണം",
          pronunciation: "dee ayn-lah-doong",
          example: "Vielen Dank für die Einladung zum Abendessen!",
          exampleTranslation: "Thank you very much for the dinner invitation!"
        },
        {
          id: "vocab18-2-4",
          german: "der Inhaltspunkt",
          english: "the content point",
          malayalam: "ഉള്ളടക്ക പോയിന്റ്",
          pronunciation: "dehr in-halts-poonkt",
          example: "Sie müssen drei Inhaltspunkte in der Nachricht ansprechen.",
          exampleTranslation: "You must address three content points in the message."
        }
      ]
    },

    // ==================== LESSON 18-3 ====================
    {
      id: "18-3",
      title: "Sprechen Teil 1 — Sich vorstellen",
      titleGerman: "Sprechen Teil 1 — Sich vorstellen",
      description: "Nail Sprechen Teil 1! Practice self-introductions covering Name, Alter, Land, Sprachen, Beruf, Wohnort, Familie, and Hobbys — with topic cards just like the real exam.",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "Speaking Room (Im Prüfungszimmer)",
          sceneType: "office",
          timeOfDay: "afternoon",
          description: "You're in a quiet room with 3 other candidates and 2 examiners. It's your turn. 'Bitte stellen Sie sich vor.' You take a deep breath. 'Ich heiße Kuttan, ich bin 25 Jahre alt, ich komme aus Indien...'. You follow the 7 points: Name, Age, Country, City, Languages, Profession, Hobbies. Then, the examiner asks you to spell your name. 'K-U-T-T-A-N'. Perfect. Then your phone number. 'Null-Eins-Fünf...'. You're speaking German, machane!",
        },
        narrative: {
          previousRecap: "Writing is done! Now, let's let the world hear your German voice!",
          currentObjective: "Introduce yourself fluently covering all 7 required topics and respond correctly to basic personal questions",
          nextTeaser: "Final Challenge: Interaction! Let's ask and answer questions with our partners!",
        },
        kuttanIntro: [
          "Machane! This is your 'Grand Entry'. Nammale patti full fluently parayanam. Mirror practice cheythathu ippol helpful aakum!",
          "The examiners are friendly. Don't rush. One sentence for each point. 'Ich heiße...', 'Ich komme aus...', 'Ich wohne in...'. Simple and clear.",
          "Watch out for the 'Spelling Trap'. If they say 'Buchstabieren Sie bitte!', spell your name slowly. A-B-C-D... ready aayirikkiu!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-3-1", encounterMoment: "The examiner says: 'Bitte stellen Sie sich vor.'", contextSentence: "Können Sie sich vorstellen?" },
          { vocabId: "vocab18-3-2", encounterMoment: "You look at the list: 'Hier ist Ihr Steckbrief.'", contextSentence: "Der Steckbrief hat alle Informationen." },
          { vocabId: "vocab18-3-4", encounterMoment: "You state your city: 'Mein Wohnort ist München.'", contextSentence: "Wo ist Ihr Wohnort?" },
          { vocabId: "vocab18-3-5", encounterMoment: "You pick a card: 'Ziehen Sie eine Wortkarte.'", contextSentence: "Die Wortkarte hat ein Thema." },
        ],
        decisionPoints: [
          {
            moment: "🎤 Examiner asks: 'Wie alt sind Sie?' How do you answer correctly?",
            options: [
              { text: "Ich bin 25 Jahre alt.", isCorrect: true, response: "Exactly! Use 'sein' (bin) for age in German.", kuttanReaction: "Adipoli! Age logic perfectly capture cheythallo! 🔥" },
              { text: "Ich habe 25 Jahre alt.", isCorrect: false, response: "Aiyyo! In English we say 'I have', but in German we ARE. 'Ich bin...', machaa!", kuttanReaction: "Vite machane! Verb selection sradhikkuka. Try again! 😬" },
            ],
          },
          {
            moment: "🎤 Examiner says: 'Buchstabieren Sie Ihren Namen, bitte.' What should you do?",
            options: [
              { text: "Spell your name letter by letter in German (A, B, C...).", isCorrect: true, response: "Correct! That's what 'buchstabieren' means.", kuttanReaction: "Superb! Spelling logic correctly picked! ⭐" },
              { text: "Repeat your full name slowly.", isCorrect: false, response: "No! Spelling means letters, machaa! K-U-T-T-A-N.", kuttanReaction: "Aiyyo! Instruction mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-3-1",
          title: "Sprechen Teil 1 - Sich Vorstellen",
          duration: "10:00",
          description: "Learn how to introduce yourself perfectly in the Goethe A1 Sprechen Teil 1 — cover all required topics with confidence.",
          scriptOutline: [
            "Opening: 'Sprechen Teil 1 — Your grand entry! Nammale patti full fluently parayanam.'",
            "The Script: Name, Age, Country, City, Languages, Profession, Hobbies. 7 items set aakkanam.",
            "Intro: 'Ich heiße...', 'Ich bin 25 Jahre alt', 'Ich komme aus Indien, aus Kerala' — sequence clear aayirikkanam.",
            "Languages: Be honest! 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.'",
            "Hobbys: 'Meine Hobbys sind...' or 'Ich [verb] gern'. Cricket context impress cheyyaan choice aanu!",
            "The Spelling Test: Examiner might ask 'Buchstabieren Sie bitte!' (Spell something). Start practicing ABC!.",
            "The Number Test: 'Wie ist Ihre Telefonnummer?' – individual digits-aayi parayanam (null, eins, zwei...)",
            "Confidence: Eye contact and loud voice. Njangal Malayalees fluent aanu ennu show cheyyanam!",
            "Closing: 'Mirror practice is your best friend. 10 times paranjal ithu automatic aakum! Guaranteed marks!'"
          ],
          keyVocabulary: ["sich vorstellen", "der Steckbrief", "die Sprache", "der Beruf", "das Hobby"],
          learningObjectives: [
            "Introduce yourself covering all required Sprechen Teil 1 topics",
            "Respond to Wortkarten (topic cards) with correct German sentences",
            "Create a personal Steckbrief (profile card)",
            "Speak clearly and confidently in exam conditions"
          ],
          placeholderThumbnail: "/images/job_interview.png",
          richContent: [
            {
              type: "table",
              title: "Sprechen Teil 1 — Self-Introduction Topics",
              headers: ["Topic", "German Phrase", "Example"],
              rows: [
                ["Name", "Ich heiße...", "Ich heiße Arun Nair."],
                ["Age", "Ich bin ... Jahre alt.", "Ich bin 25 Jahre alt."],
                ["Country", "Ich komme aus...", "Ich komme aus Indien, aus Kerala."],
                ["City", "Ich wohne in...", "Ich wohne in Thrissur."],
                ["Languages", "Ich spreche...", "Ich spreche Malayalam, Englisch und ein bisschen Deutsch."],
                ["Job", "Ich bin... / Ich arbeite als...", "Ich bin Student."],
                ["Hobbies", "Meine Hobbys sind...", "Meine Hobbys sind Cricket und Kochen."]
              ]
            },
            {
              type: "note",
              title: "Spelling & Numbers!",
              variant: "warning",
              content: "The examiner may ask 'Buchstabieren Sie bitte!' (Spell it!). Practice spelling your name in German letters. Also practice saying your phone number digit by digit: null, eins, zwei..."
            },
            {
              type: "note",
              title: "Mirror Practice = Guaranteed Marks",
              variant: "tip",
              content: "Practice your self-introduction in front of a mirror 10 times. It should become automatic. Eye contact + clear voice + confident delivery = full marks!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-3-1",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Name?'\n\nYou are Deepa Krishnan. Which response is correct?",
          options: [
            "Ich heiße Deepa Krishnan.",
            "Name Deepa.",
            "Deepa.",
            "Ich Name ist Deepa."
          ],
          correctAnswer: "Ich heiße Deepa Krishnan.",
          explanation: "The Full Sentence Rule: Never just say your name. Use 'Ich heiße...' or 'Mein Name ist...'. In the exam, full sentences show confidence!",
          xpReward: 15
        },
        {
          id: "ex18-3-2",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Alter?'\n\nYou are 25 years old. Complete: 'Ich ___ 25 Jahre alt.'",
          options: ["bin", "habe", "ist", "war"],
          correctAnswer: "bin",
          explanation: "Logic Shift: In English, we ARE years old. In German too! 'Ich bin...'. Don't use 'habe' (I have)—that's a common mistake for non-native speakers.",
          xpReward: 15
        },
        {
          id: "ex18-3-3",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Land?'\n\nWhich sentence correctly states where you come from?",
          options: [
            "Ich komme aus Indien.",
            "Ich komme aus Kerala.",
            "Both are great!",
            "Ich fahre Indien."
          ],
          correctAnswer: "Both are great!",
          explanation: "Origin Story: 'Ich komme aus Indien' is perfect. If you add 'aus Kerala', the examiner will be impressed by your extra detail! Always use 'aus' for origin.",
          xpReward: 15
        },
        {
          id: "ex18-3-4",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Sprachen?'\n\nComplete: 'Ich ___ Malayalam, Englisch und ein bisschen Deutsch.'",
          options: ["spreche", "rede", "sage", "habe"],
          correctAnswer: "spreche",
          explanation: "Spoken Rule: 'Ich spreche' (I speak). Saying 'Ein bisschen Deutsch' is very humble and totally fine for an A1 student!",
          xpReward: 15
        },
        {
          id: "ex18-3-5",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Beruf?'\n\nYou are a nurse (female). Which sentence is correct?",
          options: [
            "Ich bin Krankenschwester von Beruf.",
            "Ich habe Krankenschwester.",
            "Mein Beruf Krankenschwester ist.",
            "Ich mache Krankenschwester."
          ],
          correctAnswer: "Ich bin Krankenschwester von Beruf.",
          imageUrl: "/images/job_interview.png",
          explanation: "Job Talk: In German, you don't need 'a' for jobs. Just say 'Ich bin Krankenschwester'. Adiyipoli sentence structure!",
          xpReward: 15
        },
        {
          id: "ex18-3-6",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Wohnort?'\n\nYou live in Thrissur. Which is the best response?",
          options: [
            "Ich wohne in Thrissur.",
            "Thrissur.",
            "Wohnort Thrissur.",
            "Ich gehe nach Thrissur."
          ],
          correctAnswer: "Ich wohne in Thrissur.",
          explanation: "'Ich wohne in ...' = I live in. Always give a complete sentence. You can add detail: 'Ich wohne in Thrissur, in Kerala.'",
          xpReward: 15
        },
        {
          id: "ex18-3-7",
          type: "ordering",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Hobbys?' — Put these words in order:",
          options: ["Kochen", "Hobbys", "und", "Meine", "Schwimmen", "sind"],
          correctAnswer: ["Meine", "Hobbys", "sind", "Kochen", "und", "Schwimmen"],
          explanation: "'Meine Hobbys sind Kochen und Schwimmen.' = My hobbies are cooking and swimming. You can also say: 'Ich koche gern und ich schwimme gern.'",
          xpReward: 15
        },
        {
          id: "ex18-3-8",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Familie?'\n\nWhich sentence correctly talks about your family?",
          options: [
            "Meine Familie ist groß. Ich habe zwei Schwestern und einen Bruder.",
            "Familie groß.",
            "Ich habe Familie.",
            "Mein Familie zwei Schwester Bruder."
          ],
          correctAnswer: "Meine Familie ist groß. Ich habe zwei Schwestern und einen Bruder.",
          explanation: "Give a complete, detailed answer: 'Meine Familie ist groß. Ich habe zwei Schwestern und einen Bruder.' Note: 'Schwestern' (plural of Schwester), 'einen Bruder' (accusative).",
          xpReward: 15
        },
        {
          id: "ex18-3-9",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Beruf?'\n\nYou are a student (male). Complete: 'Ich bin ___ .'",
          options: ["Student", "Studentin", "Schüler", "Lehrer"],
          correctAnswer: "Student",
          explanation: "'Ich bin Student.' (male) or 'Ich bin Studentin.' (female). No article needed for professions after 'sein'.",
          xpReward: 15
        },
        {
          id: "ex18-3-10",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Hobbys?'\n\nWhich answer sounds natural and complete?",
          options: [
            "Ich lese gern B\u00fccher und spiele gern Cricket.",
            "Hobby Lesen Cricket.",
            "Ja, Hobbys.",
            "Ich bin Hobbys."
          ],
          correctAnswer: "Ich lese gern B\u00fccher und spiele gern Cricket.",
          explanation: "'Ich lese gern' = I like to read, 'spiele gern Cricket' = like to play cricket. Natural and complete!",
          xpReward: 15
        },
        {
          id: "ex18-3-11",
          type: "ordering",
          question: "🎤 Put these self-introduction sentences in logical order:",
          options: ["Ich bin Ingenieur von Beruf.", "Ich heiße Rahul Menon.", "Ich spreche Malayalam, Englisch und Deutsch.", "Ich bin 23 Jahre alt.", "Ich komme aus Indien, aus Kerala."],
          correctAnswer: ["Ich heiße Rahul Menon.", "Ich bin 23 Jahre alt.", "Ich komme aus Indien, aus Kerala.", "Ich spreche Malayalam, Englisch und Deutsch.", "Ich bin Ingenieur von Beruf."],
          explanation: "Natural order: Name \u2192 Alter \u2192 Herkunft \u2192 Sprachen \u2192 Beruf.",
          xpReward: 20
        },
        {
          id: "ex18-3-12",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Land?'\n\nComplete: 'Ich komme aus Indien, ___ Kerala.'",
          options: ["aus", "von", "in", "nach"],
          correctAnswer: "aus",
          explanation: "'Ich komme aus Indien, aus Kerala.' You can specify both country and state using 'aus'.",
          xpReward: 15
        },
        {
          id: "ex18-3-13",
          type: "dictation",
          question: "In the Goethe Kochi speaking warm-up, Frau Weber models a self-introduction. Listen and type: Ich heiße Rahul Menon.",
          correctAnswer: "Ich heiße Rahul Menon",
          explanation: "Great job! A perfect self-introduction sentence.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-intro-name.mp3"
        },
        {
          id: "ex18-3-14",
          type: "free-text",
          question: "Frau Weber asks about Herkunft at the Goethe Kochi table. Write in German: 'I come from India.'",
          correctAnswer: "Ich komme aus Indien",
          explanation: "Excellent! 'aus' is the correct preposition for origin.",
          xpReward: 30
        }
      ,
        {
          id: "ex18-3-prod-speaking",
          type: "speaking",
          question: "Teil 1, examiner nods at you — deliver it aloud: 'Ich heiße Kuttan, ich komme aus Indien und ich wohne in Thrissur.'",
          questionGerman: "Sprechen Sie laut: 'Ich heiße Kuttan, ich komme aus Indien und ich wohne in Thrissur.'",
          correctAnswer: "Ich heiße Kuttan, ich komme aus Indien und ich wohne in Thrissur",
          explanation: "Name, origin, home — the Teil 1 triple. Swap in your real details and rehearse until it's 15 smooth seconds.",
          audioUrl: "/audio/exercises/ex18-3-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab18-3-1",
          german: "sich vorstellen",
          english: "to introduce oneself",
          malayalam: "സ്വയം പരിചയപ്പെടുത്തുക",
          pronunciation: "zikh for-shteh-len",
          example: "Bitte stellen Sie sich vor.",
          exampleTranslation: "Please introduce yourself."
        },
        {
          id: "vocab18-3-2",
          german: "der Steckbrief",
          english: "the profile card",
          malayalam: "പ്രൊഫൈൽ കാർഡ്",
          pronunciation: "dehr shtek-breef",
          example: "Lesen Sie den Steckbrief und stellen Sie sich vor.",
          exampleTranslation: "Read the profile card and introduce yourself."
        },
        {
          id: "vocab18-3-3",
          german: "die Muttersprache",
          english: "the mother tongue",
          malayalam: "മാതൃഭാഷ",
          pronunciation: "dee moo-ter-shprah-khe",
          example: "Meine Muttersprache ist Malayalam.",
          exampleTranslation: "My mother tongue is Malayalam."
        },
        {
          id: "vocab18-3-4",
          german: "der Wohnort",
          english: "the place of residence",
          malayalam: "താമസസ്ഥലം",
          pronunciation: "dehr vohn-ort",
          example: "Mein Wohnort ist Berlin.",
          exampleTranslation: "My place of residence is Berlin."
        },
        {
          id: "vocab18-3-5",
          german: "die Wortkarte",
          english: "the word card",
          malayalam: "വാക്ക് കാർഡ്",
          pronunciation: "dee vort-kar-te",
          example: "Ziehen Sie bitte eine Wortkarte.",
          exampleTranslation: "Please draw a word card."
        }
      ]
    },

    // ==================== LESSON 18-4 ====================
    {
      id: "18-4",
      title: "Sprechen Teil 2 — Fragen stellen und beantworten",
      titleGerman: "Sprechen Teil 2 — Fragen stellen und beantworten",
      description: "Master Sprechen Teil 2! Draw topic cards (Wortkarten) like 'Supermarkt', 'Essen', or 'Reisen' and practice formulating questions and giving complete answers.",
      duration: "60 min",
      xpReward: 150,
      storyScene: {
        setting: {
          name: "Speaking Room (Im Prüfungszimmer)",
          sceneType: "office",
          timeOfDay: "afternoon",
          description: "Card game time! You and your partner are taking turns. You pick a card with a keyword like 'Essen' or 'Reisen' and a theme like 'Einkaufen'. You have to ask your partner a question. 'Was essen Sie gern?'. Your partner answers. Then they ask you. You keep the conversation going. It's like a real-life chat in a German market or cafe. Stay friendly and clear, machane!",
        },
        narrative: {
          previousRecap: "Introduction is done! Now, let's talk about the world around us with our fellow candidates!",
          currentObjective: "Formulate correct questions based on topic cards and provide detailed, natural answers to partner's questions",
          nextTeaser: "Final Score: Requests! Let's ask for things using image-based cards!",
        },
        kuttanIntro: [
          "Machane! This is the most interactive part. Draw a card, look at the word, and ask a question. The theme is usually something like 'Einkaufen' (Shopping) or 'Essen' (Food).",
          "Don't go off-topic! If the card says 'Supermarkt' and the theme is 'Einkaufen', don't ask about hobbies. Ask: 'Wo kaufen Sie meistens ein?'.",
          "When you answer, don't just say 'Ja' or 'Nein'. Add a detail. 'Ja, ich esse gern Biryani... oops, ich meine, ich esse gern Curry!'. Let's practice!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-4-1", encounterMoment: "The examiner says: 'Stellen Sie eine Frage.'", contextSentence: "Ich habe eine Frage zum Supermarkt." },
          { vocabId: "vocab18-4-2", encounterMoment: "Your partner answers: 'Hier ist meine Antwort.'", contextSentence: "Die Antwort ist richtig." },
          { vocabId: "vocab18-4-3", encounterMoment: "Instructions say: 'Fragen stellen und beantworten.'", contextSentence: "Kannst du die Frage stellen?" },
          { vocabId: "vocab18-4-5", encounterMoment: "You check the theme: 'Das Thema ist Reisen.'", contextSentence: "Was ist das Thema heute?" },
        ],
        decisionPoints: [
          {
            moment: "🎤 You draw a card with 'Supermarkt' for the theme 'Einkaufen'. Which question is best?",
            options: [
              { text: "Wo kaufen Sie meistens ein?", isCorrect: true, response: "Exactly! It matches the keyword 'Supermarkt' and the theme perfectly.", kuttanReaction: "Adipoli! Question logic perfectly capture cheythallo! 🔥" },
              { text: "Haben Sie ein Auto?", isCorrect: false, response: "Aiyyo! That has nothing to do with a supermarket, machaa!", kuttanReaction: "Vite machane! Card content sradhikkuka. Try again! 😬" },
            ],
          },
          {
            moment: "🎤 Your partner asks: 'Haben Sie Geschwister?' What is the best way to answer?",
            options: [
              { text: "Ja, ich habe zwei Schwestern.", isCorrect: true, response: "Correct! A full sentence with a detail gets you those extra marks.", kuttanReaction: "Superb! Answer logic correctly picked! ⭐" },
              { text: "Ja.", isCorrect: false, response: "No! Just 'Ja' is too short for a 10/10 student, machaa! Add something more.", kuttanReaction: "Aiyyo! Detail mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-4-1",
          title: "Sprechen Teil 2 - Fragen und Antworten",
          duration: "10:00",
          description: "Learn how Sprechen Teil 2 works — draw topic cards and practice asking and answering questions with a partner.",
          scriptOutline: [
            "Opening: 'Sprechen Teil 2 — Interaction time! Draw a card, ask partner, partner answers.'",
            "The Loop: Nee question chodikkum, avan answer parayum. Then inverse action nadakkum.",
            "Topics: Essen, Einkaufen, Hobby, Reise. Keywords cards-ilundakum. Don't go off-topic!",
            "Question types: W-Fragen (Was? Wo?) or Ja/Nein Fragen (Verb first). Rendindum full marks!",
            "Essen: 'Was essen Sie gern?' or 'Mögen Sie Curry?'. Keep it natural and short.",
            "Reisen: 'Wohin reisen Sie gern?' or 'Haben Sie ein Auto?'. Standard structures work best.",
            "Listening: Partner question chodikkumpol answer detail aayi kodukkanam. Just 'Ja'/'Nein' marks korakkum!",
            "Manners: 'Entschuldigung, noch einmal bitte?' use cheyyaam if you didn't hear. It's totally fine!",
            "Closing: 'Interaction correct aayaal half match jeyicha pole aanu. Stay friendly and clear! Adipoli!'"
          ],
          keyVocabulary: ["die Frage", "die Antwort", "stellen", "beantworten", "das Thema"],
          learningObjectives: [
            "Formulate questions from topic Wortkarten",
            "Ask both W-Fragen and Ja/Nein-Fragen on everyday topics",
            "Give complete answers (not just Ja/Nein)",
            "Handle 7 common exam topics: Essen, Familie, Wohnung, Freizeit, Arbeit, Reisen, Einkaufen"
          ],
          placeholderThumbnail: "/images/job_interview_setting.png",
          richContent: [
            {
              type: "table",
              title: "Sprechen Teil 2 — Topic Card Questions",
              headers: ["Topic Card", "W-Frage", "Ja/Nein-Frage"],
              rows: [
                ["Essen", "Was essen Sie gern?", "Mögen Sie Curry?"],
                ["Reisen", "Wohin reisen Sie gern?", "Haben Sie ein Auto?"],
                ["Familie", "Haben Sie Geschwister?", "Sind Sie verheiratet?"],
                ["Einkaufen", "Wo kaufen Sie meistens ein?", "Gehen Sie gern in den Supermarkt?"],
                ["Hobby", "Was machen Sie in der Freizeit?", "Spielen Sie gern Fußball?"]
              ]
            },
            {
              type: "note",
              title: "Never Just Say 'Ja' or 'Nein'!",
              variant: "warning",
              content: "Always give a FULL answer: 'Ja, ich habe zwei Schwestern.' NOT just 'Ja.' Adding details shows fluency and earns more marks. Even one extra sentence makes a big difference!"
            },
            {
              type: "note",
              title: "Didn't Hear? Ask Politely!",
              variant: "tip",
              content: "If you didn't understand, say: 'Entschuldigung, können Sie das bitte noch einmal sagen?' (Excuse me, can you say that again?). This is totally acceptable in the exam!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-4-1",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Supermarkt'\n\nYou drew this card. Which is a good question to ask your partner?",
          options: [
            "Wo kaufen Sie meistens ein? Gehen Sie gern in den Supermarkt?",
            "Wie heißen Sie?",
            "Haben Sie Geschwister?",
            "Wo wohnen Sie?"
          ],
          correctAnswer: "Wo kaufen Sie meistens ein? Gehen Sie gern in den Supermarkt?",
          explanation: "Your question must relate to the word on the card! 'Supermarkt' → ask about shopping: 'Wo kaufen Sie meistens ein?' (Where do you usually shop?) or 'Gehen Sie gern in den Supermarkt?' (Do you like going to the supermarket?)",
          xpReward: 15
        },
        {
          id: "ex18-4-2",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Essen'\n\nAsk what your partner likes to eat: '___ essen Sie gern?'",
          options: ["Was", "Wo", "Wann", "Wie"],
          correctAnswer: "Was",
          explanation: "'Was essen Sie gern?' = What do you like to eat? 'Was' (what) is the correct W-Frage word for asking about food preferences. A good answer would be: 'Ich esse gern Reis mit Curry.'",
          xpReward: 15
        },
        {
          id: "ex18-4-3",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Familie'\n\nYour partner asks: 'Haben Sie Geschwister?'\n\nWhich is the best answer?",
          options: [
            "Ja.",
            "Ja, ich habe einen Bruder. Er ist 20 Jahre alt und studiert in Kochi.",
            "Geschwister ja Bruder.",
            "Nein danke."
          ],
          correctAnswer: "Ja, ich habe einen Bruder. Er ist 20 Jahre alt und studiert in Kochi.",
          explanation: "Never answer with just 'Ja' or 'Nein'! Give a complete answer with details: 'Ja, ich habe einen Bruder. Er ist 20 Jahre alt und studiert in Kochi.' This shows you can communicate effectively.",
          xpReward: 15
        },
        {
          id: "ex18-4-4",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Wohnung'\n\nAsk about your partner's living situation: '___ wohnen Sie, in einer Wohnung oder in einem Haus?'",
          options: ["Wo", "Was", "Wie", "Wann"],
          correctAnswer: "Wo",
          explanation: "'Wo wohnen Sie?' = Where do you live? Adding 'in einer Wohnung oder in einem Haus?' makes it more specific. 'Wo' (where) is the question word for location.",
          xpReward: 15
        },
        {
          id: "ex18-4-5",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Freizeit'\n\nYour partner asks: 'Was machen Sie am Wochenende?'\n\nWhich answer is best?",
          options: [
            "Wochenende.",
            "Gut, danke.",
            "Am Wochenende spiele ich gern Fußball und treffe meine Freunde.",
            "Ja, Wochenende ist gut."
          ],
          correctAnswer: "Am Wochenende spiele ich gern Fußball und treffe meine Freunde.",
          explanation: "'Am Wochenende spiele ich gern Fußball und treffe meine Freunde.' = On the weekend I like to play football and meet my friends. Complete, relevant, and shows good vocabulary!",
          xpReward: 15
        },
        {
          id: "ex18-4-6",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Reisen'\n\nWhich is a Ja/Nein-Frage (yes/no question) about this topic?",
          options: [
            "Wohin reisen Sie gern?",
            "Reisen Sie gern?",
            "Wann reisen Sie?",
            "Warum reisen Sie gern?"
          ],
          correctAnswer: "Reisen Sie gern?",
          explanation: "'Reisen Sie gern?' = Do you like to travel? This is a Ja/Nein-Frage because the verb comes first. W-Fragen (Was? Wo? Wann?) start with a question word. Both types are valid for Sprechen Teil 2!",
          xpReward: 15
        },
        {
          id: "ex18-4-7",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Arbeit'\n\nAsk about someone's job: 'Was sind Sie von ___?'",
          options: ["Beruf", "Arbeit", "Job", "Stelle"],
          correctAnswer: "Beruf",
          explanation: "'Was sind Sie von Beruf?' = What is your profession? / What do you do for a living? 'Von Beruf' = by profession. You can also ask: 'Wo arbeiten Sie?' (Where do you work?)",
          xpReward: 15
        },
        {
          id: "ex18-4-8",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 2 — Wortkarte: 'Einkaufen'\n\nYour partner asks: 'Wo kaufen Sie gern ein?'\n\nWhich is a good answer?",
          options: [
            "Einkaufen.",
            "Ich kaufe gern im Supermarkt ein. Dort gibt es alles, was ich brauche.",
            "Ja.",
            "Ich fahre gern nach München."
          ],
          correctAnswer: "Ich kaufe gern im Supermarkt ein. Dort gibt es alles, was ich brauche.",
          explanation: "'Ich kaufe gern im Supermarkt ein.' = I like to shop at the supermarket. 'Dort gibt es alles, was ich brauche.' = There is everything I need. Complete answer with good detail!",
          xpReward: 15
        },
        {
          id: "ex18-4-9",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 2\n\nYou didn't understand the question. Say: 'Können Sie das bitte ___?'",
          options: ["wiederholen", "erklären", "sagen", "schreiben"],
          correctAnswer: "wiederholen",
          explanation: "'Können Sie das bitte wiederholen?' = Can you please repeat that? This is an essential exam phrase! The examiners won't mark you down for asking them to repeat once.",
          xpReward: 15
        },
        {
          id: "ex18-4-10",
          type: "ordering",
          question: "🎤 SPRECHEN TEIL 2 — Put these words in order to ask where someone works:",
          options: ["Sie", "arbeiten", "?", "Wo"],
          correctAnswer: ["Wo", "arbeiten", "Sie", "?"],
          explanation: "'Wo arbeiten Sie?' = Where do you work? In W-Fragen, the word order is: W-Wort + Verb + Subjekt. This is a standard question structure for Sprechen Teil 2.",
          xpReward: 15
        },
        {
          id: "ex18-4-11",
          type: "dictation",
          question: "During Kuttan's future-life rehearsal card at Goethe Kochi, listen and type: Wo ist der Supermarkt?",
          correctAnswer: "Wo ist der Supermarkt",
          explanation: "Perfect! A clear and useful question for navigation.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-supermarket.mp3"
        },
        {
          id: "ex18-4-12",
          type: "free-text",
          question: "Write a question for the topic 'Essen' (Food):",
          correctAnswer: "Was essen Sie gern",
          explanation: "Excellent question! 'Was essen Sie gern?' is the classic way to ask.",
          xpReward: 30
        },
        {
          id: "ex18-4-13",
          type: "dictation",
          question: "At the Goethe Kochi speaking table, Kuttan reminds you to ask politely. Listen and type: Können Sie das bitte wiederholen?",
          correctAnswer: "Können Sie das bitte wiederholen",
          explanation: "Essential! This phrase is a lifesaver in the oral exam.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-repeat.mp3"
        },
        {
          id: "ex18-4-14",
          type: "dictation",
          question: "Frau Weber practices exam small talk with Kuttan. Listen and type: Was machen Sie beruflich?",
          correctAnswer: "Was machen Sie beruflich",
          explanation: "Great! This is the most common way to ask about someone's job.",
          xpReward: 25,
          audioUrl: "/audio/exercises/dictation-job-question.mp3"
        }
      ,
        {
          id: "ex18-4-prod-speaking",
          type: "speaking",
          question: "Teil 2 word card: 'Wochenende'. Form the question aloud: 'Was machen Sie am Wochenende?'",
          questionGerman: "Sprechen Sie laut: 'Was machen Sie am Wochenende?'",
          correctAnswer: "Was machen Sie am Wochenende",
          explanation: "Teil 2 tests asking as much as answering. W-word + verb + Sie + card word = a correct question from any card.",
          audioUrl: "/audio/exercises/ex18-4-prod-speaking-model.mp3",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab18-4-1",
          german: "die Frage stellen",
          english: "to ask a question",
          malayalam: "ചോദ്യം ചോദിക്കുക",
          pronunciation: "dee frah-ge shteh-len",
          example: "Stellen Sie bitte eine Frage zum Thema 'Essen'.",
          exampleTranslation: "Please ask a question about the topic 'food'."
        },
        {
          id: "vocab18-4-2",
          german: "beantworten",
          english: "to answer",
          malayalam: "ഉത്തരം പറയുക",
          pronunciation: "be-ant-vor-ten",
          example: "Bitte beantworten Sie die Frage in einem ganzen Satz.",
          exampleTranslation: "Please answer the question in a complete sentence."
        },
        {
          id: "vocab18-4-3",
          german: "das Thema",
          english: "the topic",
          malayalam: "വിഷയം",
          pronunciation: "dahs tey-mah",
          example: "Das Thema auf der Wortkarte ist 'Reisen'.",
          exampleTranslation: "The topic on the word card is 'travel'."
        },
        {
          id: "vocab18-4-4",
          german: "wiederholen",
          english: "to repeat",
          malayalam: "ആവർത്തിക്കുക",
          pronunciation: "vee-der-hoh-len",
          example: "Können Sie die Frage bitte wiederholen?",
          exampleTranslation: "Can you please repeat the question?"
        }
      ]
    },

    // ==================== LESSON 18-5 ====================
    {
      id: "18-5",
      title: "Sprechen Teil 3 — Bitten formulieren",
      titleGerman: "Sprechen Teil 3 — Bitten formulieren und reagieren",
      description: "Master Sprechen Teil 3! Make and respond to polite everyday requests using 'Können Sie...?', 'Könnten Sie...?', and 'Darf ich...?' in realistic situations.",
      duration: "45 min",
      xpReward: 120,
      storyScene: {
        setting: {
          name: "Goethe Kochi Exam Hall — Sprechen Mock",
          sceneType: "classroom",
          timeOfDay: "afternoon",
          description: "Kuttan sits in a Goethe Kochi mock speaking room with Frau Weber. Situation cards are on the table: pen, window, help, appointment. He is not in Germany yet — this is the final Kerala rehearsal before the real A1 speaking exam.",
        },
        narrative: {
          previousRecap: "You practiced Sprechen Teil 2: asking and answering simple topic-card questions.",
          currentObjective: "Make polite A1 requests and respond naturally during Sprechen Teil 3.",
          nextTeaser: "Next, you will put all four exam parts together in a full Goethe A1 mock test.",
        },
        kuttanIntro: [
          "Machane, ithu final speaking pressure zone aanu — but pattern simple aanu: bitte + polite verb + short request.",
          "Frau Weber card kodukkum, nammal panic cheyyanda. One clean sentence mathi: Können Sie mir bitte helfen?",
          "Germany-il later useful aavum, but innu nammal Goethe Kochi mock room-il practice cheyyunnu. Exam first, drama later!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-5-1", encounterMoment: "Frau Weber points to a situation card and says: 'Formulieren Sie eine Bitte.'", contextSentence: "Ich habe eine Bitte an Sie." },
          { vocabId: "vocab18-5-2", encounterMoment: "Kuttan starts too direct, and Frau Weber reminds him: 'Bitte höflich.'", contextSentence: "Bitte formulieren Sie Ihre Bitte höflich." },
          { vocabId: "vocab18-5-3", encounterMoment: "The card shows a pen. Kuttan needs to borrow it politely.", contextSentence: "Können Sie mir bitte Ihren Kugelschreiber leihen?" },
        ],
        decisionPoints: [
          {
            moment: "Frau Weber gives Kuttan a card: 'Sie brauchen einen Kugelschreiber.' What should he say?",
            options: [
              { text: "Können Sie mir bitte einen Kugelschreiber leihen?", isCorrect: true, response: "Frau Weber nods. The sentence is polite, complete, and A1-safe.", kuttanReaction: "Adipoli! bitte + können Sie + object — ithu thanne exam pattern!" },
              { text: "Kugelschreiber!", isCorrect: false, response: "Frau Weber raises an eyebrow. It is only a word, not a polite request.", kuttanReaction: "Aiyyo, one-word answer venda. Full polite sentence venam, machane." },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-5-1",
          title: "Sprechen Teil 3 - Bitten formulieren",
          duration: "10:00",
          description: "Learn how to make polite requests and respond to them in everyday situations — the key skill for Sprechen Teil 3.",
          scriptOutline: [
            "Opening: 'Sprechen Teil 3 — politely request cheyyuka AND respond cheyyuka! Two-way communication aanu!'",
            "How Teil 3 works: You and your partner get situation cards. You make a request, and your partner responds (or vice versa).",
            "Three key request phrases: 'Können Sie mir bitte...?' / 'Könnten Sie bitte...?' / 'Darf ich...?'",
            "Three key response phrases: 'Ja, natürlich!' / 'Ja, gern!' / 'Tut mir leid, das geht leider nicht.'",
            "Scenario 1 — In class: 'Können Sie mir bitte helfen?' → 'Ja, natürlich! Was brauchen Sie?'",
            "Scenario 2 — Borrowing: 'Darf ich Ihren Kugelschreiber benutzen?' → 'Ja, bitte!'",
            "Scenario 3 — In a room: 'Darf ich das Fenster öffnen?' → 'Ja, gern. Mir ist auch warm.'",
            "Scenario 4 — In class: 'Könnten Sie bitte lauter sprechen?' → 'Oh, Entschuldigung! Natürlich.'",
            "Scenario 5 — Doctor: 'Ich möchte gern einen Termin machen.' → 'Ja, wann passt es Ihnen?'",
            "Scenario 6 — Information: 'Entschuldigung, können Sie mir sagen, wo der Bahnhof ist?'",
            "Politeness words: bitte, danke, Entschuldigung, gern, natürlich",
            "Closing: 'Polite aayittu request cheythal and respond cheythal full marks! Bitte and danke are your best friends!'"
          ],
          keyVocabulary: ["die Bitte", "höflich", "leihen", "der Kugelschreiber", "Entschuldigung"],
          learningObjectives: [
            "Use 'Können Sie...?', 'Könnten Sie...?', and 'Darf ich...?' for polite requests",
            "Respond to requests with 'Ja, natürlich!', 'Ja, gern!', or politely decline",
            "Handle common everyday request scenarios from the exam",
            "Use politeness markers: bitte, danke, Entschuldigung"
          ],
          placeholderThumbnail: "/images/job_interview_setting.png",
          richContent: [
            {
              type: "table",
              title: "Polite Request Phrases",
              headers: ["Phrase", "Meaning", "Politeness Level"],
              rows: [
                ["Können Sie mir bitte...?", "Can you please...?", "Polite"],
                ["Könnten Sie bitte...?", "Could you please...?", "More polite"],
                ["Darf ich...?", "May I...?", "Asking permission"],
                ["Ich möchte gern...", "I would like...", "Polite request"]
              ]
            },
            {
              type: "table",
              title: "Response Phrases",
              headers: ["Response", "Meaning", "When to Use"],
              rows: [
                ["Ja, natürlich!", "Yes, of course!", "Happy to help"],
                ["Ja, gern!", "Yes, gladly!", "Willing to help"],
                ["Ja, bitte!", "Yes, please!", "Giving permission"],
                ["Tut mir leid, das geht leider nicht.", "Sorry, that's not possible.", "Declining politely"]
              ]
            },
            {
              type: "note",
              title: "bitte & danke = Your Best Friends!",
              variant: "tip",
              content: "Always add 'bitte' (please) in requests and 'danke' (thank you) in responses. These magic words make any sentence more polite and are expected in the exam!"
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-5-1",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Sie sind im Deutschkurs. Sie verstehen ein Wort nicht.'\n\nWhich request is most appropriate?",
          options: [
            "Können Sie das Wort bitte erklären?",
            "Erklären! Schnell!",
            "Ich verstehe nicht.",
            "Wort?"
          ],
          correctAnswer: "Können Sie das Wort bitte erklären?",
          explanation: "'Können Sie das Wort bitte erklären?' = Can you please explain the word? This uses the polite 'Können Sie ... bitte ...' structure. Just saying 'Ich verstehe nicht' states the problem but doesn't make a request.",
          xpReward: 15
        },
        {
          id: "ex18-5-2",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Sie möchten das Fenster öffnen.'\n\nAsk for permission: '___ ich das Fenster öffnen?'",
          options: ["Darf", "Kann", "Soll", "Muss"],
          correctAnswer: "Darf",
          explanation: "'Darf ich das Fenster öffnen?' = May I open the window? 'Darf ich...?' is used to ask for permission to do something yourself. 'Können Sie...?' is for asking someone else to do something.",
          xpReward: 15
        },
        {
          id: "ex18-5-3",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Ihr Partner spricht sehr leise. Sie verstehen ihn nicht.'\n\nWhich request is correct?",
          options: [
            "Könnten Sie bitte lauter sprechen?",
            "Lauter!",
            "Sie sprechen leise.",
            "Ich höre nichts."
          ],
          correctAnswer: "Könnten Sie bitte lauter sprechen?",
          explanation: "'Könnten Sie bitte lauter sprechen?' = Could you please speak louder? 'Könnten' (could) is even more polite than 'Können' (can). Adding 'bitte' makes it extra polite.",
          xpReward: 15
        },
        {
          id: "ex18-5-4",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Your partner asks: 'Darf ich Ihren Kugelschreiber benutzen?'\n\nHow do you respond positively?",
          options: [
            "Ja, natürlich! Hier, bitte.",
            "Nein.",
            "Kugelschreiber.",
            "Ich verstehe nicht."
          ],
          correctAnswer: "Ja, natürlich! Hier, bitte.",
          explanation: "'Ja, natürlich! Hier, bitte.' = Yes, of course! Here you go. When agreeing to a request, respond warmly: 'Ja, natürlich!' (of course), 'Ja, gern!' (gladly), or 'Ja, klar!' (sure).",
          xpReward: 15
        },
        {
          id: "ex18-5-5",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Sie brauchen einen Stift.'\n\nMake a polite request: 'Können Sie mir bitte einen Stift ___?'",
          options: ["leihen", "geben", "kaufen", "zeigen"],
          correctAnswer: "leihen",
          explanation: "'Können Sie mir bitte einen Stift leihen?' = Can you please lend me a pen? 'leihen' = to lend/borrow. This is the polite way to borrow something in German.",
          xpReward: 15
        },
        {
          id: "ex18-5-6",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Sie sind beim Arzt. Sie möchten einen Termin für nächste Woche.'\n\nWhich request is best?",
          options: [
            "Ich möchte gern einen Termin für nächste Woche machen. Geht es am Dienstag?",
            "Termin! Nächste Woche!",
            "Geben Sie mir Termin!",
            "Ich bin krank."
          ],
          correctAnswer: "Ich möchte gern einen Termin für nächste Woche machen. Geht es am Dienstag?",
          explanation: "'Ich möchte gern einen Termin machen' = I would like to make an appointment. 'Geht es am Dienstag?' = Is Tuesday possible? Polite, clear, and suggests a specific day.",
          xpReward: 15
        },
        {
          id: "ex18-5-7",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Your partner asks: 'Können Sie mir bitte helfen? Ich suche den Bahnhof.'\n\nHow do you respond helpfully?",
          options: [
            "Ja, gern! Gehen Sie geradeaus und dann links. Der Bahnhof ist dort.",
            "Nein.",
            "Bahnhof.",
            "Ich weiß nicht."
          ],
          correctAnswer: "Ja, gern! Gehen Sie geradeaus und dann links. Der Bahnhof ist dort.",
          explanation: "'Ja, gern!' = Yes, gladly! Then give directions: 'Gehen Sie geradeaus und dann links.' = Go straight ahead and then left. In Teil 3, responding to requests is as important as making them!",
          xpReward: 15
        },
        {
          id: "ex18-5-8",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Which is the MOST polite form of asking for help?",
          options: [
            "Helfen Sie mir!",
            "Können Sie mir helfen?",
            "Könnten Sie mir bitte helfen?",
            "Ich brauche Hilfe!"
          ],
          correctAnswer: "Könnten Sie mir bitte helfen?",
          explanation: "'Könnten Sie mir bitte helfen?' uses Konjunktiv II ('könnten' = could) + 'bitte' (please). This is the most polite form. Politeness scale: 'Helfen Sie!' (command) < 'Können Sie...?' (can you) < 'Könnten Sie bitte...?' (could you please).",
          xpReward: 15
        },
        {
          id: "ex18-5-9",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 3 — You want to ask if you may sit here:\n\n'___ ich mich hier setzen?'",
          options: ["Darf", "Kann", "Soll", "Will"],
          correctAnswer: "Darf",
          explanation: "'Darf ich mich hier setzen?' = May I sit here? 'Darf ich...' is for asking permission to do something.",
          xpReward: 15
        },
        {
          id: "ex18-5-10",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Situationskarte:\n'Sie sind im Hotel. Sie brauchen ein Handtuch.'\n\nWhich request is best?",
          options: [
            "Entschuldigung, k\u00f6nnten Sie mir bitte ein Handtuch bringen?",
            "Handtuch! Jetzt!",
            "Ich brauche.",
            "Wo ist Handtuch?"
          ],
          correctAnswer: "Entschuldigung, k\u00f6nnten Sie mir bitte ein Handtuch bringen?",
          explanation: "'Entschuldigung' + 'k\u00f6nnten Sie' + 'bitte' = maximum politeness for a hotel request.",
          xpReward: 15
        },
        {
          id: "ex18-5-11",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — Partner asks: 'K\u00f6nnen Sie bitte das Licht anmachen?'\n\nHow do you respond?",
          options: [
            "Ja, nat\u00fcrlich! Einen Moment bitte.",
            "Licht.",
            "Warum?",
            "Nein, ich m\u00f6chte nicht."
          ],
          correctAnswer: "Ja, nat\u00fcrlich! Einen Moment bitte.",
          explanation: "'Ja, nat\u00fcrlich! Einen Moment bitte.' = Yes, of course! One moment please. Friendly and helpful!",
          xpReward: 15
        },
        {
          id: "ex18-5-12",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 3 — You cannot fulfill a request. How do you politely decline?",
          options: [
            "Nein!",
            "Tut mir leid, das geht leider nicht. Aber fragen Sie bitte an der Rezeption.",
            "Ich will nicht.",
            "Warum?"
          ],
          correctAnswer: "Tut mir leid, das geht leider nicht. Aber fragen Sie bitte an der Rezeption.",
          explanation: "'Tut mir leid, das geht leider nicht.' = I'm sorry, that's not possible. Then offer an alternative!",
          xpReward: 15
        },
        {
          id: "ex18-5-13",
          type: "speaking",
          question: "Goethe Kochi mock card: 'Sie brauchen einen Kugelschreiber.' Say one complete polite request aloud.",
          questionGerman: "Sprechen Sie laut: 'Können Sie mir bitte einen Kugelschreiber leihen?'",
          correctAnswer: "Können Sie mir bitte einen Kugelschreiber leihen",
          explanation: "This is the exact Sprechen Teil 3 skill: situation card → polite request. Short, complete, and A1-safe.",
          audioUrl: "/audio/exercises/ex18-5-13-model.mp3",
          xpReward: 25
        },
        {
          id: "ex18-5-14",
          type: "free-text",
          question: "Frau Weber points to the window in the mock exam room. Write the polite question: 'May I open the window?'",
          questionGerman: "Schreiben Sie: 'Darf ich das Fenster öffnen?'",
          correctAnswer: ["Darf ich das Fenster öffnen", "Darf ich das Fenster öffnen?"],
          explanation: "Use 'Darf ich...?' when you ask permission to do something yourself.",
          xpReward: 20
        },
        {
          id: "ex18-5-15",
          type: "dictation",
          question: "Listen to the polite request from the Goethe Kochi mock and type what you hear.",
          audioUrl: "/audio/hoeren/module-18/ex18-5-15.mp3",
          correctAnswer: "Können Sie mir bitte helfen",
          explanation: "Dictation trains Hören + Schreiben together. The key polite pattern is 'Können Sie mir bitte...?'",
          xpReward: 25
        }
      ],
      vocabulary: [
        {
          id: "vocab18-5-1",
          german: "die Bitte",
          english: "the request",
          malayalam: "അഭ്യർത്ഥന",
          pronunciation: "dee bi-te",
          example: "Ich habe eine Bitte an Sie.",
          exampleTranslation: "I have a request for you."
        },
        {
          id: "vocab18-5-2",
          german: "höflich",
          english: "polite",
          malayalam: "മര്യാദയുള്ള",
          pronunciation: "hör-flikh",
          example: "Bitte formulieren Sie Ihre Bitte höflich.",
          exampleTranslation: "Please formulate your request politely."
        },
        {
          id: "vocab18-5-3",
          german: "leihen",
          english: "to lend / to borrow",
          malayalam: "കടം കൊടുക്കുക / കടം വാങ്ങുക",
          pronunciation: "ly-en",
          example: "Können Sie mir bitte Ihr Buch leihen?",
          exampleTranslation: "Can you please lend me your book?"
        },
        {
          id: "vocab18-5-4",
          german: "erklären",
          english: "to explain",
          malayalam: "വിശദീകരിക്കുക",
          pronunciation: "er-kleh-ren",
          example: "Können Sie das bitte noch einmal erklären?",
          exampleTranslation: "Can you please explain that one more time?"
        }
      ]
    },

{
      id: "18-6",
      title: "Kompletter Übungstest — Alle 4 Teile",
      titleGerman: "Kompletter Übungstest — Hören, Lesen, Schreiben, Sprechen",
      description: "Full mock exam covering ALL parts — Hören, Lesen, Schreiben, and Sprechen. Test yourself under real exam conditions to build final confidence!",
      duration: "120 min",
      xpReward: 300,
      storyScene: {
        setting: {
          name: "Goethe Kochi Mock Prüfungszentrum",
          sceneType: "office",
          timeOfDay: "morning",
          description: "This is it: the real-exam simulation at Goethe Kochi in Kerala. You're sitting in the mock exam hall, clock ticking. Hören, Lesen, Schreiben, Sprechen—all sections in one go. You've got your black pen (Kugelschreiber), your ID (Ausweis), and 100% focus. You're applying everything you've learned. From 'Namaskaram' to this moment, you've built the bridge for your future Germany goal. Let's finish this with an Adipoli score!",
        },
        narrative: {
          previousRecap: "You've practiced the parts. Now, let's conquer the whole!",
          currentObjective: "Complete a full A1 exam simulation and prove your readiness for the official certificate",
          nextTeaser: "Final Score: Celebration! Let's celebrate your A1 journey at the cafe!",
        },
        kuttanIntro: [
          "Machane! This is the 'Diamond Run'. No more practice, this is the real deal simulation. 120 minutes of 100% concentration.",
          "Keep an eye on the clock. Hören goes fast, Lesen needs scanning, and Schreiben needs precision. Don't let one hard question slow you down.",
          "You've learned the logic, the culture, and the vocabulary. Trust your instincts. 'Koppippadi' isn't enough—you've got the real Adipoli German foundations now. Let's start!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-6-1", encounterMoment: "You start the paper: 'Das ist eine Übungsprüfung.'", contextSentence: "Die Übungsprüfung ist sehr nützlich." },
          { vocabId: "vocab18-6-2", encounterMoment: "You set your goal: 'Ich möchte die Prüfung bestehen.'", contextSentence: "Sie werden die Prüfung bestehen." },
          { vocabId: "vocab18-6-3", encounterMoment: "You check the rules: 'Die Prüfung dauert zwei Stunden.'", contextSentence: "Wann beginnt die Prüfung?" },
          { vocabId: "vocab18-6-4", encounterMoment: "You think of the future: 'Wie ist mein Ergebnis?'", contextSentence: "Das Ergebnis war sehr gut." },
        ],
        decisionPoints: [
          {
            moment: "📢 Hören Teil 1: 'Der Zug nach Berlin fährt heute nicht um 9 Uhr, sondern um 9:30 Uhr.' When does the train leave?",
            options: [
              { text: "9:30 Uhr.", isCorrect: true, response: "Exactly! 'Nicht... sondern' logic perfectly captured.", kuttanReaction: "Adipoli! Time logic perfectly capture cheythallo! 🔥" },
              { text: "9:00 Uhr.", isCorrect: false, response: "Aiyyo! 'Nicht um 9' means NOT at 9, machaa! Listen for the 'sondern' part.", kuttanReaction: "Vite machane! Negation sradhikkuka. Try again! 😬" },
            ],
          },
          {
            moment: "📖 Lesen Ad: 'Schöne Wohnung, 650€ warm. Keine Haustiere.' Can you bring a dog?",
            options: [
              { text: "No.", isCorrect: true, response: "Correct! 'Keine Haustiere' means no pets at all.", kuttanReaction: "Superb! Ad logic correctly picked! ⭐" },
              { text: "Yes.", isCorrect: false, response: "No! 'Haustiere' are pets, and 'Keine' is zero, machaa!", kuttanReaction: "Aiyyo! Vocab mistake machane. Try again! 🚫" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-6-1",
          title: "Final Exam Prep - You've Got This!",
          duration: "10:00",
          description: "Last-minute tips, exam-day strategy, and a pep talk before your complete mock exam. Nee ippo ready aanu!",
          scriptOutline: [
            "Opening: 'Machane, ithaanu final round! Full mock exam — just like the real Goethe A1 Start Deutsch 1!'",
            "Quick recap of all 4 parts: Hören (20 min), Lesen (25 min), Schreiben (20 min), Sprechen (15 min)",
            "Hören tips: Read questions first, listen for numbers/names/times, don't panic if you miss one",
            "Lesen tips: Scan for keywords, don't read every word, elimination strategy for multiple-choice",
            "Schreiben tips: Teil 1 — check all form fields match; Teil 2 — cover all 3 Inhaltspunkte, use Anrede + Gruß",
            "Sprechen tips: Teil 1 — memorize your Vorstellung; Teil 2 — full sentences; Teil 3 — be polite!",
            "Time management: Don't get stuck on one question — mark it and move on",
            "Scoring: 60/100 to pass, maximum 25 points per section",
            "What to bring: Ausweis (ID), Bestätigung (confirmation), schwarzer Kugelschreiber (black pen)",
            "Motivational closing: 'Nee Module 1 muthal ithuvare padichathokke ithil und! Adipoli performance nadakatte! You've EARNED this — go get that A1 certificate!'"
          ],
          keyVocabulary: ["die Übungsprüfung", "bestehen", "die Prüfung", "das Ergebnis", "schaffen"],
          learningObjectives: [
            "Review key strategies for all 4 exam sections",
            "Complete a full mock exam under realistic conditions",
            "Manage time effectively across the full exam",
            "Build confidence for exam day"
          ],
          placeholderThumbnail: "/images/university_library.png",
          richContent: [
            {
              type: "table",
              title: "Exam Day — Section-by-Section Tips",
              headers: ["Section", "Key Tip", "Max Points"],
              rows: [
                ["Hören", "Read questions first, listen for keywords", "25"],
                ["Lesen", "Scan for keywords, don't translate word-by-word", "25"],
                ["Schreiben", "Teil 1: copy carefully. Teil 2: cover all 3 points", "25"],
                ["Sprechen", "Teil 1: memorize intro. Teil 2: full sentences. Teil 3: be polite!", "25"]
              ]
            },
            {
              type: "note",
              title: "What to Bring",
              variant: "warning",
              content: "Ausweis (ID/passport), Bestätigung (confirmation email), schwarzer Kugelschreiber (black pen). Arrive 30 minutes early. No phones allowed during the exam!"
            },
            {
              type: "note",
              title: "You've Got This!",
              variant: "info",
              content: "60/100 points to pass. Maximum 25 points per section. Don't get stuck on one question — mark it and move on. Trust your preparation from Module 1 to 18. Adipoli performance nadakatte!"
            },
            {
              type: "vocabulary",
              items: [
                { german: "bestehen", english: "to pass (an exam)", malayalam: "പാസാകുക", pronunciation: "be-shtay-en" },
                { german: "die Prüfung", english: "exam", malayalam: "പരീക്ഷ", pronunciation: "prü-fung" },
                { german: "schaffen", english: "to manage / to achieve", malayalam: "നേടുക", pronunciation: "sha-fen" },
                { german: "Viel Erfolg!", english: "Good luck!", malayalam: "ആശംസകൾ!", pronunciation: "feel er-folk" }
              ]
            },
            {
              type: "table",
              title: "After the full mock: Goethe Kochi score review",
              headers: ["Skill", "If weak, do this next", "A1 proof sentence"],
              rows: [
                ["Hören", "Replay one missed audio and write the keyword you missed.", "Ich höre die Ansage noch einmal."],
                ["Lesen", "Underline the exact sentence that proves each answer.", "Ich lese die Aufgabe zuerst."],
                ["Schreiben", "Check Anrede, three content points, and Gruß before submitting.", "Ich schreibe eine kurze Nachricht."],
                ["Sprechen", "Say your introduction and one polite request aloud twice.", "Können Sie mir bitte helfen?"]
              ]
            },
            {
              type: "list",
              title: "Final mock completion checklist",
              items: [
                "I finished the full mock in one sitting, like the real Goethe A1 exam.",
                "I marked mistakes by skill: Hören, Lesen, Schreiben, or Sprechen.",
                "I chose one weak skill to review today — not all four at once.",
                "I can explain my next step to Kuttan in simple German: Ich übe Hören. / Ich übe Lesen. / Ich übe Schreiben. / Ich übe Sprechen."
              ]
            },
            {
              type: "table",
              title: "Kuttan's score feedback bands — what to do after the mock",
              headers: ["Mock result", "Meaning", "Next Kerala practice step"],
              rows: [
                ["80–100", "Exam-ready if timing was honest.", "Do one light review, sleep well, and keep your A1 sentences warm."],
                ["60–79", "Pass zone, but one skill may still be shaky.", "Repeat only the weakest section tomorrow at Goethe Kochi mock speed."],
                ["Below 60", "Not failure — diagnostic data.", "Pick two rescue drills: one Hören replay and one Sprechen self-introduction."],
                ["Any score with panic", "Confidence needs training too.", "Run a 15-minute timed mini-mock with Kuttan before the next full attempt."]
              ]
            },
            {
              type: "note",
              title: "Canon-safe exam simulation frame",
              variant: "tip",
              content: "This full mock happens at Goethe Kochi in Kerala. German train, apartment, hotel, and office examples are exam materials or future-life rehearsal cards — Kuttan is not physically in Germany during A1."
            }
          ]
        }
      ],
      exercises: [
        // ---------- HÖREN (5 exercises) ----------
        {
          id: "ex18-6-1",
          type: "multiple-choice",
          question: "🎧 HÖREN — Teil 1\n\nYou hear an announcement at the train station:\n'Achtung! Der Zug nach Berlin fährt heute nicht um 9 Uhr, sondern um 9:30 Uhr. Bitte fahren Sie auf Gleis 4.'\n\nWhen does the train to Berlin depart?",
          options: ["9:00 Uhr", "9:30 Uhr", "4:00 Uhr", "9:04 Uhr"],
          correctAnswer: "9:30 Uhr",
          explanation: "'Nicht um 9 Uhr, sondern um 9:30 Uhr' = not at 9:00, but at 9:30. Watch out for 'nicht...sondern' (not...but rather) — this structure signals a change! 'Gleis 4' is the platform number, not a time.",
          xpReward: 18
        },
        {
          id: "ex18-6-2",
          type: "multiple-choice",
          question: "🎧 HÖREN — Teil 1\n\nYou hear a voicemail:\n'Hallo, hier ist Frau Schmidt von der Arztpraxis Dr. Weber. Ihr Termin am Donnerstag um 15 Uhr muss leider verschoben werden. Können Sie am Freitag um 10 Uhr kommen? Bitte rufen Sie uns zurück unter 030-5551234.'\n\nWhat is the new suggested appointment?",
          options: ["Thursday at 15:00", "Friday at 10:00", "Friday at 15:00", "Thursday at 10:00"],
          correctAnswer: "Friday at 10:00",
          explanation: "The Donnerstag (Thursday) appointment is cancelled ('muss verschoben werden'). The new time: 'am Freitag um 10 Uhr' = Friday at 10:00. In Hören Teil 1, listen carefully for the NEW information.",
          xpReward: 18
        },
        {
          id: "ex18-6-3",
          type: "multiple-choice",
          question: "🎧 HÖREN — Teil 2\n\nYou hear a dialogue in a restaurant:\n'Entschuldigung, was kostet die Tomatensuppe?' — 'Die Tomatensuppe kostet 4,50 Euro und die Zwiebelsuppe 5,20 Euro.' — 'Ich nehme die Tomatensuppe und einen Orangensaft, bitte.' — 'Der Orangensaft kostet 2,80 Euro.'\n\nHow much does the customer pay in total?",
          options: ["4,50 Euro", "5,20 Euro", "7,30 Euro", "12,50 Euro"],
          correctAnswer: "7,30 Euro",
          explanation: "Tomatensuppe (4,50 €) + Orangensaft (2,80 €) = 7,30 €. The customer orders these two items. The Zwiebelsuppe (5,20 €) is mentioned but NOT ordered. In Hören, always track what is actually ordered vs. what is just mentioned!",
          xpReward: 18
        },
        {
          id: "ex18-6-4",
          type: "multiple-choice",
          question: "🎧 HÖREN — Teil 2\n\nYou hear a dialogue between colleagues:\n'Hallo Maria, ich mache am Samstag eine Party. Kommst du?' — 'Oh, am Samstag kann ich leider nicht. Da besuche ich meine Eltern. Aber am Sonntag habe ich Zeit.' — 'Die Party ist nur am Samstag, leider.'\n\nWhat is true about Maria?",
          options: [
            "She will come to the party on Saturday.",
            "She cannot come because she is visiting her parents.",
            "She is having a party on Sunday.",
            "She has no time on Sunday."
          ],
          correctAnswer: "She cannot come because she is visiting her parents.",
          explanation: "'Am Samstag kann ich leider nicht. Da besuche ich meine Eltern.' = On Saturday I unfortunately can't. I'm visiting my parents then. Listen for the reason ('weil/da') after a refusal.",
          xpReward: 18
        },
        {
          id: "ex18-6-5",
          type: "multiple-choice",
          question: "🎧 HÖREN — Teil 3\n\nYou hear a store announcement:\n'Liebe Kunden, unser Geschäft schließt heute ausnahmsweise um 17 Uhr. Morgen sind wir wieder wie gewohnt von 9 bis 20 Uhr für Sie da. Vielen Dank für Ihr Verständnis.'\n\nWhat are the NORMAL opening hours?",
          options: ["9:00 - 17:00", "9:00 - 20:00", "17:00 - 20:00", "8:00 - 17:00"],
          correctAnswer: "9:00 - 20:00",
          explanation: "'Morgen sind wir wieder wie gewohnt von 9 bis 20 Uhr' = Tomorrow we are open as usual from 9 to 20. 'Wie gewohnt' (as usual) tells us the normal hours. Today's 17 Uhr closing is 'ausnahmsweise' (exceptional).",
          xpReward: 18
        },
        // ---------- LESEN (5 exercises) ----------
        {
          id: "ex18-6-6",
          type: "multiple-choice",
          question: "📖 LESEN — Teil 1\n\nYou see this sign at a swimming pool:\n\n'Hallenbad Stadtmitte\nÖffnungszeiten:\nMo–Fr: 6:30–21:00 Uhr\nSa: 8:00–18:00 Uhr\nSo: 9:00–17:00 Uhr\nMittwoch: Damentag (nur Frauen) 14:00–17:00'\n\nYour male friend wants to swim on Wednesday at 15:00. Can he?",
          options: [
            "Yes, the pool is open until 21:00",
            "No, Wednesday 14:00-17:00 is ladies only (Damentag)",
            "Yes, but only until 17:00",
            "No, the pool is closed on Wednesdays"
          ],
          correctAnswer: "No, Wednesday 14:00-17:00 is ladies only (Damentag)",
          explanation: "'Damentag (nur Frauen) 14:00–17:00' = Ladies' day (women only) from 14:00 to 17:00. Your male friend cannot swim during this time on Mittwoch (Wednesday). He could come before 14:00 or after 17:00.",
          xpReward: 18
        },
        {
          id: "ex18-6-7",
          type: "multiple-choice",
          question: "📖 LESEN — Teil 2\n\nYou read this ad:\n\n'Schöne 2-Zimmer-Wohnung in der Stadtmitte, 65 qm, Balkon, Küche mit Spülmaschine. 650 € warm, Kaution: 1.300 €. Ab 01.04. frei. Keine Haustiere. Kontakt: Herr Fischer, Tel: 030-5551234.'\n\nWhich statement is correct?",
          options: [
            "Pets are allowed in the apartment.",
            "The apartment is available from April 1st and costs 650 € including utilities.",
            "The apartment has 65 rooms.",
            "The deposit (Kaution) is 650 €."
          ],
          correctAnswer: "The apartment is available from April 1st and costs 650 € including utilities.",
          explanation: "'Ab 01.04. frei' = available from April 1st. '650 € warm' = 650 € including heating/utilities. 'Keine Haustiere' = no pets. '65 qm' = 65 square meters (not rooms!). 'Kaution: 1.300 €' is the deposit.",
          xpReward: 18
        },
        {
          id: "ex18-6-8",
          type: "multiple-choice",
          question: "📖 LESEN — Teil 2\n\nYou read this email:\n\n'Lieber Tom,\nich kann leider am Dienstag nicht zum Deutschkurs kommen. Ich bin erkältet und muss zum Arzt. Kannst du mir bitte die Hausaufgaben per E-Mail schicken? Das wäre sehr nett.\nDanke und liebe Grüße,\nMaria'\n\nWhat does Maria ask Tom to do?",
          options: [
            "Come to her house",
            "Send her the homework by email",
            "Go to the doctor with her",
            "Cancel the German course"
          ],
          correctAnswer: "Send her the homework by email",
          explanation: "'Kannst du mir bitte die Hausaufgaben per E-Mail schicken?' = Can you please send me the homework by email? She's sick ('erkältet' = having a cold) and can't come to class on Dienstag (Tuesday).",
          xpReward: 18
        },
        {
          id: "ex18-6-9",
          type: "multiple-choice",
          question: "📖 LESEN — Teil 3\n\nYou see this notice in your apartment building:\n\n'Liebe Hausbewohner,\nam Donnerstag, den 15.03., wird von 9:00 bis 14:00 Uhr das Wasser abgestellt. Bitte füllen Sie vorher Wasser in Flaschen ab.\nIhre Hausverwaltung'\n\nWhat should residents do?",
          options: [
            "Leave the building on Thursday",
            "Fill water bottles beforehand because water will be shut off",
            "Pay the water bill by March 15th",
            "Call the building management on Thursday"
          ],
          correctAnswer: "Fill water bottles beforehand because water will be shut off",
          explanation: "'Das Wasser wird abgestellt' = the water will be shut off. 'Bitte füllen Sie vorher Wasser in Flaschen ab' = please fill water in bottles beforehand. The water is off from 9:00 to 14:00 on Thursday.",
          xpReward: 18
        },
        {
          id: "ex18-6-10",
          type: "multiple-choice",
          question: "📖 LESEN — Teil 3\n\nYou see this sign at the entrance of a building:\n\n'Aufzug außer Betrieb.\nBitte benutzen Sie die Treppe.\nWir bitten um Entschuldigung.'\n\nWhat should you do?",
          options: ["Use the elevator", "Use the stairs", "Wait for the bus", "Call for help"],
          correctAnswer: "Use the stairs",
          explanation: "'Aufzug außer Betrieb' = elevator out of service. 'Bitte benutzen Sie die Treppe' = please use the stairs. 'Wir bitten um Entschuldigung' = we apologize. 'Treppe' = stairs.",
          xpReward: 18
        },
        // ---------- SCHREIBEN (3 exercises) ----------
        {
          id: "ex18-6-11",
          type: "fill-blank",
          question: "✍️ SCHREIBEN — Teil 1 (Formular)\n\n📋 ANMELDUNG ZUM DEUTSCHKURS — Goethe-Institut\n\nYou are filling out a registration form. You were born on 25th December 2000.\n\nForm field: 'Geburtsdatum' → ___",
          options: ["25.12.2000", "12.25.2000", "2000-12-25", "25/12/2000"],
          correctAnswer: "25.12.2000",
          explanation: "German date format: TT.MM.JJJJ = 25.12.2000 (25th December 2000). Day first, then month, then year, separated by dots. This is one of the most common form fields in Schreiben Teil 1!",
          xpReward: 18
        },
        {
          id: "ex18-6-12",
          type: "fill-blank",
          question: "✍️ SCHREIBEN — Teil 1 (Formular)\n\n📋 ANMELDUNG ZUM DEUTSCHKURS — Goethe-Institut\n\nYou live at Mozartstraße 15, 80336 München.\n\nForm field: 'Straße, Hausnummer' → ___",
          options: ["Mozartstraße 15", "15 Mozartstraße", "80336 München", "München Mozartstraße"],
          correctAnswer: "Mozartstraße 15",
          explanation: "German address format: Street name + house number. 'Mozartstraße 15'. The PLZ (80336) and Stadt (München) go in separate fields. Don't mix them up!",
          xpReward: 18
        },
        {
          id: "ex18-6-13",
          type: "multiple-choice",
          question: "✍️ SCHREIBEN — Teil 2 (Nachricht)\n\nSituation: Ihre Freundin Lisa hat Sie zum Abendessen am Samstag eingeladen. Sie können leider nicht kommen.\n\nSchreiben Sie eine Nachricht an Lisa.\n— sich für die Einladung bedanken\n— absagen und Grund nennen (arbeiten)\n— anderen Tag vorschlagen (Sonntag)\n\nWhich message covers ALL 3 Inhaltspunkte?",
          options: [
            "Liebe Lisa, vielen Dank für die Einladung zum Abendessen! Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss. Können wir uns stattdessen am Sonntag treffen? Viele Grüße, Arun",
            "Liebe Lisa, danke. Ich komme nicht. Tschüss.",
            "Hallo Lisa, Samstag geht nicht. Grüße.",
            "Sehr geehrte Frau Lisa, mit freundlichen Grüßen, Arun."
          ],
          correctAnswer: "Liebe Lisa, vielen Dank für die Einladung zum Abendessen! Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss. Können wir uns stattdessen am Sonntag treffen? Viele Grüße, Arun",
          explanation: "All 3 Inhaltspunkte are covered: (1) bedanken — 'vielen Dank für die Einladung', (2) absagen + Grund — 'kann nicht kommen, weil ich arbeiten muss', (3) Sonntag vorschlagen — 'Können wir uns am Sonntag treffen?' Plus correct informal Anrede (Liebe Lisa) and Gruß (Viele Grüße).",
          xpReward: 20
        },
        // ---------- SPRECHEN (3 exercises) ----------
        {
          id: "ex18-6-14",
          type: "ordering",
          question: "🎤 SPRECHEN — Teil 1: In the Goethe Kochi mock room, Frau Weber asks Meera to introduce herself. Put these self-introduction sentences in a logical order:",
          options: ["Ich spreche Malayalam, Englisch und ein bisschen Deutsch.", "Ich heiße Meera Nair.", "Meine Hobbys sind Lesen und Tanzen.", "Ich komme aus Indien, aus Kerala.", "Ich bin 24 Jahre alt."],
          correctAnswer: ["Ich heiße Meera Nair.", "Ich bin 24 Jahre alt.", "Ich komme aus Indien, aus Kerala.", "Ich spreche Malayalam, Englisch und ein bisschen Deutsch.", "Meine Hobbys sind Lesen und Tanzen."],
          explanation: "A natural Vorstellung (self-introduction) follows this order: Name → Alter → Herkunft (origin) → Sprachen → Hobbys. This is the expected flow for Sprechen Teil 1. Each sentence covers one Wortkarte topic.",
          xpReward: 20
        },
        {
          id: "ex18-6-15",
          type: "multiple-choice",
          question: "🎤 SPRECHEN — Teil 2 (Fragen & Antworten)\n\nAt the Goethe Kochi speaking table, the card says 'Wohnen'. Your partner asks: 'Wo wohnen Sie?'\n\nWhich is the best complete A1 answer?",
          options: [
            "Wohnen.",
            "Ja.",
            "Ich wohne in einer kleinen Wohnung in München. Sie hat zwei Zimmer und einen Balkon.",
            "Ich esse gern Reis."
          ],
          correctAnswer: "Ich wohne in einer kleinen Wohnung in München. Sie hat zwei Zimmer und einen Balkon.",
          explanation: "Give a complete answer with details! 'Ich wohne in einer kleinen Wohnung in München. Sie hat zwei Zimmer und einen Balkon.' = I live in a small apartment in Munich. It has two rooms and a balcony. This shows good language skills!",
          xpReward: 20
        },
        {
          id: "ex18-6-16",
          type: "multiple-choice",
          question: "🎤 SPRECHEN — Teil 3 (Bitten)\n\nIn the Goethe Kochi mock, Frau Weber gives you this future-travel role card: 'Sie sind an der Hotelrezeption. Sie brauchen das WLAN-Passwort.'\n\nWhich request is best?",
          options: [
            "WLAN! Passwort! Schnell!",
            "Entschuldigung, könnten Sie mir bitte das WLAN-Passwort geben?",
            "Internet.",
            "Ich will Passwort."
          ],
          correctAnswer: "Entschuldigung, könnten Sie mir bitte das WLAN-Passwort geben?",
          explanation: "'Entschuldigung, könnten Sie mir bitte das WLAN-Passwort geben?' = Excuse me, could you please give me the WiFi password? This uses 'Entschuldigung' + 'könnten' + 'bitte' — maximum politeness! Note: Germans say 'WLAN' (vey-lahn), not 'WiFi'.",
          xpReward: 20
        }
      ,
        {
          id: "ex18-6-prod-speaking",
          type: "speaking",
          question: "Kuttan's final Goethe Kochi mock check: say aloud before the Sprechen section: 'Können Sie mir bitte helfen?'",
          questionGerman: "Sprechen Sie laut: 'Können Sie mir bitte helfen?'",
          correctAnswer: "Können Sie mir bitte helfen",
          explanation: "Speaking practice turns recognition into exam-ready mouth memory. Short, clear A1 sentence first; speed later.",
          audioUrl: "/audio/exercises/ex18-6-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex18-6-prod-writing",
          type: "free-text",
          question: "At the Goethe Kochi mock desk, write one polite request you can use if you need help during Sprechen.",
          questionGerman: "Schreiben Sie einen vollständigen Satz.",
          correctAnswer: ["Können Sie mir bitte helfen", "Können Sie mir bitte helfen."],
          explanation: "A1 writing must be short, complete, and usable. One correct sentence beats five half-known phrases.",
          xpReward: 20
        },
        {
          id: "ex18-6-prod-dictation",
          type: "dictation",
          question: "Kuttan plays the final Goethe Kochi mock audio note. Listen and type the A1 request you hear.",
          audioUrl: "/audio/hoeren/module-18/ex18-6-prod-dictation.mp3",
          correctAnswer: "Können Sie mir bitte helfen",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        }],
      vocabulary: [
        {
          id: "vocab18-6-1",
          german: "die Übungsprüfung",
          english: "the mock exam / practice exam",
          malayalam: "മോക്ക് പരീക്ഷ",
          pronunciation: "dee ü-boongs-prü-fung",
          example: "Die Übungsprüfung ist sehr nützlich.",
          exampleTranslation: "The mock exam is very useful."
        },
        {
          id: "vocab18-6-2",
          german: "bestehen",
          english: "to pass",
          malayalam: "പാസാകുക",
          pronunciation: "be-shtay-en",
          example: "Ich möchte die Prüfung bestehen.",
          exampleTranslation: "I want to pass the exam."
        },
        {
          id: "vocab18-6-3",
          german: "die Prüfung",
          english: "the exam",
          malayalam: "പരീക്ഷ",
          pronunciation: "dee prü-fung",
          example: "Wann beginnt die Prüfung?",
          exampleTranslation: "When does the exam begin?"
        },
        {
          id: "vocab18-6-4",
          german: "das Ergebnis",
          english: "the result",
          malayalam: "ഫലം",
          pronunciation: "dahs er-gehp-nis",
          example: "Das Ergebnis war sehr gut.",
          exampleTranslation: "The result was very good."
        }
      ]
    },

    // ==================== LESSON 18-7: Adipoli A1 Conclusion ====================
    {
      id: "18-7",
      title: "Adipoli A1 Conclusion — Celebration!",
      titleGerman: "Kursabschluss — Herzlichen Glückwunsch!",
      description: "You've done it! Celebrate your journey from Module 1 to Module 18. Reflect on how far you've come and look forward to the future!",
      duration: "30 min",
      xpReward: 500,
      storyScene: {
        setting: {
          name: "Kerala Cafe — Goethe A1 Celebration",
          sceneType: "restaurant",
          timeOfDay: "evening",
          description: "It's all over! The Goethe Kochi exam is done, and you're feeling a mix of relief and pride. You're sitting with Arjun and Priya at a cozy cafe in Kerala after the exam. Kuttan pulls out his phone to show a photo of his results: 'PASS!'. Arjun clinks his glass against yours. 'Herzlichen Glückwunsch, machaa! You're officially an A1 speaker now!'. Priya smiles: 'Next stop, A2?'. You take a sip of your drink and look at a Munich street photo on the wall — not as today's location, but as the future you're now ready to rehearse for. From Kerala to Germany—you've built the bridge. Adipoli!",
        },
        narrative: {
          previousRecap: "You've conquered the Goethe A1 exam!",
          currentObjective: "Celebrate your success and reflect on your learning journey",
          nextTeaser: "Coming Soon: Adipoli A2! The journey continues!",
        },
        kuttanIntro: [
          "Machane! We did it! From 'Namaskaram' in Module 1 to 'Herzlichen Glückwunsch' today. It wasn't just about grammar—it was about building a new life.",
          "Think back to the first time you tried to say 'Ich heiße...'. Now look at you, decoding apartment ads and making polite requests like a pro. You've earned this celebration!",
          "This is not the end, it's just the 'Golden Beginning'. German is now a part of you. Let's celebrate our Erfolg (success) together!",
        ],
        vocabEncounters: [
          { vocabId: "vocab18-7-1", encounterMoment: "Arjun raises his glass: 'Das ist ein großer Erfolg!'", contextSentence: "Viel Erfolg für die Zukunft!" },
          { vocabId: "vocab18-7-2", encounterMoment: "You look at your results: 'Das Zertifikat ist da.'", contextSentence: "Ich habe mein A1-Zertifikat bekommen." },
          { vocabId: "vocab18-7-3", encounterMoment: "Priya asks about plans: 'Was machst du in der Zukunft?'", contextSentence: "Die Zukunft ist voller Möglichkeiten." },
        ],
        decisionPoints: [
          {
            moment: "Looking back at the 18 modules, what was your favorite part of learning German with 'Adipoli German'?",
            options: [
              { text: "The Kerala-German cultural parallels (Manglish bridges).", isCorrect: true, response: "Exactly! That's the heart of our journey—context is everything.", kuttanReaction: "Adipoli! That's what makes us special, machane! 🔥" },
              { text: "The structured exam practice.", isCorrect: true, response: "Great! Preparation is the key to confidence.", kuttanReaction: "Superb! Strategy marks jeyippikkum! ⭐" },
            ],
          },
          {
            moment: "What are your plans for the Zukunft (future)?",
            options: [
              { text: "Continue with Adipoli A2 and master the language!", isCorrect: true, response: "Wunderbar! The bridge gets stronger from here.", kuttanReaction: "Adipoli! A2-il kaanaam, machane! 🔥" },
              { text: "Use my A1 skills to find a job or study in Germany.", isCorrect: true, response: "Superb! That's the goal. You have the foundation now.", kuttanReaction: "Adipoli! All the best for your career, machane! ⭐" },
            ],
          },
        ],
      },
      videos: [
        {
          id: "v18-7-1",
          title: "A1 Celebration Recap — From Kerala to Goethe Confidence",
          duration: "06:00",
          // videoUrl pending owner recording (DECISIONS #13, video deferred): "/videos/generated/v18-7-1.mp4"
          description: "A short final recap that celebrates the Kerala-rooted A1 journey, reviews the Goethe skill checklist, and sends the learner into A2 with confidence.",
          scriptOutline: [
            "Opening at the Kerala cafe after Goethe Kochi: 'Machane, from Ich heiße to the full A1 mock — you actually did the work.'",
            "Recap the four Goethe skills: Hören, Lesen, Schreiben, Sprechen.",
            "Show the bridge: Kerala practice today, Germany future rehearsal tomorrow — no panic, just usable A1 sentences.",
            "Final oral checklist: introduce yourself, ask one polite question, request help, thank someone, and say one future plan.",
            "CTA: keep reviewing A1 for one week, then start the Adipoli A2 bridge."
          ],
          keyVocabulary: ["Herzlichen Glückwunsch", "der Erfolg", "das Zertifikat", "die Zukunft", "weiterlernen"],
          learningObjectives: [
            "Celebrate completion without losing exam seriousness",
            "Recall the four Goethe A1 skill areas",
            "Produce a final short A1 speaking checklist",
            "Frame Germany as future rehearsal from Kerala"
          ],
          placeholderThumbnail: "/images/kerala_cafe.png",
          richContent: [
            {
              type: "list",
              title: "Final A1 confidence checklist",
              items: [
                "I can introduce myself in German.",
                "I can ask for help politely: Können Sie mir bitte helfen?",
                "I can write a short A1 message.",
                "I can understand short exam-style announcements.",
                "I can talk about one future plan in simple German."
              ]
            },
            {
              type: "table",
              title: "Final oral A1 mini-check — say it before you celebrate",
              headers: ["Skill", "Kerala practice prompt", "A1 model answer"],
              rows: [
                ["Introduce yourself", "Frau Weber asks at Goethe Kochi: Wie heißen Sie?", "Ich heiße Arun."],
                ["Say where you live", "Kuttan points to the form: Wohnort?", "Ich wohne in Kochi."],
                ["Ask politely", "You need help during practice.", "Können Sie mir bitte helfen?"],
                ["Say a future plan", "At the Kerala cafe, Priya asks: Was machst du weiter?", "Ich lerne weiter Deutsch."],
                ["Thank someone", "The examiner closes the speaking practice.", "Vielen Dank. Auf Wiedersehen."]
              ]
            },
            {
              type: "note",
              title: "Course soul reminder",
              variant: "tip",
              content: "A1 started in Kerala and stays rooted there. Germany is the future goal you can now rehearse for with calm, simple German."
            }
          ]
        }
      ],
      exercises: [
        {
          id: "ex18-7-prod-speaking",
          type: "speaking",
          question: "Say it loud, because it's true now: 'Ich bin bereit für die Prüfung!'",
          questionGerman: "Sprechen Sie laut: 'Ich bin bereit für die Prüfung!'",
          correctAnswer: "Ich bin bereit für die Prüfung",
          explanation: "bereit für + accusative — and yes, you are. Book the exam while the confidence is fresh.",
          audioUrl: "/audio/exercises/ex18-7-prod-speaking-model.mp3",
          xpReward: 25
        },
        {
          id: "ex18-7-prod-writing",
          type: "free-text",
          question: "Production writing: Write one polite Goethe speaking request.",
          questionGerman: "Schreiben Sie einen vollständigen Satz.",
          correctAnswer: ["Können Sie mir bitte helfen", "Können Sie mir bitte helfen."],
          explanation: "A1 writing must be short, complete, and usable. One correct sentence beats five half-known phrases.",
          xpReward: 20
        },
        {
          id: "ex18-7-prod-dictation",
          type: "dictation",
          question: "At the Kerala cafe, Kuttan plays one final Goethe A1 audio note. Listen and type the sentence you hear.",
          audioUrl: "/audio/hoeren/module-18/ex18-7-prod-dictation.mp3",
          correctAnswer: "Können Sie mir bitte helfen",
          explanation: "Dictation connects Hören and Schreiben. Listen for the full sentence, not isolated words.",
          xpReward: 25
        },
        {
          id: "ex18-7-celebration-mcq",
          type: "multiple-choice",
          question: "At the Kerala cafe after Goethe Kochi, Kuttan raises a toast. Which A1 sentence fits the celebration?",
          options: ["Herzlichen Glückwunsch!", "Ich habe Hunger.", "Wo ist der Bahnhof?", "Das kostet zwölf Euro."],
          correctAnswer: "Herzlichen Glückwunsch!",
          explanation: "Herzlichen Glückwunsch means congratulations. It fits the final A1 celebration scene.",
          xpReward: 15
        },
        {
          id: "ex18-7-final-speaking-checklist",
          type: "speaking",
          question: "Frau Weber's final oral check at Goethe Kochi: say your future plan in one simple sentence: 'Ich lerne weiter Deutsch.'",
          questionGerman: "Sagen Sie: 'Ich lerne weiter Deutsch.'",
          correctAnswer: "Ich lerne weiter Deutsch",
          explanation: "A1 speaking confidence means one clear, complete sentence. This keeps the Germany goal as future preparation, not today's location.",
          audioUrl: "/audio/exercises/ex18-7-final-speaking-checklist-model.mp3",
          xpReward: 25
        },
        {
          id: "ex18-7-final-writing-reflection",
          type: "free-text",
          question: "Kerala cafe reflection: write one final A1 sentence to Kuttan about your success.",
          questionGerman: "Schreiben Sie einen Satz über Ihren Erfolg.",
          correctAnswer: ["Ich habe Erfolg", "Ich habe Erfolg.", "Das ist ein Erfolg", "Das ist ein Erfolg."],
          explanation: "Short A1 writing is enough: subject + verb + key noun. Keep it clean and exam-safe.",
          xpReward: 20
        }],
      vocabulary: [
        {
          id: "vocab18-7-1",
          german: "der Erfolg",
          english: "the success",
          malayalam: "വിജയം",
          pronunciation: "dehr er-folk",
          example: "Viel Erfolg!",
          exampleTranslation: "Much success!"
        },
        {
          id: "vocab18-7-2",
          german: "das Zertifikat",
          english: "the certificate",
          malayalam: "സർട്ടിഫിക്കറ്റ്",
          pronunciation: "dahs tser-ti-fi-kaht",
          example: "Ich habe das A1-Zertifikat.",
          exampleTranslation: "I have the A1 certificate."
        },
        {
          id: "vocab18-7-3",
          german: "die Zukunft",
          english: "the future",
          malayalam: "ഭാവി",
          pronunciation: "dee tsoo-koonft",
          example: "Alles Gute für die Zukunft!",
          exampleTranslation: "All the best for the future!"
        }
      ]
    }
  ]
};
