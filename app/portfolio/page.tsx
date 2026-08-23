import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProject } from "./featured-project";
import { ProjectCardGrid } from "./project-card-grid";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow="portfolio" title="Karya & praktik.">
        Kumpulan proyek dan praktik yang sedang kukerjakan, dari konfigurasi
        jaringan di kelas sampai website yang sedang lo buka ini.
      </PageHero>

      <section className="relative px-6 py-16 sm:px-10 md:py-24">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-volt/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto w-full max-w-6xl relative">
          <Reveal>
            <FeaturedProject />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                  Semua Proyek
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <ProjectCardGrid />
            </div>
          </Reveal>

          <Reveal>
            <Link
              href="/campaign"
              className="group mt-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:border-volt/40 hover:shadow-[0_0_40px_rgba(163,230,53,0.06)] sm:p-8 relative"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.04)_0%,transparent_70%)]" />
              <div className="flex items-start justify-between gap-4 relative">
                <span className="font-mono rounded-full border border-volt/40 bg-volt/5 px-2.5 py-1 text-[10px] tracking-widest text-volt-text uppercase">
                  eksperimen
                </span>
                <span className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-1.5 rounded-full bg-volt/80" />
                  <span className="size-1.5 rounded-full bg-volt/50" />
                  <span className="size-1.5 rounded-full bg-volt/30" />
                </span>
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  Landing Page Bergaya Kampanye Produk
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Eksperimen bikin landing page bergaya kampanye produk, latihan
                  layout editorial besar, interaksi hotspot, dan animasi scroll
                  dengan GSAP. Murni eksplorasi desain, bukan produk atau brand
                  beneran.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition group-hover:text-volt-text">
                  Buka halaman eksperimen
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 text-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-volt-text"
              >
                Punya ide proyek? Ajak aku kerja sama
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
