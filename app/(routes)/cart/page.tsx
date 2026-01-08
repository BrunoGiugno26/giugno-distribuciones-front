/* eslint-disable @next/next/no-img-element */
"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useState, useMemo } from "react";

const MAX_INPUT = 100;

function normalizeQuantity(raw: string, max: number) {
  const digitsOnly = raw.replace(/\D/g, "");
  const cleaned = digitsOnly.replace(/^0+/, "");
  let parsed = cleaned === "" ? 0 : parseInt(cleaned, 10);
  if (parsed > max) parsed = max;
  return parsed;
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const updateItemBackend = useCartStore((s) => s.updateItemBackend);
  const removeItemBackend = useCartStore((s) => s.removeItemBackend);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useUser();

  const distinctItems = items.length;
  const totalUnits = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  // Inicializamos cantidades locales directamente desde items
  const [localQuantities, setLocalQuantities] = useState<
    Record<number, number>
  >(() => {
    const initial: Record<number, number> = {};
    for (const item of items) initial[item.id] = item.quantity;
    return initial;
  });

  const handleQuantityChange = (
    cartItemId: number,
    newQuantity: number,
    stock: number
  ) => {
    const currentItem = items.find((i) => i.id === cartItemId);
    if (!currentItem) return;

    if (newQuantity === currentItem.quantity) {
      toast.info("La cantidad ya está actualizada");
      return;
    }

    if (newQuantity > stock) {
      toast.error(`Solo podés agregar hasta ${stock} unidades`);
      return;
    }
    if (newQuantity < 1) {
      toast.error("La cantidad mínima es 1");
      return;
    }
    updateItemBackend(cartItemId, newQuantity);
    toast.success("Cantidad actualizada");
  };

  const handleRemove = (cartItemId: number) => {
    removeItemBackend(cartItemId);
    toast.success("Producto eliminado del carrito");
  };

  const handleClearCart = () => {
    if (user?.id) {
      clearCart(user.id);
      toast.success("Carrito vaciado");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-10">
          Tu carrito
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => {
                const { product, variant } = item;
                const { attributes } = product;
                const imageUrl = attributes.images?.data?.[0]?.attributes?.url;
                const stock = variant
                  ? variant.attributes.stock
                  : attributes.stock ?? 0;

                const currentLocal = localQuantities[item.id] ?? item.quantity;
                const remaining = Math.max(stock - currentLocal, 0);
                const unitPrice =
                  attributes.price + (variant?.attributes.priceDelta ?? 0);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center border-b pb-4"
                  >
                    {imageUrl && (
                      <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                          alt={attributes.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <h2 className="font-semibold">
                        {attributes.productName}
                      </h2>
                      <p className="text-sm text-gray-400">
                        Marca: {attributes.marca}
                      </p>

                      {variant && (
                        <p className="text-sm text-gray-500">
                          Variante:{" "}
                          <span className="font-medium">
                            {variant.attributes.code}
                          </span>
                        </p>
                      )}

                      <p className="text-sm text-gray-500">
                        Stock restante:{" "}
                        <span
                          className={
                            remaining > 0
                              ? "text-gray-600"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {remaining > 0 ? remaining : "Sin stock"}
                        </span>
                      </p>

                      {remaining <= 3 && remaining > 0 && (
                        <p className="text-sm text-red-500 font-medium">
                          ¡Quedan solo {remaining} unidades disponibles!
                        </p>
                      )}

                      {/* Cantidad editable + botón actualizar */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Cantidad:</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={currentLocal}
                          onChange={(e) => {
                            const parsed = normalizeQuantity(
                              e.target.value,
                              MAX_INPUT
                            );
                            setLocalQuantities((q) => ({
                              ...q,
                              [item.id]: parsed,
                            }));
                          }}
                          className="w-16 px-2 py-1 border rounded text-center appearance-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, currentLocal, stock)
                          }
                          className="px-2 py-1 text-sm cursor-pointer bg-amber-600 rounded hover:bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-500"
                        >
                          Actualizar
                        </button>
                      </div>
                    </div>

                    {/* Precio y eliminar */}
                    <div className="text-right space-y-2">
                      <p className="font-semibold">
                        ${unitPrice * item.quantity}
                      </p>
                      <button
                        className="flex items-center px-2 py-0.5 space-x-2 text-xs font-medium transition duration-200 rounded-lg shadow-md cursor-pointer
                        bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200
                        dark:bg-sky-700 dark:text-white dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:border-sky-500"
                        onClick={() => handleRemove(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totales */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Productos Totales: {distinctItems}
                </p>
                <p className="text-sm text-gray-500">
                  Total de Unidades: {totalUnits}
                </p>
                <p className="text-lg font-semibold">Total: ${totalPrice}</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={handleClearCart}
                >
                  Vaciar carrito
                </button>
                <button className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-500 dark:bg-sky-600 dark:hover:bg-sky-500">
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
