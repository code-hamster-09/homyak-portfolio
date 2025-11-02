"use client";

import { useEffect, useRef } from "react";
import { Input } from "./input";

export const AdminModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current?.focus();
  }, []);

  if (!isOpen) return null;

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
          autoFocus
        />
      </div>
    </div>
  );
};
