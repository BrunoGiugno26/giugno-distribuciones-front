"use client";

import { SolucionesPerfumeriasType } from "@/types/soluciones";
import BlocksRenderer from "./BlocksRenderer";

export default function HeroPerfumerias({ data }: {
  data: SolucionesPerfumeriasType["attributes"];
}) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { tituloHero, subtituloHero, bannerHero, textoCTA, linkCTA } = data;

  const banner =
    bannerHero?.data?.attributes?.url ||
    bannerHero?.data?.attributes?.formats?.large?.url;

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center py-24 px-6">
        
        <div className="flex flex-col gap-8 order-2 md:order-1">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {tituloHero}
          </h1>

          <div className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-lg">
            <BlocksRenderer blocks={subtituloHero} />
          </div>

          {textoCTA && (
            <a
              href={linkCTA}
              className="group relative inline-flex items-center justify-center bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-8 py-4 rounded-full w-fit overflow-hidden transition-all hover:pr-12 active:scale-95 shadow-xl dark:shadow-blue-900/20"
            >
              <span className="relative z-10 font-semibold">{textoCTA}</span>
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                →
              </span>
            </a>
          )}
        </div>

        <div className="relative order-1 md:order-2 flex justify-center">
          <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10"></div>
          
          <div className="w-full h-[400px] md:h-[550px] relative">
            {banner && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${backend}${banner}`}
                alt="Banner Perfumerías"
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-8 border-white dark:border-slate-800"
              />
            )}
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100 dark:border-slate-800">
               <p className="text-slate-900 dark:text-white font-bold text-lg">Distribución Directa</p>
               <p className="text-amber-600 dark:text-sky-500 text-sm font-medium">Stock garantizado</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}




