"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Project = {
  _id: string; // уникальный id
  title: string; // название проекта
  shortDescription: string; // краткое описание для карточки
  fullDescription: string; // детальное описание для отдельной страницы
  technologies: string[]; // список технологий
  image: string;
  featured: boolean; // обложка
  linkGithub?: string; // ссылка на код
  linkDemo?: string; // ссылка на демо
};

const projectss: Project[] = [
  {
    _id: "1",
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
    image: "/file.svg",
    featured: true,
    linkGithub: "https://github.com",
    linkDemo: "https://example.com",
  },
  {
    _id: "2",
    title: "AI Chat Application",
    shortDescription:
      "Приложение для чата в реальном времени с интеграцией AI для умных ответов",
    fullDescription:
      "Интеллектуальное приложение для чата, использующее OpenAI API для генерации контекстуальных ответов. Поддерживает множество пользователей, историю сообщений и настраиваемые AI модели.",
    technologies: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB"],
    image: "/ai-chat-interface-futuristic.jpg",
    featured: true,
    linkGithub: "https://github.com",
    linkDemo: "https://example.com",
  },
  {
    _id: "3",
    title: "Portfolio Dashboard",
    shortDescription:
      "Аналитическая панель для отслеживания портфеля с визуализацией данных в реальном времени",
    fullDescription:
      "Интерактивная панель для отслеживания инвестиционного портфеля с графиками в реальном времени, анализом производительности и прогнозами на основе исторических данных.",
    technologies: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
    image: "/analytics-dashboard-dark-theme.png",
    featured: true,
    linkGithub: "https://github.com",
  },
  {
    _id: "4",
    title: "Task Management System",
    shortDescription: "Система управления задачами с drag-and-drop интерфейсом",
    fullDescription:
      "Полнофункциональная система управления проектами в стиле Kanban с возможностью перетаскивания задач, назначения участников команды и отслеживания прогресса.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    image: "/task-management-kanban-board.jpg",
    featured: false,
    linkGithub: "https://github.com",
    linkDemo: "https://example.com",
  },
  {
    _id: "5",
    title: "Weather Forecast App",
    shortDescription: "Приложение прогноза погоды с красивыми анимациями",
    fullDescription:
      "Элегантное приложение для прогноза погоды с анимированными иконками, детальными метеоданными и поддержкой множества локаций.",
    technologies: ["React Native", "TypeScript", "Weather API"],
    image: "/weather-app-interface-modern.jpg",
    featured: false,
    linkGithub: "https://github.com",
  },
  {
    _id: "6",
    title: "Blog Platform",
    shortDescription: "Платформа для блогов с markdown редактором",
    fullDescription:
      "Современная платформа для ведения блога с поддержкой markdown, системой комментариев, тегами и полнотекстовым поиском.",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    image: "/blog-platform-editor-interface.jpg",
    featured: false,
    linkGithub: "https://github.com",
    linkDemo: "https://example.com",
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(data => {
      console.log(data)
      setProjects(data)
    })
  }, [])
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  return (
    <div>
      <Header />
      <main className="p-4 sm:p-12 md:p-20 space-y-30">
        <section className="space-y-6 flex flex-col items-center">
          <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
            Мои <span className="text-accent-purple text-glow">проекты</span>
          </h1>
          <p className="text-text-secondary text-md md:text-lg text-center">
            Коллекция моих работ, от веб-приложений до AI проектов
          </p>
          <div className="flex flex-row items-center gap-2 px-4 py-2 w-full max-w-md border border-white/10 rounded-2xl bg-text-secondary/5 backdrop-blur-sm">
            <Search className="opacity-50" />
            <Input
              value={searchQuery}
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-md color-text-secondary"
              placeholder="Поиск проектов..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredProjects.map((project) => (
              <Link key={project._id} href={"projects/" + project._id}>
                <Card className="border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col gap-6 relative p-0 overflow-hidden">
                  {project.featured && (
                    <Badge className="bg-accent-purple absolute top-6 right-6">
                      Featured
                    </Badge>
                  )}
                  <div className="w-full h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 space-y-4">
                    <h2 className="text-2xl text-text-primary font-bold">
                      {project.title}
                    </h2>
                    <p className="text-text-secondary line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-accent-purple/20 text-accent-purple"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge className="px-3 bg-text-secondary/20 text-text-secondary rounded-full text-sm font-medium">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
