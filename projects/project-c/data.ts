import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-cloud-gpu-pipeline",
  title: "Cloud GPU Inference Pipeline",
  tagline: "High-Throughput Asynchronous REST Service on NVIDIA L4",
  description:
    "Production-grade asynchronous inference infrastructure orchestrated with FastAPI and Uvicorn on Google Cloud VMs. Features GPU memory virtualization, dynamic batching, and CUDA debugging for low-latency multi-modal serving under 45ms.",
  role: "AI Systems & Infrastructure Developer",
  period: "2025 – 2026",
  techStack: [
    "Google Cloud VM",
    "NVIDIA L4 GPU",
    "CUDA",
    "FastAPI",
    "Uvicorn",
    "PyTorch",
    "Docker",
  ],
  metrics: [
    { label: "GPU Utilization", value: "94.2%" },
    { label: "Pipeline Latency", value: "< 45ms" },
  ],
  links: [
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};