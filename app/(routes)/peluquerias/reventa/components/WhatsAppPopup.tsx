"use client";
import Link from "next/link";
import { useEffect } from "react";

type WhatsAppPopupProps = {
  productName?: string; // opcional, para usar en ProductCard
  onClose: () => void;  // callback para cerrar el popup
};

export default function WhatsAppPopup({ productName, onClose }: WhatsAppPopupProps) {
  // 🔑 Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // cerrar al hacer click fuera
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl text-center w-[90%] sm:max-w-sm md:max-w-md"
        onClick={(e) => e.stopPropagation()} // evita cierre al click dentro
      >
        <h2 className="text-lg font-bold mb-2 text-green-600">Contactanos por WhatsApp</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Escribinos para recibir atención personalizada y lista profesional.
        </p>
        <Link
          href={`https://wa.me/549261XXXXXXX?text=Hola, quiero consultar${productName ? " por " + productName : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ir a WhatsApp para consultar"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
        >
          Ir a WhatsApp
        </Link>
        <button
          onClick={onClose}
          className="block mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
