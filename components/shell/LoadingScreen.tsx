"use client";

import React, { useEffect, useState, useRef } from "react";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

const PHRASES = [
  { threshold: 0, text: "INITIALIZING TENSORS" },
  { threshold: 25, text: "CALIBRATING 3D RECON" },
  { threshold: 50, text: "DISPATCHING GPU PIPELINES" },
  { threshold: 75, text: "PREPARING SCENE GRAPH" },
  { threshold: 95, text: "SYSTEM READY" },
];

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState(PHRASES[0].text);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const isReload =
      typeof window !== "undefined" &&
      window.performance
        ?.getEntriesByType("navigation")
        ?.some((entry) => (entry as PerformanceNavigationTiming).type === "reload");

    const sessionLoaded = sessionStorage.getItem("portfolio_session_loaded");
    if (sessionLoaded && !isReload) {
      setIsComplete(true);
      return;
    }

    const reducedMotion = isReducedMotionPreferred();
    const duration = reducedMotion ? 400 : 2700;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = Math.min(
        1 - Math.pow(1 - linearProgress, 2.2),
        1
      );
      const currentPercent = Math.floor(easedProgress * 100);

      setProgress(currentPercent);

      for (let i = PHRASES.length - 1; i >= 0; i--) {
        if (currentPercent >= PHRASES[i].threshold) {
          setActiveWord(PHRASES[i].text);
          break;
        }
      }

      if (linearProgress < 1) {
        rafIdRef.current = requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setActiveWord("SYSTEM READY");
        sessionStorage.setItem("portfolio_session_loaded", "true");

        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
          }, 700);
        }, 150);
      }
    };

    rafIdRef.current = requestAnimationFrame(updateCounter);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  if (!mounted || isComplete) {
    return null;
  }

  const formattedCount = String(progress).padStart(3, "0");

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 bg-[#09090b] text-foreground transition-opacity duration-700 ease-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Telemetry Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>PORTFOLIO OS // BOOT_SEQUENCE</span>
        </div>
        <div className="hidden sm:inline-block text-zinc-600">
          CORE // AI_ENGINEER_V1
        </div>
      </div>

      {/* Center Counter & Phrase */}
      <div className="flex flex-col items-center gap-6 my-auto">
        <div className="flex items-baseline">
          <span className="font-mono text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-zinc-100 tabular-nums">
            {formattedCount}
          </span>
          <span className="font-mono text-xl sm:text-2xl text-zinc-500 ml-1 font-light">
            %
          </span>
        </div>

        {/* Dynamic Rotating Phrase */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-wider text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="uppercase">{activeWord}</span>
        </div>

        {/* Signature Accent-Gradient Progress Bar */}
        <div className="w-56 sm:w-72 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 mt-2">
          <div
            className="h-full accent-gradient rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Technical Notice */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-600">
        <span>INTERACTIVE 3D & COMPUTE PIPELINES</span>
        <span>LATENCY: &lt; 45MS</span>
      </div>
    </div>
  );
}