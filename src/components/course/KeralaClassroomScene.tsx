import { clsx } from 'clsx';

type KeralaClassroomSceneVariant = 'abstract' | 'kochi-room' | 'ai-study';

type KeralaClassroomSceneProps = {
  className?: string;
  variant?: KeralaClassroomSceneVariant;
};

function AbstractClassroomScene() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.62),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(31,157,85,0.18),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.0),rgba(17,31,17,0.1))]" />
      <div className="relative p-4">
        <div className="mx-auto w-full max-w-[15rem] rounded-[1.2rem] border border-[#1a2e1a]/12 bg-[#132414] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="h-2 w-10 rounded-full bg-[#d4a520]/85" />
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.62rem] font-black tracking-[0.18em] text-[#f1d27a]">A1</span>
          </div>
          <div className="space-y-1.5">
            <span className="block h-2 rounded-full bg-white/72" />
            <span className="block h-2 w-2/3 rounded-full bg-white/42" />
          </div>
        </div>

        <div className="mx-auto mt-3 flex max-w-[14rem] items-end justify-center gap-5">
          <div className="flex flex-col items-center gap-1.5">
            <span className="h-8 w-8 rounded-full border border-[#1a2e1a]/10 bg-[#7f4f24]" />
            <span className="h-8 w-10 rounded-t-2xl bg-[#1f9d55]" />
          </div>
          <div className="h-6 w-16 rounded-t-[1.2rem] border border-[#1a2e1a]/10 bg-[#8a5a2b]/75" />
          <div className="flex flex-col items-center gap-1.5">
            <span className="h-8 w-8 rounded-full border border-[#1a2e1a]/10 bg-[#a86a36]" />
            <span className="h-8 w-10 rounded-t-2xl bg-[#d4a520]" />
          </div>
        </div>
      </div>
    </>
  );
}

function KochiClassroomScene() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.72),transparent_20%),radial-gradient(circle_at_86%_16%,rgba(31,157,85,0.2),transparent_24%),linear-gradient(140deg,rgba(255,255,255,0.04),rgba(17,31,17,0.14))]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-[linear-gradient(120deg,rgba(23,106,57,0.0)_20%,rgba(23,106,57,0.16)_21%,rgba(23,106,57,0.0)_24%),linear-gradient(58deg,rgba(23,106,57,0.0)_36%,rgba(23,106,57,0.18)_37%,rgba(23,106,57,0.0)_40%)]" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="grid grid-cols-[1fr_4.8rem] gap-3">
          <div className="rounded-[1.15rem] border border-[#1a2e1a]/12 bg-[#142414] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="h-2 w-10 rounded-full bg-[#d4a520]/85" />
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.62rem] font-black tracking-[0.18em] text-[#f1d27a]">A1</span>
            </div>
            <div className="space-y-1.5">
              <span className="block h-2 rounded-full bg-white/72" />
              <span className="block h-2 w-3/5 rounded-full bg-white/42" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1rem] border border-[#1a2e1a]/10 bg-[#dff2c4]">
            <span className="absolute left-3 top-3 h-16 w-1 rounded-full bg-[#7b4a20]" />
            <span className="absolute left-3 top-2 h-10 w-14 -rotate-12 rounded-[80%] bg-[#1f9d55]/78" />
            <span className="absolute left-5 top-6 h-10 w-14 rotate-12 rounded-[80%] bg-[#176a39]/70" />
            <span className="absolute bottom-0 left-0 h-8 w-full bg-[#9bd37f]/65" />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[14.5rem] items-end justify-center gap-5">
          <div className="flex flex-col items-center">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#1a2e1a]/12 bg-[#8d5524]">
              <span className="absolute left-1 top-0 h-4 w-7 rounded-b-full bg-[#2b1b13]/58" />
            </div>
            <div className="h-9 w-12 rounded-t-[1.6rem] bg-[#176a39] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
          </div>

          <div className="relative h-7 w-20 rounded-t-[1.35rem] border border-[#1a2e1a]/10 bg-[#8a5a2b]/82 shadow-[0_10px_22px_-18px_rgba(17,31,17,0.95)]">
            <span className="absolute left-4 top-1 h-3 w-7 rotate-[-6deg] rounded-sm bg-[#fff7df]/75" />
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#1a2e1a]/12 bg-[#a66a35]">
              <span className="absolute inset-x-0 top-0 h-3 rounded-b-full bg-[#3a2517]/52" />
            </div>
            <div className="h-9 w-12 rounded-t-[1.6rem] bg-[#d4a520] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />
          </div>
        </div>
      </div>
    </>
  );
}

function AiStudyScene() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/adipoli-ai/kerala-study-baseline.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111f11]/45 via-transparent to-white/10" />
    </>
  );
}

export function KeralaClassroomScene({ className = '', variant = 'abstract' }: KeralaClassroomSceneProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[1.55rem] border border-[#1a2e1a]/10 bg-gradient-to-br from-[#fff8e8] via-[#f6ddb0] to-[#d9b16b] shadow-[0_22px_60px_-42px_rgba(17,31,17,0.95)]',
        className
      )}
      aria-label="Calm Kerala classroom visual for the first German mission"
      data-kerala-scene-variant={variant}
    >
      {variant === 'ai-study' ? <AiStudyScene /> : variant === 'kochi-room' ? <KochiClassroomScene /> : <AbstractClassroomScene />}
    </div>
  );
}
