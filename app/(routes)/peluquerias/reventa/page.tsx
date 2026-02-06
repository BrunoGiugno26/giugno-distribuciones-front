"use client";
import { useEffect, useState } from "react";
import CarouselImageBannerReventa from "./components/carousel-banner-reventa";
import FiltersControlReventa from "./components/filters-controls-reventa";
import ProductsGridReventa from "./components/products-grid-reventa";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReventaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialBrand = searchParams.get("brand") ?? "";
  const initialTipo = searchParams.get("tipoProducto") ?? "";

  const [filterBrand, setFilterBrand] = useState<string>(initialBrand);
  const [filterTipoProducto, setFilterTipoProducto] =
    useState<string>(initialTipo);

  useEffect(() => {
    const newBrand = searchParams.get("brand") ?? "";
    const newTipo = searchParams.get("tipoProducto") ?? "";

    if (newBrand === filterBrand && newTipo === filterTipoProducto) return;

    Promise.resolve().then(() => {
      if (newBrand !== filterBrand) setFilterBrand(newBrand);
      if (newTipo !== filterTipoProducto) setFilterTipoProducto(newTipo);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClearFilters = () => {
    setFilterBrand("");
    setFilterTipoProducto("");

    const params = new URLSearchParams();
    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <CarouselImageBannerReventa />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64">
          <FiltersControlReventa
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterTipoProducto={filterTipoProducto}
            setFilterTipoProducto={setFilterTipoProducto}
          />
        </aside>

        <section className="flex-1 min-h-[600px]">
          <div className="space-y-6">
            {(filterBrand || filterTipoProducto) && (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <div className="space-y-1">
                  {filterBrand && (
                    <p>
                      Marca: <strong>{filterBrand}</strong>
                    </p>
                  )}
                  {filterTipoProducto && (
                    <p>
                      Tipo: <strong>{filterTipoProducto}</strong>
                    </p>
                  )}
                </div>

                <button
                  onClick={handleClearFilters}
                  className="px-3 py-1 bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded hover:bg-amber-600"
                >
                  Quitar Filtros
                </button>
              </div>
            )}

            <ProductsGridReventa
              filterBrand={filterBrand}
              filterTipoProducto={filterTipoProducto}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
