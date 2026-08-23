import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ChapterHeading } from "./chapter-heading";
import { tjkt, tkjChain, tkjTerms } from "@/lib/site";

export function ChapterTjkt() {
  return (
    <section id="tkj" className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="05"
          label="TKJ"
          title={
            <>
              WHAT IS{" "}
              <span className="text-volt-text dark:text-volt">TKJ?</span>
            </>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            {tjkt.intro.map((p, i) => (
              <p key={i} className="mt-5 text-lg leading-relaxed text-muted-foreground first:mt-0 sm:text-xl">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-6">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-border/60 bg-card/40 p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {tkjChain.map((step, i) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <span className="rounded-xl border border-volt/40 bg-background/60 px-4 py-3 font-mono text-xs font-semibold tracking-widest text-foreground/85 transition hover:border-volt sm:px-6 sm:text-sm">
                      {step}
                    </span>
                    {i < tkjChain.length - 1 && (
                      <ArrowRight
                        className="size-4 shrink-0 text-volt/70"
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                gimana data jalan dari perangkat ke internet
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tkjTerms.map((t, i) => (
            <Reveal key={t.term} delay={(i % 4) * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-volt/50 hover:bg-volt-soft/[0.06]">
                <span className="font-mono text-xs text-volt-text dark:text-volt">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-4 text-lg font-black tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                  {t.term}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <article className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-volt/40 bg-volt/5 p-6 text-center">
              <p className="font-mono text-xs tracking-widest text-volt-text uppercase dark:text-volt">
                + terus nambah
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                istilah baru makin sering muncul pas makin dalam nguliknya.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
