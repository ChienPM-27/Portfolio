"use client";

import React from "react";
import { ProjectData } from "@/lib/types";
import { Scan, Cpu, Layers, Box, ArrowUpRight } from "lucide-react";

interface ProjectPosterProps {
  project: ProjectData;
  index: number;
}

/**
 * Authentic Logotomia-style architectural card poster.
 * Features 45-degree chamfered geometry, high-contrast typography,
 * telemetry vector symbols (o────── +), and distinct project visuals.
 */
export function ProjectPoster({ project, index }: ProjectPosterProps) {
  const { slug, title, tagline, techStack } = project;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between bg-[#ededed] text-[#0b0e1a] p-6 sm:p-8 select-none transition-transform duration-500 overflow-hidden shadow-2xl"
      style={{
        clipPath: "polygon(0 56px, 56px 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Top Header: Title + Telemetry Symbol (o────── +) */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-col pl-4 sm:pl-6">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#0b0e1a]/60 uppercase font-semibold">
            // PROJECT {num}
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0b0e1a] leading-[0.95] mt-1">
            {title}
          </h3>
        </div>

        {/* Logotomia Signature Vector Symbol: o────── + */}
        <div className="flex items-center flex-shrink-0 pt-2 text-[#0b0e1a]/80">
          <svg className="w-20 sm:w-24 h-6" viewBox="0 0 90 24" fill="none">
            {/* Circle on the left */}
            <circle cx="10" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
            {/* Connecting line */}
            <line x1="15" y1="12" x2="72" y2="12" stroke="currentColor" strokeWidth="1.2" />
            {/* Plus sign on the right */}
            <line x1="80" y1="5" x2="80" y2="19" stroke="currentColor" strokeWidth="1.5" />
            <line x1="73" y1="12" x2="87" y2="12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Central Visual Showcase Box (Chamfered Inner Window) */}
      <div
        className="relative flex-1 w-full my-2 bg-[#121726] rounded-sm overflow-hidden flex items-center justify-center p-6 border border-black/10 shadow-inner group-hover:scale-[1.01] transition-transform duration-500"
        style={{
          clipPath: "polygon(0 40px, 40px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* Subtle Background Art Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none filter grayscale contrast-150"
          style={{ backgroundImage: "url('/assets/fond_art.png')" }}
        />

        {/* Ambient Grid lines */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic Project-Specific Visual Graphic */}
        {slug === "project-3d-reconstruction" ? (
          // 3D Polyhedron Wireframe Mesh
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg viewBox="0 0 180 180" fill="none" className="w-full h-full text-hud-white">
                <polygon
                  points="90,18 155,55 155,125 90,162 25,125 25,55"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="opacity-60"
                />
                <line x1="90" y1="18" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" />
                <line x1="155" y1="55" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" />
                <line x1="25" y1="55" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" />
                <line x1="90" y1="90" x2="90" y2="162" stroke="currentColor" strokeWidth="1.5" />
                <line x1="90" y1="90" x2="155" y2="125" stroke="currentColor" strokeWidth="1.5" />
                <line x1="90" y1="90" x2="25" y2="125" stroke="currentColor" strokeWidth="1.5" />
                {/* Vertex Pulsing Keypoints */}
                <circle cx="90" cy="90" r="4" fill="#e61e1e" className="animate-ping" />
                <circle cx="90" cy="90" r="4" fill="#e61e1e" />
                <circle cx="90" cy="18" r="3" fill="#ffffff" />
                <circle cx="155" cy="55" r="3" fill="#ffffff" />
                <circle cx="25" cy="55" r="3" fill="#ffffff" />
                <circle cx="90" cy="162" r="3" fill="#ffffff" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyber-red uppercase font-semibold mt-2">
              WATERTIGHT MESH SYNTHESIS
            </span>
          </div>
        ) : slug === "project-vision-segmentation" ? (
          // Computer Vision Bounding Box & Target Radar
          <div className="relative z-10 w-48 h-36 border-2 border-cyber-red/80 rounded bg-cyber-red/10 flex flex-col justify-between p-3 font-mono">
            <div className="flex items-center justify-between text-[10px] text-cyber-red font-bold">
              <span>[ YOLOv8: 98.4% ]</span>
              <span>IoU: 0.98</span>
            </div>
            <div className="my-auto flex items-center justify-center">
              <Scan className="w-12 h-12 text-hud-white animate-pulse" />
            </div>
            <div className="flex justify-between text-[9px] text-hud-muted">
              <span>X: 142 Y: 86</span>
              <span>CONFIDENCE: MAX</span>
            </div>
          </div>
        ) : slug === "project-cloud-inference" ? (
          // GPU Server Telemetry Box
          <div className="relative z-10 w-52 flex flex-col gap-2 p-4 rounded bg-obsidian-surface border border-hud-dim/40 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-hud-white font-bold">
                <Cpu className="w-4 h-4 text-cyber-red" /> L4 GPU NODE
              </span>
              <span className="text-emerald-400 font-bold">18.4 GB</span>
            </div>
            <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden mt-1">
              <div className="bg-cyber-red h-full rounded-full w-[78%]" />
            </div>
            <div className="flex justify-between text-[10px] text-hud-muted pt-1">
              <span>FASTAPI ASYNC</span>
              <span>28ms LATENCY</span>
            </div>
          </div>
        ) : (
          // KeySmith Telemetry Dashboard
          <div className="relative z-10 grid grid-cols-2 gap-3 w-52 font-mono">
            <div className="p-3 rounded bg-obsidian-surface border border-hud-dim/40">
              <span className="text-[10px] text-hud-muted block">SYNC REVENUE</span>
              <span className="text-base font-bold text-hud-white mt-1 block">$43.3k</span>
            </div>
            <div className="p-3 rounded bg-obsidian-surface border border-hud-dim/40">
              <span className="text-[10px] text-hud-muted block">ORDERS SYNC</span>
              <span className="text-base font-bold text-cyber-red mt-1 block">+350</span>
            </div>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase shadow-xl flex items-center gap-1.5">
            EXPAND DEEP DIVE <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Bottom Footer: Tagline + Tech Tags + Number */}
      <div className="relative z-10 pt-3 flex items-end justify-between border-t border-[#0b0e1a]/15 text-[#0b0e1a]">
        <div className="flex flex-col gap-1 max-w-[75%]">
          <p className="font-mono text-xs font-medium line-clamp-1 text-[#0b0e1a]">
            {tagline}
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#0b0e1a]/70">
            <span>{techStack[0]}</span>
            {techStack[1] && (
              <>
                <span>•</span>
                <span>{techStack[1]}</span>
              </>
            )}
            {techStack[2] && (
              <>
                <span>•</span>
                <span>{techStack[2]}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-sm font-bold text-[#0b0e1a]">
          <span>{num}</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
