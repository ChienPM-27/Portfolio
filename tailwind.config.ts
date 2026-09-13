import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./projects/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gleec-inspired obsidian navy palette
        obsidian: "#0b0e1a",
        "obsidian-light": "#121726",
        "obsidian-surface": "#1a1f35",
        "cyber-red": "#e61e1e",
        "cyber-red-glow": "rgba(230, 30, 30, 0.4)",
        "hud-white": "#d6d6d6",
        "hud-muted": "#989898",
        "hud-dim": "#3b4044",
        "timeline-line": "rgba(214, 214, 214, 0.15)",
        // Legacy aliases for backward compat
        bg: "#0b0e1a",
        surface: {
          DEFAULT: "#1a1f35",
          muted: "#121726",
          border: "rgba(214, 214, 214, 0.12)",
        },
        text: {
          DEFAULT: "#d6d6d6",
          muted: "#989898",
        },
        stroke: "rgba(214, 214, 214, 0.12)",
        accent: {
          start: "#e61e1e",
          end: "#ff4444",
          cyan: "#06b6d4",
          emerald: "#10b981",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Teko", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(230, 30, 30, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(230, 30, 30, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;