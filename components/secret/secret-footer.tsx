"use client";

import { Heart } from "lucide-react";
import { secretFooter } from "@/lib/secret";

export function SecretFooter() {
  return (
    <footer className="relative px-6 pt-4 pb-28 md:pb-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <span className="font-script text-2xl font-bold text-secret-rose-deep">
            Secret
          </span>
          <Heart className="animate-heartbeat size-4 fill-secret-rose text-secret-rose" />
        </div>
        <p className="text-sm text-secret-ink/60">{secretFooter.line1}</p>
        <p className="font-mono text-[10px] tracking-[0.35em] text-secret-rose-deep/40 uppercase">
          {secretFooter.line2}
        </p>
      </div>
    </footer>
  );
}
