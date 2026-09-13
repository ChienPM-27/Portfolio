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
const REVEAL_END = "top 20%";
const SCENE_TRACK_START = "top 85%";
const SCENE_TRACK_END = "bottom 15%";

export function ProjectSection({ project, index, totalProjects = 3 }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [sceneState, setSceneState] = useState({
    progress: 0,
    isActive: false,
    direction: 1,
  });

  const isEven = index % 2 === 0;
  const sectionNumber = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

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
          [visualRef.current, contentRef.current],
          { opacity: 0 },
          { opacity: 1, stagger: 0.2, ease: "power1.out" },
          0
        );
      } else {
        const enterX = isEven ? -60 : 60;

        revealTl
          .fromTo(
            visualRef.current,
            { opacity: 0, x: enterX },
            { opacity: 1, x: 0, ease: "power2.out" },
            0
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0
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
      className="relative min-h-[85vh] sm:min-h-[90vh] py-12 sm:py-20 px-4 sm:px-6 lg:pl-20 max-w-7xl mx-auto flex items-center overflow-x-clip"
    >
      {/* Left Vertical Timeline Node — Gleec style */}
      <div className="hidden lg:flex flex-col items-center absolute left-8 top-1/2 -translate-y-1/2 gap-2">
        <div className="timeline-node active" />
        <span className="font-display text-[10px] tracking-[0.25em] uppercase text-hud-muted">
          {sectionNumber}
        </span>
        <span className="font-display text-[10px] tracking-[0.15em] uppercase text-cyber-red">
          {project.data.slug.replace(/-/g, " ").toUpperCase().slice(0, 12)}
        </span>
        {index < totalProjects - 1 && (
          <div className="w-[1px] h-16 bg-timeline-line mt-2" />
        )}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {isEven ? (
          <>
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
            <div
              ref={contentRef}
              className="order-2 lg:order-2 lg:col-span-5 w-full max-w-full"
            >
              <ProjectDetails project={project.data} index={index} />
            </div>
          </>
        ) : (
          <>
            <div
              ref={contentRef}
              className="order-2 lg:order-1 lg:col-span-5 w-full max-w-full"
            >
              <ProjectDetails project={project.data} index={index} />
            </div>
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
        )}
      </div>
    </section>
  );
}