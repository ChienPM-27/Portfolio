# Tasks: Visual Design System Refresh

**Branch**: `002-visual-design-system-refresh` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup (Tokens & Typography)

**Purpose**: Establish font imports, dark HSL custom properties, and Tailwind utility extensions.

- [x] T001 Configure Inter and Instrument Serif font imports via next/font/google in app/layout.tsx
- [x] T002 Inject dark HSL tokens, accent-gradient, and gradient-shift keyframes in app/globals.css
- [x] T003 [P] Extend Tailwind configuration with HSL theme tokens and font-serif utilities in tailwind.config.ts

---

## Phase 2: Foundational (Layout & Global Utilities)

**Purpose**: Shared utilities for scroll elevation detection and component contracts.

**⚠️ CRITICAL**: Must be completed before component restyling begins.

- [x] T004 Create scroll depth elevation detection hook in lib/scroll-utils.ts
- [x] T005 [P] Define visual system, loader state, and footer metric contracts in lib/types.ts

**Checkpoint**: Core tokens and utilities ready — UI component restyling can begin.

---

## Phase 3: User Story 1 - Cinematic First Load & Loading Screen (Priority: P1) 🎯 MVP

**Goal**: Deliver a full-screen overlay with requestAnimationFrame 000-100 counter over ~2.7s, rotating words, and gradient progress bar.

**Independent Test**: Hard reload page; verify 3-digit counter counts smoothly from 000 to 100 with rotating status words and smoothly dissolves into the Hero.

- [x] T006 [P] [US1] Implement full-screen loading screen overlay with rAF 000-100 counter and rotating words in components/shell/LoadingScreen.tsx
- [x] T007 [US1] Mount LoadingScreen into root layout with session state and exit transition in app/layout.tsx

**Checkpoint**: User Story 1 (MVP) is independently functional and viewable.

---

## Phase 4: User Story 2 - Elevated Typography & Dark Design Tokens (Priority: P1)

**Goal**: Apply editorial Instrument Serif italic accents and dark HSL surface styling to existing sections.

**Independent Test**: Inspect typography and DOM styling across sections; verify Instrument Serif italic on accents and dark HSL surfaces with accent gradients.

- [x] T008 [P] [US2] Apply Instrument Serif italic accents and HSL token classes to section headers in components/projects/ProjectDetails.tsx
- [x] T009 [P] [US2] Restyle About & Contact section with dark HSL token surfaces and subtle gradient borders in components/about/AboutSection.tsx

**Checkpoint**: Supporting sections adopt the new dark HSL tokens and typography.

---

## Phase 5: User Story 3 - Context-Aware Floating Pill Navigation (Priority: P2)

**Goal**: Transform Navigation into a floating centered pill with backdrop-blur, gradient ring logo, and scroll-elevated shadow.

**Independent Test**: Scroll down past 20px; verify floating pill gains distinct drop shadow and enhanced border contrast.

- [x] T010 [P] [US3] Implement logo mark with accent gradient ring in components/shell/Navigation.tsx
- [x] T011 [US3] Restyle Navigation into a floating centered pill with backdrop-blur and scroll-depth elevation in components/shell/Navigation.tsx

**Checkpoint**: Floating pill navigation is fully responsive and interactive.

---

## Phase 6: User Story 4 - Restyled Hero Narrative with Role Cycling (Priority: P2)

**Goal**: Restyle Hero section with a GSAP blur-in entrance timeline, Instrument Serif name accent, and role-cycling subline.

**Independent Test**: Observe Hero section; verify candidate name reveals with a blur-in timeline and subline cycles smoothly through verified engineering titles.

- [x] T012 [P] [US4] Implement name-reveal and blur-in GSAP entrance timeline in components/hero/Hero.tsx
- [x] T013 [US4] Implement automated role-cycling subline cycling through verified technical specializations in components/hero/Hero.tsx

**Checkpoint**: Hero section delivers an elevated, dynamic technical presentation.

---

## Phase 7: User Story 5 - Dynamic Footer with Infinite Marquee & Real-Time Availability (Priority: P3)

**Goal**: Deliver an impactful concluding footer featuring an infinite marquee loop, technical stats row, and pulsing availability badge.

**Independent Test**: Scroll to bottom; verify seamless 60fps marquee, 4 technical benchmark cards, and pulsing green status badge.

- [x] T014 [P] [US5] Implement seamless infinite horizontal marquee text loop in components/shell/Footer.tsx
- [x] T015 [P] [US5] Implement verified technical stats row in components/shell/Footer.tsx
- [x] T016 [US5] Implement pulsing emerald Available for Roles status badge and social triggers in components/shell/Footer.tsx

**Checkpoint**: Concluding footer delivers high-impact closing statement and contact triggers.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Type safety validation, production build verification, and responsive audit.

- [x] T017 Execute TypeScript strict type checking via tsc --noEmit
- [x] T018 Execute production application build via npm run build
- [x] T019 Run end-to-end verification checklist and 375px mobile overflow check per specs/002-visual-design-system-refresh/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Phase 1 (Setup)**: Can start immediately.
2. **Phase 2 (Foundational)**: Depends on Phase 1 completion. Blocks UI component tasks.
3. **Phase 3 (User Story 1 - P1)**: Depends on Phase 2. Forms the visual refresh MVP.
4. **Phase 4 (User Story 2 - P1)**: Depends on Phase 1 & 2.
5. **Phase 5 (User Story 3 - P2)**: Depends on Phase 2 (scroll detection utility).
6. **Phase 6 (User Story 4 - P2)**: Depends on Phase 1 & 2.
7. **Phase 7 (User Story 5 - P3)**: Depends on Phase 1 & 2.
8. **Phase 8 (Polish)**: Depends on all prior phases.

### Parallel Opportunities

- **Setup**: T003 can run in parallel with T002.
- **Foundational**: T005 can run in parallel with T004.
- **User Story 2**: T008 and T009 can run in parallel.
- **User Story 3**: T010 can run in parallel with T011.
- **User Story 4**: T012 can run in parallel with T013.
- **User Story 5**: T014 and T015 can run in parallel before T016.

---

## Implementation Strategy

### MVP First (User Story 1: Loading Screen & Tokens)
1. Complete Phase 1 (Tokens & Typography).
2. Complete Phase 2 (Foundational Utilities).
3. Complete Phase 3 (Loading Screen).
4. Validate MVP: Choreographed ~2.7s loading sequence unmasks the application smoothly.

### Incremental Delivery
1. Add Phase 4 (Tokens & Typography on supporting sections).
2. Add Phase 5 (Floating Pill Navbar).
3. Add Phase 6 (Restyled Hero with Name Reveal & Role Cycling).
4. Add Phase 7 (Dynamic Footer with Marquee & Stats).
5. Run Phase 8 (TypeScript check, production build, 375px mobile audit).