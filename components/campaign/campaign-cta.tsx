import { Magnetic } from "@/components/motion/magnetic";

export function CampaignCta() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[70vh] overflow-hidden"
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-center bg-puma-bg p-8 text-center md:w-1/2">
        <h2
          data-reveal
          className="font-anton text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tight text-white uppercase"
        >
          Ready to
          <br />
          move?
        </h2>
        <p data-reveal className="mt-6 text-lg text-puma-muted">
          Discover ULTRA VELOCITY.
        </p>
        <div data-reveal className="mt-10 flex flex-col gap-5 sm:flex-row">
          <Magnetic strength={0.25}>
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full bg-puma-acid px-12 py-5 font-space text-sm tracking-[0.2em] text-black uppercase transition-colors duration-300 hover:bg-white"
            >
              Shop now
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#engineering"
              className="inline-flex items-center justify-center rounded-full border border-puma-outline px-12 py-5 font-space text-sm tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:border-white"
            >
              Explore details
            </a>
          </Magnetic>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center md:absolute md:left-1/2 md:right-0 md:w-1/2"
        style={{ backgroundImage: "url(/campaign/sneaker-main.jpg)" }}
        role="img"
        aria-label="Sneaker ULTRA VELOCITY"
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>
    </section>
  );
}
