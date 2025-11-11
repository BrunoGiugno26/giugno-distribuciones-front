"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
export const dataCarouselTop = [
  {
    id: 1,
    title: "Envios en gran Mendoza!",
    description: "Organiza tus pedidos con nosotros",
    link: "#!",
  },
  {
    id: 2,
    title: "Entregas con Fecha Acordadas!",
    description: "Trabajamos con giras logisticas fijas",
    link: "#!",
  },
  {
    id: 3,
    title: "Productos Exlusivos HAN - PROTENAT & THERAPHY y muchas mas!!",
    description:
      "Descubre la linea profesional para tu salon o negocio de reventa!!",
    link: "#!",
  },
  {
    id: 4,
    title: "Grandes ofertas en Compras Mayoristas!",
    description:
      "Obten hasta un 25% de descuento en pedidos a 10 cajas por volumen",
    link: "#!",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();
  return (
    <div className="bg-orange-200 dark:bg-secondary">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, description }) => (
            <CarouselItem
              key={id}
              onClick={() => router.push(link)}
              className="cursor-pointer"
            >
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-lg font-semibold text-wrap dark:text-sky-600">
                      {title}
                    </p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-white">
                      {description}
                    </p>
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

export default CarouselTextBanner;
