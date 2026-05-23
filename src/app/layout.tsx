import type { Metadata } from "next";
import { Inter, Syncopate, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
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
        className={`${inter.variable} ${syncopate.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} antialiased bg-[#050505] text-[#F5F5F5] selection:bg-[#4DA3FF] selection:text-[#050505] min-h-screen`}
      >
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
