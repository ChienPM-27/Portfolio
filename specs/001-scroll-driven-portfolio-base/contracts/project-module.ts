import type { ComponentType } from "react";

/**
 * Common link object for case studies.
 */
export interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "demo" | "doc" | "external";
}

/**
 * Quantitative metrics achieved by the project.
 */
export interface ProjectMetric {
  label: string;
  value: string;
}

/**
 * Data contract that every projects/<slug>/data.ts must satisfy.
 */
export interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  techStack: string[];
  metrics?: ProjectMetric[];
  links: ProjectLink[];
}

/**
 * Props contract passed from the scroll orchestrator to projects/<slug>/Scene.tsx.
 */
export interface VisualSceneProps {
  /** Normalized scroll progress from 0.0 (entering) to 1.0 (leaving) */
  progress: number;
  /** Whether the project section is currently visible in the active viewport window */
  isActive: boolean;
  /** 1 = scrolling downwards, -1 = scrolling upwards */
  direction?: number;
}

/**
 * Complete project module contract exported by the registry.
 */
export interface ProjectDefinition {
  data: ProjectData;
  Scene: ComponentType<VisualSceneProps>;
}