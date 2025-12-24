import axios from "axios";
import { FavoriteItemBackend } from "@/types/favorite";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 📦 Obtener favoritos de un usuario
export const getFavorites = async (userId: string): Promise<FavoriteItemBackend[]> => {
  console.log("📦 getFavorites → userId:", userId);

  const queryParams = {
    filters: { userId: { $eq: userId } },
    populate: ["product", "product.images"],
  };

  const res = await axios.get<{ data: FavoriteItemBackend[] }>(
    `${API_URL}/api/favorite-items`,
    { params: queryParams }
  );

  console.log("✅ Favoritos recibidos:", res.data.data);
  return res.data.data;
};

// ➕ Agregar un favorito
export const addFavorite = async (
  userId: string,
  productId: number
): Promise<FavoriteItemBackend> => {
  console.log("➕ addFavorite → userId:", userId, "productId:", productId);

  const res = await axios.post<{ data: FavoriteItemBackend }>(
    `${API_URL}/api/favorite-items`,
    { data: { userId, product: productId } },
    { params: { populate: ["product", "product.images"] } }
  );

  console.log("✅ Favorito creado:", res.data.data);
  return res.data.data;
};

// 🗑 Eliminar un favorito
export const deleteFavorite = async (id: number): Promise<void> => {
  console.log("🗑 deleteFavorite → id:", id);
  await axios.delete(`${API_URL}/api/favorite-items/${id}`);
  console.log("✅ Favorito eliminado");
};

