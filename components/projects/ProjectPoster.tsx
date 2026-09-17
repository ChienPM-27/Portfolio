"use client";

import React from "react";
import { ProjectData } from "@/lib/types";
import { Box, Scan, Terminal, Activity, Layers, Cpu } from "lucide-react";

interface ProjectPosterProps {
  project: ProjectData;
  index: number;
}

/**
 * High-performance, zero-WebGL static poster for project thumbnails.
 * Eliminates GPU context thrashing and 60fps render loop overhead in carousels.
 */
export function ProjectPoster({ project, index }: ProjectPosterProps) {
  const { slug } = project;

  // Render dedicated visual graphic based on project slug
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-obsidian via-obsidian-light/90 to-obsidian-surface/60 overflow-hidden font-mono select-none">
      {/* Subtle Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Telemetry Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-pulse" />
          <span className="text-[10px] tracking-widest text-hud-muted uppercase">
            // SPEC-{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded border border-hud-dim/40 bg-obsidian-surface/60 text-hud-white uppercase tracking-wider">
          ARCHIVED MESH
        </span>
      </div>

      {/* Center Dynamic Vector Graphic */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        {slug === "project-3d-reconstruction" ? (
          // 3D Watertight Mesh Geometric Wireframe
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full text-hud-white/80">
              {/* Isometric 3D Hexagon / Polyhedron Wireframe */}
              <polygon
                points="80,15 140,50 140,115 80,150 20,115 20,50"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="opacity-40"
              />
              <line x1="80" y1="15" x2="80" y2="82" stroke="currentColor" strokeWidth="1.2" />
              <line x1="140" y1="50" x2="80" y2="82" stroke="currentColor" strokeWidth="1.2" />
              <line x1="20" y1="50" x2="80" y2="82" stroke="currentColor" strokeWidth="1.2" />
              <line x1="80" y1="82" x2="80" y2="150" stroke="currentColor" strokeWidth="1.2" />
              <line x1="80" y1="82" x2="140" y2="115" stroke="currentColor" strokeWidth="1.2" />
              <line x1="80" y1="82" x2="20" y2="115" stroke="currentColor" strokeWidth="1.2" />
              {/* Central Keypoints */}
              <circle cx="80" cy="82" r="3" fill="#e61e1e" className="animate-ping origin-center" />
              <circle cx="80" cy="82" r="3" fill="#e61e1e" />
              <circle cx="80" cy="15" r="2" fill="currentColor" />
              <circle cx="140" cy="50" r="2" fill="currentColor" />
              <circle cx="20" cy="50" r="2" fill="currentColor" />
              <circle cx="80" cy="150" r="2" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[9px] tracking-widest text-cyber-red/90 bg-obsidian/80 px-2 py-0.5 rounded border border-cyber-red/30">
                WATERTIGHT GLB
              </span>
            </div>
          </div>
        ) : slug === "project-vision-segmentation" ? (
          // Computer Vision Bounding Box & Contour
          <div className="relative w-40 h-28 border border-cyber-red/50 rounded bg-cyber-red/5 flex flex-col justify-between p-2">
            <div className="flex items-center justify-between text-[9px] text-cyber-red">
              <span className="font-bold">[ YOLO: CHAIR 98.4% ]</span>
              <span>IoU: 0.98</span>
            </div>
            {/* Target Reticle in Center */}
            <div className="my-auto flex items-center justify-center">
              <Scan className="w-8 h-8 text-hud-white/70" />
            </div>
            <div className="flex justify-between text-[8px] text-hud-muted">
              <span>X: 142 Y: 86</span>
              <span>W: 320 H: 240</span>
            </div>
          </div>
        ) : slug === "project-cloud-inference" ? (
          // GPU Telemetry & Server Matrix
          <div className="w-full max-w-[240px] flex flex-col gap-2 p-3 rounded-lg bg-obsidian-surface/80 border border-hud-dim/30">
            <div className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1.5 text-hud-white font-semibold">
                <Cpu className="w-3.5 h-3.5 text-cyber-red" /> L4 GPU VM
              </span>
              <span className="text-emerald-400 font-bold">18.4 / 24 GB</span>
            </div>
            <div className="w-full bg-obsidian h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyber-red h-full rounded-full w-[76%]" />
            </div>
            <div className="flex justify-between text-[9px] text-hud-muted pt-1">
              <span>LATENCY: 28ms</span>
              <span>BATCH: SYNC</span>
            </div>
          </div>
        ) : (
          // KeySmith Telemetry Stats
          <div className="w-full max-w-[240px] grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded bg-obsidian-surface/80 border border-hud-dim/30">
              <span className="text-[9px] text-hud-muted block">SYNC REVENUE</span>
              <span className="text-sm font-bold text-hud-white mt-0.5 block">$43.3k</span>
            </div>
            <div className="p-2.5 rounded bg-obsidian-surface/80 border border-hud-dim/30">
              <span className="text-[9px] text-hud-muted block">TOTAL ORDERS</span>
              <span className="text-sm font-bold text-cyber-red mt-0.5 block">+350</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-hud-dim/20 text-[9px] text-hud-muted">
        <span>ENGINEERING ARCHITECTURE</span>
        <span className="text-hud-white font-semibold uppercase tracking-wider group-hover:text-cyber-red transition-colors">
          EXPLORE DEEP DIVE &rarr;
        </span>
      </div>
    </div>
  );
}
