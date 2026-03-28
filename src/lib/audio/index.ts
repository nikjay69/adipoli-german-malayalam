// Audio module barrel export
// Re-exports all audio utilities so existing `@/lib/audio` imports keep working

export { playAudio, playVocabAudio, playExampleAudio, stopAudio } from './playback';
export { useGermanTTS, speakGerman } from './useGermanTTS';
export { useSpeechRecognition } from './useSpeechRecognition';
export {
  startAmbience, stopAmbience, getCurrentScene,
  duckAmbience, unduckAmbience,
  getSceneForModule, MODULE_SCENE_MAP,
  type SceneType,
} from './ambience';
export { speakAsCharacter, speakDialogueLine } from './multiVoiceTTS';
