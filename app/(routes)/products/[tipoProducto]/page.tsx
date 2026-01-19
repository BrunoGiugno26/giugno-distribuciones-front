"use client";

import { useGetProductsByType } from "@/api/getProductsByType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterBrand from "../../category/components/filter-brand";
import ProductCard from "../../category/components/product-card";
import SkeletonProductsGrid from "./components/SkeletonProductsGrid";
import PriceFilter from "./components/PriceFilter";
import { toast } from "sonner";

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
  const cleanTypeProduct = Array.isArray(tipoProducto)
    ? tipoProducto[0]
    : tipoProducto ?? "";
  const tipoProductoReal = tipoMap[cleanTypeProduct] ?? cleanTypeProduct;

  const [filterBrand, setFilterBrand] = useState("");
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>(
    {}
  );

  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, priceRange]);

  const {
    result: products,
    loading,
    error,
    meta,
  } = useGetProductsByType(
    tipoProductoReal,
    {
      marca: filterBrand,
      precioMin: priceRange.min,
      precioMax: priceRange.max,
    },
    page,
    pageSize
  );

  const filtrosActivos =
    !!filterBrand ||
    priceRange.min !== undefined ||
    priceRange.max !== undefined;

  const handleApplyPrice = (range: { min?: number; max?: number }) => {
    setPriceRange(range);
    const minTxt = range.min !== undefined ? `$${range.min}` : "mínimo";
    const maxTxt = range.max !== undefined ? `$${range.max}` : "máximo";
    toast.success("Filtro de precio aplicado", {
      description: `Rango: ${minTxt} - ${maxTxt}`,
    });
  };

  const handleBrandChange = (brand: string) => {
    setFilterBrand(brand);
    toast.success("Filtro de marca aplicado", {
      description: brand ? `Marca: ${brand}` : "Todas las marcas",
    });
  };

  const handleClearFilters = () => {
    setFilterBrand("");
    setPriceRange({});
    toast.info("Filtros quitados", {
      description: "Se muestran todos los productos nuevamente.",
    });
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () =>
    setPage((p) => (meta ? Math.min(meta.pageCount, p + 1) : p));
  const goTo = (num: number) => setPage(num);

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
                  <ProductCard product={product} />
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
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                disabled={page === 1}
                onClick={goPrev}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: meta.pageCount }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => goTo(num)}
                    className={`px-3 py-1 rounded ${
                      page === num
                        ? "bg-amber-500 text-black dark:bg-sky-600 dark:text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                disabled={page === meta.pageCount}
                onClick={goNext}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                →
              </button>
              <p className="text-sm text-gray-500 w-full text-center mt-2">
                Página {meta.page} de {meta.pageCount} (Total: {meta.total})
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
