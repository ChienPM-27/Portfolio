"use client";

import React, { useEffect, useRef, useState } from "react";

export function TechnicalCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project" | "drag" | "explore">("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointer (desktop mouse), disable on touch/tablets
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const pos = {
      mouseX: -100,
      mouseY: -100,
      ringX: -100,
      ringY: -100,
    };

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.mouseX = e.clientX;
      pos.mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instantly position dot with ZERO delay (hardware accelerated)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.mouseX}px, ${pos.mouseY}px, 0)`;
      }

      // Check hover target for cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='drag']")) {
        setCursorState("drag");
      } else if (target.closest("[data-cursor='explore']")) {
        setCursorState("explore");
      } else if (target.closest("[data-cursor='project']")) {
        setCursorState("project");
      } else if (target.closest("a, button, [data-cursor='pointer'], input, textarea")) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Ultra-smooth, high-frequency lerp loop for outer ring (0.45 factor = snappy & responsive, NO CSS transition on transform)
    const loop = () => {
      pos.ringX += (pos.mouseX - pos.ringX) * 0.45;
      pos.ringY += (pos.mouseY - pos.ringY) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.ringX}px, ${pos.ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[110] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Central Technical Dot: 0ms delay, tracks raw mouse */}
      <div
        ref={dotRef}
        style={{ willChange: "transform" }}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyber-red"
      />

      {/* Outer Technical Ring: Snappy lerp, NO CSS transition on transform */}
      <div
        ref={ringRef}
        style={{ willChange: "transform" }}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-[width,height,border-color,background-color] duration-150 ease-out ${
          cursorState === "drag"
            ? "-ml-9 -mt-9 w-[72px] h-[72px] border border-hud-white bg-hud-white text-obsidian text-[9px] font-mono font-bold tracking-widest shadow-xl shadow-white/20 select-none"
            : cursorState === "explore"
            ? "-ml-9 -mt-9 w-[72px] h-[72px] border border-hud-white bg-hud-white text-obsidian text-[9px] font-mono font-bold tracking-widest shadow-xl shadow-white/20 select-none"
            : cursorState === "project"
            ? "-ml-6 -mt-6 w-12 h-12 border border-cyber-red/80 bg-obsidian/70 backdrop-blur-xs text-[8px] font-mono tracking-widest text-cyber-red select-none"
            : cursorState === "hover"
            ? "-ml-4 -mt-4 w-8 h-8 border border-hud-white/60 bg-hud-white/10"
            : "-ml-3 -mt-3 w-6 h-6 border border-hud-white/25"
        }`}
      >
        {cursorState === "drag" && <span>DRAG</span>}
        {cursorState === "explore" && <span>EXPLORE</span>}
        {cursorState === "project" && <span>VIEW</span>}
      </div>
    </div>
  );
}
