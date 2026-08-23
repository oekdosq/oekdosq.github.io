"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapterHeading } from "./chapter-heading";
import { interestsBig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function ChapterInterests() {
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = el.querySelectorAll("[data-interest-row]");
    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
            delay: i * 0.05,
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="interests" className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="06"
          label="Interests"
          title={
            <>
              INTERESTED{" "}
              <span className="text-volt-text dark:text-volt">IN.</span>
            </>
          }
        />

        <div ref={listRef} className="mt-12">
          {interestsBig.map((it, i) => (
            <div
              key={it.word}
              data-interest-row
              className="group relative border-b border-border/60 py-6 opacity-0 sm:py-8"
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -mx-4 rounded-xl bg-volt/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex items-baseline justify-between gap-4 transition-colors duration-500 group-hover:border-volt/50">
                <span className="font-display text-4xl font-black tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-volt-text sm:text-6xl md:text-7xl dark:group-hover:text-volt">
                  {it.word}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground opacity-70 transition-all duration-500 group-hover:translate-x-[-4px] group-hover:opacity-100 group-hover:text-volt-text sm:text-sm dark:group-hover:text-volt">
                  {it.note}
                </span>
              </div>

              {/* Animated underline on hover */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-volt/40 transition-all duration-700 ease-out group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
