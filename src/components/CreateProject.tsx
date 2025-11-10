"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const CreateProject = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    technologies: "",
    featured: false,
    linkGithub: "",
    linkDemo: "",
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
        });// Перенаправляем на страницу логина
        return;
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json", // Удаляем этот заголовок при работе с FormData
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
        description: "Проект создан",
      });

      router.push("/projects");
      router.refresh();
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Новый проект</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              name="title"
              value={data.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Краткое описание</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              value={data.shortDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Полное описание</Label>
            <Textarea
              id="fullDescription"
              name="fullDescription"
              value={data.fullDescription}
              onChange={handleTextareaChange}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Технологии</Label>
            <Input
              id="technologies"
              name="technologies"
              value={data.technologies}
              onChange={handleInputChange}
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Загрузить изображение</Label>
            <Input
              id="image"
              name="image"
              onChange={handleInputChange}
              type="file"
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkDemo">Демо</Label>
              <Input
                id="linkDemo"
                name="linkDemo"
                value={data.linkDemo}
                onChange={handleInputChange}
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkGithub">GitHub</Label>
              <Input
                id="linkGithub"
                name="linkGithub"
                value={data.linkGithub}
                onChange={handleInputChange}
                type="url"
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
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="featured">Отметить как избранный проект</Label>
          </div>

          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Создать проект
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProject;
