'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Target } from 'lucide-react';
import VoiceChat from '@/components/voice/VoiceChat';
import { getScenario } from '@/lib/content/roleplay-scenarios';
import { Kuttan } from '@/components/character/Kuttan';

type Params = { scenarioId: string };

const SCENE_TIPS: Record<string, string> = {
  cafe: 'Start with "Hallo!" — it buys you a second to think.',
  'berlin-cafe': 'Ask "Was empfehlen Sie?" if you\'re stuck — it sounds local.',
  'visa-office': 'Be formal. Say "Sie" never "du". They notice.',
  'neighbor-smalltalk': 'One line answers are fine. Germans like brief.',
  'supermarket': 'Say "nein, danke" if you don\'t need a bag. Quick and clean.',
  'doctor': 'Point and name the body part. "Mein Kopf tut weh."',
  'restaurant': 'End with "Zahlen, bitte" — that\'s how you ask for the bill.',
  'public-transport': 'If lost, say "Entschuldigung, ich bin neu hier."',
  'apartment-viewing': 'Smile. Mention you cook — Germans love a quiet cook.',
  'job-interview': 'Short sentences. Pause is strength, not weakness.',
};

export default function RoleplayScenarioPage({ params }: { params: Promise<Params> }) {
  const { scenarioId } = use(params);
  const scenario = getScenario(scenarioId);
  if (!scenario) notFound();

  const tip = SCENE_TIPS[scenario.id] || 'Breathe. Short sentences win.';

  return (
    <div className="relative min-h-screen bg-[#050a14]">
      {/* Top bar with back + character */}
      <div className="absolute left-0 right-0 top-0 z-10 px-3 py-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <Link
          href="/learn/roleplay"
          className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur hover:bg-white/20 transition"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Scenes
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
          <span className="text-base leading-none">{scenario.emoji}</span>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[11px]">{scenario.character.name}</span>
            <span className="text-[9px] text-white/60">{scenario.title}</span>
          </div>
        </div>
      </div>

      {/* Scene-setting hero — floats above chat */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="pt-16 px-4 pb-3 max-w-2xl mx-auto"
      >
        <div className="rounded-2xl border border-[#d4a520]/20 bg-gradient-to-br from-[#d4a520]/10 to-transparent p-3 backdrop-blur">
          <div className="flex items-start gap-3">
            <Kuttan mood="excited" size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{
                    color: scenario.level === 'A1' ? '#27ae60' : scenario.level === 'A2' ? '#d4a520' : '#e94560',
                    background: scenario.level === 'A1' ? '#27ae6020' : scenario.level === 'A2' ? '#d4a52020' : '#e9456020',
                  }}
                >
                  {scenario.level}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] text-white/50">
                  <Clock className="w-2.5 h-2.5" /> ~{scenario.durationMin} min
                </span>
              </div>
              <p className="text-xs text-white/90 leading-snug font-medium mb-0.5">
                <Target className="w-3 h-3 inline text-[#d4a520] mr-1" />
                {scenario.goal}
              </p>
              <p className="text-[11px] text-[#d4a520]/90 leading-snug italic">
                Kuttan says: {tip}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <VoiceChat scenarioId={scenario.id} />
    </div>
  );
}
