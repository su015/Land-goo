"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Folder from "@/components/ui/Folder";

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
      },
    });

    tl.fromTo(
      ".products-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".product-folder",
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center py-32 px-6 md:px-16 bg-[#050505] overflow-hidden"
    >
      <div className="products-header mb-20 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4">
          Our <span className="text-gradient-accent">Products</span>
        </h2>
        <p className="text-[#A0A0A0] max-w-2xl mx-auto font-light">
          Explore our premium suite of tools and assets, beautifully organized for your convenience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 max-w-7xl mx-auto mt-10">
        <div className="product-folder flex flex-col items-center group">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00D9FF" />
          </div>
          <h3 className="mt-8 text-xl font-bold uppercase tracking-wider text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00D9FF]">
            Design Assets
          </h3>
          <p className="text-[#A0A0A0] text-sm mt-2 text-center max-w-[200px]">
            High quality UI kits and components.
          </p>
        </div>

        <div className="product-folder flex flex-col items-center group">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00D9FF" />
          </div>
          <h3 className="mt-8 text-xl font-bold uppercase tracking-wider text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00D9FF]">
            Source Codes
          </h3>
          <p className="text-[#A0A0A0] text-sm mt-2 text-center max-w-[200px]">
            Production ready boilerplates.
          </p>
        </div>

        <div className="product-folder flex flex-col items-center group">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00D9FF" />
          </div>
          <h3 className="mt-8 text-xl font-bold uppercase tracking-wider text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00D9FF]">
            Templates
          </h3>
          <p className="text-[#A0A0A0] text-sm mt-2 text-center max-w-[200px]">
            Premium website templates.
          </p>
        </div>
      </div>
    </section>
  );
}
