"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 0, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { level: 1, label: "Fair", color: "bg-yellow-500" };
  if (score <= 4) return { level: 2, label: "Strong", color: "bg-emerald-500" };
  return { level: 3, label: "Very Strong", color: "bg-emerald-400" };
}

export default function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const strength = getStrength(value);

  return (
    <div className="relative mb-5">
      <div
        className={`
          relative flex items-center rounded-xl border-2 transition-all duration-300
          bg-white/5 backdrop-blur-sm
          ${error ? "border-red-500/60" : focused ? "border-violet-500/60" : "border-white/10"}
          ${focused ? "shadow-[0_0_20px_rgba(139,92,246,0.15)]" : ""}
        `}
      >
        <span className={`pl-4 transition-colors duration-300 ${focused ? "text-violet-400" : "text-white/30"}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </span>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-4 pt-5 text-sm text-white outline-none"
          aria-label="Password"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="mr-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <motion.span
            key={show ? "eye-off" : "eye"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="text-white/40 hover:text-white/70"
          >
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </motion.span>
        </button>
      </div>
      <motion.label
        className={`
          pointer-events-none absolute left-4 bg-transparent px-1 text-sm font-medium
          ${error ? "text-red-400" : focused ? "text-violet-400" : "text-white/40"}
        `}
        animate={{
          top: isActive ? "-10px" : "16px",
          fontSize: isActive ? "11px" : "14px",
          scale: isActive ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        Password
      </motion.label>
      {/* Strength indicator */}
      {value.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 ml-1"
        >
          <div className="flex gap-1 flex-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= strength.level ? strength.color : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/40 font-mono">{strength.label}</span>
        </motion.div>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
