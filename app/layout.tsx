import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Teko } from "next/font/google";
import { LoadingScreen } from "@/components/shell/LoadingScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pham Minh Chien | AI Engineer",
  description:
    "Personal portfolio of Pham Minh Chien — AI Engineer specializing in Computer Vision, Single-Image 3D Reconstruction, and Cloud GPU inference pipelines.",
  keywords: [
    "Pham Minh Chien",
    "AI Engineer",
    "Computer Vision",
    "3D Reconstruction",
    "PyTorch",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: "Pham Minh Chien" }],
  openGraph: {
    title: "Pham Minh Chien | AI Engineer",
    description:
      "Interactive portfolio showcasing AI engineering systems, 3D reconstruction, and cloud deployment.",
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
      className={`dark ${inter.variable} ${instrumentSerif.variable} ${teko.variable}`}
    >
      <body className="bg-obsidian text-white min-h-screen selection:bg-cyber-red/20 selection:text-cyber-red font-sans antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}