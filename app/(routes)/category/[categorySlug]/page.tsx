"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/ui/skeletonSchema";
import ProductCard from "../components/product-card";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";

export default function Page() {
  const { categorySlug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialBrand = searchParams.get("brand") ?? "";
  const initialTipo = searchParams.get("tipoProducto") ?? "";
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [filterBrand, setFilterBrand] = useState(initialBrand);
  const [filterTipoProducto, setFilterTipoProducto] = useState(initialTipo);
  const [page, setPage] = useState(initialPage);

  const updateUrl = (params: {
    brand?: string;
    tipoProducto?: string;
    page?: number;
  }) => {
    const query = new URLSearchParams();

    if (params.brand && params.brand.trim() !== "")
      query.set("brand", params.brand);
    if (params.tipoProducto && params.tipoProducto.trim() !== "")
      query.set("tipoProducto", params.tipoProducto);
    if (params.page && params.page > 1) query.set("page", String(params.page));

    const qs = query.toString();
    router.push(qs ? `?${qs}` : "?");
  };

  // ✅ Resetear página solo si no está en 1
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      updateUrl({
        brand: filterBrand,
        tipoProducto: filterTipoProducto,
        page: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, filterTipoProducto]);

  const { result, loading, meta } = useGetCategoryProduct(
    categorySlug as string,
    { marca: filterBrand, tipoProducto: filterTipoProducto },
    page,
    12,
  );

  const products = Array.isArray(result) ? result : [];

  return (
    <div className="max-w-7xl p-4 mx-auto sm:py-16 sm:px-12">
      {products.length > 0 && !loading && (
        <h1 className="text-xl sm:text-3xl font-bold text-center mb-8 uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Categoría{" "}
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
            setFilterBrand={(brand) => {
              setFilterBrand(brand);
              setPage(1);
              updateUrl({ brand, tipoProducto: filterTipoProducto, page: 1 });
            }}
            setFilterTipoProducto={(tipo) => {
              setFilterTipoProducto(tipo);
              setPage(1);
              updateUrl({ brand: filterBrand, tipoProducto: tipo, page: 1 });
            }}
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
            <Pagination
              page={page}
              pageCount={meta.pageCount}
              onPageChange={(newPage) => {
                setPage(newPage);
                updateUrl({
                  brand: filterBrand,
                  tipoProducto: filterTipoProducto,
                  page: newPage,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
