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
        <span className="font-mono text-xs accent-gradient-text font-semibold tracking-wider">
          // 0{index + 1}
        </span>
        <span className="text-xs font-mono text-text-muted">
          [{project.period}]
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-muted border border-stroke text-text-muted">
          {project.role}
        </span>
      </div>

      <div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-text-muted mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="font-serif italic text-base text-zinc-300 font-normal tracking-wide">
            Case Study
          </span>
          <span className="text-stroke">•</span>
          <span>{project.tagline}</span>
        </p>
      </div>

      <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
        {project.description}
      </p>

      {/* Metrics (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 py-1">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="px-3.5 py-2.5 rounded-lg bg-surface/80 border border-stroke transition-colors hover:border-stroke/80"
            >
              <div className="text-xs font-mono text-text-muted">
                {metric.label}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono accent-gradient-text mt-0.5">
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
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-muted border border-stroke text-text-muted hover:text-text hover:border-zinc-700 transition-colors"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all bg-surface border border-stroke text-text hover:text-white hover:border-zinc-600 hover:bg-surface-muted"
              >
                {isGithub ? (
                  <Github className="w-3.5 h-3.5 text-text-muted" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent-start" />
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