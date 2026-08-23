import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TopologyDiagram } from "@/components/topology-diagram";
import { BrowserPreview } from "@/components/browser-preview";

function RfidChain({ compact = false }: { compact?: boolean }) {
  const steps = compact
    ? ["RFID CARD", "RC522", "ESP32", "WEB DASHBOARD"]
    : ["RFID CARD", "RC522", "ESP32", "Wi-Fi", "API", "DATABASE", "WEB DASHBOARD"];
  return (
    <div className="flex flex-col items-center gap-1">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center">
          <span className="flex items-center gap-2 rounded-md border border-volt/40 bg-background/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-foreground/80">
            <span className="size-1.5 rounded-full bg-volt" />
            {s}
          </span>
          {i < steps.length - 1 && (
            <ArrowDown className="size-3.5 py-0.5 text-volt/70" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

function CampaignVisual() {
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-puma-acid/30 bg-puma-bg">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_24px,oklch(0.88_0.22_120/0.12)_24px_26px)]" />
      <div className="relative flex flex-col items-center">
        <span className="font-display text-5xl font-black tracking-tight text-puma-acid sm:text-6xl">
          PUMA
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.35em] text-puma-muted uppercase">
          ultra velocity
        </span>
      </div>
    </div>
  );
}

export function ProjectVisual({
  kind,
  className,
  compact = false,
}: {
  kind: "topology" | "browser" | "rfid" | "campaign";
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {kind === "topology" && (
        <div className="overflow-hidden rounded-xl border border-border/60 bg-background/60 p-6">
          <p className="font-mono mb-4 text-[10px] tracking-widest text-muted-foreground uppercase">
            topology · lab jaringan
          </p>
          <TopologyDiagram className="w-full text-foreground/70" />
        </div>
      )}
      {kind === "browser" && <BrowserPreview />}
      {kind === "rfid" && (
        <div className="flex justify-center overflow-hidden rounded-xl border border-border/60 bg-background/60 px-4 py-6">
          <RfidChain compact={compact} />
        </div>
      )}
      {kind === "campaign" && <CampaignVisual />}
    </div>
  );
}

export { RfidChain };
