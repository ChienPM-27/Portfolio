"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { triggerObfuscatedMailto, copyObfuscatedEmail } from "@/lib/contact-utils";
import { Mail, Copy, Check, Github, ArrowUpRight, MapPin } from "lucide-react";

export function ContactSection() {
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
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
      <div className="border-t border-hud-dim/20 pt-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
            // 06
          </span>
          <span className="font-display text-sm tracking-[0.2em] uppercase text-hud-muted">
            Initiate Contact
          </span>
          <span className="w-12 h-[1px] bg-hud-dim/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Headline & Status */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-[0.95]">
              Let&apos;s Build
              <br />
              <span className="text-hud-muted">Something Intelligent</span>
            </h2>

            <p className="text-sm sm:text-base text-hud-muted leading-relaxed font-normal max-w-lg">
              Currently looking for AI Engineering Intern and Junior AI Engineer opportunities. If you&apos;re building computer vision pipelines, single-image 3D reconstruction systems, or cloud GPU infrastructure, feel free to reach out.
            </p>

            {/* Availability Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Junior / Intern Roles</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-hud-dim pt-2">
              <MapPin className="w-3.5 h-3.5 text-cyber-red" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Right Column: Contact Channels */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Send Email */}
            <button
              onClick={handleEmailClick}
              data-cursor="pointer"
              className="w-full flex items-center justify-between p-5 rounded-xl bg-obsidian-light/90 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display tracking-wider uppercase text-sm font-medium text-hud-white">
                    Send Direct Email
                  </span>
                  <span className="text-xs font-mono text-hud-muted mt-0.5">
                    pminhchien2006@gmail.com
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Copy Email Address */}
            <button
              onClick={handleCopyClick}
              data-cursor="pointer"
              className="w-full flex items-center justify-between p-5 rounded-xl bg-obsidian-light/90 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-hud-white shrink-0">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-cyber-red" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-display tracking-wider uppercase text-sm font-medium text-hud-white">
                    {copied ? "Email Copied to Clipboard!" : "Copy Email Address"}
                  </span>
                  <span className="text-xs font-mono text-hud-dim mt-0.5">
                    {copied ? "Ready to paste in your client" : "Click to copy address"}
                  </span>
                </div>
              </div>
            </button>

            {/* GitHub Profile */}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="w-full flex items-center justify-between p-5 rounded-xl bg-obsidian-light/90 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display tracking-wider uppercase text-sm font-medium text-hud-white">
                    GitHub Profile
                  </span>
                  <span className="text-xs font-mono text-hud-muted mt-0.5">
                    github.com/ChienPM-27
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-hud-dim group-hover:text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
