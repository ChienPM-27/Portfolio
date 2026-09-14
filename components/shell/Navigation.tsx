"use client";

import React from "react";
import { profile } from "@/data/profile";
import { useScrollElevation } from "@/lib/scroll-utils";
import { Github } from "lucide-react";

export function Navigation() {
  const isScrolled = useScrollElevation(20);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div
        className={`flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 transition-all duration-300 ${
          isScrolled
            ? "bg-obsidian/90 backdrop-blur-xl border-b border-hud-dim/20"
            : "bg-transparent"
        }`}
      >
        {/* Logo — Gleec style: bold name + thin descriptor */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Back to top"
        >
          <div className="w-8 h-8 rounded-full border border-cyber-red/60 flex items-center justify-center bg-obsidian group-hover:border-cyber-red transition-colors">
            <span className="font-display text-sm font-semibold text-cyber-red">P</span>
          </div>
          <div className="font-display tracking-[0.15em] uppercase text-sm">
            <span className="font-semibold text-hud-white">Pham</span>
            <span className="font-light text-hud-muted ml-1">Minh Chien</span>
          </div>
        </a>

        {/* Navigation actions */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            href="#projects"
            data-cursor="pointer"
            className="font-display text-xs tracking-[0.2em] uppercase text-hud-muted hover:text-cyber-red transition-colors hidden sm:inline-block"
          >
            Projects
          </a>
          <a
            href="#about"
            data-cursor="pointer"
            className="font-display text-xs tracking-[0.2em] uppercase text-hud-muted hover:text-cyber-red transition-colors hidden sm:inline-block"
          >
            About
          </a>
          {isScrolled && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="pill-btn pill-btn-red !py-2 !px-5 text-[10px]"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
          {/* Gleec-style 3-dot menu icon */}
          <button className="flex flex-col gap-1 p-1 sm:hidden" aria-label="Menu">
            <span className="w-1 h-1 rounded-full bg-hud-muted" />
            <span className="w-1 h-1 rounded-full bg-hud-muted" />
            <span className="w-1 h-1 rounded-full bg-hud-muted" />
          </button>
        </nav>
      </div>
    </header>
  );
}