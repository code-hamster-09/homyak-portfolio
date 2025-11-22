"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, []);
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
              <Card className="border group border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col gap-6 relative p-0 overflow-hidden">
                {!!project.featured && (
                  <Badge className="bg-accent-purple absolute top-6 right-6 z-10">
                    Featured
                  </Badge>
                )}
                <div className="w-full h-[270px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <div className="p-6 flex-1 space-y-4">
                  <h2 className="text-2xl text-text-primary font-bold group-hover:text-accent-purple transition-colors duration-400">
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
  );
};

export default Page;
