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

  // ScrollTrigger Pin & Scrub Transition:
  // When title hits center -> Pins section -> Scrub down fades title left & slides cards in -> Scrub up reverses
  useGSAP(
    () => {
      const container = containerRef.current;
      const titleWrapper = titleWrapperRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      if (!container || !titleWrapper || !cardsWrapper) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center", // Triggers when section top hits the exact center of screen
          end: "+=1300",       // Pinned scroll travel distance
          pin: true,           // Pin the container in place
          scrub: 1,            // Smooth bidirectional scrub
          anticipatePin: 1,
        },
      });

      // 1. Title transitions and fades to the left
      tl.fromTo(
        titleWrapper,
        { x: 0, opacity: 1, filter: "blur(0px)" },
        {
          x: -360,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.inOut",
          duration: 0.9,
        },
        0
      );

      // 2. Concurrently, cards slide in from right to center stage
      tl.fromTo(
        cardsWrapper,
        {
          x: "100%",
          opacity: 0,
          pointerEvents: "none",
        },
        {
          x: "0%",
          opacity: 1,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 1.1,
        },
        0.15
      );
    },
    { scope: containerRef }
  );

  // Momentum Drag & Scroll Physics for the cards carousel
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velX = 0;
    let momentumId: number;

    const updateProgress = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;

      if (thumbRef.current) {
        thumbRef.current.style.transform = `translateX(${progress * (200 - 48)}px)`;
      }

      const slideWidth = 520 + 32;
      const current = Math.min(
        Math.max(Math.round(viewport.scrollLeft / slideWidth) + 1, 1),
        projects.length
      );
      setActiveIndex(current);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
      velX = 0;
      cancelAnimationFrame(momentumId);
    };

    const onMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      applyMomentum();
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      applyMomentum();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      const prevScroll = viewport.scrollLeft;
      viewport.scrollLeft = scrollLeft - walk;
      velX = viewport.scrollLeft - prevScroll;
      updateProgress();
    };

    const applyMomentum = () => {
      if (Math.abs(velX) < 0.5) return;
      viewport.scrollLeft += velX;
      velX *= 0.92; // Inertia damping
      updateProgress();
      momentumId = requestAnimationFrame(applyMomentum);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        viewport.scrollLeft += e.deltaX;
        updateProgress();
      }
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    viewport.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(momentumId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects-highlights"
      className="relative w-full bg-obsidian border-t border-hud-dim/20"
    >
      {/* Pinned Stage Viewport (Locks in screen during the scrub sequence) */}
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute inset-0 bg-radial from-obsidian-surface/30 via-obsidian to-obsidian pointer-events-none"
          aria-hidden="true"
        />

        {/* LAYER 1: Title in Center (Initial View -> Transitions & Fades Left on Scroll) */}
        <div
          ref={titleWrapperRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 select-none will-change-transform"
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

        {/* LAYER 2: Cards Layer (Slides in from Right as Title Fades Left) */}
        <div
          ref={cardsWrapperRef}
          className="relative z-10 w-full h-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-10 will-change-transform"
        >
          {/* Top Telemetry Header inside Pinned Stage */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 z-30 flex-shrink-0">
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
            className="relative w-full my-auto overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div ref={trackRef} className="flex items-center gap-8 sm:gap-12 w-max px-6 sm:px-12 py-2">
              {projects.map((proj, idx) => (
                <article
                  key={proj.data.slug}
                  onClick={() => openProject(proj.data.slug)}
                  className="group relative w-[320px] sm:w-[460px] md:w-[540px] lg:w-[600px] h-[480px] sm:h-[540px] md:h-[580px] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.015]"
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
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 flex-shrink-0">
            {/* Track Line */}
            <div className="relative w-48 sm:w-64 h-[2px] bg-hud-dim/30 rounded-full overflow-hidden">
              <div
                ref={thumbRef}
                className="absolute top-0 left-0 w-12 h-full bg-cyber-red rounded-full transition-transform duration-75 ease-linear"
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
