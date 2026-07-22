'use client';

import { useState } from 'react';

import { ArrowRight, ChevronLeft } from 'lucide-react';
import { ConversationRepairStep, MissionShell, MissionWinStep, NextMissionCard, PremiumCard, useMissionStepForQA } from '../_components/MissionUI';
import { module2MissionAudio, module2MissionById } from '@/lib/missions/module2';

const mission = module2MissionById.jobLanguages;
const missionSteps = mission.steps;
const audioSources = module2MissionAudio.jobLanguages;

export default function Module2JobLanguagesMissionPage() {
  const [step, setStep] = useMissionStepForQA(0, missionSteps.length - 1);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const repairCorrect = repairChoice === 'no-article';

  const next = () => setStep((value) => Math.min(value + 1, missionSteps.length - 1));
  const back = () => setStep((value) => Math.max(value - 1, 0));

  return (
    <MissionShell currentStep={step} steps={missionSteps} railLabel={mission.railLabel} tone={mission.tone} currentMissionId={mission.id}>
      <PremiumCard>
        {step > 0 && (
          <button type="button" onClick={back} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}

        {step === 0 && (
          <>
          <ConversationRepairStep
            title="Job + languages."
            speakerName="Frau Fischer"
            speakerLine="Was sind Sie von Beruf? Welche Sprachen sprechen Sie?"
            learnerName="Example"
            learnerPeer="meera"
            showLearnerPeer={false}
            learnerLine="Ich bin Student und spreche Malayalam und Englisch."
            audioSrc={audioSources.modelLanguages}
            audioLabel="Your profile"
            options={[
              { id: 'article', title: 'Ich bin ein Student.', subtitle: 'Common English-transfer mistake.' },
              { id: 'no-article', title: 'Ich bin Student und spreche Malayalam und Englisch.', subtitle: 'Profession after ich bin usually has no article.' },
            ]}
            value={repairChoice}
            onChange={setRepairChoice}
            isCorrect={repairCorrect}
            wrongFeedback="Drop ein/eine for a basic profession answer."
            correctFeedback="Correct. This sounds cleaner in the Goethe speaking room."
            cta={<>Fix job article <ArrowRight className="h-5 w-5" /></>}
            onContinue={next}
            turnCue="Now answer."
          />
          <p className="mt-3 text-sm text-white/58">“Student” is only a grammar example. Replace it with your own profession; it is not Meera’s biography.</p>
          </>
        )}

        {step === 1 && (
          <MissionWinStep
            currentMissionId={mission.id}
            title="Profile win."
            summary="You can add job and languages to your self-introduction."
            ability="“Ich bin Student und spreche Malayalam und Englisch.”"
            onReplay={() => setStep(0)}
            side={<NextMissionCard currentMissionId={mission.id} />}
          />
        )}
      </PremiumCard>
    </MissionShell>
  );
}
