"use client";

import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !("ontouchstart" in window)
  );
}

export type MouseState = { x: number; y: number };

/**
 * Tracks normalized cursor position (-1..1) throttled to a single rAF per
 * frame. Safe to share across several parallax/magnetic consumers.
 */
export function useMouse(disabled = false) {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (disabled || !isFinePointer() || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [disabled]);

  return mouse;
}
