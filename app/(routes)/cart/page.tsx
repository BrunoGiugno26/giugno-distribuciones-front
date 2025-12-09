"use client";
import ProtectedRoute from "@/components/protectedRoute";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <div className="p-10 text-center">Este es tu carrito 🛒</div>
    </ProtectedRoute>
  );
}

