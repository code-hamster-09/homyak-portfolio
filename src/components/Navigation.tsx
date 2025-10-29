import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex gap-4">
      <nav>
        <Link href={"/"}>Главная</Link>
      </nav>
      <nav>
        <Link href={"/projects"}>Портфолио</Link>
      </nav>
      <nav>
        <Link href={"/about"}>Обо мне</Link>
      </nav>
      <nav>
        <Link href={"/contact"}>Контакты</Link>
      </nav>
    </div>
  );
};

export default Navigation;
