"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type WhatsAppPopupProps = {
  productName?: string;
  onClose: () => void;
};

export default function WhatsAppPopup({ productName, onClose }: WhatsAppPopupProps) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Mensaje automático profesional
  const message = productName
    ? `Hola! Estoy interesado en el producto "${productName}". ¿Podrían brindarme más información sobre precio, disponibilidad y variantes?`
    : `Hola! Necesito asistencia con un producto o pedido. ¿Podrían brindarme más información?`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-[90%] sm:max-w-sm md:max-w-md overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* HEADER */}
          <div className="bg-[#0c7f36] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-GiugnoDistribuciones.jpeg"
                alt="Logo Giugno Distribuciones"
                width={200}
                height={200}
                className="w-14 h-14 rounded-full object-cover bg-white/20 p-1"
              />

              <div>
                <h3 className="font-semibold">Giugno Distribuciones</h3>
                <p className="text-xs text-white/80">Atención al cliente</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENSAJES */}
          <div className="p-4 space-y-4">
            {/* Burbuja 1 */}
            <div className="flex gap-2">
              <Image
                src="/logo-GiugnoDistribuciones.jpeg"
                alt="Logo Giugno Distribuciones"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full object-cover bg-[#25D366] p-1"
              />

              <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-md max-w-[80%]">
                <p className="text-sm">👋 ¡Hola! Gracias por comunicarte con nosotros.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Respondemos en pocos minutos.
                </p>
              </div>
            </div>

            {/* Burbuja 2 (solo si viene de un producto) */}
            {productName && (
              <div className="flex gap-2">
                <Image
                  src="/logo-GiugnoDistribuciones.jpeg"
                  alt="Logo Giugno Distribuciones"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full object-cover bg-[#25D366] p-1"
                />

                <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-md max-w-[80%]">
                  <p className="text-sm">
                    ¿Querés consultar por <strong>{productName}</strong>?
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`https://wa.me/5492612445460?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-center py-3 rounded-xl font-medium transition"
            >
              Iniciar chat de WhatsApp
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

