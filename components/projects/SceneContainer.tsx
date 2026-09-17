"use client";

import React, { Suspense, ComponentType, useState, useEffect, useRef } from "react";
import { VisualSceneProps } from "@/lib/types";

interface SceneContainerProps {
  Scene: ComponentType<VisualSceneProps>;
  progress: number;
  isActive: boolean;
  direction?: number;
}

function SceneLoadingFallback() {
  return (
    <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center rounded-xl bg-obsidian-light/60 border border-hud-dim/20 text-xs font-mono text-hud-dim">
      <div className="w-6 h-6 rounded-full border-2 border-hud-dim border-t-cyber-red animate-spin mb-3" />
      <span className="font-display tracking-[0.15em] uppercase text-[10px]">
        Loading 3D scene...
      </span>
    </div>
  );
}

export function SceneContainer({
  Scene,
  progress,
  isActive,
  direction,
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scene is only active when both in viewport AND active in scroll lifecycle
  const sceneActive = isInViewport && isActive;

  return (
    <div
      ref={containerRef}
      className="w-full h-[380px] sm:h-[460px] md:h-[500px] relative rounded-xl overflow-hidden bg-obsidian-light/80 border border-hud-dim/20 shadow-2xl block"
    >
      <Suspense fallback={<SceneLoadingFallback />}>
        <Scene progress={progress} isActive={sceneActive} direction={direction} />
      </Suspense>
    </div>
  );
}