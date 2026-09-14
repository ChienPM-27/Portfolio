"use client";

import React from "react";
import { profile } from "@/data/profile";
import { GraduationCap, Code } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
      <div className="border-t border-hud-dim/20 pt-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
            // 05
          </span>
          <span className="font-display text-sm tracking-[0.2em] uppercase text-hud-muted">
            About & Background
          </span>
          <span className="w-12 h-[1px] bg-hud-dim/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Background & Education */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-[1.0]">
                Engineering AI Systems
                <br />
                <span className="text-hud-muted">&amp; Cloud Inference</span>
              </h2>
              <p className="text-hud-muted mt-4 leading-relaxed text-sm sm:text-base font-normal">
                {profile.summary}
              </p>
            </div>

            {/* Education Card directly from resume */}
            <div className="p-6 rounded-xl bg-obsidian-light/80 border border-hud-dim/20 hover:border-hud-dim/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0 mt-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-hud-dim">
                    {profile.education.period}
                  </span>
                  <h3 className="font-display text-xl tracking-[0.05em] uppercase font-medium text-hud-white">
                    {profile.education.institution}
                  </h3>
                  <p className="text-sm font-mono text-cyber-red">
                    {profile.education.degree}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-hud-muted list-disc list-inside leading-relaxed font-mono">
                    {profile.education.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Proficiencies */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase font-semibold text-hud-white mb-2">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-obsidian-light/60 border border-hud-dim/15"
                >
                  <div className="text-xs font-mono text-cyber-red font-medium mb-2.5 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-surface text-hud-muted border border-hud-dim/15"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}