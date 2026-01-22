/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./ui/skeletonSchema";
import { ProductType } from "@/types/product";
import { Card } from "./ui/card";
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import FavoriteButton from "@/components/favorites/favorite-button";

const FeaturedProducts = () => {
  const { result, loading }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();

  return (
    <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="text-xl sm:text-3xl font-bold text-center px-6 uppercase tracking-wider text-slate-900 dark:text-white sm:mt-1 pb-8">
        Productos{" "}
        <span className="text-amber-500 dark:text-sky-500 ml-1">
          destacados
        </span>
      </h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {Array.isArray(result) &&
            result.map((product: ProductType) => {
              const { attributes, id } = product;
              const { slug, images, productName, tipoProducto, tipoCabello } =
                attributes;

              const variantCount = Array.isArray(attributes.variants?.data)
                ? attributes.variants?.data.length
                : 0;
              const hasVariants = variantCount > 0;
              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card
                      className="
                        border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 shadow-none h-full 
                        flex flex-col overflow-hidden rounded-lg 
                        transition-all duration-300 hover:shadow-xl hover:scale-[1.015] cursor-pointer
                      "
                    >
                      {/* Imagen */}
                      <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
                            images?.data?.[0]?.attributes?.url ?? ""
                          }`}
                          alt={productName ?? "Imagen Destacada"}
                          className="w-full h-full object-cover"
                        />

                        {/* Íconos flotantes */}
                        <div
                          className="
                            absolute bottom-4 w-full flex justify-center gap-x-3 px-4
                            opacity-100 md:opacity-0 md:group-hover:opacity-100
                            translate-y-0 md:translate-y-2 md:group-hover:translate-y-0
                            scale-100 md:scale-95 md:group-hover:scale-100
                            transition-all duration-300 ease-out
                          "
                        >
                          {/* Expandir */}
                          <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={
                                <Expand className="w-6 h-6 sm:w-6 sm:h-6 md:w-6 md:h-6 cursor-pointer text-gray-600" />
                              }
                            />
                          </div>

                          {/* Favorito */}
                          {!hasVariants && (
                            <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                              <FavoriteButton product={product} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-4 py-4 flex flex-col gap-3 flex-1 justify-between">
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {productName}
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          <p className="text-xs rounded-full px-3 py-1 bg-black text-white border border-black dark:bg-white dark:text-black">
                            {tipoProducto}
                          </p>
                          <p className="text-xs rounded-full px-3 py-1 bg-yellow-900 text-white border border-yellow-900 dark:bg-sky-800 dark:border-sky-800">
                            {tipoCabello}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
