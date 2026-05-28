import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] border-t border-[var(--color-border-soft)] pt-24 pb-40 px-6 md:px-16 overflow-hidden">
      {/* Subtle Glow Effect on top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
        {/* Brand Section */}
        <div className="flex flex-col gap-6 lg:w-5/12">
          <h2 
            className="text-6xl font-bold text-[#F5F5F5] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-super-hockey)" }}
          >
            Delta X<span className="text-[var(--color-accent-cyan)]">.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg font-light leading-relaxed max-w-md">
            Crafting premium, cinematic digital experiences. We merge cutting-edge technology with high-end art direction to build immersive environments.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[var(--color-accent-blue)]" />
            <span className="uppercase tracking-widest text-sm font-bold text-[#F5F5F5]">Los Angeles, CA</span>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-16 sm:gap-32 lg:justify-end mt-4 lg:mt-0">
          <div className="flex flex-col gap-6">
            <h3 className="text-[#F5F5F5] font-bold uppercase tracking-widest text-base mb-2 font-mono">Navigation</h3>
            <Link href="/" className="text-[#A0A0A0] hover:text-[var(--color-accent-blue)] transition-colors text-base font-light w-fit">Home</Link>
            <Link href="/about" className="text-[#A0A0A0] hover:text-[var(--color-accent-blue)] transition-colors text-base font-light w-fit">About</Link>
            <Link href="/products" className="text-[#A0A0A0] hover:text-[var(--color-accent-blue)] transition-colors text-base font-light w-fit">Products</Link>
            <Link href="/#gallery" className="text-[#A0A0A0] hover:text-[var(--color-accent-blue)] transition-colors text-base font-light w-fit">Gallery</Link>
            <Link href="/contact" className="text-[#A0A0A0] hover:text-[var(--color-accent-blue)] transition-colors text-base font-light w-fit">Contact</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[#F5F5F5] font-bold uppercase tracking-widest text-base mb-2 font-mono">Socials</h3>
            <a href="#" className="group flex items-center gap-3 text-[#A0A0A0] hover:text-[var(--color-accent-cyan)] transition-colors text-base font-light w-fit">
              Instagram <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a href="#" className="group flex items-center gap-3 text-[#A0A0A0] hover:text-[var(--color-accent-cyan)] transition-colors text-base font-light w-fit">
              Twitter <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a href="#" className="group flex items-center gap-3 text-[#A0A0A0] hover:text-[var(--color-accent-cyan)] transition-colors text-base font-light w-fit">
              LinkedIn <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a href="#" className="group flex items-center gap-3 text-[#A0A0A0] hover:text-[var(--color-accent-cyan)] transition-colors text-base font-light w-fit">
              Dribbble <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-[var(--color-border-soft)] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[#6E6E6E] text-sm font-light tracking-wide">
          © {new Date().getFullYear()} Delta X Studio. All rights reserved.
        </p>
        <div className="flex gap-10 text-[#6E6E6E] text-sm font-light tracking-wide">
          <Link href="#" className="hover:text-[#A0A0A0] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#A0A0A0] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
