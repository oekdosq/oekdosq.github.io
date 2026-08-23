import Link from "next/link";
import { navLinks, socials, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 mask-fade-y bg-radial-volt opacity-40" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 md:flex-row md:items-start md:justify-between md:py-16">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-bold tracking-tight">
            dyland<span className="text-volt-text">.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {site.role} · {site.title}. Belajar jaringan, suka mencoba hal baru,
            dan selalu penasaran sama teknologi.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition hover:text-volt-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Sosial
            </p>
            <ul className="mt-4 space-y-2.5">
              {[socials.instagram, socials.tiktok].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 transition hover:text-volt-text"
                  >
                    {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:px-10">
          <p>
            © {new Date().getFullYear()} {site.name}. Dibuat sambil belajar
            jaringan &amp; teknologi.
          </p>
          <p className="tabular-nums">est. 2009 · terus belajar</p>
        </div>
      </div>
    </footer>
  );
}
