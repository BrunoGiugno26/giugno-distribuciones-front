"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const dataCarouselReventa = [
  {
    id: 1,
    title: "Productos Exclusivos para Peluquerías",
    imageUrl: "/reventa-banner-1.png",
  },
  {
    id: 2,
    title: "Consultá Precios Mayoristas por WhatsApp",
    imageUrl: "/reventa-banner-2.png",
  },
  {
    id: 3,
    title: "Stock Garantizado para tu Salón",
    imageUrl: "/reventa-banner-3.png",
  },
];

const CarouselImageBannerReventa = () => (
  <div className="w-full bg-white dark:bg-gray-900">
    <Carousel
      className="w-full max-w-7xl mx-auto p-4"
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {dataCarouselReventa.map(({ id, title, imageUrl }) => (
          <CarouselItem key={id} className="cursor-default">
            <Card className="shadow-xl border-none rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full aspect-[2.5/1] bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority={id === 1}
                    sizes="(max-width:640px) 100vw, 1200px"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
                    <h2 className="text-lg font-bold">{title}</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
);

export default CarouselImageBannerReventa;
