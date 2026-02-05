"use client";

import { useGetProductsByType } from "@/api/getProductsByType";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterBrand from "../../category/components/filter-brand";
import ProductCard from "../../category/components/product-card";
import SkeletonProductsGrid from "./components/SkeletonProductsGrid";
import PriceFilter from "./components/PriceFilter";
import { toast } from "sonner";
import Pagination from "@/components/pagination/Pagination";
import { PARTICULAR_VIEW, REVENTA_VIEW } from "@/config/productViewContexts";

const tipoMap: Record<string, string> = {
  shampoo: "Shampoo",
  acondicionador: "Acondicionador",
  "bano-de-crema": "Baño De Crema",
  ampollas: "Ampollas",
  "rep-puntas": "Reparador de Puntas",
  "tonicos-capilares": "Tónico Capilares",
  finalizadores: "Finalizador",
  decolorantes: "Decolorantes",
  tinturas: "Tinturas",
  "reveladores-oxidantes": "Reveladores Oxidantes",
  accesorios: "Accesorios",
};

export default function ProductTypePage() {
  const { tipoProducto } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isReventaView = searchParams.get("reventa") === "true";
  const viewContext = isReventaView ? REVENTA_VIEW : PARTICULAR_VIEW;

  const cleanTypeProduct = Array.isArray(tipoProducto)
    ? tipoProducto[0]
    : (tipoProducto ?? "");
  const tipoProductoReal = tipoMap[cleanTypeProduct] ?? cleanTypeProduct;

  //Inicializacion de estados desde URL

  const initialBrand = searchParams.get("brand") ?? "";
  const initialMin = searchParams.get("min");
  const initialMax = searchParams.get("max");
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [filterBrand, setFilterBrand] = useState(initialBrand);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: initialMin ? Number(initialMin) : undefined,
    max: initialMax ? Number(initialMax) : undefined,
  });

  const [page, setPage] = useState(initialPage);
  const pageSize = 12;

  const updateUrl = (params: {
    brand?: string;
    min?: number;
    max?: number;
    page?: number;
  }) => {
    const query = new URLSearchParams();

    if (params.brand && params.brand.trim() !== "")
      query.set("brand", params.brand);
    if (params.min !== undefined) query.set("min", String(params.min));
    if (params.max !== undefined) query.set("max", String(params.max));
    if (params.page && params.page > 1) query.set("page", String(params.page));

    const qs = query.toString();
    router.push(qs ? `?${qs}` : "?");
  };

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      updateUrl({
        brand: filterBrand,
        min: priceRange.min,
        max: priceRange.max,
        page: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, priceRange]);

  const {
    result: products,
    loading,
    error,
    meta,
  } = useGetProductsByType(
    {
      tipoProducto:tipoProductoReal,
      marca: filterBrand,
      precioMin: priceRange.min,
      precioMax: priceRange.max,
    },
    page,
    pageSize,
  );

  const filtrosActivos =
    !!filterBrand ||
    priceRange.min !== undefined ||
    priceRange.max !== undefined;

  const handleApplyPrice = (range: { min?: number; max?: number }) => {
    setPriceRange(range);
    setPage(1);
    updateUrl({ brand: filterBrand, min: range.min, max: range.max, page: 1 });
    toast.success("Filtro de precio aplicado", {
      description: `Rango: ${range.min ?? "mínimo"} - ${range.max ?? "máximo"}`,
    });
  };

  const handleBrandChange = (brand: string) => {
    setFilterBrand(brand);
    setPage(1);
    updateUrl({ brand, min: priceRange.min, max: priceRange.max, page: 1 });
    toast.success("Filtro de marca aplicado", {
      description: brand ? `Marca: ${brand}` : "Todas las marcas",
    });
  };

  const handleClearFilters = () => {
    setFilterBrand("");
    setPriceRange({});
    setPage(1);
    updateUrl({ page: 1 });
    toast.info("Filtros quitados", {
      description: "Se muestran todos los productos nuevamente.",
    });
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent">
            {tipoProductoReal}
          </h1>
          <p className="text-gray-500 mt-2">
            Descubre nuestra selección de {tipoProductoReal.toLowerCase()}{" "}
            profesionales
          </p>
        </section>
        <SkeletonProductsGrid />
      </main>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error al cargar productos: {error}
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent">
          {tipoProductoReal}
        </h1>
        <p className="text-gray-500 mt-2">
          Descubre nuestra selección de {tipoProductoReal.toLowerCase()}{" "}
          profesional
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Panel lateral de filtros */}
        <aside className="w-full lg:w-64 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Filtrar por marca</h2>
            <FilterBrand
              value={filterBrand}
              setFilterBrand={handleBrandChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Filtrar por precio</h2>
            <PriceFilter setPriceRange={handleApplyPrice} />
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          {filtrosActivos && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 flex flex-wrap items-center justify-between">
              <div className="space-y-1">
                {filterBrand && (
                  <p>
                    Marca: <strong>{filterBrand}</strong>
                  </p>
                )}
                {(priceRange.min !== undefined ||
                  priceRange.max !== undefined) && (
                  <p>
                    Precio:{" "}
                    <strong>
                      {priceRange.min !== undefined
                        ? `$${priceRange.min}`
                        : "mínimo"}{" "}
                      -{" "}
                      {priceRange.max !== undefined
                        ? `$${priceRange.max}`
                        : "máximo"}
                    </strong>
                  </p>
                )}
              </div>
              <button
                onClick={handleClearFilters}
                className="px-3 py-1 bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded hover:bg-amber-600"
              >
                Quitar filtros
              </button>
            </div>
          )}

          {/* Grid de productos */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="transition-shadow duration-200 hover:shadow-xl hover:border-amber-500 rounded-lg"
                >
                  <ProductCard product={product}
                  viewContext={viewContext}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-amber-600 dark:text-sky-600 text-center mt-6">
              No se encontraron productos
            </p>
          )}

          {/* Paginado */}
          {meta && meta.pageCount > 1 && (
          <>
          <Pagination
          page={page}
          pageCount={meta.pageCount}
          onPageChange={(newPage) => {
            setPage(newPage);
            updateUrl({
              brand: filterBrand,
              min: priceRange.min,
              max: priceRange.max,
              page: newPage,
            });
          }}
          />
          <p className="text-sm text-gray-500 w-full text-center mt-2">
            Página {meta.page} de {meta.pageCount} (Total: {meta.total})
          </p>
          </>
          )}
        </section>
      </div>
    </main>
  );
}
