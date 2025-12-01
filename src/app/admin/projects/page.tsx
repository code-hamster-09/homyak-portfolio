"use client";

import { Project, StatusType } from "@/app/(user)/projects/page";
import AdminProjectsItem from "@/components/AdminProjectsItem";
import CreateProject from "@/components/CreateProject";
import AdminProjectsSkeleton from "@/components/skeletons/AdminProjectsSkeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { useEffect, useState } from "react";

const ProjectsManage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>("idle");
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const getProjectsList = () => {
    setStatus("pending");
    fetch("/api/projects")
      .then((res) => res.json())
      .then((p) => setProjects(p))
      .then(() => setStatus("fulfilled"))
      .catch((error) => {
        console.log(error);
        setStatus("rejected");
      });
  };
  const deleteProject = (_id: string) => {
    const token = localStorage.getItem("auth_token"); // use correct token key
    if (!token) {
      toast({
        title: "Error",
        description: "Authorization required",
        variant: "destructive",
      });
      return;
    }
    fetch(`/api/projects/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(() => {
        getProjectsList();
      });
  };
  useEffect(() => {
    void (() => {
      getProjectsList();
    })();
  }, []);
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
          Create project +
        </Button>
      )}
      {isEditing && (
        <CreateProject
          getProjectsList={getProjectsList}
          setIsEditing={setIsEditing}
          project={selectedProject}
        />
      )}
      <div className="space-y-4">
        {projects.length === 0 && status === "fulfilled" && (
          <p>Projects not found</p>
        )}
        {status === "fulfilled" &&
          projects.map((project) => {
            return (
              <AdminProjectsItem
                key={project._id}
                project={project}
                setIsEditing={setIsEditing}
                setSelectedProject={setSelectedProject}
                deleteProject={deleteProject}
              />
            );
          })}
        {status === "pending" &&
          Array.from({ length: 3 }).map((_, i) => (
            <AdminProjectsSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

export default ProjectsManage;
