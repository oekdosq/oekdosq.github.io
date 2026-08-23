"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StoredTrack, fmt,
  dbClearRecent, dbClearArtwork, dbDeleteAllTracks, dbDeleteAllPlaylists,
} from "@/lib/ravenoir/db";
import { useRavenoir, type View, type SortKey } from "./player-provider";
import { EqBars, LetterTile, TrackRow } from "./ui-bits";
import {
  IcArrowUpDown, IcCheck, IcChevronLeft, IcDisc, IcEdit, IcHeart, IcImport,
  IcListMusic, IcPlus, IcSearch, IcTrash, IcUser, IcX,
} from "./icons";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "LATE NIGHT SESSIONS";
  if (h < 12) return "GOOD MORNING";
  if (h < 18) return "GOOD AFTERNOON";
  return "GOOD EVENING";
}

function sortedTracks(tracks: StoredTrack[], key: SortKey, asc: boolean): StoredTrack[] {
  const sorted = [...tracks].sort((a, b) => {
    if (key === "addedAt") return b.addedAt - a.addedAt;
    if (key === "duration") return a.duration - b.duration;
    return (a[key] || "").localeCompare(b[key] || "");
  });
  return asc ? sorted.reverse() : sorted;
}

/* ---------------- HOME ---------------- */
export function HomeView({ onImport }: { onImport: () => void }) {
  const { tracks, importing, playTrack, recentIds, albums, artists } = useRavenoir();
  const quick = tracks.slice(0, 6);
  const totalMin = Math.round(tracks.reduce((a, t) => a + t.duration, 0) / 60);

  const recentTracks = useMemo(() => {
    if (!recentIds.length) return [];
    const map = new Map(tracks.map((t) => [t.id, t]));
    return recentIds.map((id) => map.get(id)).filter(Boolean) as StoredTrack[];
  }, [recentIds, tracks]);

  return (
    <div className="pt-7">
      <motion.div {...fadeUp} transition={{ duration: 0.35 }} className="flex items-center justify-between px-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-[#555]">RAVENOIR</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-[#F5F5F5]">{greeting()}</h1>
        </div>
        <button
          onClick={onImport}
          disabled={importing}
          aria-label="Import audio"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#272727] bg-[#181818] text-[#F5F5F5] active:scale-90 transition-transform disabled:opacity-40"
        >
          <IcImport size={16} />
        </button>
      </motion.div>

      {quick.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mt-5 grid grid-cols-2 gap-2 px-5"
        >
          {quick.map((t) => (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => playTrack(t.id, quick.map((x) => x.id))}
              className="flex h-14 items-center overflow-hidden rounded-md bg-[#181818] text-left ring-1 ring-white/[0.04] active:bg-[#222]"
            >
              <LetterTile text={t.title} size={56} rounded="rounded-none" />
              <span className="min-w-0 flex-1 truncate px-2.5 text-[11px] font-semibold text-[#F5F5F5]">
                {t.title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      <motion.p
        {...fadeUp}
        transition={{ delay: 0.12 }}
        className="mt-5 px-5 font-mono text-[10px] tracking-[0.3em] text-[#444]"
      >
        {tracks.length} TRACKS · {totalMin} MIN · OFFLINE
      </motion.p>

      {recentTracks.length > 0 && (
        <section className="mt-6">
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.15 }}
            className="px-5 text-[17px] font-bold tracking-tight text-[#F5F5F5]"
          >
            Recently played
          </motion.h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
            {recentTracks.slice(0, 12).map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.35 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => playTrack(t.id, recentTracks.map((x) => x.id))}
                className="w-[128px] shrink-0 text-left"
              >
                <LetterTile text={t.title} size={128} rounded="rounded-md" />
                <span className="mt-2 block truncate text-[12px] font-medium text-[#F5F5F5]">{t.title}</span>
                <span className="block truncate text-[10px] text-[#888]">{t.artist}</span>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section className="mt-6">
          <motion.h2 {...fadeUp} transition={{ delay: 0.2 }} className="px-5 text-[17px] font-bold tracking-tight text-[#F5F5F5]">
            Albums
          </motion.h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
            {albums.slice(0, 10).map((a, i) => (
              <AlbumCard key={a.name} album={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section className="mt-6">
          <motion.h2 {...fadeUp} transition={{ delay: 0.25 }} className="px-5 text-[17px] font-bold tracking-tight text-[#F5F5F5]">
            Artists
          </motion.h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
            {artists.slice(0, 10).map((a, i) => (
              <ArtistCard key={a.name} artist={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {tracks.length === 0 && (
        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="mx-5 mt-8 rounded-lg border border-dashed border-[#272727] px-6 py-10 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#555]">LIBRARY EMPTY</p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#888]">
            Import audio files from your device.
            <br />
            Everything stays offline.
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ---------------- LIBRARY ---------------- */
export function LibraryView({ onImport }: { onImport: () => void }) {
  const { tracks, playlists, removeTrack, openPlaylist, deletePlaylist, playTrack, sortKey, setSortKey, sortAsc, toggleSortDir } = useRavenoir();
  const [filter, setFilter] = useState<"all" | "tracks" | "playlists" | "liked">("all");

  const likedTracks = useMemo(() => tracks.filter((t) => t.favorite), [tracks]);
  const sorted = useMemo(() => sortedTracks(tracks, sortKey, sortAsc), [tracks, sortKey, sortAsc]);
  const sortedLiked = useMemo(() => sortedTracks(likedTracks, sortKey, sortAsc), [likedTracks, sortKey, sortAsc]);

  const chips = [
    { id: "all", label: "All" },
    { id: "liked", label: "Liked" },
    { id: "playlists", label: "Playlists" },
    { id: "tracks", label: "Tracks" },
  ] as const;

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "addedAt", label: "Date added" },
    { key: "title", label: "Title" },
    { key: "artist", label: "Artist" },
    { key: "album", label: "Album" },
    { key: "duration", label: "Duration" },
  ];

  return (
    <div className="pb-8 pt-7">
      <motion.div {...fadeUp} transition={{ duration: 0.35 }} className="flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#181818] font-mono text-sm ring-1 ring-[#272727]">R</span>
          <h1 className="text-xl font-bold tracking-tight text-[#F5F5F5]">Your Library</h1>
        </div>
        <button onClick={onImport} aria-label="Add files" className="p-1.5 text-[#888] hover:text-[#F5F5F5] active:scale-90 transition">
          <IcPlus size={20} />
        </button>
      </motion.div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5">
        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              filter === c.id ? "bg-[#F5F5F5] text-black" : "bg-[#181818] text-[#ccc] ring-1 ring-white/5"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filter !== "playlists" && (
        <div className="flex items-center gap-2 px-5 mt-3">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto flex-1">
            {sortOptions.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  if (sortKey === o.key) toggleSortDir();
                  else setSortKey(o.key);
                }}
                className={`shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  sortKey === o.key ? "bg-[#222] text-[#F5F5F5]" : "text-[#555]"
                }`}
              >
                {sortKey === o.key && <IcCheck size={10} />}
                {o.label}
                {sortKey === o.key && (
                  <IcArrowUpDown size={10} className={sortAsc ? "" : "rotate-180"} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <motion.div layout className="mt-4 border-y border-[#161616]">
        {(filter === "all" || filter === "playlists") &&
          playlists.map((p) => (
            <motion.div
              key={p.id}
              layout
              role="button"
              tabIndex={0}
              onClick={() => openPlaylist(p)}
              whileTap={{ scale: 0.985 }}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none active:bg-[#141414]"
            >
              <span className="grid shrink-0 place-items-center rounded-sm border border-[#272727] bg-gradient-to-b from-transparent to-transparent" style={{ width: 48, height: 48 }}>
                <IcListMusic size={18} className="text-[#888]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#F5F5F5]">{p.name.toUpperCase()}</p>
                <p className="truncate text-[11px] text-[#888] mt-0.5">Playlist · {p.trackIds.length} songs</p>
              </div>
              <button
                aria-label={`Delete ${p.name}`}
                onClick={(e) => { e.stopPropagation(); deletePlaylist(p.id); }}
                className="shrink-0 p-1 text-[#555] hover:text-[#F5F5F5]"
              >
                <IcTrash size={15} />
              </button>
            </motion.div>
          ))}

        {(filter === "all" || filter === "tracks") &&
          sorted.map((t, i) => (
            <TrackRow
              key={t.id}
              track={t}
              index={i}
              thumb
              queue={sorted.map((x) => x.id)}
              onRemove={() => removeTrack(t.id)}
            />
          ))}

        {filter === "liked" && (
          sortedLiked.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <IcHeart size={28} className="mx-auto text-[#333]" />
              <p className="mt-3 font-mono text-[11px] tracking-widest text-[#555]">NO FAVORITES YET</p>
              <p className="mt-1 text-[11px] text-[#666]">Tap the heart icon on any track to like it.</p>
            </div>
          ) : (
            sortedLiked.map((t, i) => (
              <TrackRow
                key={t.id}
                track={t}
                index={i}
                thumb
                queue={sortedLiked.map((x) => x.id)}
              />
            ))
          )
        )}
      </motion.div>

      {tracks.length === 0 && playlists.length === 0 && (
        <motion.p {...fadeUp} className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">
          IMPORT AUDIO TO START
        </motion.p>
      )}
    </div>
  );
}

/* ---------------- SEARCH ---------------- */
export function SearchView() {
  const { query, setQuery, tracks, albums, artists, openAlbum, openArtist } = useRavenoir();
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tracks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q)
    );
  }, [query, tracks]);

  const matchedAlbums = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return albums.filter((a) => a.name.toLowerCase().includes(q));
  }, [query, albums]);

  const matchedArtists = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return artists.filter((a) => a.name.toLowerCase().includes(q));
  }, [query, artists]);

  const topArtists = useMemo(() => {
    const set = new Map<string, number>();
    tracks.forEach((t) => set.set(t.artist, (set.get(t.artist) ?? 0) + 1));
    return [...set.keys()].slice(0, 10);
  }, [tracks]);

  return (
    <div className="pt-7">
      <motion.h1 {...fadeUp} className="px-5 text-xl font-bold tracking-tight text-[#F5F5F5]">
        Search
      </motion.h1>

      <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="mx-5 mt-4 flex items-center gap-3 rounded-md bg-[#181818] px-3.5 focus-within:ring-1 focus-within:ring-[#555] transition-shadow">
        <IcSearch size={16} className="shrink-0 text-[#888]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, artist, or album…"
          aria-label="Search tracks"
          className="w-full bg-transparent py-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#555]"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search" className="text-[#888] hover:text-[#F5F5F5]">
            <IcX size={15} />
          </button>
        )}
      </motion.div>

      {!query && topArtists.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 px-5">
          {topArtists.map((a, i) => (
            <motion.button
              key={a + i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setQuery(a)}
              className="rounded-full border border-[#272727] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[#888] hover:text-[#F5F5F5] hover:border-[#555]"
            >
              {a.toUpperCase()}
            </motion.button>
          ))}
        </div>
      )}

      {query && (
        <div className="mt-5 border-y border-[#161616]">
          {results.length === 0 && matchedAlbums.length === 0 && matchedArtists.length === 0 && (
            <p className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">NO RESULTS</p>
          )}

          {matchedArtists.length > 0 && (
            <>
              <p className="px-5 pt-3 pb-1 font-mono text-[9px] tracking-[0.3em] text-[#555]">ARTISTS</p>
              {matchedArtists.slice(0, 3).map((a) => (
                <motion.div
                  key={a.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => openArtist(a.name)}
                  whileTap={{ scale: 0.985 }}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer active:bg-[#141414]"
                >
                  <span className="grid shrink-0 place-items-center rounded-full bg-[#181818] border border-[#272727]" style={{ width: 44, height: 44 }}>
                    <IcUser size={18} className="text-[#555]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[#F5F5F5]">{a.name}</p>
                    <p className="truncate text-[11px] text-[#888]">{a.tracks.length} tracks</p>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {matchedAlbums.length > 0 && (
            <>
              <p className="px-5 pt-3 pb-1 font-mono text-[9px] tracking-[0.3em] text-[#555]">ALBUMS</p>
              {matchedAlbums.slice(0, 3).map((a) => (
                <motion.div
                  key={a.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => openAlbum(a.name)}
                  whileTap={{ scale: 0.985 }}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer active:bg-[#141414]"
                >
                  <span className="grid shrink-0 place-items-center bg-[#181818] border border-[#272727] rounded-sm" style={{ width: 44, height: 44 }}>
                    <IcDisc size={18} className="text-[#555]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[#F5F5F5]">{a.name}</p>
                    <p className="truncate text-[11px] text-[#888]">{a.tracks.length} songs</p>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {results.length > 0 && (
            <>
              <p className="px-5 pt-3 pb-1 font-mono text-[9px] tracking-[0.3em] text-[#555]">SONGS</p>
              {results.map((t, i) => (
                <TrackRow key={t.id} track={t} index={i} thumb queue={results.map((x) => x.id)} showAlbum />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- ALBUMS ---------------- */
export function AlbumsView() {
  const { albums, openAlbum } = useRavenoir();
  return (
    <div className="pt-7">
      <motion.h1 {...fadeUp} className="px-5 text-xl font-bold tracking-tight text-[#F5F5F5]">Albums</motion.h1>
      {albums.length === 0 ? (
        <p className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">NO ALBUMS YET</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 px-5">
          {albums.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="text-left"
            >
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => openAlbum(a.name)}
                onKeyDown={(e) => e.key === "Enter" && openAlbum(a.name)}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer select-none"
              >
                <div className="grid aspect-square w-full place-items-center rounded-md border border-[#272727] bg-[#111111]">
                  <IcDisc size={28} className="text-[#555]" />
                </div>
              </motion.div>
              <span className="mt-2 block truncate text-[12px] font-semibold text-[#F5F5F5]">{a.name}</span>
              <span className="block text-[10px] text-[#888]">{a.tracks.length} songs</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- ARTISTS ---------------- */
export function ArtistsView() {
  const { artists, openArtist } = useRavenoir();
  return (
    <div className="pt-7">
      <motion.h1 {...fadeUp} className="px-5 text-xl font-bold tracking-tight text-[#F5F5F5]">Artists</motion.h1>
      {artists.length === 0 ? (
        <p className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">NO ARTISTS YET</p>
      ) : (
        <div className="mt-4 border-y border-[#161616]">
          {artists.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              role="button"
              tabIndex={0}
              onClick={() => openArtist(a.name)}
              whileTap={{ scale: 0.985 }}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-[#141414]"
            >
              <span className="grid shrink-0 place-items-center rounded-full bg-[#181818] border border-[#272727]" style={{ width: 48, height: 48 }}>
                <IcUser size={20} className="text-[#555]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-[#F5F5F5]">{a.name}</p>
                <p className="truncate text-[11px] text-[#888]">{a.tracks.length} tracks</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- ALBUM DETAIL ---------------- */
export function AlbumDetailView() {
  const { activeAlbum, tracks, playTrack, openAlbum } = useRavenoir();
  const albumTracks = useMemo(
    () => tracks.filter((t) => t.album === activeAlbum).sort((a, b) => a.duration - b.duration),
    [tracks, activeAlbum]
  );
  if (!activeAlbum) return null;
  return (
    <div className="pb-8">
      <div className="flex items-center px-4 pt-4">
        <button onClick={() => openAlbum(null as unknown as string)} aria-label="Back" className="p-1.5 text-[#888] hover:text-[#F5F5F5]">
          <IcChevronLeft size={20} />
        </button>
      </div>
      <motion.header {...fadeUp} transition={{ duration: 0.35 }} className="flex items-end gap-4 px-5 pt-2">
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-md border border-[#272727] bg-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <IcDisc size={30} className="text-[#555]" />
        </div>
        <div className="min-w-0 pb-1">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#555]">ALBUM</p>
          <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-[#F5F5F5]">{activeAlbum}</h1>
          <p className="mt-1 text-[11px] text-[#888]">{albumTracks.length} songs</p>
        </div>
      </motion.header>
      <div className="mt-4 px-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={albumTracks.length === 0}
          onClick={() => albumTracks[0] && playTrack(albumTracks[0].id, albumTracks.map((x) => x.id))}
          className="w-full rounded-full border border-[#F5F5F5]/80 py-2.5 font-mono text-[10px] tracking-[0.35em] text-[#F5F5F5] disabled:opacity-30"
        >
          PLAY
        </motion.button>
      </div>
      <div className="mt-4 border-t border-[#161616]">
        {albumTracks.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} thumb queue={albumTracks.map((x) => x.id)} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- ARTIST DETAIL ---------------- */
export function ArtistDetailView() {
  const { activeArtist, tracks, playTrack, openArtist } = useRavenoir();
  const artistTracks = useMemo(
    () => tracks.filter((t) => t.artist === activeArtist),
    [tracks, activeArtist]
  );
  const artistAlbums = useMemo(() => {
    const set = new Set(artistTracks.map((t) => t.album));
    return [...set].filter((a) => a !== "LOCAL FILES");
  }, [artistTracks]);
  if (!activeArtist) return null;
  return (
    <div className="pb-8">
      <div className="flex items-center px-4 pt-4">
        <button onClick={() => openArtist("")} aria-label="Back" className="p-1.5 text-[#888] hover:text-[#F5F5F5]">
          <IcChevronLeft size={20} />
        </button>
      </div>
      <motion.header {...fadeUp} transition={{ duration: 0.35 }} className="flex items-end gap-4 px-5 pt-2">
        <span className="grid h-28 w-28 shrink-0 place-items-center rounded-full border border-[#272727] bg-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <IcUser size={34} className="text-[#555]" />
        </span>
        <div className="min-w-0 pb-1">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#555]">ARTIST</p>
          <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-[#F5F5F5]">{activeArtist}</h1>
          <p className="mt-1 text-[11px] text-[#888]">{artistTracks.length} tracks{artistAlbums.length > 0 ? ` · ${artistAlbums.length} albums` : ""}</p>
        </div>
      </motion.header>
      <div className="mt-4 px-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={artistTracks.length === 0}
          onClick={() => artistTracks[0] && playTrack(artistTracks[0].id, artistTracks.map((x) => x.id))}
          className="w-full rounded-full border border-[#F5F5F5]/80 py-2.5 font-mono text-[10px] tracking-[0.35em] text-[#F5F5F5] disabled:opacity-30"
        >
          PLAY
        </motion.button>
      </div>
      <div className="mt-4 border-t border-[#161616]">
        {artistTracks.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} thumb queue={artistTracks.map((x) => x.id)} showAlbum />
        ))}
      </div>
    </div>
  );
}

/* ---------------- QUEUE ---------------- */
export function QueueView() {
  const { queue, tracks, currentId, removeFromQueue, clearQueue, playTrack } = useRavenoir();
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const queueTracks = useMemo(() => {
    return queue.map((id) => tracks.find((t) => t.id === id)).filter(Boolean) as StoredTrack[];
  }, [queue, tracks]);

  const currentIdx = currentId ? queue.indexOf(currentId) : -1;

  return (
    <div className="pt-7">
      <div className="flex items-center justify-between px-5">
        <motion.h1 {...fadeUp} className="text-xl font-bold tracking-tight text-[#F5F5F5]">Queue</motion.h1>
        {queue.length > 0 && (
          <motion.button
            {...fadeUp}
            onClick={clearQueue}
            className="font-mono text-[10px] tracking-[0.2em] text-[#555] hover:text-[#F5F5F5] transition-colors"
          >
            CLEAR
          </motion.button>
        )}
      </div>

      {queueTracks.length === 0 ? (
        <p className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">QUEUE EMPTY</p>
      ) : (
        <div className="mt-4 border-y border-[#161616]">
          {queueTracks.map((t, i) => (
            <motion.div
              key={`${t.id}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`group flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none active:bg-[#141414] ${
                i === currentIdx ? "bg-[#141414]" : ""
              }`}
            >
              <span className="w-6 shrink-0 text-center font-mono text-[11px] text-[#555]">
                {i === currentIdx && currentId ? <EqBars /> : String(i + 1).padStart(2, "0")}
              </span>
              <LetterTile text={t.title} size={40} rounded="rounded-md" />
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[13px] ${i === currentIdx ? "text-white font-semibold" : "text-[#F5F5F5]"}`}>
                  {t.title}
                </p>
                <p className="truncate text-[11px] text-[#888]">{t.artist}</p>
              </div>
              <button
                aria-label="Remove from queue"
                onClick={() => removeFromQueue(i)}
                className="shrink-0 p-1 text-[#444] hover:text-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IcX size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- PLAYLISTS ---------------- */
export function PlaylistsView() {
  const { playlists, createPlaylist, openPlaylist, playTrack } = useRavenoir();
  const [name, setName] = useState("");

  return (
    <div className="pt-7">
      <motion.h1 {...fadeUp} className="px-5 text-xl font-bold tracking-tight text-[#F5F5F5]">
        Playlists
      </motion.h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          createPlaylist(name);
          setName("");
        }}
        className="mx-5 mt-4 flex gap-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New playlist name…"
          aria-label="New playlist name"
          className="min-w-0 flex-1 rounded-md bg-[#181818] px-4 py-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#555] ring-1 ring-white/5 focus:ring-[#555] transition-shadow"
        />
        <button type="submit" aria-label="Create playlist" className="grid w-12 shrink-0 place-items-center rounded-md bg-[#F5F5F5] text-black active:scale-90 transition-transform">
          <IcPlus size={16} />
        </button>
      </form>

      {playlists.length === 0 ? (
        <motion.p {...fadeUp} className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">
          NO PLAYLISTS YET
        </motion.p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 px-5">
          {playlists.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="text-left"
            >
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => openPlaylist(p)}
                onKeyDown={(e) => e.key === "Enter" && openPlaylist(p)}
                whileTap={{ scale: 0.96 }}
                className="relative cursor-pointer select-none"
              >
                <div className="grid aspect-square w-full place-items-center rounded-md border border-[#272727] bg-[#111111]">
                  <IcListMusic size={26} className="text-[#555]" />
                </div>
                {p.trackIds.length > 0 && (
                  <button
                    aria-label={`Play ${p.name}`}
                    onClick={(e) => { e.stopPropagation(); playTrack(p.trackIds[0], p.trackIds); }}
                    className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-[#F5F5F5] text-black shadow-lg active:scale-90 transition-transform"
                  >
                    ▶
                  </button>
                )}
              </motion.div>
              <span className="mt-2 block truncate text-[12px] font-semibold text-[#F5F5F5]">{p.name.toUpperCase()}</span>
              <span className="block text-[10px] text-[#888]">{p.trackIds.length} songs</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- PLAYLIST DETAIL ---------------- */
export function PlaylistDetailView() {
  const {
    activePlaylist, tracks, removeFromPlaylist, playTrack, openPlaylist,
    deletePlaylist, renamePlaylist, moveInPlaylist,
  } = useRavenoir();
  const p = activePlaylist;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  if (!p) return null;
  const items = p.trackIds.map((id) => tracks.find((t) => t.id === id)).filter(Boolean) as typeof tracks;
  const total = items.reduce((a, t) => a + t.duration, 0);

  const startRename = () => {
    setEditName(p.name);
    setEditing(true);
  };

  const commitRename = () => {
    if (editName.trim() && editName.trim() !== p.name) {
      renamePlaylist(p.id, editName);
    }
    setEditing(false);
  };

  return (
    <div className="pb-8">
      <div className="relative flex items-center px-4 pt-4">
        <button onClick={() => openPlaylist(null)} aria-label="Back to playlists" className="p-1.5 text-[#888] hover:text-[#F5F5F5]">
          <IcChevronLeft size={20} />
        </button>
        <span className="flex-1" />
        <button onClick={startRename} aria-label="Rename playlist" className="p-1.5 text-[#555] hover:text-[#F5F5F5]">
          <IcEdit size={17} />
        </button>
        <button onClick={() => deletePlaylist(p.id)} aria-label="Delete playlist" className="p-1.5 text-[#555] hover:text-[#F5F5F5]">
          <IcTrash size={17} />
        </button>
      </div>

      <motion.header {...fadeUp} transition={{ duration: 0.35 }} className="flex items-end gap-4 px-5 pt-2">
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-md border border-[#272727] bg-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <IcListMusic size={30} className="text-[#555]" />
        </div>
        <div className="min-w-0 pb-1">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#555]">PLAYLIST</p>
          {editing ? (
            <form
              onSubmit={(e) => { e.preventDefault(); commitRename(); }}
              className="mt-1 flex gap-1"
            >
              <input
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={commitRename}
                className="w-full bg-[#181818] px-2 py-0.5 text-xl font-bold tracking-tight text-[#F5F5F5] outline-none ring-1 ring-[#555] rounded"
              />
            </form>
          ) : (
            <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-[#F5F5F5]">{p.name.toUpperCase()}</h1>
          )}
          <p className="mt-1 text-[11px] text-[#888]">
            RAVENOIR · {items.length} songs · {fmt(total)}
          </p>
        </div>
      </motion.header>

      <div className="mt-4 px-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={items.length === 0}
          onClick={() => items[0] && playTrack(items[0].id, items.map((x) => x.id))}
          className="w-full rounded-full border border-[#F5F5F5]/80 py-2.5 font-mono text-[10px] tracking-[0.35em] text-[#F5F5F5] disabled:opacity-30"
        >
          PLAY
        </motion.button>
      </div>

      <div className="mt-4 border-t border-[#161616]">
        {items.length === 0 ? (
          <p className="px-5 py-14 text-center font-mono text-[11px] tracking-widest text-[#555]">EMPTY SET</p>
        ) : (
          items.map((t, i) => (
            <TrackRow
              key={t.id}
              track={t}
              index={i}
              thumb
              queue={items.map((x) => x.id)}
              onRemove={() => removeFromPlaylist(p.id, t.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ---------------- HELPERS (AlbumCard, ArtistCard) ---------------- */
function AlbumCard({ album, index }: { album: { name: string; tracks: StoredTrack[] }; index: number }) {
  const { openAlbum } = useRavenoir();
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.04, duration: 0.35 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => openAlbum(album.name)}
      className="w-[128px] shrink-0 text-left"
    >
      <div className="grid aspect-square w-full place-items-center rounded-md border border-[#272727] bg-[#111111]">
        <IcDisc size={28} className="text-[#555]" />
      </div>
      <span className="mt-2 block truncate text-[12px] font-medium text-[#F5F5F5]">{album.name}</span>
      <span className="block truncate text-[10px] text-[#888]">{album.tracks.length} songs</span>
    </motion.button>
  );
}

function ArtistCard({ artist, index }: { artist: { name: string; tracks: StoredTrack[] }; index: number }) {
  const { openArtist } = useRavenoir();
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.04, duration: 0.35 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => openArtist(artist.name)}
      className="w-[128px] shrink-0 text-left"
    >
      <div className="grid aspect-square w-full place-items-center rounded-full border border-[#272727] bg-[#111111]">
        <IcUser size={28} className="text-[#555]" />
      </div>
      <span className="mt-2 block truncate text-[12px] font-medium text-[#F5F5F5]">{artist.name}</span>
      <span className="block truncate text-[10px] text-[#888]">{artist.tracks.length} tracks</span>
    </motion.button>
  );
}

export function SettingsView() {
  const { tracks, playlists } = useRavenoir();
  const [storageEstimate, setStorageEstimate] = useState<string>("Calculating...");
  const [exported, setExported] = useState(false);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then((est) => {
        const used = est.usage ? (est.usage / (1024 * 1024)).toFixed(1) : "?";
        const quota = est.quota ? (est.quota / (1024 * 1024 * 1024)).toFixed(1) : "?";
        setStorageEstimate(`${used} MB used / ${quota} GB available`);
      }).catch(() => setStorageEstimate("Unavailable"));
    }
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const handleExport = () => {
    const data = {
      version: 1,
      exportedAt: Date.now(),
      tracks: tracks.map(({ blob, ...rest }) => rest),
      playlists,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ravenoir-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const shortcuts = [
    { key: "Space", action: "Play / Pause" },
    { key: "Arrow Left", action: "Seek back 5s" },
    { key: "Arrow Right", action: "Seek forward 5s" },
    { key: "N", action: "Next track" },
    { key: "P", action: "Previous track" },
    { key: "M", action: "Mute / Unmute" },
    { key: "S", action: "Toggle shuffle" },
    { key: "R", action: "Cycle repeat mode" },
    { key: "Ctrl + K", action: "Open search" },
  ];

  return (
    <motion.div {...fadeUp} className="px-5 pt-6 pb-4">
      <h1 className="font-mono text-[13px] tracking-[0.3em] text-[#F5F5F5]">SETTINGS</h1>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">STORAGE</h2>
        <div className="mt-3 space-y-2">
          <InfoRow label="Tracks" value={`${tracks.length}`} />
          <InfoRow label="Playlists" value={`${playlists.length}`} />
          <InfoRow label="Favorites" value={`${tracks.filter((t) => t.favorite).length}`} />
          <InfoRow label="Disk" value={storageEstimate} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">CONNECTION</h2>
        <div className="mt-3">
          <InfoRow label="Status" value={online ? "ONLINE" : "OFFLINE — everything still works"} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">KEYBOARD SHORTCUTS</h2>
        <div className="mt-3 space-y-1.5">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between">
              <span className="text-[12px] text-[#888]">{s.action}</span>
              <kbd className="rounded border border-[#272727] bg-[#111111] px-2 py-0.5 font-mono text-[10px] text-[#F5F5F5]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">DATA</h2>
        <button
          onClick={handleExport}
          className="mt-3 w-full rounded border border-[#272727] bg-[#111111] py-2.5 font-mono text-[11px] tracking-wider text-[#F5F5F5] transition-colors hover:bg-[#181818] active:scale-[0.98]"
        >
          {exported ? "EXPORTED ✓" : "EXPORT LIBRARY"}
        </button>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">MANAGE STORAGE</h2>
        <div className="mt-3 space-y-2">
          <button
            onClick={() => {
              if (!confirm("Clear recently played history?")) return;
              dbClearRecent().then(() => window.location.reload()).catch(() => {});
            }}
            className="w-full rounded border border-[#272727] bg-[#111111] py-2.5 font-mono text-[11px] tracking-wider text-[#F5F5F5] transition-colors hover:bg-[#181818] active:scale-[0.98]"
          >
            CLEAR RECENTLY PLAYED
          </button>
          <button
            onClick={() => {
              if (!confirm("Remove all cached artwork?")) return;
              dbClearArtwork().then(() => window.location.reload()).catch(() => {});
            }}
            className="w-full rounded border border-[#272727] bg-[#111111] py-2.5 font-mono text-[11px] tracking-wider text-[#F5F5F5] transition-colors hover:bg-[#181818] active:scale-[0.98]"
          >
            CLEAR CACHED ARTWORK
          </button>
          <button
            onClick={() => {
              if (!confirm("Delete ALL tracks and playlists from this device? This cannot be undone.")) return;
              Promise.all([dbDeleteAllTracks(), dbDeleteAllPlaylists(), dbClearArtwork(), dbClearRecent()])
                .then(() => window.location.reload())
                .catch(() => {});
            }}
            className="w-full rounded border border-[#3a1a1a] bg-[#180d0d] py-2.5 font-mono text-[11px] tracking-wider text-[#c96a6a] transition-colors hover:bg-[#221010] active:scale-[0.98]"
          >
            DELETE ENTIRE LIBRARY
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-[#555]">ABOUT</h2>
        <div className="mt-3 space-y-2">
          <InfoRow label="App" value="RAVENOIR" />
          <InfoRow label="Version" value="1.0.0" />
          <InfoRow label="Tagline" value="Your Music, Your Space." />
          <InfoRow label="Architecture" value="Offline-first PWA" />
        </div>
      </section>
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-[#272727] bg-[#111111] px-3 py-2">
      <span className="font-mono text-[10px] tracking-wider text-[#555]">{label}</span>
      <span className="text-[12px] text-[#F5F5F5]">{value}</span>
    </div>
  );
}
