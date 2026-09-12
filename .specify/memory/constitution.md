<!--
Sync Impact Report:
- Version Change: Unratified Template -> v1.0.0 (MAJOR: Initial Ratification)
- Changes:
  - Ratified 7 core principles tailored to an AI/Software Engineer Portfolio.
  - Established modular project architecture with a centralized registry and isolated project folders.
  - Defined GSAP + ScrollTrigger for scroll-driven storytelling.
  - Defined Three.js + R3F + Drei for lazy-loaded 3D scenes.
  - Set Next.js + TypeScript + Tailwind CSS as the primary tech stack.
  - Defined dark, minimal, cinematic, technical visual direction.
  - Established performance budgets, mobile degradation strategies, and clean component boundaries.
- Principles Defined:
  1. I. Modular Project Architecture
  2. II. Scroll-Driven Storytelling
  3. III. Scalable 3D System & Lazy Loading
  4. IV. Focused Tech Stack & Strict Typing
  5. V. Technical, Cinematic & Purposeful Visual Direction
  6. VI. Performance Optimization & Responsive Degradation
  7. VII. Component Hygiene & Separation of Concerns
- Added Sections:
  - Technical Constraints & Standards
  - Development & Review Quality Gates
- Follow-up TODOs: None
-->

# AI/Software Engineer Portfolio Constitution

## Core Principles

### I. Modular Project Architecture
- Every portfolio project (case study) MUST reside in its own dedicated module: `projects/<project-slug>/{data.ts, Scene.tsx, ...}`.
- A central registry (`projects/registry.ts`) MUST serve as the sole source of truth declaring which projects exist and in what sequence they are rendered.
- Adding a new project MUST NEVER require modifying existing project modules or global layout components; the workflow MUST strictly consist of: (a) creating the new module, and (b) registering it in `projects/registry.ts`.
- Each project module's visual scene is free to adopt a distinct animation or presentation metaphor (e.g., 3D object, particle system, interactive UI mockup, architecture diagram). Forcing a shared visual or animation template across projects is strictly prohibited.
- **Rationale**: Guarantees zero-coupling between case studies, allows effortless extensibility, and lets each project showcase unique engineering challenges without layout fragility.

### II. Scroll-Driven Storytelling
- All scroll-driven motion and progress animations MUST be built using GSAP and ScrollTrigger.
- Scroll progress MUST directly drive animation states (such as translation, rotation, camera coordinates, opacity, and text reveals) to produce scroll-driven storytelling rather than passive "fade-in on visibility" triggers.
- Progress-linked animations MUST use `scrub`; pinned sections MUST only be employed where necessary to anchor narrative focus.
- Scroll behaviors MUST remain as simple and performant as possible while achieving the intended communicative effect.
- **Rationale**: Transforms passive page viewing into an engaging, interactive case study narrative while preventing jarring layout jumps or unnatural scroll hijacking.

### III. Scalable 3D System & Lazy Loading
- The 3D graphics stack MUST strictly use Three.js, React Three Fiber (R3F), and `@react-three/drei`.
- Supported graphical capabilities include GLB/GLTF 3D models, procedural primitives, wireframe structures, particle simulations, camera animations, and scroll-controlled spatial transforms.
- Heavy 3D assets, canvas contexts, and dense geometries MUST NOT be loaded during initial page load; per-project 3D scenes MUST be dynamically imported and lazy-loaded only when requested or entering the viewport.
- **Rationale**: Delivers high-impact 3D visual fidelity while safeguarding sub-second initial page load times and preserving battery and CPU resources.

### IV. Focused Tech Stack & Strict Typing
- The baseline technology stack MUST consist of Next.js (App Router), TypeScript, Tailwind CSS, GSAP / ScrollTrigger, and Three.js / R3F / Drei.
- Every external dependency added to the repository MUST have a clear, documented architectural purpose; adding packages merely for convenience or popularity is prohibited.
- TypeScript MUST be enforced across the entire codebase with `strict: true`; no `implicit any` or unverified types are allowed.
- **Rationale**: Prevents package dependency sprawl, minimizes security vulnerabilities, and guarantees high maintainability and type safety across complex mathematical and graphical code.

### V. Technical, Cinematic & Purposeful Visual Direction
- The visual presentation MUST be dark, minimal, cinematic, technical, and premium, characterized by strong typography, generous negative space, subtle glow effects, restrained color accents, and fluid transitions.
- Generic SaaS dashboard styles, excessive rainbow gradients, gratuitous glassmorphism, floating cards, boilerplate portfolio templates, and purely decorative animations MUST be avoided.
- Every animation, transition, or interactive widget MUST have an explicit communicative purpose tied to what that specific AI/software engineering project does. The portfolio MUST communicate "this engineer builds robust AI systems", not "this person knows how to animate."
- **Rationale**: Directly addresses technical recruiters and engineering leaders by establishing high credibility, domain mastery, and mature aesthetic restraint.

### VI. Performance Optimization & Responsive Degradation
- All components MUST adhere to performance best practices: code splitting, dynamic imports (`next/dynamic`), GPU-accelerated CSS/canvas transforms (`transform`, `opacity`), minimal React re-renders, and controlled DOM complexity.
- While the desktop viewport is the primary showcase environment, mobile devices MUST remain fully functional, readable, and navigable with zero horizontal overflow.
- On mobile and low-power devices, complex 3D scenes and heavy animation timelines MUST be deliberately simplified (not merely scaled down) to preserve smooth 60fps frame rates and storytelling clarity.
- **Rationale**: Ensures silky smooth interaction across all devices and prevents heavy graphical calculations from degrading the user experience on lower-end hardware.

### VII. Component Hygiene & Separation of Concerns
- The codebase MUST maintain small, modular components with clear typed contracts, strictly separating content definitions (`data.ts`, `profile.ts`) from presentation logic (`Scene.tsx`, layout components).
- Reusable animation and scroll utility abstractions MUST be created and shared from `lib/` to prevent duplicate ScrollTrigger lifecycle boilerplate across project modules.
- Monolithic god-components, single files containing both business and graphical logic, and leaking project-specific edge cases into global components are strictly forbidden.
- **Rationale**: Ensures that individual components remain easy to test, maintain, refactor, and review independently.

## Technical Constraints & Standards

- **Core Framework**: Next.js (App Router), React, TypeScript (`strict: true`).
- **Styling**: Tailwind CSS with carefully curated technical dark-theme palettes.
- **Animation Engine**: GSAP with ScrollTrigger plugin.
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`).
- **Directory Layout**:
  - `projects/<project-slug>/data.ts`: Project narrative, metrics, tech stack tags, repository links.
  - `projects/<project-slug>/Scene.tsx`: Isolated visual/3D component for the project.
  - `projects/registry.ts`: Central ordered list exporting all active projects.
  - `components/`: Global layout, typography, navigation, and reusable UI elements.
  - `lib/`: GSAP hooks, Three.js helpers, scroll utils, and shared types.

## Development & Review Quality Gates

1. **Gate 1 - Modular Compliance**: Adding a project touches only `projects/<project-slug>/` and `projects/registry.ts`. No shared layout files are edited.
2. **Gate 2 - Asset & Performance Budget**: All 3D scenes are dynamically loaded with appropriate Suspense fallbacks. No render-blocking 3D assets on root load.
3. **Gate 3 - Responsive Validation**: Validated on mobile (375px+), tablet, and desktop viewports. No horizontal scrollbars; animations degrade gracefully on touch devices.
4. **Gate 4 - Narrative & Aesthetic Review**: Design aligns with dark, cinematic, technical guidelines. Every animation clearly demonstrates an engineering or system concept.

## Governance

This Constitution establishes the non-negotiable architectural principles and quality standards for the portfolio codebase.

- **Precedence**: This Constitution supersedes all ad-hoc decisions, component libraries, and external templates.
- **Amendments**: Any change, removal, or addition of principles requires an explicit update to this document, a semantic version bump, and an updated Sync Impact Report.
- **Versioning Policy**:
  - `MAJOR`: Fundamental architectural shifts or breaking changes to core principles.
  - `MINOR`: New principles or substantive expansions to technical guidance.
  - `PATCH`: Wording clarifications, typo fixes, or formatting refinements.
- **Compliance**: Every feature specification (`/speckit-specify`), architectural plan (`/speckit-plan`), and implementation task (`/speckit-implement`) MUST verify compliance against these principles before merging.

**Version**: 1.0.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-13
