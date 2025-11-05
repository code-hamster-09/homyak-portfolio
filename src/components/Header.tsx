"use client";

import { LucideMenu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Закрыть мобильное меню при ресайзе на desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Закрыть по ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Закрыть при смене пути
  const pathname = usePathname();
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-6 bg-bg-main/85 backdrop-blur-sm sticky top-0 left-0 z-50 text-text-primary border-b border-white/10">
      <div className="flex items-center justify-between md:w-auto w-full gap-4">
        <Link
          href={"/"}
          className="text-accent-purple text-glow text-2xl font-bold"
        >
          {"<HomyakVerse/>"}
        </Link>
        {/* mobile toggle */}
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="md:hidden p-2 rounded-md hover:bg-white/5"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <LucideMenu />
        </button>
      </div>

      {/* Navigation: visible on desktop, on mobile only when isOpen */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <Navigation onLinkClick={() => setIsOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
