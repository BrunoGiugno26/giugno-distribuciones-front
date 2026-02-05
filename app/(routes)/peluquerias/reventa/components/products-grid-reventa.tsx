"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/(routes)/category/components/product-card";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import { useGetReventaProducts } from "@/api/useGetReventaProduct";
import { REVENTA_VIEW } from "@/config/productViewContexts";

type Props = {
  filterBrand: string;
  filterTipoProducto: string;
};

const ProductsGridReventa = ({ filterBrand, filterTipoProducto }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const viewContext = REVENTA_VIEW
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);
  const [page, setPage] = useState(initialPage);

  const [isFromUrl, setIsFromUrl] = useState(true);

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
    router.replace(qs ? `?${qs}` : "?");
  };

  useEffect(() => {
    const newBrand = searchParams.get("brand") ?? "";
    const newTipo = searchParams.get("tipoProducto") ?? "";
    const newPage = parseInt(searchParams.get("page") ?? "1", 10);

    setIsFromUrl(true);

    if (newBrand !== filterBrand) {
    }
    if (newTipo !== filterTipoProducto) {
    }

    if (newPage !== page) setPage(newPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, filterTipoProducto]);

  const {
    result: products,
    loading,
    error,
    meta,
  } = useGetReventaProducts(
    {
      marca: filterBrand,
      tipoProducto: filterTipoProducto,
    },
    page,
    12,
  );

  return (
    <section>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewContext={viewContext}
            />
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
            onPageChange={(newPage) => {
              setPage(newPage);
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

export default ProductsGridReventa;
