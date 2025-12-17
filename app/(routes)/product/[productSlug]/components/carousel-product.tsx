/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { ProductType } from "@/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface CarouselProductProps {
  products: ProductType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const CarouselProduct = ({ products, activeIndex, setActiveIndex }: CarouselProductProps) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-lg mx-auto sm:px-0 space-y-4">
      {/* Botón volver */}
    <Button
        onClick={() => router.back()}
        className="text-sm bg-amber-600 hover:bg-amber-500 dark:text-white dark:bg-sky-600  dark:hover:bg-sky-500"
      >
        ⬅️Volver a la categoria
      </Button>

      {/* Carrusel */}
      <Carousel opts={{ loop: true }} className="w-full relative">
        <CarouselContent className="w-full">
          {products.map((product, index) => (
            <CarouselItem
              key={product.id}
              className={`flex justify-center items-center p-2 transition-opacity duration-300 ${
                index === activeIndex ? "opacity-100" : "opacity-0 absolute"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0]?.attributes.url}`}
                alt={product.attributes.productName}
                className="w-full h-80 sm:h-[420px] object-cover rounded-2xl shadow-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicador */}
      <div className="text-center text-xs text-gray-500">
        {activeIndex + 1} de {products.length}
      </div>
    </div>
  );
};

export default CarouselProduct;

