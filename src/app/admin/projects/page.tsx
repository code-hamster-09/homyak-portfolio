"use client";

import { Project } from "@/app/(user)/projects/page";
import CreateProject from "@/components/CreateProject";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectsManage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((p) => setProjects(p));
  }, []);
  const deleteProject = (_id: string) => {
    const token = localStorage.getItem("auth_token");
    fetch(`/api/projects/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div className="space-y-8">
      {!isEditing && (
        <Button
          className="p-5 rounded-2xl text-sm text-white ml-auto flex"
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
      <div className="space-y-4">
        {projects.map((project) => {
          return (
            <div
              key={project._id}
              className="border border-white/10 rounded-3xl bg-text-secondary/10 p-4 space-y-2 relative"
            >
              <div className="flex space-x-4 items-center">
                <h3 className="text-xl font-medium">{project.title}</h3>
                {!!project.featured && (
                  <Badge className="bg-accent-purple">Featured</Badge>
                )}
              </div>
              <p className="text-text-secondary">{project.shortDescription}</p>
              <div className="flex space-x-2">
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
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setIsEditing(true);
                  }}
                  className="px-2 py-1 hover:-translate-y-0.5 text-gray-300 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 mr-3"
                >
                  <Edit className="w-4" />
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="text-red-500 px-2 py-1 hover:-translate-y-0.5 hover:text-gray-300 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 m-0"
                >
                  <Trash2 className="w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsManage;
