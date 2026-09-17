"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { triggerObfuscatedMailto, copyObfuscatedEmail } from "@/lib/contact-utils";
import {
  Mail,
  Copy,
  Check,
  Github,
  ArrowUpRight,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

const INQUIRY_TYPES = [
  "AI Engineer Internship",
  "Machine Learning & PyTorch",
  "Model Deployment & FastAPI",
  "Computer Vision Project",
  "Full-Stack AI Application",
  "General Mentorship & Connect",
];

const TIMELINE_OPTIONS = [
  "Immediate Start (Internship)",
  "Summer / Upcoming Term",
  "Part-time / Flexible Hours",
  "Project-Based Collaboration",
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(INQUIRY_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name or company/team name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!details.trim()) {
      setErrorMsg("Please provide some details about the role, team, or project.");
      return;
    }

    setErrorMsg("");
    setStatus("submitting");

    // Compose high-fidelity formatted email body
    const emailSubject = `[Internship / Project Inquiry] ${selectedDomain} — ${name.trim()}`;
    const emailBody = `INTERNSHIP & PROJECT INQUIRY
==================================================
From: ${name.trim()}
Email: ${email.trim()}
Topic / Opportunity: ${selectedDomain}
Timeline / Availability: ${timeline}

MESSAGE & DETAILS:
--------------------------------------------------
${details.trim()}

==================================================
Dispatched via Portfolio Direct Portal
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
`;

    setTimeout(() => {
      setStatus("success");
      triggerObfuscatedMailto(
        profile.links.emailUser,
        profile.links.emailDomain,
        emailSubject,
        emailBody
      );
    }, 500);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setDetails("");
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      <div className="border-t border-hud-dim/20 pt-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-cyber-red font-semibold tracking-wider">
            // 04
          </span>
          <span className="font-display text-sm tracking-[0.2em] uppercase text-hud-muted">
            Connect &amp; Internship Inquiries
          </span>
          <span className="w-12 h-[1px] bg-hud-dim/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Reach & Author Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.04em] uppercase text-hud-white leading-[0.95]">
                Looking For An
                <br />
                <span className="text-cyber-red">AI Intern?</span>
              </h2>

              <p className="text-sm sm:text-base text-hud-muted leading-relaxed font-normal mt-4">
                I am an Information Technology student actively seeking an AI Engineer Internship opportunity. Whether you have an internship opening, a project to collaborate on, or want to discuss machine learning workflows — feel free to reach out.
              </p>
            </div>

            {/* Author Status Badges */}
            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono w-max">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for AI Engineer Internships</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-hud-dim pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyber-red" />
                  <span>SLA: &lt; 24h Response</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyber-red" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Direct Quick Contact Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-hud-dim/20">
              <span className="font-mono text-[10px] tracking-widest uppercase text-hud-dim">
                DIRECT CONTACT CHANNELS
              </span>

              {/* Direct Email Action */}
              <button
                type="button"
                onClick={handleEmailClick}
                data-cursor="pointer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display tracking-wider uppercase text-xs font-medium text-hud-white">
                      Send Direct Email
                    </span>
                    <span className="text-[11px] font-mono text-hud-muted">
                      pminhchien2006@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Copy Email Action */}
              <button
                type="button"
                onClick={handleCopyClick}
                data-cursor="pointer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-hud-white shrink-0">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-cyber-red" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display tracking-wider uppercase text-xs font-medium text-hud-white">
                      {copied ? "Copied To Clipboard!" : "Copy Email Address"}
                    </span>
                    <span className="text-[11px] font-mono text-hud-dim">
                      {copied ? "Ready to paste in your email app" : "Click to copy address"}
                    </span>
                  </div>
                </div>
              </button>

              {/* GitHub Link */}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-obsidian-light/80 border border-hud-dim/25 hover:border-cyber-red/50 hover:bg-obsidian-surface transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-obsidian-surface border border-hud-dim/30 flex items-center justify-center text-cyber-red shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display tracking-wider uppercase text-xs font-medium text-hud-white">
                      GitHub Profile
                    </span>
                    <span className="text-[11px] font-mono text-hud-muted">
                      github.com/ChienPM-27
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-hud-dim group-hover:text-cyber-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Interactive Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-obsidian-light/95 border border-hud-dim/30 p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl">
              {/* Subtle Chamfer Ambient Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-cyber-red/10 rotate-45 border-b border-cyber-red/40" />
              </div>

              {status === "success" ? (
                /* Success Transmission Confirmation Screen */
                <div className="py-8 flex flex-col items-center text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.25)] animate-[scaleIn_0.4s_ease-out]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-emerald-400 font-semibold tracking-widest uppercase">
                      // TRANSMISSION DISPATCHED
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-hud-white tracking-tight">
                      Thank You, {name}!
                    </h3>
                    <p className="text-sm font-mono text-hud-muted max-w-md mt-1 leading-relaxed">
                      Your project inquiry regarding <span className="text-hud-white font-medium">{selectedDomain}</span> has been formatted and prepped for <span className="text-cyber-red">pminhchien2006@gmail.com</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian-surface border border-hud-dim/30 text-xs font-mono text-hud-dim text-left w-full max-w-md flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between">
                      <span className="text-hud-muted">Recipient:</span>
                      <span className="text-hud-white">Pham Minh Chien</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-hud-muted">Domain:</span>
                      <span className="text-hud-white">{selectedDomain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-hud-muted">Timeline:</span>
                      <span className="text-hud-white">{timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-hud-muted">Response SLA:</span>
                      <span className="text-emerald-400">Within 24 Hours</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    data-cursor="pointer"
                    className="mt-4 flex items-center gap-2 font-mono text-xs text-hud-muted hover:text-cyber-red transition-colors py-2 px-4 rounded-full border border-hud-dim/30 hover:border-cyber-red/40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* Interactive Form Fields */
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Form Title & Subtitle */}
                  <div className="flex items-center justify-between border-b border-hud-dim/20 pb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-cyber-red tracking-widest uppercase font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>INTERNSHIP &amp; PROJECT INQUIRY</span>
                    </div>
                    <span className="font-mono text-[10px] text-hud-dim uppercase">
                      DIRECT INBOX DISPATCH
                    </span>
                  </div>

                  {/* Error Notification Alert */}
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-cyber-red/10 border border-cyber-red/40 text-cyber-red text-xs font-mono flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Your Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs tracking-wider uppercase text-hud-muted flex items-center justify-between">
                        <span>// 01. YOUR NAME / COMPANY *</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan / Team"
                        className="w-full bg-obsidian-surface/90 border border-hud-dim/30 rounded-lg px-4 py-3 text-sm font-mono text-hud-white placeholder:text-hud-dim/50 focus:border-cyber-red focus:outline-none focus:ring-1 focus:ring-cyber-red/40 transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs tracking-wider uppercase text-hud-muted flex items-center justify-between">
                        <span>// 02. EMAIL ADDRESS *</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-obsidian-surface/90 border border-hud-dim/30 rounded-lg px-4 py-3 text-sm font-mono text-hud-white placeholder:text-hud-dim/50 focus:border-cyber-red focus:outline-none focus:ring-1 focus:ring-cyber-red/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Inquiry / Focus Type */}
                  <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-wider uppercase text-hud-muted">
                      // 03. INQUIRY / FOCUS TYPE
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((domain) => {
                        const isSelected = selectedDomain === domain;
                        return (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => setSelectedDomain(domain)}
                            data-cursor="pointer"
                            className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                              isSelected
                                ? "bg-cyber-red/20 text-hud-white border-cyber-red shadow-[0_0_12px_rgba(230,30,30,0.35)]"
                                : "bg-obsidian-surface/60 text-hud-muted border-hud-dim/30 hover:border-hud-dim/60 hover:text-hud-white"
                            }`}
                          >
                            {isSelected ? `✓ ${domain}` : domain}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 3: Timeline & Availability */}
                  <div className="flex flex-col gap-2.5">
                    <label className="font-mono text-xs tracking-wider uppercase text-hud-muted">
                      // 04. TIMELINE &amp; AVAILABILITY
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_OPTIONS.map((opt) => {
                        const isSelected = timeline === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTimeline(opt)}
                            data-cursor="pointer"
                            className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                              isSelected
                                ? "bg-cyber-red/20 text-hud-white border-cyber-red shadow-[0_0_12px_rgba(230,30,30,0.35)]"
                                : "bg-obsidian-surface/60 text-hud-muted border-hud-dim/30 hover:border-hud-dim/60 hover:text-hud-white"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Project Details & Requirements */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs tracking-wider uppercase text-hud-muted flex items-center justify-between">
                      <span>// 05. MESSAGE &amp; OPPORTUNITY DETAILS *</span>
                      <span className="text-[10px] text-hud-dim">INTERNSHIP SCOPE OR PROJECT GOAL</span>
                    </label>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Describe the internship role, team, technical requirements, or project you'd like to collaborate on..."
                      className="w-full bg-obsidian-surface/90 border border-hud-dim/30 rounded-lg p-4 text-sm font-mono text-hud-white placeholder:text-hud-dim/50 focus:border-cyber-red focus:outline-none focus:ring-1 focus:ring-cyber-red/40 transition-all resize-y min-h-[110px]"
                    />
                  </div>

                  {/* Submit Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-hud-dim">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-red" />
                      <span>Direct email transmission to author</span>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      data-cursor="pointer"
                      className="pill-btn pill-btn-red !py-3 !px-8 text-xs font-mono tracking-wider uppercase w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>DISPATCHING...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH MESSAGE / INQUIRY</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
