"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Particle Nebula — runs entirely on the existing bundled Three.js/R3F.
// No Spline CDN, no React state toggle = smooth 60fps with zero jank.
// ---------------------------------------------------------------------------

function ParticleNebula() {
  const pointsRef = useRef<THREE.Points>(null);

  // Build geometry once in a memo — no allocations per frame
  const { geometry, material } = useMemo(() => {
    const COUNT = 6000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Oblate spheroid (galaxy-like) distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = Math.pow(Math.random(), 0.55) * 2.1; // bias toward center
      const flatY = 0.32 + Math.random() * 0.18; // flatten on Y axis

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * flatY;
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Brightness fades from white center to dim-gray edge
      const brightness = Math.max(0.28, 1 - (r / 2.1) * 0.72);
      const blueShift = 0.06 * Math.max(0, 1 - r / 2.1);
      colors[i * 3]     = brightness * 0.93;
      colors[i * 3 + 1] = brightness * 0.93;
      colors[i * 3 + 2] = Math.min(1, brightness + blueShift);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.019,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.042;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.11) * 0.07;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ---------------------------------------------------------------------------
// Public export — drop-in replacement for the old Spline InteractiveOrb
// ---------------------------------------------------------------------------

export function InteractiveOrb() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.4, 3.6], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <ParticleNebula />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.32}
          dampingFactor={0.07}
          enableDamping
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
