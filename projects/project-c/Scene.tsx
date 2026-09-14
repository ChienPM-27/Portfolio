"use client";

import React from "react";
import { VisualSceneProps } from "@/lib/types";
import { Terminal, Activity, Zap, Cpu } from "lucide-react";

export default function Scene({ progress }: VisualSceneProps) {
  const vramPercent = Math.min(Math.max(Math.round(48 + progress * 46), 40), 96);
  const throughput = (14.2 + progress * 9.6).toFixed(1);
  const latency = Math.max(28, Math.round(52 - progress * 16));
  const lineCount = Math.min(Math.max(Math.floor(progress * 5) + 1, 1), 5);

  const logLines = [
    { id: 1, text: "POST /v1/infer/reconstruct 200 OK (1.82s)", color: "text-emerald-400" },
    { id: 2, text: "CUDA Alloc: 18.4 GB / 24.0 GB (VRAM active)", color: "text-cyber-red" },
    { id: 3, text: "Worker [l4-node-01]: batch dispatch sync", color: "text-hud-white" },
    { id: 4, text: "YOLO crop & rembg alpha mask completed", color: "text-hud-muted" },
    { id: 5, text: "Streaming 3D mesh GLB stream to client", color: "text-emerald-400" },
  ];

  return (
    <div
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] p-6 flex flex-col justify-between bg-gradient-to-b from-obsidian-surface/60 to-obsidian-light/80 rounded-xl overflow-hidden font-mono text-xs select-none border border-hud-dim/20"
      data-cursor="project"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-hud-dim/20">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyber-red" />
          <span className="font-semibold text-hud-white">gpu-daemon@cloud-l4</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-obsidian-surface text-hud-muted">
            PID: 4092
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Real-time Hardware Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 my-3">
        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center justify-between text-hud-muted text-[10px]">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyber-red" /> VRAM
            </span>
            <span className="text-cyber-red font-bold">{vramPercent}%</span>
          </div>
          <div className="w-full bg-obsidian-surface h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-cyber-red h-full rounded-full transition-all duration-300"
              style={{ width: `${vramPercent}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center justify-between text-hud-muted text-[10px]">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-hud-white" /> Throughput
            </span>
            <span className="text-hud-white font-bold">{throughput} r/s</span>
          </div>
          <div className="w-full bg-obsidian-surface h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-hud-white h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(Number(throughput) * 4.2, 100)}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center justify-between text-hud-muted text-[10px]">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-400" /> Latency
            </span>
            <span className="text-emerald-400 font-bold">{latency}ms</span>
          </div>
          <div className="w-full bg-obsidian-surface h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(20, 100 - latency)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streaming Asynchronous Inference Log Window */}
      <div className="flex-1 flex flex-col justify-end space-y-2 text-[11px] bg-obsidian/90 p-3.5 rounded-lg border border-hud-dim/20">
        <div className="text-[10px] text-hud-dim mb-1 font-mono uppercase tracking-wider">
          // ASYNC JOB DISPATCHER LOG
        </div>
        {logLines.slice(0, lineCount).map((log) => (
          <div key={log.id} className="flex items-center gap-2 font-mono">
            <span className="text-cyber-red">»</span>
            <span className={log.color}>{log.text}</span>
          </div>
        ))}
      </div>

      {/* Baseline Infrastructure Footer */}
      <div className="flex items-center justify-between pt-3 text-[10px] text-hud-dim border-t border-hud-dim/15">
        <span>Google Cloud VM • NVIDIA L4 (24GB)</span>
        <span className="text-cyber-red font-medium">FASTAPI // UVICORN</span>
      </div>
    </div>
  );
}