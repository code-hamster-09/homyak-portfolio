import { getMessageById, updateMessage } from "@/lib/messages";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MY_EMAIL = process.env.MY_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MY_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  const report: any = {
    messageId: "",
    replySent: false,
    errors: [],
  };

  try {
    const data = await request.json();
    const { messageId, replyText } = data;

    report.messageId = messageId;

    if (!messageId) {
      report.errors.push("messageId не может быть пустым.");
      return NextResponse.json(report, { status: 400 });
    }
    if (!replyText || replyText.trim() === "") {
      report.errors.push("replyText не может быть пустым.");
      return NextResponse.json(report, { status: 400 });
    }

    const message = await getMessageById(messageId);

    if (!message) {
      report.errors.push("Сообщение с таким ID не найдено.");
      return NextResponse.json(report, { status: 404 });
    }

    // Отправка письма пользователю
    try {
      await transporter.sendMail({
        from: MY_EMAIL,
        to: message.email,
        subject: `Re: ${message.subject}`,
        text: replyText,
      });
      report.replySent = true;

      // Обновление записи
      message.replied = true;
      message.replyText = replyText;
      message.replyAt = new Date().toISOString();
      await updateMessage(message);
    } catch (emailError: any) {
      report.errors.push(
        `Ошибка при отправке email пользователю: ${emailError.message}`
      );
    }

    return NextResponse.json(report);
  } catch (error: any) {
    report.errors.push(error.message);
    return NextResponse.json(report, { status: 500 });
  }
}
