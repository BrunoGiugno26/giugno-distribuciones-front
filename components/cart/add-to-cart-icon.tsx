"use client";

import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: ProductType;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addToCartWithSync = useCartStore((state) => state.addToCartWithSync);
  const { user } = useUser();

  const handleClick = () => {
    if (!user?.id) {
      toast.error("Debes iniciar sesión para agregar productos 🛒");
      return;
    }

    addToCartWithSync(product, 1, user.id); // 🔑 pasamos el user.id
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      className="p-2 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer transition"
      aria-label="Añadir al carrito"
    >
      <ShoppingCart className="w-5 h-5 text-gray-800 dark:text-white" />
    </button>
  );
};

export default AddToCartButton;

