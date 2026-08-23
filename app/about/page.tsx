import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";
import { ScrubLine } from "@/components/motion/scrub-text";
import { ProfilePhoto } from "@/components/profile-photo";
import { education, interests, principles, site, skills } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const quickFacts = [
  { label: "nama", value: "Dyland Prizki Ramadhan" },
  { label: "lahir", value: "19 September 2009" },
  { label: "sekolah", value: "SMK Tunas Harapan" },
  { label: "jurusan", value: "TJKT" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="tentang aku" title="Suka mencoba hal baru.">
        Halo! Aku <strong className="text-foreground">Dyland Prizki Ramadhan</strong>{" "}
        , siswa Teknik Jaringan Komputer dan Telekomunikasi yang suka belajar
        teknologi dan selalu penasaran sama hal yang belum pernah dicoba.
      </PageHero>

      <section className="relative px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative max-w-sm lg:sticky lg:top-24">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -top-8 -right-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] rounded-full bg-volt/25 blur-3xl dark:bg-volt/20"
                  />
                  <ProfilePhoto
                    className="relative aspect-[4/5] rounded-2xl border border-border shadow-2xl shadow-black/20"
                    imgClassName="grayscale-[0.35]"
                    priority
                  />
                </div>
                <dl className="mt-6 space-y-3">
                  {quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-2"
                    >
                      <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        {f.label}
                      </dt>
                      <dd className="text-right text-sm font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-mono text-[11px] font-medium tracking-[0.35em] text-volt-text uppercase">
                siapa aku
              </p>
              <h2 className="font-display mt-7 max-w-2xl text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl">
                <ScrubLine text="Belajar jaringan, selalu penasaran." />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5">
                {site.about.map((p, i) => (
                  <p
                    key={i}
                    className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="perjalanan"
            title={
              <>
                Jejak pendidikanku.
              </>
            }
            intro="Sering pindah sekolah ternyata jadi pelajaran berharga: cepat beradaptasi dengan lingkungan dan orang baru."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-mono text-[11px] leading-6 tracking-widest text-muted-foreground uppercase">
                  TK · SMK
                  <br />
                  dari pertama belajar
                  <br />
                  sampai sekarang
                </p>
              </Reveal>
            </div>

            <div className="relative lg:col-span-8">
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-[13px] w-px bg-border lg:left-[15px]"
              />
              <div className="space-y-4">
                {education.map((ed, i) => (
                  <Reveal key={`${ed.school}-${i}`} delay={i * 0.05}>
                    <div className="relative flex gap-5 pl-0 lg:gap-7">
                      <span
                        aria-hidden
                        className={`z-10 mt-5 flex size-7 shrink-0 items-center justify-center rounded-full border ${
                          ed.current
                            ? "border-volt bg-volt/20"
                            : "border-border bg-card"
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            ed.current ? "bg-volt" : "bg-muted-foreground/50"
                          }`}
                        />
                      </span>
                      <div
                        className={`flex-1 rounded-2xl border p-5 transition-colors duration-500 sm:p-6 ${
                          ed.current
                            ? "border-volt/40 bg-volt/5"
                            : "border-border bg-card hover:border-volt/30"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono rounded-full border border-volt/40 px-2.5 py-0.5 text-[10px] font-medium tracking-widest text-volt-text uppercase">
                            {ed.phase}
                          </span>
                          {ed.current && (
                            <span className="font-mono text-[10px] tracking-widest text-volt-text uppercase">
                              sekarang
                            </span>
                          )}
                        </div>
                        <h3 className="font-display mt-3 text-lg font-bold tracking-tight sm:text-xl">
                          {ed.school}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {ed.note}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="keahlian"
            title={
              <>
                Yang sedang kupelajari.
              </>
            }
            intro="Bukan daftar klaim jago, ini hal-hal yang benar-benar kusentuh di kelas dan di luar kelas."
          />

          <div className="mt-12 space-y-px overflow-hidden rounded-3xl border border-border bg-border">
            {skills.map((skill, i) => (
              <Reveal key={skill.title} delay={i * 0.04}>
                <article className="group grid grid-cols-1 gap-4 bg-card p-6 transition-colors duration-500 hover:bg-muted/40 sm:grid-cols-12 sm:items-center sm:p-7">
                  <span className="font-display text-4xl font-black text-muted-foreground/30 transition-colors duration-500 group-hover:text-volt-text sm:col-span-1 sm:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-4">
                    <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                      {skill.title}
                    </h3>
                    <span className="font-mono mt-2 inline-block rounded-full border border-volt/40 px-2.5 py-0.5 text-[10px] tracking-widest text-volt-text uppercase">
                      {skill.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-7 sm:text-base">
                    {skill.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Marquee speed={28}>
              {[
                "TCP/IP",
                "Subnetting",
                "Cisco",
                "Mikrotik",
                "Linux",
                "DHCP",
                "DNS",
                "HTML",
                "CSS",
                "JavaScript",
                "Firewall",
              ].map((item) => (
                <span
                  key={item}
                  className="font-display mx-[1.5rem] flex items-center gap-[1.5rem] text-2xl font-black tracking-tight text-muted-foreground/40 sm:text-3xl"
                >
                  {item}
                  <span aria-hidden className="text-volt-text/60">
                    /
                  </span>
                </span>
              ))}
            </Marquee>
          </Reveal>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading
            eyebrow="minat & hobi"
            title={
              <>
                Di luar kelas.
              </>
            }
            intro="Selain belajar jaringan, ada beberapa hal yang bikin hari-hariku seru."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {interests.map((interest, i) => (
              <Reveal key={interest.title} delay={i * 0.05}>
                <article className="group flex h-full flex-col bg-card p-6 transition-colors duration-500 hover:bg-muted/40 sm:p-7">
                  <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">
                    {interest.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {interest.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-colors duration-500 hover:border-volt/40">
                    <span className="flex size-10 items-center justify-center rounded-full bg-volt/15 text-volt-text">
                      <span className="font-display text-sm font-black">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="font-display mt-5 text-lg leading-snug font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Lihat karya dan praktik yang sedang kukerjakan?
              </p>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-volt-text"
              >
                Lihat portofolio
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
