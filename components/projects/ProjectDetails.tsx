import React from "react";
import { ProjectData } from "@/lib/types";
import { ExternalLink, Github, FileText, ArrowUpRight } from "lucide-react";

interface ProjectDetailsProps {
  project: ProjectData;
  index: number;
}

export function ProjectDetails({ project, index }: ProjectDetailsProps) {
  return (
    <div className="flex flex-col gap-5 justify-center py-6">
      <div className="flex items-center gap-3">
        <span className="font-display text-sm tracking-[0.2em] uppercase text-cyber-red font-semibold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs font-mono text-hud-dim">
          [{project.period}]
        </span>
        <span className="text-xs font-display tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full bg-obsidian-light border border-hud-dim/30 text-hud-muted">
          {project.role}
        </span>
      </div>

      <div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-[0.06em] uppercase text-hud-white">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-hud-muted mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="text-cyber-red text-xs">—</span>
          <span>{project.tagline}</span>
        </p>
      </div>

      <p className="text-sm sm:text-base text-hud-muted leading-relaxed font-normal">
        {project.description}
      </p>

      {/* Metrics (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 py-1">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="px-3.5 py-2.5 rounded-lg bg-obsidian-light/80 border border-hud-dim/20 transition-colors hover:border-cyber-red/30"
            >
              <div className="text-xs font-mono text-hud-dim">
                {metric.label}
              </div>
              <div className="text-base sm:text-lg font-bold font-display tracking-wider text-cyber-red mt-0.5">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-obsidian-light border border-hud-dim/20 text-hud-muted hover:text-hud-white hover:border-cyber-red/30 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
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