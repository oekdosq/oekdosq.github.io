"use client";

import { useEffect, useRef } from "react";
import { useRavenoir } from "./player-provider";

export default function Visualizer({ height = 56 }: { height?: number }) {
  const { analyser, playing } = useRavenoir();
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const BARS = 24;
    const data = new Uint8Array(analyser ? analyser.frequencyBinCount : BARS);
    let t = 0;

    const draw = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser) {
        if (playing) analyser.getByteFrequencyData(data);
        else data.fill(0);
      }

      const bw = canvas.width / BARS;
      for (let i = 0; i < BARS; i++) {
        let v: number;
        if (analyser && playing) {
          v = data[Math.floor((i / BARS) * data.length)] / 255;
        } else {
          v = playing ? 0.15 : 0.06 + 0.04 * (Math.sin(t + i * 0.55) * 0.5 + 0.5);
        }
        const h = Math.max(canvas.height * 0.05, v * canvas.height * 0.92);
        const x = i * bw + bw * 0.22;
        const w = bw * 0.56;
        const shade = Math.round(90 + v * 165);
        ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
        ctx.fillRect(x, canvas.height - h, w, h);
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [analyser, playing, height]);

  return <canvas ref={ref} style={{ width: "100%", height }} aria-hidden />;
}
