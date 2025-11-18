import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../../lib/auth";
import { deleteProject, getProjectById, updateProject } from "../../lib/data";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const project = await getProjectById(id);

    if (project) {
      return NextResponse.json(project, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    console.error("Error fetching project:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error fetching project", error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращает ошибку, если аутентификация не удалась
  }

  try {
    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const technologiesString = formData.get("technologies") as string;
    const imageFile = formData.get("image") as File | null;
    const featured = formData.get("featured") === "true";
    const linkGithub = formData.get("linkGithub") as string | undefined;
    const linkDemo = formData.get("linkDemo") as string | undefined;

    let imageUrl: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${imageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "portfolio", // Папка на Cloudinary
      });
      imageUrl = uploadResponse.secure_url;
    }

    const technologies = technologiesString
      ? JSON.parse(technologiesString)
      : undefined;

    const updatedProjectData = {
      title: title,
      shortDescription: shortDescription,
      fullDescription: fullDescription,
      technologies: technologies,
      image: imageUrl,
      featured: featured,
      linkGithub: linkGithub,
      linkDemo: linkDemo,
    };

    const updatedProject = await updateProject(id, updatedProjectData);

    if (updatedProject) {
      return NextResponse.json(updatedProject, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    console.error("Error updating project:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error updating project", error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращает ошибку, если аутентификация не удалась
  }

  const { id } = await params;

  try {
    const deletedProject = await deleteProject(id);

    if (deletedProject) {
      return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
