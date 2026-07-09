// Single source of truth for a lesson's backdrop image (DECISIONS #9).
// Prefer the pre-generated painterly per-lesson scene; fall back to the shared
// sceneType stock image when a lesson has no dedicated scene file.
//
// All story-scene lessons have a /images/scenes/<lessonId>.jpg generated
// 2026-06-12; components should still pass the fallback to <img onError> for
// robustness against future lessons added before their scene is generated.

const SCENE_TYPE_FALLBACK: Record<string, string> = {
  cafe: '/images/kaffee_kuchen.png',
  bahnhof: '/images/german_train_station.png',
  street: '/images/berlin_people.png',
  classroom: '/images/university_library.png',
  kitchen: '/images/breakfast_merge.png',
  office: '/images/office_building.png',
};

export function fallbackSceneImage(sceneType: string | undefined): string {
  return SCENE_TYPE_FALLBACK[sceneType ?? 'classroom'] || SCENE_TYPE_FALLBACK.classroom;
}

/** Per-lesson painterly backdrop. `hasScene` should be true when the lesson has
 * a storyScene (and therefore a generated scene file). */
export function lessonSceneImage(lessonId: string, sceneType: string | undefined, hasScene: boolean): string {
  return hasScene ? `/images/scenes/${lessonId}.jpg` : fallbackSceneImage(sceneType);
}
