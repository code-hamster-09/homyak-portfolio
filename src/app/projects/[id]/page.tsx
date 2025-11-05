import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, LinkIcon } from "lucide-react";
import Link from "next/link";

const p = {
  id: 1,
  title: "E-commerce Platform",
  shortDescription:
    "Полнофункциональная платформа электронной коммерции с корзиной покупок и интеграцией платежей",
  fullDescription:
    "Современная e-commerce платформа, построенная с использованием Next.js и TypeScript. Включает полную систему управления продуктами, корзину покупок, интеграцию с Stripe для обработки платежей, и панель администратора для управления заказами.",
  technologies: [
    "Next.js",
    "TypeScript",
    "Stripe",
    "PostgreSQL",
    "Tailwind CSS",
  ],
  image: "/modern-ecommerce-dashboard.png",
  featured: true,
  linkGithub: "https://github.com",
  linkDemo: "https://example.com",
};

const Page = () => {
  return (
    <div className="">
      <h1 className="font-bold text-text-primary text-4xl">{p.title}</h1>
      <p className="text-text-secondary">{p.shortDescription}</p>
      <Button className="mt-6 px-6 py-5 rounded-xl text-sm">
        <LinkIcon /> Посмотреть проект
      </Button>
      <Button variant={"ghost"} className="mt-6 px-6 py-5 rounded-xl text-sm">
        <Github /> Посмотреть код
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-x-6 mt-10">
        <div className="col-span-2 space-y-6">
          <div className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col">
            <h2 className="font-bold text-text-primary text-xl mb-2">
              О проекте
            </h2>
            <p className="text-text-secondary text-sm">{p.fullDescription}</p>
          </div>
          <div className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col">
            <h2 className="font-bold text-text-primary text-xl mb-2">
              Технологии
            </h2>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
              {p.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col">
            <h3 className="font-bold text-text-primary text-lg mb-2">Технологии</h3>
            <div className="">
              {p.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-accent-purple/20 text-accent-purple"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col ">
            <h3 className="font-bold text-text-primary text-lg mb-2">Ссылки</h3>
            <div className="gap-2 text-text-secondary">
              <Link
                className="flex gap-2 text-center items-center hover:text-accent-purple transition-all"
                href={p.linkDemo}
              >
                <LinkIcon className="w-4" />
                Живай демонстрация
              </Link>
              <Link
                className="flex gap-2 text-center items-center hover:text-accent-purple transition-all"
                href={p.linkGithub}
              >
                <Github className="w-4" />
                GitHub репозиторий
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
