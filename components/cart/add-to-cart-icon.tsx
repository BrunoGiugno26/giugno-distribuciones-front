"use client";

import { useCartStore } from "@/store/cart-store";
import { ProductType } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps{
  product:ProductType;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) =>{
  const addToCart = useCartStore((state) => state.addToCart);
  const { isSignedIn} = useUser();

  const handleClick = () =>{
    if(!isSignedIn){
      toast.error("Debes iniciar sesión para agregar productos 🛒")
      return;
    }

    addToCart(product, 1);
  };

  return(
    <button onClick={(e) =>{
      e.preventDefault();
      e.stopPropagation();
      handleClick()
    }} 
    
    className="p-2 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer transition" aria-label="Añadir al carrito">
      <ShoppingCart className="w-5 h-5 text-gray-800 dark:text-white"/>
    </button>
  )
}

export default AddToCartButton;
