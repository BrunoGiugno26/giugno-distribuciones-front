import { SolucionesPerfumeriasType } from "@/types/soluciones";
import { useEffect, useState } from "react";

export function useGetSolucionesPerfumerias() {
const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/soluciones-para-perfumeria?populate[bannerHero]=*&populate[logosMarcas]=*&populate[beneficios][populate][icono]=*&populate[pasos]=*&populate[faqs]=*`;

  const [result, setResult] = useState<SolucionesPerfumeriasType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Error al cargar datos: ${res.status} ${res.statusText}`,
          );
        }

        const json = await res.json();
        setResult(json.data as SolucionesPerfumeriasType);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { loading, result, error };
}
