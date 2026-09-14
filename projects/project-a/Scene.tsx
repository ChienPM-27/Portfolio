"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center } from "@react-three/drei";
import { VisualSceneProps } from "@/lib/types";
import * as THREE from "three";

function ReconstructedModel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/mesh_textured.glb");

  // Clone scene so materials/instances don't mutate globally
  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    // Auto-normalize bounding size
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = 2.4 / maxDim;
      clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Scroll-driven visual story:
    // Phase 1 (0 -> 0.35): enter from right, rotation accelerates
    // Phase 2 (0.35 -> 0.7): stable showcase, smooth continuous rotation
    // Phase 3 (0.7 -> 1.0): exit transform
    const enterOffset = Math.max(0, (0.35 - progress) * 4);
    groupRef.current.position.x = enterOffset;

    // Continuous smooth rotation driven primarily by scroll progress + subtle idle
    const targetRotY = progress * Math.PI * 2.8 + state.clock.getElapsedTime() * 0.15;
    const targetRotX = Math.sin(progress * Math.PI) * 0.35;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.1
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.1
    );

    // Subtle breathing scale
    const targetScale = 1 + Math.sin(progress * Math.PI) * 0.15;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Toggle/blend wireframe mode dynamically based on reconstruction stage (progress < 0.4)
    const isWireframePhase = progress < 0.32;
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ("wireframe" in mat) {
              (mat as THREE.MeshStandardMaterial).wireframe = isWireframePhase;
            }
          });
        } else if (mesh.material && "wireframe" in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = isWireframePhase;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

function FallbackGeometry({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = progress * Math.PI * 2 + state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.x = progress * Math.PI * 1.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 100, 16]} />
        <meshStandardMaterial
          color="#d6d6d6"
          wireframe={progress < 0.35}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

// Preload the real GLB model
if (typeof window !== "undefined") {
  useGLTF.preload("/models/mesh_textured.glb");
}

export default function Scene({ progress, isActive }: VisualSceneProps) {
  const stage =
    progress < 0.32
      ? "PHASE 01 // WIREFRAME TOPOLOGY RECONSTRUCTION"
      : progress < 0.72
      ? "PHASE 02 // SOLID WATERTIGHT MESH SYNTHESIS"
      : "PHASE 03 // TEXTURED 3D ASSET EXPORT";

  return (
    <div
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] relative bg-gradient-to-b from-obsidian-surface/60 to-obsidian-light/80 rounded-xl overflow-hidden"
      data-cursor="project"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 6]} intensity={2.0} />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#e61e1e" />
        <pointLight position={[0, 4, 2]} intensity={1.5} />

        <Suspense fallback={<FallbackGeometry progress={progress} />}>
          <ReconstructedModel progress={progress} />
        </Suspense>
      </Canvas>

      {/* Stage Telemetry Tag */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <span className="px-2.5 py-1 rounded bg-obsidian/90 border border-hud-dim/30 text-hud-muted">
          {stage}
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyber-red/10 border border-cyber-red/30 text-cyber-red">
          NVIDIA L4 // PYTORCH
        </span>
      </div>
    </div>
  );
}