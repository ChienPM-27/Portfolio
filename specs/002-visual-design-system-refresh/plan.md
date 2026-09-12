# Implementation Plan: Visual Design System Refresh

**Branch**: `002-visual-design-system-refresh` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-visual-design-system-refresh/spec.md`

## Summary

Refresh the portfolio's visual design system by introducing standardized dark HSL design tokens, an editorial typography pairing (Inter + Instrument Serif), a signature accent gradient (`#89AACC` to `#4E85BF`), a high-precision loading screen (~2.7s rAF counter), a floating pill navigation bar with scroll elevation, a restyled Hero section with an entrance reveal timeline and role-cycling subline, and an impactful footer featuring an infinite marquee loop, technical stats row, and active availability indicator. All existing project registry modules, 3D scenes, and scroll-driven storytelling mechanics remain completely untouched.

---

## Technical Context

**Language/Version**: TypeScript 5+ (Strict Mode), Node.js v18+ (verified on Node v26.8.1).  
**Primary Dependencies**:
- Next.js 15 (App Router) & React 19
- `next/font/google` (`Inter` and `Instrument_Serif`)
- Tailwind CSS (extended theme)
- GSAP & `@gsap/react` (entrance animations & marquee)
- Lucide React

**Storage**: In-memory static profile data (`data/profile.ts`).  
**Testing**:
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Production build: `npm run build`
- Manual verification: Scenarios in `quickstart.md`

**Target Platform**: Desktop, Tablet, and Mobile devices (down to 375px width).  
**Project Type**: Next.js App Router Web Application (Visual Layer Refresh).  
**Performance Goals**:
- Loader sequence executes in 2.7s ± 0.3s and unmounts cleanly
- Marquee text runs at a smooth 60fps without layout jitter
- Zero horizontal overflow (`scrollWidth === clientWidth`) across all screen widths

**Constraints**:
- Must NOT alter `projects/registry.ts` or project case study modules.
- Must NOT introduce Bento-grid overview pages, blog sections, or parallax image galleries.
- Must retain all verified resume copy from `data/profile.ts`.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Assessment | Status |
| :--- | :--- | :--- | :---: |
| **I. Modular Project Architecture** | Isolated project modules under `projects/<slug>` + single registry in `projects/registry.ts`. | **PASS**: Zero changes to project modules or registry. | **PASS** |
| **II. Scroll-Driven Storytelling** | GSAP + ScrollTrigger driving case studies. | **PASS**: Storytelling sequence is preserved intact; explicitly rejects static bento-grid replacements. | **PASS** |
| **III. Scalable 3D System** | Three.js + R3F + Drei lazy-loaded. | **PASS**: Project scenes continue to be dynamically imported and lazy-loaded. | **PASS** |
| **IV. Focused Tech Stack** | Next.js, TS (`strict: true`), Tailwind, GSAP. No dependency bloat. | **PASS**: Leverages built-in `next/font/google` and existing GSAP/Tailwind libraries. | **PASS** |
| **V. Visual Direction** | Dark, minimal, cinematic, technical, generous space, communicating AI engineering capability. | **PASS**: Dark HSL tokens, Instrument Serif editorial accents, and technical telemetry heighten the aesthetic. | **PASS** |
| **VI. Performance & Responsive** | GPU transforms, mobile degradation, zero horizontal overflow at 375px. | **PASS**: Loader uses rAF, marquee uses GPU transforms, 375px mobile overflow-x is strictly clipped. | **PASS** |
| **VII. Code Quality** | Small reusable components, clear types, no god-components. | **PASS**: Encapsulated components (`LoadingScreen`, `Navigation`, `Hero`, `Footer`). | **PASS** |

*Post-Design Evaluation*: All gates satisfied with 0 violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-visual-design-system-refresh/
├── spec.md                  # Feature Specification
├── plan.md                  # This Implementation Plan
├── research.md              # Typography, token & animation research
├── data-model.md            # Schema definitions & validation rules
├── quickstart.md            # Verification & testing procedures
├── contracts/               # Interface contracts
│   └── visual-system.ts     # TypeScript interfaces for tokens & loader state
└── checklists/
    └── requirements.md      # Specification Quality Checklist
```

### Source Code Modifications

```text
Portfolio/
├── app/
│   ├── layout.tsx           # [MODIFY] Configure Google fonts (Inter + Instrument Serif) & mount LoadingScreen
│   └── globals.css          # [MODIFY] Inject dark HSL tokens, accent-gradient, and gradient-shift keyframes
├── tailwind.config.ts       # [MODIFY] Extend theme with HSL colors, font variables, and accent-gradient
├── components/
│   ├── shell/
│   │   ├── LoadingScreen.tsx # [NEW] Full-screen rAF 000-100 loader with rotating words & progress bar
│   │   ├── Navigation.tsx   # [MODIFY] Restyle into floating pill with backdrop-blur & scroll elevation
│   │   └── Footer.tsx       # [MODIFY] Restyle with infinite marquee, stats row, and pulsing availability badge
│   └── hero/
│       └── Hero.tsx         # [MODIFY] Apply name-reveal timeline, Instrument Serif accent, and role-cycling
├── data/
│   └── profile.ts           # [PRESERVE] Unaltered source of truth
└── projects/
    └── registry.ts          # [PRESERVE] Unaltered project registry
```

**Structure Decision**: A surgical visual refresh modifying only shell/hero components and style configurations while keeping the core project registry and scroll architecture 100% intact.

---

## Complexity Tracking

*No constitutional violations identified. No unjustified architectural complexity introduced.*