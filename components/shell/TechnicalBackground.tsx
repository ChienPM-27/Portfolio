import React from "react";

/**
 * Pure CSS static coordinate grid & vignette background.
 * Zero JavaScript, zero requestAnimationFrame loops, zero mousemove listeners.
 */
export function TechnicalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 bg-[#0b0e1a]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(230, 30, 30, 0.05), transparent 55%),
          linear-gradient(to right, rgba(214, 214, 214, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(214, 214, 214, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 76px 76px, 76px 76px",
      }}
    />
  );
}
