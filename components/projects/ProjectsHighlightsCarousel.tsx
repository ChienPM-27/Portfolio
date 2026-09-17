"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { projects } from "@/projects/registry";
import { useProjectDetail } from "@/lib/project-detail-context";
import { ProjectPoster } from "./ProjectPoster";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProjectsHighlightsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const { openProject } = useProjectDetail();

  // Split-Text Scroll Scrub Animation (Logotomia charsDown fade scrub mechanism)
  useGSAP(
    () => {
      const titles = [title1Ref.current, title2Ref.current];

      titles.forEach((heading) => {
        if (!heading) return;

        const originalText = heading.innerText.trim();
        heading.innerHTML = "";

        // Wrap each character into a span
        originalText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "inline-block will-change-transform";
          span.innerHTML = char === " " ? "&nbsp;" : char;
          heading.appendChild(span);
        });

        const chars = heading.querySelectorAll("span");

        gsap.fromTo(
          chars,
          {
            y: "110%",
            opacity: 0,
            rotateX: -30,
          },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              end: "top 55%",
              scrub: 1, // Directly bound to scroll momentum
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // Momentum Drag & Wheel Carousel Physics
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
        thumbRef.current.style.transform = `translateX(${progress * (200 - 40)}px)`;
      }

      // Calculate current slide index
      const slideWidth = 460 + 32; // card width + gap
      const current = Math.min(
        projects.length,
        Math.max(1, Math.round(viewport.scrollLeft / slideWidth) + 1)
      );
      setActiveIndex(current);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      cancelAnimationFrame(momentumId);
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
      velX = 0;
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
      if (Math.abs(velX) > 0.5) {
        viewport.scrollLeft += velX;
        velX *= 0.93; // Inertial damping
        updateProgress();
        momentumId = requestAnimationFrame(applyMomentum);
      }
    };

    // Horizontal wheel conversion when mouse hovers carousel
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        const atStart = viewport.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = viewport.scrollLeft >= maxScroll && e.deltaY > 0;

        if (!atStart && !atEnd) {
          e.preventDefault();
          viewport.scrollLeft += e.deltaY * 1.2;
          updateProgress();
        }
      } else {
        updateProgress();
      }
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    viewport.addEventListener("wheel", onWheel, { passive: false });
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
      className="relative py-24 sm:py-32 bg-obsidian-light/60 border-t border-hud-dim/20 overflow-hidden"
    >
      {/* Section Header with Split Text */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs tracking-[0.2em] text-hud-muted uppercase">
            // 02 HIGHLIGHTS
          </span>

          {/* Drag Action Indicator with Animating Arrow */}
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-hud-white uppercase select-none">
            <span className="font-semibold text-cyber-red">DRAG</span>
            <svg
              className="w-12 h-4 text-hud-white animate-[bounceRight_1.8s_infinite_ease-in-out]"
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

        <div className="flex flex-col select-none">
          <h2
            ref={title1Ref}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-hud-white leading-[0.92] overflow-hidden"
          >
            Professional projects
          </h2>
          <h2
            ref={title2Ref}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-hud-muted/50 leading-[0.92] overflow-hidden mt-1"
          >
            Highlights
          </h2>
        </div>
      </div>

      {/* Horizontal Carousel Viewport */}
      <div
        ref={viewportRef}
        data-cursor="drag"
        className="relative w-full px-6 sm:px-10 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={trackRef} className="flex gap-8 w-max py-4">
          {projects.map((proj, idx) => {
            const { data, Scene } = proj;

            return (
              <article
                key={data.slug}
                onClick={() => openProject(data.slug)}
                className="group relative w-[340px] sm:w-[440px] md:w-[480px] flex-shrink-0 flex flex-col justify-between p-6 rounded-2xl border border-hud-dim/30 bg-obsidian-surface/60 hover:border-hud-white/50 backdrop-blur-md transition-all duration-400 cursor-pointer shadow-2xl"
              >
                {/* Card Meta Row */}
                <div className="flex items-baseline justify-between border-b border-hud-dim/20 pb-3 mb-4">
                  <h3 className="font-display text-2xl font-bold uppercase text-hud-white tracking-wide group-hover:text-cyber-red transition-colors">
                    {data.title}
                  </h3>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-hud-muted tracking-wider">
                    <span className="text-hud-dim">/</span>
                    <span>{data.techStack[0]}</span>
                    {data.techStack[1] && (
                      <>
                        <span className="text-hud-dim">•</span>
                        <span>{data.techStack[1]}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Static Technical Poster Preview Box (Zero WebGL overhead, instantaneous load) */}
                <div className="relative w-full h-[240px] sm:h-[280px] rounded-xl overflow-hidden bg-obsidian border border-hud-dim/30 group-hover:border-hud-white/30 transition-all duration-300">
                  <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                    <ProjectPoster project={data} index={idx} />
                  </div>

                  {/* Gradient Vignette & Click Cue */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none flex items-end p-4">
                    <span className="font-mono text-[9px] tracking-widest text-hud-muted group-hover:text-hud-white uppercase transition-colors">
                      [ CLICK TO EXPAND DETAILS ]
                    </span>
                  </div>
                </div>

                {/* Card Bottom Tagline */}
                <div className="mt-4 pt-3 border-t border-hud-dim/20 flex items-center justify-between">
                  <p className="text-xs text-hud-muted font-normal line-clamp-1">
                    {data.tagline}
                  </p>
                  <span className="font-mono text-[10px] text-hud-dim ml-2 flex-shrink-0">
                    0{idx + 1}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Progress Bar & Slide Counter */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-8 flex items-center justify-between">
        {/* Track Line */}
        <div className="relative w-48 sm:w-60 h-[2px] bg-hud-dim/30 rounded-full overflow-hidden">
          <div
            ref={thumbRef}
            className="absolute top-0 left-0 w-10 h-full bg-hud-white rounded-full transition-transform duration-75 ease-linear"
          />
        </div>

        {/* Counter */}
        <div className="font-mono text-xs tracking-widest text-hud-muted">
          <span className="text-hud-white font-bold">0{activeIndex}</span> / 0{projects.length}
        </div>
      </div>
    </section>
  );
}
