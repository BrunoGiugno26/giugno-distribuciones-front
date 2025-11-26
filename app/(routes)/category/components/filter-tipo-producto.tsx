import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type AttributeField = {
    enum:string[] | undefined;
}

type FilterTipoProductoProps = {
    setFilterTipoProducto:(type:string) => void
}

const PRODUCT_TYPE_FIELD_NAME = "tipoProducto";

const FilterTipoProducto = (props:FilterTipoProductoProps) =>{
    const { setFilterTipoProducto } = props;
    const { result, loading }: FilterTypes = useGetProductField();

    const typeAttributes = (result?.schema?.attributes as Record<string,AttributeField>)?.[PRODUCT_TYPE_FIELD_NAME]
    const productTypes = typeAttributes?.enum

    return(
        <div className="my-5">
            <p className="mb-3 font-bold">Tipo de Producto</p>
            {loading && result === null && <p>Cargando Tipos...</p>}

            <RadioGroup onValueChange={(value) => setFilterTipoProducto(value)}>
                <div key="all-type" className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all-types"/>
                    <Label htmlFor="all-type" className="font-bold">Todos</Label>
                </div>
                {productTypes && productTypes.map((type:string) => (
                    <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type}/>
                        <Label htmlFor={type}>{type}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterTipoProducto;