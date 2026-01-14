"use client";

import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters"; 

type AttributeField = {
  enum: string[] | undefined;
};

type FilterBrandProps = {
  setFilterBrand: (brand: string) => void;
  value: string; // 👈 agregamos el value para sincronizar
};

const BRAND_FIELD_NAME = "marca";

const FilterBrand = ({ setFilterBrand, value }: FilterBrandProps) => {
  const { result, loading }: FilterTypes = useGetProductField();
  const brandAttributes = (result?.schema?.attributes as Record<string, AttributeField>)?.[BRAND_FIELD_NAME];
  const brands = brandAttributes?.enum;

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Marcas</p>
      {loading && result === null && <p>Cargando marcas...</p>}

      <RadioGroup
        value={value} // 👈 ahora el RadioGroup sabe cuál está activo
        onValueChange={(val) => setFilterBrand(val)}
      >
        <div key="all-brand" className="flex items-center space-x-2">
          <RadioGroupItem value="" id="all-brands" />
          <Label htmlFor="all-brands" className="font-bold">Todas</Label>
        </div>
        {brands &&
          brands.map((brand: string) => (
            <div key={brand} className="flex items-center space-x-2">
              <RadioGroupItem value={brand} id={brand} />
              <Label htmlFor={brand}>{brand}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterBrand;
