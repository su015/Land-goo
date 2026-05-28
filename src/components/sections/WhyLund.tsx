"use client";

import { motion } from "framer-motion";
import FlowingMenu from "@/components/ui/FlowingMenu";

const demoItems = [
  { 
    link: '#', 
    text: 'Mojave', 
    image: 'https://picsum.photos/400/200?random=1',
    youtubeId: 'wu4NYMmk8pk',
    details: 'A desolate yet beautiful landscape where minimalist design meets raw natural beauty.'
  },
  { 
    link: '#', 
    text: 'Sonoma', 
    image: 'https://picsum.photos/400/200?random=2',
    youtubeId: 'DE0fg1yT6ig',
    details: 'Rolling hills and cinematic lighting that inspire flowing animations.'
  },
  { 
    link: '#', 
    text: 'Monterey', 
    image: 'https://picsum.photos/400/200?random=3',
    youtubeId: 'uDM3Hy8Sfmw',
    details: 'Deep ocean currents translated into fluid user interface transitions.'
  },
  { 
    link: '#', 
    text: 'Sequoia', 
    image: 'https://picsum.photos/400/200?random=4',
    youtubeId: '4D0o8exrcAk',
    details: 'Towering ambition and structural integrity forming the backbone of digital spaces.'
  }
];

export default function WhyLund() {
  return (
    <section className="w-full relative z-10 py-[120px] overflow-hidden border-t border-[var(--color-border-soft)]">
      <motion.div 
        className="text-right mb-16 px-6 md:px-12 lg:px-24 relative z-20 w-full"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 
          className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-normal leading-[0.9] text-[#F5F5F5] mb-6 uppercase"
          style={{ fontFamily: "var(--font-winter-tosca)" }}
        >
          WHY DELTA X
        </h2>
        <p 
          className="text-[#A1A1AA] max-w-[700px] ml-auto font-light leading-[1.8] text-[16px] md:text-[18px]"
          style={{ fontFamily: "var(--font-bolds-pixels)" }}
        >
          We believe in the perfect <span className="text-[#FF4A3D]">synergy</span> of motion, design, and <span className="text-[#FF4A3D]">technology</span>. Every interaction is crafted to leave a <span className="text-[#FF4A3D]">lasting impression</span>, transforming ordinary web navigation into an <span className="text-[#FF4A3D]">immersive journey</span>.
        </p>
      </motion.div>

      <div style={{ height: '600px', position: 'relative' }} className="w-full">
        <FlowingMenu 
          items={demoItems} 
          bgColor="#0A0A0A"
          textColor="#F5F5F5"
          borderColor="#1F1F1F"
          marqueeBgColor="#00C2FF"
          marqueeTextColor="#0A0A0A"
        />
      </div>
    </section>
  );
}
