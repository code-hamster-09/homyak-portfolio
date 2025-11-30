import { Project } from "@/app/(user)/projects/page";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

type ProjectsItemType = {
  project: Project;
};

const ProjectsItem = ({ project }: ProjectsItemType) => {
  return (
    <Link key={project._id} href={"projects/" + project._id}>
      <Card className="border group border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col gap-6 relative p-0 overflow-hidden">
        {!!project.featured && (
          <Badge className="bg-accent-purple absolute top-6 right-6 z-10">
            Featured
          </Badge>
        )}
        <div className="w-full h-[270px] overflow-hidden relative">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-400"
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
  );
};

export default ProjectsItem;
