"use client";
import FilterBrand from "@/app/(routes)/category/components/filter-brand";
import FilterTipoProducto from "@/app/(routes)/category/components/filter-tipo-producto";

type Props = {
  filterBrand: string;
  setFilterBrand: (value: string) => void;
  filterTipoProducto: string;
  setFilterTipoProducto: (value: string) => void;
};

const FiltersControlsReventa = ({
  filterBrand,
  setFilterBrand,
  filterTipoProducto,
  setFilterTipoProducto,
}: Props) => {
  return (
    <section className="space-y-4">
      <FilterBrand value={filterBrand} setFilterBrand={setFilterBrand} />
      <FilterTipoProducto
        value={filterTipoProducto}
        setFilterTipoProducto={setFilterTipoProducto}
      />{" "}
    </section>
  );
};
export default FiltersControlsReventa;
