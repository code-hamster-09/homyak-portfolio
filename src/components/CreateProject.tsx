"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

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
  setIsEditing: (arg: boolean) => void;
  project?: Project;
};
const CreateProject = ({ setIsEditing, project }: CreateProjectProps) => {
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

      const token = localStorage.getItem("auth_token"); // Используем правильный ключ для токена
      if (!token) {
        toast({
          title: "Ошибка",
          description: "Необходима авторизация",
          variant: "destructive",
        }); // Перенаправляем на страницу логина
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
          localStorage.removeItem("auth_token"); // Удаляем недействительный токен
        }
        throw new Error(errorData.message || `Ошибка: ${response.status}`);
      }

      toast({
        title: "Успешно",
        description: project ? "Проект обновлен" : "Проект создан",
      });
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 border border-white/10 bg-text-secondary/10 rounded-3xl shadow-xl text-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-accent-purple text-glow">
          {project ? "Редактировать" : "Создать"}{" "}
        </span>
        {project ? "Проект" : "Новый Проект"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-300">
            Название
          </Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            required
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription" className="text-gray-300">
            Краткое описание
          </Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            value={data.shortDescription}
            onChange={handleInputChange}
            required
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription" className="text-gray-300">
            Полное описание
          </Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={data.fullDescription}
            onChange={handleTextareaChange}
            required
            className="min-h-[120px] border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies" className="text-gray-300">
            Технологии
          </Label>
          <Input
            id="technologies"
            name="technologies"
            value={data.technologies}
            onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB"
            required
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="text-gray-300">
            Загрузить изображение
          </Label>
          <Input
            id="image"
            name="image"
            onChange={handleInputChange}
            type="file"
            accept="image/*"
            className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl p-2 file:text-text-secondary file:bg-accent-purple file:hover:bg-accent-purple/80 file:border-none file:py-2 file:px-4 file:rounded-xl cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="linkDemo" className="text-gray-300">
              Демо ссылка
            </Label>
            <Input
              id="linkDemo"
              name="linkDemo"
              value={data.linkDemo}
              onChange={handleInputChange}
              type="url"
              className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkGithub" className="text-gray-300">
              Ссылка на GitHub
            </Label>
            <Input
              id="linkGithub"
              name="linkGithub"
              value={data.linkGithub}
              onChange={handleInputChange}
              type="url"
              className="border border-white/10 text-text-secondary bg-text-secondary/5 rounded-2xl px-4 py-2 placeholder:text-text-secondary/70 focus:border-accent-purple focus:ring-accent-purple"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={data.featured}
            onChange={handleInputChange}
            className="h-5 w-5 rounded border-white/10 bg-text-secondary/5 text-accent-purple focus:ring-accent-purple focus:ring-offset-gray-900"
          />
          <Label htmlFor="featured" className="text-text-secondary">
            Отметить как избранный проект
          </Label>
        </div>

        <Button
          disabled={isLoading}
          className="bg-accent-purple hover:bg-accent-purple/80 text-white rounded-2xl p-6 font-medium transition-all duration-200"
          type="submit"
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {project ? "Сохранить изменения" : "Создать проект"}
        </Button>
        <Button
          className="bg-white/10 border border-white/20 hover:bg-white/20 p-6 rounded-2xl text-text-primary"
          onClick={() => setIsEditing(false)}
        >
          Отмена
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
