"use client";

import { Tilt3D } from "@/components/motion/tilt";

export function CampaignProductIntro() {
  return (
    <section
      id="product"
      className="relative overflow-hidden px-5 py-20 md:px-20 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
        <div className="z-10 md:col-span-4 md:col-start-2">
          <h2
            data-reveal
            className="font-anton text-4xl tracking-tight text-white uppercase md:text-5xl"
          >
            Made to move
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-puma-muted">
            ULTRA VELOCITY isn&apos;t just a shoe; it&apos;s an extension of
            kinetic energy. Engineered with high-contrast minimalism, stripping
            away the unnecessary to leave only pure performance.
          </p>
        </div>

        <div
          data-reveal
          className="relative h-[42vh] w-full md:col-span-7 md:col-start-6 md:h-[52vh]"
        >
          <Tilt3D max={5} scale={1.01} className="h-full w-full">
            <div
              className="h-full w-full bg-cover bg-center shadow-2xl shadow-black/60"
              style={{ backgroundImage: "url(/campaign/sneaker-main.jpg)" }}
              role="img"
              aria-label="Sneaker ULTRA VELOCITY"
            />
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}
