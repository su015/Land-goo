import type { Metadata } from "next";
import { Inter, Syncopate, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import DockNavigation from "@/components/layout/DockNavigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAnd Studio | Cinematic Digital Experiences",
  description: "A premium, minimalist portfolio showcasing high-end interactive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syncopate.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} antialiased bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#00C2FF] selection:text-[#0A0A0A] min-h-screen relative`}
      >
        {/* Global Cinematic Noise Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <SmoothScroll>
          <main className="relative flex min-h-screen flex-col overflow-hidden">
            {children}
          </main>
        </SmoothScroll>
        <DockNavigation />
      </body>
    </html>
  );
}
