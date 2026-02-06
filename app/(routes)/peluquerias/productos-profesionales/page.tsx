"use client";
import { useEffect, useState } from "react";
import CarouselBannerProfesional from "./components/carousel-banner-profesional";
import FiltersControlsProfesionales from "./components/filters-controls-profesionales";
import ProductsGridProfesionales from "./components/products-grid-profesionales";
import { useSearchParams } from "next/navigation";

const PageProductosProfesionales = () => {
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  setFilterBrand((prev) => {
    if (prev === newBrand) return prev;
    return newBrand;
  });

  setFilterTipoProducto((prev) => {
    if (prev === newTipo) return prev;
    return newTipo;
  });
}, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <section className="mb-8">
        <CarouselBannerProfesional />
      </section>
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <FiltersControlsProfesionales
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterTipoProducto={filterTipoProducto}
            setFilterTipoProducto={setFilterTipoProducto}
          />
        </div>
        <div className="flex-1">
          <ProductsGridProfesionales
            filterBrand={filterBrand}
            filterTipoProducto={filterTipoProducto}
          />
        </div>
      </div>
    </main>
  );
};
export default PageProductosProfesionales;
