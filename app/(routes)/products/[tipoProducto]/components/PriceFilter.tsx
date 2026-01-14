"use client";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  setPriceRange: (range: { min?: number; max?: number }) => void;
};

export default function PriceFilter({ setPriceRange }: Props) {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const applyFilter = () => {
    const minNum = min !== "" ? Number(min) : undefined;
    const maxNum = max !== "" ? Number(max) : undefined;

    if(minNum === undefined && maxNum === undefined){
      toast.warning("Filtro Vacío",{
        description: "Ingresá al menos un valor para aplicar el filtro.",
      })
      return;
    }

    if (minNum !== undefined && maxNum !== undefined && minNum > maxNum) {
      toast.error("Rango inválido", {
        description: "El mínimo no puede ser mayor que el máximo.",
      });
      return;
    }

    const range: { min?: number; max?: number } = {};
    if (minNum !== undefined) range.min = minNum;
    if (maxNum !== undefined) range.max = maxNum;

    setPriceRange(range);

    const minTxt = minNum !== undefined ? `$${minNum}` : "mínimo";
    const maxTxt = minNum !== undefined ? `$${maxNum}` : "máximo";
    toast.success("Filtro de precio aplicado", {
      description: `Rango: ${minTxt} - ${maxTxt}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-24 p-2 border rounded focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-500"
          placeholder="Min"
          min={0}
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-24 p-2 border rounded focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-500"
          placeholder="Max"
          min={0}
        />
      </div>
        <button
          onClick={applyFilter}
          className="w-full bg-linear-to-r from-amber-500 to-sky-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Aplicar filtro
        </button>
      </div>
  );
}
