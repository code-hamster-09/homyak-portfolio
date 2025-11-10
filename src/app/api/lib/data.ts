import mongoose, { Document, Schema, Types } from "mongoose";
import connectToDatabase from "./db";

interface Project extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image?: string;
  featured: boolean;
  linkGithub?: string;
  linkDemo?: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  technologies: { type: [String], required: true },
  image: { type: String },
  featured: { type: Boolean, default: false },
  linkGithub: { type: String },
  linkDemo: { type: String },
});

const ProjectModel =
  mongoose.models.Project || mongoose.model<Project>("Project", ProjectSchema);

export const getProjects = async (): Promise<Project[]> => {
  await connectToDatabase();
  return ProjectModel.find({});
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  await connectToDatabase();
  
  // Проверяем, является ли id валидным ObjectId
  if (!Types.ObjectId.isValid(id)) {
    console.warn(`Invalid Project ID format: ${id}`);
    return null; // Возвращаем null, если ID невалиден
  }
  const objectId = new Types.ObjectId(id);
  const project = await ProjectModel.findById(objectId);
  return project;
};

export const addProject = async (projectData: {
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  featured?: boolean;
  linkGithub?: string;
  linkDemo?: string;
}): Promise<Project> => {
  await connectToDatabase();
  const newProject = new ProjectModel(projectData);
  await newProject.save();
  return newProject;
};

export const deleteProject = async (id: string): Promise<Project | null> => {
  await connectToDatabase();
  return ProjectModel.findByIdAndDelete(id);
};

export const updateProject = async (
  id: string,
  projectData: {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    technologies?: string[];
    image?: string;
    featured?: boolean;
    linkGithub?: string;
    linkDemo?: string;
  }
): Promise<Project | null> => {
  await connectToDatabase();
  return ProjectModel.findByIdAndUpdate(id, projectData, { new: true });
};
