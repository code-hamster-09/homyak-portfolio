import {
  getMessages,
  saveMessage,
  updateMessage,
  validateMessage,
} from "@/app/api/lib/messages-db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Pusher from "pusher"; // Импорт Pusher

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
    id: "",
    validated: false,
    saved: false,
    emailSentToUser: false,
    emailSentToMe: false,
    errors: [],
  };

  try {
    const data = await request.json();

    // 1. Валидация (используем старую валидацию из @/lib/messages, пока ее не перенесем)
    const validationErrors = await validateMessage(data);
    if (validationErrors.length > 0) {
      report.errors = validationErrors;
      return NextResponse.json(report, { status: 400 });
    }
    report.validated = true;

    // 2. Сохранение сообщения в MongoDB
    const newMessage = await saveMessage(data);
    report.id = newMessage._id.toString(); // MongoDB _id
    report.saved = true;

    // Устанавливаем начальный статус доставки как "pending"
    let deliveryStatus: "sent" | "failed" | "pending" = "pending";

    // 3. Отправка email пользователю
    try {
      await transporter.sendMail({
        from: MY_EMAIL,
        to: data.email,
        subject: `Re: ${data.subject}`,
        text: `Спасибо за ваше сообщение, ${data.name}! Мы свяжемся с вами в ближайшее время.\n\nВаше сообщение:\n${data.message}`,
      });
      report.emailSentToUser = true;
      deliveryStatus = "sent";
    } catch (emailError: any) {
      report.errors.push(
        `Ошибка при отправке email пользователю: ${emailError.message}`
      );
      deliveryStatus = "failed";
      // Если отправка письма пользователю не удалась, возвращаем ошибку сразу
      await updateMessage(newMessage._id.toString(), { deliveryStatus });
      return NextResponse.json(report, { status: 400 });
    } finally {
      // Обновляем статус доставки в базе данных, если письмо было отправлено успешно
      if (deliveryStatus === "sent") {
        await updateMessage(newMessage._id.toString(), { deliveryStatus });
      }
    }

    // 4. Отправка уведомления на мою Gmail
    try {
      await transporter.sendMail({
        from: MY_EMAIL,
        to: MY_EMAIL,
        subject: `Новое сообщение от ${data.name} (${data.email})`,
        text: `Имя: ${data.name}\nEmail: ${data.email}\nТема: ${data.subject}\nСообщение:\n${data.message}`,
      });
      report.emailSentToMe = true;
    } catch (emailError: any) {
      report.errors.push(
        `Ошибка при отправке уведомления на вашу почту: ${emailError.message}`
      );
    }

    // Отправляем WebSocket-событие о новом сообщении через Pusher
    try {
      const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.PUSHER_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: process.env.PUSHER_CLUSTER!,
        useTLS: true,
      });

      await pusher.trigger("messages", "newMessage", newMessage);
    } catch (pusherError: any) {
      console.error("Ошибка при отправке Pusher-события:", pusherError);
    }

    return NextResponse.json(report);
  } catch (error: any) {
    report.errors.push(error.message);
    return NextResponse.json(report, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json(
      { errors: [{ message: error.message }] },
      { status: 500 }
    );
  }
}
