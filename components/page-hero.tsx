import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-14 sm:px-10 md:pt-36 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 mask-fade-y bg-radial-ink" />
      <div aria-hidden className="pointer-events-none absolute inset-0 mask-fade-y bg-grain opacity-[0.05]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-volt-text uppercase">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="font-display mt-5 max-w-5xl text-4xl leading-[1.05] font-black tracking-tight text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {children && (
          <Reveal delay={0.24}>
            <div className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
