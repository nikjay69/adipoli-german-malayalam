import { redirect } from 'next/navigation';

// The immersive AdventurePlayer (/play) is the spine's lesson player
// (DECISIONS #9). This route survives as a redirect so old progress links and
// recovery prescriptions never dead-end. The retired textbook player is
// parked in _legacy-textbook-player.tsx (not routed).
export default async function LegacyLessonRedirect({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  redirect(`/play/${moduleId}/${lessonId}`);
}
