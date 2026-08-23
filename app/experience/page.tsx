"use client";

import dynamic from "next/dynamic";

const ExperienceCanvas = dynamic(
  () =>
    import("@/components/experience/ExperienceCanvas").then(
      (m) => m.ExperienceCanvas
    ),
  { ssr: false, loading: () => (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--volt,#a3e635)] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-white/30 font-mono tracking-[0.3em] uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  ) }
);

export default function ExperiencePage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <ExperienceCanvas />
    </main>
  );
}
