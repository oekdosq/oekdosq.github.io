"use client";

import { useMemo, type CSSProperties } from "react";
import { Heart, Sparkles } from "lucide-react";
import { KittyFace, CinnamorollFace, Bow, Flower } from "@/components/secret/characters";

function rand(n: number, seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * n;
}

export function SecretBackground() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        left: rand(96, i + 1),
        top: rand(96, i + 40),
        size: rand(22, i + 90) + 12,
        delay: rand(4, i + 200),
        dur: rand(4, i + 300) + 7,
        opacity: rand(0.5, i + 400) + 0.12,
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: rand(98, i + 60),
        top: rand(96, i + 100),
        size: rand(14, i + 500) + 8,
        delay: rand(3, i + 600),
        dur: rand(3, i + 700) + 4,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient: cream → blush */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(58rem 42rem at 88% -12%, oklch(0.9 0.06 355 / 0.5), transparent 62%)",
            "radial-gradient(50rem 38rem at -12% 108%, oklch(0.88 0.05 30 / 0.45), transparent 60%)",
            "radial-gradient(34rem 26rem at 50% 50%, oklch(0.985 0.008 85 / 0.7), transparent 65%)",
            "linear-gradient(to bottom, oklch(0.985 0.012 355), oklch(0.965 0.02 355))",
          ].join(","),
        }}
      />

      {/* Soft blurred blobs */}
      <div className="animate-float-soft absolute -top-24 -right-16 size-96 rounded-full bg-secret-rose/20 blur-3xl" />
      <div
        className="animate-float-soft absolute -bottom-28 -left-20 size-[28rem] rounded-full bg-[oklch(0.86_0.06_30/0.35)] blur-3xl"
        style={{ animationDelay: "1.6s" }}
      />
      <div
        className="animate-drift-x absolute top-[38%] left-[8%] size-56 rounded-full bg-secret-rose-soft/25 blur-3xl"
        style={{ "--drift": "26px", "--drift-dur": "11s" } as CSSProperties}
      />

      {/* Faint rising hearts */}
      {hearts.map((h, i) => (
        <Heart
          key={`h-${i}`}
          className="animate-rise-fade absolute text-secret-rose"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.dur}s`,
          }}
        />
      ))}

      {/* Tiny sparkles */}
      {sparkles.map((s, i) => (
        <Sparkles
          key={`s-${i}`}
          className="animate-twinkle-soft absolute text-secret-rose/70"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}

      {/* Corner stickers — subtle */}
      <Bow className="animate-float-soft absolute top-[14%] right-[6%] w-10 text-secret-rose/35" />
      <Flower className="animate-drift-x absolute top-[22%] left-[5%] w-8 text-[oklch(0.8_0.06_30/0.4)]" style={{ "--drift": "14px", "--drift-dur": "10s" } as CSSProperties} />
      <KittyFace className="animate-float-soft absolute bottom-[12%] left-[4%] w-14 opacity-40 sm:w-16" style={{ animationDelay: "0.8s" }} />
      <CinnamorollFace className="animate-float-soft absolute right-[5%] bottom-[8%] w-12 opacity-40 sm:w-16" style={{ animationDelay: "2s" }} />

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.03]" />
    </div>
  );
}
