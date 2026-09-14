import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-vision-segmentation",
  title: "Computer Vision & Preprocessing",
  tagline: "YOLO Object Detection, rembg Segmentation & Pix3D Evaluation",
  description:
    "Computer vision preprocessing pipeline automating foreground extraction, bounding box localization, and Chamfer Distance point cloud evaluation against the Pix3D benchmark. Implemented baseline ResNet50 + MLP feature regressors with precision, recall, and F-score metrics.",
  role: "Computer Vision & AI Developer",
  period: "2026",
  techStack: [
    "Python",
    "YOLO",
    "rembg",
    "OpenCV",
    "Pix3D Dataset",
    "PyTorch",
    "NumPy",
  ],
  metrics: [
    { label: "Segmentation IoU", value: "98.4%" },
    { label: "Evaluation Metrics", value: "Chamfer & F-Score" },
  ],
  links: [
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};