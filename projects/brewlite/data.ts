import { ProjectData } from "@/lib/types";

export const brewliteData: ProjectData = {
  slug: "brewlite",
  title: "BrewLite — Cashless Coffee PWA",
  category: "Full-Stack Monorepo • CI/CD",
  badge: { label: "Live Production", tone: "live" },
  tagline:
    "Mobile-First Cashless Ordering Monorepo — Next.js 15, NestJS 11, PostgreSQL & Full CI/CD",
  description:
    "Production-deployed cashless beverage ordering PWA engineered as a modern monorepo across a 7-member team. Led system architecture, 9 ADRs, Docker Compose packaging, and automated GitHub Actions CI/CD deploying Next.js 15 to Vercel Edge, NestJS 11 to Render, and PostgreSQL 16 on Supabase with 100% test traceability across all 22 functional requirements.",
  role: "Team Lead, Scrum Master & DevOps Architect",
  period: "Nov 2026",
  techStack: [
    "Next.js 15 PWA",
    "NestJS 11",
    "PostgreSQL 16",
    "Prisma ORM",
    "Zustand",
    "VNPay Sandbox",
    "Docker & GitHub Actions",
  ],
  kpis: [
    { label: "FR Coverage", value: "22/22 (100%)" },
    { label: "Design Docs", value: "9 ADRs + C4" },
    { label: "Rollback SLA", value: "< 10s Edge" },
  ],
  metrics: [
    {
      label: "Traceability",
      value: "22/22 FRs • 100% Unit, Integration, Component & E2E",
    },
    {
      label: "Cloud Hybrid",
      value: "Vercel Edge + Render API + Supabase PG16 (Singapore)",
    },
    {
      label: "Leadership",
      value: "Led 7-Member Team • Architecture, Docker & Release",
    },
    {
      label: "Live Status",
      value: "HTTPS Production + Post-Deploy Smoke Checks",
    },
  ],
  links: [
    {
      label: "Live Web App",
      url: "https://brewlite-frontend.vercel.app",
      type: "demo",
    },
    {
      label: "GitHub Repository",
      url: "https://github.com/ChienPM-27/BrewLite_assignment2",
      type: "github",
    },
  ],
  visual: "ci-pipeline",
  detailSections: [
    {
      heading: "Monorepo & Cloud Hybrid Architecture",
      shortTitle: "Cloud Monorepo",
      points: [
        "Frontend (`apps/web`): Next.js 15 App Router mobile-first PWA styled with Tailwind CSS and Zustand state stores, deployed to Vercel Edge CDN.",
        "Backend (`apps/api`): Modular NestJS 11 REST API (`auth`, `products`, `orders`, `payments`, `pricing`) with Prisma ORM, bcrypt hashing, JWT + RBAC (`JwtAuthGuard`, `RolesGuard`), and VNPay Sandbox checkout, hosted on Render.",
        "Data layer: PostgreSQL 16 managed on Supabase Cloud (`ap-southeast-1` Singapore) with zero-downtime `prisma migrate deploy` and Point-in-Time Recovery (PITR).",
      ],
    },
    {
      heading: "CI/CD Automation, Quality Gates & Rollback",
      shortTitle: "CI/CD & Rollback",
      points: [
        "GitHub Actions (`ci.yml` & `cd.yml`) enforces 100% passing ESLint, Jest unit tests, real-PostgreSQL integration tests, Vitest component tests, Playwright E2E checkout flows, and production builds before release.",
        "One-command local onboarding via `docker compose up --build` spinning up Web (`:3000`), API (`:4000/api/v1`), and PostgreSQL (`:5432`) with `/api/v1/health` verification.",
        "Documented incident recovery: `< 10s` instant Vercel deployment promotion, Render deploy rollback, post-deploy smoke test automation, and Supabase PITR.",
      ],
    },
    {
      heading: "Docs-as-Code & 100% Requirements Traceability",
      shortTitle: "Docs & Traceability",
      points: [
        "Maintained complete Docs-as-Code suite: SRS with Given-When-Then acceptance criteria, C4 Container & UML PlantUML/SVG diagrams, and 9 Architecture Decision Records (`ADR-001` through `ADR-009`).",
        "100% traceability matrix (`FR-01` to `FR-22`) mapping every requirement across Auth/RBAC, Menu, Pricing, Cart, Inventory/Order State Machine, VNPay Payment, and Order History directly to code and passing CI tests.",
      ],
    },
  ],
};
