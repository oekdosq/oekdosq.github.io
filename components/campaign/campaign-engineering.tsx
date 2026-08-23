"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Hotspot = {
  id: string;
  label: string;
  desc: string;
  top: string;
  left: string;
  panelSide: "bottom" | "top";
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "upper",
    label: "Upper",
    desc: "Breathable adaptive mesh",
    top: "35%",
    left: "45%",
    panelSide: "bottom",
  },
  {
    id: "midsole",
    label: "Midsole",
    desc: "Responsive cushioning foam",
    top: "70%",
    left: "50%",
    panelSide: "top",
  },
  {
    id: "outsole",
    label: "Outsole",
    desc: "High-traction rubber",
    top: "85%",
    left: "35%",
    panelSide: "top",
  },
  {
    id: "heel",
    label: "Heel",
    desc: "Locked-in stability",
    top: "50%",
    left: "80%",
    panelSide: "bottom",
  },
];

const STEPS = HOTSPOTS.slice(0, 3).map((h, i) => ({
  id: h.id,
  num: `0${i + 1}`,
  label: h.label,
}));

export function CampaignEngineering() {
  const [active, setActive] = useState<string | null>(null);

  const selected = useMemo(
    () => HOTSPOTS.find((h) => h.id === active) ?? null,
    [active],
  );

  return (
    <section
      id="engineering"
      className="relative bg-puma-panel px-5 py-20 md:px-20 md:py-32"
    >
      <div className="relative z-10 mb-10 text-center">
        <h2 data-reveal className="font-anton text-5xl tracking-tight text-white uppercase md:text-7xl">
          Engineering
        </h2>
        <p data-reveal className="mt-3 font-space text-xs tracking-[0.3em] text-puma-muted uppercase">
          Hover or tap to explore
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-12">
        <div className="relative order-2 md:order-1 md:col-span-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <div
              className={cn(
                "absolute inset-0 bg-black transition-opacity duration-300",
                active ? "opacity-50" : "opacity-0",
              )}
              aria-hidden
            />
            <div
              className="h-full w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/campaign/sneaker-main.jpg)" }}
              role="img"
              aria-label="Profil sneaker ULTRA VELOCITY"
            />

            {HOTSPOTS.map((spot) => {
              const isActive = active === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onMouseEnter={() => setActive(spot.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(spot.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : spot.id)}
                  aria-label={`Detail ${spot.label}`}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <span className="relative flex size-5 items-center justify-center rounded-full bg-puma-acid">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-puma-acid opacity-40"
                      aria-hidden
                    />
                    <span className="size-1.5 rounded-full bg-black" aria-hidden />
                  </span>

                  <span
                    className={cn(
                      "pointer-events-none absolute left-1/2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-puma-outline bg-puma-panel-high/95 px-4 py-3 text-left transition-all duration-300",
                      spot.panelSide === "bottom"
                        ? "bottom-full mb-4"
                        : "top-full mt-4",
                      isActive
                        ? "translate-y-0 opacity-100"
                        : cn(
                            "opacity-0",
                            spot.panelSide === "bottom"
                              ? "translate-y-2"
                              : "-translate-y-2",
                          ),
                    )}
                    role="tooltip"
                  >
                    <span className="block font-space text-xs tracking-[0.2em] text-puma-acid uppercase">
                      {spot.label}
                    </span>
                    <span className="mt-1 block text-sm text-puma-muted">
                      {spot.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-1 flex flex-row justify-between gap-6 md:order-2 md:col-span-4 md:flex-col">
          <div className="flex flex-col gap-8">
            {STEPS.map((step) => (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => setActive(step.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(step.id)}
                onBlur={() => setActive(null)}
                className="group text-left"
              >
                <span
                  className={cn(
                    "font-space text-xs tracking-[0.3em] transition-colors",
                    active === step.id
                      ? "text-puma-acid"
                      : "text-puma-muted group-hover:text-puma-acid",
                  )}
                >
                  {step.num}
                </span>
                <span
                  className={cn(
                    "block font-anton text-3xl tracking-tight uppercase transition-colors md:text-4xl",
                    active === step.id
                      ? "text-white"
                      : "text-puma-muted group-hover:text-white",
                  )}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden max-w-[220px] md:block">
            <p className="text-sm leading-relaxed text-puma-muted">
              {selected
                ? selected.desc
                : "Arahkan kursor ke komponen untuk melihat detail konstruksi."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
