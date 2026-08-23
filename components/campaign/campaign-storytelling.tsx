const WORDS = [
  { label: "LIGHTWEIGHT", outline: false },
  { label: "COMFORT", outline: true },
  { label: "TRACTION", outline: false },
  { label: "EVERYDAY PERFORMANCE", outline: true },
];

export function CampaignStorytelling() {
  return (
    <section
      id="story"
      className="overflow-hidden border-y border-puma-outline/40 bg-puma-bg py-20 md:py-28"
    >
      <div className="flex flex-col items-center gap-6 px-5">
        {WORDS.map((word) => (
          <div key={word.label} className="overflow-hidden" data-reveal>
            <h2
              className={`text-center font-anton leading-[0.9] tracking-tight uppercase ${
                word.outline
                  ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-puma-outline)]"
                  : "text-white"
              } text-[clamp(3rem,10vw,8rem)]`}
            >
              {word.label}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
