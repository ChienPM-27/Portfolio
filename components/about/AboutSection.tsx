"use client";

import React, { useRef } from "react";
import { profile } from "@/data/profile";
import {
  GraduationCap,
  Cpu,
  Server,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "AI & Machine Learning": Cpu,
  "Backend & Systems": Server,
  "Mobile & Web": Smartphone,
  "Cloud & Environments": Terminal,
};

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotionPreferred()) return;

      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".about-header",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".about-col-left",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".about-skill-card",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10"
    >
      <div className="border-t border-hud-dim/20 pt-16">
        {/* Section Header */}
        <div className="about-header flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
            // 03
          </span>
          <span className="font-display text-sm tracking-[0.2em] uppercase text-hud-muted">
            About &amp; Background
          </span>
          <span className="w-12 h-[1px] bg-hud-dim/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative & Education Card */}
          <div className="about-col-left lg:col-span-6 flex flex-col gap-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.03em] uppercase text-hud-white leading-[0.96]">
                Aspiring AI Engineer
                <br />
                <span className="text-hud-muted">&amp; IT Student</span>
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-sm sm:text-base text-hud-muted font-normal leading-relaxed max-w-xl">
                <p>
                  I&apos;m an Information Technology student at Sai Gon University,
                  exploring AI Engineering through hands-on projects and
                  continuous experimentation. My technical interests center on
                  machine learning, computer vision, and building practical
                  systems that connect AI models with real-world applications.
                </p>
                <p>
                  I enjoy learning by building &mdash; experimenting with models,
                  working with backend services, and turning ideas into
                  functional projects. Currently seeking an AI Engineering
                  Internship to grow as an engineer, learn from real-world
                  challenges, and contribute to meaningful projects.
                </p>
              </div>
            </div>

            {/* Education Card */}
            <div className="p-6 sm:p-7 rounded-xl bg-obsidian-light/85 border border-hud-dim/20 hover:border-hud-dim/40 transition-colors shadow-lg">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-11 h-11 rounded-lg bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0 mt-1 shadow-[0_0_16px_rgba(230,30,30,0.15)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono text-hud-dim">
                      {profile.education.period}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-obsidian-surface text-cyber-red border border-cyber-red/30">
                      CURRENT ENROLLMENT
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl tracking-[0.04em] uppercase font-medium text-hud-white">
                    {profile.education.institution}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-hud-muted">
                    {profile.education.degree} &bull;{" "}
                    <span className="text-hud-dim">{profile.education.location}</span>
                  </p>

                  <ul className="mt-3 space-y-2 text-xs text-hud-muted list-disc list-inside leading-relaxed font-mono">
                    {profile.education.highlights.map((h, i) => (
                      <li key={i} className="text-hud-dim">
                        <span className="text-hud-white/90">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Proficiencies */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="about-header flex items-center justify-between mb-2">
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase font-semibold text-hud-white">
                Technical Proficiencies
              </h3>
              <span className="font-mono text-[10px] text-hud-dim uppercase">
                [ VERIFIED TOOLSET ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills.map((skillGroup, idx) => {
                const Icon = CATEGORY_ICONS[skillGroup.category] || Cpu;
                return (
                  <div
                    key={idx}
                    className="about-skill-card p-5 rounded-xl bg-obsidian-light/75 border border-hud-dim/20 hover:border-cyber-red/30 hover:bg-obsidian-surface/60 transition-colors flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-mono text-cyber-red font-medium mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-wider uppercase">
                          {skillGroup.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-obsidian-surface/90 text-hud-muted border border-hud-dim/15 hover:text-hud-white hover:border-hud-dim/40 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}