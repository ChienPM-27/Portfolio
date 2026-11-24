"use client";

import dynamic from "next/dynamic";
import { useProjectDetail } from "@/lib/project-detail-context";
import { ProjectDetailSkeleton } from "@/components/ui/Skeletons";

const ImmersiveProjectDetail = dynamic(
  () =>
    import("./ImmersiveProjectDetail").then(
      (m) => m.ImmersiveProjectDetail
    ),
  {
    ssr: false,
    loading: () => <ProjectDetailSkeleton />,
  }
);

export function prefetchProjectDetail() {
  void import("./ImmersiveProjectDetail");
}

export function LazyProjectDetail() {
  const { activeSlug } = useProjectDetail();
  if (!activeSlug) return null;
  return <ImmersiveProjectDetail />;
}
