"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import { Github, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "../page";

const Page = () => {
  const [p, setP] = useState<Project>({
    _id: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    technologies: [],
    image: "",
    featured: false,
    linkGithub: "",
    linkDemo: "",
  });
  const params = useParams();
  const id = params.id as string;
  useEffect(() => {
    fetch(`/api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setP(data);
      });
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="p-4 sm:py-6 md:px-20">
      <Link
        href={"/projects"}
        className="text-text-primary hover:bg-transparent bg-transparent p-4"
      >
        ⬅ Назад к проектам
      </Link>
      <h1 className="font-bold text-text-primary text-4xl my-4">{p.title}</h1>
      <p className="text-text-secondary mb-4">{p.shortDescription}</p>

      <Link target="_blank" href={p.linkDemo || "#"}>
        <Button
          disabled={!p.linkDemo}
          className="px-6 py-5 rounded-xl text-sm mr-3"
        >
          <LinkIcon /> Смотреть проект
        </Button>
      </Link>
      <Link target="_blank" href={p.linkGithub || "#"}>
        <Button
          disabled={!p.linkGithub}
          variant={"ghost"}
          className="mt-4 px-6 py-5 rounded-xl text-sm"
        >
          <Github /> Исходный код
        </Button>
      </Link>
      {p.image ? (
        <div className="w-full h-[600px] rounded-4xl mt-6 overflow-hidden relative">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <Skeleton className="w-full h-[600px] rounded-4xl mt-6" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-x-6 mt-10">
        <div className="col-span-2 space-y-6">
          <div className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col">
            <h2 className="font-bold text-text-primary text-xl mb-2">
              О проекте
            </h2>
            <p className="text-text-secondary text-sm wrap-break-word">
              {p.fullDescription}
            </p>
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
            <h3 className="font-bold text-text-primary text-lg mb-2">
              Стек технологий
            </h3>
            <div className="">
              {p.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-accent-purple/20 px-3 border border-accent-purple/30 text-accent-purple mt-2 mr-2 text-sm"
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
                href={p.linkDemo || "#"}
              >
                <LinkIcon className="w-4" />
                Живая демонстрация
              </Link>
              <Link
                className="flex gap-2 text-center items-center hover:text-accent-purple transition-all"
                href={p.linkGithub || "#"}
              >
                <Github className="w-4" />
                Репозиторий GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
