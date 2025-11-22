"use client";

import { useHotkey } from "@/hooks/useHotkey";
import { createContext, useCallback, useContext, useState } from "react";
import { AdminModal } from "./modal";

const AdminContext = createContext({});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функции для управления состоянием
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // --- Использование: вот как вы вешаете действие на хоткей ---

  // Открытие модалки по 'Control+k' (Ctrl + K)
  useHotkey("Control+k+Alt", openModal);
  useHotkey("Control+л+Alt", openModal);

  // Закрытие модалки по 'Escape' (Esc)
  useHotkey("Escape", closeModal);

  return (
    <AdminContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <AdminModal isOpen={isModalOpen} onClose={closeModal} />
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  if (!AdminContext) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return useContext(AdminContext);
};
