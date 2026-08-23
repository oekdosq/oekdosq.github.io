"use client";

import { useEffect, useRef, useCallback } from "react";

export function AmbientSound({ progress }: { progress: number }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.value = 80;

      filter.type = "lowpass";
      filter.frequency.value = 200;
      filter.Q.value = 2;

      gain.gain.value = 0;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
    window.addEventListener("scroll", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [initAudio]);

  useEffect(() => {
    if (!gainRef.current || !oscRef.current || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const vol = Math.sin(progress * Math.PI) * 0.06;
    gainRef.current.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1);
    oscRef.current.frequency.linearRampToValueAtTime(
      60 + progress * 80,
      ctx.currentTime + 0.1
    );
  }, [progress]);

  return null;
}
