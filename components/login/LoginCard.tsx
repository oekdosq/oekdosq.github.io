"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingInput from "./FloatingInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";

const VALID_USER = "demo_user";
const VALID_PASS = "demo123";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnState, setBtnState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userError, setUserError] = useState("");
  const [userValid, setUserValid] = useState(false);
  const [pwError, setPwError] = useState("");

  const validateUsername = useCallback(
    (val: string) => {
      setUsername(val);
      if (val.length === 0) { setUserError(""); setUserValid(false); return; }
      setUserValid(val === VALID_USER);
      setUserError(val.length > 0 && val !== VALID_USER ? "" : "");
    },
    []
  );

  const handleLogin = () => {
    if (btnState === "loading" || btnState === "success") return;

    let hasError = false;

    if (!username.trim()) {
      setUserError("Username is required");
      hasError = true;
    }
    if (!password) {
      setPwError("Password is required");
      hasError = true;
    }
    if (hasError) return;

    if (username === VALID_USER && password === VALID_PASS) {
      setBtnState("loading");
      setTimeout(() => setBtnState("success"), 1500);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2500);
    } else {
      setBtnState("error");
      setShake(true);
      setErrorMsg("Incorrect username or password.");
      setTimeout(() => {
        setBtnState("idle");
        setShake(false);
        setErrorMsg("");
      }, 2500);
    }
  };

  return (
    <motion.div
      animate={
        shake
          ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
          : btnState === "success"
          ? { scale: 0.95, opacity: 0.8 }
          : { scale: 1, opacity: 1 }
      }
      transition={
        shake
          ? { duration: 0.5, ease: "easeInOut" }
          : { duration: 0.4, ease: "easeOut" }
      }
      className="w-full max-w-[400px] mx-4"
    >
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20">
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your account</p>
        </motion.div>

        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FloatingInput
            label="Username or email"
            value={username}
            onChange={validateUsername}
            error={userError}
            valid={userValid && username === VALID_USER}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />

          <PasswordInput
            value={password}
            onChange={(val) => { setPassword(val); setPwError(""); }}
            error={pwError}
          />
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2"
            >
              <span className="text-red-400 text-sm">✕</span>
              <span className="text-red-300 text-xs">{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forgot password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-right mb-6"
        >
          <button
            type="button"
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            Forgot password?
          </button>
        </motion.div>

        {/* Login button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <LoginButton state={btnState} onClick={handleLogin} />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Sign up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <button type="button" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
              Sign up
            </button>
          </p>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-3 rounded-xl bg-violet-500/5 border border-violet-500/10"
        >
          <p className="text-[11px] text-violet-300/50 text-center font-mono">
            Demo: <span className="text-violet-300/70">demo_user</span> / <span className="text-violet-300/70">demo123</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
