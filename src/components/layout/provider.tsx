"use client";

import { AdminModal } from "@/components/layout/modal";
import { useHotkey } from "@/hooks/useHotkey";
import { store } from "@/store/store";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";
import { Provider } from "react-redux";

const AdminContext = createContext({});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  // state management function
  const openModal = useCallback(() => {
    fetch("/api/auth/check", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!!res.authenticated) {
          router.push("/admin/projects");
          return;
        } else {
          setIsModalOpen(true);
        }
      });
  }, [router]);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Open modal by (Ctrl + K + Alt)
  useHotkey("control+k+alt", openModal);
  useHotkey("control+л+alt", openModal);
  useHotkey("meta+k+shift", openModal);
  useHotkey("meta+л+shift", openModal);
  useHotkey("meta+k+alt", openModal);
  useHotkey("meta+л+alt", openModal);

  // Closing modal by Escape (Esc)
  useHotkey("Escape", closeModal);

  return (
    <AdminContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <Provider store={store}>
        {children}
        <AdminModal isOpen={isModalOpen} onClose={closeModal} />
      </Provider>
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  if (!AdminContext) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return useContext(AdminContext);
};
