"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RavenoirProvider, useRavenoir } from "@/components/ravenoir/player-provider";
import MiniPlayer from "@/components/ravenoir/mini-player";
import FullPlayer from "@/components/ravenoir/full-player";
import { ContextMenu } from "@/components/ravenoir/ui-bits";
import {
  HomeView,
  LibraryView,
  SearchView,
  PlaylistsView,
  PlaylistDetailView,
  AlbumsView,
  AlbumDetailView,
  ArtistsView,
  ArtistDetailView,
  QueueView,
  SettingsView,
} from "@/components/ravenoir/views";
import { IcHome, IcImport, IcLibrary, IcListMusic, IcSearch, IcDisc, IcUser, IcQueue, IcSettings } from "@/components/ravenoir/icons";

const NAV = [
  { id: "home", label: "HOME", icon: <IcHome size={19} /> },
  { id: "library", label: "LIBRARY", icon: <IcLibrary size={19} /> },
  { id: "search", label: "SEARCH", icon: <IcSearch size={19} /> },
  { id: "albums", label: "ALBUMS", icon: <IcDisc size={19} /> },
  { id: "artists", label: "ARTISTS", icon: <IcUser size={19} /> },
] as const;

const SIDEBAR_PRIMARY = [
  { id: "home", label: "Home", icon: <IcHome size={18} /> },
  { id: "search", label: "Search", icon: <IcSearch size={18} /> },
  { id: "library", label: "Library", icon: <IcLibrary size={18} /> },
  { id: "playlists", label: "Playlists", icon: <IcListMusic size={18} /> },
  { id: "queue", label: "Queue", icon: <IcQueue size={18} /> },
] as const;

const SIDEBAR_SECONDARY = [
  { id: "albums", label: "Albums", icon: <IcDisc size={18} /> },
  { id: "artists", label: "Artists", icon: <IcUser size={18} /> },
] as const;

function Views() {
  const { view } = useRavenoir();
  const fileRef = useRef<HTMLInputElement>(null);
  const { importFiles, activePlaylist } = useRavenoir();

  const key = view === "playlist" ? `playlist:${activePlaylist?.id}` : view;

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="audio/*,.mp3,.m4a,.aac,.ogg,.opus,.wav,.flac"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) importFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pb-44 md:pb-8"
        >
          {view === "home" && <HomeView onImport={() => fileRef.current?.click()} />}
          {view === "library" && <LibraryView onImport={() => fileRef.current?.click()} />}
          {view === "search" && <SearchView />}
          {view === "albums" && <AlbumsView />}
          {view === "album" && <AlbumDetailView />}
          {view === "artists" && <ArtistsView />}
          {view === "artist" && <ArtistDetailView />}
          {view === "playlists" && <PlaylistsView />}
          {view === "playlist" && <PlaylistDetailView />}
          {view === "queue" && <QueueView />}
          {view === "settings" && <SettingsView />}
        </motion.div>
      </AnimatePresence>

      {/* Quick import FAB */}
      <button
        onClick={() => fileRef.current?.click()}
        aria-label="Quick import"
        className="fixed bottom-[122px] right-3.5 z-30 grid h-11 w-11 place-items-center rounded-full bg-[#F5F5F5] text-black shadow-[0_10px_28px_rgba(0,0,0,0.6)] active:scale-90 transition-transform md:hidden"
      >
        <IcImport size={17} />
      </button>
    </>
  );
}

function useOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

function Sidebar() {
  const { view, setView } = useRavenoir();
  const online = useOnline();

  const isActive = (id: string) =>
    view === id ||
    (id === "playlists" && (view === "playlist" || view === "playlists")) ||
    (id === "albums" && view === "album") ||
    (id === "artists" && view === "artist");

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-[220px] flex-col border-r border-white/[0.05] bg-[#080808]">
      <div className="px-5 pt-6 pb-4">
        <p className="font-mono text-[11px] tracking-[0.4em] text-[#F5F5F5] font-bold">RAVENOIR</p>
        <p className="font-mono text-[8px] tracking-[0.2em] text-[#555] mt-0.5">YOUR MUSIC, YOUR SPACE.</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        <p className="px-2 pb-1 pt-2 font-mono text-[8px] tracking-[0.3em] text-[#555]">BROWSE</p>
        {SIDEBAR_PRIMARY.map((n) => {
          const active = isActive(n.id);
          return (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-left font-mono text-[11px] tracking-wider transition-colors ${
                active ? "bg-white/[0.06] text-[#F5F5F5]" : "text-[#666] hover:text-[#888] hover:bg-white/[0.03]"
              }`}
            >
              {n.icon}
              {n.label}
            </button>
          );
        })}

        <p className="px-2 pb-1 pt-4 font-mono text-[8px] tracking-[0.3em] text-[#555]">COLLECTION</p>
        {SIDEBAR_SECONDARY.map((n) => {
          const active = isActive(n.id);
          return (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-left font-mono text-[11px] tracking-wider transition-colors ${
                active ? "bg-white/[0.06] text-[#F5F5F5]" : "text-[#666] hover:text-[#888] hover:bg-white/[0.03]"
              }`}
            >
              {n.icon}
              {n.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <button
          onClick={() => setView("settings")}
          className={`flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-left font-mono text-[11px] tracking-wider transition-colors ${
            view === "settings" ? "bg-white/[0.06] text-[#F5F5F5]" : "text-[#666] hover:text-[#888] hover:bg-white/[0.03]"
          }`}
        >
          <IcSettings size={18} />
          Settings
        </button>
        <div className="mt-2 flex items-center gap-2 px-2.5" aria-live="polite">
          <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[#4a4a4a]" : "bg-[#888]"}`} />
          <span className="font-mono text-[8px] tracking-[0.25em] text-[#555]">
            {online ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>
    </aside>
  );
}

function Shell() {
  const { view, setView } = useRavenoir();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/ravenoir-sw.js").catch(() => {});
    }
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] antialiased">
      <Sidebar />

      {!online && (
        <div
          role="status"
          className="fixed left-1/2 top-2 z-50 -translate-x-1/2 rounded-full border border-[#272727] bg-[#111111]/95 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-[#888] backdrop-blur-sm"
        >
          OFFLINE · LOCAL MODE
        </div>
      )}

      <div className="md:ml-[220px]">
        <Views />
      </div>

      <MiniPlayer />
      <FullPlayer />
      <ContextMenu />

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid h-[57px] grid-cols-5 border-t border-white/[0.05] bg-[#080808]/95 backdrop-blur-md md:hidden"
        aria-label="Main navigation"
      >
        {NAV.map((n) => {
          const active = view === n.id || (n.id === "playlists" && view === "playlist") || (n.id === "albums" && view === "album") || (n.id === "artists" && view === "artist");
          return (
            <motion.button
              key={n.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setView(n.id)}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 font-mono text-[7px] tracking-[0.25em] transition-colors ${
                active ? "text-[#F5F5F5]" : "text-[#666]"
              }`}
            >
              {n.icon}
              {n.label}
              {active && (
                <motion.span
                  layoutId="navdot"
                  className="absolute top-0 h-[2px] w-8 rounded-full bg-white"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}

export default function RavenoirPage() {
  return (
    <RavenoirProvider>
      <Shell />
    </RavenoirProvider>
  );
}
