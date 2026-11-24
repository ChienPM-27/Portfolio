import { ProjectData } from "@/lib/types";

export const remoraData: ProjectData = {
  slug: "remora-production",
  title: "Remora — Screenshot Memory",
  category: "Android AI • Contextual RAG",
  badge: { label: "Top 7 Hackathon", tone: "award" },
  tagline:
    "Local-First Android Screenshot Memory with Two-Stage Semantic Resurfacing & Cited Chat",
  description:
    "Top 7 Hackathon project evolved into a production-hardened Android + Ktor microservice system. Remora captures screenshots with optional user intent, keeps original images, OCR, and chat history privately on-device in Room SQLite, and uses a two-stage Cosine + Gemini 2.5 Flash pipeline to resurface related memories and power grounded, citation-verified per-image chat.",
  role: "AI Systems & Android/Backend Engineer",
  period: "Oct 2026 – Nov 2026",
  techStack: [
    "Kotlin / Jetpack Compose",
    "Room SQLite",
    "WorkManager",
    "Ktor Microservices",
    "Google Gemini 2.5 Flash",
    "PostgreSQL 16",
    "Docker / EC2",
  ],
  kpis: [
    { label: "Hackathon Rank", value: "Top 7" },
    { label: "Retrieval Loop", value: "2-Stage AI" },
    { label: "Verified Suite", value: "147 Tests" },
  ],
  metrics: [
    {
      label: "Achievement",
      value: "Top 7 Hackathon Project → Production Architecture",
    },
    {
      label: "Verification",
      value: "147 Unit Tests (0 Fail) + Real WorkManager/Room Smoke",
    },
    {
      label: "Backend Stack",
      value: "Dual Ktor Services (Gateway + AI) • PostgreSQL 16 • Caddy",
    },
    {
      label: "Privacy Model",
      value: "100% On-Device Media/OCR/Chat • Explicit Consent Gates",
    },
  ],
  links: [
    {
      label: "GitHub Profile (Private Repo)",
      url: "https://github.com/ChienPM-27",
      type: "github",
    },
  ],
  visual: "memory-flow",
  detailSections: [
    {
      heading: "On-Device Android Architecture (Kotlin & Jetpack Compose)",
      shortTitle: "Android Local-First",
      points: [
        "Implements the full `Save → Search → Contextual Resurfacing → Per-Image Chat` workflow using Jetpack Compose, Room SQLite, WorkManager, and MediaStore `ContentObserver`.",
        "Offline-first ownership: private image copies, user intent notes, OCR text, vector embeddings, and chat threads live locally in Room so keyword search works even without network or AI.",
        "Bounded background worker pipeline enforces a persisted 3-attempt retry budget and 90-second attempt deadline, separating connection, auth, quota, timeout, and unreadable-image error states.",
      ],
    },
    {
      heading: "Two-Stage Semantic Resurfacing & Grounded Citation Chat",
      shortTitle: "2-Stage AI & Chat",
      points: [
        "Stage 1 (Zero LLM cost): runs on-device cosine similarity over stored card embeddings to shortlist the top-15 candidate screenshots.",
        "Stage 2 (Gemini 2.5 Flash): evaluates semantic relationships (`duplicate`, `complementary`, `explanatory`, `contradictory`) with a strict `confidence > 0.80` gate, organizing up to 2 results per group (Similar, Complementary, Actionable).",
        "Per-image chat enforces explicit user consent on Send, binds an anchored screenshot plus at most 3 selected metadata/note sources, and validates `sections[].citations` against `allowed_citation_ids` to prevent hallucinated references.",
      ],
    },
    {
      heading: "Dual Ktor Microservices, Security & Verification",
      shortTitle: "Ktor & Testing",
      points: [
        "Split backend into `gateway` and `ai-service` (Ktor + Docker Compose + Caddy TLS for AWS EC2), keeping `GEMINI_API_KEY` isolated inside `ai-service` while PostgreSQL stores only auth sessions, quotas, and attempt ledgers.",
        "Enforces OpenAPI contracts (`gateway/openapi.yaml`, `ai-service/openapi.yaml`) via Spectral CLI lint in CI alongside Android Lint and APK builds.",
        "Verified with 147 Android unit tests (including 10 `CardAnalysisPipeline` tests) and 3/3 instrumentation tests running real Room + WorkManager state transitions.",
      ],
    },
  ],
};
