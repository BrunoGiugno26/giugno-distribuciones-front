/* eslint-disable @next/next/no-img-element */
"use client";

import Autoplay from "embla-carousel-autoplay";
import { SolucionesPerfumeriasType } from "@/types/soluciones";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type MarcasProps = {
  titulo: string;
  logos: SolucionesPerfumeriasType["attributes"]["logosMarcas"];
};

export default function Marcas({ titulo, logos }: MarcasProps) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!logos?.data || logos.data.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {titulo}
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest text-sm">
            ¡Marcas Que Potencian tu perfumería!
          </p>
          <div className="w-16 h-1.5 bg-amber-600 dark:bg-sky-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="w-full">
          <Carousel
            className="w-full"
            plugins={[ Autoplay({ delay: 3000 }) ]}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {logos.data.map((logo, index) => {
                const src = logo.attributes.url;

                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-4 md:pl-6 basis-full md:basis-1/3 lg:basis-1/4"
                  >
                    <article className="group relative w-full bg-white rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      
                      <div className="w-full aspect-[16/9] md:aspect-[3/2] overflow-hidden flex items-center justify-center bg-white">
                        <img
                          src={`${backend}${src}`}
                          alt={`Marca ${index}`}
                          // w-full y h-full con object-contain hace que ocupe todo el ancho posible sin cortarse
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}


