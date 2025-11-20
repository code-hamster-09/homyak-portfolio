"use client";
import React, { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

const MessageManage: React.FC = () => {
    const handleSendMessage = async () => {
      const messageData = {
        name: "Тестовое Имя",
        email: "sagimaks19@gmail.com", // Замените на ваш email для тестирования
        subject: "Тестовая Тема",
        message: "Это тестовое сообщение от фронтенда.",
      };
  
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });
        const data = await response.json();
        console.log("Отчет об отправке сообщения:", data);
        alert("Сообщение отправлено! Проверьте консоль для отчета.");
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        alert("Ошибка при отправке сообщения!");
      }
    };

  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    handleGetAllMessages()
  }, [])
  const handleReplyMessage = async (messageId: string, replyText: string) => {
    try {
      const response = await fetch("/api/messages/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          replyText,
        }),
      });
      const data = await response.json();
      console.log("Отчет об ответе на сообщение:", data);
      alert("Ответ отправлен! Проверьте консоль для отчета.");
    } catch (error) {
      console.error("Ошибка при отправке ответа:", error);
      alert("Ошибка при отправке ответа!");
    }
  };

  const handleGetAllMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data)
      console.log("Все сообщения:", data);
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
      alert("Ошибка при получении сообщений!");
    }
  };

  return (
    <div>
      <h1>Управление сообщениями</h1>
      <button onClick={handleSendMessage}>Отправить тестовое сообщение</button>
      <br />
      <br />
      {messages.map((message) => {
        console.log(message)
        return (
          <div key={message.id} className="border border-accent-purple/60 p-4 rounded-2xl mb-5">
            <p>{message.id}</p>
            <h3>{message.subject}</h3>
            <h5>{message.name}</h5>
            <p>от: {message.email}</p>
            <span>сообщение: {message.message}</span>
          </div>
        )
      })}
      <button
        onClick={() =>
          handleReplyMessage(
            "423065da-f98d-4aa0-9da0-89b3aedfaf27",
            "Тапсай сен бырыншы далбан"
          )
        }
      >
        Ответить на тестовое сообщение
      </button>
    </div>
  );
};

export default MessageManage;
