"use client";

import React, { Suspense, ComponentType } from "react";
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
  return (
    <div className="w-full h-[380px] sm:h-[460px] md:h-[500px] relative rounded-xl overflow-hidden bg-obsidian-light/80 border border-hud-dim/20 shadow-2xl block">
      <Suspense fallback={<SceneLoadingFallback />}>
        <Scene progress={progress} isActive={isActive} direction={direction} />
      </Suspense>
    </div>
  );
}