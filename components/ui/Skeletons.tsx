import React from "react";

export function ProjectsCarouselSkeleton() {
  return (
    <section
      aria-label="Loading featured projects"
      className="relative w-full h-screen bg-obsidian border-t border-hud-dim/20 flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        <div className="h-4 w-56 rounded skeleton-shimmer bg-obsidian-surface" />
        <div className="h-4 w-36 rounded skeleton-shimmer bg-obsidian-surface" />
      </div>

      <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-12 my-auto overflow-hidden">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className="w-[330px] sm:w-[460px] md:w-[540px] lg:w-[580px] h-[470px] sm:h-[510px] md:h-[530px] flex-shrink-0 bg-[#13192b]/70 border border-white/10 p-6 flex flex-col justify-between"
            style={{
              clipPath: "polygon(0 28px, 28px 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="flex items-center justify-between pl-4">
              <div className="h-3 w-40 rounded skeleton-shimmer bg-obsidian-surface" />
              <div className="h-5 w-24 rounded-full skeleton-shimmer bg-obsidian-surface" />
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-8 w-3/4 rounded skeleton-shimmer bg-obsidian-surface" />
              <div className="h-3 w-full rounded skeleton-shimmer bg-obsidian-surface" />
            </div>
            <div className="flex-1 my-4 rounded-md skeleton-shimmer bg-[#090d18] border border-white/10" />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  className="h-12 rounded skeleton-shimmer bg-[#090d18] border border-white/10"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        <div className="h-[2px] w-48 sm:w-64 rounded-full bg-hud-dim/30" />
        <div className="h-4 w-16 rounded skeleton-shimmer bg-obsidian-surface" />
      </div>
    </section>
  );
}

export function AboutSectionSkeleton() {
  return (
    <section
      aria-label="Loading about section"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto min-h-[760px]"
    >
      <div className="border-t border-hud-dim/20 pt-16">
        <div className="h-4 w-48 rounded skeleton-shimmer bg-obsidian-surface mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-6 space-y-6">
            <div className="h-24 w-3/4 rounded skeleton-shimmer bg-obsidian-surface" />
            <div className="h-28 w-full rounded skeleton-shimmer bg-obsidian-surface" />
            <div className="h-48 w-full rounded-xl skeleton-shimmer bg-obsidian-light/85 border border-hud-dim/20" />
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-44 rounded-xl skeleton-shimmer bg-obsidian-light/75 border border-hud-dim/20"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSectionSkeleton() {
  return (
    <section
      aria-label="Loading contact section"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto min-h-[840px]"
    >
      <div className="border-t border-hud-dim/20 pt-16">
        <div className="h-4 w-56 rounded skeleton-shimmer bg-obsidian-surface mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          <div className="lg:col-span-5 space-y-4">
            <div className="h-24 w-3/4 rounded skeleton-shimmer bg-obsidian-surface" />
            <div className="h-24 w-full rounded skeleton-shimmer bg-obsidian-surface" />
            <div className="h-16 w-full rounded-xl skeleton-shimmer bg-obsidian-light/80" />
            <div className="h-16 w-full rounded-xl skeleton-shimmer bg-obsidian-light/80" />
            <div className="h-16 w-full rounded-xl skeleton-shimmer bg-obsidian-light/80" />
          </div>
          <div className="lg:col-span-7 h-[560px] rounded-2xl skeleton-shimmer bg-obsidian-light/95 border border-hud-dim/30" />
        </div>
      </div>
    </section>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading project deep dive"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#070a14]"
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-hud-dim/20 bg-obsidian-light/60">
        <div className="h-4 w-64 rounded skeleton-shimmer bg-obsidian-surface" />
        <div className="h-8 w-8 rounded-full skeleton-shimmer bg-obsidian-surface" />
      </div>
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-4xl h-[460px] rounded-2xl bg-obsidian-light/85 border border-hud-dim/30 p-8 flex flex-col gap-5">
          <div className="h-4 w-44 rounded skeleton-shimmer bg-obsidian-surface" />
          <div className="h-10 w-2/3 rounded skeleton-shimmer bg-obsidian-surface" />
          <div className="h-20 w-full rounded skeleton-shimmer bg-obsidian-surface" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-16 rounded-xl skeleton-shimmer bg-obsidian-surface" />
            <div className="h-16 rounded-xl skeleton-shimmer bg-obsidian-surface" />
          </div>
        </div>
      </div>
      <div className="px-6 sm:px-10 py-4 border-t border-hud-dim/20 bg-obsidian-light/60">
        <div className="h-4 w-56 rounded skeleton-shimmer bg-obsidian-surface" />
      </div>
    </div>
  );
}
