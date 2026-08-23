# RAVENOIR — LAPORAN EKSEKUSI AGENTS.md

> Laporan implementasi spesifikasi `app/ravenoir/AGENTS.md` (87 section).
> Semua batch sudah di-deploy ke produksi.
> Produksi: https://my-web-psi-azure-88.vercel.app/ravenoir

---

## 1. RINGKASAN

Spesifikasi dieksekusi dalam 4 batch berturut-turut. Setiap batch di-deploy ke Vercel,
diverifikasi live, lalu lanjut batch berikutnya. Status akhir: **fitur inti v1 selesai**,
tinggal auth (opsional) dan packaging APK (aksi manual user).

---

## 2. RIWAYAT DEPLOY

| Deploy ID | Batch | Hasil |
|---|---|---|
| dpl_75Ce13ngphy8Zy7jvQBsaCwH6Sim | A | READY — favorit, recently played, ID3 |
| dpl_DrJKAkgXWdU77p9Mxeuz9GoCKiUN | B | READY — albums, artists, queue, dll |
| dpl_BbXhBA5K7SJKKjYwHg2qbLuM2yeM | C | ERROR — ikon duplikat |
| dpl_FeGNApXecKCnhyqjpqNLB6owBmt2 | C | ERROR — state `muted` deklarasi ganda |
| dpl_2bWaMKT6xrfyEx5Ge1RwAa3JUD28 | C | READY — sidebar, shortcut, settings |
| dpl_B5dh1KfaUkazyxY4yAgp3gPxuGvN | D | READY — indikator offline, swipe, storage mgmt |

Alias produksi selalu dipindah ke deploy READY terbaru via API aliases.

---

## 3. DETAIL PER BATCH

### Batch A — Fondasi Data
- Favorit (toggle + persist IndexedDB, field `favorite`)
- Recently played (maks 100 entri, urut timestamp)
- Parser ID3v2 buatan sendiri (`lib/ravenoir/id3.ts`): TIT2/TPE1/TALB/APIC
- Ekstraksi artwork dari tag → store `artwork`
- File: `db.ts`, `id3.ts`, `player-provider.tsx`, `ui-bits.tsx`, `views.tsx`, `full-player.tsx`

### Batch B — Navigasi Koleksi
- View Albums + AlbumDetail (grup dari metadata album)
- View Artists + ArtistDetail (grup dari metadata artis)
- View Queue (lihat antrean, hapus item, bersihkan)
- Context menu trek: play, play next, add to queue, add to playlist, like, lihat album/artis, hapus
- Sort library: addedAt/title/artist/album/duration + arah asc/desc
- Rename playlist + reorder trek dalam playlist (moveInPlaylist)
- Deteksi duplikat saat import (judul+artis+album cocok → skip)
- Search dikelompokkan: Artis / Album / Lagu
- Nav mobile jadi 5 item: HOME · LIBRARY · SEARCH · ALBUMS · ARTISTS
- Mini player dapat tombol Previous
- File: `player-provider.tsx` (rewrite), `views.tsx` (rewrite), `ui-bits.tsx`, `icons.tsx`, `page.tsx`

### Batch C — Desktop & Kontrol
- Sidebar desktop persisten (≥768px): logo, BROWSE (Home/Search/Library/Playlists/Queue),
  COLLECTION (Albums/Artists), Settings di bawah; konten geser `md:ml-[220px]`
- Keyboard shortcuts global: Space=play/pause, ←/→=seek ±5s, N/P=prev/next,
  M=mute, S=shuffle, R=repeat, Ctrl/Cmd+K=search (diabaikan saat mengetik di input)
- Halaman Settings: statistik (trek/playlist/favorit/disk via navigator.storage.estimate),
  referensi shortcut, export library ke JSON backup, about
- State `muted` + `toggleMute()` terpusat di provider
- File: `page.tsx` (Sidebar baru), `views.tsx` (SettingsView), `player-provider.tsx`, `icons.tsx`, `db.ts`

### Batch D — Polish
- Indikator online/offline live: titik + label di footer sidebar, baris status di Settings,
  chip "OFFLINE · LOCAL MODE" muncul hanya saat offline (§32: offline = normal)
- Swipe-down untuk menutup full player (framer-motion drag, threshold 110px / velocity 600)
- Manajemen penyimpanan di Settings: CLEAR RECENTLY PLAYED, CLEAR CACHED ARTWORK,
  DELETE ENTIRE LIBRARY (merah), semua pakai confirm() (§60: tidak ada hapus tanpa konfirmasi)
- Fungsi db baru: dbClearRecent, dbClearArtwork, dbDeleteAllTracks, dbDeleteAllPlaylists, dbExportLibrary
- File: `full-player.tsx`, `views.tsx`, `page.tsx`, `db.ts`

---

## 4. KEPATUHAN TERHADAP SPEK (per section AGENTS.md)

| Section | Status | Catatan |
|---|---|---|
| §2 Visi inti (Home…Queue) | ✅ | Auth/account belum (lihat §34) |
| §6 Color system | ✅ | Monokrom penuh, tanpa gradien/biru |
| §10 Desktop layout | ✅ | Sidebar sesuai wireframe |
| §11 Mobile layout | ✅ | Bottom nav + mini player di atasnya |
| §12 Home | ✅ | Greeting, quick access, recent, album/artis rows |
| §13 Search | ⚠️ | Grouped results + Ctrl+K ada; recent searches belum persist |
| §14 Library sort | ✅ | 5 kunci + toggle arah |
| §15 Favorites | ✅ | Persist offline, feedback halus |
| §16 Playlists | ⚠️ | CRUD/reorder lengkap; description & artwork playlist belum |
| §17 Recently played | ✅ | Cap 100 |
| §18 Player controls | ⚠️ | Semua ada kecuali playback speed |
| §19–20 Mini/Full player | ✅ | Full player bisa swipe-close |
| §22 Visualizer | ✅ | Bar monokrom |
| §26–27 Offline/IndexedDB | ✅ | Raw IndexedDB, bukan Dexie (deviasi sadar, ukuran kecil) |
| §28 Import | ⚠️ | File picker multi-select ada; drag&drop belum |
| §29 Metadata | ⚠️ | Title/artist/album/artwork; track no/year/genre belum |
| §30 Duplikat | ✅ | Match judul+artis+album (bukan hash) |
| §32 Offline indicator | ✅ | |
| §33 PWA | ✅ | Manifest + SW; install prompt default browser |
| §34–35 Auth/Account | ❌ | Belum diimplementasi (butuh OAuth provider) |
| §47 Keyboard shortcuts | ✅ | Sesuai daftar spek |
| §55–57 Queue/Shuffle/Repeat | ⚠️ | Shuffle acak sederhana (hindari repeat langsung) |
| §59–60 Settings/Storage | ✅ | Termasuk aksi destruktif berkofirmasi |
| §65 App icon | ✅ | ravenoir-icon PNG |
| §69 Gestur mobile | ⚠️ | Swipe-down close ada; swipe kiri/kanan ganti lagu belum |
| §73 Backup | ✅ | Export JSON metadata (tanpa audio) |
| §76 Phases 1–5, 7, 8 | ✅ | Phase 6 (auth) ❌ |

---

## 5. BUG YANG DITEMUI & DIPERBAIKI SAAT EKSEKUSI

1. **Vercel deploy gagal `module_not_found`** — `.npmrc` (`node-linker=hoisted`) +
   `packageManager: pnpm@10.34.5` bentrok dengan `npm install`.
   Fix: `installCommand: "npm install -g pnpm && pnpm install"`.
2. **Ikon duplikat di `icons.tsx`** (IcVolumeMute, IcSettings, dll terdaftar 2×) — build ERROR.
   Fix: hapus duplikat.
3. **`const [muted] = useState(false)` dideklarasi 3×** di provider — build ERROR.
   Fix: sisakan satu.
4. **Sisa `useEffect(() => {` kosong** setelah refactor keyboard handler — sintaks rusak.
   Fix: dibersihkan.
5. Proses verifikasi baru: semua file TSX dicek parse via @babel/parser lokal SEBELUM deploy.

## 6. SISA PEKERJAAN (belum dieksekusi)

- [ ] Google auth + halaman account (§34–35, Phase 6) — butuh setup OAuth
- [ ] Drag & drop import (§28)
- [ ] Playback speed (§18)
- [ ] Recent searches tersimpan (§13)
- [ ] Deskripsi + artwork playlist (§16)
- [ ] Prompt resume posisi playback (§58)
- [ ] Swipe kiri/kanan = next/prev di full player (§69)
- [ ] **Packaging APK via pwabuilder.com** — aksi manual user (butuh browser):
      buka URL produksi di Chrome → pwabuilder.com → Package for stores → Android

---
*Dibuat otomatis setelah eksekusi selesai. Sumber kebenaran fitur: kode di
`components/ravenoir/`, `lib/ravenoir/`, `app/ravenoir/`.*
