export type SecretMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export type SecretEntry = {
  id: string;
  number: string;
  title: string;
  caption: string;
  message: string;
  /** Kalau diisi, media ditampilkan di dalam bingkai. Kosong = placeholder "FOTO DI SINI". */
  media?: SecretMedia;
};

/*
 * Rahasia — tiap entry jadi slide carousel.
 * Tambah foto/video dengan set `media`, misal:
 *   media: { type: "image", src: "/secret/photo-1.jpg", alt: "kita" }
 */
export const secretEntries: SecretEntry[] = [
  {
    id: "rahasia-1",
    number: "1",
    title: "cewek tercantik di dunia",
    caption: "rahasia #1 · jangan bilang siapa-siapa",
    message:
      "kalau bosen, tinggal scroll. ini halaman kecil buat kamu, bikin aku senyum-senyum sendiri.",
  },
  {
    id: "rahasia-2",
    number: "2",
    title: "senyum yang bikin hari aku ringan",
    caption: "rahasia #2 · diam-diam ini alasan favoritku",
    message:
      "bukan cuma senyumnya, cara kamu liat dunia itu yang bikin semuanya berasa lebih hangat.",
  },
  {
    id: "rahasia-3",
    number: "3",
    title: "kamu itu home",
    caption: "rahasia #3 · tempat paling nyaman",
    message:
      "tahu gak? pulang ke kamu rasanya kayak pulang ke rumah, seaman itu, serileks itu.",
  },
];

export type GalleryItem = {
  id: string;
  caption: string;
  /** Kosong = placeholder gradien + "foto di sini". */
  src?: string;
  /** Rotasi biar scrapbook-feel. */
  rotate?: number;
  note?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    caption: "momen favorit kita",
    rotate: -2.5,
    note: "♡ jangan ilang ya",
  },
  {
    id: "g-2",
    caption: "hari yang santai",
    rotate: 2,
    note: "bawa aku lagi dong",
  },
  {
    id: "g-3",
    caption: "candaan random",
    rotate: -1.5,
    note: "ketawa sama-sama = obat paling ampuh",
  },
  {
    id: "g-4",
    caption: "kamu pas lagi fokus",
    rotate: 2.5,
    note: "diam-diam suka liatin",
  },
  {
    id: "g-5",
    caption: "golden hour",
    rotate: -2,
    note: "cahaya sore cocok sama kamu",
  },
  {
    id: "g-6",
    caption: "besok-besok lagi ya",
    rotate: 1.5,
    note: "janji, banyak momen baru",
  },
];

export const secretNavLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#rahasia", label: "Rahasia" },
  { href: "#galeri", label: "Galeri" },
  { href: "#playlist", label: "Playlist" },
  { href: "#tentang", label: "Tentang" },
] as const;

export const secretMobileNav = [
  { href: "#beranda", label: "Beranda" },
  { href: "#rahasia", label: "Rahasia" },
  { href: "#galeri", label: "Galeri" },
  { href: "#playlist", label: "Playlist" },
] as const;

export const secretFooter = {
  line1: "dibuat penuh ♡ buat kamu",
  line2: "rahasia kita dua-duanya, oke?",
} as const;
