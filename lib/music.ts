export type Track = {
  id: string;
  title: string;
  artist: string;
  /** File path relative to /public, e.g. "/audio/my-song.mp3". */
  file?: string;
  /** Official Spotify embed URL, used as fallback when no local file exists. */
  spotify?: string;
};

/*
 * Lagu favorit.
 * - Upload file audio ke /public/audio lalu set `file`.
 * - Kalau belum punya file, set `spotify` dengan URL embed resmi
 *   (Share > Embed track > salin bagian https://open.spotify.com/embed/track/...)
 */
export const tracks: Track[] = [
  {
    id: "track-1",
    title: "Stand By Me",
    artist: "Oasis",
    file: "/audio/track-1.mp3",
    spotify: "https://open.spotify.com/embed/track/7sVKPV1W2UZ0rR77GeAimi",
  },
  {
    id: "track-2",
    title: "About You",
    artist: "The 1975",
    file: "/audio/track-2.mp3",
    spotify: "https://open.spotify.com/embed/track/3hEfpBHxgieRLz4t3kLNEg",
  },
];

export const DEFAULT_TRACK_INDEX = 0;
