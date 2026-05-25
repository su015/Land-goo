"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import Radio from "@/components/ui/Radio";
import Loader from "@/components/ui/Loader";
import { cn } from "@/lib/utils";
import { Maximize, Minimize } from "lucide-react";

export default function FunTime() {
  const [currentGameKey, setCurrentGameKey] = useState("value-1");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial 4s load
    loadingTimeoutRef.current = setTimeout(() => setIsLoading(false), 4000);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  const games: Record<string, string> = {
    "value-1": "/game.html",
    "value-2": "/ludo_royal.html",
    "value-3": "https://tbot.xyz/math/"
  };

  const handleGameChange = (val: string) => {
    if (val !== currentGameKey) {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentGameKey(val);
      
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = setTimeout(() => setIsLoading(false), 4000);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section className="w-full relative z-10 py-[120px] overflow-hidden bg-[#0A0A0A] border-t border-[var(--color-border-soft)]">
      <motion.div 
        className="text-left mb-16 px-6 md:px-12 lg:px-24 relative z-20 w-full"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 
          className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-normal leading-[0.9] text-[#F5F5F5] mb-6 uppercase"
          style={{ fontFamily: "var(--font-winter-tosca)" }}
        >
          FUN TIME
        </h2>
        <p 
          className="text-[#A1A1AA] max-w-[700px] mr-auto font-light leading-[1.8] text-[16px] md:text-[18px]"
          style={{ fontFamily: "var(--font-bolds-pixels)" }}
        >
          Let loose and <span className="text-[#FF4A3D]">enjoy the ride</span>. This dedicated space is designed for experimentation, playful interactions, and discovering the <span className="text-[#FF4A3D]">unexpected</span>. Scroll around and see what happens next.
        </p>
      </motion.div>

      {/* Interactive element */}
      <div className="w-full px-6 md:px-12 lg:px-24 flex flex-col xl:flex-row items-center justify-between gap-12 mt-12">
        
        {/* Left: Game Card */}
        <div className="w-full xl:w-2/3 h-[650px] rounded-[30px] border border-[var(--color-border-soft)] bg-black overflow-hidden relative group shadow-2xl">
          {/* Game Container */}
          <div ref={gameContainerRef} className="relative z-10 w-full h-full flex items-center justify-center bg-[#050505]">
            
            {/* Click to Play Overlay */}
            {!isPlaying && !isLoading && (
              <div 
                className="absolute inset-0 z-30 flex items-center justify-center bg-transparent cursor-pointer group/play"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/play:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 bg-[#ff3e3e] text-white px-8 py-3 rounded-full font-bold tracking-wider text-sm uppercase shadow-2xl opacity-0 group-hover/play:opacity-100 transform translate-y-4 group-hover/play:translate-y-0 transition-all duration-300">
                  Click to Play
                </div>
              </div>
            )}

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505] backdrop-blur-sm"
                >
                  <Loader />
                  <p className="text-[#888] font-mono text-xs tracking-widest uppercase animate-pulse mt-4">Loading Environment...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embedded Game */}
            <iframe 
              key={currentGameKey} // Force iframe reload properly just in case
              src={games[currentGameKey]}
              title="Browser Game" 
              className={cn(
                "w-full h-full border-none transition-opacity duration-500 relative z-10",
                isPlaying ? "opacity-100" : "opacity-40"
              )}
              style={{
                filter: currentGameKey === "value-3" ? "invert(0.92) hue-rotate(180deg) saturate(1.5)" : "none"
              }}
              scrolling="no"
            />

            {/* Fullscreen Toggle */}
            {isPlaying && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-40 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl border border-white/10"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Right: Radio Selector */}
        <div className="w-full xl:w-1/3 flex justify-center xl:justify-end">
          <Radio onChange={handleGameChange} />
        </div>

      </div>
    </section>
  );
}
