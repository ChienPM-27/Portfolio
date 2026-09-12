"use client";

import React from "react";
import { profile } from "@/data/profile";
import { useScrollElevation } from "@/lib/scroll-utils";
import { Github, Terminal } from "lucide-react";

export function Navigation() {
  const isScrolled = useScrollElevation(20);

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl transition-all duration-300 pointer-events-none">
      <div
        className={`pointer-events-auto rounded-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/90 backdrop-blur-xl border border-zinc-700/80 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            : "bg-surface/60 backdrop-blur-md border border-stroke/60 shadow-sm"
        }`}
      >
        {/* Logo with signature accent-gradient ring */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Back to top"
        >
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#89AACC] to-[#4E85BF] transition-transform duration-300 group-hover:scale-105">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#101012] flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#89AACC]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-text group-hover:text-white transition-colors">
              {profile.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted leading-tight">
              {profile.role}
            </span>
          </div>
        </a>

        {/* Navigation actions */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs font-mono">
          <a
            href="#projects"
            className="text-text-muted hover:text-white transition-colors hidden sm:inline-block"
          >
            // projects
          </a>
          <a
            href="#about"
            className="text-text-muted hover:text-white transition-colors hidden sm:inline-block"
          >
            // about
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-stroke text-text-muted hover:text-white hover:border-zinc-600 transition-all text-xs"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}