"use client";

import { useEffect, useState } from "react";
import { Heart, Music2, Home, Sparkles, Images, ListMusic } from "lucide-react";
import { useMusic } from "@/components/music/music-provider";
import { secretNavLinks, secretMobileNav } from "@/lib/secret";
import { cn } from "@/lib/utils";

const mobileIcons = [Home, Sparkles, Images, ListMusic];

export function SecretNav() {
  const { toggle, isPlaying } = useMusic();
  const [active, setActive] = useState("#beranda");

  useEffect(() => {
    const ids = ["beranda", "rahasia", "galeri", "playlist", "tentang"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop top navbar */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8">
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-full border border-white/50 bg-white/55 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(214,79,139,0.25)] backdrop-blur-xl">
          <a
            href="#beranda"
            className="group flex items-center gap-2 rounded-full py-1 pr-3 pl-1"
            aria-label="Secret, kembali ke atas"
          >
            <span className="animate-heartbeat flex size-8 items-center justify-center rounded-full bg-secret-rose text-white shadow-md shadow-secret-rose/40">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="font-script text-2xl leading-none font-bold text-secret-rose-deep">
              Secret
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {secretNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
                  active === link.href
                    ? "bg-secret-rose/15 text-secret-rose-deep"
                    : "text-secret-muted hover:bg-secret-rose/10 hover:text-secret-rose-deep",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-2 rounded-full border border-secret-rose/25 bg-secret-rose/10 px-3 py-1.5 text-sm font-semibold text-secret-rose-deep transition-all duration-300 hover:bg-secret-rose/20"
          >
            {isPlaying ? (
              <Music2 className="size-4" />
            ) : (
              <Heart className="size-4 text-secret-rose" />
            )}
            <span className="hidden sm:inline">hi, kamu ♡</span>
          </button>
        </nav>
      </header>

      {/* Mobile bottom floating nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden"
        aria-label="Navigasi secret"
      >
        <div className="mx-auto flex w-fit items-end gap-1 rounded-full border border-white/60 bg-white/70 px-3 py-2 shadow-[0_10px_36px_-12px_rgba(214,79,139,0.4)] backdrop-blur-xl">
          {secretMobileNav.slice(0, 2).map((link, i) => {
            const Icon = mobileIcons[i];
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex w-14 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-semibold transition-all duration-300",
                  isActive
                    ? "bg-secret-rose/15 text-secret-rose-deep"
                    : "text-secret-muted hover:bg-secret-rose/10",
                )}
              >
                <Icon className="size-4.5" />
                {link.label}
              </a>
            );
          })}

          {/* Central floating heart button */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
            className="relative mx-1 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-secret-rose to-secret-rose-deep text-white shadow-lg shadow-secret-rose/40 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-secret-rose/40 blur-md"
            />
            <span className="relative flex size-full items-center justify-center">
              {isPlaying ? (
                <Music2 className="size-5" />
              ) : (
                <Heart className="animate-heartbeat size-5 fill-current" />
              )}
            </span>
          </button>

          {secretMobileNav.slice(2).map((link, i) => {
            const Icon = mobileIcons[i + 2];
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex w-14 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-semibold transition-all duration-300",
                  isActive
                    ? "bg-secret-rose/15 text-secret-rose-deep"
                    : "text-secret-muted hover:bg-secret-rose/10",
                )}
              >
                <Icon className="size-4.5" />
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
