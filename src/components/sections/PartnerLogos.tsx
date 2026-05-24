import LogoLoop from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiGsap } from 'react-icons/si';

const techLogos = [
  { node: <SiReact size={48} className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs size={48} className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript size={48} className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss size={48} className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer size={48} className="text-white" />, title: "Framer Motion", href: "https://framer.com/motion" },
  { node: <SiGsap size={48} className="text-[#88CE02]" />, title: "GSAP", href: "https://gsap.com" },
];

export default function PartnerLogos() {
  return (
    <section className="relative w-full py-[60px] overflow-hidden z-10 border-b border-[var(--color-border-soft)]">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-[#A1A1AA] uppercase">Powered By Next-Gen Tech</p>
      </div>
      <div style={{ height: '80px', position: 'relative' }}>
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={80}
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="#0A0A0A"
          ariaLabel="Technology stack logos"
        />
      </div>
    </section>
  );
}
