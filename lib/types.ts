export interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "demo" | "doc" | "external";
}

export interface ProjectMetric {
  label: string;
  value: string;
}

/** Numeric matrix rendered as a heatmap (e.g. an ablation study grid). */
export interface HeatmapMatrix {
  caption: string;
  unit: string;
  columns: string[];
  rows: { key: string; label: string; values: number[] }[];
  /** [rowIndex, columnIndex] of the cell to emphasise (e.g. the winner). */
  highlight?: [number, number];
}

export interface ProjectDetailSection {
  heading: string;
  shortTitle?: string;
  points: string[];
  matrix?: HeatmapMatrix;
}

/** Which data-driven visual the project card renders. */
export type ProjectVisual = "ablation-matrix" | "memory-flow" | "ci-pipeline";

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  /** Optional emphasis badge, e.g. an award or "live in production". */
  badge?: { label: string; tone: "award" | "live" | "research" };
  tagline: string;
  description: string;
  role: string;
  period: string;
  techStack: string[];
  /** Three short headline numbers shown on the card. */
  kpis: ProjectMetric[];
  /** Longer metrics shown in the detail overview. */
  metrics?: ProjectMetric[];
  links: ProjectLink[];
  visual: ProjectVisual;
  /** Deep-dive panels shown in the immersive detail view. */
  detailSections?: ProjectDetailSection[];
}

export interface ProfileEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  status: string;
  location: string;
  positioning: string;
  summary: string;
  education: ProfileEducation;
  skills: SkillGroup[];
  links: {
    github: string;
    emailUser: string;
    emailDomain: string;
  };
}

/**
 * Visual Design System Contract & State Interfaces
 */

export interface DesignTokens {
  colors: {
    bg: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    muted: string;
    stroke: string;
    accentStart: string;
    accentEnd: string;
  };
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
}

export interface LoadingState {
  count: number; // 0 - 100
  activeWord: string;
  isComplete: boolean;
  progressPercent: number;
}

export interface RoleCycleItem {
  id: string;
  title: string;
  tag: string;
}

export interface FooterStat {
  label: string;
  value: string;
  subtext?: string;
}