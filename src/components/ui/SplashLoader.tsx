"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularText from './CircularText';

export default function SplashLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = '';
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="splash-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-[#050505] flex items-center justify-center"
          >
            <span className="font-[family-name:var(--font-heading)] font-bold text-[#F5F5F5] text-sm md:text-base tracking-[0.3em] uppercase animate-pulse opacity-80">
              Loading...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={false}
        animate={{ 
          scale: !isLoaded ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5) : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 0.75) 
        }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed z-[100] w-[260px] h-[260px] flex items-center justify-center ${
          !isLoaded 
            ? "top-0 left-0 right-0 bottom-0 m-auto pointer-events-none" 
            : "top-auto left-auto bottom-6 right-6 m-0 pointer-events-auto origin-center"
        }`}
        style={{ transformOrigin: "center" }}
      >
        <motion.div
          animate={{ rotate: !isLoaded ? 360 : 0 }}
          transition={!isLoaded ? { repeat: Infinity, duration: 12, ease: "linear" } : { duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <CircularText text="LAND*STUDIO*PORTFOLIO*" />
        </motion.div>
      </motion.div>
    </>
  );
}
