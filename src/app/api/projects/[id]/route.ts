import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '../../lib/auth';
import { deleteProject, getProjectById, updateProject } from '../../lib/data';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const project = await getProjectById(id);

    if (project) {
      return NextResponse.json(project, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching project' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращает ошибку, если аутентификация не удалась
  }

  const { id } = params;
  const { title, shortDescription, fullDescription, technologies, image, featured, linkGithub, linkDemo } = await req.json();

  try {
    const updatedProject = await updateProject(id, { title, shortDescription, fullDescription, technologies, image, featured, linkGithub, linkDemo });

    if (updatedProject) {
      return NextResponse.json(updatedProject, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json({ message: 'Error updating project', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await authenticateToken(req);
  if (authResult !== true) {
    return authResult; // Возвращает ошибку, если аутентификация не удалась
  }

  const { id } = params;

  try {
    const deletedProject = await deleteProject(id);

    if (deletedProject) {
      return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
  }
}
