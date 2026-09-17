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

      // Smooth mouse parallax with quickTo (high-perf, no jank)
      const hero = containerRef.current;
      if (!hero) return;

      const leftX = leftGateRef.current
        ? gsap.quickTo(leftGateRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const leftY = leftGateRef.current
        ? gsap.quickTo(leftGateRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;
      const leftRotY = leftGateRef.current
        ? gsap.quickTo(leftGateRef.current, "rotationY", { duration: 0.8, ease: "power2.out" })
        : null;
      const leftRotX = leftGateRef.current
        ? gsap.quickTo(leftGateRef.current, "rotationX", { duration: 0.8, ease: "power2.out" })
        : null;

      const rightX = rightGateRef.current
        ? gsap.quickTo(rightGateRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const rightY = rightGateRef.current
        ? gsap.quickTo(rightGateRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;
      const rightRotY = rightGateRef.current
        ? gsap.quickTo(rightGateRef.current, "rotationY", { duration: 0.8, ease: "power2.out" })
        : null;
      const rightRotX = rightGateRef.current
        ? gsap.quickTo(rightGateRef.current, "rotationX", { duration: 0.8, ease: "power2.out" })
        : null;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        leftX?.(x * -20);
        leftY?.(y * -12);
        leftRotY?.(x * 6);
        leftRotX?.(-y * 6);

        rightX?.(x * 20);
        rightY?.(y * -12);
        rightRotY?.(x * -6);
        rightRotX?.(-y * 6);
      };

      const handleMouseLeave = () => {
        leftX?.(0);
        leftY?.(0);
        leftRotY?.(0);
        leftRotX?.(0);

        rightX?.(0);
        rightY?.(0);
        rightRotY?.(0);
        rightRotX?.(0);
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
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 pt-24 pb-6 overflow-hidden bg-radial from-obsidian-light/40 via-obsidian to-obsidian"
    >
      {/* Top Identity, Bio Context & Telemetry (Replaced generic focus with actual bio context) */}
      <div className="hero-telemetry-top flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto w-full z-20 pb-4 border-b border-hud-dim/20 flex-shrink-0">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-cyber-red uppercase font-semibold">
              // {profile.role}
            </span>
            <span className="text-hud-dim text-xs font-mono">•</span>
            <span className="font-mono text-xs text-hud-white font-medium tracking-wider">
              {profile.name}
            </span>
            <span className="hidden sm:inline-flex items-center ml-2 px-2.5 py-0.5 rounded-full border border-cyber-red/30 bg-cyber-red/10 text-[9px] font-mono text-cyber-red">
              AVAILABLE FOR ROLES
            </span>
          </div>
        </div>

        {/* Introduction / Context about Pham Minh Chien */}
        <div className="max-w-md md:text-right">
          <div className="font-mono text-[11px] text-hud-white tracking-wide font-medium">
            Sai Gon University <span className="text-hud-dim">•</span> Information Technology
          </div>
          <p className="font-mono text-[11px] text-hud-muted leading-relaxed mt-0.5">
            Engineering practical AI systems spanning Computer Vision, Single-Image 3D Reconstruction &amp; Cloud GPU inference pipelines.
          </p>
        </div>
      </div>

      {/* Hero Stage: Perfectly Centered 3D Interactive Core + Floating Logotomia-style Gateways */}
      <div className="relative flex-1 flex items-center justify-between max-w-7xl mx-auto w-full my-auto py-6 sm:py-8 z-10 min-h-[460px]">
        
        {/* Center 3D Interactive Core (Absolute Center, mathematically guaranteed) */}
        <div
          ref={orbWrapperRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-auto"
          style={{
            width: "min(560px, 56vh, 85vw)",
            height: "min(560px, 56vh, 85vw)",
          }}
        >
          <InteractiveOrb />

          {/* Compass Scroll Cue pointing down to Highlights */}
          <a
            href="#projects-highlights"
            data-cursor="pointer"
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-hud-muted hover:text-hud-white transition-colors group z-20"
            aria-label="Scroll to Highlights"
          >
            <div className="w-9 h-9 rounded-full border border-hud-dim/40 flex items-center justify-center group-hover:border-hud-white transition-colors animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M20 12V28M20 28L15 23M20 28L25 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-medium">
              SCROLL
            </span>
          </a>
        </div>

        {/* Left Gateway: Research & 3D Vision (Clean Logotomia typography + arrow) */}
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

        {/* Right Gateway: Professional Projects (Clean Logotomia typography + arrow) */}
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

      {/* Hero Bottom Telemetry Bar */}
      <div className="hero-telemetry-bottom flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-hud-dim/20 max-w-7xl mx-auto w-full font-mono text-[10px] tracking-wider text-hud-muted z-20 flex-shrink-0">
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
