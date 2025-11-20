"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image"; 

export const dataCarouselTop = [
  {
    id: 1,
    title: "Belleza y Cuidado Del Cabello Para Todos",
    link: "#!",
    imageUrl: "/banner-1.png",
  },
  {
    id: 2,
    title: "Envios Gran Mendoza ",
    link: "#!",
    imageUrl: "/banner-2.png",
  },
  {
    id: 3,
    title: "Fechas Acordadas!",
    link: "#!",
    imageUrl: "/banner-3.png",
  },
  {
    id: 4,
    title: "Productos Exlusivos y muchos mas!!",
    link: "#!",
    imageUrl: "/banner-4.png",
  },
];

const CarouselImageBanner = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <Carousel
        className="w-full max-w-7xl mx-auto p-4" // Añadimos padding y ancho máximo
        plugins={[
          Autoplay({
            delay: 4000, // Tiempo de visualización de cada banner
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, imageUrl }) => (
            <CarouselItem
              key={id}
              onClick={() => router.push(link)}
              className="cursor-pointer"
            >
              <div>             
                <Card className="shadow-2xl border-none rounded-xl overflow-hidden transition duration-500 hover:shadow-orange-100/50 dark:hover:shadow-sky-900">                                
                  <CardContent className="p-0">               
                    <div className="relative w-full aspect-[1.5/1] sm:aspect-[2.5/1] bg-gray-100 dark:bg-gray-800">                          
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        priority={id === 1}
                        sizes="(max-width: 640px) 100vw, 1200px"
                        className="object-cover"
                      />                 
                    </div>              
                  </CardContent>            
                </Card>       
              </div>       
            </CarouselItem>
          ))}  
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default CarouselImageBanner;