"use client";

import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartButtonProps {
  product: ProductType;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addToCartWithSync = useCartStore((state) => state.addToCartWithSync);
  const cartItems = useCartStore((state) => state.items);
  const { user } = useUser();

  const available = product.attributes.stock ?? 0;
  const cartQuantity =
    cartItems.find((item) => item.product.id === product.id)?.quantity ?? 0;
  const remaining = available - cartQuantity;

  // 🔑 Solo depende del stock, no de la sesión
  const disabled = remaining <= 0;

  const handleClick = () => {
    if (!user?.id) {
      toast.error("Debes iniciar sesión para agregar productos 🛒");
      return;
    }

    if (remaining <= 0) {
      toast.error("No hay más unidades disponibles de este producto");
      return;
    }

    addToCartWithSync(product, 1, user.id);
    toast.success("Producto añadido al carrito 🛒");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick();
            }}
            disabled={disabled}
            className={`flex items-center justify-center w-10 h-10 rounded-full border bg-transparent transition-all duration-150 ${
              disabled
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-400 text-gray-700 dark:hover:text-sky-600 dark:hover:border-sky-600 hover:border-amber-500 hover:text-amber-600"
            }`}
            aria-label="Añadir al carrito"
          >
            <ShoppingCart className="w-6 h-6 text-current" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="text-sm">
          {remaining > 0 ? (
            <p>{`Stock disponible: ${remaining}`}</p>
          ) : (
            <p>Sin stock</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToCartButton;


