"use client";

import React from "react";
import { ProjectData, ProjectVisual } from "@/lib/types";
import { signLanguageData } from "@/projects/sign-language-islr/data";
import { getHeatmapCellClass } from "./heatmap-utils";
import {
  ArrowUpRight,
  Database,
  ShieldCheck,
  GitBranch,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ProjectPosterProps {
  project: ProjectData;
  index: number;
  onPrefetch?: () => void;
}

const BADGE_STYLES: Record<
  NonNullable<ProjectData["badge"]>["tone"],
  { pill: string; dot: string; hairline: string }
> = {
  research: {
    pill: "border-cyber-red/50 bg-cyber-red/15 text-[#ff6b6b]",
    dot: "bg-cyber-red",
    hairline: "from-cyber-red via-cyber-red/50 to-transparent",
  },
  award: {
    pill: "border-amber-400/50 bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400",
    hairline: "from-amber-400 via-amber-400/50 to-transparent",
  },
  live: {
    pill: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400",
    hairline: "from-emerald-400 via-emerald-400/50 to-transparent",
  },
};

function AblationMiniVisual() {
  const matrix = signLanguageData.detailSections?.[0]?.matrix;
  if (!matrix) return null;
  const [hlRow, hlCol] = matrix.highlight ?? [0, 4];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between gap-2">
      <div className="flex items-center justify-between text-[9px] font-mono text-hud-muted">
        <span className="uppercase tracking-wider">6 Models × 7 Landmark Subsets</span>
        <span className="text-[#ff6b6b] font-semibold">Val Macro-F1 (%)</span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-8 gap-1 items-center font-mono text-[8px] sm:text-[9px] text-hud-dim">
        <span className="text-left pl-0.5">ARCH</span>
        {matrix.columns.map((col) => (
          <span key={col} className="text-center font-semibold text-hud-muted">
            {col}
          </span>
        ))}
      </div>

      {/* 6x7 Matrix Cells */}
      <div className="flex flex-col gap-1 my-auto">
        {matrix.rows.map((row, rIdx) => (
          <div
            key={row.key}
            className="grid grid-cols-8 gap-1 items-center font-mono text-[8px] sm:text-[9px] tabular-nums"
          >
            <span className="text-left truncate font-semibold text-hud-white/90 pr-1">
              {row.key}
            </span>
            {row.values.map((val, cIdx) => {
              const isHighlighted = rIdx === hlRow && cIdx === hlCol;
              return (
                <span
                  key={cIdx}
                  className={`py-1 rounded-[3px] text-center border leading-none ${getHeatmapCellClass(
                    val,
                    isHighlighted
                  )}`}
                >
                  {val.toFixed(1)}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Winner Callout Footer */}
      <div className="flex items-center justify-between pt-1.5 border-t border-white/10 font-mono text-[9px]">
        <span className="text-hud-white font-semibold truncate">
          WINNER: <span className="text-cyber-red">T0__HF</span> • VAL 76.52%
        </span>
        <span className="text-emerald-400 font-semibold shrink-0">
          TEST 87.30%
        </span>
      </div>
    </div>
  );
}

function MemoryFlowVisual() {
  const steps = [
    { id: "01", title: "SAVE + INTENT", sub: "Room SQLite", icon: Database },
    { id: "02", title: "COSINE TOP-15", sub: "Zero-LLM Filter", icon: Cpu },
    {
      id: "03",
      title: "GEMINI RESURFACE",
      sub: "Rel > 0.80 Gate",
      icon: Sparkles,
    },
    {
      id: "04",
      title: "CITED CHAT",
      sub: "Verified Sources",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between gap-2.5">
      <div className="flex items-center justify-between text-[9px] font-mono">
        <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/35 text-emerald-300">
          ON-DEVICE ROOM
        </span>
        <span className="text-hud-dim">──▶</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/35 text-amber-300">
          KTOR + GEMINI 2.5
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="p-2.5 rounded bg-[#121829]/90 border border-white/10 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between font-mono text-[9px]">
                <span className="text-amber-400 font-bold">{step.id}</span>
                <Icon className="w-3 h-3 text-hud-muted" />
              </div>
              <div className="font-mono text-[10px] font-semibold text-hud-white tracking-tight">
                {step.title}
              </div>
              <div className="font-mono text-[9px] text-hud-dim truncate">
                {step.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-white/10 font-mono text-[9px]">
        <span className="text-hud-muted truncate">
          100% LOCAL MEDIA / OCR / CHAT
        </span>
        <span className="text-amber-300 font-semibold shrink-0">
          3-RETRY WORKER
        </span>
      </div>
    </div>
  );
}

function CiPipelineVisual() {
  const tiers = [
    { layer: "NEXT.JS 15 PWA", target: "VERCEL EDGE CDN", badge: "< 10s ROLLBACK" },
    { layer: "NESTJS 11 API", target: "RENDER + VNPAY", badge: "RBAC + PRISMA" },
    { layer: "POSTGRES 16", target: "SUPABASE SINGAPORE", badge: "PITR ENABLED" },
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between gap-2.5">
      <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-400/30 font-mono text-[9px]">
        <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
          <GitBranch className="w-3 h-3" />
          GH ACTIONS CI/CD
        </span>
        <span className="flex items-center gap-1 text-emerald-300 font-bold">
          <CheckCircle2 className="w-3 h-3" />
          22/22 FRs PASS
        </span>
      </div>

      <div className="flex flex-col gap-1.5 my-auto">
        {tiers.map((tier) => (
          <div
            key={tier.layer}
            className="flex items-center justify-between px-2.5 py-2 rounded bg-[#121829]/90 border border-white/10 font-mono text-[9px]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-hud-white font-semibold truncate">
                {tier.layer}
              </span>
            </div>
            <span className="text-hud-dim mx-1 hidden sm:inline">→</span>
            <span className="text-emerald-300/90 font-medium truncate">
              {tier.target}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-white/10 font-mono text-[9px]">
        <span className="text-hud-muted truncate">
          UNIT + PG INT + PLAYWRIGHT E2E
        </span>
        <span className="text-emerald-300 font-semibold shrink-0">
          HTTPS LIVE
        </span>
      </div>
    </div>
  );
}

function renderCardVisual(visual: ProjectVisual) {
  switch (visual) {
    case "ablation-matrix":
      return <AblationMiniVisual />;
    case "memory-flow":
      return <MemoryFlowVisual />;
    case "ci-pipeline":
      return <CiPipelineVisual />;
  }
}

/**
 * Dark Obsidian Architectural HUD Card.
 * Isolated with CSS containment (`contain: layout style paint`) to avoid
 * page-wide reflows on hover and interaction.
 */
export function ProjectPoster({
  project,
  index,
  onPrefetch,
}: ProjectPosterProps) {
  const { title, category, badge, tagline, techStack, kpis, visual } = project;
  const num = String(index + 1).padStart(2, "0");
  const tone = badge?.tone ?? "research";
  const badgeStyle = BADGE_STYLES[tone];

  const visibleTech = techStack.slice(0, 3);
  const overflowCount = Math.max(0, techStack.length - visibleTech.length);

  return (
    <div
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      className="relative w-full h-full flex flex-col justify-between bg-gradient-to-b from-[#13192b] to-[#0d111d] text-hud-white p-5 sm:p-6 select-none overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/25 transition-colors duration-300"
      style={{
        clipPath: "polygon(0 28px, 28px 0, 100% 0, 100% 100%, 0 100%)",
        contain: "layout style paint",
      }}
    >
      {/* Top Semantic Accent Hairline */}
      <div
        className={`absolute top-0 left-7 right-0 h-[2px] bg-gradient-to-r ${badgeStyle.hairline}`}
        aria-hidden="true"
      />

      {/* Top-left Chamfer Corner Line */}
      <svg
        className="absolute top-0 left-0 w-8 h-8 text-white/20 pointer-events-none"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="28"
          x2="28"
          y2="0"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* Zone 1: Top Meta Row */}
      <div className="relative z-10 flex items-center justify-between gap-2 pl-4">
        <div className="flex items-center gap-2 min-w-0 font-mono text-[10px] tracking-wider uppercase text-hud-muted">
          <span className="text-cyber-red font-bold">// {num}</span>
          <span className="text-hud-dim">•</span>
          <span className="truncate">{category}</span>
        </div>

        {badge && (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-[9px] font-semibold uppercase tracking-wider shrink-0 ${badgeStyle.pill}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
            {badge.label}
          </span>
        )}
      </div>

      {/* Zone 2: Title & Tagline */}
      <div className="relative z-10 mt-3 mb-3">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-hud-white leading-[0.98] group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="font-mono text-[11px] text-hud-muted mt-1.5 line-clamp-2 leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* Zone 3: Custom Data-Driven Visual Stage */}
      <div className="relative flex-1 min-h-[190px] w-full rounded-md bg-[#090d18] border border-white/10 p-3.5 overflow-hidden flex flex-col justify-between">
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {renderCardVisual(visual)}

        {/* Unobtrusive Hover Deep-Dive Pill */}
        <div className="pointer-events-none absolute right-2.5 bottom-2.5 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#0b0e1a] font-mono text-[9px] font-bold uppercase tracking-wider shadow-lg">
            INSPECT DEEP DIVE
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Zone 4: 3-Column KPI Strip + Tech Footer */}
      <div className="relative z-10 mt-3 flex flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2">
          {kpis.slice(0, 3).map((kpi) => (
            <div
              key={kpi.label}
              className="px-2.5 py-2 rounded bg-[#090d18]/90 border border-white/10 flex flex-col justify-between"
            >
              <span className="font-mono text-xs sm:text-sm font-bold text-hud-white tabular-nums truncate">
                {kpi.value}
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-hud-dim truncate mt-0.5">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden font-mono text-[9px] text-hud-muted">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 truncate max-w-[100px]"
              >
                {tech}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="text-hud-dim shrink-0">+{overflowCount}</span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-hud-white group-hover:text-cyber-red transition-colors shrink-0">
            DEEP DIVE
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
