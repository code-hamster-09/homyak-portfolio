"use client";
import { Clock, Mail, Trash2 } from "lucide-react";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Message = {
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

  const handleGetAllMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data.toReversed());
      console.log("Все сообщения:", data);
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
      alert("Ошибка при получении сообщений!");
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage({ ...message, status: "read" });
    handleMarkAsRead(message._id);
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await fetch(`/api/messages/${messageId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      handleGetAllMessages();
    } catch (error) {
      console.error("Ошибка при обновлении статуса сообщения:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить это сообщение?")) {
      return;
    }
    try {
      await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      toast({
        title: "Сообщение удалено",
        variant: "default",
      });
      handleGetAllMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error("Ошибка при удалении сообщения:", error);
      toast({
        title: "Ошибка при удалении сообщения!",
        variant: "default",
      });
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

    // Подключение к Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", (newMessage: Message) => {
      console.log("Получено новое сообщение через Pusher:", newMessage);
      handleGetAllMessages(); // Обновляем список сообщений
    });

    // Отключение Pusher при размонтировании компонента
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
          {messages.map((message) => {
            console.log(message);
            const formattedDate = new Date(
              message.createdAt
            ).toLocaleDateString();
            const formattedTime = new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={message._id}
                className="border border-white/10 p-3 rounded-3xl space-y-3 bg-white/5 cursor-pointer relative"
                onClick={() => handleSelectMessage(message)}
              >
                <div
                  className={`${
                    message.status === "new"
                      ? "text-accent-purple"
                      : "text-gray-400"
                  } flex items-center space-x-2`}
                >
                  <Mail className="w-5" />
                  <h5 className="text-sm font-medium">{message.name}</h5>
                </div>
                <h3 className="text-lg font-medium">{message.subject}</h3>
                <div className="flex items-center space-x-1 text-gray-400 m-0">
                  <Clock className="w-3" />
                  <span className="text-xs tracking-wider">
                    {formattedDate}
                  </span>
                </div>
                <span className="text-gray-400 text-sm absolute bottom-4 right-4 m-0">
                  {formattedTime}
                </span>
                <div
                  className={`${
                    message.status === "new"
                      ? " bg-accent-purple"
                      : "bg-transparent"
                  } w-2 h-2 rounded-full absolute top-4 right-4`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="col-span-2 border border-white/10 p-8 rounded-3xl bg-white/5 self-start">
          {selectedMessage ? (
            <div className="space-y-4 relative">
              <h2 className="text-2xl font-bold">{selectedMessage.subject}</h2>
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
              <Button className="p-8 rounded-2xl py-5 text-md">
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
