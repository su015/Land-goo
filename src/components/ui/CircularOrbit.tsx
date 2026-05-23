"use client";

import React from "react";

interface CircularOrbitProps {
  items: React.ReactNode[];
  radius?: number;
  duration?: number;
  itemSize?: number;
}

export default function CircularOrbit({
  items,
  radius = 160,
  duration = 20,
  itemSize = 60,
}: CircularOrbitProps) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full border border-[var(--color-border-soft)] border-dashed"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `spin ${duration}s linear infinite` }}
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          return (
            <div
              key={index}
              className="absolute flex items-center justify-center"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                width: itemSize,
                height: itemSize,
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ animation: `spin ${duration}s linear infinite reverse` }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Center decoration */}
      <div className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF]/10 to-transparent border border-[#00D9FF]/20 backdrop-blur-sm">
        <span className="font-mono text-[10px] tracking-widest text-[#00D9FF] uppercase">Tech Stack</span>
      </div>
    </div>
  );
}
