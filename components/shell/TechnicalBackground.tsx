"use client";

import React, { useEffect, useRef } from "react";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  isRed: boolean;
}

export function TechnicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const reducedMotion = isReducedMotionPreferred();

    // ----------------------------------------------------
    // 1. Particle Initialization (Balanced for performance)
    // ----------------------------------------------------
    const isMobile = width < 768;
    const particleCount = isMobile ? 18 : 42;

    const colors = [
      { r: 214, g: 214, b: 214, isRed: false },
      { r: 100, g: 140, b: 210, isRed: false },
      { r: 214, g: 214, b: 214, isRed: false },
      { r: 230, g: 45, b: 45, isRed: true },
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      const baseAlpha = col.isRed
        ? Math.random() * 0.4 + 0.25
        : Math.random() * 0.22 + 0.1;

      const vx = (Math.random() - 0.5) * (reducedMotion ? 0.04 : 0.25);
      const vy = (Math.random() - 0.5) * (reducedMotion ? 0.04 : 0.25);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        size: col.isRed ? Math.random() * 1.6 + 1.2 : Math.random() * 1.1 + 0.8,
        color: `${col.r}, ${col.g}, ${col.b}`,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.015 + 0.006,
        pulseOffset: Math.random() * Math.PI * 2,
        isRed: col.isRed,
      });
    }

    const GRID_SIZE = 76;
    let time = 0;

    // ----------------------------------------------------
    // 2. Interactive Render Loop
    // ----------------------------------------------------
    const render = () => {
      time += 1;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      // Base Obsidian Fill
      ctx.fillStyle = "#0b0e1a";
      ctx.fillRect(0, 0, width, height);

      // ----------------------------------------------------
      // Layer A: Interactive Spatial Coordinate Grid
      // ----------------------------------------------------
      const deformRadius = 140;
      const maxBend = 16;
      const hasMouse = !reducedMotion && mouse.x > -500;

      ctx.strokeStyle = "rgba(214, 214, 214, 0.025)";
      ctx.lineWidth = 0.75;

      // Vertical grid lines (with local deformation around cursor)
      for (let x = GRID_SIZE; x < width; x += GRID_SIZE) {
        ctx.beginPath();
        const distToMouseX = Math.abs(x - mouse.x);

        if (hasMouse && distToMouseX < deformRadius) {
          const sign = x >= mouse.x ? 1 : -1;
          const factor = Math.cos((distToMouseX / deformRadius) * (Math.PI * 0.5));
          const bendX = sign * factor * maxBend;

          const yTop = Math.max(0, mouse.y - deformRadius);
          const yBottom = Math.min(height, mouse.y + deformRadius);

          ctx.moveTo(x, 0);
          ctx.lineTo(x, yTop);
          ctx.quadraticCurveTo(x + bendX, mouse.y, x, yBottom);
          ctx.lineTo(x, height);
        } else {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        ctx.stroke();
      }

      // Horizontal grid lines (with local deformation around cursor)
      for (let y = GRID_SIZE; y < height; y += GRID_SIZE) {
        ctx.beginPath();
        const distToMouseY = Math.abs(y - mouse.y);

        if (hasMouse && distToMouseY < deformRadius) {
          const sign = y >= mouse.y ? 1 : -1;
          const factor = Math.cos((distToMouseY / deformRadius) * (Math.PI * 0.5));
          const bendY = sign * factor * maxBend;

          const xLeft = Math.max(0, mouse.x - deformRadius);
          const xRight = Math.min(width, mouse.x + deformRadius);

          ctx.moveTo(0, y);
          ctx.lineTo(xLeft, y);
          ctx.quadraticCurveTo(mouse.x, y + bendY, xRight, y);
          ctx.lineTo(width, y);
        } else {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
      }

      // Spatial coordinate intersection ticks
      ctx.fillStyle = "rgba(214, 214, 214, 0.04)";
      for (let x = GRID_SIZE; x < width; x += GRID_SIZE * 2) {
        for (let y = GRID_SIZE; y < height; y += GRID_SIZE * 2) {
          ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
        }
      }

      // ----------------------------------------------------
      // Layer B: Reactive Neural Particle Field
      // ----------------------------------------------------
      const repelRadius = 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          // Dynamic particle repulsion from cursor
          if (hasMouse) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < repelRadius && dist > 1) {
              const force = (1 - dist / repelRadius) * 0.75;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
              // Subtle brightness excitation on proximity
              p.alpha = Math.min(0.85, p.baseAlpha + (1 - dist / repelRadius) * 0.45);

              // Connect interactive coordinate thread if very close
              if (dist < 85) {
                ctx.strokeStyle = p.isRed
                  ? "rgba(230, 45, 45, 0.25)"
                  : "rgba(214, 214, 214, 0.12)";
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
              }
            } else {
              // Smooth return to base velocity
              p.vx += (p.baseVx - p.vx) * 0.03;
              p.vy += (p.baseVy - p.vy) * 0.03;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Screen edge wrap-around
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Breathing pulse
          p.alpha =
            p.baseAlpha +
            Math.sin(time * p.pulseSpeed + p.pulseOffset) * (p.baseAlpha * 0.35);
        }

        // Draw particle node
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.04, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo only for red accent particles
        if (p.isRed) {
          ctx.fillStyle = `rgba(230, 45, 45, ${p.alpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
