import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? 1 : -1;
        
        gsap.set(row, { xPercent: direction === 1 ? -50 : 0 });
        
        gsap.to(row, {
          xPercent: direction === 1 ? 0 : -50,
          duration: 30, // Smooth continuous speed
          ease: 'none',
          repeat: -1,
        });
      }
    });
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {Array.from({ length: 4 }, (_, rowIndex) => {
            const rowItems = combinedItems.slice(rowIndex * 7, rowIndex * 7 + 7);
            // Duplicate the items for the seamless infinite loop
            const loopItems = [...rowItems, ...rowItems];

            return (
              <div
                key={rowIndex}
                className="grid gap-4 grid-cols-[repeat(14,1fr)] h-full"
                style={{ width: '200%', willChange: 'transform' }}
                ref={el => {
                  if (el) rowRefs.current[rowIndex] = el;
                }}
              >
                {loopItems.map((content, itemIndex) => (
                  <div key={itemIndex} className="relative w-full h-full">
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] border border-[var(--color-border-soft)] flex items-center justify-center text-white text-[1.5rem]">
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{ backgroundImage: `url(${content})` }}
                        ></div>
                      ) : (
                        <div className="p-4 text-center z-[1] opacity-20">{content}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;
