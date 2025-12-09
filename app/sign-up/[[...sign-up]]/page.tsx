"use client";
import { SignUp, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    console.log("🧑‍💻 Cliente SignUp - isLoaded:", isLoaded);
    console.log("🧑‍💻 Cliente SignUp - isSignedIn:", isSignedIn);

    if (isLoaded && isSignedIn) {
      const raw = searchParams.get("redirect_url");
      console.log("🔗 Cliente SignUp - redirect_url (raw):", raw);

      const decoded = raw ? decodeURIComponent(raw) : "/";
      console.log("🔗 Cliente SignUp - redirect_url (decoded):", decoded);

      const destination = decoded.startsWith("/") ? decoded : "/";
      console.log("➡️ Cliente SignUp - redirigiendo a:", destination);

      router.push(destination);
    }
  }, [isLoaded, isSignedIn, router, searchParams]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (isSignedIn) return null;

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-white dark:bg-gray-900 pt-24 sm:pt-32">
      <div className="w-full max-w-screen-sm px-6 mb-8 sm:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 space-x-2 text-sm font-medium transition duration-200 rounded-lg shadow-md
          bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200
          dark:bg-sky-700 dark:text-white dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:border-sky-500"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Volver a la página anterior</span>
          <span className="sm:hidden">Volver</span>
        </button>
      </div>
      <SignUp
        routing="path"
        path="/sign-up"
        appearance={{
          elements: {
            card: "py-4 px-6 sm:py-6 sm:px-8",
            footerAction: "mt-2",
            form: "gap-y-3",
            headerTitle: "mb-2",
            formFieldRow: "mb-4",
          },
        }}
      />
    </div>
  );
}



