"use client";

import { Pause, Play, SkipBack, SkipForward, Heart, Sparkles, Music2 } from "lucide-react";
import { useMusic } from "@/components/music/music-provider";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SecretPlaylist() {
  const {
    tracks,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    available,
    currentTrack,
    toggle,
    next,
    prev,
    playTrack,
    seek,
  } = useMusic();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="playlist" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[11px] tracking-[0.4em] text-secret-rose-deep/60 uppercase">
              playlist
            </span>
            <h2 className="font-script mt-3 text-4xl font-bold text-secret-rose-deep sm:text-5xl">
              lagu-lagu kita
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-secret-ink/70 sm:text-base">
              dengerin sambil scroll. lagu yang selalu bikin kepikiran kamu.
            </p>
          </div>
        </Reveal>

        {/* Now playing card */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_24px_60px_-20px_rgba(214,79,139,0.35)] backdrop-blur sm:p-6">
            <div className="flex items-center gap-5">
              {/* Album artwork */}
              <div className="relative shrink-0">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffe3ec] via-[#ffd6e2] to-white shadow-inner sm:size-24">
                  {isPlaying ? (
                    <Music2 className="animate-heartbeat size-8 text-secret-rose sm:size-9" />
                  ) : (
                    <Heart className="size-8 text-secret-rose sm:size-9" />
                  )}
                </div>
                <Sparkles
                  aria-hidden
                  className="absolute -top-2 -right-2 size-5 text-secret-rose/60"
                />
              </div>

              {/* Song info */}
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-widest text-secret-rose-deep/50 uppercase">
                  {isPlaying ? "sedang diputar" : "putar salah satu"}
                </p>
                <h3
                  suppressHydrationWarning
                  className="font-display mt-1 truncate text-lg font-bold tracking-tight text-secret-ink sm:text-xl"
                >
                  {currentTrack?.title ?? "·"}
                </h3>
                <p
                  suppressHydrationWarning
                  className="truncate text-sm text-secret-rose-deep/70"
                >
                  {currentTrack?.artist ?? "·"}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Lagu sebelumnya"
                  className="flex size-9 items-center justify-center rounded-full text-secret-rose-deep/70 transition hover:bg-secret-rose/10 hover:text-secret-rose-deep"
                >
                  <SkipBack className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "Jeda" : "Putar"}
                  className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-secret-rose to-secret-rose-deep text-white shadow-lg shadow-secret-rose/35 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="size-5" />
                  ) : (
                    <Play className="ml-0.5 size-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Lagu berikutnya"
                  className="flex size-9 items-center justify-center rounded-full text-secret-rose-deep/70 transition hover:bg-secret-rose/10 hover:text-secret-rose-deep"
                >
                  <SkipForward className="size-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-medium text-secret-muted tabular-nums">
                <span suppressHydrationWarning>{formatTime(currentTime)}</span>
                <span suppressHydrationWarning>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Progress lagu"
                className="secret-range mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, oklch(0.78 0.1 355) ${progress}%, oklch(0.9 0.06 355 / 0.4) ${progress}%)`,
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* Playlist items */}
        <div className="mx-auto mt-6 max-w-lg space-y-2">
          {tracks.map((track, i) => {
            const isActive = i === currentIndex;
            const hasFile = available[i];
            return (
              <Reveal key={track.id} delay={0.05 + i * 0.05}>
                <button
                  type="button"
                  onClick={() => {
                    if (isActive) toggle();
                    else playTrack(i);
                  }}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-left backdrop-blur transition-all duration-300",
                    isActive
                      ? "border-secret-rose/30 bg-secret-rose/10 shadow-md shadow-secret-rose/10"
                      : "hover:border-secret-rose/20 hover:bg-white/90",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-gradient-to-br from-secret-rose to-secret-rose-deep text-white"
                        : "bg-secret-rose-soft/40 text-secret-rose-deep",
                    )}
                  >
                    {isActive && isPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="ml-0.5 size-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      suppressHydrationWarning
                      className={cn(
                        "block truncate text-sm font-semibold",
                        isActive ? "text-secret-rose-deep" : "text-secret-ink",
                      )}
                    >
                      {track.title}
                    </span>
                    <span
                      suppressHydrationWarning
                      className="block truncate text-xs text-secret-muted"
                    >
                      {track.artist}
                    </span>
                  </span>
                  <span className="text-xs text-secret-muted">
                    {hasFile ? "♡" : "link"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
