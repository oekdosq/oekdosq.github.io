"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapterNav, site, socials } from "@/lib/site";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { scrollToSection, getLenis } from "@/components/motion/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const clickRef = useRef<{ count: number; last: number }>({ count: 0, last: 0 });

  const onHome = pathname === "/";

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    const ref = clickRef.current;
    if (now - ref.last > 1500) ref.count = 0;
    ref.count += 1;
    ref.last = now;
    if (ref.count >= 3) {
      ref.count = 0;
      setMenuOpen(false);
      router.push("/secret");
    }
  }, [router]);

  useEffect(() => {
    if (!onHome) return;
    const triggers = chapterNav.map((item) =>
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(item.id),
        onEnterBack: () => setActive(item.id),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [onHome]);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) {
      scrollToSection(`#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Dyland, klik 3x untuk rahasia"
            className="group relative z-50 flex items-center gap-2"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-volt font-mono text-xs font-black text-ink">
              D
            </span>
            <span className="font-display text-base font-black tracking-tight">
              DYLAND
            </span>
          </button>

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 rounded-full border border-border/50 bg-background/60 px-2 py-1.5 backdrop-blur-xl md:flex"
          >
            {chapterNav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                    isActive
                      ? "text-volt-text dark:text-volt"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "size-1 rounded-full bg-volt transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </a>
              );
            })}

            <div className="mx-1 h-5 w-px bg-border/70" aria-hidden />

            <button
              type="button"
              onClick={toggleTheme}
              suppressHydrationWarning
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
              aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
            >
              <Sun className="absolute size-4 dark:hidden" />
              <Moon className="absolute size-4 hidden dark:block" />
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              suppressHydrationWarning
              className="flex size-10 items-center justify-center rounded-full border border-border/50 bg-background/60 text-muted-foreground backdrop-blur-xl"
              aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
            >
              <Sun className="size-4 dark:hidden" />
              <Moon className="size-4 hidden dark:block" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              className="relative z-50 flex size-10 items-center justify-center rounded-full border border-border/50 bg-background/60 text-foreground backdrop-blur-xl"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        data-menu
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pt-28 pb-10 transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field opacity-30 [mask-image:radial-gradient(80%_80%_at_50%_20%,black,transparent)]"
        />
        <nav aria-label="Menu mobile" className="relative flex flex-col gap-1">
          {chapterNav.map((item, i) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "group flex items-baseline justify-between border-b border-border/50 py-4 transition",
                menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms" }}
            >
              <span className="font-display text-4xl font-black tracking-tight group-hover:text-volt-text">
                {item.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                0{i + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="relative flex items-center justify-between border-t border-border/50 pt-6">
          <p className="font-mono text-xs text-muted-foreground">{site.shortName} · {site.role}</p>
          <div className="flex items-center gap-3">
            {[socials.instagram, socials.tiktok].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition hover:border-volt/50 hover:text-volt-text"
                aria-label={s.label}
              >
                <ArrowUpRight className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
