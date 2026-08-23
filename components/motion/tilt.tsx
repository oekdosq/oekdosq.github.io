"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { isFinePointer, prefersReducedMotion } from "@/components/motion/mouse";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Scale to hover toward. */
  scale?: number;
};

/**
 * Tilts its child in 3D (CSS perspective + rotateX/rotateY) following the
 * cursor. The outer div owns the perspective; the inner div is what rotates.
 */
export function Tilt3D({
  children,
  className,
  innerClassName,
  max = 5,
  scale = 1.02,
}: Tilt3DProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = outer.current;
    const kid = inner.current;
    if (!el || !kid) return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    const rxTo = gsap.quickTo(kid, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });
    const ryTo = gsap.quickTo(kid, "rotationY", {
      duration: 0.7,
      ease: "power3.out",
    });
    const sTo = gsap.quickTo(kid, "scale", {
      duration: 0.7,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ryTo((px - 0.5) * 2 * max);
      rxTo((0.5 - py) * 2 * max);
      sTo(scale);
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
      sTo(1);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return (
    <div ref={outer} className={cn("[perspective:1200px]", className)}>
      <div
        ref={inner}
        className={cn("will-change-transform [transform-style:preserve-3d]", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}
