"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { useScroll } from "framer-motion";
import dynamic from "next/dynamic";

const Ballpit = dynamic(() => import("@/components/ui/Ballpit"), {
  ssr: false,
});

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-32 px-6 md:px-16 bg-[#050505] overflow-hidden">
      {/* Background Interactive Ballpit */}
      <div className="absolute inset-0 z-0 opacity-60 overflow-hidden pointer-events-auto">
        <Ballpit 
          count={150}
          gravity={0}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x00b4d8, 0x48cae4, 0x90e0ef]}
        />
      </div>
      
      {/* Transparent UI Glassmorphism Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-16 p-8 md:p-14 bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-6 text-[#F5F5F5]">
            Let&apos;s <span className="text-[var(--color-accent-cyan)] font-light italic">Talk</span>
          </h2>
          <p className="text-[#A0A0A0] font-[family-name:var(--font-body)] mb-10 leading-relaxed max-w-md">
            Ready to elevate your digital presence? Reach out to us. We&apos;re currently accepting new projects for Q4.
          </p>
          <div className="flex flex-col gap-4 text-[#F5F5F5] font-mono text-sm tracking-widest uppercase">
            <a href="mailto:hello@land.studio" className="hover:text-[var(--color-accent-blue)] transition-colors">hello@land.studio</a>
            <p>+1 (555) 019-2026</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <input 
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-white/20 py-4 text-[#F5F5F5] focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors peer"
                placeholder=" "
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-4 text-[#A0A0A0] font-light transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent-blue)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs uppercase tracking-widest"
              >
                Your Name
              </label>
              {focusedInput === 'name' && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] shadow-[0_0_10px_rgba(77,163,255,0.5)] animate-pulse" />
              )}
            </div>

            <div className="relative group">
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-white/20 py-4 text-[#F5F5F5] focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors peer"
                placeholder=" "
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-4 text-[#A0A0A0] font-light transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent-blue)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs uppercase tracking-widest"
              >
                Your Email
              </label>
              {focusedInput === 'email' && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] shadow-[0_0_10px_rgba(77,163,255,0.5)] animate-pulse" />
              )}
            </div>

            <div className="relative group">
              <textarea 
                id="message"
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-[#F5F5F5] focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors peer resize-none"
                placeholder=" "
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="message" 
                className="absolute left-0 top-4 text-[#A0A0A0] font-light transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent-blue)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs uppercase tracking-widest"
              >
                Project Details
              </label>
              {focusedInput === 'message' && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] shadow-[0_0_10px_rgba(77,163,255,0.5)] animate-pulse" />
              )}
            </div>

            <Button type="submit" className="self-start mt-4">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
