"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import { ScrollCue } from "./ScrollCue";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(nameRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 1.1,
      })
        .from(
          roleRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
            duration: 0.8,
          },
          "-=0.7"
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
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
      className="relative min-h-[90vh] flex flex-col justify-between px-6 pt-36 pb-12 max-w-5xl mx-auto"
    >
      <div className="flex flex-col gap-6 my-auto text-center items-center">
        {/* Role Tagline - Restrained Editorial */}
        <div ref={roleRef} className="flex items-center gap-2">
          <span className="text-cyber-red font-mono text-xs font-semibold tracking-widest uppercase">
            // AI ENGINEER
          </span>
          <span className="text-hud-dim text-xs font-mono">
            • {profile.location}
          </span>
        </div>

        {/* Primary Visual Anchor: Name */}
        <h1
          ref={nameRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl font-semibold tracking-[0.05em] uppercase text-hud-white leading-[0.92]"
        >
          Pham Minh Chien
        </h1>

        {/* Short Concise Description from Resume */}
        <p
          ref={textRef}
          className="text-base sm:text-lg text-hud-muted max-w-2xl leading-relaxed font-normal pt-1"
        >
          {profile.positioning}
        </p>

        {/* Clear, Minimal CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 pt-6"
        >
          <a
            href="#projects"
            className="pill-btn pill-btn-red"
            data-cursor="pointer"
          >
            Explore Projects
            <span className="text-xs opacity-60">›</span>
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-white"
            data-cursor="pointer"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      <div className="pt-8">
        <ScrollCue />
      </div>
    </section>
  );
}