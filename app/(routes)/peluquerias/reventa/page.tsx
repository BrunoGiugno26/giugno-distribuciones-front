"use client";
import { useState } from "react";
import CarouselImageBannerReventa from "./components/carousel-banner-reventa";
import FiltersControlReventa from "./components/filters-controls-reventa";
import ProductsGridReventa from "./components/products-grid-reventa";

export default function ReventaPage() {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterTipoProducto, setFilterTipoProducto] = useState<string>("");
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
