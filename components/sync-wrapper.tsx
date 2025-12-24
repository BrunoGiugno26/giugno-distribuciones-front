"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import useClerkStrapiSync from "./hooks/useClerkStrapiSync";
import { useFavoritesStore } from "@/store/favorites.store";

export default function SyncWrapper() {
  useClerkStrapiSync();

  const { isLoaded, isSignedIn, user } = useUser();
  const syncCart = useCartStore((s) => s.syncCartFromBackend);
  const clearCartSilently = useCartStore((state) => state.clearCartSilently);
  const syncFavorites = useFavoritesStore((s) => s.syncFavoritesFromBackend);
  const clearFavoritesSilently = useFavoritesStore(
    (state) => state.clearFavoritesSilently
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user?.id) {
      syncCart(user.id);
      syncFavorites(user.id);
    } else {
      clearCartSilently();
      clearFavoritesSilently();
    }
  }, [
    isLoaded,
    isSignedIn,
    user?.id,
    syncCart,
    syncFavorites,
    clearCartSilently,
    clearFavoritesSilently,
  ]);
  return null;
}
