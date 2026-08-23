# RAVENOIR — AGENTS.md

> Scope: rules ini berlaku untuk semua file di dalam `app/ravenoir/`,
> `components/ravenoir/`, dan `lib/ravenoir/`.
> Jangan timpa file di luar scope tersebut (portfolio utuh).

## 1. PROJECT IDENTITY

Project name: RAVENOIR

Tagline: "Your Music, Your Space."

RAVENOIR is a modern music application designed around personal music discovery,
library management, playback, playlists, favorites, and offline access.

The application should feel like a premium standalone music application,
not like a generic website.

RAVENOIR must NOT be a visual clone of Spotify, Apple Music, YouTube Music,
or another existing music application.

The interface may take inspiration from modern music applications,
but all layouts, components, interactions, branding, animations, and visual
details must have an original implementation and identity.

---

## 2. CORE PRODUCT VISION

RAVENOIR should provide:

- Home
- Search
- Music Library
- Favorites
- Playlists
- Recently Played
- Albums
- Artists
- Music Player
- Queue
- User Account
- Google authentication
- Offline music access
- Local music storage
- Installable application experience

Priorities (in order):

1. Performance
2. Clean UI
3. Offline-first architecture
4. Smooth playback
5. Responsive design
6. Accessibility
7. Maintainable code
8. Original visual identity

---

## 3. IMPORTANT LEGAL / CONTENT RULE

Do NOT implement unauthorized scraping, piracy, or downloading of copyrighted
music from third-party services.

RAVENOIR may support:

- User-owned music
- Properly licensed music
- Public-domain music
- Music from APIs/services that explicitly allow the intended use
- Files imported directly by the user

Do not bypass DRM.
Do not attempt to download protected streams.
Do not scrape Spotify, Apple Music, YouTube, or other services to obtain
copyrighted audio.

The application architecture must keep the music source layer replaceable so
a legitimate music provider can be integrated later.

---

## 4. APPLICATION TYPE

RAVENOIR should be an actual installable application rather than simply
a traditional website.

Preferred architecture:

- Desktop application support
- Mobile-friendly interface
- Offline-first behavior
- Local music storage
- Optional remote API
- PWA capabilities where appropriate

The architecture should allow the application to evolve into a native desktop
or mobile application without rewriting the entire UI.

---

## 5. VISUAL IDENTITY

### Brand

Name: RAVENOIR
Tagline: Your Music, Your Space.

The brand should feel:

- Dark
- Elegant
- Minimal
- Cinematic
- Premium
- Modern
- Calm
- Slightly mysterious

Avoid making it look like:

- Cyberpunk
- Gaming UI
- Neon dashboard
- Generic AI-generated dashboard
- Spotify clone
- Apple Music clone

---

## 6. COLOR SYSTEM

Do NOT use gradients as a primary design element.
Do NOT use blue as the application's primary accent color.

Primary palette:

| Token | Value |
|---|---|
| Background | `#080808` |
| Surface | `#111111` |
| Elevated surface | `#181818` |
| Primary text | `#F5F5F5` |
| Secondary text | `#888888` |
| Muted text | `#555555` |
| Border | `#272727` |
| Primary accent | `#FFFFFF` |

The UI should primarily use: black, near-black, charcoal, white, gray.

Album artwork is allowed to contain its original colors.
Do not recolor album artwork just to match the UI.

---

## 7. DESIGN PRINCIPLES

- Strong visual hierarchy
- Large album artwork
- Generous spacing
- Minimal borders
- Subtle shadows
- Subtle motion
- Clear typography
- No unnecessary decoration
- No excessive rounded cards
- No excessive glassmorphism
- No excessive gradients
- No neon colors

The interface should feel expensive without being complicated.

---

## 8. RESPONSIVE DESIGN

Support desktop, laptop, tablet, mobile.

Desktop layout should use a persistent sidebar.
Mobile layout should use a bottom navigation system.

Do not simply shrink the desktop UI for mobile.
Create responsive layouts intentionally.

---

## 9. MAIN APPLICATION STRUCTURE

/home — /search — /library — /favorites — /playlists — /albums — /artists
/recently-played — /player — /settings — /account

---

## 10. DESKTOP LAYOUT

```
--------------------------------------------------
| Sidebar |                                      |
|         |            Main Content              |
|         |                                      |
|         |                                      |
|         |                                      |
--------------------------------------------------
|                  Mini Player                   |
--------------------------------------------------
```

Sidebar:
- RAVENOIR logo
- Home, Search, Library, Favorites, Playlists, Recently Played

Secondary section:
- Albums, Artists

Bottom:
- User profile, Settings

---

## 11. MOBILE LAYOUT

```
--------------------------------------------------
|                  Main Content                  |
--------------------------------------------------
| Mini Player                                    |
--------------------------------------------------
| Home | Search | Library | Favorites | Profile |
--------------------------------------------------
```

The bottom navigation must remain accessible.
The mini player should sit above the bottom navigation.

---

## 12. HOME PAGE

Contains:

- Greeting
- Recently played
- Quick access
- Recommended music
- Recently added
- Favorite tracks
- Featured playlists
- Albums
- Artists

Do not overcrowd the Home page.
Sections separated using spacing rather than excessive containers.

Good: "Recently Played" + [Album] [Album] [Album] [Album]
Bad: card inside card inside card with unnecessary borders.

---

## 13. SEARCH

Search supports: Songs, Albums, Artists, Playlists.

Provides: search input, instant filtering when possible, recent searches,
search results, empty state, loading state, error state.

Search should feel fast.
Ctrl/Cmd + K should focus search when supported.

---

## 14. LIBRARY

Library contains: songs, albums, artists, playlists,
downloaded/offline music, favorites.

Allow sorting by: recently added, recently played, title, artist, album, duration.

---

## 15. FAVORITES

Users favorite/unfavorite songs.
Favorite state must persist and work offline.
Favorite button provides subtle visual feedback. No huge animations.

---

## 16. PLAYLISTS

Users can: create, rename, delete playlist; add/remove/reorder songs;
play playlist; shuffle playlist.

Playlist metadata: name, description, artwork, track count, total duration,
created date, updated date.

---

## 17. RECENTLY PLAYED

Store recently played tracks locally:
song, artist, album, last played timestamp, playback position when appropriate.

Avoid unlimited history. Maximum ~100 recently played tracks.

---

## 18. MUSIC PLAYER

Must support: play, pause, previous, next, seek, volume, mute,
shuffle, repeat, queue, favorite, playback speed where supported.

---

## 19. MINI PLAYER

Remains visible while browsing.

```
--------------------------------------------------
[ART] Song Title
      Artist

        Previous   Play   Next

---------------- progress -----------------------
--------------------------------------------------
```

Clicking the mini player opens the full player.

---

## 20. FULL PLAYER

Contains: large artwork, song title, artist, album, progress bar,
current time, duration, play/pause, previous, next, shuffle, repeat,
favorite, queue.

Cinematic but practical.

---

## 21. ALBUM ARTWORK

Use large artwork where appropriate.
Artwork can have: subtle shadow, subtle scale animation,
slight breathing effect while playing.

Do NOT constantly rotate artwork. Avoid excessive motion.

---

## 22. VISUALIZER

Optional. Preferred style: minimal waveform, monochrome.

Do NOT use: rainbow waveform, neon equalizer, excessive glowing bars.

The visualizer complements the player rather than dominating it.

---

## 23. AUDIO ENGINE

Create a dedicated audio engine instead of placing audio logic inside UI components.

```
src/
  audio/
    AudioEngine
    QueueManager
    PlaybackManager
    MediaSessionManager
```

Responsibilities:
- AudioEngine: load audio, play, pause, seek, volume, events
- QueueManager: current queue, next, previous, shuffle, repeat
- PlaybackManager: playback state, current track, position, duration
- MediaSessionManager: play, pause, next, previous, seek

---

## 24. AUDIO STATE

Centralize audio state:

```ts
type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
};
```

Do not duplicate player state across multiple components.

---

## 25. TRACK MODEL

```ts
type Track = {
  id: string;
  title: string;
  artistId?: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  artworkUrl?: string;
  localUri?: string;
  duration: number;
  source: "local" | "remote";
  createdAt: number;
};
```

Keep the model extensible.

---

## 26. OFFLINE ARCHITECTURE

Offline playback is a core feature.
Use IndexedDB for persistent local application data.

Storage categories: tracks, audio files/blobs, artwork, favorites,
playlists, recently played, user preferences, playback state.

localStorage only for small preferences. Never for large audio files.

---

## 27. INDEXEDDB

Use a proper abstraction (e.g. Dexie or another mature wrapper).
Avoid large amounts of raw IndexedDB boilerplate.

Potential database: RAVENOIR_DB

Tables: tracks, audioFiles, artwork, playlists, playlistTracks,
favorites, recentlyPlayed, settings.

---

## 28. LOCAL MUSIC IMPORT

Import via: file picker, drag and drop, multiple selection.

Formats: MP3, WAV, FLAC, M4A, OGG (actual support depends on browser/platform).

---

## 29. MUSIC METADATA

When importing, attempt to read: title, artist, album, album artist,
track number, year, genre, artwork.

Fallback: filename as title.
"01 - My Song.mp3" becomes Title: My Song.

---

## 30. DUPLICATE DETECTION

Detect duplicates via: file name, file size, last modified, hash when practical.

If duplicate detected show: "This track already exists in your library."

---

## 31. IMPORT UX

Flow: select music -> import dialog -> analyze metadata -> save metadata ->
save audio locally -> save artwork -> update library -> success state.

Show progress for large imports.

---

## 32. OFFLINE INDICATOR

Online: "Online". Offline: "Offline".
No huge constant warnings. Offline mode should feel normal.

---

## 33. PWA

If PWA: install prompt, service worker, app shell caching, offline UI,
cache versioning, update handling.

Service-worker caching alone does NOT make user music offline.
Music must be intentionally stored locally.

---

## 34. AUTHENTICATION

Google auth for identity/account/preferences/playlist sync.

Never store Google passwords. Never request passwords manually.
Use OAuth/OIDC through a legitimate provider.

---

## 35. ACCOUNT

Account page: profile picture, display name, email, sign out,
sync status, storage info, preferences.

---

## 36. BACKEND

Backend optional for local playback.
May provide: authentication, profile, cloud sync, playlist sync,
licensed catalog, metadata, recommendations.

Playing locally stored music must NOT require the backend.
App functions offline.

---

## 37. API ARCHITECTURE

Separate music provider logic from UI.

```
src/
  providers/
    MusicProvider.ts
    LocalMusicProvider.ts
    RemoteMusicProvider.ts
```

```ts
interface MusicProvider {
  search(query: string): Promise<Track[]>;
  getTrack(id: string): Promise<Track | null>;
  getAlbums(): Promise<Album[]>;
  getArtists(): Promise<Artist[]>;
}
```

This allows a legitimate music service to be integrated later.

---

## 38. DATA FLOW

```
UI -> Application State -> Services -> Repository -> IndexedDB / API
```

Do not let React components directly manipulate IndexedDB everywhere.
Create service/repository layers.

---

## 39. COMPONENT STRUCTURE

```
src/
  components/
    ui/ layout/ player/ music/ playlist/ library/ search/
```

Example: MiniPlayer.tsx, FullPlayer.tsx, PlayerControls.tsx,
ProgressBar.tsx, TrackRow.tsx, AlbumCard.tsx, ArtistCard.tsx

---

## 40. DESIGN SYSTEM

Reusable components: Button, IconButton, Input, Modal, Dialog, Dropdown,
Tooltip, Tabs, Skeleton, Toast, TrackRow, AlbumCard, PlaylistCard.
Do not duplicate styles unnecessarily.

---

## 41. ANIMATION

Subtle. Use opacity, transform, scale, translate, blur where appropriate.

Avoid excessive bouncing, giant transitions, flashing, constant movement.

Preferred duration: 150ms-300ms. Longer: 300ms-600ms.
Use reduced-motion support.

---

## 42. HOVER EFFECTS

Track rows: subtle surface change, play button reveal, favorite button reveal.
Album cards: subtle lift, artwork scale 1.02-1.04.
Buttons: subtle scale 1.01-1.03.
Do not over-animate.

---

## 43. LOADING STATES

Every async operation needs a loading state: skeleton, spinner where appropriate,
progress indicator. Avoid blank screens.

---

## 44. EMPTY STATES

No music: "Your library is empty." / "Import your first tracks to get started."
No favorites: "No favorites yet."
No playlists: "Create a playlist for your next session."

---

## 45. ERROR HANDLING

Understandable errors. Bad: "Error 500."
Better: "Something went wrong while loading your library."
Audio errors: "RAVENOIR couldn't play this track." Provide retry when possible.

---

## 46. ACCESSIBILITY

Keyboard navigation, focus states, ARIA labels, screen reader-friendly buttons,
sufficient contrast, reduced motion.
Every icon-only button must have an accessible label.

---

## 47. KEYBOARD SHORTCUTS

Space: Play/Pause · Arrow Left/Right: Seek back/forward
N: Next · P: Previous · M: Mute · S: Shuffle · R: Repeat
Ctrl/Cmd + K: Search

Do not override browser shortcuts unnecessarily.

---

## 48. PERFORMANCE

Avoid: unnecessary re-renders, huge image downloads, unnecessary API requests,
excessive animation, loading entire library at once.

Use: lazy loading, virtualization for large lists, memoization where useful,
optimized artwork, efficient IndexedDB queries.

---

## 49. SECURITY

Never: hardcode secret API keys, expose private credentials, store passwords,
bypass authentication, bypass DRM, scrape protected services.

Secrets via environment variables (.env.local).
Never commit .env / .env.local / private keys / service account credentials.

---

## 50. CODE QUALITY

TypeScript, strict typing, small components, reusable utilities,
clear naming, consistent formatting.

Avoid giant components, giant hooks, duplicated logic,
`any` unless absolutely necessary, unnecessary dependencies.

---

## 51. TYPESCRIPT

Prefer explicit types.

Bad: `const data: any = ...`
Good: `const data: Track[] = ...`

Shared domain types in `src/types/`.

---

## 52. STATE MANAGEMENT

Centralized state when appropriate: Zustand, Redux Toolkit,
React Context for small state.

Player state should not be duplicated.
Local component state only for truly local UI state.

---

## 53. ROUTING

/, /search, /library, /favorites, /playlists, /playlists/:id,
/albums/:id, /artists/:id, /settings, /account.

Player remains globally available.

---

## 54. GLOBAL PLAYER

The audio player survives navigation.
Changing pages must NOT stop the current track.
Player state lives above page-level components.

---

## 55. QUEUE

Queue supports: add track, remove track, reorder, clear queue,
play next, add to end, show current track.

Persists across navigation; optionally across app restarts.

---

## 56. SHUFFLE

Meaningful randomized queue.
Avoid repeating the same track immediately (unless library is tiny).

---

## 57. REPEAT

Modes: OFF, ALL, ONE. UI clearly shows the active state.

---

## 58. PLAYBACK POSITION

For long tracks optionally save position.
On reopen ask or auto-resume. Example: "Resume from 02:14?"

---

## 59. SETTINGS

May include: appearance, audio, playback, storage, offline,
account, keyboard shortcuts, about. Keep simple.

---

## 60. STORAGE MANAGEMENT

Show: used storage, available storage (when supported), track count,
playlist count.

Allow: clear cached artwork, remove downloaded tracks,
clear recently played, clear local library.

Never delete music without confirmation.

---

## 61. SEARCH UX

Instant feel. Grouped results:

```
SEARCH
[ Search RAVENOIR ]

Songs
Track 1
Track 2

Albums
Album 1

Artists
Artist 1
```

---

## 62. TRACK ROW

Contains: artwork, title, artist, album, duration, favorite, more menu.
Hover reveals play action. Mobile uses touch-friendly actions.

---

## 63. CONTEXT MENU (TRACK)

Play, play next, add to queue, add to playlist, favorite,
view album, view artist, remove from library.

---

## 64. PLAYLIST CONTEXT MENU

Play, shuffle, rename, edit, delete.
Require confirmation for destructive actions.

---

## 65. APP ICON

Minimal: black background, white raven-inspired abstract mark,
minimal geometric shape. Do not copy existing brand logos.

---

## 66. TYPOGRAPHY

Clean modern sans-serif (e.g. Inter or similar quality UI font).
Headings may use a slightly distinctive display font if readable.
No excessive typography styles.

---

## 67. ICONS

One consistent icon library (e.g. Lucide). Do not mix icon styles.

---

## 68. RESPONSIVE PLAYER

Desktop: mini player at bottom.
Tablet: compact player.
Mobile: mini player above bottom nav; full player as dedicated screen.

---

## 69. MOBILE GESTURES

Optional: swipe left = next track, swipe right = previous,
swipe down = close full player.

Optional and discoverable. Never gesture-only for essential functions.

---

## 70. INSTALL EXPERIENCE

If PWA: manifest, icons, splash config where supported,
standalone display, service worker, offline shell.

---

## 71. OFFLINE-FIRST RULE

Never make the UI unusable offline.

Offline still works: local music, favorites, playlists, library,
local search, recently played.

Remote features may degrade — communicate clearly which are remote-only.

---

## 72. SYNC

If cloud sync added: never blindly overwrite local changes.
Use timestamps/versioning (lastModified, updatedAt, version).
Handle conflicts gracefully.

---

## 73. BACKUP

Optional: export library metadata as JSON.

```json
{
  "version": 1,
  "favorites": [],
  "playlists": [],
  "settings": {}
}
```

Never export copyrighted audio unless explicitly intended and legally permitted.

---

## 74. TESTING

Test: play, pause, next, previous, seek, volume, shuffle, repeat, queue,
import, delete, favorite, playlist creation, offline playback, search,
authentication, logout, responsive layout.

---

## 75. EDGE CASES

Handle: missing artwork, missing metadata, broken audio file,
unsupported format, deleted local file, duplicate import, empty library,
offline mode, network failure, auth failure, expired session,
corrupted IndexedDB data.

---

## 76. DEVELOPMENT PHASES

- Phase 1 Foundation: setup, routing, theme, layout, sidebar, mobile nav, basic UI
- Phase 2 Player: audio engine, mini/full player, controls, queue
- Phase 3 Local Music: import, metadata, IndexedDB, playback, library
- Phase 4 Library: songs, albums, artists, favorites, recently played, search
- Phase 5 Playlists: CRUD, add/remove/reorder, playback
- Phase 6 Auth: Google login, account, logout, optional cloud sync
- Phase 7 Offline: PWA, shell caching, persistent music/favorites/playlists
- Phase 8 Polish: animation, a11y, responsive, states, performance

---

## 77. DEVELOPMENT RULE

Do not build everything at once. Before implementing a major feature:
understand existing architecture, inspect relevant files, reuse components,
avoid unnecessary dependencies, implement smallest clean solution,
test it, check responsive, check offline behavior when relevant.

---

## 78. OPENCODE BEHAVIOR

When working on this project:
Do not blindly rewrite existing files.
Before modifying a file: read it, understand purpose, check imports,
check related components, check existing patterns.
Preserve working functionality.
Do not replace architecture just because another approach is possible.

---

## 79. DEPENDENCY RULE

Before adding a dependency ask:
"Can this be implemented cleanly with the existing stack?"
If yes: do not add it.
If substantial value: use mature, maintained packages. No dependency bloat.

---

## 80. UI RULE

Every new UI feature must match RAVENOIR identity.

NO: blue gradients, rainbow gradients, neon UI, excessive glassmorphism,
generic dashboard cards, Spotify copy, Apple Music copy, giant shadows.

YES: black, white, gray, clean typography, strong spacing,
subtle motion, album artwork, minimal controls.

---

## 81. DESIGN CONSISTENCY

Existing component? Reuse it.
Do not create ButtonA/ButtonB/ButtonC when one Button covers the cases.

---

## 82. ERROR RECOVERY

Errors never leave the app broken.
Audio fails: stop broken playback -> show error -> allow retry ->
allow skipping to next track.

---

## 83. USER FEEDBACK

Favorite: heart changes state. Add to playlist: toast.
Import: progress. Delete: confirmation. Playback: button state change.

---

## 84. ACCESSIBLE INTERACTION

Essential actions never hover-only.
Everything works on keyboard, touch, and mouse.

---

## 85. PERFORMANCE TARGET

Fast initial render, lazy loading, efficient state updates,
optimized images, efficient local DB queries.
Avoid unnecessary loading screens.

---

## 86. FINAL QUALITY STANDARD

Before considering a feature complete, verify:

- [ ] Desktop works
- [ ] Mobile works
- [ ] Keyboard works
- [ ] Loading state exists
- [ ] Empty state exists
- [ ] Error state exists
- [ ] Animation is subtle
- [ ] No unnecessary gradient
- [ ] No blue primary accent
- [ ] RAVENOIR visual identity preserved
- [ ] Existing features still work
- [ ] No console errors
- [ ] TypeScript errors resolved
- [ ] Accessibility considered
- [ ] Offline behavior considered
- [ ] Performance considered

---

## 87. GOLDEN RULE

RAVENOIR should feel like a real music application.
Not a demo. Not a template. Not a Spotify clone. Not an AI-generated dashboard.

Every feature has a reason to exist.
Every animation has a purpose.
Every component reusable where appropriate.
Every screen belongs to the same product.

RAVENOIR — "Your Music, Your Space."
