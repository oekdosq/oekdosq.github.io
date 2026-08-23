"use client";

import { Reveal } from "@/components/motion/reveal";
import { Flower, Bow } from "@/components/secret/characters";

export function SecretTentang() {
  return (
    <section id="tentang" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-[0_24px_60px_-24px_rgba(214,79,139,0.3)] backdrop-blur sm:p-12">
            <Flower className="absolute top-5 left-6 w-8 text-secret-rose/40" />
            <Bow className="absolute right-6 bottom-6 w-8 text-secret-rose/40" />

            <span className="font-mono text-[11px] tracking-[0.4em] text-secret-rose-deep/60 uppercase">
              tentang
            </span>
            <h2 className="font-script mt-3 text-4xl font-bold text-secret-rose-deep sm:text-5xl">
              dari aku
            </h2>

            <div className="mx-auto mt-8 max-w-md space-y-4 text-left text-sm leading-relaxed text-secret-ink/80 sm:text-base">
              <p>
                halaman ini kubuat pelan-pelan, pas lagi kepikiran kamu. bukan
                hal gede, cuma tempat kecil buat nyimpen hal-hal yang biasanya
                nggak kebilang.
              </p>
              <p>
                kalau kamu baca sampai sini, makasih udah mampir. moga tiap
                scroll ngingetin kamu kalau ada yang lagi senyum-senyum mikirin
                kamu.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
