// FiltersControlsCategory.tsx (Código Corregido V2)

import FilterBrand from "./filter-brand";
import FilterTipoProducto from "./filter-tipo-producto";

type FiltersControlCategoryProps = {
    setFilterBrand:(brand:string) => void; 
    setFilterTipoProducto:(type:string) => void
}

const FiltersControlsCategory = (props:FiltersControlCategoryProps) => {
    const { setFilterBrand, setFilterTipoProducto} = props; 

    return ( 
        <div className="flex flex-row gap-10 lg:flex-col lg:w-full lg:mt-0">
            
            <div className="shrink-0">
                <FilterTipoProducto setFilterTipoProducto={setFilterTipoProducto}/>
            </div>

            <div className="shrink-0">
                <FilterBrand setFilterBrand={setFilterBrand}/> 
            </div>
        </div>
    );
}
 
export default FiltersControlsCategory;
