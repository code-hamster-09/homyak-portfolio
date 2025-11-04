import Link from "next/link";

const Footer = () => {
  const links = {
    navigation: [
      { name: "Home", href: "/" },
      { name: "Portfolio", href: "/projects" },
      { name: "About Me", href: "/about" },
    ],
    social: [
      { name: "Twitter", href: "https://twitter.com/" },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/mutalif-sagilan-982248347/",
      },
      { name: "GitHub", href: "https://github.com/code-hamster-09" },
    ],
    contacts: [
      { name: "hello@dev.com", href: "#" },
      { name: "+7 (999) 123-45-67", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
  };
  return (
    <footer>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-10 md:px-20 py-6 md:py-10 bg-bg-main/85 border-t border-white/10 gap-18">
        <div className="flex space-y-4 flex-col">
          <Link
            href={"/"}
            className="text-accent-purple text-glow text-2xl font-bold"
          >
            {"<Homyak/>"}
          </Link>
          <p className="text-text-secondary font-medium">
            Создаю будущее веб-приложений сегодня
          </p>
        </div>
        <div className="flex space-y-4 flex-col">
          <span className="text-text-primary font-bold">Навигация</span>
          {links.navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-text-secondary font-medium transition-colors duration-200 hover:text-accent-purple  `}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex space-y-4 flex-col">
          <span className="text-text-primary font-bold">Социальные сети</span>
          {links.social.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-text-secondary font-medium transition-colors duration-200 hover:text-accent-purple`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex space-y-4 flex-col">
          <span className="text-text-primary font-bold">Контакты</span>
          {links.contacts.map((link) => {
            if (link.href !== "#") {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-text-secondary font-medium transition-colors duration-200 hover:text-accent-purple`}
                >
                  {link.name}
                </Link>
              );
            } else {
              return (
                <span
                  key={link.name}
                  className="text-text-secondary font-medium"
                >
                  {link.name}
                </span>
              );
            }
          })}
        </div>
      </div>
      <div className="mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Homyak. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
