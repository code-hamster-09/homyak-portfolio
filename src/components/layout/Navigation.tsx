import Link from "next/link";

type NavigationProps = {
  onLinkClick?: () => void;
};

const Navigation = ({ onLinkClick }: NavigationProps) => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-0 text-lg font-medium">
      <div>
        <Link
          onClick={onLinkClick}
          className="hover:text-accent-purple transition-all duration-200"
          href={"/"}
        >
          Главная
        </Link>
      </div>
      <div>
        <Link
          onClick={onLinkClick}
          className="hover:text-accent-purple transition-all duration-200"
          href={"/projects"}
        >
          Проекты
        </Link>
      </div>
      <div>
        <Link
          onClick={onLinkClick}
          className="hover:text-accent-purple transition-all duration-200"
          href={"/about"}
        >
          Обо мне
        </Link>
      </div>
      <div>
        <Link
          onClick={onLinkClick}
          className="hover:text-accent-purple transition-all duration-200"
          href={"/contact"}
        >
          Контакты
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
