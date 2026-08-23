"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisRef: Lenis | null = null;

export function getLenis() {
  return lenisRef;
}

export function scrollToSection(target: string) {
  if (lenisRef) {
    if (lenisRef.isStopped) lenisRef.start();
    lenisRef.scrollTo(target, { offset: 0, duration: 1.4 });
  } else if (typeof document !== "undefined") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      anchors: true,
    });
    lenisRef = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const updateTrigger = () => ScrollTrigger.refresh();
    window.addEventListener("load", updateTrigger);
    const id = setTimeout(updateTrigger, 300);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", updateTrigger);
      clearTimeout(id);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;
    if (window.location.hash) {
      const id = window.setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 400);
      return () => window.clearTimeout(id);
    }
  }, [pathname]);

  return <>{children}</>;
}
