import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="md:flex flex-col md:flex-row gap-8 text-lg font-medium hidden">
      <div>
        <Link className="hover:text-accent-purple transition-all duration-200" href={"/"}>Главная</Link>
      </div>
      <div>
        <Link className="hover:text-accent-purple transition-all duration-200" href={"/projects"}>Проекты</Link>
      </div>
      <div>
        <Link className="hover:text-accent-purple transition-all duration-200" href={"/about"}>Обо мне</Link>
      </div>
      <div>
        <Link className="hover:text-accent-purple transition-all duration-200" href={"/contact"}>Контакты</Link>
      </div>
    </nav>
  );
};

export default Navigation;
