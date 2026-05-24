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
      className="relative w-full flex flex-col justify-center py-[120px] px-6 md:px-16 overflow-hidden"
    >
      <div className="products-header mb-20 text-center max-w-[1400px] mx-auto w-full">
        <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.9] text-[#F5F5F5] font-[family-name:var(--font-heading)] mb-6">
          Our <span className="text-[#00C2FF]">Products</span>
        </h2>
        <p className="text-[#A1A1AA] max-w-[700px] mx-auto font-light leading-[1.8] text-[16px] md:text-[18px]">
          Explore our premium suite of tools and assets, beautifully organized for your convenience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 max-w-[1400px] mx-auto w-full mt-10">
        <div className="product-folder flex flex-col items-center group cursor-pointer">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00C2FF" />
          </div>
          <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00C2FF]">
            Design Assets
          </h3>
          <p className="text-[#A1A1AA] text-[16px] mt-2 text-center max-w-[250px] leading-[1.8]">
            High quality UI kits and components.
          </p>
        </div>

        <div className="product-folder flex flex-col items-center group cursor-pointer">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00C2FF" />
          </div>
          <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00C2FF]">
            Source Codes
          </h3>
          <p className="text-[#A1A1AA] text-[16px] mt-2 text-center max-w-[250px] leading-[1.8]">
            Production ready boilerplates.
          </p>
        </div>

        <div className="product-folder flex flex-col items-center group cursor-pointer">
          <div style={{ height: '250px', width: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={2.5} color="#00C2FF" />
          </div>
          <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-[#F5F5F5] font-[family-name:var(--font-heading)] transition-colors group-hover:text-[#00C2FF]">
            Templates
          </h3>
          <p className="text-[#A1A1AA] text-[16px] mt-2 text-center max-w-[250px] leading-[1.8]">
            Premium website templates.
          </p>
        </div>
      </div>
    </section>
  );
}
