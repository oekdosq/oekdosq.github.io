"use client";

export function TextOverlay({ progress }: { progress: number }) {
  const opacity1 = progress < 0.15 ? 1 - progress / 0.15 : 0;
  const opacity2 = progress > 0.15 && progress < 0.35 ? Math.min(1, (progress - 0.15) / 0.1) : progress >= 0.35 ? Math.max(0, 1 - (progress - 0.35) / 0.1) : 0;
  const opacity3 = progress > 0.6 ? Math.min(1, (progress - 0.6) / 0.15) : 0;
  const opacity4 = progress > 0.85 ? Math.min(1, (progress - 0.85) / 0.1) : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ opacity: opacity1 }}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--volt,#a3e635)] mb-3 font-mono">
          Experience
        </p>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-white tracking-tight leading-none">
          Scroll to explore
        </h1>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ opacity: opacity2 }}
      >
        <h1 className="text-base md:text-lg font-semibold text-white/70 tracking-tight">
          3D Photo Gallery
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-2 font-mono">
          Zoom in as you scroll
        </p>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ opacity: opacity3 }}
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-none">
          <span className="text-[var(--volt,#a3e635)]">Dyland</span>
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-3 font-mono">
          Prizki Ramadhan
        </p>
      </div>

      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        style={{ opacity: opacity4 }}
      >
        <p className="text-[9px] tracking-[0.5em] uppercase text-white/20 font-mono">
          Building The Future
        </p>
      </div>

      <div className="absolute bottom-8 right-8 md:right-12">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[var(--volt,#a3e635)] to-transparent opacity-30" />
          <span className="text-[9px] text-white/15 font-mono tracking-widest">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
