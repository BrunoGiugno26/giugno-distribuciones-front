"use client";

import { useFavoritesStore } from "@/store/favorites.store";
import { ProductType } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: ProductType;
  className?: string;
};

export default function FavoriteButton({ product }: Props) {
  const toggleFavoriteWithSync = useFavoritesStore((s) => s.toggleFavoriteWithSync);
  const isFavorite = useFavoritesStore((s) => s.isFavourite(product.id));
  const { user } = useUser();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.id) {
      toast.error("Debes iniciar sesión para agregar productos favoritos ❤️");
      return;
    }

    await toggleFavoriteWithSync(product, user.id); // 🔑 ahora siempre backend + sync
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full bg-amber-100 dark:bg-sky-200 shadow-md hover:scale-110 cursor-pointer transition"
    >
      <Heart
        size={25}
        className={
          isFavorite
            ? "fill-amber-500 text-amber-500 dark:fill-sky-600 dark:text-sky-600"
            : "text-gray-600"
        }
      />
    </button>
  );
}

