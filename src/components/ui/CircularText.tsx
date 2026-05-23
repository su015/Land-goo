"use client";

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number; 
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  className = ''
}) => {
  const letters = Array.from(text);
  
  const { scrollY } = useScroll();
  
  // Smooth out the scroll value for a natural feeling rotation
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 150,
    mass: 0.5
  });

  // Transform the smooth scroll value into rotation degrees
  // Decreased multiplier to make it rotate much slower
  const rotation = useTransform(smoothY, (value) => value * 0.15);

  return (
    <motion.div
      className={`m-0 mx-auto rounded-full w-[260px] h-[260px] relative font-black font-[family-name:var(--font-heading)] text-white text-center origin-center tracking-widest uppercase ${className}`}
      style={{ rotate: rotation }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-[32px] [-webkit-text-stroke:2.5px_white] transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] pointer-events-none"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
