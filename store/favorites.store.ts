import { ProductType } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { getFavorites, addFavorite, deleteFavorite } from "@/api/favorites";
import { FavoriteItemBackend } from "@/types/favorite";
import { FavoriteItem, mapFavoriteItem } from "@/lib/mappers";

interface FavoritesState {
  favorites: FavoriteItem[];
  isFavourite: (id: number) => boolean;
  clearFavorites: (userId: string) => Promise<void>;
  clearFavoritesSilently: () => void;
  syncFavoritesFromBackend: (userId: string) => Promise<void>;
  addFavoriteWithSync: (userId: string, productId: number) => Promise<void>;
  removeFavoriteWithSync: (id: number, userId: string) => Promise<void>;
  toggleFavoriteWithSync: (product: ProductType, userId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      isFavourite: (id) => {
        return get().favorites.some((p) => p.product.id === id);
      },

      clearFavorites: async (userId: string) => {
        const { favorites } = get();

        // 🔇 eliminamos directo en backend sin mostrar toast por cada producto
        for (const fav of favorites) {
          await deleteFavorite(fav.id);
        }

        await get().syncFavoritesFromBackend(userId);

        // ✅ mostramos solo un toast final
        toast.success("Favoritos limpiados 🧹");
      },

      clearFavoritesSilently: () => {
        set({ favorites: [] });
      },

      syncFavoritesFromBackend: async (userId) => {
        const backendItems: FavoriteItemBackend[] = await getFavorites(userId);
        const mappedItems = backendItems.map(mapFavoriteItem);
        set({ favorites: mappedItems });
      },

      addFavoriteWithSync: async (userId, productId) => {
        await addFavorite(userId, productId);
        await get().syncFavoritesFromBackend(userId);
        toast.success("Producto añadido a favoritos ❤️");
      },

      removeFavoriteWithSync: async (id, userId) => {
        await deleteFavorite(id);
        await get().syncFavoritesFromBackend(userId);
        toast.info("Producto eliminado de favoritos 💔");
      },

      toggleFavoriteWithSync: async (product, userId) => {
        const { favorites, addFavoriteWithSync, removeFavoriteWithSync } = get();
        const existingFavorite = favorites.find((f) => f.product.id === product.id);

        if (!existingFavorite) {
          await addFavoriteWithSync(userId, product.id);
        } else {
          await removeFavoriteWithSync(existingFavorite.id, userId);
        }
      },
    }),
    { name: "favorites-storage" }
  )
);






