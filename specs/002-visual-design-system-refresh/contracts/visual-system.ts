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