import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType, VariantType } from "@/types/product";
import { toast } from "sonner";
import { CartItem, CartItemBackend } from "@/types/cart";
import { addCartItem, deleteCartItem, getCartItems, updateCartItem } from "@/api/cart";
import { mapCartItem } from "@/lib/mappers";

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  syncCartFromBackend: (userId: string) => Promise<void>;
  addToCartWithSync: (
    product: ProductType,
    quantity?: number,
    userId?: string,
    variant?: VariantType
  ) => Promise<void>;
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
        const backendItems: CartItemBackend[] = await getCartItems(userId);
        const mappedItems = backendItems.map(mapCartItem);
        const { totalItems, totalPrice } = calculateTotals(mappedItems);
        set({ items: mappedItems, totalItems, totalPrice });
      },

      // ✅ Ahora limita por stock
      addToCartWithSync: async (product, quantity = 1, userId, variant) => {
        if (!userId) {
          toast.error("Debes iniciar sesión para usar el carrito");
          return;
        }

        const maxAvailable =
          variant?.attributes.stock ?? product.attributes.stock ?? 0;

        if (maxAvailable <= 0) {
          toast.error("Sin stock para este producto/tono");
          return;
        }

        const existingItem = get().items.find(
          (item) =>
            item.product.id === product.id &&
            ((item.variant?.id ?? null) === (variant?.id ?? null))
        );

        if (existingItem) {
          const currentQty = existingItem.quantity;
          const desiredQty = currentQty + quantity;
          const newQty = Math.min(desiredQty, maxAvailable);

          if (newQty === currentQty) {
            toast.error("No podés agregar más unidades, alcanzaste el stock máximo");
            return;
          }

          await updateCartItem(existingItem.id, newQty);
          await get().syncCartFromBackend(userId);
          toast.success("Cantidad actualizada 🛒");
        } else {
          const initialQty = Math.min(quantity, maxAvailable);

          if (initialQty <= 0) {
            toast.error("Este producto no tiene stock disponible");
            return;
          }

          await addCartItem(userId, product.id, initialQty, variant?.id);
          await get().syncCartFromBackend(userId);
          toast.success("Producto añadido al carrito 🛒");
        }
      },

      // ✅ También limita aquí
      updateItemBackend: async (id, quantity) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;

        const maxAvailable =
          item.variant?.attributes.stock ??
          item.product.attributes.stock ??
          0;

        if (quantity < 1) {
          toast.error("La cantidad mínima es 1");
          return;
        }

        const clamped = Math.min(quantity, maxAvailable);

        if (clamped < quantity) {
          toast.error("No puedes superar el stock disponible");
        }

        const updated = await updateCartItem(id, clamped);

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? mapCartItem(updated) : i
          ),
        }));

        const { totalItems, totalPrice } = calculateTotals(get().items);
        set({ totalItems, totalPrice });
        toast.success("Cantidad actualizada 🛒");
      },

      removeItemBackend: async (id) => {
        await deleteCartItem(id);
        const updatedItems = get().items.filter((item) => item.id !== id);
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
        toast.info("Producto eliminado del carrito 🛒");
      },

      clearCart: async (userId: string) => {
        const { items } = get();
        for (const item of items) {
          await deleteCartItem(item.id);
        }
        await get().syncCartFromBackend(userId);
        toast.success("Carrito vaciado 🧹");
      },

      clearCartSilently: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    { name: "giugno-distribuciones-cart" }
  )
);

function calculateTotals(items: CartItem[]) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => {
    const basePrice = item.product.attributes.price;
    const delta = item.variant?.attributes.priceDelta ?? 0;
    const finalPrice = basePrice + delta;
    return acc + item.quantity * finalPrice;
  }, 0);
  return { totalItems, totalPrice };
}




