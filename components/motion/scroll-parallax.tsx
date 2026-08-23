"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/components/motion/mouse";

gsap.registerPlugin(ScrollTrigger);

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the scroll range. */
  amount?: number;
  scrub?: boolean;
};

/**
 * Scroll-driven parallax: the element drifts vertically at a different speed
 * than the page as it travels through the viewport.
 */
export function ScrollParallax({
  children,
  className,
  amount = 60,
  scrub = true,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount * 0.5 },
        {
          y: -amount * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [amount, scrub]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
