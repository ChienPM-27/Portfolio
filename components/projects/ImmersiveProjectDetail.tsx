"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/projects/registry";
import { useProjectDetail } from "@/lib/project-detail-context";
import { AblationHeatmap, formatInlineCode } from "./AblationHeatmap";
import { X, Github, ArrowUpRight } from "lucide-react";

export function ImmersiveProjectDetail() {
  const { activeSlug, closeProject } = useProjectDetail();
  const [mounted, setMounted] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("overview");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeProject = useMemo(() => {
    if (!activeSlug) return null;
    return projects.find((p) => p.slug === activeSlug) ?? null;
  }, [activeSlug]);

  const sections = useMemo(
    () => activeProject?.detailSections ?? [],
    [activeProject]
  );

  useEffect(() => {
    if (!activeProject) return;
    setActiveSectionId("overview");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeProject();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeProject]);

  const scrollToSection = useCallback((id: string) => {
    setActiveSectionId(id);
    const container = scrollContainerRef.current;
    if (!container) return;
    if (id === "overview") {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = container.querySelector<HTMLElement>(
      `[data-section-id="${id}"]`
    );
    if (target) {
      container.scrollTo({
        top: Math.max(0, target.offsetTop - 24),
        behavior: "smooth",
      });
    }
  }, []);

  if (!mounted || !activeProject) return null;

  const project = activeProject;
  const navItems = [
    { id: "overview", label: "01 Overview" },
    ...sections.map((sec, idx) => ({
      id: `section-${idx}`,
      label: `${String(idx + 2).padStart(2, "0")} ${
        sec.shortTitle ?? sec.heading.split("(")[0].trim()
      }`,
    })),
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#070a14] text-hud-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      {/* Full-Width Sticky Top HUD Header */}
      <header className="flex-shrink-0 border-b border-hud-dim/30 bg-[#0b101d] px-5 sm:px-10 py-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 min-w-0">
              <span className="font-mono text-xs font-semibold text-cyber-red tracking-widest uppercase shrink-0">
                // SYSTEM ARCHITECTURE
              </span>
              <span className="text-hud-dim text-xs font-mono shrink-0">•</span>
              <h2
                id="project-detail-title"
                className="font-display text-lg sm:text-xl tracking-[0.06em] uppercase font-semibold text-hud-white truncate"
              >
                {project.title}
              </h2>
              {project.badge && (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyber-red/15 border border-cyber-red/40 text-hud-white shrink-0">
                  {project.badge.label}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={closeProject}
              aria-label="Close project detail"
              className="flex-shrink-0 rounded-full p-2 text-hud-muted hover:text-hud-white hover:bg-obsidian-surface border border-hud-dim/25 hover:border-cyber-red/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Crisp Section Jump Pills (wrapped, zero horizontal scrollbar) */}
          <nav
            aria-label="Project sections"
            className="flex flex-wrap items-center gap-2"
          >
            {navItems.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider whitespace-nowrap border transition-colors ${
                    isActive
                      ? "bg-cyber-red/20 border-cyber-red text-hud-white font-semibold"
                      : "bg-obsidian-surface/60 border-hud-dim/30 text-hud-muted hover:text-hud-white hover:border-hud-dim/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Spacious Native Scrollable Body */}
      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-10 py-7 sm:py-10 space-y-6">
          {/* Overview Card */}
          <section
            data-section-id="overview"
            className="rounded-2xl bg-[#0e1322] border border-hud-dim/30 p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
                01 // OVERVIEW
              </span>
              <span className="text-hud-dim text-xs font-mono">•</span>
              <span className="text-xs font-mono text-hud-muted">
                [{project.period}]
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-obsidian-surface border border-hud-dim/30 text-hud-white/90">
                {project.role}
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-tight">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base font-mono text-hud-muted mt-2 flex items-start gap-2">
                <span className="text-cyber-red text-xs mt-1">—</span>
                <span>{project.tagline}</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-hud-white/90 leading-relaxed">
              {project.description}
            </p>

            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="px-4 py-3.5 rounded-xl bg-[#141a2d] border border-hud-dim/30"
                  >
                    <div className="text-xs font-mono text-hud-muted">
                      {m.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold font-mono text-cyber-red mt-1">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-obsidian-surface text-hud-white/85 border border-hud-dim/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Architecture & Ablation Cards */}
          {sections.map((section, idx) => (
            <section
              key={idx}
              data-section-id={`section-${idx}`}
              className="rounded-2xl bg-[#0e1322] border border-hud-dim/30 p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider uppercase">
                  {String(idx + 2).padStart(2, "0")} // ARCHITECTURE LAYER
                </span>
                <span className="text-hud-dim text-xs font-mono">•</span>
                <span className="text-xs font-mono text-hud-muted">
                  SUB-SYSTEM {idx + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-tight">
                {section.heading}
              </h3>

              {section.matrix && <AblationHeatmap matrix={section.matrix} />}

              <ul className="flex flex-col gap-3">
                {section.points.map((pt, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-sm sm:text-base text-hud-muted leading-relaxed flex items-start gap-3"
                  >
                    <span className="text-cyber-red mt-1.5 flex-shrink-0 text-xs">
                      ▪
                    </span>
                    <span className="text-hud-white/90">
                      {formatInlineCode(pt)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* Full-Width Sticky Bottom HUD Footer */}
      <footer className="flex-shrink-0 border-t border-hud-dim/30 bg-[#0b101d] px-5 sm:px-10 py-3.5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] text-hud-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-red" />
            <span>SCROLL TO READ FULL ARCHITECTURE • ESC TO CLOSE</span>
          </div>

          <div className="flex items-center gap-3">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn-white !py-1.5 !px-3.5 text-[10px]"
              >
                {link.type === "github" ? (
                  <Github className="w-3.5 h-3.5" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>,
    document.body
  );
}
