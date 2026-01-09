"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface Project {
  _id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  featured: boolean;
  linkGithub?: string;
  linkDemo?: string;
  image?: string;
}

type CreateProjectProps = {
  getProjectsList: () => void;
  setIsEditing: (arg: boolean) => void;
  project?: Project;
};
const CreateProject = ({
  getProjectsList,
  setIsEditing,
  project,
}: CreateProjectProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    Omit<Project, "_id" | "technologies"> & { technologies: string }
  >({
    title: project?.title || "",
    shortDescription: project?.shortDescription || "",
    fullDescription: project?.fullDescription || "",
    technologies: project?.technologies.join(", ") || "",
    featured: project?.featured || false,
    linkGithub: project?.linkGithub || "",
    linkDemo: project?.linkDemo || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const techArray = data.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("shortDescription", data.shortDescription);
      formData.append("fullDescription", data.fullDescription);
      formData.append("technologies", JSON.stringify(techArray));
      formData.append("featured", String(data.featured));
      if (data.linkGithub) formData.append("linkGithub", data.linkGithub);
      if (data.linkDemo) formData.append("linkDemo", data.linkDemo);
      if (imageFile) formData.append("image", imageFile);

      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast({
          title: "Error",
          description: "Authorization required",
          variant: "destructive",
        });
        return;
      }

      const method = project ? "PUT" : "POST";
      const url = project ? `/api/projects/${project._id}` : "/api/projects";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 403) {
          localStorage.removeItem("auth_token");
        }
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      }

      toast({
        title: "Success",
        description: project ? "Project updated" : "Project created",
      });
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      getProjectsList();
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    // <div className="absolute w-full h-full bg-gray-900 top-0 left-0 px-40 py-10 z-100">
    <div className="p-4 md:p-8 border border-white/10 bg-text-secondary/10 rounded-3xl shadow-xl text-gray-100 z-1000">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-accent-purple text-glow">
          {project ? "Edit" : "Create"}{" "}
        </span>
        {project ? "Project" : "New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-6">
          <div className="w-70 h-40 rounded-3xl overflow-hidden relative group">
            {project?.image ? (
              <Image
                src={project?.image}
                alt={project?.title}
                fill
                loading="lazy"
                className="object-fill"
              />
            ) : imageFile ? (
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                fill
                loading="lazy"
                className="object-fill"
              />
            ) : (
              <div className="w-full h-full bg-gray-400/20 text-gray-400 flex items-center justify-center">
                Upload Image
              </div>
            )}

            <Label
              htmlFor="featured"
              className="absolute top-4 left-4 bg-white/20 p-1.5 rounded-lg z-1000 cursor-pointer hover:bg-white/30 transition-all active:scale-90"
            >
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={data.featured}
                onChange={handleInputChange}
                className="hidden"
              />
              <StarIcon
                className="text-accent-purple w-5 h-5 transition-all"
                fill={data.featured ? "#7b76ff" : "none"}
                style={
                  data.featured
                    ? { filter: "drop-shadow(0 0 5px #7b76ff)" }
                    : {}
                }
              />
            </Label>

            <label
              className="absolute inset-0 bg-black/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  setImageFile(e.dataTransfer.files[0]);
                }
              }}
            >
              {imageFile || project?.image ? "Change " : "Upload"} Image
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={handleInputChange}
                placeholder="Name your masterpiece"
                required
                className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription" className="text-gray-300">
                Short description
              </Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                value={data.shortDescription}
                onChange={handleInputChange}
                placeholder="Describe your vision in one powerful sentence"
                required
                className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies" className="text-gray-300">
            Technologies
          </Label>
          <Input
            id="technologies"
            name="technologies"
            value={data.technologies}
            onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB (comma separated)"
            required
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="image" className="text-gray-300">
            Upload image
          </Label>
          <Input
            id="image"
            name="image"
            onChange={handleInputChange}
            type="file"
            accept="image/*"
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl p-2 file:text-text-secondary file:bg-accent-purple file:hover:bg-accent-purple/80 file:border-none file:py-2 file:px-4 file:rounded-xl cursor-pointer"
          />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              id="linkDemo"
              name="linkDemo"
              value={data.linkDemo}
              onChange={handleInputChange}
              placeholder="Demo link"
              type="url"
              className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
            />
          </div>

          <div className="space-y-2">
            <Input
              id="linkGithub"
              name="linkGithub"
              value={data.linkGithub}
              onChange={handleInputChange}
              placeholder="GitHub link"
              type="url"
              className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription" className="text-gray-300">
            Full description
          </Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={data.fullDescription}
            onChange={handleTextareaChange}
            placeholder="Describe your project in detail"
            required
            className="min-h-[120px] border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple resize-none"
          />
        </div>

        <div className="flex">
          <Button
            disabled={isLoading}
            className="bg-accent-purple hover:bg-accent-purple/80 text-white rounded-2xl p-6 font-medium transition-all duration-200 mr-4 ml-auto"
            type="submit"
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {project ? "Save changes" : "Create project"}
          </Button>
          <Button
            className="bg-white/10 border border-white/20 hover:bg-white/20 p-6 rounded-2xl text-text-primary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default CreateProject;