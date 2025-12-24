import { ProductType } from "./product";

export type CartItemBackend = {
    id: number;
    attributes: {
        userId: string;
        quantity: number;
        product: { data: ProductType };
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}