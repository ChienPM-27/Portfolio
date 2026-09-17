"use client";

import React, { useRef, useEffect, useState } from "react";
import { projects } from "@/projects/registry";
import { useProjectDetail } from "@/lib/project-detail-context";
import { ProjectPoster } from "./ProjectPoster";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsHighlightsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const { openProject } = useProjectDetail();

  const hasMovedRef = useRef(false);

  // ScrollTrigger Pin & Scrub Transition:
  // When section hits top of viewport (title is centered in 100vh) -> Pins section ->
  // Phase 1: Scrub down fades title left & reveals cards from left to right ->
  // Phase 2: Continues scrub to glide horizontally across cards ->
  // Phase 3: Smooth unpin into #projects without any DOM overlap.
  useGSAP(
    () => {
      const container = containerRef.current;
      const titleWrapper = titleWrapperRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const thumb = thumbRef.current;
      if (!container || !titleWrapper || !cardsWrapper || !track || !viewport) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2400",
          pin: true,
          pinSpacing: true,
          scrub: 1,
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

      // PHASE 1 (0 to 0.28): Title fades & sweeps left FIRST, then Cards stagger in from left to right
      tl.to(
        titleWrapper,
        {
          x: () => -Math.max(window.innerWidth * 0.6, 750),
          autoAlpha: 0,
          filter: "blur(14px)",
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

      // Top and bottom telemetry fade in
      tl.fromTo(
        ".telemetry-hud",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
        0.1
      );

      // Individual cards stagger in from left to right: 01 -> 02 -> 03 -> 04
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

      // PHASE 2 (0.28 to 0.86): Scrub horizontal track across the 4 cards
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

      // Progress bar indicator tracks the horizontal travel
      if (thumb) {
        tl.to(
          thumb,
          {
            x: 200 - 48,
            ease: "none",
            duration: 0.58,
          },
          0.28
        );
      }

      // PHASE 3 (0.86 to 1.0): Cards layer cleanly fades out before unpinning so subsequent section enters pure
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

  // Unified Mouse Drag & Touch Swipe:
  // Converts horizontal drag into window scroll, seamlessly driving the exact same GSAP scrub!
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
      const scrollFactor = 2.0;
      window.scrollTo({
        top: startScrollY - dx * scrollFactor,
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
      <div id="projects-highlights" className="absolute top-0 left-0 pointer-events-none" />
      {/* Pinned Stage Viewport (Locks cleanly in screen during the scrub sequence) */}
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute inset-0 bg-radial from-obsidian-surface/30 via-obsidian to-obsidian pointer-events-none"
          aria-hidden="true"
        />

        {/* LAYER 1: Title in Center (Initial View -> Transitions & Fades Left on Scroll, z-10) */}
        <div
          ref={titleWrapperRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10 select-none will-change-transform"
        >
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyber-red uppercase mb-4 font-semibold">
            // 02 HIGHLIGHTS
          </span>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tight text-hud-white leading-[0.88]">
            Professional
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

        {/* LAYER 2: Cards Layer (Slides in from Right as Title Fades Left, z-20) */}
        <div
          ref={cardsWrapperRef}
          className="relative z-20 w-full h-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-10 will-change-transform"
        >
          {/* Top Telemetry Header inside Pinned Stage */}
          <div className="telemetry-hud max-w-7xl mx-auto w-full flex items-center justify-between px-4 z-30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-hud-white uppercase font-semibold">
                PROFESSIONAL PROJECTS // HIGHLIGHTS
              </span>
            </div>

            {/* Drag Action Indicator */}
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-hud-white uppercase select-none">
              <span className="font-semibold text-cyber-red">DRAG TO INSPECT</span>
              <svg
                className="w-10 h-4 text-hud-white animate-[bounceRight_1.8s_infinite_ease-in-out]"
                viewBox="0 0 64 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10H58M58 10L48 2M58 10L48 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
                  key={proj.data.slug}
                  onClick={() => {
                    if (!hasMovedRef.current) {
                      openProject(proj.data.slug);
                    }
                  }}
                  className="highlight-card group relative w-[320px] sm:w-[460px] md:w-[540px] lg:w-[600px] h-[480px] sm:h-[540px] md:h-[580px] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.015]"
                >
                  <ProjectPoster project={proj.data} index={idx} />
                </article>
              ))}
            </div>

            {/* Logotomia Signature Floating "Drag" Circle Badge */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white text-[#0b0e1a] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-2xl pointer-events-none z-30 border border-black/10">
              Drag
            </div>
          </div>

          {/* Bottom Progress Bar & Slide Counter */}
          <div className="telemetry-hud max-w-7xl mx-auto w-full flex items-center justify-between px-4 flex-shrink-0">
            {/* Track Line */}
            <div className="relative w-48 sm:w-64 h-[2px] bg-hud-dim/30 rounded-full overflow-hidden">
              <div
                ref={thumbRef}
                className="absolute top-0 left-0 w-12 h-full bg-cyber-red rounded-full will-change-transform"
              />
            </div>

            {/* Slide Counter */}
            <div className="font-mono text-xs tracking-widest text-hud-muted">
              <span className="text-hud-white font-bold">0{activeIndex}</span> / 0{projects.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
