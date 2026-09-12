"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer select-none">
      <span className="text-[11px] font-mono tracking-widest uppercase">
        Scroll to explore systems
      </span>
      <div className="w-5 h-8 rounded-full border border-zinc-700/60 flex items-start justify-center p-1">
        <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
      </div>
    </div>
  );
}