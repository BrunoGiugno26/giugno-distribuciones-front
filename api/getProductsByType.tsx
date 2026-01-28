import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { PaginationMeta } from "@/types/response";

type Filters = {
  marca?: string;
  tipoProducto?: string,
  precioMin?: number;
  precioMax?: number;
  audience?: string;
};

export function useGetProductsByType(
  filters: Filters,
  page: number = 1,
  pageSize: number = 12
) {
  const filterArray: string[] = [];

  if (filters.tipoProducto) {
    filterArray.push(`filters[tipoProducto][$eq]=${encodeURIComponent (filters.tipoProducto)}`);
  }

  if (filters.marca) {
    filterArray.push(`filters[marca][$eq]=${encodeURIComponent(filters.marca)}`);
  }

  if (filters.precioMin !== undefined) {
    filterArray.push(`filters[price][$gte]=${filters.precioMin}`);
  }

  if (filters.precioMax !== undefined) {
    filterArray.push(`filters[price][$lte]=${filters.precioMax}`);
  }

  if (filters.audience) {
    filterArray.push(`filters[audience][$eq]=${filters.audience}`);
  }

  const filterString = filterArray.length > 0 ? `&${filterArray.join("&")}` : "";

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*${filterString}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;

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
          throw new Error(`Error al cargar datos: ${res.status} ${res.statusText}`);
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


