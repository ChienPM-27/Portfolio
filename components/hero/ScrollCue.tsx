"use client";

import React from "react";

export function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-3 text-hud-dim hover:text-hud-muted transition-colors cursor-pointer select-none">
      <span className="font-display text-xs tracking-[0.3em] uppercase text-hud-muted">
        Discover Projects
      </span>
      <div className="w-[1px] h-8 bg-hud-dim/40 relative overflow-hidden">
        <div className="w-full h-3 bg-cyber-red absolute top-0 animate-bounce" />
      </div>
    </div>
  );
}