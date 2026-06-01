"use client";

import ProjectsItem from "@/components/ProjectsItem";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

export type StatusType = "idle" | "pending" | "fulfilled" | "rejected";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<StatusType>("idle");
  const getProjects = () => {
    setStatus("pending");
    fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .then(() => {
        setStatus("fulfilled");
      })
      .catch((error) => {
        console.log(error);
        setStatus("rejected");
      });
  };
  useEffect(() => {
    void (() => {
      getProjects();
    })();
    window.scrollTo(0, 0);
  }, []);

  let filteredProjects;
  if (projects.length > 0) {
    filteredProjects = projects
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.shortDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
      .sort((a, b) => {
        return Number(b.featured) - Number(a.featured);
      });
  }

  return (
    <main className="p-4 sm:p-12 md:p-20 space-y-30">
      <section className="space-y-6 flex flex-col items-center">
        <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
          Мои <span className="text-accent-purple text-glow">Проекты</span>
        </h1>
        <p className="text-text-secondary text-md md:text-lg text-center">
          Коллекция моих работ: от веб-приложений до интеграций с ИИ
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {status === "fulfilled" &&
            filteredProjects != null &&
            filteredProjects.length > 0 &&
            filteredProjects.map((project) => (
              <ProjectsItem key={project._id} project={project} />
            ))}
          {(status === "pending" || projects.length === 0) &&
            Array.from({ length: 3 }).map((_, i) => (
              <ProjectsSkeleton key={i} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
