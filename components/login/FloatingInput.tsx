"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  valid?: boolean;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  valid,
  icon,
  rightElement,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative mb-5">
      <div
        className={`
          relative flex items-center rounded-xl border-2 transition-all duration-300
          bg-white/5 backdrop-blur-sm
          ${error ? "border-red-500/60" : valid ? "border-emerald-500/60" : focused ? "border-violet-500/60" : "border-white/10"}
          ${focused ? "shadow-[0_0_20px_rgba(139,92,246,0.15)]" : ""}
        `}
      >
        {icon && (
          <span className={`pl-4 transition-colors duration-300 ${focused ? "text-violet-400" : "text-white/30"}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-4 pt-5 text-sm text-white outline-none"
          aria-label={label}
        />
        {rightElement && <span className="pr-3">{rightElement}</span>}
      </div>
      <motion.label
        className={`
          pointer-events-none absolute left-4 bg-transparent px-1 text-sm font-medium
          ${error ? "text-red-400" : valid ? "text-emerald-400" : focused ? "text-violet-400" : "text-white/40"}
        `}
        animate={{
          top: isActive ? "-10px" : "16px",
          fontSize: isActive ? "11px" : "14px",
          scale: isActive ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label}
      </motion.label>
      {/* Success / Error indicator */}
      {(error || valid) && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
        >
          {error ? "✕" : "✓"}
        </motion.span>
      )}
    </div>
  );
}
