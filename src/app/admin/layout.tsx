"use client";

import AdminNavigation from "@/components/AdminNavigation";
import { toast } from "@/hooks/useToast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast({
          title: "Error",
          description: "Authorization required",
          variant: "destructive",
        });
        router.push("/");
        return;
      }
      fetch("/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          setIsAuth(res.authenticated);
          if (!res.authenticated) {
            router.push("/");
            toast({
              title: "Error",
              description: "Authorization required",
              variant: "destructive",
            });
            return;
          }
        });
    } catch (error) {
      router.push("/");
      console.error(error);
    }
  }, [router]);
  if (isAuth)
    return (
      <div className="px-20 py-8 space-y-4">
        <div>
          <Link
            href={"/"}
            className="text-text-primary hover:bg-transparent bg-transparent p-4"
          >
            ⬅ Home
          </Link>
        </div>
        <h1 className="text-text-primary text-4xl font-bold">
          Admin <span className="text-accent-purple text-glow">page</span>
        </h1>
        <p className="text-text-secondary max-w-lg">
          Content management and portfolio settings
        </p>
        <AdminNavigation />
        {children}
      </div>
    );
}
