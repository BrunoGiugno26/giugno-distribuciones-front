"use client";

import FilterBrand from "@/app/(routes)/category/components/filter-brand";
import FilterTipoProducto from "@/app/(routes)/category/components/filter-tipo-producto";
import { toast } from "sonner";

type Props = {
  filterBrand: string;
  setFilterBrand: (value: string) => void;
  filterTipoProducto: string;
  setFilterTipoProducto: (value: string) => void;
};

const FiltersControlsProfesionales = ({
  filterBrand,
  setFilterBrand,
  filterTipoProducto,
  setFilterTipoProducto,
}: Props) => {
  const categorySlug = "productos-profesionales";

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 max-h-[600px] overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold mb-3">Filtrar por marca</h2>
        <FilterBrand
          value={filterBrand}
          setFilterBrand={(brand) => {
            setFilterBrand(brand);
            toast.success("Filtro de marca aplicado", {
              description: brand ? `Marca: ${brand}` : "Todas las marcas",
            });
          }}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Filtrar por tipo</h2>
        <FilterTipoProducto
          value={filterTipoProducto}
          setFilterTipoProducto={(tipo) => {
            setFilterTipoProducto(tipo);
            toast.success("Filtro de tipo aplicado", {
              description: tipo ? `Tipo: ${tipo}` : "Todos los tipos",
            });
          }}
          isNewSystem={true}
          categorySlug={categorySlug}
        />
      </div>
    </aside>
  );
};

export default FiltersControlsProfesionales;
