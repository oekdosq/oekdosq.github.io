"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapterHeading } from "./chapter-heading";
import { timeline } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function ChapterJourney() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector("[data-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector("[data-track]"),
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: entry, start: "top 88%", once: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={ref} className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="04"
          label="Journey"
          title={
            <>
              THE <span className="text-volt-text dark:text-volt">ROAD.</span>
            </>
          }
        />

        <div data-track className="relative mt-16 pl-0 md:pl-10">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-2 w-px bg-border md:left-10"
          />
          <div
            aria-hidden
            data-line
            className="absolute top-0 bottom-0 left-2 w-px origin-top bg-volt md:left-10"
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {timeline.map((item) => (
              <div
                key={item.year}
                data-entry
                className="relative grid gap-4 pl-10 md:grid-cols-12 md:gap-8 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-2 left-2 size-3 -translate-x-1/2 rounded-full border-2 border-volt bg-background md:left-10"
                />
                <div className="md:col-span-4">
                  <span
                    className={`font-display text-5xl font-black tracking-tight sm:text-6xl ${
                      "future" in item && item.future
                        ? "text-volt-text dark:text-volt"
                        : "text-foreground/90"
                    }`}
                  >
                    {item.year}
                  </span>
                  <p className="chapter-label mt-3 text-muted-foreground">
                    {item.label}
                  </p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
