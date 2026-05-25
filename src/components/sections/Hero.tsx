"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import InteractivePhysicsText from "@/components/ui/InteractivePhysicsText";
import Button from "@/components/ui/Button";
import GridMotion from "@/components/ui/GridMotion";
const gridItems = Array.from({ length: 28 }, () => "");

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLParagraphElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    if (!containerRef.current || !topTextRef.current || !bottomContentRef.current) return;
    
    gsap.fromTo(
      [topTextRef.current, bottomContentRef.current],
      { yPercent: 0, opacity: 1 },
      {
        yPercent: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 md:px-16"
    >
      {/* Background GridMotion */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <GridMotion items={gridItems} gradientColor="#0A0A0A" />
        {/* Very subtle dark overlay so it doesn't wash out the text */}
        <div className="absolute inset-0 bg-[#0A0A0A]/40 z-[1] pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        
        <InteractivePhysicsText
          text="AIRBORN"
          containerRef={containerRef}
          className="text-center font-[family-name:var(--font-super-hockey)] font-bold tracking-[0.1em] uppercase leading-[0.9] text-[clamp(4rem,10vw,10rem)] mb-6 drop-shadow-[0_0_15px_rgba(245,245,245,0.1)]"
        />

        <div ref={bottomContentRef} className="flex flex-col items-center">
          <p 
            className="mb-12 max-w-[700px] text-[16px] md:text-[18px] text-[#A1A1AA] leading-[1.8] font-light"
            style={{ fontFamily: "var(--font-bolds-pixels)" }}
          >
            Crafting <span className="text-[#FF4A3D]">premium</span>, cinematic web interfaces that <span className="text-[#FF4A3D]">transcend</span> the ordinary. A blend of <span className="text-[#FF4A3D]">minimalism</span> and cutting-edge <span className="text-[#FF4A3D]">motion design</span>.
          </p>

          <Button className="mt-4">
            Explore Projects
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 pointer-events-none">
        <span className="font-sans text-xs uppercase tracking-widest text-[#F5F5F5]">Scroll</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-[#F5F5F5] to-transparent" />
      </div>
    </section>
  );
}
