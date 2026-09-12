# Feature Specification: Visual Design System Refresh (Tokens & Supporting Sections)

**Feature Branch**: `002-visual-design-system-refresh`

**Created**: 2026-09-13

**Status**: Draft

**Input**: User description: "Feature: Visual design system refresh (tokens + supporting sections). Adopt design tokens (Inter + Instrument Serif, dark HSL palette, accent-gradient), loading screen (rAF 000-100 over ~2.7s, rotating word cycle, progress bar), floating pill navbar, hero restyle (name-reveal, role-cycling), and footer (infinite marquee, stats row, available indicator). Project registry and scroll scenes stay unchanged. Explicitly out of scope: bento-grid, journal/blog, parallax gallery."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cinematic First Load & Loading Screen (Priority: P1)

As a visitor landing on the portfolio, I experience a full-screen loading sequence with an animated 000–100 numerical counter and rotating technical concepts over ~2.7 seconds before smoothly unveiling the interface, so that I perceive a bespoke, high-craft engineering artifact rather than a generic page flash.

**Why this priority**: Sets the cinematic, technical tone immediately upon page entry and allows 3D canvases and fonts to settle in the background before presentation.

**Independent Test**: Can be verified on initial page load; validates that the counter increments from `000` to `100` alongside rotating status words and a gradient progress bar, then smoothly unmasks the portfolio content.

**Acceptance Scenarios**:

1. **Given** a user navigates to the site, **When** the page initializes, **Then** a full-screen dark overlay appears with a 3-digit numerical counter starting at `000` and an accent gradient progress bar.
2. **Given** the loading sequence is active, **When** approximately 2.7 seconds elapse, **Then** the counter completes at `100`, the technical status words cycle through key phrases, and the overlay dissolves smoothly into the Hero section.
3. **Given** the user prefers reduced motion, **When** the page loads, **Then** the loading sequence is simplified or completes with an immediate, non-disorienting fade.

---

### User Story 2 - Elevated Typography & Dark Design Tokens (Priority: P1)

As a visitor reading project descriptions and technical metrics, I see an editorial and technical typographic hierarchy (Inter paired with Instrument Serif italic) set against a dark HSL surface palette with subtle accent gradients (`#89AACC` to `#4E85BF`), so that the visual presentation feels cohesive, cinematic, and premium.

**Why this priority**: Establishes the foundational design language for the entire portfolio without requiring structural changes to existing components.

**Independent Test**: Can be verified by inspecting typography and theme variables; confirms that headings utilize Instrument Serif accents, body/data elements use Inter, and surfaces adhere to the dark HSL palette.

**Acceptance Scenarios**:

1. **Given** any section on the site, **When** viewing headings and subtitles, **Then** primary titles feature expressive Instrument Serif italic accents while technical tags and paragraphs render in clean Inter typography.
2. **Given** borders and active UI states, **When** rendered on screen, **Then** they incorporate the signature accent-gradient (`#89AACC` → `#4E85BF`) and smooth gradient-shift animations where appropriate.

---

### User Story 3 - Context-Aware Floating Pill Navigation (Priority: P2)

As a visitor scrolling through the case studies, I have access to a floating pill navigation bar with a gradient-ring logo mark that elevates with a subtle shadow as I scroll, so that navigation remains readily accessible without obstructing the visual storytelling.

**Why this priority**: Enhances usability and provides a modern, lightweight navigation experience that complements the scroll-driven storytelling.

**Independent Test**: Can be verified by scrolling through the viewport; validates that the floating pill nav remains pinned at the top center with backdrop blur, and gains elevated shadow and border contrast once scroll depth exceeds 20px.

**Acceptance Scenarios**:

1. **Given** the user is at the top of the page, **When** viewing the navbar, **Then** it renders as a floating pill with backdrop-blur and a gradient-ring logo mark.
2. **Given** the user scrolls down more than 20px, **When** inspecting the navbar container, **Then** a distinct elevated shadow and border highlight appear smoothly.

---

### User Story 4 - Restyled Hero Narrative with Role Cycling (Priority: P2)

As a technical recruiter reviewing the candidate's core identity, I see Pham Minh Chien's name unveiled via an entrance timeline and an animated cycling subline emphasizing core engineering specializations, while retaining 100% of the verified resume content.

**Why this priority**: Keeps the Hero section engaging and dynamic while strictly honoring the verified resume data without fabricating claims.

**Independent Test**: Can be verified by viewing the Hero section; confirms that the candidate name animates in with a blur/reveal effect and the subline cyclically transitions between verified roles (e.g. "AI Engineer", "Computer Vision Specialist", "3D Systems Builder").

**Acceptance Scenarios**:

1. **Given** the Hero section mounts after the loader, **When** the entrance timeline plays, **Then** the candidate's name reveals cleanly with a subtle blur-to-focus and translate effect.
2. **Given** the Hero is idle, **When** observing the subline, **Then** it smoothly cycles through verified engineering titles at a comfortable reading cadence.

---

### User Story 5 - Dynamic Footer with Infinite Marquee & Real-Time Availability (Priority: P3)

As a prospective collaborator reaching the end of the narrative, I see an infinite marquee loop showcasing engineering ethos, a quantified stats row, and verified links with a pulsing "available for roles" indicator, leaving a memorable concluding impression.

**Why this priority**: Replaces the basic footer with an impactful, technical concluding section that encourages contact and highlights engineering rigor.

**Independent Test**: Can be verified by scrolling to the footer; validates that the marquee scrolls infinitely without stuttering, the stats row presents verified benchmarks, and the pulsing green indicator is visible.

**Acceptance Scenarios**:

1. **Given** the footer enters the viewport, **When** viewing the marquee track, **Then** it continuously loops technical ethos statements horizontally without gaps or page overflow.
2. **Given** the contact actions area, **When** viewed by the user, **Then** a pulsing green indicator with "Available for Junior / Intern Roles" is displayed alongside verified social and obfuscated contact links.

---

### Edge Cases

- **Session Caching / Fast Navigation**: Does the full-screen loader need to run on every single route refresh? The loader should run gracefully on first landing in the session without blocking subsequent fast interactions.
- **Mobile Viewports (375px)**: The floating pill navbar must remain compact without wrapping icons onto multiple lines; the marquee track must be contained inside `overflow-hidden` to avoid horizontal scrollbar generation; the loader counter must remain centered.
- **Reduced Motion (`prefers-reduced-motion: reduce`)**: The marquee must pause or scroll statically; the role cycling should cross-fade gently without kinetic transforms; the loader counter should advance instantly or with a single fade.
- **Font Availability**: Web fonts (Inter and Instrument Serif) must load with `font-display: swap` and matching fallback metrics to prevent cumulative layout shift (CLS).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement global design tokens using CSS variables for a dark HSL palette: `--bg` (base background), `--surface` (card/container surface), `--text` (primary text), `--muted` (secondary/subdued text), and `--stroke` (border/divider lines).
- **FR-002**: The system MUST configure typography pairing Inter (weights 300 to 700) for standard reading, labels, and technical tags, and Instrument Serif (italic weight 400) for expressive title accents and highlights.
- **FR-003**: The system MUST provide an `accent-gradient` utility spanning from `#89AACC` to `#4E85BF` and a `gradient-shift` keyframe animation for interactive borders and progress bars.
- **FR-004**: The system MUST display a full-screen loading screen overlay upon initial site load that:
  - Increments a numerical counter from `000` to `100` via `requestAnimationFrame` over ~2.7 seconds.
  - Displays a synchronized rotating technical status word cycle during the count.
  - Animates a progress bar using the `accent-gradient`.
  - Dissolves cleanly with a smooth exit transition once `100` is reached.
- **FR-005**: The system MUST render the main navigation bar as a floating pill container with `backdrop-blur`, a logo mark with an accent gradient ring, and desktop navigation links.
- **FR-006**: The floating pill navbar MUST dynamically detect scroll depth and apply an elevated drop shadow and border contrast when the page is scrolled beyond 20px.
- **FR-007**: The Hero section MUST retain all resume-verified biographical copy while restyling the name display with an entrance reveal timeline and introducing an animated role-cycling subline.
- **FR-008**: The Footer MUST include an infinite horizontal marquee text loop, a stats row displaying key project and educational metrics, and social/contact triggers with an animated pulsing green "Available for Roles" status badge.
- **FR-009**: The visual refresh MUST preserve existing project registry architecture (`projects/<slug>/` and `projects/registry.ts`) and scroll-driven case study scenes without structural alterations.
- **FR-010**: Bento-grid overview pages, blog/journal modules, and parallax image galleries are explicitly OUT OF SCOPE for this feature.

### Key Entities

- **Design Token Schema**: Global CSS variables defining dark HSL colors, accent gradient parameters, and font families.
- **Loading State**: Transient state tracking active numerical progress (0–100), active status phrase, and overlay completion flag.
- **Navbar Elevation State**: Boolean state (`isScrolled`) triggering pill elevation styles upon vertical scrolling.
- **Hero Reveal Controller**: Timeline sequencing the candidate name reveal and cycling the specialization subline.
- **Marquee Track**: Continuously looping text rail displaying core engineering principles.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The loading screen completes its full choreographed sequence in 2.7s ± 0.3s and unmasks the Hero section without layout shifts or flashes.
- **SC-002**: 100% of resume copy and credentials in Hero, About, and Project sections remain intact with zero content loss.
- **SC-003**: The floating pill navigation bar toggles its elevated shadow state within 100ms of crossing the 20px scroll boundary.
- **SC-004**: The infinite marquee runs at a consistent 60fps on modern desktop and mobile browsers with zero horizontal page overflow (`scrollWidth === clientWidth` on 375px screens).
- **SC-005**: All existing project scenes (`project-a`, `project-b`, `project-c`) and registry imports continue to function without errors.

## Assumptions

- **Non-Structural Scope**: This feature represents a purely visual and supporting-section refresh. No case study modules or registry mechanisms are being replaced or refactored.
- **Web Fonts**: Inter and Instrument Serif are loaded via `next/font/google` with preconnect and `swap` display to prevent blocking render.
- **Out of Scope Boundaries**: Bento-grid galleries, blogs, or parallax image grids are deliberately excluded as stated by the user directive.