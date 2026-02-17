"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const dataCarouselMueblesPro = [
  {
    id: 1,
    title: "Muebles Profesionales para Salones",
    imageUrl: "/muebles-pro-banner-1.jpg",
  },
  {
    id: 2,
    title: "Equipamiento Premium para tu peluquería",
    imageUrl: "/muebles-pro-banner-2.jpg",
  },
  {
    id: 3,
    title: "Sillones, Mesas y Más",
    imageUrl: "/muebles-pro-banner-3.jpg",
  },
];

const CarouselBannerMueblesPro = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <Carousel
        className="w-full max-w-7xl mx-auto p-4 bg-white dark:bg-gray-900"
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {dataCarouselMueblesPro.map(({ id, title, imageUrl }) => (
            <CarouselItem key={id} className="cursor-default">
              <Card className="shadow-xl border-none rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      priority={id === 1}
                      sizes="100vw"
                      className="object-cover object-center"
                    />

                    <div className="absolute left-4 bg-black/50 text-white px-4 py-2 rounded-lg border-4">
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
};

export default CarouselBannerMueblesPro;
