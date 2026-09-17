"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { InteractiveOrb } from "./InteractiveOrb";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftGateRef = useRef<HTMLAnchorElement>(null);
  const rightGateRef = useRef<HTMLAnchorElement>(null);
  const orbWrapperRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Mouse Parallax Tilt (Logotomia mechanism)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-telemetry-top", {
        opacity: 0,
        y: -20,
        duration: 0.8,
      })
        .from(
          orbWrapperRef.current,
          {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.5"
        )
        .from(
          [leftGateRef.current, rightGateRef.current],
          {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.15,
          },
          "-=0.8"
        )
        .from(
          ".hero-telemetry-bottom",
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.5"
        );

      // Mouse Parallax Tilt
      const hero = containerRef.current;
      if (!hero) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (leftGateRef.current) {
          gsap.to(leftGateRef.current, {
            x: x * -25,
            y: y * -15,
            rotationY: x * 8,
            rotationX: -y * 8,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        if (rightGateRef.current) {
          gsap.to(rightGateRef.current, {
            x: x * 25,
            y: y * -15,
            rotationY: x * -8,
            rotationX: -y * 8,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        if (orbWrapperRef.current) {
          gsap.to(orbWrapperRef.current, {
            x: x * 15,
            y: y * 15,
            duration: 1,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to([leftGateRef.current, rightGateRef.current, orbWrapperRef.current], {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
        });
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] w-full flex flex-col justify-between px-6 sm:px-10 pt-28 pb-8 overflow-hidden bg-radial from-obsidian-light/50 via-obsidian to-obsidian"
    >
      {/* Top Identity & Telemetry */}
      <div className="hero-telemetry-top flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-7xl mx-auto w-full z-20 pb-4 border-b border-hud-dim/20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-cyber-red uppercase font-semibold">
            // {profile.role}
          </span>
          <span className="text-hud-dim text-[11px] font-mono">•</span>
          <span className="font-mono text-[11px] text-hud-muted tracking-wider">
            {profile.name}
          </span>
        </div>

        <div className="font-mono text-[11px] text-hud-muted tracking-widest uppercase">
          FOCUS: <span className="text-hud-white">COMPUTER VISION & 3D RECONSTRUCTION</span>
        </div>
      </div>

      {/* Hero Stage: Dual Gateway Portals + Center 3D Interactive Core */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full my-auto min-h-[560px] py-10 gap-8">
        
        {/* Left Gateway: Research & 3D Vision */}
        <a
          ref={leftGateRef}
          href="#projects-highlights"
          data-cursor="explore"
          className="group relative z-20 w-full lg:w-[320px] xl:w-[360px] p-8 rounded-2xl border border-hud-dim/30 bg-obsidian-surface/40 hover:border-hud-white/40 backdrop-blur-md transition-all duration-300 overflow-hidden flex flex-col justify-between text-left shadow-2xl"
        >
          {/* Subtle Hover Background Art Graphic */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-30 mix-blend-screen transition-opacity duration-500 pointer-events-none filter grayscale contrast-125"
            style={{ backgroundImage: "url('/assets/fond_art.png')" }}
          />

          <div className="relative z-10 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted uppercase">
              // 01 GATEWAY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-hud-white leading-[0.95]">
              Research &amp;<br />
              <span className="text-hud-muted group-hover:text-hud-white transition-colors">3D Vision</span>
            </h2>
            <p className="text-xs text-hud-muted line-clamp-2 mt-1">
              Deep learning pipelines, Single-Image Watertight Mesh, Point Clouds.
            </p>
          </div>

          <div className="relative z-10 pt-8 flex items-center">
            <svg
              className="w-16 h-6 text-hud-white transform -translate-x-0 group-hover:-translate-x-3 transition-transform duration-300 ease-out"
              viewBox="0 0 64 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64 12H4M4 12L16 2M4 12L16 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>

        {/* Center 3D Interactive Core */}
        <div
          ref={orbWrapperRef}
          className="relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] flex items-center justify-center pointer-events-auto"
        >
          <InteractiveOrb />

          {/* Compass Scroll Cue pointing down to Highlights */}
          <a
            href="#projects-highlights"
            data-cursor="pointer"
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-hud-muted hover:text-hud-white transition-colors group z-20"
            aria-label="Scroll to Highlights"
          >
            <div className="w-10 h-10 rounded-full border border-hud-dim/40 flex items-center justify-center group-hover:border-hud-white transition-colors animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M20 12V28M20 28L15 23M20 28L25 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-medium">
              SCROLL
            </span>
          </a>
        </div>

        {/* Right Gateway: Systems & Cloud Inference */}
        <a
          ref={rightGateRef}
          href="#projects-highlights"
          data-cursor="explore"
          className="group relative z-20 w-full lg:w-[320px] xl:w-[360px] p-8 rounded-2xl border border-hud-dim/30 bg-obsidian-surface/40 hover:border-hud-white/40 backdrop-blur-md transition-all duration-300 overflow-hidden flex flex-col justify-between text-right shadow-2xl ml-auto"
        >
          {/* Subtle Hover Background Art Graphic */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-30 mix-blend-screen transition-opacity duration-500 pointer-events-none filter grayscale contrast-125"
            style={{ backgroundImage: "url('/assets/fond_art.png')" }}
          />

          <div className="relative z-10 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted uppercase">
              // 02 GATEWAY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-hud-white leading-[0.95]">
              Systems &amp;<br />
              <span className="text-hud-muted group-hover:text-hud-white transition-colors">Cloud GPU</span>
            </h2>
            <p className="text-xs text-hud-muted line-clamp-2 mt-1">
              High-throughput FastAPI inference, GCP L4 GPU, Async pipelines.
            </p>
          </div>

          <div className="relative z-10 pt-8 flex items-center justify-end">
            <svg
              className="w-16 h-6 text-hud-white transform translate-x-0 group-hover:translate-x-3 transition-transform duration-300 ease-out"
              viewBox="0 0 64 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12H60M60 12L48 2M60 12L48 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>

      </div>

      {/* Hero Bottom Telemetry Bar */}
      <div className="hero-telemetry-bottom flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-hud-dim/20 max-w-7xl mx-auto w-full font-mono text-[10px] tracking-wider text-hud-muted z-20">
        <div>
          <span className="text-hud-dim mr-2">GEOLOCATION:</span>
          <span className="text-hud-white">10° 46&apos; 37&quot; N / 106° 41&apos; 43&quot; E</span>
        </div>

        <div className="hidden md:block text-hud-dim uppercase tracking-widest text-[9px]">
          [ INTERACTIVE 3D CORE // ROTATE OR DRAG TO INSPECT ]
        </div>

        <div>
          <span className="text-hud-dim mr-2">ARCHITECTURE:</span>
          <span className="text-hud-white">V.4 — 2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}
