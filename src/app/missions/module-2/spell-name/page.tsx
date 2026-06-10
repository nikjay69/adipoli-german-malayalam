'use client';

import { useEffect, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import { ConversationRepairStep, MissionShell, NextMissionCard, PremiumCard, useMissionStepForQA, writeCompletedModule2Mission } from '../_components/MissionUI';
import { module2MissionAudio, module2MissionById } from '@/lib/missions/module2';

const mission = module2MissionById.spellName;
const missionSteps = mission.steps;
const audioSources = module2MissionAudio.spellName;

export default function Module2SpellNameMissionPage() {
  const [step] = useMissionStepForQA(0, missionSteps.length - 1);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const repairCorrect = repairChoice === 'german-letters';

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
              title="K-U-T-T-A-N."
              hideTitle
              speakerName="Frau Weber"
              speakerLine="Buchstabieren Sie bitte."
              learnerName="You"
              learnerLine="K-U-T-T-A-N."
              audioSrc={audioSources.kuttanModel}
              audioLabel="Your spelling"
              options={[
                { id: 'english-letters', title: 'Kay - You - Tee...' },
                { id: 'german-letters', title: 'Kah - Ooh - Tay...' },
              ]}
              value={repairChoice}
              onChange={setRepairChoice}
              isCorrect={repairCorrect}
              wrongFeedback="Use German letter names."
              correctFeedback="Slow German letters win."
              cta={<>Fix letters <ArrowRight className="h-5 w-5" /></>}
              onContinue={() => {}}
              turnCue="Now spell."
            />

            {repairCorrect && (
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1fr] lg:items-stretch" data-testid="spell-name-inline-win">
                <div className="rounded-[1.5rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
                  <p className="text-sm font-black text-[#bcf7d0]">You can now</p>
                  <p className="mt-2 text-2xl font-black">“K-U-T-T-A-N.”</p>
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
