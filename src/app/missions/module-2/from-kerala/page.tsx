'use client';

import { useEffect, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import {
  ConversationRepairStep,
  MissionShell,
  NextMissionCard,
  PremiumCard,
  useMissionStepForQA,
  writeCompletedModule2Mission,
} from '../_components/MissionUI';
import { module2MissionAudio, module2MissionById } from '@/lib/missions/module2';

const mission = module2MissionById.fromKerala;
const missionSteps = mission.steps;
const audioSources = module2MissionAudio.fromKerala;

export default function Module2FromKeralaMissionPage() {
  const [step] = useMissionStepForQA(0, missionSteps.length - 1);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const repairCorrect = repairChoice === 'aus-in';

  useEffect(() => {
    if (!repairCorrect) return;
    writeCompletedModule2Mission(mission.id);
  }, [repairCorrect]);

  return (
    <MissionShell currentStep={step} steps={missionSteps} railLabel={mission.railLabel} tone={mission.tone} currentMissionId={mission.id}>
      <PremiumCard>
        {step === 0 && (
          <>
            <ConversationRepairStep
              title="Woher kommen Sie?"
              hideTitle
              speakerName="Frau Fischer"
              speakerLine="Woher kommen Sie?"
              learnerName="Example"
              learnerPeer="meera"
              showLearnerPeer={false}
              learnerLine="Ich komme aus Kerala. Ich wohne in Kochi."
              audioSrc={audioSources.modelKerala}
              audioLabel="Your origin"
              options={[
                { id: 'in-aus', title: 'Ich komme in Kerala.' },
                { id: 'aus-in', title: 'Ich komme aus Kerala.' },
                { id: 'wohne-aus', title: 'Ich wohne aus Kochi.' },
              ]}
              value={repairChoice}
              onChange={setRepairChoice}
              isCorrect={repairCorrect}
              wrongFeedback="Origin uses aus. Living place uses in."
              correctFeedback="Aus Kerala. In Kochi."
              cta={<>Fix aus/in <ArrowRight className="h-5 w-5" /></>}
              onContinue={() => {}}
              turnCue="Now answer."
            />

            {repairCorrect && (
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1fr] lg:items-stretch" data-testid="from-kerala-inline-win">
                <div className="rounded-[1.5rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
                  <p className="text-sm font-black text-[#bcf7d0]">You can now</p>
                  <p className="mt-2 text-2xl font-black">“Ich komme aus Kerala.”</p>
                </div>
                <NextMissionCard currentMissionId={mission.id} />
              </div>
            )}
          </>
        )}
      </PremiumCard>
    </MissionShell>
  );
}
