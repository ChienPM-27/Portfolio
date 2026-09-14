"use client";

import React, { useRef, useEffect } from "react";
import { VisualSceneProps } from "@/lib/types";

export default function Scene({ progress, isActive }: VisualSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate stable point cloud points representing a 3D object silhouette (chair / object)
    const pointCount = 90;
    const points: { x: number; y: number; z: number; targetX: number; targetY: number }[] = [];

    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.85;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push({ x, y, z, targetX: 0, targetY: 0 });
    }

    let animId: number;
    let localTime = 0;

    const render = () => {
      localTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.32;

      // 1. Draw Technical Camera Viewport Frame
      ctx.strokeStyle = "rgba(214, 214, 214, 0.12)";
      ctx.lineWidth = 1;
      const boxW = width * 0.76;
      const boxH = height * 0.72;
      const boxX = cx - boxW / 2;
      const boxY = cy - boxH / 2;
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      // Viewport Corner Reticles
      const cornerLen = 14;
      ctx.strokeStyle = "#e61e1e";
      ctx.lineWidth = 1.5;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + cornerLen);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX + cornerLen, boxY);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - cornerLen, boxY);
      ctx.lineTo(boxX + boxW, boxY);
      ctx.lineTo(boxX + boxW, boxY + cornerLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + boxH - cornerLen);
      ctx.lineTo(boxX, boxY + boxH);
      ctx.lineTo(boxX + cornerLen, boxY + boxH);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - cornerLen, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH - cornerLen);
      ctx.stroke();

      // 2. Scanline sweeping based on scroll progress
      const scanY = boxY + ((progress * 2.2 + localTime * 0.2) % 1) * boxH;
      const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY);
      grad.addColorStop(0, "rgba(230, 30, 30, 0)");
      grad.addColorStop(1, "rgba(230, 30, 30, 0.25)");
      ctx.fillStyle = grad;
      ctx.fillRect(boxX, scanY - 20, boxW, 20);

      ctx.strokeStyle = "rgba(230, 30, 30, 0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(boxX, scanY);
      ctx.lineTo(boxX + boxW, scanY);
      ctx.stroke();

      // 3. Rotating 3D Point Cloud Projector (Chamfer Distance vectors)
      const rotY = progress * Math.PI * 2.5 + localTime * 0.4;
      const rotX = Math.sin(progress * Math.PI) * 0.4;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedPoints: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 3D rotation
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const depth = 2.4 / (2.4 + z2);
        const px = cx + x1 * scale * depth;
        const py = cy + y1 * scale * depth;

        projectedPoints.push({ x: px, y: py, z: z2 });

        // Draw node
        const nodeAlpha = Math.max(0.15, (z2 + 1) * 0.45);
        ctx.fillStyle = i % 4 === 0 ? "#e61e1e" : `rgba(214, 214, 214, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, (i % 4 === 0 ? 2.5 : 1.6) * depth, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Chamfer Distance interconnection vectors
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i += 3) {
        const p1 = projectedPoints[i];
        for (let j = i + 1; j < Math.min(i + 5, projectedPoints.length); j++) {
          const p2 = projectedPoints[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < scale * 0.55) {
            ctx.strokeStyle = `rgba(214, 214, 214, ${0.12 * (1 - dist / (scale * 0.55))})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  const activePhase =
    progress < 0.35
      ? "YOLO OBJECT CROPPING // 98.4% CONFIDENCE"
      : progress < 0.7
      ? "REMBG FOREGROUND EXTRACTION & MASKING"
      : "PIX3D POINT CLOUD CHAMFER EVALUATION";

  return (
    <div
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] relative bg-gradient-to-b from-obsidian-surface/60 to-obsidian-light/80 rounded-xl overflow-hidden flex items-center justify-center"
      data-cursor="project"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Real-time telemetry overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-ping" />
        <span className="text-[10px] font-mono text-hud-muted tracking-wider uppercase">
          CV INFERENCE STREAM
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <span className="px-2.5 py-1 rounded bg-obsidian/90 border border-hud-dim/30 text-hud-muted">
          {activePhase}
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-obsidian-surface border border-hud-dim/30 text-hud-dim">
          OPENCV // NUMPY
        </span>
      </div>
    </div>
  );
}