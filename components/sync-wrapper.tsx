"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import useClerkStrapiSync from "./hooks/useClerkStrapiSync";

export default function SyncWrapper() {
  useClerkStrapiSync();

  const { isSignedIn } = useUser();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!isSignedIn) {
      clearCart();
    }
  }, [isSignedIn, clearCart]);
  return null;
}
