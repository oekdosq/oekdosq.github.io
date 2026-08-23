import { Reveal } from "@/components/motion/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { ChapterHeading } from "./chapter-heading";
import { site } from "@/lib/site";

const chips = ["Networking", "Web", "Linux", "Hardware / IoT"];

export function ChapterAbout() {
  return (
    <section id="about" className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="01"
          label="About"
          title={
            <>
              WHO IS{" "}
              <span className="text-volt-text dark:text-volt">DYLAND?</span>
            </>
          }
        />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-4">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-3xl border border-volt/20 transition-colors duration-500 group-hover:border-volt/40"
              />
              <div className="group relative">
                <ProfilePhoto className="aspect-[4/5] rounded-2xl border border-border/60" />
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    portrait · dyland
                  </p>
                  <span className="size-2 rounded-full bg-volt/60" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-mono text-sm tracking-widest text-volt-text uppercase dark:text-volt">
                {site.name} · {site.role}
              </p>
            </Reveal>
            {site.about.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <div className="mt-9 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-volt/30 px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-foreground/80 uppercase transition hover:border-volt hover:text-volt-text dark:hover:text-volt"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
