'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ArrowRight, ChevronLeft, PencilLine } from 'lucide-react';
import { ConversationSceneStep, MissionIntro, MissionShell, MissionWinStep, NativeAudio, NextMissionCard, PremiumCard, RecognitionStep, SpeakRepairStep, useMissionStepForQA } from '../_components/MissionUI';
import { module2MissionAudio, module2MissionById } from '@/lib/missions/module2';

const mission = module2MissionById.finalSelfIntro;
const missionSteps = mission.steps;
const audioSources = module2MissionAudio.finalSelfIntro;

function Module2FinalSelfIntroMissionContent() {
  const [step, setStep] = useMissionStepForQA(0, missionSteps.length - 1);
  const searchParams = useSearchParams();
  const [heard, setHeard] = useState(false);
  const [orderChoice, setOrderChoice] = useState<string | null>(null);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const orderCorrect = orderChoice === 'exam-order';
  const repairCorrect = repairChoice === 'clean-verbs';

  const canContinue = (() => {
    switch (step) {
      case 1:
        return heard;
      case 2:
        return orderCorrect;
      case 3:
        return repairCorrect;
      default:
        return true;
    }
  })();

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
            title="Deliver your self-intro."
            promise="Goethe Kochi mock. Hear the prompt, answer, fix one trap."
            output="Name · Kerala · languages."
            promises={['Hear', 'Say', 'Fix']}
            cta={<>Start final mission <ArrowRight className="h-5 w-5" /></>}
            onStart={next}
          />
        )}

        {step === 1 && (
          <ConversationSceneStep
            title="Final prompt."
            speakerName="Frau Fischer"
            speakerLine="Stellen Sie sich bitte vor."
            learnerName="Meera"
            learnerPeer="meera"
            learnerLine="Guten Tag. Ich heiße …"
            audioSrc={audioSources.examiner}
            onFinished={() => setHeard(true)}
            cta={<>Catch order <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            autoContinueOnFinish
            turnCue="Now answer."
          />
        )}

        {step === 2 && (
          <RecognitionStep
            icon={<PencilLine className="h-11 w-11" />}
            title="Choose the clean exam order."
            prompt="A self-intro should sound calm, not scattered."
            options={[
              { id: 'scattered', title: 'Languages → name → origin → greeting' },
              { id: 'exam-order', title: 'Greeting → name → origin → languages' },
              { id: 'story-order', title: 'Long story → hobby → Germany dream' },
            ]}
            value={orderChoice}
            onChange={setOrderChoice}
            isCorrect={orderCorrect}
            wrongFeedback="Keep it short: greet, name, origin, languages."
            correctFeedback="Correct. Examiner-friendly."
            cta={<>Say full answer <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            continueDisabled={!canContinue}
            side={<NativeAudio src={audioSources.moduleWrap} label="Full intro" />}
            autoContinueOnCorrect
          />
        )}

        {step === 3 && (
          <SpeakRepairStep
            title="Say the full intro."
            prompt="Hear it once. Say your version. Then fix the one exam trap."
            audioSrc={audioSources.modelFull}
            audioLabel="Full intro"
            modelText="Guten Tag. Ich heiße Meera. Ich komme aus Kerala. Ich spreche Malayalam und Englisch."
            options={[
              { id: 'mixed', title: 'Ich bin komme aus Kerala.', subtitle: 'English-transfer mistake.' },
              { id: 'clean-verbs', title: 'Ich heiße Meera. Ich komme aus Kerala.', subtitle: 'One clean verb per sentence.' },
            ]}
            value={repairChoice}
            onChange={setRepairChoice}
            isCorrect={repairCorrect}
            wrongFeedback="Use ich komme, not ich bin komme."
            correctFeedback="Correct. Clean A1 German."
            cta={<>Fix final mistake <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            turnCue="Your turn."
          />
        )}

        {step === 4 && (
          <MissionWinStep
            currentMissionId={mission.id}
            title="Module 2 win."
            summary="You can now give a short Goethe A1 self-introduction."
            ability="“Guten Tag. Ich heiße ... Ich komme aus Kerala. Ich spreche Malayalam und Englisch.”"
            onReplay={() => setStep(0)}
            side={<NextMissionCard currentMissionId={mission.id} />}
          />
        )}
      </PremiumCard>
    </MissionShell>
  );
}

export default function Module2FinalSelfIntroMissionPage() {
  return (
    <Suspense fallback={null}>
      <Module2FinalSelfIntroMissionContent />
    </Suspense>
  );
}
