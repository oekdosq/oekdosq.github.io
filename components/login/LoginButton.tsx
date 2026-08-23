"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoginButtonProps {
  state: "idle" | "loading" | "success" | "error";
  onClick: () => void;
}

export default function LoginButton({ state, onClick }: LoginButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={state === "loading" || state === "success"}
      whileHover={state === "idle" ? { scale: 1.02, boxShadow: "0 8px 30px rgba(139,92,246,0.3)" } : {}}
      whileTap={state === "idle" ? { scale: 0.98 } : {}}
      className={`
        relative w-full py-4 rounded-xl font-semibold text-sm tracking-wide
        overflow-hidden transition-all duration-300
        ${state === "error"
          ? "bg-red-500/80 text-white"
          : state === "success"
          ? "bg-emerald-500 text-white"
          : "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white hover:brightness-110"
        }
        disabled:cursor-not-allowed
      `}
      aria-label="Log in"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            Log In
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="inline-flex items-center gap-2"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </motion.svg>
            Logging in...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="inline-flex items-center gap-2"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            >
              <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            </motion.svg>
            Welcome back.
          </motion.span>
        )}
        {state === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Incorrect username or password.
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
