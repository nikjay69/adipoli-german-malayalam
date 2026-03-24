import type { Module } from '../types';

export const MODULE_10: Module = {
  id: 10,
  title: "Health & Body",
  titleGerman: "Gesundheit",
  description: "Learn to talk about your body, describe symptoms, and visit the doctor in German.",
  icon: "🏥",
  color: "#ec4899",
  totalHours: 10,
  unlockRequirement: "Complete Module 9",
  lessons: [
    {
      id: "10-1",
      title: "Body Parts",
      titleGerman: "Körperteile",
      description: "Learn the German words for body parts — from head to toe! Plus, learn to say 'My ... hurts' with 'tut weh'.",
      duration: "50 min",
      xpReward: 130,
      videos: [
        {
          id: "v10-1-1",
          title: "Der Körper - Body Parts in German",
          duration: "12:00",
          description: "A fun tour of body parts in German with easy memory tricks for Malayalam speakers",
          scriptOutline: [
            "Opening: 'Body parts German-il padikkan time aayi — thalayil thudangi kaalil therum!'",
            "der Kopf (head) — 'Your Kopf is your top!'",
            "das Auge (eye) — plural: die Augen",
            "die Nase (nose), der Mund (mouth), das Ohr (ear) — plural: die Ohren",
            "der Arm (arm), die Hand (hand) — easy cognates from English!",
            "das Bein (leg), der Fuß (foot) — 'Fuß looks like foot!'",
            "der Rücken (back), der Bauch (stomach/belly)",
            "Key phrase: 'Mein Kopf tut weh' — My head hurts",
            "Pattern: [body part] + tut weh / tun weh (singular/plural)",
            "Practice: Point and name — quick-fire body part drill"
          ],
          keyVocabulary: ["der Kopf", "das Auge", "die Hand", "der Fuß", "tut weh"],
          learningObjectives: [
            "Name at least 10 body parts in German with correct articles",
            "Use 'tut weh' to express pain in a specific body part",
            "Know the plural forms of common body parts"
          ],
          placeholderThumbnail: "/images/thumbnails/body-parts.jpg"
        },
        {
          id: "v10-1-2",
          title: "Tut weh! — Expressing Pain Like a Pro",
          duration: "8:00",
          description: "Master the 'tut weh' and 'tun weh' pattern to describe any ache or pain",
          scriptOutline: [
            "Opening: 'Oru body part vedanikkunnu ennu parayaan German-il super easy aanu!'",
            "Singular pattern: 'Mein Kopf tut weh' — one thing hurts",
            "Plural pattern: 'Meine Augen tun weh' — multiple things hurt",
            "Adding intensity: 'ein bisschen' (a little), 'sehr' (very), 'furchtbar' (terribly)",
            "Mein Kopf tut ein bisschen weh vs. Mein Kopf tut furchtbar weh — BIG difference!",
            "Formal at the doctor: 'Mein Rücken tut weh' — same pattern, works everywhere",
            "Quick drill: I show a body part, you say the 'tut weh' sentence!",
            "Wrap-up: 'Ippo ningalkku enthu vedanichaalum German-il parayaam!'"
          ],
          keyVocabulary: ["tut weh", "tun weh", "ein bisschen", "sehr", "furchtbar"],
          learningObjectives: [
            "Confidently use 'tut weh' for singular and 'tun weh' for plural body parts",
            "Add intensity modifiers to pain descriptions",
            "Produce full sentences about pain in different body parts"
          ],
          placeholderThumbnail: "/images/thumbnails/tut-weh.jpg"
        }
      ],
      exercises: [
        { id: "ex10-1-1", type: "matching", question: "Match the German body part to its English meaning:", options: ["der Kopf", "das Auge", "die Hand", "der Fuß", "der Bauch"], correctAnswer: ["head", "eye", "hand", "foot", "stomach/belly"], xpReward: 15 },
        { id: "ex10-1-2", type: "multiple-choice", question: "How do you say 'My head hurts' in German?", options: ["Mein Kopf tut weh.", "Mein Kopf ist weh.", "Ich habe Kopf weh.", "Mein Kopf schmerzt weh."], correctAnswer: "Mein Kopf tut weh.", explanation: "The pattern is: [Body part] + 'tut weh' (hurts). 'Mein Kopf tut weh' literally means 'My head does hurt/ache'.", xpReward: 10 },
        { id: "ex10-1-3", type: "fill-blank", question: "Meine Augen tun ___ . (hurt — plural form)", options: ["weh", "schlecht", "krank", "Schmerzen"], correctAnswer: "weh", explanation: "For plural body parts (like Augen — eyes), use 'tun weh' instead of 'tut weh'. The 'weh' stays the same.", xpReward: 10 },
        { id: "ex10-1-4", type: "multiple-choice", question: "What is the correct article for 'Nase' (nose)?", options: ["die Nase", "der Nase", "das Nase", "den Nase"], correctAnswer: "die Nase", explanation: "'Nase' is feminine, so it takes the article 'die'. Remember: die Nase!", xpReward: 10 },
        { id: "ex10-1-5", type: "ordering", question: "Arrange: 'My back hurts a lot'", options: ["Mein", "Rücken", "tut", "sehr", "weh"], correctAnswer: ["Mein", "Rücken", "tut", "sehr", "weh"], xpReward: 15 },
        { id: "ex10-1-6", type: "fill-blank", question: "Mein ___ ist gebrochen. (arm)", options: ["Arm", "Bein", "Fuß", "Kopf"], correctAnswer: "Arm", explanation: "'Mein Arm ist gebrochen' means 'My arm is broken'. 'Arm' is masculine, so 'Mein' stays as-is (no ending).", xpReward: 10 },
        { id: "ex10-1-7", type: "multiple-choice", question: "Which body part is 'das Ohr'?", options: ["ear", "eye", "mouth", "nose"], correctAnswer: "ear", explanation: "'das Ohr' (neuter) means 'ear'. The plural is 'die Ohren'. Remember: 'Ohr' sounds a bit like the English exclamation 'Oh!' — you hear it with your ear!", xpReward: 10 },
        { id: "ex10-1-8", type: "matching", question: "Match the body part to its correct article:", options: ["der Rücken", "die Hand", "das Bein", "der Mund", "das Ohr"], correctAnswer: ["back", "hand", "leg", "mouth", "ear"], xpReward: 15 }
      ],
      vocabulary: [
        { id: "vocab10-1-1", german: "der Kopf", english: "head", malayalam: "തല", pronunciation: "kopf", example: "Mein Kopf tut weh.", exampleTranslation: "My head hurts." },
        { id: "vocab10-1-2", german: "das Auge", english: "eye", malayalam: "കണ്ണ്", pronunciation: "ow-ge", example: "Ich habe blaue Augen.", exampleTranslation: "I have blue eyes." },
        { id: "vocab10-1-3", german: "die Nase", english: "nose", malayalam: "മൂക്ക്", pronunciation: "nah-ze", example: "Meine Nase ist verstopft.", exampleTranslation: "My nose is blocked." },
        { id: "vocab10-1-4", german: "der Mund", english: "mouth", malayalam: "വായ", pronunciation: "moont", example: "Öffnen Sie den Mund, bitte.", exampleTranslation: "Open your mouth, please." },
        { id: "vocab10-1-5", german: "das Ohr", english: "ear", malayalam: "ചെവി", pronunciation: "ohr", example: "Mein Ohr tut weh.", exampleTranslation: "My ear hurts." },
        { id: "vocab10-1-6", german: "der Arm", english: "arm", malayalam: "കൈ", pronunciation: "ahrm", example: "Mein Arm ist gebrochen.", exampleTranslation: "My arm is broken." },
        { id: "vocab10-1-7", german: "die Hand", english: "hand", malayalam: "കൈപ്പത്തി", pronunciation: "hahnt", example: "Gib mir deine Hand.", exampleTranslation: "Give me your hand." },
        { id: "vocab10-1-8", german: "das Bein", english: "leg", malayalam: "കാൽ", pronunciation: "byne", example: "Mein Bein schmerzt.", exampleTranslation: "My leg hurts." },
        { id: "vocab10-1-9", german: "der Fuß", english: "foot", malayalam: "പാദം", pronunciation: "foos", example: "Mein Fuß tut weh.", exampleTranslation: "My foot hurts." },
        { id: "vocab10-1-10", german: "der Rücken", english: "back", malayalam: "മുതുക്", pronunciation: "rü-ken", example: "Ich habe Rückenschmerzen.", exampleTranslation: "I have back pain." },
        { id: "vocab10-1-11", german: "das Krankenhaus", english: "hospital", malayalam: "ആശുപത്രി", pronunciation: "dahs krahn-ken-hows", example: "Mein Bruder ist im Krankenhaus.", exampleTranslation: "My brother is in the hospital." }
      ]
    },
    {
      id: "10-2",
      title: "How Are You Feeling?",
      titleGerman: "Wie geht es dir?",
      description: "Express how you feel — from tired and sick to headaches and fever. Master the Dativ for feelings!",
      duration: "50 min",
      xpReward: 130,
      videos: [
        {
          id: "v10-2-1",
          title: "Wie geht es dir? — Feelings & Health",
          duration: "12:00",
          description: "Learn to talk about how you feel, common ailments, and the Dativ pattern for feelings",
          scriptOutline: [
            "Opening: 'Sugam aanennu parayaan German-il ariyaam — let's learn!'",
            "Mir geht es gut — I'm doing well (Dativ: MIR, not ICH!)",
            "Mir geht es schlecht / nicht so gut — I'm not doing well",
            "Adjectives: müde (tired), krank (sick), gesund (healthy)",
            "Common ailments with 'Ich habe...': Kopfschmerzen, Bauchschmerzen",
            "Fieber (fever), Husten (cough), Schnupfen (cold/runny nose)",
            "Grammar spotlight: Dativ for feelings — MIR geht es..., MIR ist kalt/warm",
            "MIR ist kalt (I feel cold) vs ICH bin kalt (wrong — means 'I am cold-hearted!')",
            "Dialogue: 'Was ist los?' 'Mir geht es nicht gut. Ich habe Kopfschmerzen.'",
            "Practice: Describe how different people are feeling"
          ],
          keyVocabulary: ["Mir geht es gut", "Kopfschmerzen", "Fieber", "krank", "müde"],
          learningObjectives: [
            "Express how you feel using 'Mir geht es...'",
            "Describe common ailments using 'Ich habe...'",
            "Understand why Dativ (Mir) is used for feelings, not Nominativ (Ich)"
          ],
          placeholderThumbnail: "/images/thumbnails/feelings-health.jpg"
        },
        {
          id: "v10-2-2",
          title: "Ich habe... — Ailments & the Dativ Trap",
          duration: "9:00",
          description: "Deep-dive into 'Ich habe + ailment' and the tricky Dativ feelings that catch every beginner",
          scriptOutline: [
            "Opening: 'Aiyyo, enikku vayya — ithu German-il engane parayum?'",
            "Recap: 'Ich habe' + noun for ailments — Kopfschmerzen, Fieber, Husten, Schnupfen",
            "Compound nouns: Kopf+Schmerzen, Hals+Schmerzen, Zahn+Schmerzen — just stack them!",
            "Halsschmerzen (sore throat) — 'Hals' = neck/throat",
            "Zahnschmerzen (toothache) — 'Zahn' = tooth",
            "The Dativ trap: Mir ist schlecht (I feel nauseous) — NOT 'Ich bin schlecht'!",
            "'Ich bin schlecht' = I am a bad person! Very different meaning!",
            "Mir ist warm / Mir ist kalt — physical sensations always use Dativ",
            "Practice dialogue: Two friends, one is sick — full conversation",
            "Wrap-up: 'Ippo ningalkku doctor-nte aduthu poyal enthu parayaan ariyaam!'"
          ],
          keyVocabulary: ["Halsschmerzen", "Zahnschmerzen", "Mir ist schlecht", "Mir ist kalt"],
          learningObjectives: [
            "Build compound nouns for different types of pain",
            "Avoid the 'Ich bin schlecht' vs 'Mir ist schlecht' mistake",
            "Use Dativ correctly for physical sensations"
          ],
          placeholderThumbnail: "/images/thumbnails/ailments-dativ.jpg"
        }
      ],
      exercises: [
        { id: "ex10-2-1", type: "multiple-choice", question: "How do you correctly say 'I'm not doing well' in German?", options: ["Mir geht es nicht gut.", "Ich gehe nicht gut.", "Mich geht es nicht gut.", "Ich bin nicht gut."], correctAnswer: "Mir geht es nicht gut.", explanation: "In German, feelings use the Dativ case: 'MIR geht es...' (literally: 'To me it goes...'). 'Mir' is the Dativ form of 'ich'.", xpReward: 10 },
        { id: "ex10-2-2", type: "fill-blank", question: "Ich habe ___ . (headache)", options: ["Kopfschmerzen", "Kopfweh", "Kopf tut weh", "Kopfkrank"], correctAnswer: "Kopfschmerzen", explanation: "'Kopfschmerzen' literally means 'head pains' (Kopf + Schmerzen). It's the standard way to say 'headache'. 'Ich habe Kopfschmerzen' = I have a headache.", xpReward: 10 },
        { id: "ex10-2-3", type: "matching", question: "Match the German health word to its English meaning:", options: ["müde", "krank", "das Fieber", "der Husten", "der Schnupfen"], correctAnswer: ["tired", "sick", "fever", "cough", "cold/runny nose"], xpReward: 15 },
        { id: "ex10-2-4", type: "multiple-choice", question: "Why is 'Mir ist kalt' correct, but 'Ich bin kalt' wrong?", options: ["Feelings use Dativ (Mir); 'Ich bin kalt' means 'I am cold-hearted'", "'Mir' and 'Ich' mean the same thing here", "'Ich bin kalt' is actually correct too", "There is no difference"], correctAnswer: "Feelings use Dativ (Mir); 'Ich bin kalt' means 'I am cold-hearted'", explanation: "Physical sensations use Dativ in German: 'Mir ist kalt' = I feel cold. 'Ich bin kalt' would mean you're a cold-hearted person — very different!", xpReward: 15 },
        { id: "ex10-2-5", type: "ordering", question: "Arrange: 'I am sick and have a fever'", options: ["Ich", "bin", "krank", "und", "habe", "Fieber"], correctAnswer: ["Ich", "bin", "krank", "und", "habe", "Fieber"], xpReward: 15 },
        { id: "ex10-2-6", type: "fill-blank", question: "___ geht es dir? (How are you? — informal)", options: ["Wie", "Was", "Wo", "Wer"], correctAnswer: "Wie", explanation: "'Wie geht es dir?' means 'How are you?' (informal). 'Wie' = how, 'geht' = goes, 'es' = it, 'dir' = to you (Dativ). Literally: 'How goes it to you?'", xpReward: 10 },
        { id: "ex10-2-7", type: "fill-blank", question: "Ich habe ___ . (sore throat)", options: ["Halsschmerzen", "Halsweh", "Halskrank", "Halsfieber"], correctAnswer: "Halsschmerzen", explanation: "'Halsschmerzen' = Hals (throat/neck) + Schmerzen (pains). German builds compound nouns by stacking — just combine the body part with 'Schmerzen'!", xpReward: 10 },
        { id: "ex10-2-8", type: "multiple-choice", question: "What does 'Mir ist schlecht' mean?", options: ["I feel nauseous / I feel unwell", "I am a bad person", "I am feeling sad", "I have bad luck"], correctAnswer: "I feel nauseous / I feel unwell", explanation: "'Mir ist schlecht' uses Dativ and means 'I feel unwell/nauseous'. If you said 'Ich bin schlecht', it would mean 'I am a bad person' — a classic beginner mistake!", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab10-2-1", german: "krank", english: "sick / ill", malayalam: "രോഗിയായ / അസുഖമുള്ള", pronunciation: "krahnk", example: "Ich bin heute krank.", exampleTranslation: "I am sick today." },
        { id: "vocab10-2-2", german: "gesund", english: "healthy", malayalam: "ആരോഗ്യമുള്ള", pronunciation: "ge-zoont", example: "Er ist wieder gesund.", exampleTranslation: "He is healthy again." },
        { id: "vocab10-2-3", german: "müde", english: "tired", malayalam: "ക്ഷീണിതനായ", pronunciation: "mü-de", example: "Ich bin sehr müde.", exampleTranslation: "I am very tired." },
        { id: "vocab10-2-4", german: "die Kopfschmerzen", english: "headache", malayalam: "തലവേദന", pronunciation: "kopf-shmer-tsen", example: "Ich habe starke Kopfschmerzen.", exampleTranslation: "I have a strong headache." },
        { id: "vocab10-2-5", german: "die Bauchschmerzen", english: "stomachache", malayalam: "വയറുവേദന", pronunciation: "bowkh-shmer-tsen", example: "Das Kind hat Bauchschmerzen.", exampleTranslation: "The child has a stomachache." },
        { id: "vocab10-2-6", german: "das Fieber", english: "fever", malayalam: "പനി", pronunciation: "fee-ber", example: "Ich habe hohes Fieber.", exampleTranslation: "I have a high fever." },
        { id: "vocab10-2-7", german: "der Husten", english: "cough", malayalam: "ചുമ", pronunciation: "hoo-sten", example: "Ich habe einen schlimmen Husten.", exampleTranslation: "I have a bad cough." },
        { id: "vocab10-2-8", german: "der Schnupfen", english: "cold / runny nose", malayalam: "ജലദോഷം", pronunciation: "shnoop-fen", example: "Ich habe Schnupfen.", exampleTranslation: "I have a cold." },
        { id: "vocab10-2-9", german: "die Halsschmerzen", english: "sore throat", malayalam: "തൊണ്ടവേദന", pronunciation: "hahls-shmer-tsen", example: "Ich habe seit gestern Halsschmerzen.", exampleTranslation: "I have had a sore throat since yesterday." },
        { id: "vocab10-2-10", german: "die Zahnschmerzen", english: "toothache", malayalam: "പല്ലുവേദന", pronunciation: "tsahn-shmer-tsen", example: "Meine Zahnschmerzen sind unerträglich.", exampleTranslation: "My toothache is unbearable." }
      ]
    },
    {
      id: "10-3",
      title: "At the Doctor",
      titleGerman: "Beim Arzt",
      description: "Navigate a doctor's visit in Germany — from making an appointment to getting a prescription.",
      duration: "60 min",
      xpReward: 150,
      videos: [
        {
          id: "v10-3-1",
          title: "Beim Arzt - At the Doctor's Office",
          duration: "12:00",
          description: "Everything you need to know for visiting a doctor in Germany",
          scriptOutline: [
            "Opening: 'Germany-yil doctor-de aduthu poyal onnum pedi venda — namukku prepare aakaam!'",
            "die Arztpraxis — doctor's office (not hospital! Germans go to Praxis first)",
            "Making an appointment: 'Ich möchte einen Termin machen'",
            "At reception: die Versicherungskarte (insurance card) — VERY important!",
            "In the waiting room: das Wartezimmer",
            "The doctor asks: 'Was fehlt Ihnen?' (What's wrong with you?)",
            "'Seit wann haben Sie die Schmerzen?' (Since when have you had the pain?)",
            "'Nehmen Sie Medikamente?' (Do you take any medication?)",
            "Getting your Rezept (prescription) — needed for most medicines!",
            "Key difference: In Germany, you get prescription → go to Apotheke (separate!)"
          ],
          keyVocabulary: ["die Arztpraxis", "der Termin", "die Versicherungskarte", "Was fehlt Ihnen?"],
          learningObjectives: [
            "Make a doctor's appointment in German",
            "Describe symptoms to a doctor",
            "Understand the German healthcare process (Praxis → Rezept → Apotheke)"
          ],
          placeholderThumbnail: "/images/thumbnails/at-the-doctor.jpg"
        },
        {
          id: "v10-3-2",
          title: "Describing Symptoms",
          duration: "10:00",
          description: "Learn to describe exactly what's wrong — where it hurts, how long, and how bad",
          scriptOutline: [
            "'Ich habe Schmerzen hier' + pointing — the universal starter!",
            "Location: 'Hier tut es weh' (It hurts here)",
            "Duration: 'Seit gestern / seit drei Tagen / seit einer Woche'",
            "Intensity: 'ein bisschen' (a little), 'stark' (strong), 'unerträglich' (unbearable)",
            "Types of pain: stechend (stabbing), dumpf (dull), brennend (burning)",
            "Useful phrases: 'Mir ist schwindelig' (I'm dizzy), 'Mir ist übel' (I feel nauseous)",
            "Doctor's instructions: 'Machen Sie den Mund auf', 'Atmen Sie tief ein'",
            "das Rezept — the prescription you take to the Apotheke"
          ],
          keyVocabulary: ["die Schmerzen", "seit wann", "das Rezept", "die Tabletten"],
          learningObjectives: [
            "Describe the location, duration, and intensity of symptoms",
            "Understand common doctor instructions",
            "Know what to do with a Rezept (prescription)"
          ],
          placeholderThumbnail: "/images/thumbnails/describing-symptoms.jpg"
        }
      ],
      exercises: [
        { id: "ex10-3-1", type: "multiple-choice", question: "How does a German doctor ask 'What's wrong with you?' (formal)?", options: ["Was fehlt Ihnen?", "Was ist falsch?", "Wie geht es dir?", "Was haben Sie?"], correctAnswer: "Was fehlt Ihnen?", explanation: "'Was fehlt Ihnen?' literally means 'What is lacking/missing with you?' and is the standard formal way a doctor asks what's wrong.", xpReward: 10 },
        { id: "ex10-3-2", type: "fill-blank", question: "Ich möchte einen ___ machen. (appointment)", options: ["Termin", "Besuch", "Platz", "Dienst"], correctAnswer: "Termin", explanation: "'einen Termin machen' means 'to make an appointment'. This is the standard phrase used when calling a doctor's office.", xpReward: 10 },
        { id: "ex10-3-3", type: "matching", question: "Match the German medical term to its English meaning:", options: ["die Arztpraxis", "das Rezept", "die Tabletten", "die Versicherungskarte", "der Termin"], correctAnswer: ["doctor's office", "prescription", "pills/tablets", "insurance card", "appointment"], xpReward: 15 },
        { id: "ex10-3-4", type: "multiple-choice", question: "Your doctor asks 'Seit wann haben Sie die Schmerzen?' What does this mean?", options: ["Since when have you had the pain?", "Where do you have the pain?", "How strong is the pain?", "Do you have pain?"], correctAnswer: "Since when have you had the pain?", explanation: "'Seit wann' means 'since when'. The doctor wants to know how long you've been experiencing the symptoms.", xpReward: 10 },
        { id: "ex10-3-5", type: "ordering", question: "Arrange: 'I have had a stomachache since yesterday'", options: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], correctAnswer: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], xpReward: 15 },
        { id: "ex10-3-6", type: "fill-blank", question: "Ich habe Schmerzen ___ . (here)", options: ["hier", "dort", "da", "wo"], correctAnswer: "hier", explanation: "'Ich habe Schmerzen hier' (I have pain here) is the simplest way to indicate where it hurts, usually accompanied by pointing.", xpReward: 10 },
        { id: "ex10-3-7", type: "multiple-choice", question: "In Germany, where do you get your medicine after visiting the doctor?", options: ["At the Apotheke (pharmacy) with a Rezept", "The doctor gives you medicine directly", "At the supermarket", "At the Krankenhaus (hospital)"], correctAnswer: "At the Apotheke (pharmacy) with a Rezept", explanation: "In Germany, the doctor writes a Rezept (prescription), and you take it to a separate Apotheke (pharmacy) to get your medicine. The doctor's office doesn't dispense medicine!", xpReward: 10 },
        { id: "ex10-3-8", type: "fill-blank", question: "Die Schmerzen sind ___ . (unbearable)", options: ["unerträglich", "stark", "dumpf", "brennend"], correctAnswer: "unerträglich", explanation: "'unerträglich' means 'unbearable'. It's the strongest way to describe pain intensity. 'un-' (not) + 'erträglich' (bearable).", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab10-3-1", german: "die Arztpraxis", english: "doctor's office", malayalam: "ഡോക്ടറുടെ ഓഫീസ്", pronunciation: "ahrts-prah-xis", example: "Die Arztpraxis ist um die Ecke.", exampleTranslation: "The doctor's office is around the corner." },
        { id: "vocab10-3-2", german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen", example: "Ich habe einen Termin um zehn Uhr.", exampleTranslation: "I have an appointment at ten o'clock." },
        { id: "vocab10-3-3", german: "die Versicherungskarte", english: "insurance card", malayalam: "ഇൻഷുറൻസ് കാർഡ്", pronunciation: "fer-zikh-er-oongs-kar-te", example: "Haben Sie Ihre Versicherungskarte dabei?", exampleTranslation: "Do you have your insurance card with you?" },
        { id: "vocab10-3-4", german: "die Schmerzen", english: "pain (plural)", malayalam: "വേദന", pronunciation: "shmer-tsen", example: "Wo haben Sie Schmerzen?", exampleTranslation: "Where do you have pain?" },
        { id: "vocab10-3-5", german: "das Rezept", english: "prescription", malayalam: "കുറിപ്പടി", pronunciation: "re-tsept", example: "Der Arzt hat mir ein Rezept gegeben.", exampleTranslation: "The doctor gave me a prescription." },
        { id: "vocab10-3-6", german: "die Tabletten", english: "pills / tablets", malayalam: "ഗുളികകൾ", pronunciation: "tah-blet-ten", example: "Nehmen Sie drei Tabletten am Tag.", exampleTranslation: "Take three tablets a day." },
        { id: "vocab10-3-7", german: "die Untersuchung", english: "examination", malayalam: "പരിശോധന", pronunciation: "oon-ter-zoo-khoong", example: "Die Untersuchung dauert zehn Minuten.", exampleTranslation: "The examination takes ten minutes." },
        { id: "vocab10-3-8", german: "der Arzt", english: "doctor (male)", malayalam: "ഡോക്ടർ", pronunciation: "ahrts", example: "Der Arzt kommt gleich.", exampleTranslation: "The doctor is coming shortly." },
        { id: "vocab10-3-9", german: "die Ärztin", english: "doctor (female)", malayalam: "ഡോക്ടർ (സ്ത്രീ)", pronunciation: "ehrts-tin", example: "Die Ärztin ist sehr nett.", exampleTranslation: "The (female) doctor is very nice." },
        { id: "vocab10-3-10", german: "das Medikament", english: "medication", malayalam: "മരുന്ന്", pronunciation: "me-di-kah-ment", example: "Nehmen Sie dieses Medikament nach dem Essen.", exampleTranslation: "Take this medication after eating." }
      ]
    },
    {
      id: "10-4",
      title: "At the Pharmacy",
      titleGerman: "In der Apotheke",
      description: "The German Apotheke is special! Learn to buy medicine, understand prescriptions, and navigate this unique institution.",
      duration: "50 min",
      xpReward: 130,
      videos: [
        {
          id: "v10-4-1",
          title: "In der Apotheke - Getting Medicine",
          duration: "12:00",
          description: "Navigate the German pharmacy system — very different from what you're used to in Kerala!",
          scriptOutline: [
            "Opening: 'Germany-yil Apotheke ennu parayumbol — athu nammalute medical store alla!'",
            "die Apotheke — NOT like an Indian medical store! Pharmacists are highly trained",
            "The green cross sign — how to spot an Apotheke",
            "Rezeptfrei (over-the-counter) vs rezeptpflichtig (prescription-only)",
            "Even paracetamol needs to be bought at an Apotheke! Not in supermarkets!",
            "Key phrase: 'Ich brauche etwas gegen Kopfschmerzen'",
            "Common medicines: die Tablette (tablet), der Sirup (syrup), die Salbe (ointment)",
            "das Pflaster (band-aid) — available without prescription",
            "Notdienst / Notapotheke — emergency pharmacies open nights and weekends",
            "Handing in your Rezept: 'Ich habe ein Rezept vom Arzt'"
          ],
          keyVocabulary: ["die Apotheke", "rezeptfrei", "rezeptpflichtig", "die Salbe", "das Pflaster"],
          learningObjectives: [
            "Understand how German pharmacies differ from Indian ones",
            "Ask for specific medicines using 'Ich brauche etwas gegen...'",
            "Know the difference between rezeptfrei and rezeptpflichtig"
          ],
          placeholderThumbnail: "/images/thumbnails/pharmacy.jpg"
        },
        {
          id: "v10-4-2",
          title: "Common Medicines & How to Ask for Them",
          duration: "8:00",
          description: "Learn the names of everyday medicines and how to ask the pharmacist for help",
          scriptOutline: [
            "Opening: 'Apotheke-yil chennal enthu parayanum — namukku padikkaam!'",
            "Starting phrase: 'Können Sie mir etwas empfehlen?' (Can you recommend something?)",
            "Pain relief: das Schmerzmittel — 'Haben Sie ein Schmerzmittel?'",
            "Specific medicines: Ibuprofen, Paracetamol — same names, different rules!",
            "For allergies: 'Ich brauche etwas gegen Allergien'",
            "For skin: die Creme (cream), die Salbe (ointment) — what's the difference?",
            "Dosage questions: 'Wie oft soll ich das nehmen?' (How often should I take this?)",
            "The pharmacist's answer: 'Dreimal täglich' (three times daily), 'nach dem Essen' (after eating)",
            "Wrap-up: 'Ippo ningalkku Apotheke-yil confident aayi pokaam!'"
          ],
          keyVocabulary: ["das Schmerzmittel", "die Creme", "empfehlen", "täglich"],
          learningObjectives: [
            "Ask the pharmacist for recommendations",
            "Name common types of medicine in German",
            "Understand dosage instructions"
          ],
          placeholderThumbnail: "/images/thumbnails/common-medicines.jpg"
        }
      ],
      exercises: [
        { id: "ex10-4-1", type: "multiple-choice", question: "What makes German pharmacies (Apotheke) different from Indian medical stores?", options: ["Even basic medicines like paracetamol can only be bought at an Apotheke", "They are open 24/7", "They are cheaper than Indian stores", "They sell groceries too"], correctAnswer: "Even basic medicines like paracetamol can only be bought at an Apotheke", explanation: "In Germany, you cannot buy most medicines (even basic painkillers) at supermarkets or regular stores. You MUST go to an Apotheke, which is run by trained pharmacists.", xpReward: 10 },
        { id: "ex10-4-2", type: "fill-blank", question: "Ich brauche etwas ___ Kopfschmerzen. (against/for)", options: ["gegen", "für", "mit", "von"], correctAnswer: "gegen", explanation: "'gegen' means 'against/for' when talking about remedies. 'Etwas gegen Kopfschmerzen' = something for/against headaches.", xpReward: 10 },
        { id: "ex10-4-3", type: "matching", question: "Match the German pharmacy item to its English meaning:", options: ["die Tablette", "der Sirup", "die Salbe", "das Pflaster", "das Schmerzmittel"], correctAnswer: ["tablet/pill", "syrup", "ointment/cream", "band-aid/plaster", "painkiller"], xpReward: 15 },
        { id: "ex10-4-4", type: "multiple-choice", question: "What does 'rezeptpflichtig' mean?", options: ["Requires a prescription", "Over-the-counter", "Very expensive", "Only for children"], correctAnswer: "Requires a prescription", explanation: "'rezeptpflichtig' = Rezept (prescription) + pflichtig (required/mandatory). These medicines can only be bought with a doctor's prescription.", xpReward: 10 },
        { id: "ex10-4-5", type: "ordering", question: "Arrange: 'I have a prescription from the doctor'", options: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], correctAnswer: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], xpReward: 15 },
        { id: "ex10-4-6", type: "fill-blank", question: "Wie oft ___ ich das nehmen? (should)", options: ["soll", "will", "kann", "muss"], correctAnswer: "soll", explanation: "'Wie oft soll ich das nehmen?' means 'How often should I take this?' 'soll' (should) is the correct modal verb for asking about recommended dosage.", xpReward: 10 },
        { id: "ex10-4-7", type: "multiple-choice", question: "You need something for allergies. How do you ask at the Apotheke?", options: ["Ich brauche etwas gegen Allergien.", "Ich will Allergien haben.", "Wo sind die Allergien?", "Haben Sie Allergien?"], correctAnswer: "Ich brauche etwas gegen Allergien.", explanation: "'Ich brauche etwas gegen...' (I need something for/against...) is the standard pattern for asking for medicine at a pharmacy.", xpReward: 10 },
        { id: "ex10-4-8", type: "ordering", question: "Arrange: 'Take one tablet three times daily'", options: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], correctAnswer: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], xpReward: 15 }
      ],
      vocabulary: [
        { id: "vocab10-4-1", german: "die Apotheke", english: "pharmacy", malayalam: "ഫാർമസി / മരുന്നുകട", pronunciation: "ah-po-tey-ke", example: "Die Apotheke ist neben dem Supermarkt.", exampleTranslation: "The pharmacy is next to the supermarket." },
        { id: "vocab10-4-2", german: "die Tablette", english: "tablet / pill", malayalam: "ഗുളിക", pronunciation: "tah-blet-te", example: "Nehmen Sie eine Tablette vor dem Essen.", exampleTranslation: "Take one tablet before eating." },
        { id: "vocab10-4-3", german: "der Sirup", english: "syrup", malayalam: "സിറപ്പ്", pronunciation: "zee-roop", example: "Der Hustensirup schmeckt süß.", exampleTranslation: "The cough syrup tastes sweet." },
        { id: "vocab10-4-4", german: "die Salbe", english: "ointment / cream", malayalam: "തേപ്പ് / മരുന്ന്", pronunciation: "zahl-be", example: "Diese Salbe hilft gegen Schmerzen.", exampleTranslation: "This ointment helps against pain." },
        { id: "vocab10-4-5", german: "das Pflaster", english: "band-aid / plaster", malayalam: "പ്ലാസ്റ്റർ", pronunciation: "pflah-ster", example: "Ich brauche ein Pflaster für meinen Finger.", exampleTranslation: "I need a band-aid for my finger." },
        { id: "vocab10-4-6", german: "rezeptfrei", english: "over-the-counter (no prescription needed)", malayalam: "കുറിപ്പടി ഇല്ലാതെ", pronunciation: "re-tsept-fry", example: "Ibuprofen ist rezeptfrei.", exampleTranslation: "Ibuprofen is over-the-counter." },
        { id: "vocab10-4-7", german: "rezeptpflichtig", english: "prescription-only", malayalam: "കുറിപ്പടി ആവശ്യമുള്ള", pronunciation: "re-tsept-pflikh-tikh", example: "Antibiotika sind rezeptpflichtig.", exampleTranslation: "Antibiotics are prescription-only." },
        { id: "vocab10-4-8", german: "das Schmerzmittel", english: "painkiller", malayalam: "വേദനസംഹാരി", pronunciation: "shmertz-mit-tel", example: "Haben Sie ein Schmerzmittel?", exampleTranslation: "Do you have a painkiller?" },
        { id: "vocab10-4-9", german: "die Creme", english: "cream", malayalam: "ക്രീം", pronunciation: "krehm", example: "Diese Creme ist gut für die Haut.", exampleTranslation: "This cream is good for the skin." },
        { id: "vocab10-4-10", german: "täglich", english: "daily", malayalam: "ദിവസേന", pronunciation: "tehg-likh", example: "Nehmen Sie die Tablette zweimal täglich.", exampleTranslation: "Take the tablet twice daily." }
      ]
    },
    {
      id: "10-5",
      title: "Emergency!",
      titleGerman: "Notfall!",
      description: "Know what to do in a German emergency — dial the right number, call for help, and navigate the Notaufnahme (ER).",
      duration: "50 min",
      xpReward: 140,
      videos: [
        {
          id: "v10-5-1",
          title: "Notfall! — Emergencies in Germany",
          duration: "14:00",
          description: "Critical German phrases for emergencies — from calling 112 to arriving at the Notaufnahme",
          scriptOutline: [
            "Opening: 'Ithu aarkkum venda situation aanu — but Germany-yil irunnal ee words arinjirikanam!'",
            "THE most important numbers: 112 (Feuerwehr & Rettungsdienst) and 110 (Polizei)",
            "112 = fire brigade AND ambulance — one number for both! Works all over Europe!",
            "110 = police only — remember: 'Ein-Eins-Null for the Polizei!'",
            "First phrase to learn: 'Ich brauche Hilfe!' (I need help!) — say it LOUD and CLEAR",
            "'Rufen Sie einen Krankenwagen!' (Call an ambulance!) — for bystanders",
            "'Es gab einen Unfall!' (There was an accident!) — reporting what happened",
            "Describing the emergency: Unfall (accident), Verletzung (injury), Blut (blood), Feuer (fire)",
            "'Jemand ist verletzt!' (Someone is injured!) — when you see someone hurt",
            "Location: 'Ich bin in der [Straße]' — always give your street name",
            "At the Notaufnahme (emergency room): 'Ich brauche sofort Hilfe!'",
            "The triage system: you may have to wait if it's not life-threatening",
            "Cultural note: In Germany, don't go to Notaufnahme for minor issues — use Bereitschaftsdienst (on-call service) or call 116117",
            "Wrap-up: 'Ee words oru diary-yil ezhuthi vekku — but use cheyyenda situation varaathirikkatte!'"
          ],
          keyVocabulary: ["der Notfall", "der Krankenwagen", "der Unfall", "die Verletzung", "die Notaufnahme", "112"],
          learningObjectives: [
            "Know the correct emergency numbers in Germany (112 and 110)",
            "Call for an ambulance and describe an emergency situation",
            "Use key emergency vocabulary: Unfall, Verletzung, Blut, Krankenwagen",
            "Understand how the Notaufnahme (ER) works in Germany"
          ],
          placeholderThumbnail: "/images/thumbnails/emergency.jpg"
        }
      ],
      exercises: [
        { id: "ex10-5-1", type: "multiple-choice", question: "Which number do you call for an ambulance in Germany?", options: ["112", "110", "108", "911"], correctAnswer: "112", explanation: "In Germany (and all of Europe), 112 is the number for both fire and ambulance services (Feuerwehr & Rettungsdienst). 110 is for the police (Polizei). Unlike India's 108, it's 112!", xpReward: 10 },
        { id: "ex10-5-2", type: "fill-blank", question: "Ich brauche einen ___ ! (ambulance)", options: ["Krankenwagen", "Polizei", "Feuerwehr", "Arzt"], correctAnswer: "Krankenwagen", explanation: "'Krankenwagen' literally means 'sick-car' (Kranken = sick + Wagen = car/vehicle). 'Ich brauche einen Krankenwagen!' = I need an ambulance!", xpReward: 10 },
        { id: "ex10-5-3", type: "matching", question: "Match the German emergency word to its English meaning:", options: ["der Unfall", "die Verletzung", "das Blut", "die Notaufnahme", "der Notfall"], correctAnswer: ["accident", "injury", "blood", "emergency room", "emergency"], xpReward: 15 },
        { id: "ex10-5-4", type: "ordering", question: "Arrange: 'Someone is injured, call an ambulance!'", options: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], correctAnswer: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], xpReward: 15 },
        { id: "ex10-5-5", type: "multiple-choice", question: "What does 'Es gab einen Unfall' mean?", options: ["There was an accident", "There is a fire", "Someone is bleeding", "I need a doctor"], correctAnswer: "There was an accident", explanation: "'Es gab' means 'there was' (past tense of 'es gibt'). 'Unfall' = accident. This is a key phrase when reporting an emergency.", xpReward: 10 },
        { id: "ex10-5-6", type: "fill-blank", question: "Jemand ist ___ ! (injured)", options: ["verletzt", "krank", "müde", "tot"], correctAnswer: "verletzt", explanation: "'verletzt' means 'injured'. 'Jemand ist verletzt!' (Someone is injured!) is one of the most important emergency phrases to know.", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab10-5-1", german: "der Notfall", english: "emergency", malayalam: "അടിയന്തരാവസ്ഥ", pronunciation: "noht-fahl", example: "Das ist ein Notfall!", exampleTranslation: "This is an emergency!" },
        { id: "vocab10-5-2", german: "der Krankenwagen", english: "ambulance", malayalam: "ആംബുലൻസ്", pronunciation: "krahn-ken-vah-gen", example: "Ich brauche einen Krankenwagen!", exampleTranslation: "I need an ambulance!" },
        { id: "vocab10-5-3", german: "der Unfall", english: "accident", malayalam: "അപകടം", pronunciation: "oon-fahl", example: "Es gab einen Unfall auf der Straße.", exampleTranslation: "There was an accident on the street." },
        { id: "vocab10-5-4", german: "die Verletzung", english: "injury", malayalam: "പരിക്ക്", pronunciation: "fer-let-tsoong", example: "Die Verletzung ist nicht schlimm.", exampleTranslation: "The injury is not serious." },
        { id: "vocab10-5-5", german: "das Blut", english: "blood", malayalam: "രക്തം", pronunciation: "bloot", example: "Es gibt viel Blut!", exampleTranslation: "There is a lot of blood!" },
        { id: "vocab10-5-6", german: "die Notaufnahme", english: "emergency room (ER)", malayalam: "എമർജൻസി റൂം", pronunciation: "noht-owf-nah-me", example: "Wir müssen sofort in die Notaufnahme.", exampleTranslation: "We must go to the ER immediately." },
        { id: "vocab10-5-7", german: "die Polizei", english: "police", malayalam: "പോലീസ്", pronunciation: "po-li-tsai", example: "Rufen Sie die Polizei! Die Nummer ist 110.", exampleTranslation: "Call the police! The number is 110." },
        { id: "vocab10-5-8", german: "die Feuerwehr", english: "fire brigade", malayalam: "അഗ്നിശമനസേന", pronunciation: "foy-er-vehr", example: "Die Feuerwehr kommt in fünf Minuten.", exampleTranslation: "The fire brigade is coming in five minutes." }
      ]
    }
  ]
};
