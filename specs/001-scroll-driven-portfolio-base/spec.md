# Feature Specification: Scroll-Driven Interactive Portfolio (Base & Project Registry)

**Feature Branch**: `001-scroll-driven-portfolio-base`

**Created**: 2026-09-13

**Status**: Draft

**Input**: User description: "Feature: Scroll-driven interactive portfolio (base + placeholder projects)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Immersive First Impression & Hero Narrative (Priority: P1)

As a technical recruiter or engineering manager visiting the portfolio, I want to immediately see Pham Minh Chien's verified identity, primary role as an AI Engineer, and a clear technical positioning statement with a scroll cue, so that I understand within seconds the engineer's core specialization and domain depth without visual clutter or unverified claims.

**Why this priority**: The Hero section establishes immediate credibility, sets the professional tone, and anchors the narrative for the rest of the visit.

**Independent Test**: Can be verified by loading the initial page; validates that the personal name, role title, technical positioning statement, and scroll indicator render clearly and legibly above the fold.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the site root, **When** the page finishes initial render, **Then** the visitor sees the engineer's name ("Pham Minh Chien"), role ("AI Engineer"), a concise technical positioning statement reflecting AI/Computer Vision and systems engineering, and an intuitive visual cue indicating downward scroll.
2. **Given** the Hero section is active, **When** inspecting the rendered copy, **Then** all displayed credentials, titles, and biographical statements match the verified resume file exactly with zero fabricated details.

---

### User Story 2 - Scroll-Driven Case Study Discovery (Priority: P1)

As a visitor exploring the portfolio, I want to scroll naturally down the page to trigger dynamic, scroll-linked project transitions alternating between left and right layout orientations, so that I experience an engaging technical case study story rather than a static list of project cards.

**Why this priority**: The scroll-driven narrative is the core user experience differentiator for this portfolio, providing engaging storytelling that guides attention through each project's context and visual representation.

**Independent Test**: Can be verified by scrolling through the viewport; validates that project sections transition into focus sequentially, alternating visual/text alignment, with visual scene elements responding to scroll progress.

**Acceptance Scenarios**:

1. **Given** the user scrolls past the Hero, **When** entering the first project section, **Then** the first project's text details and interactive visual scene come into view smoothly.
2. **Given** multiple consecutive project sections exist, **When** scrolling from Project 1 to Project 2, **Then** the visual container and text information alternate layout positions (e.g., visual scene on left for Project 1, visual scene on right for Project 2).
3. **Given** a project section is in the viewport, **When** the user scrolls forward or backward, **Then** the visual scene's motion state dynamically tracks scroll progression.

---

### User Story 3 - Extensible Modular Architecture Proof (Priority: P2)

As the portfolio maintainer and future reviewer, I want the base application to demonstrate a modular project architecture proven by 2–3 lightweight placeholder project modules, so that subsequent case studies (such as 3DRecon or Keysmith) can be integrated without modifying existing modules or global layouts.

**Why this priority**: Guarantees that future milestone specifications and feature implementations can be developed, tested, and added in complete isolation without regression risks to existing projects.

**Independent Test**: Can be verified by adding an arbitrary test module to the project registry and verifying it displays seamlessly in the scroll stream without editing any existing project or shell file.

**Acceptance Scenarios**:

1. **Given** the baseline application, **When** navigating through the project stream, **Then** exactly 2 to 3 placeholder projects (e.g., `project-a`, `project-b`, `project-c`) are rendered in sequential order with distinct visual metaphors (e.g., geometric 3D object, particle/data visual, interface mockup reveal).
2. **Given** a developer wants to add a new project, **When** creating an isolated project folder and registering it in the central registry, **Then** the new project appears in the scroll sequence without editing any global shell or sibling project files.

---

### User Story 4 - Seamless Mobile & Cross-Device Responsiveness (Priority: P2)

As a mobile visitor browsing on a smartphone (down to a 375px viewport width), I want the layout, typography, and visual scenes to adapt cleanly to small screens without horizontal scrolling, clipped text, or animation stutter, so that the reading and viewing experience is just as compelling on mobile as on desktop.

**Why this priority**: Technical recruiters frequently review candidate portfolios on mobile devices; a broken mobile layout instantly destroys credibility.

**Independent Test**: Can be verified by setting device emulation to 375px width and scrolling through all sections; confirms zero horizontal scrollbar and legible typography throughout.

**Acceptance Scenarios**:

1. **Given** a viewport width of 375px, **When** scrolling from the Hero section through all project showcases to the footer, **Then** the document maintains zero horizontal overflow (`overflow-x: hidden` / no side-scroll) and text remains legible without overlap.
2. **Given** a touch device or mobile browser, **When** scrolling through project sections, **Then** the animations remain fluid and visually clear without locking or hijacking native scrolling touch physics.

---

### User Story 5 - Privacy-Preserving Professional Contact & Social Links (Priority: P3)

As a prospective employer or collaborator interested in reaching out, I want to access verified professional channels (GitHub profile, secure contact trigger) without the site exposing raw personal phone numbers or un-obfuscated email addresses to scrapers.

**Why this priority**: Connects interested visitors to actionable next steps while respecting personal data privacy and anti-scraping best practices.

**Independent Test**: Can be verified by navigating to the contact/about section and inspecting link targets and DOM contents to confirm absence of plaintext email/phone strings.

**Acceptance Scenarios**:

1. **Given** a user reaches the conclusion of the portfolio story, **When** viewing the contact/about area, **Then** clear options to connect via GitHub and secure contact mechanisms are presented.
2. **Given** an automated parser inspects the page source, **When** searching for raw phone number and email strings, **Then** neither the raw phone number nor raw plaintext email are exposed as direct plain text in the document.

---

### Edge Cases

- **Fast / Fling Scrolling**: What happens when a user aggressively flings the scroll wheel or trackpad? The scroll orchestration must gracefully interpolate and synchronize states without skipping sections into invalid positions or freezing scene frames.
- **Viewport Extremes**: How does the layout behave on ultra-wide screens (e.g., 3440x1440 or 4K) versus compact mobile screens (375px)? Content max-widths and container padding must prevent excessive stretching on large monitors and eliminate clipping on small screens.
- **Reduced Motion Settings**: How does the system handle user environments with `prefers-reduced-motion: reduce`? Complex rotational/transform animations must degrade into subtle, accessible fades or stable static presentations.
- **Asset Loading Delays**: What happens if a visual scene requires assets that take time to load? Each scene container must provide an elegant loading state or fallback so layout shifts do not disrupt the scroll position.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a polished Hero section containing the engineer's verified name ("Pham Minh Chien"), primary role ("AI Engineer"), a concise technical positioning statement grounded in AI/Computer Vision and backend integration, and a clear scroll cue indicator.
- **FR-002**: All personal, educational, biographical, and project details displayed anywhere on the website MUST be traceable to the verified resume file (`AI Enginner - Phạm Minh Chiến.pdf`) with zero invented or fabricated claims.
- **FR-003**: All website copy and technical descriptions MUST be written in professional, idiomatic technical English, translating any source meaning faithfully without raw, unpolished text.
- **FR-004**: Personal contact credentials MUST NOT be exposed as raw, un-obfuscated plain text in the DOM; direct contact interactions MUST use a contact form, obfuscated mailto trigger, or secure communication channel.
- **FR-005**: The application MUST provide a unified scroll-driven storytelling flow traversing: Hero → Project 1 → Project 2 → Project 3 → About/Contact summary.
- **FR-006**: Consecutive project sections MUST alternate layout orientation between visual scene elements and textual descriptions (e.g., visual scene left / details right for Section 1, visual scene right / details left for Section 2).
- **FR-007**: Each project showcase section MUST present: project title, concise description, technology stack tags, links to source code or demonstrations, and an active visual scene.
- **FR-008**: Project visual scenes MUST dynamically react to scroll progress, linking spatial or visual parameters directly to the user's scroll position.
- **FR-009**: The system MUST implement a modular project architecture where every project case study is contained in an isolated module directory, and an ordered central registry acts as the single source of truth for active projects.
- **FR-010**: The base milestone MUST demonstrate the modular registry pattern using 2 to 3 lightweight placeholder project modules (`project-a`, `project-b`, `project-c`), each utilizing a distinct visual metaphor (such as a rotating geometric object, a particle/data visual, and an interface mockup reveal).
- **FR-011**: The application layout MUST be responsive and guarantee complete functional parity, clear typography, and zero horizontal scrolling across viewports from 375px up to 4K resolutions.
- **FR-012**: The application MUST respect user system accessibility preferences, disabling intense motion or providing simplified transitions when `prefers-reduced-motion` is detected.

### Key Entities

- **Profile & Narrative Entity**: Sourced directly from the verified resume; encapsulates the engineer's identity (Pham Minh Chien), title (AI Engineer), education (Sai Gon University), technical positioning statement, verified links (GitHub: ChienPM-27), and secure contact handlers.
- **Project Case Study Module**: A self-contained directory containing project narrative data (slug, name, tagline, description, tech stack tags, external links) and an isolated visual scene component.
- **Project Registry**: A centralized registry definition providing the definitive list, sequence, and configuration of all project modules rendered in the scroll story.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of biographical and background information presented on the site is verifiable against the source resume file with zero unsupported claims.
- **SC-002**: Adding a new project case study to the portfolio requires creating exactly one new module directory and adding exactly one entry to the central registry file, with zero edits to any existing project module or global shell component.
- **SC-003**: The entire application displays zero horizontal overflow (`scrollWidth === clientWidth`) across all viewport widths from 375px to 4000px.
- **SC-004**: The Hero section renders its complete initial visual state and readable content in under 1.5 seconds on standard broadband connections.
- **SC-005**: 100% of interactive elements, links, and scroll transitions remain functional without console runtime errors across modern desktop and mobile browsers.

## Assumptions

- **Audience**: The primary audience consists of technical recruiters, engineering leaders, AI researchers, and prospective collaborators seeking evidence of strong AI and software engineering capabilities.
- **Language**: English is the sole language for all public-facing website copy, adhering to a technical, precise, and understated tone.
- **Real Project Deferral**: Full custom interactive scenes and detailed case study narratives for real projects identified in the resume (such as the 3D Reconstruction System / 3DRecon and Keysmith) are intentionally out of scope for this base shell milestone and will be specified in separate, subsequent milestone feature specs.
- **Browser Support**: The site targets modern evergreen browsers (Chrome, Edge, Safari, Firefox) with WebGL and modern CSS/JS feature support.