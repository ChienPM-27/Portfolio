import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-c",
  title: "Cloud GPU Inference Pipeline",
  tagline: "Asynchronous job dispatcher & NVIDIA L4 runtime telemetry",
  description:
    "Low-latency REST server orchestrating batch AI jobs, GPU memory virtualization, model checkpoint swaps, and real-time inference telemetry.",
  role: "Backend & Systems Developer",
  period: "2025 – 2026",
  techStack: ["FastAPI", "Google Cloud VM", "NVIDIA L4", "Uvicorn", "CUDA"],
  metrics: [
    { label: "GPU Utilization", value: "94.2%" },
    { label: "Queue Latency", value: "< 45ms" },
  ],
  links: [
    {
      label: "System Design",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};