"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "./projects/page";

type ContactType = {
  type: string;
  value: string[];
};

export default function Home() {
  const contacts: ContactType[] = [
    { type: "Email", value: ["sagimaks19@gmail.com"] },
    { type: "Телефон", value: ["+7 (747) 290-52-75"] },
    { type: "Социальные сети", value: ["Twitter", "LinkedIn", "GitHub"] },
  ];
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects/featured", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProjects(data);
      });
  }, []);
  return (
    <main className="p-4 sm:p-12 md:p-20 space-y-30">
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex flex-col lg:text-start lg:items-start flex-1 space-y-12 text-center items-center">
          <h1 className="text-text-primary text-4xl md:text-5xl lg:text-5xl font-bold">
            Привет, я{" "}
            <span className="text-accent-purple text-glow">Homyak</span>
          </h1>
          <p className="text-text-secondary text-md md:text-lg">
            Создаю современные веб-приложения с фокусом на пользовательский опыт
            и производительность. Специализируюсь на React, Next.js и
            TypeScript.
          </p>
          <Link href={"/projects"}>
            <Button className="box-glow">Посмотреть проекты</Button>
          </Link>
        </div>
        <div className="w-full max-w-[400px] aspect-square">
          <Image
            src="/homyakImage.jpg"
            alt="Homyak illustration"
            width={400}
            height={400}
            className="bg-white/10 rounded-full hover:bg-white/20 transition-colors w-full h-full"
            priority
          />
        </div>
      </section>
      <section>
        <div className="flex flex-col text-center md:flex-row md:text-start items-center justify-between mb-4 gap-4">
          <div>
            <h2 className="text-4xl text-text-primary font-bold">
              Избранные проекты
            </h2>
            <p className="text-text-secondary text-lg">
              Некоторые из моих последних работ
            </p>
          </div>
          <Link className="flex items-center font-medium transition-colors duration-300 hover:bg-white/10 px-4 py-2 rounded-2xl" href={"/projects"}>
            Все проекты <ArrowRight className="w-5 ml-2"/>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {featuredProjects.map((project) => (
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
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-4xl text-text-primary font-bold">
          Готовы начать проект?
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl text-center">
          Если у вас есть интересный проект или вы хотите обсудить возможности
          сотрудничества, я всегда открыт для общения.
        </p>
        <div className="flex md:flex-row flex-col gap-6 justify-around p-10 border border-white/10 mt-8 rounded-4xl bg-text-secondary/5 backdrop-blur-sm text-center w-full">
          {contacts.map((contact) => (
            <div
              key={contact.type}
              className="flex flex-col md:space-y-2 font-medium"
            >
              <span className="text-text-secondary">{contact.type}</span>
              <div className="space-x-6 text-accent-purple lg:text-xl">
                {contact.value.map((val) => (
                  <Link
                    className="hover:opacity-80 transition-all duration-200"
                    key={val}
                    href="#"
                  >
                    {val}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/contact">
          <Button className="mt-8">Связаться со мной</Button>
        </Link>
      </section>
    </main>
  );
}
