"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/(routes)/category/components/product-card";
import Pagination from "@/components/pagination/Pagination";
import { useGetAccesoriosProProducts } from "@/api/useGetAccesoriosProProducts";
import { PROFESIONAL_VIEW } from "@/config/productViewContexts";

type Props = {
  filterBrand: string;
  filterTipoProducto: string;
};

const ProductsGridAccesoriosPro = ({
  filterBrand,
  filterTipoProducto,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const viewContext = PROFESIONAL_VIEW;

  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);
  const [page, setPage] = useState(initialPage);
  const [isFromUrl, setIsFromUrl] = useState(true);

  const updateUrl = useCallback(
    (params: { brand?: string; tipoProducto?: string; page?: number }) => {
      const query = new URLSearchParams();

      if (params.brand && params.brand.trim() !== "")
        query.set("brand", params.brand);

      if (params.tipoProducto && params.tipoProducto.trim() !== "")
        query.set("tipoProducto", params.tipoProducto);

      if (params.page && params.page > 1)
        query.set("page", String(params.page));

      const qs = query.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    const newPage = parseInt(searchParams.get("page") ?? "1", 10);
    setIsFromUrl(true);
    if (newPage !== page) setPage(newPage);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, page]);

  useEffect(() => {
    if (isFromUrl) {
      setIsFromUrl(false);
      return;
    }

    setPage(1);
    updateUrl({
      brand: filterBrand,
      tipoProducto: filterTipoProducto,
      page: 1,
    });
  }, [filterBrand, filterTipoProducto, isFromUrl, updateUrl]);

  const {
    result: products,
    loading,
    error,
    meta,
  } = useGetAccesoriosProProducts(
    {
      marca: filterBrand,
      tipoProducto: filterTipoProducto,
    },
    page,
    12,
  );

  const handleClearFilters = () => {
    router.replace("?", { scroll: false });
  };

  // 🔥 FILTRO POR PRODUCTO DESDE EL BUSCADOR
  const productSlug = searchParams.get("product");
  const filteredProducts = productSlug
    ? products?.filter((p) => p.attributes.slug === productSlug)
    : products;

  return (
    <section>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {(filterBrand || filterTipoProducto) && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between mb-4">
          <div className="space-y-1">
            {filterBrand && (
              <p>
                Marca: <strong>{filterBrand}</strong>
              </p>
            )}
            {filterTipoProducto && (
              <p>
                Tipo: <strong>{filterTipoProducto}</strong>
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

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewContext={viewContext}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg front-semibold">
            No se han encontrado productos con los filtros seleccionados
          </p>
          <p className="text-sm mt-2">
            Probá cambiar la marca o el tipo de producto.
          </p>
        </div>
      )}

      {meta && meta.pageCount > 1 && (
        <div className="mt-6">
          <Pagination
            page={page}
            pageCount={meta.pageCount}
            onPageChange={(newPage) => {
              updateUrl({
                brand: filterBrand,
                tipoProducto: filterTipoProducto,
                page: newPage,
              });
            }}
          />
          <p className="text-sm text-gray-500 text-center mt-2">
            Página {meta.page} de {meta.pageCount} (Total: {meta.total})
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductsGridAccesoriosPro;
