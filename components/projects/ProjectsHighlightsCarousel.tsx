"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { projects } from "@/projects/registry";
import { useProjectDetail } from "@/lib/project-detail-context";
import { ProjectPoster } from "./ProjectPoster";
import { prefetchProjectDetail } from "./LazyProjectDetail";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SHORT_PILL_NAMES: Record<string, string> = {
  "sign-language-islr": "ISLR",
  "remora-production": "REMORA",
  brewlite: "BREWLITE",
};

export function ProjectsHighlightsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const { openProject } = useProjectDetail();

  const hasMovedRef = useRef(false);

  const scrollToCard = useCallback((idx: number) => {
    const st =
      ScrollTrigger.getById("projects-highlights-st") ??
      scrollTriggerRef.current;
    if (!st) return;
    const clampedIdx = Math.min(Math.max(idx, 0), projects.length - 1);
    const targetProgress =
      projects.length <= 1
        ? 0.3
        : 0.28 + (clampedIdx / (projects.length - 1)) * 0.54;
    const targetY = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const titleWrapper = titleWrapperRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const thumb = thumbRef.current;
      if (!container || !titleWrapper || !cardsWrapper || !track || !viewport)
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-highlights-st",
          trigger: container,
          start: "top top",
          end: "+=1100",
          pin: true,
          pinSpacing: true,
          scrub: 0.2,
          anticipatePin: 1,
          refreshPriority: 10,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.28) {
              setActiveIndex(1);
            } else {
              const cardP = Math.min(Math.max((p - 0.28) / 0.58, 0), 1);
              const idx = Math.min(
                Math.max(Math.floor(cardP * projects.length) + 1, 1),
                projects.length
              );
              setActiveIndex(idx);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // PHASE 1 (0 to 0.28): Title fades & sweeps left, then cards stagger in
      tl.to(
        titleWrapper,
        {
          x: () => -Math.max(window.innerWidth * 0.6, 750),
          autoAlpha: 0,
          ease: "power2.in",
          duration: 0.12,
        },
        0
      );

      tl.fromTo(
        cardsWrapper,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "power1.out",
          duration: 0.1,
        },
        0.08
      );

      tl.fromTo(
        ".telemetry-hud",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
        0.1
      );

      tl.fromTo(
        ".highlight-card",
        {
          x: -70,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          ease: "power2.out",
          duration: 0.16,
        },
        0.1
      );

      // PHASE 2 (0.28 to 0.86): Scrub horizontal track across the 3 cards
      tl.to(
        track,
        {
          x: () => {
            const maxScroll = track.scrollWidth - (viewport?.clientWidth || 0);
            return maxScroll > 0 ? -maxScroll - 48 : 0;
          },
          ease: "none",
          duration: 0.58,
        },
        0.28
      );

      if (thumb) {
        tl.to(
          thumb,
          {
            x: () =>
              Math.max(
                0,
                (thumb.parentElement?.clientWidth ?? 192) - thumb.clientWidth
              ),
            ease: "none",
            duration: 0.58,
          },
          0.28
        );
      }

      // PHASE 3 (0.88 to 1.0): Cards layer fades out cleanly before unpinning
      tl.to(
        cardsWrapper,
        {
          autoAlpha: 0,
          y: -40,
          ease: "power2.in",
          duration: 0.1,
        },
        0.88
      );

      tl.to({}, { duration: 0.02 }, 0.98);
    },
    { scope: containerRef }
  );

  // Unified Mouse Drag & Touch Swipe
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let startScrollY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      hasMovedRef.current = false;
      startX = e.pageX;
      startScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 6) {
        hasMovedRef.current = true;
      }
      window.scrollTo({
        top: startScrollY - dx * 2.0,
        behavior: "instant" as ScrollBehavior,
      });
    };

    const onMouseUp = () => {
      isDown = false;
    };

    let touchStartX = 0;
    let touchStartScrollY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].pageX;
      touchStartScrollY = window.scrollY;
      hasMovedRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].pageX - touchStartX;
      if (Math.abs(dx) > 8) {
        hasMovedRef.current = true;
        window.scrollTo({
          top: touchStartScrollY - dx * 2.0,
          behavior: "instant" as ScrollBehavior,
        });
      }
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full bg-obsidian border-t border-hud-dim/20 z-20"
    >
      <div
        id="projects-highlights"
        className="absolute top-0 left-0 pointer-events-none"
      />
      {/* Pinned Stage Viewport */}
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-radial from-obsidian-surface/30 via-obsidian to-obsidian pointer-events-none"
          aria-hidden="true"
        />

        {/* LAYER 1: Title in Center */}
        <div
          ref={titleWrapperRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10 select-none"
        >
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyber-red uppercase mb-4 font-semibold">
            // 02 HIGHLIGHTS
          </span>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tight text-hud-white leading-[0.88]">
            Featured
          </h2>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tight text-hud-muted/50 leading-[0.88] mt-2">
            Projects
          </h2>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs tracking-widest text-hud-muted uppercase">
            <span className="w-8 h-[1px] bg-hud-dim/40" />
            <span>SCROLL DOWN TO REVEAL</span>
            <span className="text-cyber-red">&darr;</span>
            <span className="w-8 h-[1px] bg-hud-dim/40" />
          </div>
        </div>

        {/* LAYER 2: Cards Layer */}
        <div
          ref={cardsWrapperRef}
          className="relative z-20 w-full h-full flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-10"
        >
          {/* Top Telemetry Header inside Pinned Stage */}
          <div className="telemetry-hud max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 px-4 z-30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-hud-white uppercase font-semibold">
                FEATURED PROJECTS // HIGHLIGHTS
              </span>
            </div>

            {/* Project Quick-Selector Pills */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-[10px]">
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx + 1;
                const shortLabel =
                  SHORT_PILL_NAMES[proj.slug] ??
                  proj.title.split(" ")[0].toUpperCase();
                return (
                  <button
                    key={proj.slug}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    data-cursor="pointer"
                    className={`px-2.5 py-1 rounded-full border transition-colors ${
                      isActive
                        ? "border-cyber-red bg-cyber-red/20 text-hud-white"
                        : "border-hud-dim/30 bg-obsidian-surface/60 text-hud-muted hover:text-hud-white hover:border-hud-dim/60"
                    }`}
                  >
                    0{idx + 1} {shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Drag / Prev-Next Controls */}
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-hud-white uppercase select-none">
              <span className="hidden sm:inline font-semibold text-cyber-red mr-1">
                DRAG OR CLICK
              </span>
              <button
                type="button"
                onClick={() => scrollToCard(Math.max(0, activeIndex - 2))}
                disabled={activeIndex <= 1}
                aria-label="Previous project"
                data-cursor="pointer"
                className="p-1.5 rounded-full border border-hud-dim/30 bg-obsidian-surface/70 text-hud-white hover:border-cyber-red/60 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  scrollToCard(Math.min(projects.length - 1, activeIndex))
                }
                disabled={activeIndex >= projects.length}
                aria-label="Next project"
                data-cursor="pointer"
                className="p-1.5 rounded-full border border-hud-dim/30 bg-obsidian-surface/70 text-hud-white hover:border-cyber-red/60 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Horizontal Carousel Viewport */}
          <div
            ref={viewportRef}
            data-cursor="drag"
            className="relative w-full my-auto overflow-x-visible scrollbar-none cursor-grab active:cursor-grabbing select-none py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              ref={trackRef}
              className="flex items-center gap-8 sm:gap-12 w-max px-6 sm:px-12 py-2 will-change-transform"
            >
              {projects.map((proj, idx) => (
                <article
                  key={proj.slug}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open deep dive for ${proj.title}`}
                  onClick={() => {
                    if (!hasMovedRef.current) {
                      openProject(proj.slug);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openProject(proj.slug);
                    }
                  }}
                  className="highlight-card group relative w-[330px] sm:w-[460px] md:w-[540px] lg:w-[580px] h-[470px] sm:h-[510px] md:h-[530px] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-red"
                >
                  <ProjectPoster
                    project={proj}
                    index={idx}
                    onPrefetch={prefetchProjectDetail}
                  />
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar & Slide Counter */}
          <div className="telemetry-hud max-w-7xl mx-auto w-full flex items-center justify-between px-4 flex-shrink-0">
            <div className="relative w-48 sm:w-64 h-[2px] bg-hud-dim/30 rounded-full overflow-hidden">
              <div
                ref={thumbRef}
                className="absolute top-0 left-0 w-12 h-full bg-cyber-red rounded-full will-change-transform"
              />
            </div>

            <div className="font-mono text-xs tracking-widest text-hud-muted">
              <span className="text-hud-white font-bold">0{activeIndex}</span> / 0
              {projects.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
