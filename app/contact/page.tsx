import type { Metadata } from "next";
import { ArrowUpRight, Mail, Music2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { socials, site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="contact" title="Ngobrol aja.">
        Dari diskusi jaringan sampai sekadar tanya-tanya soal teknologi, DM-ku
        selalu terbuka. Aku biasanya fast response, kecuali lagi troubleshooting.
      </PageHero>

      <section className="relative px-6 py-20 sm:px-10 md:py-32">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[socials.instagram, socials.tiktok].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Magnetic className="h-full" strength={0.12}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-volt/50 hover:shadow-xl hover:shadow-volt/5 sm:p-10"
                  >
                    <div className="flex items-center justify-between">
                      {s.label === "Instagram" ? (
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-volt/15 text-volt-text">
                          <InstagramIcon className="size-5" />
                        </span>
                      ) : (
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-volt/15 text-volt-text">
                          <TikTokIcon className="size-5" />
                        </span>
                      )}
                      <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt-text" />
                    </div>
                    <p className="font-mono mt-8 text-[10px] tracking-widest text-muted-foreground uppercase">
                      {s.label}
                    </p>
                    <p className="font-display mt-2 text-2xl font-bold tracking-tight">
                      {s.handle}
                    </p>
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Magnetic className="w-full" strength={0.1}>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center justify-between rounded-3xl border border-dashed border-border bg-background p-8 transition-colors duration-500 hover:border-volt/50 sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-foreground transition-colors duration-500 group-hover:bg-volt/15 group-hover:text-volt-text">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      email
                    </p>
                    <p className="font-display mt-1 text-lg font-bold tracking-tight sm:text-xl">
                      {site.email}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt-text" />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-16 flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-muted-foreground">
                Sambil nunggu balasan, dengerin lagu favoritku dulu:
              </p>
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Music2 className="size-4 text-volt-text" />
                player di pojok kanan bawah
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
