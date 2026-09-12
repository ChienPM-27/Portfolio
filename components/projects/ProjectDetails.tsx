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
        <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
          // 0{index + 1}
        </span>
        <span className="text-xs font-mono text-zinc-500">
          [{project.period}]
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
          {project.role}
        </span>
      </div>

      <div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          {project.tagline}
        </p>
      </div>

      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
        {project.description}
      </p>

      {/* Metrics (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 py-1">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80"
            >
              <div className="text-xs font-mono text-zinc-500">
                {metric.label}
              </div>
              <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">
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
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-zinc-300"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80"
              >
                {isGithub ? (
                  <Github className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
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