# Technical Research & Architecture Decisions

**Feature**: Scroll-Driven Interactive Portfolio (Base & Project Registry)  
**Branch**: `001-scroll-driven-portfolio-base`  
**Date**: 2026-09-13  

## 1. Application Framework & Runtime

### Decision
Use **Next.js (App Router)** with **TypeScript (`strict: true`)** and **React 19 / 18**.

### Rationale
- Next.js App Router provides built-in code-splitting, nested layouts, first-class TypeScript support, and out-of-the-box metadata/SEO management.
- Dynamic imports via `next/dynamic` with `ssr: false` allow client-only 3D canvases and animation controllers to load on demand without breaking Next.js server pre-rendering.
- Produces production-ready static export or edge-deployable builds (`next build`).

### Alternatives Considered
- *Vite + React SPA*: Lightweight, but lacks built-in server-side metadata generation, optimized font loading, and standard folder-based architectural scaffolding that Next.js provides.
- *Astro*: Excellent content-first framework, but integrating complex interactive multi-canvas R3F + GSAP scroll trees is more idiomatic in a unified Next.js/React environment.

---

## 2. Scroll-Driven Storytelling Architecture

### Decision
Use **GSAP** (`gsap`) with the **ScrollTrigger** plugin (`ScrollTrigger`) wrapped in `@gsap/react` (`useGSAP`).

### Rationale
- GSAP's ScrollTrigger is the industry standard for high-performance scroll interpolation, pinned sections, and bidirectional `scrub`.
- Clean cleanup and context scoping: `@gsap/react` provides automatic scope isolation and lifecycle disposal on unmount, preventing memory leaks and orphaned triggers during React hot-reloading.
- Matches Principle II (Scroll-Driven Storytelling) of the Constitution: progress values directly drive scene states rather than simple trigger-once fade-ins.

### Alternatives Considered
- *Framer Motion / Motion for React*: Great for standard UI element micro-interactions, but less deterministic and significantly harder to synchronize smoothly with complex 3D coordinate transformations and multi-phase pinned scroll timelines compared to GSAP ScrollTrigger.
- *Native CSS Scroll-Driven Animations (`animation-timeline: scroll()`)*: Modern but lacks uniform cross-browser support (especially older Safari / iOS versions) and cannot directly synchronize WebGL canvas render loops.

---

## 3. 3D Graphics & Canvas Lifecycle

### Decision
Use **Three.js** with **React Three Fiber (`@react-three/fiber`)** and **Drei (`@react-three/drei`)**, with isolated, per-project lazy-loaded scenes.

### Rationale
- Declarative component-based 3D scene definitions allow each project to define its own 3D scene (`Scene.tsx`) in isolation.
- Principle III of the Constitution mandates lazy loading: project 3D scenes are dynamically loaded with `next/dynamic(..., { ssr: false })` and encapsulated inside Suspense boundaries.
- Per-project scenes ensure that placeholder projects (`project-a`, `project-b`, `project-c`) can demonstrate distinct animation metaphors:
  1. `project-a`: Rotating geometric wireframe 3D object (R3F Canvas).
  2. `project-b`: Dynamic data / particle visual (Canvas / CSS particles).
  3. `project-c`: Interactive technical UI mockup reveal (DOM / SVG with GSAP timeline).

### Alternatives Considered
- *Single Global Full-Screen Canvas*: Forces all projects to share a single Three.js scene graph. Rejected because Principle I strictly states: "Each project's visual scene is free to use a completely different animation metaphor... Do not force a shared animation template across projects."
- *Spline / Babylon.js*: Spline models are heavy external embeds; Babylon.js has less React ergonomic support than the mature R3F/Drei ecosystem.

---

## 4. Modular Project Registry Pattern

### Decision
A strictly typed, centralized registry pattern:
- Each project lives in `projects/<project-slug>/`:
  - `data.ts`: Exports typed `ProjectData` (title, slug, tagline, description, techStack, links, role, metrics).
  - `Scene.tsx`: Client component exporting default or named scene accepting `VisualSceneProps` (`progress: number`, `isActive: boolean`).
- `projects/registry.ts`: The single source of truth exporting an ordered list of registered projects (`ProjectDefinition[]`).

### Rationale
- Enforces strict separation of content (`data.ts`) and presentation (`Scene.tsx`).
- Satisfies Principle I and Acceptance Criteria: adding a new project requires creating a new folder under `projects/` and adding one line to `registry.ts`. No other file needs to be modified.

---

## 5. Visual Direction & Styling

### Decision
**Tailwind CSS** with a curated dark, technical color palette:
- Background: Deep void (`#09090b` zinc-950), surface (`#121215` / `#18181b`).
- Accents: Subtle cyan/electric blue (`#06b6d4`, `#38bdf8`), technical emerald (`#10b981`), and muted slate borders (`#27272a`).
- Typography: Sans-serif for crisp editorial reading (Inter / Geist Sans) paired with Monospace (Geist Mono / JetBrains Mono) for tech stack tags, metrics, and terminal elements.
- Clean negative space, subtle glow shaders, and zero visual clutter.

---

## 6. Privacy Protection & Anti-Scraping

### Decision
Obfuscate sensitive contact information in client-rendered markup:
- Email (`pminhchien2006@gmail.com`) is not rendered as static plaintext in DOM; it is constructed via a client-side interaction handler or encoded `mailto:` trigger.
- Phone number is completely excluded from plain public view.
- Verified public links (GitHub: `https://github.com/ChienPM-27`, LinkedIn) are provided directly with safe `rel="noopener noreferrer"`.