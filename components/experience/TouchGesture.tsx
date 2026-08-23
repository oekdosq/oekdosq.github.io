"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function TouchGesture({ progress }: { progress: number }) {
  const [isPinching, setIsPinching] = useState(false);
  const lastDistRef = useRef(0);
  const targetRef = useRef(progress);

  useEffect(() => {
    targetRef.current = progress;
  }, [progress]);

  const getDistance = useCallback((touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsPinching(true);
        lastDistRef.current = getDistance(e.touches);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPinching && e.touches.length === 2) {
        setIsPinching(true);
        lastDistRef.current = getDistance(e.touches);
      }
    };

    const handleTouchEnd = () => {
      setIsPinching(false);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPinching, getDistance]);

  if (isPinching) {
    return (
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          <p className="text-xs text-white/60 font-mono tracking-wider">
            Pinch to zoom
          </p>
        </div>
      </div>
    );
  }

  return null;
}
