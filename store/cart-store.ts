import { create } from "zustand";
import { persist } from "zustand/middleware"
import { ProductType } from "@/types/product";
import { toast } from "sonner";

export type CartItem = {
    id: number;
    product: ProductType;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: ProductType, quantity?: number) => void
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    clearCartSilently: () => void;
    setQuantity: (productId: number, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,

            addToCart: (product, quantity = 1) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === product.id);

                let updatedItems: CartItem[];

                if (existingItem) {
                    updatedItems = items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                    toast.success("Cantidad actualizada 🛒");
                } else {
                    updatedItems = [...items, { id: product.id, product, quantity }];
                    toast.success("Producto añadido al carrito 🛒");
                }
                const { totalItems, totalPrice } = calculateTotals(updatedItems);
                set({ items: updatedItems, totalItems, totalPrice });
            },

            removeFromCart: (productId) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === productId);

                if(!existingItem) return;

                let updatedItems: CartItem[];

                if(existingItem.quantity >1){
                    updatedItems = items.map((item) => item.id === productId ? {...item, quantity:item.quantity -1 }
                : item
                );
                toast("Se elimino una unidad del producto 🛒")
                } else{
                    updatedItems = items.filter((item) => item.id !== productId);
                    toast("Producto eliminado del carrito 🛒")
                }

                const { totalItems, totalPrice } = calculateTotals(updatedItems);
                set({items: updatedItems,totalItems,totalPrice })
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
                toast("Carrito Vacio 🧹")
            },

            clearCartSilently:() =>{
                set({ items: [], totalItems:0, totalPrice:0});
            },

            setQuantity: (productId, quantity) => {
                const { items } = get();

                if (quantity <= 0) {
                    const updatedItems = items.filter((item) => item.id !== productId);
                    const { totalItems, totalPrice } = calculateTotals(updatedItems);
                    set({ items: updatedItems, totalItems, totalPrice })
                    toast("Producto eliminado por cantidad 0 🛒")
                    return;
                }

                const updatedItems = items.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                );

                const { totalItems, totalPrice } = calculateTotals(updatedItems);
                set({ items: updatedItems, totalItems, totalPrice });
                toast("Cantidad actualizada 🛒")
            },
        }),
        {
            name: "giugno-distribuciones-cart"
        }
    )
);

function calculateTotals(items: CartItem[]) {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce(
        (acc, item) => acc + item.quantity * item.product.attributes.price, 0
    );
    return { totalItems, totalPrice };
}