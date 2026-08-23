import { cn } from "@/lib/utils";

type SectionDividerProps = {
  className?: string;
  variant?: "glow" | "line" | "dots";
};

export function SectionDivider({
  className,
  variant = "glow",
}: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className={cn("relative flex items-center justify-center py-2", className)}>
        <div className="flex items-center gap-2">
          <span className="size-1 rounded-full bg-volt/30" />
          <span className="size-1.5 rounded-full bg-volt/60" />
          <span className="size-1 rounded-full bg-volt/30" />
        </div>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={cn("relative flex items-center justify-center py-4", className)}>
        <div className="h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn("relative h-24 overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-volt/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.87 0.21 123), transparent 70%)",
        }}
      />
    </div>
  );
}
