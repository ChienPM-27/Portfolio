"use client";

import React, { useRef, useState } from "react";
import { ProjectDefinition } from "@/lib/types";
import { ProjectDetails } from "./ProjectDetails";
import { SceneContainer } from "./SceneContainer";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import { isReducedMotionPreferred } from "@/lib/scroll-utils";
import gsap from "gsap";

interface ProjectSectionProps {
  project: ProjectDefinition;
  index: number;
  totalProjects?: number;
}

const REVEAL_START = "top 92%";
const REVEAL_END = "top 25%";
const SCENE_TRACK_START = "top 85%";
const SCENE_TRACK_END = "bottom 15%";

export function ProjectSection({
  project,
  index,
  totalProjects = 4,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [sceneState, setSceneState] = useState({
    progress: 0,
    isActive: false,
    direction: 1,
  });

  const isEven = index % 2 === 0;
  const currentNum = String(index + 1).padStart(2, "0");
  const totalNum = String(totalProjects).padStart(2, "0");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Continuous scroll scrub feeding the 3D visual scene
      const sceneTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: SCENE_TRACK_START,
        end: SCENE_TRACK_END,
        scrub: 0.5,
        onUpdate: (self) => {
          setSceneState({
            progress: self.progress,
            isActive: self.isActive,
            direction: self.direction,
          });
        },
      });

      const reducedMotion = isReducedMotionPreferred();

      // 2. Coordinated entrance scrub timeline
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: REVEAL_START,
          end: REVEAL_END,
          scrub: 0.6,
        },
      });

      if (reducedMotion) {
        revealTl.fromTo(
          [contentRef.current, visualRef.current],
          { opacity: 0 },
          { opacity: 1, stagger: 0.15, ease: "power1.out" },
          0
        );
      } else {
        const visualEnterX = isEven ? 50 : -50;
        const textEnterX = isEven ? -40 : 40;

        revealTl
          .fromTo(
            contentRef.current,
            { opacity: 0, x: textEnterX, y: 30 },
            { opacity: 1, x: 0, y: 0, ease: "power2.out" },
            0
          )
          .fromTo(
            visualRef.current,
            { opacity: 0, x: visualEnterX, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, ease: "power2.out" },
            0.1
          );
      }

      return () => {
        sceneTrigger.kill();
        revealTl.scrollTrigger?.kill();
        revealTl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={`project-${project.data.slug}`}
      className="relative min-h-[90vh] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex items-center overflow-x-clip"
    >
      {/* Minimal Project Timeline Progress Indicator */}
      <div className="hidden lg:flex items-center gap-3 absolute left-6 top-8 text-xs font-mono select-none">
        <span className="text-cyber-red font-semibold">{currentNum}</span>
        <span className="text-hud-dim">/</span>
        <span className="text-hud-dim">{totalNum}</span>
        <span className="w-8 h-[1px] bg-hud-dim/30 ml-1" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/*
          Alternating Composition Rule:
          Index 0 (Project 01): text LEFT, visual RIGHT
          Index 1 (Project 02): visual LEFT, text RIGHT
          Index 2 (Project 03): text LEFT, visual RIGHT
          Index 3 (Project 04): visual LEFT, text RIGHT
        */}
        {isEven ? (
          <>
            {/* Text LEFT (col-span-5) */}
            <div
              ref={contentRef}
              className="order-2 lg:order-1 lg:col-span-5 w-full max-w-full"
            >
              <ProjectDetails
                project={project.data}
                index={index}
                totalProjects={totalProjects}
              />
            </div>
            {/* Visual RIGHT (col-span-7) */}
            <div
              ref={visualRef}
              className="order-1 lg:order-2 lg:col-span-7 w-full max-w-full overflow-hidden"
            >
              <SceneContainer
                Scene={project.Scene}
                progress={sceneState.progress}
                isActive={sceneState.isActive}
                direction={sceneState.direction}
              />
            </div>
          </>
        ) : (
          <>
            {/* Visual LEFT (col-span-7) */}
            <div
              ref={visualRef}
              className="order-1 lg:order-1 lg:col-span-7 w-full max-w-full overflow-hidden"
            >
              <SceneContainer
                Scene={project.Scene}
                progress={sceneState.progress}
                isActive={sceneState.isActive}
                direction={sceneState.direction}
              />
            </div>
            {/* Text RIGHT (col-span-5) */}
            <div
              ref={contentRef}
              className="order-2 lg:order-2 lg:col-span-5 w-full max-w-full"
            >
              <ProjectDetails
                project={project.data}
                index={index}
                totalProjects={totalProjects}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}