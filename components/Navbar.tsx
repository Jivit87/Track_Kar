import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-sm border-b border-white/20">
      <nav className="nav flex justify-between items-center px-6 py-3">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.png"
            width={40}
            height={40}
            alt="logo"
          />

          <p className="nav-logo text-[100px] font-semibold text-white drop-shadow-md">
            Track<span className="text-primary">_Kar</span>
          </p>
        </Link>

        
      </nav>
    </header>
  );
};

export default Navbar;
