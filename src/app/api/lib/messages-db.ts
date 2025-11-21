import * as emailValidator from "email-validator";
import mongoose, { Schema, Types } from "mongoose";
import connectToDatabase from "./db";

export interface IMessage extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "replied" | "read"; // Добавлен статус "read"
  createdAt: Date;
  replied: boolean;
  replyText?: string | null;
  replyAt?: Date | null;
  deliveryStatus: "sent" | "failed" | "pending"; // Новое поле
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "replied", "read"], default: "new" }, // Добавлен статус "read"
  createdAt: { type: Date, default: Date.now },
  replied: { type: Boolean, default: false },
  replyText: { type: String },
  replyAt: { type: Date },
  deliveryStatus: {
    type: String,
    enum: ["sent", "failed", "pending"],
    default: "pending",
  }, // Новое поле
});

export const MessageModel: mongoose.Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export const getMessages = async (): Promise<IMessage[]> => {
  await connectToDatabase();
  return MessageModel.find({});
};

export const getMessageById = async (id: string): Promise<IMessage | null> => {
  await connectToDatabase();
  return MessageModel.findById(id);
};

export const saveMessage = async (messageData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<IMessage> => {
  await connectToDatabase();
  const newMessage = new MessageModel(messageData);
  await newMessage.save();
  return newMessage;
};

export const updateMessage = async (
  id: string,
  updatedData: {
    status?: "new" | "replied" | "read";
    replied?: boolean;
    replyText?: string | null;
    replyAt?: Date | null;
    deliveryStatus?: "sent" | "failed" | "pending";
  }
): Promise<IMessage | null> => {
  await connectToDatabase();
  return MessageModel.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteMessage = async (id: string): Promise<IMessage | null> => {
  await connectToDatabase();
  return MessageModel.findByIdAndDelete(id);
};

export async function validateMessage(data: any) {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Имя не может быть пустым.");
  }
  if (!data.email || data.email.trim() === "") {
    errors.push("Email не может быть пустым.");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.push("Неверный формат Email.");
  } else if (!emailValidator.validate(data.email)) {
    errors.push("Email недействителен.");
  }

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
