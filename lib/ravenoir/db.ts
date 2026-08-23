export interface StoredTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  addedAt: number;
  mime: string;
  blob: Blob;
  favorite?: number;
}

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
}

export interface ArtworkRecord {
  id: string;
  blob: Blob;
  mime: string;
}

export interface RecentRecord {
  id: string;
  at: number;
}

const DB_NAME = "ravenoir";
const DB_VER = 2;

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("tracks"))
        db.createObjectStore("tracks", { keyPath: "id" });
      if (!db.objectStoreNames.contains("playlists"))
        db.createObjectStore("playlists", { keyPath: "id" });
      if (!db.objectStoreNames.contains("artwork"))
        db.createObjectStore("artwork", { keyPath: "id" });
      if (!db.objectStoreNames.contains("recentPlayed"))
        db.createObjectStore("recentPlayed", { keyPath: "id" });
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((res, rej) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
        t.oncomplete = () => db.close();
      })
  );
}

export function dbPutTrack(track: StoredTrack) {
  return tx("tracks", "readwrite", (s) => s.put(track));
}
export function dbGetTrack(id: string) {
  return tx<StoredTrack | undefined>("tracks", "readonly", (s) => s.get(id));
}
export function dbAllTracks() {
  return tx<StoredTrack[]>("tracks", "readonly", (s) => s.getAll());
}
export function dbDeleteTrack(id: string) {
  return tx("tracks", "readwrite", (s) => s.delete(id));
}

export function dbPutPlaylist(p: Playlist) {
  return tx("playlists", "readwrite", (s) => s.put(p));
}
export function dbAllPlaylists() {
  return tx<Playlist[]>("playlists", "readonly", (s) => s.getAll());
}
export function dbDeletePlaylist(id: string) {
  return tx("playlists", "readwrite", (s) => s.delete(id));
}

export function dbPutArtwork(rec: ArtworkRecord) {
  return tx("artwork", "readwrite", (s) => s.put(rec));
}
export function dbGetArtwork(id: string) {
  return tx<ArtworkRecord | undefined>("artwork", "readonly", (s) => s.get(id));
}
export function dbDeleteArtwork(id: string) {
  return tx("artwork", "readwrite", (s) => s.delete(id));
}

export function dbPutRecent(rec: RecentRecord) {
  return tx("recentPlayed", "readwrite", (s) => s.put(rec));
}
export function dbGetRecent() {
  return tx<RecentRecord[]>("recentPlayed", "readonly", (s) => s.getAll());
}
export function dbDeleteRecent(id: string) {
  return tx("recentPlayed", "readwrite", (s) => s.delete(id));
}

export function parseName(filename: string): { title: string; artist: string } {
  const base = filename.replace(/\.[^.]+$/, "").trim();
  const parts = base.split(/\s+-\s+/);
  if (parts.length >= 2)
    return { artist: parts[0].trim().toUpperCase(), title: parts.slice(1).join(" - ").trim() };
  return { artist: "UNKNOWN ARTIST", title: base || filename };
}

export function probeDuration(blob: Blob): Promise<number> {
  return new Promise((res) => {
    const url = URL.createObjectURL(blob);
    const a = new Audio();
    a.preload = "metadata";
    a.src = url;
    a.onloadedmetadata = () => {
      res(Number.isFinite(a.duration) ? a.duration : 0);
      URL.revokeObjectURL(url);
    };
    a.onerror = () => {
      res(0);
      URL.revokeObjectURL(url);
    };
  });
}

export function fmt(sec: number): string {
  if (!sec || !Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function dbAllArtwork() {
  return tx<ArtworkRecord[]>("artwork", "readonly", (s) => s.getAll());
}

export function dbClearArtwork() {
  return tx("artwork", "readwrite", (s) => s.clear());
}

export function dbClearRecent() {
  return tx("recentPlayed", "readwrite", (s) => s.clear());
}

export function dbDeleteAllTracks() {
  return tx("tracks", "readwrite", (s) => s.clear());
}

export function dbDeleteAllPlaylists() {
  return tx("playlists", "readwrite", (s) => s.clear());
}

export async function dbExportLibrary() {
  const tracks = await dbAllTracks();
  const playlists = await dbAllPlaylists();
  const recent = await dbGetRecent();
  return {
    version: 1,
    exportedAt: Date.now(),
    tracks: tracks.map((t) => ({ ...t, blob: undefined })),
    playlists,
    recent,
  };
}

export function uid(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
