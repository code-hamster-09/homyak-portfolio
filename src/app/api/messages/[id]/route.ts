import { deleteMessage } from "@/app/api/lib/messages-db";
import { NextResponse } from "next/server";
import { authenticateToken } from "../../lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Обновленный тип
) {
  const authResult = await authenticateToken(request);
  if (authResult !== true) {
    return authResult;
  }
  try {
    const { id } = await params; // Await params напрямую

    if (!id) {
      return NextResponse.json(
        { error: "ID сообщения не может быть пустым." },
        { status: 400 }
      );
    }

    const deletedMessage = await deleteMessage(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { error: "Сообщение не найдено." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Сообщение успешно удалено." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message || "Ошибка при удалении сообщения." },
      { status: 500 }
    );
  }
}
