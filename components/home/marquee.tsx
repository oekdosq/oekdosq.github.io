"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const row1 = [
  "Jaringan Komputer",
  "Mikrotik",
  "Cisco",
  "Linux",
  "TCP/IP",
  "VLAN",
  "Subnetting",
  "Server",
  "Troubleshooting",
  "Cybersecurity",
  "Web Development",
];

const row2 = [
  "React",
  "Next.js",
  "ESP32",
  "RFID",
  "IoT",
  "Git",
  "Debian",
  "Terminal",
  "Packet Tracer",
  "Routing",
  "Firewall",
];

function MarqueeRow({
  items,
  duration = 38,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-x flex w-max gap-0 whitespace-nowrap">
      <div
        className="flex gap-0"
        style={{
          animation: `marquee-x ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-6 text-lg font-bold tracking-tight text-foreground/40 transition-colors duration-300 hover:text-volt sm:text-xl">
              {item}
            </span>
            <span className="size-1.5 rounded-full bg-volt/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glow = el.querySelector<HTMLElement>("[data-glow]");
    if (!glow) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      xTo(0);
    };
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-0 mask-fade-y bg-grain opacity-[0.04]" />

      {/* Glow follow cursor */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute top-0 h-full w-64 -translate-x-1/2 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.87 0.21 123), transparent 70%)",
        }}
      />

      <div className="flex flex-col gap-3">
        <MarqueeRow items={row1} duration={42} />
        <MarqueeRow items={row2} duration={36} reverse />
      </div>
    </section>
  );
}
