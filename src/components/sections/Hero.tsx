"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import Button from "@/components/ui/Button";
import { useScroll } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    if (!containerRef.current || !bgRef.current || !contentRef.current) return;
    
    // Parallax effect on scroll
    gsap.fromTo(
      bgRef.current,
      { yPercent: 0 },
      {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
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
      className="relative flex h-screen min-h-[800px] w-full items-center justify-center overflow-hidden px-6 md:px-16"
    >
      {/* Background Cinematic Lighting */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible"
      >
        <div className="absolute top-1/4 left-1/4 h-[40vh] w-[40vw] rounded-full bg-[var(--color-accent-blue)] opacity-20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 h-[50vh] w-[30vw] rounded-full bg-[var(--color-accent-cyan)] opacity-10 blur-[150px] mix-blend-screen" />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-6 font-mono text-sm tracking-[0.3em] text-[var(--color-accent-cyan)] uppercase opacity-80">
          Welcome to the future
        </p>
        
        <TextReveal
          text="AIRBORN"
          randomLetters={true}
          className="text-center text-6xl font-[family-name:var(--font-archivo)] uppercase leading-tight sm:text-8xl md:text-9xl lg:text-[150px] mb-6 text-white"
        />

        <p className="mb-12 max-w-2xl text-lg text-[#A0A0A0] sm:text-xl font-light">
          Crafting premium, cinematic web interfaces that transcend the ordinary. A blend of minimalism and cutting-edge motion design.
        </p>

        <Button className="mt-4">
          Explore Projects
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5F5]">Scroll</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-[#F5F5F5] to-transparent" />
      </div>
    </section>
  );
}
