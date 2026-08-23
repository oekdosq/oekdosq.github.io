export function CampaignLifestyle() {
  return (
    <section
      id="campaign"
      className="relative overflow-hidden px-5 py-8 md:px-20"
    >
      <div
        data-reveal
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[21/9]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ backgroundImage: "url(/campaign/lifestyle-city.jpg)" }}
          role="img"
          aria-label="Atlet memakai ULTRA VELOCITY berlari di lingkungan urban industri"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-puma-bg via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
          <span className="mb-3 block font-space text-xs tracking-[0.3em] text-puma-acid uppercase">
            City / 01
          </span>
          <h3 className="font-anton text-3xl tracking-tight text-white uppercase md:text-6xl">
            Move without limits
          </h3>
        </div>
      </div>
    </section>
  );
}
