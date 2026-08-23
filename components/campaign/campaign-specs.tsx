"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CampaignLifestyle } from "@/components/campaign/campaign-lifestyle";

const COLORS = [
  { name: "Black", swatch: "oklch(0.15 0.012 100)", filter: "none" },
  { name: "Bone", swatch: "oklch(0.92 0.01 85)", filter: "brightness(1.35) saturate(0.35)" },
  { name: "Acid", swatch: "oklch(0.88 0.22 120)", filter: "sepia(0.4) saturate(4) hue-rotate(40deg)" },
  { name: "Forest", swatch: "oklch(0.45 0.15 130)", filter: "sepia(0.6) saturate(3) hue-rotate(70deg)" },
];

export function CampaignSpecs() {
  const [index, setIndex] = useState(0);

  return (
    <section id="details" className="px-5 py-20 md:px-20 md:py-28">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[240px]">
        <div
          data-reveal
          className="flex flex-col justify-between rounded-2xl bg-puma-panel-high p-8 md:col-span-5"
        >
          <h3 className="font-anton text-3xl tracking-tight text-white uppercase">
            Specs
          </h3>
          <ul className="mt-6 space-y-4">
            {[
              ["Category", "Performance Running"],
              ["Fit", "True to size, adaptive wrap"],
              ["Use", "Everyday, urban"],
            ].map(([label, value], i) => (
              <li
                key={label}
                className={cn(
                  "flex items-baseline justify-between gap-4 pb-3",
                  i < 2 && "border-b border-puma-outline/50",
                )}
              >
                <span className="font-space text-xs tracking-[0.2em] text-puma-muted uppercase">
                  {label}
                </span>
                <span className="text-right text-sm font-medium text-white">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="flex flex-col justify-between rounded-2xl bg-puma-panel p-8 md:col-span-7"
        >
          <div className="flex items-start justify-between">
            <h3 className="font-anton text-3xl tracking-tight text-white uppercase">
              Choose your color
            </h3>
            <span className="font-space text-xs tracking-[0.2em] text-puma-acid uppercase tabular-nums">
              0{index + 1} / 0{COLORS.length}
            </span>
          </div>

          <div className="relative mt-6 flex-1">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-[filter] duration-500"
              style={{
                backgroundImage: "url(/campaign/sneaker-main.jpg)",
                filter: COLORS[index].filter,
              }}
              role="img"
              aria-label={`Colorway ${COLORS[index].name}`}
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            {COLORS.map((color, i) => (
              <button
                key={color.name}
                type="button"
                aria-label={`Warna ${color.name}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "size-10 rounded-full border transition-all duration-300 hover:scale-110",
                  i === index
                    ? "border-puma-acid"
                    : "border-puma-outline/60 hover:border-puma-muted",
                )}
                style={{ backgroundColor: color.swatch }}
              />
            ))}
            <div className="flex-1" />
            <span className="hidden font-space text-xs tracking-[0.2em] text-white uppercase sm:block">
              {COLORS[index].name}
            </span>
          </div>
        </div>

        <div data-reveal className="md:col-span-12">
          <CampaignLifestyle />
        </div>
      </div>
    </section>
  );
}
