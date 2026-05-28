"use client";

import Dock from "@/components/ui/Dock";
import { Home, User, Briefcase, Camera, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { triggerViewTransition } from "@/lib/viewTransition";

export default function DockNavigation() {
  const [isMounted] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  if (!isMounted) return null;

  const handleScrollTo = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  const handleHomeClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleRoute = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  const items = [
    { icon: <Home size={20} />, label: 'Home', onClick: handleHomeClick },
    { icon: <User size={20} />, label: 'About', onClick: () => handleRoute('/about') },
    { icon: <Briefcase size={20} />, label: 'Products', onClick: () => handleRoute('/products') },
    { icon: <Camera size={20} />, label: 'Gallery', onClick: () => handleScrollTo('gallery') },
    { icon: <Mail size={20} />, label: 'Contact', onClick: () => handleRoute('/contact') },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <div className="pointer-events-auto">
        <Dock 
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
}
