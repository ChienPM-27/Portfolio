import React from "react";
import { ProjectData } from "@/lib/types";
import { Github, ArrowUpRight } from "lucide-react";

interface ProjectDetailsProps {
  project: ProjectData;
  index: number;
  totalProjects?: number;
}

export function ProjectDetails({
  project,
  index,
  totalProjects = 4,
}: ProjectDetailsProps) {
  const currentNum = String(index + 1).padStart(2, "0");
  const totalNum = String(totalProjects).padStart(2, "0");

  return (
    <div className="flex flex-col gap-5 justify-center py-4">
      {/* Category / Number Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
          {currentNum} / {totalNum}
        </span>
        <span className="text-hud-dim text-xs font-mono">•</span>
        <span className="text-xs font-mono text-hud-muted">
          [{project.period}]
        </span>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-light border border-hud-dim/30 text-hud-dim">
          {project.role}
        </span>
      </div>

      {/* Editorial Project Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-[1.0]">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-hud-muted mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-cyber-red text-xs">—</span>
          <span>{project.tagline}</span>
        </p>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-hud-muted leading-relaxed font-normal">
        {project.description}
      </p>

      {/* Performance Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 py-1">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded-lg bg-obsidian-light/80 border border-hud-dim/20 transition-colors hover:border-hud-dim/40"
            >
              <div className="text-[11px] font-mono text-hud-dim">
                {metric.label}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono tracking-tight text-hud-white mt-0.5">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded bg-obsidian-surface text-hud-muted border border-hud-dim/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {project.links.map((link, i) => {
            const isGithub = link.type === "github";
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className={`pill-btn ${
                  isGithub ? "pill-btn-white" : "pill-btn-red"
                } !py-2 !px-4 text-[10px]`}
              >
                {isGithub ? (
                  <Github className="w-3.5 h-3.5" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}