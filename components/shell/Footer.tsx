import React from "react";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border/40 py-8 px-6 bg-zinc-950/60 text-xs font-mono text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{profile.name} — Portfolio v1.0</span>
        </div>
        <div className="text-zinc-600 text-center sm:text-right">
          <span>{profile.education.institution} • {profile.location}</span>
        </div>
      </div>
    </footer>
  );
}