import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-a",
  title: "Neural 3D Mesh Geometry",
  tagline: "Single-view geometric reconstruction & wireframe topology",
  description:
    "Experimental prototype analyzing single-image 3D object synthesis, coordinate transforms, and real-time mesh rendering within WebGL viewports.",
  role: "AI & Graphics Engineer",
  period: "2026",
  techStack: ["Three.js", "React Three Fiber", "Drei", "PyTorch", "GLTF"],
  metrics: [
    { label: "Mesh Polygons", value: "24,500" },
    { label: "Render Target", value: "60 FPS" },
  ],
  links: [
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};