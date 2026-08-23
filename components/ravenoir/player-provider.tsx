"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  StoredTrack,
  dbAllPlaylists,
  dbAllTracks,
  dbDeletePlaylist,
  dbDeleteTrack,
  dbPutPlaylist,
  dbPutTrack,
  dbPutArtwork,
  dbPutRecent,
  dbGetRecent,
  parseName,
  probeDuration,
  uid,
} from "@/lib/ravenoir/db";
import { parseID3 } from "@/lib/ravenoir/id3";

export type View = "home" | "library" | "search" | "playlists" | "playlist" | "albums" | "artists" | "album" | "artist" | "queue" | "settings";
export type RepeatMode = "off" | "all" | "one";
export type SortKey = "addedAt" | "title" | "artist" | "album" | "duration";

interface PlaylistMeta {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
  updatedAt?: number;
}

interface AlbumGroup {
  name: string;
  tracks: StoredTrack[];
}

interface ArtistGroup {
  name: string;
  tracks: StoredTrack[];
}

interface PlayerCtx {
  tracks: StoredTrack[];
  playlists: PlaylistMeta[];
  view: View;
  activePlaylist: PlaylistMeta | null;
  activeAlbum: string;
  activeArtist: string;
  query: string;
  currentId: string | null;
  playing: boolean;
  progress: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  fullOpen: boolean;
  importing: boolean;
  queue: string[];
  muted: boolean;
  analyser: AnalyserNode | null;
  recentIds: string[];
  sortKey: SortKey;
  sortAsc: boolean;
  albums: AlbumGroup[];
  artists: ArtistGroup[];
  setView: (v: View) => void;
  openPlaylist: (p: PlaylistMeta | null) => void;
  openAlbum: (name: string) => void;
  openArtist: (name: string) => void;
  setQuery: (q: string) => void;
  importFiles: (files: FileList | File[]) => Promise<void>;
  playTrack: (id: string, queue?: string[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (frac: number) => void;
  setVolume: (v: number) => void;
  cycleShuffle: () => void;
  cycleRepeat: () => void;
  setFullOpen: (b: boolean) => void;
  toggleFavorite: (id: string) => Promise<void>;
  toggleMute: () => void;
  removeTrack: (id: string) => Promise<void>;
  createPlaylist: (name: string) => Promise<void>;
  renamePlaylist: (id: string, name: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addToPlaylist: (pid: string, tid: string) => Promise<void>;
  removeFromPlaylist: (pid: string, tid: string) => Promise<void>;
  moveInPlaylist: (pid: string, fromIdx: number, toIdx: number) => Promise<void>;
  playNext: (id: string) => void;
  addToQueue: (id: string) => void;
  removeFromQueue: (idx: number) => void;
  clearQueue: () => void;
  setSortKey: (k: SortKey) => void;
  toggleSortDir: () => void;
}

const Ctx = createContext<PlayerCtx | null>(null);

export function useRavenoir(): PlayerCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRavenoir outside provider");
  return v;
}

export function RavenoirProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<StoredTrack[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistMeta[]>([]);
  const [view, setViewState] = useState<View>("home");
  const [activePlaylist, setActivePlaylist] = useState<PlaylistMeta | null>(null);
  const [activeAlbum, setActiveAlbum] = useState("");
  const [activeArtist, setActiveArtist] = useState("");
  const [query, setQuery] = useState("");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.9);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [fullOpen, setFullOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("addedAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stateRef = useRef({ queue, currentId, shuffle, repeat, tracks });
  stateRef.current = { queue, currentId, shuffle, repeat, tracks };

  useEffect(() => {
    dbAllTracks().then((t) => setTracks(t.sort((a, b) => b.addedAt - a.addedAt))).catch(() => {});
    dbAllPlaylists().then((p) => setPlaylists(p.sort((a, b) => b.createdAt - a.createdAt))).catch(() => {});
    dbGetRecent().then((recs) => {
      setRecentIds(recs.sort((a, b) => b.at - a.at).slice(0, 100).map((r) => r.id));
    }).catch(() => {});
    try {
      const s = JSON.parse(localStorage.getItem("ravenoir-settings") || "{}");
      if (typeof s.volume === "number") setVolumeState(s.volume);
      if (typeof s.shuffle === "boolean") setShuffle(s.shuffle);
      if (s.repeat) setRepeat(s.repeat);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "ravenoir-settings",
        JSON.stringify({ volume, shuffle, repeat })
      );
    } catch {}
  }, [volume, shuffle, repeat]);

  if (!audioRef.current && typeof window !== "undefined") {
    audioRef.current = new Audio();
  }

  const ensureGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioCtxRef.current) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const src = ctx.createMediaElementSource(audio);
      const an = ctx.createAnalyser();
      an.fftSize = 64;
      an.smoothingTimeConstant = 0.82;
      src.connect(an);
      an.connect(ctx.destination);
      audioCtxRef.current = ctx;
      setAnalyser(an);
    } catch {}
  }, []);

  const trackRecent = useCallback((id: string) => {
    const rec = { id, at: Date.now() };
    dbPutRecent(rec).catch(() => {});
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 100));
  }, []);

  const loadAndPlay = useCallback(
    (id: string) => {
      const audio = audioRef.current;
      const rec = stateRef.current.tracks.find((t) => t.id === id);
      if (!audio || !rec) return;
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(rec.blob);
      audio.src = urlRef.current;
      setCurrentId(id);
      setDuration(rec.duration || 0);
      setProgress(0);
      ensureGraph();
      audioCtxRef.current?.resume().catch(() => {});
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      trackRecent(id);

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: rec.title,
          artist: rec.artist,
          album: rec.album || "RAVENOIR",
          artwork: [
            { src: "/ravenoir/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/ravenoir/icon-512.png", sizes: "512x512", type: "image/png" },
          ],
        });
      }
    },
    [ensureGraph, trackRecent]
  );

  const pickNextId = useCallback((): string | null => {
    const { queue: q, currentId: cur, shuffle: sh, tracks: trs } = stateRef.current;
    const pool = q.length ? q : trs.map((t) => t.id);
    if (!pool.length) return null;
    if (sh && pool.length > 1) {
      let r = cur;
      while (r === cur) r = pool[Math.floor(Math.random() * pool.length)];
      return r;
    }
    const i = cur ? pool.indexOf(cur) : -1;
    return i >= 0 ? pool[(i + 1) % pool.length] : pool[0];
  }, []);

  const pickPrevId = useCallback((): string | null => {
    const { queue: q, currentId: cur, tracks: trs } = stateRef.current;
    const pool = q.length ? q : trs.map((t) => t.id);
    if (!pool.length) return null;
    const i = cur ? pool.indexOf(cur) : -1;
    return i > 0 ? pool[i - 1] : pool[pool.length - 1];
  }, []);

  const next = useCallback(() => {
    const id = pickNextId();
    if (id) loadAndPlay(id);
  }, [pickNextId, loadAndPlay]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const id = pickPrevId();
    if (id) loadAndPlay(id);
  }, [pickPrevId, loadAndPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      const { repeat: rp } = stateRef.current;
      if (rp === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        next();
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [next]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    try {
      ms.setActionHandler("play", () => audioRef.current?.play());
      ms.setActionHandler("pause", () => audioRef.current?.pause());
      ms.setActionHandler("previoustrack", () => prev());
      ms.setActionHandler("nexttrack", () => next());
    } catch {}
  }, [next, prev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      const audio = audioRef.current;
      if (!audio) return;

      if (e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
      } else if (e.key === "n" || e.key === "N") {
        next();
      } else if (e.key === "p" || e.key === "P") {
        prev();
      } else if (e.key === "m" || e.key === "M") {
        setMuted((m) => !m);
      } else if (e.key === "s" || e.key === "S") {
        setShuffle((s) => !s);
      } else if (e.key === "r" || e.key === "R") {
        setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
      } else if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setViewState("search");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle, next, prev, setShuffle, setRepeat]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = playing ? "playing" : "paused";
    }
  }, [playing]);

  const importFiles = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files).filter(
      (f) => f.type.startsWith("audio/") || /\.(mp3|m4a|aac|ogg|opus|wav|flac|weba)$/i.test(f.name)
    );
    if (!list.length) return;
    setImporting(true);

    const existingTracks = await dbAllTracks().catch(() => [] as StoredTrack[]);

    for (const f of list) {
      const fileMeta = parseName(f.name);
      const id3Meta = await parseID3(f).catch(() => ({}));
      const title = id3Meta.title || fileMeta.title;
      const artist = id3Meta.artist || fileMeta.artist;
      const album = id3Meta.album || "LOCAL FILES";

      const isDuplicate = existingTracks.some(
        (et) => et.title === title && et.artist === artist && et.album === album && et.duration > 0
      );
      if (isDuplicate) continue;

      const dur = await probeDuration(f.slice(0));

      const rec: StoredTrack = {
        id: uid(),
        title,
        artist,
        album,
        duration: dur || 0,
        addedAt: Date.now(),
        mime: f.type || "audio/mpeg",
        blob: f.slice(0),
      };
      await dbPutTrack(rec);
      existingTracks.push(rec);

      if (id3Meta.artworkBlob) {
        await dbPutArtwork({ id: rec.id, blob: id3Meta.artworkBlob, mime: id3Meta.artworkMime || "image/jpeg" }).catch(() => {});
      }
    }
    const all = await dbAllTracks();
    setTracks(all.sort((a, b) => b.addedAt - a.addedAt));
    setImporting(false);
  }, []);

  const playTrack = useCallback(
    (id: string, q?: string[]) => {
      if (q && q.length) setQueue(q);
      stateRef.current.queue = q && q.length ? q : stateRef.current.queue;
      loadAndPlay(id);
    },
    [loadAndPlay]
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !stateRef.current.currentId) {
      const first = stateRef.current.tracks[0];
      if (first) playTrack(first.id);
      return;
    }
    if (audio.paused) {
      audioCtxRef.current?.resume().catch(() => {});
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [playTrack]);

  const seek = useCallback((frac: number) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0)
      audio.currentTime = Math.max(0, Math.min(1, frac)) * audio.duration;
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    setTracks((prev) => {
      const updated = prev.map((t) => {
        if (t.id !== id) return t;
        const isFav = t.favorite ? true : false;
        const newFav = isFav ? undefined : Date.now();
        const rec = { ...t, favorite: newFav };
        dbPutTrack(rec).catch(() => {});
        return rec;
      });
      return updated;
    });
  }, []);

  const removeTrack = useCallback(
    async (id: string) => {
      await dbDeleteTrack(id);
      const all = await dbAllTracks();
      setTracks(all.sort((a, b) => b.addedAt - a.addedAt));
      const pls = await dbAllPlaylists();
      for (const p of pls) {
        if (p.trackIds.includes(id)) {
          p.trackIds = p.trackIds.filter((x) => x !== id);
          await dbPutPlaylist(p);
        }
      }
      setPlaylists(pls.sort((a, b) => b.createdAt - a.createdAt));
      if (stateRef.current.currentId === id) {
        audioRef.current?.pause();
        setPlaying(false);
        setCurrentId(null);
        setProgress(0);
      }
    },
    []
  );

  const createPlaylist = useCallback(async (name: string) => {
    const p: PlaylistMeta = { id: uid(), name: name.trim() || "UNTITLED", trackIds: [], createdAt: Date.now() };
    await dbPutPlaylist(p);
    const all = await dbAllPlaylists();
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const renamePlaylist = useCallback(async (id: string, name: string) => {
    const all = await dbAllPlaylists();
    const p = all.find((x) => x.id === id);
    if (!p) return;
    p.name = name.trim() || p.name;
    p.updatedAt = Date.now();
    await dbPutPlaylist(p);
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
    setActivePlaylist((ap) => (ap && ap.id === id ? { ...p } : ap));
  }, []);

  const deletePlaylist = useCallback(async (id: string) => {
    await dbDeletePlaylist(id);
    const all = await dbAllPlaylists();
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
    setActivePlaylist((ap) => (ap && ap.id === id ? null : ap));
  }, []);

  const addToPlaylist = useCallback(async (pid: string, tid: string) => {
    const all = await dbAllPlaylists();
    const p = all.find((x) => x.id === pid);
    if (!p || p.trackIds.includes(tid)) return;
    p.trackIds.push(tid);
    p.updatedAt = Date.now();
    await dbPutPlaylist(p);
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
    setActivePlaylist((ap) => (ap && ap.id === pid ? { ...p } : ap));
  }, []);

  const removeFromPlaylist = useCallback(async (pid: string, tid: string) => {
    const all = await dbAllPlaylists();
    const p = all.find((x) => x.id === pid);
    if (!p) return;
    p.trackIds = p.trackIds.filter((x) => x !== tid);
    p.updatedAt = Date.now();
    await dbPutPlaylist(p);
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
    setActivePlaylist((ap) => (ap && ap.id === pid ? { ...p } : ap));
  }, []);

  const moveInPlaylist = useCallback(async (pid: string, fromIdx: number, toIdx: number) => {
    const all = await dbAllPlaylists();
    const p = all.find((x) => x.id === pid);
    if (!p || fromIdx < 0 || toIdx < 0 || fromIdx >= p.trackIds.length || toIdx >= p.trackIds.length) return;
    const item = p.trackIds.splice(fromIdx, 1)[0];
    p.trackIds.splice(toIdx, 0, item);
    p.updatedAt = Date.now();
    await dbPutPlaylist(p);
    setPlaylists(all.sort((a, b) => b.createdAt - a.createdAt));
    setActivePlaylist((ap) => (ap && ap.id === pid ? { ...p } : ap));
  }, []);

  const playNext = useCallback((id: string) => {
    const { currentId: cur, queue: q } = stateRef.current;
    const newQ = cur ? [cur, id, ...q.filter((x) => x !== id)] : [id, ...q.filter((x) => x !== id)];
    setQueue(newQ);
    stateRef.current.queue = newQ;
  }, []);

  const addToQueue = useCallback((id: string) => {
    setQueue((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      stateRef.current.queue = next;
      return next;
    });
  }, []);

  const removeFromQueue = useCallback((idx: number) => {
    setQueue((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      stateRef.current.queue = next;
      return next;
    });
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    stateRef.current.queue = [];
  }, []);

  const toggleSortDir = useCallback(() => setSortAsc((a) => !a), []);

  const openPlaylist = useCallback((p: PlaylistMeta | null) => {
    setActivePlaylist(p);
    setViewState(p ? "playlist" : "playlists");
  }, []);

  const openAlbum = useCallback((name: string) => {
    setActiveAlbum(name);
    setViewState("album");
  }, []);

  const openArtist = useCallback((name: string) => {
    setActiveArtist(name);
    setViewState("artist");
  }, []);

  const setView = useCallback((v: View) => {
    setViewState(v);
    if (v !== "playlist") setActivePlaylist(null);
    if (v !== "album") setActiveAlbum("");
    if (v !== "artist") setActiveArtist("");
  }, []);

  const albums = useMemo<AlbumGroup[]>(() => {
    const map = new Map<string, StoredTrack[]>();
    tracks.forEach((t) => {
      const key = t.album || "UNKNOWN ALBUM";
      const arr = map.get(key) || [];
      arr.push(t);
      map.set(key, arr);
    });
    return [...map.entries()]
      .map(([name, t]) => ({ name, tracks: t }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tracks]);

  const artists = useMemo<ArtistGroup[]>(() => {
    const map = new Map<string, StoredTrack[]>();
    tracks.forEach((t) => {
      const key = t.artist || "UNKNOWN ARTIST";
      const arr = map.get(key) || [];
      arr.push(t);
      map.set(key, arr);
    });
    return [...map.entries()]
      .map(([name, t]) => ({ name, tracks: t }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tracks]);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const value = useMemo<PlayerCtx>(
    () => ({
      tracks, playlists, view, activePlaylist, activeAlbum, activeArtist, query, currentId,
      playing, progress, duration, volume, shuffle, repeat, fullOpen, importing, queue, muted,
      analyser, recentIds, sortKey, sortAsc, albums, artists,
      setView, openPlaylist, openAlbum, openArtist, setQuery, importFiles, playTrack,
      toggle, next, prev, seek, setVolume: setVolumeState,
      cycleShuffle: () => setShuffle((s) => !s),
      cycleRepeat: () => setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off")),
      setFullOpen, toggleFavorite, toggleMute, removeTrack, createPlaylist, renamePlaylist,
      deletePlaylist, addToPlaylist, removeFromPlaylist, moveInPlaylist,
      playNext, addToQueue, removeFromQueue, clearQueue,
      setSortKey, toggleSortDir,
    }),
    [
      tracks, playlists, view, activePlaylist, activeAlbum, activeArtist, query, currentId,
      playing, progress, duration, volume, shuffle, repeat, fullOpen, importing, queue, muted,
      analyser, recentIds, sortKey, sortAsc, albums, artists,
      setView, openPlaylist, openAlbum, openArtist, importFiles, playTrack,
      toggle, next, prev, seek, toggleFavorite, toggleMute, removeTrack, createPlaylist, renamePlaylist,
      deletePlaylist, addToPlaylist, removeFromPlaylist, moveInPlaylist,
      playNext, addToQueue, removeFromQueue, clearQueue, setSortKey, toggleSortDir,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
