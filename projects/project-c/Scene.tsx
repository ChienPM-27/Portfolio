"use client";

import React from "react";
import { VisualSceneProps } from "@/lib/types";
import { Terminal, Activity, Server, Zap } from "lucide-react";

export default function Scene({ progress, isActive }: VisualSceneProps) {
  // Drive telemetry values smoothly via scroll progress
  const vramPercent = Math.min(Math.max(Math.round(40 + progress * 55), 35), 98);
  const throughput = (12.4 + progress * 8.2).toFixed(1);
  const lineCount = Math.min(Math.max(Math.floor(progress * 5), 1), 5);

  const logLines = [
    { id: 1, text: "POST /v1/infer/reconstruct 200 OK (1.82s)", color: "text-emerald-400" },
    { id: 2, text: "CUDA Alloc: 18.4 GB / 24.0 GB (VRAM active)", color: "text-cyan-400" },
    { id: 3, text: "Worker [l4-node-01]: batch dispatch sync", color: "text-zinc-400" },
    { id: 4, text: "YOLO crop & rembg alpha mask completed", color: "text-violet-400" },
    { id: 5, text: "Streaming 3D mesh GLB stream to client", color: "text-emerald-400" },
  ];

  return (
    <div className="w-full h-full min-h-[360px] p-6 flex flex-col justify-between bg-zinc-950 font-mono text-xs select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal className="w-4 h-4 text-violet-400" />
          <span className="font-semibold text-zinc-200">gpu-daemon@cloud-l4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-zinc-500">ONLINE</span>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> VRAM Load
            </span>
            <span className="text-cyan-400 font-bold">{vramPercent}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${vramPercent}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-violet-400" /> Throughput
            </span>
            <span className="text-violet-400 font-bold">{throughput} req/s</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-violet-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(Number(throughput) * 4.5, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streaming Log View */}
      <div className="flex-1 flex flex-col justify-end space-y-1.5 text-[11px] bg-black/40 p-3 rounded-lg border border-zinc-900">
        {logLines.slice(0, lineCount).map((log) => (
          <div key={log.id} className="flex items-center gap-2">
            <span className="text-zinc-600">»</span>
            <span className={log.color}>{log.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 text-[10px] text-zinc-500">
        <span>Google Cloud VM • NVIDIA L4 (24GB)</span>
        <span className="text-violet-400/80">UI TELEMETRY MOCKUP</span>
      </div>
    </div>
  );
}