"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Magnetic } from "@/components/motion/magnetic";
import { prefersReducedMotion } from "@/components/motion/mouse";
import { cn } from "@/lib/utils";

export function CampaignHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [videoOk, setVideoOk] = useState(false);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    if (prefersReducedMotion()) {
      items.forEach((el) => el.style.removeProperty("opacity"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.4,
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header
      id="top"
      ref={rootRef}
      className="relative flex h-dvh min-h-[560px] w-full items-end justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0" aria-hidden>
        <video
          className={cn(
            "h-full w-full object-cover opacity-0 transition-opacity duration-1000",
            videoOk && "opacity-100",
          )}
          src="/campaign/hero.mp4"
          muted
          loop
          playsInline
          autoPlay
          onLoadedData={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
        />
        <div
          className={cn(
            "h-full w-full bg-cover bg-center transition-opacity duration-1000",
            videoOk && !playing && "opacity-0",
          )}
          style={{
            backgroundImage: "url(/campaign/sneaker-main.jpg)",
            backgroundPosition: "center 60%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pb-24 text-center">
        <p
          data-hero-reveal
          className="mb-3 font-space text-sm tracking-[0.2em] text-puma-acid uppercase md:text-base"
        >
          Built to move.
        </p>
        <h1
          data-hero-reveal
          className="font-anton text-[clamp(3.5rem,15vw,11rem)] leading-[0.9] tracking-tight text-white uppercase"
        >
          Ultra
          <br />
          Velocity
        </h1>
        <p
          data-hero-reveal
          className="mt-6 max-w-md text-base text-puma-muted md:text-lg"
        >
          Engineered for speed. Designed for movement.
        </p>

        <div data-hero-reveal className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Magnetic strength={0.25}>
            <a
              href="#engineering"
              className="inline-flex items-center justify-center rounded-full bg-puma-acid px-9 py-4 font-space text-xs tracking-[0.2em] text-black uppercase transition-colors duration-300 hover:bg-white"
            >
              Explore the shoe
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={() => {
                const video = rootRef.current?.querySelector("video");
                if (!video || !videoOk) return;
                if (video.paused) {
                  video.play();
                  setPlaying(true);
                } else {
                  video.pause();
                  setPlaying(false);
                }
              }}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border border-puma-outline px-9 py-4 font-space text-xs tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:border-white",
                !videoOk && "opacity-60",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch film
            </button>
          </Magnetic>
        </div>
      </div>

      <div
        className="absolute right-8 bottom-8 z-10 hidden items-center gap-3 md:flex"
        aria-hidden
      >
        <span className="font-space text-[10px] tracking-[0.3em] text-puma-muted uppercase">
          Scroll
        </span>
        <span className="block h-12 w-px bg-gradient-to-b from-puma-acid to-transparent" />
      </div>
    </header>
  );
}
