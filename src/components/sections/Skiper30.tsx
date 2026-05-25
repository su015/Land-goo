"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
  "https://picsum.photos/seed/15/600/800",
  "https://picsum.photos/seed/21/600/800",
  "https://picsum.photos/seed/3/600/800",
  "https://picsum.photos/seed/4/600/800",
  "https://picsum.photos/seed/5/600/800",
  "https://picsum.photos/seed/6/600/800",
  "https://picsum.photos/seed/7/600/800",
  "https://picsum.photos/seed/8/600/800",
  "https://picsum.photos/seed/24/600/800",
  "https://picsum.photos/seed/10/600/800",
  "https://picsum.photos/seed/11/600/800",
  "https://picsum.photos/seed/12/600/800",
  "https://picsum.photos/seed/13/600/800",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    // We only need Lenis to run if it isn't already running globally
    // The main layout might already have Lenis, but initializing here is safe if kept local
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="w-full relative z-10 py-[120px] overflow-hidden">
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
          MANGO POST
        </h2>
        <p 
          className="text-[#A1A1AA] max-w-[700px] mr-auto font-light leading-[1.8] text-[16px] md:text-[18px]"
          style={{ fontFamily: "var(--font-bolds-pixels)" }}
        >
          A <span className="text-[#FF4A3D]">vibrant collection</span> of moments captured in time, blending the <span className="text-[#FF4A3D]">warmth</span> of a sun-soaked afternoon with the crisp, refreshing reality of modern <span className="text-[#FF4A3D]">digital art</span>. Dive deep into a sea of creative perspectives and <span className="text-[#FF4A3D]">dynamic visual stories</span>.
        </p>
      </motion.div>
      <div
        ref={gallery}
        className="relative box-border flex h-[150vh] gap-[2vw] overflow-hidden w-full px-[2vw] rounded-3xl"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[6], images[7], images[8]]} y={y4} />
      </div>
    </section>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-xl bg-[#111111] border border-[var(--color-border-soft)] flex items-center justify-center">
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none object-cover w-full h-full"
            onError={(e) => {
              // Fallback styling if image doesn't exist
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="opacity-20 text-xs">IMG</span>';
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Skiper30;

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
