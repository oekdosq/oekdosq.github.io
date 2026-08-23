"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRavenoir } from "./player-provider";
import {
  IcChevronDown, IcHeart, IcQueue, IcNext, IcPause,
  IcPlay, IcPrev, IcRepeat, IcRepeatOne, IcShare, IcShuffle, IcVolume,
} from "./icons";
import { ProgressBar } from "./ui-bits";
import Visualizer from "./visualizer";

export default function FullPlayer() {
  const {
    tracks, currentId, playing, toggle, next, prev, fullOpen, setFullOpen,
    shuffle, cycleShuffle, repeat, cycleRepeat, volume, setVolume,
    toggleFavorite, setView,
  } = useRavenoir();
  const track = tracks.find((t) => t.id === currentId);
  const liked = !!track?.favorite;

  return (
    <AnimatePresence>
      {fullOpen && track && (
        <motion.div
          key="full"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
          drag="y"
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 110 || info.velocity.y > 600) setFullOpen(false);
          }}
          className="fixed inset-0 z-50 flex flex-col bg-[#080808]"
          aria-modal="true"
          role="dialog"
          aria-label="Now playing"
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <button onClick={() => setFullOpen(false)} aria-label="Close player" className="p-1 text-[#888] hover:text-[#F5F5F5]">
              <IcChevronDown size={22} />
            </button>
            <div className="text-center">
              <p className="font-mono text-[8px] tracking-[0.35em] text-[#555]">PLAYING FROM</p>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#F5F5F5]">YOUR LIBRARY</p>
            </div>
            <motion.button
              onClick={() => toggleFavorite(track.id)}
              aria-label={liked ? "Unlike" : "Like"}
              whileTap={{ scale: 0.75 }}
              className={`p-1 transition-colors ${liked ? "text-white" : "text-[#555] hover:text-[#888]"}`}
            >
              <IcHeart size={20} filled={liked} />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="mx-auto mt-6 aspect-square w-[min(78vw,320px)] overflow-hidden rounded-lg border border-[#272727] bg-[#111111] shadow-[0_28px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(255,255,255,0.05)]"
          >
            <motion.div
              animate={playing ? { scale: [1, 1.04, 1] } : { scale: 0.96 }}
              transition={playing ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : { duration: 0.3 }}
              className="grid h-full w-full place-items-center"
            >
              <span className="font-mono text-8xl text-[#F5F5F5]">R</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.35 }}
            className="mt-7 flex items-end justify-between gap-3 px-7"
          >
            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-bold tracking-tight text-[#F5F5F5]">{track.title}</h1>
              <p className="mt-0.5 truncate font-mono text-[11px] tracking-[0.22em] text-[#888]">{track.artist}</p>
            </div>
            <span className="shrink-0 rounded-sm border border-[#272727] px-1.5 py-0.5 font-mono text-[8px] tracking-[0.25em] text-[#555]">
              OFFLINE
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="mt-3 px-7">
            <ProgressBar big />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="mt-2 px-7">
            <Visualizer height={40} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.35 }}
            className="mt-3 flex items-center justify-between px-8"
          >
            <button
              onClick={cycleShuffle}
              aria-label="Shuffle"
              className={`p-2 transition-colors ${shuffle ? "text-white" : "text-[#555] hover:text-[#888]"}`}
            >
              <IcShuffle size={19} />
            </button>
            <div className="flex items-center gap-8">
              <button onClick={prev} aria-label="Previous" className="text-[#F5F5F5] active:scale-90 transition-transform">
                <IcPrev size={27} />
              </button>
              <motion.button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                whileTap={{ scale: 0.92 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-[#F5F5F5] text-black shadow-[0_10px_30px_rgba(255,255,255,0.13)]"
              >
                {playing ? <IcPause size={26} /> : <IcPlay size={26} />}
              </motion.button>
              <button onClick={next} aria-label="Next" className="text-[#F5F5F5] active:scale-90 transition-transform">
                <IcNext size={27} />
              </button>
            </div>
            <button
              onClick={cycleRepeat}
              aria-label="Repeat mode"
              className={`relative p-2 transition-colors ${repeat !== "off" ? "text-white" : "text-[#555] hover:text-[#888]"}`}
            >
              {repeat === "one" ? <IcRepeatOne size={19} /> : <IcRepeat size={19} />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-auto flex w-full max-w-xs items-center justify-between pb-9 pt-6"
          >
            <IcShare size={17} className="text-[#666]" />
            <div className="flex flex-1 items-center gap-3 px-6">
              <IcVolume size={15} className="shrink-0 text-[#666]" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="rng w-full"
              />
            </div>
            <button
              onClick={() => { setFullOpen(false); setView("queue"); }}
              aria-label="Open queue"
              className="p-1 text-[#666] hover:text-[#F5F5F5] transition-colors"
            >
              <IcQueue size={17} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
