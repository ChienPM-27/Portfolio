"use client";

import dynamic from "next/dynamic";
import { LazyProjectDetail } from "@/components/projects/LazyProjectDetail";

const InteractiveParticles = dynamic(
  () =>
    import("@/components/shell/InteractiveParticles").then(
      (m) => m.InteractiveParticles
    ),
  { ssr: false }
);

export function ClientChrome() {
  return (
    <>
      <InteractiveParticles />
      <LazyProjectDetail />
    </>
  );
}
