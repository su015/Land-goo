"use client";

import { StickyCard002 } from "@/components/ui/StickyCard002";
import MagicRings from "@/components/ui/MagicRings";

export default function About() {
  const aboutCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Elevating Digital Spaces",
      description: "We're not just another digital agency. We're architects of the digital realm, crafting immersive experiences that blend art, technology, and storytelling."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      title: "Cinematic Aesthetic",
      description: "Every pixel is intentionally placed. Every animation is carefully timed. The result is a seamless journey that captivates from the first scroll."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      title: "Modern Engineering",
      description: "Built on bleeding-edge web technologies to ensure your brand stands out with incredible performance and fluidity."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop",
      title: "Immersive Motion",
      description: "We design with motion at the core, not as an afterthought. It is the invisible thread that ties the entire experience together."
    }
  ];

  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen w-full items-center bg-[#050505]"
    >
      {/* Fixed Background Magic Rings */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden">
        <div className="w-full h-full">
          <MagicRings
            color="#00D9FF"
            colorTwo="#0055FF"
            ringCount={10}
            speed={0.4}
            opacity={1}
            baseRadius={0.1}
            radiusStep={0.15}
            followMouse={true}
            mouseInfluence={0.2}
          />
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-center relative z-10">
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] text-[#F5F5F5] mb-6 text-center">
          About <span className="text-[var(--color-accent-blue)]">My LAnd</span>
        </h1>
        <p className="text-[#A0A0A0] max-w-2xl text-center font-light leading-relaxed px-6 text-lg md:text-xl">
          Step into a world where the boundaries between imagination and reality dissolve. This is the culmination of endless creative exploration, built to inspire and redefine visual storytelling.
        </p>
      </div>

      <div className="w-full relative z-10">
        <StickyCard002 cards={aboutCards} />
      </div>
    </section>
  );
}
