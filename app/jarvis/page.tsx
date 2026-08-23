"use client";

import dynamic from "next/dynamic";

const JarvisHologram = dynamic(
  () =>
    import("@/components/jarvis/JarvisHologram").then((m) => ({
      default: m.JarvisHologram,
    })),
  { ssr: false }
);

export default function JarvisPage() {
  return <JarvisHologram />;
}
