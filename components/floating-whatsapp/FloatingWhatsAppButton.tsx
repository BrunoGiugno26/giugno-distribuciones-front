"use client";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import WhatsAppPopup from "./WhatsAppPopup";

export default function FloatingWhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>
      {showPopup && <WhatsAppPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

