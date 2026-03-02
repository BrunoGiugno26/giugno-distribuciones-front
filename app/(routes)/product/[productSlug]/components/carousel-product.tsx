/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { ProductType } from "@/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

interface CarouselProductProps {
  products: ProductType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const CarouselProduct = ({
  products,
  activeIndex,
  setActiveIndex,
}: CarouselProductProps) => {
  const router = useRouter();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [zoomOpen, setZoomOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);


  // AUTOPLAY
  useEffect(() => {
    if (!carouselApi || isHovered) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselApi, isHovered]);

  const product = products[activeIndex];
  const images = product.attributes.images?.data ?? [];

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Botón volver */}
      <Button
        onClick={() => router.back()}
        className="text-sm rounded-full bg-amber-600 hover:bg-amber-500 dark:text-white dark:bg-sky-600 dark:hover:bg-sky-500"
      >
        ⬅️ Volver
      </Button>

      {/* Carrusel externo */}
      <Carousel opts={{ loop: true }} className="w-full relative">
        <CarouselContent className="w-full">
          {products.map((product, index) => {
            const imgs = product.attributes.images?.data ?? [];

            return (
              <CarouselItem
                key={product.id}
                className={`transition-opacity duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 absolute"
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  setActiveImageIndex(0);
                }}
              >
                <div className="w-full">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-slate-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  >

                    {/* Indicador */}
                    {imgs.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-30">
                        {activeImageIndex + 1} / {imgs.length}
                      </div>
                    )}

                    {/* Flecha izquierda */}
                    {imgs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          carouselApi?.scrollPrev();
                        }}
                        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}

                    {/* Flecha derecha */}
                    {imgs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          carouselApi?.scrollNext();
                        }}
                        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow hover:scale-110 transition"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}

                    {/* Carrusel interno */}
                    <Carousel
                      opts={{ loop: true }}
                      setApi={(api) => {
                        setCarouselApi(api);
                        api?.on("select", () => {
                          setActiveImageIndex(api.selectedScrollSnap());
                        });
                      }}
                    >
                      <CarouselContent>
                        {imgs.map((img) => (
                          <CarouselItem key={img.id}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${img.attributes.url}`}
                              alt={product.attributes.productName}
                              onClick={(e) => {
                                e.stopPropagation();
                                setZoomOpen(true);
                              }}
                              className="w-full h-full object-cover object-center transition-opacity duration-500 cursor-pointer"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    {/* Thumbnails */}
                    {imgs.length > 1 && (
                      <div className="flex justify-center gap-2 mt-3">
                        {imgs.map((img, i) => (
                          <button
                            key={img.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              carouselApi?.scrollTo(i);
                            }}
                            className={`w-14 h-14 rounded-lg overflow-hidden border transition ${
                              i === activeImageIndex
                                ? "border-amber-600 dark:border-sky-500"
                                : "border-gray-300 dark:border-gray-700 opacity-70"
                            }`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${img.attributes.url}`}
                              alt={`${product.attributes.productName} thumbnail ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Indicador global */}
      <div className="text-center text-sm text-amber-600 dark:text-sky-600">
        {activeImageIndex + 1} de {images.length}
      </div>

      {/* ZOOM MODAL */}
      {zoomOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]">
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images[activeImageIndex].attributes.url}`}
            alt={product.attributes.productName}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default CarouselProduct;

