"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide/Show navbar on scroll
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (isOpen) return; // Don't hide if menu is open
      
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(navRef.current, { y: "-100%", duration: 0.5, ease: "power3.inOut" });
      } else {
        gsap.to(navRef.current, { y: "0%", duration: 0.5, ease: "power3.out" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        ".mobile-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  const links = ["About", "Products", "Work", "Contact"];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center transition-colors duration-500 glass-panel border-x-0 border-t-0 border-b border-[var(--color-border-soft)]"
      >
        <div 
          className="text-2xl font-bold uppercase tracking-widest text-[#F5F5F5]"
          style={{ fontFamily: "var(--font-super-hockey)" }}
        >
          LAnd.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={link === "Products" ? "/products" : `#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-wider uppercase text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-accent-blue)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-[#F5F5F5] mix-blend-difference"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={link === "Products" ? "/products" : `#${link.toLowerCase()}`}
              className="mobile-link text-4xl font-[family-name:var(--font-heading)] uppercase tracking-widest text-[#F5F5F5]"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
