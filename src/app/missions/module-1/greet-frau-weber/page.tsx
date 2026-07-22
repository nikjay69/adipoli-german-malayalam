'use client';

// The course's first 90 seconds (LEARNER_JOURNEY): hear a German teacher →
// say the reply ALOUD → repair one likely mistake → win. Extended from a
// single tap-step to the full arc in Sprint 4 (DECISIONS #13).

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ConversationRepairStep,
  HearStep,
  MissionShell,
  Module1NextMissionCard,
  PremiumCard,
  ReplyAloudStep,
  useMissionStepForQA,
} from '@/app/missions/module-2/_components/MissionUI';
import { module1MissionAudio, module1MissionById, writeCompletedModule1Mission } from '@/lib/missions/module1';
import { module1AnswerFrauFischerPractice } from '@/lib/missions/module1Practice';

const mission = module1MissionById.greetFrauWeber;
const missionSteps = mission.steps;
const practice = module1AnswerFrauFischerPractice;
const audio = module1MissionAudio.greetFrauWeber;

export default function Module1GreetingMissionPage() {
  const [step, setStep] = useMissionStepForQA(0, missionSteps.length - 1);
  const [heard, setHeard] = useState(false);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);

  const repairCorrect = repairChoice === practice.repair.correctChoiceId;

  useEffect(() => {
    if (!repairCorrect) return;
    writeCompletedModule1Mission(mission.id);
  }, [repairCorrect]);

  return (
    <MissionShell currentStep={step} steps={missionSteps} railLabel={mission.railLabel} tone={mission.tone} currentModule1MissionId={mission.id}>
      <PremiumCard>
        {step === 0 && (
          <HearStep
            title="Frau Fischer walks in."
            instructions="Morning class at Goethe Kochi. Your teacher greets the room — listen to the German greeting set once, all the way through."
            heard={heard}
            onHeard={() => setHeard(true)}
            audios={[{ src: audio.greetingSet, label: 'Frau Fischer', turnCue: 'Just listen.' }]}
            cta={<>I heard it <ArrowRight className="h-5 w-5" /></>}
            onContinue={() => setStep(1)}
            continueDisabled={!heard}
          />
        )}

        {step === 1 && (
          <ReplyAloudStep
            title="Her eyes land on you."
            prompt="The whole class waits. Hear the model line once — then say it ALOUD. Really aloud; whisper-German doesn't survive exam day."
            audioSrc={audio.formalOpener}
            audioLabel="Your line"
            modelText={<>Guten Morgen, Frau Fischer. <span className="text-[#f1d27a]">Ich lerne Deutsch.</span></>}
            turnCue={practice.scene.turnCue}
            cta={<>I said it aloud <ArrowRight className="h-5 w-5" /></>}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <>
            <ConversationRepairStep
              title="Morning class."
              sceneLabel="Kerala classroom"
              sceneVisualVariant="ai-study"
              speakerName={practice.scene.speakerName}
              speakerLine={practice.scene.speakerLine}
              learnerName="Nivin"
              learnerLine={practice.outputLines.join(' ')}
              audioSrc={practice.scene.audioSrc}
              audioLabel="Your line"
              options={practice.repair.options}
              value={repairChoice}
              onChange={setRepairChoice}
              isCorrect={repairCorrect}
              wrongFeedback={practice.repair.wrongFeedback}
              correctFeedback={practice.repair.correctFeedback}
              cta={<>Fix greeting mistake <ArrowRight className="h-5 w-5" /></>}
              onContinue={() => {}}
              turnCue={practice.scene.turnCue}
            />

            {repairCorrect && (
              <>
                <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1fr] lg:items-stretch" data-testid="greet-frau-weber-inline-win">
                  <div className="rounded-[1.5rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
                    <p className="text-sm font-black text-[#bcf7d0]">First class win.</p>
                    <p className="mt-1 text-sm font-black text-[#bcf7d0]">You can now</p>
                    <p className="mt-2 text-2xl font-black">“Guten Morgen, Frau Fischer. Ich lerne Deutsch.”</p>
                  </div>
                  <Module1NextMissionCard currentMissionId={mission.id} />
                </div>

                <section
                  className="mt-5 rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5"
                  data-testid="lesson-1-mini-check-recovery-card"
                  aria-label="Lesson 1 closed mini-check and recovery"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-black text-[#f1d27a]">Closed mini-check.</p>
                      <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-white/68">
                        {practice.miniCheck.closedBookInstruction}
                      </p>
                    </div>
                    <p className="rounded-2xl border border-[#3fbf75]/18 bg-[#3fbf75]/10 px-4 py-2 text-sm font-black text-[#bcf7d0]">
                      5–8m
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-3" data-testid="lesson-1-mini-check-items">
                    {practice.miniCheck.items.map((item) => (
                      <article key={item.id} className="rounded-2xl border border-white/10 bg-black/16 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">{item.mode}</p>
                        <p className="mt-2 text-base font-black text-white">{item.prompt}</p>
                        <details className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <summary className="cursor-pointer text-sm font-black text-[#f1d27a]">Reveal after you answer</summary>
                          <p className="mt-2 text-sm font-semibold text-[#bcf7d0]">Expected: {item.expected}</p>
                        </details>
                      </article>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-4" data-testid="lesson-1-recovery-cards">
                    <p className="text-sm font-black text-[#f1d27a]">If weak, do exactly this.</p>
                    <div className="mt-3 grid gap-3 lg:grid-cols-3">
                      {practice.recoveryCards.map((card) => (
                      <details key={card.weaknessTag} className="rounded-2xl bg-black/14 p-4">
                        <summary className="cursor-pointer list-none text-sm font-black text-white">
                          {card.learnerMessage}
                          <span className="mt-1 block text-sm font-semibold text-white/62">{card.timeBoxMinutes}m · {card.output}</span>
                        </summary>
                        <ol className="mt-3 space-y-1 text-sm font-semibold text-white/70">
                          {card.mustDo.map((task) => (
                            <li key={task}>- {task}</li>
                          ))}
                        </ol>
                        <p className="mt-3 text-sm font-semibold text-[#bcf7d0]">Retest: {card.retest}</p>
                      </details>
                    ))}
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </PremiumCard>
    </MissionShell>
  );
}
