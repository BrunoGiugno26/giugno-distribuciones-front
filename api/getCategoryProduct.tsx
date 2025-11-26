// useGetCategoryProduct.ts

import { useEffect, useState } from "react";

type Filters = {
    marca?: string;
    tipoProducto?: string 
}

export function useGetCategoryProduct(slug:string|string[], filters: Filters){ 
    
    const filterArray = [];
    
    if (filters.tipoProducto) {
      const endcodedType = encodeURIComponent(filters.tipoProducto)
        filterArray.push(`filters[tipoProducto][$eq]=${endcodedType}`);
    }
    
    if (filters.marca) {
      const encodedMarca = encodeURIComponent(filters.marca);
        filterArray.push(`filters[marca][$eq]=${encodedMarca}`); 
    }
    
    const additionalFilters = filterArray.length > 0 ? `&${filterArray.join('&')}` : '';

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}${additionalFilters}`;
    
    
    const [result, setResult] = useState(null);
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