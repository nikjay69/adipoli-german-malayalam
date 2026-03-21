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
  lessons: [
    // ==================== LESSON 18-1 ====================
    {
      id: "18-1",
      title: "Schreiben Teil 1 — Formulare ausfüllen",
      titleGerman: "Schreiben Teil 1 — Formulare ausfüllen",
      description: "Master Schreiben Teil 1! Practice filling out real German forms — Anmeldeformular, Bibliotheksausweis, and Sprachkurs-Anmeldung with correct date and address formats.",
      duration: "45 min",
      xpReward: 120,
      videos: [
        {
          id: "v18-1-1",
          title: "Exam Writing Part 1 - Form Filling",
          duration: "10:00",
          description: "Learn exactly how to fill out German forms in the Goethe A1 exam — what each field means and common mistakes to avoid.",
          scriptOutline: [
            "Opening: 'Machane, Schreiben Teil 1 — the easiest points in the whole exam! Form fill cheythal mathi!'",
            "What is Schreiben Teil 1? You get a form and must fill in 5 fields from given information.",
            "Common form types: Anmeldeformular (registration), Bibliotheksausweis (library card), Sprachkurs-Anmeldung (language course registration)",
            "Key fields explained: Vorname (first name), Nachname/Familienname (surname), Adresse (address), Geburtsdatum (date of birth), Beruf (profession), Telefonnummer (phone), E-Mail",
            "Date format in Germany: TT.MM.JJJJ — for example 05.03.1998, NOT March 5 or 3/5/98",
            "Address format: Straße + Hausnummer, PLZ + Stadt — e.g. Berliner Str. 12, 80331 München",
            "Practice form 1: Anmeldeformular for a Volkshochschule — fill in personal details",
            "Practice form 2: Bibliotheksausweis application — name, address, date of birth",
            "Practice form 3: Sprachkurs-Anmeldung — personal info plus course selection",
            "Common mistakes: Writing in the wrong field, wrong date format, forgetting PLZ",
            "Tip: Read ALL the given information first, then fill in the form",
            "Closing: 'Ithu real easy marks aanu machane — don't lose points here! Practice cheyyuka!'"
          ],
          keyVocabulary: ["das Formular", "ausfüllen", "der Vorname", "der Nachname", "das Geburtsdatum", "die Adresse"],
          learningObjectives: [
            "Understand common German form types and their fields",
            "Fill in personal information correctly in German format",
            "Use the correct German date format (TT.MM.JJJJ)",
            "Write German addresses in correct format (Straße Nr, PLZ Stadt)"
          ],
          placeholderThumbnail: "/images/thumbnails/schreiben-forms.jpg"
        }
      ],
      exercises: [
        {
          id: "ex18-1-1",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Volkshochschule Berlin\n\nYou are registering for a German course. Your name is Arun Krishnan Nair.\n\nForm field: 'Vorname' → ___",
          correctAnswer: "Arun Krishnan",
          explanation: "'Vorname' means first name (given name). In German forms, your first name(s) go here. Your Vorname is 'Arun Krishnan'. Your Familienname/Nachname would be 'Nair'.",
          xpReward: 12
        },
        {
          id: "ex18-1-2",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Volkshochschule Berlin\n\nYou are Priya Menon, born 23rd March 1999.\n\nForm field: 'Familienname' → ___",
          correctAnswer: "Menon",
          explanation: "'Familienname' (also 'Nachname') means family name / surname. Your surname is 'Menon'. Remember: Vorname = first name, Familienname = last name.",
          xpReward: 12
        },
        {
          id: "ex18-1-3",
          type: "fill-blank",
          question: "📋 ANMELDEFORMULAR — Sprachkurs\n\nYou were born on 7th November 2001.\n\nForm field: 'Geburtsdatum' → ___",
          correctAnswer: "07.11.2001",
          explanation: "German date format is TT.MM.JJJJ (Tag.Monat.Jahr). 7th November 2001 = 07.11.2001. Always use two digits for day and month, four for year, separated by dots.",
          xpReward: 12
        },
        {
          id: "ex18-1-4",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Stadtbibliothek München\n\nYou live at Schillerstraße 24 in München. The postal code is 80336.\n\nForm field: 'Straße, Hausnummer' → ___",
          correctAnswer: "Schillerstraße 24",
          explanation: "In German addresses, you write the street name first, then the house number: 'Schillerstraße 24'. The PLZ (postal code) and Stadt (city) go in separate fields.",
          xpReward: 12
        },
        {
          id: "ex18-1-5",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Stadtbibliothek München\n\nYou live at Schillerstraße 24, 80336 München.\n\nForm field: 'PLZ, Ort' → ___",
          correctAnswer: "80336 München",
          explanation: "'PLZ' = Postleitzahl (postal code), 'Ort' = place/city. Write them together: '80336 München'. German PLZ codes are always 5 digits.",
          xpReward: 12
        },
        {
          id: "ex18-1-6",
          type: "multiple-choice",
          question: "📋 ANMELDEFORMULAR — Sprachschule\n\nYou see the field 'Geburtsort'. What should you write here?",
          options: ["Your date of birth", "The city where you were born", "Your current address", "Your nationality"],
          correctAnswer: "The city where you were born",
          explanation: "'Geburtsort' = Geburt (birth) + Ort (place) = place of birth. You write the city where you were born, e.g., 'Kochi' or 'Thiruvananthapuram'. Don't confuse with 'Geburtsdatum' (date of birth).",
          xpReward: 12
        },
        {
          id: "ex18-1-7",
          type: "fill-blank",
          question: "📋 SPRACHKURS-ANMELDUNG — Goethe-Institut\n\nYou are a software engineer (male).\n\nForm field: 'Beruf' → ___",
          correctAnswer: "Softwareentwickler",
          explanation: "'Beruf' means profession/occupation. A male software engineer is 'Softwareentwickler' (female: 'Softwareentwicklerin'). Other common answers: Student/Studentin, Ingenieur/Ingenieurin, Krankenpfleger/Krankenschwester.",
          xpReward: 12
        },
        {
          id: "ex18-1-8",
          type: "multiple-choice",
          question: "📋 ANMELDEFORMULAR\n\nThe form asks for 'Staatsangehörigkeit'. You are from India. What do you write?",
          options: ["Indien", "indisch", "Inder", "India"],
          correctAnswer: "indisch",
          explanation: "'Staatsangehörigkeit' = nationality/citizenship. You write the adjective form: 'indisch' (Indian). NOT the country name 'Indien'. Similarly: 'deutsch' (German), 'türkisch' (Turkish).",
          xpReward: 12
        },
        {
          id: "ex18-1-9",
          type: "fill-blank",
          question: "📋 BIBLIOTHEKSAUSWEIS — Antrag\n\nForm field: 'Telefonnummer' — Your German mobile number is 0152 3847 6521.\n\nWhat do you write? → ___",
          correctAnswer: "0152 3847 6521",
          explanation: "'Telefonnummer' = telephone number. Write your full number including the mobile prefix (0152, 0176, 0170, etc.). German mobile numbers start with 015x, 016x, or 017x.",
          xpReward: 12
        },
        {
          id: "ex18-1-10",
          type: "multiple-choice",
          question: "📋 SPRACHKURS-ANMELDUNG\n\nThe form has a field: 'Geschlecht: □ männlich □ weiblich □ divers'\n\nWhat does this field ask?",
          options: ["Your age", "Your gender", "Your marital status", "Your profession"],
          correctAnswer: "Your gender",
          explanation: "'Geschlecht' = gender/sex. 'männlich' = male, 'weiblich' = female, 'divers' = diverse/non-binary. You tick the appropriate box. Don't confuse with 'Familienstand' (marital status).",
          xpReward: 12
        }
      ],
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
      videos: [
        {
          id: "v18-2-1",
          title: "Writing Short Messages & Emails",
          duration: "10:00",
          description: "Learn the structure and strategy for writing a 30-word message in the Goethe A1 Schreiben Teil 2.",
          scriptOutline: [
            "Opening: 'Schreiben Teil 2 — 30 words ezhuthiyaal mathi! But those 30 words must cover 3 Inhaltspunkte.'",
            "Exam format: You read a short situation, then write a message/email addressing 3 given points (Inhaltspunkte)",
            "Structure: Anrede (greeting) + Body (address all 3 Inhaltspunkte) + Gruß (closing)",
            "Greetings: Liebe/Lieber... (informal), Sehr geehrte Damen und Herren (formal)",
            "Closings: Viele Grüße / Liebe Grüße (informal), Mit freundlichen Grüßen (formal)",
            "Example prompt: Your friend invited you to dinner but you can't come. Write a message: (1) thank for invitation, (2) say you can't come and why, (3) suggest another day",
            "Model answer: 'Liebe Anna, vielen Dank für die Einladung! Leider kann ich am Samstag nicht kommen. Ich muss arbeiten. Können wir uns am Sonntag treffen? Viele Grüße, Rahul'",
            "Tip: One sentence per Inhaltspunkt is enough — keep it simple!",
            "Common mistakes: Forgetting one of the 3 points, no greeting/closing, too formal for friends",
            "Closing: 'Simple sentences, all 3 points covered — athrem mathi for full marks!'"
          ],
          keyVocabulary: ["die Nachricht", "die Einladung", "absagen", "sich entschuldigen", "vorschlagen"],
          learningObjectives: [
            "Understand the Schreiben Teil 2 exam format with 3 Inhaltspunkte",
            "Write a short message addressing all 3 required points",
            "Use appropriate greetings (Anrede) and closings (Gruß)",
            "Keep within the 30-word target"
          ],
          placeholderThumbnail: "/images/thumbnails/schreiben-messages.jpg"
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
          explanation: "This answer covers all 3 Inhaltspunkte: (1) Entschuldigung — 'es tut mir leid', (2) Grund — 'ich bin krank', (3) Hausaufgaben — 'Können Sie mir die Hausaufgaben schicken?' It also has proper Anrede and Gruß.",
          xpReward: 15
        },
        {
          id: "ex18-2-2",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou are writing to your friend Tom to invite him to dinner.\n\nComplete the greeting: '___ Tom, ich möchte dich zum Abendessen einladen.'",
          correctAnswer: "Lieber",
          explanation: "'Lieber' is used for a male friend (Lieber Tom). For a female friend, use 'Liebe' (Liebe Anna). For formal letters, use 'Sehr geehrter Herr...' or 'Sehr geehrte Frau...'.",
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
          explanation: "All 3 Inhaltspunkte are covered: (1) sich bedanken — 'vielen Dank für deine Hilfe', (2) einladen — 'am Samstag zum Essen einladen', (3) fragen — 'Was isst du gern?'. Proper informal greeting and closing too.",
          xpReward: 15
        },
        {
          id: "ex18-2-4",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou want to apologize for not coming: 'Es tut mir ___, ich kann leider nicht kommen.'",
          correctAnswer: "leid",
          explanation: "'Es tut mir leid' = I'm sorry. This is the standard apology phrase. In Schreiben Teil 2, you'll often need this when writing about cancellations or absences.",
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
          explanation: "When responding to a formal ad and you don't know the person's name, use 'Sehr geehrte Damen und Herren' (Dear Sir or Madam). This is formal — matching the Vermieter (landlord) context.",
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
          explanation: "All 3 Inhaltspunkte: (1) Termin absagen — 'ich muss meinen Termin absagen', (2) Grund — 'ich muss arbeiten', (3) neuer Termin — 'Kann ich am Mittwoch kommen?' Formal greeting and closing for a doctor's office.",
          xpReward: 15
        },
        {
          id: "ex18-2-7",
          type: "fill-blank",
          question: "📝 SCHREIBEN TEIL 2\n\nYou want to suggest meeting on a different day: 'Können wir ___ am Freitag treffen?'",
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
          correctAnswer: "verschieben",
          explanation: "'verschieben' = to postpone/reschedule. 'Ich möchte meinen Termin verschieben' = I would like to reschedule my appointment. Very common in Schreiben Teil 2 tasks about changing plans.",
          xpReward: 15
        }
      ],
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
      videos: [
        {
          id: "v18-3-1",
          title: "Sprechen Teil 1 - Sich Vorstellen",
          duration: "10:00",
          description: "Learn how to introduce yourself perfectly in the Goethe A1 Sprechen Teil 1 — cover all required topics with confidence.",
          scriptOutline: [
            "Opening: 'Sprechen Teil 1 — just introduce yourself! Nammale patti parayuka — athrem mathi!'",
            "What happens: You get topic cards (Wortkarten) with keywords like Name?, Alter?, Land? — speak about each one",
            "Topic 1 — Name: 'Ich heiße Rahul Menon.' / 'Mein Name ist Priya Nair.'",
            "Topic 2 — Alter: 'Ich bin 23 Jahre alt.'",
            "Topic 3 — Land/Wohnort: 'Ich komme aus Indien.' / 'Ich wohne in München.'",
            "Topic 4 — Sprachen: 'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.'",
            "Topic 5 — Beruf: 'Ich bin Student.' / 'Ich arbeite als Ingenieur.'",
            "Topic 6 — Wohnort: 'Ich wohne in Kochi.' / 'Ich wohne in einer Wohnung in Berlin.'",
            "Topic 7 — Familie: 'Ich habe eine Schwester und einen Bruder.'",
            "Topic 8 — Hobbys: 'Meine Hobbys sind Lesen und Kochen.' / 'Ich spiele gern Cricket.'",
            "Exam tip: Speak clearly and slowly — one sentence per Wortkarte is enough!",
            "Closing: 'Practice your introduction 10 times — mirror-inte munnilum practice cheyyaam! Guaranteed marks!'"
          ],
          keyVocabulary: ["sich vorstellen", "der Steckbrief", "die Sprache", "der Beruf", "das Hobby"],
          learningObjectives: [
            "Introduce yourself covering all required Sprechen Teil 1 topics",
            "Respond to Wortkarten (topic cards) with correct German sentences",
            "Create a personal Steckbrief (profile card)",
            "Speak clearly and confidently in exam conditions"
          ],
          placeholderThumbnail: "/images/thumbnails/sprechen-vorstellen.jpg"
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
          explanation: "'Ich heiße ...' = My name is / I am called. Always answer in a complete sentence: 'Ich heiße Deepa Krishnan.' You can also say 'Mein Name ist Deepa Krishnan.'",
          xpReward: 15
        },
        {
          id: "ex18-3-2",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Alter?'\n\nYou are 25 years old. Complete: 'Ich ___ 25 Jahre alt.'",
          correctAnswer: "bin",
          explanation: "'Ich bin ... Jahre alt' = I am ... years old. Use 'bin' (the ich-form of 'sein') with age. This is different from English where we 'have' years — in German you 'are' years old.",
          xpReward: 15
        },
        {
          id: "ex18-3-3",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Land?'\n\nWhich sentence correctly states where you come from?",
          options: [
            "Ich komme aus Indien.",
            "Ich gehe aus Indien.",
            "Ich fahre Indien.",
            "Mein Land Indien."
          ],
          correctAnswer: "Ich komme aus Indien.",
          explanation: "'Ich komme aus ...' = I come from. Use 'kommen' + 'aus' for country of origin. You can add detail: 'Ich komme aus Indien, aus Kerala.'",
          xpReward: 15
        },
        {
          id: "ex18-3-4",
          type: "fill-blank",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Sprachen?'\n\nComplete: 'Ich ___ Malayalam, Englisch und ein bisschen Deutsch.'",
          correctAnswer: "spreche",
          explanation: "'Ich spreche ...' = I speak. Use 'sprechen' to talk about languages. 'Ein bisschen' = a little — useful for languages you're still learning!",
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
          explanation: "'Ich bin ... von Beruf.' = I am a ... by profession. No article needed! For students: 'Ich bin Student/Studentin.' You can also say: 'Ich arbeite als Krankenschwester.'",
          xpReward: 15
        },
        {
          id: "ex18-3-6",
          type: "multiple-choice",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Wohnort?'\n\nYou live in Berlin. Which is the best response?",
          options: [
            "Ich wohne in Berlin.",
            "Berlin.",
            "Wohnort Berlin.",
            "Ich gehe Berlin."
          ],
          correctAnswer: "Ich wohne in Berlin.",
          explanation: "'Ich wohne in ...' = I live in. Always give a complete sentence. You can add detail: 'Ich wohne in Berlin, in einer kleinen Wohnung.'",
          xpReward: 15
        },
        {
          id: "ex18-3-7",
          type: "ordering",
          question: "🎤 SPRECHEN TEIL 1 — Wortkarte: 'Hobbys?'\n\nPut these words in order: 'sind / Meine / Kochen / Hobbys / und / Schwimmen'",
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
        }
      ],
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
      videos: [
        {
          id: "v18-4-1",
          title: "Sprechen Teil 2 - Fragen und Antworten",
          duration: "10:00",
          description: "Learn how Sprechen Teil 2 works — draw topic cards and practice asking and answering questions with a partner.",
          scriptOutline: [
            "Opening: 'Sprechen Teil 2 — topic card eduthu question chodikkuka and answer pareyuka!'",
            "How it works: You and your partner each draw Wortkarten with a topic word. You must ask a question using that word, and your partner answers.",
            "Example Wortkarte: 'Supermarkt' → 'Wo ist der nächste Supermarkt?' / 'Gehen Sie oft in den Supermarkt?'",
            "Two types of questions: W-Fragen (Was? Wo? Wann? Wie?) and Ja/Nein-Fragen (verb first)",
            "Topic: Essen — 'Was essen Sie gern?' / 'Kochen Sie oft?'",
            "Topic: Familie — 'Haben Sie Geschwister?' / 'Wo wohnt Ihre Familie?'",
            "Topic: Wohnung — 'Wohnen Sie in einer Wohnung oder einem Haus?' / 'Wie viele Zimmer hat Ihre Wohnung?'",
            "Topic: Freizeit — 'Was machen Sie in der Freizeit?' / 'Treiben Sie Sport?'",
            "Topic: Arbeit — 'Was sind Sie von Beruf?' / 'Wo arbeiten Sie?'",
            "Topic: Reisen — 'Wohin reisen Sie gern?' / 'Reisen Sie oft?'",
            "Topic: Einkaufen — 'Wo kaufen Sie gern ein?' / 'Was kaufen Sie oft?'",
            "Key: Ask ONE clear question and give a SHORT but complete answer — never just 'Ja' or 'Nein'!",
            "Tip: If you don't understand, say 'Können Sie das bitte wiederholen?'",
            "Closing: 'Question chodikkal + complete answer pareyuka — easy formula for Teil 2!'"
          ],
          keyVocabulary: ["die Frage", "die Antwort", "stellen", "beantworten", "das Thema"],
          learningObjectives: [
            "Formulate questions from topic Wortkarten",
            "Ask both W-Fragen and Ja/Nein-Fragen on everyday topics",
            "Give complete answers (not just Ja/Nein)",
            "Handle 7 common exam topics: Essen, Familie, Wohnung, Freizeit, Arbeit, Reisen, Einkaufen"
          ],
          placeholderThumbnail: "/images/thumbnails/sprechen-fragen.jpg"
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
          correctAnswer: "wiederholen",
          explanation: "'Können Sie das bitte wiederholen?' = Can you please repeat that? This is an essential exam phrase! The examiners won't mark you down for asking them to repeat once.",
          xpReward: 15
        },
        {
          id: "ex18-4-10",
          type: "ordering",
          question: "🎤 SPRECHEN TEIL 2 — Put these words in order to ask where someone works:\n\n'arbeiten / Wo / Sie / ?'",
          correctAnswer: ["Wo", "arbeiten", "Sie", "?"],
          explanation: "'Wo arbeiten Sie?' = Where do you work? In W-Fragen, the word order is: W-Wort + Verb + Subjekt. This is a standard question structure for Sprechen Teil 2.",
          xpReward: 15
        }
      ],
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
          placeholderThumbnail: "/images/thumbnails/sprechen-bitten.jpg"
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

    // ==================== LESSON 18-6 ====================
    {
      id: "18-6",
      title: "Kompletter Übungstest — Alle 4 Teile",
      titleGerman: "Kompletter Übungstest — Hören, Lesen, Schreiben, Sprechen",
      description: "Take a complete Goethe A1 mock exam! All 4 parts — Hören (5), Lesen (5), Schreiben (3), Sprechen (3) — in authentic exam format. You've got this!",
      duration: "90 min",
      xpReward: 300,
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
          placeholderThumbnail: "/images/thumbnails/mock-exam-final.jpg"
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
          correctAnswer: "25.12.2000",
          explanation: "German date format: TT.MM.JJJJ = 25.12.2000 (25th December 2000). Day first, then month, then year, separated by dots. This is one of the most common form fields in Schreiben Teil 1!",
          xpReward: 18
        },
        {
          id: "ex18-6-12",
          type: "fill-blank",
          question: "✍️ SCHREIBEN — Teil 1 (Formular)\n\n📋 ANMELDUNG ZUM DEUTSCHKURS — Goethe-Institut\n\nYou live at Mozartstraße 15, 80336 München.\n\nForm field: 'Straße, Hausnummer' → ___",
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
          question: "🎤 SPRECHEN — Teil 1 (Sich vorstellen)\n\nPut these self-introduction sentences in a logical order:\n\n'Ich spreche Malayalam, Englisch und ein bisschen Deutsch.' / 'Ich heiße Meera Nair.' / 'Ich komme aus Indien, aus Kerala.' / 'Ich bin 24 Jahre alt.' / 'Meine Hobbys sind Lesen und Tanzen.'",
          correctAnswer: ["Ich heiße Meera Nair.", "Ich bin 24 Jahre alt.", "Ich komme aus Indien, aus Kerala.", "Ich spreche Malayalam, Englisch und ein bisschen Deutsch.", "Meine Hobbys sind Lesen und Tanzen."],
          explanation: "A natural Vorstellung (self-introduction) follows this order: Name → Alter → Herkunft (origin) → Sprachen → Hobbys. This is the expected flow for Sprechen Teil 1. Each sentence covers one Wortkarte topic.",
          xpReward: 20
        },
        {
          id: "ex18-6-15",
          type: "multiple-choice",
          question: "🎤 SPRECHEN — Teil 2 (Fragen & Antworten)\n\nWortkarte: 'Wohnen'\n\nYour partner asks: 'Wo wohnen Sie?'\n\nWhich is the best answer?",
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
          question: "🎤 SPRECHEN — Teil 3 (Bitten)\n\nSituationskarte: 'Sie sind an der Hotelrezeption. Sie brauchen das WLAN-Passwort.'\n\nWhich request is best?",
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
      ],
      vocabulary: []
    }
  ]
};