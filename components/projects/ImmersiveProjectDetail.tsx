"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/projects/registry";
import { useProjectDetail } from "@/lib/project-detail-context";
import { useVirtualScrollSteps } from "@/lib/hooks/useVirtualScrollSteps";
import { isReducedMotionPreferred, clamp } from "@/lib/scroll-utils";
import { ProjectDetailSection } from "@/lib/types";
import { ProjectDetailModal } from "./ProjectDetailModal";
import gsap from "gsap";
import { X, ChevronUp, ChevronDown, Github, ArrowUpRight } from "lucide-react";

type Panel =
  | { kind: "overview" }
  | { kind: "section"; section: ProjectDetailSection; index: number };

function formatInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-obsidian-surface text-hud-white font-mono text-xs border border-hud-dim/30 text-cyber-red/90"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ImmersiveProjectDetail() {
  const { activeSlug, closeProject } = useProjectDetail();
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const isAnimatingExitRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(isReducedMotionPreferred());
  }, []);

  const activeProject = useMemo(() => {
    if (!activeSlug) return null;
    return projects.find((p) => p.data.slug === activeSlug) ?? null;
  }, [activeSlug]);

  const panels: Panel[] = useMemo(() => {
    if (!activeProject) return [];
    return [
      { kind: "overview" },
      ...(activeProject.data.detailSections ?? []).map((section, index) => ({
        kind: "section" as const,
        section,
        index,
      })),
    ];
  }, [activeProject]);

  const totalSteps = panels.length;
  const isOpen = !!activeProject && totalSteps > 0;

  // Run smooth exit transition (scale down + blur + fade out)
  const runExitTransition = useCallback(
    (direction?: "top" | "bottom") => {
      console.log("[ImmersiveDetail] runExitTransition triggered, dir:", direction);
      if (isAnimatingExitRef.current) return;
      isAnimatingExitRef.current = true;

      const overlay = overlayRef.current;
      const content = contentWrapperRef.current;

      if (!overlay || !content) {
        document.body.style.overflow = "";
        closeProject();
        isAnimatingExitRef.current = false;
        return;
      }

      let completed = false;
      const finish = () => {
        if (completed) return;
        completed = true;
        document.body.style.overflow = "";
        closeProject();
        isAnimatingExitRef.current = false;
      };

      const yOffset = direction === "top" ? -40 : 40;
      try {
        const tl = gsap.timeline({
          onComplete: finish,
        });

        tl.to(content, {
          scale: 0.93,
          opacity: 0,
          y: yOffset,
          duration: 0.45,
          ease: "power2.inOut",
        }).to(
          overlay,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2"
        );

        setTimeout(finish, 650);
      } catch (err) {
        finish();
      }
    },
    [closeProject]
  );

  const {
    displayedProgress,
    currentStepIndex,
    goToStep,
    nextStep,
    prevStep,
  } = useVirtualScrollSteps({
    totalSteps,
    isOpen,
    onExit: runExitTransition,
  });

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen || !activeProject) return null;

  // Accessibility fallback: if user prefers reduced motion, render standard modal
  if (reducedMotion) {
    return (
      <ProjectDetailModal
        project={activeProject.data}
        isOpen={true}
        onClose={closeProject}
      />
    );
  }

  const project = activeProject.data;
  const currentStepNum = String(currentStepIndex + 1).padStart(2, "0");
  const totalStepsNum = String(totalSteps).padStart(2, "0");
  const isLastStep = currentStepIndex === totalSteps - 1;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian/95 backdrop-blur-md select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} - Interactive System Design`}
    >
      {/* Top HUD Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-hud-dim/20 bg-obsidian-light/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-cyber-red tracking-widest uppercase">
            // SYSTEM ARCHITECTURE
          </span>
          <span className="text-hud-dim text-xs font-mono">•</span>
          <h2 className="font-display text-sm sm:text-base tracking-[0.1em] uppercase font-semibold text-hud-white">
            {project.title}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-muted">
            <span className="text-cyber-red font-semibold">{currentStepNum}</span>
            <span className="text-hud-dim">/</span>
            <span>{totalStepsNum}</span>
          </div>

          <button
            type="button"
            onClick={() => runExitTransition("top")}
            aria-label="Close interactive view"
            data-cursor="pointer"
            className="rounded-full p-2 text-hud-muted hover:text-hud-white hover:bg-obsidian-surface border border-hud-dim/20 hover:border-cyber-red/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area (Cross-fade Panels Container) */}
      <main className="relative flex-1 flex items-center justify-center p-6 sm:p-12 overflow-hidden">
        <div
          ref={contentWrapperRef}
          className="relative w-full max-w-4xl min-h-[460px] flex items-center justify-center"
        >
          {panels.map((panel, idx) => {
            let diff = displayedProgress - idx;
            // Prevent first and last panels from fading to blank when overscrolling towards exit
            if (idx === 0 && diff < 0) diff = 0;
            if (idx === totalSteps - 1 && diff > 0) diff = 0;

            // Cross-fade opacity curve
            const opacity = clamp(1 - Math.abs(diff) * 1.35, 0, 1);
            // Subtle translateY for depth
            const translateY = diff * -30;
            const isVisible = opacity > 0.01;
            const isInteractive = Math.abs(diff) < 0.45;

            if (!isVisible) return null;

            return (
              <div
                key={idx}
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  pointerEvents: isInteractive ? "auto" : "none",
                }}
                className="absolute inset-0 flex flex-col justify-center will-change-transform"
              >
                {panel.kind === "overview" ? (
                  // Panel 0: Overview
                  <div className="p-8 sm:p-10 rounded-2xl bg-obsidian-light/80 border border-hud-dim/30 shadow-2xl backdrop-blur-md flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
                        STEP 01 // OVERVIEW
                      </span>
                      <span className="text-hud-dim text-xs font-mono">•</span>
                      <span className="text-xs font-mono text-hud-muted">
                        [{project.period}]
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-surface border border-hud-dim/30 text-hud-muted">
                        {project.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base font-mono text-hud-muted mt-2 flex items-center gap-2">
                        <span className="text-cyber-red text-xs">—</span>
                        <span>{project.tagline}</span>
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-hud-white/90 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Metrics Grid */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                        {project.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="px-4 py-3 rounded-xl bg-obsidian-surface/80 border border-hud-dim/20"
                          >
                            <div className="text-[11px] font-mono text-hud-dim">
                              {m.label}
                            </div>
                            <div className="text-base sm:text-lg font-bold font-mono text-cyber-red mt-0.5">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-obsidian-surface text-hud-muted border border-hud-dim/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Panel 1..N: System Architecture Section
                  <div className="p-8 sm:p-10 rounded-2xl bg-obsidian-light/80 border border-hud-dim/30 shadow-2xl backdrop-blur-md flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider uppercase">
                        STEP {String(idx + 1).padStart(2, "0")} // ARCHITECTURE LAYER
                      </span>
                      <span className="text-hud-dim text-xs font-mono">•</span>
                      <span className="text-xs font-mono text-hud-muted">
                        SUB-SYSTEM {idx}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-tight">
                      {panel.section.heading}
                    </h3>

                    <ul className="flex flex-col gap-3 py-2">
                      {panel.section.points.map((pt, pIdx) => (
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

                    {/* Tech Context Footer for Section */}
                    <div className="pt-4 border-t border-hud-dim/20 flex items-center justify-between text-xs font-mono text-hud-dim">
                      <span>
                        Layer {idx} of {totalSteps - 1} Architecture Breakdown
                      </span>
                      <span className="text-hud-muted">
                        {idx === totalSteps - 1 ? "End of Pipeline" : "Continuous Flow"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Right Rail: Step Dots & Navigation Arrows */}
      <aside className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 bg-obsidian-light/70 p-2 rounded-full border border-hud-dim/20 backdrop-blur-sm">
        <button
          type="button"
          onClick={prevStep}
          aria-label="Previous step"
          data-cursor="pointer"
          className="p-1.5 text-hud-muted hover:text-cyber-red transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-2 py-1">
          {panels.map((_, i) => {
            const isActive = currentStepIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goToStep(i)}
                aria-label={`Jump to step ${i + 1}`}
                data-cursor="pointer"
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-cyber-red shadow-[0_0_8px_rgba(230,30,30,0.8)]"
                    : "w-1.5 h-1.5 bg-hud-dim/40 hover:bg-hud-white"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={nextStep}
          aria-label="Next step"
          data-cursor="pointer"
          className="p-1.5 text-hud-muted hover:text-cyber-red transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </aside>

      {/* Bottom HUD Footer */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-4 border-t border-hud-dim/20 bg-obsidian-light/60 backdrop-blur-sm gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-hud-dim">
          <span className="animate-pulse text-cyber-red font-bold">●</span>
          <span>
            {isLastStep
              ? "[↓ SCROLL DOWN TO EXIT TO PORTFOLIO]"
              : "[↓ SCROLL / SWIPE TO ADVANCE PIPELINE]"}
          </span>
        </div>

        {/* Project Links */}
        <div className="flex items-center gap-3">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
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
      </footer>
    </div>,
    document.body
  );
}
