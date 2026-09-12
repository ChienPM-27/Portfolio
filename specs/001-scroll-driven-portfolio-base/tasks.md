# Tasks: Scroll-Driven Interactive Portfolio (Base & Project Registry)

**Branch**: `001-scroll-driven-portfolio-base` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project workspace, framework configurations, and core dependencies.

- [X] T001 Initialize Next.js project scaffolding and configuration files in package.json, tsconfig.json, tailwind.config.ts, and next.config.mjs
- [X] T002 Install core runtime dependencies (gsap, @gsap/react, three, @types/three, @react-three/fiber, @react-three/drei, lucide-react) in package.json
- [X] T003 [P] Configure global Tailwind CSS directives and technical dark theme variables in app/globals.css
- [X] T004 [P] Create shared TypeScript interfaces and project module contracts in lib/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data models, scroll triggers, layout shell, and registry infrastructure required by all user stories.

**⚠️ CRITICAL**: Must be completed before user story implementation begins.

- [X] T005 Create verified resume profile data module with biographical data in data/profile.ts
- [X] T006 [P] Implement GSAP and ScrollTrigger client registration and cleanup hooks in lib/gsap.ts
- [X] T007 [P] Implement normalized scroll progress calculations and resize handlers in lib/scroll-utils.ts
- [X] T008 [P] Create project registry structure and export definition in projects/registry.ts
- [X] T009 Create root HTML layout with viewport settings and font declarations in app/layout.tsx
- [X] T010 [P] Implement global navigation bar with status indicator in components/shell/Navigation.tsx
- [X] T011 [P] Implement global footer with technical attribution in components/shell/Footer.tsx

**Checkpoint**: Foundation ready — user story implementation can begin.

---

## Phase 3: User Story 1 - Immersive First Impression & Hero Narrative (Priority: P1) 🎯 MVP

**Goal**: Present Pham Minh Chien's verified identity, AI Engineer role, positioning statement, and scroll cue above the fold.

**Independent Test**: Load page root; verify that name, role, positioning statement, and animated scroll cue render cleanly within 1.5s.

- [X] T012 [P] [US1] Implement animated scroll cue component in components/hero/ScrollCue.tsx
- [X] T013 [US1] Implement Hero section with verified resume copy and responsive typography in components/hero/Hero.tsx
- [X] T014 [US1] Mount Navigation and Hero section into page layout in app/page.tsx

**Checkpoint**: User Story 1 (MVP) is independently functional and viewable.

---

## Phase 4: User Story 2 - Scroll-Driven Case Study Discovery (Priority: P1)

**Goal**: Deliver scroll-driven case study transitions alternating between left/right layout orientations with GSAP scrub.

**Independent Test**: Scroll down past Hero; verify project sections transition smoothly, alternating visual and text positioning, with scenes responding to scroll progress.

- [X] T015 [P] [US2] Implement project narrative details component (title, tagline, description, tech stack, links) in components/projects/ProjectDetails.tsx
- [X] T016 [P] [US2] Implement lazy-loaded visual scene wrapper with Suspense fallback in components/projects/SceneContainer.tsx
- [X] T017 [US2] Implement alternating left/right layout orchestrator with ScrollTrigger scrub in components/projects/ProjectSection.tsx
- [X] T018 [US2] Connect project section stream to registry and render in app/page.tsx

**Checkpoint**: User Stories 1 and 2 deliver an interactive scroll-driven narrative stream.

---

## Phase 5: User Story 3 - Extensible Modular Architecture Proof (Priority: P2)

**Goal**: Prove modular project isolation using 3 lightweight placeholder modules with distinct visual metaphors.

**Independent Test**: Verify that 3 placeholder projects render sequentially with unique visual metaphors, and adding an arbitrary 4th module touches only its folder and `registry.ts`.

- [X] T019 [P] [US3] Implement placeholder module project-a (rotating 3D geometric wireframe) in projects/project-a/data.ts and projects/project-a/Scene.tsx
- [X] T020 [P] [US3] Implement placeholder module project-b (particle / data flow visual) in projects/project-b/data.ts and projects/project-b/Scene.tsx
- [X] T021 [P] [US3] Implement placeholder module project-c (technical UI mockup reveal) in projects/project-c/data.ts and projects/project-c/Scene.tsx
- [X] T022 [US3] Register project-a, project-b, and project-c in projects/registry.ts

**Checkpoint**: Modular registry architecture is fully functional and proven.

---

## Phase 6: User Story 4 - Seamless Mobile & Cross-Device Responsiveness (Priority: P2)

**Goal**: Ensure fluid performance, zero horizontal overflow, and stacked mobile layouts on viewports down to 375px.

**Independent Test**: Emulate 375px viewport width; verify `document.documentElement.scrollWidth === window.innerWidth` and touch scrolling is fluid.

- [X] T023 [P] [US4] Implement mobile-first stacked layout rules and height clamps in components/projects/ProjectSection.tsx
- [X] T024 [P] [US4] Enforce strict horizontal overflow containment across all viewports in app/globals.css and app/layout.tsx
- [X] T025 [US4] Implement accessibility reduced motion fallbacks in lib/scroll-utils.ts and components/projects/ProjectSection.tsx

**Checkpoint**: Mobile and accessibility degradation confirmed across all viewports.

---

## Phase 7: User Story 5 - Privacy-Preserving Professional Contact & Social Links (Priority: P3)

**Goal**: Offer secure professional contact and verified GitHub profile access without exposing raw email or phone numbers to scrapers.

**Independent Test**: Inspect DOM markup in contact section; verify absence of plaintext phone/email and confirm functional GitHub link.

- [X] T026 [P] [US5] Implement obfuscated mailto encoding and contact trigger helpers in lib/contact-utils.ts
- [X] T027 [US5] Implement About and Contact section with Sai Gon University education and verified links in components/about/AboutSection.tsx
- [X] T028 [US5] Mount AboutSection at the conclusion of the page narrative in app/page.tsx

**Checkpoint**: End-to-end portfolio story complete from Hero to Contact.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Type safety validation, production build verification, and end-to-end quality audit.

- [X] T029 Execute TypeScript strict type checking via tsc --noEmit
- [X] T030 Execute production application build via npm run build
- [X] T031 Run end-to-end verification checklist and modular extension test per specs/001-scroll-driven-portfolio-base/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Phase 1 (Setup)**: Can start immediately.
2. **Phase 2 (Foundational)**: Depends on Phase 1. Blocks all User Stories.
3. **Phase 3 (User Story 1 - P1)**: Depends on Phase 2. Forms the Minimum Viable Product (MVP).
4. **Phase 4 (User Story 2 - P1)**: Depends on Phase 2; integrates with page stream.
5. **Phase 5 (User Story 3 - P2)**: Depends on Phase 4 (ProjectSection infrastructure).
6. **Phase 6 (User Story 4 - P2)**: Depends on Phase 4 & Phase 5.
7. **Phase 7 (User Story 5 - P3)**: Depends on Phase 2; mounts into page stream.
8. **Phase 8 (Polish)**: Depends on all prior phases.

### Parallel Opportunities

- **Setup**: T003 and T004 can run in parallel once T001 and T002 finish.
- **Foundational**: T006, T007, T008, T010, T011 can run in parallel.
- **User Story 1**: T012 can run in parallel with T013.
- **User Story 2**: T015 and T016 can run in parallel before T017.
- **User Story 3**: T019, T020, and T021 can all be implemented in parallel.
- **User Story 4**: T023 and T024 can run in parallel.
- **User Story 5**: T026 can run in parallel with T027.

---

## Implementation Strategy

### MVP First (User Story 1)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1: Hero Section + Navigation).
3. Validate MVP: Candidate identity, verified role, technical positioning, and scroll cue render cleanly.

### Incremental Delivery
1. Add Phase 4 (Scroll Engine & Project Section layout).
2. Add Phase 5 (3 Placeholder Project Modules in Registry).
3. Add Phase 6 (Mobile Responsiveness & Overflow hardening).
4. Add Phase 7 (About & Contact Section).
5. Run Phase 8 (TypeScript check, production build, quickstart validation).