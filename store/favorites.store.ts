import { ProductType } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface FavoritesState {
  favorites: ProductType[];
  toggleFavorite: (product: ProductType) => void;
  isFavourite: (id: number) => boolean;
  clearFavorites: () => void;
  clearFavoritesSilently: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const { favorites } = get();
        const exists = favorites.some((p) => p.id === product.id);

        const updated = exists
          ? favorites.filter((p) => p.id !== product.id)
          : [...favorites, product];

        set({ favorites: updated });

        if (exists) {
          toast.info("Producto eliminado de favoritos 💔");
        } else {
          toast.success("Producto añadido a favoritos ❤️");
        }
      },

      isFavourite: (id) => {
        return get().favorites.some((p) => p.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
        toast.success("Favoritos limpiados 🧹");
      },

      clearFavoritesSilently : () => {
        set({ favorites: [] });
      }
    }),
    {
      name: "favorites-storage",
    }
  )
);
