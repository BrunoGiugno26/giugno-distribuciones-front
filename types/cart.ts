import { ProductType, VariantType } from "./product";

export type CartItemBackend = {
    id: number;
    attributes: {
        userId: string;
        quantity: number;
        product: { data: ProductType };
        variant?: { data: VariantType | null};
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type CartItem = {
    id: number;
    product:ProductType;
    variant?: VariantType;
    quantity:number;
}