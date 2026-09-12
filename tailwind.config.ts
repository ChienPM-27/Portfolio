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
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          muted: "hsl(var(--surface-muted) / <alpha-value>)",
          border: "hsl(var(--stroke) / <alpha-value>)",
        },
        text: {
          DEFAULT: "hsl(var(--text) / <alpha-value>)",
          muted: "hsl(var(--muted) / <alpha-value>)",
        },
        stroke: "hsl(var(--stroke) / <alpha-value>)",
        accent: {
          start: "#89AACC",
          end: "#4E85BF",
          cyan: "#06b6d4",
          emerald: "#10b981",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;