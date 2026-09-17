"use client";

import React, { useRef, useEffect } from "react";
import { profile } from "@/data/profile";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { InteractiveOrb } from "./InteractiveOrb";

export function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const leftGateRef   = useRef<HTMLAnchorElement>(null);
  const rightGateRef  = useRef<HTMLAnchorElement>(null);
  // orbWrapperRef = outer div for scroll-parallax (translateY)
  // orbTiltRef    = inner div for mouse-tilt (x/y via GSAP) so they never conflict
  const orbWrapperRef = useRef<HTMLDivElement>(null);
  const orbTiltRef    = useRef<HTMLDivElement>(null);
  const compassRef    = useRef<HTMLAnchorElement>(null);

  // ------------------------------------------------------------------
  // Scroll-driven parallax:
  // As the user scrolls, the orb counteracts 28% of the scroll movement
  // so it appears to "float" and bleeds slightly into the next section.
  // Portals and compass fade out earlier (they leave first).
  // ------------------------------------------------------------------
  useEffect(() => {
    const orb   = orbWrapperRef.current;
    const left  = leftGateRef.current;
    const right = rightGateRef.current;
    const comp  = compassRef.current;
    if (!orb) return;

    const onScroll = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;

      // Orb: counteract 28% of upward scroll → stays in view a bit longer
      const counterY    = sy * 0.28;
      const rawOpacity  = 1 - (sy - vh * 0.38) / (vh * 0.47);
      const orbOpacity  = Math.min(1, Math.max(0, rawOpacity));
      const orbScale    = Math.min(1, Math.max(0.88, 1 - (sy / vh) * 0.12));

      // Use gsap.set so GSAP's internal transform matrix stays consistent
      gsap.set(orb, { y: counterY, scale: orbScale, opacity: orbOpacity });

      // Portals fade to 0 before orb (exit sooner)
      const portalOp = Math.max(0, 1 - sy / (vh * 0.38));
      gsap.set([left, right], { opacity: portalOp, x: sy * (left === left ? -0.04 : 0.04) });

      // Compass fades quickest
      const compOp = Math.max(0, 1 - sy / (vh * 0.28));
      if (comp) gsap.set(comp, { opacity: compOp });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Reset on unmount / when not scrolled
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------------------------------------------------------
  // GSAP entrance timeline + mouse-parallax tilt
  // ------------------------------------------------------------------
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tel-top", { opacity: 0, y: -20, duration: 0.8 })
        .from(
          orbWrapperRef.current,
          { opacity: 0, duration: 1.1, ease: "expo.out" },
          "-=0.5"
        )
        .from(
          [leftGateRef.current, rightGateRef.current],
          { opacity: 0, y: 28, duration: 0.9, stagger: 0.14 },
          "-=0.8"
        )
        .from(".hero-tel-bottom", { opacity: 0, y: 14, duration: 0.7 }, "-=0.5");

      // Mouse-parallax tilt (applied to inner orbTiltRef to avoid conflicting
      // with the scroll-parallax transform on the outer orbWrapperRef)
      const hero = containerRef.current;
      if (!hero) return;

      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top)  / height - 0.5;

        gsap.to(orbTiltRef.current, {
          x: x * 18, y: y * 18,
          duration: 0.9, ease: "power2.out",
        });
        gsap.to(leftGateRef.current, {
          x: x * -22, y: y * -14,
          rotationY: x * 7, rotationX: -y * 7,
          duration: 0.8, ease: "power2.out",
        });
        gsap.to(rightGateRef.current, {
          x: x * 22, y: y * -14,
          rotationY: x * -7, rotationX: -y * 7,
          duration: 0.8, ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(
          [orbTiltRef.current, leftGateRef.current, rightGateRef.current],
          { x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 1, ease: "power3.out" }
        );
      };

      hero.addEventListener("mousemove", onMouseMove);
      hero.addEventListener("mouseleave", onMouseLeave);
      return () => {
        hero.removeEventListener("mousemove", onMouseMove);
        hero.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col pt-24 pb-6 px-6 sm:px-10 overflow-hidden bg-obsidian"
    >
      {/* ── Top Telemetry Bar ─────────────────────────────────────── */}
      <div className="hero-tel-top flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full z-20 pb-4 border-b border-hud-dim/20 flex-shrink-0">
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
        <div className="hidden md:block font-mono text-[11px] text-hud-muted tracking-widest uppercase">
          FOCUS:{" "}
          <span className="text-hud-white">COMPUTER VISION &amp; 3D RECONSTRUCTION</span>
        </div>
      </div>

      {/* ── Main Stage: 3-column CSS grid ─────────────────────────── */}
      {/*   col 1 (1fr) | col 2 (auto = orb) | col 3 (1fr)           */}
      {/*   Equal flanks guarantee the orb sits at the exact centre.  */}
      <div
        className="flex-1 grid items-center gap-x-4 py-6 min-h-[520px]"
        style={{ gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)" }}
      >
        {/* ── Left Portal ─────────────────────────── */}
        <div className="flex justify-end pr-4 xl:pr-8">
          <a
            ref={leftGateRef}
            href="#projects-highlights"
            data-cursor="explore"
            className="group relative hidden lg:flex flex-col justify-between w-[210px] xl:w-[270px] p-7 rounded-2xl border border-hud-dim/30 bg-obsidian-surface/50 hover:border-hud-white/40 backdrop-blur-md transition-colors duration-300 overflow-hidden shadow-xl"
            style={{ perspective: "800px" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-25 mix-blend-screen transition-opacity duration-500 pointer-events-none grayscale contrast-125"
              style={{ backgroundImage: "url('/assets/fond_art.png')" }}
            />
            <div className="relative z-10 flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted uppercase">
                // 01 GATEWAY
              </span>
              <h2 className="font-display text-4xl xl:text-5xl font-semibold uppercase tracking-tight text-hud-white leading-[0.92]">
                Research &amp;<br />
                <span className="text-hud-muted group-hover:text-hud-white transition-colors">
                  3D Vision
                </span>
              </h2>
              <p className="text-[11px] text-hud-muted leading-relaxed mt-1">
                Deep learning pipelines, Single-Image Watertight Mesh, Point Clouds.
              </p>
            </div>
            <div className="relative z-10 pt-7 flex items-center">
              <svg
                className="w-14 h-5 text-hud-white group-hover:-translate-x-2 transition-transform duration-300"
                viewBox="0 0 56 20" fill="none"
              >
                <path d="M56 10H2M2 10L13 2M2 10L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>

        {/* ── Center 3D Orb ───────────────────────── */}
        {/* orbWrapperRef receives scroll-parallax transform */}
        <div
          ref={orbWrapperRef}
          className="flex flex-col items-center gap-8 will-change-transform"
          style={{ willChange: "transform, opacity" }}
        >
          {/* orbTiltRef receives mouse-tilt transform (isolated layer) */}
          <div
            ref={orbTiltRef}
            className="rounded-full overflow-hidden border border-hud-white/10 bg-obsidian/80 shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_0_60px_rgba(255,255,255,0.025)] will-change-transform"
            style={{
              width:  "clamp(300px, 44vh, 570px)",
              height: "clamp(300px, 44vh, 570px)",
            }}
          >
            <InteractiveOrb />
          </div>

          {/* Compass scroll cue */}
          <a
            ref={compassRef}
            href="#projects-highlights"
            data-cursor="pointer"
            className="flex flex-col items-center gap-1.5 text-hud-muted hover:text-hud-white transition-colors group"
            aria-label="Scroll to highlights"
          >
            <div className="w-10 h-10 rounded-full border border-hud-dim/40 flex items-center justify-center group-hover:border-hud-white transition-colors animate-[spin_14s_linear_infinite]">
              <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M20 12V28M20 28L15 23M20 28L25 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase">SCROLL</span>
          </a>
        </div>

        {/* ── Right Portal ────────────────────────── */}
        <div className="flex justify-start pl-4 xl:pl-8">
          <a
            ref={rightGateRef}
            href="#projects-highlights"
            data-cursor="explore"
            className="group relative hidden lg:flex flex-col justify-between w-[210px] xl:w-[270px] p-7 rounded-2xl border border-hud-dim/30 bg-obsidian-surface/50 hover:border-hud-white/40 backdrop-blur-md transition-colors duration-300 overflow-hidden shadow-xl text-right"
            style={{ perspective: "800px" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-25 mix-blend-screen transition-opacity duration-500 pointer-events-none grayscale contrast-125"
              style={{ backgroundImage: "url('/assets/fond_art.png')" }}
            />
            <div className="relative z-10 flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted uppercase">
                // 02 GATEWAY
              </span>
              <h2 className="font-display text-4xl xl:text-5xl font-semibold uppercase tracking-tight text-hud-white leading-[0.92]">
                Systems &amp;<br />
                <span className="text-hud-muted group-hover:text-hud-white transition-colors">
                  Cloud GPU
                </span>
              </h2>
              <p className="text-[11px] text-hud-muted leading-relaxed mt-1">
                High-throughput FastAPI inference, GCP L4 GPU, Async pipelines.
              </p>
            </div>
            <div className="relative z-10 pt-7 flex items-center justify-end">
              <svg
                className="w-14 h-5 text-hud-white group-hover:translate-x-2 transition-transform duration-300"
                viewBox="0 0 56 20" fill="none"
              >
                <path d="M0 10H54M54 10L43 2M54 10L43 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* ── Bottom Telemetry Bar ──────────────────────────────────── */}
      <div className="hero-tel-bottom flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-hud-dim/20 w-full font-mono text-[10px] tracking-wider text-hud-muted z-20 flex-shrink-0">
        <div>
          <span className="text-hud-dim mr-2">GEOLOCATION:</span>
          <span className="text-hud-white">10° 46&apos; 37&quot; N / 106° 41&apos; 43&quot; E</span>
        </div>
        <div className="hidden md:block text-hud-dim uppercase tracking-widest text-[9px]">
          [ INTERACTIVE 3D CORE // DRAG TO INSPECT ]
        </div>
        <div>
          <span className="text-hud-dim mr-2">ARCHITECTURE:</span>
          <span className="text-hud-white">V.4 — 2026 EDITION</span>
        </div>
      </div>
    </section>
  );
}
