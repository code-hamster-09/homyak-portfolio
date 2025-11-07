import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '../lib/auth';
import { addProject, getProjects } from '../lib/data';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json({ message: 'Error fetching projects', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращаем ошибку авторизации
  }

  try {
    const { title, shortDescription, fullDescription, technologies, image, featured, linkGithub, linkDemo } = await req.json();

    if (!title || !shortDescription || !fullDescription || !technologies || !image) {
      return NextResponse.json({ message: 'Title, shortDescription, fullDescription, technologies, and image are required' }, { status: 400 });
    }

    const newProject = await addProject({ title, shortDescription, fullDescription, technologies, image, featured, linkGithub, linkDemo });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json({ message: 'Error creating project', error: error.message }, { status: 500 });
  }
}
