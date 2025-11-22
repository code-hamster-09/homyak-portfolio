import { updateMessage } from "@/app/api/lib/messages-db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Обновленный тип
) {
  try {
    const { id } = await params; // Await params напрямую
    // console.log("Получен ID для обновления статуса:", id); // Удалено логирование ID

    if (!id) {
      return NextResponse.json(
        { error: "ID сообщения не может быть пустым." },
        { status: 400 }
      );
    }

    const updatedMessage = await updateMessage(id, { status: "read" });

    if (!updatedMessage) {
      return NextResponse.json(
        { error: "Сообщение не найдено." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Ошибка при обновлении статуса сообщения." },
      { status: 500 }
    );
  }
}
