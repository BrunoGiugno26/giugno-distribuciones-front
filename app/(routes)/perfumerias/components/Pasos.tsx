"use client";

import { PasoType } from "@/types/soluciones";

export default function Pasos({ pasos }: { pasos: PasoType[] }) {
  return (
    <section className="w-full bg-white dark:bg-slate-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Cómo funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {pasos?.map((item) => (
            <div key={item.numero}
              className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl font-extrabold text-gray-900 dark:text-white opacity-20 dark:opacity-10">
                {item.numero}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
                {item.titulo}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
