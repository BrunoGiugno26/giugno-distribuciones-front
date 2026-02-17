"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CarouselBannerAccesoriosPro from "./components/carousel-banner-accesorios";
import FiltersControlsAccesoriosPro from "./components/filters-controls-accesorios";
import ProductsGridAccesoriosPro from "./components/products-grid-accesorios";

const PageAccesoriosPro = () => {
  const searchParams = useSearchParams();

  const [filterBrand, setFilterBrand] = useState(
    searchParams.get("brand") ?? "",
  );
  const [filterTipoProducto, setFilterTipoProducto] = useState(
    searchParams.get("tipoProducto") ?? "",
  );

  useEffect(() => {
    const newBrand = searchParams.get("brand") ?? "";
    const newTipo = searchParams.get("tipoProducto") ?? "";

    setFilterBrand((prev) => (prev === newBrand ? prev : newBrand));
    setFilterTipoProducto((prev) => (prev === newTipo ? prev : newTipo));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <section className="mb-8">
        <CarouselBannerAccesoriosPro />
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <FiltersControlsAccesoriosPro
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterTipoProducto={filterTipoProducto}
            setFilterTipoProducto={setFilterTipoProducto}
          />
        </div>

        <div className="flex-1 min-h-0">
          <ProductsGridAccesoriosPro
            filterBrand={filterBrand}
            filterTipoProducto={filterTipoProducto}
          />
        </div>
      </div>
    </main>
  );
};

export default PageAccesoriosPro;
