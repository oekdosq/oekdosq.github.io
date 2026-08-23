export function CampaignFooter() {
  return (
    <footer className="flex flex-col items-center justify-center gap-6 border-t border-puma-outline/40 bg-puma-bg px-5 py-16">
      <a href="#top" className="font-anton text-3xl tracking-tight text-white uppercase">
        PUMA
      </a>
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Footer">
        {["Privacy Policy", "Terms of Use", "Contact"].map((label) => (
          <a
            key={label}
            href="#top"
            className="font-space text-xs tracking-[0.15em] text-puma-muted uppercase transition-colors duration-300 hover:text-puma-acid"
          >
            {label}
          </a>
        ))}
      </nav>
      <p className="text-sm text-puma-muted">
        © 2026 Concept campaign. All rights reserved.
      </p>
    </footer>
  );
}
