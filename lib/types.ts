import type { ComponentType } from "react";

export interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "demo" | "doc" | "external";
}

export interface ProjectMetric {
  label: string;
  value: string;
}

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

export interface VisualSceneProps {
  progress: number;
  isActive: boolean;
  direction?: number;
}

export interface ProjectDefinition {
  data: ProjectData;
  Scene: ComponentType<VisualSceneProps>;
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