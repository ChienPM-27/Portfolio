"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import { triggerObfuscatedMailto } from "@/lib/contact-utils";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";
import { Github, Mail, ArrowUpRight } from "lucide-react";

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
    value: "3 Projects",
    subtext: "Modular 3D Scenes",
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

  return (
    <footer className="border-t border-hud-dim/20 pt-10 pb-8 bg-obsidian-light/20 flex flex-col gap-10 overflow-hidden">
      {/* Infinite Horizontal Marquee Text Loop */}
      <div className="w-full overflow-hidden border-y border-hud-dim/15 py-3 sm:py-3.5 bg-obsidian-light/40 select-none">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto px-6 w-full">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-obsidian-light/70 border border-hud-dim/20 hover:border-cyber-red/30 transition-all flex flex-col justify-between gap-2"
          >
            <div className="text-xs font-mono text-hud-dim">
              {stat.label}
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display tracking-wider text-cyber-red">
              {stat.value}
            </div>
            <div className="text-[11px] font-mono text-hud-dim">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Availability Beacon and Direct Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-6 w-full pt-4 border-t border-hud-dim/20">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-display tracking-wider uppercase text-[10px]">Available for Junior / Intern Roles</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-white !py-1.5 !px-4 text-[10px]"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <button
            onClick={() =>
              triggerObfuscatedMailto(
                profile.links.emailUser,
                profile.links.emailDomain
              )
            }
            className="pill-btn pill-btn-red !py-1.5 !px-4 text-[10px]"
            aria-label="Contact via email"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Baseline Attribution */}
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-hud-dim">
        <span>{profile.name} — Portfolio v1.0</span>
        <span>
          {profile.education.institution} • {profile.location}
        </span>
      </div>
    </footer>
  );
}