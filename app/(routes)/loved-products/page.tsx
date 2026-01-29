"use client";

import { useFavoritesStore } from "@/store/favorites.store";
import ProductCard from "../category/components/product-card";
import ProtectedRoute from "@/components/protectedRoute";
import { Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState, useCallback} from "react";
import Pagination from "@/components/pagination/Pagination";

export default function LovedProductsPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const syncFavoritesFromBackend = useFavoritesStore((s) => s.syncFavoritesFromBackend);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔄 Sincronizar con backend al montar
  useEffect(() => {
    if (user?.id) {
      syncFavoritesFromBackend(user.id);
    }
  }, [user?.id, syncFavoritesFromBackend]);

  // 📍 Estado inicial desde URL
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);
  const [page, setPage] = useState(initialPage);
  const pageSize = 6;

  const updateUrl = useCallback((newPage: number) => {
    const query = new URLSearchParams();
    if (newPage > 1) query.set("page", String(newPage));
    const qs = query.toString();
    router.push(qs ? `?${qs}` : "?");
  }, [router]);

  const pageCount = Math.max(1, Math.ceil(favorites.length / pageSize));
  const safePage = Math.max(1, Math.min(page, pageCount));

  const paginatedFavorites = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return favorites.slice(start, end);
  }, [favorites, safePage, pageSize]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (page !== safePage) {
    setPage(safePage);
    updateUrl(safePage);
  }
}, [safePage, page, updateUrl]);


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

        {/* Vacío */}
        {favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Todavía no tienes productos favoritos.
            </p>
            <button
              onClick={() => router.push("/category/venta-minorista")}
              className="mt-6 px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            {/* Limpiar favoritos */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  if (user?.id) {
                    clearFavorites(user.id);
                    setPage(1);
                    updateUrl(1);
                  }
                }}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium cursor-pointer hover:bg-amber-500 transition-colors animate-pulse shadow-md hover:shadow-lg dark:bg-sky-600 dark:hover:bg-sky-400"
              >
                Limpiar favoritos
              </button>
            </div>

            {/* Grid paginado */}
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
              {paginatedFavorites.map((fav) => (
                <ProductCard key={fav.id} product={fav.product} />
              ))}
            </div>

            {/* Paginador + contador */}
            {favorites.length > pageSize && (
              <>
                <Pagination
                  page={safePage}
                  pageCount={pageCount}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                    updateUrl(newPage);
                  }}
                />
                <p className="text-sm text-gray-500 w-full text-center mt-2">
                  Página {safePage} de {pageCount} (Total: {favorites.length})
                </p>
              </>
            )}
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

