import type { NivinMoodImage } from '@/components/character/NivinImage';
import type { VocabItem, Exercise, DecisionPoint } from '@/lib/content/types';

export type VNSceneType = 
  | 'dialogue'       // Character talking
  | 'choice'         // Branching decision
  | 'game'           // Exercise/Game overlay
  | 'discovery'      // Tap to find items (SceneExplorer)
  | 'transition'     // Moving between locations
  | 'narration';     // Only background text

export interface VNCharacter {
  id: string;
  name: string;
  avatar?: string;
  expression: NivinMoodImage | string;
  position: 'left' | 'center' | 'right';
}

export interface VNNode {
  id: string;
  type: VNSceneType;
  background: string;       // URL to Gemini-generated scene image
  music?: string;           // Mood/Loop name
  characters?: VNCharacter[];
  
  // Dialogue specific
  speaker?: string;
  textGerman?: string;
  textMalayalam?: string;
  textSecondary?: string;
  audioUrl?: string;
  
  // Game/Exercise specific
  exercise?: Exercise;
  vocab?: VocabItem;
  
  // Choice specific
  choices?: {
    text: string;
    nextNodeId: string;
    isCorrect?: boolean;
    rewardXP?: number;
  }[];
  
  // Auto-advance or wait for tap
  autoAdvance?: boolean;
  delay?: number;
  
  // For SceneExplorer
  hotspots?: {
    x: number;
    y: number;
    radius: number;
    label: string;
    vocabId?: string;
  }[];
}

export interface VNJourney {
  id: string;
  title: string;
  nodes: VNNode[];
  startNodeId: string;
}
