"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";
import { Github, ArrowUp, Mail } from "lucide-react";

const MARQUEE_ITEMS = [
  "COMPUTER VISION PIPELINES",
  "SINGLE-IMAGE 3D RECONSTRUCTION",
  "HIGH-THROUGHPUT GPU INFERENCE",
  "PYTORCH & FASTAPI BACKENDS",
  "REAL-TIME POINT CLOUD & MESH GENERATION",
  "SAI GON UNIVERSITY // 2024–2029",
];

const STATS = [
  {
    label: "GPU Utilization",
    value: "94.2%",
    subtext: "Batch Tensor Optimization",
  },
  {
    label: "Cloud Inference Latency",
    value: "< 45ms",
    subtext: "Async GPU Pipeline",
  },
  {
    label: "Academic Standing",
    value: "Sai Gon University",
    subtext: "2024–2029 • B.Eng IT",
  },
  {
    label: "System Architecture",
    value: "4 Projects",
    subtext: "Modular Interactive Scenes",
  },
];

export function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isReducedMotionPreferred()) return;
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 28,
      ease: "none",
    });

    return () => {
      anim.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-hud-dim/20 pt-12 pb-20 bg-obsidian-light/95 backdrop-blur-md flex flex-col gap-12 overflow-hidden">
      {/* Infinite Horizontal Marquee Text Loop */}
      <div className="w-full overflow-hidden border-y border-hud-dim/15 py-3 sm:py-4 bg-obsidian/80 select-none">
        <div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap will-change-transform w-max"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-hud-muted"
            >
              <span>{item}</span>
              <span className="text-cyber-red font-bold">//</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Technical Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-6 w-full">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-obsidian/80 border border-hud-dim/20 hover:border-cyber-red/30 transition-all flex flex-col justify-between gap-2"
          >
            <div className="text-xs font-mono text-hud-dim">
              {stat.label}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display tracking-wider text-cyber-red">
              {stat.value}
            </div>
            <div className="text-[11px] font-mono text-hud-muted">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Baseline Navigation & Attribution */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-6xl mx-auto px-6 w-full pt-6 border-t border-hud-dim/20">
        {/* Identity & Origin */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-hud-dim text-center sm:text-left">
          <span className="font-semibold text-hud-white">{profile.name}</span>
          <span className="hidden sm:inline">•</span>
          <span>{profile.education.institution}</span>
          <span className="hidden sm:inline">•</span>
          <span>{profile.location}</span>
        </div>

        {/* Quick Links & Scroll to top */}
        <div className="flex items-center gap-5 text-xs font-mono">
          <a
            href="#projects"
            data-cursor="pointer"
            className="text-hud-muted hover:text-cyber-red transition-colors"
          >
            Projects
          </a>
          <a
            href="#about"
            data-cursor="pointer"
            className="text-hud-muted hover:text-cyber-red transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            data-cursor="pointer"
            className="text-hud-muted hover:text-cyber-red transition-colors"
          >
            Contact
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="text-hud-muted hover:text-hud-white transition-colors flex items-center gap-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-obsidian border border-hud-dim/30 text-hud-muted hover:text-cyber-red hover:border-cyber-red/50 transition-all text-xs"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}