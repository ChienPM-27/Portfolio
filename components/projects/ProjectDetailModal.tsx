"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectData } from "@/lib/types";
import { X, Github, ArrowUpRight } from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

function formatInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-obsidian-surface text-hud-white font-mono text-xs border border-hud-dim/30"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while open + allow Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const sections = project.detailSections ?? [];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        data-cursor="pointer"
      />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl border border-hud-dim/30 bg-obsidian-light shadow-2xl animate-[fadeIn_0.25s_ease-out]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-hud-dim/20 bg-obsidian-light/95 backdrop-blur px-6 py-5 sm:px-8">
          <div>
            <p className="text-[11px] font-mono text-cyber-red tracking-wider mb-1">
              SYSTEM DESIGN
            </p>
            <h3
              id="project-detail-title"
              className="font-display text-xl sm:text-2xl font-semibold tracking-[0.03em] uppercase text-hud-white"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-cursor="pointer"
            className="flex-shrink-0 rounded-full p-2 text-hud-muted hover:text-hud-white hover:bg-obsidian-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 sm:px-8 sm:py-8 flex flex-col gap-7">
          {sections.length === 0 && (
            <p className="text-sm text-hud-muted font-mono">
              No detailed breakdown available for this project yet.
            </p>
          )}

          {sections.map((section, i) => (
            <div key={i}>
              <h4 className="text-xs font-mono font-semibold tracking-wider text-cyber-red uppercase mb-3">
                {section.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.points.map((point, j) => (
                  <li
                    key={j}
                    className="text-sm text-hud-muted leading-relaxed flex gap-2.5"
                  >
                    <span className="text-hud-dim mt-1.5 flex-shrink-0">
                      &#9642;
                    </span>
                    <span>{formatInlineCode(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono font-semibold tracking-wider text-cyber-red uppercase mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-obsidian-surface text-hud-muted border border-hud-dim/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
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
      </div>
    </div>,
    document.body
  );
}
