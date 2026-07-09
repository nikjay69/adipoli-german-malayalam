'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import { Typewriter } from '@/components/ui/Typewriter';
import { fallbackSceneImage } from '@/lib/scene-image';
import type { StoryScene } from '@/lib/content/types';

interface NarrativeIntroProps {
  scene: StoryScene;
  /** Lesson id — selects the pre-generated per-lesson backdrop (DECISIONS #9). */
  lessonId?: string;
  lessonTitle: string;
  lessonTitleGerman: string;
  moduleIcon: string;
  onContinue: () => void;
}

// Map scene types to existing images in public/images/
const SCENE_IMAGES: Record<string, string> = {
  'cafe': '/images/kaffee_kuchen.png',
  'bahnhof': '/images/german_train_station.png',
  'street': '/images/berlin_people.png',
  'classroom': '/images/university_library.png',
  'kitchen': '/images/breakfast_merge.png',
  'office': '/images/office_building.png',
};

// Override for specific lesson settings — maps setting names to existing images
const SETTING_IMAGE_OVERRIDES: Record<string, string> = {
  // Module 1
  'Berlin Hauptbahnhof': '/images/german_train_station.png',
  'Café Einstein, Berlin': '/images/kaffeeklatsch.png',
  // Module 6
  'Gasthaus zum Goldenen Hirsch': '/images/german_menu.png',
  // Module 7
  'REWE Supermarkt': '/images/supermarket_checkout.png',
  'Einkaufsstraße am Marktplatz': '/images/german_price_tag.png',
  // Module 8
  'WG Kitchen, Berlin': '/images/wg_living.png',
  // Module 9
  'Gasthof zum Bären': '/images/german_menu.png',
  // Module 10
  'Dr. Meier Praxis': '/images/doctor_waiting_room.png',
  'Berliner Apotheke': '/images/german_apotheke.png',
  // Module 11
  'Bäckerei Schmidt': '/images/german_bakery.png',
  // Module 14
  'Bürgeramt Neukölln': '/images/anmeldung.png',
  // Module 15
  'Feierabend': '/images/feierabend.png',
  // Generated scenes (will work once images are created)
  'Goethe-Institut Prüfungsraum': '/images/scenes/scene-mod17-exam-room.png',
  'Vorbereitungsraum B2': '/images/scenes/scene-mod16-study-desk.png',
};

function getSceneImage(scene: StoryScene): string | null {
  return SETTING_IMAGE_OVERRIDES[scene.setting.name] || SCENE_IMAGES[scene.setting.sceneType] || null;
}

export function NarrativeIntro({
  scene,
  lessonId,
  lessonTitle,
  lessonTitleGerman,
  moduleIcon,
}: NarrativeIntroProps) {
  const kuttanText = scene.kuttanIntro[Math.floor(Math.random() * scene.kuttanIntro.length)];
  // Prefer the pre-generated per-lesson backdrop; fall back to the legacy
  // setting/sceneType map if the file is missing.
  const [sceneImage, setSceneImage] = useState<string | null>(
    lessonId ? `/images/scenes/${lessonId}.jpg` : getSceneImage(scene),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-3"
    >
      {/* Scene image card — visual-first */}
      {sceneImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm rounded-xl overflow-hidden mb-3 relative"
          style={{ height: '140px' }}
        >
          <img
            src={sceneImage}
            alt={scene.setting.name}
            onError={() => setSceneImage(getSceneImage(scene) || fallbackSceneImage(scene.setting.sceneType))}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Location + title over image */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm">{moduleIcon}</span>
              <span className="text-[10px] font-semibold text-[#d4a520]">{scene.setting.name}</span>
            </div>
            <h1 className="text-base font-bold text-white leading-tight">{lessonTitle}</h1>
            <p className="text-white/50 text-[10px]">{lessonTitleGerman}</p>
          </div>
        </motion.div>
      )}

      {/* Fallback when no image */}
      {!sceneImage && (
        <>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-lg">{moduleIcon}</span>
            <span className="text-xs font-semibold text-[#d4a520]">{scene.setting.name}</span>
          </div>
          <h1 className="text-lg font-bold">{lessonTitle}</h1>
          <p className="text-[var(--foreground)]/40 text-xs mb-2">{lessonTitleGerman}</p>
        </>
      )}

      {/* Kuttan — compact */}
      <CharacterGuide messages={kuttanText} mood="excited" size="sm" />

      {/* Scene description — short */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 w-full max-w-sm"
      >
        <p className="text-xs leading-relaxed text-[var(--foreground)]/60 italic px-1">
          <Typewriter text={scene.setting.description} speed={35} delay={400} />
        </p>

        {/* Mission */}
        <div className="mt-2 flex items-center gap-1.5 justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)]/30">Mission:</span>
          <span className="text-xs font-semibold text-[#27ae60]">{scene.narrative.currentObjective}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
