"use client";

import { useFavoritesStore } from "@/store/favorites.store";
import ProductCard from "../category/components/product-card";
import ProtectedRoute from "@/components/protectedRoute";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LovedProductsPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center dark:text-white flex items-center justify-center gap-3">
          Productos favoritos ({favorites.length})
          <Heart className="w-8 h-8 text-amber-500 fill-red-500 dark:text-sky-500 animate-pulse" />
        </h1>

        {/* Subtítulo */}
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Aca encontrarás todos los productos que marcaste como favoritos.
        </p>

        {/* Si no hay favoritos */}
        {favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Todavía no tienes productos favoritos.
            </p>

            <button
              onClick={() => router.push("/productos")}
              className="mt-6 px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            {/* Botón limpiar favoritos */}
            <div className="flex justify-end mb-4">
              <button
                onClick={clearFavorites}
                className="text-sm text-red-500 hover:underline dark:text-red-400"
              >
                Limpiar favoritos
              </button>
            </div>

            {/* Grid de productos */}
            <div
              className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
                xl:grid-cols-6 
                gap-4 md:gap-6
              "
            >
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

