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
        tipoProducto: string;
        tipoCabello: string;
        origin: string;
        price: number;
        marca: string;
        stock: number;
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