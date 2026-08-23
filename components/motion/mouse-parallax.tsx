"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useMouse, isFinePointer, prefersReducedMotion } from "@/components/motion/mouse";

type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Layer depth multiplier — higher moves more. */
  depth?: number;
  /** Max travel in px for depth 1. */
  max?: number;
};

/**
 * Shifts a layer relative to the cursor. Deeper layers (higher `depth`) move
 * more, creating the illusion of dimensionality.
 */
export function MouseParallax({
  children,
  className,
  depth = 1,
  max = 12,
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const apply = () => {
      xTo(mouse.current.x * max * depth);
      yTo(mouse.current.y * max * depth);
    };

    window.addEventListener("mousemove", apply, { passive: true });
    return () => window.removeEventListener("mousemove", apply);
  }, [depth, max, mouse]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
