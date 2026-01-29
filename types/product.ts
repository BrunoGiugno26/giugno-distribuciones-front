export type VariantType = {
    id: number;
    attributes: {
        code: string;
        stock: number;
        priceDelta?: number;
    };
};


export type ProductType = {
    id: number,
    attributes: {
        productName: string;
        slug: string;
        description: string;
        active: boolean;
        isFeatured: boolean;
        esReventa?: boolean;
        tipoProducto: string;
        tipoProductoNuevo?: {
            data: {
                id: number;
                attributes: {
                    nombre:string;
                    slug:string;
                };
            } | null
        }
        tipoCabello: string;
        origin: string;
        price: number;
        marca: string;
        stock: number;
        audience: string;
        images: {
            data: {
                id: number,
                attributes: {
                    url: string
                }
            }[]
        };
        category: {
            data: {
                attributes: {
                    slug: string,
                    categoryName: string;
                };
            };
        };
        variants?: { data: VariantType[] };
    };
}