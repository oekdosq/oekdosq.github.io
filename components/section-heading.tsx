import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-volt-text uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-7 max-w-3xl text-balance text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
