import { Reveal } from "@/components/motion/reveal";
import { Tilt3D } from "@/components/motion/tilt";
import { ChapterHeading } from "./chapter-heading";
import { skillGroups } from "@/lib/site";

export function ChapterSkills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:px-10 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <ChapterHeading
          num="02"
          label="Skills"
          title={
            <>
              THE <span className="text-volt-text dark:text-volt">TOOLBOX.</span>
            </>
          }
        />
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Bukan klaim jago, tapi hal yang beneran kusentuh dan kukerjakan,
          di kelas, di rumah, atau pas ngulik tengah malam.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 0.1}>
              <Tilt3D max={4} scale={1.015} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-500 hover:border-volt/50 hover:bg-volt-soft/[0.06] sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-volt-text dark:text-volt">
                      0{i + 1}
                    </span>
                    <span className="font-mono rounded-full border border-volt/30 px-2.5 py-1 text-[10px] tracking-widest text-muted-foreground uppercase transition-colors duration-500 group-hover:border-volt/60 group-hover:text-volt-text dark:group-hover:text-volt">
                      {group.tag}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-2xl font-black tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {group.desc}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground/75 transition-colors duration-500 group-hover:bg-volt/10 group-hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
