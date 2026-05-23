"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  randomLetters?: boolean;
}

export default function TextReveal({ text, className, delay = 0, randomLetters = false }: TextRevealProps) {
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const items = randomLetters ? text.split("") : text.split(" ");

  useEffect(() => {
    if (randomLetters) {
      const indices = Array.from(Array(items.length).keys());
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
    }
  }, [items.length, randomLetters]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * 0.3 },
    },
  };

  const child: Variants = {
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: randomLetters ? (shuffledIndices[custom] || 0) * 0.05 + delay * 0.3 : 0,
      },
    }),
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -40,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap overflow-hidden perspective-1000", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          custom={index}
          variants={child}
          style={{ transformOrigin: "bottom center" }}
          key={index}
          className={cn("inline-block", !randomLetters && "mr-[0.25em]")}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.h1>
  );
}
