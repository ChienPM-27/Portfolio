"use client";

import React from "react";
import { VisualSceneProps } from "@/lib/types";
import { ShoppingBag, TrendingUp, Package, Layers } from "lucide-react";

export default function Scene({ progress }: VisualSceneProps) {
  const salesCount = Math.round(140 + progress * 210);
  const inventoryUnits = Math.round(840 - progress * 120);
  const revenue = (24.8 + progress * 18.5).toFixed(1);

  // Bars representing monthly sales distribution
  const barHeights = [45, 62, 58, 80, 72, 95, 88];

  return (
    <div
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] p-6 flex flex-col justify-between bg-gradient-to-b from-obsidian-surface/60 to-obsidian-light/80 rounded-xl overflow-hidden font-mono text-xs select-none border border-hud-dim/20"
      data-cursor="project"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-hud-dim/20">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyber-red" />
          <span className="font-semibold text-hud-white">keysmith.admin // telemetry</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
            SYNCED
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-2.5 my-3">
        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center gap-1 text-[10px] text-hud-muted">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> Revenue
          </div>
          <div className="text-sm sm:text-base font-bold text-hud-white mt-1">
            ${revenue}k
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center gap-1 text-[10px] text-hud-muted">
            <Package className="w-3 h-3 text-cyber-red" /> Orders
          </div>
          <div className="text-sm sm:text-base font-bold text-cyber-red mt-1">
            {salesCount}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-obsidian-light/90 border border-hud-dim/20">
          <div className="flex items-center gap-1 text-[10px] text-hud-muted">
            <Layers className="w-3 h-3 text-hud-dim" /> Stock
          </div>
          <div className="text-sm sm:text-base font-bold text-hud-muted mt-1">
            {inventoryUnits}
          </div>
        </div>
      </div>

      {/* Interactive Sales Velocity Histogram */}
      <div className="flex-1 flex flex-col justify-end bg-obsidian/90 p-3.5 rounded-lg border border-hud-dim/20">
        <div className="flex items-center justify-between text-[10px] text-hud-dim mb-3 font-mono">
          <span>SALES VELOCITY (WEEKLY CYCLES)</span>
          <span className="text-cyber-red">AVG CONV: 4.8%</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-24 pt-2">
          {barHeights.map((h, i) => {
            const activeH = Math.min(100, Math.round(h * (0.6 + progress * 0.45)));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    i === 5 ? "bg-cyber-red" : "bg-obsidian-surface hover:bg-hud-dim"
                  }`}
                  style={{ height: `${activeH}%` }}
                />
                <span className="text-[9px] text-hud-dim">W0{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 text-[10px] text-hud-dim border-t border-hud-dim/15">
        <span>Custom Keyboards & Warehouse Ops</span>
        <span className="text-hud-muted">GITHUB PAGES // VERCEL</span>
      </div>
    </div>
  );
}
