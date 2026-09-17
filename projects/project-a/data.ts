import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-3d-reconstruction",
  title: "AI 3D Reconstruction System",
  tagline: "Mobile-to-3D Pipeline: Capture, Cloud Inference, Watertight Mesh",
  description:
    "A mobile-to-3D system that turns a single object photo into a textured, watertight GLB mesh. An Expo/React Native app handles capture and framing, a FastAPI backend orchestrates cleanup and job state, and a remote Hunyuan3D-2 worker on a GCP GPU VM performs the actual reconstruction.",
  role: "AI Backend & Mobile Integration Developer",
  period: "2026 – present",
  techStack: [
    "React Native / Expo",
    "YOLO (live detection)",
    "FastAPI",
    "PyTorch",
    "Hunyuan3D-2",
    "GCP GPU VM",
    "Cloudflare Tunnel",
    "Three.js",
    "GLB",
  ],
  metrics: [
    { label: "Architecture", value: "3-Tier: Mobile / GCP Worker / API" },
    { label: "Job Pipeline", value: "5-Stage Async (Upload → Mesh)" },
  ],
  links: [
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
  detailSections: [
    {
      heading: "Mobile App (Expo / React Native)",
      points: [
        "Live object detection via YOLO to help the user frame the shot in real time.",
        "Manual bounding-box crop as the reconstruction trigger; a 10–15% padding is added before upload so the object isn't clipped after background removal.",
        "Visual processing timeline in the UI mirrors backend job state: Capture → Clean → Mesh → Texture.",
        "In-app 3D viewer renders the returned GLB inside a WebView running Three.js + GLTFLoader (orbit, wireframe, auto-rotate) — kept out of native code so shaders/lighting are easy to tweak.",
        "Scan history is cached locally with AsyncStorage; only file paths are stored on-device, the actual mesh files live on the server.",
      ],
    },
    {
      heading: "GCP Server — Hunyuan3D-2 Worker",
      points: [
        "Hunyuan3D-2 (diffusion + feed-forward shape generation) runs on a GPU VM on Google Cloud.",
        "The worker is exposed to the local FastAPI backend through a Cloudflare Tunnel, avoiding the need for a static IP or inbound firewall rules.",
        "Runtime is version-pinned for reproducibility (PyTorch cu126 build, diffusers 0.31.0, transformers 4.46.3, accelerate 1.1.1).",
        "A documented redeploy runbook (Jupyter notebooks + bootstrap scripts) rebuilds the VM end-to-end — OS packages, NVIDIA driver, CUDA, worker, tunnel — after a preemption or manual stop.",
      ],
    },
    {
      heading: "Backend (FastAPI)",
      points: [
        "`/reconstruct-bbox` crops the uploaded image to the bbox and cleans it locally (rembg background removal, with a crop-only fallback if rembg is unavailable) before forwarding it to the remote worker.",
        "Reconstruction runs as an async job with polling: uploaded → cropping → cleaning → generating_shape → completed / failed.",
        "Separate endpoints expose job status (`/reconstruction-jobs/{id}`) and an optional texture-painting pass (`/paint-texture`).",
        "Legacy TripoSR and Gemini/Nano-Banana integrations were removed; Hunyuan3D-2 is the sole reconstruction backend today.",
      ],
    },
  ],
};