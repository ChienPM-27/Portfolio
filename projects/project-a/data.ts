import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-3d-reconstruction",
  title: "AI 3D Reconstruction System",
  tagline: "Single-Image 3D Reconstruction & Watertight Mesh Synthesis",
  description:
    "End-to-end deep learning system reconstructing watertight 3D meshes (GLB, OBJ, PLY) from single mobile captures. Integrated pretrained diffusion & feed-forward models (Hunyuan3D-2, TripoSR) alongside a custom ResNet50 baseline, deployed on Google Cloud VMs with NVIDIA L4 GPUs.",
  role: "AI Backend & Mobile Integration Developer",
  period: "2026 – present",
  techStack: [
    "PyTorch",
    "Hunyuan3D-2",
    "TripoSR",
    "FastAPI",
    "React Native",
    "NVIDIA L4 GPU",
    "GLB / OBJ / PLY",
  ],
  metrics: [
    { label: "Evaluation Baseline", value: "Chamfer & F-Score" },
    { label: "Mesh Delivery", value: "< 4.5s Cloud GPU" },
  ],
  links: [
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};