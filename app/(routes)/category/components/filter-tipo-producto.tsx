import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { useEffect, useState } from "react";

type AttributeField = {
  enum: string[] | undefined;
};

type TipoProductoItem = {
  id: number;
  attributes: {
    nombre: string;
    slug: string;
  };
};

type FilterTipoProductoProps = {
  setFilterTipoProducto: (type: string) => void;
  value: string;
  isNewSystem: boolean;
  categorySlug?: string;
};

const PRODUCT_TYPE_FIELD_NAME = "tipoProducto";

const FilterTipoProducto = ({
  setFilterTipoProducto,
  value,
  isNewSystem,
  categorySlug,
}: FilterTipoProductoProps) => {
  const [newTypes, setNewTypes] = useState<TipoProductoItem[]>([]);

  // SISTEMA NUEVO → traer tipos desde Strapi
  useEffect(() => {
    if (!isNewSystem) return;
    const fetchTypes = async () => {
      try {
        const base = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tipo-productos?populate=*`;
        const url = categorySlug
          ? `${base}&filters[categories][slug][$eq]=${encodeURIComponent(categorySlug)}`
          : base;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setNewTypes(json.data as TipoProductoItem[]);
      } catch (err) {
        console.error("Error cargando tipos nuevos", err);
        setNewTypes([]);
      }
    };
    fetchTypes();
  }, [isNewSystem, categorySlug]);

  // SISTEMA VIEJO → ENUM
  const { result }: FilterTypes = useGetProductField();
  const typeAttributes = (
    result?.schema?.attributes as Record<string, AttributeField>
  )?.[PRODUCT_TYPE_FIELD_NAME];
  const productTypes = typeAttributes?.enum;

  console.log(
    "DEBUG → isNewSystem:",
    isNewSystem,
    "categorySlug:",
    categorySlug,
    "newTypes:",
    newTypes,
  );

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Tipo de Producto</p>

      <RadioGroup value={value} onValueChange={setFilterTipoProducto}>
        {/* Opción "Todos" */}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="all-types" />
          <Label htmlFor="all-types" className="font-bold">
            Todos
          </Label>
        </div>

        {/* SISTEMA NUEVO */}
        {isNewSystem &&
          Array.isArray(newTypes) &&
          newTypes.map((t) => (
            <div key={t.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={t.attributes.slug}
                id={t.attributes.slug}
              />
              <Label htmlFor={t.attributes.slug}>{t.attributes.nombre}</Label>
            </div>
          ))}

        {/* SISTEMA VIEJO */}
        {!isNewSystem &&
          productTypes?.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterTipoProducto;
