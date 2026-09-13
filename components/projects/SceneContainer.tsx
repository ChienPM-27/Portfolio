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
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center rounded-xl bg-obsidian-light/60 border border-hud-dim/20 text-xs font-mono text-hud-dim">
      <div className="w-6 h-6 rounded-full border-2 border-hud-dim border-t-cyber-red animate-spin mb-3" />
      <span className="font-display tracking-[0.15em] uppercase text-[10px]">Loading scene...</span>
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
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] relative rounded-xl overflow-hidden bg-obsidian-light/80 border border-hud-dim/20 shadow-2xl flex items-center justify-center">
      <Suspense fallback={<SceneLoadingFallback />}>
        <Scene progress={progress} isActive={isActive} direction={direction} />
      </Suspense>
    </div>
  );
}