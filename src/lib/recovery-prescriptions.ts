export type RecoveryRetestMode = 'listen' | 'speak' | 'read' | 'write' | 'choose' | 'plan';

export type RecoveryStage = {
  method: string;
  mustDo: [string, string, ...string[]];
  output: string;
  timeBoxMinutes: number;
  libraryHref: string;
  libraryLabel: string;
};

export type FreshRetest = {
  id: string;
  mode: RecoveryRetestMode;
  prompt: string;
  expected: string;
  sourceRef: string;
  audioUrl?: string;
};

export type RecoveryPrescription = RecoveryStage & {
  weaknessTag: string;
  title: string;
  learnerMessage: string;
  /** Legacy summary used by the compact recovery card. */
  retest: string;
  level2: RecoveryStage;
  retests: readonly [FreshRetest, FreshRetest, ...FreshRetest[]];
};

type RetestSeed = Omit<FreshRetest, 'id' | 'sourceRef'> & { sourceRef?: string };

function stage(
  method: string,
  libraryHref: string,
  libraryLabel: string,
  timeBoxMinutes: number,
  output: string,
  mustDo: [string, string, ...string[]],
): RecoveryStage {
  return { method, libraryHref, libraryLabel, timeBoxMinutes, output, mustDo };
}

function retest(
  mode: RecoveryRetestMode,
  prompt: string,
  expected: string,
  audioUrl?: string,
  sourceRef?: string,
): RetestSeed {
  return { mode, prompt, expected, audioUrl, sourceRef };
}

function prescription(
  weaknessTag: string,
  title: string,
  level1: RecoveryStage,
  level2: RecoveryStage,
  retestA: RetestSeed,
  retestB: RetestSeed,
): RecoveryPrescription {
  const makeRetest = (seed: RetestSeed, variant: 'a' | 'b'): FreshRetest => ({
    ...seed,
    id: `${weaknessTag.replace(':', '-')}-${variant}`,
    sourceRef: seed.sourceRef ?? `3p-10:${weaknessTag}:${variant}`,
  });
  const retests = [makeRetest(retestA, 'a'), makeRetest(retestB, 'b')] as const;
  return {
    weaknessTag,
    title,
    learnerMessage: `${title} is the weak spot.`,
    ...level1,
    retest: retests[0].prompt,
    level2,
    retests,
  };
}

const prescriptions = [
  // Grammar
  prescription(
    'grammar:accusative_survival',
    'ein / eine / einen in requests',
    stage('colour-coded phrase build', '/learn/6', 'Food and drink lessons', 10, 'Six correct buying phrases said aloud.', ['Build ein/eine/einen + six common items with colour-coded chunks.', 'Say all six as Ich hätte gern ... requests without the colours.']),
    stage('counter role-play', '/games/food-order', 'Food-order role-play', 10, 'Three complete orders with no article swap.', ['Order one masculine, one feminine and one neuter item from picture cards.', 'Switch roles and repair every wrong article before the reply.']),
    retest('choose', 'New bakery card: choose the correct line for ordering Kaffee.', 'Ich hätte gern einen Kaffee.'),
    retest('speak', 'New kiosk card: order eine Suppe and ein Wasser aloud in one turn.', 'Ich hätte gern eine Suppe und ein Wasser.'),
  ),
  prescription(
    'grammar:articles',
    'Article + noun recall',
    stage('article sorting', '/games/article-blitz', 'Article Blitz', 12, 'Eight of ten unseen nouns matched to der/die/das.', ['Sort 20 high-frequency nouns into der, die and das.', 'Say article + noun for every miss before sorting it again.']),
    stage('room-scene naming', '/games/room-builder', 'Room Builder', 10, 'One room described with six correct article-noun chunks.', ['Place six objects into a room scene and name each with its article.', 'Cover the labels and describe the same room aloud.']),
    retest('choose', 'New desk card: complete ___ Tisch, ___ Lampe, ___ Bett.', 'der Tisch · die Lampe · das Bett'),
    retest('speak', 'New kitchen card: say the article with Kühlschrank, Tür and Fenster.', 'der Kühlschrank · die Tür · das Fenster'),
  ),
  prescription(
    'grammar:capitalisation_basics',
    'German sentence capitals',
    stage('cover-write-check', '/missions/module-1/first-mini-conversation', 'First mini-conversation', 8, 'Two clean sentences with sentence and noun capitals.', ['Copy Ich lerne Deutsch. once and mark both capitals.', 'Cover it, write it twice, then explain why Ich and Deutsch are capitalised.']),
    stage('error hunt', '/practice/write', 'Writing practice', 8, 'Six capitalisation errors found and repaired.', ['Find the capitalisation errors in six short A1 lines.', 'Rewrite the repaired lines without the marked version.']),
    retest('write', 'Write from English: “I speak German.” Capitalisation counts.', 'Ich spreche Deutsch.'),
    retest('write', 'Repair the new line: guten tag, ich lerne deutsch.', 'Guten Tag, ich lerne Deutsch.'),
  ),
  prescription(
    'grammar:formal_context',
    'Formal or casual context',
    stage('person-situation sorting', '/missions/module-1/formal-greetings', 'Formal greeting practice', 7, 'Teacher, stranger and friend sorted correctly.', ['Sort six people into Sie-world or du-world.', 'Say one fitting greeting and goodbye for each group.']),
    stage('full office exchange', '/games/dialogue-dash', 'Dialogue Dash', 10, 'One complete Sie-world exchange.', ['Run greet → request → thank → goodbye at an office counter.', 'Repeat with a different official and no prompt labels.']),
    retest('choose', 'You meet a new examiner at 9 AM. Choose the safest opening.', 'Guten Morgen.'),
    retest('speak', 'A close friend leaves in the evening. Give one casual goodbye aloud.', 'Tschüss.'),
  ),
  prescription(
    'grammar:modal_word_order',
    'Modal verb word order',
    stage('verb-frame rebuild', '/learn/10', 'Health and appointments lessons', 10, 'Five modal sentences with the second verb at the end.', ['Build können/müssen/möchten frames with the action slot at the end.', 'Repair five scrambled service sentences, then say them.']),
    stage('service-scene production', '/games/sentence-builder', 'Sentence Builder', 10, 'Four new modal requests produced without chunks.', ['Build two appointment and two travel sentences from scene cards.', 'Hide the chunks and produce the four sentences aloud.']),
    retest('write', 'Rebuild the new sentence: morgen / ich / arbeiten / muss.', 'Ich muss morgen arbeiten.'),
    retest('speak', 'Ask politely if you may pay by card, using können.', 'Kann ich mit Karte bezahlen?'),
  ),
  prescription(
    'grammar:negation',
    'nicht or kein',
    stage('noun-vs-action sorting', '/learn/6', 'Food and drink lessons', 8, 'Eight of ten new lines use the right negator.', ['Sort ten targets into noun negation (kein) or action/quality negation (nicht).', 'Write four personal examples and say them aloud.']),
    stage('shopping correction scene', '/games/food-order', 'Food-order role-play', 9, 'Four corrected preferences understood by the server.', ['Correct four wrong orders using kein/keine.', 'Reject two actions or qualities using nicht in a full sentence.']),
    retest('choose', 'New café card: complete “Ich trinke ___ Kaffee.”', 'keinen'),
    retest('write', 'Write: “The soup is not hot.”', 'Die Suppe ist nicht heiß.'),
  ),
  prescription(
    'grammar:possessives',
    'mein / meine',
    stage('family-card repair', '/learn/4', 'Family lessons', 8, 'Six family lines with no mein/meine swap.', ['Match mein to der/das people or things and meine to die/plural.', 'Say six real or invented family lines from cards.']),
    stage('photo-description scene', '/games/scene-sort', 'Scene Sort', 10, 'One four-line family description produced correctly.', ['Arrange a new family photo and label each person.', 'Describe the photo aloud after the labels disappear.']),
    retest('write', 'Complete the new line: “___ Bruder heißt Arun.”', 'Mein Bruder heißt Arun.'),
    retest('speak', 'Introduce a mother and two siblings with possessives.', 'Meine Mutter ... · meine Geschwister ...'),
  ),
  prescription(
    'grammar:question_order',
    'Question word order',
    stage('question-frame build', '/learn/2', 'Personal information lessons', 10, 'Six W-questions with the verb directly after the question word.', ['Build Wer/Wie/Wo/Woher + verb + subject frames.', 'Turn six answer cards into matching questions.']),
    stage('rapid interview', '/games/dialogue-dash', 'Dialogue Dash', 10, 'Five different questions asked without a word-order freeze.', ['Interview a new profile card using five question words.', 'Swap roles and answer every question in a full sentence.']),
    retest('write', 'Build the new question from: Sie / wohnen / wo.', 'Wo wohnen Sie?'),
    retest('speak', 'Ask a new classmate where they come from and what languages they speak.', 'Woher kommen Sie? · Welche Sprachen sprechen Sie?'),
  ),
  prescription(
    'grammar:verb_ending',
    'Present-tense verb endings',
    stage('ending grid', '/learn/5', 'Daily routine lessons', 10, 'ich/du/er forms automatic for three regular verbs.', ['Conjugate wohnen, lernen and arbeiten aloud for ich/du/er.', 'Repair ten wrong endings and say the full sentence.']),
    stage('persona switch', '/games/verb-rush', 'Verb Rush', 9, 'Six new subject-verb pairs produced at speed.', ['Switch between ich, du, Meera and Nivin cards every five seconds.', 'Use each card in a complete routine sentence.']),
    retest('write', 'Complete the new line: “Meera lern__ Deutsch.”', 'Meera lernt Deutsch.'),
    retest('speak', 'Say one sentence each with ich arbeite, du arbeitest and er arbeitet.', 'Correct -e, -est and -et endings.'),
  ),
  prescription(
    'grammar:verb_position',
    'Verb in position two',
    stage('sentence-strip rebuild', '/learn/5', 'Daily routine lessons', 10, 'Five personal sentences with the finite verb second.', ['Repair five scrambled routine sentences with the verb in slot two.', 'Say every repaired sentence after the strips are hidden.']),
    stage('timeline narration', '/games/story-builder', 'Story Builder', 10, 'A four-step day narrated with correct inversion.', ['Arrange a new day timeline with time phrases first.', 'Narrate it using Am Morgen/Um zwölf Uhr/Abends + verb + subject.']),
    retest('write', 'Repair the new line: “Am Montag ich arbeite.”', 'Am Montag arbeite ich.'),
    retest('speak', 'Start with “Um sieben Uhr” and say when you get up.', 'Um sieben Uhr stehe ich auf.'),
  ),

  // Listening
  prescription(
    'hoeren:announcements',
    'Announcement details',
    stage('hidden-transcript detail grid', '/learn/9', 'Travel lessons', 15, 'Place, time and action captured from five announcements.', ['Listen once with the transcript hidden and fill place/time/action.', 'Reveal only after answering; replay each miss once and shadow the key chunk.']),
    stage('station-board cross-check', '/tests', 'Mock listening', 15, 'Two new announcements matched to the correct board.', ['Read two station boards before listening.', 'Play new announcements once and select the matching platform/action.']),
    retest('listen', 'Fresh announcement A: play once and type the problem.', 'Der Zug hat Verspätung.', '/audio/exercises/dictation-train-delay.mp3', 'exercise:ex9-4-9'),
    retest('listen', 'Fresh announcement B: play once and type the platform line.', 'Der Zug fährt von Gleis 5.', '/audio/exercises/dictation-train-platform.mp3', 'exercise:ex17-2-11'),
  ),
  prescription(
    'hoeren:audio_to_form',
    'Audio-to-form transfer',
    stage('segmented data capture', '/learn/14', 'Official-life lessons', 12, 'Two forms completed from audio without a field swap.', ['Listen for name, number, date and place in separate passes.', 'Transfer each detail into a labelled mini-form, then check field by field.']),
    stage('speaker-card reconstruction', '/games/listen-act', 'Listen & Act', 12, 'One new profile reconstructed after one full-speed play.', ['Listen once without writing and choose the matching profile card.', 'Listen again and fill the missing data grid from memory.']),
    retest('listen', 'Fresh transfer A: play once and enter the complete name in the Name field.', 'Mein Name ist Meera.', '/audio/exercises/dictation-meera.mp3', 'exercise:ex2-5-11'),
    retest('listen', 'Fresh transfer B: play once and enter the exam name in the Prüfung field.', 'Start Deutsch eins.', '/audio/exercises/dictation-exam-name.mp3', 'exercise:ex17-1-11'),
  ),
  prescription(
    'hoeren:dialogue_detail',
    'Dialogue detail',
    stage('who-when-where notes', '/games/hor-und-los', 'Hör und Los', 12, 'Four of five dialogues decoded on first play.', ['Use a three-box who/when/where note grid.', 'Play five short dialogues once; write only the decisive detail.']),
    stage('scene-choice contrast', '/games/listen-act', 'Listen & Act', 12, 'Three new audio scenes matched to the right action.', ['Preview four possible actions, then hear the scene once.', 'Choose the action and quote the exact audio clue.']),
    retest('listen', 'Fresh detail A: play once and type where the speaker shops.', 'Ich kaufe im Supermarkt ein.', '/audio/exercises/dictation-shopping.mp3', 'exercise:ex5-3-8'),
    retest('listen', 'Fresh detail B: play once and type when the speaker eats lunch.', 'Um 12 Uhr esse ich zu Mittag.', '/audio/exercises/dictation-lunch.mp3', 'exercise:ex5-4-7'),
  ),
  prescription(
    'hoeren:greetings',
    'Greeting recognition by sound',
    stage('time-and-person audio sort', '/missions/module-1/greet-frau-weber?start=listen', 'Greeting mission', 10, 'Five greetings matched to time and person.', ['Replay the greeting set with the text hidden.', 'Write each greeting, then match it to morning/day/evening and formal/casual.']),
    stage('greeting scene switch', '/games/greeting-time', 'Greeting Time', 8, 'Six new scenes answered with the fitting greeting.', ['Hear a greeting without the picture and choose the scene.', 'Reveal the person/time, then answer aloud with the matching reply.']),
    retest('listen', 'Fresh greeting A: play once and type the complete informal opening.', 'Liebe Maria, wie geht es dir?', '/audio/exercises/dictation-greeting.mp3', 'exercise:ex18-2-11'),
    retest('listen', 'Fresh greeting B: play once and type the formal letter opening.', 'Sehr geehrte Damen und Herren.', '/audio/exercises/dictation-formal-greeting.mp3', 'exercise:ex14-4-9'),
  ),
  prescription(
    'hoeren:numbers',
    'Numbers heard accurately',
    stage('number dictation ladder', '/games/number-blitz', 'Number Blitz', 12, 'Twelve of fifteen numbers written correctly.', ['Hear and write five single digits, five teens and five two-digit numbers.', 'Say every miss aloud using the German number order.']),
    stage('real-data capture', '/learn/3', 'Numbers and time lessons', 12, 'One phone/time card completed without digit reversal.', ['Listen to a phone number and a time as real form data.', 'Group the digits, check once, then read the captured data back aloud.']),
    retest('listen', 'Fresh number A: play once and type the German number word.', 'siebzehn', '/audio/exercises/dictation-17.mp3', 'exercise:ex3-1-7'),
    retest('listen', 'Fresh number B: play once and write the heard time as digits.', '07:45', '/audio/exercises/dictation-745.mp3', 'exercise:ex3-3-8'),
  ),
  prescription(
    'hoeren:prices',
    'Prices heard accurately',
    stage('price dictation', '/games/number-blitz', 'Number Blitz', 12, 'Ten of twelve prices captured correctly.', ['Dictate twelve prices and mark euro/cents separately.', 'Replay only misses and say the number pattern before writing.']),
    stage('receipt matching', '/games/food-order', 'Food-order role-play', 10, 'Four spoken prices matched to the right receipt.', ['Preview four receipts with similar prices.', 'Hear each total once, choose the receipt and read the price back.']),
    retest('listen', 'Fresh price A: play once and type the full price sentence.', 'Das kostet fünf Euro.', '/audio/exercises/dictation-cost-5.mp3', 'exercise:ex7-2-7'),
    retest('listen', 'Fresh price B: play once and type the number word you hear.', 'siebzehn', '/audio/exercises/dictation-17.mp3', 'exercise:ex3-1-7-price-variant'),
  ),
  prescription(
    'hoeren:question_recognition',
    'Recognise the question being asked',
    stage('question-to-answer matching', '/missions/module-1/first-mini-conversation?start=listen', 'Mini-conversation mission', 8, 'Five heard questions matched to the right answer type.', ['Hear each question with text hidden.', 'Choose whether it asks name, origin, work, place or action, then answer.']),
    stage('interviewer cue cards', '/games/dialogue-dash', 'Dialogue Dash', 10, 'Four unseen questions answered within five seconds.', ['Hear a full-speed interviewer question once.', 'Pick the matching cue card, then give a complete spoken answer.']),
    retest('listen', 'Fresh question A: play once and state what information is requested.', 'The speaker asks about your job.', '/audio/exercises/dictation-job-question.mp3', 'exercise:ex18-4-14'),
    retest('listen', 'Fresh question B: play once and state what the speaker wants you to do.', 'The speaker asks you to tell something about yourself.', '/audio/exercises/dictation-tell-about-self.mp3', 'exercise:ex11-5-9'),
  ),
  prescription(
    'hoeren:question_words',
    'Hear the question word',
    stage('W-word discrimination', '/learn/2', 'Personal information lessons', 10, 'Eight of ten questions classified by W-word.', ['Listen only for Wie/Wo/Woher/Was/Wann before the rest of the line.', 'Write the W-word, then predict the answer type.']),
    stage('map-and-profile contrast', '/games/listen-act', 'Listen & Act', 10, 'Four new questions trigger the right visual answer.', ['Hear a question and choose map, person, clock or object.', 'Answer the same question aloud after the visual disappears.']),
    retest('listen', 'Fresh W-question A: play once and type the first question word.', 'Wo', '/audio/exercises/dictation-where-station.mp3', 'exercise:ex9-3-9'),
    retest('listen', 'Fresh W-question B: play once and type the first question word.', 'Was', '/audio/exercises/dictation-job-question.mp3', 'exercise:ex18-4-14-w-word'),
  ),
  prescription(
    'hoeren:repair_need',
    'Hear when repair is needed',
    stage('repair-phrase discrimination', '/missions/module-1/polite-exit?start=listen', 'Polite exit mission', 8, 'Repeat, slow-down and no-understanding cues separated.', ['Hear three failed-understanding moments and choose repeat, slower or clarify.', 'Shadow the fitting repair phrase twice for each moment.']),
    stage('interrupted-dialogue response', '/practice/conversation', 'Conversation practice', 10, 'Three missed lines repaired without switching to English.', ['Run a dialogue where one line is deliberately unclear.', 'Pause, request the exact repair, then continue the exchange.']),
    retest('listen', 'Fresh repair A: play once and type the polite repeat request.', 'Können Sie das bitte wiederholen?', '/audio/exercises/dictation-repeat.mp3', 'exercise:ex18-4-13'),
    retest('listen', 'Fresh repair B: play once; choose whether the speaker knows the answer.', 'The speaker does not know: Keine Ahnung.', '/audio/exercises/dictation-no-idea.mp3', 'exercise:ex15-4-7'),
  ),
  prescription(
    'hoeren:time_dates',
    'Times and dates by ear',
    stage('calendar dictation', '/learn/3', 'Numbers and time lessons', 12, 'Eight of ten appointments placed correctly.', ['Hear ten day/time phrases and place them on a blank calendar.', 'Replay misses and say the German time phrase before correcting.']),
    stage('planner action', '/games/listen-act', 'Listen & Act', 10, 'Four new planner entries chosen on first play.', ['Preview four similar planner slots.', 'Hear each appointment once, choose the slot and read it back.']),
    retest('listen', 'Fresh time A: play once and type the full planner line.', 'Am Montag arbeite ich.', '/audio/exercises/dictation-monday-work.mp3', 'exercise:ex5-5-9'),
    retest('listen', 'Fresh time B: play once and type the appointment statement.', 'Ich habe einen Termin.', '/audio/exercises/dictation-have-appointment.mp3', 'exercise:ex14-2-9'),
  ),

  // Reading
  prescription(
    'lesen:ads',
    'Match needs to ads',
    stage('need-word marking', '/games/was-steht-da', 'Was steht da?', 10, 'Seven of eight needs matched to the right ad.', ['Underline the one non-negotiable need before reading the ads.', 'Scan eight ads for that word, then confirm with one second detail.']),
    stage('layout-first ad scan', '/learn/17', 'Exam reading lessons', 10, 'Four new ads matched inside five minutes.', ['Sort ads by visual zone: price, time, place and service.', 'Match four needs without reading every word.']),
    retest('read', 'New ad A: “Samstag geöffnet, Schuhe 20% billiger.” Who needs this ad?', 'Someone shopping for discounted shoes on Saturday.'),
    retest('read', 'New ad B: “Zimmer frei ab Mai, Nähe Bahnhof.” Which need matches?', 'Someone needing a room from May near the station.'),
  ),
  prescription(
    'lesen:emails',
    'Read short messages for action',
    stage('who-when-where-action grid', '/games/was-steht-da', 'Was steht da?', 10, 'Four of five messages decoded completely.', ['Read five short messages and fill who/when/where/action.', 'Quote the exact words that prove each answer.']),
    stage('inbox triage', '/learn/12', 'Messages lessons', 10, 'Three new messages routed to the right next action.', ['Sort an inbox into reply, attend, bring and cancel.', 'Explain the decisive sentence before choosing.']),
    retest('read', 'New message A: “Der Kurs beginnt morgen um neun. Bitte bringen Sie einen Stift.” What must you do?', 'Arrive tomorrow at 9 and bring a pen.'),
    retest('read', 'New message B: “Ich bin krank. Können wir den Termin auf Freitag verschieben?” What action is requested?', 'Move the appointment to Friday.'),
  ),
  prescription(
    'lesen:forms',
    'Understand form labels',
    stage('field-label matching', '/learn/14', 'Official-life lessons', 8, 'Eight form labels matched to the right data.', ['Match Vorname/Nachname/Geburtsdatum/PLZ/Ort/Unterschrift to data.', 'Explain the two labels you previously confused.']),
    stage('document reconstruction', '/games/scene-sort', 'Scene Sort', 10, 'One unseen form rebuilt in the right order.', ['Place labels beside a blank official form from context.', 'Fill the form from a new person card without hints.']),
    retest('read', 'New form A asks “Geburtsort”. Which information belongs there?', 'The city or place where the person was born.'),
    retest('read', 'New form B asks “Staatsangehörigkeit”. Which entry fits?', 'The person’s nationality.'),
  ),
  prescription(
    'lesen:greeting_recognition',
    'Read greetings in context',
    stage('greeting situation match', '/practice/review', 'Five-minute review', 8, 'Five of five greetings matched to person and time.', ['Read five greeting cards without translation.', 'Match each to a new situation and say why it fits.']),
    stage('message-opening contrast', '/learn/12', 'Messages lessons', 8, 'Formal and informal openings separated in four messages.', ['Compare Hallo, Liebe/Lieber and Sehr geehrte ... openings.', 'Choose an opening for friend, teacher, office and stranger.']),
    retest('read', 'New card A says “Sehr geehrte Frau Koch,”. Who is the likely reader?', 'A woman addressed formally.'),
    retest('read', 'New card B says “Hallo Arun!”. Is this formal or casual?', 'Casual.'),
  ),
  prescription(
    'lesen:scanning',
    'Timed scanning',
    stage('keyword scan', '/learn/17', 'Exam reading lessons', 10, 'Four details found before time expires.', ['Circle the target type before reading: time, price, place or action.', 'Scan four texts for only that target and stop when evidence is found.']),
    stage('evidence-location race', '/games/was-steht-da', 'Was steht da?', 10, 'Four evidence lines located and quoted.', ['Use headings, numbers and bold words to predict the evidence zone.', 'Find and quote the exact line without reading from the beginning.']),
    retest('read', 'Timed text A: find the closing time in “Mo–Fr 8–18 Uhr, Sa 9–13 Uhr”.', '18:00 on weekdays; 13:00 on Saturday.'),
    retest('read', 'Timed text B: find the departure platform in “RE 7 nach Köln, Gleis 4”.', 'Platform 4.'),
  ),
  prescription(
    'lesen:signs',
    'Signs and notices',
    stage('sign-to-action matching', '/games/was-steht-da', 'Was steht da?', 12, 'Thirteen of fifteen signs trigger the right action.', ['Match 15 signs to what a person must or must not do.', 'Say the action in plain English before checking.']),
    stage('context-first sign reading', '/games/scene-sort', 'Scene Sort', 10, 'Five unseen signs placed in the right location.', ['Place signs into station, shop, office, street or building scenes.', 'Explain which word and icon fixed the location.']),
    retest('read', 'New sign A: “Kein Eingang”. What must you do?', 'Do not enter here.'),
    retest('read', 'New sign B: “Nur mit Termin”. Who may enter?', 'Only people with an appointment.'),
  ),
  prescription(
    'lesen:time_price_detail',
    'Time and price detail in text',
    stage('number-unit pairing', '/games/was-steht-da', 'Was steht da?', 10, 'Eight details paired with the correct euro/time unit.', ['Mark every number, then attach its nearest unit and noun.', 'Answer eight price/time questions using the full evidence phrase.']),
    stage('receipt-and-schedule contrast', '/games/number-blitz', 'Number Blitz', 10, 'Four similar details separated without guessing.', ['Compare two receipts and two schedules with near-matching numbers.', 'State the evidence for each choice before selecting.']),
    retest('read', 'New menu: “Suppe 4,50 €, Kaffee 2,20 €.” What is the total for one of each?', '6,70 €.'),
    retest('read', 'New notice: “Beratung 10–12 Uhr, Kasse ab 13 Uhr.” When does the cash desk open?', '13:00.'),
  ),

  // Planning
  prescription(
    'planning:path_confusion',
    'Know the next course step',
    stage('route recap', '/missions/module-1/why-a1', 'Why A1 mission', 6, 'The next three required blocks named in order.', ['Read the Today door and say what happens now, after practice and after the checkpoint.', 'Open Course once and locate the same next block without browsing elsewhere.']),
    stage('guided-path map', '/course', 'Course route', 8, 'One start-to-checkpoint route traced correctly.', ['Trace the gold current action through lesson, practice and checkpoint.', 'Explain which completed blocks remain freely revisit-able.']),
    retest('plan', 'New state A: lesson video complete, practice incomplete. What is the next required action?', 'Complete the lesson practice.'),
    retest('plan', 'New state B: all module lessons complete, checkpoint not passed. What opens next?', 'The module checkpoint.'),
  ),
  prescription(
    'planning:reason_unclear',
    'State the learner’s A1 reason',
    stage('one-line reason build', '/missions/module-1/why-a1', 'Why A1 mission', 6, 'One specific personal reason spoken in a full line.', ['Choose one real destination: study, work, family or daily life.', 'Complete “I need A1 because ...” aloud without adding a résumé.']),
    stage('future-scene choice', '/practice/speak', 'Speaking practice', 8, 'The reason connected to one concrete A1 situation.', ['Choose one future scene where German matters.', 'Say what you need to do there and which A1 skill helps.']),
    retest('plan', 'Fresh prompt A: finish “A1 matters to me because ...” with one specific outcome.', 'A personal, concrete reason rather than “German is useful”.'),
    retest('plan', 'Fresh prompt B: name one real situation where passing A1 changes your next step.', 'One situation and one next step stated clearly.'),
  ),

  // Pronunciation
  prescription(
    'pronunciation:ch_sch',
    'ch versus sch',
    stage('minimal-pair shadowing', '/missions/module-1/german-sounds', 'German sounds mission', 8, 'ich and Schule produced with clearly different sounds.', ['Shadow ich/spreche and Schule/schön in slow pairs.', 'Record the four words once and compare the mouth shape.']),
    stage('mirror-and-word sort', '/practice/pronunciation', 'Pronunciation practice', 10, 'Six new ch/sch words sorted and spoken.', ['Use a mirror: narrow friction for ch, rounded stronger stream for sch.', 'Sort and say ich, mich, Buch, Schule, Tasche and sprechen.']),
    retest('speak', 'Fresh sound A: say “Ich spreche Deutsch” twice, keeping ch and sch distinct.', 'Understandable contrast in ich / spreche / Deutsch.'),
    retest('speak', 'Fresh sound B: say “Welche Schule?” without turning ch into sch.', 'Distinct ch in welche and sch in Schule.'),
  ),
  prescription(
    'pronunciation:umlaut',
    'Umlaut mouth position',
    stage('plain-vowel contrast', '/missions/module-1/german-sounds', 'German sounds mission', 8, 'u/ü and o/ö pairs audibly separated.', ['Alternate schon/schön and wurde/würde with the model.', 'Hold the tongue position and round the lips for the umlaut.']),
    stage('picture-word production', '/practice/pronunciation', 'Pronunciation practice', 10, 'Five umlaut words understood from the recording.', ['Name fünf, zwölf, müde, schön and Tür from pictures.', 'Record once, listen back and repeat only unclear words.']),
    retest('speak', 'Fresh umlaut A: say “fünf Türen” three times at normal speed.', 'Both ü sounds remain rounded and distinct from u.'),
    retest('speak', 'Fresh umlaut B: contrast “schon” and “schön” in two short sentences.', 'The listener can identify which word was used.'),
  ),
  prescription(
    'pronunciation:w_v',
    'German w and v',
    stage('sound-to-letter shadowing', '/missions/module-1/german-sounds', 'German sounds mission', 8, 'w pronounced /v/ in five core words.', ['Shadow wie, wo, wohnen, Wasser and Wiedersehen.', 'Mark the starting sound, then say each word without the text.']),
    stage('voice-note discrimination', '/practice/pronunciation', 'Pronunciation practice', 10, 'Six new w/v words spoken and identified.', ['Record Wasser, wohnen, Vater, vier, von and wie.', 'Play them back in random order and identify the written word.']),
    retest('speak', 'Fresh sound A: say “Wo wohnen Sie?” with both w sounds voiced.', 'German /v/ sound in Wo and wohnen.'),
    retest('speak', 'Fresh sound B: contrast “vier” and “wir” in two short lines.', 'Distinct initial sounds matching the model.'),
  ),

  // Writing
  prescription(
    'schreiben:address_date_phone',
    'Address, date and phone format',
    stage('field-format drill', '/learn/14', 'Official-life lessons', 10, 'Two data cards transferred with exact formats.', ['Format one address, birth date and phone number from a profile card.', 'Check day-month-year, postal code and digit order field by field.']),
    stage('error-correction form', '/practice/write', 'Writing practice', 10, 'Six formatting errors repaired without a model.', ['Find six errors in a completed German form.', 'Rewrite the corrected address/date/phone block from memory.']),
    retest('write', 'Fresh form A: enter 7 November 2001 as TT.MM.JJJJ.', '07.11.2001'),
    retest('write', 'Fresh form B: split “Hauptstraße 8, 50667 Köln” into Straße/Hausnummer and PLZ/Ort.', 'Hauptstraße / 8 · 50667 / Köln'),
  ),
  prescription(
    'schreiben:first_sentence',
    'First German sentence',
    stage('cover-write-check', '/missions/module-1/first-mini-conversation?start=listen', 'Mini-conversation mission', 8, 'Ich lerne Deutsch. written correctly from memory.', ['Copy the model once, then cover it.', 'Write it twice from memory and say it after each version.']),
    stage('chunk substitution', '/games/sentence-builder', 'Sentence Builder', 8, 'Three new Ich + verb + object lines written.', ['Swap lerne/spreche/wohne into three complete chunks.', 'Hide the chunks and write the three lines independently.']),
    retest('write', 'Fresh sentence A: write “I speak German.”', 'Ich spreche Deutsch.'),
    retest('write', 'Fresh sentence B: write “I live in Kochi.”', 'Ich wohne in Kochi.'),
  ),
  prescription(
    'schreiben:form_fields',
    'Right data in the right field',
    stage('label-to-data transfer', '/learn/14', 'Official-life lessons', 10, 'Two forms completed with zero field swaps.', ['Match eight common labels to the exact data type.', 'Fill two forms from new person cards and check every field.']),
    stage('audio-form reconstruction', '/games/listen-act', 'Listen & Act', 12, 'One mini-form completed from a fresh spoken profile.', ['Preview the empty form and predict the needed details.', 'Hear a new profile twice, then complete and verify the form.']),
    retest('write', 'Fresh form A: Nivin Menon — put only the surname in Nachname.', 'Menon'),
    retest('write', 'Fresh form B: Meera lives in Kochi — put the correct entry in Wohnort.', 'Kochi'),
  ),
  prescription(
    'schreiben:greeting_closing',
    'Message greeting and closing',
    stage('message-frame rebuild', '/learn/12', 'Messages lessons', 8, 'Four messages framed with fitting opening and closing.', ['Sort openings/closings into formal and informal pairs.', 'Add the correct pair to four short message bodies.']),
    stage('recipient switch', '/practice/write', 'Writing practice', 10, 'The same message reframed for friend and office.', ['Write one short request to a friend.', 'Rewrite only the opening, register and closing for an office.']),
    retest('write', 'Fresh message A: open and close an email to your friend Maria.', 'Liebe Maria, ... Liebe Grüße'),
    retest('write', 'Fresh message B: open and close a formal email to an unnamed office.', 'Sehr geehrte Damen und Herren, ... Mit freundlichen Grüßen'),
  ),
  prescription(
    'schreiben:three_points',
    'All three message points',
    stage('three-point checklist', '/learn/12', 'Messages lessons', 12, 'One ~30-word message covers all three required points.', ['Mark the three content points before writing.', 'Write a timed message, then underline the sentence that answers each point.']),
    stage('colour-free model rebuild', '/practice/write', 'Writing practice', 15, 'A second message reaches rubric 3/5 without scaffolding.', ['Rebuild a different model from mixed strips.', 'Hide it and answer a new three-point prompt in ten minutes.']),
    retest('write', 'Fresh prompt A: decline a party; give a reason, suggest Sunday, and ask for the time.', 'A message containing all three requested points.'),
    retest('write', 'Fresh prompt B: ask a course office about start date, price and registration.', 'A message containing all three requested points.'),
  ),
  prescription(
    'schreiben:word_order',
    'Written word order',
    stage('sentence-strip repair', '/learn/5', 'Daily routine lessons', 10, 'Five sentences rebuilt with the finite verb second.', ['Repair five scrambled A1 sentences.', 'Write three personal versions using the same frames.']),
    stage('picture-sequence writing', '/games/story-builder', 'Story Builder', 12, 'A four-sentence scene sequence written clearly.', ['Order four new scene pictures.', 'Write one sentence per picture with varied openings and correct verb position.']),
    retest('write', 'Fresh line A: repair “Heute ich Deutsch lerne.”', 'Heute lerne ich Deutsch.'),
    retest('write', 'Fresh line B: write a sentence beginning “Am Wochenende” about playing cricket.', 'Am Wochenende spiele ich Cricket.'),
  ),

  // Speaking
  prescription(
    'sprechen:first_identity_line',
    'Say the first identity line',
    stage('model-shadow-own-name', '/missions/module-1/why-a1', 'Why A1 mission', 8, 'One complete Ich heiße ... line without freezing.', ['Shadow Ich heiße Meera. three times.', 'Replace the name with your own and say the line twice without text.']),
    stage('prompt-fade introduction', '/practice/speak', 'Speaking practice', 8, 'Name and origin produced from two icon prompts.', ['Use only a name icon and map icon as prompts.', 'Say Ich heiße ... and Ich komme aus ... before the icons fade.']),
    retest('speak', 'Fresh prompt A: the examiner points to “Name”. Answer in a full sentence.', 'Ich heiße ...'),
    retest('speak', 'Fresh prompt B: introduce your name and origin in one turn.', 'Ich heiße ... Ich komme aus ...'),
  ),
  prescription(
    'sprechen:fluency_pause',
    'Reduce frozen pauses',
    stage('short-chunk shadowing', '/practice/shadowing', 'Shadowing practice', 12, 'Ten model chunks repeated at full speed.', ['Shadow ten short model lines with no pause inside a chunk.', 'Record the weakest three and repeat after one listen-back.']),
    stage('prompt-fade simulation', '/practice/simulator', 'Speaking simulator', 15, 'One full Teil completed with only natural breathing pauses.', ['Run the weak Teil with visible cue words once.', 'Fade the cues and repeat with a five-second start limit.']),
    retest('speak', 'Fresh fluency A: give a four-line self-introduction in under 60 seconds.', 'All four lines complete with no freeze longer than a breath.'),
    retest('speak', 'Fresh fluency B: answer three topic cards within five seconds each.', 'Three understandable full-sentence answers.'),
  ),
  prescription(
    'sprechen:formality',
    'Formal spoken register',
    stage('Sie-world exchange', '/missions/module-1/polite-exit?start=listen', 'Polite exit mission', 9, 'One formal opening, request, thanks and goodbye.', ['Practise Frau Fischer + Guten Morgen and Vielen Dank + Auf Wiedersehen.', 'Run the four-part exchange once without notes.']),
    stage('office role switch', '/games/dialogue-dash', 'Dialogue Dash', 10, 'Two formal service turns completed in both roles.', ['Ask an official for help using Sie and bitte.', 'Switch roles and give a formal reply and closing.']),
    retest('choose', 'Fresh context A: choose the safest greeting for a new doctor.', 'Guten Tag.'),
    retest('speak', 'Fresh context B: thank an examiner and leave formally.', 'Vielen Dank. Auf Wiedersehen.'),
  ),
  prescription(
    'sprechen:greeting_reply',
    'Reply to a greeting',
    stage('hear-shadow-own-turn', '/missions/module-1/greet-frau-weber?start=listen', 'Greeting mission', 10, 'One complete reply delivered without a long pause.', ['Hear the model once and shadow it three times.', 'Hear Frau Fischer again and give your reply without visible text.']),
    stage('time-and-person switch', '/games/greeting-time', 'Greeting Time', 8, 'Four new scenes answered with the right reply.', ['Respond to morning/day/evening scenes in random order.', 'Switch between teacher and friend without mixing register.']),
    retest('speak', 'Fresh greeting A: Frau Fischer says “Guten Tag.” Reply formally.', 'Guten Tag, Frau Fischer.'),
    retest('speak', 'Fresh greeting B: a friend says “Hallo!”. Reply naturally.', 'Hallo!'),
  ),
  prescription(
    'sprechen:question_answer',
    'Answer in a full sentence',
    stage('question-answer frames', '/games/sag-es', 'Sag es!', 12, 'Ten questions answered in full A1 sentences.', ['Match ten W-questions to answer frames.', 'Answer each aloud with your own detail, not one-word replies.']),
    stage('random topic-card interview', '/practice/simulator', 'Speaking simulator', 12, 'Five unseen cards answered within five seconds.', ['Draw five topic cards in random order.', 'Answer each, then add one useful second detail where possible.']),
    retest('speak', 'Fresh question A: “Was machen Sie am Wochenende?”', 'A full sentence such as “Am Wochenende spiele ich Cricket.”'),
    retest('speak', 'Fresh question B: “Wo wohnt Ihre Familie?”', 'A full sentence naming a place.'),
  ),
  prescription(
    'sprechen:request_phrase',
    'Make a polite request',
    stage('request-frame shadowing', '/games/sag-es', 'Sag es!', 10, 'Five situation requests produced clearly.', ['Shadow Können Sie ...?, Ich möchte ... and ... bitte.', 'Choose the right frame for five service cards and say it aloud.']),
    stage('blocked-goal role-play', '/games/dialogue-dash', 'Dialogue Dash', 12, 'Three new goals achieved through spoken requests.', ['Enter station, doctor and office scenes with one blocked goal each.', 'Make a request, hear the reply and repair it if misunderstood.']),
    retest('speak', 'Fresh request A: ask an official for a form.', 'Ich brauche ein Formular, bitte.'),
    retest('speak', 'Fresh request B: ask someone to repeat more slowly.', 'Können Sie das bitte langsamer wiederholen?'),
  ),
  prescription(
    'sprechen:self_intro',
    'Complete self-introduction',
    stage('shadow-record-compare', '/missions/module-2/final-self-intro', 'Final self-intro mission', 12, 'One clean 20–60 second introduction recorded.', ['Shadow the model intro once by chunk.', 'Record your name, origin, home and languages in one take.']),
    stage('examiner prompt fade', '/practice/simulator', 'Speaking simulator', 15, 'A new examiner sequence completed under 60 seconds.', ['Answer shuffled Name/Land/Wohnort/Sprachen prompts.', 'Repeat with only icons and spell your name at the end.']),
    retest('speak', 'Fresh intro A: give name, origin, home and languages without notes.', 'Four complete lines in under 60 seconds.'),
    retest('speak', 'Fresh intro B: give the same facts in a different prompt order, then spell your name.', 'All facts plus German letter names.'),
  ),
  prescription(
    'sprechen:spelling',
    'Spell with German letter names',
    stage('alphabet micro-drill', '/missions/module-2/spell-name', 'Spelling mission', 8, 'Own name and email spelled with German letter names.', ['Run the confusing letter pairs E/I, G/J, V/W and C/Z.', 'Spell your name and email aloud, then check every letter.']),
    stage('unfamiliar-name relay', '/practice/speak', 'Speaking practice', 10, 'Three unseen names captured and spelled back.', ['Read an unfamiliar name card for five seconds, then hide it.', 'Spell it aloud; switch to a second and third card.']),
    retest('speak', 'Fresh spelling A: spell MEERA with German letter names.', 'Em – E – E – Er – A'),
    retest('speak', 'Fresh spelling B: spell WEBER with German letter names.', 'We – E – Be – E – Er'),
  ),

  // Vocabulary
  prescription(
    'vocab:bitte_danke_swap',
    'Bitte and Danke roles',
    stage('exchange-pair drill', '/missions/module-1/please-thanks', 'Please and thanks mission', 7, 'Six request/thanks replies paired correctly.', ['Pair Bitte as request/you’re welcome with Danke as thanks.', 'Run six two-line exchanges aloud.']),
    stage('service-scene response', '/games/dialogue-dash', 'Dialogue Dash', 8, 'Four new scenes get the natural one-word response.', ['Watch request, handover, thanks and invitation scenes.', 'Respond immediately with Bitte or Danke, then explain the role.']),
    retest('choose', 'Fresh exchange A: someone hands you the form you requested. What do you say?', 'Danke.'),
    retest('choose', 'Fresh exchange B: someone says “Danke”. What is the natural reply?', 'Bitte.'),
  ),
  prescription(
    'vocab:deutsch_vs_deutschland',
    'Deutsch or Deutschland',
    stage('language-country contrast', '/practice/review', 'Five-minute review', 6, 'Language and country selected correctly in six lines.', ['Say Ich lerne Deutsch and Ich wohne in Deutschland.', 'Sort six new sentences by language vs country meaning.']),
    stage('map-and-speech scene', '/games/scene-sort', 'Scene Sort', 8, 'Four map/language prompts answered without a swap.', ['Choose a map card or speech-bubble card.', 'Complete wohnen in ... or sprechen ... for each card.']),
    retest('write', 'Fresh line A: complete “Ich spreche ___.”', 'Deutsch'),
    retest('write', 'Fresh line B: complete “Berlin liegt in ___.”', 'Deutschland'),
  ),
  prescription(
    'vocab:entschuldigung',
    'Entschuldigung in context',
    stage('attention-vs-apology scenes', '/missions/module-1/please-thanks', 'Please and thanks mission', 7, 'Entschuldigung used naturally in four scenes.', ['Use Entschuldigung to get attention and to apologise.', 'Run two examples of each aloud with a full follow-up line.']),
    stage('public-service interruption', '/games/dialogue-dash', 'Dialogue Dash', 8, 'Two polite interruptions completed.', ['Approach a station worker and an office clerk.', 'Open with Entschuldigung, then make the exact request.']),
    retest('speak', 'Fresh scene A: politely stop a stranger and ask where the station is.', 'Entschuldigung, wo ist der Bahnhof?'),
    retest('speak', 'Fresh scene B: apologise for being late.', 'Entschuldigung, ich bin zu spät.'),
  ),
  prescription(
    'vocab:family_home',
    'Family and home words',
    stage('audio-tagged recall', '/practice/review', 'Five-minute review', 12, 'Twelve core family/home words recalled.', ['Review the tagged family and room words with audio.', 'Use eight of them in spoken article+noun or family sentences.']),
    stage('home-photo description', '/games/room-builder', 'Room Builder', 12, 'One family-at-home scene described in six lines.', ['Build a room and place three family cards in it.', 'Describe who and what is where after labels disappear.']),
    retest('choose', 'Fresh item A: “die Schwester” means which family member?', 'sister'),
    retest('speak', 'Fresh scene B: name three rooms and two family members in full German chunks.', 'Five understandable article+noun or family phrases.'),
  ),
  prescription(
    'vocab:first_sentence_chunks',
    'First sentence chunks',
    stage('chunk meaning contrast', '/missions/module-1/first-mini-conversation?start=listen', 'Mini-conversation mission', 8, 'Ich / lerne / Deutsch recalled and ordered.', ['Match Ich, lerne and Deutsch to their role and meaning.', 'Build and say the sentence three times, then write it once.']),
    stage('controlled chunk swap', '/games/sentence-builder', 'Sentence Builder', 8, 'Three new subject-verb-object chunks built.', ['Swap lerne with spreche and Deutsch with Englisch.', 'Build three true lines and say each without the strips.']),
    retest('choose', 'Fresh chunk A: put Ich / Deutsch / lerne in the correct order.', 'Ich lerne Deutsch.'),
    retest('write', 'Fresh chunk B: replace lerne with spreche and write the sentence.', 'Ich spreche Deutsch.'),
  ),
  prescription(
    'vocab:food_shopping',
    'Food and shopping words',
    stage('audio shopping list', '/practice/review', 'Five-minute review', 12, 'Twelve core items recalled from pictures or audio.', ['Review food/shop words with article and audio.', 'Build a six-item shopping list and say it aloud.']),
    stage('market basket scene', '/games/food-order', 'Food-order role-play', 12, 'One complete basket requested and priced.', ['Choose items from a new market stall scene.', 'Ask for three items and identify the price/quantity words.']),
    retest('choose', 'Fresh list A: which word completes “ein Kilo ___” for apples?', 'Äpfel'),
    retest('speak', 'Fresh market B: ask for bread, milk and two bananas.', 'A clear three-item German request.'),
  ),
  prescription(
    'vocab:goodbye_set',
    'Goodbye set',
    stage('context goodbye sort', '/missions/module-1/polite-exit', 'Polite exit mission', 8, 'Four goodbye forms matched to situation.', ['Sort Tschüss, Auf Wiedersehen, Auf Wiederhören and Gute Nacht.', 'Say the fitting line for friend, office, phone and bedtime.']),
    stage('exit-scene role-play', '/games/greeting-time', 'Greeting Time', 8, 'Four new exits closed naturally.', ['Run four short scenes that end in different contexts.', 'Close each without looking at the goodbye list.']),
    retest('choose', 'Fresh exit A: finish a formal phone call.', 'Auf Wiederhören.'),
    retest('speak', 'Fresh exit B: leave a teacher’s office politely.', 'Auf Wiedersehen.'),
  ),
  prescription(
    'vocab:greeting_set',
    'Core greeting set',
    stage('time-of-day recall', '/games/greeting-time', 'Greeting Time', 8, 'Morning, daytime, evening and casual greetings recalled.', ['Match Guten Morgen, Guten Tag, Guten Abend and Hallo to scenes.', 'Answer each greeting aloud with the same or fitting form.']),
    stage('message-and-room contrast', '/missions/module-1/formal-greetings', 'Formal greeting practice', 8, 'Spoken and written openings selected correctly.', ['Choose greetings for classroom, friend chat and office email.', 'Explain why each is formal, casual or time-bound.']),
    retest('choose', 'Fresh scene A: it is 8:30 AM and you meet Frau Fischer.', 'Guten Morgen, Frau Fischer.'),
    retest('choose', 'Fresh scene B: you message a close friend at midday.', 'Hallo!'),
  ),
  prescription(
    'vocab:gute_nacht_trap',
    'Gute Nacht is not a daytime goodbye',
    stage('bedtime-vs-exit contrast', '/missions/module-1/formal-greetings', 'Formal greeting practice', 6, 'Gute Nacht limited to bedtime/night contexts.', ['Compare Gute Nacht with Auf Wiedersehen and Tschüss.', 'Sort six scenes into bedtime or ordinary exit.']),
    stage('scene correction', '/games/greeting-time', 'Greeting Time', 7, 'Four wrong goodbyes repaired aloud.', ['Watch four scenes where Gute Nacht is misused.', 'Replace it with the fitting goodbye and say the full closing.']),
    retest('choose', 'Fresh trap A: class ends at 11 AM. Choose the formal goodbye.', 'Auf Wiedersehen.'),
    retest('choose', 'Fresh trap B: your host goes to bed at midnight. Choose the fitting line.', 'Gute Nacht.'),
  ),
  prescription(
    'vocab:numbers_time',
    'Number and time vocabulary',
    stage('mixed audio recall', '/practice/review', 'Five-minute review', 12, 'Numbers 0–100 pattern and five time phrases recalled.', ['Review tagged numbers/time chunks with audio.', 'Say ten random numbers and five clock times without counting up.']),
    stage('clock-and-ticket scene', '/games/number-blitz', 'Number Blitz', 10, 'Six new numbers/times produced from real objects.', ['Read three clocks and three ticket prices.', 'Switch direction: hear each value and point to the right object.']),
    retest('write', 'Fresh value A: write 47 in German.', 'siebenundvierzig'),
    retest('speak', 'Fresh value B: say 14:30 using “halb”.', 'halb drei'),
  ),
  prescription(
    'vocab:official_exam',
    'Official and exam language',
    stage('personal gap list', '/practice/review', 'Five-minute review', 15, 'Eight missed official/exam words used correctly.', ['Extract every unknown official/exam word from the failed task.', 'Review with context, then use eight in short sentences.']),
    stage('paper walk-through', '/learn/17', 'Exam and official-life lessons', 12, 'One exam/office instruction sheet acted out correctly.', ['Walk through Anmeldung, Formular, Unterschrift, Teil and Aufgabe on a sample paper.', 'Perform the action each instruction requires.']),
    retest('choose', 'Fresh official item A: “Unterschrift” asks for what?', 'Your signature.'),
    retest('choose', 'Fresh exam item B: “Kreuzen Sie an” asks you to do what?', 'Tick or mark the correct option.'),
  ),
  prescription(
    'vocab:personal_info',
    'Personal-information vocabulary',
    stage('profile-field recall', '/learn/2', 'Personal information lessons', 10, 'Name, origin, home, age and languages mapped correctly.', ['Match five personal questions to the required data.', 'Answer all five aloud with a full sentence.']),
    stage('new-person interview', '/missions/module-2/final-self-intro', 'Final self-intro mission', 12, 'One unfamiliar profile interviewed and introduced.', ['Read a new person card, then hide it.', 'Ask and answer the five personal questions from memory.']),
    retest('choose', 'Fresh profile A: “Wohnort” asks for which detail?', 'The place where the person currently lives.'),
    retest('speak', 'Fresh profile B: answer name, age and languages in three full sentences.', 'Three understandable personal-information lines.'),
  ),
  prescription(
    'vocab:travel_health',
    'Travel and health words',
    stage('situation-to-phrase recall', '/practice/review', 'Five-minute review', 12, 'Twelve travel/health words matched to situations.', ['Review tagged travel/health words with audio and article.', 'Choose the fitting phrase for six station/doctor scenes.']),
    stage('route-and-symptom role-play', '/games/dialogue-dash', 'Dialogue Dash', 12, 'One travel request and one health request completed.', ['Buy/locate something in a station scene.', 'Name a symptom and ask for help in a doctor/pharmacy scene.']),
    retest('choose', 'Fresh travel A: “Gleis” means what at a station?', 'platform or track'),
    retest('speak', 'Fresh health B: say that your head hurts and ask for help.', 'Ich habe Kopfschmerzen. Können Sie mir helfen?'),
  ),
  prescription(
    'vocab:work_hobbies',
    'Work and hobby words',
    stage('audio-tagged week recall', '/practice/review', 'Five-minute review', 12, 'Twelve work/hobby words recalled.', ['Review tagged work, study and free-time words with audio.', 'Use six in true or invented sentences about a week.']),
    stage('week-planner interview', '/games/dialogue-dash', 'Dialogue Dash', 12, 'One workday and one free-time plan described.', ['Fill a week planner with work/study and hobby cards.', 'Answer random questions about the planner without looking at word lists.']),
    retest('choose', 'Fresh work item A: “Feierabend” refers to what?', 'The end of the working day / time after work.'),
    retest('speak', 'Fresh hobby item B: answer what you do at the weekend.', 'A full sentence with one hobby or free-time activity.'),
  ),
] satisfies RecoveryPrescription[];

export const RECOVERY_PRESCRIPTIONS: Readonly<Record<string, RecoveryPrescription>> =
  Object.freeze(Object.fromEntries(prescriptions.map((item) => [item.weaknessTag, item])));

export function getRecoveryPrescription(weaknessTag: string): RecoveryPrescription | undefined {
  return RECOVERY_PRESCRIPTIONS[weaknessTag];
}

export function recoveryPrescriptionsForTags(weaknessTags: readonly string[]): RecoveryPrescription[] {
  return [...new Set(weaknessTags)].map((weaknessTag) => {
    const prescriptionForTag = getRecoveryPrescription(weaknessTag);
    if (!prescriptionForTag) {
      throw new Error(`No recovery prescription for emitted weakness tag: ${weaknessTag}`);
    }
    return prescriptionForTag;
  });
}
