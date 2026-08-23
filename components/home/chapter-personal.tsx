import { personalInfo } from "@/lib/site";

export function ChapterPersonal() {
  return (
    <section id="personal" className="relative px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card/40 p-7">
            <p className="chapter-label text-muted-foreground">Name</p>
            <p className="mt-3 text-base font-semibold sm:text-lg">
              {personalInfo.name}
            </p>
          </div>
          <div className="bg-card/40 p-7">
            <p className="chapter-label text-muted-foreground">Birthday</p>
            <p className="mt-3 text-base font-semibold sm:text-lg">
              {personalInfo.birthday}
            </p>
          </div>
          <div className="bg-card/40 p-7">
            <p className="chapter-label text-muted-foreground">School</p>
            <p className="mt-3 text-base font-semibold sm:text-lg">
              {personalInfo.school}
            </p>
          </div>
          <div className="bg-card/40 p-7">
            <p className="chapter-label text-muted-foreground">Education</p>
            <ul className="mt-3 flex flex-col gap-1">
              {personalInfo.timeline.map((t, i) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-[10px] text-volt-text dark:text-volt">
                    {i + 1}
                  </span>
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
