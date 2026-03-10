import { FAQType } from "@/types/soluciones";
import BlocksRenderer from "./BlocksRenderer";
import { useState } from "react";

export default function FAQs({ faqs }: { faqs: FAQType[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 dark:bg-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-slate-200">{faq.pregunta}</span>
                  <span className="text-gray-500 dark:text-slate-400 text-xl">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 dark:text-slate-300">
                    <BlocksRenderer blocks={faq.respuesta} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
