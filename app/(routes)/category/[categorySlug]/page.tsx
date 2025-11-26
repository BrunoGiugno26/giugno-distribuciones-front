// app/(routes)/category/[categorySlug]/page.tsx

"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "../components/filters-controls-category";
import SkeletonSchema from "@/components/ui/skeletonSchema";
import ProductCard from "../components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;

  const [filterBrand, setFilterBrand] = useState("");
  const [filterTipoProducto, setFilterTipoProducto] = useState("");

  const { result, loading }: ResponseType = useGetCategoryProduct(
    categorySlug as string,
    { marca: filterBrand, tipoProducto: filterTipoProducto }
  );
  const router = useRouter();

  const products = Array.isArray(result)
    ? (result as ProductType[])
    : ([] as ProductType[]);

  return (
    <div className="max-w-7xl p-4 mx-auto sm:py-16 sm:px-12">
      {products.length > 0 && !loading && (
        
        <h1 className="
            text-xl sm:text-3xl font-bold text-center mb-8 uppercase tracking-wider 
            text-slate-900 dark:text-slate-100">
          PRODUCTOS PARA{" "}
          
          {/* Usamos 'block' en móvil para forzar una nueva línea limpia, 
             y 'sm:inline-block' para volver a la línea en escritorio. */}
          <span className="text-amber-500 dark:text-sky-500 block sm:inline-block">
            {products[0].attributes.category.data.attributes.categoryName}
          </span>
        </h1>
      )}

      <Separator />

      <div className="flex flex-col lg:flex-row mt-10 gap-8">
        
        {/* Contenedor de Filtros (Barra Lateral) */}
        <div className="w-full lg:w-64 shrink-0">
          <FiltersControlsCategory
            setFilterBrand={setFilterBrand}
            setFilterTipoProducto={setFilterTipoProducto}
          />
        </div>

        {/* Contenedor de Productos */}
        <div className="flex-1">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <SkeletonSchema grid={3} />}
            
            {/* Renderizado de Productos */}
            {products.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Mensaje de No Encontrado */}
            {products.length === 0 && !loading && Array.isArray(result) && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg font-medium">
                  No se encontraron productos con este filtro.
                </p>
                <button
                  onClick={() => {
                    setFilterBrand("");
                    setFilterTipoProducto("");
                  }}
                  className="mt-4 text-sm text-amber-500 hover:underline dark:text-sky-500"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
