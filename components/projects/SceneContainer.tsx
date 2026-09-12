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
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center rounded-xl bg-zinc-950/60 border border-zinc-800/40 text-xs font-mono text-zinc-500">
      <div className="w-6 h-6 rounded-full border-2 border-zinc-700 border-t-cyan-400 animate-spin mb-3" />
      <span>// loading scene visual...</span>
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
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] relative rounded-xl overflow-hidden bg-zinc-950/80 border border-zinc-800/60 shadow-2xl flex items-center justify-center">
      <Suspense fallback={<SceneLoadingFallback />}>
        <Scene progress={progress} isActive={isActive} direction={direction} />
      </Suspense>
    </div>
  );
}