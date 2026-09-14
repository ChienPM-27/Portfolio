import { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Pham Minh Chien",
  role: "AI Engineer",
  status: "AI Engineer Intern / Junior AI Engineer",
  location: "Ho Chi Minh City, Viet Nam",
  positioning:
    "Engineering practical AI systems spanning Computer Vision, Single-Image 3D Reconstruction, and high-throughput cloud GPU inference pipelines.",
  summary:
    "Information Technology student at Sai Gon University with a focused interest in Artificial Intelligence, Computer Vision, backend systems, and mobile application development. Experienced in deploying deep learning inference workflows on cloud GPUs, building FastAPI services, and connecting multi-modal AI models to production interfaces.",
  education: {
    degree: "B.Eng. in Information Technology",
    institution: "Sai Gon University",
    location: "Ho Chi Minh City, Viet Nam",
    period: "Sept 2024 – Mar 2029",
    highlights: [
      "Core coursework in programming, data structures, algorithms, databases, web development, and artificial intelligence.",
      "Building academic projects in computer vision, single-image 3D reconstruction, and backend services.",
      "Actively developing cloud GPU deployment workflows, model inference optimization, and distributed environments.",
    ],
  },
  skills: [
    {
      category: "AI & Machine Learning",
      items: [
        "PyTorch",
        "Computer Vision",
        "3D Reconstruction",
        "Point Cloud Processing",
        "Pretrained Model Inference",
        "YOLO",
        "rembg",
        "Hunyuan3D-2",
        "TripoSR",
      ],
    },
    {
      category: "Backend & Systems",
      items: [
        "FastAPI",
        "REST API",
        "Uvicorn",
        "API Integration",
        "Python",
        "C/C++",
      ],
    },
    {
      category: "Mobile & Web",
      items: [
        "React Native",
        "Expo",
        "TypeScript",
        "JavaScript",
        "HTML/CSS",
        "Tailwind CSS",
        "Next.js",
      ],
    },
    {
      category: "Cloud & Deployment",
      items: [
        "Google Cloud VM",
        "NVIDIA L4 GPU",
        "CUDA Debugging",
        "Git",
        "GitHub",
        "Postman",
      ],
    },
  ],
  links: {
    github: "https://github.com/ChienPM-27",
    emailUser: "pminhchien2006",
    emailDomain: "gmail.com",
  },
};