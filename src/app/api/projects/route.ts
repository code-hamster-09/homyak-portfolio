import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../lib/auth";
import { addProject, getProjects } from "../lib/data";

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

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const technologiesString = formData.get("technologies") as string;
    const imageFile = formData.get("image") as File | null;
    const featured = formData.get("featured") === "true";
    const linkGithub = formData.get("linkGithub") as string | undefined;
    const linkDemo = formData.get("linkDemo") as string | undefined;

    let imageUrl = "";
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${imageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "homyak-portfolio", // Папка на Cloudinary
      });
      imageUrl = uploadResponse.secure_url;
    }

    const technologies = JSON.parse(technologiesString);

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !technologies ||
      !imageUrl
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
      image: imageUrl,
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
