import { ProductType } from "@/types/product";
import { PaginationMeta } from "@/types/response";
import { useEffect, useState } from "react";

export function useGetProfesionalProducts(
  filters: { marca?: string; tipoProducto?: string },
  page: number = 1,
  pageSize: number = 12,
) {
  const filterArray: string[] = [];

  if (filters.tipoProducto) {
    filterArray.push(
      `filters[tipo_productos][slug][$eq]=${encodeURIComponent(filters.tipoProducto)}`,
    );
  }

  if (filters.marca) {
    filterArray.push(
      `filters[marca][$eq]=${encodeURIComponent(filters.marca)}`,
    );
  }

  filterArray.push(`filters[esProfesional][$eq]=true`);

  const filterString =
  filterArray.length > 0 ? `&${filterArray.join("&")}` : "";

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}${filterString}&sort=createdAt:desc`;

  const [result, setResult] = useState<ProductType[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            if(!res.ok) throw new Error(`Error: ${res.status}`);
            const json = await res.json();
            setResult(json.data);
            setMeta(json.meta.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false)
        }
    })()
  },[url])

  return { loading, result, error, meta}
}
