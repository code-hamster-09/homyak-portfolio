import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-20 py-8 bg-bg-main/85 backdrop-blur-sm sticky top-0 left-0 z-50 text-text-primary border-b border-white/10">
      <Link href={"/"} className="text-accent-purple text-glow text-2xl font-bold">{"<Homyak/>"}</Link>
      <Navigation />
    </header>
  );
};

export default Header;
