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
import React, { useState, useEffect } from "react";
import AddToCartButton from "@/components/cart/add-to-cart-icon";
import FavoriteButton from "@/components/favorites/favorite-button";
import { useCartStore } from "@/store/cart-store";

type ProductCardProps = {
  product: ProductType;
  forceHasVariants?: boolean;
};

const ProductCard = ({ product, forceHasVariants }: ProductCardProps) => {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [showPopup, setShowPopup] = useState(false);

  type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const handleExpandClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    router.push(`/product/${product.attributes.slug}`);
  };

  const hasVariants =
    forceHasVariants ?? (product.attributes.variants?.data?.length ?? 0) > 0;

  const stockGeneral = product.attributes.stock ?? 0;

  const cartQuantity =
    items.find((i) => i.product.id === product.id && !i.variant)?.quantity ?? 0;

  const remaining = Math.max(stockGeneral - cartQuantity, 0);
  const isLowStock = remaining > 0 && remaining <= 3;

  const isPeluqueria =
    product.attributes.audience === "peluquerias"

  // 🔑 Cerrar popup con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative">
      <Link
        href={`/product/${product.attributes.slug}`}
        className="relative flex flex-col justify-between h-full p-3 transition-all duration-200 rounded-xl border border-transparent hover:border-slate-200 hover:shadow-xl bg-white dark:bg-slate-900 dark:hover:border-slate-700 group/card"
      >
        <div className="absolute top-4 px-2 left-2 right-2 flex flex-wrap gap-2 items-start justify-between">
          <p className="px-2 py-1 text-[10px] font-bold text-white bg-black rounded-full dark:bg-white dark:text-black w-fit uppercase tracking-wider">
            {product.attributes.tipoProducto}
          </p>
          {product.attributes.origin && (
            <p className="px-2 py-1 text-[10px] font-bold text-black bg-amber-300 dark:bg-sky-500 rounded-full w-fit uppercase tracking-wider shadow-sm">
              {product.attributes.origin}
            </p>
          )}
          {hasVariants && (
            <p className="px-2 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-full w-fit uppercase tracking-wider shadow-sm">
              Tiene variantes
            </p>
          )}
        </div>

        <Carousel opts={{ align: "start" }} className="w-full mx-auto">
          <CarouselContent>
            {Array.isArray(product.attributes.images?.data) &&
              product.attributes.images.data.map((image) => (
                <CarouselItem key={image.id} className="group">
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                      alt={product.attributes.productName}
                      className="object-cover w-full h-full p-0 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute w-full px-6 bottom-5 flex justify-center gap-x-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-200">
                      <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                        <IconButton
                          onClick={handleExpandClick as () => void}
                          icon={
                            <Expand
                              size={25}
                              className="cursor-pointer text-gray-600"
                            />
                          }
                        />
                      </div>

                      {!hasVariants && !isPeluqueria && (
                        <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                          <FavoriteButton product={product} />
                        </div>
                      )}

                      {!hasVariants && !isPeluqueria && (
                        <div className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-100">
                          <AddToCartButton product={product} />
                        </div>
                      )}
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

          {!isPeluqueria && (
            <p className="font-bold text-lg text-center text-amber-600 dark:text-sky-400">
              {formatPrice(product.attributes.price)}
            </p>
          )}

          {isPeluqueria && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
              aria-label="Consultar por WhatsApp"
            >
              Consultar por WhatsApp
            </button>
          )}

          {!isPeluqueria &&
            (hasVariants ? (
              <p className="text-sm text-center font-semibold text-amber-600 dark:text-sky-600">
                Variantes disponibles - ver en el detalle
              </p>
            ) : remaining > 0 ? (
              <>
                <p className="text-sm font-semibold text-green-600">En stock</p>
                {isLowStock && (
                  <p className="text-sm font-semibold text-red-500">
                    ¡Quedan solo {remaining} unidades!
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm font-semibold text-red-500">Sin stock</p>
            ))}
        </div>
      </Link>

      {/* Popup WhatsApp */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl text-center w-[90%] sm:max-w-sm">
            <h2 className="text-lg font-bold mb-2 text-green-600">
              ¿Querés consultar este producto?
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Escribinos por WhatsApp y te pasamos la lista profesional.
            </p>
            <a
              href={`https://wa.me/549261XXXXXXX?text=Hola, quiero consultar por ${product.attributes.productName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
            >
              Ir a WhatsApp
            </a>
            <button
              onClick={() => setShowPopup(false)}
              className="block mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;


