"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import useClerkStrapiSync from "./hooks/useClerkStrapiSync";
import { useFavoritesStore } from "@/store/favorites.store";

export default function SyncWrapper() {
  useClerkStrapiSync();

  const { isLoaded, isSignedIn } = useUser();
  const clearCartSilently = useCartStore((state) => state.clearCartSilently);
  const clearFavoritesSilently = useFavoritesStore(
    (state) => state.clearFavoritesSilently
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      clearCartSilently();
      clearFavoritesSilently();
    }
  }, [isLoaded, isSignedIn, clearCartSilently, clearFavoritesSilently]);
  return null;
}
