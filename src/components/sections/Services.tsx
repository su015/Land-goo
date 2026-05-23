"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { MonitorSmartphone, LayoutTemplate, Zap, Box } from "lucide-react";

const services = [
  {
    title: "Cinematic Web Design",
    description: "Interfaces that tell a story through motion, spacing, and premium typography.",
    icon: LayoutTemplate,
  },
  {
    title: "Advanced Animations",
    description: "Buttery smooth GSAP animations and WebGL effects that wow the user.",
    icon: Zap,
  },
  {
    title: "Responsive Experiences",
    description: "Flawless execution across all devices, from mobile to ultrawide monitors.",
    icon: MonitorSmartphone,
  },
  {
    title: "3D & Immersive",
    description: "Subtle 3D elements and parallax depth that elevate the digital environment.",
    icon: Box,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-16 bg-[#050505]"
    >
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4">
          Our <span className="text-gradient-accent">Expertise</span>
        </h2>
        <p className="text-[#A0A0A0] max-w-2xl mx-auto font-light">
          We specialize in high-end digital solutions that bridge the gap between functionality and art.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-2xl bg-[var(--color-dark-elevated)] p-10 transition-colors hover:bg-black/80 border border-[var(--color-border-soft)]"
            style={{
              // CSS variables for the spotlight effect
              "--mouse-x": "50%",
              "--mouse-y": "50%",
            } as React.CSSProperties}
          >
            {/* Spotlight Hover Effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(77, 163, 255, 0.1), transparent 40%)`,
              }}
            />
            
            <div className="relative z-10">
              <service.icon className="h-12 w-12 text-[var(--color-accent-cyan)] mb-6 opacity-80" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold uppercase tracking-wider text-[#F5F5F5] mb-4 font-[family-name:var(--font-heading)]">
                {service.title}
              </h3>
              <p className="text-[#A0A0A0] font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
