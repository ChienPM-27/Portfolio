/**
 * Utility functions for scroll math, easing, and motion accessibility.
 */

export function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Normalizes an active window progress (e.g. from 0 to 1) into entrance, hold, and exit phases.
 */
export function getPhaseProgress(progress: number, enterEnd: number = 0.2, exitStart: number = 0.8) {
  const p = clamp(progress, 0, 1);
  const enter = clamp(p / enterEnd, 0, 1);
  const exit = clamp((p - exitStart) / (1 - exitStart), 0, 1);
  const active = enter * (1 - exit);
  return { p, enter, exit, active };
}