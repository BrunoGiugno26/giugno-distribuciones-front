import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

type Filters = {
  marca?: string;
  tipoProducto?: string;
};

type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

const useNewTipoSystem = (slug:string) =>{
  return ["accesorios", "accesorios-y-herramientas-profesionales","muebles","reventa","particular"].includes(slug);
};

export function useGetCategoryProduct(
  slug: string | string[],
  filters: Filters,
  page: number = 1,
  pageSize: number = 12
) {
  const cleanSlug = Array.isArray(slug) ? slug[0] : slug;
  const isNewSystem = useNewTipoSystem(cleanSlug)
  const filterArray: string[] = [];

  if (filters.tipoProducto) {
    const encodedType = encodeURIComponent(filters.tipoProducto);
   
    if (isNewSystem) {
      filterArray.push(`filters[tipo_productos][slug][$eq]=${encodedType}`

      )
    } else {
      filterArray.push(
        `filters[tipoProducto][$eq]=${encodedType}`
      )
    }
  }
    
  if (filters.marca) {
    const encodedMarca = encodeURIComponent(filters.marca);
    filterArray.push(`filters[marca][$eq]=${encodedMarca}`);
  }

  const additionalFilters =
    filterArray.length > 0 ? `&${filterArray.join("&")}` : "";

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${cleanSlug}${additionalFilters}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

  const [result, setResult] = useState<ProductType[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Error al cargar datos:${res.status} ${res.statusText}`
          );
        }
        const json = await res.json();
        setResult(json.data);
        setMeta(json.meta.pagination as PaginationMeta);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error, meta };
}
