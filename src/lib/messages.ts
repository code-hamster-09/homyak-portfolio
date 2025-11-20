import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "replied";
  createdAt: string;
  replied: boolean;
  replyText: string | null;
  replyAt: string | null;
}

const DATA_FILE = path.resolve(process.cwd(), "data", "messages.json");

export async function validateMessage(data: any) {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Имя не может быть пустым.");
  }
  if (!data.email || data.email.trim() === "") {
    errors.push("Email не может быть пустым.");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.push("Неверный формат Email.");
  }
  // TODO: Опционально MX lookup

  if (!data.subject || data.subject.trim() === "") {
    errors.push("Тема не может быть пустой.");
  }
  if (!data.message || data.message.trim() === "") {
    errors.push("Сообщение не может быть пустым.");
  } else if (data.message.length < 5) {
    errors.push("Сообщение должно содержать не менее 5 символов.");
  }

  return errors;
}

export async function saveMessage(
  data: Omit<
    Message,
    "id" | "status" | "createdAt" | "replied" | "replyText" | "replyAt"
  >
): Promise<Message> {
  const messages = await getMessages();
  const newMessage: Message = {
    id: uuidv4(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
    replied: false,
    replyText: null,
    replyAt: null,
  };
  messages.push(newMessage);
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
  return newMessage;
}

export async function getMessages(): Promise<Message[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function getMessageById(id: string): Promise<Message | undefined> {
  const messages = await getMessages();
  return messages.find((msg) => msg.id === id);
}

export async function updateMessage(updatedMessage: Message): Promise<void> {
  const messages = await getMessages();
  const index = messages.findIndex((msg) => msg.id === updatedMessage.id);
  if (index !== -1) {
    messages[index] = updatedMessage;
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
  } else {
    throw new Error("Сообщение не найдено.");
  }
}
