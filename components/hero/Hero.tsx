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
  const roleSublineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
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
        y: 35,
        filter: "blur(12px)",
        duration: 1.1,
      })
        .from(
          roleSublineRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          tagsRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between px-6 pt-32 pb-12 max-w-6xl mx-auto"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-start/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="flex flex-col gap-6 my-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-surface border border-stroke text-accent-start">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-start animate-ping" />
            AI Engineering Portfolio
          </span>
          <span className="text-xs font-mono text-text-muted hidden sm:inline">
            // {profile.location}
          </span>
        </div>

        <div>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text max-w-4xl leading-[1.1]"
          >
            Pham Minh <span className="font-serif italic font-normal text-zinc-300">Chien</span>
          </h1>

          {/* Animated role-cycling subline */}
          <div
            ref={roleSublineRef}
            className="h-9 sm:h-12 flex items-center overflow-hidden mt-2"
          >
            <div
              className={`flex items-center gap-2 text-xl sm:text-3xl md:text-4xl text-text-muted font-light transition-all duration-300 ease-out transform ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0 filter-none"
                  : "opacity-0 -translate-y-2 blur-sm"
              }`}
            >
              <span className="accent-gradient-text font-mono font-normal text-lg sm:text-2xl">
                //
              </span>
              <span className="font-mono tracking-tight text-zinc-300">
                {VERIFIED_ROLES[roleIndex]}
              </span>
            </div>
          </div>
        </div>

        <p
          ref={textRef}
          className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed font-normal"
        >
          {profile.positioning}
        </p>

        <div
          ref={tagsRef}
          className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-stroke text-text-muted hover:text-text hover:border-zinc-700 transition-colors">
            <Eye className="w-3.5 h-3.5 text-accent-start" />
            Computer Vision
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-stroke text-text-muted hover:text-text hover:border-zinc-700 transition-colors">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            3D Reconstruction
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-stroke text-text-muted hover:text-text hover:border-zinc-700 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
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