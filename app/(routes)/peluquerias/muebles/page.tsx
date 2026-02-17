"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CarouselBannerMueblesPro from "./components/carousel-banner-muebles";
import FiltersControlsMueblesPro from "./components/filters-controls-muebles";
import ProductsGridMueblesPro from "./components/products-grid-muebles";

const PageMueblesPro = () => {
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
            <CarouselBannerMueblesPro/>
        </section>

        <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64 shrink-0">
                <FiltersControlsMueblesPro
                filterBrand={filterBrand}
                setFilterBrand={setFilterBrand}
                filterTipoProducto={filterTipoProducto}
                setFilterTipoProducto={setFilterTipoProducto}
                />
            </div>

            <div className="flex-1 min-h-0">
                <ProductsGridMueblesPro
                filterBrand={filterBrand}
                filterTipoProducto={filterTipoProducto}
                />
            </div>
        </div>
    </main>
  )
};

export default PageMueblesPro;
