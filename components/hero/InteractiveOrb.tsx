"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";

export function InteractiveOrb() {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = isReducedMotionPreferred();
    setReducedMotion(prefersReduced);
    if (prefersReduced) return;

    if (typeof window !== "undefined" && customElements.get("spline-viewer")) {
      setIsSplineLoaded(true);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoadSpline(true);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onVisibilityStateChange = (event: Event) => {
      const skipped = (event as Event & { skipped?: boolean }).skipped;
      if (typeof skipped === "boolean") {
        setIsVisible(!skipped);
      }
    };
    el.addEventListener("contentvisibilityautostatechange", onVisibilityStateChange);

    return () => {
      observer.disconnect();
      el.removeEventListener(
        "contentvisibilityautostatechange",
        onVisibilityStateChange
      );
    };
  }, []);

  const showSpline = !reducedMotion && isVisible && isSplineLoaded;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Load external Spline runtime only when Hero is visible & motion allowed */}
      {shouldLoadSpline && !reducedMotion && (
        <Script
          src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js"
          type="module"
          strategy="lazyOnload"
          onLoad={() => setIsSplineLoaded(true)}
        />
      )}

      {/* Outer Ambient Radial Glow */}
      <div
        className="absolute -inset-10 rounded-full bg-radial from-cyber-red/10 via-transparent to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
        {showSpline ? (
          React.createElement("spline-viewer", {
            url: "https://prod.spline.design/NRtXGhILSCPoaWWq/scene.splinecode",
            "loading-anim-type": "spinner-small-dark",
            style: { width: "100%", height: "100%", display: "block" },
          })
        ) : (
          /* Zero-CLS Geometric Wireframe Fallback / Reduced-Motion Core */
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            <div
              className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-hud-dim/30 border-dashed flex items-center justify-center ${
                reducedMotion ? "" : "animate-[spin_16s_linear_infinite]"
              }`}
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-cyber-red/35 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-hud-white/20 bg-cyber-red/5" />
              </div>
            </div>
            {!reducedMotion && (
              <span className="mt-4 font-mono text-[10px] tracking-widest text-hud-muted uppercase">
                INITIALIZING INTERACTIVE CORE...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
