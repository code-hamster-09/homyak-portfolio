import { deleteMessage } from "@/app/api/lib/messages-db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // Явно указываем, что params - это Promise
) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Ошибка при удалении сообщения." },
      { status: 500 }
    );
  }
}
