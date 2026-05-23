"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import InfiniteMenu from "@/components/ui/InfiniteMenu";

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    link: '#',
    title: 'Retro Wave',
    description: 'Nostalgic digital aesthetic blending the past and the future.'
  },
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    link: '#',
    title: 'Neon Drift',
    description: 'High contrast environments designed for pure visual impact.'
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    link: '#',
    title: 'Cyber Circuit',
    description: 'Intricate digital pathways defining modern architecture.'
  },
  {
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop',
    link: '#',
    title: 'Data Flow',
    description: 'Visualizing the invisible motion of information.'
  }
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !canvasRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      canvasRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full py-32 bg-[#050505]">
      <div ref={textRef} className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4 text-[#F5F5F5]">
          Interactive <span className="text-[var(--color-accent-blue)]">Gallery</span>
        </h2>
        <p className="text-[#A0A0A0] max-w-2xl mx-auto font-light">
          Drag around to explore our 3D visual archive.
        </p>
      </div>

      <div ref={canvasRef} className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
        {/* Subtle gradient overlays to blend the 3D canvas with the background */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        
        {/* @ts-expect-error - InfiniteMenu is JSX and infers never[] for items */}
        <InfiniteMenu items={galleryItems} scale={1.0} />
      </div>
    </section>
  );
}
