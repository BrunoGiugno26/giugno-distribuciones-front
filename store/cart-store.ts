import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import { CartItemBackend } from "@/types/cart";
import { addCartItem, deleteCartItem, getCartItems, updateCartItem } from "@/api/cart";
import { mapCartItem } from "@/lib/mappers";

export type CartItem = {
  id: number;
  product: ProductType;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  syncCartFromBackend: (userId: string) => Promise<void>;
  addToCartWithSync: (product: ProductType, quantity?: number, userId?: string) => Promise<void>;
  updateItemBackend: (id: number, quantity: number) => Promise<void>;
  removeItemBackend: (id: number) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  clearCartSilently: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      syncCartFromBackend: async (userId) => {
        console.log("🔄 Sincronizando carrito desde backend para user:", userId);
        const backendItems: CartItemBackend[] = await getCartItems(userId);
        const mappedItems = backendItems.map(mapCartItem);
        const { totalItems, totalPrice } = calculateTotals(mappedItems);
        set({ items: mappedItems, totalItems, totalPrice });
        console.log("✅ Carrito sincronizado:", mappedItems);
      },

      addToCartWithSync: async (product, quantity = 1, userId) => {
        if (!userId) {
          toast.error("Debes iniciar sesión para usar el carrito");
          return;
        }

        const existingItem = get().items.find((item) => item.product.id === product.id);

        if (existingItem) {
          // ✅ Ya existe → actualizamos cantidad
          const newQuantity = existingItem.quantity + quantity;
          await updateCartItem(existingItem.id, newQuantity);
          await get().syncCartFromBackend(userId);
          toast.success("Cantidad actualizada 🛒");
        } else {
          // ➕ No existe → creamos nuevo
          await addCartItem(userId, product.id, quantity);
          await get().syncCartFromBackend(userId);
          toast.success("Producto añadido al carrito 🛒");
        }
      },

      updateItemBackend: async (id, quantity) => {
        console.log("🔄 updateItemBackend → cartItem.id:", id, "cantidad:", quantity);
        const updated = await updateCartItem(id, quantity);
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? mapCartItem(updated) : item)),
        }));
        const { totalItems, totalPrice } = calculateTotals(get().items);
        set({ totalItems, totalPrice });
        toast.success("Cantidad actualizada 🛒");
      },

      removeItemBackend: async (id) => {
        console.log("🗑 removeItemBackend → cartItem.id:", id);
        await deleteCartItem(id);
        const updatedItems = get().items.filter((item) => item.id !== id);
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
        toast.info("Producto eliminado del carrito 🛒");
      },

      clearCart: async (userId: string) => {
        const { items } = get();

        // 🔇 eliminamos directo en backend sin mostrar toast por cada producto
        for (const item of items) {
          await deleteCartItem(item.id);
        }

        await get().syncCartFromBackend(userId);

        // ✅ mostramos solo un toast final
        toast.success("Carrito vaciado 🧹");
      },

      clearCartSilently: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "giugno-distribuciones-cart",
    }
  )
);

function calculateTotals(items: CartItem[]) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.product.attributes.price,
    0
  );
  return { totalItems, totalPrice };
}



