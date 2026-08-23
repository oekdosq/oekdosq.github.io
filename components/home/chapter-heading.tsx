"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ChapterHeadingProps = {
  num: string;
  label: string;
  title: ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function ChapterHeading({
  num,
  label,
  title,
  className,
  as = "h2",
}: ChapterHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector("[data-hx]"),
        { xPercent: 3 },
        {
          xPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        el.querySelector("[data-underline]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const TitleTag = as;

  return (
    <div ref={ref} className={cn(className)}>
      <div className="flex items-center gap-3">
        <span className="size-2 rounded-full bg-volt" />
        <p className="chapter-label text-volt-text dark:text-volt">
          Chapter {num} / {label}
        </p>
      </div>
      <div className="relative mt-6 inline-block">
        <TitleTag
          data-hx
          className="text-huge max-w-4xl text-balance will-change-transform"
        >
          {title}
        </TitleTag>
        <span
          data-underline
          className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-volt to-volt/40"
        />
      </div>
    </div>
  );
}
