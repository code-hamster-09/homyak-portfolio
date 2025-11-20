"use client";

import CreateProject from "@/components/CreateProject";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "../projects/page";
import MessageManage from "@/components/MessageManage";

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((p) => setProjects(p));
  }, []);
  const deleteProject = (_id: string) => {
    const token = localStorage.getItem("auth_token");
    fetch(`api/projects/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div className="p-20">
      <h1 className="text-text-primary text-4xl font-bold">
        Админ <span className="text-accent-purple text-glow">панель</span>
      </h1>
      <p className="text-text-secondary mt-4 max-w-lg">
        Управление контентом и настройками портфолио.
      </p>
      {!isEditing && (
        <Button
          className="p-5 rounded-2xl text-sm text-white ml-auto"
          onClick={() => {
            setIsEditing(true);
            setSelectedProject(undefined);
          }}
        >
          Добавить проект +
        </Button>
      )}
      {isEditing && (
        <CreateProject setIsEditing={setIsEditing} project={selectedProject} />
      )}
      <MessageManage />
      {projects.map((project) => {
        return (
          <div
            key={project._id}
            className="border border-white/10 rounded-3xl bg-text-secondary/10 p-4"
          >
            <h3>{project.title}</h3>
            {!!project.featured && (
              <Badge className="bg-accent-purple">Featured</Badge>
            )}
            <p>{project.shortDescription}</p>
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
            <Trash
              onClick={() => deleteProject(project._id)}
              className="w-5 h-5 text-error opacity-50 float-right"
            />
            <Edit
              onClick={() => {
                setSelectedProject(project);
                setIsEditing(true);
              }}
              className="w-5 h-5 text-text-secondary opacity-50 float-right"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Page;
