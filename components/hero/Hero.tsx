"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import { ScrollCue } from "./ScrollCue";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { Cpu, Eye, Layers } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
      })
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          tagsRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.4"
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="flex flex-col gap-6 my-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            AI Engineering Portfolio
          </span>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            // {profile.location}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 max-w-4xl leading-[1.1]"
        >
          {profile.name}
          <span className="block text-2xl sm:text-4xl md:text-5xl text-zinc-400 mt-2 font-light">
            {profile.role}
          </span>
        </h1>

        <p
          ref={textRef}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal"
        >
          {profile.positioning}
        </p>

        <div
          ref={tagsRef}
          className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-zinc-300">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Computer Vision
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            3D Reconstruction
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-zinc-300">
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