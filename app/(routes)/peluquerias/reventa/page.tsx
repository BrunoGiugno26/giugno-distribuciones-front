"use client";
import { useEffect, useState } from "react";
import CarouselImageBannerReventa from "./components/carousel-banner-reventa";
import FiltersControlReventa from "./components/filters-controls-reventa";
import ProductsGridReventa from "./components/products-grid-reventa";
import { useSearchParams } from "next/navigation";

export default function ReventaPage() {

  const searchParams = useSearchParams();

  const initialBrand = searchParams.get("brand") ?? "";
  const initialTipo = searchParams.get("tipoProducto") ?? "";

  const [filterBrand, setFilterBrand] = useState<string>(initialBrand);
  const [filterTipoProducto, setFilterTipoProducto] = useState<string>(initialTipo);

  useEffect(() => {
    const newBrand = searchParams.get("brand") ?? "";
    const newTipo = searchParams.get("tipoProducto") ?? "";

    Promise.resolve().then(() =>{
      if(newBrand !== filterBrand) setFilterBrand(newBrand);
      if(newTipo !== filterTipoProducto) setFilterTipoProducto(newTipo);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParams])
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
        <section className="flex-1">
          <ProductsGridReventa
            filterBrand={filterBrand}
            filterTipoProducto={filterTipoProducto}
          />
        </section>
      </div>
    </main>
  );
}
