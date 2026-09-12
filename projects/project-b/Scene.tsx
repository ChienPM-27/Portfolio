"use client";

import React, { useRef, useEffect } from "react";
import { VisualSceneProps } from "@/lib/types";

export default function Scene({ progress, isActive }: VisualSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particleCount = 80;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1.5,
      hue: Math.random() * 40 + 150, // emerald to cyan
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = "rgba(9, 9, 11, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Center attractor influenced by progress
      const centerX = width / 2;
      const centerY = height / 2;
      const pullForce = (progress - 0.5) * 0.15;

      particles.forEach((p, i) => {
        p.x += p.vx + Math.cos(time + i) * 0.5;
        p.y += p.vy + Math.sin(time + i) * 0.5;

        // Pull toward center based on scroll progress
        p.x += (centerX - p.x) * pullForce * 0.05;
        p.y += (centerY - p.y) * pullForce * 0.05;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 60%, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 * (1 - dist / 75)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  return (
    <div className="w-full h-full min-h-[360px] relative bg-zinc-950 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-emerald-400/80 bg-zinc-950/80 px-2.5 py-1 rounded border border-emerald-900/40">
        CANVAS PARTICLE FLOW
      </div>
    </div>
  );
}