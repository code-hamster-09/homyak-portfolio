import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../../lib/auth";
import { deleteProject, getProjectById, updateProject } from "../../lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращает ошибку, если аутентификация не удалась
  }

  try {
    const { id } = await params;
    const {
      title,
      shortDescription,
      fullDescription,
      technologies,
      image,
      featured,
      linkGithub,
      linkDemo,
    } = await req.json();

    const updatedProject = await updateProject(id, {
      title,
      shortDescription,
      fullDescription,
      technologies,
      image,
      featured,
      linkGithub,
      linkDemo,
    });

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
  { params }: { params: { id: string } }
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
