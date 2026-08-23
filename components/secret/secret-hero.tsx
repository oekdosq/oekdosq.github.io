"use client";

import type { CSSProperties } from "react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Bow, KittyFace, CinnamorollFace } from "@/components/secret/characters";

export function SecretHero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28 pb-24 text-center md:pt-32"
    >
      {/* Decorative stickers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <KittyFace className="animate-float-soft absolute top-[16%] left-[7%] w-16 opacity-60 md:w-20" />
        <CinnamorollFace className="animate-float-soft absolute top-[14%] right-[8%] w-14 opacity-60 md:w-20" style={{ animationDelay: "1.2s" }} />
        <Bow className="animate-drift-x absolute top-[26%] right-[18%] w-10 text-secret-rose/40" style={{ "--drift": "16px", "--drift-dur": "9s" } as CSSProperties} />
        <Sparkles className="animate-twinkle-soft absolute top-[22%] left-[16%] w-7 text-secret-rose/50" />
        <Sparkles className="animate-twinkle-soft absolute top-[34%] right-[26%] w-5 text-secret-rose/40" style={{ animationDelay: "1.4s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <Reveal delay={0.05} y={20}>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-secret-rose/40" />
            <span className="font-mono text-[11px] tracking-[0.4em] text-secret-rose-deep/60 uppercase">
              untuk kamu
            </span>
            <span className="h-px w-8 bg-secret-rose/40" />
          </div>
        </Reveal>

        <Reveal delay={0.15} y={26}>
          <h1 className="font-script mt-8 max-w-2xl text-5xl leading-[1.08] font-bold text-secret-rose-deep sm:text-7xl md:text-8xl">
            hai, sayang
            <span className="ml-3 inline-block text-secret-rose">
              <Heart className="animate-heartbeat inline size-10 fill-current sm:size-12" />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.28} y={20}>
          <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-secret-ink/75 sm:text-lg">
            halaman kecil yang aku buat diam-diam. ada foto, playlist, dan
            beberapa rahasia, semua cuma buat kamu.
          </p>
        </Reveal>

        <Reveal delay={0.4} y={16}>
          <a
            href="#rahasia"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-secret-rose to-secret-rose-deep px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-secret-rose/35 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-secret-rose/40 active:scale-95"
          >
            buka rahasiaku
            <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.6} y={0}>
        <a
          href="#rahasia"
          aria-label="Scroll ke bawah"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-secret-rose/60 transition hover:text-secret-rose"
        >
          <ChevronDown className="animate-bounce size-6" />
        </a>
      </Reveal>
    </section>
  );
}
