import { ProjectData } from "@/lib/types";

export const signLanguageData: ProjectData = {
  slug: "sign-language-islr",
  title: "Sign Language Recognition (ISLR)",
  category: "Machine Learning • Sequence Modeling",
  badge: { label: "42-Config Ablation Study", tone: "research" },
  tagline:
    "20-Gloss ASL Recognition on MediaPipe Landmarks — 42 Configs × 3 Seeds (126 Fits)",
  description:
    "End-to-end Isolated Sign Language Recognition (ISLR) system trained on Kaggle's asl-signs dataset (7,854 sequences across 20 glosses, signer-independent split). Evaluated 6 temporal neural architectures across 7 anatomical landmark subsets (42 configs × seeds 42/43/44 = 126 verified fits), locking Transformer T0__HF as winner with 87.30% ± 0.77% held-out Test Macro-F1 and a real-time GPU webcam inference demo.",
  role: "ML Engineer & Experiment Lead",
  period: "Sept 2026 – Nov 2026",
  techStack: [
    "PyTorch",
    "Transformer / BiGRU",
    "MediaPipe Holistic",
    "Python",
    "Parquet / NumPy",
    "Git LFS",
    "Pytest (331 tests)",
  ],
  kpis: [
    { label: "Test Macro-F1", value: "87.30%" },
    { label: "Test Top-3", value: "98.34%" },
    { label: "Ablation Matrix", value: "42 × 3 Fits" },
  ],
  metrics: [
    {
      label: "Winner (T0__HF) Test Macro-F1",
      value: "87.30% ± 0.77% (Top-1: 88.20%, Top-3: 98.34%)",
    },
    {
      label: "Validation Macro-F1 (1,155 clips)",
      value: "76.52% ± 0.56% (311,956 params)",
    },
    {
      label: "Ablation Coverage",
      value: "42 Configs • 126 Verified Fits (Seeds 42/43/44)",
    },
    {
      label: "Dataset & Split",
      value: "7,854 Clips • 20 Glosses • Signer-Independent (15/3/3)",
    },
  ],
  links: [
    {
      label: "GitHub Repository",
      url: "https://github.com/ChienPM-27/SignLanguageReconition_ML",
      type: "github",
    },
  ],
  visual: "ablation-matrix",
  detailSections: [
    {
      heading: "Full 42-Config Ablation Matrix (Validation Macro-F1 %)",
      shortTitle: "Ablation Matrix",
      matrix: {
        caption:
          "Mean Validation Macro-F1 (%) across 6 temporal architectures × 7 landmark subsets (H: Hand 143ch, B: Upper-Body 17ch, F: Face 36ch — 3 seeds each)",
        unit: "%",
        columns: ["H", "B", "F", "HB", "HF", "BF", "HBF"],
        rows: [
          {
            key: "T0",
            label: "Transformer (4H)",
            values: [74.34, 6.22, 22.59, 75.45, 76.52, 23.16, 75.92],
          },
          {
            key: "G-bi",
            label: "BiGRU",
            values: [74.13, 9.82, 22.25, 74.42, 74.04, 22.34, 74.54],
          },
          {
            key: "G-attn",
            label: "GRU + Attn",
            values: [71.24, 8.80, 19.93, 71.30, 71.23, 22.07, 71.54],
          },
          {
            key: "L0",
            label: "LSTM",
            values: [70.80, 7.63, 18.31, 71.53, 70.32, 20.09, 71.25],
          },
          {
            key: "G0",
            label: "GRU Base",
            values: [71.20, 9.28, 22.13, 71.20, 70.72, 20.32, 70.68],
          },
          {
            key: "G-mean",
            label: "GRU Mean",
            values: [67.43, 8.84, 18.90, 67.27, 67.51, 19.60, 67.47],
          },
        ],
        highlight: [0, 4],
      },
      points: [
        "Transformer (`T0__HF`) outperformed baseline GRU (`G0`) across all 3 seeds on every hand-bearing subset: `+5.79 pp` on HF, `+5.24 pp` on HBF, `+4.25 pp` on HB, and `+3.15 pp` on H.",
        "Bidirectional GRU (`G-bi__HBF`: 74.54% ± 0.32%) was the strongest recurrent model, beating `G0` by `+2.94 to +3.85 pp` on every hand subset across all 3 seeds.",
        "Adding face landmarks to hands boosted Transformer by `+2.17 pp` (3/3 seeds), whereas non-hand subsets (`B`, `F`, `BF`) collapsed to 6.22–23.16% Macro-F1.",
      ],
    },
    {
      heading: "Held-Out Test Evaluation & Error Analysis",
      shortTitle: "Test Evaluation",
      points: [
        "Evaluated locked winner `T0__HF` (seeds 42/43/44) on 1,141 held-out test clips (3 unseen signers): Test Macro-F1 `87.30% ± 0.77%`, Top-1 `88.20% ± 1.07%`, Top-3 `98.34% ± 0.52%`, Cross-Entropy `0.3207 ± 0.0333`.",
        "Per-seed Test Macro-F1: Seed 42 `86.25%`, Seed 43 `87.58%`, Seed 44 `88.08%`; per-signer mean accuracy: Signer 27610 `85.17%`, Signer 37779 `91.56%`, Signer 61333 `87.53%`.",
        "Top glosses on test reached 97.68–99.72% F1 (`lips` 99.72%, `uncle` 98.89%, `cow` 98.55%, `sleepy` 97.68%); primary remaining confusion is `awake → wake` (80.12% on test), while `pretend → mouse` dropped to `0/61` across all 3 seeds.",
      ],
    },
    {
      heading: "Feature Engineering, Reproducibility & Live Inference",
      shortTitle: "Pipeline & Demo",
      points: [
        "Engineered 196 landmark channels from 543 MediaPipe Holistic points (Hand 143ch, Upper-Body 17ch, Face 36ch), L2-normalized per region and fused with 70/20/10 weights over fixed `T=32` resampled frames.",
        "Frozen campaign snapshot (`b4fd56f03a57`) verifies SHA-256 hashes of 101 source files, config YAML, splits, and all 126 Git LFS checkpoints; backed by 331 pytest regression tests.",
        "Ships a standalone real-time GPU webcam inference demo (`demos/camera_v3.py`) supporting instant switching across all 126 V3 checkpoints.",
      ],
    },
  ],
};
