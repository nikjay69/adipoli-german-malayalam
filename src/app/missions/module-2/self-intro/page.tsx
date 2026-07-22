'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ChevronLeft,
  Headphones,
} from 'lucide-react';
import { ConversationSceneStep, MissionIntro, MissionShell, MissionWinStep, NativeAudio, NextMissionCard, PremiumCard, RecognitionStep, SpeakRepairStep, useMissionStepForQA } from '../_components/MissionUI';
import { module2MissionAudio, module2MissionById } from '@/lib/missions/module2';

const mission = module2MissionById.selfIntro;
const missionSteps = mission.steps;
const audioSources = module2MissionAudio.selfIntro;

const currentQuestionReference = {
  prompt: 'Wie heißen Sie?',
  answer: 'Your name?',
  audio: audioSources.wieHeissenSie,
};

const recognitionOptions = [
  { id: 'how-are-you', title: 'How are you?', subtitle: 'Wie geht es Ihnen?' },
  { id: 'formal-name-question', title: 'Your name?', subtitle: 'Formal Goethe question' },
  { id: 'where-from', title: 'Where from?', subtitle: 'Woher kommen Sie?' },
];

function Module2SelfIntroMissionContent() {
  const [step, setStep] = useMissionStepForQA(0, missionSteps.length - 1);
  const searchParams = useSearchParams();
  const [heard, setHeard] = useState(false);
  const [recognition, setRecognition] = useState<string | null>(null);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const recognitionCorrect = recognition === 'formal-name-question';
  const repairCorrect = repairChoice === 'ich-komme';

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return heard;
      case 2:
        return recognitionCorrect;
      case 3:
        return repairCorrect;
      default:
        return true;
    }
  }, [heard, recognitionCorrect, repairCorrect, step]);

  const next = () => setStep((value) => Math.min(value + 1, missionSteps.length - 1));
  const back = () => setStep((value) => Math.max(value - 1, 0));

  useEffect(() => {
    if (searchParams.get('adipoliQa') === '1') return;
    if (searchParams.get('start') !== 'listen') return;
    const timer = window.setTimeout(() => setStep((value) => (value === 0 ? 1 : value)), 0);
    return () => window.clearTimeout(timer);
  }, [searchParams, setStep]);

  return (
    <MissionShell currentStep={step} steps={missionSteps} railLabel={mission.railLabel} tone={mission.tone} currentMissionId={mission.id}>
      <PremiumCard>
        {step > 1 && (
          <button type="button" onClick={back} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}

        {step === 0 && (
          <MissionIntro
            title="Introduce yourself."
            promise="Goethe Kochi mock. Build your first clean answer."
            output="Ich heiße … · Ich komme aus …"
            promises={['Hear model', 'Answer aloud', 'Fix mistake']}
            cta={<>Start mission <ArrowRight className="h-5 w-5" /></>}
            onStart={next}
          />
        )}

        {step === 1 && (
          <ConversationSceneStep
            title="Goethe room."
            speakerName="Frau Fischer"
            speakerLine="Wie heißen Sie?"
            learnerName="Meera"
            learnerPeer="meera"
            learnerLine="Ich heiße …"
            audioSrc={audioSources.examinerPrompt}
            onFinished={() => setHeard(true)}
            cta={<>Catch meaning <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            autoContinueOnFinish
            turnCue="Now answer."
          />
        )}

        {step === 2 && (
          <RecognitionStep
            icon={<Headphones className="h-11 w-11" />}
            title="Catch the question."
            prompt={<>Tap the meaning of <b className="text-white">Wie heißen Sie?</b></>}
            options={recognitionOptions}
            value={recognition}
            onChange={setRecognition}
            isCorrect={recognitionCorrect}
            wrongFeedback={<><i>heißen</i> points to name. Try the Goethe-safe answer.</>}
            correctFeedback="Correct. Formal question, respectful answer."
            cta={<>Answer aloud <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            continueDisabled={!canContinue}
            side={(
              <div className="rounded-[1.3rem] bg-white/[0.045] p-3 shadow-inner shadow-black/10" data-testid="flat-question-card">
                <p className="text-2xl font-black">{currentQuestionReference.prompt}</p>
                <p className="sr-only">{currentQuestionReference.answer}</p>
                <div className="mt-4 border-t border-white/10 pt-3">
                  <NativeAudio src={currentQuestionReference.audio} label="Question" compact bare />
                </div>
              </div>
            )}
            autoContinueOnCorrect
          />
        )}

        {step === 3 && (
          <SpeakRepairStep
            title="Answer, then fix."
            prompt="Say the answer aloud. Then catch the one Manglish trap."
            audioSrc={audioSources.modelIntroShort}
            audioLabel="Your reply"
            modelText="Ich heiße Meera. Ich komme aus Kerala."
            options={[
              { id: 'ich-bin-komme', title: 'Ich bin komme aus Kerala.', subtitle: 'Extra bin creates the mistake.' },
              { id: 'ich-komme', title: 'Ich komme aus Kerala.', subtitle: 'Clean A1 answer.' },
              { id: 'ich-ist-komme', title: 'Ich ist komme aus Kerala.', subtitle: 'Wrong subject + verb.' },
            ]}
            value={repairChoice}
            onChange={setRepairChoice}
            isCorrect={repairCorrect}
            wrongFeedback={<>Drop the extra verb. Say only: <b>Ich komme aus Kerala.</b></>}
            correctFeedback="Correct. That repair will save marks in Sprechen."
            cta={<>Fix ich komme <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            turnCue="Now answer."
          />
        )}

        {step === 4 && (
          <MissionWinStep
            currentMissionId={mission.id}
            title="First speaking win."
            summary="You can answer the opening A1 identity question."
            ability="“Ich heiße … Ich komme aus …”"
            onReplay={() => setStep(0)}
            side={<NextMissionCard currentMissionId={mission.id} />}
          >
            <div className="mt-7 max-w-xl">
              <NativeAudio src={audioSources.modelIntroFull} label="Your full intro" />
            </div>
          </MissionWinStep>
        )}
      </PremiumCard>
    </MissionShell>
  );
}

export default function Module2SelfIntroMissionPage() {
  return (
    <Suspense fallback={null}>
      <Module2SelfIntroMissionContent />
    </Suspense>
  );
}
