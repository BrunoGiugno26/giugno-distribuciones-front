import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetProductBySlug(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Error al cargar datos:${res.status} ${res.statusText}`
          );
        }
        const json = await res.json();
        setResult(json.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { loading, result, error };
}
