"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { clamp, lerp } from "@/lib/scroll-utils";

interface UseVirtualScrollStepsOptions {
  totalSteps: number;
  isOpen: boolean;
  onExit: (direction: "top" | "bottom") => void;
  stepDistancePx?: number;
  exitThreshold?: number;
}

export function useVirtualScrollSteps({
  totalSteps,
  isOpen,
  onExit,
  stepDistancePx = 600,
  exitThreshold = 0.25,
}: UseVirtualScrollStepsOptions) {
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const virtualProgressRef = useRef(0);
  const isExitingRef = useRef(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const safeTotalSteps = Math.max(1, totalSteps);

  // Trigger exit with lock to prevent multiple triggers
  const handleExit = useCallback(
    (direction: "top" | "bottom") => {
      if (isExitingRef.current) return;
      isExitingRef.current = true;
      setIsExiting(true);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      onExitRef.current(direction);
    },
    []
  );

  // Programmatic jump to a specific step
  const goToStep = useCallback(
    (stepIndex: number) => {
      if (isExitingRef.current) return;
      const target = clamp(stepIndex, 0, safeTotalSteps - 1);
      virtualProgressRef.current = target;
    },
    [safeTotalSteps]
  );

  const nextStep = useCallback(() => {
    if (isExitingRef.current) return;
    const current = Math.round(virtualProgressRef.current);
    if (current >= safeTotalSteps - 1) {
      handleExit("bottom");
    } else {
      goToStep(current + 1);
    }
  }, [safeTotalSteps, goToStep, handleExit]);

  const prevStep = useCallback(() => {
    if (isExitingRef.current) return;
    const current = Math.round(virtualProgressRef.current);
    if (current <= 0) {
      handleExit("top");
    } else {
      goToStep(current - 1);
    }
  }, [goToStep, handleExit]);

  // Reset states when opened
  useEffect(() => {
    if (isOpen) {
      virtualProgressRef.current = 0;
      setDisplayedProgress(0);
      isExitingRef.current = false;
      setIsExiting(false);
    }
  }, [isOpen]);

  // RequestAnimationFrame lerp loop for fluid, zero-jitter animation
  useEffect(() => {
    if (!isOpen) return;

    let rafId: number;

    const tick = () => {
      setDisplayedProgress((prev) => {
        const target = virtualProgressRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.001) {
          return target;
        }
        return lerp(prev, target, 0.14);
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isOpen]);

  // Handle Wheel, Touch, and Keyboard inputs
  useEffect(() => {
    if (!isOpen) return;

    const scheduleSnap = () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        if (isExitingRef.current) return;
        const current = virtualProgressRef.current;
        if (current >= 0 && current <= safeTotalSteps - 1) {
          virtualProgressRef.current = Math.round(current);
        }
      }, 400);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isExitingRef.current) return;

      const delta = e.deltaY;
      virtualProgressRef.current += delta / stepDistancePx;

      // Check exit condition at the bottom
      if (virtualProgressRef.current > safeTotalSteps - 1 + exitThreshold) {
        handleExit("bottom");
        return;
      }

      // Check exit condition at the top
      if (virtualProgressRef.current < -exitThreshold) {
        handleExit("top");
        return;
      }

      // Clamp with resistance buffer
      virtualProgressRef.current = clamp(
        virtualProgressRef.current,
        -exitThreshold * 1.1,
        safeTotalSteps - 1 + exitThreshold * 1.1
      );

      scheduleSnap();
    };

    // Touch support
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0 || isExitingRef.current) return;
      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;

      virtualProgressRef.current += (delta * 1.5) / stepDistancePx;

      if (virtualProgressRef.current > safeTotalSteps - 1 + exitThreshold) {
        handleExit("bottom");
        return;
      }

      if (virtualProgressRef.current < -exitThreshold) {
        handleExit("top");
        return;
      }

      virtualProgressRef.current = clamp(
        virtualProgressRef.current,
        -exitThreshold * 1.1,
        safeTotalSteps - 1 + exitThreshold * 1.1
      );

      scheduleSnap();
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExitingRef.current) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleExit("top");
      } else if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, safeTotalSteps, stepDistancePx, exitThreshold, handleExit, nextStep, prevStep]);

  return {
    virtualProgress: virtualProgressRef.current,
    displayedProgress,
    currentStepIndex: clamp(Math.round(displayedProgress), 0, safeTotalSteps - 1),
    goToStep,
    nextStep,
    prevStep,
    isExiting,
    triggerExit: () => handleExit("top"),
  };
}
