# Scroll System & Section Orchestration Contract

**Feature**: Scroll-Driven Interactive Portfolio (Base & Project Registry)  
**Branch**: `001-scroll-driven-portfolio-base`  

## 1. Sequence & Layout Rhythm

The portfolio is structured as a vertical scroll story:

1. **Hero Section**:
   - Above-the-fold presence with name, role, technical positioning, and scroll cue.
   - Initial scroll fades/translates the hero out gently while preparing Section 1.
2. **Project Sections (Alternating Rhythm)**:
   - **Even index (Project 0, 2, ...)**:
     - Desktop: Visual Scene on the **Left** (55% width), Narrative Details on the **Right** (45% width).
     - Visual scene enters from the left edge.
   - **Odd index (Project 1, 3, ...)**:
     - Desktop: Narrative Details on the **Left** (45% width), Visual Scene on the **Right** (55% width).
     - Visual scene enters from the right edge.
   - **Mobile (< 768px)**:
     - Stacked layout: Visual Scene on top, Narrative Details directly below.
     - Scene heights constrained (e.g. `260px` to `320px`) to preserve readability without layout jumping.
3. **About & Contact Section**:
   - Summarizes academic background (Sai Gon University) and core technical competencies.
   - Provides verified GitHub profile link and secure contact initiation.

---

## 2. GSAP ScrollTrigger Integration Contract

Each project section container is monitored by a dedicated `ScrollTrigger` instance:

```typescript
// Conceptual ScrollTrigger configuration
ScrollTrigger.create({
  trigger: sectionElement,
  start: "top bottom",     // When the top of the section enters the bottom of the viewport (progress = 0)
  end: "bottom top",       // When the bottom of the section leaves the top of the viewport (progress = 1)
  scrub: 0.5,              // Smooth 0.5s scrubbing lag for fluid feel
  onUpdate: (self) => {
    onProgressUpdate(self.progress, self.isActive, self.direction);
  },
});
```

### Lifecycle & Cleanup Rules
- All ScrollTrigger instances must be initialized inside a scoped `useGSAP` or `gsap.context()` hook.
- When unmounting, `ctx.revert()` must be called to eliminate orphaned listeners and prevent memory accumulation.
- Window resize events must trigger `ScrollTrigger.refresh()` after layout settling.

---

## 3. Responsive & Reduced Motion Degradation

- **Mobile Viewport (375px - 767px)**:
  - Disables expensive multi-pass post-processing.
  - Scales 3D camera distance or renders simplified geometries to guarantee 60fps.
  - Zero horizontal overflow (`overflow-x: clip` or `overflow-x: hidden`).
- **Accessibility (`prefers-reduced-motion: reduce`)**:
  - `progress` directly sets final resting positions or subtle opacity fades rather than rapid transforms and continuous rotations.