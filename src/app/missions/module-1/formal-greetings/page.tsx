'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ConversationRepairStep,
  MissionShell,
  PremiumCard,
  useMissionStepForQA,
} from '@/app/missions/module-2/_components/MissionUI';
import { module1FormalGreetingsPractice } from '@/lib/missions/module1Practice';

const practice = module1FormalGreetingsPractice;
const missionSteps = ['Greeting + context'];
const contextChoices = ['teacher/office', 'evening meeting', 'going to sleep'];

export default function Module1FormalGreetingsPracticePage() {
  const [step] = useMissionStepForQA(0, missionSteps.length - 1);
  const [repairChoice, setRepairChoice] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);

  const repairCorrect = repairChoice === practice.repair.correctChoiceId;

  return (
    <MissionShell currentStep={step} steps={missionSteps} railLabel="Module 1 · Formal greetings" tone="green">
      <PremiumCard>
        {step === 0 && (
          <>
            <ConversationRepairStep
              title="Guten Tag."
              hideTitle
              sceneLabel="Kerala classroom"
              sceneVisualVariant="ai-study"
              speakerName={practice.scene.speakerName}
              speakerLine={practice.scene.speakerLine}
              learnerName="You"
              learnerLine={practice.outputLines[1]}
              audioSrc={practice.scene.audioSrc}
              audioLabel="Your line"
              options={practice.repair.options}
              value={repairChoice}
              onChange={setRepairChoice}
              isCorrect={repairCorrect}
              wrongFeedback={practice.repair.wrongFeedback}
              correctFeedback={practice.repair.correctFeedback}
              cta={<>Fix formal greeting <ArrowRight className="h-5 w-5" /></>}
              onContinue={() => {}}
              turnCue={practice.scene.turnCue}
            />

            {repairCorrect && (
              <section
                className="mt-5 rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5"
                data-testid="lesson-4-formal-greetings-micro-check-card"
                aria-label="Lesson 4 formal greetings micro-check and recovery"
              >
                <div className="grid gap-4 lg:grid-cols-[0.8fr_1fr] lg:items-start">
                  <div className="rounded-[1.35rem] border border-[#3fbf75]/25 bg-[#3fbf75]/12 p-5">
                    <p className="text-sm font-black text-[#bcf7d0]">Formal default locked.</p>
                    <p className="mt-2 text-2xl font-black">Guten Tag.</p>
                    <p className="mt-2 text-sm font-semibold text-white/66">Teacher, office, examiner: this is the safe daytime answer.</p>
                  </div>

                  <div className="rounded-[1.35rem] border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-5">
                    <p className="text-sm font-black text-[#f1d27a]">Context trap</p>
                    <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose the greeting context to practise">
                      {contextChoices.map((item) => {
                        const selected = context === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setContext(item)}
                            className={`rounded-full border px-4 py-3 text-sm font-black transition active:scale-[0.98] ${
                              selected
                                ? 'border-[#f1d27a] bg-[#f1d27a]/18 text-[#f8dda0]'
                                : 'border-white/12 bg-white/[0.055] text-white/82'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white/66">
                      {context ? `Say the right line for: ${context}.` : 'Pick one context. One answer at a time.'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-3" data-testid="lesson-4-mini-check-items">
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

                <div className="mt-4 rounded-2xl border border-[#f1d27a]/18 bg-[#f1d27a]/8 p-4" data-testid="lesson-4-recovery-cards">
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

                <div className="mt-4 flex justify-end">
                  <Link
                    href="/missions/module-1/please-thanks?start=listen"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d7b35a] px-5 text-sm font-black text-[#132414] active:scale-[0.98]"
                  >
                    {practice.nextTask}
                  </Link>
                </div>
              </section>
            )}
          </>
        )}
      </PremiumCard>
    </MissionShell>
  );
}
