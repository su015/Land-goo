"use client";

import { StickyCard002 } from "@/components/ui/StickyCard002";

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
      className="relative flex min-h-screen w-full items-center bg-[#050505]"
    >
      <StickyCard002 cards={aboutCards} />
    </section>
  );
}
