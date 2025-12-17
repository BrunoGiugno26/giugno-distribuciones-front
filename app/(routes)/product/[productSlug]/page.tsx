"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import ProductInfo from "./components/product-info";

export default function Page() {
  const { productSlug } = useParams();
  const { result, loading, error } = useGetProductBySlug(productSlug ?? "");

  const [activeIndex, setActiveIndex] = useState(0);

  if (loading || result === null) {
    return <SkeletonProduct />;
  }

  const activeProduct = result[activeIndex];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 min-h-[60vh] mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex justify-center items-start">
          <CarouselProduct
            products={result}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <ProductInfo product={activeProduct} />
      </div>

      {error && (
        <p className="text-red-500 mt-6">
          Error al cargar el producto: {error}
        </p>
      )}
    </div>
  );
}
