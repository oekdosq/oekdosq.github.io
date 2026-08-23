"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronUp,
  ExternalLink,
  ListMusic,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useMusic } from "@/components/music/music-provider";
import { cn } from "@/lib/utils";

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-volt",
            playing ? "eq-bar" : "scale-y-[0.3]",
          )}
          style={{ height: "100%", animationDelay: `${i * 0.14}s` }}
        />
      ))}
    </span>
  );
}

export function MusicPlayer() {
  const pathname = usePathname();
  const {
    tracks,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    available,
    currentTrack,
    toggle,
    next,
    prev,
    playTrack,
    seek,
    setVolume,
  } = useMusic();
  const [open, setOpen] = useState(false);

  if (pathname === "/campaign" || pathname === "/secret") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-2xl shadow-black/20 backdrop-blur-xl dark:bg-card/80">
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <ListMusic className="size-3.5" />
              Favorit · putar {tracks.length} lagu
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Tutup player"
            >
              <ChevronUp className="size-4" />
            </button>
          </div>

          <div className="space-y-1 p-2">
            {tracks.map((track, i) => {
              const isActive = i === currentIndex;
              const hasFile = available[i];
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => {
                    if (isActive) toggle();
                    else playTrack(i);
                  }}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                    isActive ? "bg-volt/15" : "hover:bg-muted/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg transition",
                      isActive ? "bg-volt text-ink" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {isActive && isPlaying ? (
                      <Equalizer playing />
                    ) : (
                      <Music className="size-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block truncate text-sm font-medium",
                        isActive && "text-volt-text",
                      )}
                    >
                      {track.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {track.artist}
                    </span>
                  </span>
                  {!hasFile && track.spotify && (
                    <a
                      href={track.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground transition hover:border-volt hover:text-volt-text"
                    >
                      Spotify <ExternalLink className="size-2.5" />
                    </a>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-border/50 px-4 pt-3 pb-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Progress lagu"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-volt"
            />

            <div className="mt-3 flex items-center justify-between">
              <div className="flex w-24 items-center gap-2">
                <Volume2 className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-volt"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Lagu sebelumnya"
                >
                  <SkipBack className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  className="flex size-11 items-center justify-center rounded-full bg-volt text-ink shadow-lg shadow-volt/25 transition hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Jeda" : "Putar"}
                >
                  {isPlaying ? (
                    <Pause className="size-4.5" />
                  ) : (
                    <Play className="ml-0.5 size-4.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Lagu berikutnya"
                >
                  <SkipForward className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-3 rounded-full border border-border/60 bg-card/90 py-2 pr-4 pl-2 shadow-xl shadow-black/10 backdrop-blur-xl transition-all hover:border-volt/50 dark:bg-card/80",
          !open && "hover:scale-[1.03] active:scale-95",
        )}
        aria-label={open ? "Tutup music player" : "Buka music player"}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-volt text-ink">
          {isPlaying ? <Equalizer playing /> : <Music className="size-4" />}
        </span>
        <span className="hidden max-w-[140px] flex-col text-left sm:flex">
          <span suppressHydrationWarning className="truncate text-xs font-semibold">
            {currentTrack?.title}
          </span>
          <span suppressHydrationWarning className="truncate text-[10px] text-muted-foreground">
            {currentTrack?.artist}
          </span>
        </span>
      </button>
    </div>
  );
}
