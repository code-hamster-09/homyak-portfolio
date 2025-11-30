import { NextResponse } from "next/server";
import { getFeaturedProjects } from "../../lib/data";

export async function GET() {
  try {
    const projects = await getFeaturedProjects(3);
    return NextResponse.json(projects, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET /api/projects/featured:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error fetching featured projects", error: message },
      { status: 500 }
    );
  }
}
