# Data Model & Schema Definitions

**Feature**: Scroll-Driven Interactive Portfolio (Base & Project Registry)  
**Branch**: `001-scroll-driven-portfolio-base`  
**Date**: 2026-09-13  

## 1. Entities

### Profile Entity
Encapsulates verified biographical and professional narrative information strictly extracted from the resume (`AI Enginner - Phạm Minh Chiến.pdf`).

```typescript
export interface Profile {
  name: string; // "Pham Minh Chien"
  role: string; // "AI Engineer"
  status: string; // e.g. "Junior AI Engineer / AI Engineer Intern"
  location: string; // "Ho Chi Minh City, Viet Nam"
  positioning: string; // Technical positioning statement
  summary: string; // Professional summary
  education: {
    degree: string; // "B.Eng. Information Technology"
    institution: string; // "Sai Gon University"
    location: string; // "Ho Chi Minh City, Viet Nam"
    period: string; // "Sept 2024 – Mar 2029"
    highlights: string[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  links: {
    github: string; // "https://github.com/ChienPM-27"
    emailEncrypted?: string;
  };
}
```

### ProjectData Entity
Represents the structured metadata and narrative content of a single case study.

```typescript
export interface ProjectLink {
  label: string; // e.g. "GitHub", "Live Demo", "Paper", "Video"
  url: string;
  type: "github" | "demo" | "doc" | "external";
}

export interface ProjectMetric {
  label: string; // e.g. "Inference Latency", "Accuracy", "FPS"
  value: string; // e.g. "< 2.5s", "98.4%", "60 fps"
}

export interface ProjectData {
  slug: string; // URL-safe identifier e.g. "project-a", "3d-recon"
  title: string; // Project display name
  tagline: string; // Short one-line summary
  description: string; // 2-3 sentence overview of the technical accomplishment
  role: string; // Engineer's role on the project
  period: string; // e.g. "2026 – Present"
  techStack: string[]; // List of technologies (e.g. ["Python", "PyTorch", "FastAPI"])
  metrics?: ProjectMetric[]; // Optional technical benchmarks
  links: ProjectLink[]; // Links to code, demos, or reports
}
```

### VisualSceneProps Entity
Defines the uniform communication protocol between the parent scroll engine and an isolated project visual scene.

```typescript
export interface VisualSceneProps {
  /**
   * Normalized scroll progress within this specific project section (0.0 to 1.0)
   * 0.0: section entering viewport
   * 0.5: section centered in viewport
   * 1.0: section exiting viewport
   */
  progress: number;

  /**
   * Whether this section is currently visible or intersecting the viewport
   */
  isActive: boolean;

  /**
   * Optional direction of scroll: 1 for scrolling down, -1 for scrolling up
   */
  direction?: number;
}
```

### ProjectDefinition Entity
The registry contract tying project metadata to its visual scene component.

```typescript
import { ComponentType } from "react";

export interface ProjectDefinition {
  data: ProjectData;
  Scene: ComponentType<VisualSceneProps>;
}
```

---

## 2. Validation Rules

1. **Resume Traceability**:
   - `Profile.name` must be `"Pham Minh Chien"`.
   - `Profile.role` must be `"AI Engineer"`.
   - `Profile.education.institution` must be `"Sai Gon University"`.
   - `Profile.links.github` must be `"https://github.com/ChienPM-27"`.
   - No fabricated claims, unverified companies, or fictional degrees allowed.
2. **Project Registry Integrity**:
   - Every `ProjectData.slug` in the registry must be unique and non-empty.
   - Every `ProjectDefinition` must provide both valid `data` and a callable `Scene` React component.
   - `techStack` must contain at least 1 item per project.
3. **Privacy Protections**:
   - Neither `Profile` nor any `ProjectData` object shall serialize raw phone numbers (`0766 302 634`) in plaintext public bundles.