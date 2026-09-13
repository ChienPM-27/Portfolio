"use client";

import React from "react";

export function HudOverlay() {
  return (
    <>
      {/* Bottom-left crosshair */}
      <div className="hud-corner hud-corner-bl" aria-hidden="true">
        +
      </div>

      {/* Bottom-right audio wave indicator */}
      <div className="hud-corner hud-corner-br" aria-hidden="true">
        <div className="audio-wave">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
}
