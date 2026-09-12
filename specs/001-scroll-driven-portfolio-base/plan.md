# Implementation Plan: Scroll-Driven Interactive Portfolio (Base & Project Registry)

**Branch**: `001-scroll-driven-portfolio-base` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-scroll-driven-portfolio-base/spec.md`

## Summary

Build the foundational, scroll-driven interactive portfolio web application for Pham Minh Chien (AI Engineer), implementing a modular project registry system and an alternating left/right layout engine driven by GSAP ScrollTrigger. The milestone proves the architecture using real resume content for the Hero and About/Contact sections, combined with 2–3 lightweight placeholder project modules (`project-a`, `project-b`, `project-c`) with distinct visual metaphors (3D primitive, particle visual, UI mockup).

---

## Technical Context

**Language/Version**: TypeScript 5+ (Strict Mode enabled), Node.js v18+ (tested on Node v26.8.1).  
**Primary Dependencies**:
- Next.js 15 (App Router)
- React 19 / 18
- Tailwind CSS
- GSAP & `@gsap/react` (ScrollTrigger)
- Three.js (`three`, `@types/three`)
- React Three Fiber (`@react-three/fiber`) & `@react-three/drei`
- Lucide React (for technical icons)

**Storage**: In-memory static data modules (`projects/<slug>/data.ts` and `data/profile.ts`).  
**Testing**:
- Type check: `tsc --noEmit`
- Production build validation: `npm run build`
- Runtime & layout verification: Scenarios documented in `quickstart.md`

**Target Platform**: Modern Evergreen Browsers (Chrome, Firefox, Safari, Edge) across Desktop, Tablet, and Mobile devices (down to 375px).  
**Project Type**: Next.js App Router Web Application.  
**Performance Goals**:
- First Contentful Paint < 1.5s
- 60 fps scroll-driven transitions with scrubbed interpolation
- Zero horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`) on viewports down to 375px

**Constraints**:
- Adherence to the 7 Ratified Principles in `.specify/memory/constitution.md`.
- No sensitive personal contact information (raw phone number, un-obfuscated email) in public DOM.
- Lazy load per-project 3D scenes via `next/dynamic(..., { ssr: false })` with Suspense fallbacks.

**Scale/Scope**: Base application shell, navigation, Hero section, About/Contact summary, and 3 placeholder project modules demonstrating the registry.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Assessment | Status |
| :--- | :--- | :--- | :---: |
| **I. Modular Project Architecture** | Isolated project modules under `projects/<slug>/` + single registry in `projects/registry.ts`. Adding a project requires 0 edits to existing modules or global layout. | Verified by design contracts in `data-model.md` and `contracts/project-module.ts`. | **PASS** |
| **II. Scroll-Driven Storytelling** | GSAP + ScrollTrigger scrub driving animation progress, not passive fade-in. Simple, performant behavior. | Designed with `useGSAP`, `ScrollTrigger.create({ scrub: 0.5 })` passing progress to scenes. | **PASS** |
| **III. Scalable 3D System** | Three.js + R3F + Drei. Lazy-loaded 3D scenes with zero blocking on initial load. | Dynamic imports (`next/dynamic`) with Suspense fallbacks for all project visual scenes. | **PASS** |
| **IV. Focused Tech Stack** | Next.js, TypeScript (`strict: true`), Tailwind CSS, GSAP, Three.js/R3F/Drei. No bloat. | Exactly the ratified core dependencies; TypeScript strictness enforced throughout. | **PASS** |
| **V. Visual Direction** | Dark, minimal, cinematic, technical, generous space, communicating AI engineering capability. | Dark zinc/slate theme with cyan/emerald technical accents, monospaced tech tags, restrained animations. | **PASS** |
| **VI. Performance & Responsive** | GPU transforms, dynamic imports, mobile degradation, zero horizontal overflow at 375px. | Tested mobile contract: stacked layout, constrained scene height, overflow-x clipping, touch preservation. | **PASS** |
| **VII. Code Quality** | Separation of content (`data.ts`) and presentation (`Scene.tsx`). Reusable scroll utils in `lib/`. No god-components. | Explicit separation in module structure; shared ScrollTrigger abstractions in `lib/`. | **PASS** |

*Post-Design Evaluation*: All gates remain satisfied with 0 violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-scroll-driven-portfolio-base/
├── spec.md                  # Feature Specification
├── plan.md                  # This Implementation Plan
├── research.md              # Architecture & Technology Research
├── data-model.md            # Schema definitions & validation rules
├── quickstart.md            # Verification & testing procedures
├── contracts/               # Interface contracts
│   ├── project-module.ts    # TypeScript interfaces for project modules & registry
│   └── scroll-system.md     # ScrollTrigger & layout synchronization contract
└── checklists/
    └── requirements.md      # Specification Quality Checklist
```

### Source Code (repository root)

```text
Portfolio/
├── .agents/                 # Spec Kit skills
├── .specify/                # Spec Kit memory, templates, and scripts
├── specs/                   # Feature specifications and planning artifacts
├── app/
│   ├── layout.tsx           # Root layout: fonts, metadata, global styles
│   ├── page.tsx             # Main scroll-driven portfolio page
│   └── globals.css          # Tailwind CSS directives and custom scroll utility classes
├── components/
│   ├── shell/
│   │   ├── Navigation.tsx   # Minimal header with logo/status and navigation links
│   │   └── Footer.tsx       # Minimal bottom attribution and copyright
│   ├── hero/
│   │   ├── Hero.tsx         # Verified identity, role, positioning statement
│   │   └── ScrollCue.tsx    # Subtle animated indicator inviting downward scroll
│   ├── projects/
│   │   ├── ProjectSection.tsx # Orchestrator alternating left/right layout & ScrollTrigger
│   │   ├── ProjectDetails.tsx # Title, tagline, description, tech stack tags, links
│   │   └── SceneContainer.tsx # Suspense container hosting lazy-loaded visual scene
│   └── about/
│       └── AboutSection.tsx # Background (Sai Gon University), skills summary, secure contact
├── data/
│   └── profile.ts           # Verified resume profile data (Pham Minh Chien)
├── lib/
│   ├── gsap.ts              # GSAP & ScrollTrigger client registration
│   ├── scroll-utils.ts      # Normalized scroll math and resize handlers
│   └── types.ts             # Shared interfaces (re-exporting project contracts)
├── projects/
│   ├── registry.ts          # Central registry exporting active projects
│   ├── project-a/           # Placeholder 1: Rotating 3D Geometric Primitive
│   │   ├── data.ts
│   │   └── Scene.tsx
│   ├── project-b/           # Placeholder 2: Particle / Data Flow Visual
│   │   ├── data.ts
│   │   └── Scene.tsx
│   └── project-c/           # Placeholder 3: Technical UI Mockup Reveal
│       ├── data.ts
│       └── Scene.tsx
├── public/                  # Static assets and favicon
├── package.json             # Dependencies and scripts
├── tsconfig.json            # Strict TypeScript configuration
├── tailwind.config.ts       # Dark technical theme color palette
└── next.config.mjs          # Next.js configuration (transpilePackages if needed for Three/R3F)
```

**Structure Decision**: A clean Next.js App Router structure where all case study content is encapsulated under `projects/<slug>/`, presentation components are organized by narrative section under `components/`, and shared logic is housed in `lib/` and `data/`.

---

## Complexity Tracking

*No constitutional violations identified. No unjustified architectural complexity introduced.*