"use client";

import { motion } from "framer-motion";
import FlowingMenu from "@/components/ui/FlowingMenu";

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
];

export default function WhyLund() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] relative z-10 py-24 overflow-hidden border-t border-[var(--color-border-soft)]">
      <motion.div 
        className="text-center mb-16 px-6 relative z-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4 text-[#F5F5F5]">
          Why <span className="text-[var(--color-accent-blue)]">LAnd</span>
        </h2>
        <p className="text-[#A0A0A0] max-w-2xl mx-auto font-light leading-relaxed">
          We believe in the perfect synergy of motion, design, and technology. Every interaction is crafted to leave a lasting impression, transforming ordinary web navigation into an immersive journey.
        </p>
      </motion.div>

      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu 
          items={demoItems} 
          bgColor="#050505"
          textColor="#F5F5F5"
          borderColor="rgba(255,255,255,0.1)"
          marqueeBgColor="#00D9FF"
          marqueeTextColor="#050505"
        />
      </div>
    </section>
  );
}
