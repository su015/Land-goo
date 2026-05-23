"use client";

import { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export default function Button({ children, className, magnetic = true, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-transparent px-8 py-4 font-medium tracking-widest text-[#F5F5F5] transition-all duration-300 hover:text-white group border border-[var(--color-border-soft)] backdrop-blur-md font-[family-name:var(--font-heading)] uppercase text-xs sm:text-sm",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-[var(--color-accent-blue)]/0 via-[var(--color-accent-blue)]/10 to-[var(--color-accent-cyan)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="absolute -inset-[100%] z-0 h-[300%] w-[300%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="absolute inset-[1px] z-0 rounded-full bg-[#050505] transition-colors duration-500 group-hover:bg-[#0a0a0a]"></div>
    </motion.button>
  );
}
