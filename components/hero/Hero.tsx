"use client";

import React, { useRef, useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { ScrollCue } from "./ScrollCue";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { Cpu, Eye, Layers } from "lucide-react";

const VERIFIED_ROLES = [
  "AI Engineer",
  "Computer Vision & 3D Reconstruction",
  "Cloud GPU Inference Specialist",
  "Information Technology B.Eng",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleSublineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Automated role-cycling subline
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % VERIFIED_ROLES.length);
        setFadeState("in");
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        filter: "blur(12px)",
        duration: 1.2,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
            duration: 0.9,
          },
          "-=0.8"
        )
        .from(
          roleSublineRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          tagsRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between px-6 pt-32 pb-12 max-w-6xl mx-auto"
    >
      <div className="flex flex-col gap-6 my-auto items-center text-center">
        {/* Gleec-style uppercase condensed headline */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-[0.08em] uppercase text-hud-white leading-[0.95]"
        >
          Pham Minh Chien
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <p className="text-base sm:text-lg text-hud-muted max-w-2xl leading-relaxed mx-auto">
            {profile.positioning}
          </p>
        </div>

        {/* Animated role-cycling subline */}
        <div
          ref={roleSublineRef}
          className="h-8 sm:h-10 flex items-center justify-center overflow-hidden"
        >
          <div
            className={`flex items-center gap-2 font-display text-lg sm:text-2xl tracking-[0.15em] uppercase transition-all duration-300 ease-out transform ${
              fadeState === "in"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 blur-sm"
            }`}
          >
            <span className="text-cyber-red font-mono text-sm">//</span>
            <span className="text-hud-muted">
              {VERIFIED_ROLES[roleIndex]}
            </span>
          </div>
        </div>

        {/* Gleec-style pill CTA buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#projects"
            className="pill-btn pill-btn-red"
          >
            View Projects
            <span className="text-xs opacity-60">›</span>
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-white"
          >
            GitHub Profile
            <span className="text-xs opacity-60">›</span>
          </a>
        </div>

        {/* Tags */}
        <div
          ref={tagsRef}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-4 text-xs font-mono"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-obsidian-light border border-hud-dim/30 text-hud-muted hover:text-hud-white hover:border-cyber-red/40 transition-colors">
            <Eye className="w-3.5 h-3.5 text-cyber-red" />
            Computer Vision
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-obsidian-light border border-hud-dim/30 text-hud-muted hover:text-hud-white hover:border-cyber-red/40 transition-colors">
            <Layers className="w-3.5 h-3.5 text-cyber-red" />
            3D Reconstruction
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-obsidian-light border border-hud-dim/30 text-hud-muted hover:text-hud-white hover:border-cyber-red/40 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-cyber-red" />
            Cloud GPU Pipelines
          </span>
        </div>
      </div>

      <div className="pt-8">
        <ScrollCue />
      </div>
    </section>
  );
}