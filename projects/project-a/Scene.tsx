"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, OrbitControls } from "@react-three/drei";
import { VisualSceneProps } from "@/lib/types";
import * as THREE from "three";

function ReconstructedModel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/mesh_textured.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Compute normals and ensure double-sided textured materials
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.computeVertexNormals();
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
            });
          } else {
            mesh.material.side = THREE.DoubleSide;
            mesh.material.needsUpdate = true;
          }
        }
      }
    });

    // Auto-center and normalize size
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = 2.7 / maxDim;
      clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Scroll-driven animation with subtle idle spin
    const enterOffset = Math.max(0, (0.3 - progress) * 3);
    groupRef.current.position.x = enterOffset;

    const targetRotY = progress * Math.PI * 2.8 + state.clock.getElapsedTime() * 0.2;
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

    // Toggle wireframe mode dynamically during early phase (progress < 0.3)
    const isWireframePhase = progress < 0.28;
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
      <primitive object={clonedScene} />
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

if (typeof window !== "undefined") {
  useGLTF.preload("/models/mesh_textured.glb");
}

export default function Scene({ progress }: VisualSceneProps) {
  const stage =
    progress < 0.28
      ? "PHASE 01 // WIREFRAME TOPOLOGY RECONSTRUCTION"
      : progress < 0.72
      ? "PHASE 02 // SOLID WATERTIGHT MESH SYNTHESIS"
      : "PHASE 03 // TEXTURED 3D ASSET EXPORT";

  return (
    <div
      className="w-full h-full relative bg-gradient-to-b from-obsidian-surface/70 to-obsidian-light/90 rounded-xl overflow-hidden"
      data-cursor="project"
    >
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[6, 8, 6]} intensity={2.5} />
        <directionalLight position={[-6, -4, -4]} intensity={1.4} color="#ff5555" />
        <directionalLight position={[0, 4, -6]} intensity={1.6} />
        <pointLight position={[0, 0, 3]} intensity={1.2} />

        <Suspense fallback={<FallbackGeometry progress={progress} />}>
          <ReconstructedModel progress={progress} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Stage Telemetry Tag */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono z-10">
        <span className="px-2.5 py-1 rounded bg-obsidian/90 border border-hud-dim/30 text-hud-muted">
          {stage}
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyber-red/15 border border-cyber-red/30 text-cyber-red">
          DRAG TO ROTATE 3D MESH
        </span>
      </div>
    </div>
  );
}