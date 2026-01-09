import { Project } from "@/app/(user)/projects/page";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

type AdminProjectsItemProps = {
  project: Project;
  onEdit: (project: Project) => void;
  deleteProject: (_id: string) => void;
};

const AdminProjectsItem = ({
  project,
  onEdit,
  deleteProject,
}: AdminProjectsItemProps) => {
  return (
    <div className="border border-white/10 rounded-3xl bg-text-secondary/10 p-4 space-y-2 relative">
      <div className="flex space-x-4 items-center">
        <h3 className="text-xl font-medium">{project.title}</h3>
        {!!project.featured && (
          <Badge className="bg-accent-purple">Featured</Badge>
        )}
      </div>
      <p className="text-text-secondary">{project.shortDescription}</p>
      <div className="flex space-x-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <Badge key={tech} className="bg-accent-purple/20 text-accent-purple">
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
          onClick={() => onEdit(project)}
          className="px-2 py-1 hover:-translate-y-0.5 text-gray-300 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 mr-3 active:scale-85"
        >
          <Edit className="w-4" />
        </button>
        <button
          onClick={() => deleteProject(project._id)}
          className="text-red-500 px-2 py-1 hover:-translate-y-0.5 hover:text-gray-300 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 m-0  active:scale-85"
        >
          <Trash2 className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminProjectsItem;
