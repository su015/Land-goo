"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "The most cinematic web experience we've ever seen. It feels like navigating a movie.", author: "Sarah Jenkins", role: "Creative Director" },
  { quote: "Absolutely stunning. The attention to detail in the motion design is unparalleled.", author: "Michael Chen", role: "Founder, TechNova" },
  { quote: "Our conversion rates doubled after they redesigned our platform with their premium aesthetic.", author: "Elena Rostova", role: "CMO, Elevate" },
  { quote: "They don't just build websites; they craft immersive digital environments.", author: "David Wallace", role: "CEO, Wallace & Co" },
  { quote: "The most cinematic web experience we've ever seen. It feels like navigating a movie.", author: "Sarah Jenkins", role: "Creative Director" },
  { quote: "Absolutely stunning. The attention to detail in the motion design is unparalleled.", author: "Michael Chen", role: "Founder, TechNova" },
];

export default function Testimonials() {
  return (
    <section className="py-32 overflow-hidden bg-[#050505]">
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl font-bold uppercase tracking-widest sm:text-5xl font-[family-name:var(--font-heading)] mb-4 text-[#F5F5F5]">
          Client <span className="text-[var(--color-accent-blue)]">Voices</span>
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
          className="flex gap-8 px-4 w-max"
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="glass-panel w-[350px] md:w-[450px] p-8 rounded-2xl flex-shrink-0 flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
            >
              <p className="text-lg md:text-xl text-[#A0A0A0] font-light italic leading-relaxed mb-8">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <h4 className="text-[#F5F5F5] font-bold uppercase tracking-wider text-sm">{testimonial.author}</h4>
                <p className="text-[var(--color-accent-cyan)] text-xs font-mono uppercase tracking-widest mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
