"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const textElements = textRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });
      if (textElements[0]) {
        gsap.set(textElements[0].querySelectorAll('h2, p'), { opacity: 1, y: 0, filter: "blur(0px)" });
      }

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
        if (textElements[i]) {
          gsap.set(textElements[i].querySelectorAll('h2, p'), { opacity: 0, y: 50, filter: "blur(10px)" });
        }
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        
        const currentText = textElements[i];
        const nextText = textElements[i + 1];

        const position = i;
        if (!currentImage || !nextImage) continue;

        // Image animation
        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );

        // Text animation synchronized with appearance effect
        if (currentText && nextText) {
          scrollTimeline.to(currentText.querySelectorAll('h2, p'), { 
            opacity: 0, 
            y: -50, 
            filter: "blur(10px)",
            duration: 0.4, 
            stagger: 0.1,
            ease: "power2.inOut" 
          }, position);
          
          scrollTimeline.to(nextText.querySelectorAll('h2, p'), { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            duration: 0.4, 
            stagger: 0.1,
            ease: "power2.out" 
          }, position + 0.5);
        }
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative w-full", className)} ref={container}>
      <div className="sticky-cards relative flex flex-col lg:flex-row h-screen w-full items-center justify-center lg:justify-between overflow-hidden p-3 lg:p-16 gap-10 lg:gap-0">
        
        {/* Left Side: Changing Text */}
        <div className="w-full lg:w-1/2 relative h-[40vh] lg:h-full flex items-center justify-center lg:justify-start px-4 lg:px-10 z-20 pointer-events-none">
          {cards.map((card, i) => (
            <div 
              key={card.id} 
              className="absolute flex flex-col gap-6"
              ref={(el) => {
                textRefs.current[i] = el;
              }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-heading)] text-[#F5F5F5] drop-shadow-2xl">
                {card.title}
              </h2>
              <p className="text-lg lg:text-xl text-[#A0A0A0] font-[family-name:var(--font-body)] leading-relaxed max-w-xl drop-shadow-xl bg-black/30 lg:bg-transparent p-4 lg:p-0 rounded-xl backdrop-blur-sm lg:backdrop-blur-none">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side: Stacking Images */}
        <div
          className={cn(
            "relative right-0 aspect-video w-full lg:w-1/2 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-hidden rounded-2xl z-10 shadow-2xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div 
              key={card.id + "_img"}
              className="absolute h-full w-full origin-bottom"
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              <img
                src={card.image}
                alt={card.alt || ""}
                className={cn(
                  "h-full w-full object-cover rounded-2xl shadow-2xl grayscale-[20%] contrast-125",
                  imageClassName,
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
