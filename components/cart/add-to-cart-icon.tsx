"use client";

import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product";
import { ShoppingCart } from "lucide-react";

export default function AddToCartIcon({ product }: { product: ProductType }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <ShoppingCart
      width={24}
      strokeWidth={2}
      className="cursor-pointer transition hover:fill-amber-600 dark:hover:fill-sky-600"
      onClick={() => addToCart(product)}
    />
  );
}
