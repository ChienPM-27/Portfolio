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

  // GSAP Entrance (Fade & Slide in once, then completely static)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-telemetry-top", {
        opacity: 0,
        y: -15,
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
            y: 20,
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] max-h-[1080px] w-full flex flex-col justify-between px-6 sm:px-10 lg:px-12 pt-20 pb-5 overflow-hidden bg-radial from-obsidian-light/40 via-obsidian to-obsidian"
    >
      {/* Top Telemetry & Bio Bar (Symmetrical 3-column layout matching Bottom Telemetry) */}
      <div className="hero-telemetry-top flex flex-row items-center justify-between max-w-7xl mx-auto w-full z-20 py-3 border-b border-hud-dim/20 flex-shrink-0 font-mono text-[11px]">
        {/* Left: Identity & Role */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
          <span className="text-cyber-red uppercase font-semibold tracking-widest">
            // {profile.role}
          </span>
          <span className="text-hud-dim">•</span>
          <span className="text-hud-white font-medium tracking-wider">
            {profile.name}
          </span>
          <span className="hidden lg:inline-flex items-center ml-2 px-2 py-0.5 rounded border border-cyber-red/30 bg-cyber-red/10 text-[9px] text-cyber-red">
            AVAILABLE
          </span>
        </div>

        {/* Center: System Focus / Specialization */}
        <div className="hidden md:block text-hud-muted tracking-widest uppercase text-[10px]">
          COMPUTER VISION <span className="text-hud-dim mx-1.5">•</span> 3D RECONSTRUCTION
        </div>

        {/* Right: Academic Context */}
        <div className="text-right">
          <span className="text-hud-white font-medium">SAI GON UNIVERSITY</span>
          <span className="text-hud-dim mx-1.5">//</span>
          <span className="text-hud-muted">IT</span>
        </div>
      </div>

      {/* Hero Stage: Perfectly Centered 3D Interactive Core + Symmetrical Dual Gateways */}
      <div className="relative flex-1 flex items-center justify-between max-w-7xl mx-auto w-full my-auto py-4 z-10">
        
        {/* Center 3D Interactive Core (Absolute Center with Equal Top/Bottom Margins) */}
        <div
          ref={orbWrapperRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-auto"
          style={{
            width: "min(490px, 47vh, 78vw)",
            height: "min(490px, 47vh, 78vw)",
          }}
        >
          <InteractiveOrb />

          {/* Compass Scroll Cue pointing down to Highlights with Safe Clearance */}
          <a
            href="#projects-highlights"
            data-cursor="pointer"
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-hud-muted hover:text-hud-white transition-colors group z-20"
            aria-label="Scroll to Highlights"
          >
            <div className="w-8 h-8 rounded-full border border-hud-dim/40 flex items-center justify-center group-hover:border-hud-white transition-colors animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 40 40" fill="none" className="w-4 h-4">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M20 12V28M20 28L15 23M20 28L25 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-medium">
              SCROLL
            </span>
          </a>
        </div>

        {/* Left Gateway: Research & 3D Vision (Static, clean typography + arrow) */}
        <a
          ref={leftGateRef}
          href="#projects-highlights"
          data-cursor="explore"
          className="group relative z-20 flex flex-col items-start text-left max-w-[220px] sm:max-w-[270px] lg:max-w-[320px] transition-transform duration-300 pointer-events-auto"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyber-red uppercase mb-2">
            // 01 GATEWAY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-hud-white leading-[0.9]">
            Research &amp;<br />
            <span className="text-hud-muted group-hover:text-hud-white transition-colors">
              3D Vision
            </span>
          </h2>
          <p className="text-xs text-hud-muted mt-3 line-clamp-2 leading-relaxed">
            Watertight mesh reconstruction, point clouds &amp; neural representations.
          </p>
          <div className="pt-4 flex items-center text-hud-white group-hover:-translate-x-3 transition-transform duration-300 ease-out">
            <svg
              className="w-16 sm:w-20 h-5"
              viewBox="0 0 80 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 10H4M4 10L14 2M4 10L14 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>

        {/* Right Gateway: Professional Projects (Static, clean typography + arrow) */}
        <a
          ref={rightGateRef}
          href="#projects-highlights"
          data-cursor="explore"
          className="group relative z-20 flex flex-col items-end text-right max-w-[220px] sm:max-w-[270px] lg:max-w-[320px] transition-transform duration-300 ml-auto pointer-events-auto"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyber-red uppercase mb-2">
            // 02 GATEWAY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-hud-white leading-[0.9]">
            Professional<br />
            <span className="text-hud-muted group-hover:text-hud-white transition-colors">
              Projects
            </span>
          </h2>
          <p className="text-xs text-hud-muted mt-3 line-clamp-2 leading-relaxed">
            High-throughput FastAPI inference, GCP L4 GPU, async pipelines.
          </p>
          <div className="pt-4 flex items-center text-hud-white group-hover:translate-x-3 transition-transform duration-300 ease-out">
            <svg
              className="w-16 sm:w-20 h-5"
              viewBox="0 0 80 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10H76M76 10L66 2M76 10L66 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>

      </div>

      {/* Hero Bottom Telemetry Bar (Symmetrical with Top Telemetry) */}
      <div className="hero-telemetry-bottom flex flex-row items-center justify-between max-w-7xl mx-auto w-full z-20 py-3 border-t border-hud-dim/20 flex-shrink-0 font-mono text-[10px] tracking-wider text-hud-muted">
        <div>
          <span className="text-hud-dim mr-2">GEOLOCATION:</span>
          <span className="text-hud-white">10° 46&apos; 37&quot; N / 106° 41&apos; 43&quot; E • HO CHI MINH CITY</span>
        </div>

        <div className="hidden md:block text-hud-dim uppercase tracking-widest text-[9px]">
          [ INTERACTIVE 3D CORE // DRAG TO ROTATE ]
        </div>

        <div>
          <span className="text-hud-dim mr-2">ARCHITECTURE:</span>
          <span className="text-hud-white">V.4 — 2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}
