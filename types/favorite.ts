import { ProductType } from "./product";

export type FavoriteItemBackend = {
    id: number;
    attributes: {
        userId: string;
        product: { data: ProductType };
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};