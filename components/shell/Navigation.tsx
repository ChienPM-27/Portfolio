"use client";

import React from "react";
import { profile } from "@/data/profile";
import { Github, Terminal } from "lucide-react";

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-surface-border/40 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-zinc-100">
            {profile.name}
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {profile.role}
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-6 text-xs font-mono">
        <a
          href="#projects"
          className="text-zinc-400 hover:text-cyan-400 transition-colors hidden sm:inline-block"
        >
          // projects
        </a>
        <a
          href="#about"
          className="text-zinc-400 hover:text-cyan-400 transition-colors hidden sm:inline-block"
        >
          // about
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
}