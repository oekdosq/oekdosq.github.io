"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/theme-provider";
import { isFinePointer, prefersReducedMotion } from "@/components/motion/mouse";

gsap.registerPlugin(ScrollTrigger);

export function ThemeScene() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const dark = theme === "dark";
  const rootRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef(dark);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const night = root.querySelector<HTMLElement>(".scene-night");
    const day = root.querySelector<HTMLElement>(".scene-day");
    const isDark = darkRef.current;
    if (night) night.style.opacity = isDark ? "1" : "0";
    if (day) day.style.opacity = isDark ? "0" : "1";
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!isFinePointer() || prefersReducedMotion()) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    if (layers.length === 0) return;

    const quick = layers.map((el) => {
      const depth = parseFloat(el.dataset.depth ?? "1");
      return {
        xTo: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        yTo: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        depth,
      };
    });

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const mx = (e.clientX / window.innerWidth) * 2 - 1;
        const my = (e.clientY / window.innerHeight) * 2 - 1;
        quick.forEach(({ xTo, yTo, depth }) => {
          xTo(mx * 16 * depth);
          yTo(my * 11 * depth);
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
      quick.forEach(({ xTo, yTo }) => {
        xTo(0);
        yTo(0);
      });
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-depth]"));
    if (layers.length === 0) return;

    const ctx = gsap.context(() => {
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.scrollDepth ?? "0.3");
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: depth * -180,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        display:
          pathname === "/campaign" || pathname === "/secret"
            ? "none"
            : undefined,
      }}
    >
      {/* Malam */}
      <div
        suppressHydrationWarning
        className="scene-night animate-scene-breathe absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: dark ? 1 : 0,
          background: [
            "radial-gradient(70rem 50rem at 85% -10%, oklch(0.87 0.21 123 / 0.09), transparent 60%)",
            "radial-gradient(55rem 40rem at -10% 105%, oklch(0.62 0.19 205 / 0.08), transparent 60%)",
            "radial-gradient(40rem 30rem at 50% 45%, oklch(0.99 0.008 90 / 0.03), transparent 60%)",
            "linear-gradient(to bottom, oklch(0.135 0.012 255), oklch(0.11 0.012 258))",
          ].join(","),
        }}
      />

      {/* Siang */}
      <div
        suppressHydrationWarning
        className="scene-day animate-scene-breathe absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: dark ? 0 : 1,
          background: [
            "radial-gradient(70rem 50rem at 85% -10%, oklch(0.87 0.21 123 / 0.13), transparent 60%)",
            "radial-gradient(55rem 40rem at -10% 105%, oklch(0.62 0.19 205 / 0.1), transparent 60%)",
            "linear-gradient(to bottom, oklch(0.99 0.004 90), oklch(0.965 0.006 90))",
          ].join(","),
        }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.05]" />
    </div>
  );
}
