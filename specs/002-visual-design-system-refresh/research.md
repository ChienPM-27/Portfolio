# Technical Research & Architecture Decisions: Visual Refresh

**Feature**: Visual Design System Refresh (Tokens & Supporting Sections)  
**Branch**: `002-visual-design-system-refresh`  
**Date**: 2026-09-13  

## 1. Typography Integration

### Decision
Use **Next.js Font Optimization** (`next/font/google`) to load **Inter** and **Instrument Serif** with CSS variables.

### Rationale
- `next/font/google` automatically hosts font files with zero external network requests to Google servers at runtime, preventing render blocking and eliminating layout shift (CLS).
- Configuration:
  - `Inter`: Weights 300, 400, 500, 600, 700 with variable `--font-sans`.
  - `Instrument_Serif`: Weight 400 with style italic and normal with variable `--font-serif`.
- Expressive editorial contrast: pairing a precise technical sans-serif (Inter) with a high-end editorial italic serif (Instrument Serif) creates a distinct, cinematic aesthetic that moves far beyond generic SaaS templates.

---

## 2. Design Tokens & Dark HSL Palette

### Decision
Define centralized CSS custom properties in `app/globals.css` mapped to Tailwind CSS utilities:
- `--bg`: `240 10% 3.9%` (Darkest backdrop `#09090b`)
- `--surface`: `240 6% 6.5%` (Card & container surfaces `#101012`)
- `--surface-muted`: `240 5% 10%` (Subdued surfaces `#18181b`)
- `--text`: `0 0% 98%` (High contrast primary text `#fafafa`)
- `--muted`: `240 5% 65%` (Subdued secondary text `#a1a1aa`)
- `--stroke`: `240 5% 15%` (Muted technical borders `#27272a`)
- `--accent-start`: `#89AACC` (Soft slate cyan)
- `--accent-end`: `#4E85BF` (Deep cobalt blue)

### Rationale
- HSL tokens allow dynamic alpha transparency compositing (`hsl(var(--surface) / 0.8)`).
- The accent gradient `#89AACC` -> `#4E85BF` provides a unified visual motif across the progress bar, logo ring, and active borders.
- Keyframe `gradient-shift` rotates linear gradients smoothly for dynamic border illumination.

---

## 3. High-Precision Loading Screen

### Decision
Implement `LoadingScreen.tsx` driven by `window.requestAnimationFrame`:
- Total duration: 2700ms (~2.7s).
- Easing: Quad-out interpolation so counter begins quickly and decelerates into the final 90s for suspense.
- Display: 3-digit formatted counter (`000` to `100`).
- Status words: `['INITIALIZING TENSORS', 'CALIBRATING 3D RECON', 'DISPATCHING GPU PIPELINES', 'PREPARING SCENE GRAPH', 'SYSTEM READY']` updated at calculated progress thresholds (0%, 25%, 50%, 75%, 95%).
- Dismissal: Triggers a GSAP / CSS fade-out with `pointer-events: none` and unmounts to free CPU resources.
- Reduced Motion: If `prefers-reduced-motion` is active, duration is clamped to 400ms or bypassed.

---

## 4. Floating Pill Navigation with Scroll Elevation

### Decision
A fixed, centered floating pill navigation container:
- Layout: `fixed top-5 left-1/2 -translate-x-1/2 z-50`.
- Backdrop: `backdrop-blur-xl bg-zinc-950/70 border border-zinc-800/50`.
- Logo mark: Gradient ring (`from-[#89AACC] to-[#4E85BF]`) around a minimal terminal glyph.
- Scroll detection: Listens to scroll events (or ScrollTrigger) with passive throttling; when `scrollY > 20`, applies `shadow-[0_12px_32px_rgba(0,0,0,0.6)] border-zinc-700/80 bg-zinc-950/90`.

---

## 5. Hero Entrance & Role-Cycling

### Decision
- **Entrance Animation**: GSAP timeline applying a staggered blur-in (`filter: blur(10px) -> blur(0px)`, `opacity: 0 -> 1`, `y: 25 -> 0`) for the name and positioning statement.
- **Role Cycling**: An automated text rotator cycling through verified specializations:
  1. `AI Engineer`
  2. `Computer Vision & 3D Reconstruction`
  3. `Cloud GPU Inference Specialist`
  4. `Information Technology B.Eng`
- Text transitions occur every 3.2s via a smooth slide-and-fade transition.

---

## 6. Infinite Marquee & Concluding Footer

### Decision
- **Infinite Marquee**: Two duplicated horizontal text tracks animating seamlessly via GSAP `to(track, { xPercent: -50, repeat: -1, ease: "none", duration: 25 })` or pure CSS keyframe.
- **Stats Row**: Highlights 4 key quantitative achievements directly verified from resume & architecture:
  - GPU Utilization: `94.2%`
  - Cloud Inference Latency: `< 45ms`
  - Academic Degree: `Sai Gon University 2024–2029`
  - Case Studies: `3 Modular Projects`
- **Availability Beacon**: Live pulsing emerald beacon (`animate-pulse ring-4 ring-emerald-500/20`) signaling immediate readiness for junior/intern opportunities.