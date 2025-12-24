import axios from "axios";
import { CartItemBackend } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCartItems = async (userId: string): Promise<CartItemBackend[]> => {
  console.log("📦 getCartItems → userId:", userId);
  const res = await axios.get<{ data: CartItemBackend[] }>(`${API_URL}/api/cart-items`, {
    params: {
      filters: { userId: { $eq: userId } },
      populate: ["product", "product.images"],
    },
  });
  console.log("✅ Cart items recibidos:", res.data.data);
  return res.data.data;
};

export const addCartItem = async (
  userId: string,
  productId: number,
  quantity: number
): Promise<CartItemBackend> => {
  console.log("➕ addCartItem → userId:", userId, "productId:", productId, "quantity:", quantity);
  const res = await axios.post<{ data: CartItemBackend }>(
    `${API_URL}/api/cart-items`,
    { data: { userId, product: productId, quantity } },
    { params: { populate: ["product", "product.images"] } }
  );
  console.log("✅ Cart item creado:", res.data.data);
  return res.data.data;
};

export const updateCartItem = async (
  id: number,
  quantity: number
): Promise<CartItemBackend> => {
  console.log("🔄 updateCartItem → id:", id, "→ cantidad:", quantity);
  try {
    const res = await axios.put<{ data: CartItemBackend }>(
      `${API_URL}/api/cart-items/${id}`,
      { data: { quantity } },
      { params: { populate: ["product", "product.images"] } }
    );
    console.log("✅ Cart item actualizado:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("❌ Error al actualizar cart-item con id:", id, error);
    throw error;
  }
};

export const deleteCartItem = async (id: number): Promise<void> => {
  console.log("🗑 deleteCartItem → id:", id);
  try {
    await axios.delete(`${API_URL}/api/cart-items/${id}`);
    console.log("✅ Cart item eliminado");
  } catch (error) {
    console.error("❌ Error al eliminar cart-item con id:", id, error);
    throw error;
  }
};

