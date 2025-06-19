"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Puzzle } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

const shouldHideButton =
  pathname.startsWith("/products/");

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-sm border-b border-white/20">
      <nav className="flex justify-between items-center px-6 py-3">
        <a href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.png"
            width={40}
            height={40}
            alt="logo"
          />
          <p className="nav-logo text-[100px] font-semibold text-white drop-shadow-md">
            Track<span className="text-primary">_Kar</span>
          </p>
        </a>

        {/* Conditionally render the button */}
        {!shouldHideButton && (
          <a href="#how">
            <button className="flex items-center gap-2 bg-red-400/30 px-5 py-3 font-semibold rounded-[5px] cursor-pointer transition-all ease-out hover:scale-105">
              <Puzzle className="w-5 h-5 text-black" />
              How It Works
            </button>
          </a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;