import { cn } from "@/lib/utils";

export function BrowserPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-background/60",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-3 py-2">
        <span className="size-2 rounded-full bg-destructive/60" />
        <span className="size-2 rounded-full bg-volt/70" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 flex-1 truncate rounded-md bg-muted px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
          https://dyland.dev
        </span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="h-2 w-24 rounded-full bg-muted-foreground/25" />
            <div className="h-3.5 w-32 rounded-full bg-volt/60" />
            <div className="h-2 w-40 rounded-full bg-muted-foreground/15" />
          </div>
          <span className="rounded-full bg-volt/15 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-widest text-volt-text uppercase">
            online
          </span>
        </div>
        <div className="flex gap-2">
          <div className="h-14 flex-1 rounded-lg bg-muted/70" />
          <div className="h-14 flex-1 rounded-lg bg-muted/70" />
          <div className="h-14 flex-1 rounded-lg bg-muted/70" />
        </div>
      </div>
    </div>
  );
}
