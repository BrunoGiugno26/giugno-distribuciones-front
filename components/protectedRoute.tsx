"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div className="p-10 text-center">Verificando sesión...</div>;
  }

  if (!userId) {
    return null; // mientras redirige
  }

  return <>{children}</>;
}



