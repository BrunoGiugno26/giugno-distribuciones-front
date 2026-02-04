"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/ui/skeletonSchema";
import ProductCard from "../components/product-card";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import { toast } from "sonner";

// Detecta si la categoría usa el sistema nuevo
const useNewTipoSystem = (slug: string) => {
  return [
    "accesorios",
    "accesorios-y-herramientas-profesionales",
    "muebles",
    "reventa",
    "particular",
  ].includes(slug);
};

export default function Page() {
  const { categorySlug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cleanSlug = categorySlug as string;
  const isNewSystem = useNewTipoSystem(cleanSlug);

  const initialBrand = searchParams.get("brand") ?? "";
  const initialTipo = searchParams.get("tipoProducto") ?? "";
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [filterBrand, setFilterBrand] = useState(initialBrand);
  const [filterTipoProducto, setFilterTipoProducto] = useState(initialTipo);
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

  // Resetear página cuando cambian filtros
  useEffect(() => {
    const newBrand = searchParams.get("brand") ?? "";
    const newTipo = searchParams.get("tipoProducto") ?? "";
    const newPage = parseInt(searchParams.get("page") ?? "1", 10);

    setIsFromUrl(true);

    if (newBrand !== filterBrand) setFilterBrand(newBrand);
    if (newTipo !== filterTipoProducto) setFilterTipoProducto(newTipo);
    if (newPage !== page) setPage(newPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (isFromUrl) {
      setIsFromUrl(false);
      return;
    }
    updateUrl({
      brand: filterBrand,
      tipoProducto: filterTipoProducto,
      page: 1,
    });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand, filterTipoProducto]);

  const { result, loading, meta } = useGetCategoryProduct(
    cleanSlug,
    { marca: filterBrand, tipoProducto: filterTipoProducto },
    page,
    12,
  );

  const products = Array.isArray(result) ? result : [];

  const filtrosActivos = !!filterBrand || !!filterTipoProducto;

  const handleClearFilters = () => {
    setFilterBrand("");
    setFilterTipoProducto("");
    setPage(1);
    updateUrl({ page: 1 });

    toast.info("Filtros quitados", {
      description: "Se muestran todos los productos nuevamente.",
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {products.length > 0 && !loading && (
        <section className="text-center">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-sky-500 to-amber-500 bg-clip-text text-transparent uppercase tracking-wider">
            {products[0].attributes.category.data.attributes.categoryName}
          </h1>
          <p className="text-gray-500 mt-2">
            Descubre nuestra selección de productos de esta categoría
          </p>
        </section>
      )}
      <Separator />
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6 max-h-[600px] overflow-y-auto">
          <FiltersControlsCategory
            brandValue={filterBrand}
            tipoValue={filterTipoProducto}
            isNewSystem={isNewSystem}
            categorySlug={cleanSlug}
            setFilterBrand={(brand) => {
              setFilterBrand(brand);
              setPage(1);
              updateUrl({
                brand,
                tipoProducto: filterTipoProducto,
                page: 1,
              });

              toast.success("Filtro de marca aplicado", {
                description: brand ? `Marca: ${brand}` : "Todas las marcas",
              });
            }}
            setFilterTipoProducto={(tipo) => {
              setFilterTipoProducto(tipo);
              setPage(1);
              updateUrl({
                brand: filterBrand,
                tipoProducto: tipo,
                page: 1,
              });
              toast.success("Filtro de tipo aplicado", {
                description: tipo ? `Tipo: ${tipo}` : "Todos los tipos",
              });
            }}
          />
        </aside>
        {/* Productos */}{" "}
        <section className="flex-1 space-y-6">
          {" "}
          {/* Filtros activos */}{" "}
          {filtrosActivos && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 flex flex-wrap items-center justify-between">
              {" "}
              <div className="space-y-1">
                {" "}
                {filterBrand && (
                  <p>
                    {" "}
                    Marca: <strong>{filterBrand}</strong>{" "}
                  </p>
                )}{" "}
                {filterTipoProducto && (
                  <p>
                    {" "}
                    Tipo: <strong>{filterTipoProducto}</strong>{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <button
                onClick={handleClearFilters}
                className="px-3 py-1 bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded hover:bg-amber-600"
              >
                {" "}
                Quitar filtros{" "}
              </button>{" "}
            </div>
          )}{" "}
          {/* Grid */}{" "}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {" "}
            {loading && <SkeletonSchema grid={4} />}{" "}
            {products.map((product) => (
              <div
                key={product.id}
                className="transition-shadow duration-200 hover:shadow-xl hover:border-amber-500 rounded-lg"
              >
                {" "}
                <ProductCard
                  product={product}
                  showPrice={cleanSlug !== "reventa"}
                />
              </div>
            ))}
            {!loading && products.length === 0 && (
              <p className="text-amber-600 dark:text-sky-600 text-center mt-6 col-span-full">
                No se encontraron productos
              </p>
            )}
          </div>
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
                    tipoProducto: filterTipoProducto,
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
      </div>{" "}
    </main>
  );
}
