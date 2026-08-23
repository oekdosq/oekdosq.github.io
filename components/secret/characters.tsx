import type { CSSProperties } from "react";

export function KittyFace({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M17 32 L9 8 L31 20 Z" fill="white" stroke="#f4a7bc" strokeWidth="1.6" />
      <path d="M47 32 L55 8 L33 20 Z" fill="white" stroke="#f4a7bc" strokeWidth="1.6" />
      <circle cx="32" cy="34" r="20" fill="white" stroke="#f4a7bc" strokeWidth="1.6" />
      <ellipse cx="24" cy="32" rx="2" ry="2.6" fill="#1c1517" />
      <ellipse cx="40" cy="32" rx="2" ry="2.6" fill="#1c1517" />
      <ellipse cx="32" cy="38" rx="2.2" ry="1.6" fill="#f4a7bc" />
      <g stroke="#d6c2c8" strokeWidth="1.3" strokeLinecap="round">
        <line x1="9" y1="34" x2="18" y2="36" />
        <line x1="9" y1="40" x2="18" y2="39" />
        <line x1="55" y1="34" x2="46" y2="36" />
        <line x1="55" y1="40" x2="46" y2="39" />
      </g>
      <g fill="#f4a7bc">
        <ellipse cx="50.5" cy="7" rx="5.2" ry="3.4" transform="rotate(-28 50.5 7)" />
        <ellipse cx="50.5" cy="7" rx="3.4" ry="5.2" transform="rotate(28 50.5 7)" />
        <circle cx="50.5" cy="7" r="1.7" fill="#e06d96" />
      </g>
    </svg>
  );
}

export function CinnamorollFace({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M17 24 Q6 20 9 34 Q11 42 20 36 Z"
        fill="white"
        stroke="#e6e2ee"
        strokeWidth="1.6"
      />
      <path
        d="M47 24 Q58 20 55 34 Q53 42 44 36 Z"
        fill="white"
        stroke="#e6e2ee"
        strokeWidth="1.6"
      />
      <ellipse cx="32" cy="34" rx="19" ry="18" fill="white" stroke="#e6e2ee" strokeWidth="1.6" />
      <ellipse cx="25" cy="33" rx="3" ry="4.2" fill="#7cc6f0" />
      <ellipse cx="39" cy="33" rx="3" ry="4.2" fill="#7cc6f0" />
      <ellipse cx="19" cy="39" rx="3.2" ry="2" fill="#f8c7d8" />
      <ellipse cx="45" cy="39" rx="3.2" ry="2" fill="#f8c7d8" />
      <ellipse cx="32" cy="39" rx="2" ry="1.5" fill="#cdbfc6" />
    </svg>
  );
}

export function Bow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 40 24" className={className} aria-hidden>
      <path d="M20 12 C16 4 4 2 4 10 C4 16 14 16 20 12 Z" fill="currentColor" />
      <path d="M20 12 C24 4 36 2 36 10 C36 16 26 16 20 12 Z" fill="currentColor" />
      <circle cx="20" cy="12" r="3.2" fill="#fff" opacity="0.45" />
    </svg>
  );
}

export function Flower({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="currentColor">
        <circle cx="16" cy="6" r="5" />
        <circle cx="26" cy="16" r="5" />
        <circle cx="6" cy="16" r="5" />
        <circle cx="22.5" cy="25" r="5" />
        <circle cx="9.5" cy="25" r="5" />
      </g>
      <circle cx="16" cy="16" r="3.6" fill="#fff" opacity="0.75" />
    </svg>
  );
}

export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2c.7 5 2.8 7.3 8 8-5.2.7-7.3 3-8 8-.7-5-2.8-7.3-8-8 5.2-.7 7.3-3 8-8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Fish({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 48 32" className={className} aria-hidden>
      <path
        d="M2 16 C2 8 12 4 24 4 C36 4 46 8 46 16 C46 24 36 28 24 28 C12 28 2 24 2 16 Z"
        fill="currentColor"
      />
      <path d="M46 16 l8 -6 v12 z" fill="currentColor" opacity="0.85" />
      <circle cx="30" cy="12" r="2" fill="#fff" />
    </svg>
  );
}

export function Heart({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}
