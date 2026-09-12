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
      <div className="border-t border-stroke/40 pt-16">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-mono accent-gradient-text font-semibold">// about & contact</span>
          <span className="w-12 h-[1px] bg-stroke" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Background & Education */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
                <span className="font-serif italic font-normal text-zinc-300">AI Engineering</span> & Systems
              </h2>
              <p className="text-text-muted mt-4 leading-relaxed text-sm sm:text-base">
                {profile.summary}
              </p>
            </div>

            {/* Education Card */}
            <div className="p-6 rounded-xl bg-surface/70 border border-stroke/90 hover:border-zinc-700/80 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-muted border border-stroke flex items-center justify-center text-accent-start shrink-0 mt-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-text-muted">
                    {profile.education.period}
                  </span>
                  <h3 className="text-lg font-semibold text-text">
                    {profile.education.institution}
                  </h3>
                  <p className="text-sm font-mono accent-gradient-text font-medium">
                    {profile.education.degree}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-text-muted list-disc list-inside leading-relaxed">
                    {profile.education.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills grid */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-mono font-semibold text-text uppercase tracking-wider">
                Technical Proficiencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.skills.map((skillGroup, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-surface/50 border border-stroke/70"
                  >
                    <div className="text-xs font-mono accent-gradient-text font-medium mb-2 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-accent-start" />
                      {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-muted text-text-muted border border-stroke/60 hover:text-text hover:border-zinc-600 transition-colors"
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
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 lg:border-l lg:border-stroke/40">
            <div>
              <h3 className="text-xl font-bold text-text">
                <span className="font-serif italic font-normal text-zinc-300">Initiate</span> Contact
              </h3>
              <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                Interested in collaboration, internship opportunities, or discussing AI systems engineering? Reach out securely through the verified channels below.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Obfuscated mailto trigger */}
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-surface/80 border border-stroke text-text hover:border-accent-start/70 hover:bg-surface-muted transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-muted border border-stroke flex items-center justify-center text-accent-start">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-text">Send an Email</span>
                    <span className="text-[10px] text-text-muted">Launches default mail client</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-accent-start group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Copy email action */}
              <button
                onClick={handleCopyClick}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-surface/80 border border-stroke text-text hover:border-accent-start/70 hover:bg-surface-muted transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-muted border border-stroke flex items-center justify-center text-text-muted">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-accent-start" />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-text">
                      {copied ? "Email Copied to Clipboard" : "Copy Email Address"}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {copied ? "Ready to paste in your client" : "Reveals and copies address"}
                    </span>
                  </div>
                </div>
              </button>

              {/* GitHub Link */}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-surface/80 border border-stroke text-text hover:border-accent-start/70 hover:bg-surface-muted transition-all text-xs font-mono group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-muted border border-stroke flex items-center justify-center text-accent-start">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-text">GitHub Profile</span>
                    <span className="text-[10px] text-text-muted">@ChienPM-27</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-start group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="p-4 rounded-lg bg-surface/40 border border-stroke/60 text-[11px] font-mono text-text-muted">
              <span className="text-emerald-400 font-semibold">// privacy note</span>
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