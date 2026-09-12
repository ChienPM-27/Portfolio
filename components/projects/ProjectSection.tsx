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

// Khoảng cuộn dành cho reveal (fade/slide vào) — RỘNG hơn bản cũ (35% -> ~65-70% viewport)
// để mắt kịp thấy chuyển động thay vì "chớp" xong trong 1-2 tick cuộn.
const REVEAL_START = "top 92%";
const REVEAL_END = "top 20%";

// Khoảng cuộn cho progress của scene 3D — giữ nguyên, cố tình rộng bằng cả section
// vì scene cần animate xuyên suốt lúc section đi qua viewport, không chỉ lúc mới vào.
const SCENE_TRACK_START = "top 85%";
const SCENE_TRACK_END = "bottom 15%";

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

      // 1) Trigger riêng chỉ để feed progress cho scene 3D — KHÔNG đổi, phạm vi rộng
      //    xuyên suốt section là đúng ý đồ (khác với trigger reveal bên dưới).
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

      // 2) Reveal — GỘP visual + content vào CHUNG 1 timeline + 1 scrollTrigger
      //    để không bao giờ lệch nhịp, và range rộng hơn để thấy rõ chuyển động.
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: REVEAL_START,
          end: REVEAL_END,
          scrub: 0.6,
          // markers: true, // bật khi cần debug vị trí start/end, nhớ tắt trước khi build
        },
      });

      if (reducedMotion) {
        // Accessibility fallback: fade đơn giản, không dịch chuyển
        revealTl.fromTo(
          [visualRef.current, contentRef.current],
          { opacity: 0 },
          { opacity: 1, stagger: 0.2, ease: "power1.out" },
          0
        );
      } else {
        const enterX = isEven ? -60 : 60; // tăng nhẹ để cảm nhận rõ hơn khi range đã rộng ra

        revealTl
          .fromTo(
            visualRef.current,
            { opacity: 0, x: enterX },
            { opacity: 1, x: 0, ease: "power2.out" },
            0
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: 60 }, // tăng từ 30 -> 60, dễ nhận ra là có animate
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
      className="relative min-h-[85vh] sm:min-h-[90vh] py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto flex items-center overflow-x-clip"
    >
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

/**
 * Thêm 1 lần ở nơi render toàn bộ danh sách ProjectSection (vd trang chủ / layout),
 * KHÔNG lặp lại trong từng section, để tránh lệch vị trí trigger do layout shift
 * (Canvas Three.js mount xong / web font load xong mới đúng chiều cao thật):
 *
 *   useEffect(() => {
 *     const refresh = () => ScrollTrigger.refresh();
 *     if (document.fonts?.ready) document.fonts.ready.then(refresh);
 *     window.addEventListener("load", refresh);
 *     return () => window.removeEventListener("load", refresh);
 *   }, []);
 *
 * Nếu vẫn thấy 1-2 section đầu bị "nhảy" thẳng vào trạng thái cuối khi vừa load trang,
 * gần như chắc chắn là do lỗi này — refresh() sẽ đo lại đúng vị trí sau khi layout ổn định.
 */