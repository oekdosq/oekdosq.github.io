"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { tracks, DEFAULT_TRACK_INDEX, type Track } from "@/lib/music";

type MusicState = {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  available: boolean[];
  currentTrack: Track | null;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  prev: () => void;
  playTrack: (index: number) => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicState | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_TRACK_INDEX;
    const stored = window.localStorage.getItem("music-track");
    const idx = stored !== null ? Number(stored) : DEFAULT_TRACK_INDEX;
    return Number.isInteger(idx) && idx >= 0 && idx < tracks.length
      ? idx
      : DEFAULT_TRACK_INDEX;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [available, setAvailable] = useState<boolean[]>(tracks.map(() => true));

  useEffect(() => {
    tracks.forEach(async (track, i) => {
      if (!track.file) {
        setAvailable((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
        return;
      }
      try {
        const res = await fetch(track.file, { method: "HEAD" });
        if (!res.ok) throw new Error("missing");
        setAvailable((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      } catch {
        setAvailable((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }
    });
  }, []);

  const currentTrack = tracks[currentIndex] ?? null;

  const handleEnded = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % tracks.length);
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, pause, play]);

  const playTrack = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setCurrentTime(0);
      window.localStorage.setItem("music-track", String(index));
      window.setTimeout(() => void play(), 50);
    },
    [play],
  );

  const next = useCallback(() => {
    playTrack((currentIndex + 1) % tracks.length);
  }, [currentIndex, playTrack]);

  const prev = useCallback(() => {
    playTrack((currentIndex - 1 + tracks.length) % tracks.length);
  }, [currentIndex, playTrack]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        available,
        currentTrack,
        toggle,
        play,
        pause,
        next,
        prev,
        playTrack,
        seek,
        setVolume: changeVolume,
      }}
    >
      {currentTrack?.file && (
        <audio
          ref={audioRef}
          suppressHydrationWarning
          src={currentTrack.file}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={handleEnded}
        />
      )}
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
