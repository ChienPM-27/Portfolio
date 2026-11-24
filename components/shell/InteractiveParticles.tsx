"use client";

import React, { useEffect, useRef } from "react";
import { useProjectDetail } from "@/lib/project-detail-context";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  isRed: boolean;
}

const COLORS = [
  { r: 214, g: 214, b: 214, isRed: false },
  { r: 100, g: 140, b: 210, isRed: false },
  { r: 214, g: 214, b: 214, isRed: false },
  { r: 230, g: 45, b: 45, isRed: true },
];

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeSlug } = useProjectDetail();

  const isDetailOpenRef = useRef(activeSlug !== null);
  const syncFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    isDetailOpenRef.current = activeSlug !== null;
    syncFnRef.current?.();
  }, [activeSlug]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = isReducedMotionPreferred();
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 14 : 28;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      const baseAlpha = col.isRed
        ? Math.random() * 0.4 + 0.3
        : Math.random() * 0.28 + 0.14;
      const vx = (Math.random() - 0.5) * (reducedMotion ? 0 : 0.28);
      const vy = (Math.random() - 0.5) * (reducedMotion ? 0 : 0.28);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        size: col.isRed
          ? Math.random() * 1.6 + 1.3
          : Math.random() * 1.2 + 0.9,
        color: `${col.r}, ${col.g}, ${col.b}`,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.015 + 0.006,
        pulseOffset: Math.random() * Math.PI * 2,
        isRed: col.isRed,
      });
    }

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const isProjectsOccludingRef = { current: false };
    const isSkippedRef = { current: false };
    let rafId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    let time = 0;

    const repelRadius = 135;
    const repelRadiusSq = repelRadius * repelRadius;
    const threadRadiusSq = 95 * 95;

    const drawFrame = () => {
      time += 1;
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      ctx.clearRect(0, 0, width, height);
      const hasMouse = !reducedMotion && mouse.x > -500;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          if (hasMouse) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < repelRadiusSq && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / repelRadius) * 0.72;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;

              if (distSq < threadRadiusSq) {
                ctx.strokeStyle = p.isRed
                  ? "rgba(230, 45, 45, 0.28)"
                  : "rgba(214, 214, 214, 0.14)";
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
              }
            } else {
              p.vx += (p.baseVx - p.vx) * 0.035;
              p.vy += (p.baseVy - p.vy) * 0.035;
            }
          } else {
            p.vx += (p.baseVx - p.vx) * 0.025;
            p.vy += (p.baseVy - p.vy) * 0.025;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.alpha =
            p.baseAlpha +
            Math.sin(time * p.pulseSpeed + p.pulseOffset) *
              (p.baseAlpha * 0.35);
        }

        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.isRed) {
          ctx.fillStyle = `rgba(230, 45, 45, ${p.alpha * 0.24})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    const syncRunningState = () => {
      const shouldShow =
        !isDetailOpenRef.current &&
        !document.hidden &&
        !isProjectsOccludingRef.current &&
        !isSkippedRef.current;

      canvas.style.visibility = shouldShow ? "visible" : "hidden";

      if (reducedMotion) {
        if (shouldShow) drawFrame();
        return;
      }

      if (shouldShow && rafId === 0) {
        rafId = requestAnimationFrame(tick);
      } else if (!shouldShow && rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    syncFnRef.current = syncRunningState;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        if (reducedMotion) drawFrame();
      }, 150);
    };

    const onContentVisibilityStateChange = (event: Event) => {
      const skipped = (event as Event & { skipped?: boolean }).skipped;
      if (typeof skipped === "boolean") {
        isSkippedRef.current = skipped;
        syncRunningState();
      }
    };

    // Observe opaque #projects stage so particles pause/hide when covered
    let projectsObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const attachProjectsObserver = (el: Element) => {
      projectsObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isProjectsOccludingRef.current = entry.intersectionRatio >= 0.92;
          syncRunningState();
        },
        { threshold: [0, 0.92] }
      );
      projectsObserver.observe(el);
    };

    const existingProjects = document.getElementById("projects");
    if (existingProjects) {
      attachProjectsObserver(existingProjects);
    } else {
      const root = document.querySelector("main") ?? document.body;
      mutationObserver = new MutationObserver(() => {
        const el = document.getElementById("projects");
        if (el) {
          attachProjectsObserver(el);
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(root, { childList: true, subtree: true });
    }

    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
    }
    document.addEventListener("visibilitychange", syncRunningState);
    window.addEventListener("resize", onResize);
    canvas.addEventListener(
      "contentvisibilityautostatechange",
      onContentVisibilityStateChange
    );

    syncRunningState();

    return () => {
      syncFnRef.current = null;
      if (rafId !== 0) cancelAnimationFrame(rafId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      projectsObserver?.disconnect();
      mutationObserver?.disconnect();
      document.removeEventListener("visibilitychange", syncRunningState);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener(
        "contentvisibilityautostatechange",
        onContentVisibilityStateChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-particles="true"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
