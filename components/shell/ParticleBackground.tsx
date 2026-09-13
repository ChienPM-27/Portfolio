"use client";

import React, { useEffect, useRef } from "react";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const reducedMotion = isReducedMotionPreferred();

    // Particle palette inspired directly by Gleec Chat
    const colors = [
      { r: 230, g: 30, b: 30 },   // Cyber red
      { r: 214, g: 214, b: 214 }, // White
      { r: 255, g: 68, b: 68 },   // Vivid red
      { r: 100, g: 140, b: 210 }, // Subtle blue
    ];

    const count = Math.min(Math.floor((width * height) / 14000), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      const isRed = colorObj.r === 230 || colorObj.r === 255;
      const baseAlpha = isRed ? Math.random() * 0.45 + 0.25 : Math.random() * 0.25 + 0.1;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.25),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.25),
        size: isRed ? Math.random() * 1.8 + 1 : Math.random() * 1.2 + 0.8,
        color: `${colorObj.r}, ${colorObj.g}, ${colorObj.b}`,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Render faint background grid dots (Gleec alignment dots)
      ctx.fillStyle = "rgba(214, 214, 214, 0.035)";
      const gridSpacing = 80;
      for (let gx = gridSpacing; gx < width; gx += gridSpacing) {
        for (let gy = gridSpacing; gy < height; gy += gridSpacing) {
          ctx.fillRect(gx - 0.5, gy - 0.5, 1, 1);
        }
      }

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.alpha =
            p.baseAlpha +
            Math.sin(time * p.pulseSpeed + p.pulseOffset) * (p.baseAlpha * 0.4);
        }

        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for cyber red particles
        if (p.color.startsWith("230") || p.color.startsWith("255")) {
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
