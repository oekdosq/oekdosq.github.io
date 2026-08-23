"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { isFinePointer, prefersReducedMotion } from "@/components/motion/mouse";

/**
 * Interactive cursor: small volt dot + lagging ring. Ring expands slightly
 * over interactive elements (a, button, [data-cursor]). Fine-pointer only.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    document.documentElement.style.cursor = "none";
    const interactive = "a, button, [data-cursor], summary, input, textarea";

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const ringS = gsap.quickTo(ring, "scale", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest(interactive)) {
        ringS(1.6);
        dot.style.opacity = "0.4";
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest(interactive)) {
        ringS(1);
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      ringS(1);
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden className="cursor-dot" />
      <div ref={ringRef} aria-hidden className="cursor-ring" />
    </>
  );
}
