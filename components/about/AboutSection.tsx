"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { triggerObfuscatedMailto, copyObfuscatedEmail } from "@/lib/contact-utils";
import { GraduationCap, Mail, Copy, Check, Github, Code, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    triggerObfuscatedMailto(profile.links.emailUser, profile.links.emailDomain);
  };

  const handleCopyClick = async () => {
    const success = await copyObfuscatedEmail(
      profile.links.emailUser,
      profile.links.emailDomain
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="border-t border-hud-dim/20 pt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-display text-sm tracking-[0.2em] uppercase text-cyber-red font-semibold">
            04
          </span>
          <span className="font-display text-xs tracking-[0.15em] uppercase text-hud-muted">
            About & Contact
          </span>
          <span className="w-12 h-[1px] bg-hud-dim/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Background & Education */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-hud-white leading-[0.95]">
                AI Engineering
                <br />
                <span className="text-hud-muted">&amp; Systems</span>
              </h2>
              <p className="text-hud-muted mt-4 leading-relaxed text-sm sm:text-base">
                {profile.summary}
              </p>
            </div>

            {/* Education Card */}
            <div className="p-6 rounded-xl bg-obsidian-light/70 border border-hud-dim/20 hover:border-cyber-red/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0 mt-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-hud-dim">
                    {profile.education.period}
                  </span>
                  <h3 className="font-display text-xl tracking-[0.08em] uppercase font-medium text-hud-white">
                    {profile.education.institution}
                  </h3>
                  <p className="text-sm font-display tracking-wider uppercase text-cyber-red">
                    {profile.education.degree}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-hud-muted list-disc list-inside leading-relaxed">
                    {profile.education.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills grid */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-sm tracking-[0.2em] uppercase font-semibold text-hud-white">
                Technical Proficiencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.skills.map((skillGroup, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-obsidian-light/50 border border-hud-dim/15"
                  >
                    <div className="text-xs font-display tracking-[0.15em] uppercase text-cyber-red font-medium mb-2 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-surface text-hud-muted border border-hud-dim/15 hover:text-hud-white hover:border-cyber-red/30 transition-colors"
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

          {/* Right: Contact & Direct Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 lg:border-l lg:border-hud-dim/15">
            <div>
              <h3 className="font-display text-2xl tracking-[0.08em] uppercase font-medium text-hud-white">
                Initiate Contact
              </h3>
              <p className="text-xs sm:text-sm text-hud-muted mt-2 leading-relaxed">
                Interested in collaboration, internship opportunities, or discussing AI systems engineering? Reach out through the channels below.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Obfuscated mailto trigger */}
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/20 text-hud-white hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display tracking-wider uppercase text-xs font-medium">Send an Email</span>
                    <span className="text-[10px] text-hud-dim">Launches default mail client</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Copy email action */}
              <button
                onClick={handleCopyClick}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/20 text-hud-white hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-cyber-red" />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display tracking-wider uppercase text-xs font-medium">
                      {copied ? "Email Copied" : "Copy Email Address"}
                    </span>
                    <span className="text-[10px] text-hud-dim">
                      {copied ? "Ready to paste" : "Reveals and copies address"}
                    </span>
                  </div>
                </div>
              </button>

              {/* GitHub Link */}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/20 text-hud-white hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display tracking-wider uppercase text-xs font-medium">GitHub Profile</span>
                    <span className="text-[10px] text-hud-dim">@ChienPM-27</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-hud-dim group-hover:text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="p-4 rounded-lg bg-obsidian-light/40 border border-hud-dim/15 text-[11px] font-mono text-hud-dim">
              <span className="text-cyber-red font-display tracking-wider uppercase text-[10px]">// Privacy Note</span>
              <p className="mt-1 leading-relaxed">
                Contact information is dynamically assembled via client triggers to protect against automated web scrapers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}