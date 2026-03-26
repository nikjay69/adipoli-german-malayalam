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
  learningTips: [
    "Touch each body part and say it in German: der Kopf, die Hand, das Bein. Physical association = faster recall.",
    "Practice saying 'Ich habe Kopfschmerzen' (I have a headache) — you WILL need this in Germany.",
    "German compound words are logical: Kopf (head) + Schmerzen (pain) = Kopfschmerzen. Break them apart to understand!",
  ],
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
            "Opening: 'Body parts German-il padikkan time aayi — thalayil thudangi kaalil theerum! Nammude body-ye patti parayaan kure words padikkaam.'",
            "der Kopf (head) — 'Top-il ulla Kopf!'",
            "das Auge (eye) — plural: die Augen. 'Auge looks like eye if you squint!'",
            "die Nase (nose), der Mund (mouth), das Ohr (ear) — plural: die Ohren",
            "der Arm (arm), die Hand (hand) — easy cognates from English. Nammukku familiar aanu!",
            "das Bein (leg), der Fuß (foot) — 'Fuß looks like foot!'. Remember: leg is 'Bein', like a bone.",
            "der Rücken (back), der Bauch (stomach/belly) — 'Bauch' like the sound you make if someone hits you there! Ouch-Bauch!",
            "The Grammar of Pain: 'Mein Kopf tut weh' — My head hurts.",
            "The Verb Pattern: [body part] + tut weh (singular) or tun weh (plural).",
            "Malayalam parallel: 'Ente thala vedanikkunnu' — here 'vedanikkunnu' comes at the end, just like 'weh' in German!",
            "Practice: Point and name — quick-fire body part drill."
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
        { id: "ex10-1-1", type: "matching", question: "Match the German body part to its English meaning:", options: ["der Kopf", "das Auge", "die Hand", "der Fuß", "der Bauch"], correctAnswer: ["head", "eye", "hand", "foot", "stomach/belly"], explanation: "Identifying basic body parts is the foundation of medical German. Note the genders: der (masc), die (fem), das (neut).", xpReward: 15 },
        { id: "ex10-1-2", type: "multiple-choice", question: "How do you say 'My head hurts' in German?", options: ["Mein Kopf tut weh.", "Mein Kopf ist weh.", "Ich habe Kopf weh.", "Mein Kopf schmerzt weh."], correctAnswer: "Mein Kopf tut weh.", explanation: "The standard pattern is [Body Part] + tut weh. 'Wehtun' is a separable verb, so 'weh' goes to the very end of the sentence.", xpReward: 10 },
        { id: "ex10-1-3", type: "fill-blank", question: "Meine Augen tun ___ . (hurt — plural form)", options: ["weh", "schlecht", "krank", "Schmerzen"], correctAnswer: "weh", explanation: "When the body part is plural (Augen), the verb changes from 'tut' to 'tun'. Think of it as 'My eyes DO hurt'.", xpReward: 10 },
        { id: "ex10-1-4", type: "multiple-choice", question: "What is the correct article for 'Nase' (nose)?", options: ["die Nase", "der Nase", "das Nase", "den Nase"], correctAnswer: "die Nase", explanation: "'Nase' is feminine. A good mnemonic: 'Nase' ends in 'e', and many feminine nouns in German end in 'e'.", xpReward: 10 },
        { id: "ex10-1-5", type: "ordering", question: "Arrange: 'My back hurts a lot'", options: ["Mein", "Rücken", "tut", "sehr", "weh"], correctAnswer: ["Mein", "Rücken", "tut", "sehr", "weh"], explanation: "Structure: Subject + Verb (tut) + Adverb (sehr) + Separable Prefix (weh).", xpReward: 15 },
        { id: "ex10-1-6", type: "fill-blank", question: "Mein ___ ist gebrochen. (arm)", options: ["Arm", "Bein", "Fuß", "Kopf"], correctAnswer: "Arm", explanation: "'Arm' is masculine ('der Arm'), so it uses 'Mein' (no ending for masculine/neuter nominative).", xpReward: 10 },
        { id: "ex10-1-7", type: "multiple-choice", question: "Which body part is 'das Ohr'?", options: ["ear", "eye", "mouth", "nose"], correctAnswer: "ear", explanation: "das Ohr (ear) is neuter. The plural is 'die Ohren'. Think of 'Hear' having 'ear' in it!", xpReward: 10 },
        { id: "ex10-1-8", type: "matching", question: "Match the body part to its correct article:", options: ["der Rücken", "die Hand", "das Bein", "der Mund", "das Ohr"], correctAnswer: ["back", "hand", "leg", "mouth", "ear"], explanation: "Memorizing articles with the nouns is non-negotiable in German. der Rücken (m), die Hand (f), das Bein (n).", xpReward: 15 }
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
            "Opening: 'Aiyyo, enikku vayya — ithu German-il engane parayum? Ailments-ine patti clear aayi padikkaam!'",
            "Recap: 'Ich habe' + noun for ailments — Kopfschmerzen, Fieber, Husten, Schnupfen.",
            "Compound nouns: Kopf+Schmerzen, Hals+Schmerzen, Zahn+Schmerzen — just stack them like Lego blocks!",
            "Halsschmerzen (sore throat) — 'Hals' = neck/throat. 'Enikku thonda-vedana undu'.",
            "Zahnschmerzen (toothache) — 'Zahn' = tooth. Don't forget the 'Z' sound (ts-ahn)!",
            "The Dativ Trap: 'Mir ist schlecht' (I feel nauseous) — NOT 'Ich bin schlecht'!",
            "Grammar Alert: 'Ich bin schlecht' means 'I am a bad person'. Unless you're a villain, don't say this!",
            "Mir ist warm / Mir ist kalt — physical sensations ALWAYS use Dativ 'Mir'. Why? Because the cold is happening *to* you.",
            "Practice dialogue: Two friends, one is sick — full conversation in real-time speed.",
            "Wrap-up: 'Ippo ningalkku doctor-nte aduthu poyal enthu parayanam ennu krithyamayi ariyaam!'"
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
        { id: "ex10-3-1", type: "multiple-choice", question: "How does a German doctor ask 'What's wrong with you?' (formal)?", options: ["Was fehlt Ihnen?", "Was ist falsch?", "Wie geht es dir?", "Was haben Sie?"], correctAnswer: "Was fehlt Ihnen?", explanation: "'Was fehlt Ihnen?' is the standard medical opening. 'Fehlen' literally means 'to be missing'. So the doctor is asking 'What is missing from your health?'. Very central German phrasing!", xpReward: 10 },
        { id: "ex10-3-2", type: "fill-blank", question: "Ich möchte einen ___ machen. (appointment)", options: ["Termin", "Besuch", "Platz", "Dienst"], correctAnswer: "Termin", explanation: "'Einen Termin machen' is the colocation you need. In Germany, almost everything (doctor, bank, government) starts with a 'Termin'.", xpReward: 10 },
        { id: "ex10-3-3", type: "matching", question: "Match the German medical term to its English meaning:", options: ["die Arztpraxis", "das Rezept", "die Tabletten", "die Versicherungskarte", "der Termin"], correctAnswer: ["doctor's office", "prescription", "pills/tablets", "insurance card", "appointment"], explanation: "Mastering these 5 words makes your first doctor's visit 90% easier. Note that 'Rezept' means prescription, NOT food recipe (which is 'Rezept' too, but different context!)!", xpReward: 15 },
        { id: "ex10-3-4", type: "multiple-choice", question: "Your doctor asks 'Seit wann haben Sie die Schmerzen?' What does this mean?", options: ["Since when have you had the pain?", "Where do you have the pain?", "How strong is the pain?", "Do you have pain?"], correctAnswer: "Since when have you had the pain?", explanation: "'Seit wann' is a classic 'Since when' question. The doctor wants the timeline to diagnose you correctly.", xpReward: 10 },
        { id: "ex10-3-5", type: "ordering", question: "Arrange: 'I have had a stomachache since yesterday'", options: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], correctAnswer: ["Ich", "habe", "seit", "gestern", "Bauchschmerzen"], explanation: "Structure: Subject + Verb + Time Clause (seit gestern) + The Ailment (Bauch+Schmerzen). Focus on the compound noun 'Bauchschmerzen'.", xpReward: 15 },
        { id: "ex10-3-6", type: "fill-blank", question: "Ich habe Schmerzen ___ . (here)", options: ["hier", "dort", "da", "wo"], correctAnswer: "hier", explanation: "'Hier' (here) is essential when pointing to where it hurts. Simple but very practical!", xpReward: 10 },
        { id: "ex10-3-7", type: "multiple-choice", question: "In Germany, where do you get your medicine after visiting the doctor?", options: ["At the Apotheke (pharmacy) with a Rezept", "The doctor gives you medicine directly", "At the supermarket", "At the Krankenhaus (hospital)"], correctAnswer: "At the Apotheke (pharmacy) with a Rezept", explanation: "CRITICAL: German doctors don't sell medicine. They give you a 'Rezept' (prescription), and you walk to a separate 'Apotheke'. This is a major cultural difference from many Indian clinics.", xpReward: 10 },
        { id: "ex10-3-8", type: "fill-blank", question: "Die Schmerzen sind ___ . (unbearable)", options: ["unerträglich", "stark", "dumpf", "brennend"], correctAnswer: "unerträglich", explanation: "'Un-erträglich' = Not-bearable. Use this only if the pain is truly extreme. For normal pain, use 'stark' (strong).", xpReward: 10 }
      ],
      vocabulary: [
        { id: "vocab10-3-1", german: "die Arztpraxis", english: "doctor's office", malayalam: "ഡോക്ടറുടെ ക്ലിനിക്ക്", pronunciation: "ahrts-prah-xis", example: "Ich muss zur Arztpraxis.", exampleTranslation: "I have to go to the doctor's office." },
        { id: "vocab10-3-2", german: "der Termin", english: "appointment", malayalam: "അപ്പോയിന്റ്മെന്റ്", pronunciation: "ter-meen", example: "Haben Sie einen Termin?", exampleTranslation: "Do you have an appointment?" },
        { id: "vocab10-3-3", german: "die Versicherungskarte", english: "insurance card", malayalam: "ഇൻഷുറൻസ് കാർഡ്", pronunciation: "fer-zikh-er-oongs-kar-te", example: "Ihre Versicherungskarte, bitte.", exampleTranslation: "Your insurance card, please." },
        { id: "vocab10-3-4", german: "die Schmerzen", english: "pain (plural)", malayalam: "വേദന", pronunciation: "shmer-tsen", example: "Wo genau sind die Schmerzen?", exampleTranslation: "Where exactly is the pain?" },
        { id: "vocab10-3-5", german: "das Rezept", english: "prescription", malayalam: "മരുന്ന് കുറിപ്പടി", pronunciation: "re-tsept", example: "Hier ist Ihr Rezept.", exampleTranslation: "Here is your prescription." },
        { id: "vocab10-3-6", german: "die Tabletten", english: "pills / tablets", malayalam: "ഗുളികകൾ", pronunciation: "tah-blet-ten", example: "Nehmen Sie diese Tabletten.", exampleTranslation: "Take these tablets." },
        { id: "vocab10-3-7", german: "die Untersuchung", english: "examination", malayalam: "പരിശോധന", pronunciation: "oon-ter-zoo-khoong", example: "Die Untersuchung ist fertig.", exampleTranslation: "The examination is finished." },
        { id: "vocab10-3-8", german: "der Arzt", english: "doctor (male)", malayalam: "ആൺ ഡോക്ടർ", pronunciation: "ahrts", example: "Ich bin Arzt von Beruf.", exampleTranslation: "I am a doctor by profession." },
        { id: "vocab10-3-9", german: "die Ärztin", english: "doctor (female)", malayalam: "പെൺ ഡോക്ടർ", pronunciation: "ehrts-tin", example: "Die Ärztin hilft mir.", exampleTranslation: "The (female) doctor helps me." },
        { id: "vocab10-3-10", german: "das Medikament", english: "medication", malayalam: "മരുന്ന്", pronunciation: "me-di-kah-ment", example: "Dieses Medikament ist stark.", exampleTranslation: "This medication is strong." }
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
            "Opening: 'Germany-yil Apotheke ennu parayumbol — athu nammalute medical store alla machane! It's a pharmacy on legal steroids!'",
            "die Apotheke — Pharmacists in Germany are experts. They can often help you with minor issues without a doctor.",
            "The Visual Signal: Look for the big red 'A' with a green cross. It's like the Bat-signal for medicine!",
            "Rezeptfrei (Free of Prescription): Over-the-counter medicines. But wait — even basic Paracetamol must be bought here, not in the supermarket!",
            "Rezeptpflichtig (Under Prescription): Stronger medicines (like Antibiotics) that MUST have a doctor's slip.",
            "Cultural Shock: Supermarkets in Germany sell zero medicine. Only the Apotheke sells it!",
            "Key Phrase: 'Ich brauche etwas gegen [ailment]' — I need something for/against...",
            "Vocabulary: die Tablette (pill), der Sirup (syrup), die Salbe (ointment).",
            "Notdienst: If it's a Sunday or Midnight, look up the 'Notapotheke' on duty. One pharmacy stays open for everybody!",
            "Handing in the slip: 'Ich habe ein Rezept vom Arzt.' — I have a prescription from the doctor."
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
        { id: "ex10-4-1", type: "multiple-choice", question: "What makes German pharmacies (Apotheke) different from Indian medical stores?", options: ["Even basic medicines like paracetamol can only be bought at an Apotheke", "They are open 24/7", "They are cheaper than Indian stores", "They sell groceries too"], correctAnswer: "Even basic medicines like paracetamol can only be bought at an Apotheke", explanation: "Germany has a strict 'Apothekenpflicht'. Even simple painkillers can't be sold in supermarkets. This ensures every medicine sale is supervised by a professional pharmacist.", xpReward: 10 },
        { id: "ex10-4-2", type: "fill-blank", question: "Ich brauche etwas ___ Kopfschmerzen. (for/against)", options: ["gegen", "für", "mit", "von"], correctAnswer: "gegen", explanation: "In German, medications are 'gegen' (against) an illness, not 'für' (for) it. If you say 'für', it sounds like you want to keep the headache!", xpReward: 10 },
        { id: "ex10-4-3", type: "matching", question: "Match the German pharmacy item to its English meaning:", options: ["die Tablette", "der Sirup", "die Salbe", "das Pflaster", "das Schmerzmittel"], correctAnswer: ["tablet/pill", "syrup", "ointment/cream", "band-aid/plaster", "painkiller"], explanation: "Pflaster (band-aid) and Schmerzmittel (pain-killer) are the most common things people buy rezeptfrei (without prescription).", xpReward: 15 },
        { id: "ex10-4-4", type: "multiple-choice", question: "What does 'rezeptpflichtig' mean?", options: ["Requires a prescription", "Over-the-counter", "Very expensive", "Only for children"], correctAnswer: "Requires a prescription", explanation: "Pflicht = duty/obligation. Rezept-pflichtig means a prescription is an absolute requirement. You can't talk your way out of it in Germany!", xpReward: 10 },
        { id: "ex10-4-5", type: "ordering", question: "Arrange: 'I have a prescription from the doctor'", options: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], correctAnswer: ["Ich", "habe", "ein", "Rezept", "vom", "Arzt"], explanation: "Structure: Subject (Ich) + Verb (habe) + Object (ein Rezept) + Origin (vom Arzt).", xpReward: 15 },
        { id: "ex10-4-6", type: "fill-blank", question: "Wie oft ___ ich das nehmen? (should)", options: ["soll", "will", "kann", "muss"], correctAnswer: "soll", explanation: "Use the modal verb 'sollen' (should) when asking for advice or instructions. Use 'müssen' (must) if the doctor ordered it.", xpReward: 10 },
        { id: "ex10-4-7", type: "multiple-choice", question: "You need something for allergies. How do you ask at the Apotheke?", options: ["Ich brauche etwas gegen Allergien.", "Ich will Allergien haben.", "Wo sind die Allergien?", "Haben Sie Allergien?"], correctAnswer: "Ich brauche etwas gegen Allergien.", explanation: "'Ich brauche etwas gegen...' is the universal formula. Learn it, use it, survive!", xpReward: 10 },
        { id: "ex10-4-8", type: "ordering", question: "Arrange: 'Take one tablet three times daily'", options: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], correctAnswer: ["Nehmen", "Sie", "dreimal", "täglich", "eine", "Tablette"], explanation: "Command structure: Verb (Nehmen) + Polite Subject (Sie) + Frequency (dreimal täglich) + Object (eine Tablette).", xpReward: 15 }
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
        { id: "ex10-5-1", type: "multiple-choice", question: "Which number do you call for an ambulance in Germany?", options: ["112", "110", "108", "911"], correctAnswer: "112", explanation: "EUROPE-WIDE RULE: Dial 112 for Ambulance and Fire. Dial 110 for Police. No credit? No SIM? 112 often still works! Memorize the 'Duo' — 110/112.", xpReward: 10 },
        { id: "ex10-5-2", type: "fill-blank", question: "Ich brauche einen ___ ! (ambulance)", options: ["Krankenwagen", "Polizei", "Feuerwehr", "Arzt"], correctAnswer: "Krankenwagen", explanation: "Krank-en-wagen. Literally 'Sick-car'. It's the most important word in an emergency. If you forget, just scream 'Hilfe' and '112'!", xpReward: 10 },
        { id: "ex10-5-3", type: "matching", question: "Match the German emergency word to its English meaning:", options: ["der Unfall", "die Verletzung", "das Blut", "die Notaufnahme", "der Notfall"], correctAnswer: ["accident", "injury", "blood", "emergency room", "emergency"], explanation: "Knowing these words helps the dispatcher send the right help. Note: 'Notfall' is any emergency; 'Unfall' is specifically an accident.", xpReward: 15 },
        { id: "ex10-5-4", type: "ordering", question: "Arrange: 'Someone is injured, call an ambulance!'", options: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], correctAnswer: ["Jemand", "ist", "verletzt,", "rufen", "Sie", "einen", "Krankenwagen!"], explanation: "Command: rufen Sie! Object: einen Krankenwagen! Information: Jemand ist verletzt!", xpReward: 15 },
        { id: "ex10-5-5", type: "multiple-choice", question: "What does 'Es gab einen Unfall' mean?", options: ["There was an accident", "There is a fire", "Someone is bleeding", "I need a doctor"], correctAnswer: "There was an accident", explanation: "'Es gab' is the past of 'Es gibt' (There is). Use this to report what already happened when the police arrive.", xpReward: 10 },
        { id: "ex10-5-6", type: "fill-blank", question: "Jemand ist ___ ! (injured)", options: ["verletzt", "krank", "müde", "tot"], correctAnswer: "verletzt", explanation: "Verletzt comes from 'verletzen' (to injure). It's a key word for reporting casualties at an accident scene.", xpReward: 10 }
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
