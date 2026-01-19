"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/ui/skeletonSchema";
import ProductCard from "../components/product-card";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;

  const [filterBrand, setFilterBrand] = useState("");
  const [filterTipoProducto, setFilterTipoProducto] = useState("");
  const [page, setPage] = useState(1);

  // ✅ Resetear página solo si no está en 1
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, filterTipoProducto]);

  const { result, loading, meta } = useGetCategoryProduct(
    categorySlug as string,
    { marca: filterBrand, tipoProducto: filterTipoProducto },
    page,
    12
  );

  const products = Array.isArray(result) ? result : [];

  return (
    <div className="max-w-7xl p-4 mx-auto sm:py-16 sm:px-12">
      {products.length > 0 && !loading && (
        <h1 className="text-xl sm:text-3xl font-bold text-center mb-8 uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Sección{" "}
          <span className="text-amber-500 dark:text-sky-500 block sm:inline-block">
            {products[0].attributes.category.data.attributes.categoryName}
          </span>
        </h1>
      )}

      <Separator />

      <div className="flex flex-col lg:flex-row mt-10 gap-8">
        {/* Filtros */}
        <div className="w-full lg:w-64 shrink-0">
          <FiltersControlsCategory
            setFilterBrand={setFilterBrand}
            setFilterTipoProducto={setFilterTipoProducto}
          />
        </div>

        {/* Productos */}
        <div className="flex-1">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <SkeletonSchema grid={3} />}
            {products.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && !loading && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No se encontraron productos con este filtro.
              </div>
            )}
          </div>

          {/* Paginador */}
          {meta && meta.pageCount > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: meta.pageCount }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded ${
                    page === num
                      ? "bg-amber-500 text-black dark:bg-sky-600 dark:text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                disabled={page === meta.pageCount}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

