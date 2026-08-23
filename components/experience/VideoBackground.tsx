"use client";

import { useRef, useEffect } from "react";

export function VideoBackground({ progress }: { progress: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.duration) {
      video.currentTime = progress * video.duration;
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        loop
        style={{
          opacity: 0.12 + progress * 0.08,
          filter: `blur(${2 + progress * 2}px) saturate(${0.3 + progress * 0.7})`,
          mixBlendMode: "screen",
        }}
      >
        <source
          src="https://cdn.pixabay.com/video/2024/02/15/200757-913513583_large.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent ${10 + progress * 30}%, #050505 ${70 + progress * 20}%)`,
        }}
      />
    </div>
  );
}
