"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./input";

export const AdminModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (!isOpen) return;
    if (inputRef.current) inputRef.current?.focus();
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "admin", password: inputValue }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("auth_token", res.token);
            router.push("/admin");
            onClose();
          })
          .catch((err) => {
            alert("Неверный пароль. Попробуйте еще раз." + err);
          });
        // if (inputValue === "admin123") {
        //   router.push("/admin")
        //   onClose();
        // } else {
        //   alert("Неверный пароль. Попробуйте еще раз.");
        // }
        setInputValue("");
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [isOpen, onClose, inputValue, router]);

  if (!isOpen) return;

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-accent-purple/40 backdrop-blur-xl p-4 rounded-3xl space-y-2 max-w-100 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Введите пароль</h2>
        <Input
          ref={inputRef}
          className="px-3 py-2 rounded-2xl border border-text-secondary/30 bg-text-secondary/20"
          type="password"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          autoFocus
        />
      </div>
    </div>
  );
};
