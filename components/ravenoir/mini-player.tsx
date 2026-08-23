"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRavenoir } from "./player-provider";
import { IcNext, IcPause, IcPlay, IcPrev } from "./icons";
import { LetterTile } from "./ui-bits";

export default function MiniPlayer() {
  const { tracks, currentId, playing, progress, toggle, next, prev, setFullOpen } = useRavenoir();
  const track = tracks.find((t) => t.id === currentId);

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          key="mini"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-2 bottom-[63px] z-40"
        >
          <div className="overflow-hidden rounded-lg bg-[#181818] shadow-[0_12px_32px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.06]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setFullOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setFullOpen(true)}
              aria-label="Open full player"
              className="flex items-center gap-3 px-2.5 py-2 cursor-pointer select-none active:bg-[#1e1e1e]"
            >
              <LetterTile text={track.title} size={40} rounded="rounded-md" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-[#F5F5F5]">{track.title}</span>
                <span className="block truncate text-[10px] tracking-wider text-[#888]">RAVENOIR · {track.artist}</span>
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
                className="p-1.5 text-[#888] hover:text-[#F5F5F5] active:scale-90 transition-transform"
              >
                <IcPrev size={17} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggle(); }}
                aria-label={playing ? "Pause" : "Play"}
                className="p-1.5 text-[#F5F5F5] active:scale-90 transition-transform"
              >
                {playing ? <IcPause size={20} /> : <IcPlay size={20} />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                className="p-1.5 text-[#888] hover:text-[#F5F5F5] active:scale-90 transition-transform"
              >
                <IcNext size={17} />
              </button>
            </div>
            <div className="h-[2px] w-full bg-[#272727]">
              <motion.div
                className="h-full bg-[#F5F5F5]"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
