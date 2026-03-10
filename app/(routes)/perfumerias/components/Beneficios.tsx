/* eslint-disable @next/next/no-img-element */
"use client";
import { BeneficioType } from "@/types/soluciones";

interface BeneficiosProps {
  beneficios: BeneficioType[];
}

export default function Beneficios({ beneficios }: BeneficiosProps) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!beneficios || beneficios.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-amber-600 dark:text-sky-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Nuestros Diferenciales
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Beneficios Exclusivos
          </h2>
          <div className="w-20 h-1.5 bg-amber-600 dark:bg-sky-600 rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((item: BeneficioType) => {
            const attrs = item.icono?.data?.attributes;
            const iconUrl = attrs?.url || attrs?.formats?.large?.url;

            return (
              <article
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-sky-900/20 flex flex-col"
              >
                {iconUrl && (
                  <div className="w-full relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <div className="aspect-[16/12] md:aspect-[16/11] w-full">
                      <img
                        src={`${backend}${iconUrl}`}
                        alt={item.titulo}
                     
                        className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-slate-900/80 pointer-events-none" />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow relative z-10 bg-white dark:bg-slate-900">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-sky-500 transition-colors">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[16px] flex-grow">
                    {item.descripcion}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="w-10 h-1 bg-amber-200 dark:bg-sky-900 group-hover:w-full group-hover:bg-amber-500 dark:group-hover:bg-sky-500 transition-all duration-700 rounded-full"></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
