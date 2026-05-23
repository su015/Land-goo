"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const timelineEvents = [
  { year: "2023", title: "The Inception", desc: "Started as a boutique design studio focusing on WebGL experiences." },
  { year: "2024", title: "Global Expansion", desc: "Partnered with global luxury brands to redefine their digital presence." },
  { year: "2025", title: "Award Winning", desc: "Recognized as the Awwwards Studio of the Year for motion design." },
  { year: "2026", title: "The Future", desc: "Pioneering the next era of cinematic web interfaces and spatial computing." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Line drawing animation
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Items fade in
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 px-6 md:px-16 bg-[#0a0a0a]">
      <div className="text-center mb-24">
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4 text-[#F5F5F5]">
          Our <span className="text-[var(--color-accent-blue)]">Journey</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* The central line background */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[var(--color-border-soft)] hidden md:block" />
        
        {/* The animated central line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--color-accent-cyan)] to-[var(--color-accent-blue)] origin-top hidden md:block glow-line"
          style={{ boxShadow: "0 0 20px 2px rgba(0,217,255,0.5)" }}
        />

        <div className="flex flex-col gap-16 md:gap-32">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className={`relative flex flex-col md:flex-row items-center justify-between ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-[45%] text-left" />
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex h-6 w-6 items-center justify-center rounded-full bg-[#050505] border-2 border-[var(--color-accent-cyan)] shadow-[0_0_15px_rgba(0,217,255,0.8)]">
                <div className="h-2 w-2 rounded-full bg-[#F5F5F5]" />
              </div>

              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-[var(--color-accent-blue)] font-mono text-xl md:text-2xl font-bold mb-2 block">{event.year}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-wider text-[#F5F5F5] mb-4 font-[family-name:var(--font-heading)]">
                    {event.title}
                  </h3>
                  <p className="text-[#A0A0A0] font-light leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
