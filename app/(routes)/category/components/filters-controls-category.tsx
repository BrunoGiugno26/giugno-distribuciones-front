// FiltersControlsCategory.tsx (Código Corregido V2)

import FilterBrand from "./filter-brand";
import FilterTipoProducto from "./filter-tipo-producto";

type FiltersControlCategoryProps = {
    setFilterBrand:(brand:string) => void; 
    setFilterTipoProducto:(type:string) => void
    brandValue: string;
    tipoValue:string;
}

const FiltersControlsCategory = (props:FiltersControlCategoryProps) => {
    const { setFilterBrand, setFilterTipoProducto,brandValue,tipoValue} = props; 

    return ( 
        <div className="flex flex-row gap-10 lg:flex-col lg:w-full lg:mt-0">
            
            <div className="shrink-0">
                <FilterTipoProducto setFilterTipoProducto={setFilterTipoProducto} value={tipoValue}/>
            </div>

            <div className="shrink-0">
                <FilterBrand setFilterBrand={setFilterBrand} value={brandValue}/> 
            </div>
        </div>
    );
}
 
export default FiltersControlsCategory;
