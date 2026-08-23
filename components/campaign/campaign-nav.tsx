"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "PRODUCT", href: "#product" },
  { label: "STORY", href: "#story" },
  { label: "CAMPAIGN", href: "#campaign" },
  { label: "DETAILS", href: "#details" },
];

export function CampaignNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-20",
        scrolled && !open && "bg-puma-bg/70 backdrop-blur-md",
      )}
    >
      <a
        href="#top"
        className="font-anton text-2xl tracking-tight text-white uppercase"
        onClick={() => setOpen(false)}
      >
        PUMA
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-space text-xs tracking-[0.15em] text-puma-muted uppercase transition-colors duration-300 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#cta"
        className="hidden rounded-full bg-puma-acid px-6 py-2.5 font-space text-xs tracking-[0.15em] text-black uppercase transition-colors duration-300 hover:bg-white md:inline-flex"
      >
        Shop
      </a>

      <button
        type="button"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center text-white md:hidden"
      >
        <span className="relative block h-3.5 w-6" aria-hidden>
          <span
            className={cn(
              "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-current transition-all duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-10 bg-puma-bg transition-all duration-500 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-anton text-5xl tracking-tight text-white uppercase transition-all duration-500"
            style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#cta"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-puma-acid px-10 py-4 font-space text-sm tracking-[0.15em] text-black uppercase"
        >
          Shop
        </a>
      </div>
    </nav>
  );
}
