import { getMessages, saveMessage, validateMessage } from "@/lib/messages";
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
    id: "",
    validated: false,
    saved: false,
    emailSentToUser: false,
    emailSentToMe: false,
    errors: [],
  };

  try {
    const data = await request.json();

    // 1. Валидация
    const validationErrors = await validateMessage(data);
    if (validationErrors.length > 0) {
      report.errors = validationErrors;
      return NextResponse.json(report, { status: 400 });
    }
    report.validated = true;

    // 2. Сохранение сообщения
    const newMessage = await saveMessage(data);
    report.id = newMessage.id;
    report.saved = true;

    // 3. Отправка email пользователю
    try {
      await transporter.sendMail({
        from: MY_EMAIL,
        to: data.email,
        subject: `Re: ${data.subject}`,
        text: `Спасибо за ваше сообщение, ${data.name}! Мы свяжемся с вами в ближайшее время.\n\nВаше сообщение:\n${data.message}`,
      });
      report.emailSentToUser = true;
    } catch (emailError: any) {
      report.errors.push(
        `Ошибка при отправке email пользователю: ${emailError.message}`
      );
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
