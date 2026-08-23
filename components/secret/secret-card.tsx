"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import { Tilt3D } from "@/components/motion/tilt";
import { Magnetic } from "@/components/motion/magnetic";
import { Bow, Heart as HeartSvg } from "@/components/secret/characters";
import { secretEntries, type SecretMedia } from "@/lib/secret";
import { cn } from "@/lib/utils";

function MediaFrame({ media }: { media?: SecretMedia }) {
  if (media?.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        controls
        playsInline
        muted
        loop
        className="h-full w-full object-cover"
        aria-label={media.alt ?? "video rahasia"}
      />
    );
  }
  if (media?.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt ?? "foto rahasia"}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#ffe3ec] via-[#ffd6e2] to-white">
      <HeartSvg className="animate-heartbeat w-14 text-secret-rose" />
      <p className="font-mono text-[10px] tracking-widest text-secret-rose-deep/60 uppercase">
        foto di sini
      </p>
    </div>
  );
}

export function SecretCard() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = secretEntries.length;
  const entry = secretEntries[index];
  const timerRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + dir + total) % total);
        setVisible(true);
      }, 180);
    },
    [total],
  );

  useEffect(() => {
    timerRef.current = window.setInterval(() => go(1), 6000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [go]);

  const onManual = useCallback((fn: () => void) => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    fn();
  }, []);

  return (
    <section id="rahasia" className="relative px-5 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="font-mono text-[11px] font-medium tracking-[0.4em] text-secret-rose-deep/60 uppercase">
          rahasia kita
        </p>

        <div className="relative mt-10 w-full max-w-[20rem] sm:max-w-sm">
          <Tilt3D max={4} scale={1.015}>
            {/* Paper texture behind */}
            <div
              aria-hidden
              className="absolute inset-0 -rotate-2 rounded-[1.6rem] bg-secret-rose-soft/30 shadow-2xl shadow-secret-rose/25"
            />
            {/* Main photo card */}
            <figure
              className={cn(
                "relative overflow-visible rounded-[1.5rem] border border-white/70 bg-white/90 p-3 pt-3 pb-14 shadow-[0_40px_80px_-24px_rgba(214,79,139,0.35)] transition-all duration-300",
                !visible && "scale-[0.97] opacity-0",
              )}
            >
              {/* Decorative tape at top corners */}
              <div aria-hidden className="absolute -top-3 left-6 h-6 w-20 -rotate-6 rounded-sm bg-[oklch(0.9_0.06_30/0.6)] shadow-sm" />
              <div aria-hidden className="absolute -top-3 right-6 h-6 w-20 rotate-6 rounded-sm bg-[oklch(0.9_0.06_30/0.6)] shadow-sm" />

              {/* Bow on top */}
              <div className="absolute -top-7 left-1/2 z-10 -translate-x-1/2">
                <Bow className="w-11 text-secret-rose drop-shadow-sm" />
              </div>

              {/* Media frame */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#ffe3ec] via-[#ffd6e2] to-white">
                <MediaFrame media={entry.media} />

                {/* soft glow + hover interaction */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 shadow-[inset_0_0_0_1px_rgba(214,79,139,0.2),0_0_60px_rgba(244,167,188,0.35)] transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* top-left heart pin */}
                <Sparkles
                  aria-hidden
                  className="absolute top-5 right-6 w-8 text-secret-rose/60"
                />
                <Sparkles
                  aria-hidden
                  className="animate-twinkle-soft absolute bottom-8 left-6 w-5 text-secret-rose/50"
                />
              </div>

              {/* Caption */}
              <figcaption className="mt-6 text-center">
                <h2 className="font-script text-3xl leading-tight font-bold text-secret-rose-deep sm:text-4xl">
                  {entry.title}
                </h2>
                <p className="font-mono mt-3 text-[10px] tracking-[0.35em] text-secret-rose-deep/50 uppercase">
                  {entry.caption}
                </p>
              </figcaption>
            </figure>
          </Tilt3D>

          {/* Carousel arrows */}
          <Magnetic strength={0.35} className="absolute top-1/2 -left-4 -translate-y-1/2 sm:-left-7">
            <button
              type="button"
              onClick={() => onManual(() => go(-1))}
              aria-label="Rahasia sebelumnya"
              className="flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-secret-rose-deep shadow-lg shadow-secret-rose/20 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
          </Magnetic>
          <Magnetic strength={0.35} className="absolute top-1/2 -right-4 -translate-y-1/2 sm:-right-7">
            <button
              type="button"
              onClick={() => onManual(() => go(1))}
              aria-label="Rahasia berikutnya"
              className="flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-secret-rose-deep shadow-lg shadow-secret-rose/20 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </Magnetic>

          {/* Carousel indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {secretEntries.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => onManual(() => setIndex(i))}
                aria-label={`Rahasia ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-7 bg-secret-rose"
                    : "w-2 bg-secret-rose/30 hover:bg-secret-rose/50",
                )}
              />
            ))}
          </div>
        </div>

        {/* Short romantic message */}
        <div className="mt-10 max-w-md text-center">
          <Heart className="mx-auto size-5 fill-secret-rose/70 text-secret-rose" />
          <p className="mt-4 text-pretty text-base leading-relaxed text-secret-ink/80 sm:text-lg">
            {entry.message}
          </p>
        </div>
      </div>
    </section>
  );
}
