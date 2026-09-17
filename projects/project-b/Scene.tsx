"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { VisualSceneProps } from "@/lib/types";

export default function Scene({ progress, isActive = true }: VisualSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Generate stable point cloud points representing 3D object silhouette ONCE
  const points = useMemo(() => {
    const pointCount = 90;
    const pts: { x: number; y: number; z: number; targetX: number; targetY: number }[] = [];

    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.85;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pts.push({ x, y, z, targetX: 0, targetY: 0 });
    }
    return pts;
  }, []);

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

    let animId: number;
    let localTime = 0;

    const render = () => {
      // If inactive / offscreen, do not schedule next frame
      if (!isActive) return;

      localTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      const curProgress = progressRef.current;
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

      // 2. Center Crosshair
      ctx.strokeStyle = "rgba(230, 30, 30, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();

      // 3. Dynamic Bounding Box (expands / snaps based on progress)
      const bboxW = boxW * (0.42 + curProgress * 0.32);
      const bboxH = boxH * (0.45 + curProgress * 0.35);
      const bboxX = cx - bboxW / 2;
      const bboxY = cy - bboxH / 2;

      ctx.strokeStyle = "rgba(230, 30, 30, 0.8)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(bboxX, bboxY, bboxW, bboxH);
      ctx.setLineDash([]);

      // Bbox Label
      ctx.fillStyle = "#e61e1e";
      ctx.font = "9px monospace";
      ctx.fillText(`YOLO_V8 // CHAIR ${(85 + curProgress * 14.8).toFixed(1)}%`, bboxX, bboxY - 6);

      // 4. Point Cloud / Feature Extraction Particles
      const rotY = localTime * 0.4 + curProgress * Math.PI * 1.5;
      const rotX = Math.sin(localTime * 0.3) * 0.2;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 3D rotation
        let x1 = pt.x * Math.cos(rotY) + pt.z * Math.sin(rotY);
        let z1 = -pt.x * Math.sin(rotY) + pt.z * Math.cos(rotY);
        let y1 = pt.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        z1 = pt.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Perspective projection
        const fov = 2.4;
        const pz = z1 + fov;
        const px = (x1 / pz) * scale + cx;
        const py = (y1 / pz) * scale + cy;

        // Visual morph: random scattered -> clustered mesh
        const alpha = Math.max(0.2, (pz / (fov + 0.85)));
        const pointSize = Math.max(1, 2.4 * (1 - z1 / 2));

        ctx.fillStyle = i % 3 === 0 ? `rgba(230, 30, 30, ${alpha})` : `rgba(214, 214, 214, ${alpha * 0.85})`;
        ctx.fillRect(px, py, pointSize, pointSize);

        // Connect nearby points to simulate wireframe Delaunay edges
        if (i > 0 && i % 4 === 0 && curProgress > 0.3) {
          const prev = points[i - 1];
          let px0 = prev.targetX;
          let py0 = prev.targetY;
          if (px0 && py0) {
            ctx.strokeStyle = `rgba(214, 214, 214, ${alpha * 0.22 * curProgress})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px0, py0);
            ctx.stroke();
          }
        }
        pt.targetX = px;
        pt.targetY = py;
      }

      animId = requestAnimationFrame(render);
    };

    if (isActive) {
      render();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, points]);

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
