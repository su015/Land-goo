"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "Return to the main cinematic sequence. Start the journey over.",
    img: "https://picsum.photos/seed/home1/800/600",
  },
  {
    name: "Components",
    href: "/components",
    description: "Explore the building blocks of modern, motion-rich interfaces.",
    img: "https://picsum.photos/seed/comp2/800/600",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "Transparent tiers. Simple scaling for creative visionaries.",
    img: "https://picsum.photos/seed/price3/800/600",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "Read the manuals. Uncover the secrets of the digital grid.",
    img: "https://picsum.photos/seed/docs4/800/600",
  },
  {
    name: "Account",
    href: "/user",
    description: "Manage your personalized settings and workflow configurations.",
    img: "https://picsum.photos/seed/acct5/800/600",
  },
  {
    name: "Login",
    href: "/login",
    description: "Enter your credentials to access the secure vault.",
    img: "https://picsum.photos/seed/login6/800/600",
  },
];

const RandomOrangeText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const [orangeIndices, setOrangeIndices] = useState<number[]>([]);

  React.useEffect(() => {
    // Pick ~25% of words to be orange, with a minimum of 1
    const numOrange = Math.max(1, Math.floor(words.length * 0.25));
    const indices: number[] = [];
    while (indices.length < numOrange && indices.length < words.length) {
      const rand = Math.floor(Math.random() * words.length);
      if (!indices.includes(rand)) {
        indices.push(rand);
      }
    }
    setOrangeIndices(indices);
  }, [text]);

  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className={orangeIndices.includes(i) ? "text-[#FF4A3D] transition-colors duration-300" : "text-white transition-colors duration-300"}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
};

export const Skiper58 = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] flex flex-col md:flex-row items-center">
      
      {/* Left side: Navigation Menu */}
      <div className="w-full md:w-1/2 flex items-center justify-start pl-12 md:pl-24">
        <ul className="flex flex-col items-start justify-center gap-6">
          {navigationItems.map((item, index) => (
            <li
              className="relative flex cursor-pointer flex-col items-start overflow-visible group"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={item.href} className="relative flex items-start text-zinc-600 group-hover:text-white transition-colors duration-300">
                <TextRoll
                  className="text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] whitespace-nowrap"
                >
                  {item.name}
                </TextRoll>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Hover Details & Images */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:pr-24 h-[500px]">
        <div className="w-full max-w-[500px] relative flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col gap-6"
              >
                <div className="w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative bg-[#111]">
                  <img 
                    src={navigationItems[hoveredIndex].img} 
                    alt={navigationItems[hoveredIndex].name} 
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay to blend the image into the dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60"></div>
                </div>
                
                <div 
                  className="text-xl md:text-2xl leading-[1.6]"
                  style={{ fontFamily: "var(--font-bolds-pixels)" }}
                >
                  <RandomOrangeText text={navigationItems[hoveredIndex].description} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
};

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default Skiper58;
