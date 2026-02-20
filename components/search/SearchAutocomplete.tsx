"use client";

import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import { getProductLocations } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
  onSelect: (data: { url: string; product: ProductType }) => void;
  variant?: "mobile" | "desktop";
};

export default function SearchAutocomplete({
  onSelect,
  variant = "mobile",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?pagination[limit]=5&populate=*&filters[productName][$containsi]=${encodeURIComponent(query)}`,
      );

      const data = await res.json();
      setResults((data?.data as ProductType[]) || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const open = query.length > 0 && results.length > 0 && !forceClose;

  const handleBlur = () => {
    setTimeout(() => setForceClose(true), 150);
  };

  const handleFocus = () => {
    setForceClose(false);
  };

  // 🟩 DESKTOP
  if (variant === "desktop") {
    return (
      <div className="relative w-full">
        <input
          className="w-full border p-3 rounded-full pl-5 pr-12 text-[15px] shadow-sm focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-600 transition"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

        {open && (
          <div
            className="
             absolute left-0 right-0 w-full mt-3 
            max-w-full overflow-hidden   
            bg-white dark:bg-gray-900 
            rounded-xl shadow-xl ring-1 ring-black/5 
            z-[20000] max-h-96 overflow-y-auto 
            animate-in fade-in slide-in-from-top-2
            "
          >
            {results.map((p) => {
              const locations = getProductLocations(p);

              return (
                <div
                  key={p.id}
                  className="
                    p-4 border-b last:border-none 
                    hover:bg-gray-50 dark:hover:bg-gray-800 
                    transition-colors cursor-pointer
                  "
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-[15px]">
                    {p.attributes.productName}
                  </div>

                  <div className="flex flex-col mt-3 gap-2">
                    {locations.map((loc) => (
                      <button
                        key={loc.url}
                        className="
                          text-sm font-medium 
                          px-3 py-2 
                          bg-amber-600 dark:bg-sky-600 
                          hover:bg-amber-500 dark:hover:bg-sky-500 
                          text-white rounded-lg 
                          transition
                        "
                        onClick={() => onSelect({ url: loc.url, product: p })}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // 🟦 MOBILE
  return (
    <div className="relative w-full">
      <input
        className="w-full border p-3 rounded-lg text-[15px] shadow-sm focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-600 transition"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      {loading && (
        <div className="absolute bg-white p-2 text-sm text-gray-500">
          Buscando...
        </div>
      )}

      {open && (
        <div
          className="
            absolute w-full mt-2 
            bg-white dark:bg-gray-900 
            rounded-xl shadow-xl 
            ring-1 ring-black/5 
            z-50 
            max-h-96 overflow-y-auto 
            animate-in fade-in slide-in-from-top-2
          "
        >
          {results.map((p) => {
            const locations = getProductLocations(p);

            return (
              <div
                key={p.id}
                className="
                  p-4 border-b last:border-none 
                  hover:bg-gray-50 dark:hover:bg-gray-800 
                  transition-colors
                "
              >
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-[15px]">
                  {p.attributes.productName}
                </div>

                <div className="flex flex-col mt-3 gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.url}
                      className="
                        text-sm font-medium 
                        px-3 py-2 
                        bg-amber-600 dark:bg-sky-600 
                        hover:bg-amber-500 dark:hover:bg-sky-500 
                        text-white rounded-lg 
                        transition
                      "
                      onClick={() => onSelect({ url: loc.url, product: p })}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
