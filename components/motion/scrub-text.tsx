"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbing word-by-word text reveal. Words start near-invisible and
 * light up sequentially as the block scrolls through the viewport.
 */
export function ScrubText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/**
 * Splits a string into per-word spans marked with data-word for ScrubText.
 */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} data-word className="inline-block whitespace-pre">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function ScrubLine({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <ScrubText className={cn("inline", className)}>
      <Words text={text} />
    </ScrubText>
  );
}
