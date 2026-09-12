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
}

export function ProjectSection({ project, index }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [sceneState, setSceneState] = useState({
    progress: 0,
    isActive: false,
    direction: 1,
  });

  const isEven = index % 2 === 0;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
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

      if (reducedMotion) {
        // Accessibility fallback: simple fade without translation
        gsap.fromTo(
          [visualRef.current, contentRef.current],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      } else {
        // Full cinematic directional reveal
        const enterX = isEven ? -40 : 40;
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, x: enterX },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      }

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={`project-${project.data.slug}`}
      className="relative min-h-[85vh] sm:min-h-[90vh] py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto flex items-center overflow-x-clip"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* On mobile (<lg): Visual is always order-1 (top), Details is order-2 (bottom) */}
        {/* On desktop (lg): Alternates left/right based on index */}
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