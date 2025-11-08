import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../lib/auth";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../lib/data";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET /api/projects:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error fetching projects", error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращаем ошибку авторизации
  }

  try {
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

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !technologies ||
      !image
    ) {
      return NextResponse.json(
        {
          message:
            "Title, shortDescription, fullDescription, technologies, and image are required",
        },
        { status: 400 }
      );
    }

    const newProject = await addProject({
      title,
      shortDescription,
      fullDescription,
      technologies,
      image,
      featured,
      linkGithub,
      linkDemo,
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: unknown) {
    console.error("Error in POST /api/projects:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error creating project", error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult;
  }

  try {
    const {
      id,
      title,
      shortDescription,
      fullDescription,
      technologies,
      image,
      featured,
      linkGithub,
      linkDemo,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

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

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in PATCH /api/projects:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error updating project", error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult;
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteProject(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in DELETE /api/projects:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error deleting project", error: message },
      { status: 500 }
    );
  }
}
