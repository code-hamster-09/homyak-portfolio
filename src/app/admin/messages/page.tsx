"use client";
import { StatusType } from "@/app/(user)/projects/page";
import MessagesItem from "@/components/MessagesItem";
import MessagesSkeleton from "@/components/skeletons/MessagesSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { Mail, Trash2 } from "lucide-react";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

export type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  replied: boolean;
  status: string;
};

const MessageManage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");

  const handleGetAllMessages = async () => {
    setStatus("pending");
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast({
          title: "Ошибка",
          description: "Требуется авторизация",
          variant: "destructive",
        });
        return;
      }
      const response = await fetch("/api/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessages(data.toReversed());
      setStatus("fulfilled");
    } catch (error) {
      setStatus("rejected");
      console.error("Error fetching messages:", error);
      alert("Не удалось загрузить сообщения!");
    }
  };

  const handleReplyMessage = async (messageId: string, replyText?: string) => {
    try {
      const reply = replyText ?? window.prompt("Введите текст ответа:");
      if (!reply) return;
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast({
          title: "Ошибка",
          description: "Требуется авторизация",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch(`/api/messages/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageId, replyText: reply }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err?.message || res.statusText || "Ошибка при отправке ответа"
        );
      }

      toast({ title: "Ответ успешно отправлен", variant: "default" });
      await handleGetAllMessages();
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({ ...selectedMessage, replied: true });
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({ title: "Ошибка при отправке ответа", variant: "destructive" });
    } finally {
      handleGetAllMessages();
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage({ ...message, status: "read" });
    setMessages((prevMessages) =>
      prevMessages.map((m) =>
        m._id !== message._id ? { ...m, status: "read" } : m
      )
    );
    if (message.status === "new") {
      handleMarkAsRead(message._id);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast({
        title: "Ошибка",
        description: "Требуется авторизация",
        variant: "destructive",
      });
      return;
    }
    try {
      await fetch(`/api/messages/${messageId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      handleGetAllMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить это сообщение?")) {
      return;
    }
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast({
        title: "Ошибка",
        description: "Требуется авторизация",
        variant: "destructive",
      });
      return;
    }
    try {
      await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Сообщение удалено", variant: "default" });
      handleGetAllMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({ title: "Ошибка при удалении сообщения!", variant: "destructive" });
    }
  };

  const formattedSelectedTime = selectedMessage
    ? new Date(selectedMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  useEffect(() => {
    void (async () => {
      await handleGetAllMessages();
    })();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", () => {
      handleGetAllMessages();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const unreadCount = messages.filter((m) => m.status === "new").length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-3">
          <div className="flex items-center">
            <h3 className="text-xl font-medium">Сообщения</h3>
            {unreadCount > 0 && (
              <Badge className="ml-auto bg-accent-purple/20 text-accent-purple text-sm font-medium border/50 border-accent-purple px-2 py-0.5">
                {unreadCount} новых
              </Badge>
            )}
          </div>
          {messages.length === 0 && status === "fulfilled" && (
            <p>Сообщения не найдены</p>
          )}
          {status === "fulfilled" &&
            messages.map((message) => {
              return (
                <MessagesItem
                  key={message._id}
                  message={message}
                  handleSelectMessage={handleSelectMessage}
                />
              );
            })}
          {(status === "pending" || messages.length === 0) &&
            status !== "fulfilled" &&
            Array.from({ length: 3 }).map((_, i) => (
              <MessagesSkeleton key={i} />
            ))}
        </div>
        <div className="col-span-2 border border-white/10 p-8 rounded-3xl bg-white/5 self-start">
          {selectedMessage ? (
            <div className="space-y-4 relative">
              <h2 className="text-2xl font-bold wrap-break-word max-w-[90%]">
                {selectedMessage.subject}
              </h2>
              <div className="text-gray-400 text-md flex space-x-6">
                <p>От: {selectedMessage.name}</p>
                <p>{selectedMessage.email}</p>
                <p>{formattedSelectedTime}</p>
              </div>
              <p className="text-gray-300 wrap-break-word">
                {selectedMessage.message}
              </p>
              <button
                onClick={() => handleDeleteMessage(selectedMessage._id)}
                className="text-red-500 px-2 py-1 hover:-translate-y-0.5 hover:text-gray-300 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 absolute top-0 right-0 m-0"
              >
                <Trash2 className="w-4" />
              </button>
              <hr className="text-gray-700" />
              <Button
                onClick={() =>
                  selectedMessage && handleReplyMessage(selectedMessage._id)
                }
                className="p-8 rounded-2xl py-5 text-md"
              >
                <Mail />
                Ответить
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6 text-gray-400 p-4">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto" />
              <p>Выберите сообщение для просмотра</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManage;