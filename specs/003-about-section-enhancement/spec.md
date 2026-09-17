# Feature Specification: 003 About Section Enhancement

## 1. Overview & Context

This specification defines the redesign and content enhancement of the **About Section** on the personal portfolio of **Pham Minh Chien**, an Information Technology student at Sai Gon University seeking an **AI Engineering Internship**.

The portfolio employs a dark cinematic sci-fi HUD aesthetic with an engineering/technical interface style. The About section must embody an authentic builder identity—technical yet human, confident yet grounded, professional yet accessible to university recruiters and senior AI engineers.

---

## 2. Positioning & Goals

1. **Identity**: Aspiring AI Engineer & IT Student (Class of 2024–2029).
2. **Technical Breadth**: Balanced across AI & Machine Learning, Backend Services (FastAPI), Mobile & Web Integration, and Cloud/Compute Tools.
3. **Builder Mindset**: Learning by building, experimenting with models, and connecting neural networks to real-world applications.
4. **Primary Career Goal**: Securing an AI Engineering Internship.
5. **Tone**: Grounded, specific, and authentic—free from corporate clichés.

---

## 3. Structural & Content Requirements

### A. Left Column: Narrative & Education
- **Main Heading**: Bold condensed typography (`Aspiring AI Engineer / & IT Student`).
- **Narrative Copy**:
  - Divided into two scannable, natural paragraphs.
  - Paragraph 1: Academic background, core technical focus (ML, computer vision, practical application pipelines).
  - Paragraph 2: Engineering philosophy (learning by building, experimenting with models, backend services) and clear internship intent.
- **Education Card**:
  - Sai Gon University • B.Eng. in Information Technology (Sept 2024 – Mar 2029).
  - 2 concise, high-signal bullet points emphasizing mathematics/algorithms fundamentals and practical AI project application.
  - Visual hierarchy: Clean badge icon (`GraduationCap`), period tag, clear typography.

### B. Right Column: Technical Proficiencies
- Four distinct, well-balanced categories:
  1. `AI & Machine Learning`: Python, PyTorch, Machine Learning, Deep Learning, Computer Vision, Model Inference, YOLO, Data Preprocessing.
  2. `Backend & Systems`: FastAPI, REST APIs, Uvicorn, Python, C/C++, Git & GitHub.
  3. `Mobile & Web`: React Native, Expo, TypeScript, JavaScript, Tailwind CSS, Next.js.
  4. `Cloud & Environments`: Google Cloud VM, NVIDIA L4 GPU, Linux / Bash, Jupyter Notebook, Postman, CUDA Basics.
- Category headers: Distinct icons (`Cpu`, `Server`, `Smartphone`, `Terminal`) with cyber-red accents.
- Chips: Consistent padding, mono typography, subtle interactive hover state.

### C. Motion & Animation
- Subtle GSAP ScrollTrigger entrance (staggered fade-up for heading, paragraphs, education card, and skill cards).
- Zero additional WebGL or rendering overhead.
- Strictly honors `prefers-reduced-motion`.

---

## 4. Acceptance Criteria

- [ ] All claims are 100% verified against real project artifacts and `resume.html`.
- [ ] No generic AI buzzwords or exaggerated senior claims.
- [ ] Clean responsive grid layout across mobile (<768px), tablet (768px-1024px), and desktop (>1024px).
- [ ] TypeScript compilation succeeds with 0 errors (`npm run build`).
- [ ] Visual harmony with existing obsidian dark theme and cyber-red accents.
