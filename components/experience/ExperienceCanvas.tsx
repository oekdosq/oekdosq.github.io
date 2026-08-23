"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollScene } from "./ScrollScene";
import { TextOverlay } from "./TextOverlay";
import { VideoBackground } from "./VideoBackground";
import { Text3DScene } from "./Text3DScene";
import { AmbientSound } from "./AmbientSound";
import { TouchGesture } from "./TouchGesture";

function CanvasLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--volt,#a3e635)] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-white/30 font-mono tracking-[0.3em] uppercase">
          Loading 3D Scene
        </p>
      </div>
    </div>
  );
}

export function ExperienceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top / height;
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AmbientSound progress={progress} />
      <VideoBackground progress={progress} />
      <TextOverlay progress={progress} />
      <div className="fixed inset-0 z-[2]">
        <Suspense fallback={<CanvasLoader />}>
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
            }}
          >
            <ScrollScene scrollProgress={progress} />
            <Text3DScene progress={progress} />
          </Canvas>
        </Suspense>
      </div>
      <TouchGesture progress={progress} />
      <div
        ref={containerRef}
        style={{ height: "600vh" }}
        className="relative z-0"
      />
    </>
  );
}
