import type { Metadata, Viewport } from "next";
import { Inter, Teko } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pham Minh Chien | AI Engineer & Systems Portfolio",
  description:
    "Portfolio of Pham Minh Chien — IT Student at Sai Gon University building PyTorch ML pipelines, Local-First Android AI systems, and production Next.js/NestJS applications.",
  keywords: [
    "Pham Minh Chien",
    "AI Engineer Intern",
    "Machine Learning",
    "Sign Language Recognition",
    "PyTorch",
    "Kotlin Android AI",
    "Next.js",
    "NestJS",
  ],
  authors: [{ name: "Pham Minh Chien" }],
  openGraph: {
    title: "Pham Minh Chien | AI Engineer & Systems Portfolio",
    description:
      "Featured projects: Sign Language Recognition (42-Config Ablation), Remora Screenshot Memory (Top 7 Hackathon), and BrewLite PWA.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0e1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${teko.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://prod.spline.design"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://unpkg.com" />
      </head>
      <body className="bg-obsidian text-white min-h-screen selection:bg-cyber-red/20 selection:text-cyber-red font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
