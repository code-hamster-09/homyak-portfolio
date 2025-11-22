"use client";

import AdminNavigation from "@/components/AdminNavigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-20 space-y-4">
      <h1 className="text-text-primary text-4xl font-bold">
        Админ <span className="text-accent-purple text-glow">панель</span>
      </h1>
      <p className="text-text-secondary max-w-lg">
        Управление контентом и настройками портфолио.
      </p>
      <AdminNavigation />
      {children}
    </div>
  );
}
