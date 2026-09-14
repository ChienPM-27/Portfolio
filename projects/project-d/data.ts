import { ProjectData } from "@/lib/types";

export const data: ProjectData = {
  slug: "project-keysmith-ecommerce",
  title: "Keysmith Platform & Dashboard",
  tagline: "Custom Keyboard E-Commerce & Real-Time Warehouse Management",
  description:
    "Responsive commercial web platform and administrative analytics suite featuring live inventory tracking, customer statistics, and sales performance telemetry with modular components.",
  role: "Frontend & Admin Dashboard Developer",
  period: "2025 – 2026",
  techStack: [
    "JavaScript",
    "HTML5 / CSS3",
    "jQuery",
    "Admin Dashboard",
    "Analytics UI",
    "Git / GitHub",
  ],
  metrics: [
    { label: "Dashboard Modules", value: "Sales & Inventory" },
    { label: "Design System", value: "100% Responsive" },
  ],
  links: [
    {
      label: "Live Deployment",
      url: "https://keysmith-teamproj.vercel.app",
      type: "external",
    },
    {
      label: "GitHub Source",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
};
