import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { site, socials } from "@/lib/site";

const contacts = [
  { ...socials.instagram, label: "Instagram", href: socials.instagram.url },
  { ...socials.tiktok, label: "TikTok", href: socials.tiktok.url },
  { ...socials.github, label: "GitHub", href: socials.github.url },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
  },
] as const;

export function ChapterContact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 pt-20 pb-14 sm:px-10 md:pt-32 md:pb-20"
    >
      {/* Multiple glow layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-volt opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(40rem 30rem at 20% 80%, oklch(0.62 0.19 155 / 0.12), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-volt" />
            <p className="chapter-label text-volt-text dark:text-volt">
              Chapter 07 / Contact
            </p>
          </div>
          <h2 className="font-display text-hero mt-6 text-balance">
            LET&apos;S BUILD{" "}
            <span className="text-volt-text dark:text-volt">SOMETHING.</span>
          </h2>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Have an idea, project, or collaboration? Dari konfigurasi jaringan
            sampai ide website, ayo ngobrol.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <Magnetic strength={0.08} className="block">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between gap-4 border-t border-border/60 py-6 transition-colors duration-500 last:border-b hover:border-volt/50 sm:py-7"
                >
                  {/* Row hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -mx-2 rounded-xl bg-volt/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl font-black tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                      {c.label}
                    </span>
                  </div>
                  <span className="relative flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground transition-colors duration-500 group-hover:text-volt-text sm:text-base dark:group-hover:text-volt">
                      {c.handle}
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt" />
                  </span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
