"use client";

import { useGetProductsByType } from "@/api/getProductsByType";
import { useEffect, useState } from "react";
import ProductCard from "@/app/(routes)/category/components/product-card";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";

type Props = {
  filterBrand: string;
  filterTipoProducto: string;
};

const ProductsGridReventa = ({ filterBrand, filterTipoProducto }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);
  const [page, setPage] = useState(initialPage);
  const pageSize = 12;

  const {
    result: products,
    loading,
    error,
    meta,
  } = useGetProductsByType(
    {
      audience: "peluquerias",
      marca: filterBrand || undefined,
      tipoProducto: filterTipoProducto || undefined,
    },
    page,
    pageSize,
  );

  const updateUrl = (newPage: number) => {
    const query = new URLSearchParams();
    if (newPage > 1) query.set("page", String(newPage));
    router.push(`?${query.toString()}`);
  };

  useEffect(() => {
    updateUrl(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold">
            No se han encontrado productos que coincidan con el filtro
            seleccionado.
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
            onPageChange={(newPage) => setPage(newPage)}
          />
          <p className="text-sm text-gray-500 text-center mt-2">
            Página {meta.page} de {meta.pageCount} (Total: {meta.total})
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductsGridReventa;
