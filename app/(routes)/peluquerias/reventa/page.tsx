"use client"
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
      <FiltersControlReventa
        filterBrand={filterBrand}
        setFilterBrand={setFilterBrand}
        filterTipoProducto={filterTipoProducto}
        setFilterTipoProducto={setFilterTipoProducto}
      />
      <ProductsGridReventa
        filterBrand={filterBrand}
        filterTipoProducto={filterTipoProducto}
      />
    </main>
  );
}
