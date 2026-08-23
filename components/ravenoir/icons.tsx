interface P {
  size?: number;
  className?: string;
}

const base = (size?: number, className?: string) => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export const IcPlay = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);
export const IcPause = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <rect x="6.5" y="5" width="3.6" height="14" rx="0.8" />
    <rect x="13.9" y="5" width="3.6" height="14" rx="0.8" />
  </svg>
);
export const IcPrev = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <path d="M7 6h2v12H7zM19 6l-9 6 9 6z" />
  </svg>
);
export const IcNext = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <path d="M15 6h2v12h-2zM5 6l9 6-9 6z" />
  </svg>
);
export const IcShuffle = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M16 3h5v5" />
    <path d="M4 20L21 3" />
    <path d="M21 16v5h-5" />
    <path d="M15 15l6 6" />
    <path d="M4 4l5 5" />
  </svg>
);
export const IcRepeat = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11v-1a4 4 0 014-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 01-4 4H3" />
  </svg>
);
export const IcRepeatOne = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11v-1a4 4 0 014-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 01-4 4H3" />
    <path d="M11.5 10.5L13 9.6V15" strokeWidth={1.6} />
  </svg>
);
export const IcHome = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);
export const IcLibrary = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 4v16" />
    <path d="M9 4v16" />
    <path d="M14 5l5 15" />
  </svg>
);
export const IcSearch = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const IcListMusic = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 6h13" />
    <path d="M3 12h9" />
    <path d="M3 18h9" />
    <circle cx="18" cy="16" r="3" />
    <path d="M21 16V7l-3 1" />
  </svg>
);
export const IcPlus = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IcX = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IcChevronDown = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const IcChevronLeft = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
export const IcTrash = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
  </svg>
);
export const IcVolume = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
    <path d="M16.5 8.5a5 5 0 010 7" />
    <path d="M19 6a9 9 0 010 12" />
  </svg>
);
export const IcVolumeMute = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
    <path d="M16 9l6 6M22 9l-6 6" />
  </svg>
);
export const IcImport = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
);

export const IcHeart = ({ size, className, filled = false }: P & { filled?: boolean }) => (
  <svg
    width={size ?? 20}
    height={size ?? 20}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 20.7S4.6 16 2.9 12.4A5.4 5.4 0 0 1 12 6.8a5.4 5.4 0 0 1 9.1 5.6C19.4 16 12 20.7 12 20.7z" />
  </svg>
);

export const IcShare = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 15V3" />
    <path d="M7.5 7.5L12 3l4.5 4.5" />
    <path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
  </svg>
);
export const IcDisc = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const IcUser = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0112 0v1" />
  </svg>
);
export const IcQueue = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 6h16" />
    <path d="M4 10h16" />
    <path d="M4 14h10" />
    <path d="M18 13l3 3-3 3" />
  </svg>
);
export const IcMoreH = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);
export const IcPlayNext = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <path d="M14 5h2v14h-2z" />
    <path d="M6 5l8 7-8 7z" />
  </svg>
);
export const IcListPlus = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M3 6h13" />
    <path d="M3 12h9" />
    <path d="M3 18h9" />
    <circle cx="18" cy="16" r="3" />
    <path d="M21 16V7l-3 1" />
    <path d="M16 19v-3M13 16h6" />
  </svg>
);
export const IcEdit = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M17 3a2.8 2.8 0 014 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);
export const IcGrip = ({ size, className }: P) => (
  <svg {...base(size, className)} fill="currentColor" stroke="none">
    <circle cx="9" cy="5" r="1.2" />
    <circle cx="15" cy="5" r="1.2" />
    <circle cx="9" cy="10" r="1.2" />
    <circle cx="15" cy="10" r="1.2" />
    <circle cx="9" cy="15" r="1.2" />
    <circle cx="15" cy="15" r="1.2" />
    <circle cx="9" cy="20" r="1.2" />
    <circle cx="15" cy="20" r="1.2" />
  </svg>
);
export const IcCheck = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);
export const IcArrowUpDown = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M7 3v18" />
    <path d="M4 6l3-3 3 3" />
    <path d="M17 21V3" />
    <path d="M14 18l3 3 3-3" />
  </svg>
);
export const IcSettings = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
export const IcDownload = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);
export const IcUpload = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <path d="M17 8l-5-5-5 5" />
    <path d="M12 3v12" />
  </svg>
);
export const IcKeyboard = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01" />
    <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
    <path d="M8 16h8" />
  </svg>
);
export const IcInfo = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
export const IcExport = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);
export const IcStorage = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v2H2zM2 10h20v4a2 2 0 01-2 2H4a2 2 0 01-2-2zM6 14v4M12 14v4M18 14v4" />
  </svg>
);
