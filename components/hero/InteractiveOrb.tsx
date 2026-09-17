"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";

export function InteractiveOrb() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if custom elements already registered spline-viewer
    if (typeof window !== "undefined" && customElements.get("spline-viewer")) {
      setIsSplineLoaded(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Script for Spline Viewer Component */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
        onLoad={() => setIsSplineLoaded(true)}
      />

      {/* Outer Ambient Radial Glow */}
      <div 
        className="absolute -inset-10 rounded-full bg-radial from-cyber-red/10 via-transparent to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Seamless 3D Particle Stage (Logotomia pure atmosphere) */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
        {/* Spline Viewer */}
        {isSplineLoaded ? (
          React.createElement("spline-viewer", {
            url: "https://prod.spline.design/NRtXGhILSCPoaWWq/scene.splinecode",
            "loading-anim-type": "spinner-small-dark",
            style: { width: "100%", height: "100%", display: "block" },
          })
        ) : (
          /* Procedural Geometric 3D Fallback Wireframe */
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-obsidian-light/40 animate-pulse">
            <div className="w-48 h-48 rounded-full border border-hud-dim/30 border-dashed animate-[spin_16s_linear_infinite] flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-cyber-red/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-hud-white/20" />
              </div>
            </div>
            <span className="mt-4 font-mono text-[10px] tracking-widest text-hud-muted uppercase">
              INITIALIZING 3D INTERACTIVE CORE...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
