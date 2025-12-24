/* eslint-disable @next/next/no-img-element */
"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@clerk/nextjs";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const updateItemBackend = useCartStore((s) => s.updateItemBackend);
  const removeItemBackend = useCartStore((s) => s.removeItemBackend);
  const clearCart = useCartStore((s) => s.clearCart);

  const { user } = useUser();

  // Handlers → todo backend
  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    updateItemBackend(cartItemId, newQuantity);
  };

  const handleRemove = (cartItemId: number) => {
    removeItemBackend(cartItemId);
  };

  const handleClearCart = () => {
    if (user?.id) {
      clearCart(user.id); // ✅ solo usamos clearCart con userId
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-10">Tu carrito</h1>

        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => {
                const { product, quantity } = item;
                const { attributes } = product;
                const imageUrl = attributes.images?.data?.[0]?.attributes?.url;

                return (
                  <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                    {/* Imagen */}
                    {imageUrl && (
                      <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                          alt={attributes.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Info del producto */}
                    <div className="flex-1">
                      <h2 className="font-semibold">{attributes.productName}</h2>
                      <p className="text-sm text-gray-500">Marca: {attributes.marca}</p>

                      {/* Input de cantidad */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Cantidad:</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className={`px-2 py-1 rounded ${
                              quantity <= 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : " cursor-pointer bg-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            }`}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border rounded text-sm">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, quantity + 1)}
                            className="px-2 py-1 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 dark:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Precio y eliminar */}
                    <div className="text-right space-y-2">
                      <p className="font-semibold">${attributes.price * quantity}</p>
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
              <div>
                <p className="text-sm text-gray-500">Total de productos: {totalItems}</p>
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




