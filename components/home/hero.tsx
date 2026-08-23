"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { hero } from "@/lib/site";
import { prefersReducedMotion } from "@/components/motion/mouse";

function HeroScene() {
  const nodes = [
    { top: "18%", left: "6%", delay: "0s", size: 2 },
    { top: "30%", left: "80%", delay: "1.2s", size: 1.5 },
    { top: "64%", left: "14%", delay: "0.6s", size: 1.8 },
    { top: "72%", left: "70%", delay: "1.8s", size: 1.2 },
    { top: "48%", left: "92%", delay: "2.4s", size: 2.2 },
    { top: "12%", left: "55%", delay: "3s", size: 1.4 },
    { top: "85%", left: "40%", delay: "0.3s", size: 1 },
    { top: "5%", left: "30%", delay: "2s", size: 1.6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-field opacity-25 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)] dark:opacity-35" />

      {/* Network lines */}
      <svg
        className="absolute inset-0 size-full opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <line x1="90" y1="160" x2="1150" y2="270" stroke="var(--volt)" strokeWidth="0.8" opacity="0.5" />
        <line x1="1150" y1="270" x2="1330" y2="650" stroke="var(--volt)" strokeWidth="0.8" opacity="0.4" />
        <line x1="90" y1="160" x2="200" y2="580" stroke="var(--volt)" strokeWidth="0.8" opacity="0.3" />
        <line x1="200" y1="580" x2="1000" y2="650" stroke="var(--volt)" strokeWidth="0.8" opacity="0.4" />
        <line x1="90" y1="160" x2="790" y2="110" stroke="var(--volt)" strokeWidth="0.8" opacity="0.5" />
        <line x1="790" y1="110" x2="1330" y2="650" stroke="var(--volt)" strokeWidth="0.8" opacity="0.3" />
        <line x1="200" y1="580" x2="790" y2="110" stroke="var(--volt)" strokeWidth="0.5" opacity="0.2" />
        <line x1="1150" y1="270" x2="1000" y2="650" stroke="var(--volt)" strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <span
          key={i}
          className="animate-twinkle-soft absolute rounded-full bg-volt/60"
          style={{
            top: n.top,
            left: n.left,
            width: n.size * 4,
            height: n.size * 4,
            animationDelay: n.delay,
          }}
        />
      ))}

      {/* Gradient fade bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

function SplitText({
  text,
  className,
  tag: Tag = "span",
}: {
  text: string;
  className?: string;
  tag?: "span" | "p";
}) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span data-hero-char className="inline-block will-change-transform">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Character split reveal for each name line
      const chars = el.querySelectorAll("[data-hero-char]");
      tl.fromTo(
        chars,
        { yPercent: 120, rotateX: -40 },
        {
          yPercent: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.025,
        },
      )
        .fromTo(
          "[data-hero-label]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          "[data-hero-statement]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-desc]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pt-32 pb-16 sm:px-10 md:pb-20"
    >
      <HeroScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p
          data-hero-label
          className="chapter-label text-volt-text dark:text-volt"
        >
          {hero.label}
        </p>

        <h1
          className="mt-6 font-display"
          style={{ perspective: "600px" }}
          aria-label={hero.name.join(" ")}
        >
          {hero.name.map((line) => (
            <span key={line} className="block overflow-hidden">
              <SplitText
                text={line}
                tag="span"
                className="text-hero block will-change-transform"
              />
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          {hero.statement.map((word, i) => (
            <span
              key={word}
              data-hero-statement
              className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-foreground/80 sm:text-sm"
            >
              {word}
              {i < hero.statement.length - 1 && (
                <span className="size-1.5 rounded-full bg-volt" />
              )}
            </span>
          ))}
        </div>

        <p
          data-hero-desc
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {hero.intro}
        </p>
      </div>

      <div
        data-hero-scroll
        className="absolute right-6 bottom-6 z-10 flex items-center gap-2 text-muted-foreground sm:right-10"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          scroll
        </span>
        <span className="block h-8 w-px overflow-hidden rounded-full bg-border">
          <span className="block h-full w-full animate-scroll-line bg-volt/70" />
        </span>
        <ArrowDown className="size-3.5" />
      </div>
    </section>
  );
}
