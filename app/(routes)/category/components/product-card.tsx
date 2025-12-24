/* eslint-disable @next/next/no-img-element */
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import IconButton from "@/components/icon-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import AddToCartButton from "@/components/cart/add-to-cart-icon";
import FavoriteButton from "@/components/favorites/favorite-button";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();

  type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const handleExpandClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    router.push(`/product/${product.attributes.slug}`);
  };

  return (
    <Link
      href={`/product/${product.attributes.slug}`}
      className="relative flex flex-col justify-between h-full p-3 transition-all duration-200 rounded-xl border border-transparent hover:border-slate-200 hover:shadow-xl bg-white dark:bg-slate-900 dark:hover:border-slate-700 group/card"
    >
      <div className="absolute top-4 px-2 left-2 right-2 flex flex-wrap gap-2 items-start justify-between">
        <p className="px-2 py-1 text-[10px] font-bold text-white bg-black rounded-full dark:bg-white dark:text-black w-fit uppercase tracking-wider">
          {product.attributes.tipoProducto}
        </p>
        {product.attributes.origin && (
          <p
            className="px-2 py-1 text-[10px] font-bold text-black bg-amber-300
          dark:bg-sky-500 rounded-full w-fit uppercase tracking-wider shadow-sm"
          >
            {product.attributes.origin}
          </p>
        )}
      </div>

      <Carousel opts={{ align: "start" }} className="w-full mx-auto">
        <CarouselContent>
          {Array.isArray(product.attributes.images?.data) && product.attributes.images.data.map((image) => (
            <CarouselItem key={image.id} className="group">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                  alt={product.attributes.productName}
                  className="object-cover w-full h-full p-0 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute w-full px-6 bottom-5 flex justify-center gap-x-3 
                  opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-200">
                  <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                    <IconButton
                      onClick={handleExpandClick as () => void}
                      icon={<Expand size={18} className="cursor-pointer text-gray-600" />}
                    />
                  </div>

                  <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                    <FavoriteButton product={product}/>
                  </div>
                  <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col items-center mt-4 space-y-1">
        <p
          className="text-base font-medium text-center line-clamp-1 text-slate-800 dark:text-slate-200"
          title={product.attributes.productName}
        >
          {product.attributes.productName}
        </p>
        <p className="font-bold text-lg text-center text-amber-600 dark:text-sky-400">
          {formatPrice(product.attributes.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
