"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoredTrack, fmt } from "@/lib/ravenoir/db";
import { useRavenoir } from "./player-provider";
import { IcHeart, IcListMusic, IcMoreH, IcPlayNext, IcQueue, IcTrash, IcX } from "./icons";

export function EqBars() {
  return (
    <span className="inline-flex items-end gap-[2px] h-3 w-3.5" aria-label="playing">
      <i className="eq-bar w-[2px] bg-white" style={{ animationDelay: "0ms" }} />
      <i className="eq-bar w-[2px] bg-[#999]" style={{ animationDelay: "160ms" }} />
      <i className="eq-bar w-[2px] bg-[#666]" style={{ animationDelay: "320ms" }} />
    </span>
  );
}

export function LetterTile({
  text,
  size = 48,
  rounded = "rounded-sm",
}: {
  text: string;
  size?: number;
  rounded?: string;
}) {
  const ch = (text || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`grid shrink-0 place-items-center border border-[#272727] bg-[#181818] font-mono text-[#F5F5F5] ${rounded}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.34) }}
      aria-hidden
    >
      {ch}
    </span>
  );
}

export function ProgressBar({ big = false }: { big?: boolean }) {
  const { progress, duration, seek } = useRavenoir();
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const apply = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    seek((clientX - r.left) / r.width);
  };

  return (
    <div>
      <div
        ref={ref}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        className={`group relative cursor-pointer touch-none py-2 ${big ? "" : "scale-y-100"}`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          apply(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && apply(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <div className={`w-full rounded-full bg-[#272727] ${big ? "h-[3px]" : "h-[2px]"}`}>
          <div
            className="relative h-full rounded-full bg-[#F5F5F5]"
            style={{ width: `${progress * 100}%` }}
          >
            <span
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow transition-opacity ${
                big ? "h-3 w-3 opacity-100" : "h-2.5 w-2.5 opacity-0 group-hover:opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-[#555] tracking-wider">
        <span>{fmt(progress * duration)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

export function ContextMenu() {
  const {
    contextMenu, setContextMenu, tracks, playlists,
    playNext, addToQueue, toggleFavorite, addToPlaylist, removeTrack, openAlbum, openArtist,
  } = useRavenoir();
  if (!contextMenu) return null;
  const track = tracks.find((t) => t.id === contextMenu.trackId);
  if (!track) return null;
  const isFav = !!track.favorite;

  return (
    <>
      <div className="fixed inset-0 z-[60]" onClick={() => setContextMenu(null)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[61] min-w-[200px] overflow-hidden rounded-lg border border-[#272727] bg-[#181818] shadow-[0_16px_40px_rgba(0,0,0,0.8)]"
        style={{ left: Math.min(contextMenu.x, window.innerWidth - 220), top: Math.min(contextMenu.y, window.innerHeight - 340) }}
      >
        <div className="border-b border-[#272727] px-4 py-3">
          <p className="truncate text-[13px] font-semibold text-[#F5F5F5]">{track.title}</p>
          <p className="truncate text-[11px] text-[#888]">{track.artist}</p>
        </div>
        <div className="py-1">
          <CtxItem
            label="Play next"
            onClick={() => { playNext(track.id); setContextMenu(null); }}
          />
          <CtxItem
            label="Add to queue"
            onClick={() => { addToQueue(track.id); setContextMenu(null); }}
          />
          <div className="my-1 border-t border-[#272727]" />
          <CtxItem
            label={isFav ? "Remove from Liked" : "Add to Liked"}
            onClick={() => { toggleFavorite(track.id); setContextMenu(null); }}
          />
          {playlists.length > 0 && (
            <div className="max-h-[120px] overflow-y-auto">
              <div className="px-4 pt-2 pb-1">
                <p className="font-mono text-[8px] tracking-[0.25em] text-[#555]">ADD TO PLAYLIST</p>
              </div>
              {playlists.map((p) => (
                <CtxItem
                  key={p.id}
                  label={p.name}
                  onClick={() => { addToPlaylist(p.id, track.id); setContextMenu(null); }}
                  disabled={p.trackIds.includes(track.id)}
                />
              ))}
            </div>
          )}
          <div className="my-1 border-t border-[#272727]" />
          <CtxItem
            label="View album"
            onClick={() => { openAlbum(track.album); setContextMenu(null); }}
          />
          <CtxItem
            label="View artist"
            onClick={() => { openArtist(track.artist); setContextMenu(null); }}
          />
          <div className="my-1 border-t border-[#272727]" />
          <CtxItem
            label="Remove from library"
            danger
            onClick={() => { removeTrack(track.id); setContextMenu(null); }}
          />
        </div>
      </motion.div>
    </>
  );
}

function CtxItem({ label, onClick, danger, disabled }: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 text-left text-[12px] transition-colors ${
        disabled ? "text-[#333] cursor-default" : danger ? "text-[#e55] hover:bg-[#222]" : "text-[#ccc] hover:bg-[#222] hover:text-[#F5F5F5]"
      }`}
    >
      {label}
    </button>
  );
}

export function TrackRow({
  track,
  index,
  queue,
  onRemove,
  thumb = false,
  showAlbum = false,
}: {
  track: StoredTrack;
  index: number;
  queue: string[];
  onRemove?: () => void;
  thumb?: boolean;
  showAlbum?: boolean;
}) {
  const { currentId, playing, playTrack, toggleFavorite, setContextMenu } = useRavenoir();
  const active = currentId === track.id;
  const isFav = !!track.favorite;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => playTrack(track.id, queue)}
      onKeyDown={(e) => e.key === "Enter" && playTrack(track.id, queue)}
      whileTap={{ scale: 0.985 }}
      className="group flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none active:bg-[#141414]"
    >
      {thumb ? (
        <div className="relative shrink-0">
          <LetterTile text={track.title} size={48} />
          {active && (
            <span className="absolute inset-0 grid place-items-center bg-black/55">
              <EqBars />
            </span>
          )}
        </div>
      ) : (
        <span className="w-6 shrink-0 text-center font-mono text-[11px] text-[#555]">
          {active && playing ? <EqBars /> : String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[13px] ${active ? "text-white" : "text-[#F5F5F5]"}`}>
          {track.title}
        </p>
        <p className="truncate text-[11px] text-[#888] mt-0.5">
          {track.artist}{showAlbum && track.album && track.album !== "LOCAL FILES" ? ` · ${track.album}` : ""}
        </p>
      </div>
      <button
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(track.id);
        }}
        className={`shrink-0 p-1 transition-colors ${isFav ? "text-white" : "text-[#444] hover:text-[#888]"}`}
      >
        <IcHeart size={15} filled={isFav} />
      </button>
      <span className="shrink-0 font-mono text-[10px] text-[#555]">{fmt(track.duration)}</span>
      <button
        aria-label="More options"
        onClick={(e) => {
          e.stopPropagation();
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          setContextMenu({ trackId: track.id, x: rect.right + 4, y: rect.top });
        }}
        className="shrink-0 p-1 text-[#444] hover:text-[#888] transition-colors md:opacity-0 md:group-hover:opacity-100"
      >
        <IcMoreH size={16} />
      </button>
      {onRemove && (
        <button
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="shrink-0 p-1 text-[#555] hover:text-[#F5F5F5] transition-colors"
        >
          <IcTrash size={15} />
        </button>
      )}
    </motion.div>
  );
}
