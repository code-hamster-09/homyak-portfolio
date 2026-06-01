import Link from "next/link";

type NavigationProps = {
  onLinkClick?: () => void;
};

const navigationLinks = [
  { name: "Главная", href: "/" },
  { name: "Проекты", href: "/projects" },
  { name: "Обо мне", href: "/about" },
  { name: "Контакты", href: "/contact" },
];

const Navigation = ({ onLinkClick }: NavigationProps) => {
  return (
    <nav className="flex flex-col md:flex-row gap-1 md:gap-4 mt-6 md:mt-0 text-lg font-medium">
      {navigationLinks.map((link, index) => (
        <div
          key={index}
          className="bg-white/5 md:bg-transparent px-3 py-2 rounded-xl"
        >
          <Link
            onClick={onLinkClick}
            className="hover:text-accent-purple transition-all duration-200"
            href={link.href}
          >
            {link.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
