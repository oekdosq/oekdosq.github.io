import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Tilt3D } from "@/components/motion/tilt";
import { ChapterHeading } from "./chapter-heading";
import { ProjectVisual } from "./project-visual";
import { projectsList } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ChapterProjects() {
  return (
    <section id="projects" className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="03"
          label="Projects"
          title={
            <>
              SELECTED{" "}
              <span className="text-volt-text dark:text-volt">PROJECTS.</span>
            </>
          }
        />

        <div className="mt-14 flex flex-col gap-5">
          {projectsList.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * (i % 2)}>
              <Tilt3D max={2} scale={1.005} className="h-full">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block"
                  data-cursor
                >
                  <article className="relative grid overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-colors duration-500 hover:border-volt/50 md:grid-cols-12">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-radial-volt opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                    />
                    <div className="relative z-10 p-7 sm:p-10 md:col-span-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-volt-text transition-transform duration-500 group-hover:translate-x-1 dark:text-volt">
                          {p.num}
                        </span>
                        <span className="font-mono rounded-full border border-border/70 px-2.5 py-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                          {p.status}
                        </span>
                      </div>

                      <h3 className="font-display mt-8 text-4xl font-black tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {p.tagline}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-lg bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground/75"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 3 && (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            +{p.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <span className="mt-9 inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-volt-text uppercase opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 dark:text-volt">
                        buka detail
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                      </span>
                    </div>

                    <div className="relative z-10 border-t border-border/50 p-5 sm:p-8 md:col-span-5 md:border-t-0 md:border-l">
                      <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-rotate-1">
                        <ProjectVisual kind={p.kind} />
                      </div>
                    </div>
                  </article>
                </Link>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/portfolio"
            className={cn(
              "group flex items-center justify-between rounded-2xl border border-border/60 px-7 py-6 transition",
              "hover:border-volt/50 hover:bg-volt-soft/[0.05]",
            )}
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase transition group-hover:text-volt-text dark:group-hover:text-volt">
              lihat semua eksperimen di halaman portfolio
            </span>
            <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-volt-text dark:group-hover:text-volt" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
