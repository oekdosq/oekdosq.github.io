"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; r: number; dx: number; dy: number; o: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.3 + 0.1,
      });
    }

    let t = 0;
    const blobs = [
      { x: 0.3, y: 0.4, r: 300, color: "rgba(131,58,180," },
      { x: 0.7, y: 0.6, r: 250, color: "rgba(253,29,29," },
      { x: 0.5, y: 0.3, r: 280, color: "rgba(252,176,69," },
    ];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.003;

      blobs.forEach((b, i) => {
        const bx = b.x * w + Math.sin(t + i * 2) * 80;
        const by = b.y * h + Math.cos(t + i * 1.5) * 60;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        grad.addColorStop(0, b.color + "0.08)");
        grad.addColorStop(1, b.color + "0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 50%, #16213e 100%)" }}
    />
  );
}
