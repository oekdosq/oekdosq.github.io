"use client";

import { useEffect, useRef, useState } from "react";

export function HologramRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main center ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 rounded-full border border-cyan-400/20 animate-[spin_20s_linear_infinite]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-48 h-48 rounded-full border border-cyan-400/30 animate-[spin_15s_linear_infinite_reverse]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 rounded-full border-2 border-cyan-400/15 animate-[spin_10s_linear_infinite]" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/60 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-cyan-400/60 to-transparent" />
      </div>
      <div className="absolute top-6 right-6 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyan-400/60 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cyan-400/60 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-cyan-400/60 to-transparent" />
      </div>
      <div className="absolute bottom-6 right-6 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-cyan-400/60 to-transparent" />
      </div>
    </div>
  );
}

export function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-[scan_4s_ease-in-out_infinite]" />
    </div>
  );
}

export function HologramNoise() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 255, 0.03) 2px,
          rgba(0, 255, 255, 0.03) 4px
        )`,
      }}
    />
  );
}

export function StatusBar({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          side === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
        <span className="text-[9px] text-cyan-400/50 font-mono tracking-[0.2em] uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}

export function CenterHUD({ isActive, mode }: { isActive: boolean; mode: string }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 ${
          isActive
            ? "border border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.15)]"
            : "border border-cyan-400/10"
        }`}
      >
        {/* Inner rotating ring */}
        <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/20 animate-[spin_8s_linear_infinite]" />

        {/* Center text */}
        <div className="text-center z-10">
          <div
            className={`text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-300 ${
              isActive ? "text-cyan-400" : "text-cyan-400/40"
            }`}
          >
            {mode}
          </div>
          <div className="text-[8px] text-cyan-400/30 mt-1 font-mono tracking-widest">
            {isActive ? "ACTIVE" : "STANDBY"}
          </div>
        </div>

        {/* Activity indicator dots */}
        {isActive && (
          <>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: "0.25s" }} />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: "0.75s" }} />
          </>
        )}
      </div>
    </div>
  );
}
