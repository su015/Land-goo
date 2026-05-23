"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const projects = [
  {
    title: "Project Zero",
    category: "Web Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
  },
  {
    title: "Neon Pulse",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2564&auto=format&fit=crop",
  },
  {
    title: "Aura",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    title: "Synth",
    category: "Mobile Application",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2564&auto=format&fit=crop",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray(".portfolio-item");
    
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      id: "portfolioScroll",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollWrapperRef.current?.offsetWidth,
      },
    });

    // Image Parallax within horizontal scroll
    sections.forEach((section: unknown) => {
      const element = section as HTMLElement;
      const img = element.querySelector("img");
      if (!img) return;

      gsap.fromTo(img, 
        { x: -50 },
        {
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            containerAnimation: gsap.getById("portfolioScroll"), // Need to give the main tween an id
            start: "left right",
            end: "right left",
            scrub: true,
          }
        }
      );
    });

  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
    >
      <div className="absolute top-20 left-6 md:left-16 z-10 mix-blend-difference text-[#F5F5F5]">
        <h2 className="text-3xl font-bold uppercase tracking-widest sm:text-4xl font-[family-name:var(--font-heading)]">
          Selected Work
        </h2>
      </div>

      <div
        ref={scrollWrapperRef}
        className="flex h-full w-[400vw] sm:w-[300vw] lg:w-[250vw]"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="portfolio-item relative flex h-full w-full items-center justify-center p-10 md:p-20"
          >
            <div className="relative h-[60vh] w-full max-w-5xl overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover scale-[1.3] grayscale-[40%] transition-transform duration-700 hover:grayscale-0 hover:scale-[1.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-10 left-10 text-[#F5F5F5]">
                <p className="text-[var(--color-accent-blue)] font-mono text-sm tracking-widest uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-wider font-[family-name:var(--font-heading)]">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
