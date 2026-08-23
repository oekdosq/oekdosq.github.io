"use client";

import { Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { galleryItems } from "@/lib/secret";
import { cn } from "@/lib/utils";

function GalleryMedia({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? "foto galeri"}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#ffe3ec] via-[#ffd6e2] to-white transition-transform duration-700 ease-out group-hover:scale-105">
      <Heart className="size-9 text-secret-rose/80" />
      <span className="font-mono text-[9px] tracking-widest text-secret-rose-deep/50 uppercase">
        foto di sini
      </span>
    </div>
  );
}

export function SecretGallery() {
  return (
    <section id="galeri" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[11px] tracking-[0.4em] text-secret-rose-deep/60 uppercase">
              galeri
            </span>
            <h2 className="font-script mt-3 text-4xl font-bold text-secret-rose-deep sm:text-5xl">
              momen-momen kita
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-secret-ink/70 sm:text-base">
              tempat nyimpen foto yang bikin senyum. ditambahin lagi ya, biar
              makin penuh.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-2.5 shadow-[0_18px_44px_-18px_rgba(214,79,139,0.3)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-18px_rgba(214,79,139,0.45)]",
                )}
                style={{ transform: `rotate(${item.rotate ?? 0}deg)` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <GalleryMedia src={item.src} alt={item.caption} />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 shadow-[inset_0_0_0_1px_rgba(214,79,139,0.15),0_0_50px_rgba(244,167,188,0.3)] transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <Sparkles
                    aria-hidden
                    className="absolute top-3 right-3 size-5 text-white/80 drop-shadow"
                  />
                </div>
                <figcaption className="px-1.5 py-3 text-center">
                  <p className="font-display text-sm font-bold tracking-tight text-secret-ink">
                    {item.caption}
                  </p>
                  {item.note && (
                    <p className="mt-1 text-xs text-secret-rose-deep/60">{item.note}</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
