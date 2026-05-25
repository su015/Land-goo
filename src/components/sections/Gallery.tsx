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
    <section id="gallery" ref={sectionRef} className="relative w-full py-[120px] overflow-hidden">
      <div ref={textRef} className="text-center mb-16 px-6 max-w-[1400px] mx-auto w-full">
        <h2 
          className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-normal leading-[0.9] text-[#F5F5F5] mb-6 uppercase"
          style={{ fontFamily: "var(--font-winter-tosca)" }}
        >
          INTERACTIVE GALLERY
        </h2>
        <p 
          className="text-[#A1A1AA] max-w-[700px] mx-auto font-light leading-[1.8] text-[16px] md:text-[18px]"
          style={{ fontFamily: "var(--font-bolds-pixels)" }}
        >
          Drag around to <span className="text-[#FF4A3D]">explore</span> our 3D <span className="text-[#FF4A3D]">visual archive</span>.
        </p>
      </div>

      <div ref={canvasRef} className="relative w-full h-[600px] md:h-[800px] overflow-hidden max-w-[1400px] mx-auto rounded-3xl border border-[#1F1F1F] bg-[#111111]/50 backdrop-blur-sm">
        {/* Subtle gradient overlays to blend the 3D canvas with the background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A]/80 to-transparent z-10 pointer-events-none hidden md:block" />
        
        {/* @ts-expect-error - InfiniteMenu is JSX and infers never[] for items */}
        <InfiniteMenu items={galleryItems} scale={1.0} />
      </div>
    </section>
  );
}
