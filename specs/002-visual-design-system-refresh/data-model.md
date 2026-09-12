# Data Model & Schema Definitions: Visual Refresh

**Feature**: Visual Design System Refresh (Tokens & Supporting Sections)  
**Branch**: `002-visual-design-system-refresh`  
**Date**: 2026-09-13  

## 1. Entities & State Models

### Token Configuration Schema
Maps directly to CSS variables defined in `app/globals.css` and extended in `tailwind.config.ts`.

| Token Name | CSS Variable | HSL / Hex Value | Purpose |
| :--- | :--- | :--- | :--- |
| `bg` | `--bg` | `240 10% 3.9%` (`#09090b`) | Main backdrop |
| `surface` | `--surface` | `240 6% 6.5%` (`#101012`) | Cards, sections, pills |
| `surface-muted` | `--surface-muted` | `240 5% 10%` (`#18181b`) | Secondary nested containers |
| `text` | `--text` | `0 0% 98%` (`#fafafa`) | High-contrast body & titles |
| `muted` | `--muted` | `240 5% 65%` (`#a1a1aa`) | Subtitles, labels, descriptions |
| `stroke` | `--stroke` | `240 5% 15%` (`#27272a`) | Structural boundaries & borders |
| `accent-gradient` | `--accent-gradient` | `#89AACC` → `#4E85BF` | Signature brand gradient |

### Loader Lifecycle State
- `progress`: Number between `0` and `100`, updated via `requestAnimationFrame`.
- `formattedCount`: Formatted string `000` to `100`.
- `wordIndex`: Pointer into `['INITIALIZING TENSORS', 'CALIBRATING 3D RECON', 'DISPATCHING GPU PIPELINES', 'PREPARING SCENE GRAPH', 'SYSTEM READY']`.
- `isComplete`: Boolean triggered when `progress >= 100`.

### Role Cycling State
Sequential array of verified technical titles:
1. `"AI Engineer"`
2. `"Computer Vision & 3D Reconstruction"`
3. `"Cloud GPU Systems Specialist"`
4. `"Sai Gon University • IT B.Eng"`

### Footer Stats Entities
1. **GPU Benchmark**: `{ label: "GPU Load Efficiency", value: "94.2%", subtext: "NVIDIA L4 Cloud" }`
2. **Inference Latency**: `{ label: "Queue Response", value: "< 45ms", subtext: "FastAPI REST Server" }`
3. **Education**: `{ label: "Academic Standing", value: "2024–2029", subtext: "Sai Gon University B.Eng" }`
4. **Architecture**: `{ label: "Case Studies", value: "3 Modules", subtext: "Extensible Registry" }`

---

## 2. Validation Rules

1. **Non-Breaking Architecture**:
   - `projects/registry.ts` and `projects/<slug>` files must remain completely functional with 0 breaking changes.
2. **Typography Rules**:
   - Instrument Serif must only be applied to accent words or display titles (e.g. `font-serif italic font-normal`).
   - Body copy, technical tags, and metrics must remain in Inter (`font-sans`) or Monospace (`font-mono`).
3. **No Horizontal Overflow**:
   - The marquee and loader must maintain `overflow-hidden` at all viewport widths down to 375px.