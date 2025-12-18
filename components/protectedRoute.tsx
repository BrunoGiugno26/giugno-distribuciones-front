"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="p-10 text-center">Verificando sesión...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}




