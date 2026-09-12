import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen selection:bg-cyan-500/20 selection:text-cyan-400">
        {children}
      </body>
    </html>
  );
}