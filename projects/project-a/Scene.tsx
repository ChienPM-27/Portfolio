"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { VisualSceneProps } from "@/lib/types";
import * as THREE from "three";

function MeshObject({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Continuous idle spin plus scroll-driven rotation
    meshRef.current.rotation.x = progress * Math.PI * 2 + state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = progress * Math.PI * 3 + state.clock.getElapsedTime() * 0.3;
    const scale = 1.3 + Math.sin(progress * Math.PI) * 0.3;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          emissive="#083344"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene({ progress, isActive }: VisualSceneProps) {
  return (
    <div className="w-full h-full min-h-[360px] relative bg-gradient-to-b from-zinc-950 to-zinc-900/50">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} color="#06b6d4" intensity={2} />
        <MeshObject progress={progress} />
      </Canvas>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400/80 bg-zinc-950/80 px-2.5 py-1 rounded border border-cyan-900/40">
        R3F WIREFRAME SCENE
      </div>
    </div>
  );
}