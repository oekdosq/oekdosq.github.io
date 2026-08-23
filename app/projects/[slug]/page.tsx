import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectVisual, RfidChain } from "@/components/home/project-visual";
import { projectsList } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsList.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = projectsList.find((item) => item.slug === slug);
    if (!p) return {};
    return {
      title: `${p.title} · Project`,
      description: p.tagline,
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projectsList.find((item) => item.slug === slug);
  if (!p) notFound();

  return (
    <div className="px-6 pt-28 pb-16 sm:px-10 md:pt-36 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition hover:text-volt-text dark:hover:text-volt"
          >
            <ArrowLeft className="size-4" />
            semua project
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-volt-text dark:text-volt">
                  Project {p.num}
                </span>
                <span className="font-mono rounded-full border border-volt/30 px-2.5 py-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                  {p.status}
                </span>
              </div>
              <h1 className="font-display text-huge mt-5">{p.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <ProjectVisual kind={p.kind} />
            </Reveal>

            {p.kind === "rfid" && (
              <Reveal delay={0.2} className="mt-10">
                <div className="rounded-2xl border border-border/60 bg-card/40 p-7 sm:p-10">
                  <p className="chapter-label text-volt-text dark:text-volt">
                    arsitektur alur data
                  </p>
                  <div className="mt-8 flex justify-center">
                    <RfidChain />
                  </div>
                  <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Kartu menempel di reader RC522 → ESP32 membaca UID-nya →
                    data dikirim lewat Wi-Fi ke API → dicatat di database →{" "}
                    muncul di web dashboard. Masih{" "}
                    <span className="text-volt-text dark:text-volt">prototipe</span>{" "}
                    : jalur utamanya sudah jalan, tapi belum dipakai di
                    lapangan beneran.
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <dl className="rounded-2xl border border-border/60 bg-card/40 p-7">
                <div className="border-b border-border/50 py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{p.role}</dd>
                </div>
                <div className="border-b border-border/50 py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Tahun
                  </dt>
                  <dd className="mt-2 text-sm">{p.year}</dd>
                </div>
                <div className="border-b border-border/50 py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Teknologi
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground/75"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="border-b border-border/50 py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Status
                  </dt>
                  <dd className="mt-2 font-mono text-sm text-volt-text dark:text-volt">
                    {p.status}
                  </dd>
                </div>
              </dl>

              {p.slug === "puma-velocity" && (
                <Link
                  href="/campaign"
                  className="group mt-5 flex items-center justify-between rounded-2xl border border-puma-acid/40 bg-puma-bg px-6 py-5 transition hover:border-puma-acid"
                >
                  <span className="font-display text-lg font-black tracking-tight text-puma-acid">
                    buka eksperimen PUMA
                  </span>
                  <ExternalLink className="size-5 text-puma-acid transition group-hover:rotate-45" />
                </Link>
              )}
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-medium transition hover:border-volt/50 hover:text-volt-text dark:hover:text-volt"
          >
            kembali ke project
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
